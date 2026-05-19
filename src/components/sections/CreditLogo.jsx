import { Box, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { useState } from 'react';
import { md2Surface } from './styles';

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
