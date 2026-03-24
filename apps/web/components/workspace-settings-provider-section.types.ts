import type { LocaleCode } from "../lib/locale";
import type { MediaStorageProviderHealth, ProviderFeatureConfig } from "../lib/types";
import type { UseWorkspaceSettingsControllerState } from "./workspace-settings-controller.types";
import type { ProviderSettingsPanelProps } from "./provider-settings-panel.types";

export type WorkspaceSettingsProviderSectionProps = {
  highlightedAnchor: string | null;
  locale: LocaleCode;
  managedRole: "owner" | "editor" | null;
  mediaStorageHealth: MediaStorageProviderHealth | null;
  onRefreshMediaStorageHealth: (() => Promise<void>) | null;
  onSaveProviderConfig: ProviderSettingsPanelProps["onSaveProviderConfig"];
  providerConfigs: ProviderFeatureConfig[];
  refreshingMediaStorageHealth: boolean;
  providerTitle: string;
  viewerNotice: string;
};

export type WorkspaceSettingsProviderSectionBuilderInput = {
  copy: {
    providerTitle: string;
    viewerNotice: string;
  };
  highlightedAnchor: string | null;
  locale: LocaleCode;
  managedRole: "owner" | "editor" | null;
  mediaStorageHealth: MediaStorageProviderHealth | null;
  providerConfigs: ProviderFeatureConfig[];
  refreshingMediaStorageHealth: boolean;
  refreshMediaStorageHealthState: (activeToken: string) => Promise<void>;
  token: UseWorkspaceSettingsControllerState["token"];
  onSaveProviderConfig: ProviderSettingsPanelProps["onSaveProviderConfig"];
};
