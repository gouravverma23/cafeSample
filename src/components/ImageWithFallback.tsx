import { useState, ImgHTMLAttributes } from 'react';
import { Coffee } from 'lucide-react';

interface ImageWithFallbackProps extends ImgHTMLAttributes<HTMLImageElement> {
  fallbackTitle?: string;
  className?: string;
}

export function ImageWithFallback({
  src,
  alt,
  fallbackTitle,
  className = '',
  ...props
}: ImageWithFallbackProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  if (hasError || !src) {
    return (
      <div 
        className={`bg-stone-200/80 flex flex-col items-center justify-center p-6 text-stone-500 select-none ${className}`}
        role="img"
        aria-label={alt || fallbackTitle || "The Daily Grind visual asset"}
      >
        <Coffee className="w-8 h-8 text-[#BC5A36] mb-2 opacity-80" strokeWidth={1.5} />
        <span className="text-xs font-medium tracking-wider uppercase text-[#6B554B] text-center">
          {fallbackTitle || alt || "The Daily Grind"}
        </span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!isLoaded && (
        <div className="absolute inset-0 bg-stone-200 animate-pulse" />
      )}
      <img
        src={src}
        alt={alt || "The Daily Grind Café"}
        referrerPolicy="no-referrer"
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`w-full h-full object-cover transition-opacity duration-500 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        {...props}
      />
    </div>
  );
}
