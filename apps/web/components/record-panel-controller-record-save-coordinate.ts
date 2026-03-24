export function parseRecordPanelCoordinate(value: string) {
  const trimmedValue = value.trim();
  if (!trimmedValue) {
    return null;
  }
  const coordinate = Number(trimmedValue);
  return Number.isNaN(coordinate) ? Number.NaN : coordinate;
}
