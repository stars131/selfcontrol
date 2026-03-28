"use client";

import {
  buildChatPanelOperatorHandlerInput,
  buildChatPanelShareHandlerInput,
} from "./chat-panel-action-handler-inputs";
import { buildChatPanelActionsResult } from "./chat-panel-actions-result-builder";
import type { UseChatPanelActionsProps } from "./chat-panel-action-handler-inputs.types";
import { createChatPanelOperatorHandlers } from "./chat-panel-operator-handlers";
import { createChatPanelShareHandlers } from "./chat-panel-share-handlers";
import { useChatPanelActionDerivedData } from "./use-chat-panel-action-derived-data";
import { useChatPanelActionState } from "./use-chat-panel-action-state";

export function useChatPanelActions(input: UseChatPanelActionsProps) {
  const state = useChatPanelActionState();
  const derivedData = useChatPanelActionDerivedData({
    latestSharePath: input.latestSharePath,
    notifications: input.notifications,
  });
  const operatorHandlers = createChatPanelOperatorHandlers(
    buildChatPanelOperatorHandlerInput({ ...input, ...state }),
  );
  const shareHandlers = createChatPanelShareHandlers(
    buildChatPanelShareHandlerInput({ ...input, ...state }),
  );

  return buildChatPanelActionsResult({
    ...derivedData,
    ...state,
    operatorHandlers,
    shareHandlers,
  });
}
