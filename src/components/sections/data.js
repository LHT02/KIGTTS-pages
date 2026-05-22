import logoWhite from '../../../ART/LOGOWhite.svg';
import logoWhiteTrim from '../../../ART/LOGOWhite-trim.svg';
import lhtstudioLogo from '../../../ART/lhtstudio.svg';

export { logoWhite, logoWhiteTrim, lhtstudioLogo };
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

export const betaLines = ['Flutter 新版', '即将上线'];
export const qrValue = 'www.kigtts.lhtstudio.com';
export const androidReleaseUrl = 'https://github.com/LHT02/KIGTTS/releases/tag/APP0.1.0';
export const androidApkUrl = 'https://github.com/LHT02/KIGTTS/releases/download/APP0.1.0/app-release.apk';
export const trainerModelScopeUrl = 'https://modelscope.cn/models/LHTSTUDIO/KIGTTS_TRAINER/files';
export const trainerHuggingFaceUrl = 'https://huggingface.co/LHT02/kigtts-trainer/tree/main';
export const projectUrl = 'https://github.com/LHT02/KIGTTS';
export const feedbackGroupUrl = 'https://qm.qq.com/q/JRnqshDOEM';
export const androidLicenseUrl = './legal/android-license.html';
export const androidPrivacyUrl = './legal/android-privacy.html';
export const androidAgreementUrl = './legal/android-agreement.html';
export const trainerLicenseUrl = './legal/trainer-license.html';
export const trainerPrivacyUrl = './legal/trainer-privacy.html';
export const lhtBilibiliUrl = 'https://space.bilibili.com/87244951';
export const huajiangBilibiliUrl = 'https://space.bilibili.com/573842321';
export const yuiBilibiliUrl = 'https://space.bilibili.com/23208863';

export const downloadNotes = [
  `手机扫描二维码访问 ${qrValue}`,
  'Android 安装包来自 GitHub Release',
  '训练器可从魔搭或 Hugging Face 下载',
];

export const producerCredits = [
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

export const friendLinks = [
  { name: 'KIGTTS GitHub', caption: '项目主页与更新记录', icon: 'code', href: projectUrl },
  { name: 'Android Release', caption: '下载 Android 安装包', icon: 'android', href: androidReleaseUrl },
  { name: 'ModelScope Trainer', caption: '训练器国内下载', icon: 'deployed_code', href: trainerModelScopeUrl },
  { name: 'Hugging Face Trainer', caption: '训练器海外下载', icon: 'hub', href: trainerHuggingFaceUrl },
  { name: 'LHT Bilibili', caption: 'LHT 的个人主页', icon: 'play_circle', href: lhtBilibiliUrl },
  { name: '花酱 Bilibili', caption: '花酱的个人主页', icon: 'play_circle', href: huajiangBilibiliUrl },
  { name: 'Yui Lu Bilibili', caption: 'Yui Lu 的个人主页', icon: 'play_circle', href: yuiBilibiliUrl },
];

export const acknowledgementLibraries = [
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

export const downloadTabs = [
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
      { label: '用户协议', icon: 'description', href: androidAgreementUrl },
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
  // TODO: Flutter Beta 页面暂时禁用，后续启用时取消注释 ↓
  // {
  //   id: 'beta',
  //   label: 'Flutter Beta',
  //   icon: 'flutter',
  //   eyebrow: 'FLUTTER / BETA',
  //   title: '暂未上线，敬请期待',
  //   summary: 'Flutter Beta 还在准备中，目前不提供安装包。想先使用 KIGTTS，请下载 Android 端。',
  //   meta: [
  //     ['进度', '准备中'],
  //     ['下载', '暂未开放'],
  //     ['提醒', '官网公布'],
  //   ],
  //   bullets: ['目前还没有公开安装包', '开放后会在官网发布', '现在建议先使用 Android 端'],
  //   actions: [
  //     { label: '暂未上线', icon: 'hourglass_empty', disabled: true, primary: true },
  //     { label: '敬请期待', icon: 'notifications_active', disabled: true },
  //   ],
  // },
];

const screenshotLod = (name) => ({
  image: `./lod/screens/${name}-900.jpg`,
  imagePlaceholder: `./lod/screens/${name}-32.jpg`,
  imageSrcSet: `./lod/screens/${name}-480.jpg 480w, ./lod/screens/${name}-900.jpg 900w`,
  imageSizes: '(orientation: landscape) 52vw, 100vw',
});

export const featureSlides = [
  {
    label: '便捷字幕',
    icon: 'subtitles',
    eyebrow: '01 / 便捷字幕',
    title: '能说话的便捷字幕',
    titleHighlight: '能说话的',
    brief: '不光能看好用，还能发声。',
    summary:
      '自带 TTS 功能与音量增益，甚至支持语音识别。把语音识别、快捷文本、TTS 朗读和大字幕预览放在同一个界面里，减少现场沟通的来回切换。',
    bullets: ['语音识别实时上屏', '一键朗读常用短句', '支持大字幕预览'],
    note: '打开便捷字幕后，可以直接开始识别语音、输入文字或朗读常用短句。',
    ...screenshotLod('subtitle'),
    imageAlt: '便捷字幕功能截图',
  },
  {
    label: '快捷名片',
    icon: 'badge',
    eyebrow: '02 / 快捷名片',
    title: '随时扩列名片夹',
    titleHighlight: '随时扩列',
    brief: '拿出手机，面对面留个联系方式。',
    summary:
      '快捷名片支持自定义二维码和图片，还能多张存储。展示主页、社交账号、群二维码、约拍信息或临时说明，横竖屏切换无压力。',
    bullets: ['二维码和图片名片', '多张快速切换', '角色设定和现场说明'],
    note: '不适合开口解释时，掏出来扫一下就完事了。',
    ...screenshotLod('card'),
    imageAlt: '快捷名片功能截图',
  },
  {
    label: '画板',
    icon: 'draw',
    eyebrow: '03 / 画板',
    title: '写写画画小画板',
    titleHighlight: '写写画画',
    brief: '不想打字的话可以写字啦~',
    summary:
      '就是个正常的小画板。嘈杂或不方便打字时，手写、涂鸦、标注快速补充说明，让交流不完全依赖语音或键盘。',
    bullets: ['现场手写补充', '涂鸦和快速标注', '嘈杂环境兜底沟通'],
    note: '不想开口又不想打字？画两笔就够了。',
    ...screenshotLod('board'),
    imageAlt: '画板功能截图',
  },
  {
    label: '音效板',
    icon: 'library_music',
    eyebrow: '04 / 音效板',
    title: '接梗放音效，点一下就响',
    titleHighlight: '接梗放音效',
    brief: '把常用反应音、接梗音效和关键词触发放在一个面板里。',
    summary:
      '支持分组管理音效、列表或宫格布局、点击播放/停止、关键词触发、音频导入转码和预设分享，角色互动和现场反馈就靠它了。',
    bullets: ['识别结果触发音效', '角色音效包导入导出', '列表或宫格随意切'],
    note: '音效板和字幕、TTS 搭配使用，现场互动更带感。',
    ...screenshotLod('sound'),
    imageAlt: '音效板功能截图',
  },
  {
    label: '悬浮窗与热键',
    icon: 'open_in_new',
    eyebrow: '05 / 悬浮窗与联动',
    title: '随时启动悬浮窗',
    titleHighlight: '随时启动',
    brief: '不光工具齐备，还能快速启动。',
    summary:
      '悬浮窗带有启动器功能，可以在微信、QQ、相机等 App 上方常驻。快速打开便捷字幕、快捷名片、画板、音效板、迷你控件和常用第三方应用。',
    bullets: ['折叠、贴边、展开', '音量键序列热键', '微信/QQ/支付宝扫码联动'],
    note: '开启无障碍辅助后，部分热键和直达操作会更稳定。',
    ...screenshotLod('floating'),
    imageAlt: '悬浮窗功能截图',
  },
  {
    label: '语音包',
    icon: 'record_voice_over',
    eyebrow: '06 / 语音增强与变声',
    title: '让你的声音更出彩',
    titleHighlight: '让你的声音',
    brief: '本地就能朗读、降噪和变声，嘈杂现场也不怕，还支持语音识别。',
    summary:
      '在手机上本地完成 TTS 朗读、降噪、语音增强和变声，说话人验证防止旁人误触发，也支持语音识别。全都在本地跑。',
    bullets: ['语音识别 → 文本 → TTS 朗读', 'GTCRN / DPDFNet 增强', '说话人验证防误触发'],
    note: '适合希望用合成语音代替或增强本人发声的场景，可能会有短暂延迟。',
    ...screenshotLod('voice-pack'),
    imageAlt: '语音包功能截图',
  },
  {
    label: '设置',
    icon: 'tune',
    eyebrow: '07 / 设置与训练端',
    title: '打造专属音色，现场随心用',
    titleHighlight: '打造专属音色',
    brief: '训练自己的声音，导入手机就能用。',
    summary:
      '桌面训练器用于准备语音素材、训练专属音色并导出成品；设置页调整识别、朗读、热键和现场偏好。打造你自己的声音，一条龙搞定。',
    bullets: ['Piper 标准训练', 'GPT-SoVITS / VoxCPM2 蒸馏', '训练器导出，手机端直接导入'],
    note: '电脑端制作语音包 → 导入手机端 → 现场使用，完整闭环。',
    ...screenshotLod('trainer'),
    imageAlt: 'KIGTTS 训练器截图',
  },
];
