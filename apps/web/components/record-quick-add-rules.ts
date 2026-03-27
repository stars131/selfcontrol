import type { QuickAddRecordDraft } from "./record-quick-add-bar.helpers.types";

export type QuickAddTagRule = Pick<QuickAddRecordDraft, "is_avoid" | "type_code">;
export type QuickAddTimeTokenRule = "today" | "yesterday";

export const DEFAULT_QUICK_ADD_RULE: QuickAddTagRule = {
  type_code: "memo",
  is_avoid: false,
};
export const FOOD_QUICK_ADD_RULE: QuickAddTagRule = {
  type_code: "food",
  is_avoid: false,
};
export const SNACK_QUICK_ADD_RULE: QuickAddTagRule = {
  type_code: "snack",
  is_avoid: false,
};
export const AVOID_QUICK_ADD_RULE: QuickAddTagRule = {
  type_code: "bad_experience",
  is_avoid: true,
};

export const QUICK_ADD_TAG_RULES: Record<string, QuickAddTagRule> = {
  "#memo": DEFAULT_QUICK_ADD_RULE,
  "#note": DEFAULT_QUICK_ADD_RULE,
  "#备忘": DEFAULT_QUICK_ADD_RULE,
  "#food": FOOD_QUICK_ADD_RULE,
  "#meal": FOOD_QUICK_ADD_RULE,
  "#正餐": FOOD_QUICK_ADD_RULE,
  "#snack": SNACK_QUICK_ADD_RULE,
  "#零食": SNACK_QUICK_ADD_RULE,
  "#avoid": AVOID_QUICK_ADD_RULE,
  "#bad": AVOID_QUICK_ADD_RULE,
  "#warning": AVOID_QUICK_ADD_RULE,
  "#避雷": AVOID_QUICK_ADD_RULE,
  "#踩雷": AVOID_QUICK_ADD_RULE,
};

export const QUICK_ADD_TIME_TOKENS: Record<string, QuickAddTimeTokenRule> = {
  today: "today",
  "#today": "today",
  今天: "today",
  "#今天": "today",
  今日: "today",
  "#今日": "today",
  yesterday: "yesterday",
  "#yesterday": "yesterday",
  昨天: "yesterday",
  "#昨天": "yesterday",
  昨日: "yesterday",
  "#昨日": "yesterday",
};
