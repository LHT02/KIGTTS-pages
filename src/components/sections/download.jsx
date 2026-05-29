import { Box, Button, Divider, Grid, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { downloadTabs } from './data';
import { featurePanelEnter } from './motion';
import { SymbolIcon } from './SymbolIcon';
import { centeredContentSx, centeredSectionSx, md2Button, md2RaisedShadow, md2Surface, md2SurfaceShadow } from './styles';
export function DownloadSection({ activeTabId: activeTabIdProp, onTabChange }) {
  const [localActiveTabId, setLocalActiveTabId] = useState(downloadTabs[0].id);
  const [hoveredAction, setHoveredAction] = useState(-1);
  const activeTabId = activeTabIdProp ?? localActiveTabId;
  const activeIndex = downloadTabs.findIndex((item) => item.id === activeTabId);
  const currentDownload = downloadTabs[activeIndex] ?? downloadTabs[0];
  const setActiveDownloadTab = (tabId) => {
    setLocalActiveTabId(tabId);
    onTabChange?.(tabId);
  };

  const goToDownloadTab = (offset) => {
    const nextIndex = (activeIndex + offset + downloadTabs.length) % downloadTabs.length;
    setActiveDownloadTab(downloadTabs[nextIndex].id);
  };

  return (
    <Box
      sx={{
        height: '100%',
        width: '100%',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        px: { xs: 1.2, sm: 2.8, lg: 5.8 },
        py: { xs: 1.4, sm: 3.2, lg: 4.4 },
        overflow: 'hidden',
      }}
    >
      <Box sx={{ ...centeredContentSx, maxWidth: { xs: '100%', lg: 1180, xl: 1320 }, flexShrink: 0 }}>
        <Typography
          sx={{
            color: alpha('#ffffff', 0.82),
            fontSize: { xs: '0.78rem', sm: '0.9rem' },
            letterSpacing: '0.18em',
            textAlign: 'center',
          }}
        >
          DOWNLOAD / 下载
        </Typography>
        <Typography
          sx={{
            mt: { xs: 0.8, sm: 1.4 },
            maxWidth: 760,
            mx: 'auto',
            fontSize: { xs: '1.62rem', sm: '2.1rem', md: '2.55rem' },
            lineHeight: { xs: 1.12, sm: 1.08 },
            color: '#f5f7f7',
            fontWeight: 700,
            letterSpacing: '-0.03em',
            textAlign: 'center',
          }}
        >
          选择适合的版本
        </Typography>
        <Typography
          sx={{
            mt: { xs: 0.55, sm: 0.85 },
            maxWidth: 760,
            mx: 'auto',
            color: alpha('#ffffff', 0.64),
            fontSize: { xs: '0.74rem', sm: '0.9rem' },
            lineHeight: 1.5,
            textAlign: 'center',
          }}
        >
          按提示下载和安装。
        </Typography>
      </Box>

      <Box
        data-inner-scroll="true"
        sx={{
          ...centeredContentSx,
          maxWidth: { xs: '100%', lg: 1180, xl: 1320 },
          flex: '0 1 auto',
          minHeight: 0,
          mt: { xs: 1.25, sm: 2.4, lg: 3 },
          overflowY: 'auto',
          overflowX: 'hidden',
          pb: { xs: 1, sm: 1.4 },
          scrollbarWidth: 'thin',
          '&::-webkit-scrollbar': { width: 7 },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: alpha('#77d7d9', 0.28),
            borderRadius: 999,
          },
        }}
      >
        <Box
          sx={{
            mx: 'auto',
            ...md2Surface,
            maxWidth: 1040,
            overflow: 'hidden',
            boxShadow: md2RaisedShadow,
            background: `
              linear-gradient(135deg, ${alpha('#038387', 0.22)} 0%, transparent 36%, ${alpha('#038387', 0.1)} 100%),
              repeating-linear-gradient(135deg, ${alpha('#ffffff', 0.035)} 0 1px, transparent 1px 18px),
              ${alpha('#2f3132', 0.96)}
            `,
          }}
        >
          <Box
            role="tablist"
            aria-label="下载类型"
            sx={{
              display: 'grid',
              // TODO: Flutter Beta 恢复后改回 repeat(3, 1fr)
              gridTemplateColumns: 'repeat(2, 1fr)',
              backgroundColor: alpha('#0a1415', 0.52),
              borderBottom: `1px solid ${alpha('#ffffff', 0.08)}`,
            }}
          >
            {downloadTabs.map((tab) => {
              const selected = tab.id === currentDownload.id;

              return (
                <Button
                  key={tab.id}
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setActiveDownloadTab(tab.id)}
                  startIcon={<SymbolIcon name={tab.icon} size={23} />}
                  sx={{
                    minHeight: { xs: 44, sm: 58 },
                    borderRadius: 0,
                    justifyContent: 'center',
                    color: selected ? '#ffffff' : alpha('#ffffff', 0.66),
                    backgroundColor: selected ? alpha('#038387', 0.34) : 'transparent',
                    borderRight: `1px solid ${alpha('#ffffff', 0.06)}`,
                    fontWeight: selected ? 700 : 500,
                    fontSize: { xs: '0.72rem', sm: '0.875rem' },
                    px: { xs: 0.3, sm: 1.2 },
                    '&:last-of-type': {
                      borderRight: 'none',
                    },
                    '&:hover': {
                      backgroundColor: selected ? alpha('#038387', 0.38) : alpha('#ffffff', 0.05),
                    },
                  }}
                >
                  {tab.label}
                </Button>
              );
            })}
          </Box>

          <Grid
            key={currentDownload.id}
            container
            spacing={{ xs: 1.4, md: 2.4 }}
            sx={{
              p: { xs: 1, sm: 2.2, md: 3 },
              minHeight: { xs: 'auto', sm: 420, md: 430 },
              animation: `${featurePanelEnter} 360ms cubic-bezier(0.2, 0.8, 0.2, 1)`,
            }}
          >
            <Grid size={{ xs: 12, md: 7.2 }}>
              <Stack spacing={{ xs: 1.25, sm: 1.8 }} sx={{ height: '100%' }}>
                <Box
                  sx={{
                    p: { xs: 1, sm: 2.1, md: 2.4 },
                    backgroundColor: alpha('#0a1415', 0.5),
                    border: `1px solid ${alpha('#ffffff', 0.07)}`,
                    borderRadius: 0.7,
                    boxShadow: md2SurfaceShadow,
                  }}
                >
                  <Stack direction="row" spacing={1.25} alignItems="center">
                    <Box
                      sx={{
                        width: { xs: 40, sm: 52 },
                        height: { xs: 40, sm: 52 },
                        display: 'grid',
                        placeItems: 'center',
                        borderRadius: 0.7,
                        backgroundColor: currentDownload.id === 'beta' ? alpha('#ffffff', 0.13) : '#038387',
                        boxShadow: '0 2px 5px rgba(0,0,0,0.28)',
                        flexShrink: 0,
                      }}
                    >
                      <SymbolIcon name={currentDownload.icon} size={28} sx={{ color: '#ffffff' }} />
                    </Box>
                    <Box sx={{ minWidth: 0 }}>
                      <Typography sx={{ color: alpha('#ffffff', 0.52), fontSize: { xs: '0.62rem', sm: '0.76rem' }, letterSpacing: '0.14em', fontWeight: 700 }}>
                        {currentDownload.eyebrow}
                      </Typography>
                      <Typography sx={{ mt: 0.25, color: '#f5f7f7', fontSize: { xs: '1.24rem', sm: '2rem', md: '2.35rem' }, lineHeight: 1.04, fontWeight: 700 }}>
                        {currentDownload.title}
                      </Typography>
                    </Box>
                  </Stack>
                </Box>

                <Grid container spacing={{ xs: 0.7, sm: 1 }}>
                  {currentDownload.meta.map(([label, value]) => (
                    <Grid key={label} size={{ xs: 4, sm: 4 }}>
                      <Box
                        sx={{
                          minHeight: { xs: 46, sm: 54 },
                          p: { xs: 0.7, sm: 1.15 },
                          backgroundColor: alpha('#ffffff', 0.07),
                          border: `1px solid ${alpha('#ffffff', 0.06)}`,
                          borderRadius: 0.5,
                        }}
                      >
                        <Typography sx={{ color: '#8ff5f7', fontSize: { xs: '0.62rem', sm: '0.68rem' }, fontWeight: 700, letterSpacing: '0.08em' }}>
                          {label}
                        </Typography>
                        <Typography sx={{ mt: 0.25, color: alpha('#ffffff', 0.78), fontSize: { xs: '0.72rem', sm: '0.9rem' }, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {value}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>

                <Box
                  sx={{
                    flex: 1,
                    minHeight: { xs: 124, sm: 154 },
                    p: { xs: 1, sm: 1.8 },
                    backgroundColor: alpha('#2f3132', 0.86),
                    border: `1px solid ${alpha('#ffffff', 0.07)}`,
                    borderRadius: 0.7,
                    boxShadow: md2SurfaceShadow,
                  }}
                >
                  <Typography sx={{ color: alpha('#ffffff', 0.52), fontSize: '0.72rem', letterSpacing: '0.16em', fontWeight: 700 }}>
                    适用说明
                  </Typography>
                  <Typography
                    sx={{
                      mt: 0.65,
                      color: alpha('#ffffff', 0.8),
                      fontSize: { xs: '0.78rem', sm: '0.98rem' },
                      lineHeight: { xs: 1.45, sm: 1.68 },
                      display: '-webkit-box',
                      WebkitBoxOrient: 'vertical',
                      WebkitLineClamp: { xs: 2, sm: 4 },
                      overflow: 'hidden',
                    }}
                  >
                    {currentDownload.summary}
                  </Typography>
                  <Divider sx={{ my: { xs: 0.75, sm: 1.2 }, borderColor: alpha('#ffffff', 0.08) }} />
                  <Stack spacing={{ xs: 0.3, sm: 0.55 }}>
                    {currentDownload.bullets.map((item, index) => (
                      <Stack key={item} direction="row" spacing={1} alignItems="center">
                        <Typography sx={{ width: 28, color: '#8ff5f7', fontSize: { xs: '0.68rem', sm: '0.76rem' }, fontWeight: 700 }}>
                          0{index + 1}
                        </Typography>
                        <Typography sx={{ color: alpha('#ffffff', 0.74), fontSize: { xs: '0.7rem', sm: '0.88rem' }, lineHeight: { xs: 1.25, sm: 1.38 } }}>
                          {item}
                        </Typography>
                      </Stack>
                    ))}
                  </Stack>
                </Box>
              </Stack>
            </Grid>

            <Grid size={{ xs: 12, md: 4.8 }}>
              <Stack spacing={1.3} sx={{ height: '100%' }}>
                <Box
                  sx={{
                    display: { xs: 'none', sm: 'grid' },
                    flex: 1,
                    minHeight: { xs: 156, md: 'auto' },
                    p: { xs: 1.4, sm: 1.8, md: 2.2 },
                    backgroundColor: alpha('#0a1415', 0.48),
                    border: `1px solid ${alpha('#ffffff', 0.08)}`,
                    borderRadius: 0.7,
                    placeItems: 'center',
                    textAlign: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      inset: '-30%',
                      background: `radial-gradient(circle, ${alpha('#038387', 0.34)}, transparent 62%)`,
                      pointerEvents: 'none',
                    },
                  }}
                >
                  <Box sx={{ position: 'relative', width: '100%', height: '100%', display: 'grid', placeItems: 'center' }}>
                    <Box sx={{ transition: 'opacity 300ms ease', opacity: hoveredAction >= 0 ? 0 : 1, pointerEvents: hoveredAction >= 0 ? 'none' : 'auto' }}>
                      <Stack spacing={1} alignItems="center">
                        <SymbolIcon
                          name={currentDownload.id === 'beta' ? currentDownload.icon : currentDownload.id === 'android' ? 'apk_install' : 'folder_zip'}
                          size={58}
                          sx={{ color: currentDownload.id === 'beta' ? alpha('#ffffff', 0.52) : '#8ff5f7' }}
                        />
                        <Typography sx={{ color: '#f5f7f7', fontSize: { xs: '1.2rem', sm: '1.42rem' }, fontWeight: 700 }}>
                          {currentDownload.id === 'android' ? '手机安装包' : currentDownload.id === 'trainer' ? '电脑端训练器' : '还在准备中'}
                        </Typography>
                        <Typography sx={{ maxWidth: 280, color: alpha('#ffffff', 0.62), fontSize: { xs: '0.78rem', sm: '0.9rem' }, lineHeight: 1.5 }}>
                          {currentDownload.id === 'android'
                            ? '悬停下方按钮扫码下载'
                            : currentDownload.id === 'trainer'
                              ? '国内用户优先选择魔搭；如果访问慢，再尝试 Hugging Face。'
                              : 'Flutter Beta 暂未开放下载。上线后会在官网公布。'}
                        </Typography>
                      </Stack>
                    </Box>
                    <Box sx={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', transition: 'opacity 300ms ease', opacity: hoveredAction >= 0 && currentDownload.id === 'android' ? 1 : 0, pointerEvents: hoveredAction >= 0 ? 'auto' : 'none' }}>
                      <Box sx={{ p: 1, backgroundColor: '#fff', borderRadius: 1, boxShadow: '0 2px 8px rgba(0,0,0,0.3)', lineHeight: 0 }}>
                        <QRCodeSVG value={currentDownload.actions[hoveredAction]?.href ?? ''} size={120} level="M" bgColor="#ffffff" fgColor="#111111" />
                      </Box>
                      <Typography sx={{ mt: 0.5, color: alpha('#ffffff', 0.7), fontSize: '0.72rem', whiteSpace: 'nowrap', maxWidth: 200, textAlign: 'center', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {currentDownload.actions[hoveredAction]?.label ?? ''}
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                <Stack spacing={1}>
                  {currentDownload.actions.map((action, idx) => (
                    <Button
                      key={action.label}
                      fullWidth
                      component={action.href ? 'a' : 'button'}
                      href={action.href}
                      target={action.href ? '_blank' : undefined}
                      rel={action.href ? 'noopener noreferrer' : undefined}
                      disabled={action.disabled}
                      startIcon={<SymbolIcon name={action.icon} size={24} />}
                      onMouseEnter={() => currentDownload.id === 'android' ? setHoveredAction(idx) : null}
                      onMouseLeave={() => setHoveredAction(-1)}
                      sx={{
                        ...(action.primary ? md2Button : {
                          color: alpha('#ffffff', 0.82),
                          backgroundColor: alpha('#ffffff', 0.08),
                          border: `1px solid ${alpha('#ffffff', 0.1)}`,
                          '&:hover': {
                            backgroundColor: alpha('#ffffff', 0.12),
                          },
                        }),
                        minHeight: { xs: 46, sm: 54 },
                        justifyContent: 'center',
                        borderRadius: 0.7,
                        fontSize: { xs: '0.92rem', sm: '1.04rem' },
                        '&.Mui-disabled': {
                          color: alpha('#ffffff', 0.45),
                          backgroundColor: alpha('#ffffff', 0.06),
                          border: `1px solid ${alpha('#ffffff', 0.08)}`,
                        },
                      }}
                    >
                      {action.label}
                    </Button>
                  ))}
                </Stack>
              </Stack>
            </Grid>
          </Grid>

          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{
              px: { xs: 1.35, sm: 2.2, md: 3 },
              py: { xs: 1.15, sm: 1.4 },
              borderTop: `1px solid ${alpha('#ffffff', 0.08)}`,
              backgroundColor: alpha('#0a1415', 0.34),
            }}
          >
            <Button
              onClick={() => goToDownloadTab(-1)}
              startIcon={<SymbolIcon name="chevron_left" size={22} />}
              sx={{
                ...md2Button,
                minHeight: { xs: 34, sm: 38 },
                px: { xs: 1.15, sm: 1.7 },
                fontSize: { xs: '0.72rem', sm: '0.84rem' },
                borderRadius: 0.7,
              }}
            >
              上一项
            </Button>
            <Stack direction="row" spacing={0.55} alignItems="center">
              {downloadTabs.map((tab) => (
                <Box
                  key={tab.id}
                  component="button"
                  type="button"
                  aria-label={`切换到${tab.label}`}
                  onClick={() => setActiveDownloadTab(tab.id)}
                  sx={{
                    width: tab.id === currentDownload.id ? 24 : 8,
                    height: 8,
                    p: 0,
                    border: 0,
                    borderRadius: 999,
                    cursor: 'pointer',
                    backgroundColor: tab.id === currentDownload.id ? '#8ff5f7' : alpha('#ffffff', 0.3),
                    transition: 'width 180ms ease, background-color 180ms ease',
                  }}
                />
              ))}
            </Stack>
            <Button
              onClick={() => goToDownloadTab(1)}
              endIcon={<SymbolIcon name="chevron_right" size={22} />}
              sx={{
                ...md2Button,
                minHeight: { xs: 34, sm: 38 },
                px: { xs: 1.15, sm: 1.7 },
                fontSize: { xs: '0.72rem', sm: '0.84rem' },
                borderRadius: 0.7,
                justifyContent: 'center',
              }}
            >
              下一项
            </Button>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}
