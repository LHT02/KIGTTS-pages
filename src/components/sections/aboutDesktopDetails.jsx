import { Box, Divider, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { featurePanelEnter } from './motion';
import { md2Surface, md2SurfaceShadow } from './styles';
import { FeatureBulletList } from './aboutFeatureBullets';

export function DesktopFeatureDetails({ currentFeature }) {
  return (
    <Box
      sx={{
        minHeight: 0,
        p: { xs: 1.15, sm: 1.45, md: 1.7 },
        ...md2Surface,
        boxShadow: md2SurfaceShadow,
        overflow: 'hidden',
        display: { xs: 'none', md: 'block' },
        animation: `${featurePanelEnter} 460ms cubic-bezier(0.2, 0.8, 0.2, 1)`,
        '@media (orientation: landscape)': {
          display: 'block',
          p: 'clamp(8px, 1.2vh, 12px)',
          backgroundColor: alpha('#2f3132', 0.88),
          backdropFilter: 'blur(14px)',
        },
        '@media (orientation: landscape) and (max-height: 620px)': {
          p: 1,
        },
      }}
    >
      <Typography sx={{ color: alpha('#ffffff', 0.54), fontSize: { xs: '0.68rem', sm: '0.74rem' }, letterSpacing: '0.16em', fontWeight: 700 }}>
        功能详情
      </Typography>
      <Typography
        sx={{
          mt: { xs: 0.7, md: 1 },
          color: alpha('#ffffff', 0.78),
          lineHeight: { xs: 1.5, sm: 1.65, md: 1.72 },
          fontSize: { xs: '0.8rem', sm: '0.92rem', md: '0.98rem' },
          display: '-webkit-box',
          WebkitBoxOrient: 'vertical',
          WebkitLineClamp: { xs: 3, sm: 4, md: 6 },
          overflow: 'hidden',
          '@media (orientation: landscape)': {
            WebkitLineClamp: 3,
            mt: 0.6,
            fontSize: 'clamp(0.76rem, 1.5vh, 0.86rem)',
            lineHeight: 1.42,
          },
          '@media (orientation: landscape) and (max-height: 620px)': {
            WebkitLineClamp: 3,
            fontSize: '0.72rem',
            lineHeight: 1.42,
          },
        }}
      >
        {currentFeature.summary}
      </Typography>
      <Divider sx={{ my: { xs: 1, md: 1.25 }, borderColor: alpha('#ffffff', 0.08), '@media (orientation: landscape)': { my: 0.7 } }} />
      <FeatureBulletList bullets={currentFeature.bullets} />
    </Box>
  );
}
export function DesktopFeatureNote({ currentFeature }) {
  return (
    <Box
      sx={{
        p: { xs: 1, sm: 1.2, md: 1.35 },
        backgroundColor: alpha('#038387', 0.16),
        border: `1px solid ${alpha('#8ff5f7', 0.16)}`,
        borderLeft: `3px solid ${alpha('#8ff5f7', 0.76)}`,
        borderRadius: 0.5,
        display: { xs: 'none', md: 'block' },
        animation: `${featurePanelEnter} 500ms cubic-bezier(0.2, 0.8, 0.2, 1)`,
        '@media (orientation: landscape)': {
          display: 'block',
          p: 'clamp(7px, 1vh, 10px) clamp(10px, 1.4vw, 16px)',
          backgroundColor: alpha('#038387', 0.36),
          backdropFilter: 'blur(12px)',
        },
        '@media (orientation: landscape) and (max-height: 620px)': {
          display: 'none',
        },
      }}
    >
      <Typography
        sx={{
          color: alpha('#ffffff', 0.76),
          lineHeight: 1.45,
          fontSize: { xs: '0.72rem', sm: '0.82rem', md: '0.88rem' },
          display: '-webkit-box',
          WebkitBoxOrient: 'vertical',
          WebkitLineClamp: { xs: 2, md: 3 },
          overflow: 'hidden',
          '@media (orientation: landscape)': {
            fontSize: '0.74rem',
            lineHeight: 1.25,
            WebkitLineClamp: 1,
          },
        }}
      >
        {currentFeature.note}
      </Typography>
    </Box>
  );
}
