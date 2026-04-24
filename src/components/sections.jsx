import {
  Box,
  Button,
  Divider,
  Grid,
  Icon,
  Stack,
  Typography,
} from '@mui/material';
import { alpha, keyframes } from '@mui/material/styles';
import heroShot from '../../ART/KIGTTS1.png';
import logoWhite from '../../ART/LOGOWhite.svg';
import lhtstudioLogo from '../../ART/lhtstudio.svg';

export const navItems = [
  {
    id: 'home',
    label: '首页',
    caption: 'Home',
    icon: 'home',
  },
  {
    id: 'about',
    label: '介绍',
    caption: 'About',
    icon: 'graphic_eq',
  },
  {
    id: 'download',
    label: '下载',
    caption: 'Download',
    icon: 'download',
  },
  {
    id: 'lab',
    label: '实验',
    caption: 'Lab',
    icon: 'tune',
  },
];

const betaLines = ['尝试由Flutter构建', '的Beta版本'];

const downloadNotes = [
  '手机扫描二维码进行下载',
  '训练器与 APK 可分别接真实链接',
  '整个站点已经适配 GitHub Pages 静态部署',
];

const labItems = [
  '保留深色流光气质，但减少与主页面抢视觉。',
  '方便挂 Beta 下载、更新日志和实验说明。',
  '移动端沿用抽屉导航，不挤压主内容宽度。',
];

const md2SurfaceShadow = '0 1px 2px rgba(0,0,0,0.28), 0 6px 18px rgba(0,0,0,0.16)';
const md2RaisedShadow = '0 2px 4px rgba(0,0,0,0.28), 0 10px 24px rgba(0,0,0,0.2)';
const md2Surface = {
  backgroundColor: '#2f3132',
  border: `1px solid ${alpha('#ffffff', 0.04)}`,
  borderRadius: 1,
  boxShadow: md2SurfaceShadow,
};
const md2Button = {
  minHeight: 72,
  justifyContent: 'flex-start',
  px: 2.8,
  borderRadius: 1,
  fontSize: { xs: '1.18rem', md: '1.28rem' },
  fontWeight: 500,
  color: '#f5fbfb',
  backgroundColor: '#038387',
  boxShadow: '0 2px 4px rgba(0,0,0,0.28), 0 6px 14px rgba(0,0,0,0.18)',
  '&:hover': {
    backgroundColor: '#04959a',
    boxShadow: '0 4px 8px rgba(0,0,0,0.28), 0 8px 18px rgba(0,0,0,0.22)',
  },
};

export function SymbolIcon({ name, size = 24, sx }) {
  return (
    <Icon
      baseClassName="material-symbols-sharp"
      sx={{
        fontSize: size,
        lineHeight: 1,
        fontVariationSettings: '"FILL" 0, "wght" 400, "GRAD" 0, "opsz" 24',
        ...sx,
      }}
    >
      {name}
    </Icon>
  );
}

function PseudoQr({ compact = false }) {
  return (
    <Box
      sx={{
        width: compact ? 96 : 168,
        height: compact ? 96 : 168,
        p: compact ? 0.75 : 1.25,
        backgroundColor: '#fbfbfb',
        borderRadius: 0.5,
        boxShadow: '0 1px 2px rgba(0,0,0,0.16)',
      }}
    >
      <Box
        sx={{
          width: '100%',
          height: '100%',
          backgroundColor: '#ffffff',
          backgroundImage: `
            linear-gradient(90deg, #111 0 14%, transparent 14% 21%, #111 21% 35%, transparent 35% 43%, #111 43% 49%, transparent 49% 57%, #111 57% 74%, transparent 74% 80%, #111 80% 100%),
            linear-gradient(#111 0 12%, transparent 12% 18%, #111 18% 31%, transparent 31% 40%, #111 40% 48%, transparent 48% 61%, #111 61% 73%, transparent 73% 84%, #111 84% 100%)
          `,
          backgroundSize: '100% 100%',
          position: 'relative',
          overflow: 'hidden',
          '&::before, &::after': {
            content: '""',
            position: 'absolute',
            width: 38,
            height: 38,
            border: '8px solid #111',
            backgroundColor: '#fff',
          },
          '&::before': {
            top: 10,
            left: 10,
          },
          '&::after': {
            top: 10,
            right: 10,
          },
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            left: 10,
            bottom: 10,
            width: 38,
            height: 38,
            border: '8px solid #111',
            backgroundColor: '#fff',
          }}
        />
      </Box>
    </Box>
  );
}

const rotateFlower = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

function Md3Clover8({ size, color, sx }) {
  const commonSx = {
    content: '""',
    position: 'absolute',
    backgroundColor: color,
    borderRadius: 999,
    top: '22%',
    bottom: '22%',
    left: 0,
    right: 0,
  };

  return (
    <Box
      sx={{
        width: size,
        height: size,
        position: 'absolute',
        animation: `${rotateFlower} 45s linear infinite`,
        ...sx,
        '&::before': { ...commonSx, transform: 'rotate(0deg)' },
        '&::after': { ...commonSx, transform: 'rotate(45deg)' },
      }}
    >
      <Box sx={{ '&::before': { ...commonSx, transform: 'rotate(90deg)' }, '&::after': { ...commonSx, transform: 'rotate(135deg)' } }} />
    </Box>
  );
}

const md3CookieMask = `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M 50 0 C 80 0 70 20 75 25 C 80 30 100 20 100 50 C 100 80 80 70 75 75 C 70 80 80 100 50 100 C 20 100 30 80 25 75 C 20 70 0 80 0 50 C 0 20 20 30 25 25 C 30 20 20 0 50 0 Z' fill='black'/%3E%3C/svg>")`;

function Md3Cookie4({ size, color, sx }) {
  return (
    <Box
      sx={{
        width: size,
        height: size,
        position: 'absolute',
        animation: `${rotateFlower} 30s linear infinite`,
        backgroundColor: color,
        WebkitMaskImage: md3CookieMask,
        maskImage: md3CookieMask,
        WebkitMaskSize: 'contain',
        maskSize: 'contain',
        WebkitMaskRepeat: 'no-repeat',
        maskRepeat: 'no-repeat',
        WebkitMaskPosition: 'center',
        maskPosition: 'center',
        ...sx,
      }}
    />
  );
}

function BetaBubble({ onSelect, compact = false }) {
  return (
    <Box
      sx={{
        position: compact ? 'relative' : 'absolute',
        right: compact ? 'auto' : { lg: 42, xl: 56 },
        top: compact ? 'auto' : { lg: 34, xl: 46 },
        width: compact ? '100%' : { lg: 320, xl: 354 },
        maxWidth: compact ? { xs: 288, sm: '100%' } : 'none',
        minHeight: compact ? 'auto' : 190,
        px: compact ? { xs: 2, sm: 3, md: 3.2 } : { xs: 3, md: 3.2 },
        py: compact ? { xs: 1.5, sm: 2.6, md: 3 } : { xs: 2.6, md: 3 },
        borderRadius: '28px',
        color: '#1a2a2a', // Dark text matching image
        backgroundColor: '#82cbcc', // Base teal background
        boxShadow: '0 8px 24px rgba(0,0,0,0.15), 0 2px 8px rgba(0,0,0,0.1)',
        overflow: 'hidden',
        transition: 'box-shadow 0.2s ease',
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          backgroundColor: '#000000',
          opacity: 0,
          transition: 'opacity 0.2s ease',
          zIndex: 1, // Above background shapes, below content
          pointerEvents: 'none',
        },
        '&:hover': {
          boxShadow: '0 12px 28px rgba(0,0,0,0.18), 0 4px 12px rgba(0,0,0,0.12)', // Subtle elevation
        },
        '&:hover::before': {
          opacity: 0.08, // MD3 standard hover state layer on surface
        },
      }}
    >
      {/* Top right MD3 8-leaf clover */}
      <Md3Clover8
        size={150}
        color="#9ad9d9"
        sx={{
          top: -40,
          right: -40,
        }}
      />
      {/* Bottom left MD3 4-sided cookie */}
      <Md3Cookie4
        size={170}
        color="#6bb8b9"
        sx={{
          bottom: -60,
          left: -40,
          animationDirection: 'reverse', // Rotate opposite way
          animationDuration: '45s',
        }}
      />
      <Stack
        spacing={2.2}
        sx={{
          position: 'relative',
          zIndex: 2, // Ensure text is above state layer overlay
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <Typography
          sx={{
            fontSize: compact ? { xs: '1rem', sm: '1.15rem', md: '1.2rem' } : { xs: '1.15rem', md: '1.2rem' },
            lineHeight: compact ? 1.38 : 1.45,
            fontWeight: 500,
            letterSpacing: '0.02em',
            textShadow: '0 1px 2px rgba(255,255,255,0.2)',
          }}
        >
          {betaLines.map((line) => (
            <Box key={line} component="span" sx={{ display: 'block' }}>
              {line}
            </Box>
          ))}
        </Typography>
        <Button
          onClick={() => onSelect('lab')}
          sx={{
            minWidth: compact ? 148 : 198,
            minHeight: compact ? 42 : 54,
            px: compact ? 2.8 : 4,
            borderRadius: 999,
            color: '#ffffff',
            backgroundColor: '#137174',
            boxShadow: '0 4px 12px rgba(19, 113, 116, 0.4), 0 2px 4px rgba(0,0,0,0.1)',
            fontSize: compact ? '0.95rem' : '1.08rem',
            fontWeight: 500,
            transition: 'box-shadow 0.2s ease',
            position: 'relative',
            overflow: 'hidden',
            '&::after': {
              content: '""',
              position: 'absolute',
              inset: 0,
              backgroundColor: '#ffffff',
              opacity: 0,
              transition: 'opacity 0.2s ease',
            },
            '&:hover': {
              boxShadow: '0 6px 16px rgba(19, 113, 116, 0.5), 0 3px 6px rgba(0,0,0,0.15)', // MD3 elevation
            },
            '&:hover::after': {
              opacity: 0.08, // MD3 primary button hover state
            },
            '&:active::after': {
              opacity: 0.12, // MD3 primary button press state
            },
          }}
        >
          前往Beta页面
        </Button>
      </Stack>
    </Box>
  );
}

function DownloadPanel({ compact = false }) {
  return (
    <Box
      sx={{
        flex: 1,
        minHeight: compact ? { xs: 'auto', sm: 244 } : 244,
        px: compact ? { xs: 1.25, sm: 2.2, md: 2.5 } : { xs: 2.2, md: 2.5 },
        py: compact ? { xs: 1.25, sm: 2.2, md: 2.5 } : { xs: 2.2, md: 2.5 },
        ...md2Surface,
      }}
    >
      <Stack spacing={compact ? 1.1 : 1.8} sx={{ height: '100%' }}>
        <Button
          fullWidth
          startIcon={<SymbolIcon name="android" size={compact ? 22 : 28} />}
          sx={{
            ...md2Button,
            minHeight: compact ? { xs: 48, sm: 72 } : 72,
            px: compact ? { xs: 1.35, sm: 2.8 } : 2.8,
            fontSize: compact ? { xs: '0.86rem', sm: '1.18rem', md: '1.28rem' } : { xs: '1.18rem', md: '1.28rem' },
            justifyContent: compact ? 'center' : 'flex-start',
            whiteSpace: 'nowrap',
          }}
        >
          下载APK
        </Button>
        <Button
          fullWidth
          startIcon={<SymbolIcon name="laptop_mac" size={compact ? 22 : 28} />}
          sx={{
            ...md2Button,
            minHeight: compact ? { xs: 48, sm: 72 } : 72,
            px: compact ? { xs: 1.35, sm: 2.8 } : 2.8,
            fontSize: compact ? { xs: '0.86rem', sm: '1.18rem', md: '1.28rem' } : { xs: '1.18rem', md: '1.28rem' },
            justifyContent: compact ? 'center' : 'flex-start',
            whiteSpace: 'nowrap',
          }}
        >
          下载训练器
        </Button>
      </Stack>
    </Box>
  );
}

function QrPanel({ compact = false }) {
  return (
    <Box
      sx={{
        width: compact ? { xs: 122, sm: 230 } : { xs: '100%', sm: 230 },
        minWidth: compact ? { xs: 122, sm: 230 } : { sm: 230 },
        minHeight: compact ? { xs: 'auto', sm: 244 } : 244,
        px: compact ? { xs: 1.15, sm: 2.2, md: 2.5 } : { xs: 2.2, md: 2.5 },
        py: compact ? { xs: 1.15, sm: 2.2, md: 2.5 } : { xs: 2.2, md: 2.5 },
        ...md2Surface,
      }}
    >
      <Stack spacing={compact ? 0.9 : 1.8} alignItems="center">
        <PseudoQr compact={compact} />
        <Typography
          variant="body2"
          sx={{
            textAlign: 'center',
            color: alpha('#f5fbfb', 0.64),
            display: compact ? { xs: 'none', sm: 'block' } : 'block',
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

function HomeRightBlock({ onSelect, compact = false }) {
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        maxWidth: { lg: 502, xl: 536 },
        mt: compact ? { xs: -0.4, sm: 1.1, lg: 0 } : { xs: 2, lg: 0 },
        ml: { lg: 'auto' },
      }}
    >
      <Box
        component="img"
        src={logoWhite}
        alt="KIGTTS"
        sx={{
          width: compact ? { xs: '80%', sm: '100%' } : '100%',
          maxWidth: compact ? { xs: 248, sm: 474 } : 474,
        }}
      />
      <Typography
        sx={{
          mt: compact ? { xs: 0.8, sm: 1.6, md: 2 } : 2,
          fontSize: compact ? { xs: '1.38rem', sm: '2rem', md: '2.6rem', xl: '2.9rem' } : { xs: '2rem', md: '2.6rem', xl: '2.9rem' },
          lineHeight: compact ? 1.12 : 1.18,
          letterSpacing: '0.03em',
          color: '#f1f4f4',
          fontWeight: 300,
        }}
      >
        变娃交流无阻碍
      </Typography>
      <Stack
        direction={compact ? 'row' : { xs: 'column', sm: 'row' }}
        spacing={compact ? 1.2 : 2}
        sx={{
          mt: compact ? { xs: 1.8, sm: 4, md: 5.2 } : { xs: 4, md: 5.2 },
          alignItems: 'stretch',
        }}
      >
        <QrPanel compact={compact} />
        <DownloadPanel compact={compact} />
      </Stack>
    </Box>
  );
}

export function HomeSection({ onSelect }) {
  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: '100svh',
        px: { xs: 2.8, sm: 3.4, lg: 5.4, xl: 6.4 },
        pt: { xs: 3, sm: 3, lg: 3.8 },
        pb: { xs: 3, sm: 4.2, lg: 5.2 },
        scrollSnapAlign: 'start',
      }}
    >
      <Box
        component="img"
        src={lhtstudioLogo}
        alt="LHT Studio"
        sx={{
          width: { xs: 108, sm: 170, md: 200 },
          mb: { xs: 0.8, sm: 2.8, lg: 0 },
        }}
      />
      <Box sx={{ display: { xs: 'none', lg: 'block' } }}>
        <BetaBubble onSelect={onSelect} />
      </Box>
      <Box
        sx={{
          mt: { xs: 0, lg: 3.2 },
          display: { xs: 'block', lg: 'grid' },
          gridTemplateColumns: {
            lg: 'minmax(0, 1.1fr) minmax(380px, 0.82fr)',
            xl: 'minmax(0, 1.14fr) minmax(420px, 0.86fr)',
          },
          alignItems: 'center',
          gap: { lg: 4.5, xl: 6.2 },
          minHeight: { lg: 'calc(100svh - 158px)' },
        }}
      >
        <Box sx={{ display: { xs: 'flex', lg: 'none' }, justifyContent: 'center' }}>
          <BetaBubble onSelect={onSelect} compact />
        </Box>
        <Box
          sx={{
            minWidth: 0,
            width: '100%',
            mt: { xs: 1.1, sm: 3.2, lg: 0 },
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: { lg: 'flex-start' },
          }}
        >
          <Box
            component="img"
            src={heroShot}
            alt="KIGTTS 视觉主体"
            sx={{
              width: { xs: 'auto', sm: '100%' },
              maxWidth: { xs: '100%', sm: '100%', lg: 'min(58vw, 980px)', xl: 'min(56vw, 1080px)' },
              maxHeight: { xs: 214, sm: 'none' },
              display: 'block',
              marginInline: 'auto',
              filter: 'drop-shadow(0 18px 34px rgba(0,0,0,0.26))',
            }}
          />
        </Box>
        <Box sx={{ minWidth: 0, display: 'flex', justifyContent: { lg: 'flex-end' } }}>
          <HomeRightBlock onSelect={onSelect} compact />
        </Box>
      </Box>
    </Box>
  );
}

export function AboutSection() {
  return (
    <Box
      sx={{
        minHeight: '100svh',
        px: { xs: 2.5, sm: 3.6, lg: 6.4 },
        py: { xs: 3.2, lg: 5.4 },
        display: 'grid',
        placeItems: 'center',
      }}
    >
      <Box
        sx={{
          width: { xs: '100%', lg: '74%', xl: '68%' },
          minHeight: { xs: 420, md: 520, lg: 560 },
          ...md2Surface,
          boxShadow: md2RaisedShadow,
          px: { xs: 3.2, md: 5.6 },
          pt: { xs: 7, md: 8.5 },
        }}
      >
        <Typography
          sx={{
            color: alpha('#ffffff', 0.82),
            fontSize: '0.9rem',
            letterSpacing: '0.18em',
            textAlign: 'center',
          }}
        >
          ABOUT
        </Typography>
        <Typography
          sx={{
            mt: { xs: 3.6, md: 5.8 },
            textAlign: 'center',
            color: '#f5f7f7',
            fontSize: { xs: '1.55rem', md: '2.05rem' },
            fontWeight: 400,
            letterSpacing: '0.01em',
          }}
        >
          这是MD2风格的介绍页面，随便加些什么
        </Typography>
      </Box>
    </Box>
  );
}

export function DownloadSection() {
  return (
    <Box
      sx={{
        minHeight: '100svh',
        px: { xs: 2.5, sm: 3.6, lg: 5.8 },
        py: { xs: 3.2, lg: 4.4 },
      }}
    >
      <Typography sx={{ color: alpha('#ffffff', 0.82), fontSize: '0.9rem', letterSpacing: '0.18em' }}>
        DOWNLOAD
      </Typography>
      <Typography
        sx={{
          mt: 1.8,
          maxWidth: 680,
          fontSize: { xs: '2rem', md: '2.7rem' },
          lineHeight: 1.1,
          color: '#f5f7f7',
        }}
      >
        下载区保持跟首页同一套块面逻辑，只把重点压到二维码和按钮入口。
      </Typography>
      <Grid container spacing={3} sx={{ mt: 3.2 }}>
        <Grid size={{ xs: 12, lg: 7.2 }}>
          <Box
            sx={{
              minHeight: 360,
              p: { xs: 2.8, md: 3.6 },
              ...md2Surface,
            }}
          >
            <Stack spacing={2.4}>
              {downloadNotes.map((item, index) => (
                <Box key={item} sx={{ display: 'flex', gap: 2 }}>
                  <Typography sx={{ minWidth: 34, color: '#79d6d9', fontSize: '1.2rem' }}>
                    0{index + 1}
                  </Typography>
                  <Typography sx={{ color: alpha('#ffffff', 0.76), lineHeight: 1.8 }}>{item}</Typography>
                </Box>
              ))}
            </Stack>
          </Box>
        </Grid>
        <Grid size={{ xs: 12, lg: 4.8 }}>
          <Stack direction={{ xs: 'column', sm: 'row', lg: 'column' }} spacing={2.2}>
            <QrPanel />
            <DownloadPanel />
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}

export function LabSection({ onSelect }) {
  return (
    <Box
      sx={{
        minHeight: '100svh',
        px: { xs: 2.5, sm: 3.6, lg: 5.8 },
        py: { xs: 3.2, lg: 4.4 },
      }}
    >
      <Typography sx={{ color: alpha('#ffffff', 0.82), fontSize: '0.9rem', letterSpacing: '0.18em' }}>
        BETA / LAB
      </Typography>
      <Grid container spacing={3} sx={{ mt: 1.6 }}>
        <Grid size={{ xs: 12, lg: 7.2 }}>
          <Box
            sx={{
              minHeight: 430,
              p: { xs: 2.8, md: 3.6 },
              background: `linear-gradient(155deg, ${alpha('#152425', 0.98)} 0%, ${alpha(
                '#0f6f73',
                0.28,
              )} 100%)`,
              border: `1px solid ${alpha('#ffffff', 0.04)}`,
              borderRadius: 1,
              boxShadow: md2RaisedShadow,
            }}
          >
            <Typography
              sx={{
                maxWidth: 720,
                fontSize: { xs: '2rem', md: '2.8rem' },
                lineHeight: 1.08,
                color: '#f5f7f7',
              }}
            >
              这里留给 Flutter Beta、实验功能和未来路线图，不跟首页抢同一个视觉中心。
            </Typography>
            <Grid container spacing={2} sx={{ mt: 3.4 }}>
              {labItems.map((item) => (
                <Grid key={item} size={{ xs: 12, md: 4 }}>
                  <Box
                    sx={{
                      height: '100%',
                      p: 2.2,
                      backgroundColor: alpha('#0a1415', 0.54),
                      border: `1px solid ${alpha('#ffffff', 0.06)}`,
                      borderRadius: 1,
                    }}
                  >
                    <Typography sx={{ color: alpha('#ffffff', 0.72), lineHeight: 1.8 }}>{item}</Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Grid>
        <Grid size={{ xs: 12, lg: 4.8 }}>
          <Stack spacing={2.2}>
            <BetaBubble onSelect={() => onSelect?.('home')} compact />
            <Box
              sx={{
                p: { xs: 2.8, md: 3.2 },
                ...md2Surface,
              }}
            >
              <Stack spacing={2}>
                <Typography sx={{ fontSize: '1.4rem', color: '#f5f7f7' }}>可继续接入</Typography>
                <Divider sx={{ borderColor: alpha('#ffffff', 0.08) }} />
                <Typography sx={{ color: alpha('#ffffff', 0.72), lineHeight: 1.8 }}>
                  后续把 Beta 的真实入口、更新日志和测试说明接进来就可以，不需要再改整套布局。
                </Typography>
                <Button
                  startIcon={<SymbolIcon name="deployed_code" size={22} />}
                  sx={{
                    alignSelf: 'flex-start',
                    px: 3.4,
                    ...md2Button,
                    minHeight: 44,
                    justifyContent: 'center',
                  }}
                >
                  保留实验入口
                </Button>
              </Stack>
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
