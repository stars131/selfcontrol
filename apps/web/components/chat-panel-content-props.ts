"use client";

import type { ChatPanelContentProps } from "./chat-panel-content.types";
import { buildChatPanelContentActionProps } from "./chat-panel-content-action-props";
import { buildChatPanelContentDataProps } from "./chat-panel-content-data-props";
import type { BuildChatPanelContentPropsInput } from "./chat-panel-content-props.types";

export function buildChatPanelContentProps({
  actions,
  props,
}: BuildChatPanelContentPropsInput): ChatPanelContentProps {
  const input = { actions, props };
  return {
    ...buildChatPanelContentDataProps(input),
    ...buildChatPanelContentActionProps(input),
  };
}
