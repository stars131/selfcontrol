"use client";
import type { RecentMediaIssueCardTagsProps } from "./recent-media-issue-card-tags.types";
import type { BuildRecentMediaIssueCardTagsPropsInput } from "./recent-media-issue-card-tags-props.types";
export function buildRecentMediaIssueCardTagsProps({ issue, locale, mediaIssueCopy }: BuildRecentMediaIssueCardTagsPropsInput): RecentMediaIssueCardTagsProps { return { issue, locale, mediaIssueCopy }; }
