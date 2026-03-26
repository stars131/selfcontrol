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

function parseQuickAddRatingToken(token: string) {
  const match = token.match(/^([1-5])(?:\/5|star|\u661f|\u5206)$/i);
  return match ? Number(match[1]) : null;
}

function parseQuickAddControlTokens(rawContent: string, now: Date) {
  const tokens = rawContent.trim().split(/\s+/);
  let nextRule = DEFAULT_QUICK_ADD_RULE;
  let nextTimeRule: QuickAddTimeTokenRule | null = null;
  let nextRating: number | null = null;
  let startIndex = 0;

  while (startIndex < tokens.length) {
    const token = tokens[startIndex].toLowerCase();
    const rule = QUICK_ADD_TAG_RULES[token];
    const timeRule = QUICK_ADD_TIME_TOKENS[token];
    const rating = parseQuickAddRatingToken(token);
    if (!rule && !timeRule && rating === null) break;
    if (rule) nextRule = rule;
    if (timeRule) nextTimeRule = timeRule;
    if (rating !== null) nextRating = rating;
    startIndex += 1;
  }

  const normalizedContent = tokens.slice(startIndex).join(" ").trim();
  return {
    ...nextRule,
    content: normalizedContent || rawContent.trim(),
    occurred_at: buildQuickAddOccurredAt(nextTimeRule, now),
    rating: nextRating,
  };
}

export function buildQuickAddRecordDraft(rawContent: string, now = new Date()): QuickAddRecordDraft {
  const parsed = parseQuickAddControlTokens(rawContent, now);
  return { ...parsed, title: buildQuickAddTitle(parsed.content) };
}
