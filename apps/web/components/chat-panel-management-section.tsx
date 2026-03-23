"use client";

import { useStoredLocale } from "../lib/locale";
import { ChatKnowledgeCard } from "./chat-knowledge-card";
import { ChatShareLinksCard } from "./chat-share-links-card";
import { ProviderSettingsPanel } from "./provider-settings-panel";
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
  onSaveProviderConfig,
  providerConfigs,
  reindexing,
  setShareMaxUses,
  setShareName,
  setSharePermission,
  shareLinks,
  shareMaxUses,
  shareName,
  sharePermission,
}: ChatPanelManagementSectionProps) {
  const { locale } = useStoredLocale();

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
      <div style={{ marginBottom: 16 }}>
        <ProviderSettingsPanel
          locale={locale}
          onSaveProviderConfig={onSaveProviderConfig}
          providerConfigs={providerConfigs}
        />
      </div>
    </>
  );
}
