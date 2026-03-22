import fs from "node:fs";
import path from "node:path";

const cardPath = path.resolve(process.cwd(), "components/media-asset-card.tsx");
const cardSource = fs.readFileSync(cardPath, "utf8");
const cardLineCount = cardSource.split(/\r?\n/).length;
const metadataPath = path.resolve(process.cwd(), "components/media-asset-card-metadata.tsx");
const metadataSource = fs.readFileSync(metadataPath, "utf8");
const actionsPath = path.resolve(process.cwd(), "components/media-asset-card-actions.tsx");
const actionsSource = fs.readFileSync(actionsPath, "utf8");

if (!cardSource.includes('import { MediaAssetCardMetadata } from "./media-asset-card-metadata";')) {
  throw new Error("media-asset-card.tsx must import MediaAssetCardMetadata");
}

if (!cardSource.includes('import { MediaAssetCardActions } from "./media-asset-card-actions";')) {
  throw new Error("media-asset-card.tsx must import MediaAssetCardActions");
}

if (!cardSource.includes('import type { MediaAssetCardProps } from "./media-asset-card.types";')) {
  throw new Error("media-asset-card.tsx must import MediaAssetCardProps");
}

if (!cardSource.includes("<MediaAssetCardMetadata")) {
  throw new Error("media-asset-card.tsx must delegate metadata rendering");
}

if (!cardSource.includes("<MediaAssetCardActions")) {
  throw new Error("media-asset-card.tsx must delegate action rendering");
}

if (!metadataSource.includes('readMetadataText(asset.metadata_json, "processing_source")')) {
  throw new Error("media-asset-card-metadata.tsx must keep metadata extraction logic");
}

if (!metadataSource.includes('readMetadataNumber(asset.metadata_json, "processing_retry_count")')) {
  throw new Error("media-asset-card-metadata.tsx must keep retry-count extraction logic");
}

if (!actionsSource.includes('asset.processing_status !== "completed"')) {
  throw new Error("media-asset-card-actions.tsx must keep retry button gating");
}

for (const forbiddenToken of [
  "readMetadataText(asset.metadata_json",
  "readMetadataNumber(asset.metadata_json",
  "formatMediaSize(asset)",
  'className="action-row" style={{ marginTop: 12 }}',
]) {
  if (cardSource.includes(forbiddenToken)) {
    throw new Error(`media-asset-card.tsx must keep metadata and actions delegated: ${forbiddenToken}`);
  }
}

const maxAllowedLines = 90;
if (cardLineCount > maxAllowedLines) {
  throw new Error(`media-asset-card.tsx exceeded ${maxAllowedLines} lines: ${cardLineCount}`);
}

console.log("media-asset-card structure verification passed");
