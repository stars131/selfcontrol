"use client";

import { ChatAuditLogsCard } from "./chat-audit-logs-card";
import { ChatPanelComposer } from "./chat-panel-composer";
import { ChatConversationBar } from "./chat-conversation-bar";
import { ChatPanelManagementSection } from "./chat-panel-management-section";
import { ChatMessageThread } from "./chat-message-thread";
import { ChatNotificationsCard } from "./chat-notifications-card";
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
      <div className="panel-body">
        <ChatConversationBar
          activeConversationId={activeConversationId}
          canWriteWorkspace={canWriteWorkspace}
          conversations={conversations}
          onCreateConversation={onCreateConversation}
          onSelectConversation={onSelectConversation}
          onSyncNotifications={handleSyncNotifications}
          syncing={syncing}
        />
        <ChatPanelManagementSection
          canManageSharing={canManageSharing}
          canManageWorkspace={canManageWorkspace}
          creatingShare={creatingShare}
          disablingShareId={disablingShareId}
          knowledgeStats={knowledgeStats}
          latestShareUrl={latestShareUrl}
          onCreateShareLink={handleCreateShareLink}
          onDisableShareLink={handleDisableShareLink}
          onReindexKnowledge={handleReindexKnowledge}
          onSaveProviderConfig={onSaveProviderConfig}
          providerConfigs={providerConfigs}
          reindexing={reindexing}
          setShareMaxUses={setShareMaxUses}
          setShareName={setShareName}
          setSharePermission={setSharePermission}
          shareLinks={shareLinks}
          shareMaxUses={shareMaxUses}
          shareName={shareName}
          sharePermission={sharePermission}
        />
        <ChatAuditLogsCard
          auditLogs={auditLogs}
          onRefreshAuditLogs={handleRefreshAuditLogs}
          refreshingAudit={refreshingAudit}
        />
        <ChatNotificationsCard
          notifications={notifications}
          onMarkNotificationRead={onMarkNotificationRead}
          unreadCount={unreadCount}
        />
        <ChatMessageThread messages={messages} />
        <ChatPanelComposer
          canWriteWorkspace={canWriteWorkspace}
          draft={draft}
          error={error}
          loading={loading}
          onSend={handleSend}
          setDraft={setDraft}
        />
      </div>
    </section>
  );
}
