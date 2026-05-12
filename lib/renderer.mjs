// lib/renderer.mjs
// Markdown → 微信公众号 HTML（所有样式内联）
// 设计思路参考 md.doocs.org：markdown-it 渲染 + 主题对象 → 遍历 HTML 注入 style

import MarkdownIt from 'markdown-it';
import { theme, palette } from '../themes/vintage.mjs';

function styleStr(obj) {
  if (!obj) return '';
  return Object.entries(obj).map(([k, v]) => `${k}:${v}`).join(';');
}

function withStyle(tag, styleKey, { extraStyle = '', attrs = '', content = '' } = {}) {
  const s = styleStr(theme[styleKey]) + (extraStyle ? ';' + extraStyle : '');
  return `<${tag} style="${s}"${attrs ? ' ' + attrs : ''}>${content}</${tag}>`;
}

export function createRenderer() {
  const md = new MarkdownIt({
    html: true,
    breaks: false,
    linkify: true,
    typographer: false,
  });

  // ---- 覆盖默认渲染规则 ----
  md.renderer.rules.heading_open = (tokens, idx) => {
    const tag = tokens[idx].tag; // h1/h2/h3/h4
    const styleKey = tag;
    const s = styleStr(theme[styleKey]);
    // h2 附加装饰符
    if (tag === 'h2') {
      const deco = `<span style="${styleStr(theme.h2_deco)}">❦</span>`;
      // 用一个占位的数据属性，close 时追加尾部装饰
      return `<${tag} style="${s}" data-deco="1">${deco}<span>`;
    }
    return `<${tag} style="${s}">`;
  };
  md.renderer.rules.heading_close = (tokens, idx) => {
    const tag = tokens[idx].tag;
    if (tag === 'h2') {
      const deco = `<span style="${styleStr(theme.h2_deco)}">❦</span>`;
      return `</span>${deco}</${tag}>`;
    }
    return `</${tag}>`;
  };

  md.renderer.rules.paragraph_open = () => `<p style="${styleStr(theme.p)}">`;
  md.renderer.rules.paragraph_close = () => `</p>`;

  md.renderer.rules.strong_open = () => `<strong style="${styleStr(theme.strong)}">`;
  md.renderer.rules.em_open = () => `<em style="${styleStr(theme.em)}">`;

  md.renderer.rules.blockquote_open = () => `<blockquote style="${styleStr(theme.blockquote)}">`;
  md.renderer.rules.blockquote_close = () => `</blockquote>`;

  md.renderer.rules.hr = () => `<hr style="${styleStr(theme.hr)}" />`;

  md.renderer.rules.bullet_list_open = () => `<ul style="${styleStr(theme.ul)}">`;
  md.renderer.rules.bullet_list_close = () => `</ul>`;
  md.renderer.rules.ordered_list_open = () => `<ol style="${styleStr(theme.ol)}">`;
  md.renderer.rules.ordered_list_close = () => `</ol>`;
  md.renderer.rules.list_item_open = (tokens, idx) => {
    // 判定是否在 ul 中
    let depth = 0;
    let inUl = false;
    for (let i = idx; i >= 0; i--) {
      const t = tokens[i];
      if (t.type === 'bullet_list_open') { inUl = true; break; }
      if (t.type === 'ordered_list_open') { inUl = false; break; }
    }
    const marker = inUl
      ? `<span style="${styleStr(theme.ul_li_marker)}">◆</span>`
      : '';
    return `<li style="${styleStr(theme.li)}">${marker}`;
  };
  md.renderer.rules.list_item_close = () => `</li>`;

  md.renderer.rules.link_open = (tokens, idx) => {
    const href = tokens[idx].attrGet('href') || '';
    return `<a href="${href}" style="${styleStr(theme.a)}">`;
  };

  md.renderer.rules.code_inline = (tokens, idx) => {
    return `<code style="${styleStr(theme.code_inline)}">${escapeHtml(tokens[idx].content)}</code>`;
  };

  md.renderer.rules.fence = (tokens, idx) => {
    const content = escapeHtml(tokens[idx].content);
    return `<pre style="${styleStr(theme.pre)}"><code style="${styleStr(theme.pre_code)}">${content}</code></pre>`;
  };

  md.renderer.rules.code_block = md.renderer.rules.fence;

  // 表格
  md.renderer.rules.table_open = () => `<table style="${styleStr(theme.table)}">`;
  md.renderer.rules.thead_open = () => `<thead style="${styleStr(theme.thead)}">`;
  md.renderer.rules.th_open = () => `<th style="${styleStr(theme.th)}">`;
  md.renderer.rules.td_open = () => `<td style="${styleStr(theme.td)}">`;

  // 图片：检测下一 inline token 是否为斜体，作为 caption
  md.renderer.rules.image = (tokens, idx) => {
    const token = tokens[idx];
    const src = token.attrGet('src') || '';
    const alt = token.content || '';
    const title = token.attrGet('title') || '';
    const img = `<img src="${src}" alt="${escapeHtml(alt)}" style="${styleStr(theme.img)}" />`;
    if (alt) {
      return img + `<span style="${styleStr(theme.caption)}">${escapeHtml(alt)}</span>`;
    }
    return img;
  };

  // ---- 渲染并包一层容器 ----
  return function render(mdSource, opts = {}) {
    const { dropcap = true, title = '' } = opts;
    let html = md.render(mdSource);

    // 首字下沉：把渲染出的第一个 <p> 首字拿出来套一层 <span>
    if (dropcap) {
      html = html.replace(
        /<p style="([^"]*)">([^<])/,
        (_, ps, first) => `<p style="${ps}"><span style="${styleStr(theme.dropcap)}">${first}</span>`
      );
    }

    const container = styleStr(theme.container);
    return `<section style="${container}">${html}</section>`;
  };
}

function escapeHtml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
