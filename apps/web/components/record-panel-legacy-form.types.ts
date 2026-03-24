import type { ChangeEvent, Dispatch, FormEvent, SetStateAction } from "react";

import type { MediaAsset, RecordItem } from "../lib/types";
import type { RecordPanelFormState } from "./record-panel.types";

export type RecordPanelLegacyFormProps = {
  deleting: boolean;
  error: string;
  form: RecordPanelFormState;
  handleDelete: () => Promise<void>;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
  handleUpload: (event: ChangeEvent<HTMLInputElement>) => Promise<void>;
  mediaAssets: MediaAsset[];
  saving: boolean;
  selectedRecord: RecordItem | null;
  setForm: Dispatch<SetStateAction<RecordPanelFormState>>;
  uploading: boolean;
};
