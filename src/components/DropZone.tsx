'use client';

import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload } from 'lucide-react';
import { formatBytes } from '@/lib/utils';

interface DropZoneProps {
  onFileSelect: (file: File) => void;
  acceptedFormats: string[];
  multiple?: boolean;
  onMultipleFiles?: (files: File[]) => void;
  selectedFile?: File | null;
}

export default function DropZone({ onFileSelect, acceptedFormats, multiple, onMultipleFiles, selectedFile }: DropZoneProps) {
  const onDrop = useCallback((accepted: File[]) => {
    if (multiple && onMultipleFiles) {
      onMultipleFiles(accepted);
    } else if (accepted.length > 0) {
      onFileSelect(accepted[0]);
    }
  }, [onFileSelect, multiple, onMultipleFiles]);

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
      className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
        isDragActive
          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
          : 'border-slate-300 dark:border-slate-600 hover:border-blue-400 dark:hover:border-blue-500 bg-slate-50 dark:bg-slate-800/50'
      }`}
    >
      <input {...getInputProps()} />
      <Upload className="w-8 h-8 mx-auto mb-3 text-slate-400" />
      {selectedFile ? (
        <div>
          <p className="font-medium text-slate-700 dark:text-slate-300">{selectedFile.name}</p>
          <p className="text-sm text-slate-500 mt-1">{formatBytes(selectedFile.size)}</p>
        </div>
      ) : (
        <div>
          <p className="font-medium text-slate-700 dark:text-slate-300">
            {isDragActive ? 'Drop your file here' : 'Drag & drop your image here'}
          </p>
          <p className="text-sm text-slate-500 mt-1">or click to browse • Accepts {acceptedFormats.join(', ')}</p>
        </div>
      )}
    </div>
  );
}
