"use client";

import { getStoredChatPanelActionCopy } from "./chat-panel-action-copy";
import { buildCreateShareLinkInput, getChatPanelActionErrorMessage } from "./chat-panel-action-helpers";
import type { CreateChatPanelShareHandlersInput } from "./chat-panel-share-handlers.types";

export function createChatPanelShareCreateHandler({
  onCreateShareLink,
  setCreatingShare,
  setError,
  setShareMaxUses,
  setShareName,
  shareMaxUses,
  shareName,
  sharePermission,
}: CreateChatPanelShareHandlersInput) {
  const copy = getStoredChatPanelActionCopy();

  return async function handleCreateShareLink() {
    setCreatingShare(true);
    setError("");
    try {
      await onCreateShareLink(buildCreateShareLinkInput({ shareMaxUses, shareName, sharePermission }));
      setShareName("");
      setShareMaxUses("");
    } catch (caught) {
      setError(getChatPanelActionErrorMessage(caught, copy.shareCreationFailed));
    } finally {
      setCreatingShare(false);
    }
  };
}
