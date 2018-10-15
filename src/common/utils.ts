const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function formatTimestamp(timestamp: number): string {
  const d = new Date(timestamp);
  const date = `${d.getDate()} ${monthNames[d.getMonth()]} ${d.getFullYear()}`;
  const time = d.toISOString().split('T')[1].substr(0, 8);
  return [date, time].join(' at ');
}
