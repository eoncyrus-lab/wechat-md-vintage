# wechat-md-vintage

> Markdown → 微信公众号 HTML · **复古典雅** 主题
>
> 米黄羊皮纸底色 · 深棕衬线字 · 酒红 / 墨绿 / 琥珀金点缀

受 [md.doocs.org](https://md.doocs.org/) 启发的本地命令行版，把 Markdown 渲染成**所有样式内联**的 HTML 片段，可直接粘贴到公众号编辑器。

## 特性

- 📜 **复古典雅主题**：宋体 + Cormorant Garamond 英文斜体，配米黄羊皮纸底色
- 🔧 **样式全内联**：绕开公众号编辑器对 `<style>` / `<link>` 的过滤
- ✍️ **增强排版**：
  - `##` 标题自动包 ❦ 金色装饰符
  - 无序列表用 ◆ 金色菱形替代默认 •
  - 图片 `alt` 自动渲染为斜体 caption
  - 可选首字下沉（`--dropcap`）
  - `<blockquote>` 金色竖条 + 米黄底
  - 表格双横线表头、虚线行分隔
- 🎨 **主题即数据**：一份 JS 对象描述所有样式，复制改配色即为新主题
- 📋 **一键复制**：macOS 支持 `--copy` 直接写到剪贴板
- ⚡ **零配置**：`npm install` 之后就能用

## 安装

```bash
git clone https://github.com/Ricaardo/wechat-md-vintage.git
cd wechat-md-vintage
npm install
```

## 用法

```bash
# 输出 HTML 片段（样式已内联，粘贴到公众号编辑器即可）
node bin/wx-md.mjs article.md -o article.wechat.html

# 生成带米黄羊皮纸背景的完整预览页（浏览器里看效果）
node bin/wx-md.mjs article.md --preview preview.html

# macOS：直接写入剪贴板
node bin/wx-md.mjs article.md --copy

# 打开首字下沉（默认关闭）
node bin/wx-md.mjs article.md --dropcap -o out.html
```

快速试一下：

```bash
node bin/wx-md.mjs examples/demo.md --preview examples/demo.preview.html
open examples/demo.preview.html
```

## 在公众号编辑器里使用

1. 命令行生成片段文件 `article.wechat.html`
2. 用浏览器打开这个文件，按 `Cmd/Ctrl+A` 全选，复制
3. 打开公众号编辑器，粘贴到正文区
4. 图片需要手动替换：把本地相对路径的 `<img src="xxx.png">` 换成公众号素材库的 URL（或者粘贴完用编辑器的"上传图片"按钮替换）

或者更省事：在终端里 `--copy` 之后，直接到公众号编辑器按 `Cmd/Ctrl+V` 粘贴。

> **小提示**：公众号对 `flex`/`grid`/`position` 等布局属性有限制，本工具只使用 `color`/`background`/`border`/`margin`/`padding`/`font-*` 等安全属性，所以产物兼容性很好。

## 文件结构

```
wechat-md-vintage/
├── bin/
│   └── wx-md.mjs           # CLI 入口
├── lib/
│   └── renderer.mjs        # markdown-it 渲染器 + 样式注入
├── themes/
│   └── vintage.mjs         # 复古典雅主题（调色板 + 每个元素样式）
├── examples/
│   └── demo.md             # 示例 Markdown
├── package.json
├── LICENSE
└── README.md
```

## 做一个自己的主题

复制 `themes/vintage.mjs` 改一份：

```js
// themes/modern.mjs
export const palette = {
  paper: '#ffffff',
  ink: '#1a1a1a',
  accent: '#0066ff',
  // ...
};
export const theme = {
  container: { 'background': palette.paper, 'color': palette.ink, /* ... */ },
  h1: { /* ... */ },
  h2: { /* ... */ },
  // ...
};
```

然后在 `lib/renderer.mjs` 顶部改导入路径即可。未来版本会加 `--theme` 参数做动态切换。

## 支持的 Markdown 语法

| 语法 | 渲染效果 |
| :-- | :-- |
| `# H1` | 双横线居中大标题 |
| `## H2` | 前后装饰符 ❦ · 居中 · 字距 6px |
| `### H3` | 酒红左竖条标题 |
| `#### H4` | 深棕小标题 |
| `**bold**` | 酒红加粗 |
| `*em*` | 墨绿英文斜体 |
| `` `code` `` | 米黄底 + 酒红字 |
| ``` ```fence``` ``` | 深褐底代码块 |
| `> quote` | 金色左竖条 + 米黄底 |
| `- item` | 金色 ◆ 列表符 |
| `1. item` | 数字有序列表 |
| `[text](url)` | 酒红虚底线链接 |
| `![alt](src)` | 居中图片 + 斜体 caption |
| `\| th \|` | 虚线表格 |
| `---` | 双横线装饰分隔 |

## 与 md.doocs.org 的差异

| | md.doocs.org | wechat-md-vintage |
| :-- | :-- | :-- |
| 使用方式 | 浏览器应用 | 本地 CLI |
| 主题数量 | 多主题 | 单复古主题（可自扩展）|
| 自定义 | Web UI 实时改 CSS | 改 JS 主题对象 |
| 图片处理 | 可上传 | 本地路径，发文时替换 URL |
| 适用场景 | 通用排版 | 数据叙事 / 长文 / 品牌化模板 |

## 致谢

- [markdown-it](https://github.com/markdown-it/markdown-it) — 解析核心
- [md.doocs.org](https://github.com/doocs/md) — 设计思路来源

## License

[MIT](./LICENSE)
