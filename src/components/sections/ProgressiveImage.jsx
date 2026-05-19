import { Box } from '@mui/material';
import { useState } from 'react';

export function ProgressiveImage({ src, alt, sx, eager = false }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <Box
      component="img"
      src={src}
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
