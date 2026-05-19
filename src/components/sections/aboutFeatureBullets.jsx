import { Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
export function FeatureBulletList({ bullets, compact = false }) {
  return (
    <Stack spacing={compact ? 0.4 : { xs: 0.45, sm: 0.6 }} sx={compact ? undefined : { '@media (orientation: landscape)': { gap: 0.25 } }}>
      {bullets.map((item, index) => (
        <Stack key={item} direction="row" spacing={0.8} alignItems="center">
          <Typography
            sx={{
              width: 28,
              color: '#8ff5f7',
              fontSize: compact ? '0.68rem' : { xs: '0.68rem', sm: '0.76rem' },
              fontWeight: 700,
            }}
          >
            0{index + 1}
          </Typography>
          <Typography
            sx={{
              minWidth: 0,
              color: alpha('#ffffff', 0.74),
              fontSize: compact ? { xs: '0.72rem', sm: '0.8rem' } : { xs: '0.74rem', sm: '0.84rem', md: '0.9rem' },
              lineHeight: compact ? 1.35 : 1.38,
              overflow: compact ? 'visible' : 'hidden',
              textOverflow: compact ? 'clip' : 'ellipsis',
              whiteSpace: compact ? 'normal' : 'nowrap',
              '@media (orientation: landscape)': compact ? undefined : {
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
  );
}
