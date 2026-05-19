import { Box, Button, Collapse, Divider, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { featureOverlayEnter, featurePanelEnter } from './motion';
import { md2RaisedShadow, md2Surface, md2SurfaceShadow, SymbolIcon } from './shared';
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
              <Typography
                sx={{
                  color: alpha('#ffffff', 0.54),
                  fontSize: { xs: '0.68rem', sm: '0.74rem' },
                  letterSpacing: '0.16em',
                  fontWeight: 700,
                }}
              >
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
              <Divider
                sx={{
                  my: { xs: 1, md: 1.25 },
                  borderColor: alpha('#ffffff', 0.08),
                  '@media (orientation: landscape)': {
                    my: 0.7,
                  },
                }}
              />
              <Stack
                spacing={{ xs: 0.45, sm: 0.6 }}
                sx={{
                  '@media (orientation: landscape)': {
                    gap: 0.25,
                  },
                }}
              >
                {currentFeature.bullets.map((item, index) => (
                  <Stack key={item} direction="row" spacing={0.8} alignItems="center">
                    <Typography
                      sx={{
                        width: 28,
                        color: '#8ff5f7',
                        fontSize: { xs: '0.68rem', sm: '0.76rem' },
                        fontWeight: 700,
                      }}
                    >
                      0{index + 1}
                    </Typography>
                    <Typography
                      sx={{
                        minWidth: 0,
                        color: alpha('#ffffff', 0.74),
                        fontSize: { xs: '0.74rem', sm: '0.84rem', md: '0.9rem' },
                        lineHeight: 1.38,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        '@media (orientation: landscape)': {
                          fontSize: '0.76rem',
                          lineHeight: 1.22,
                        },
                      }}
                    >
                      {item}
                    </Typography>
                  </Stack>
                ))}
              </Stack>
            </Box>

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
                  <Typography
                    sx={{
                      color: alpha('#ffffff', 0.54),
                      fontSize: { xs: '0.66rem', sm: '0.72rem' },
                      letterSpacing: '0.16em',
                      fontWeight: 700,
                    }}
                  >
                    功能详情
                  </Typography>
                  <Typography
                    sx={{
                      mt: 0.65,
                      color: alpha('#ffffff', 0.78),
                      lineHeight: 1.5,
                      fontSize: { xs: '0.76rem', sm: '0.86rem' },
                    }}
                  >
                    {currentFeature.summary}
                  </Typography>
                  <Divider sx={{ my: 0.9, borderColor: alpha('#ffffff', 0.08) }} />
                  <Stack spacing={0.4}>
                    {currentFeature.bullets.map((item, index) => (
                      <Stack key={item} direction="row" spacing={0.8} alignItems="center">
                        <Typography sx={{ width: 28, color: '#8ff5f7', fontSize: '0.68rem', fontWeight: 700 }}>
                          0{index + 1}
                        </Typography>
                        <Typography
                          sx={{
                            minWidth: 0,
                            color: alpha('#ffffff', 0.74),
                            fontSize: { xs: '0.72rem', sm: '0.8rem' },
                            lineHeight: 1.35,
                          }}
                        >
                          {item}
                        </Typography>
                      </Stack>
                    ))}
                  </Stack>
                </Box>
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
              </Stack>
            </Collapse>

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

            <FeaturePager activeSlide={activeSlide} goToFeature={goToFeature} selectFeature={selectFeature} />
          </Box>
  );
}
