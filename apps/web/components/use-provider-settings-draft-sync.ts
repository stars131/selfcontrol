"use client";

import { useEffect } from "react";

import { buildProviderDraftMap } from "./provider-settings-draft-helpers";
import type { UseProviderSettingsDraftSyncInput } from "./use-provider-settings-draft-sync.types";

export function useProviderSettingsDraftSync({
  providerConfigs,
  setProviderDrafts,
}: UseProviderSettingsDraftSyncInput) {
  useEffect(() => {
    setProviderDrafts(buildProviderDraftMap(providerConfigs));
  }, [providerConfigs, setProviderDrafts]);
}
