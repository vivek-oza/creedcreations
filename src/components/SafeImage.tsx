import React, { useState, useCallback } from 'react';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackAlt?: string;
}

/**
 * Image component with error handling and fallback placeholder.
 * Prevents broken image icons and handles load failures gracefully.
 */
const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt,
  fallbackAlt = 'Image unavailable',
  onError,
  ...props
}) => {
  const [hasError, setHasError] = useState(false);

  const handleError = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
      setHasError(true);
      onError?.(e);
    },
    [onError]
  );

  if (hasError) {
    return (
      <div
        className={`w-full h-full min-h-0 flex items-center justify-center bg-black/10 text-black/40 text-sm ${props.className ?? ''}`}
        role="img"
        aria-label={fallbackAlt}
      >
        <span className="sr-only">{fallbackAlt}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={handleError}
      loading={props.loading ?? 'lazy'}
      decoding={props.decoding ?? 'async'}
      {...props}
    />
  );
};

export default SafeImage;
