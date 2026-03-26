import fs from "node:fs";
import path from "node:path";
import ts from "typescript";

const helperPath = path.resolve(process.cwd(), "components/record-quick-add-bar.helpers.ts");
const helperSource = fs.readFileSync(helperPath, "utf8");
const transpiled = ts.transpileModule(helperSource, {
  compilerOptions: {
    module: ts.ModuleKind.ESNext,
    target: ts.ScriptTarget.ES2020,
  },
}).outputText;

const helperModuleUrl = `data:text/javascript;base64,${Buffer.from(transpiled).toString("base64")}`;
const { buildQuickAddRecordDraft } = await import(helperModuleUrl);

for (const [label, input, expected] of [
  [
    "english snack tag",
    "#snack good chips",
    { title: "good chips", content: "good chips", type_code: "snack", is_avoid: false },
  ],
  [
    "chinese snack tag",
    "#零食 好吃的薯片",
    { title: "好吃的薯片", content: "好吃的薯片", type_code: "snack", is_avoid: false },
  ],
  [
    "english avoid tag",
    "#avoid airport ramen trap",
    {
      title: "airport ramen trap",
      content: "airport ramen trap",
      type_code: "bad_experience",
      is_avoid: true,
    },
  ],
  [
    "chinese avoid tag",
    "#踩雷 机场拉面很难吃",
    {
      title: "机场拉面很难吃",
      content: "机场拉面很难吃",
      type_code: "bad_experience",
      is_avoid: true,
    },
  ],
  [
    "memo tag alias",
    "#备忘 下次试试午餐套餐",
    { title: "下次试试午餐套餐", content: "下次试试午餐套餐", type_code: "memo", is_avoid: false },
  ],
  [
    "last leading tag wins",
    "#零食 #避雷 太咸了",
    { title: "太咸了", content: "太咸了", type_code: "bad_experience", is_avoid: true },
  ],
  [
    "plain note default",
    "只是记一下今天吃到了新甜点",
    {
      title: "只是记一下今天吃到了新甜点",
      content: "只是记一下今天吃到了新甜点",
      type_code: "memo",
      is_avoid: false,
    },
  ],
]) {
  const actual = buildQuickAddRecordDraft(input);
  for (const [field, expectedValue] of Object.entries(expected)) {
    if (actual[field] !== expectedValue) {
      throw new Error(
        `quick-add behavior mismatch for ${label} field ${field}: expected ${expectedValue}, received ${actual[field]}`,
      );
    }
  }
  if (Object.keys(actual).length !== Object.keys(expected).length) {
    throw new Error(
      `quick-add behavior mismatch for ${label}: expected ${Object.keys(expected).length} fields, received ${Object.keys(actual).length}`,
    );
  }
}

console.log("record quick-add behavior verification passed");
