import type { LocaleCode } from "../lib/locale";
import type { WorkspaceMemberItem } from "../lib/types";
import type { WorkspaceSettingsCopy } from "./workspace-settings-copy";

export type WorkspaceSettingsManagedSectionsProps = {
  copy: WorkspaceSettingsCopy;
  locale: LocaleCode;
  managedRole: "owner" | "editor" | null;
  members: WorkspaceMemberItem[];
  onRemoveMember: (memberId: string) => Promise<void>;
  onUpdateMemberRole: (memberId: string, role: "viewer" | "editor") => Promise<void>;
  removingMemberId: string;
  savingMemberId: string;
  token: string | null;
  userId?: string;
  workspaceId: string;
  workspaceSlug?: string | null;
};
