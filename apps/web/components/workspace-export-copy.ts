import type { LocaleCode } from "../lib/locale";

export type WorkspaceExportCopy = {
  eyebrow: string;
  title: string;
  description: string;
  ownerOnly: string;
  note: string;
  button: string;
  loading: string;
  success: string;
  failed: string;
};

const COPY: Record<LocaleCode, WorkspaceExportCopy> = {
  "zh-CN": {
    eyebrow: "瀵煎嚭",
    title: "宸ヤ綔鍖哄鍑?",
    description: "瀵煎嚭褰撳墠宸ヤ綔鍖虹殑 ZIP 蹇収锛屽寘鍚垚鍛樸€佽褰曘€佸獟浣撴竻鍗曞拰鍙敤鐨勬湰鍦伴檮浠舵枃浠躲€?",
    ownerOnly: "鍙湁 owner 鍙互鎵ц瀵煎嚭銆?",
    note: "瀵煎嚭鍖呬笉鍖呭惈 provider 瀵嗛挜銆佽闂护鐗屾垨鍒嗕韩浠ょ墝銆傚ぇ浣撻噺宸ヤ綔鍖哄悗缁細琛ュ紓姝ュ鍑恒€?",
    button: "涓嬭浇宸ヤ綔鍖?ZIP",
    loading: "瀵煎嚭涓?..",
    success: "瀵煎嚭宸插紑濮嬩笅杞姐€?",
    failed: "瀵煎嚭澶辫触",
  },
  en: {
    eyebrow: "Export",
    title: "Workspace Export",
    description:
      "Download a ZIP snapshot of the current workspace, including members, records, media manifest entries, and available local attachment files.",
    ownerOnly: "Only workspace owners can export.",
    note: "Provider secrets, access tokens, and share tokens are excluded. Large workspaces should move to async export in a later slice.",
    button: "Download workspace ZIP",
    loading: "Exporting...",
    success: "Export download started.",
    failed: "Export failed",
  },
  ja: {
    eyebrow: "銈ㄣ偗銈广儩銉笺儓",
    title: "銉兗銈偣銉氥兗銈规浉銇嶅嚭銇?",
    description:
      "鐝惧湪銇儻銉笺偗銈广儦銉笺偣銈?ZIP 銈广儕銉冦儣銈枫儳銉冦儓銇ㄣ仐銇︽浉銇嶅嚭銇椼伨銇欍€傘儭銉炽儛銉笺€佽閷层€併儭銉囥偅銈竴瑕с€佸埄鐢ㄥ彲鑳姐仾銉兗銈儷娣讳粯銈掑惈銇裤伨銇欍€?",
    ownerOnly: "銈ㄣ偗銈广儩銉笺儓銈掑疅琛屻仹銇嶃倠銇伅 owner 銇伩銇с仚銆?",
    note: "provider 銇瀵嗘儏鍫便€併偄銈偦銈广儓銉笺偗銉炽€佸叡鏈夈儓銉笺偗銉炽伅鍚伨銈屻伨銇涖倱銆傚ぇ瑕忔ā銉兗銈偣銉氥兗銈瑰悜銇戙伄闈炲悓鏈熸浉銇嶅嚭銇椼伅寰岀稓銇ц拷鍔犮仐銇俱仚銆?",
    button: "銉兗銈偣銉氥兗銈?ZIP 銈掑彇寰?",
    loading: "鏇稿亶鍑恒仐涓?..",
    success: "鏇稿亶鍑恒仐銇儉銈︺兂銉兗銉夈倰闁嬪銇椼伨銇椼仧銆?",
    failed: "鏇稿亶鍑恒仐銇け鏁椼仐銇俱仐銇?",
  },
};

export function getWorkspaceExportCopy(locale: LocaleCode): WorkspaceExportCopy {
  return COPY[locale];
}
