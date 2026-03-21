import type { LocationHistoryEntry, LocationInfo, LocationReview } from "./types";

function readObject(value: unknown): Record<string, unknown> | null {
  return typeof value === "object" && value !== null ? (value as Record<string, unknown>) : null;
}

function readString(value: unknown): string {
  return typeof value === "string" ? value : "";
}

function readNumber(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }
  if (typeof value === "string") {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }
  return null;
}

export function readLocationInfo(extraData: Record<string, unknown> | null | undefined): LocationInfo {
  const location = readObject(extraData?.location);

  return {
    place_name: readString(location?.place_name),
    address: readString(location?.address),
    latitude: readNumber(location?.latitude),
    longitude: readNumber(location?.longitude),
    source: readString(location?.source) || "manual",
  };
}

export function readLocationReview(extraData: Record<string, unknown> | null | undefined): LocationReview | null {
  const review = readObject(extraData?.location_review);
  if (!review) {
    return null;
  }

  return {
    status: readString(review.status) || "pending",
    note: readString(review.note) || null,
    updated_at: readString(review.updated_at) || null,
    updated_by: readString(review.updated_by) || null,
    confirmed_at: readString(review.confirmed_at) || null,
  };
}

export function readLocationHistory(
  extraData: Record<string, unknown> | null | undefined,
): LocationHistoryEntry[] {
  const history = Array.isArray(extraData?.location_history) ? extraData.location_history : [];
  const entries: LocationHistoryEntry[] = [];

  for (const item of history) {
    const entry = readObject(item);
    if (!entry) {
      continue;
    }

    const changedAt = readString(entry.changed_at);
    const actionCode = readString(entry.action_code);
    if (!changedAt || !actionCode) {
      continue;
    }

    entries.push({
      changed_at: changedAt,
      changed_by: readString(entry.changed_by),
      action_code: actionCode,
      review_status: readString(entry.review_status) || null,
      review_note: readString(entry.review_note) || null,
      place_name: readString(entry.place_name) || null,
      address: readString(entry.address) || null,
      latitude: readNumber(entry.latitude),
      longitude: readNumber(entry.longitude),
      source: readString(entry.source) || null,
    });
  }

  return entries;
}
