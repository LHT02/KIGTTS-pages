import { Box, Button, Divider, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { featureSlides, logoWhite } from './data';
import { featureVisualEnter } from './motion';
import { md2RaisedShadow, md2SurfaceShadow } from './styles';
import { ProgressiveImage } from './ProgressiveImage';
import { SymbolIcon } from './SymbolIcon';

export function FeatureRail({ activeSlide, onSelectFeature }) {
  return (
          <Stack
            direction={{ xs: 'row', md: 'column' }}
            spacing={{ xs: 0.65, md: 0.85 }}
            sx={{
              gridColumn: { xs: '1', md: '1' },
              gridRow: { xs: '2', md: '1' },
              minWidth: 0,
              minHeight: 0,
              p: { xs: 0.65, md: 0.85 },
              alignItems: 'center',
              justifyContent: { xs: 'flex-start', md: 'center' },
              overflowX: { xs: 'auto', md: 'hidden' },
              overflowY: 'hidden',
              backgroundColor: '#2f3132',
              borderRadius: 0,
              border: `1px solid ${alpha('#ffffff', 0.05)}`,
              boxShadow: md2SurfaceShadow,
              scrollbarWidth: 'thin',
              '@media (orientation: landscape)': {
                gridColumn: '1',
                gridRow: '1',
                flexDirection: 'column',
                overflowX: 'hidden',
                overflowY: 'hidden',
                justifyContent: 'center',
              },
            }}
          >
            {featureSlides.map((feature, index) => {
              const selected = activeSlide === index;

              return (
                <Button
                  key={feature.eyebrow}
                  title={feature.label}
                  onClick={() => onSelectFeature(index)}
                  sx={{
                    flexShrink: 0,
                    width: { xs: 66, sm: 72, md: 62 },
                    minWidth: { xs: 66, sm: 72, md: 62 },
                    height: { xs: 54, sm: 60, md: 64 },
                    justifyContent: 'center',
                    px: 0,
                    py: 0,
                    borderRadius: 0.8,
                    color: selected ? '#f5fbfb' : alpha('#ffffff', 0.62),
                    backgroundColor: selected ? alpha('#038387', 0.34) : alpha('#0a1415', 0.34),
                    border: `1px solid ${selected ? alpha('#8ff5f7', 0.42) : 'transparent'}`,
                    boxShadow: selected ? '0 2px 5px rgba(0,0,0,0.3)' : 'none',
                    transform: selected ? 'translate3d(0, -2px, 0)' : 'translate3d(0, 0, 0)',
                    transition: 'transform 180ms ease, background-color 180ms ease, border-color 180ms ease, box-shadow 180ms ease',
                    '@media (orientation: landscape)': {
                      width: 58,
                      minWidth: 58,
                      height: 58,
                    },
                    '@media (orientation: landscape) and (max-height: 620px)': {
                      width: 46,
                      minWidth: 46,
                      height: 46,
                    },
                    '&:hover': {
                      backgroundColor: selected ? alpha('#038387', 0.36) : alpha('#ffffff', 0.05),
                    },
                  }}
                >
                  <SymbolIcon
                    name={feature.icon}
                    size={27}
                    sx={{
                      color: selected ? '#8ff5f7' : alpha('#ffffff', 0.76),
                      flexShrink: 0,
                    }}
                  />
                </Button>
              );
            })}
          </Stack>  );
}

export function FeatureVisualPanel({ currentFeature, activeSlide, slideNumber, totalSlides }) {
  return (
          <Box
            sx={{
              position: 'relative',
              gridColumn: { xs: '1', md: '2' },
              gridRow: { xs: '1', md: '1' },
              minHeight: 0,
              display: 'grid',
              alignItems: { xs: 'start', md: 'center' },
              overflow: 'hidden',
              borderRadius: 1,
              background: `
                linear-gradient(120deg, ${alpha('#038387', 0.18)} 0%, transparent 36%, ${alpha('#038387', 0.08)} 100%),
                repeating-linear-gradient(135deg, ${alpha('#ffffff', 0.035)} 0 1px, transparent 1px 18px),
                ${alpha('#051112', 0.86)}
              `,
              border: `1px solid ${alpha('#ffffff', 0.06)}`,
              boxShadow: md2RaisedShadow,
              '&::before': {
                content: '""',
                position: 'absolute',
                inset: { xs: 'auto -16% -20% -18%', md: 'auto -10% -24% -18%' },
                height: { xs: 150, md: 240 },
                background: `radial-gradient(circle, ${alpha('#038387', 0.34)}, transparent 68%)`,
                pointerEvents: 'none',
              },
              '&::after': {
                content: '""',
                display: { xs: 'block', md: 'none' },
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 2,
                height: '34%',
                background: `linear-gradient(180deg, ${alpha('#051112', 0)} 0%, ${alpha('#051112', 0.72)} 62%, ${alpha('#051112', 0.96)} 100%)`,
                pointerEvents: 'none',
                '@media (orientation: landscape)': {
                  display: 'none',
                },
              },
              '@media (orientation: landscape)': {
                gridColumn: '2',
                gridRow: '1',
                alignItems: 'center',
              },
            }}
          >
            <Box
              component="img"
              src={logoWhite}
              alt=""
              aria-hidden="true"
              sx={{
                display: 'none',
                pointerEvents: 'none',
                userSelect: 'none',
                '@media (orientation: landscape)': {
                  display: 'block',
                  position: 'absolute',
                  zIndex: 0,
                  left: '7%',
                  top: '35%',
                  width: 'min(78%, 980px)',
                  opacity: 0.058,
                  transform: 'translateY(-50%)',
                  filter: 'none',
                },
                '@media (orientation: landscape) and (max-height: 620px)': {
                  left: '6%',
                  top: '32%',
                  width: 'min(68%, 620px)',
                },
              }}
            />
            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
              sx={{
                position: 'absolute',
                top: { xs: 8, sm: 12, md: 16 },
                left: { xs: 8, sm: 12, md: 16 },
                zIndex: 2,
                px: 1.1,
                py: 0.65,
                backgroundColor: alpha('#0a1415', 0.72),
                border: `1px solid ${alpha('#ffffff', 0.08)}`,
                borderRadius: 0.6,
                boxShadow: '0 1px 3px rgba(0,0,0,0.24)',
              }}
            >
              <Typography sx={{ color: '#f5fbfb', fontSize: { xs: '0.72rem', md: '0.78rem' }, fontWeight: 700 }}>
                REC
              </Typography>
              <Divider orientation="vertical" flexItem sx={{ borderColor: alpha('#ffffff', 0.2) }} />
              <Typography sx={{ color: alpha('#ffffff', 0.62), fontSize: { xs: '0.68rem', md: '0.72rem' }, letterSpacing: '0.1em' }}>
                {slideNumber} / {totalSlides}
              </Typography>
            </Stack>

            <ProgressiveImage
              key={currentFeature.imageAlt}
              src={currentFeature.image}
              alt={currentFeature.imageAlt}
              eager={activeSlide === 0}
              sx={{
                position: 'relative',
                zIndex: 1,
                width: '100%',
                height: { xs: 'auto', md: '100%' },
                minHeight: { xs: 'auto', md: 0 },
                maxHeight: { xs: 'none', md: 'none' },
                objectFit: 'contain',
                objectPosition: { xs: 'top center', md: 'center' },
                p: { xs: 0.8, sm: 1.2, md: 4.8, xl: 5.8 },
                filter: 'drop-shadow(0 18px 28px rgba(0,0,0,0.24)) saturate(0.98)',
                animation: `${featureVisualEnter} 430ms cubic-bezier(0.2, 0.8, 0.2, 1)`,
                '@media (orientation: landscape)': {
                  width: 'min(52%, 620px)',
                  height: 'min(calc(100% - clamp(110px, 14vh, 150px)), 840px)',
                  justifySelf: 'end',
                  alignSelf: 'start',
                  objectPosition: 'right center',
                  mt: 'clamp(28px, 4vh, 48px)',
                  p: '0 clamp(22px, 5vw, 76px) 0 0',
                },
                '@media (orientation: landscape) and (max-height: 620px)': {
                  width: 'min(46%, 390px)',
                  height: 'calc(100% - 42px)',
                  mt: '10px',
                  p: '0 20px 0 0',
                },
              }}
            />

            {currentFeature.secondaryImage ? (
              <Box
                data-inner-scroll="true"
                sx={{
                  position: 'absolute',
                  zIndex: 3,
                  right: { xs: 10, sm: 14, md: 22 },
                  bottom: { xs: 10, sm: 14, md: 22 },
                  width: { xs: 118, sm: 156, md: 188 },
                  aspectRatio: '16 / 10',
                  overflow: 'hidden',
                  borderRadius: 0.8,
                  backgroundColor: '#151819',
                  border: `1px solid ${alpha('#8ff5f7', 0.38)}`,
                  boxShadow: '0 8px 20px rgba(0,0,0,0.36)',
                }}
              >
                <ProgressiveImage
                  src={currentFeature.secondaryImage}
                  alt={currentFeature.secondaryImageAlt}
                  sx={{
                    width: '100%',
                    height: '100%',
                    display: 'block',
                    objectFit: 'cover',
                    objectPosition: 'center',
                  }}
                />
              </Box>
            ) : null}
          </Box>  );
}
