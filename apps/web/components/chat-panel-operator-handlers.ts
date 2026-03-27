"use client";

import { createChatPanelAdminHandlers } from "./chat-panel-admin-handlers";
import { createChatPanelSendHandler } from "./chat-panel-send-handler";
import type { CreateChatPanelOperatorHandlersInput } from "./chat-panel-operator-handlers.types";

export function createChatPanelOperatorHandlers(
  input: CreateChatPanelOperatorHandlersInput,
) {
  const handleSend = createChatPanelSendHandler(input);
  const adminHandlers = createChatPanelAdminHandlers(input);

  return {
    handleSend,
    ...adminHandlers,
  };
}
