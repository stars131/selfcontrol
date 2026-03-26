"use client";
import { WorkspaceMediaRetentionActions } from "./workspace-media-retention-actions";
import { WorkspaceMediaRetentionHeader } from "./workspace-media-retention-header";
import { WorkspaceMediaRetentionLists } from "./workspace-media-retention-lists";
import { WorkspaceMediaRetentionNotices } from "./workspace-media-retention-notices";
import { WorkspaceMediaRetentionSummary } from "./workspace-media-retention-summary";
import type { WorkspaceMediaRetentionContentProps } from "./workspace-media-retention-content.types";

export function WorkspaceMediaRetentionContent({ actionProps, headerProps, listsProps, noticesProps, summaryProps }: WorkspaceMediaRetentionContentProps) {
  return (
    <><WorkspaceMediaRetentionHeader {...headerProps} /><WorkspaceMediaRetentionNotices {...noticesProps} /><WorkspaceMediaRetentionSummary {...summaryProps} /><WorkspaceMediaRetentionActions {...actionProps} /><WorkspaceMediaRetentionLists {...listsProps} /></>
  );
}
