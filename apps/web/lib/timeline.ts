import type { RecordItem, TimelineDay } from "./types";

function getTimelineDayKey(record: RecordItem): string {
  const rawValue = record.occurred_at || record.created_at || "";
  return rawValue.length >= 10 ? rawValue.slice(0, 10) : "unknown";
}

function getTimelineTimestamp(record: RecordItem): number {
  const rawValue = record.occurred_at || record.created_at;
  const parsed = rawValue ? new Date(rawValue).getTime() : 0;
  return Number.isNaN(parsed) ? 0 : parsed;
}

function getPlaceName(record: RecordItem): string | null {
  const rawLocation = record.extra_data?.location;
  const location = typeof rawLocation === "object" && rawLocation !== null
    ? (rawLocation as Record<string, unknown>)
    : null;

  const placeName = typeof location?.place_name === "string" ? location.place_name.trim() : "";
  if (placeName) {
    return placeName;
  }

  const address = typeof location?.address === "string" ? location.address.trim() : "";
  return address || null;
}

export function buildTimelineDays(records: RecordItem[]): TimelineDay[] {
  const grouped = new Map<string, RecordItem[]>();

  for (const record of records) {
    const dayKey = getTimelineDayKey(record);
    const existing = grouped.get(dayKey);
    if (existing) {
      existing.push(record);
      continue;
    }
    grouped.set(dayKey, [record]);
  }

  return [...grouped.entries()]
    .sort(([left], [right]) => right.localeCompare(left))
    .map(([date, items]) => {
      items.sort((left, right) => getTimelineTimestamp(right) - getTimelineTimestamp(left));

      const placeCounter = new Map<string, number>();
      for (const item of items) {
        const placeName = getPlaceName(item);
        if (!placeName) {
          continue;
        }
        placeCounter.set(placeName, (placeCounter.get(placeName) ?? 0) + 1);
      }

      const topPlaces = [...placeCounter.entries()]
        .sort((left, right) => right[1] - left[1] || left[0].localeCompare(right[0]))
        .slice(0, 3)
        .map(([name]) => name);

      return {
        date,
        count: items.length,
        avoid_count: items.filter((item) => item.is_avoid).length,
        top_places: topPlaces,
        items,
      };
    });
}
