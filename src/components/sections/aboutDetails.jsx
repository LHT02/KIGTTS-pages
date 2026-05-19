import { Box } from '@mui/material';
import { featureOverlayEnter } from './motion';
import {
  DesktopFeatureDetails,
  DesktopFeatureNote,
  FeatureBriefCard,
  FeatureDetailsToggle,
  FeatureTitleCard,
  MobileFeatureDetails,
} from './aboutDetailCards';
import { FeaturePager } from './aboutPager';

export function FeatureDetailsPanel({
  activeSlide,
  currentFeature,
  detailsOpen,
  goToFeature,
  selectFeature,
  setDetailsOpen,
  slideNumber,
}) {
  return (
    <Box
      sx={{
        gridColumn: { xs: '1', md: '3' },
        gridRow: { xs: '1', md: '1' },
        alignSelf: { xs: 'end', md: 'stretch' },
        zIndex: { xs: 4, md: 1 },
        minHeight: 0,
        display: 'grid',
        gridTemplateRows: { xs: 'auto auto auto', md: 'auto auto minmax(0, 1fr) auto' },
        gap: { xs: 0.55, sm: 0.7, md: 1.2 },
        mx: { xs: 0.75, sm: 1.1, md: 0 },
        mb: { xs: 0.75, sm: 1.1, md: 0 },
        animation: { xs: `${featureOverlayEnter} 360ms cubic-bezier(0.2, 0.8, 0.2, 1)`, md: 'none' },
        '@media (orientation: landscape)': {
          gridColumn: '2',
          gridRow: '1',
          alignSelf: 'end',
          justifySelf: 'start',
          width: 'min(52%, 630px)',
          maxHeight: 'calc(100% - 132px)',
          mx: 'clamp(14px, 3vw, 42px)',
          mb: 'clamp(76px, 12vh, 124px)',
          zIndex: 4,
          gridTemplateRows: 'auto auto minmax(0, auto) auto auto',
          gap: 'clamp(6px, 1vh, 10px)',
          animation: `${featureOverlayEnter} 360ms cubic-bezier(0.2, 0.8, 0.2, 1)`,
        },
        '@media (orientation: landscape) and (max-height: 620px)': {
          width: 'min(54%, 460px)',
          maxHeight: 'calc(100% - 72px)',
          mx: 'clamp(10px, 2.4vw, 28px)',
          mb: 'clamp(12px, 4vh, 32px)',
          gap: 0.55,
        },
      }}
    >
      <FeatureTitleCard currentFeature={currentFeature} slideNumber={slideNumber} />
      <FeatureBriefCard currentFeature={currentFeature} />
      <FeatureDetailsToggle detailsOpen={detailsOpen} setDetailsOpen={setDetailsOpen} />
      <DesktopFeatureDetails currentFeature={currentFeature} />
      <MobileFeatureDetails currentFeature={currentFeature} detailsOpen={detailsOpen} />
      <DesktopFeatureNote currentFeature={currentFeature} />
      <FeaturePager activeSlide={activeSlide} goToFeature={goToFeature} selectFeature={selectFeature} />
    </Box>
  );
}
