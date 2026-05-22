import { Box } from '@mui/material';
import { useEffect, useState } from 'react';

export function ProgressiveImage({ src, alt, sx, eager = false, placeholderSrc, srcSet, sizes }) {
  const [loaded, setLoaded] = useState(false);
  const [displaySrc, setDisplaySrc] = useState(placeholderSrc ?? src);

  useEffect(() => {
    setLoaded(false);
    setDisplaySrc(placeholderSrc ?? src);

    if (!placeholderSrc || placeholderSrc === src) {
      return undefined;
    }

    const image = new Image();
    image.decoding = 'async';
    image.src = src;
    image.onload = () => {
      setDisplaySrc(src);
    };

    return () => {
      image.onload = null;
    };
  }, [placeholderSrc, src]);

  return (
    <Box
      component="img"
      src={displaySrc}
      srcSet={displaySrc === src ? srcSet : undefined}
      sizes={displaySrc === src ? sizes : undefined}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      onLoad={() => setLoaded(true)}
      sx={[
        {
          opacity: loaded ? 1 : 0.18,
          transition: 'opacity 420ms ease, filter 520ms ease, transform 520ms ease',
        },
        sx,
        !loaded && {
          filter: 'blur(18px) saturate(0.72)',
          transform: 'scale(0.985)',
        },
      ]}
    />
  );
}
