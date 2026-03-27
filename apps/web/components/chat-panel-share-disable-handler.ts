"use client";

import { getStoredChatPanelActionCopy } from "./chat-panel-action-copy";
import { getChatPanelActionErrorMessage } from "./chat-panel-action-helpers";
import type { CreateChatPanelShareHandlersInput } from "./chat-panel-share-handlers.types";

export function createChatPanelShareDisableHandler({
  onDisableShareLink,
  setDisablingShareId,
  setError,
}: CreateChatPanelShareHandlersInput) {
  const copy = getStoredChatPanelActionCopy();

  return async function handleDisableShareLink(shareLinkId: string) {
    setDisablingShareId(shareLinkId);
    setError("");
    try {
      await onDisableShareLink(shareLinkId);
    } catch (caught) {
      setError(getChatPanelActionErrorMessage(caught, copy.shareUpdateFailed));
    } finally {
      setDisablingShareId("");
    }
  };
}
