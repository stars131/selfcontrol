"use client";

import {
  buildCreateShareLinkInput,
  getChatPanelActionErrorMessage,
} from "./chat-panel-action-helpers";

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
}: {
  onCreateShareLink: (input: {
    name?: string;
    permission_code: string;
    max_uses?: number | null;
  }) => Promise<void>;
  onDisableShareLink: (shareLinkId: string) => Promise<void>;
  setCreatingShare: (value: boolean) => void;
  setDisablingShareId: (value: string) => void;
  setError: (value: string) => void;
  setShareMaxUses: (value: string) => void;
  setShareName: (value: string) => void;
  shareMaxUses: string;
  shareName: string;
  sharePermission: string;
}) {
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
