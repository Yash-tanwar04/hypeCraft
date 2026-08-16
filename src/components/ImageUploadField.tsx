import React, { useState, useRef } from 'react';
import { Upload, Link as LinkIcon, X, Image as ImageIcon, Check } from 'lucide-react';
import { handleImageError } from '../utils/imageUtils';

interface ImageUploadFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  helpText?: string;
  aspectRatio?: string;
}

export const ImageUploadField: React.FC<ImageUploadFieldProps> = ({
  label,
  value,
  onChange,
  required = false,
  helpText = 'Upload an image from your local computer or enter an external image URL.',
  aspectRatio = 'aspect-16/10',
}) => {
  const [activeTab, setActiveTab] = useState<'upload' | 'url'>('upload');
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Compress & convert file to data URL
  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setErrorMessage('Please select a valid image file (PNG, JPG, WEBP, SVG).');
      return;
    }

    setErrorMessage(null);
    setIsProcessing(true);

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (!result) {
        setIsProcessing(false);
        return;
      }

      // If it's an SVG or small file (< 800KB), use direct data URL
      if (file.type === 'image/svg+xml' || file.size < 800 * 1024) {
        onChange(result);
        setIsProcessing(false);
        return;
      }

      // Otherwise, compress gently using canvas
      const img = new Image();
      img.onload = () => {
        const maxWidth = 1600;
        const maxHeight = 1200;
        let width = img.width;
        let height = img.height;

        if (width > maxWidth || height > maxHeight) {
          if (width / height > maxWidth / maxHeight) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.88);
          onChange(compressedDataUrl);
        } else {
          onChange(result);
        }
        setIsProcessing(false);
      };
      img.onerror = () => {
        onChange(result);
        setIsProcessing(false);
      };
      img.src = result;
    };
    reader.onerror = () => {
      setErrorMessage('Failed to read file from local storage.');
      setIsProcessing(false);
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleClear = () => {
    onChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block font-bold uppercase text-[10px] text-[#071936] tracking-wider">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        
        {/* Toggle between Local Upload and URL */}
        <div className="flex items-center gap-1 bg-[#FAFAF7] border border-[#E9E9E4] p-0.5 text-[10px]">
          <button
            type="button"
            onClick={() => setActiveTab('upload')}
            className={`px-2 py-0.5 font-semibold transition-colors cursor-pointer flex items-center gap-1 ${
              activeTab === 'upload'
                ? 'bg-[#071936] text-white'
                : 'text-[#071936]/60 hover:text-[#071936]'
            }`}
          >
            <Upload className="w-3 h-3" /> Local Upload
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('url')}
            className={`px-2 py-0.5 font-semibold transition-colors cursor-pointer flex items-center gap-1 ${
              activeTab === 'url'
                ? 'bg-[#071936] text-white'
                : 'text-[#071936]/60 hover:text-[#071936]'
            }`}
          >
            <LinkIcon className="w-3 h-3" /> Image URL
          </button>
        </div>
      </div>

      {/* Upload/URL controls */}
      {activeTab === 'upload' ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed p-4 text-center cursor-pointer transition-all duration-200 ${
            isDragging
              ? 'border-[#D9A21B] bg-[#D9A21B]/10'
              : 'border-[#E9E9E4] hover:border-[#D9A21B] bg-[#FAFAF7]'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />

          <div className="flex flex-col items-center justify-center gap-2 py-1">
            <div className="w-8 h-8 rounded-full bg-[#071936]/5 text-[#071936] flex items-center justify-center">
              <Upload className="w-4 h-4 text-[#D9A21B]" />
            </div>
            <div className="space-y-0.5">
              <p className="text-xs font-semibold text-[#071936]">
                {isProcessing ? 'Processing local image…' : 'Click to browse or drag & drop image'}
              </p>
              <p className="text-[10px] text-[#071936]/50">
                Supports PNG, JPG, JPEG, WEBP, GIF, SVG (Stored automatically)
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-1">
          <div className="flex gap-2">
            <input
              type="text"
              value={value || ''}
              onChange={(e) => onChange(e.target.value)}
              placeholder="https://example.com/image.jpg or /images/..."
              className="w-full p-2.5 bg-white border border-[#E9E9E4] text-xs text-[#071936] focus:outline-none focus:border-[#D9A21B]"
            />
          </div>
        </div>
      )}

      {errorMessage && (
        <p className="text-[11px] text-red-600 font-semibold">{errorMessage}</p>
      )}

      {/* Image Preview Box */}
      {value ? (
        <div className="relative border border-[#E9E9E4] bg-white p-2.5 mt-2 rounded-xs shadow-xs">
          <div className="flex items-center justify-between pb-2 border-b border-[#E9E9E4] mb-2">
            <span className="text-[10px] font-bold text-[#071936] uppercase flex items-center gap-1.5">
              <Check className="w-3 h-3 text-emerald-600" />
              Image Ready to Display
            </span>
            <button
              type="button"
              onClick={handleClear}
              className="text-[10px] text-red-600 hover:text-red-800 font-bold uppercase flex items-center gap-1 cursor-pointer"
            >
              <X className="w-3 h-3" /> Remove
            </button>
          </div>

          <div className={`${aspectRatio} max-h-48 overflow-hidden bg-[#FAFAF7] flex items-center justify-center border border-[#E9E9E4]`}>
            <img
              src={value}
              alt="Preview"
              referrerPolicy="no-referrer"
              onError={(e) => handleImageError(e, 'Preview', 'case')}
              className="w-full h-full object-cover"
            />
          </div>

          <p className="text-[10px] text-[#071936]/50 truncate mt-1.5">
            {value.startsWith('data:image') ? 'Uploaded Local Image (Base64 Data)' : value}
          </p>
        </div>
      ) : (
        <p className="text-[10px] text-[#071936]/60 italic">
          {helpText}
        </p>
      )}
    </div>
  );
};
