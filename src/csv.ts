export function parseCsv(text: string, ignoreFirstRow = true): number[][] {
  // parse CSV lines
  const data: number[][] = [];
  const lines = text.split('\n');
  let i = 0;
  for (const line of lines) {
    if (ignoreFirstRow && 0 === i++) continue; // ignore first row: labels
    if (line.trim() === '') continue; // ignore empty lines
    const point = line.trim().split(',').map(n => Number.parseFloat(n.trim()));
    data.push(point);
  }
  return data;
}
