"use client";

import {
  buildCreateShareLinkInput,
  getChatPanelActionErrorMessage,
} from "./chat-panel-action-helpers";
import type { CreateChatPanelShareHandlersInput } from "./chat-panel-share-handlers.types";

export function createChatPanelShareHandlers({
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
}: CreateChatPanelShareHandlersInput) {
  return {
    async handleCreateShareLink() {
      setCreatingShare(true);
      setError("");
      try {
        await onCreateShareLink(
          buildCreateShareLinkInput({
            shareMaxUses,
            shareName,
            sharePermission,
          }),
        );
        setShareName("");
        setShareMaxUses("");
      } catch (caught) {
        setError(getChatPanelActionErrorMessage(caught, "Share creation failed"));
      } finally {
        setCreatingShare(false);
      }
    },
    async handleDisableShareLink(shareLinkId: string) {
      setDisablingShareId(shareLinkId);
      setError("");
      try {
        await onDisableShareLink(shareLinkId);
      } catch (caught) {
        setError(getChatPanelActionErrorMessage(caught, "Share update failed"));
      } finally {
        setDisablingShareId("");
      }
    },
  };
}
