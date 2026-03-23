"use client";

import { useEffect } from "react";

import { buildProviderDraftMap } from "./provider-settings-draft-helpers";
import type {
  UseProviderSettingsControllerProps,
  UseProviderSettingsControllerState,
} from "./provider-settings-controller.types";

export function useProviderSettingsDraftSync({
  providerConfigs,
  setProviderDrafts,
}: Pick<UseProviderSettingsControllerProps, "providerConfigs"> &
  Pick<UseProviderSettingsControllerState, "setProviderDrafts">) {
  useEffect(() => {
    setProviderDrafts(buildProviderDraftMap(providerConfigs));
  }, [providerConfigs, setProviderDrafts]);
}
