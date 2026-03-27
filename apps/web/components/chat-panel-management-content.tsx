"use client";

import { ChatAuditLogsCard } from "./chat-audit-logs-card";
import { ChatNotificationsCard } from "./chat-notifications-card";
import { ChatPanelManagementSection } from "./chat-panel-management-section";
import {
  buildChatAuditLogsCardProps,
  buildChatNotificationsCardProps,
  buildChatPanelManagementSectionProps,
} from "./chat-panel-management-content-props";
import type { ChatPanelManagementContentProps } from "./chat-panel-content.types";

export function ChatPanelManagementContent(props: ChatPanelManagementContentProps) {
  return (
    <>
      <ChatPanelManagementSection {...buildChatPanelManagementSectionProps(props)} />
      <ChatAuditLogsCard {...buildChatAuditLogsCardProps(props)} />
      <ChatNotificationsCard {...buildChatNotificationsCardProps(props)} />
    </>
  );
}
