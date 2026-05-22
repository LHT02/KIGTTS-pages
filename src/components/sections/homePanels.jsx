import { Box, Button, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { androidApkUrl, downloadNotes, logoWhite, logoWhiteLandscape, trainerModelScopeUrl } from './data';
import { FeedbackGroupButton, RealQr } from './homeQr';
import { SymbolIcon } from './SymbolIcon';
import { md2Button, md2Surface } from './styles';
import { scaledPx } from './utils';
function DownloadPanel({ compact = false, mobileApkOnly = false, densityScale = 1, onSelectDownloadTab }) {
  const scaledCompact = compact && densityScale < 0.98;
  const primaryHeight = scaledPx(68, densityScale, 40);
  const secondaryHeight = scaledPx(72, densityScale, 38);
  const getDownloadButtonProps = (tabId, href) => {
    if (onSelectDownloadTab) {
      return { onClick: () => onSelectDownloadTab(tabId) };
    }

    return {
      component: 'a',
      href,
      target: '_blank',
      rel: 'noopener noreferrer',
    };
  };

  return (
    <Box
      sx={{
        flex: 1,
        width: '100%',
        minWidth: 0,
        minHeight: 'auto',
        alignSelf: mobileApkOnly ? { xs: 'stretch', sm: 'flex-start' } : 'flex-start',
        px: compact ? { xs: 1.05, sm: 2.2, md: 2.5 } : { xs: 1.5, sm: 2.2, md: 2.5 },
        py: compact ? { xs: 1.05, sm: 2.2, md: 2.5 } : { xs: 1.5, sm: 2.2, md: 2.5 },
        ...md2Surface,
      }}
    >
      <Stack spacing={compact ? 1.05 : 1.35}>
        <Button
          fullWidth
          {...getDownloadButtonProps('android', androidApkUrl)}
          startIcon={<SymbolIcon name="android" size={compact ? 22 : 28} />}
          sx={{
            ...md2Button,
            minWidth: 0,
            minHeight: scaledCompact ? primaryHeight : compact ? { xs: 44, sm: 58, md: 66 } : { xs: 48, sm: 60, lg: 66 },
            px: scaledCompact ? 1 : compact ? { xs: 1.35, sm: 2.8 } : 2.8,
            fontSize: compact ? { xs: '1rem', sm: '1.08rem', md: '1.28rem' } : { xs: '1rem', sm: '1.18rem', md: '1.28rem' },
            justifyContent: compact ? 'center' : 'flex-start',
            whiteSpace: 'nowrap',
          }}
        >
          下载APK
        </Button>
        <Stack
          direction={{ xs: mobileApkOnly ? 'column' : 'row', sm: 'row' }}
          spacing={compact ? 0.85 : 1.05}
          sx={{ width: '100%', minWidth: 0 }}
        >
          <Button
            fullWidth
            {...getDownloadButtonProps('trainer', trainerModelScopeUrl)}
            startIcon={<SymbolIcon name="laptop_mac" size={compact ? 20 : 24} />}
            sx={{
              ...md2Button,
              flex: '0 1 50%',
              display: { xs: mobileApkOnly ? 'none' : 'inline-flex', sm: 'inline-flex' },
              minWidth: 0,
              minHeight: scaledCompact ? secondaryHeight : compact ? { xs: 42, sm: 58, md: 66 } : { xs: 48, sm: 60, lg: 66 },
              px: scaledCompact ? 1.05 : compact ? { xs: 1.05, sm: 1.55 } : 2.1,
              fontSize: compact ? { xs: '0.78rem', sm: '0.98rem', md: '1.12rem' } : { xs: '0.92rem', sm: '1.08rem', md: '1.18rem' },
              justifyContent: 'center',
              whiteSpace: 'nowrap',
            }}
          >
            下载训练器
          </Button>
          <FeedbackGroupButton compact={compact} densityScale={densityScale} mobileFullWidth={mobileApkOnly} />
        </Stack>
      </Stack>
    </Box>
  );
}

function QrPanel({ compact = false, hideOnMobile = false, densityScale = 1 }) {
  const scaledCompact = compact && densityScale < 0.98;
  const panelWidth = scaledPx(230, densityScale, densityScale < 0.75 ? 106 : 118);

  return (
    <Box
      sx={{
        display: { xs: hideOnMobile ? 'none' : 'block', sm: 'block' },
        width: scaledCompact ? panelWidth : compact ? { xs: 112, sm: 170, md: 180 } : { xs: '100%', sm: 204, md: 212 },
        minWidth: scaledCompact ? panelWidth : compact ? { xs: 112, sm: 170, md: 180 } : { sm: 204, md: 212 },
        minHeight: 'auto',
        alignSelf: 'flex-start',
        px: compact ? { xs: 0.95, sm: 1.4, md: 1.4 } : { xs: 1.4, sm: 1.6, md: 1.6 },
        py: compact ? { xs: 0.95, sm: 1.4, md: 1.4 } : { xs: 1.4, sm: 1.6, md: 1.6 },
        ...md2Surface,
      }}
    >
      <Stack spacing={compact ? 0.9 : 1.8} alignItems="center">
        <RealQr compact={compact} densityScale={densityScale} />
        <Typography
          variant="body2"
          sx={{
            textAlign: 'center',
            color: alpha('#f5fbfb', 0.64),
            display: compact && densityScale < 0.75 ? 'none' : { xs: 'none', sm: 'block' },
            fontSize: compact ? '0.72rem' : '0.92rem',
            lineHeight: compact ? 1.35 : 1.55,
          }}
        >
          {downloadNotes[0]}
        </Typography>
      </Stack>
    </Box>
  );
}

export function HomeRightBlock({ onSelect, onSelectDownloadTab, compact = false, desktopLayout = false, densityScale = 1 }) {
  const shortLandscapeFactor = densityScale < 0.75 ? 0.84 : 1;
  const desktopBlockWidth = scaledPx(536, densityScale * shortLandscapeFactor, 312);
  const desktopLogoWidth = scaledPx(474, densityScale * shortLandscapeFactor, 176);
  const desktopTitleSize = densityScale < 0.75
    ? `clamp(1.08rem, ${2.55 * densityScale}rem, 1.7rem)`
    : `clamp(1.3rem, ${2.9 * densityScale}rem, 2.9rem)`;
  const desktopActionGap = Math.max(0.85, 2 * densityScale);

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        maxWidth: desktopLayout ? desktopBlockWidth : { lg: 502, xl: 536 },
        mt: desktopLayout ? 0 : compact ? { xs: -0.2, sm: 1.1, lg: 0 } : { xs: 2, lg: 0 },
        ml: { lg: 0 },
        mx: desktopLayout ? 0 : { xs: 'auto', lg: 0 },
        textAlign: desktopLayout ? 'left' : { xs: 'center', lg: 'left' },
        display: 'flex',
        flexDirection: 'column',
        alignItems: desktopLayout ? 'flex-start' : { xs: 'center', lg: 'flex-start' },
      }}
    >
      <Box
        component="img"
        src={desktopLayout ? logoWhiteLandscape : logoWhite}
        alt="KIGTTS"
        sx={{
          width: desktopLayout ? desktopLogoWidth : compact ? { xs: '76%', sm: '100%' } : '100%',
          maxWidth: desktopLayout ? '100%' : compact ? { xs: 228, sm: 474 } : 474,
        }}
      />
      <Typography
        sx={{
          mt: desktopLayout ? Math.max(0.35, 1.4 * densityScale) : compact ? { xs: 0.45, sm: 1.6, md: 2 } : 2,
          fontSize: desktopLayout ? desktopTitleSize : compact ? { xs: '1.22rem', sm: '2rem', md: '2.6rem', xl: '2.9rem' } : { xs: '2rem', md: '2.6rem', xl: '2.9rem' },
          lineHeight: compact ? 1.12 : 1.18,
          letterSpacing: '0.03em',
          color: '#82cacb',
          fontFamily: '"Noto Sans SC"',
          fontWeight: 900,
        }}
      >
        <Box component="span" sx={{ color: '#f1f4f4', fontWeight: 300 }}>让</Box>
        <Box component="span">沉默的你</Box>
        <Box component="span" sx={{ color: '#f1f4f4', fontWeight: 300 }}>被听见</Box>
      </Typography>
      <Typography
        sx={{
          mt: compact ? { xs: 0.45, sm: 1 } : 1.2,
          color: alpha('#ffffff', 0.52),
          fontSize: compact ? { xs: '0.72rem', sm: '0.88rem' } : { xs: '0.82rem', sm: '0.95rem' },
          letterSpacing: '0.04em',
        }}
      >
        专为 Kigurumi 玩家打造
      </Typography>
      <Stack
        direction={desktopLayout ? 'row' : compact ? { xs: 'column', sm: 'row' } : { xs: 'column', sm: 'row' }}
        spacing={desktopLayout ? desktopActionGap : compact ? 1.2 : 2}
        sx={{
          width: '100%',
          maxWidth: desktopLayout ? '100%' : { xs: 338, sm: '100%' },
          mx: desktopLayout ? 0 : { xs: 'auto', lg: 0 },
          mt: desktopLayout ? Math.max(0.75, (densityScale < 0.75 ? 3 : 4.2) * densityScale) : compact ? { xs: 1.05, sm: 3.2, md: 4.2 } : { xs: 4, md: 5.2 },
          alignItems: desktopLayout ? 'flex-start' : 'stretch',
          justifyContent: 'center',
        }}
      >
        <QrPanel compact={compact} hideOnMobile={!desktopLayout} densityScale={densityScale} />
        <DownloadPanel
          compact={compact}
          mobileApkOnly={!desktopLayout}
          densityScale={densityScale}
          onSelectDownloadTab={onSelectDownloadTab}
        />
      </Stack>
    </Box>
  );
}
