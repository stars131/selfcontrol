"use client";

import { ChatAuditLogsCard } from "./chat-audit-logs-card";
import { ChatPanelComposer } from "./chat-panel-composer";
import { ChatConversationBar } from "./chat-conversation-bar";
import { ChatPanelManagementSection } from "./chat-panel-management-section";
import { ChatMessageThread } from "./chat-message-thread";
import { ChatNotificationsCard } from "./chat-notifications-card";
import type { ChatPanelProps } from "./chat-panel.types";

type ChatPanelContentProps = Pick<
  ChatPanelProps,
  | "activeConversationId"
  | "auditLogs"
  | "canManageSharing"
  | "canManageWorkspace"
  | "canWriteWorkspace"
  | "conversations"
  | "knowledgeStats"
  | "latestSharePath"
  | "messages"
  | "notifications"
  | "onCreateConversation"
  | "onCreateShareLink"
  | "onDisableShareLink"
  | "onMarkNotificationRead"
  | "onRefreshAuditLogs"
  | "onReindexKnowledge"
  | "onSaveProviderConfig"
  | "onSelectConversation"
  | "onSendMessage"
  | "onSyncNotifications"
  | "providerConfigs"
  | "shareLinks"
> &
  ReturnType<typeof import("./use-chat-panel-actions").useChatPanelActions>;

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
  );
}
