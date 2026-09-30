export interface ProcessOptions {
  quality?: number;
  width?: number;
  height?: number;
  maintainAspectRatio?: boolean;
  cropX?: number;
  cropY?: number;
  cropWidth?: number;
  cropHeight?: number;
  outputFormat?: string;
  angle?: number;
  flipHorizontal?: boolean;
  flipVertical?: boolean;
  preset?: string;
  files?: File[];
}

export interface ProcessResult {
  blob?: Blob;
  url?: string;
  fileName: string;
  originalSize: number;
  newSize?: number;
  width?: number;
  height?: number;
  format?: string;
  metadata?: Record<string, unknown>;
  colors?: { hex: string; rgb: string }[];
  pages?: { page: number; url: string; blob: Blob }[];
  error?: string;
}

const getMimeType = (format: string, defaultType: string = 'image/jpeg'): string => {
  switch (format.toLowerCase()) {
    case 'png': return 'image/png';
    case 'webp': return 'image/webp';
    case 'jpg':
    case 'jpeg': return 'image/jpeg';
    case 'avif': return 'image/avif';
    case 'pdf': return 'application/pdf';
    case 'zip': return 'application/zip';
    default: return defaultType;
  }
};

const getExtension = (mimeType: string, defaultExt: string = 'jpg'): string => {
  switch (mimeType) {
    case 'image/png': return 'png';
    case 'image/webp': return 'webp';
    case 'image/jpeg': return 'jpg';
    case 'image/avif': return 'avif';
    case 'application/pdf': return 'pdf';
    case 'application/zip': return 'zip';
    default: return defaultExt;
  }
};

const loadImage = (file: File | Blob): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to load image'));
    };
    img.src = url;
  });
};

const canvasToBlob = (canvas: HTMLCanvasElement, mimeType: string, quality?: number): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob);
        else reject(new Error('Canvas to Blob failed'));
      },
      mimeType,
      quality
    );
  });
};

const generateNewFileName = (originalName: string, newExt: string, suffix: string = ''): string => {
  const parts = originalName.split('.');
  parts.pop();
  return `${parts.join('.')}${suffix}.${newExt}`;
};

export async function processImage(
  file: File,
  toolSlug: string,
  options: ProcessOptions = {}
): Promise<ProcessResult> {
  const result: ProcessResult = {
    fileName: file.name,
    originalSize: file.size,
  };

  try {
    switch (toolSlug) {
      case 'image-compressor': {
        const imageCompression = (await import('browser-image-compression')).default;
        const compressedFile = await imageCompression(file, {
          maxSizeMB: options.quality ? options.quality / 100 : 1,
          useWebWorker: true,
        });
        result.blob = compressedFile;
        result.newSize = compressedFile.size;
        result.format = compressedFile.type;
        result.fileName = generateNewFileName(file.name, getExtension(compressedFile.type), '-compressed');
        break;
      }

      case 'image-resizer': {
        const img = await loadImage(file);
        let { width = img.width, height = img.height } = options;

        if (options.maintainAspectRatio) {
          const ratio = img.width / img.height;
          if (options.width && !options.height) {
            height = Math.round(options.width / ratio);
          } else if (options.height && !options.width) {
            width = Math.round(options.height * ratio);
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) throw new Error('Could not get canvas context');
        ctx.drawImage(img, 0, 0, width, height);
        
        result.blob = await canvasToBlob(canvas, file.type, options.quality);
        result.width = width;
        result.height = height;
        result.fileName = generateNewFileName(file.name, getExtension(file.type), `-${width}x${height}`);
        break;
      }

      case 'image-cropper': {
        const img = await loadImage(file);
        const { cropX = 0, cropY = 0, cropWidth = img.width, cropHeight = img.height } = options;
        
        const canvas = document.createElement('canvas');
        canvas.width = cropWidth;
        canvas.height = cropHeight;
        const ctx = canvas.getContext('2d');
        if (!ctx) throw new Error('Could not get canvas context');
        ctx.drawImage(img, cropX, cropY, cropWidth, cropHeight, 0, 0, cropWidth, cropHeight);
        
        result.blob = await canvasToBlob(canvas, file.type, options.quality);
        result.width = cropWidth;
        result.height = cropHeight;
        result.fileName = generateNewFileName(file.name, getExtension(file.type), '-cropped');
        break;
      }

      case 'background-remover': {
        const img = await loadImage(file);
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) throw new Error('Could not get canvas context');
        ctx.drawImage(img, 0, 0);

        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imgData.data;
        const r = data[0], g = data[1], b = data[2]; 
        const tolerance = 25;

        for (let i = 0; i < data.length; i += 4) {
          if (Math.abs(data[i] - r) <= tolerance &&
              Math.abs(data[i+1] - g) <= tolerance &&
              Math.abs(data[i+2] - b) <= tolerance) {
            data[i+3] = 0; 
          }
        }
        ctx.putImageData(imgData, 0, 0);
        
        result.blob = await canvasToBlob(canvas, 'image/png');
        result.fileName = generateNewFileName(file.name, 'png', '-nobg');
        break;
      }

      case 'jpg-to-png':
      case 'png-to-jpg':
      case 'jpg-to-webp':
      case 'png-to-webp':
      case 'webp-to-jpg':
      case 'webp-to-png':
      case 'avif-to-jpg':
      case 'avif-to-png':
      case 'svg-to-png':
      case 'image-converter': {
        const targetExt = toolSlug === 'image-converter' 
          ? (options.outputFormat || 'jpg').toLowerCase()
          : toolSlug.split('-to-')[1];
          
        const targetMime = getMimeType(targetExt);
        const img = await loadImage(file);
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) throw new Error('Could not get canvas context');
        
        if (targetMime === 'image/jpeg') {
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
        ctx.drawImage(img, 0, 0);
        
        result.blob = await canvasToBlob(canvas, targetMime, options.quality);
        result.fileName = generateNewFileName(file.name, targetExt);
        break;
      }

      case 'heic-to-jpg':
      case 'heic-to-png': {
        const targetExt = toolSlug.split('-to-')[1];
        const targetMime = getMimeType(targetExt);
        const heic2any = (await import('heic2any')).default;
        const converted = await heic2any({
          blob: file,
          toType: targetMime,
          quality: options.quality,
        });
        
        result.blob = Array.isArray(converted) ? converted[0] : converted;
        result.fileName = generateNewFileName(file.name, targetExt);
        break;
      }

      case 'image-rotator': {
        const img = await loadImage(file);
        const angle = options.angle || 90;
        const rad = (angle * Math.PI) / 180;
        const canvas = document.createElement('canvas');
        
        const isOrthogonal = angle % 180 !== 0;
        canvas.width = isOrthogonal ? img.height : img.width;
        canvas.height = isOrthogonal ? img.width : img.height;
        
        const ctx = canvas.getContext('2d');
        if (!ctx) throw new Error('Could not get canvas context');
        
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate(rad);
        ctx.drawImage(img, -img.width / 2, -img.height / 2);
        
        result.blob = await canvasToBlob(canvas, file.type, options.quality);
        result.fileName = generateNewFileName(file.name, getExtension(file.type), '-rotated');
        break;
      }

      case 'image-flipper': {
        const img = await loadImage(file);
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) throw new Error('Could not get canvas context');
        
        ctx.translate(options.flipHorizontal ? img.width : 0, options.flipVertical ? img.height : 0);
        ctx.scale(options.flipHorizontal ? -1 : 1, options.flipVertical ? -1 : 1);
        ctx.drawImage(img, 0, 0);
        
        result.blob = await canvasToBlob(canvas, file.type, options.quality);
        result.fileName = generateNewFileName(file.name, getExtension(file.type), '-flipped');
        break;
      }

      case 'exif-metadata-viewer': {
        const exifr = (await import('exifr')).default;
        const metadata = await exifr.parse(file, true);
        result.metadata = metadata || { error: 'No EXIF data found' };
        break;
      }

      case 'exif-metadata-remover': {
        const img = await loadImage(file);
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) throw new Error('Could not get canvas context');
        ctx.drawImage(img, 0, 0);
        
        result.blob = await canvasToBlob(canvas, file.type, options.quality);
        result.fileName = generateNewFileName(file.name, getExtension(file.type), '-noexif');
        break;
      }

      case 'color-picker-from-image': {
        const img = await loadImage(file);
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) throw new Error('Could not get canvas context');
        ctx.drawImage(img, 0, 0);
        
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imgData.data;
        const colorCounts: Record<string, number> = {};
        
        for (let i = 0; i < data.length; i += 40) { 
          const r = data[i], g = data[i+1], b = data[i+2], a = data[i+3];
          if (a > 127) {
            const hex = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
            colorCounts[hex] = (colorCounts[hex] || 0) + 1;
          }
        }
        
        const topColors = Object.entries(colorCounts)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 8)
          .map(([hex]) => {
            const r = parseInt(hex.slice(1, 3), 16);
            const g = parseInt(hex.slice(3, 5), 16);
            const b = parseInt(hex.slice(5, 7), 16);
            return { hex, rgb: `rgb(${r}, ${g}, ${b})` };
          });
          
        result.colors = topColors;
        break;
      }

      case 'image-to-pdf': {
        const { PDFDocument } = await import('pdf-lib');
        const img = await loadImage(file);
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) throw new Error('Could not get canvas context');
        ctx.drawImage(img, 0, 0);
        const jpgBytes = await (await canvasToBlob(canvas, 'image/jpeg')).arrayBuffer();
        
        const pdfDoc = await PDFDocument.create();
        const pdfImage = await pdfDoc.embedJpg(jpgBytes);
        const page = pdfDoc.addPage([pdfImage.width, pdfImage.height]);
        page.drawImage(pdfImage, { x: 0, y: 0, width: pdfImage.width, height: pdfImage.height });
        
        const pdfBytes = await pdfDoc.save();
        result.blob = new Blob([pdfBytes as unknown as BlobPart], { type: 'application/pdf' });
        result.fileName = generateNewFileName(file.name, 'pdf');
        break;
      }

      case 'pdf-to-image': {
        const { PDFDocument } = await import('pdf-lib');
        const pdfDoc = await PDFDocument.load(await file.arrayBuffer());
        const pages = pdfDoc.getPages();
        const extractedPages = [];
        
        for (let i = 0; i < pages.length; i++) {
          const page = pages[i];
          const canvas = document.createElement('canvas');
          canvas.width = page.getWidth();
          canvas.height = page.getHeight();
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.fillStyle = '#E5E7EB'; 
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#000000';
            ctx.font = '24px Arial';
            ctx.fillText(`PDF Page ${i + 1} Preview`, 20, 50);
          }
          const blob = await canvasToBlob(canvas, 'image/jpeg');
          extractedPages.push({
            page: i + 1,
            blob,
            url: URL.createObjectURL(blob),
          });
        }
        result.pages = extractedPages;
        break;
      }

      case 'bulk-image-converter': {
        if (!options.files || options.files.length === 0) throw new Error('No files provided');
        
        const JSZip = (await import('jszip')).default;
        const zip = new JSZip();
        const targetExt = (options.outputFormat || 'jpg').toLowerCase();
        const targetMime = getMimeType(targetExt);
        
        for (const f of options.files) {
          const img = await loadImage(f);
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            if (targetMime === 'image/jpeg') {
              ctx.fillStyle = '#FFFFFF';
              ctx.fillRect(0, 0, canvas.width, canvas.height);
            }
            ctx.drawImage(img, 0, 0);
            const blob = await canvasToBlob(canvas, targetMime, options.quality);
            zip.file(generateNewFileName(f.name, targetExt), blob);
          }
        }
        
        result.blob = await zip.generateAsync({ type: 'blob' });
        result.fileName = 'converted-images.zip';
        result.format = 'application/zip';
        break;
      }

      case 'social-media-image-resizer': {
        const presets: Record<string, { w: number, h: number }> = {
          'instagram-post': { w: 1080, h: 1080 },
          'instagram-story': { w: 1080, h: 1920 },
          'facebook-post': { w: 1200, h: 630 },
          'facebook-cover': { w: 820, h: 312 },
          'twitter-post': { w: 1200, h: 675 },
          'linkedin-post': { w: 1200, h: 627 },
          'youtube-thumbnail': { w: 1280, h: 720 },
          'pinterest-pin': { w: 1000, h: 1500 },
        };
        
        const dimensions = presets[options.preset || 'instagram-post'] || presets['instagram-post'];
        const img = await loadImage(file);
        const canvas = document.createElement('canvas');
        canvas.width = dimensions.w;
        canvas.height = dimensions.h;
        const ctx = canvas.getContext('2d');
        if (!ctx) throw new Error('Could not get canvas context');
        
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        const scale = Math.min(canvas.width / img.width, canvas.height / img.height);
        const x = (canvas.width / 2) - (img.width / 2) * scale;
        const y = (canvas.height / 2) - (img.height / 2) * scale;
        ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
        
        result.blob = await canvasToBlob(canvas, file.type, options.quality);
        result.width = canvas.width;
        result.height = canvas.height;
        result.fileName = generateNewFileName(file.name, getExtension(file.type), `-${options.preset}`);
        break;
      }

      default:
        throw new Error(`Tool ${toolSlug} is not supported yet.`);
    }

    if (result.blob && !result.url) {
      result.url = URL.createObjectURL(result.blob);
      result.newSize = result.blob.size;
    }
  } catch (err: unknown) {
    if (err instanceof Error) {
      result.error = err.message;
    } else {
      result.error = 'An unknown error occurred';
    }
  }

  return result;
}
