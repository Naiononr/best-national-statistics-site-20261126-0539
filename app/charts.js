// charts.js — small canvas chart helpers written for this site. No library.
// Every chart draws with the 2D canvas API, scales for devicePixelRatio,
// and shows a value tooltip on hover.
export const PALETTE = ['#0f766e', '#d97706', '#2563eb', '#b45309', '#059669', '#7c3aed', '#dc2626', '#0891b2'];

function setupCanvas(canvas) {
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  const width = Math.max(280, Math.floor(rect.width));
  // Pin the CSS height to the height attribute: with only `width: 100%` in
  // CSS, the browser would otherwise scale the height by aspect ratio and
  // the chart would render taller than intended, pushing its axis labels out
  // of the card.
  const height = Number(canvas.getAttribute('height')) || Math.max(180, Math.floor(rect.height));
  canvas.style.height = `${height}px`;
  canvas.width = Math.round(width * dpr);
  canvas.height = Math.round(height * dpr);
  const ctx = canvas.getContext('2d');
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  return { ctx, width, height };
}

function niceMax(max) {
  const pow = Math.pow(10, Math.floor(Math.log10(max || 1)));
  const n = max / pow;
  const step = n <= 1 ? 1 : n <= 2 ? 2 : n <= 2.5 ? 2.5 : n <= 5 ? 5 : 10;
  return step * pow;
}

function drawAxes(ctx, box, labels, yMax, yMin, yLabel) {
  ctx.font = '11px system-ui, sans-serif';
  ctx.fillStyle = '#64748b';
  ctx.strokeStyle = '#e2e8f0';
  ctx.lineWidth = 1;
  const steps = 4;
  for (let i = 0; i <= steps; i++) {
    const v = yMin + ((yMax - yMin) * i) / steps;
    const y = box.y + box.h - (box.h * i) / steps;
    ctx.beginPath();
    ctx.moveTo(box.x, y);
    ctx.lineTo(box.x + box.w, y);
    ctx.stroke();
    ctx.textAlign = 'right';
    ctx.fillText(yLabel(v), box.x - 8, y + 4);
  }
  ctx.textAlign = 'center';
  labels.forEach((label, i) => {
    const x = box.x + (box.w * (i + 0.5)) / labels.length;
    ctx.fillText(String(label), x, box.y + box.h + 16);
  });
}

function attachTooltip(canvas, points) {
  // points: [{x, y, text}] in CSS pixels relative to the canvas.
  let tip = canvas.parentElement.querySelector('.chart-tip');
  if (!tip) {
    tip = document.createElement('div');
    tip.className = 'chart-tip';
    canvas.parentElement.appendChild(tip);
  }
  canvas.addEventListener('mousemove', (event) => {
    const rect = canvas.getBoundingClientRect();
    const mx = event.clientX - rect.left;
    const my = event.clientY - rect.top;
    let best = null;
    let bestDist = 28;
    for (const p of points) {
      const d = Math.hypot(p.x - mx, p.y - my);
      if (d < bestDist) { best = p; bestDist = d; }
    }
    if (best) {
      tip.textContent = best.text;
      tip.style.left = `${Math.min(Math.max(best.x + 10, 4), rect.width - 120)}px`;
      tip.style.top = `${Math.max(best.y - 14, 4)}px`;
      tip.style.opacity = '1';
    } else {
      tip.style.opacity = '0';
    }
  });
  canvas.addEventListener('mouseleave', () => { tip.style.opacity = '0'; });
}

export function drawBarChart(canvas, labels, values, options = {}) {
  const { ctx, width, height } = setupCanvas(canvas);
  const fmt = options.format || ((v) => String(v));
  const yMin = options.min !== undefined ? options.min : Math.min(0, ...values);
  const yMax = niceMax(Math.max(...values, 1));
  const box = { x: 52, y: 12, w: width - 62, h: height - 44 };
  const zeroY = box.y + box.h - ((0 - yMin) / (yMax - yMin)) * box.h;
  drawAxes(ctx, box, labels, yMax, yMin, (v) => fmt(v));
  const slot = box.w / values.length;
  const barW = Math.min(42, slot * 0.62);
  const points = [];
  values.forEach((v, i) => {
    const x = box.x + slot * i + (slot - barW) / 2;
    const y = box.y + box.h - ((v - yMin) / (yMax - yMin)) * box.h;
    const top = Math.min(y, zeroY);
    const bottom = Math.max(y, zeroY);
    ctx.fillStyle = v < 0 ? '#dc2626' : (options.color || '#0f766e');
    ctx.beginPath();
    ctx.roundRect(x, top, barW, Math.max(2, bottom - top), 3);
    ctx.fill();
    ctx.fillStyle = '#0f172a';
    ctx.font = '11px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(fmt(v), x + barW / 2, top - 5);
    points.push({ x: x + barW / 2, y: (top + bottom) / 2, text: `${labels[i]}: ${fmt(v)}` });
  });
  attachTooltip(canvas, points);
}

export function drawLineChart(canvas, labels, values, options = {}) {
  const { ctx, width, height } = setupCanvas(canvas);
  const fmt = options.format || ((v) => String(v));
  const yMin = options.min !== undefined ? options.min : Math.min(...values) * 0.9;
  const yMax = options.max !== undefined ? options.max : niceMax(Math.max(...values));
  const box = { x: 52, y: 12, w: width - 62, h: height - 44 };
  drawAxes(ctx, box, labels, yMax, yMin, (v) => fmt(v));
  const xs = values.map((_, i) => box.x + (box.w * i) / (values.length - 1));
  const ys = values.map((v) => box.y + box.h - ((v - yMin) / (yMax - yMin)) * box.h);
  ctx.strokeStyle = options.color || '#0f766e';
  ctx.lineWidth = 2.5;
  ctx.lineJoin = 'round';
  ctx.beginPath();
  xs.forEach((x, i) => { if (i === 0) ctx.moveTo(x, ys[i]); else ctx.lineTo(x, ys[i]); });
  ctx.stroke();
  ctx.lineTo(xs[xs.length - 1], box.y + box.h);
  ctx.lineTo(xs[0], box.y + box.h);
  ctx.closePath();
  ctx.fillStyle = (options.color || '#0f766e') + '22';
  ctx.fill();
  const points = [];
  values.forEach((v, i) => {
    ctx.fillStyle = '#ffffff';
    ctx.strokeStyle = options.color || '#0f766e';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(xs[i], ys[i], 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    points.push({ x: xs[i], y: ys[i], text: `${labels[i]}: ${fmt(v)}` });
  });
  attachTooltip(canvas, points);
}

export function drawDonut(canvas, items, options = {}) {
  const { ctx, width, height } = setupCanvas(canvas);
  const total = items.reduce((sum, item) => sum + item.value, 0);
  const cx = Math.min(width * 0.32, 150);
  const cy = height / 2;
  const radius = Math.min(height / 2 - 14, 110);
  const inner = radius * 0.58;
  let angle = -Math.PI / 2;
  const points = [];
  items.forEach((item, i) => {
    const sweep = (item.value / total) * Math.PI * 2;
    ctx.fillStyle = PALETTE[i % PALETTE.length];
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, radius, angle, angle + sweep);
    ctx.closePath();
    ctx.fill();
    const mid = angle + sweep / 2;
    points.push({
      x: cx + Math.cos(mid) * ((radius + inner) / 2),
      y: cy + Math.sin(mid) * ((radius + inner) / 2),
      text: `${item.label}: ${item.value}%`,
    });
    angle += sweep;
  });
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(cx, cy, inner, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#0f172a';
  ctx.font = 'bold 15px system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(options.centre || '', cx, cy - 2);
  ctx.fillStyle = '#64748b';
  ctx.font = '11px system-ui, sans-serif';
  ctx.fillText(options.centreSub || '', cx, cy + 15);
  // Legend on the right.
  const legendX = cx + radius + 24;
  let ly = Math.max(16, cy - (items.length * 9));
  ctx.textAlign = 'left';
  items.forEach((item, i) => {
    ctx.fillStyle = PALETTE[i % PALETTE.length];
    ctx.fillRect(legendX, ly, 10, 10);
    ctx.fillStyle = '#334155';
    ctx.font = '12px system-ui, sans-serif';
    const label = item.label.length > 30 ? item.label.slice(0, 29) + '…' : item.label;
    ctx.fillText(`${label} — ${item.value}%`, legendX + 16, ly + 9);
    ly += 20;
  });
  attachTooltip(canvas, points);
}

export function drawHorizontalBars(canvas, items, options = {}) {
  const { ctx, width, height } = setupCanvas(canvas);
  const fmt = options.format || ((v) => `${v}%`);
  const max = Math.max(...items.map((item) => item.value));
  const labelW = options.labelWidth || 120;
  const box = { x: labelW, y: 8, w: width - labelW - 56, h: height - 16 };
  const rowH = box.h / items.length;
  const points = [];
  items.forEach((item, i) => {
    const y = box.y + rowH * i + rowH * 0.18;
    const barH = rowH * 0.58;
    const barW = (item.value / max) * box.w;
    ctx.fillStyle = '#334155';
    ctx.font = '12px system-ui, sans-serif';
    ctx.textAlign = 'right';
    const label = item.label.length > 18 ? item.label.slice(0, 17) + '…' : item.label;
    ctx.fillText(label, box.x - 8, y + barH / 2 + 4);
    ctx.fillStyle = PALETTE[i % PALETTE.length];
    ctx.beginPath();
    ctx.roundRect(box.x, y, Math.max(2, barW), barH, 3);
    ctx.fill();
    ctx.fillStyle = '#0f172a';
    ctx.textAlign = 'left';
    ctx.fillText(fmt(item.value), box.x + barW + 6, y + barH / 2 + 4);
    points.push({ x: box.x + barW / 2, y: y + barH / 2, text: `${item.label}: ${fmt(item.value)}` });
  });
  attachTooltip(canvas, points);
}
