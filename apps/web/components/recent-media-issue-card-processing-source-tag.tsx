"use client";
import type { RecentMediaIssueCardProcessingSourceTagProps } from "./recent-media-issue-card-processing-source-tag.types";
export function RecentMediaIssueCardProcessingSourceTag({ issue }: RecentMediaIssueCardProcessingSourceTagProps) { return issue.processing_source ? <span className="tag">{issue.processing_source}</span> : null; }
