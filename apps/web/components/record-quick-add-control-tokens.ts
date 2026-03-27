import type { QuickAddRecordDraft } from "./record-quick-add-bar.helpers.types";
import {
  QUICK_ADD_TAG_RULES,
  QUICK_ADD_TIME_TOKENS,
  DEFAULT_QUICK_ADD_RULE,
} from "./record-quick-add-rules";
import {
  buildQuickAddOccurredAt,
  parseQuickAddAbsoluteDateToken,
  parseQuickAddExplicitTitle,
  parseQuickAddLocationSegment,
  parseQuickAddRatingToken,
  parseQuickAddTimeOfDayToken,
} from "./record-quick-add-token-parsers";

type ParsedQuickAddControlResult = Omit<QuickAddRecordDraft, "title"> & {
  title: string | null;
};

export function parseQuickAddControlTokens(
  rawContent: string,
  now: Date,
): ParsedQuickAddControlResult {
  const tokens = rawContent.trim().split(/\s+/);
  let nextRule = DEFAULT_QUICK_ADD_RULE;
  let nextOccurredAt = now.toISOString();
  let nextRating: number | null = null;
  let startIndex = 0;

  while (startIndex < tokens.length) {
    const token = tokens[startIndex];
    const normalizedToken = token.toLowerCase();
    const rule = QUICK_ADD_TAG_RULES[normalizedToken];
    const timeRule = QUICK_ADD_TIME_TOKENS[normalizedToken];
    const absoluteDate = parseQuickAddAbsoluteDateToken(token, now);
    const timeOfDay = parseQuickAddTimeOfDayToken(token, nextOccurredAt);
    const rating = parseQuickAddRatingToken(normalizedToken);
    if (!rule && !timeRule && !absoluteDate && !timeOfDay && rating === null) {
      break;
    }

    if (rule) {
      nextRule = rule;
    }
    if (timeRule) {
      nextOccurredAt = buildQuickAddOccurredAt(timeRule, now);
    }
    if (absoluteDate) {
      nextOccurredAt = absoluteDate;
    }
    if (timeOfDay) {
      nextOccurredAt = timeOfDay;
    }
    if (rating !== null) {
      nextRating = rating;
    }
    startIndex += 1;
  }

  const parsedLocation = parseQuickAddLocationSegment(
    tokens.slice(startIndex).join(" ").trim() || rawContent.trim(),
  );
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
