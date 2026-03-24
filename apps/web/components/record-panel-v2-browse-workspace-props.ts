import type { BuildRecordBrowseWorkspacePropsInput, RecordBrowseWorkspaceProps } from "./record-panel-v2-workspace-props.types";
import { buildRecordBrowseWorkspaceCopyProps, buildRecordBrowseWorkspaceDraftLocationProps, buildRecordBrowseWorkspaceFilterProps, buildRecordBrowseWorkspaceRecordProps } from "./record-panel-v2-browse-workspace-props-helpers";

export function buildRecordBrowseWorkspaceProps(
  input: BuildRecordBrowseWorkspacePropsInput,
): RecordBrowseWorkspaceProps {
  const copyProps = buildRecordBrowseWorkspaceCopyProps(input);
  const draftLocationProps = buildRecordBrowseWorkspaceDraftLocationProps(input);
  const filterProps = buildRecordBrowseWorkspaceFilterProps(input);
  const recordProps = buildRecordBrowseWorkspaceRecordProps(input);

  return {
    ...copyProps,
    ...draftLocationProps,
    ...filterProps,
    ...recordProps,
  };
}
