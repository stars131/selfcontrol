"use client";
import type { BuildChatPanelShareHandlerInput } from "./chat-panel-action-handler-inputs.types";
export function buildChatPanelShareHandlerInput({ onCreateShareLink, onDisableShareLink, setCreatingShare, setDisablingShareId, setError, setShareMaxUses, setShareName, shareMaxUses, shareName, sharePermission }: BuildChatPanelShareHandlerInput) {
  return {
    onCreateShareLink,
    onDisableShareLink,
    setCreatingShare,
    setDisablingShareId,
    setError,
    setShareMaxUses,
    setShareName,
    shareMaxUses,
    shareName,
    sharePermission,
  };
}
