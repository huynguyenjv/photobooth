export const FILTERS = [
  { id: 'none', name: 'Gốc', cssFilter: 'none' },
  { id: 'beauty', name: 'Làm đẹp', cssFilter: 'brightness(105%) contrast(95%) saturate(105%)', isBeauty: true, blur: 0.5 },
  { id: 'beauty-soft', name: 'Da mịn', cssFilter: 'brightness(108%) contrast(92%) saturate(110%)', isBeauty: true, blur: 1 },
  { id: 'beauty-glow', name: 'Sáng da', cssFilter: 'brightness(112%) contrast(90%) saturate(115%)', isBeauty: true, blur: 0.8 },
  { id: 'grayscale', name: 'Đen trắng', cssFilter: 'grayscale(100%)' },
  { id: 'sepia', name: 'Sepia', cssFilter: 'sepia(100%)' },
  { id: 'vintage', name: 'Vintage', cssFilter: 'sepia(50%) contrast(90%) brightness(90%)' },
  { id: 'contrast', name: 'Tương phản', cssFilter: 'contrast(150%)' },
  { id: 'warm', name: 'Ấm', cssFilter: 'sepia(30%) saturate(120%)' },
  { id: 'cool', name: 'Lạnh', cssFilter: 'saturate(80%) hue-rotate(20deg)' },
  { id: 'pink', name: 'Hồng', cssFilter: 'brightness(105%) saturate(130%) hue-rotate(-10deg)' },
  { id: 'vivid', name: 'Rực rỡ', cssFilter: 'saturate(150%) contrast(110%)' },
  { id: 'fade', name: 'Nhạt', cssFilter: 'contrast(90%) brightness(110%) saturate(80%)' },
];

export const ASPECT_RATIOS = [
  { id: '4:3', name: '4:3', value: 4 / 3 },
  { id: '1:1', name: '1:1', value: 1 },
  { id: '16:9', name: '16:9', value: 16 / 9 },
];

export const LAYOUTS = [
  { id: '2x2', name: 'Lưới 2x2', cols: 2, rows: 2, count: 4 },
  { id: '1x4', name: 'Dọc 1x4', cols: 1, rows: 4, count: 4 },
  { id: '4x1', name: 'Ngang 4x1', cols: 4, rows: 1, count: 4 },
  { id: '1x3', name: 'Dọc 1x3', cols: 1, rows: 3, count: 3 },
];

export const getCssFilter = (filterId) => {
  const filter = FILTERS.find((f) => f.id === filterId);
  return filter ? filter.cssFilter : 'none';
};
