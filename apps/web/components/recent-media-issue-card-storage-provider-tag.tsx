"use client";
import { getStorageProviderLabel } from "../lib/storage-provider-display";
import type { RecentMediaIssueCardStorageProviderTagProps } from "./recent-media-issue-card-storage-provider-tag.types";
export function RecentMediaIssueCardStorageProviderTag({ issue, locale }: RecentMediaIssueCardStorageProviderTagProps) { return <span className="tag">{getStorageProviderLabel(locale, issue.storage_provider)}</span>; }
