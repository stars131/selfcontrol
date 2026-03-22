import uiCopySource from "./record-panel-ui-copy.json";

import type { LocaleCode } from "./locale";

type MediaIssueCopy = typeof uiCopySource.mediaIssue.en;
type PanelCopy = typeof uiCopySource.panel.en;

export type { MediaIssueCopy, PanelCopy };

const UI_COPY = uiCopySource as {
  mediaIssue: Record<LocaleCode, MediaIssueCopy>;
  panel: Record<LocaleCode, PanelCopy>;
};

export function getRecordPanelUiBundle(locale: LocaleCode) {
  return {
    mediaIssueCopy: UI_COPY.mediaIssue[locale],
    panelCopy: UI_COPY.panel[locale],
  };
}
