'use client';

import { useState } from 'react';
import { Download, Loader2, RotateCcw } from 'lucide-react';
import DropZone from './DropZone';
import { processImage, type ProcessOptions, type ProcessResult } from '@/lib/processors';
import { formatBytes } from '@/lib/utils';

const socialPresets = [
  { label: 'Instagram Post', value: 'instagram-post' },
  { label: 'Instagram Story', value: 'instagram-story' },
  { label: 'Facebook Post', value: 'facebook-post' },
  { label: 'Facebook Cover', value: 'facebook-cover' },
  { label: 'Twitter Post', value: 'twitter-post' },
  { label: 'LinkedIn Post', value: 'linkedin-post' },
  { label: 'YouTube Thumbnail', value: 'youtube-thumbnail' },
  { label: 'Pinterest Pin', value: 'pinterest-pin' },
];

interface ToolInterfaceProps {
  toolSlug: string;
  acceptedFormats: string[];
}

export default function ToolInterface({ toolSlug, acceptedFormats }: ToolInterfaceProps) {
  const [file, setFile] = useState<File | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [result, setResult] = useState<ProcessResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [options, setOptions] = useState<ProcessOptions>({
    quality: 80,
    width: 800,
    height: 600,
    maintainAspectRatio: true,
    cropX: 0,
    cropY: 0,
    cropWidth: 400,
    cropHeight: 400,
    outputFormat: 'png',
    angle: 90,
    flipHorizontal: true,
    flipVertical: false,
    preset: 'instagram-post',
  });

  const isBulk = toolSlug === 'bulk-image-converter';

  const handleProcess = async () => {
    if (!file && !isBulk) return;
    if (isBulk && files.length === 0) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const processFile = isBulk ? files[0] : file!;
      const res = await processImage(processFile, toolSlug, { ...options, files: isBulk ? files : undefined });
      if (res.error) {
        setError(res.error);
      } else {
        setResult(res);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Processing failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!result?.url) return;
    const a = document.createElement('a');
    a.href = result.url;
    a.download = result.fileName;
    a.click();
  };

  const handleReset = () => {
    setFile(null);
    setFiles([]);
    setResult(null);
    setError(null);
  };

  const renderOptions = () => {
    switch (toolSlug) {
      case 'image-compressor':
        return (
          <div className="space-y-3">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Quality: {options.quality}%
            </label>
            <input type="range" min={10} max={100} value={options.quality} onChange={(e) => setOptions({ ...options, quality: Number(e.target.value) })} className="w-full" />
          </div>
        );
      case 'image-resizer':
        return (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Width</label>
                <input type="number" value={options.width} onChange={(e) => setOptions({ ...options, width: Number(e.target.value) })} className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Height</label>
                <input type="number" value={options.height} onChange={(e) => setOptions({ ...options, height: Number(e.target.value) })} className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm" />
              </div>
            </div>
            <label className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
              <input type="checkbox" checked={options.maintainAspectRatio} onChange={(e) => setOptions({ ...options, maintainAspectRatio: e.target.checked })} className="rounded" />
              Maintain aspect ratio
            </label>
          </div>
        );
      case 'image-cropper':
        return (
          <div className="grid grid-cols-2 gap-3">
            {(['cropX', 'cropY', 'cropWidth', 'cropHeight'] as const).map((key) => (
              <div key={key}>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{key.replace('crop', '')}</label>
                <input type="number" value={options[key]} onChange={(e) => setOptions({ ...options, [key]: Number(e.target.value) })} className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm" />
              </div>
            ))}
          </div>
        );
      case 'image-rotator':
        return (
          <div className="space-y-3">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Rotation Angle</label>
            <div className="flex gap-2">
              {[90, 180, 270].map((a) => (
                <button key={a} onClick={() => setOptions({ ...options, angle: a })} className={`px-4 py-2 rounded-lg text-sm font-medium ${options.angle === a ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'}`}>
                  {a}°
                </button>
              ))}
            </div>
            <input type="number" value={options.angle} onChange={(e) => setOptions({ ...options, angle: Number(e.target.value) })} placeholder="Custom angle" className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm" />
          </div>
        );
      case 'image-flipper':
        return (
          <div className="flex gap-3">
            <button onClick={() => setOptions({ ...options, flipHorizontal: true, flipVertical: false })} className={`px-4 py-2 rounded-lg text-sm font-medium ${options.flipHorizontal ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800'}`}>Horizontal</button>
            <button onClick={() => setOptions({ ...options, flipHorizontal: false, flipVertical: true })} className={`px-4 py-2 rounded-lg text-sm font-medium ${options.flipVertical ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800'}`}>Vertical</button>
          </div>
        );
      case 'image-converter':
        return (
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Output Format</label>
            <select value={options.outputFormat} onChange={(e) => setOptions({ ...options, outputFormat: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm">
              {['png', 'jpg', 'webp'].map((f) => <option key={f} value={f}>{f.toUpperCase()}</option>)}
            </select>
          </div>
        );
      case 'social-media-image-resizer':
        return (
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Platform Preset</label>
            <select value={options.preset} onChange={(e) => setOptions({ ...options, preset: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm">
              {socialPresets.map((p) => <option key={p.value} value={p.value}>{p.label}</option>)}
            </select>
          </div>
        );
      case 'bulk-image-converter':
        return (
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Output Format</label>
            <select value={options.outputFormat} onChange={(e) => setOptions({ ...options, outputFormat: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm">
              {['png', 'jpg', 'webp'].map((f) => <option key={f} value={f}>{f.toUpperCase()}</option>)}
            </select>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl p-6 my-8">
      {!result && (
        <>
          <DropZone
            onFileSelect={setFile}
            acceptedFormats={acceptedFormats}
            selectedFile={file}
            multiple={isBulk}
            onMultipleFiles={setFiles}
          />
          {isBulk && files.length > 0 && (
            <p className="text-sm text-slate-500 mt-2">{files.length} files selected</p>
          )}
          <div className="mt-6">{renderOptions()}</div>
          <button
            onClick={handleProcess}
            disabled={loading || (!file && !isBulk) || (isBulk && files.length === 0)}
            className="mt-6 w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 dark:disabled:bg-slate-700 text-white font-medium transition-colors flex items-center justify-center gap-2"
          >
            {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Processing...</> : 'Process Image'}
          </button>
        </>
      )}

      {error && (
        <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400 text-sm">
          {error}
          <button onClick={handleReset} className="ml-2 underline">Try again</button>
        </div>
      )}

      {result && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-slate-900 dark:text-slate-100">Result</h3>
            <button onClick={handleReset} className="flex items-center gap-1 text-sm text-slate-500 hover:text-slate-700">
              <RotateCcw className="w-3 h-3" /> Process another
            </button>
          </div>

          {result.url && result.blob && result.blob.type.startsWith('image/') && (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img src={result.url} alt="Processed" className="max-h-64 mx-auto rounded-lg border border-slate-200 dark:border-slate-700" loading="lazy" />
          )}

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
              <p className="text-slate-500">Original</p>
              <p className="font-medium text-slate-900 dark:text-slate-100">{formatBytes(result.originalSize)}</p>
            </div>
            {result.newSize !== undefined && (
              <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <p className="text-slate-500">New Size</p>
                <p className="font-medium text-green-700 dark:text-green-400">{formatBytes(result.newSize)}</p>
              </div>
            )}
          </div>

          {result.metadata && (
            <div className="overflow-auto max-h-64 border border-slate-200 dark:border-slate-700 rounded-lg">
              <table className="w-full text-sm">
                <tbody>
                  {Object.entries(result.metadata).map(([key, value]) => (
                    <tr key={key} className="border-b border-slate-100 dark:border-slate-700">
                      <td className="px-3 py-2 font-medium text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/50">{key}</td>
                      <td className="px-3 py-2 text-slate-600 dark:text-slate-400">{String(value)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {result.colors && (
            <div className="flex flex-wrap gap-2">
              {result.colors.map((color, i) => (
                <div key={i} className="flex items-center gap-2 px-3 py-2 bg-slate-50 dark:bg-slate-800 rounded-lg text-sm">
                  <div className="w-6 h-6 rounded-full border border-slate-200 dark:border-slate-600" style={{ backgroundColor: color.hex }} />
                  <span className="font-mono text-xs">{color.hex}</span>
                </div>
              ))}
            </div>
          )}

          {result.url && (
            <button onClick={handleDownload} className="w-full py-3 rounded-lg bg-green-600 hover:bg-green-700 text-white font-medium transition-colors flex items-center justify-center gap-2">
              <Download className="w-4 h-4" /> Download {result.fileName}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
