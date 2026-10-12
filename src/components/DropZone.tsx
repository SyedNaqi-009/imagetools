'use client';

import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud, FileImage, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { formatBytes } from '@/lib/utils';

interface DropZoneProps {
  onFileSelect: (file: File) => void;
  acceptedFormats: string[];
  multiple?: boolean;
  onMultipleFiles?: (files: File[]) => void;
  selectedFile?: File | null;
}

export default function DropZone({
  onFileSelect,
  acceptedFormats,
  multiple,
  onMultipleFiles,
  selectedFile,
}: DropZoneProps) {
  const onDrop = useCallback(
    (accepted: File[]) => {
      if (multiple && onMultipleFiles) {
        onMultipleFiles(accepted);
      } else if (accepted.length > 0) {
        onFileSelect(accepted[0]);
      }
    },
    [onFileSelect, multiple, onMultipleFiles]
  );

  const accept: Record<string, string[]> = {};
  acceptedFormats.forEach((fmt) => {
    const mime =
      fmt === '.jpg' || fmt === '.jpeg' ? 'image/jpeg' :
      fmt === '.png' ? 'image/png' :
      fmt === '.webp' ? 'image/webp' :
      fmt === '.avif' ? 'image/avif' :
      fmt === '.heic' || fmt === '.heif' ? 'image/heic' :
      fmt === '.svg' ? 'image/svg+xml' :
      fmt === '.tiff' ? 'image/tiff' :
      fmt === '.pdf' ? 'application/pdf' : 'image/*';
    if (!accept[mime]) accept[mime] = [];
    accept[mime].push(fmt);
  });

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    multiple: !!multiple,
  });

  return (
    <div
      {...getRootProps()}
      className={`group relative overflow-hidden rounded-2xl border-2 border-dashed p-8 md:p-10 text-center cursor-pointer transition-all duration-300 ${
        isDragActive
          ? 'border-sky-500 bg-sky-50/70 dark:bg-sky-950/30 scale-[1.01]'
          : 'border-slate-300 dark:border-slate-700/80 hover:border-sky-500/70 dark:hover:border-sky-500/70 bg-slate-50/60 dark:bg-slate-900/40 hover:bg-white dark:hover:bg-[#111827]'
      }`}
    >
      <input {...getInputProps()} />

      {/* Decorative Corner Target Accents */}
      <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-slate-300 dark:border-slate-700 group-hover:border-sky-500 transition-colors" />
      <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-slate-300 dark:border-slate-700 group-hover:border-sky-500 transition-colors" />
      <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-slate-300 dark:border-slate-700 group-hover:border-sky-500 transition-colors" />
      <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-slate-300 dark:border-slate-700 group-hover:border-sky-500 transition-colors" />

      {selectedFile ? (
        <div className="flex flex-col items-center animate-in fade-in duration-200">
          <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-500 mb-3 shadow-inner">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <p className="font-bold text-slate-800 dark:text-slate-100 text-base max-w-sm truncate">
            {selectedFile.name}
          </p>
          <div className="mt-1 flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
            <span className="px-2 py-0.5 rounded bg-slate-200/80 dark:bg-slate-800 font-semibold text-slate-700 dark:text-slate-300">
              {formatBytes(selectedFile.size)}
            </span>
            <span>• Ready for processing</span>
          </div>
          <p className="text-[11px] text-sky-500 dark:text-sky-400 mt-3 font-medium underline">
            Click or drop another file to replace
          </p>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 rounded-2xl bg-sky-500/10 dark:bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-500 dark:text-sky-400 mb-4 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-sky-500/20 transition-all duration-300">
            <UploadCloud className="w-8 h-8" />
          </div>
          <p className="font-bold text-slate-800 dark:text-slate-100 text-lg">
            {isDragActive ? 'Release to Load Image' : 'Select or Drop Images to Begin'}
          </p>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-md">
            Files execute inside browser RAM. No bytes leave your system.
          </p>

          {/* Formats Chip */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-1.5 max-w-lg">
            {acceptedFormats.map((fmt) => (
              <span
                key={fmt}
                className="text-[10px] font-mono font-semibold uppercase px-2 py-0.5 rounded-md bg-slate-200/60 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-300/40 dark:border-slate-700/60"
              >
                {fmt.replace('.', '')}
              </span>
            ))}
          </div>

          <div className="mt-4 inline-flex items-center gap-1.5 text-[11px] font-mono text-emerald-600 dark:text-emerald-400">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Encrypted local runtime • 0 server hops</span>
          </div>
        </div>
      )}
    </div>
  );
}
