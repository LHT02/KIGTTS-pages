import { Box, Collapse, Divider, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { md2Surface, md2SurfaceShadow } from './styles';
import { FeatureBulletList } from './aboutFeatureBullets';

export function MobileFeatureDetails({ currentFeature, detailsOpen }) {
  return (
    <Collapse
      in={detailsOpen}
      timeout={260}
      sx={{
        display: { xs: 'block', md: 'none' },
        '@media (orientation: landscape)': {
          display: 'none',
        },
      }}
    >
      <Stack spacing={0.55}>
        <Box
          sx={{
            minHeight: 0,
            p: { xs: 1.05, sm: 1.25 },
            ...md2Surface,
            backgroundColor: alpha('#2f3132', 0.92),
            boxShadow: md2SurfaceShadow,
            overflow: 'hidden',
            backdropFilter: 'blur(14px)',
          }}
        >
          <Typography sx={{ color: alpha('#ffffff', 0.54), fontSize: { xs: '0.66rem', sm: '0.72rem' }, letterSpacing: '0.16em', fontWeight: 700 }}>
            功能详情
          </Typography>
          <Typography sx={{ mt: 0.65, color: alpha('#ffffff', 0.78), lineHeight: 1.5, fontSize: { xs: '0.76rem', sm: '0.86rem' } }}>
            {currentFeature.summary}
          </Typography>
          <Divider sx={{ my: 0.9, borderColor: alpha('#ffffff', 0.08) }} />
          <FeatureBulletList bullets={currentFeature.bullets} compact />
        </Box>
        <MobileFeatureNote currentFeature={currentFeature} />
      </Stack>
    </Collapse>
  );
}
function MobileFeatureNote({ currentFeature }) {
  return (
    <Box
      sx={{
        p: { xs: 0.95, sm: 1.1 },
        backgroundColor: alpha('#038387', 0.74),
        border: `1px solid ${alpha('#8ff5f7', 0.18)}`,
        borderLeft: `3px solid ${alpha('#8ff5f7', 0.82)}`,
        borderRadius: 0.5,
        backdropFilter: 'blur(12px)',
      }}
    >
      <Typography sx={{ color: alpha('#ffffff', 0.84), lineHeight: 1.42, fontSize: { xs: '0.7rem', sm: '0.78rem' } }}>
        {currentFeature.note}
      </Typography>
    </Box>
  );
}
