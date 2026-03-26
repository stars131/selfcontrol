"use client";

import { ChatKnowledgeCard } from "./chat-knowledge-card";
import { ChatShareLinksCard } from "./chat-share-links-card";
import type { ChatPanelManagementSectionProps } from "./chat-panel-management-section.types";

export function ChatPanelManagementSection({
  canManageSharing,
  canManageWorkspace,
  creatingShare,
  disablingShareId,
  knowledgeStats,
  latestShareUrl,
  onCreateShareLink,
  onDisableShareLink,
  onReindexKnowledge,
  reindexing,
  setShareMaxUses,
  setShareName,
  setSharePermission,
  shareLinks,
  shareMaxUses,
  shareName,
  sharePermission,
}: ChatPanelManagementSectionProps) {
  if (!canManageWorkspace) {
    return null;
  }

  return (
    <>
      <ChatKnowledgeCard
        canManageWorkspace={canManageWorkspace}
        knowledgeStats={knowledgeStats}
        onReindexKnowledge={onReindexKnowledge}
        reindexing={reindexing}
      />
      {canManageSharing ? (
        <ChatShareLinksCard
          creatingShare={creatingShare}
          disablingShareId={disablingShareId}
          latestShareUrl={latestShareUrl}
          onCreateShareLink={onCreateShareLink}
          onDisableShareLink={onDisableShareLink}
          setShareMaxUses={setShareMaxUses}
          setShareName={setShareName}
          setSharePermission={setSharePermission}
          shareLinks={shareLinks}
          shareMaxUses={shareMaxUses}
          shareName={shareName}
          sharePermission={sharePermission}
        />
      ) : null}
    </>
  );
}
