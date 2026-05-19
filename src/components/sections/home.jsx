import { Box } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { lazy, Suspense } from 'react';
import { lhtstudioLogo } from './data';
import { BetaBubble } from './betaBubble';
import { HomeRightBlock } from './homePanels';
import { centeredContentSx, centeredSectionSx, scaledPx } from './shared';

const GlassHeroModel = lazy(() => import('../GlassHeroModel').then((module) => ({ default: module.GlassHeroModel })));
export function HomeSection({ onSelect, onSelectDownloadTab, desktopLayout = false, densityScale = 1, dpiScale = 1 }) {
  const shortDpiDesktop = desktopLayout && dpiScale < 0.75;
  const shortLandscapeFactor = densityScale < 0.75 ? 0.84 : 1;
  const desktopContentMaxWidth = scaledPx(1160, densityScale, 760);
  const desktopRightColumn = scaledPx(536, densityScale * shortLandscapeFactor, 312);
  const desktopLogoWidth = scaledPx(200, densityScale, 108);
  const desktopHeroWidth = densityScale < 0.75
    ? `clamp(250px, 28vw, ${scaledPx(430, densityScale, 300)}px)`
    : `clamp(310px, 29vw, ${scaledPx(500, densityScale, 340)}px)`;

  return (
    <Box
      sx={{
        ...centeredSectionSx,
        position: 'relative',
        flexDirection: 'column',
        alignItems: 'stretch',
        px: desktopLayout ? Math.max(1.2, 4.2 * densityScale) : { xs: 0, sm: 0, lg: 5.4, xl: 6.4 },
        pt: desktopLayout ? Math.max(1, 3.4 * densityScale) : { xs: 0, lg: 3.8 },
        pb: desktopLayout ? Math.max(1.2, 3.8 * densityScale) : { xs: 'max(10px, env(safe-area-inset-bottom))', sm: 2.2, lg: 5.2 },
        scrollSnapAlign: 'start',
      }}
    >
      <Box
        component="img"
        src={lhtstudioLogo}
        alt="LHT Studio"
        sx={{
          width: desktopLayout ? desktopLogoWidth : { xs: 108, sm: 170, md: 200 },
          mb: desktopLayout ? 0 : { xs: 0.8, sm: 2.8, lg: 0 },
          display: desktopLayout ? 'block' : { xs: 'none', lg: 'block' },
          alignSelf: desktopLayout ? 'flex-start' : { xs: 'center', lg: 'flex-start' },
        }}
      />
      <Box sx={{ display: desktopLayout ? 'block' : { xs: 'none', lg: 'block' } }}>
        <BetaBubble onSelect={() => onSelectDownloadTab?.('beta')} densityScale={desktopLayout ? dpiScale : densityScale} />
      </Box>
      <Box
        sx={{
          ...centeredContentSx,
          maxWidth: desktopLayout ? desktopContentMaxWidth : { xs: '100%', lg: 1500, xl: 1640 },
          width: desktopLayout ? 'fit-content' : '100%',
          flex: 1,
          mt: desktopLayout ? Math.max(0.6, 2.6 * densityScale) : { xs: 0, lg: 3.2 },
          display: desktopLayout ? 'grid' : { xs: 'flex', lg: 'grid' },
          flexDirection: { xs: 'column', lg: 'row' },
          gridTemplateColumns: desktopLayout ? `${desktopHeroWidth} ${desktopRightColumn}px` : {
            lg: 'minmax(520px, 0.95fr) minmax(420px, 0.72fr)',
            xl: 'minmax(600px, 0.98fr) minmax(440px, 0.72fr)',
          },
          alignItems: 'center',
          justifyContent: 'center',
          gap: desktopLayout ? Math.max(1.1, 2.0 * densityScale) : { xs: 0.2, sm: 0.4, lg: 2.4, xl: 3.2 },
          minHeight: desktopLayout ? 0 : { lg: 'calc(100svh - 158px)' },
        }}
      >
        <Box sx={{ width: '100%', display: desktopLayout ? 'none' : { xs: 'flex', lg: 'none' }, justifyContent: 'center' }}>
          <BetaBubble onSelect={() => onSelectDownloadTab?.('beta')} compact banner />
        </Box>
        <Box
          sx={{
            minWidth: 0,
            width: '100%',
            px: desktopLayout ? 0 : { xs: 1.8, sm: 3.4, lg: 0 },
            mt: desktopLayout ? 0 : { xs: 0.85, sm: 2.4, lg: 0 },
            pointerEvents: 'auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box
            sx={{
              width: desktopLayout ? desktopHeroWidth : { xs: 'clamp(250px, 78vw, 340px)', sm: 'min(72vw, 520px)', md: 'min(68vw, 620px)', lg: 'min(48vw, 800px)', xl: 'min(46vw, 880px)' },
              height: 'auto',
              aspectRatio: '1 / 1',
              maxWidth: '100%',
              marginInline: 'auto',
            }}
          >
            <Suspense
              fallback={
                <Box
                  sx={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    background: `radial-gradient(circle, ${alpha('#038387', 0.22)} 0%, transparent 68%)`,
                    filter: 'blur(10px)',
                  }}
                />
              }
            >
              <GlassHeroModel
                densityScale={densityScale}
                modelScale={desktopLayout && densityScale < 0.75 ? 2.25 : 1}
                sx={{ width: '100%', height: '100%', minHeight: 0 }}
              />
            </Suspense>
          </Box>
        </Box>
        <Box
          sx={{
            minWidth: 0,
            width: '100%',
            px: desktopLayout ? 0 : { xs: 1.8, sm: 3.4, lg: 0 },
            mt: shortDpiDesktop ? 2 : 0,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <HomeRightBlock
            onSelect={onSelect}
            onSelectDownloadTab={onSelectDownloadTab}
            compact
            desktopLayout={desktopLayout}
            densityScale={densityScale}
          />
        </Box>
      </Box>
    </Box>
  );
}
