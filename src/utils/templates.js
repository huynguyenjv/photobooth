// Photobooth Templates - Professional Designs
// Inspired by professional photobooth strips

export const TEMPLATES = [
  // ============ PROFESSIONAL TEMPLATES ============
  {
    id: 'love-zebra',
    name: 'Love Zebra',
    icon: '🦓',
    category: 'love',
    background: {
      type: 'solid',
      colors: ['#fce4ec'],
      pattern: 'hearts',
      patternColor: 'rgba(233, 30, 99, 0.15)',
    },
    border: {
      color: '#ffffff',
      width: 8,
      radius: 6,
    },
    frame: {
      color: '#1a1a1a',
      width: 14,
    },
    header: {
      height: 35,
      pattern: 'checkered',
      colors: ['#1a1a1a', '#ffffff'],
      squareSize: 10,
    },
    footer: {
      height: 90,
      background: 'transparent',
    },
    photoGap: 24,
    innerPadding: 20,
    watermark: {
      text: '♥ LOVE ♥',
      color: '#d81b60',
      fontSize: 28,
      font: 'Georgia, serif',
    },
    decorations: [
      { type: 'sticker', content: '🦓', position: 'top-left', size: 45 },
      { type: 'sticker', content: '🦓', position: 'bottom-right', size: 50 },
      { type: 'text', text: 'LOVE', position: 'bottom-left', size: 36, color: '#d81b60', font: 'Impact', outline: true, outlineColor: '#fff', outlineWidth: 2 },
    ],
    textColor: '#880e4f',
  },
  {
    id: 'classic-strip',
    name: 'Classic Strip',
    icon: '📷',
    category: 'basic',
    background: {
      type: 'solid',
      colors: ['#f5f5f5'],
      pattern: 'dots',
      patternColor: 'rgba(0, 0, 0, 0.08)',
    },
    border: {
      color: '#ffffff',
      width: 8,
      radius: 4,
    },
    frame: {
      color: '#2c2c2c',
      width: 16,
    },
    header: {
      height: 30,
      pattern: 'checkered',
      colors: ['#2c2c2c', '#ffffff'],
      squareSize: 8,
    },
    footer: {
      height: 80,
    },
    photoGap: 22,
    innerPadding: 22,
    watermark: {
      text: '📷 PHOTOBOOTH',
      color: '#333333',
      fontSize: 22,
      font: 'Arial Black, sans-serif',
    },
    decorations: [],
    textColor: '#555555',
  },
  {
    id: 'retro-pink',
    name: 'Retro Pink',
    icon: '💗',
    category: 'style',
    background: {
      type: 'gradient',
      colors: ['#fff0f5', '#ffb6c1'],
      pattern: 'hearts',
      patternColor: 'rgba(255, 105, 180, 0.2)',
    },
    border: {
      color: '#ffffff',
      width: 10,
      radius: 8,
    },
    frame: {
      color: '#ff69b4',
      width: 12,
    },
    footer: {
      height: 85,
    },
    photoGap: 26,
    innerPadding: 24,
    watermark: {
      text: '♡ MEMORIES ♡',
      color: '#ff1493',
      fontSize: 24,
      font: 'Brush Script MT, cursive',
    },
    decorations: [
      { type: 'sticker', content: '💕', position: 'top-left', size: 35 },
      { type: 'sticker', content: '💕', position: 'top-right', size: 35 },
      { type: 'sticker', content: '✨', position: 'bottom-left', size: 30 },
      { type: 'sticker', content: '✨', position: 'bottom-right', size: 30 },
    ],
    textColor: '#c71585',
  },
  {
    id: 'elegant-gold',
    name: 'Elegant Gold',
    icon: '✨',
    category: 'celebration',
    background: {
      type: 'gradient',
      colors: ['#1a1a2e', '#0f0f1a'],
    },
    border: {
      color: '#d4af37',
      width: 10,
      radius: 6,
    },
    frame: {
      color: '#d4af37',
      width: 14,
    },
    footer: {
      height: 80,
    },
    photoGap: 24,
    innerPadding: 25,
    watermark: {
      text: '★ SPECIAL MOMENTS ★',
      color: '#d4af37',
      fontSize: 20,
      font: 'Times New Roman, serif',
    },
    decorations: [
      { type: 'sticker', content: '⭐', position: 'top-left', size: 32 },
      { type: 'sticker', content: '⭐', position: 'top-right', size: 32 },
    ],
    textColor: '#ffd700',
  },
  {
    id: 'neon-party',
    name: 'Neon Party',
    icon: '🌟',
    category: 'celebration',
    background: {
      type: 'gradient',
      colors: ['#0a0a0a', '#1a0a2e'],
    },
    border: {
      color: '#00ff88',
      width: 8,
      radius: 10,
    },
    frame: {
      color: '#ff00ff',
      width: 12,
    },
    header: {
      height: 25,
      pattern: 'stripes',
      colors: ['#ff00ff', '#00ffff'],
    },
    footer: {
      height: 85,
    },
    photoGap: 20,
    innerPadding: 22,
    watermark: {
      text: '✦ PARTY TIME ✦',
      color: '#00ff88',
      fontSize: 22,
      font: 'Arial Black, sans-serif',
    },
    decorations: [
      { type: 'sticker', content: '🎉', position: 'top-left', size: 38 },
      { type: 'sticker', content: '🎊', position: 'top-right', size: 38 },
      { type: 'sticker', content: '🪩', position: 'bottom-left', size: 35 },
      { type: 'sticker', content: '🪩', position: 'bottom-right', size: 35 },
    ],
    textColor: '#ff00ff',
  },
  // ============ ORIGINAL TEMPLATES (UPDATED) ============
  {
    id: 'classic',
    name: 'Classic',
    icon: '🖼️',
    category: 'basic',
    background: {
      type: 'gradient',
      colors: ['#1a1a2e', '#16213e'],
    },
    border: {
      color: '#ffffff',
      width: 8,
      radius: 10,
    },
    frame: {
      color: '#333333',
      width: 10,
    },
    photoGap: 20,
    innerPadding: 22,
    footer: {
      height: 70,
    },
    watermark: {
      text: '📷 Photobooth',
      color: 'rgba(255, 255, 255, 0.6)',
      fontSize: 18,
    },
    decorations: [],
  },
  {
    id: 'tet',
    name: 'Tết 2026',
    icon: '🧧',
    category: 'tet',
    background: {
      type: 'gradient',
      colors: ['#c41e3a', '#8b0000'],
      pattern: 'dots',
      patternColor: 'rgba(255, 215, 0, 0.15)',
    },
    border: {
      color: '#ffd700',
      width: 10,
      radius: 12,
    },
    frame: {
      color: '#ffd700',
      width: 14,
    },
    header: {
      height: 30,
      pattern: 'checkered',
      colors: ['#ffd700', '#c41e3a'],
      squareSize: 10,
    },
    footer: {
      height: 90,
    },
    photoGap: 24,
    innerPadding: 25,
    watermark: {
      text: '🧧 Chúc Mừng Năm Mới 2026 🧧',
      color: '#ffd700',
      fontSize: 18,
    },
    decorations: [
      { type: 'sticker', content: '🏮', position: 'top-left', size: 40 },
      { type: 'sticker', content: '🏮', position: 'top-right', size: 40 },
      { type: 'sticker', content: '🧨', position: 'bottom-left', size: 35 },
      { type: 'sticker', content: '🧨', position: 'bottom-right', size: 35 },
    ],
  },
  {
    id: 'couple',
    name: 'Couple',
    icon: '💕',
    category: 'love',
    background: {
      type: 'gradient',
      colors: ['#ffe4ec', '#ffc1d3'],
      pattern: 'hearts',
      patternColor: 'rgba(255, 20, 147, 0.12)',
    },
    border: {
      color: '#ffffff',
      width: 10,
      radius: 16,
    },
    frame: {
      color: '#ff69b4',
      width: 12,
    },
    footer: {
      height: 85,
    },
    photoGap: 26,
    innerPadding: 24,
    watermark: {
      text: '💕 Love Story 💕',
      color: '#d81b60',
      fontSize: 22,
    },
    decorations: [
      { type: 'sticker', content: '❤️', position: 'top-left', size: 38 },
      { type: 'sticker', content: '💕', position: 'top-right', size: 38 },
      { type: 'sticker', content: '💖', position: 'bottom-left', size: 32 },
      { type: 'sticker', content: '💗', position: 'bottom-right', size: 32 },
    ],
  },
  {
    id: 'wedding',
    name: 'Wedding',
    icon: '💒',
    category: 'love',
    background: {
      type: 'gradient',
      colors: ['#faf9f6', '#f0ebe3'],
      pattern: 'dots',
      patternColor: 'rgba(212, 175, 55, 0.1)',
    },
    border: {
      color: '#d4af37',
      width: 12,
      radius: 10,
    },
    frame: {
      color: '#d4af37',
      width: 14,
    },
    footer: {
      height: 90,
    },
    photoGap: 28,
    innerPadding: 28,
    watermark: {
      text: '💍 Just Married 💍',
      color: '#8b7355',
      fontSize: 22,
      font: 'Georgia, serif',
    },
    decorations: [
      { type: 'sticker', content: '💐', position: 'top-left', size: 40 },
      { type: 'sticker', content: '💐', position: 'top-right', size: 40 },
      { type: 'sticker', content: '🕊️', position: 'bottom-left', size: 35 },
      { type: 'sticker', content: '🕊️', position: 'bottom-right', size: 35 },
    ],
    textColor: '#5c4033',
  },
  {
    id: 'party',
    name: 'Party',
    icon: '🎉',
    category: 'celebration',
    background: {
      type: 'gradient',
      colors: ['#667eea', '#764ba2'],
    },
    border: {
      color: '#ffffff',
      width: 10,
      radius: 12,
    },
    frame: {
      color: '#ffd700',
      width: 12,
    },
    header: {
      height: 25,
      pattern: 'stripes',
      colors: ['#ffd700', '#ff6b6b'],
    },
    footer: {
      height: 80,
    },
    photoGap: 22,
    innerPadding: 22,
    watermark: {
      text: '🎉 Party Time! 🎊',
      color: 'rgba(255, 255, 255, 0.9)',
      fontSize: 22,
    },
    decorations: [
      { type: 'sticker', content: '🎈', position: 'top-left', size: 40 },
      { type: 'sticker', content: '🎈', position: 'top-right', size: 40 },
      { type: 'sticker', content: '🎁', position: 'bottom-left', size: 35 },
      { type: 'sticker', content: '🎁', position: 'bottom-right', size: 35 },
    ],
  },
  {
    id: 'birthday',
    name: 'Birthday',
    icon: '🎂',
    category: 'celebration',
    background: {
      type: 'gradient',
      colors: ['#fff0f3', '#ffc2d1'],
      pattern: 'dots',
      patternColor: 'rgba(255, 107, 107, 0.15)',
    },
    border: {
      color: '#ffffff',
      width: 10,
      radius: 14,
    },
    frame: {
      color: '#ff6b6b',
      width: 12,
    },
    footer: {
      height: 85,
    },
    photoGap: 24,
    innerPadding: 24,
    watermark: {
      text: '🎂 Happy Birthday! 🎁',
      color: '#c44569',
      fontSize: 22,
    },
    decorations: [
      { type: 'sticker', content: '🎈', position: 'top-left', size: 42 },
      { type: 'sticker', content: '🎈', position: 'top-right', size: 42 },
      { type: 'sticker', content: '🎁', position: 'bottom-left', size: 36 },
      { type: 'sticker', content: '🎂', position: 'bottom-right', size: 38 },
    ],
    textColor: '#c44569',
  },
  {
    id: 'christmas',
    name: 'Christmas',
    icon: '🎄',
    category: 'seasonal',
    background: {
      type: 'gradient',
      colors: ['#165b33', '#0b3d21'],
      pattern: 'dots',
      patternColor: 'rgba(255, 255, 255, 0.1)',
    },
    border: {
      color: '#c41e3a',
      width: 10,
      radius: 12,
    },
    frame: {
      color: '#ffd700',
      width: 14,
    },
    header: {
      height: 28,
      pattern: 'checkered',
      colors: ['#c41e3a', '#165b33'],
      squareSize: 10,
    },
    footer: {
      height: 85,
    },
    photoGap: 24,
    innerPadding: 24,
    watermark: {
      text: '🎄 Merry Christmas 🎅',
      color: '#ffffff',
      fontSize: 20,
    },
    decorations: [
      { type: 'sticker', content: '⭐', position: 'top-left', size: 40 },
      { type: 'sticker', content: '⭐', position: 'top-right', size: 40 },
      { type: 'sticker', content: '🎁', position: 'bottom-left', size: 36 },
      { type: 'sticker', content: '🎅', position: 'bottom-right', size: 38 },
    ],
  },
  {
    id: 'halloween',
    name: 'Halloween',
    icon: '🎃',
    category: 'seasonal',
    background: {
      type: 'gradient',
      colors: ['#1a1a1a', '#2d1f3d'],
    },
    border: {
      color: '#ff6600',
      width: 10,
      radius: 10,
    },
    frame: {
      color: '#ff6600',
      width: 12,
    },
    header: {
      height: 25,
      pattern: 'stripes',
      colors: ['#ff6600', '#1a1a1a'],
    },
    footer: {
      height: 80,
    },
    photoGap: 22,
    innerPadding: 22,
    watermark: {
      text: '🎃 Happy Halloween 👻',
      color: '#ff6600',
      fontSize: 20,
    },
    decorations: [
      { type: 'sticker', content: '🦇', position: 'top-left', size: 38 },
      { type: 'sticker', content: '🦇', position: 'top-right', size: 38 },
      { type: 'sticker', content: '👻', position: 'bottom-left', size: 36 },
      { type: 'sticker', content: '🎃', position: 'bottom-right', size: 40 },
    ],
  },
  {
    id: 'vintage',
    name: 'Vintage',
    icon: '📜',
    category: 'style',
    background: {
      type: 'solid',
      colors: ['#f4e4bc'],
      pattern: 'dots',
      patternColor: 'rgba(139, 69, 19, 0.08)',
    },
    border: {
      color: '#8b4513',
      width: 12,
      radius: 6,
    },
    frame: {
      color: '#654321',
      width: 14,
    },
    footer: {
      height: 80,
    },
    photoGap: 24,
    innerPadding: 24,
    watermark: {
      text: '✨ Vintage Memories ✨',
      color: '#5c4033',
      fontSize: 20,
      font: 'Georgia, serif',
    },
    decorations: [],
    textColor: '#5c4033',
  },
  {
    id: 'neon',
    name: 'Neon',
    icon: '💜',
    category: 'style',
    background: {
      type: 'solid',
      colors: ['#0a0a0a'],
    },
    border: {
      color: '#ff00ff',
      width: 8,
      radius: 10,
    },
    frame: {
      color: '#00ffff',
      width: 10,
    },
    footer: {
      height: 80,
    },
    photoGap: 22,
    innerPadding: 22,
    watermark: {
      text: '✨ NEON VIBES ✨',
      color: '#ff00ff',
      fontSize: 22,
    },
    decorations: [
      { type: 'sticker', content: '⚡', position: 'top-left', size: 36 },
      { type: 'sticker', content: '⚡', position: 'top-right', size: 36 },
    ],
  },
  {
    id: 'polaroid',
    name: 'Polaroid',
    icon: '📷',
    category: 'style',
    background: {
      type: 'solid',
      colors: ['#f8f8f8'],
    },
    border: {
      color: '#ffffff',
      width: 14,
      radius: 3,
    },
    frame: {
      color: '#2c2c2c',
      width: 16,
    },
    footer: {
      height: 90,
    },
    photoGap: 26,
    innerPadding: 26,
    watermark: {
      text: 'Instant Memories',
      color: '#333',
      fontSize: 18,
      font: 'Courier New, monospace',
    },
    decorations: [],
    textColor: '#333',
  },
  {
    id: 'summer',
    name: 'Summer',
    icon: '🌴',
    category: 'seasonal',
    background: {
      type: 'gradient',
      colors: ['#87ceeb', '#00bfff'],
      pattern: 'dots',
      patternColor: 'rgba(255, 255, 255, 0.2)',
    },
    border: {
      color: '#ffffff',
      width: 10,
      radius: 12,
    },
    frame: {
      color: '#ff8c00',
      width: 12,
    },
    footer: {
      height: 85,
    },
    photoGap: 24,
    innerPadding: 24,
    watermark: {
      text: '☀️ Summer Vibes 🌊',
      color: '#ffffff',
      fontSize: 22,
    },
    decorations: [
      { type: 'sticker', content: '🌴', position: 'top-left', size: 42 },
      { type: 'sticker', content: '🌺', position: 'top-right', size: 40 },
      { type: 'sticker', content: '🐚', position: 'bottom-left', size: 35 },
      { type: 'sticker', content: '🏖️', position: 'bottom-right', size: 38 },
    ],
  },
  {
    id: 'graduation',
    name: 'Graduation',
    icon: '🎓',
    category: 'celebration',
    background: {
      type: 'gradient',
      colors: ['#1a237e', '#0d47a1'],
    },
    border: {
      color: '#ffd700',
      width: 12,
      radius: 10,
    },
    frame: {
      color: '#ffd700',
      width: 14,
    },
    header: {
      height: 28,
      pattern: 'checkered',
      colors: ['#ffd700', '#1a237e'],
      squareSize: 10,
    },
    footer: {
      height: 90,
    },
    photoGap: 26,
    innerPadding: 26,
    watermark: {
      text: '🎓 Congratulations Graduate! 🎓',
      color: '#ffd700',
      fontSize: 20,
    },
    decorations: [
      { type: 'sticker', content: '🎓', position: 'top-left', size: 45 },
      { type: 'sticker', content: '🎓', position: 'top-right', size: 45 },
      { type: 'sticker', content: '📜', position: 'bottom-left', size: 38 },
      { type: 'sticker', content: '⭐', position: 'bottom-right', size: 36 },
    ],
  },
  // ============ TẾT TEMPLATES (PRO DESIGN) ============
  {
    id: 'tet-mai-vang',
    name: 'Mai Vàng',
    icon: '🌼',
    category: 'tet',
    background: {
      type: 'gradient',
      colors: ['#8B0000', '#DC143C'],
      pattern: 'dots',
      patternColor: 'rgba(255, 215, 0, 0.12)',
    },
    border: {
      color: '#FFD700',
      width: 12,
      radius: 12,
    },
    frame: {
      color: '#FFD700',
      width: 16,
    },
    header: {
      height: 32,
      pattern: 'checkered',
      colors: ['#FFD700', '#8B0000'],
      squareSize: 11,
    },
    footer: {
      height: 90,
    },
    photoGap: 26,
    innerPadding: 26,
    watermark: {
      text: '🌼 Xuân Bính Ngọ 2026 🌼',
      color: '#FFD700',
      fontSize: 20,
    },
    decorations: [
      { type: 'sticker', content: '🌸', position: 'top-left', size: 45 },
      { type: 'sticker', content: '🌸', position: 'top-right', size: 45 },
      { type: 'sticker', content: '🧧', position: 'bottom-left', size: 40 },
      { type: 'sticker', content: '🧧', position: 'bottom-right', size: 40 },
    ],
  },
  {
    id: 'tet-dao-hong',
    name: 'Đào Hồng',
    icon: '🌸',
    category: 'tet',
    background: {
      type: 'gradient',
      colors: ['#fff0f5', '#ffb6c1'],
      pattern: 'hearts',
      patternColor: 'rgba(199, 21, 133, 0.15)',
    },
    border: {
      color: '#FF69B4',
      width: 12,
      radius: 14,
    },
    frame: {
      color: '#C71585',
      width: 14,
    },
    footer: {
      height: 85,
    },
    photoGap: 26,
    innerPadding: 26,
    watermark: {
      text: '🌸 Tân Xuân Như Ý 🌸',
      color: '#C71585',
      fontSize: 20,
    },
    decorations: [
      { type: 'sticker', content: '🌺', position: 'top-left', size: 42 },
      { type: 'sticker', content: '🌺', position: 'top-right', size: 42 },
      { type: 'sticker', content: '🎋', position: 'bottom-left', size: 38 },
      { type: 'sticker', content: '🎋', position: 'bottom-right', size: 38 },
    ],
  },
  {
    id: 'tet-rong-vang',
    name: 'Rồng Vàng',
    icon: '🐉',
    category: 'tet',
    background: {
      type: 'gradient',
      colors: ['#B8860B', '#FFD700'],
    },
    border: {
      color: '#8B0000',
      width: 14,
      radius: 12,
    },
    frame: {
      color: '#DC143C',
      width: 16,
    },
    watermark: {
      text: '🐉 Thăng Long Thịnh Vượng 🐉',
      color: '#8B0000',
      fontSize: 18,
    },
    footer: {
      height: 85,
    },
    photoGap: 26,
    innerPadding: 26,
    decorations: [
      { type: 'sticker', content: '🐲', position: 'top-left', size: 48 },
      { type: 'sticker', content: '🐲', position: 'top-right', size: 48 },
      { type: 'sticker', content: '🏮', position: 'bottom-left', size: 40 },
      { type: 'sticker', content: '🏮', position: 'bottom-right', size: 40 },
    ],
  },
  {
    id: 'tet-phuc-loc-tho',
    name: 'Phúc Lộc Thọ',
    icon: '🏮',
    category: 'tet',
    background: {
      type: 'gradient',
      colors: ['#FF0000', '#8B0000'],
      pattern: 'dots',
      patternColor: 'rgba(255, 215, 0, 0.1)',
    },
    border: {
      color: '#FFD700',
      width: 14,
      radius: 6,
    },
    frame: {
      color: '#FFD700',
      width: 16,
    },
    header: {
      height: 30,
      pattern: 'checkered',
      colors: ['#FFD700', '#8B0000'],
      squareSize: 10,
    },
    footer: {
      height: 90,
    },
    photoGap: 28,
    innerPadding: 28,
    watermark: {
      text: '福 禄 寿 • Phúc Lộc Thọ',
      color: '#FFD700',
      fontSize: 22,
      font: 'serif',
    },
    decorations: [
      { type: 'sticker', content: '🏮', position: 'top-left', size: 45 },
      { type: 'sticker', content: '🏮', position: 'top-right', size: 45 },
      { type: 'sticker', content: '🧨', position: 'bottom-left', size: 40 },
      { type: 'sticker', content: '🧨', position: 'bottom-right', size: 40 },
    ],
  },
  {
    id: 'tet-banh-chung',
    name: 'Bánh Chưng',
    icon: '🍚',
    category: 'tet',
    background: {
      type: 'gradient',
      colors: ['#228B22', '#006400'],
    },
    border: {
      color: '#90EE90',
      width: 12,
      radius: 4,
    },
    frame: {
      color: '#32CD32',
      width: 14,
    },
    footer: {
      height: 85,
    },
    photoGap: 24,
    innerPadding: 24,
    watermark: {
      text: '🍚 Tết Đoàn Viên 🍚',
      color: '#90EE90',
      fontSize: 20,
    },
    decorations: [
      { type: 'sticker', content: '🎍', position: 'top-left', size: 42 },
      { type: 'sticker', content: '🎍', position: 'top-right', size: 42 },
      { type: 'sticker', content: '🧧', position: 'bottom-left', size: 38 },
      { type: 'sticker', content: '🧧', position: 'bottom-right', size: 38 },
    ],
  },
  {
    id: 'tet-ong-do',
    name: 'Ông Đồ',
    icon: '✍️',
    category: 'tet',
    background: {
      type: 'gradient',
      colors: ['#f5e6d3', '#e8d4b8'],
      pattern: 'dots',
      patternColor: 'rgba(139, 69, 19, 0.08)',
    },
    border: {
      color: '#8B4513',
      width: 12,
      radius: 8,
    },
    frame: {
      color: '#8B0000',
      width: 14,
    },
    footer: {
      height: 85,
    },
    photoGap: 26,
    innerPadding: 26,
    watermark: {
      text: '✍️ Thư Pháp Ngày Xuân ✍️',
      color: '#8B0000',
      fontSize: 20,
      font: 'serif',
    },
    decorations: [
      { type: 'sticker', content: '📜', position: 'top-left', size: 42 },
      { type: 'sticker', content: '📜', position: 'top-right', size: 42 },
      { type: 'sticker', content: '🖌️', position: 'bottom-left', size: 38 },
      { type: 'sticker', content: '🖌️', position: 'bottom-right', size: 38 },
    ],
  },
  {
    id: 'tet-phao-hoa',
    name: 'Pháo Hoa',
    icon: '🎆',
    category: 'tet',
    background: {
      type: 'gradient',
      colors: ['#1a1a2e', '#0f0f23'],
    },
    border: {
      color: '#FFD700',
      width: 10,
      radius: 10,
    },
    frame: {
      color: '#FF6347',
      width: 12,
    },
    header: {
      height: 25,
      pattern: 'stripes',
      colors: ['#FFD700', '#FF6347'],
    },
    footer: {
      height: 85,
    },
    photoGap: 24,
    innerPadding: 24,
    watermark: {
      text: 'GIAO THỪA 2026',
      color: '#FFD700',
      fontSize: 22,
    },
    decorations: [],
  },
  // ============ BEER & DRINK TEMPLATES - BRAND AUTHENTIC ============
  {
    id: 'heineken',
    name: 'Heineken',
    icon: '★',
    category: 'drinks',
    // Heineken brand: Green #00843D, Red star, White text
    background: {
      type: 'solid',
      colors: ['#00843D'],
    },
    border: {
      color: '#ffffff',
      width: 10,
      radius: 0, // Sharp corners - modern
    },
    frame: {
      color: '#00843D',
      width: 20,
    },
    footer: {
      height: 100,
      background: '#00843D',
    },
    photoGap: 20,
    innerPadding: 20,
    watermark: {
      text: 'HEINEKEN',
      color: '#ffffff',
      fontSize: 32,
      font: 'Arial Black, sans-serif',
      letterSpacing: 4,
    },
    subtext: {
      text: 'PREMIUM QUALITY',
      color: 'rgba(255,255,255,0.7)',
      fontSize: 12,
    },
    decorations: [],
    accentColor: '#e21a23', // Red star color
  },
  {
    id: 'tiger',
    name: 'Tiger Beer',
    icon: '🐯',
    category: 'drinks',
    // Tiger brand: Premium navy + gold design
    background: {
      type: 'solid',
      colors: ['#0D1B2A'],
    },
    border: {
      color: '#C9A227',
      width: 3,
      radius: 0,
    },
    frame: {
      color: '#0D1B2A',
      width: 24,
    },
    footer: {
      height: 130,
      background: 'transparent',
    },
    photoGap: 10,
    innerPadding: 10,
    decorations: [
      { type: 'image', src: '/src/assets/templates/tiger/tiger-can.png', position: 'bottom-left', size: 140, rotate: -15 },
      { type: 'image', src: '/src/assets/templates/tiger/tiger-can.png', position: 'bottom-right', size: 140, rotate: 15 },
    ],
    logoImage: '/src/assets/templates/tiger/tiger-logo.webp',
    logoSize: 1.5,
  },
  {
    id: 'saigon-beer',
    name: 'Bia Saigon',
    icon: '◆',
    category: 'drinks',
    // Saigon Beer: Red #C8102E, Gold accents
    background: {
      type: 'solid',
      colors: ['#C8102E'],
    },
    border: {
      color: '#FFD700',
      width: 6,
      radius: 0,
    },
    frame: {
      color: '#8B0000',
      width: 22,
    },
    footer: {
      height: 95,
      background: '#8B0000',
    },
    photoGap: 20,
    innerPadding: 20,
    watermark: {
      text: 'BIA SAIGON',
      color: '#FFD700',
      fontSize: 28,
      font: 'Arial Black, sans-serif',
      letterSpacing: 3,
    },
    subtext: {
      text: 'CHẤT SÀI GÒN',
      color: 'rgba(255,215,0,0.7)',
      fontSize: 12,
    },
    decorations: [],
  },
  {
    id: 'bia-333',
    name: 'Bia 333',
    icon: '3',
    category: 'drinks',
    // 333 brand: Blue #005BAA, White/Gold
    background: {
      type: 'solid',
      colors: ['#005BAA'],
    },
    border: {
      color: '#ffffff',
      width: 8,
      radius: 0,
    },
    frame: {
      color: '#003366',
      width: 20,
    },
    footer: {
      height: 95,
      background: '#003366',
    },
    photoGap: 20,
    innerPadding: 20,
    watermark: {
      text: '333',
      color: '#FFD700',
      fontSize: 42,
      font: 'Impact, sans-serif',
      letterSpacing: 8,
    },
    subtext: {
      text: 'EXPORT QUALITY',
      color: 'rgba(255,255,255,0.6)',
      fontSize: 11,
    },
    decorations: [],
  },
  {
    id: 'ruou-vang',
    name: 'Wine',
    icon: '♦',
    category: 'drinks',
    // Wine: Deep burgundy, elegant gold
    background: {
      type: 'solid',
      colors: ['#4A0E0E'],
    },
    border: {
      color: '#C9A227',
      width: 4,
      radius: 0,
    },
    frame: {
      color: '#2D0A0A',
      width: 25,
    },
    footer: {
      height: 100,
      background: '#2D0A0A',
    },
    photoGap: 22,
    innerPadding: 22,
    watermark: {
      text: 'WINE',
      color: '#C9A227',
      fontSize: 28,
      font: 'Georgia, serif',
      letterSpacing: 8,
    },
    subtext: {
      text: 'PREMIUM SELECTION',
      color: 'rgba(201,162,39,0.6)',
      fontSize: 10,
    },
    decorations: [],
  },
  {
    id: 'whisky',
    name: 'Whisky',
    icon: '◈',
    category: 'drinks',
    // Whisky: Dark brown, gold accents, premium feel
    background: {
      type: 'solid',
      colors: ['#1A0F0A'],
    },
    border: {
      color: '#B8860B',
      width: 3,
      radius: 0,
    },
    frame: {
      color: '#0D0705',
      width: 28,
    },
    footer: {
      height: 100,
      background: '#0D0705',
    },
    photoGap: 24,
    innerPadding: 24,
    watermark: {
      text: 'WHISKY',
      color: '#B8860B',
      fontSize: 26,
      font: 'Times New Roman, serif',
      letterSpacing: 6,
    },
    subtext: {
      text: 'AGED TO PERFECTION',
      color: 'rgba(184,134,11,0.5)',
      fontSize: 10,
    },
    decorations: [],
  },
  {
    id: 'vodka',
    name: 'Vodka',
    icon: '◇',
    category: 'drinks',
    // Vodka: Clean white/silver, minimalist, icy
    background: {
      type: 'solid',
      colors: ['#E8E8E8'],
    },
    border: {
      color: '#1a1a1a',
      width: 2,
      radius: 0,
    },
    frame: {
      color: '#1a1a1a',
      width: 18,
    },
    footer: {
      height: 90,
      background: '#1a1a1a',
    },
    photoGap: 18,
    innerPadding: 18,
    watermark: {
      text: 'VODKA',
      color: '#ffffff',
      fontSize: 30,
      font: 'Arial, sans-serif',
      letterSpacing: 10,
    },
    subtext: {
      text: 'PURE & SMOOTH',
      color: 'rgba(255,255,255,0.5)',
      fontSize: 10,
    },
    decorations: [],
  },
  {
    id: 'cocktail',
    name: 'Cocktail',
    icon: '◐',
    category: 'drinks',
    background: {
      type: 'gradient',
      colors: ['#FF6B6B', '#FFA500'],
    },
    border: {
      color: '#ffffff',
      width: 6,
      radius: 0,
    },
    frame: {
      color: '#E85D5D',
      width: 16,
    },
    footer: {
      height: 90,
      background: '#E85D5D',
    },
    photoGap: 20,
    innerPadding: 20,
    watermark: {
      text: 'COCKTAIL',
      color: '#ffffff',
      fontSize: 26,
      font: 'Arial Black, sans-serif',
      letterSpacing: 4,
    },
    subtext: {
      text: 'MIX & ENJOY',
      color: 'rgba(255,255,255,0.6)',
      fontSize: 11,
    },
    decorations: [],
  },
  {
    id: 'cheers',
    name: 'Cheers',
    icon: '●',
    category: 'drinks',
    // Party/Celebration: Bold, festive
    background: {
      type: 'solid',
      colors: ['#1a1a1a'],
    },
    border: {
      color: '#FFD700',
      width: 4,
      radius: 0,
    },
    frame: {
      color: '#FFD700',
      width: 20,
    },
    footer: {
      height: 100,
      background: '#FFD700',
    },
    photoGap: 22,
    innerPadding: 22,
    watermark: {
      text: 'CHEERS',
      color: '#1a1a1a',
      fontSize: 34,
      font: 'Impact, sans-serif',
      letterSpacing: 6,
    },
    subtext: {
      text: 'DZÔ DZÔ DZÔ!',
      color: 'rgba(0,0,0,0.5)',
      fontSize: 12,
    },
    decorations: [],
  },
  {
    id: 'nhau-vui',
    name: 'Hội Nhậu',
    icon: '■',
    category: 'drinks',
    // Vietnamese drinking party: Warm, friendly
    background: {
      type: 'solid',
      colors: ['#2C1810'],
    },
    border: {
      color: '#D4A574',
      width: 4,
      radius: 0,
    },
    frame: {
      color: '#1A0E08',
      width: 22,
    },
    footer: {
      height: 95,
      background: '#1A0E08',
    },
    photoGap: 20,
    innerPadding: 20,
    watermark: {
      text: 'HỘI NHẬU',
      color: '#D4A574',
      fontSize: 28,
      font: 'Arial Black, sans-serif',
      letterSpacing: 4,
    },
    subtext: {
      text: '1 - 2 - 3 DZÔ!',
      color: 'rgba(212,165,116,0.6)',
      fontSize: 12,
    },
    decorations: [],
  },
  {
    id: 'quan-nhau',
    name: 'Quán Nhậu',
    icon: '▣',
    category: 'drinks',
    // Street food/beer vibe
    background: {
      type: 'solid',
      colors: ['#1C1C1C'],
    },
    border: {
      color: '#FF4500',
      width: 5,
      radius: 0,
    },
    frame: {
      color: '#0A0A0A',
      width: 20,
    },
    footer: {
      height: 90,
      background: '#0A0A0A',
    },
    photoGap: 18,
    innerPadding: 18,
    watermark: {
      text: 'QUÁN NHẬU',
      color: '#FF4500',
      fontSize: 26,
      font: 'Arial Black, sans-serif',
      letterSpacing: 3,
    },
    subtext: {
      text: 'BẠN BÈ TỤ HỌP',
      color: 'rgba(255,69,0,0.5)',
      fontSize: 11,
    },
    decorations: [],
  },
];

export const TEMPLATE_CATEGORIES = [
  { id: 'all', name: 'Tất cả', icon: '🎨' },
  { id: 'basic', name: 'Cơ bản', icon: '🖼️' },
  { id: 'tet', name: 'Tết', icon: '🧧' },
  { id: 'drinks', name: 'Đồ uống', icon: '🍺' },
  { id: 'love', name: 'Tình yêu', icon: '💕' },
  { id: 'celebration', name: 'Lễ hội', icon: '🎉' },
  { id: 'seasonal', name: 'Mùa', icon: '🌸' },
  { id: 'style', name: 'Phong cách', icon: '✨' },
];

export const getTemplateById = (id) => {
  return TEMPLATES.find((t) => t.id === id) || TEMPLATES[0];
};