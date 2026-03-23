import type { ChatPanelProps } from "./chat-panel.types";

export type ChatPanelManagementSectionProps = Pick<
  ChatPanelProps,
  | "canManageSharing"
  | "canManageWorkspace"
  | "knowledgeStats"
  | "onSaveProviderConfig"
  | "providerConfigs"
  | "shareLinks"
> & {
  creatingShare: boolean;
  disablingShareId: string;
  latestShareUrl: string;
  onCreateShareLink: () => Promise<void>;
  onDisableShareLink: (shareLinkId: string) => Promise<void>;
  onReindexKnowledge: () => Promise<void>;
  reindexing: boolean;
  setShareMaxUses: (value: string) => void;
  setShareName: (value: string) => void;
  setSharePermission: (value: string) => void;
  shareMaxUses: string;
  shareName: string;
  sharePermission: string;
};
