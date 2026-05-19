import { Box } from '@mui/material';
import { useState } from 'react';
import { featureSlides } from './data';
import { centeredSectionSx } from './styles';
import { FeatureDetailsPanel } from './aboutDetails';
import { FeatureRail, FeatureVisualPanel } from './aboutPresentation';
export function AboutSection() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const currentFeature = featureSlides[activeSlide];
  const slideNumber = String(activeSlide + 1).padStart(2, '0');
  const totalSlides = String(featureSlides.length).padStart(2, '0');
  const selectFeature = (index) => {
    setDetailsOpen(false);
    setActiveSlide(index);
  };
  const goToFeature = (offset) => {
    setDetailsOpen(false);
    setActiveSlide((current) => (current + offset + featureSlides.length) % featureSlides.length);
  };

  return (
    <Box
      sx={{
        ...centeredSectionSx,
        height: '100%',
        alignItems: 'stretch',
        px: { xs: 0.8, sm: 1.5, lg: 3.4, xl: 5.2 },
        py: { xs: 0.8, sm: 1.2, lg: 2.4 },
        overflow: 'hidden',
      }}
    >
      <Box
        data-inner-scroll="true"
        sx={{
          width: '100%',
          maxWidth: { xs: '100%', lg: 1390, xl: 1540 },
          mx: 'auto',
          display: 'flex',
          alignItems: 'stretch',
          minHeight: 0,
        }}
      >
        <Box
          sx={{
            width: '100%',
            minHeight: 0,
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '78px minmax(0, 1.18fr) minmax(330px, 0.82fr)' },
            gridTemplateRows: { xs: 'minmax(0, 1fr) auto', md: '1fr' },
            gap: { xs: 0.8, sm: 1, md: 1.4, xl: 1.8 },
            alignItems: 'stretch',
            '@media (orientation: landscape)': {
              gridTemplateColumns: '78px minmax(0, 1fr)',
              gridTemplateRows: '1fr',
              gap: 1.2,
            },
            '@media (orientation: landscape) and (max-height: 620px)': {
              gridTemplateColumns: '62px minmax(0, 1fr)',
              gap: 0.8,
            },
          }}
        >
          <FeatureRail activeSlide={activeSlide} onSelectFeature={selectFeature} />

          <FeatureVisualPanel
            currentFeature={currentFeature}
            activeSlide={activeSlide}
            slideNumber={slideNumber}
            totalSlides={totalSlides}
          />
          <FeatureDetailsPanel
            activeSlide={activeSlide}
            currentFeature={currentFeature}
            detailsOpen={detailsOpen}
            goToFeature={goToFeature}
            selectFeature={selectFeature}
            setDetailsOpen={setDetailsOpen}
            slideNumber={slideNumber}
          />
        </Box>
      </Box>
    </Box>
  );
}
