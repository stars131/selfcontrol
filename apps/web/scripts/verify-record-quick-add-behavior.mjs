import fs from "node:fs";
import path from "node:path";
import ts from "typescript";

const helperPath = path.resolve(process.cwd(), "components/record-quick-add-bar.helpers.ts");
const helperSource = fs.readFileSync(helperPath, "utf8");
const transpiled = ts.transpileModule(helperSource, {
  compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2020 },
}).outputText;

const helperModuleUrl = `data:text/javascript;base64,${Buffer.from(transpiled).toString("base64")}`;
const { buildQuickAddRecordDraft } = await import(helperModuleUrl);
const referenceNow = new Date("2026-03-26T12:00:00.000Z");

for (const [label, input, expected] of [
  [
    "english snack tag",
    "#snack good chips",
    { title: "good chips", content: "good chips", type_code: "snack", is_avoid: false, occurred_at: "2026-03-26T12:00:00.000Z" },
  ],
  [
    "chinese snack tag",
    "#\u96f6\u98df \u597d\u5403\u7684\u85af\u7247",
    { title: "\u597d\u5403\u7684\u85af\u7247", content: "\u597d\u5403\u7684\u85af\u7247", type_code: "snack", is_avoid: false, occurred_at: "2026-03-26T12:00:00.000Z" },
  ],
  [
    "english avoid tag",
    "#avoid airport ramen trap",
    { title: "airport ramen trap", content: "airport ramen trap", type_code: "bad_experience", is_avoid: true, occurred_at: "2026-03-26T12:00:00.000Z" },
  ],
  [
    "chinese avoid tag",
    "#\u8e29\u96f7 \u673a\u573a\u62c9\u9762\u5f88\u96be\u5403",
    { title: "\u673a\u573a\u62c9\u9762\u5f88\u96be\u5403", content: "\u673a\u573a\u62c9\u9762\u5f88\u96be\u5403", type_code: "bad_experience", is_avoid: true, occurred_at: "2026-03-26T12:00:00.000Z" },
  ],
  [
    "memo tag alias",
    "#\u5907\u5fd8 \u4e0b\u6b21\u8bd5\u8bd5\u5348\u9910\u5957\u9910",
    { title: "\u4e0b\u6b21\u8bd5\u8bd5\u5348\u9910\u5957\u9910", content: "\u4e0b\u6b21\u8bd5\u8bd5\u5348\u9910\u5957\u9910", type_code: "memo", is_avoid: false, occurred_at: "2026-03-26T12:00:00.000Z" },
  ],
  [
    "last leading tag wins",
    "#\u96f6\u98df #\u907f\u96f7 \u592a\u54b8\u4e86",
    { title: "\u592a\u54b8\u4e86", content: "\u592a\u54b8\u4e86", type_code: "bad_experience", is_avoid: true, occurred_at: "2026-03-26T12:00:00.000Z" },
  ],
  [
    "plain note default",
    "\u53ea\u662f\u8bb0\u4e00\u4e0b\u4eca\u5929\u5403\u5230\u4e86\u65b0\u751c\u70b9",
    { title: "\u53ea\u662f\u8bb0\u4e00\u4e0b\u4eca\u5929\u5403\u5230\u4e86\u65b0\u751c\u70b9", content: "\u53ea\u662f\u8bb0\u4e00\u4e0b\u4eca\u5929\u5403\u5230\u4e86\u65b0\u751c\u70b9", type_code: "memo", is_avoid: false, occurred_at: "2026-03-26T12:00:00.000Z" },
  ],
  [
    "today token alias",
    "\u4eca\u5929 #\u96f6\u98df \u65b0\u53d1\u73b0\u7684\u997c\u5e72",
    { title: "\u65b0\u53d1\u73b0\u7684\u997c\u5e72", content: "\u65b0\u53d1\u73b0\u7684\u997c\u5e72", type_code: "snack", is_avoid: false, occurred_at: "2026-03-26T12:00:00.000Z" },
  ],
  [
    "yesterday token alias",
    "yesterday #bad airport noodles",
    { title: "airport noodles", content: "airport noodles", type_code: "bad_experience", is_avoid: true, occurred_at: "2026-03-25T12:00:00.000Z" },
  ],
  [
    "last leading time token wins",
    "#today \u6628\u5929 #memo \u665a\u996d\u4e0d\u9519",
    { title: "\u665a\u996d\u4e0d\u9519", content: "\u665a\u996d\u4e0d\u9519", type_code: "memo", is_avoid: false, occurred_at: "2026-03-25T12:00:00.000Z" },
  ],
]) {
  const actual = buildQuickAddRecordDraft(input, referenceNow);
  for (const [field, expectedValue] of Object.entries(expected)) {
    if (actual[field] !== expectedValue) {
      throw new Error(`quick-add behavior mismatch for ${label} field ${field}: expected ${expectedValue}, received ${actual[field]}`);
    }
  }
  if (Object.keys(actual).length !== Object.keys(expected).length) {
    throw new Error(`quick-add behavior mismatch for ${label}: expected ${Object.keys(expected).length} fields, received ${Object.keys(actual).length}`);
  }
}

console.log("record quick-add behavior verification passed");
