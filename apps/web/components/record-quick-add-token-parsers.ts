import type { QuickAddTimeTokenRule } from "./record-quick-add-rules";

export function buildQuickAddTitle(content: string) {
  return content.length > 48 ? `${content.slice(0, 45)}...` : content;
}

export function buildQuickAddOccurredAt(
  timeRule: QuickAddTimeTokenRule | null,
  now: Date,
) {
  if (!timeRule) {
    return now.toISOString();
  }

  const occurredAt = new Date(now);
  if (timeRule === "yesterday") {
    occurredAt.setDate(occurredAt.getDate() - 1);
  }
  return occurredAt.toISOString();
}

export function parseQuickAddAbsoluteDateToken(token: string, now: Date) {
  const match = token.match(/^(\d{4})[-/.](\d{1,2})[-/.](\d{1,2})$/);
  if (!match) {
    return null;
  }

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const occurredAt = new Date(
    Date.UTC(
      year,
      month - 1,
      day,
      now.getUTCHours(),
      now.getUTCMinutes(),
      now.getUTCSeconds(),
      now.getUTCMilliseconds(),
    ),
  );

  return occurredAt.getUTCFullYear() === year &&
    occurredAt.getUTCMonth() === month - 1 &&
    occurredAt.getUTCDate() === day
    ? occurredAt.toISOString()
    : null;
}

export function parseQuickAddTimeOfDayToken(token: string, baseOccurredAt: string) {
  const match = token.match(/^(\d{1,2}):(\d{2})(?::(\d{2}))?$/);
  if (!match) {
    return null;
  }

  const hours = Number(match[1]);
  const minutes = Number(match[2]);
  const seconds = Number(match[3] ?? "0");
  if (hours > 23 || minutes > 59 || seconds > 59) {
    return null;
  }

  const occurredAt = new Date(baseOccurredAt);
  occurredAt.setUTCHours(hours, minutes, seconds, 0);
  return occurredAt.toISOString();
}

export function parseQuickAddRatingToken(token: string) {
  const match = token.match(/^([1-5])(?:\/5|star|星|分)$/i);
  return match ? Number(match[1]) : null;
}

function readQuickAddCoordinate(value: string, min: number, max: number) {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed >= min && parsed <= max ? parsed : null;
}

export function parseQuickAddLocationSegment(content: string) {
  const match = content.match(
    /^@(.+?)(?:\(\s*(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)\s*\))?(?:\s*\|\s*([^:：]+))?[:：]\s*(.*)$/,
  );
  if (!match) {
    return { content, extra_data: undefined };
  }

  const placeName = match[1].trim();
  const latitude = match[2] ? readQuickAddCoordinate(match[2], -90, 90) : null;
  const longitude = match[3] ? readQuickAddCoordinate(match[3], -180, 180) : null;
  const address = match[4]?.trim();

  return placeName
    ? {
        content: match[5].trim() || content,
        extra_data: {
          location: {
            place_name: placeName,
            ...(address ? { address } : {}),
            ...(latitude !== null && longitude !== null
              ? { latitude, longitude }
              : {}),
            source: "quick_add",
          },
        },
      }
    : { content, extra_data: undefined };
}

export function parseQuickAddExplicitTitle(content: string) {
  const match = content.match(/^(?:\[(.+?)\]|【(.+?)】)\s*(.*)$/);
  if (!match) {
    return { content, title: null };
  }

  const title = (match[1] ?? match[2] ?? "").trim();
  return title
    ? { content: match[3].trim() || title, title }
    : { content, title: null };
}
