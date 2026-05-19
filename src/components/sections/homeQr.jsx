import { Box, Button, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { QRCodeSVG } from 'qrcode.react';
import { useRef, useState } from 'react';
import { feedbackGroupUrl, qrValue } from './data';
import { SymbolIcon } from './SymbolIcon';
import { md2Button } from './styles';
import { scaledPx } from './utils';
export function RealQr({ compact = false, densityScale = 1, value = qrValue }) {
  const compactSize = scaledPx(108, densityScale, 78);
  const qrSize = scaledPx(96, densityScale, 68);

  return (
    <Box
      sx={{
        width: compact ? compactSize : { xs: 116, sm: 168 },
        height: compact ? compactSize : { xs: 116, sm: 168 },
        p: compact ? 0.75 : { xs: 0.85, sm: 1.25 },
        backgroundColor: '#fbfbfb',
        borderRadius: 0.5,
        boxShadow: '0 1px 2px rgba(0,0,0,0.16)',
      }}
    >
      <QRCodeSVG
        value={value}
        size={compact ? qrSize : 144}
        level="M"
        bgColor="#ffffff"
        fgColor="#111111"
        marginSize={1}
        style={{ display: 'block', width: '100%', height: '100%' }}
      />
    </Box>
  );
}

export function FeedbackGroupButton({ compact = false, densityScale = 1, mobileFullWidth = false }) {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const containerRef = useRef(null);

  const handleClick = (e) => {
    if (!popoverOpen) {
      e.preventDefault();
      setPopoverOpen(true);
    }
  };

  return (
    <Box
      ref={containerRef}
      onMouseEnter={() => setPopoverOpen(true)}
      onMouseLeave={() => setPopoverOpen(false)}
      sx={{
        position: 'relative',
        flex: { xs: mobileFullWidth ? '1 1 100%' : '0 1 50%', sm: '0 1 50%' },
        width: { xs: mobileFullWidth ? '100%' : 'auto', sm: 'auto' },
        minWidth: 0,
        display: 'flex',
      }}
    >
      <Button
        fullWidth
        component="a"
        href={feedbackGroupUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        startIcon={<SymbolIcon name="forum" size={compact ? 20 : 24} />}
        sx={{
          ...md2Button,
          minWidth: 0,
          minHeight: compact ? { xs: 42, sm: 58, md: 66 } : { xs: 48, sm: 60, lg: 66 },
          px: compact ? { xs: 1.05, sm: 1.55 } : 2.1,
          fontSize: compact ? { xs: '0.78rem', sm: '0.98rem', md: '1.12rem' } : { xs: '0.92rem', sm: '1.08rem', md: '1.18rem' },
          whiteSpace: 'nowrap',
          justifyContent: 'center',
          '& .MuiButton-startIcon': {
            mr: compact ? 0.45 : 0.7,
          },
        }}
      >
        加入反馈群
      </Button>
      <Box
        sx={[
          {
            display: { xs: 'none', lg: 'flex' },
            flexDirection: 'column',
            alignItems: 'center',
            position: 'absolute',
            left: '50%',
            bottom: 'calc(100% + 12px)',
            zIndex: 20,
            width: 186,
            p: 1.6,
            color: '#eef8f8',
            textAlign: 'center',
            backgroundColor: alpha('#252a2b', 0.98),
            border: `1px solid ${alpha('#ffffff', 0.08)}`,
            boxShadow: '0 14px 30px rgba(0,0,0,0.38)',
            borderRadius: 0.75,
            pointerEvents: popoverOpen ? 'auto' : 'none',
            opacity: popoverOpen ? 1 : 0,
            transform: popoverOpen ? 'translate(-50%, 0)' : 'translate(-50%, 8px)',
            transition: 'opacity 160ms ease, transform 180ms cubic-bezier(0.2, 0, 0, 1)',
          },
        ]}
      >
        <Box
          sx={{
            width: 138,
            height: 138,
            p: 1,
            backgroundColor: '#fbfbfb',
            borderRadius: 0.5,
            boxShadow: '0 1px 2px rgba(0,0,0,0.16)',
          }}
        >
          <QRCodeSVG
            value={feedbackGroupUrl}
            size={122}
            level="M"
            bgColor="#ffffff"
            fgColor="#111111"
            marginSize={1}
            style={{ display: 'block', width: '100%', height: '100%' }}
          />
        </Box>
        <Typography sx={{ mt: 0.85, fontSize: '0.82rem', color: alpha('#f5fbfb', 0.74), lineHeight: 1.35 }}>
          QQ 扫码加入反馈群
        </Typography>
      </Box>
    </Box>
  );
}
