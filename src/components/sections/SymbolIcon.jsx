import { Icon } from '@mui/material';

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
