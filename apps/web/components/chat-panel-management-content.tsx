"use client";

import { ChatAuditLogsCard } from "./chat-audit-logs-card";
import { ChatNotificationsCard } from "./chat-notifications-card";
import { ChatPanelManagementSection } from "./chat-panel-management-section";
import type { ChatPanelManagementContentProps } from "./chat-panel-content.types";

export function ChatPanelManagementContent({
  auditLogs,
  canManageSharing,
  canManageWorkspace,
  creatingShare,
  disablingShareId,
  handleCreateShareLink,
  handleDisableShareLink,
  handleRefreshAuditLogs,
  handleReindexKnowledge,
  knowledgeStats,
  latestShareUrl,
  notifications,
  onMarkNotificationRead,
  refreshingAudit,
  reindexing,
  setShareMaxUses,
  setShareName,
  setSharePermission,
  shareLinks,
  shareMaxUses,
  shareName,
  sharePermission,
  unreadCount,
}: ChatPanelManagementContentProps) {
  return (
    <>
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
    </>
  );
}
