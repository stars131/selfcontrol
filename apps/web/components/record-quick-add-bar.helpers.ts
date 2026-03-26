import type { QuickAddRecordDraft } from "./record-quick-add-bar.helpers.types";
type QuickAddTagRule = Pick<QuickAddRecordDraft, "is_avoid" | "type_code">;
type QuickAddTimeTokenRule = "today" | "yesterday";
const DEFAULT_QUICK_ADD_RULE: QuickAddTagRule = { type_code: "memo", is_avoid: false };
const SNACK_QUICK_ADD_RULE: QuickAddTagRule = { type_code: "snack", is_avoid: false };
const AVOID_QUICK_ADD_RULE: QuickAddTagRule = { type_code: "bad_experience", is_avoid: true };
const QUICK_ADD_TAG_RULES: Record<string, QuickAddTagRule> = {
  "#memo": DEFAULT_QUICK_ADD_RULE,
  "#note": DEFAULT_QUICK_ADD_RULE,
  "#\u5907\u5fd8": DEFAULT_QUICK_ADD_RULE,
  "#snack": SNACK_QUICK_ADD_RULE,
  "#\u96f6\u98df": SNACK_QUICK_ADD_RULE,
  "#avoid": AVOID_QUICK_ADD_RULE,
  "#bad": AVOID_QUICK_ADD_RULE,
  "#warning": AVOID_QUICK_ADD_RULE,
  "#\u907f\u96f7": AVOID_QUICK_ADD_RULE,
  "#\u8e29\u96f7": AVOID_QUICK_ADD_RULE,
};
const QUICK_ADD_TIME_TOKENS: Record<string, QuickAddTimeTokenRule> = {
  today: "today",
  "#today": "today",
  "\u4eca\u5929": "today",
  "#\u4eca\u5929": "today",
  "\u4eca\u65e5": "today",
  "#\u4eca\u65e5": "today",
  yesterday: "yesterday",
  "#yesterday": "yesterday",
  "\u6628\u5929": "yesterday",
  "#\u6628\u5929": "yesterday",
  "\u6628\u65e5": "yesterday",
  "#\u6628\u65e5": "yesterday",
};
function buildQuickAddTitle(content: string) { return content.length > 48 ? `${content.slice(0, 45)}...` : content; }
function buildQuickAddOccurredAt(timeRule: QuickAddTimeTokenRule | null, now: Date) {
  if (!timeRule) return now.toISOString();
  const occurredAt = new Date(now);
  if (timeRule === "yesterday") occurredAt.setDate(occurredAt.getDate() - 1);
  return occurredAt.toISOString();
}
function parseQuickAddAbsoluteDateToken(token: string, now: Date) {
  const match = token.match(/^(\d{4})[-/.](\d{1,2})[-/.](\d{1,2})$/);
  if (!match) return null;
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const occurredAt = new Date(Date.UTC(year, month - 1, day, now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds()));
  return occurredAt.getUTCFullYear() === year && occurredAt.getUTCMonth() === month - 1 && occurredAt.getUTCDate() === day
    ? occurredAt.toISOString()
    : null;
}
function parseQuickAddTimeOfDayToken(token: string, baseOccurredAt: string) {
  const match = token.match(/^(\d{1,2}):(\d{2})(?::(\d{2}))?$/);
  if (!match) return null;
  const [hours, minutes, seconds] = [Number(match[1]), Number(match[2]), Number(match[3] ?? "0")];
  if (hours > 23 || minutes > 59 || seconds > 59) return null;
  const occurredAt = new Date(baseOccurredAt);
  occurredAt.setUTCHours(hours, minutes, seconds, 0);
  return occurredAt.toISOString();
}
function parseQuickAddRatingToken(token: string) {
  const match = token.match(/^([1-5])(?:\/5|star|\u661f|\u5206)$/i);
  return match ? Number(match[1]) : null;
}
function readQuickAddCoordinate(value: string, min: number, max: number) {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed >= min && parsed <= max ? parsed : null;
}
function parseQuickAddLocationSegment(content: string) {
  const match = content.match(/^@(.+?)(?:\(\s*(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)\s*\))?(?:\s*\|\s*([^:\uFF1A]+))?[:\uFF1A]\s*(.*)$/);
  if (!match) return { content, extra_data: undefined };
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
            ...(latitude !== null && longitude !== null ? { latitude, longitude } : {}),
            source: "quick_add",
          },
        },
      }
    : { content, extra_data: undefined };
}
function parseQuickAddExplicitTitle(content: string) {
  const match = content.match(/^(?:\[(.+?)\]|\u3010(.+?)\u3011)\s*(.*)$/);
  if (!match) return { content, title: null };
  const title = (match[1] ?? match[2] ?? "").trim();
  return title ? { content: match[3].trim() || title, title } : { content, title: null };
}
function parseQuickAddControlTokens(rawContent: string, now: Date) {
  const tokens = rawContent.trim().split(/\s+/);
  let nextRule = DEFAULT_QUICK_ADD_RULE;
  let nextOccurredAt = now.toISOString();
  let nextRating: number | null = null;
  let startIndex = 0;
  while (startIndex < tokens.length) {
    const token = tokens[startIndex].toLowerCase();
    const rule = QUICK_ADD_TAG_RULES[token];
    const timeRule = QUICK_ADD_TIME_TOKENS[token];
    const absoluteDate = parseQuickAddAbsoluteDateToken(tokens[startIndex], now);
    const timeOfDay = parseQuickAddTimeOfDayToken(tokens[startIndex], nextOccurredAt);
    const rating = parseQuickAddRatingToken(token);
    if (!rule && !timeRule && !absoluteDate && !timeOfDay && rating === null) break;
    if (rule) nextRule = rule;
    if (timeRule) nextOccurredAt = buildQuickAddOccurredAt(timeRule, now);
    if (absoluteDate) nextOccurredAt = absoluteDate;
    if (timeOfDay) nextOccurredAt = timeOfDay;
    if (rating !== null) nextRating = rating;
    startIndex += 1;
  }
  const parsedLocation = parseQuickAddLocationSegment(tokens.slice(startIndex).join(" ").trim() || rawContent.trim());
  const parsedTitle = parseQuickAddExplicitTitle(parsedLocation.content);
  return {
    ...nextRule,
    content: parsedTitle.content,
    occurred_at: nextOccurredAt,
    rating: nextRating,
    extra_data: parsedLocation.extra_data,
    title: parsedTitle.title,
  };
}
export function buildQuickAddRecordDraft(rawContent: string, now = new Date()): QuickAddRecordDraft { const parsed = parseQuickAddControlTokens(rawContent, now); return { ...parsed, title: parsed.title ?? buildQuickAddTitle(parsed.content) }; }
