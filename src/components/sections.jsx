import {
  Box,
  Button,
  Collapse,
  Divider,
  Grid,
  Icon,
  Stack,
  Typography,
} from '@mui/material';
import { alpha, keyframes } from '@mui/material/styles';
import { QRCodeSVG } from 'qrcode.react';
import { lazy, Suspense, useState } from 'react';
import subtitleScreen from '../../ART/ScreenShoot/便捷字幕.jpg';
import boardScreen from '../../ART/ScreenShoot/画板.jpg';
import cardScreen from '../../ART/ScreenShoot/快捷名片.jpg';
import floatingScreen from '../../ART/ScreenShoot/悬浮窗.png';
import trainerScreen from '../../ART/ScreenShoot/训练器.png';
import soundScreen from '../../ART/ScreenShoot/音效板.jpg';
import voicePackScreen from '../../ART/ScreenShoot/语音包.jpg';
import logoWhite from '../../ART/LOGOWhite.svg';
import lhtstudioLogo from '../../ART/lhtstudio.svg';

const GlassHeroModel = lazy(() => import('./GlassHeroModel').then((module) => ({ default: module.GlassHeroModel })));

export const navItems = [
  {
    id: 'home',
    label: '首页',
    caption: '了解 KIGTTS',
    icon: 'home',
  },
  {
    id: 'about',
    label: '介绍',
    caption: '功能怎么用',
    icon: 'graphic_eq',
  },
  {
    id: 'download',
    label: '下载',
    caption: '选择适合的版本',
    icon: 'download',
  },
  {
    id: 'credits',
    label: '鸣谢',
    caption: '团队与开源项目',
    icon: 'volunteer_activism',
  },
];

const betaLines = ['Flutter 新版', '即将上线'];
const qrValue = 'www.kigtts.lhtstudio.com';
const androidReleaseUrl = 'https://github.com/LHT02/KIGTTS/releases/tag/APP0.1.0';
const androidApkUrl = 'https://github.com/LHT02/KIGTTS/releases/download/APP0.1.0/app-release.apk';
const trainerModelScopeUrl = 'https://modelscope.cn/models/LHTSTUDIO/KIGTTS_TRAINER/files';
const trainerHuggingFaceUrl = 'https://huggingface.co/LHT02/kigtts-trainer/tree/main';
const projectUrl = 'https://github.com/LHT02/KIGTTS';
const androidLicenseUrl = './legal/android-license.html';
const androidPrivacyUrl = './legal/android-privacy.html';
const trainerLicenseUrl = './legal/trainer-license.html';
const trainerPrivacyUrl = './legal/trainer-privacy.html';
const lhtBilibiliUrl = 'https://space.bilibili.com/87244951';
const huajiangBilibiliUrl = 'https://space.bilibili.com/573842321';
const yuiBilibiliUrl = 'https://space.bilibili.com/23208863';

const downloadNotes = [
  `手机扫描二维码访问 ${qrValue}`,
  'Android 安装包来自 GitHub Release',
  '训练器可从魔搭或 Hugging Face 下载',
];

const producerCredits = [
  {
    name: 'LHT',
    href: lhtBilibiliUrl,
    avatar: './avatars/LHT.jpg',
  },
  {
    name: '花酱',
    href: huajiangBilibiliUrl,
    avatar: './avatars/huajiang.jpg',
  },
  {
    name: 'Yui Lu',
    href: yuiBilibiliUrl,
    avatar: './avatars/YuiLu.jpg',
  },
];

const friendLinks = [
  { name: 'KIGTTS GitHub', caption: '项目主页与更新记录', icon: 'code', href: projectUrl },
  { name: 'Android Release', caption: '下载 Android 安装包', icon: 'android', href: androidReleaseUrl },
  { name: 'ModelScope Trainer', caption: '训练器国内下载', icon: 'deployed_code', href: trainerModelScopeUrl },
  { name: 'Hugging Face Trainer', caption: '训练器海外下载', icon: 'hub', href: trainerHuggingFaceUrl },
  { name: 'LHT Bilibili', caption: 'LHT 的个人主页', icon: 'play_circle', href: lhtBilibiliUrl },
  { name: '花酱 Bilibili', caption: '花酱的个人主页', icon: 'play_circle', href: huajiangBilibiliUrl },
  { name: 'Yui Lu Bilibili', caption: 'Yui Lu 的个人主页', icon: 'play_circle', href: yuiBilibiliUrl },
];

const acknowledgementLibraries = [
  {
    name: 'KIGTTS',
    role: 'KIGTTS 官方仓库',
    logo: logoWhite,
    href: projectUrl,
    featured: true,
  },
  { name: 'Android', role: '手机端运行环境', logo: './logos/android.svg', href: 'https://developer.android.com/' },
  { name: 'Kotlin', role: '手机端应用语言', logo: './logos/kotlin.svg', href: 'https://kotlinlang.org/' },
  { name: 'Jetpack Compose', role: '手机端界面支持', logo: './logos/jetpackcompose.svg', href: 'https://developer.android.com/compose' },
  { name: 'Flutter', role: '未来 Beta 版本', logo: './logos/flutter.svg', href: 'https://flutter.dev/' },
  { name: 'Material Symbols', role: '界面图标支持', logo: './logos/materialdesign.svg', href: 'https://fonts.google.com/icons' },
  { name: 'sherpa-onnx', role: '离线 ASR / 说话人验证', logo: './logos/k2-fsa.png', href: 'https://github.com/k2-fsa/sherpa-onnx', monochrome: true },
  { name: 'ONNX Runtime', role: '模型推理运行时', logo: './logos/onnx.svg', href: 'https://onnxruntime.ai/' },
  { name: 'Piper', role: '本地语音朗读与训练', logo: './logos/piper.svg', href: 'https://github.com/OHF-Voice/piper1-gpl', monochrome: true, wide: true },
  { name: 'piper-phonemize', role: '音素转换', logo: './logos/rhasspy.png', href: 'https://github.com/rhasspy/piper-phonemize', monochrome: true },
  { name: 'eSpeak NG', role: 'Piper 发音数据', logo: './logos/espeak-ng.png', href: 'https://github.com/espeak-ng/espeak-ng', monochrome: true },
  { name: 'Electron', role: '桌面训练器窗口', logo: './logos/electron.svg', href: 'https://www.electronjs.org/' },
  { name: 'React', role: '训练器与官网界面', logo: './logos/react.svg', href: 'https://react.dev/' },
  { name: 'Python', role: '训练器核心流程', logo: './logos/python.svg', href: 'https://www.python.org/' },
  { name: 'PyTorch', role: '语音训练支持', logo: './logos/pytorch.svg', href: 'https://pytorch.org/' },
  { name: 'Hugging Face', role: '训练器海外下载', logo: './logos/huggingface.svg', href: 'https://huggingface.co/LHT02/kigtts-trainer/tree/main' },
  { name: 'ModelScope', role: '训练器国内下载', logo: './logos/modelscope.ico', href: 'https://modelscope.cn/models/LHTSTUDIO/KIGTTS_TRAINER/files' },
  { name: 'GitHub', role: '项目主页与发布', logo: './logos/github.svg', href: projectUrl },
];

const downloadTabs = [
  {
    id: 'android',
    label: '安卓端',
    icon: 'android',
    eyebrow: 'ANDROID / 手机端',
    title: 'KIGTTS Android',
    summary: '手机端适合直接带到现场使用：便捷字幕、TTS 朗读、快捷名片、画板、音效板和悬浮窗都在同一个应用里。',
    meta: [
      ['文件', 'APK 安装包'],
      ['版本', '0.1.0'],
      ['下载', 'GitHub Release'],
    ],
    bullets: ['在手机浏览器中下载 APK', '确保从官网或 GitHub 下载，避免第三方修改包', '安装后按需要开启麦克风、悬浮窗等权限'],
    actions: [
      { label: '下载 APK', icon: 'download', href: androidApkUrl, primary: true },
      { label: '查看发行页', icon: 'open_in_new', href: androidReleaseUrl },
    ],
  },
  {
    id: 'trainer',
    label: '训练器',
    icon: 'laptop_mac',
    eyebrow: 'DESKTOP / 电脑端',
    title: 'KIGTTS Trainer',
    summary: '训练器适合想制作自己语音包的用户。你可以在电脑上准备素材、训练语音，并把导出的语音包导入 Android 端使用。',
    meta: [
      ['设备', 'Windows 电脑'],
      ['下载', '魔搭 / Hugging Face'],
      ['用途', '制作语音包'],
    ],
    bullets: ['国内用户建议先选魔搭', '下载较慢时再试 Hugging Face', '解压后按界面引导启动训练器'],
    actions: [
      { label: '魔搭下载', icon: 'deployed_code', href: trainerModelScopeUrl, primary: true },
      { label: 'Hugging Face', icon: 'hub', href: trainerHuggingFaceUrl },
    ],
  },
  {
    id: 'beta',
    label: 'Flutter Beta',
    icon: 'flutter',
    eyebrow: 'FLUTTER / BETA',
    title: '暂未上线，敬请期待',
    summary: 'Flutter Beta 还在准备中，目前不提供安装包。想先使用 KIGTTS，请下载 Android 端。',
    meta: [
      ['进度', '准备中'],
      ['下载', '暂未开放'],
      ['提醒', '官网公布'],
    ],
    bullets: ['目前还没有公开安装包', '开放后会在官网发布', '现在建议先使用 Android 端'],
    actions: [
      { label: '暂未上线', icon: 'hourglass_empty', disabled: true, primary: true },
      { label: '敬请期待', icon: 'notifications_active', disabled: true },
    ],
  },
];

const featureSlides = [
  {
    label: '便捷字幕',
    icon: 'subtitles',
    eyebrow: '01 / 便捷字幕',
    title: '语音识别、快捷文本和 TTS 一键上屏',
    brief: '把语音识别、文字输入和朗读放在一起，减少现场沟通时来回切换。',
    summary:
      'KIGTTS 面向 Kigurumi、头套、面具、舞台妆造和不方便直接说话的现场场景。便捷字幕把语音识别、手动输入、快捷文本、TTS 朗读、大字幕预览和预设分组放在同一个界面里。',
    bullets: ['减少频繁切 App', '降低现场打字压力', '一键上屏、朗读或发送常用语'],
    note: '打开便捷字幕后，可以直接开始识别语音、输入文字或朗读常用短句。',
    image: subtitleScreen,
    imageAlt: '便捷字幕功能截图',
  },
  {
    label: '快捷名片',
    icon: 'badge',
    eyebrow: '02 / 快捷名片',
    title: '个人信息、角色信息、链接和二维码展示',
    brief: '用一张可分享名片展示主页、二维码、社交账号和角色信息。',
    summary:
      '快捷名片用于展示主页、社交账号、群二维码、约拍信息或临时说明，支持横竖屏展示、背景图、主题色背景、装饰文字、链接按钮、分享和多张名片切换。',
    bullets: ['互关和主页展示', '社交二维码与群信息', '角色设定和现场说明'],
    note: '名片功能适合在不方便开口解释时快速完成信息交换。',
    image: cardScreen,
    imageAlt: '快捷名片功能截图',
  },
  {
    label: '画板',
    icon: 'draw',
    eyebrow: '03 / 画板',
    title: '现场手写、涂鸦和快速示意',
    brief: '嘈杂或不方便打字时，用手写、涂鸦和标注快速补充说明。',
    summary:
      '画板用于在嘈杂环境或不方便打字时快速补充说明，支持现场手写、涂鸦、标注和简单示意，让交流不完全依赖语音或键盘输入。',
    bullets: ['手写补充说明', '涂鸦和快速标注', '适合嘈杂现场兜底沟通'],
    note: '画板可代替纸笔，适合嘈杂环境下的快速涂鸦和标注交流。',
    image: boardScreen,
    imageAlt: '画板功能截图',
  },
  {
    label: '音效板',
    icon: 'library_music',
    eyebrow: '04 / 音效板',
    title: '接梗、反应音和关键词触发',
    brief: '把常用反应音、接梗音效和关键词触发放在一个面板里。',
    summary:
      '音效板支持按分组管理音效、列表或宫格布局、点击播放/停止、关键词触发、音频导入转码和预设分享，适合角色互动、接梗和现场反馈。',
    bullets: ['识别结果触发音效', '角色音效包导入导出', '列表或宫格布局切换'],
    note: '音效板和字幕、TTS 可以组合使用，让现场互动更轻量。',
    image: soundScreen,
    imageAlt: '音效板功能截图',
  },
  {
    label: '悬浮窗与热键',
    icon: 'open_in_new',
    eyebrow: '05 / 悬浮窗与联动',
    title: '在其他 App 上方快速调出辅助功能',
    brief: '在其他应用上方快速打开字幕、名片、画板、音效板和常用工具。',
    summary:
      '悬浮窗可以在微信、QQ、相机等 App 上方常驻，快速打开便捷字幕、快捷名片、画板、音效板、迷你控件和常用第三方应用。',
    bullets: ['折叠、贴边、展开', '音量键序列热键', '微信/QQ/支付宝扫码联动'],
    note: '开启无障碍辅助后，部分热键和直达操作会更稳定。',
    image: floatingScreen,
    imageAlt: '悬浮窗功能截图',
  },
  {
    label: '语音包',
    icon: 'record_voice_over',
    eyebrow: '06 / 语音增强与变声',
    title: '本地 ASR、TTS、VAD 和说话人验证适配复杂现场',
    brief: '本地处理识别、朗读、增强和说话人验证，适配嘈杂现场。',
    summary:
      'Android 端优先在本地完成识别、朗读、降噪、语音增强、说话人验证和音频测试。',
    bullets: ['语音识别 -> 文本 -> TTS 朗读', 'GTCRN / DPDFNet 增强模式', '减少旁人说话误触发'],
    note: '适合希望用合成语音代替或增强本人发声的场景，可能会有短暂延迟。',
    image: voicePackScreen,
    imageAlt: '语音包功能截图',
  },
  {
    label: '设置',
    icon: 'tune',
    eyebrow: '07 / 设置与训练端',
    title: '训练器、语音包制作和偏好设置',
    brief: '在电脑端制作语音包，并导出给 Android 端导入使用。',
    summary:
      '桌面训练器用于准备语音素材、训练语音包和导出成品；设置页用于调整识别、朗读、热键、语音包和现场使用偏好。',
    bullets: ['Piper 标准训练', 'GPT-SoVITS / VoxCPM2 蒸馏', '训练器导出 Android 可导入语音包'],
    note: '电脑端制作语音包 → 导入手机端 → 现场使用，两端配合完成完整流程。',
    image: trainerScreen,
    imageAlt: 'KIGTTS 训练器截图',
  },
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

const centeredSectionSx = {
  minHeight: '100%',
  width: '100%',
  boxSizing: 'border-box',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const centeredContentSx = {
  width: '100%',
  maxWidth: { xs: '100%', lg: 1320, xl: 1480 },
  mx: 'auto',
};

function clampValue(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function scaledPx(value, scale, min = 0) {
  return Math.round(Math.max(min, value * scale));
}

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

function ProgressiveImage({ src, alt, sx, eager = false }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <Box
      component="img"
      src={src}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      onLoad={() => setLoaded(true)}
      sx={[
        {
          opacity: loaded ? 1 : 0.18,
          transition: 'opacity 420ms ease, filter 520ms ease, transform 520ms ease',
        },
        sx,
        !loaded && {
          filter: 'blur(18px) saturate(0.72)',
          transform: 'scale(0.985)',
        },
      ]}
    />
  );
}

function CreditLogo({ item }) {
  const source = item.logo;
  const [imageVisible, setImageVisible] = useState(Boolean(source));
  const content = (
    <Stack
      spacing={1.05}
      sx={{
        height: '100%',
        minHeight: { xs: 104, sm: 116 },
        p: { xs: 1.15, sm: 1.35 },
        ...md2Surface,
        borderRadius: 0.7,
        backgroundColor: item.featured ? alpha('#038387', 0.24) : alpha('#2f3132', 0.92),
        borderColor: item.featured ? alpha('#8ff5f7', 0.28) : alpha('#ffffff', 0.06),
        justifyContent: 'space-between',
        transition: 'transform 180ms ease, border-color 180ms ease, background-color 180ms ease',
        '&:hover': {
          transform: 'translate3d(0, -2px, 0)',
          borderColor: alpha('#8ff5f7', 0.34),
          backgroundColor: item.featured ? alpha('#038387', 0.3) : alpha('#364044', 0.92),
        },
      }}
    >
      <Box
        sx={{
          height: { xs: 38, sm: 46 },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}
      >
        {imageVisible ? (
          <Box
            component="img"
            src={source}
            alt={`${item.name} logo`}
            loading="eager"
            decoding="async"
            onError={() => setImageVisible(false)}
            sx={{
              width: item.featured ? { xs: 104, sm: 132 } : item.wide ? { xs: 78, sm: 96 } : { xs: 34, sm: 40 },
              maxHeight: item.featured ? { xs: 36, sm: 42 } : { xs: 34, sm: 40 },
              objectFit: 'contain',
              objectPosition: 'left center',
              filter: item.monochrome ? 'grayscale(1) brightness(0) invert(1)' : 'none',
            }}
          />
        ) : (
          <Typography sx={{ color: '#f5f7f7', fontSize: { xs: '1rem', sm: '1.12rem' }, fontWeight: 700 }}>
            {item.name}
          </Typography>
        )}
      </Box>
      <Box>
        <Typography sx={{ color: '#f5f7f7', fontSize: { xs: '0.9rem', sm: '1rem' }, fontWeight: 700, lineHeight: 1.18 }}>
          {item.name}
        </Typography>
        <Typography sx={{ mt: 0.45, color: alpha('#ffffff', 0.62), fontSize: { xs: '0.68rem', sm: '0.76rem' }, lineHeight: 1.35 }}>
          {item.role}
        </Typography>
      </Box>
    </Stack>
  );

  if (!item.href) {
    return content;
  }

  return (
    <Box
      component="a"
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      sx={{ display: 'block', height: '100%', color: 'inherit', textDecoration: 'none' }}
    >
      {content}
    </Box>
  );
}

function RealQr({ compact = false, densityScale = 1 }) {
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
        value={qrValue}
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

const rotateFlower = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const featureVisualEnter = keyframes`
  from {
    opacity: 0;
    transform: translate3d(28px, 0, 0) scale(0.985);
    filter: drop-shadow(0 18px 28px rgba(0,0,0,0.18)) saturate(0.85);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0) scale(1);
    filter: drop-shadow(0 18px 28px rgba(0,0,0,0.24)) saturate(0.98);
  }
`;

const featurePanelEnter = keyframes`
  from {
    opacity: 0;
    transform: translate3d(0, 14px, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`;

const featureOverlayEnter = keyframes`
  from {
    opacity: 0;
    transform: translate3d(0, 18px, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
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

function BetaBubble({ onSelect, compact = false, banner = false, densityScale = 1 }) {
  const isBanner = compact && banner;
  const denseDesktop = !compact && densityScale < 0.9;
  const scale = compact ? 1 : densityScale;
  const dp = (value, min = 0) => scaledPx(value, scale, min);
  const shortDesktopQuery = '@media (min-width: 900px) and (max-height: 820px)';

  return (
    <Box
      sx={{
        position: compact ? 'relative' : 'absolute',
        right: compact ? 'auto' : denseDesktop ? dp(24, 12) : { xs: dp(42, 12), lg: dp(42, 12), xl: dp(56, 16) },
        top: compact ? 'auto' : denseDesktop ? dp(12, 6) : { xs: dp(34, 8), lg: dp(34, 8), xl: dp(46, 12) },
        width: compact ? '100%' : denseDesktop ? dp(440, 340) : { xs: dp(320, 172), lg: dp(320, 172), xl: dp(354, 188) },
        maxWidth: isBanner ? '100%' : compact ? { xs: 274, sm: '100%' } : 'none',
        minHeight: isBanner ? { xs: 58, sm: 64 } : compact ? 'auto' : denseDesktop ? dp(104, 56) : dp(190, 76),
        px: isBanner ? { xs: 1.8, sm: 2.4 } : compact ? { xs: 1.6, sm: 3, md: 3.2 } : denseDesktop ? Math.max(0.9, 2.1 * scale) : Math.max(1.1, 3.2 * scale),
        py: isBanner ? 0 : compact ? { xs: 1.15, sm: 2.6, md: 3 } : denseDesktop ? Math.max(0.5, 1.2 * scale) : Math.max(0.85, 3 * scale),
        borderRadius: isBanner ? 0 : '28px',
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
        ...(compact
          ? {}
          : {
              [shortDesktopQuery]: {
                width: 'clamp(390px, 36vw, 500px)',
                minHeight: 104,
                px: 2.4,
                py: 1.2,
              },
            }),
      }}
    >
      {/* Top right MD3 8-leaf clover */}
      <Md3Clover8
        size={isBanner ? 92 : compact ? 118 : denseDesktop ? dp(96, 52) : dp(150, 64)}
        color="#9ad9d9"
        sx={{
          top: isBanner ? -28 : -40,
          right: isBanner ? -22 : -40,
        }}
      />
      {/* Bottom left MD3 4-sided cookie */}
      <Md3Cookie4
        size={isBanner ? 104 : compact ? 132 : denseDesktop ? dp(108, 58) : dp(170, 72)}
        color="#6bb8b9"
        sx={{
          bottom: isBanner ? -46 : -60,
          left: isBanner ? -30 : -40,
          animationDirection: 'reverse', // Rotate opposite way
          animationDuration: '45s',
        }}
      />
      <Stack
        direction={isBanner || denseDesktop ? 'row' : 'column'}
        spacing={isBanner ? { xs: 1, sm: 1.5 } : denseDesktop ? 0.8 : compact ? { xs: 1.35, sm: 2.2 } : 2.2}
        sx={{
          position: 'relative',
          zIndex: 2, // Ensure text is above state layer overlay
          width: '100%',
          alignItems: 'center',
          justifyContent: isBanner || denseDesktop ? 'space-between' : 'center',
          textAlign: isBanner || denseDesktop ? 'left' : 'center',
          minHeight: isBanner ? '100%' : 'auto',
          ...(compact
            ? {}
            : {
                [shortDesktopQuery]: {
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  textAlign: 'left',
                  gap: 1.4,
                },
              }),
        }}
      >
        <Typography
          sx={{
            flex: isBanner || denseDesktop ? '1 1 auto' : 'initial',
            minWidth: 0,
            fontSize: isBanner
              ? { xs: '0.82rem', sm: '0.98rem', md: '1.06rem' }
              : compact
                ? { xs: '0.94rem', sm: '1.15rem', md: '1.2rem' }
                : `clamp(0.72rem, ${1.2 * scale}rem, 1.2rem)`,
            lineHeight: denseDesktop ? 1.12 : isBanner ? 1.22 : compact ? 1.38 : 1.45,
            fontWeight: 500,
            letterSpacing: '0.02em',
            textShadow: '0 1px 2px rgba(255,255,255,0.2)',
            whiteSpace: isBanner || denseDesktop ? 'nowrap' : 'normal',
            overflow: isBanner || denseDesktop ? 'hidden' : 'visible',
            textOverflow: isBanner || denseDesktop ? 'ellipsis' : 'clip',
            ...(compact
              ? {}
              : {
                  [shortDesktopQuery]: {
                    flex: '1 1 auto',
                    whiteSpace: 'normal',
                    overflow: 'visible',
                    textOverflow: 'clip',
                    fontSize: '1.04rem',
                    lineHeight: 1.25,
                  },
                }),
          }}
        >
          {isBanner
            ? betaLines.join('')
            : betaLines.map((line) => (
                <Box key={line} component="span" sx={{ display: 'block' }}>
                  {line}
                </Box>
              ))}
        </Typography>
        <Button
          onClick={() => onSelect?.()}
          sx={{
            flexShrink: 0,
            minWidth: isBanner ? { xs: 94, sm: 118 } : compact ? { xs: 138, sm: 148 } : denseDesktop ? dp(92, 66) : dp(198, 116),
            minHeight: isBanner ? { xs: 38, sm: 42 } : compact ? { xs: 38, sm: 42 } : denseDesktop ? dp(42, 30) : dp(54, 32),
            px: isBanner ? { xs: 1.45, sm: 2.2 } : compact ? 2.8 : denseDesktop ? Math.max(1, 2 * scale) : Math.max(1.6, 4 * scale),
            borderRadius: 999,
            color: '#ffffff',
            backgroundColor: '#137174',
            boxShadow: '0 4px 12px rgba(19, 113, 116, 0.4), 0 2px 4px rgba(0,0,0,0.1)',
            fontSize: isBanner ? { xs: '0.8rem', sm: '0.92rem' } : compact ? { xs: '0.88rem', sm: '0.95rem' } : `clamp(0.72rem, ${1.08 * scale}rem, 1.08rem)`,
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
            ...(compact
              ? {}
              : {
                  [shortDesktopQuery]: {
                    minWidth: 134,
                    minHeight: 44,
                    px: 2.3,
                    fontSize: '0.95rem',
                  },
                }),
          }}
        >
          敬请期待
        </Button>
      </Stack>
    </Box>
  );
}

function DownloadPanel({ compact = false, mobileApkOnly = false, densityScale = 1, onSelectDownloadTab }) {
  const scaledCompact = compact && densityScale < 0.98;
  const panelMinHeight = scaledPx(244, densityScale, densityScale < 0.75 ? 108 : 132);
  const primaryHeight = scaledPx(72, densityScale, 42);
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
        minWidth: 0,
        minHeight: scaledCompact ? panelMinHeight : compact ? { xs: 'auto', sm: 204, md: 244 } : { xs: 'auto', sm: 220, lg: 244 },
        px: compact ? { xs: 1.05, sm: 2.2, md: 2.5 } : { xs: 1.5, sm: 2.2, md: 2.5 },
        py: compact ? { xs: 1.05, sm: 2.2, md: 2.5 } : { xs: 1.5, sm: 2.2, md: 2.5 },
        ...md2Surface,
      }}
    >
      <Stack spacing={compact ? 1.1 : 1.8} sx={{ height: '100%' }}>
        <Button
          fullWidth
          {...getDownloadButtonProps('android', androidApkUrl)}
          startIcon={<SymbolIcon name="android" size={compact ? 22 : 28} />}
          sx={{
            ...md2Button,
            minWidth: 0,
            minHeight: scaledCompact ? primaryHeight : compact ? { xs: 48, sm: 64, md: 72 } : { xs: 50, sm: 64, lg: 72 },
            px: scaledCompact ? 1.05 : compact ? { xs: 1.35, sm: 2.8 } : 2.8,
            fontSize: compact ? { xs: '1rem', sm: '1.08rem', md: '1.28rem' } : { xs: '1rem', sm: '1.18rem', md: '1.28rem' },
            justifyContent: compact ? 'center' : 'flex-start',
            whiteSpace: 'nowrap',
          }}
        >
          下载APK
        </Button>
        <Button
          fullWidth
          {...getDownloadButtonProps('trainer', trainerModelScopeUrl)}
          startIcon={<SymbolIcon name="laptop_mac" size={compact ? 22 : 28} />}
          sx={{
            ...md2Button,
            display: { xs: mobileApkOnly ? 'none' : 'inline-flex', sm: 'inline-flex' },
            minWidth: 0,
            minHeight: scaledCompact ? secondaryHeight : compact ? { xs: 42, sm: 64, md: 72 } : { xs: 50, sm: 64, lg: 72 },
            px: scaledCompact ? 1.05 : compact ? { xs: 1.35, sm: 2.8 } : 2.8,
            fontSize: compact ? { xs: '0.78rem', sm: '1.08rem', md: '1.28rem' } : { xs: '1rem', sm: '1.18rem', md: '1.28rem' },
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

function QrPanel({ compact = false, hideOnMobile = false, densityScale = 1 }) {
  const scaledCompact = compact && densityScale < 0.98;
  const panelWidth = scaledPx(230, densityScale, densityScale < 0.75 ? 106 : 118);
  const panelMinHeight = scaledPx(244, densityScale, densityScale < 0.75 ? 108 : 132);

  return (
    <Box
      sx={{
        display: { xs: hideOnMobile ? 'none' : 'block', sm: 'block' },
        width: scaledCompact ? panelWidth : compact ? { xs: 112, sm: 214, md: 230 } : { xs: '100%', sm: 214, md: 230 },
        minWidth: scaledCompact ? panelWidth : compact ? { xs: 112, sm: 214, md: 230 } : { sm: 214, md: 230 },
        minHeight: scaledCompact ? panelMinHeight : compact ? { xs: 'auto', sm: 204, md: 244 } : { xs: 'auto', sm: 220, lg: 244 },
        px: compact ? { xs: 0.95, sm: 2.2, md: 2.5 } : { xs: 1.4, sm: 2.2, md: 2.5 },
        py: compact ? { xs: 0.95, sm: 2.2, md: 2.5 } : { xs: 1.4, sm: 2.2, md: 2.5 },
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

function HomeRightBlock({ onSelect, onSelectDownloadTab, compact = false, desktopLayout = false, densityScale = 1 }) {
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
        src={logoWhite}
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
          color: '#f1f4f4',
          fontWeight: 300,
        }}
      >
         让沉默的你被听见
      </Typography>
      <Stack
        direction={desktopLayout ? 'row' : compact ? { xs: 'column', sm: 'row' } : { xs: 'column', sm: 'row' }}
        spacing={desktopLayout ? desktopActionGap : compact ? 1.2 : 2}
        sx={{
          width: '100%',
          maxWidth: desktopLayout ? '100%' : { xs: 338, sm: '100%' },
          mx: desktopLayout ? 0 : { xs: 'auto', lg: 0 },
          mt: desktopLayout ? Math.max(0.75, (densityScale < 0.75 ? 3 : 4.2) * densityScale) : compact ? { xs: 1.05, sm: 3.2, md: 4.2 } : { xs: 4, md: 5.2 },
          alignItems: 'stretch',
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

export function HomeSection({ onSelect, onSelectDownloadTab, desktopLayout = false, densityScale = 1, dpiScale = 1 }) {
  const shortDpiDesktop = desktopLayout && dpiScale < 0.75;
  const shortLandscapeFactor = densityScale < 0.75 ? 0.84 : 1;
  const desktopContentMaxWidth = scaledPx(1500, densityScale, 780);
  const desktopRightColumn = scaledPx(420, densityScale * shortLandscapeFactor, 312);
  const desktopLogoWidth = scaledPx(200, densityScale, 108);
  const desktopHeroWidth = densityScale < 0.75
    ? `clamp(440px, 56vw, ${scaledPx(920, densityScale, 620)}px)`
    : `min(46vw, calc(var(--app-viewport-height, 100svh) * 0.72), ${scaledPx(840, densityScale, 250)}px)`;

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
          flex: 1,
          mt: desktopLayout ? Math.max(0.6, 2.6 * densityScale) : { xs: 0, lg: 3.2 },
          display: desktopLayout ? 'grid' : { xs: 'flex', lg: 'grid' },
          flexDirection: { xs: 'column', lg: 'row' },
          gridTemplateColumns: desktopLayout ? `minmax(0, 1fr) minmax(${desktopRightColumn}px, 0.72fr)` : {
            lg: 'minmax(520px, 0.95fr) minmax(420px, 0.72fr)',
            xl: 'minmax(600px, 0.98fr) minmax(440px, 0.72fr)',
          },
          alignItems: 'center',
          justifyContent: desktopLayout ? 'initial' : { xs: 'flex-start', lg: 'initial' },
          gap: desktopLayout ? Math.max(1.1, 2.4 * densityScale) : { xs: 0.2, sm: 0.4, lg: 2.4, xl: 3.2 },
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
            justifyContent: desktopLayout ? 'flex-end' : { xs: 'center', lg: 'flex-end' },
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
            justifyContent: desktopLayout ? 'flex-start' : { xs: 'center', lg: 'flex-start' },
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

export function AboutSection() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const currentFeature = featureSlides[activeSlide];
  const slideNumber = String(activeSlide + 1).padStart(2, '0');
  const totalSlides = String(featureSlides.length).padStart(2, '0');
  const selectFeature = (index) => {
    setDetailsOpen(false);
    setActiveSlide(index);
  };
  const goToFeature = (offset) => {
    setDetailsOpen(false);
    setActiveSlide((current) => (current + offset + featureSlides.length) % featureSlides.length);
  };

  return (
    <Box
      sx={{
        ...centeredSectionSx,
        height: '100%',
        alignItems: 'stretch',
        px: { xs: 0.8, sm: 1.5, lg: 3.4, xl: 5.2 },
        py: { xs: 0.8, sm: 1.2, lg: 2.4 },
        overflow: 'hidden',
      }}
    >
      <Box
        data-inner-scroll="true"
        sx={{
          width: '100%',
          maxWidth: { xs: '100%', lg: 1390, xl: 1540 },
          mx: 'auto',
          display: 'flex',
          alignItems: 'stretch',
          minHeight: 0,
        }}
      >
        <Box
          sx={{
            width: '100%',
            minHeight: 0,
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '78px minmax(0, 1.18fr) minmax(330px, 0.82fr)' },
            gridTemplateRows: { xs: 'minmax(0, 1fr) auto', md: '1fr' },
            gap: { xs: 0.8, sm: 1, md: 1.4, xl: 1.8 },
            alignItems: 'stretch',
            '@media (orientation: landscape)': {
              gridTemplateColumns: '78px minmax(0, 1fr)',
              gridTemplateRows: '1fr',
              gap: 1.2,
            },
            '@media (orientation: landscape) and (max-height: 620px)': {
              gridTemplateColumns: '62px minmax(0, 1fr)',
              gap: 0.8,
            },
          }}
        >
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
                  onClick={() => selectFeature(index)}
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
          </Stack>

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
          </Box>

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

            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              spacing={1}
              sx={{
                '@media (orientation: landscape)': {
                  minHeight: 30,
                },
              }}
            >
              <Button
                onClick={() => goToFeature(-1)}
                startIcon={<SymbolIcon name="chevron_left" size={22} />}
                sx={{
                  ...md2Button,
                  minHeight: { xs: 34, sm: 38 },
                  px: { xs: 1.15, sm: 1.7 },
                  fontSize: { xs: '0.72rem', sm: '0.84rem' },
                  borderRadius: 0.7,
                  '@media (orientation: landscape)': {
                    minHeight: 30,
                    px: 1.2,
                    fontSize: '0.72rem',
                  },
                }}
              >
                上一项
              </Button>
              <Stack direction="row" spacing={0.55} alignItems="center" sx={{ flexShrink: 0 }}>
                {featureSlides.map((feature, index) => (
                  <Box
                    key={feature.eyebrow}
                    component="button"
                    type="button"
                    aria-label={`切换到第 ${index + 1} 项`}
                    onClick={() => selectFeature(index)}
                    sx={{
                      width: activeSlide === index ? 24 : 8,
                      height: 8,
                      p: 0,
                      border: 0,
                      borderRadius: 999,
                      cursor: 'pointer',
                      backgroundColor: activeSlide === index ? '#8ff5f7' : alpha('#ffffff', 0.3),
                      transition: 'width 180ms ease, background-color 180ms ease',
                    }}
                  />
                ))}
              </Stack>
              <Button
                onClick={() => goToFeature(1)}
                endIcon={<SymbolIcon name="chevron_right" size={22} />}
                sx={{
                  ...md2Button,
                  minHeight: { xs: 34, sm: 38 },
                  px: { xs: 1.15, sm: 1.7 },
                  fontSize: { xs: '0.72rem', sm: '0.84rem' },
                  borderRadius: 0.7,
                  justifyContent: 'center',
                  '@media (orientation: landscape)': {
                    minHeight: 30,
                    px: 1.2,
                    fontSize: '0.72rem',
                  },
                }}
              >
                下一项
              </Button>
            </Stack>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export function DownloadSection({ activeTabId: activeTabIdProp, onTabChange }) {
  const [localActiveTabId, setLocalActiveTabId] = useState(downloadTabs[0].id);
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
          下载
        </Typography>
        <Typography
          sx={{
            mt: { xs: 0.8, sm: 1.4 },
            maxWidth: 760,
            mx: 'auto',
            fontSize: { xs: '1.12rem', sm: '2rem', md: '2.55rem' },
            lineHeight: { xs: 1.18, sm: 1.1 },
            color: '#f5f7f7',
            textAlign: 'center',
          }}
        >
          选择适合你的版本，按提示下载和安装。
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
              gridTemplateColumns: 'repeat(3, 1fr)',
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
                  <Stack spacing={1} alignItems="center" sx={{ position: 'relative', zIndex: 1 }}>
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
                        ? '点击“下载 APK”获取当前版本安装包，下载完成后在 Android 设备上安装。'
                        : currentDownload.id === 'trainer'
                          ? '国内用户优先选择魔搭；如果访问慢，再尝试 Hugging Face。'
                          : 'Flutter Beta 暂未开放下载。上线后会在官网公布。'}
                    </Typography>
                  </Stack>
                </Box>

                <Stack spacing={1}>
                  {currentDownload.actions.map((action) => (
                    <Button
                      key={action.label}
                      fullWidth
                      component={action.href ? 'a' : 'button'}
                      href={action.href}
                      target={action.href ? '_blank' : undefined}
                      rel={action.href ? 'noopener noreferrer' : undefined}
                      disabled={action.disabled}
                      startIcon={<SymbolIcon name={action.icon} size={24} />}
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
                  使用前请查阅授权协议与隐私政策。
                </Typography>
                <Grid container spacing={0.8} sx={{ mt: 1.25 }}>
                  {[
                    ['Android 授权说明', 'android', androidLicenseUrl],
                    ['Android 隐私说明', 'policy', androidPrivacyUrl],
                    ['训练器授权说明', 'laptop_mac', trainerLicenseUrl],
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
