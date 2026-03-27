"use client";

import { getStoredChatPanelActionCopy } from "./chat-panel-action-copy";
import { getChatPanelActionErrorMessage } from "./chat-panel-action-helpers";
import type { CreateChatPanelOperatorHandlersInput } from "./chat-panel-operator-handlers.types";

export function createChatPanelSendHandler({
  draft,
  onSendMessage,
  setDraft,
  setError,
  setLoading,
}: CreateChatPanelOperatorHandlersInput) {
  const copy = getStoredChatPanelActionCopy();

  return async function handleSend() {
    const value = draft.trim();
    if (!value) {
      return;
    }

    setLoading(true);
    setError("");
    setDraft("");

    try {
      await onSendMessage(value);
    } catch (caught) {
      setError(getChatPanelActionErrorMessage(caught, copy.requestFailed));
    } finally {
      setLoading(false);
    }
  };
}
