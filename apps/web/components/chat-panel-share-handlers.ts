"use client";

import { createChatPanelShareCreateHandler } from "./chat-panel-share-create-handler";
import { createChatPanelShareDisableHandler } from "./chat-panel-share-disable-handler";
import type { CreateChatPanelShareHandlersInput } from "./chat-panel-share-handlers.types";

export function createChatPanelShareHandlers(input: CreateChatPanelShareHandlersInput) {
  const handleCreateShareLink = createChatPanelShareCreateHandler(input);
  const handleDisableShareLink = createChatPanelShareDisableHandler(input);

  return {
    handleCreateShareLink,
    handleDisableShareLink,
  };
}
