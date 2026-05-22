import { Box, Button, Divider, Grid, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import {
  acknowledgementLibraries,
  androidAgreementUrl,
  androidLicenseUrl,
  androidPrivacyUrl,
  friendLinks,
  producerCredits,
  trainerLicenseUrl,
  trainerPrivacyUrl,
} from './data';
import { CreditLogo } from './CreditLogo';
import { SymbolIcon } from './SymbolIcon';
import { centeredContentSx, md2Button, md2RaisedShadow, md2Surface } from './styles';
export function CreditsSection() {
  return (
    <Box
      sx={{
        height: '100%',
        width: '100%',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        px: { xs: 0.85, sm: 2.4, lg: 5.4, xl: 6.4 },
        py: { xs: 0.8, sm: 2.2, lg: 3.6 },
        overflow: 'hidden',
      }}
    >
      <Box sx={{ ...centeredContentSx, maxWidth: { xs: '100%', lg: 1420, xl: 1580 } }}>
        <Typography
          sx={{
            color: alpha('#ffffff', 0.82),
            fontSize: { xs: '0.78rem', sm: '0.9rem' },
            letterSpacing: '0.18em',
            textAlign: { xs: 'center', lg: 'left' },
          }}
        >
          鸣谢
        </Typography>
        <Typography
          sx={{
            mt: { xs: 0.65, sm: 1 },
            maxWidth: 840,
            mx: { xs: 'auto', lg: 0 },
            color: '#f5f7f7',
            fontSize: { xs: '1.62rem', sm: '2.1rem', lg: '2.58rem' },
            lineHeight: { xs: 1.12, sm: 1.08 },
            fontWeight: 700,
            letterSpacing: '-0.03em',
            textAlign: { xs: 'center', lg: 'left' },
          }}
        >
          <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
            制作团队与项目鸣谢
          </Box>
          <Box component="span" sx={{ display: { xs: 'inline', sm: 'none' } }}>
            鸣谢
          </Box>
        </Typography>
        <Typography
          sx={{
            mt: { xs: 0.55, sm: 0.85 },
            maxWidth: 760,
            mx: { xs: 'auto', lg: 0 },
            color: alpha('#ffffff', 0.64),
            fontSize: { xs: '0.74rem', sm: '0.9rem' },
            lineHeight: 1.5,
            textAlign: { xs: 'center', lg: 'left' },
          }}
        >
          感谢一起完成 KIGTTS 的朋友，也感谢支撑识别、朗读和训练能力的开源项目。
        </Typography>
      </Box>

      <Box
        data-inner-scroll="true"
        sx={{
          ...centeredContentSx,
          maxWidth: { xs: '100%', lg: 1420, xl: 1580 },
          flex: '0 1 auto',
          minHeight: 0,
          mt: { xs: 0.75, sm: 1.8, lg: 2.4 },
          overflowY: 'auto',
          overflowX: 'hidden',
          pb: { xs: 1.2, lg: 0 },
          scrollbarWidth: 'thin',
        }}
      >
        <Grid container spacing={{ xs: 1.05, sm: 1.6, lg: 2.2 }} sx={{ height: '100%', minHeight: 0 }}>
          <Grid size={{ xs: 12, lg: 4 }}>
            <Stack spacing={{ xs: 1.05, sm: 1.35 }} sx={{ height: '100%', minHeight: 0 }}>
              <Box
                sx={{
                  p: { xs: 0.95, sm: 2, lg: 2.35 },
                  ...md2Surface,
                  borderRadius: 0.8,
                  boxShadow: md2RaisedShadow,
                  background: `
                    linear-gradient(145deg, ${alpha('#038387', 0.26)} 0%, transparent 42%),
                    repeating-linear-gradient(135deg, ${alpha('#ffffff', 0.035)} 0 1px, transparent 1px 16px),
                    ${alpha('#2f3132', 0.95)}
                  `,
                }}
              >
                <Typography sx={{ color: alpha('#ffffff', 0.54), fontSize: '0.72rem', letterSpacing: '0.16em', fontWeight: 700 }}>
                  制作团队
                </Typography>
                <Stack spacing={{ xs: 0.7, sm: 1.05 }} sx={{ mt: { xs: 0.75, sm: 1.5 } }}>
                  {producerCredits.map((producer, index) => (
                    <Box
                      key={producer.name}
                      component={producer.href ? 'a' : 'div'}
                      href={producer.href}
                      target={producer.href ? '_blank' : undefined}
                      rel={producer.href ? 'noopener noreferrer' : undefined}
                      sx={{
                        display: 'grid',
                        gridTemplateColumns: 'auto minmax(0, 1fr) auto',
                        gap: { xs: 0.8, sm: 1 },
                        alignItems: 'center',
                        p: { xs: 0.65, sm: 0.95 },
                        color: 'inherit',
                        textDecoration: 'none',
                        backgroundColor: alpha('#0a1415', 0.48),
                        border: `1px solid ${alpha('#ffffff', 0.07)}`,
                        borderRadius: 0.6,
                        transition: 'border-color 180ms ease, background-color 180ms ease',
                        '&:hover': producer.href ? {
                          backgroundColor: alpha('#0a1415', 0.62),
                          borderColor: alpha('#8ff5f7', 0.28),
                        } : undefined,
                      }}
                    >
                      <Box
                        component="img"
                        src={producer.avatar}
                        alt={producer.name}
                        sx={{
                          width: { xs: 38, sm: 48 },
                          height: { xs: 38, sm: 48 },
                          objectFit: 'cover',
                          borderRadius: '50%',
                          border: `2px solid ${index === 0 ? '#8ff5f7' : alpha('#ffffff', 0.36)}`,
                          boxShadow: index === 0 ? `0 0 18px ${alpha('#038387', 0.68)}` : '0 4px 10px rgba(0,0,0,0.32)',
                        }}
                      />
                      <Box sx={{ minWidth: 0 }}>
                        <Typography sx={{ color: '#f5f7f7', fontSize: { xs: '0.9rem', sm: '1.08rem' }, fontWeight: 700, whiteSpace: 'nowrap' }}>
                          {producer.name}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          width: { xs: 28, sm: 34 },
                          height: { xs: 28, sm: 34 },
                          display: 'grid',
                          placeItems: 'center',
                          color: '#ffffff',
                          backgroundColor: index === 0 ? '#038387' : alpha('#ffffff', 0.1),
                          borderRadius: 0.45,
                        }}
                      >
                        <SymbolIcon name="open_in_new" size={18} />
                      </Box>
                    </Box>
                  ))}
                </Stack>
              </Box>

              <Box sx={{ p: { xs: 0.95, sm: 1.8 }, ...md2Surface, borderRadius: 0.8, order: { xs: 2, lg: 3 } }}>
                <Typography sx={{ color: alpha('#ffffff', 0.54), fontSize: '0.72rem', letterSpacing: '0.16em', fontWeight: 700 }}>
                  使用前须知
                </Typography>
                <Typography sx={{ mt: 0.65, color: alpha('#ffffff', 0.76), lineHeight: 1.44, fontSize: { xs: '0.68rem', sm: '0.9rem' } }}>
                  使用前请查看用户协议、开源许可与隐私政策。
                </Typography>
                <Grid container spacing={0.8} sx={{ mt: 1.25 }}>
                  {[
                    ['Android 开源许可证', 'android', androidLicenseUrl],
                    ['Android 隐私说明', 'policy', androidPrivacyUrl],
                    ['Android 用户协议', 'description', androidAgreementUrl],
                    ['训练器开源许可证', 'laptop_mac', trainerLicenseUrl],
                    ['训练器隐私说明', 'privacy_tip', trainerPrivacyUrl],
                  ].map(([label, icon, href]) => (
                    <Grid key={label} size={{ xs: 12, sm: 6, lg: 6 }}>
                      <Button
                        fullWidth
                        component="a"
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        startIcon={<SymbolIcon name={icon} size={20} />}
                        sx={{
                          ...md2Button,
                          minHeight: { xs: 36, sm: 40 },
                          px: 1.1,
                          justifyContent: 'center',
                          fontSize: { xs: '0.74rem', sm: '0.82rem' },
                        }}
                      >
                        {label}
                      </Button>
                    </Grid>
                  ))}
                </Grid>
              </Box>

            </Stack>
          </Grid>

          <Grid size={{ xs: 12, lg: 8 }}>
            <Box
              sx={{
                height: '100%',
                minHeight: 0,
                p: { xs: 1.05, sm: 1.35, lg: 1.6 },
                ...md2Surface,
                borderRadius: 0.8,
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: { xs: 1, sm: 1.25 } }}>
                <Box sx={{ width: 4, height: 28, backgroundColor: '#038387', boxShadow: `0 0 18px ${alpha('#038387', 0.72)}` }} />
                <Box>
                  <Typography sx={{ color: '#f5f7f7', fontSize: { xs: '1.02rem', sm: '1.2rem' }, fontWeight: 700 }}>
                    项目鸣谢
                  </Typography>
                  <Typography sx={{ color: alpha('#ffffff', 0.54), fontSize: { xs: '0.68rem', sm: '0.76rem' } }}>
                    感谢这些项目为识别、朗读、界面和语音包制作提供支持。
                  </Typography>
                </Box>
              </Stack>
              <Box
                sx={{
                  minHeight: 0,
                  overflowX: 'auto',
                  overflowY: 'hidden',
                  pb: 0.8,
                  scrollbarWidth: 'thin',
                  '&::-webkit-scrollbar': { height: 7 },
                  '&::-webkit-scrollbar-thumb': {
                    backgroundColor: alpha('#77d7d9', 0.28),
                    borderRadius: 999,
                  },
                }}
              >
                <Stack direction="row" spacing={{ xs: 0.85, sm: 1.1, xl: 1.35 }} sx={{ width: 'max-content', minWidth: '100%' }}>
                  {acknowledgementLibraries.map((item) => (
                    <Box
                      key={item.name}
                      sx={{
                        flex: '0 0 auto',
                        width: item.featured
                          ? { xs: 188, sm: 218, lg: 224, xl: 244 }
                          : { xs: 142, sm: 160, lg: 168, xl: 178 },
                      }}
                    >
                      <CreditLogo item={item} />
                    </Box>
                  ))}
                </Stack>
              </Box>

              <Divider sx={{ my: { xs: 1.1, sm: 1.35 }, borderColor: alpha('#ffffff', 0.08) }} />

              <Box
                data-inner-scroll="true"
                sx={{
                  minHeight: 0,
                  overflowY: 'auto',
                  pr: { xs: 0.2, sm: 0.5 },
                  scrollbarWidth: 'thin',
                  '&::-webkit-scrollbar': { width: 7 },
                  '&::-webkit-scrollbar-thumb': {
                    backgroundColor: alpha('#77d7d9', 0.28),
                    borderRadius: 999,
                  },
                }}
              >
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: { xs: 0.85, sm: 1 } }}>
                  <Box sx={{ width: 4, height: 24, backgroundColor: '#038387', boxShadow: `0 0 16px ${alpha('#038387', 0.56)}` }} />
                  <Box>
                    <Typography sx={{ color: '#f5f7f7', fontSize: { xs: '0.96rem', sm: '1.08rem' }, fontWeight: 700 }}>
                      相关链接
                    </Typography>
                    <Typography sx={{ color: alpha('#ffffff', 0.54), fontSize: { xs: '0.66rem', sm: '0.74rem' } }}>
                      下载页面与制作成员主页
                    </Typography>
                  </Box>
                </Stack>
                <Grid container spacing={{ xs: 0.75, sm: 0.9 }}>
                  {friendLinks.map((link) => (
                    <Grid key={link.name} size={{ xs: 12, sm: 6, xl: 4 }}>
                      <Box
                        component="a"
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                          display: 'grid',
                          gridTemplateColumns: 'auto minmax(0, 1fr) auto',
                          gap: 0.85,
                          alignItems: 'center',
                          minHeight: { xs: 40, sm: 46 },
                          px: { xs: 0.9, sm: 1.05 },
                          py: { xs: 0.65, sm: 0.75 },
                          color: 'inherit',
                          textDecoration: 'none',
                          backgroundColor: alpha('#0a1415', 0.42),
                          border: `1px solid ${alpha('#ffffff', 0.07)}`,
                          borderRadius: 0.55,
                          transition: 'background-color 180ms ease, border-color 180ms ease, transform 180ms ease',
                          '&:hover': {
                            backgroundColor: alpha('#0a1415', 0.62),
                            borderColor: alpha('#8ff5f7', 0.3),
                            transform: 'translateY(-1px)',
                          },
                        }}
                      >
                        <Box
                          sx={{
                            width: 30,
                            height: 30,
                            display: 'grid',
                            placeItems: 'center',
                            color: '#ffffff',
                            backgroundColor: alpha('#038387', 0.72),
                            borderRadius: 0.45,
                          }}
                        >
                          <SymbolIcon name={link.icon} size={18} />
                        </Box>
                        <Box sx={{ minWidth: 0 }}>
                          <Typography sx={{ color: '#f5f7f7', fontSize: { xs: '0.76rem', sm: '0.84rem' }, fontWeight: 700, lineHeight: 1.16 }}>
                            {link.name}
                          </Typography>
                          <Typography sx={{ mt: 0.1, color: alpha('#ffffff', 0.52), fontSize: { xs: '0.62rem', sm: '0.68rem' }, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {link.caption}
                          </Typography>
                        </Box>
                        <SymbolIcon name="open_in_new" size={16} sx={{ color: alpha('#ffffff', 0.56) }} />
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={{ xs: 0.35, sm: 2.2 }}
        alignItems="center"
        justifyContent="center"
        sx={{
          mt: { xs: 0.9, sm: 1.3 },
          color: alpha('#ffffff', 0.48),
          fontSize: { xs: '0.66rem', sm: '0.76rem' },
          letterSpacing: '0.04em',
        }}
      >
        <Typography sx={{ fontSize: 'inherit', color: 'inherit' }}>ICP备案号：待填写</Typography>
        <Typography sx={{ fontSize: 'inherit', color: 'inherit' }}>公网安备：待填写</Typography>
      </Stack>
    </Box>
  );
}
