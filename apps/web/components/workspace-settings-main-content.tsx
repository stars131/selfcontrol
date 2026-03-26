"use client";
import { WorkspaceSettingsErrorNotice } from "./workspace-settings-error-notice";
import { WorkspaceSettingsManagedSections } from "./workspace-settings-managed-sections";
import { WorkspaceSettingsOverviewCard } from "./workspace-settings-overview-card";
import { WorkspaceSettingsProviderSection } from "./workspace-settings-provider-section";
import type { WorkspaceSettingsMainContentProps } from "./workspace-settings-main-content.types";

export function WorkspaceSettingsMainContent({ copy, error, knowledgeStats, managedSectionsProps, providerSectionProps }: WorkspaceSettingsMainContentProps) {
  return (
    <div className="panel-body">
      <WorkspaceSettingsErrorNotice error={error} />
      <div className="two-column-grid">
        <WorkspaceSettingsOverviewCard copy={copy} knowledgeStats={knowledgeStats} />
        <WorkspaceSettingsProviderSection {...providerSectionProps} />
      </div>
      <WorkspaceSettingsManagedSections {...managedSectionsProps} />
    </div>
  );
}
