import { Box, Button, Stack } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { featureSlides } from './data';
import { md2Button, SymbolIcon } from './shared';

export function FeaturePager({ activeSlide, goToFeature, selectFeature }) {
  return (
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              spacing={1}
              sx={{
                '@media (orientation: landscape)': {
                  minHeight: 30,
                },
              }}
            >
              <Button
                onClick={() => goToFeature(-1)}
                startIcon={<SymbolIcon name="chevron_left" size={22} />}
                sx={{
                  ...md2Button,
                  minHeight: { xs: 34, sm: 38 },
                  px: { xs: 1.15, sm: 1.7 },
                  fontSize: { xs: '0.72rem', sm: '0.84rem' },
                  borderRadius: 0.7,
                  '@media (orientation: landscape)': {
                    minHeight: 30,
                    px: 1.2,
                    fontSize: '0.72rem',
                  },
                }}
              >
                上一项
              </Button>
              <Stack direction="row" spacing={0.55} alignItems="center" sx={{ flexShrink: 0 }}>
                {featureSlides.map((feature, index) => (
                  <Box
                    key={feature.eyebrow}
                    component="button"
                    type="button"
                    aria-label={`切换到第 ${index + 1} 项`}
                    onClick={() => selectFeature(index)}
                    sx={{
                      width: activeSlide === index ? 24 : 8,
                      height: 8,
                      p: 0,
                      border: 0,
                      borderRadius: 999,
                      cursor: 'pointer',
                      backgroundColor: activeSlide === index ? '#8ff5f7' : alpha('#ffffff', 0.3),
                      transition: 'width 180ms ease, background-color 180ms ease',
                    }}
                  />
                ))}
              </Stack>
              <Button
                onClick={() => goToFeature(1)}
                endIcon={<SymbolIcon name="chevron_right" size={22} />}
                sx={{
                  ...md2Button,
                  minHeight: { xs: 34, sm: 38 },
                  px: { xs: 1.15, sm: 1.7 },
                  fontSize: { xs: '0.72rem', sm: '0.84rem' },
                  borderRadius: 0.7,
                  justifyContent: 'center',
                  '@media (orientation: landscape)': {
                    minHeight: 30,
                    px: 1.2,
                    fontSize: '0.72rem',
                  },
                }}
              >
                下一项
              </Button>
            </Stack>  );
}
