'use client';

import { useState } from 'react';
import { Download, Loader2, RotateCcw, Sliders, CheckCircle2, FileImage, Sparkles, AlertCircle, Copy, Check } from 'lucide-react';
import DropZone from './DropZone';
import { processImage, type ProcessOptions, type ProcessResult } from '@/lib/processors';
import { formatBytes } from '@/lib/utils';

const socialPresets = [
  { label: 'Instagram Square (1080×1080)', value: 'instagram-post', aspect: '1:1' },
  { label: 'Instagram Story (1080×1920)', value: 'instagram-story', aspect: '9:16' },
  { label: 'Facebook Feed (1200×630)', value: 'facebook-post', aspect: '1.91:1' },
  { label: 'Facebook Cover (820×312)', value: 'facebook-cover', aspect: '2.6:1' },
  { label: 'Twitter / X Banner (1200×675)', value: 'twitter-post', aspect: '16:9' },
  { label: 'LinkedIn Post (1200×627)', value: 'linkedin-post', aspect: '1.91:1' },
  { label: 'YouTube Thumbnail (1280×720)', value: 'youtube-thumbnail', aspect: '16:9' },
  { label: 'Pinterest Pin (1000×1500)', value: 'pinterest-pin', aspect: '2:3' },
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
  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  const [options, setOptions] = useState<ProcessOptions>({
    quality: 82,
    width: 1200,
    height: 800,
    maintainAspectRatio: true,
    cropX: 0,
    cropY: 0,
    cropWidth: 600,
    cropHeight: 600,
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
      setError(err instanceof Error ? err.message : 'Processing failed. Please check image constraints.');
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

  const copyHex = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedColor(hex);
    setTimeout(() => setCopiedColor(null), 1500);
  };

  const renderOptions = () => {
    switch (toolSlug) {
      case 'image-compressor':
        return (
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Target Compression Quality
              </label>
              <span className="text-sm font-mono font-bold text-sky-500 bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/20">
                {options.quality}%
              </span>
            </div>
            <input
              type="range"
              min={10}
              max={100}
              value={options.quality}
              onChange={(e) => setOptions({ ...options, quality: Number(e.target.value) })}
              className="w-full accent-sky-500 cursor-pointer"
            />
            <div className="flex justify-between text-[11px] font-mono text-slate-400">
              <span>Extreme Small (10%)</span>
              <span>Recommended (80-85%)</span>
              <span>Near Lossless (100%)</span>
            </div>
          </div>
        );

      case 'image-resizer':
        return (
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-mono uppercase text-slate-600 dark:text-slate-400 mb-1">
                  Width (px)
                </label>
                <input
                  type="number"
                  value={options.width}
                  onChange={(e) => setOptions({ ...options, width: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-mono uppercase text-slate-600 dark:text-slate-400 mb-1">
                  Height (px)
                </label>
                <input
                  type="number"
                  value={options.height}
                  onChange={(e) => setOptions({ ...options, height: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-mono"
                />
              </div>
            </div>
            <label className="flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={options.maintainAspectRatio}
                onChange={(e) => setOptions({ ...options, maintainAspectRatio: e.target.checked })}
                className="rounded accent-sky-500 w-4 h-4"
              />
              <span>Lock original aspect ratio constraint</span>
            </label>
          </div>
        );

      case 'image-cropper':
        return (
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800">
            <span className="block text-xs font-mono uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-3">
              Crop Coordinates &amp; Box
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {(['cropX', 'cropY', 'cropWidth', 'cropHeight'] as const).map((key) => (
                <div key={key}>
                  <label className="block text-[11px] font-mono text-slate-500 mb-1">
                    {key.replace('crop', '')} (px)
                  </label>
                  <input
                    type="number"
                    value={options[key]}
                    onChange={(e) => setOptions({ ...options, [key]: Number(e.target.value) })}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-mono"
                  />
                </div>
              ))}
            </div>
          </div>
        );

      case 'image-rotator':
        return (
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 space-y-3">
            <span className="block text-xs font-mono uppercase tracking-wider text-slate-600 dark:text-slate-400">
              Angle Transformation
            </span>
            <div className="flex gap-2">
              {[90, 180, 270].map((a) => (
                <button
                  key={a}
                  onClick={() => setOptions({ ...options, angle: a })}
                  className={`flex-1 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                    options.angle === a
                      ? 'bg-sky-500 text-white shadow-sm'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {a}° Rotate
                </button>
              ))}
            </div>
          </div>
        );

      case 'image-flipper':
        return (
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 space-y-3">
            <span className="block text-xs font-mono uppercase tracking-wider text-slate-600 dark:text-slate-400">
              Axis Inversion
            </span>
            <div className="flex gap-3">
              <button
                onClick={() => setOptions({ ...options, flipHorizontal: true, flipVertical: false })}
                className={`flex-1 py-2.5 rounded-xl text-xs font-semibold ${
                  options.flipHorizontal && !options.flipVertical
                    ? 'bg-sky-500 text-white'
                    : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700'
                }`}
              >
                Horizontal Mirror
              </button>
              <button
                onClick={() => setOptions({ ...options, flipHorizontal: false, flipVertical: true })}
                className={`flex-1 py-2.5 rounded-xl text-xs font-semibold ${
                  options.flipVertical && !options.flipHorizontal
                    ? 'bg-sky-500 text-white'
                    : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700'
                }`}
              >
                Vertical Mirror
              </button>
            </div>
          </div>
        );

      case 'image-converter':
      case 'bulk-image-converter':
        return (
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800">
            <label className="block text-xs font-mono uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">
              Select Output Image Format
            </label>
            <select
              value={options.outputFormat}
              onChange={(e) => setOptions({ ...options, outputFormat: e.target.value })}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-semibold text-slate-800 dark:text-slate-200 outline-none"
            >
              <option value="png">PNG — Transparent &amp; Crisp Graphics</option>
              <option value="jpg">JPG — Standard Photo Compression</option>
              <option value="webp">WebP — Next-Gen High Efficiency Web Format</option>
            </select>
          </div>
        );

      case 'social-media-image-resizer':
        return (
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800">
            <label className="block text-xs font-mono uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">
              Platform Template Presets
            </label>
            <select
              value={options.preset}
              onChange={(e) => setOptions({ ...options, preset: e.target.value })}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-semibold text-slate-800 dark:text-slate-200 outline-none"
            >
              {socialPresets.map((p) => (
                <option key={p.value} value={p.value}>
                  {p.label} [{p.aspect}]
                </option>
              ))}
            </select>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="relative rounded-3xl bg-white dark:bg-[#111827] border border-slate-200/90 dark:border-slate-800 shadow-xl overflow-hidden my-6">
      {/* Workbench Header */}
      <div className="px-6 py-4 bg-slate-50/80 dark:bg-slate-900/80 border-b border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Local Execution Console
          </span>
        </div>
        <span className="text-[11px] font-mono text-slate-400">
          Status: {loading ? 'Computing...' : result ? 'Complete' : 'Awaiting Input'}
        </span>
      </div>

      <div className="p-6 md:p-8">
        {!result && (
          <div className="space-y-6">
            <DropZone
              onFileSelect={setFile}
              acceptedFormats={acceptedFormats}
              selectedFile={file}
              multiple={isBulk}
              onMultipleFiles={setFiles}
            />

            {isBulk && files.length > 0 && (
              <div className="p-3 rounded-xl bg-sky-50 dark:bg-sky-950/40 border border-sky-500/20 text-xs text-sky-700 dark:text-sky-300 font-mono">
                {files.length} images queued for batch transformation
              </div>
            )}

            {renderOptions()}

            <button
              onClick={handleProcess}
              disabled={loading || (!file && !isBulk) || (isBulk && files.length === 0)}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 disabled:from-slate-300 disabled:to-slate-300 dark:disabled:from-slate-800 dark:disabled:to-slate-800 text-white font-bold text-sm tracking-wide shadow-lg shadow-sky-500/20 hover:shadow-sky-500/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Processing in Browser Memory...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  <span>Execute {toolSlug.replace(/-/g, ' ').toUpperCase()}</span>
                </>
              )}
            </button>
          </div>
        )}

        {/* Error Feedback */}
        {error && (
          <div className="mt-4 p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-500/30 flex items-start gap-3 text-rose-700 dark:text-rose-300 text-xs sm:text-sm">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <div className="flex-1">
              <span className="font-bold">Error:</span> {error}
              <button onClick={handleReset} className="block mt-1 font-semibold underline">
                Reset and try another file
              </button>
            </div>
          </div>
        )}

        {/* Results Workspace */}
        {result && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-sm">
                <CheckCircle2 className="w-5 h-5" />
                <span>Processing Finished Successfully</span>
              </div>
              <button
                onClick={handleReset}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-400 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Transform Another
              </button>
            </div>

            {/* Image Preview Container */}
            {result.url && result.blob && result.blob.type.startsWith('image/') && (
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={result.url}
                  alt="Transformed result preview"
                  className="max-h-80 max-w-full rounded-xl shadow-md border border-slate-200 dark:border-slate-700 object-contain"
                  loading="lazy"
                />
              </div>
            )}

            {/* Performance Metrics Stats Card */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <span className="text-[11px] font-mono uppercase text-slate-400">Original Size</span>
                <p className="font-mono font-bold text-base text-slate-800 dark:text-slate-100 mt-0.5">
                  {formatBytes(result.originalSize)}
                </p>
              </div>

              {result.newSize !== undefined && (
                <div className="p-3.5 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-500/20">
                  <span className="text-[11px] font-mono uppercase text-emerald-600 dark:text-emerald-400">
                    Result Size
                  </span>
                  <p className="font-mono font-bold text-base text-emerald-700 dark:text-emerald-300 mt-0.5">
                    {formatBytes(result.newSize)}
                    {result.originalSize > result.newSize && (
                      <span className="ml-1.5 text-xs font-normal">
                        (-{Math.round(((result.originalSize - result.newSize) / result.originalSize) * 100)}%)
                      </span>
                    )}
                  </p>
                </div>
              )}

              <div className="col-span-2 sm:col-span-1 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <span className="text-[11px] font-mono uppercase text-slate-400">Output Target</span>
                <p className="font-mono font-bold text-sm text-slate-800 dark:text-slate-100 mt-0.5 truncate">
                  {result.fileName}
                </p>
              </div>
            </div>

            {/* EXIF Metadata Table Presentation */}
            {result.metadata && (
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                <div className="px-4 py-2 bg-slate-100 dark:bg-slate-800/80 font-mono text-xs font-bold text-slate-700 dark:text-slate-300">
                  EXIF Tag Manifest ({Object.keys(result.metadata).length} tags)
                </div>
                <div className="max-h-60 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800 text-xs">
                  {Object.entries(result.metadata).map(([key, val]) => (
                    <div key={key} className="flex px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-800/40">
                      <span className="w-1/3 font-mono font-semibold text-slate-600 dark:text-slate-400 truncate">
                        {key}
                      </span>
                      <span className="w-2/3 font-mono text-slate-800 dark:text-slate-200 truncate">
                        {String(val)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Extracted Color Palette Palette presentation */}
            {result.colors && (
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
                  Dominant Extracted Palette (Click to copy HEX)
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {result.colors.map((color, idx) => (
                    <button
                      key={idx}
                      onClick={() => copyHex(color.hex)}
                      className="group flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-sky-500 transition-all text-left"
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className="w-6 h-6 rounded-lg border border-black/10 shadow-sm"
                          style={{ backgroundColor: color.hex }}
                        />
                        <span className="font-mono text-xs font-semibold text-slate-800 dark:text-slate-200">
                          {color.hex}
                        </span>
                      </div>
                      {copiedColor === color.hex ? (
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                      ) : (
                        <Copy className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 text-slate-400" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Download CTA Action */}
            {result.url && (
              <button
                onClick={handleDownload}
                className="w-full py-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm tracking-wide shadow-lg shadow-emerald-600/20 hover:shadow-emerald-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-5 h-5" />
                <span>Save {result.fileName}</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
