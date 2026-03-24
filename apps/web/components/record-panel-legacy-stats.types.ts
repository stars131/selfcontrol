"use client";
export type RecordPanelLegacyStatsHeaderProps = { workspaceId: string; onResetFilter: () => Promise<void> };
export type RecordPanelLegacyStatsGridProps = { avoidCount: number; foodCount: number; recordCount: number };
export type RecordPanelLegacyStatsProps = RecordPanelLegacyStatsHeaderProps & RecordPanelLegacyStatsGridProps;
