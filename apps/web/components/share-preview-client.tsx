"use client";

import { useRouter } from "next/navigation";

import { useStoredLocale } from "../lib/locale";
import { getSharePreviewPageCopy } from "../lib/share-link-display";
import { SharePreviewContent } from "./share-preview-content";
import type { SharePreviewClientProps } from "./share-preview-client.types";
import { useSharePreviewController } from "./use-share-preview-controller";

export function SharePreviewClient({ tokenValue }: SharePreviewClientProps) {
  const router = useRouter();
  const { locale } = useStoredLocale();
  const copy = getSharePreviewPageCopy(locale);
  const controller = useSharePreviewController(router, tokenValue, copy.loadFailed, copy.joinFailed);

  return <SharePreviewContent copy={copy} locale={locale} {...controller} />;
}
