import type { PanelCopy } from "./record-panel-ui";

type LocationSourceCopy = Pick<
  PanelCopy,
  | "locationSourceManual"
  | "locationSourceMap"
  | "locationSourceSearch"
  | "locationSourceQuickAdd"
  | "locationSourceUnknown"
>;

export function getLocationSourceLabel(source: string | null | undefined, copy: LocationSourceCopy): string {
  const normalizedSource = source?.trim().toLowerCase() ?? "";

  switch (normalizedSource) {
    case "":
    case "manual":
      return copy.locationSourceManual;
    case "map":
      return copy.locationSourceMap;
    case "search":
      return copy.locationSourceSearch;
    case "quick_add":
      return copy.locationSourceQuickAdd;
    default:
      return copy.locationSourceUnknown;
  }
}
