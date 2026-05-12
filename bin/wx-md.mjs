#!/usr/bin/env node
// bin/wx-md.mjs
// 用法：
//   wx-md <input.md> [-o output.html]
//   wx-md <input.md> --preview       → 输出带米黄背景的完整 html 便于预览
//   wx-md <input.md> --copy          → 输出片段并写到剪贴板（macOS pbcopy）
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { createRenderer } from '../lib/renderer.mjs';
import { palette } from '../themes/vintage.mjs';

const argv = process.argv.slice(2);
if (argv.length === 0 || argv.includes('-h') || argv.includes('--help')) {
  console.log(`wx-md — Markdown → 微信公众号（复古典雅）

用法:
  wx-md <input.md>                     # 打印片段到 stdout
  wx-md <input.md> -o output.html      # 写入片段文件（可直接粘贴到公众号）
  wx-md <input.md> --preview out.html  # 带羊皮纸背景的完整预览页
  wx-md <input.md> --copy              # macOS 写入剪贴板

选项:
  --dropcap                            # 首段首字下沉
`);
  process.exit(0);
}

const input = argv[0];
if (!fs.existsSync(input)) {
  console.error('找不到文件:', input);
  process.exit(1);
}

const mdSrc = fs.readFileSync(input, 'utf-8');
const render = createRenderer();
const opts = {
  dropcap: argv.includes('--dropcap'),
};
const fragment = render(mdSrc, opts);

function writeOrPrint(content, outPath) {
  if (outPath) {
    fs.writeFileSync(outPath, content);
    console.error(`✓ 写入 ${outPath}`);
  } else {
    process.stdout.write(content);
  }
}

if (argv.includes('--preview')) {
  const i = argv.indexOf('--preview');
  const out = argv[i + 1] || input.replace(/\.md$/, '.preview.html');
  const full = `<!DOCTYPE html><html lang="zh-CN"><head><meta charset="UTF-8"><title>预览</title>
<link href="https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;600;700;900&family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500&display=swap" rel="stylesheet">
<style>
  html,body{margin:0;padding:0;background:${palette.paper};
    font-family:'Noto Serif SC','Source Han Serif SC','Songti SC','SimSun',serif;}
  body{background-image:
    radial-gradient(ellipse at 20% 30%, rgba(184,137,59,0.08) 0%, transparent 50%),
    radial-gradient(ellipse at 80% 70%, rgba(139,38,53,0.06) 0%, transparent 50%),
    repeating-linear-gradient(0deg, transparent 0 3px, rgba(107,79,51,0.015) 3px 4px);}
  .wrap{max-width:720px;margin:30px auto;background:${palette.paper};
    box-shadow:0 0 0 1px rgba(138,111,74,0.3),0 0 0 8px ${palette.paper},
               0 0 0 9px rgba(138,111,74,0.4),0 20px 60px rgba(59,42,26,0.25);}
</style></head><body><div class="wrap">${fragment}</div></body></html>`;
  writeOrPrint(full, out);
} else if (argv.includes('--copy')) {
  // 把 HTML 以 text/html 格式写入剪贴板
  // pbcopy 只处理 text/plain，粘到公众号会显示源码
  // 这里通过 AppleScript 的 «class HTML» 写入富文本剪贴板
  try {
    const hex = Buffer.from(fragment, 'utf-8').toString('hex').toUpperCase();
    // AppleScript 的 hex 长度受限（单参数 ~100KB 没问题，更大要走文件）
    const script = `set the clipboard to «data HTML${hex}»`;
    execSync('osascript -e ' + JSON.stringify(script));
    console.error(`✓ 已以富文本格式复制到剪贴板（${(fragment.length/1024).toFixed(1)} KB）`);
    console.error(`  去公众号编辑器按 Cmd+V 粘贴即可`);
  } catch (e) {
    console.error('复制失败:', e.message);
    console.error('你可以直接用浏览器打开 preview.html，Cmd+A / Cmd+C 再粘贴。');
    process.exit(1);
  }
} else {
  const oi = argv.indexOf('-o');
  const out = oi >= 0 ? argv[oi + 1] : null;
  writeOrPrint(fragment, out);
}
