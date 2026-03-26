import type {
  AuditLogItem,
  ChatMessage,
  Conversation,
  KnowledgeStats,
  NotificationItem,
  ShareLinkItem,
} from "../lib/types";

export type ChatPanelProps = {
  workspaceId: string;
  workspaceRole: "owner" | "editor" | "viewer";
  canWriteWorkspace: boolean;
  canManageWorkspace: boolean;
  canManageSharing: boolean;
  conversations: Conversation[];
  activeConversationId: string | null;
  messages: ChatMessage[];
  notifications: NotificationItem[];
  knowledgeStats: KnowledgeStats | null;
  shareLinks: ShareLinkItem[];
  latestSharePath: string;
  auditLogs: AuditLogItem[];
  onSelectConversation: (conversationId: string) => void;
  onCreateConversation: () => Promise<void>;
  onMarkNotificationRead: (notificationId: string) => Promise<void>;
  onReindexKnowledge: () => Promise<void>;
  onRefreshAuditLogs: () => Promise<void>;
  onCreateShareLink: (input: {
    name?: string;
    permission_code: string;
    max_uses?: number | null;
  }) => Promise<void>;
  onDisableShareLink: (shareLinkId: string) => Promise<void>;
  onSyncNotifications: () => Promise<void>;
  onSendMessage: (message: string) => Promise<void>;
};
