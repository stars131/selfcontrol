"use client";

import { ChatPanelConversationContent } from "./chat-panel-conversation-content";
import { ChatPanelManagementContent } from "./chat-panel-management-content";
import type { ChatPanelContentProps } from "./chat-panel-content.types";

export function ChatPanelContent({
  activeConversationId,
  auditLogs,
  canManageSharing,
  canManageWorkspace,
  canWriteWorkspace,
  conversations,
  creatingShare,
  disablingShareId,
  draft,
  error,
  handleCreateShareLink,
  handleDisableShareLink,
  handleRefreshAuditLogs,
  handleReindexKnowledge,
  handleSend,
  handleSyncNotifications,
  knowledgeStats,
  latestShareUrl,
  loading,
  messages,
  notifications,
  onCreateConversation,
  onMarkNotificationRead,
  onSaveProviderConfig,
  onSelectConversation,
  providerConfigs,
  refreshingAudit,
  reindexing,
  setDraft,
  setShareMaxUses,
  setShareName,
  setSharePermission,
  shareLinks,
  shareMaxUses,
  shareName,
  sharePermission,
  syncing,
  unreadCount,
}: ChatPanelContentProps) {
  return (
    <div className="panel-body">
      <ChatPanelConversationContent
        activeConversationId={activeConversationId}
        canWriteWorkspace={canWriteWorkspace}
        conversations={conversations}
        draft={draft}
        error={error}
        handleSend={handleSend}
        handleSyncNotifications={handleSyncNotifications}
        loading={loading}
        messages={messages}
        onCreateConversation={onCreateConversation}
        onSelectConversation={onSelectConversation}
        setDraft={setDraft}
        syncing={syncing}
      />
      <ChatPanelManagementContent
        auditLogs={auditLogs}
        canManageSharing={canManageSharing}
        canManageWorkspace={canManageWorkspace}
        creatingShare={creatingShare}
        disablingShareId={disablingShareId}
        handleCreateShareLink={handleCreateShareLink}
        handleDisableShareLink={handleDisableShareLink}
        handleRefreshAuditLogs={handleRefreshAuditLogs}
        handleReindexKnowledge={handleReindexKnowledge}
        knowledgeStats={knowledgeStats}
        latestShareUrl={latestShareUrl}
        notifications={notifications}
        onMarkNotificationRead={onMarkNotificationRead}
        onSaveProviderConfig={onSaveProviderConfig}
        providerConfigs={providerConfigs}
        reindexing={reindexing}
        refreshingAudit={refreshingAudit}
        setShareMaxUses={setShareMaxUses}
        setShareName={setShareName}
        setSharePermission={setSharePermission}
        shareLinks={shareLinks}
        shareMaxUses={shareMaxUses}
        shareName={shareName}
        sharePermission={sharePermission}
        unreadCount={unreadCount}
      />
    </div>
  );
}
