import fs from "node:fs";
import path from "node:path";

const copyPath = path.resolve(process.cwd(), "lib", "record-panel-detail-copy.json");
const copyByLocale = JSON.parse(fs.readFileSync(copyPath, "utf8"));
const locales = ["en", "zh-CN", "ja"];
const baselineKeys = Object.keys(copyByLocale.en).sort();

for (const locale of locales) {
  if (!copyByLocale[locale]) {
    throw new Error(`Missing locale section: ${locale}`);
  }

  const keys = Object.keys(copyByLocale[locale]).sort();
  if (keys.join("|") !== baselineKeys.join("|")) {
    throw new Error(`Locale keys mismatch for ${locale}`);
  }

  for (const key of baselineKeys) {
    const value = copyByLocale[locale][key];
    if (typeof value !== "string" || value.trim() === "") {
      throw new Error(`Empty copy value for ${locale}.${key}`);
    }
  }
}

const criticalKeys = [
  "unknownTime",
  "contentRequiredError",
  "reminderSectionTitle",
  "timelineView",
  "noRecords"
];

for (const key of criticalKeys) {
  for (const locale of locales) {
    if (!(key in copyByLocale[locale])) {
      throw new Error(`Missing critical key ${locale}.${key}`);
    }
  }
}

console.log("record-panel detail copy verification passed");
