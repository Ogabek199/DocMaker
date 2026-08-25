#!/usr/bin/env node
/**
 * PWA ikonkalarini yaratish uchun script
 * node scripts/generate-icons.js
 */

const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];
const outputDir = path.join(__dirname, '..', 'public', 'icons');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

sizes.forEach((size) => {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');

  // Background
  ctx.fillStyle = '#1e40af';
  roundRect(ctx, 0, 0, size, size, size * 0.18);
  ctx.fill();

  // White document shape
  const docW = size * 0.45;
  const docH = size * 0.55;
  const docX = (size - docW) / 2;
  const docY = (size - docH) / 2;

  ctx.fillStyle = 'white';
  ctx.beginPath();
  ctx.moveTo(docX + size * 0.1, docY);
  ctx.lineTo(docX + docW - size * 0.12, docY);
  ctx.lineTo(docX + docW, docY + size * 0.12);
  ctx.lineTo(docX + docW, docY + docH);
  ctx.lineTo(docX, docY + docH);
  ctx.closePath();
  ctx.fill();

  // Lines on document
  ctx.fillStyle = '#1e40af';
  const lineH = size * 0.04;
  const lineX = docX + size * 0.06;
  const lineW = docW - size * 0.12;
  [0.35, 0.45, 0.55, 0.65].forEach((yFrac) => {
    ctx.fillRect(lineX, docY + docH * yFrac, lineW, lineH);
  });

  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(path.join(outputDir, `icon-${size}x${size}.png`), buffer);
  console.log(`✓ icon-${size}x${size}.png`);
});

function roundRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}
