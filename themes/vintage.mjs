// themes/vintage.mjs
// 复古典雅主题：米黄羊皮纸 + 深棕衬线 + 酒红墨绿琥珀金点缀
// 所有属性均为公众号兼容属性（color/background/border/margin/padding/font-*）

export const palette = {
  paper: '#f4e8cd',
  paperSoft: '#faf1d8',
  ink: '#3b2a1a',
  inkSoft: '#6b4f33',
  wine: '#8b2635',
  wineDark: '#5c1822',
  olive: '#6b7543',
  gold: '#b8893b',
  navy: '#2c4a5e',
  rule: '#8a6f4a',
};

const p = palette;
// 宋体优先（对齐图片风格）：思源宋体 → macOS/iOS 宋体 → Windows 宋体 → 通用衬线
// 注意：公众号不能加载 webfont，只能命中用户本机已装字体；多写几个候选提高命中率
const serif = "'Noto Serif SC','Source Han Serif SC','Source Han Serif CN','Songti SC','STSongti','STSong','FangSong','SimSun','宋体',serif";
// 数字与英文部分（斜体修饰、Q1/Q2 等）
const italic = "'Cormorant Garamond','EB Garamond','Baskerville','Times New Roman',Georgia,serif";

// 每个选择器的样式，按数组方便合并时保持顺序
export const theme = {
  container: {
    'max-width': '100%',
    'margin': '0 auto',
    'padding': '24px 20px',
    'color': p.ink,
    'font-family': serif,
    'font-size': '16px',
    'line-height': '1.9',
    'background': p.paper,
    'letter-spacing': '0.6px',
    'word-break': 'break-word',
    'font-weight': '400',
  },

  // 标题层级
  h1: {
    'display': 'block',
    'margin': '28px auto 16px',
    'padding': '16px 0',
    'text-align': 'center',
    'font-family': serif,
    'font-size': '28px',
    'font-weight': '900',
    'letter-spacing': '8px',
    'color': p.ink,
    'border-top': `3px double ${p.rule}`,
    'border-bottom': `3px double ${p.rule}`,
  },
  h2: {
    'display': 'block',
    'margin': '40px 0 14px',
    'text-align': 'center',
    'font-family': serif,
    'font-size': '20px',
    'font-weight': '700',
    'letter-spacing': '6px',
    'color': p.ink,
  },
  h2_deco: {
    'color': p.gold,
    'font-size': '14px',
    'margin': '0 14px',
    'vertical-align': 'middle',
    'font-weight': 'normal',
    'letter-spacing': '0',
  },
  h3: {
    'display': 'block',
    'margin': '28px 0 12px',
    'padding-left': '12px',
    'border-left': `4px solid ${p.wine}`,
    'font-family': serif,
    'font-size': '17px',
    'font-weight': '700',
    'letter-spacing': '3px',
    'color': p.wine,
  },
  h4: {
    'display': 'block',
    'margin': '20px 0 8px',
    'font-family': serif,
    'font-size': '15.5px',
    'font-weight': '700',
    'color': p.inkSoft,
    'letter-spacing': '2px',
  },

  // 正文
  p: {
    'margin': '14px 0',
    'text-align': 'justify',
    'color': p.ink,
    'font-family': serif,
    'font-size': '16px',
    'line-height': '1.95',
    'font-weight': '400',
  },

  // 强调
  strong: {
    'color': p.wine,
    'font-weight': '700',
    'letter-spacing': '1px',
  },
  em: {
    'color': p.olive,
    'font-style': 'italic',
    'font-family': italic,
  },

  // 引用
  blockquote: {
    'margin': '20px 0',
    'padding': '14px 20px',
    'border-left': `4px solid ${p.gold}`,
    'border-right': `1px solid ${p.rule}`,
    'background': p.paperSoft,
    'color': p.inkSoft,
    'font-family': serif,
    'font-size': '15.5px',
    'line-height': '1.85',
    'letter-spacing': '0.6px',
  },
  blockquote_p: {
    'margin': '6px 0',
    'color': p.inkSoft,
  },

  // 列表
  ul: {
    'margin': '14px 0',
    'padding-left': '20px',
    'list-style': 'none',
  },
  ol: {
    'margin': '14px 0',
    'padding-left': '24px',
    'color': p.ink,
  },
  li: {
    'margin': '6px 0',
    'line-height': '1.85',
    'color': p.ink,
  },
  ul_li_marker: { // 前置符号
    'color': p.gold,
    'font-size': '10px',
    'margin-right': '8px',
    'vertical-align': 'middle',
  },

  // 分隔
  hr: {
    'display': 'block',
    'border': 'none',
    'border-top': `1px solid ${p.rule}`,
    'border-bottom': `1px solid ${p.rule}`,
    'height': '3px',
    'margin': '32px auto',
    'width': '60%',
  },

  // 链接
  a: {
    'color': p.wine,
    'text-decoration': 'none',
    'border-bottom': `1px dotted ${p.wine}`,
    'padding-bottom': '1px',
  },

  // 行内代码
  code_inline: {
    'padding': '2px 6px',
    'margin': '0 2px',
    'background': p.paperSoft,
    'border': `1px solid ${p.rule}`,
    'border-radius': '2px',
    'font-family': "'SF Mono', Menlo, Consolas, monospace",
    'font-size': '14px',
    'color': p.wine,
  },

  // 代码块
  pre: {
    'margin': '18px 0',
    'padding': '14px 16px',
    'background': '#2b1d10',
    'color': '#e8d9b3',
    'border-radius': '3px',
    'border-left': `4px solid ${p.gold}`,
    'overflow-x': 'auto',
    'font-family': "'SF Mono', Menlo, Consolas, monospace",
    'font-size': '13.5px',
    'line-height': '1.6',
  },
  pre_code: {
    'background': 'transparent',
    'color': 'inherit',
    'padding': '0',
    'border': 'none',
    'font-family': 'inherit',
    'font-size': 'inherit',
  },

  // 表格
  table: {
    'width': '100%',
    'border-collapse': 'collapse',
    'margin': '18px 0',
    'font-size': '14px',
  },
  thead: {
    'background': 'rgba(184, 137, 59, 0.12)',
  },
  th: {
    'padding': '10px 8px',
    'border-top': `2px solid ${p.rule}`,
    'border-bottom': `2px solid ${p.rule}`,
    'text-align': 'center',
    'color': p.ink,
    'font-weight': '700',
    'letter-spacing': '1px',
  },
  td: {
    'padding': '8px',
    'border-bottom': `1px dotted ${p.rule}`,
    'text-align': 'center',
    'color': p.ink,
  },
  tr_last_td: {
    'border-bottom': `2px solid ${p.rule}`,
  },

  // 图片
  img: {
    'display': 'block',
    'max-width': '100%',
    'margin': '18px auto',
    'border': `1px solid ${p.rule}`,
    'padding': '4px',
    'background': p.paperSoft,
  },

  // 图片说明（紧跟图片的 em）
  caption: {
    'display': 'block',
    'text-align': 'center',
    'color': p.inkSoft,
    'font-size': '13px',
    'font-style': 'italic',
    'font-family': italic,
    'margin': '-8px 0 18px',
    'letter-spacing': '1px',
  },

  // 首字下沉（第一段 p 首字符）
  dropcap: {
    'float': 'left',
    'font-size': '56px',
    'line-height': '0.9',
    'padding': '6px 12px 0 0',
    'color': p.wine,
    'font-weight': '700',
    'font-family': serif,
  },

  // 大标识（用于 > !! xxx 这类引用语）
  pull: {
    'display': 'block',
    'margin': '24px auto',
    'padding': '16px 0',
    'text-align': 'center',
    'border-top': `3px double ${p.rule}`,
    'border-bottom': `3px double ${p.rule}`,
    'font-size': '18px',
    'font-weight': '700',
    'letter-spacing': '3px',
    'color': p.wine,
  },
};
