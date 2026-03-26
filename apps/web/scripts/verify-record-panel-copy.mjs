import fs from "node:fs";
import path from "node:path";

const locales = ["en", "zh-CN", "ja"];

function verifyFlatLocaleFile(relativePath, criticalKeys) {
  const fullPath = path.resolve(process.cwd(), relativePath);
  const copyByLocale = JSON.parse(fs.readFileSync(fullPath, "utf8"));
  const baselineKeys = Object.keys(copyByLocale.en).sort();

  for (const locale of locales) {
    if (!copyByLocale[locale]) {
      throw new Error(`Missing locale section: ${relativePath} -> ${locale}`);
    }

    const keys = Object.keys(copyByLocale[locale]).sort();
    if (keys.join("|") !== baselineKeys.join("|")) {
      throw new Error(`Locale keys mismatch for ${relativePath} -> ${locale}`);
    }

    for (const key of baselineKeys) {
      const value = copyByLocale[locale][key];
      if (typeof value !== "string" || value.trim() === "") {
        throw new Error(`Empty copy value for ${relativePath} -> ${locale}.${key}`);
      }
    }
  }

  for (const key of criticalKeys) {
    for (const locale of locales) {
      if (!(key in copyByLocale[locale])) {
        throw new Error(`Missing critical key ${relativePath} -> ${locale}.${key}`);
      }
    }
  }
}

function verifyNestedLocaleFile(relativePath, sections) {
  const fullPath = path.resolve(process.cwd(), relativePath);
  const copyBySection = JSON.parse(fs.readFileSync(fullPath, "utf8"));

  for (const [sectionName, criticalKeys] of Object.entries(sections)) {
    const copyByLocale = copyBySection[sectionName];
    if (!copyByLocale) {
      throw new Error(`Missing section ${relativePath} -> ${sectionName}`);
    }

    const baselineKeys = Object.keys(copyByLocale.en).sort();

    for (const locale of locales) {
      if (!copyByLocale[locale]) {
        throw new Error(`Missing locale section: ${relativePath} -> ${sectionName}.${locale}`);
      }

      const keys = Object.keys(copyByLocale[locale]).sort();
      if (keys.join("|") !== baselineKeys.join("|")) {
        throw new Error(`Locale keys mismatch for ${relativePath} -> ${sectionName}.${locale}`);
      }

      for (const key of baselineKeys) {
        const value = copyByLocale[locale][key];
        if (typeof value !== "string" || value.trim() === "") {
          throw new Error(`Empty copy value for ${relativePath} -> ${sectionName}.${locale}.${key}`);
        }
      }
    }

    for (const key of criticalKeys) {
      for (const locale of locales) {
        if (!(key in copyByLocale[locale])) {
          throw new Error(`Missing critical key ${relativePath} -> ${sectionName}.${locale}.${key}`);
        }
      }
    }
  }
}

verifyFlatLocaleFile("lib/record-panel-detail-copy.json", [
  "unknownTime",
  "contentRequiredError",
  "reminderSectionTitle",
  "timelineView",
  "noRecords",
  "recordTypeMemo",
  "recordTypeBadExperience",
  "recordTypeUnknown",
  "recordSourceManual",
  "recordStatusActive"
]);

verifyNestedLocaleFile("lib/record-panel-ui-copy.json", {
  mediaIssue: ["recentIssuesTitle", "retryNow", "dimensions", "deleteMedia"],
  panel: ["workspace", "advancedSearch", "locationReview", "storageHealth", "locationSourceManual", "locationSourceUnknown"]
});

const recordPanelSource = fs.readFileSync(path.resolve(process.cwd(), "components/record-panel-v2.tsx"), "utf8");
for (const forbiddenToken of ["legacyMediaIssueCopy", "legacyVisibleMediaIssueCopy", "legacyPanelCopy"]) {
  if (recordPanelSource.includes(forbiddenToken)) {
    throw new Error(`Forbidden legacy copy token still present in record-panel-v2.tsx: ${forbiddenToken}`);
  }
}

console.log("record-panel copy verification passed");
