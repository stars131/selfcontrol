import type { LocaleCode } from "../lib/locale";

export type WorkspaceExportJobsCopy = {
  eyebrow: string;
  title: string;
  description: string;
  ownerOnly: string;
  refresh: string;
  queue: string;
  loading: string;
  queued: string;
  download: string;
  empty: string;
};

const COPY: Record<LocaleCode, WorkspaceExportJobsCopy> = {
  "zh-CN": {
    eyebrow: "寮傛瀵煎嚭",
    title: "瀵煎嚭浠诲姟",
    description: "涓哄ぇ宸ヤ綔鍖哄垱寤哄悗鍙板鍑轰换鍔°€傚畬鎴愬悗鍙笅杞?ZIP锛屼笉闇€瑕佷竴鐩寸瓑寰呰姹備繚鎸佽繛鎺ャ€?",
    ownerOnly: "鍙湁 owner 鍙互鍒涘缓瀵煎嚭浠诲姟銆?",
    refresh: "鍒锋柊浠诲姟",
    queue: "鍒涘缓瀵煎嚭浠诲姟",
    loading: "澶勭悊涓?..",
    queued: "浠诲姟宸插垱寤?",
    download: "涓嬭浇缁撴灉",
    empty: "褰撳墠娌℃湁瀵煎嚭浠诲姟銆?",
  },
  en: {
    eyebrow: "Async Export",
    title: "Export Jobs",
    description:
      "Create background export jobs for large workspaces. Download the ZIP after completion without keeping the request open.",
    ownerOnly: "Only workspace owners can create export jobs.",
    refresh: "Refresh jobs",
    queue: "Create export job",
    loading: "Processing...",
    queued: "Job created",
    download: "Download result",
    empty: "No export jobs yet.",
  },
  ja: {
    eyebrow: "闈炲悓鏈熴偍銈偣銉濄兗銉?",
    title: "銈ㄣ偗銈广儩銉笺儓銈搞儳銉?",
    description:
      "澶с亶銇儻銉笺偗銈广儦銉笺偣鍚戙亼銇儛銉冦偗銈般儵銈︺兂銉夈伄銈ㄣ偗銈广儩銉笺儓銈搞儳銉栥倰浣滄垚銇с亶銇俱仚銆傚畬浜嗗緦銇?ZIP 銈掑彇寰椼仹銇嶃伨銇欍€?",
    ownerOnly: "銈ㄣ偗銈广儩銉笺儓銈搞儳銉栥倰浣滄垚銇с亶銈嬨伄銇?owner 銇伩銇с仚銆?",
    refresh: "銈搞儳銉栨洿鏂?",
    queue: "銈ㄣ偗銈广儩銉笺儓銈搞儳銉栦綔鎴?",
    loading: "鍑︾悊涓?..",
    queued: "銈搞儳銉栥倰浣滄垚銇椼伨銇椼仧",
    download: "绲愭灉銈掑彇寰?",
    empty: "銈ㄣ偗銈广儩銉笺儓銈搞儳銉栥伅銇俱仩銇傘倞銇俱仜銈撱€?",
  },
};

export function getWorkspaceExportJobsCopy(locale: LocaleCode): WorkspaceExportJobsCopy {
  return COPY[locale];
}
