"use client";

type ChatPanelComposerProps = {
  canWriteWorkspace: boolean;
  draft: string;
  error: string;
  loading: boolean;
  setDraft: (value: string) => void;
  onSend: () => void;
};

export function ChatPanelComposer({
  canWriteWorkspace,
  draft,
  error,
  loading,
  setDraft,
  onSend,
}: ChatPanelComposerProps) {
  return (
    <div className="composer">
      <textarea
        className="textarea"
        disabled={!canWriteWorkspace}
        placeholder={
          canWriteWorkspace
            ? "Examples: save this snack note..., bad hotpot in Hangzhou, ramen near last summer trip"
            : "Viewer mode: chat creation is disabled for this shared workspace."
        }
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
      />
      {error ? <div className="notice error">{error}</div> : null}
      <button className="button" type="button" onClick={onSend} disabled={loading || !canWriteWorkspace}>
        {loading ? "Working..." : "Send"}
      </button>
    </div>
  );
}
