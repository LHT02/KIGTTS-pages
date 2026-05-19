import { Box, Button, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { featurePanelEnter } from './motion';
import { md2RaisedShadow, md2Surface, md2SurfaceShadow } from './styles';
import { SymbolIcon } from './SymbolIcon';

export function FeatureTitleCard({ currentFeature, slideNumber }) {
  return (
    <Box
      key={`${currentFeature.eyebrow}-title`}
      sx={{
        p: { xs: 1, sm: 1.25, md: 1.8 },
        ...md2Surface,
        boxShadow: md2RaisedShadow,
        overflow: 'hidden',
        backgroundColor: { xs: alpha('#2f3132', 0.9), md: '#2f3132' },
        backdropFilter: { xs: 'blur(14px)', md: 'none' },
        animation: `${featurePanelEnter} 360ms cubic-bezier(0.2, 0.8, 0.2, 1)`,
        '@media (orientation: landscape)': {
          p: 'clamp(8px, 1.2vh, 12px)',
          backgroundColor: alpha('#2f3132', 0.9),
          backdropFilter: 'blur(14px)',
        },
        '@media (orientation: landscape) and (max-height: 620px)': {
          p: 1,
        },
      }}
    >
      <Stack direction="row" spacing={{ xs: 1, md: 1.25 }} alignItems="center">
        <Box
          sx={{
            width: { xs: 40, md: 48 },
            height: { xs: 40, md: 48 },
            display: 'grid',
            placeItems: 'center',
            borderRadius: 0.8,
            backgroundColor: '#038387',
            boxShadow: '0 2px 5px rgba(0,0,0,0.28)',
            flexShrink: 0,
          }}
        >
          <SymbolIcon name={currentFeature.icon} size={27} sx={{ color: '#ffffff' }} />
        </Box>
        <Box sx={{ minWidth: 0 }}>
          <Typography sx={{ color: alpha('#ffffff', 0.56), fontSize: { xs: '0.68rem', sm: '0.75rem' }, letterSpacing: '0.14em' }}>
            功能介绍 / {slideNumber}
          </Typography>
          <Typography
            sx={{
              mt: 0.35,
              color: '#f5f7f7',
              fontSize: { xs: '1.06rem', sm: '1.38rem', md: '1.9rem', xl: '2.16rem' },
              lineHeight: 1.05,
              fontWeight: 600,
              letterSpacing: '-0.02em',
              '@media (orientation: landscape)': {
                fontSize: 'clamp(1.08rem, 2.8vh, 1.58rem)',
              },
              '@media (orientation: landscape) and (max-height: 620px)': {
                fontSize: 'clamp(0.92rem, 4vh, 1.35rem)',
              },
            }}
          >
            {currentFeature.title}
          </Typography>
        </Box>
      </Stack>
      <Stack direction="row" spacing={0.5} sx={{ mt: { xs: 1, md: 1.4 } }}>
        <Box sx={{ height: 3, flex: 1.2, backgroundColor: '#038387' }} />
        <Box sx={{ height: 3, flex: 0.45, backgroundColor: alpha('#ffffff', 0.62) }} />
        <Box sx={{ height: 3, flex: 0.7, backgroundColor: alpha('#77d7d9', 0.72) }} />
      </Stack>
    </Box>
  );
}
export function FeatureBriefCard({ currentFeature }) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'auto minmax(0, 1fr)',
        alignItems: 'center',
        gap: { xs: 0.8, sm: 1 },
        p: { xs: 0.95, sm: 1.1, md: 1.2 },
        backgroundColor: alpha('#ffffff', 0.08),
        border: `1px solid ${alpha('#ffffff', 0.06)}`,
        borderLeft: `4px solid ${alpha('#8ff5f7', 0.82)}`,
        borderRadius: 0.6,
        boxShadow: md2SurfaceShadow,
        backdropFilter: { xs: 'blur(12px)', md: 'none' },
        animation: `${featurePanelEnter} 420ms cubic-bezier(0.2, 0.8, 0.2, 1)`,
        '@media (orientation: landscape)': {
          p: 'clamp(7px, 1vh, 11px)',
          gap: 0.75,
        },
      }}
    >
      <SymbolIcon name="info" size={22} sx={{ color: '#8ff5f7', flexShrink: 0 }} />
      <Typography
        sx={{
          minWidth: 0,
          color: alpha('#ffffff', 0.82),
          fontSize: { xs: '0.74rem', sm: '0.86rem', md: '0.92rem' },
          lineHeight: 1.42,
          display: '-webkit-box',
          WebkitBoxOrient: 'vertical',
          WebkitLineClamp: 2,
          overflow: 'hidden',
          '@media (orientation: landscape)': {
            fontSize: 'clamp(0.72rem, 1.5vh, 0.84rem)',
            lineHeight: 1.35,
            WebkitLineClamp: 2,
          },
        }}
      >
        {currentFeature.brief}
      </Typography>
    </Box>
  );
}
export function FeatureDetailsToggle({ detailsOpen, setDetailsOpen }) {
  return (
    <Button
      onClick={() => setDetailsOpen((open) => !open)}
      endIcon={<SymbolIcon name={detailsOpen ? 'expand_less' : 'expand_more'} size={20} />}
      sx={{
        display: { xs: 'inline-flex', md: 'none' },
        minHeight: 34,
        justifyContent: 'space-between',
        px: 1.15,
        borderRadius: 0.5,
        color: '#f5fbfb',
        backgroundColor: alpha('#038387', 0.82),
        boxShadow: '0 2px 5px rgba(0,0,0,0.28)',
        '&:hover': {
          backgroundColor: alpha('#04959a', 0.9),
        },
        '@media (orientation: landscape)': {
          display: 'none',
        },
      }}
    >
      {detailsOpen ? '收起详情' : '展开详情'}
    </Button>
  );
}
