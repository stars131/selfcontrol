import fs from "node:fs";
import path from "node:path";

const routeChecks = [
  {
    filePath: path.resolve(process.cwd(), "app/page.tsx"),
    required: [
      'import { LandingPageClient } from "../components/landing-page-client";',
      "export default function HomePage() {",
      "return <LandingPageClient />;",
    ],
    forbidden: [
      '"use client";',
      "useState(",
      "useEffect(",
      "fetch(",
      "getStoredToken(",
      "getCurrentUser(",
    ],
    maxLines: 6,
  },
  {
    filePath: path.resolve(process.cwd(), "app/login/page.tsx"),
    required: [
      'import { LoginForm } from "../../components/login-form";',
      "export default function LoginPage() {",
      "return <LoginForm />;",
    ],
    forbidden: ['"use client";', "useState(", "useEffect(", "fetch(", "postJson("],
    maxLines: 6,
  },
  {
    filePath: path.resolve(process.cwd(), "app/register/page.tsx"),
    required: [
      'import { RegisterForm } from "../../components/register-form";',
      "export default function RegisterPage() {",
      "return <RegisterForm />;",
    ],
    forbidden: ['"use client";', "useState(", "useEffect(", "fetch(", "postJson("],
    maxLines: 6,
  },
  {
    filePath: path.resolve(process.cwd(), "app/app/page.tsx"),
    required: [
      'import { WorkspaceEntryClient } from "../../components/workspace-entry-client";',
      "export default function AppEntryPage() {",
      "return <WorkspaceEntryClient />;",
    ],
    forbidden: ['"use client";', "useState(", "useEffect(", "fetch(", "getStoredToken("],
    maxLines: 6,
  },
  {
    filePath: path.resolve(process.cwd(), "app/app/workspaces/[workspaceId]/page.tsx"),
    required: [
      'import { WorkspaceShellClient } from "../../../../components/workspace-shell-client";',
      "export default async function WorkspacePage({",
      "const { workspaceId } = await params;",
      "return <WorkspaceShellClient workspaceId={workspaceId} />;",
    ],
    forbidden: ['"use client";', "useState(", "useEffect(", "fetch(", "ProviderSettingsPanel"],
    maxLines: 12,
  },
  {
    filePath: path.resolve(process.cwd(), "app/app/workspaces/[workspaceId]/settings/page.tsx"),
    required: [
      'import { WorkspaceSettingsClient } from "../../../../../components/workspace-settings-client";',
      "export default async function WorkspaceSettingsPage({",
      "const { workspaceId } = await params;",
      "return <WorkspaceSettingsClient workspaceId={workspaceId} />;",
    ],
    forbidden: ['"use client";', "useState(", "useEffect(", "fetch(", "ProviderSettingsPanel"],
    maxLines: 12,
  },
  {
    filePath: path.resolve(process.cwd(), "app/share/[token]/page.tsx"),
    required: [
      'import { SharePreviewClient } from "../../../components/share-preview-client";',
      "export default async function SharePage({",
      "const { token } = await params;",
      "return <SharePreviewClient tokenValue={token} />;",
    ],
    forbidden: ['"use client";', "useState(", "useEffect(", "fetch(", "postJson("],
    maxLines: 12,
  },
];

for (const routeCheck of routeChecks) {
  const source = fs.readFileSync(routeCheck.filePath, "utf8");
  const lineCount = source.split(/\r?\n/).length;
  const label = path.relative(process.cwd(), routeCheck.filePath);

  for (const requiredToken of routeCheck.required) {
    if (!source.includes(requiredToken)) {
      throw new Error(`${label} must keep thin entrypoint wiring: ${requiredToken}`);
    }
  }

  for (const forbiddenToken of routeCheck.forbidden) {
    if (source.includes(forbiddenToken)) {
      throw new Error(`${label} must keep route logic delegated out of the page file: ${forbiddenToken}`);
    }
  }

  if (lineCount > routeCheck.maxLines) {
    throw new Error(`${label} exceeded ${routeCheck.maxLines} lines: ${lineCount}`);
  }
}

console.log("route entrypoint verification passed");
