import { Box, Icon, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { useState } from 'react';
export const md2SurfaceShadow = '0 1px 2px rgba(0,0,0,0.28), 0 6px 18px rgba(0,0,0,0.16)';
export const md2RaisedShadow = '0 2px 4px rgba(0,0,0,0.28), 0 10px 24px rgba(0,0,0,0.2)';
export const md2Surface = {
  backgroundColor: '#2f3132',
  border: `1px solid ${alpha('#ffffff', 0.04)}`,
  borderRadius: 1,
  boxShadow: md2SurfaceShadow,
};
export const md2Button = {
  minHeight: 72,
  justifyContent: 'flex-start',
  px: 2.8,
  borderRadius: 1,
  fontSize: { xs: '1.18rem', md: '1.28rem' },
  fontWeight: 500,
  color: '#f5fbfb',
  backgroundColor: '#038387',
  boxShadow: '0 2px 4px rgba(0,0,0,0.28), 0 6px 14px rgba(0,0,0,0.18)',
  '&:hover': {
    backgroundColor: '#04959a',
    boxShadow: '0 4px 8px rgba(0,0,0,0.28), 0 8px 18px rgba(0,0,0,0.22)',
  },
};

export const centeredSectionSx = {
  minHeight: '100%',
  width: '100%',
  boxSizing: 'border-box',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

export const centeredContentSx = {
  width: '100%',
  maxWidth: { xs: '100%', lg: 1320, xl: 1480 },
  mx: 'auto',
};

export function clampValue(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

export function scaledPx(value, scale, min = 0) {
  return Math.round(Math.max(min, value * scale));
}

export function SymbolIcon({ name, size = 24, sx }) {
  return (
    <Icon
      baseClassName="material-symbols-sharp"
      sx={{
        fontSize: size,
        lineHeight: 1,
        fontVariationSettings: '"FILL" 0, "wght" 400, "GRAD" 0, "opsz" 24',
        ...sx,
      }}
    >
      {name}
    </Icon>
  );
}

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

export function CreditLogo({ item }) {
  const source = item.logo;
  const [imageVisible, setImageVisible] = useState(Boolean(source));
  const content = (
    <Stack
      spacing={1.05}
      sx={{
        height: '100%',
        minHeight: { xs: 104, sm: 116 },
        p: { xs: 1.15, sm: 1.35 },
        ...md2Surface,
        borderRadius: 0.7,
        backgroundColor: item.featured ? alpha('#038387', 0.24) : alpha('#2f3132', 0.92),
        borderColor: item.featured ? alpha('#8ff5f7', 0.28) : alpha('#ffffff', 0.06),
        justifyContent: 'space-between',
        transition: 'transform 180ms ease, border-color 180ms ease, background-color 180ms ease',
        '&:hover': {
          transform: 'translate3d(0, -2px, 0)',
          borderColor: alpha('#8ff5f7', 0.34),
          backgroundColor: item.featured ? alpha('#038387', 0.3) : alpha('#364044', 0.92),
        },
      }}
    >
      <Box
        sx={{
          height: { xs: 38, sm: 46 },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}
      >
        {imageVisible ? (
          <Box
            component="img"
            src={source}
            alt={`${item.name} logo`}
            loading="eager"
            decoding="async"
            onError={() => setImageVisible(false)}
            sx={{
              width: item.featured ? { xs: 104, sm: 132 } : item.wide ? { xs: 78, sm: 96 } : { xs: 34, sm: 40 },
              maxHeight: item.featured ? { xs: 36, sm: 42 } : { xs: 34, sm: 40 },
              objectFit: 'contain',
              objectPosition: 'left center',
              filter: item.monochrome ? 'grayscale(1) brightness(0) invert(1)' : 'none',
            }}
          />
        ) : (
          <Typography sx={{ color: '#f5f7f7', fontSize: { xs: '1rem', sm: '1.12rem' }, fontWeight: 700 }}>
            {item.name}
          </Typography>
        )}
      </Box>
      <Box>
        <Typography sx={{ color: '#f5f7f7', fontSize: { xs: '0.9rem', sm: '1rem' }, fontWeight: 700, lineHeight: 1.18 }}>
          {item.name}
        </Typography>
        <Typography sx={{ mt: 0.45, color: alpha('#ffffff', 0.62), fontSize: { xs: '0.68rem', sm: '0.76rem' }, lineHeight: 1.35 }}>
          {item.role}
        </Typography>
      </Box>
    </Stack>
  );

  if (!item.href) {
    return content;
  }

  return (
    <Box
      component="a"
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      sx={{ display: 'block', height: '100%', color: 'inherit', textDecoration: 'none' }}
    >
      {content}
    </Box>
  );
}
