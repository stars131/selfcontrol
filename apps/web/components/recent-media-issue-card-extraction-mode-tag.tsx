"use client";
import type { RecentMediaIssueCardExtractionModeTagProps } from "./recent-media-issue-card-extraction-mode-tag.types";
export function RecentMediaIssueCardExtractionModeTag({ issue }: RecentMediaIssueCardExtractionModeTagProps) { return issue.extraction_mode ? <span className="tag">{issue.extraction_mode}</span> : null; }
