"use client";

import type { BuildChatPanelShareHandlerInput } from "./chat-panel-action-handler-inputs.types";

export function buildChatPanelShareHandlerInput({
  props,
  state,
}: BuildChatPanelShareHandlerInput) {
  return {
    onCreateShareLink: props.onCreateShareLink,
    onDisableShareLink: props.onDisableShareLink,
    setCreatingShare: state.setCreatingShare,
    setDisablingShareId: state.setDisablingShareId,
    setError: state.setError,
    setShareMaxUses: state.setShareMaxUses,
    setShareName: state.setShareName,
    shareMaxUses: state.shareMaxUses,
    shareName: state.shareName,
    sharePermission: state.sharePermission,
  };
}
