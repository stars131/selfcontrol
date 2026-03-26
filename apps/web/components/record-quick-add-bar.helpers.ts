import type { QuickAddRecordDraft } from "./record-quick-add-bar.helpers.types";
type QuickAddTagRule = Pick<QuickAddRecordDraft, "is_avoid" | "type_code">;
const DEFAULT_QUICK_ADD_RULE: QuickAddTagRule = {
  type_code: "memo",
  is_avoid: false,
};

const SNACK_QUICK_ADD_RULE: QuickAddTagRule = {
  type_code: "snack",
  is_avoid: false,
};
const AVOID_QUICK_ADD_RULE: QuickAddTagRule = {
  type_code: "bad_experience",
  is_avoid: true,
};

const QUICK_ADD_TAG_RULES: Record<string, QuickAddTagRule> = {
  "#memo": DEFAULT_QUICK_ADD_RULE,
  "#note": DEFAULT_QUICK_ADD_RULE,
  "#备忘": DEFAULT_QUICK_ADD_RULE,
  "#snack": SNACK_QUICK_ADD_RULE,
  "#零食": SNACK_QUICK_ADD_RULE,
  "#avoid": AVOID_QUICK_ADD_RULE,
  "#bad": AVOID_QUICK_ADD_RULE,
  "#warning": AVOID_QUICK_ADD_RULE,
  "#避雷": AVOID_QUICK_ADD_RULE,
  "#踩雷": AVOID_QUICK_ADD_RULE,
};

function buildQuickAddTitle(content: string) {
  return content.length > 48 ? `${content.slice(0, 45)}...` : content;
}

function parseQuickAddTags(rawContent: string) {
  const tokens = rawContent.trim().split(/\s+/);
  let nextRule = DEFAULT_QUICK_ADD_RULE;
  let startIndex = 0;

  while (startIndex < tokens.length) {
    const rule = QUICK_ADD_TAG_RULES[tokens[startIndex].toLowerCase()];
    if (!rule) break;
    nextRule = rule;
    startIndex += 1;
  }

  const normalizedContent = tokens.slice(startIndex).join(" ").trim();
  return {
    ...nextRule,
    content: normalizedContent || rawContent.trim(),
  };
}

export function buildQuickAddRecordDraft(rawContent: string): QuickAddRecordDraft {
  const parsed = parseQuickAddTags(rawContent);
  return {
    ...parsed,
    title: buildQuickAddTitle(parsed.content),
  };
}
