import type { LocaleCode } from "../lib/locale";

import { PROVIDER_SETTINGS_COPY } from "./provider-settings-copy.payload";
import type { ProviderSettingsCopy } from "./provider-settings-copy.types";

export type { ProviderSettingsCopy } from "./provider-settings-copy.types";

export function getProviderSettingsCopy(locale: LocaleCode): ProviderSettingsCopy {
  return PROVIDER_SETTINGS_COPY[locale];
}
