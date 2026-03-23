"use client";

import { ChatPanelContent } from "./chat-panel-content";
import { ChatPanelHeader } from "./chat-panel-header";
import type { ChatPanelProps } from "./chat-panel.types";
import { useChatPanelActions } from "./use-chat-panel-actions";

export function ChatPanel({
  workspaceId,
  workspaceRole,
  canWriteWorkspace,
  canManageWorkspace,
  canManageSharing,
  conversations,
  activeConversationId,
  messages,
  notifications,
  knowledgeStats,
  providerConfigs,
  shareLinks,
  latestSharePath,
  auditLogs,
  onSelectConversation,
  onCreateConversation,
  onMarkNotificationRead,
  onReindexKnowledge,
  onRefreshAuditLogs,
  onCreateShareLink,
  onDisableShareLink,
  onSaveProviderConfig,
  onSyncNotifications,
  onSendMessage,
}: ChatPanelProps) {
  const {
    draft,
    loading,
    syncing,
    reindexing,
    refreshingAudit,
    creatingShare,
    disablingShareId,
    shareName,
    sharePermission,
    shareMaxUses,
    error,
    unreadCount,
    latestShareUrl,
    setDraft,
    setShareName,
    setSharePermission,
    setShareMaxUses,
    handleSend,
    handleSyncNotifications,
    handleReindexKnowledge,
    handleRefreshAuditLogs,
    handleCreateShareLink,
    handleDisableShareLink,
  } = useChatPanelActions({
    latestSharePath,
    notifications,
    onCreateShareLink,
    onDisableShareLink,
    onRefreshAuditLogs,
    onReindexKnowledge,
    onSyncNotifications,
    onSendMessage,
  });

  return (
    <section className="panel">
      <ChatPanelHeader
        canManageWorkspace={canManageWorkspace}
        workspaceId={workspaceId}
        workspaceRole={workspaceRole}
      />
      <ChatPanelContent
        activeConversationId={activeConversationId}
        auditLogs={auditLogs}
        canManageSharing={canManageSharing}
        canManageWorkspace={canManageWorkspace}
        canWriteWorkspace={canWriteWorkspace}
        conversations={conversations}
        creatingShare={creatingShare}
        disablingShareId={disablingShareId}
        draft={draft}
        error={error}
        handleCreateShareLink={handleCreateShareLink}
        handleDisableShareLink={handleDisableShareLink}
        handleRefreshAuditLogs={handleRefreshAuditLogs}
        handleReindexKnowledge={handleReindexKnowledge}
        handleSend={handleSend}
        handleSyncNotifications={handleSyncNotifications}
        knowledgeStats={knowledgeStats}
        latestSharePath={latestSharePath}
        latestShareUrl={latestShareUrl}
        loading={loading}
        messages={messages}
        notifications={notifications}
        onCreateConversation={onCreateConversation}
        onCreateShareLink={onCreateShareLink}
        onDisableShareLink={onDisableShareLink}
        onMarkNotificationRead={onMarkNotificationRead}
        onRefreshAuditLogs={onRefreshAuditLogs}
        onReindexKnowledge={onReindexKnowledge}
        onSaveProviderConfig={onSaveProviderConfig}
        onSelectConversation={onSelectConversation}
        onSendMessage={onSendMessage}
        onSyncNotifications={onSyncNotifications}
        providerConfigs={providerConfigs}
        refreshingAudit={refreshingAudit}
        reindexing={reindexing}
        setDraft={setDraft}
        setShareMaxUses={setShareMaxUses}
        setShareName={setShareName}
        setSharePermission={setSharePermission}
        shareLinks={shareLinks}
        shareMaxUses={shareMaxUses}
        shareName={shareName}
        sharePermission={sharePermission}
        syncing={syncing}
        unreadCount={unreadCount}
      />
    </section>
  );
}
