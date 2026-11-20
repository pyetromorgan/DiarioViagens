export const colors = {
  primary: '#0B3C49',
  bg: '#F7F4EE',
  card: '#FFFFFF',
  text: '#1D2B30',
  muted: '#6B7A80',
  border: '#E2DDD3',
  danger: '#B3261E',
  quero: '#E0A030',
  visitado: '#2E8B57',
};

export const STATUS = {
  QUERO: 'Quero visitar',
  VISITADO: 'Visitado',
};

export const statusColor = {
  [STATUS.QUERO]: colors.quero,
  [STATUS.VISITADO]: colors.visitado,
};

// Paleta usada nos gráficos (cores diferentes para cada fatia).
export const chartPalette = [
  '#0B3C49', '#E0A030', '#2E8B57', '#7B4B94',
  '#C8553D', '#3A86A8', '#8D9B3A', '#D17FA0',
];
