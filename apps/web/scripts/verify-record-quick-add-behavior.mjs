import fs from "node:fs";
import path from "node:path";
import ts from "typescript";

const moduleUrlCache = new Map();

function resolveTsModulePath(importerPath, specifier) {
  for (const candidate of [
    path.resolve(path.dirname(importerPath), `${specifier}.ts`),
    path.resolve(path.dirname(importerPath), `${specifier}.tsx`),
    path.resolve(path.dirname(importerPath), specifier),
  ]) {
    if (fs.existsSync(candidate)) {
      return candidate;
    }
  }

  throw new Error(`Unable to resolve quick-add dependency ${specifier} from ${importerPath}`);
}

function buildTsModuleUrl(modulePath) {
  const normalizedModulePath = path.normalize(modulePath);
  const cachedUrl = moduleUrlCache.get(normalizedModulePath);
  if (cachedUrl) {
    return cachedUrl;
  }

  const source = fs.readFileSync(normalizedModulePath, "utf8");
  const transpiled = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2020 },
  }).outputText;
  const rewritten = transpiled.replace(/from "(\.\/[^"]+)"/g, (_match, specifier) => {
    const dependencyPath = resolveTsModulePath(normalizedModulePath, specifier);
    return `from "${buildTsModuleUrl(dependencyPath)}"`;
  });
  const moduleUrl = `data:text/javascript;base64,${Buffer.from(rewritten).toString("base64")}`;
  moduleUrlCache.set(normalizedModulePath, moduleUrl);
  return moduleUrl;
}

const helperPath = path.resolve(process.cwd(), "components/record-quick-add-bar.helpers.ts");
const { buildQuickAddRecordDraft } = await import(buildTsModuleUrl(helperPath));
const referenceNow = new Date("2026-03-26T12:00:00.000Z");

for (const [label, input, expected] of [
  [
    "english snack tag",
    "#snack good chips",
    { title: "good chips", content: "good chips", type_code: "snack", is_avoid: false, occurred_at: "2026-03-26T12:00:00.000Z", rating: null, extra_data: undefined },
  ],
  [
    "chinese snack tag",
    "#\u96f6\u98df \u597d\u5403\u7684\u85af\u7247",
    { title: "\u597d\u5403\u7684\u85af\u7247", content: "\u597d\u5403\u7684\u85af\u7247", type_code: "snack", is_avoid: false, occurred_at: "2026-03-26T12:00:00.000Z", rating: null, extra_data: undefined },
  ],
  [
    "english avoid tag",
    "#avoid airport ramen trap",
    { title: "airport ramen trap", content: "airport ramen trap", type_code: "bad_experience", is_avoid: true, occurred_at: "2026-03-26T12:00:00.000Z", rating: null, extra_data: undefined },
  ],
  [
    "chinese avoid tag",
    "#\u8e29\u96f7 \u673a\u573a\u62c9\u9762\u5f88\u96be\u5403",
    { title: "\u673a\u573a\u62c9\u9762\u5f88\u96be\u5403", content: "\u673a\u573a\u62c9\u9762\u5f88\u96be\u5403", type_code: "bad_experience", is_avoid: true, occurred_at: "2026-03-26T12:00:00.000Z", rating: null, extra_data: undefined },
  ],
  [
    "memo tag alias",
    "#\u5907\u5fd8 \u4e0b\u6b21\u8bd5\u8bd5\u5348\u9910\u5957\u9910",
    { title: "\u4e0b\u6b21\u8bd5\u8bd5\u5348\u9910\u5957\u9910", content: "\u4e0b\u6b21\u8bd5\u8bd5\u5348\u9910\u5957\u9910", type_code: "memo", is_avoid: false, occurred_at: "2026-03-26T12:00:00.000Z", rating: null, extra_data: undefined },
  ],
  [
    "english food tag",
    "#food west lake fish dinner",
    { title: "west lake fish dinner", content: "west lake fish dinner", type_code: "food", is_avoid: false, occurred_at: "2026-03-26T12:00:00.000Z", rating: null, extra_data: undefined },
  ],
  [
    "chinese food tag",
    "#\u6b63\u9910 \u4eca\u665a\u7684\u70e7\u9e45\u996d\u5f88\u9999",
    { title: "\u4eca\u665a\u7684\u70e7\u9e45\u996d\u5f88\u9999", content: "\u4eca\u665a\u7684\u70e7\u9e45\u996d\u5f88\u9999", type_code: "food", is_avoid: false, occurred_at: "2026-03-26T12:00:00.000Z", rating: null, extra_data: undefined },
  ],
  [
    "last leading tag wins",
    "#\u96f6\u98df #\u907f\u96f7 \u592a\u54b8\u4e86",
    { title: "\u592a\u54b8\u4e86", content: "\u592a\u54b8\u4e86", type_code: "bad_experience", is_avoid: true, occurred_at: "2026-03-26T12:00:00.000Z", rating: null, extra_data: undefined },
  ],
  [
    "plain note default",
    "\u53ea\u662f\u8bb0\u4e00\u4e0b\u4eca\u5929\u5403\u5230\u4e86\u65b0\u751c\u70b9",
    { title: "\u53ea\u662f\u8bb0\u4e00\u4e0b\u4eca\u5929\u5403\u5230\u4e86\u65b0\u751c\u70b9", content: "\u53ea\u662f\u8bb0\u4e00\u4e0b\u4eca\u5929\u5403\u5230\u4e86\u65b0\u751c\u70b9", type_code: "memo", is_avoid: false, occurred_at: "2026-03-26T12:00:00.000Z", rating: null, extra_data: undefined },
  ],
  [
    "explicit bracket title",
    "[Trip noodles] found a good ramen place",
    { title: "Trip noodles", content: "found a good ramen place", type_code: "memo", is_avoid: false, occurred_at: "2026-03-26T12:00:00.000Z", rating: null, extra_data: undefined },
  ],
  [
    "explicit chinese bracket title with controls",
    "yesterday #bad \u3010\u673a\u573a\u62c9\u9762\u3011 \u6c64\u5f88\u5dee",
    { title: "\u673a\u573a\u62c9\u9762", content: "\u6c64\u5f88\u5dee", type_code: "bad_experience", is_avoid: true, occurred_at: "2026-03-25T12:00:00.000Z", rating: null, extra_data: undefined },
  ],
  [
    "today token alias",
    "\u4eca\u5929 #\u96f6\u98df \u65b0\u53d1\u73b0\u7684\u997c\u5e72",
    { title: "\u65b0\u53d1\u73b0\u7684\u997c\u5e72", content: "\u65b0\u53d1\u73b0\u7684\u997c\u5e72", type_code: "snack", is_avoid: false, occurred_at: "2026-03-26T12:00:00.000Z", rating: null, extra_data: undefined },
  ],
  [
    "yesterday token alias",
    "yesterday #bad airport noodles",
    { title: "airport noodles", content: "airport noodles", type_code: "bad_experience", is_avoid: true, occurred_at: "2026-03-25T12:00:00.000Z", rating: null, extra_data: undefined },
  ],
  [
    "last leading time token wins",
    "#today \u6628\u5929 #memo \u665a\u996d\u4e0d\u9519",
    { title: "\u665a\u996d\u4e0d\u9519", content: "\u665a\u996d\u4e0d\u9519", type_code: "memo", is_avoid: false, occurred_at: "2026-03-25T12:00:00.000Z", rating: null, extra_data: undefined },
  ],
  [
    "time of day token alias",
    "18:30 #memo dinner note",
    { title: "dinner note", content: "dinner note", type_code: "memo", is_avoid: false, occurred_at: "2026-03-26T18:30:00.000Z", rating: null, extra_data: undefined },
  ],
  [
    "time of day token with explicit date",
    "2026-03-20 08:15 #snack breakfast bar",
    { title: "breakfast bar", content: "breakfast bar", type_code: "snack", is_avoid: false, occurred_at: "2026-03-20T08:15:00.000Z", rating: null, extra_data: undefined },
  ],
  [
    "last leading time of day wins",
    "08:15 09:30 #memo shift note",
    { title: "shift note", content: "shift note", type_code: "memo", is_avoid: false, occurred_at: "2026-03-26T09:30:00.000Z", rating: null, extra_data: undefined },
  ],
  [
    "invalid time of day falls through",
    "25:61 #memo impossible time note",
    { title: "25:61 #memo impossible time note", content: "25:61 #memo impossible time note", type_code: "memo", is_avoid: false, occurred_at: "2026-03-26T12:00:00.000Z", rating: null, extra_data: undefined },
  ],
  [
    "absolute date token alias",
    "2026-03-20 #memo trip noodles",
    { title: "trip noodles", content: "trip noodles", type_code: "memo", is_avoid: false, occurred_at: "2026-03-20T12:00:00.000Z", rating: null, extra_data: undefined },
  ],
  [
    "absolute slash date token alias",
    "2026/03/21 #snack travel cookies",
    { title: "travel cookies", content: "travel cookies", type_code: "snack", is_avoid: false, occurred_at: "2026-03-21T12:00:00.000Z", rating: null, extra_data: undefined },
  ],
  [
    "last leading absolute date wins",
    "2026-03-20 2026-03-22 #memo ramen list",
    { title: "ramen list", content: "ramen list", type_code: "memo", is_avoid: false, occurred_at: "2026-03-22T12:00:00.000Z", rating: null, extra_data: undefined },
  ],
  [
    "invalid absolute date falls through",
    "2026-02-31 #memo impossible date note",
    { title: "2026-02-31 #memo impossible date note", content: "2026-02-31 #memo impossible date note", type_code: "memo", is_avoid: false, occurred_at: "2026-03-26T12:00:00.000Z", rating: null, extra_data: undefined },
  ],
  [
    "rating token alias",
    "5\u661f #\u96f6\u98df \u9ed1\u5de7\u514b\u529b",
    { title: "\u9ed1\u5de7\u514b\u529b", content: "\u9ed1\u5de7\u514b\u529b", type_code: "snack", is_avoid: false, occurred_at: "2026-03-26T12:00:00.000Z", rating: 5, extra_data: undefined },
  ],
  [
    "slash rating token alias",
    "1/5 #bad airport noodles",
    { title: "airport noodles", content: "airport noodles", type_code: "bad_experience", is_avoid: true, occurred_at: "2026-03-26T12:00:00.000Z", rating: 1, extra_data: undefined },
  ],
  [
    "last leading rating token wins",
    "2star 4/5 #memo brunch spot",
    { title: "brunch spot", content: "brunch spot", type_code: "memo", is_avoid: false, occurred_at: "2026-03-26T12:00:00.000Z", rating: 4, extra_data: undefined },
  ],
  [
    "place segment alias",
    "@West Lake Sushi: fresh uni tonight",
    {
      title: "fresh uni tonight",
      content: "fresh uni tonight",
      type_code: "memo",
      is_avoid: false,
      occurred_at: "2026-03-26T12:00:00.000Z",
      rating: null,
      extra_data: { location: { place_name: "West Lake Sushi", source: "quick_add" } },
    },
  ],
  [
    "place segment with address",
    "@West Lake Sushi | Hubin Road: fresh uni tonight",
    {
      title: "fresh uni tonight",
      content: "fresh uni tonight",
      type_code: "memo",
      is_avoid: false,
      occurred_at: "2026-03-26T12:00:00.000Z",
      rating: null,
      extra_data: { location: { place_name: "West Lake Sushi", address: "Hubin Road", source: "quick_add" } },
    },
  ],
  [
    "place segment with coordinates",
    "@West Lake Sushi(30.2741,120.1551): fresh uni tonight",
    {
      title: "fresh uni tonight",
      content: "fresh uni tonight",
      type_code: "memo",
      is_avoid: false,
      occurred_at: "2026-03-26T12:00:00.000Z",
      rating: null,
      extra_data: { location: { place_name: "West Lake Sushi", latitude: 30.2741, longitude: 120.1551, source: "quick_add" } },
    },
  ],
  [
    "place segment with coordinates and address",
    "@West Lake Sushi(30.2741,120.1551) | Hubin Road: fresh uni tonight",
    {
      title: "fresh uni tonight",
      content: "fresh uni tonight",
      type_code: "memo",
      is_avoid: false,
      occurred_at: "2026-03-26T12:00:00.000Z",
      rating: null,
      extra_data: { location: { place_name: "West Lake Sushi", address: "Hubin Road", latitude: 30.2741, longitude: 120.1551, source: "quick_add" } },
    },
  ],
  [
    "place segment with control tokens",
    "2026-03-25 5star @\u897f\u6e56\u8fb9\u5bff\u53f8\uff1a \u9cd7\u9c7c\u996d\u5f88\u597d\u5403",
    {
      title: "\u9cd7\u9c7c\u996d\u5f88\u597d\u5403",
      content: "\u9cd7\u9c7c\u996d\u5f88\u597d\u5403",
      type_code: "memo",
      is_avoid: false,
      occurred_at: "2026-03-25T12:00:00.000Z",
      rating: 5,
      extra_data: { location: { place_name: "\u897f\u6e56\u8fb9\u5bff\u53f8", source: "quick_add" } },
    },
  ],
  [
    "invalid coordinates fall back to place only",
    "@West Lake Sushi(130,220): fresh uni tonight",
    {
      title: "fresh uni tonight",
      content: "fresh uni tonight",
      type_code: "memo",
      is_avoid: false,
      occurred_at: "2026-03-26T12:00:00.000Z",
      rating: null,
      extra_data: { location: { place_name: "West Lake Sushi", source: "quick_add" } },
    },
  ],
]) {
  const actual = buildQuickAddRecordDraft(input, referenceNow);
  for (const [field, expectedValue] of Object.entries(expected)) {
    const actualSerialized = typeof actual[field] === "object" ? JSON.stringify(actual[field]) : actual[field];
    const expectedSerialized =
      typeof expectedValue === "object" ? JSON.stringify(expectedValue) : expectedValue;
    if (actualSerialized !== expectedSerialized) {
      throw new Error(`quick-add behavior mismatch for ${label} field ${field}: expected ${expectedValue}, received ${actual[field]}`);
    }
  }
  if (Object.keys(actual).length !== Object.keys(expected).length) {
    throw new Error(`quick-add behavior mismatch for ${label}: expected ${Object.keys(expected).length} fields, received ${Object.keys(actual).length}`);
  }
}

console.log("record quick-add behavior verification passed");
