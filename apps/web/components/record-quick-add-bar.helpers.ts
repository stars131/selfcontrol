import type { QuickAddRecordDraft } from "./record-quick-add-bar.helpers.types";
import { parseQuickAddControlTokens } from "./record-quick-add-control-tokens";
import { buildQuickAddTitle } from "./record-quick-add-token-parsers";

export function buildQuickAddRecordDraft(
  rawContent: string,
  now = new Date(),
): QuickAddRecordDraft {
  const parsed = parseQuickAddControlTokens(rawContent, now);
  return {
    ...parsed,
    title: parsed.title ?? buildQuickAddTitle(parsed.content),
  };
}
