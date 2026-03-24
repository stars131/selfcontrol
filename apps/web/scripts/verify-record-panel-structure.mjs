import fs from "node:fs";
import path from "node:path";

const recordPanelPath = path.resolve(process.cwd(), "components/record-panel-v2.tsx");
const recordPanelV2TypesPath = path.resolve(process.cwd(), "components/record-panel-v2.types.ts");
const recordPanelV2InputTypesPath = path.resolve(
  process.cwd(),
  "components/record-panel-v2-input.types.ts",
);
const recordPanelV2PropsDataTypesPath = path.resolve(
  process.cwd(),
  "components/record-panel-v2-props-data.types.ts",
);
const recordPanelV2PropsActionTypesPath = path.resolve(
  process.cwd(),
  "components/record-panel-v2-props-action.types.ts",
);
const legacyRecordPanelPath = path.resolve(process.cwd(), "components/record-panel.tsx");
const legacyRecordPanelViewDataPath = path.resolve(
  process.cwd(),
  "components/use-record-panel-legacy-view-data.ts",
);
const recordPanelWorkspacePropsPath = path.resolve(
  process.cwd(),
  "components/record-panel-v2-workspace-props.ts",
);
const recordPanelWorkspacePropsTypesPath = path.resolve(
  process.cwd(),
  "components/record-panel-v2-workspace-props.types.ts",
);
const recordPanelWorkspacePropsCoreTypesPath = path.resolve(
  process.cwd(),
  "components/record-panel-v2-workspace-props-core.types.ts",
);
const recordPanelBrowseWorkspacePropsTypesPath = path.resolve(
  process.cwd(),
  "components/record-panel-v2-browse-workspace-props.types.ts",
);
const recordPanelBrowseWorkspacePropInputTypesPath = path.resolve(
  process.cwd(),
  "components/record-panel-v2-browse-workspace-prop-input.types.ts",
);
const recordPanelBrowseWorkspaceControllerInputTypesPath = path.resolve(
  process.cwd(),
  "components/record-panel-v2-browse-workspace-controller-input.types.ts",
);
const recordPanelEditorWorkspacePropsTypesPath = path.resolve(
  process.cwd(),
  "components/record-panel-v2-editor-workspace-props.types.ts",
);
const recordPanelEditorWorkspacePropInputTypesPath = path.resolve(
  process.cwd(),
  "components/record-panel-v2-editor-workspace-prop-input.types.ts",
);
const recordPanelEditorWorkspaceControllerInputTypesPath = path.resolve(
  process.cwd(),
  "components/record-panel-v2-editor-workspace-controller-input.types.ts",
);
const recordPanelEditorWorkspaceControllerActionInputTypesPath = path.resolve(
  process.cwd(),
  "components/record-panel-v2-editor-workspace-controller-action-input.types.ts",
);
const recordPanelEditorWorkspaceControllerDisplayInputTypesPath = path.resolve(
  process.cwd(),
  "components/record-panel-v2-editor-workspace-controller-display-input.types.ts",
);
const recordPanelEditorWorkspaceControllerFormatterInputTypesPath = path.resolve(
  process.cwd(),
  "components/record-panel-v2-editor-workspace-controller-formatter-input.types.ts",
);
const recordPanelEditorWorkspacePropsPath = path.resolve(
  process.cwd(),
  "components/record-panel-v2-editor-workspace-props.ts",
);
const recordPanelBrowseWorkspacePropsPath = path.resolve(
  process.cwd(),
  "components/record-panel-v2-browse-workspace-props.ts",
);
const recordPanelBrowseWorkspacePropsHelpersPath = path.resolve(
  process.cwd(),
  "components/record-panel-v2-browse-workspace-props-helpers.ts",
);
const recordPanelBrowseWorkspaceFilterPropsPath = path.resolve(
  process.cwd(),
  "components/record-panel-v2-browse-workspace-filter-props.ts",
);
const recordPanelBrowseWorkspaceRecordPropsPath = path.resolve(
  process.cwd(),
  "components/record-panel-v2-browse-workspace-record-props.ts",
);
const recordPanelBrowseWorkspaceCopyPropsPath = path.resolve(
  process.cwd(),
  "components/record-panel-v2-browse-workspace-copy-props.ts",
);
const recordPanelEditorWorkspaceCopyPropsPath = path.resolve(
  process.cwd(),
  "components/record-panel-v2-editor-workspace-copy-props.ts",
);
const recordPanelEditorWorkspaceCopyPropsInputTypesPath = path.resolve(
  process.cwd(),
  "components/record-panel-v2-editor-workspace-copy-props-input.types.ts",
);
const recordPanelEditorWorkspaceChannelCopyPropsPath = path.resolve(
  process.cwd(),
  "components/record-panel-v2-editor-workspace-channel-copy-props.ts",
);
const recordPanelEditorWorkspaceMediaCopyPropsPath = path.resolve(
  process.cwd(),
  "components/record-panel-v2-editor-workspace-media-copy-props.ts",
);
const recordPanelEditorWorkspaceReminderCopyPropsPath = path.resolve(
  process.cwd(),
  "components/record-panel-v2-editor-workspace-reminder-copy-props.ts",
);
const recordPanelBrowseWorkspaceDraftLocationPropsPath = path.resolve(
  process.cwd(),
  "components/record-panel-v2-browse-workspace-draft-location-props.ts",
);
const recordPanelBrowseWorkspaceInputPath = path.resolve(
  process.cwd(),
  "components/record-panel-v2-browse-workspace-input.ts",
);
const recordPanelBrowseWorkspacePropInputPath = path.resolve(
  process.cwd(),
  "components/record-panel-v2-browse-workspace-prop-input.ts",
);
const recordPanelBrowseWorkspaceControllerInputPath = path.resolve(
  process.cwd(),
  "components/record-panel-v2-browse-workspace-controller-input.ts",
);
const recordPanelEditorWorkspacePropsInputsPath = path.resolve(
  process.cwd(),
  "components/record-panel-v2-editor-workspace-props-inputs.ts",
);
const recordPanelEditorWorkspaceBasePropsInputPath = path.resolve(
  process.cwd(),
  "components/record-panel-v2-editor-workspace-base-props-input.ts",
);
const recordPanelEditorWorkspaceActionPropsInputPath = path.resolve(
  process.cwd(),
  "components/record-panel-v2-editor-workspace-action-props-input.ts",
);
const recordPanelEditorWorkspaceActionPropsInputTypesPath = path.resolve(
  process.cwd(),
  "components/record-panel-v2-editor-workspace-action-props-input.types.ts",
);
const recordPanelEditorWorkspaceActionPropsPath = path.resolve(
  process.cwd(),
  "components/record-panel-v2-editor-workspace-action-props.ts",
);
const recordPanelEditorWorkspaceDeadLetterActionPropsPath = path.resolve(
  process.cwd(),
  "components/record-panel-v2-editor-workspace-dead-letter-action-props.ts",
);
const recordPanelEditorWorkspacePrimaryActionPropsPath = path.resolve(
  process.cwd(),
  "components/record-panel-v2-editor-workspace-primary-action-props.ts",
);
const recordPanelEditorWorkspaceBasePropsPath = path.resolve(
  process.cwd(),
  "components/record-panel-v2-editor-workspace-base-props.ts",
);
const recordPanelEditorWorkspaceBasePropsTypesPath = path.resolve(
  process.cwd(),
  "components/record-panel-v2-editor-workspace-base-props.types.ts",
);
const recordPanelEditorWorkspaceBaseSessionPropsPath = path.resolve(
  process.cwd(),
  "components/record-panel-v2-editor-workspace-base-session-props.ts",
);
const recordPanelEditorWorkspaceBaseStatePropsPath = path.resolve(
  process.cwd(),
  "components/record-panel-v2-editor-workspace-base-state-props.ts",
);
const recordPanelEditorWorkspaceBaseFormPropsPath = path.resolve(
  process.cwd(),
  "components/record-panel-v2-editor-workspace-base-form-props.ts",
);
const recordPanelEditorWorkspaceBaseMediaPropsPath = path.resolve(
  process.cwd(),
  "components/record-panel-v2-editor-workspace-base-media-props.ts",
);
const recordPanelEditorWorkspaceBaseSessionPropsTypesPath = path.resolve(
  process.cwd(),
  "components/record-panel-v2-editor-workspace-base-session-props.types.ts",
);
const recordPanelEditorWorkspaceBaseStatePropsTypesPath = path.resolve(
  process.cwd(),
  "components/record-panel-v2-editor-workspace-base-state-props.types.ts",
);
const recordPanelEditorWorkspaceBaseFormPropsTypesPath = path.resolve(
  process.cwd(),
  "components/record-panel-v2-editor-workspace-base-form-props.types.ts",
);
const recordPanelEditorWorkspaceBaseMediaPropsTypesPath = path.resolve(
  process.cwd(),
  "components/record-panel-v2-editor-workspace-base-media-props.types.ts",
);
const recordPanelEditorWorkspaceInputPath = path.resolve(
  process.cwd(),
  "components/record-panel-v2-editor-workspace-input.ts",
);
const recordPanelEditorWorkspacePropInputPath = path.resolve(
  process.cwd(),
  "components/record-panel-v2-editor-workspace-prop-input.ts",
);
const recordPanelEditorWorkspaceControllerInputPath = path.resolve(
  process.cwd(),
  "components/record-panel-v2-editor-workspace-controller-input.ts",
);
const recordPanelEditorWorkspaceControllerActionInputPath = path.resolve(
  process.cwd(),
  "components/record-panel-v2-editor-workspace-controller-action-input.ts",
);
const recordPanelEditorWorkspaceControllerDisplayInputPath = path.resolve(
  process.cwd(),
  "components/record-panel-v2-editor-workspace-controller-display-input.ts",
);
const recordPanelEditorWorkspaceControllerFormatterInputPath = path.resolve(
  process.cwd(),
  "components/record-panel-v2-editor-workspace-controller-formatter-input.ts",
);
const recordPanelShellPropsPath = path.resolve(
  process.cwd(),
  "components/record-panel-v2-shell-props.ts",
);
const recordPanelShellViewPropsPath = path.resolve(
  process.cwd(),
  "components/record-panel-v2-shell-view-props.ts",
);
const recordPanelControllerPath = path.resolve(process.cwd(), "components/use-record-panel-controller.ts");
const recordPanelControllerSyncPath = path.resolve(
  process.cwd(),
  "components/use-record-panel-controller-sync.ts",
);
const recordPanelControllerSyncTypesPath = path.resolve(
  process.cwd(),
  "components/use-record-panel-controller-sync.types.ts",
);
const recordPanelControllerDeadLetterSyncPath = path.resolve(
  process.cwd(),
  "components/use-record-panel-controller-dead-letter-sync.ts",
);
const recordPanelControllerSelectedRecordSyncPath = path.resolve(
  process.cwd(),
  "components/use-record-panel-controller-selected-record-sync.ts",
);
const recordPanelControllerSelectedRecordSyncTypesPath = path.resolve(
  process.cwd(),
  "components/use-record-panel-controller-selected-record-sync.types.ts",
);
const recordPanelControllerSelectedRecordFormSyncPath = path.resolve(
  process.cwd(),
  "components/use-record-panel-controller-selected-record-form-sync.ts",
);
const recordPanelControllerSelectedRecordReminderSyncPath = path.resolve(
  process.cwd(),
  "components/use-record-panel-controller-selected-record-reminder-sync.ts",
);
const recordPanelControllerFilterSyncPath = path.resolve(
  process.cwd(),
  "components/use-record-panel-controller-filter-sync.ts",
);
const recordPanelControllerSyncInputPath = path.resolve(
  process.cwd(),
  "components/record-panel-controller-sync-input.ts",
);
const recordPanelControllerStatePath = path.resolve(
  process.cwd(),
  "components/use-record-panel-controller-state.ts",
);
const recordPanelControllerFormStatePath = path.resolve(
  process.cwd(),
  "components/use-record-panel-controller-form-state.ts",
);
const recordPanelControllerRecordFormStatePath = path.resolve(
  process.cwd(),
  "components/use-record-panel-controller-record-form-state.ts",
);
const recordPanelControllerSupportingFormStatePath = path.resolve(
  process.cwd(),
  "components/use-record-panel-controller-supporting-form-state.ts",
);
const recordPanelControllerMediaStatePath = path.resolve(
  process.cwd(),
  "components/use-record-panel-controller-media-state.ts",
);
const recordPanelControllerBrowseStatePath = path.resolve(
  process.cwd(),
  "components/use-record-panel-controller-browse-state.ts",
);
const recordPanelControllerResultPath = path.resolve(
  process.cwd(),
  "components/record-panel-controller-result.ts",
);
const recordPanelControllerStateResultPath = path.resolve(
  process.cwd(),
  "components/record-panel-controller-state-result.ts",
);
const recordPanelControllerViewDataResultPath = path.resolve(
  process.cwd(),
  "components/record-panel-controller-view-data-result.ts",
);
const recordPanelControllerCoreViewDataResultPath = path.resolve(
  process.cwd(),
  "components/record-panel-controller-core-view-data-result.ts",
);
const recordPanelControllerLocalizedViewDataResultPath = path.resolve(
  process.cwd(),
  "components/record-panel-controller-localized-view-data-result.ts",
);
const recordPanelControllerHandlerGroupsPath = path.resolve(
  process.cwd(),
  "components/record-panel-controller-handler-groups.ts",
);
const recordPanelControllerHandlerGroupsInputPath = path.resolve(
  process.cwd(),
  "components/record-panel-controller-handler-groups-input.ts",
);
const recordPanelControllerHandlerGroupsInputTypesPath = path.resolve(
  process.cwd(),
  "components/record-panel-controller-handler-groups-input.types.ts",
);
const recordPanelControllerHandlerGroupsPropsInputPath = path.resolve(
  process.cwd(),
  "components/record-panel-controller-handler-groups-props-input.ts",
);
const recordPanelControllerHandlerGroupsStateInputPath = path.resolve(
  process.cwd(),
  "components/record-panel-controller-handler-groups-state-input.ts",
);
const recordPanelControllerHandlerGroupsViewDataInputPath = path.resolve(
  process.cwd(),
  "components/record-panel-controller-handler-groups-view-data-input.ts",
);
const recordPanelControllerViewDataPath = path.resolve(
  process.cwd(),
  "components/use-record-panel-controller-view-data.ts",
);
const recordPanelControllerLocalizedViewDataHookPath = path.resolve(
  process.cwd(),
  "components/use-record-panel-controller-localized-view-data.ts",
);
const recordPanelControllerViewDataHelpersPath = path.resolve(
  process.cwd(),
  "components/record-panel-controller-view-data-helpers.ts",
);
const recordPanelControllerRecordViewDataPath = path.resolve(
  process.cwd(),
  "components/record-panel-controller-record-view-data.ts",
);
const recordPanelControllerSelectedRecordViewDataPath = path.resolve(
  process.cwd(),
  "components/record-panel-controller-selected-record-view-data.ts",
);
const recordPanelControllerLocationViewDataPath = path.resolve(
  process.cwd(),
  "components/record-panel-controller-location-view-data.ts",
);
const recordPanelControllerLocalizedViewDataPath = path.resolve(
  process.cwd(),
  "components/record-panel-controller-localized-view-data.ts",
);
const recordPanelRecordSummaryHelpersPath = path.resolve(
  process.cwd(),
  "components/record-panel-controller-record-summary-helpers.ts",
);
const recordPanelMediaViewDataHelpersPath = path.resolve(
  process.cwd(),
  "components/record-panel-controller-media-view-data-helpers.ts",
);
const recordPanelRecordHandlersPath = path.resolve(
  process.cwd(),
  "components/record-panel-controller-record-handlers.ts",
);
const recordPanelHandlerGroupInputsPath = path.resolve(
  process.cwd(),
  "components/record-panel-controller-handler-group-inputs.ts",
);
const recordPanelHandlerGroupInputTypesPath = path.resolve(
  process.cwd(),
  "components/record-panel-controller-handler-group-inputs.types.ts",
);
const recordPanelHandlerGroupPropsInputTypesPath = path.resolve(
  process.cwd(),
  "components/record-panel-controller-handler-group-props-input.types.ts",
);
const recordPanelHandlerGroupStateInputTypesPath = path.resolve(
  process.cwd(),
  "components/record-panel-controller-handler-group-state-input.types.ts",
);
const recordPanelHandlerGroupViewDataInputTypesPath = path.resolve(
  process.cwd(),
  "components/record-panel-controller-handler-group-view-data-input.types.ts",
);
const recordPanelRecordHandlerInputPath = path.resolve(
  process.cwd(),
  "components/record-panel-controller-record-handler-input.ts",
);
const recordPanelRecordHandlerInputTypesPath = path.resolve(
  process.cwd(),
  "components/record-panel-controller-record-handler-input.types.ts",
);
const recordPanelMediaHandlerInputPath = path.resolve(
  process.cwd(),
  "components/record-panel-controller-media-handler-input.ts",
);
const recordPanelMediaHandlerInputTypesPath = path.resolve(
  process.cwd(),
  "components/record-panel-controller-media-handler-input.types.ts",
);
const recordPanelFormActionsPath = path.resolve(
  process.cwd(),
  "components/record-panel-controller-form-actions.ts",
);
const recordPanelFormActionInputTypesPath = path.resolve(
  process.cwd(),
  "components/record-panel-controller-form-action-input.types.ts",
);
const recordPanelFilterActionsPath = path.resolve(
  process.cwd(),
  "components/record-panel-controller-filter-actions.ts",
);
const recordPanelFilterActionInputTypesPath = path.resolve(
  process.cwd(),
  "components/record-panel-controller-filter-action-input.types.ts",
);
const recordPanelFilterApplyActionPath = path.resolve(
  process.cwd(),
  "components/record-panel-controller-filter-apply-action.ts",
);
const recordPanelFilterPresetActionsPath = path.resolve(
  process.cwd(),
  "components/record-panel-controller-filter-preset-actions.ts",
);
const recordPanelFilterPresetActionInputTypesPath = path.resolve(
  process.cwd(),
  "components/record-panel-controller-filter-preset-action-input.types.ts",
);
const recordPanelFilterPresetSaveActionPath = path.resolve(
  process.cwd(),
  "components/record-panel-controller-filter-preset-save-action.ts",
);
const recordPanelFilterPresetDeleteActionPath = path.resolve(
  process.cwd(),
  "components/record-panel-controller-filter-preset-delete-action.ts",
);
const recordPanelFilterHelpersPath = path.resolve(
  process.cwd(),
  "components/record-panel-controller-filter-helpers.ts",
);
const recordPanelFilterErrorHelpersPath = path.resolve(
  process.cwd(),
  "components/record-panel-controller-filter-error-helpers.ts",
);
const recordPanelFilterPresetNamePath = path.resolve(
  process.cwd(),
  "components/record-panel-controller-filter-preset-name.ts",
);
const recordPanelRecordSubmitActionsPath = path.resolve(
  process.cwd(),
  "components/record-panel-controller-record-submit-actions.ts",
);
const recordPanelRecordSubmitActionInputTypesPath = path.resolve(
  process.cwd(),
  "components/record-panel-controller-record-submit-action-input.types.ts",
);
const recordPanelRecordSaveActionsPath = path.resolve(
  process.cwd(),
  "components/record-panel-controller-record-save-actions.ts",
);
const recordPanelRecordSaveSubmitActionPath = path.resolve(
  process.cwd(),
  "components/record-panel-controller-record-save-submit-action.ts",
);
const recordPanelRecordSaveActionInputTypesPath = path.resolve(
  process.cwd(),
  "components/record-panel-controller-record-save-action-input.types.ts",
);
const recordPanelRecordSaveSuccessHelpersPath = path.resolve(
  process.cwd(),
  "components/record-panel-controller-record-save-success-helpers.ts",
);
const recordPanelRecordDeleteActionsPath = path.resolve(
  process.cwd(),
  "components/record-panel-controller-record-delete-actions.ts",
);
const recordPanelRecordDeleteRunActionPath = path.resolve(
  process.cwd(),
  "components/record-panel-controller-record-delete-run-action.ts",
);
const recordPanelRecordDeleteActionInputTypesPath = path.resolve(
  process.cwd(),
  "components/record-panel-controller-record-delete-action-input.types.ts",
);
const recordPanelRecordDeleteHelpersPath = path.resolve(
  process.cwd(),
  "components/record-panel-controller-record-delete-helpers.ts",
);
const recordPanelRecordSaveHelpersPath = path.resolve(
  process.cwd(),
  "components/record-panel-controller-record-save-helpers.ts",
);
const recordPanelRecordSaveErrorHelpersPath = path.resolve(
  process.cwd(),
  "components/record-panel-controller-record-save-error-helpers.ts",
);
const recordPanelRecordSaveResolutionPath = path.resolve(
  process.cwd(),
  "components/record-panel-controller-record-save-resolution.ts",
);
const recordPanelRecordSavePayloadPath = path.resolve(
  process.cwd(),
  "components/record-panel-controller-record-save-payload.ts",
);
const recordPanelRecordSavePayloadTypesPath = path.resolve(
  process.cwd(),
  "components/record-panel-controller-record-save-payload.types.ts",
);
const recordPanelRecordSaveCoordinatePath = path.resolve(
  process.cwd(),
  "components/record-panel-controller-record-save-coordinate.ts",
);
const recordPanelRecordLocationPayloadPath = path.resolve(
  process.cwd(),
  "components/record-panel-controller-record-location-payload.ts",
);
const recordPanelReminderActionsPath = path.resolve(
  process.cwd(),
  "components/record-panel-controller-reminder-actions.ts",
);
const recordPanelReminderSubmitActionPath = path.resolve(
  process.cwd(),
  "components/record-panel-controller-reminder-submit-action.ts",
);
const recordPanelReminderActionInputTypesPath = path.resolve(
  process.cwd(),
  "components/record-panel-controller-reminder-action-input.types.ts",
);
const recordPanelReminderSuccessHelpersPath = path.resolve(
  process.cwd(),
  "components/record-panel-controller-reminder-success-helpers.ts",
);
const recordPanelReminderHelpersPath = path.resolve(
  process.cwd(),
  "components/record-panel-controller-reminder-helpers.ts",
);
const recordPanelReminderErrorHelpersPath = path.resolve(
  process.cwd(),
  "components/record-panel-controller-reminder-error-helpers.ts",
);
const recordPanelReminderResolutionPath = path.resolve(
  process.cwd(),
  "components/record-panel-controller-reminder-resolution.ts",
);
const recordPanelReminderPayloadPath = path.resolve(
  process.cwd(),
  "components/record-panel-controller-reminder-payload.ts",
);
const recordPanelMediaStatusActionsPath = path.resolve(
  process.cwd(),
  "components/record-panel-controller-media-status-actions.ts",
);
const recordPanelMediaRefreshActionPath = path.resolve(
  process.cwd(),
  "components/record-panel-controller-media-refresh-action.ts",
);
const recordPanelMediaRetryActionPath = path.resolve(
  process.cwd(),
  "components/record-panel-controller-media-retry-action.ts",
);
const recordPanelMediaStatusActionInputTypesPath = path.resolve(
  process.cwd(),
  "components/record-panel-controller-media-status-action-input.types.ts",
);
const recordPanelMediaStatusHelpersPath = path.resolve(
  process.cwd(),
  "components/record-panel-controller-media-status-helpers.ts",
);
const recordPanelMediaStatusErrorHelpersPath = path.resolve(
  process.cwd(),
  "components/record-panel-controller-media-status-error-helpers.ts",
);
const recordPanelMediaStatusRunnerPath = path.resolve(
  process.cwd(),
  "components/record-panel-controller-media-status-runner.ts",
);
const recordPanelMediaFileActionsPath = path.resolve(
  process.cwd(),
  "components/record-panel-controller-media-file-actions.ts",
);
const recordPanelMediaFileActionInputTypesPath = path.resolve(
  process.cwd(),
  "components/record-panel-controller-media-file-action-input.types.ts",
);
const recordPanelMediaTransferActionsPath = path.resolve(
  process.cwd(),
  "components/record-panel-controller-media-transfer-actions.ts",
);
const recordPanelMediaTransferActionInputTypesPath = path.resolve(
  process.cwd(),
  "components/record-panel-controller-media-transfer-action-input.types.ts",
);
const recordPanelMediaUploadActionPath = path.resolve(
  process.cwd(),
  "components/record-panel-controller-media-upload-action.ts",
);
const recordPanelMediaDownloadActionPath = path.resolve(
  process.cwd(),
  "components/record-panel-controller-media-download-action.ts",
);
const recordPanelMediaDeleteActionPath = path.resolve(
  process.cwd(),
  "components/record-panel-controller-media-delete-action.ts",
);
const recordPanelMediaFileHelpersPath = path.resolve(
  process.cwd(),
  "components/record-panel-controller-media-file-helpers.ts",
);
const recordPanelMediaDownloadPath = path.resolve(
  process.cwd(),
  "components/record-panel-controller-media-download.ts",
);
const recordPanelDeadLetterActionsPath = path.resolve(
  process.cwd(),
  "components/record-panel-controller-dead-letter-actions.ts",
);
const recordPanelDeadLetterActionInputTypesPath = path.resolve(
  process.cwd(),
  "components/record-panel-controller-dead-letter-action-input.types.ts",
);
const recordPanelDeadLetterSelectionActionsPath = path.resolve(
  process.cwd(),
  "components/record-panel-controller-dead-letter-selection-actions.ts",
);
const recordPanelDeadLetterRetryActionPath = path.resolve(
  process.cwd(),
  "components/record-panel-controller-dead-letter-retry-action.ts",
);
const recordPanelDeadLetterHelpersPath = path.resolve(
  process.cwd(),
  "components/record-panel-controller-dead-letter-helpers.ts",
);
const recordPanelDeadLetterSelectionHelpersPath = path.resolve(
  process.cwd(),
  "components/record-panel-controller-dead-letter-selection-helpers.ts",
);
const recordPanelDeadLetterRetryHelpersPath = path.resolve(
  process.cwd(),
  "components/record-panel-controller-dead-letter-retry-helpers.ts",
);
const recordPanelMediaHandlersPath = path.resolve(
  process.cwd(),
  "components/record-panel-controller-media-handlers.ts",
);
const recordPanelMediaAssetActionsPath = path.resolve(
  process.cwd(),
  "components/record-panel-controller-media-asset-actions.ts",
);
const recordPanelMediaAssetActionInputTypesPath = path.resolve(
  process.cwd(),
  "components/record-panel-controller-media-asset-action-input.types.ts",
);
const legacyRecordPanelFormPath = path.resolve(process.cwd(), "components/record-panel-legacy-form.tsx");
const legacyRecordPanelActionsPath = path.resolve(process.cwd(), "components/record-panel-legacy-actions.ts");
const legacyRecordPanelActionInputTypesPath = path.resolve(
  process.cwd(),
  "components/record-panel-legacy-action-input.types.ts",
);
const legacyRecordPanelActionErrorPath = path.resolve(
  process.cwd(),
  "components/record-panel-legacy-action-error.ts",
);
const legacyRecordPanelSubmitActionPath = path.resolve(
  process.cwd(),
  "components/record-panel-legacy-submit-action.ts",
);
const legacyRecordPanelDeleteActionPath = path.resolve(
  process.cwd(),
  "components/record-panel-legacy-delete-action.ts",
);
const legacyRecordPanelUploadActionPath = path.resolve(
  process.cwd(),
  "components/record-panel-legacy-upload-action.ts",
);
const legacyRecordPanelFormTypesPath = path.resolve(
  process.cwd(),
  "components/record-panel-legacy-form.types.ts",
);
const legacyRecordPanelFormFieldsPath = path.resolve(
  process.cwd(),
  "components/record-panel-legacy-form-fields.tsx",
);
const legacyRecordPanelPrimaryFieldsPath = path.resolve(
  process.cwd(),
  "components/record-panel-legacy-primary-fields.tsx",
);
const legacyRecordPanelClassificationFieldsPath = path.resolve(
  process.cwd(),
  "components/record-panel-legacy-classification-fields.tsx",
);
const legacyRecordPanelFormMediaPath = path.resolve(
  process.cwd(),
  "components/record-panel-legacy-form-media.tsx",
);
const legacyRecordPanelFormActionsPath = path.resolve(
  process.cwd(),
  "components/record-panel-legacy-form-actions.tsx",
);
const legacyRecordPanelListPath = path.resolve(
  process.cwd(),
  "components/record-panel-legacy-list.tsx",
);
const legacyRecordPanelListItemPath = path.resolve(
  process.cwd(),
  "components/record-panel-legacy-list-item.tsx",
);
const legacyRecordPanelListEmptyPath = path.resolve(
  process.cwd(),
  "components/record-panel-legacy-list-empty.tsx",
);
const legacyRecordPanelStatsPath = path.resolve(
  process.cwd(),
  "components/record-panel-legacy-stats.tsx",
);
const legacyRecordPanelStatsHeaderPath = path.resolve(
  process.cwd(),
  "components/record-panel-legacy-stats-header.tsx",
);
const legacyRecordPanelStatsGridPath = path.resolve(
  process.cwd(),
  "components/record-panel-legacy-stats-grid.tsx",
);
const legacyRecordPanelSource = fs.readFileSync(legacyRecordPanelPath, "utf8");
const legacyRecordPanelViewDataSource = fs.readFileSync(legacyRecordPanelViewDataPath, "utf8");
const legacyRecordPanelActionsSource = fs.readFileSync(legacyRecordPanelActionsPath, "utf8");
const legacyRecordPanelActionInputTypesSource = fs.readFileSync(
  legacyRecordPanelActionInputTypesPath,
  "utf8",
);
const legacyRecordPanelActionErrorSource = fs.readFileSync(
  legacyRecordPanelActionErrorPath,
  "utf8",
);
const legacyRecordPanelSubmitActionSource = fs.readFileSync(
  legacyRecordPanelSubmitActionPath,
  "utf8",
);
const legacyRecordPanelDeleteActionSource = fs.readFileSync(
  legacyRecordPanelDeleteActionPath,
  "utf8",
);
const legacyRecordPanelUploadActionSource = fs.readFileSync(
  legacyRecordPanelUploadActionPath,
  "utf8",
);
const legacyRecordPanelFormSource = fs.readFileSync(legacyRecordPanelFormPath, "utf8");
const legacyRecordPanelFormTypesSource = fs.readFileSync(legacyRecordPanelFormTypesPath, "utf8");
const legacyRecordPanelFormFieldsSource = fs.readFileSync(legacyRecordPanelFormFieldsPath, "utf8");
const legacyRecordPanelPrimaryFieldsSource = fs.readFileSync(
  legacyRecordPanelPrimaryFieldsPath,
  "utf8",
);
const legacyRecordPanelClassificationFieldsSource = fs.readFileSync(
  legacyRecordPanelClassificationFieldsPath,
  "utf8",
);
const legacyRecordPanelFormMediaSource = fs.readFileSync(legacyRecordPanelFormMediaPath, "utf8");
const legacyRecordPanelFormActionsSource = fs.readFileSync(legacyRecordPanelFormActionsPath, "utf8");
const legacyRecordPanelListSource = fs.readFileSync(legacyRecordPanelListPath, "utf8");
const legacyRecordPanelListItemSource = fs.readFileSync(legacyRecordPanelListItemPath, "utf8");
const legacyRecordPanelListEmptySource = fs.readFileSync(legacyRecordPanelListEmptyPath, "utf8");
const legacyRecordPanelStatsSource = fs.readFileSync(legacyRecordPanelStatsPath, "utf8");
const legacyRecordPanelStatsHeaderSource = fs.readFileSync(
  legacyRecordPanelStatsHeaderPath,
  "utf8",
);
const legacyRecordPanelStatsGridSource = fs.readFileSync(
  legacyRecordPanelStatsGridPath,
  "utf8",
);
const source = fs.readFileSync(recordPanelPath, "utf8");
const recordPanelV2TypesSource = fs.readFileSync(recordPanelV2TypesPath, "utf8");
const recordPanelV2InputTypesSource = fs.readFileSync(recordPanelV2InputTypesPath, "utf8");
const recordPanelV2PropsDataTypesSource = fs.readFileSync(
  recordPanelV2PropsDataTypesPath,
  "utf8",
);
const recordPanelV2PropsActionTypesSource = fs.readFileSync(
  recordPanelV2PropsActionTypesPath,
  "utf8",
);
const workspacePropsSource = fs.readFileSync(recordPanelWorkspacePropsPath, "utf8");
const workspacePropsTypesSource = fs.readFileSync(recordPanelWorkspacePropsTypesPath, "utf8");
const workspacePropsCoreTypesSource = fs.readFileSync(recordPanelWorkspacePropsCoreTypesPath, "utf8");
const browseWorkspacePropsTypesSource = fs.readFileSync(
  recordPanelBrowseWorkspacePropsTypesPath,
  "utf8",
);
const browseWorkspacePropInputTypesSource = fs.readFileSync(
  recordPanelBrowseWorkspacePropInputTypesPath,
  "utf8",
);
const browseWorkspaceControllerInputTypesSource = fs.readFileSync(
  recordPanelBrowseWorkspaceControllerInputTypesPath,
  "utf8",
);
const editorWorkspacePropsTypesSource = fs.readFileSync(
  recordPanelEditorWorkspacePropsTypesPath,
  "utf8",
);
const editorWorkspacePropInputTypesSource = fs.readFileSync(
  recordPanelEditorWorkspacePropInputTypesPath,
  "utf8",
);
const editorWorkspaceControllerInputTypesSource = fs.readFileSync(
  recordPanelEditorWorkspaceControllerInputTypesPath,
  "utf8",
);
const editorWorkspaceControllerActionInputTypesSource = fs.readFileSync(
  recordPanelEditorWorkspaceControllerActionInputTypesPath,
  "utf8",
);
const editorWorkspaceControllerDisplayInputTypesSource = fs.readFileSync(
  recordPanelEditorWorkspaceControllerDisplayInputTypesPath,
  "utf8",
);
const editorWorkspaceControllerFormatterInputTypesSource = fs.readFileSync(
  recordPanelEditorWorkspaceControllerFormatterInputTypesPath,
  "utf8",
);
const editorWorkspacePropsSource = fs.readFileSync(recordPanelEditorWorkspacePropsPath, "utf8");
const browseWorkspacePropsSource = fs.readFileSync(recordPanelBrowseWorkspacePropsPath, "utf8");
const browseWorkspacePropsHelpersSource = fs.readFileSync(
  recordPanelBrowseWorkspacePropsHelpersPath,
  "utf8",
);
const browseWorkspaceFilterPropsSource = fs.readFileSync(
  recordPanelBrowseWorkspaceFilterPropsPath,
  "utf8",
);
const browseWorkspaceRecordPropsSource = fs.readFileSync(
  recordPanelBrowseWorkspaceRecordPropsPath,
  "utf8",
);
const browseWorkspaceCopyPropsSource = fs.readFileSync(
  recordPanelBrowseWorkspaceCopyPropsPath,
  "utf8",
);
const editorWorkspaceCopyPropsSource = fs.readFileSync(
  recordPanelEditorWorkspaceCopyPropsPath,
  "utf8",
);
const editorWorkspaceCopyPropsInputTypesSource = fs.readFileSync(
  recordPanelEditorWorkspaceCopyPropsInputTypesPath,
  "utf8",
);
const editorWorkspaceChannelCopyPropsSource = fs.readFileSync(
  recordPanelEditorWorkspaceChannelCopyPropsPath,
  "utf8",
);
const editorWorkspaceMediaCopyPropsSource = fs.readFileSync(
  recordPanelEditorWorkspaceMediaCopyPropsPath,
  "utf8",
);
const editorWorkspaceReminderCopyPropsSource = fs.readFileSync(
  recordPanelEditorWorkspaceReminderCopyPropsPath,
  "utf8",
);
const browseWorkspaceDraftLocationPropsSource = fs.readFileSync(
  recordPanelBrowseWorkspaceDraftLocationPropsPath,
  "utf8",
);
const browseWorkspaceInputSource = fs.readFileSync(recordPanelBrowseWorkspaceInputPath, "utf8");
const browseWorkspacePropInputSource = fs.readFileSync(
  recordPanelBrowseWorkspacePropInputPath,
  "utf8",
);
const browseWorkspaceControllerInputSource = fs.readFileSync(
  recordPanelBrowseWorkspaceControllerInputPath,
  "utf8",
);
const editorWorkspacePropsInputsSource = fs.readFileSync(
  recordPanelEditorWorkspacePropsInputsPath,
  "utf8",
);
const editorWorkspaceBasePropsInputSource = fs.readFileSync(
  recordPanelEditorWorkspaceBasePropsInputPath,
  "utf8",
);
const editorWorkspaceActionPropsInputSource = fs.readFileSync(
  recordPanelEditorWorkspaceActionPropsInputPath,
  "utf8",
);
const editorWorkspaceActionPropsInputTypesSource = fs.readFileSync(
  recordPanelEditorWorkspaceActionPropsInputTypesPath,
  "utf8",
);
const editorWorkspaceActionPropsSource = fs.readFileSync(
  recordPanelEditorWorkspaceActionPropsPath,
  "utf8",
);
const editorWorkspaceDeadLetterActionPropsSource = fs.readFileSync(
  recordPanelEditorWorkspaceDeadLetterActionPropsPath,
  "utf8",
);
const editorWorkspacePrimaryActionPropsSource = fs.readFileSync(
  recordPanelEditorWorkspacePrimaryActionPropsPath,
  "utf8",
);
const editorWorkspaceBasePropsSource = fs.readFileSync(
  recordPanelEditorWorkspaceBasePropsPath,
  "utf8",
);
const editorWorkspaceBasePropsTypesSource = fs.readFileSync(
  recordPanelEditorWorkspaceBasePropsTypesPath,
  "utf8",
);
const editorWorkspaceBaseSessionPropsSource = fs.readFileSync(
  recordPanelEditorWorkspaceBaseSessionPropsPath,
  "utf8",
);
const editorWorkspaceBaseStatePropsSource = fs.readFileSync(
  recordPanelEditorWorkspaceBaseStatePropsPath,
  "utf8",
);
const editorWorkspaceBaseFormPropsSource = fs.readFileSync(
  recordPanelEditorWorkspaceBaseFormPropsPath,
  "utf8",
);
const editorWorkspaceBaseMediaPropsSource = fs.readFileSync(
  recordPanelEditorWorkspaceBaseMediaPropsPath,
  "utf8",
);
const editorWorkspaceBaseSessionPropsTypesSource = fs.readFileSync(
  recordPanelEditorWorkspaceBaseSessionPropsTypesPath,
  "utf8",
);
const editorWorkspaceBaseStatePropsTypesSource = fs.readFileSync(
  recordPanelEditorWorkspaceBaseStatePropsTypesPath,
  "utf8",
);
const editorWorkspaceBaseFormPropsTypesSource = fs.readFileSync(
  recordPanelEditorWorkspaceBaseFormPropsTypesPath,
  "utf8",
);
const editorWorkspaceBaseMediaPropsTypesSource = fs.readFileSync(
  recordPanelEditorWorkspaceBaseMediaPropsTypesPath,
  "utf8",
);
const editorWorkspaceInputSource = fs.readFileSync(recordPanelEditorWorkspaceInputPath, "utf8");
const editorWorkspacePropInputSource = fs.readFileSync(
  recordPanelEditorWorkspacePropInputPath,
  "utf8",
);
const editorWorkspaceControllerInputSource = fs.readFileSync(
  recordPanelEditorWorkspaceControllerInputPath,
  "utf8",
);
const editorWorkspaceControllerActionInputSource = fs.readFileSync(
  recordPanelEditorWorkspaceControllerActionInputPath,
  "utf8",
);
const editorWorkspaceControllerDisplayInputSource = fs.readFileSync(
  recordPanelEditorWorkspaceControllerDisplayInputPath,
  "utf8",
);
const editorWorkspaceControllerFormatterInputSource = fs.readFileSync(
  recordPanelEditorWorkspaceControllerFormatterInputPath,
  "utf8",
);
const shellPropsSource = fs.readFileSync(recordPanelShellPropsPath, "utf8");
const shellViewPropsSource = fs.readFileSync(recordPanelShellViewPropsPath, "utf8");
const controllerSource = fs.readFileSync(recordPanelControllerPath, "utf8");
const controllerSyncSource = fs.readFileSync(recordPanelControllerSyncPath, "utf8");
const controllerSyncTypesSource = fs.readFileSync(recordPanelControllerSyncTypesPath, "utf8");
const controllerSyncInputSource = fs.readFileSync(recordPanelControllerSyncInputPath, "utf8");
const controllerDeadLetterSyncSource = fs.readFileSync(
  recordPanelControllerDeadLetterSyncPath,
  "utf8",
);
const controllerSelectedRecordSyncSource = fs.readFileSync(
  recordPanelControllerSelectedRecordSyncPath,
  "utf8",
);
const controllerSelectedRecordSyncTypesSource = fs.readFileSync(
  recordPanelControllerSelectedRecordSyncTypesPath,
  "utf8",
);
const controllerSelectedRecordFormSyncSource = fs.readFileSync(
  recordPanelControllerSelectedRecordFormSyncPath,
  "utf8",
);
const controllerSelectedRecordReminderSyncSource = fs.readFileSync(
  recordPanelControllerSelectedRecordReminderSyncPath,
  "utf8",
);
const controllerFilterSyncSource = fs.readFileSync(recordPanelControllerFilterSyncPath, "utf8");
const controllerStateSource = fs.readFileSync(recordPanelControllerStatePath, "utf8");
const controllerFormStateSource = fs.readFileSync(recordPanelControllerFormStatePath, "utf8");
const controllerRecordFormStateSource = fs.readFileSync(
  recordPanelControllerRecordFormStatePath,
  "utf8",
);
const controllerSupportingFormStateSource = fs.readFileSync(
  recordPanelControllerSupportingFormStatePath,
  "utf8",
);
const controllerMediaStateSource = fs.readFileSync(recordPanelControllerMediaStatePath, "utf8");
const controllerBrowseStateSource = fs.readFileSync(recordPanelControllerBrowseStatePath, "utf8");
const controllerResultSource = fs.readFileSync(recordPanelControllerResultPath, "utf8");
const controllerStateResultSource = fs.readFileSync(recordPanelControllerStateResultPath, "utf8");
const controllerViewDataResultSource = fs.readFileSync(
  recordPanelControllerViewDataResultPath,
  "utf8",
);
const controllerCoreViewDataResultSource = fs.readFileSync(
  recordPanelControllerCoreViewDataResultPath,
  "utf8",
);
const controllerLocalizedViewDataResultSource = fs.readFileSync(
  recordPanelControllerLocalizedViewDataResultPath,
  "utf8",
);
const controllerHandlerGroupsInputSource = fs.readFileSync(
  recordPanelControllerHandlerGroupsInputPath,
  "utf8",
);
const controllerHandlerGroupsInputTypesSource = fs.readFileSync(
  recordPanelControllerHandlerGroupsInputTypesPath,
  "utf8",
);
const controllerHandlerGroupsPropsInputSource = fs.readFileSync(
  recordPanelControllerHandlerGroupsPropsInputPath,
  "utf8",
);
const controllerHandlerGroupsStateInputSource = fs.readFileSync(
  recordPanelControllerHandlerGroupsStateInputPath,
  "utf8",
);
const controllerHandlerGroupsViewDataInputSource = fs.readFileSync(
  recordPanelControllerHandlerGroupsViewDataInputPath,
  "utf8",
);
const controllerViewDataSource = fs.readFileSync(recordPanelControllerViewDataPath, "utf8");
const controllerLocalizedViewDataHookSource = fs.readFileSync(
  recordPanelControllerLocalizedViewDataHookPath,
  "utf8",
);
const controllerViewDataHelpersSource = fs.readFileSync(
  recordPanelControllerViewDataHelpersPath,
  "utf8",
);
const controllerRecordViewDataSource = fs.readFileSync(
  recordPanelControllerRecordViewDataPath,
  "utf8",
);
const controllerSelectedRecordViewDataSource = fs.readFileSync(
  recordPanelControllerSelectedRecordViewDataPath,
  "utf8",
);
const controllerLocationViewDataSource = fs.readFileSync(
  recordPanelControllerLocationViewDataPath,
  "utf8",
);
const controllerLocalizedViewDataSource = fs.readFileSync(
  recordPanelControllerLocalizedViewDataPath,
  "utf8",
);
const recordSummaryHelpersSource = fs.readFileSync(recordPanelRecordSummaryHelpersPath, "utf8");
const mediaViewDataHelpersSource = fs.readFileSync(
  recordPanelMediaViewDataHelpersPath,
  "utf8",
);
const recordHandlersSource = fs.readFileSync(recordPanelRecordHandlersPath, "utf8");
const handlerGroupInputsSource = fs.readFileSync(recordPanelHandlerGroupInputsPath, "utf8");
const handlerGroupInputTypesSource = fs.readFileSync(recordPanelHandlerGroupInputTypesPath, "utf8");
const handlerGroupPropsInputTypesSource = fs.readFileSync(
  recordPanelHandlerGroupPropsInputTypesPath,
  "utf8",
);
const handlerGroupStateInputTypesSource = fs.readFileSync(
  recordPanelHandlerGroupStateInputTypesPath,
  "utf8",
);
const handlerGroupViewDataInputTypesSource = fs.readFileSync(
  recordPanelHandlerGroupViewDataInputTypesPath,
  "utf8",
);
const recordHandlerInputSource = fs.readFileSync(recordPanelRecordHandlerInputPath, "utf8");
const recordHandlerInputTypesSource = fs.readFileSync(
  recordPanelRecordHandlerInputTypesPath,
  "utf8",
);
const mediaHandlerInputSource = fs.readFileSync(recordPanelMediaHandlerInputPath, "utf8");
const mediaHandlerInputTypesSource = fs.readFileSync(
  recordPanelMediaHandlerInputTypesPath,
  "utf8",
);
const formActionsSource = fs.readFileSync(recordPanelFormActionsPath, "utf8");
const formActionInputTypesSource = fs.readFileSync(
  recordPanelFormActionInputTypesPath,
  "utf8",
);
const filterActionsSource = fs.readFileSync(recordPanelFilterActionsPath, "utf8");
const filterActionInputTypesSource = fs.readFileSync(
  recordPanelFilterActionInputTypesPath,
  "utf8",
);
const filterApplyActionSource = fs.readFileSync(recordPanelFilterApplyActionPath, "utf8");
const filterPresetActionsSource = fs.readFileSync(recordPanelFilterPresetActionsPath, "utf8");
const filterPresetActionInputTypesSource = fs.readFileSync(
  recordPanelFilterPresetActionInputTypesPath,
  "utf8",
);
const filterPresetSaveActionSource = fs.readFileSync(recordPanelFilterPresetSaveActionPath, "utf8");
const filterPresetDeleteActionSource = fs.readFileSync(
  recordPanelFilterPresetDeleteActionPath,
  "utf8",
);
const filterHelpersSource = fs.readFileSync(recordPanelFilterHelpersPath, "utf8");
const filterErrorHelpersSource = fs.readFileSync(recordPanelFilterErrorHelpersPath, "utf8");
const filterPresetNameSource = fs.readFileSync(recordPanelFilterPresetNamePath, "utf8");
const recordSubmitActionsSource = fs.readFileSync(recordPanelRecordSubmitActionsPath, "utf8");
const recordSubmitActionInputTypesSource = fs.readFileSync(
  recordPanelRecordSubmitActionInputTypesPath,
  "utf8",
);
const recordSaveActionsSource = fs.readFileSync(recordPanelRecordSaveActionsPath, "utf8");
const recordSaveSubmitActionSource = fs.readFileSync(
  recordPanelRecordSaveSubmitActionPath,
  "utf8",
);
const recordSaveActionInputTypesSource = fs.readFileSync(
  recordPanelRecordSaveActionInputTypesPath,
  "utf8",
);
const recordSaveSuccessHelpersSource = fs.readFileSync(
  recordPanelRecordSaveSuccessHelpersPath,
  "utf8",
);
const recordDeleteActionsSource = fs.readFileSync(recordPanelRecordDeleteActionsPath, "utf8");
const recordDeleteRunActionSource = fs.readFileSync(
  recordPanelRecordDeleteRunActionPath,
  "utf8",
);
const recordDeleteActionInputTypesSource = fs.readFileSync(
  recordPanelRecordDeleteActionInputTypesPath,
  "utf8",
);
const recordDeleteHelpersSource = fs.readFileSync(recordPanelRecordDeleteHelpersPath, "utf8");
const recordSaveHelpersSource = fs.readFileSync(recordPanelRecordSaveHelpersPath, "utf8");
const recordSaveErrorHelpersSource = fs.readFileSync(
  recordPanelRecordSaveErrorHelpersPath,
  "utf8",
);
const recordSaveResolutionSource = fs.readFileSync(recordPanelRecordSaveResolutionPath, "utf8");
const recordSavePayloadSource = fs.readFileSync(recordPanelRecordSavePayloadPath, "utf8");
const recordSavePayloadTypesSource = fs.readFileSync(
  recordPanelRecordSavePayloadTypesPath,
  "utf8",
);
const recordSaveCoordinateSource = fs.readFileSync(
  recordPanelRecordSaveCoordinatePath,
  "utf8",
);
const recordLocationPayloadSource = fs.readFileSync(recordPanelRecordLocationPayloadPath, "utf8");
const reminderActionsSource = fs.readFileSync(recordPanelReminderActionsPath, "utf8");
const reminderSubmitActionSource = fs.readFileSync(recordPanelReminderSubmitActionPath, "utf8");
const reminderActionInputTypesSource = fs.readFileSync(
  recordPanelReminderActionInputTypesPath,
  "utf8",
);
const reminderSuccessHelpersSource = fs.readFileSync(
  recordPanelReminderSuccessHelpersPath,
  "utf8",
);
const reminderHelpersSource = fs.readFileSync(recordPanelReminderHelpersPath, "utf8");
const reminderErrorHelpersSource = fs.readFileSync(recordPanelReminderErrorHelpersPath, "utf8");
const reminderResolutionSource = fs.readFileSync(recordPanelReminderResolutionPath, "utf8");
const reminderPayloadSource = fs.readFileSync(recordPanelReminderPayloadPath, "utf8");
const mediaStatusActionsSource = fs.readFileSync(recordPanelMediaStatusActionsPath, "utf8");
const mediaRefreshActionSource = fs.readFileSync(recordPanelMediaRefreshActionPath, "utf8");
const mediaRetryActionSource = fs.readFileSync(recordPanelMediaRetryActionPath, "utf8");
const mediaStatusActionInputTypesSource = fs.readFileSync(
  recordPanelMediaStatusActionInputTypesPath,
  "utf8",
);
const mediaStatusHelpersSource = fs.readFileSync(recordPanelMediaStatusHelpersPath, "utf8");
const mediaStatusErrorHelpersSource = fs.readFileSync(
  recordPanelMediaStatusErrorHelpersPath,
  "utf8",
);
const mediaStatusRunnerSource = fs.readFileSync(recordPanelMediaStatusRunnerPath, "utf8");
const mediaFileActionsSource = fs.readFileSync(recordPanelMediaFileActionsPath, "utf8");
const mediaFileActionInputTypesSource = fs.readFileSync(
  recordPanelMediaFileActionInputTypesPath,
  "utf8",
);
const mediaTransferActionsSource = fs.readFileSync(recordPanelMediaTransferActionsPath, "utf8");
const mediaTransferActionInputTypesSource = fs.readFileSync(
  recordPanelMediaTransferActionInputTypesPath,
  "utf8",
);
const mediaUploadActionSource = fs.readFileSync(recordPanelMediaUploadActionPath, "utf8");
const mediaDownloadActionSource = fs.readFileSync(recordPanelMediaDownloadActionPath, "utf8");
const mediaDeleteActionSource = fs.readFileSync(recordPanelMediaDeleteActionPath, "utf8");
const mediaFileHelpersSource = fs.readFileSync(recordPanelMediaFileHelpersPath, "utf8");
const mediaDownloadSource = fs.readFileSync(recordPanelMediaDownloadPath, "utf8");
const deadLetterActionsSource = fs.readFileSync(recordPanelDeadLetterActionsPath, "utf8");
const deadLetterActionInputTypesSource = fs.readFileSync(
  recordPanelDeadLetterActionInputTypesPath,
  "utf8",
);
const mediaAssetActionInputTypesSource = fs.readFileSync(
  recordPanelMediaAssetActionInputTypesPath,
  "utf8",
);
const deadLetterSelectionActionsSource = fs.readFileSync(
  recordPanelDeadLetterSelectionActionsPath,
  "utf8",
);
const deadLetterRetryActionSource = fs.readFileSync(recordPanelDeadLetterRetryActionPath, "utf8");
const deadLetterHelpersSource = fs.readFileSync(recordPanelDeadLetterHelpersPath, "utf8");
const deadLetterSelectionHelpersSource = fs.readFileSync(
  recordPanelDeadLetterSelectionHelpersPath,
  "utf8",
);
const deadLetterRetryHelpersSource = fs.readFileSync(
  recordPanelDeadLetterRetryHelpersPath,
  "utf8",
);
const mediaAssetActionsSource = fs.readFileSync(recordPanelMediaAssetActionsPath, "utf8");
const mediaHandlersSource = fs.readFileSync(recordPanelMediaHandlersPath, "utf8");
const normalizedLines = source.split(/\r?\n/);
const legacyRecordPanelLines = legacyRecordPanelSource.split(/\r?\n/).length;
const legacyRecordPanelViewDataLines = legacyRecordPanelViewDataSource.split(/\r?\n/).length;
const legacyRecordPanelActionsLines = legacyRecordPanelActionsSource.split(/\r?\n/).length;
const legacyRecordPanelActionInputTypesLines =
  legacyRecordPanelActionInputTypesSource.split(/\r?\n/).length;
const legacyRecordPanelActionErrorLines = legacyRecordPanelActionErrorSource.split(/\r?\n/).length;
const legacyRecordPanelSubmitActionLines = legacyRecordPanelSubmitActionSource.split(/\r?\n/).length;
const legacyRecordPanelDeleteActionLines = legacyRecordPanelDeleteActionSource.split(/\r?\n/).length;
const legacyRecordPanelUploadActionLines = legacyRecordPanelUploadActionSource.split(/\r?\n/).length;
const legacyRecordPanelFormLines = legacyRecordPanelFormSource.split(/\r?\n/).length;
const legacyRecordPanelFormTypesLines = legacyRecordPanelFormTypesSource.split(/\r?\n/).length;
const legacyRecordPanelFormFieldsLines = legacyRecordPanelFormFieldsSource.split(/\r?\n/).length;
const legacyRecordPanelPrimaryFieldsLines =
  legacyRecordPanelPrimaryFieldsSource.split(/\r?\n/).length;
const legacyRecordPanelClassificationFieldsLines =
  legacyRecordPanelClassificationFieldsSource.split(/\r?\n/).length;
const legacyRecordPanelFormMediaLines = legacyRecordPanelFormMediaSource.split(/\r?\n/).length;
const legacyRecordPanelFormActionsLines =
  legacyRecordPanelFormActionsSource.split(/\r?\n/).length;
const legacyRecordPanelListLines = legacyRecordPanelListSource.split(/\r?\n/).length;
const legacyRecordPanelListItemLines = legacyRecordPanelListItemSource.split(/\r?\n/).length;
const legacyRecordPanelListEmptyLines = legacyRecordPanelListEmptySource.split(/\r?\n/).length;
const legacyRecordPanelStatsLines = legacyRecordPanelStatsSource.split(/\r?\n/).length;
const legacyRecordPanelStatsHeaderLines =
  legacyRecordPanelStatsHeaderSource.split(/\r?\n/).length;
const legacyRecordPanelStatsGridLines = legacyRecordPanelStatsGridSource.split(/\r?\n/).length;
const recordPanelV2TypesLines = recordPanelV2TypesSource.split(/\r?\n/).length;
const recordPanelV2InputTypesLines = recordPanelV2InputTypesSource.split(/\r?\n/).length;
const recordPanelV2PropsDataTypesLines = recordPanelV2PropsDataTypesSource.split(/\r?\n/).length;
const recordPanelV2PropsActionTypesLines =
  recordPanelV2PropsActionTypesSource.split(/\r?\n/).length;
const workspacePropsLines = workspacePropsSource.split(/\r?\n/).length;
const workspacePropsTypesLines = workspacePropsTypesSource.split(/\r?\n/).length;
const workspacePropsCoreTypesLines = workspacePropsCoreTypesSource.split(/\r?\n/).length;
const browseWorkspacePropsTypesLines = browseWorkspacePropsTypesSource.split(/\r?\n/).length;
const browseWorkspacePropInputTypesLines =
  browseWorkspacePropInputTypesSource.split(/\r?\n/).length;
const browseWorkspaceControllerInputTypesLines =
  browseWorkspaceControllerInputTypesSource.split(/\r?\n/).length;
const editorWorkspacePropsTypesLines = editorWorkspacePropsTypesSource.split(/\r?\n/).length;
const editorWorkspacePropInputTypesLines =
  editorWorkspacePropInputTypesSource.split(/\r?\n/).length;
const editorWorkspaceControllerInputTypesLines =
  editorWorkspaceControllerInputTypesSource.split(/\r?\n/).length;
const editorWorkspaceControllerActionInputTypesLines =
  editorWorkspaceControllerActionInputTypesSource.split(/\r?\n/).length;
const editorWorkspaceControllerDisplayInputTypesLines =
  editorWorkspaceControllerDisplayInputTypesSource.split(/\r?\n/).length;
const editorWorkspaceControllerFormatterInputTypesLines =
  editorWorkspaceControllerFormatterInputTypesSource.split(/\r?\n/).length;
const editorWorkspacePropsLines = editorWorkspacePropsSource.split(/\r?\n/).length;
const browseWorkspacePropsLines = browseWorkspacePropsSource.split(/\r?\n/).length;
const browseWorkspacePropsHelpersLines = browseWorkspacePropsHelpersSource.split(/\r?\n/).length;
const browseWorkspaceFilterPropsLines = browseWorkspaceFilterPropsSource.split(/\r?\n/).length;
const browseWorkspaceRecordPropsLines = browseWorkspaceRecordPropsSource.split(/\r?\n/).length;
const browseWorkspaceCopyPropsLines = browseWorkspaceCopyPropsSource.split(/\r?\n/).length;
const editorWorkspaceCopyPropsLines = editorWorkspaceCopyPropsSource.split(/\r?\n/).length;
const editorWorkspaceCopyPropsInputTypesLines =
  editorWorkspaceCopyPropsInputTypesSource.split(/\r?\n/).length;
const editorWorkspaceChannelCopyPropsLines =
  editorWorkspaceChannelCopyPropsSource.split(/\r?\n/).length;
const editorWorkspaceMediaCopyPropsLines =
  editorWorkspaceMediaCopyPropsSource.split(/\r?\n/).length;
const editorWorkspaceReminderCopyPropsLines =
  editorWorkspaceReminderCopyPropsSource.split(/\r?\n/).length;
const browseWorkspaceDraftLocationPropsLines =
  browseWorkspaceDraftLocationPropsSource.split(/\r?\n/).length;
const browseWorkspaceInputLines = browseWorkspaceInputSource.split(/\r?\n/).length;
const browseWorkspacePropInputLines = browseWorkspacePropInputSource.split(/\r?\n/).length;
const browseWorkspaceControllerInputLines =
  browseWorkspaceControllerInputSource.split(/\r?\n/).length;
const editorWorkspacePropsInputsLines = editorWorkspacePropsInputsSource.split(/\r?\n/).length;
const editorWorkspaceBasePropsInputLines =
  editorWorkspaceBasePropsInputSource.split(/\r?\n/).length;
const editorWorkspaceActionPropsInputLines =
  editorWorkspaceActionPropsInputSource.split(/\r?\n/).length;
const editorWorkspaceActionPropsInputTypesLines =
  editorWorkspaceActionPropsInputTypesSource.split(/\r?\n/).length;
const editorWorkspaceActionPropsLines = editorWorkspaceActionPropsSource.split(/\r?\n/).length;
const editorWorkspaceDeadLetterActionPropsLines =
  editorWorkspaceDeadLetterActionPropsSource.split(/\r?\n/).length;
const editorWorkspacePrimaryActionPropsLines =
  editorWorkspacePrimaryActionPropsSource.split(/\r?\n/).length;
const editorWorkspaceBasePropsLines = editorWorkspaceBasePropsSource.split(/\r?\n/).length;
const editorWorkspaceBasePropsTypesLines =
  editorWorkspaceBasePropsTypesSource.split(/\r?\n/).length;
const editorWorkspaceBaseSessionPropsLines =
  editorWorkspaceBaseSessionPropsSource.split(/\r?\n/).length;
const editorWorkspaceBaseStatePropsLines =
  editorWorkspaceBaseStatePropsSource.split(/\r?\n/).length;
const editorWorkspaceBaseFormPropsLines =
  editorWorkspaceBaseFormPropsSource.split(/\r?\n/).length;
const editorWorkspaceBaseMediaPropsLines =
  editorWorkspaceBaseMediaPropsSource.split(/\r?\n/).length;
const editorWorkspaceBaseSessionPropsTypesLines =
  editorWorkspaceBaseSessionPropsTypesSource.split(/\r?\n/).length;
const editorWorkspaceBaseStatePropsTypesLines =
  editorWorkspaceBaseStatePropsTypesSource.split(/\r?\n/).length;
const editorWorkspaceBaseFormPropsTypesLines =
  editorWorkspaceBaseFormPropsTypesSource.split(/\r?\n/).length;
const editorWorkspaceBaseMediaPropsTypesLines =
  editorWorkspaceBaseMediaPropsTypesSource.split(/\r?\n/).length;
const editorWorkspaceInputLines = editorWorkspaceInputSource.split(/\r?\n/).length;
const editorWorkspacePropInputLines = editorWorkspacePropInputSource.split(/\r?\n/).length;
const editorWorkspaceControllerInputLines =
  editorWorkspaceControllerInputSource.split(/\r?\n/).length;
const editorWorkspaceControllerActionInputLines =
  editorWorkspaceControllerActionInputSource.split(/\r?\n/).length;
const editorWorkspaceControllerDisplayInputLines =
  editorWorkspaceControllerDisplayInputSource.split(/\r?\n/).length;
const editorWorkspaceControllerFormatterInputLines =
  editorWorkspaceControllerFormatterInputSource.split(/\r?\n/).length;
const shellPropsLines = shellPropsSource.split(/\r?\n/).length;
const shellViewPropsLines = shellViewPropsSource.split(/\r?\n/).length;
const controllerLines = controllerSource.split(/\r?\n/).length;
const controllerSyncLines = controllerSyncSource.split(/\r?\n/).length;
const controllerSyncTypesLines = controllerSyncTypesSource.split(/\r?\n/).length;
const controllerSyncInputLines = controllerSyncInputSource.split(/\r?\n/).length;
const controllerDeadLetterSyncLines = controllerDeadLetterSyncSource.split(/\r?\n/).length;
const controllerSelectedRecordSyncLines = controllerSelectedRecordSyncSource.split(/\r?\n/).length;
const controllerSelectedRecordSyncTypesLines =
  controllerSelectedRecordSyncTypesSource.split(/\r?\n/).length;
const controllerSelectedRecordFormSyncLines =
  controllerSelectedRecordFormSyncSource.split(/\r?\n/).length;
const controllerSelectedRecordReminderSyncLines =
  controllerSelectedRecordReminderSyncSource.split(/\r?\n/).length;
const controllerFilterSyncLines = controllerFilterSyncSource.split(/\r?\n/).length;
const controllerStateLines = controllerStateSource.split(/\r?\n/).length;
const controllerFormStateLines = controllerFormStateSource.split(/\r?\n/).length;
const controllerRecordFormStateLines = controllerRecordFormStateSource.split(/\r?\n/).length;
const controllerSupportingFormStateLines =
  controllerSupportingFormStateSource.split(/\r?\n/).length;
const controllerMediaStateLines = controllerMediaStateSource.split(/\r?\n/).length;
const controllerBrowseStateLines = controllerBrowseStateSource.split(/\r?\n/).length;
const controllerResultLines = controllerResultSource.split(/\r?\n/).length;
const controllerStateResultLines = controllerStateResultSource.split(/\r?\n/).length;
const controllerViewDataResultLines =
  controllerViewDataResultSource.split(/\r?\n/).length;
const controllerCoreViewDataResultLines =
  controllerCoreViewDataResultSource.split(/\r?\n/).length;
const controllerLocalizedViewDataResultLines =
  controllerLocalizedViewDataResultSource.split(/\r?\n/).length;
const controllerHandlerGroupsInputLines =
  controllerHandlerGroupsInputSource.split(/\r?\n/).length;
const controllerHandlerGroupsInputTypesLines =
  controllerHandlerGroupsInputTypesSource.split(/\r?\n/).length;
const controllerHandlerGroupsPropsInputLines =
  controllerHandlerGroupsPropsInputSource.split(/\r?\n/).length;
const controllerHandlerGroupsStateInputLines =
  controllerHandlerGroupsStateInputSource.split(/\r?\n/).length;
const controllerHandlerGroupsViewDataInputLines =
  controllerHandlerGroupsViewDataInputSource.split(/\r?\n/).length;
const controllerViewDataLines = controllerViewDataSource.split(/\r?\n/).length;
const controllerLocalizedViewDataHookLines =
  controllerLocalizedViewDataHookSource.split(/\r?\n/).length;
const controllerViewDataHelpersLines = controllerViewDataHelpersSource.split(/\r?\n/).length;
const controllerRecordViewDataLines = controllerRecordViewDataSource.split(/\r?\n/).length;
const controllerSelectedRecordViewDataLines =
  controllerSelectedRecordViewDataSource.split(/\r?\n/).length;
const controllerLocationViewDataLines = controllerLocationViewDataSource.split(/\r?\n/).length;
const controllerLocalizedViewDataLines = controllerLocalizedViewDataSource.split(/\r?\n/).length;
const recordSummaryHelpersLines = recordSummaryHelpersSource.split(/\r?\n/).length;
const mediaViewDataHelpersLines = mediaViewDataHelpersSource.split(/\r?\n/).length;
const recordHandlersLines = recordHandlersSource.split(/\r?\n/).length;
const handlerGroupInputsLines = handlerGroupInputsSource.split(/\r?\n/).length;
const handlerGroupInputTypesLines = handlerGroupInputTypesSource.split(/\r?\n/).length;
const handlerGroupPropsInputTypesLines = handlerGroupPropsInputTypesSource.split(/\r?\n/).length;
const handlerGroupStateInputTypesLines = handlerGroupStateInputTypesSource.split(/\r?\n/).length;
const handlerGroupViewDataInputTypesLines =
  handlerGroupViewDataInputTypesSource.split(/\r?\n/).length;
const recordHandlerInputLines = recordHandlerInputSource.split(/\r?\n/).length;
const recordHandlerInputTypesLines = recordHandlerInputTypesSource.split(/\r?\n/).length;
const mediaHandlerInputLines = mediaHandlerInputSource.split(/\r?\n/).length;
const mediaHandlerInputTypesLines = mediaHandlerInputTypesSource.split(/\r?\n/).length;
const formActionsLines = formActionsSource.split(/\r?\n/).length;
const formActionInputTypesLines = formActionInputTypesSource.split(/\r?\n/).length;
const filterActionsLines = filterActionsSource.split(/\r?\n/).length;
const filterActionInputTypesLines = filterActionInputTypesSource.split(/\r?\n/).length;
const filterApplyActionLines = filterApplyActionSource.split(/\r?\n/).length;
const filterPresetActionsLines = filterPresetActionsSource.split(/\r?\n/).length;
const filterPresetActionInputTypesLines =
  filterPresetActionInputTypesSource.split(/\r?\n/).length;
const filterPresetSaveActionLines = filterPresetSaveActionSource.split(/\r?\n/).length;
const filterPresetDeleteActionLines = filterPresetDeleteActionSource.split(/\r?\n/).length;
const filterHelpersLines = filterHelpersSource.split(/\r?\n/).length;
const filterErrorHelpersLines = filterErrorHelpersSource.split(/\r?\n/).length;
const filterPresetNameLines = filterPresetNameSource.split(/\r?\n/).length;
const recordSubmitActionsLines = recordSubmitActionsSource.split(/\r?\n/).length;
const recordSubmitActionInputTypesLines =
  recordSubmitActionInputTypesSource.split(/\r?\n/).length;
const recordSaveActionsLines = recordSaveActionsSource.split(/\r?\n/).length;
const recordSaveSubmitActionLines = recordSaveSubmitActionSource.split(/\r?\n/).length;
const recordSaveActionInputTypesLines = recordSaveActionInputTypesSource.split(/\r?\n/).length;
const recordSaveSuccessHelpersLines = recordSaveSuccessHelpersSource.split(/\r?\n/).length;
const recordDeleteActionsLines = recordDeleteActionsSource.split(/\r?\n/).length;
const recordDeleteRunActionLines = recordDeleteRunActionSource.split(/\r?\n/).length;
const recordDeleteActionInputTypesLines =
  recordDeleteActionInputTypesSource.split(/\r?\n/).length;
const recordDeleteHelpersLines = recordDeleteHelpersSource.split(/\r?\n/).length;
const recordSaveHelpersLines = recordSaveHelpersSource.split(/\r?\n/).length;
const recordSaveErrorHelpersLines = recordSaveErrorHelpersSource.split(/\r?\n/).length;
const recordSaveResolutionLines = recordSaveResolutionSource.split(/\r?\n/).length;
const recordSavePayloadLines = recordSavePayloadSource.split(/\r?\n/).length;
const recordSavePayloadTypesLines = recordSavePayloadTypesSource.split(/\r?\n/).length;
const recordSaveCoordinateLines = recordSaveCoordinateSource.split(/\r?\n/).length;
const recordLocationPayloadLines = recordLocationPayloadSource.split(/\r?\n/).length;
const reminderActionsLines = reminderActionsSource.split(/\r?\n/).length;
const reminderSubmitActionLines = reminderSubmitActionSource.split(/\r?\n/).length;
const reminderActionInputTypesLines = reminderActionInputTypesSource.split(/\r?\n/).length;
const reminderSuccessHelpersLines = reminderSuccessHelpersSource.split(/\r?\n/).length;
const reminderHelpersLines = reminderHelpersSource.split(/\r?\n/).length;
const reminderErrorHelpersLines = reminderErrorHelpersSource.split(/\r?\n/).length;
const reminderResolutionLines = reminderResolutionSource.split(/\r?\n/).length;
const reminderPayloadLines = reminderPayloadSource.split(/\r?\n/).length;
const mediaStatusActionsLines = mediaStatusActionsSource.split(/\r?\n/).length;
const mediaRefreshActionLines = mediaRefreshActionSource.split(/\r?\n/).length;
const mediaRetryActionLines = mediaRetryActionSource.split(/\r?\n/).length;
const mediaStatusActionInputTypesLines =
  mediaStatusActionInputTypesSource.split(/\r?\n/).length;
const mediaStatusHelpersLines = mediaStatusHelpersSource.split(/\r?\n/).length;
const mediaStatusErrorHelpersLines = mediaStatusErrorHelpersSource.split(/\r?\n/).length;
const mediaStatusRunnerLines = mediaStatusRunnerSource.split(/\r?\n/).length;
const mediaFileActionsLines = mediaFileActionsSource.split(/\r?\n/).length;
const mediaFileActionInputTypesLines =
  mediaFileActionInputTypesSource.split(/\r?\n/).length;
const mediaTransferActionsLines = mediaTransferActionsSource.split(/\r?\n/).length;
const mediaTransferActionInputTypesLines =
  mediaTransferActionInputTypesSource.split(/\r?\n/).length;
const mediaUploadActionLines = mediaUploadActionSource.split(/\r?\n/).length;
const mediaDownloadActionLines = mediaDownloadActionSource.split(/\r?\n/).length;
const mediaDeleteActionLines = mediaDeleteActionSource.split(/\r?\n/).length;
const mediaFileHelpersLines = mediaFileHelpersSource.split(/\r?\n/).length;
const mediaDownloadLines = mediaDownloadSource.split(/\r?\n/).length;
const deadLetterActionsLines = deadLetterActionsSource.split(/\r?\n/).length;
const deadLetterActionInputTypesLines =
  deadLetterActionInputTypesSource.split(/\r?\n/).length;
const deadLetterSelectionActionsLines =
  deadLetterSelectionActionsSource.split(/\r?\n/).length;
const deadLetterRetryActionLines = deadLetterRetryActionSource.split(/\r?\n/).length;
const deadLetterHelpersLines = deadLetterHelpersSource.split(/\r?\n/).length;
const deadLetterSelectionHelpersLines =
  deadLetterSelectionHelpersSource.split(/\r?\n/).length;
const deadLetterRetryHelpersLines = deadLetterRetryHelpersSource.split(/\r?\n/).length;
const mediaAssetActionsLines = mediaAssetActionsSource.split(/\r?\n/).length;
const mediaAssetActionInputTypesLines =
  mediaAssetActionInputTypesSource.split(/\r?\n/).length;
const mediaHandlersLines = mediaHandlersSource.split(/\r?\n/).length;

if (!source.includes('import { useRecordPanelController } from "./use-record-panel-controller";')) {
  throw new Error("record-panel-v2.tsx must import useRecordPanelController");
}

if (!source.includes('from "./record-panel-v2-shell-props";')) {
  throw new Error("record-panel-v2.tsx must import record-panel-v2-shell-props");
}

if (!source.includes('import { RecordPanelHeader } from "./record-panel-header";')) {
  throw new Error("record-panel-v2.tsx must import RecordPanelHeader");
}

if (!source.includes("useRecordPanelController(")) {
  throw new Error("record-panel-v2.tsx must delegate controller logic to useRecordPanelController");
}

if (!source.includes("const controller = useRecordPanelController({")) {
  if (!source.includes("const controller = useRecordPanelController(buildRecordPanelControllerInput(props));")) {
    throw new Error("record-panel-v2.tsx must keep controller state grouped behind a controller object");
  }
}

if (!source.includes("buildRecordPanelShellViewProps({ controller, props })")) {
  throw new Error("record-panel-v2.tsx must delegate shell view prop shaping to buildRecordPanelShellViewProps");
}

if (!source.includes("<RecordPanelHeader")) {
  throw new Error("record-panel-v2.tsx must delegate top header rendering to RecordPanelHeader");
}

for (const requiredWorkspacePropsExport of [
  'export { buildRecordBrowseWorkspaceProps } from "./record-panel-v2-browse-workspace-props";',
  'export { buildRecordEditorWorkspaceProps } from "./record-panel-v2-editor-workspace-props";',
]) {
  if (!workspacePropsSource.includes(requiredWorkspacePropsExport)) {
    throw new Error(`record-panel-v2-workspace-props.ts must remain a stable re-export boundary: ${requiredWorkspacePropsExport}`);
  }
}

for (const forbiddenToken of [
  "useState(",
  "useEffect(",
  "useMemo(",
  "useStoredLocale(",
  "fetchMediaBlob(",
  "const handle",
  "const {\n    locale,",
  "authToken: props.authToken,",
  "onCreateRecord={() => props.onSelectRecord(null)}",
  'from "./record-panel-v2-workspace-props";',
  "buildRecordBrowseWorkspaceInput({ controller, props })",
  "buildRecordEditorWorkspaceInput({ controller, props })",
  "buildRecordBrowseWorkspaceProps(",
  "buildRecordEditorWorkspaceProps(",
  "buildRecordPanelHeaderProps({",
  "<RecordBrowseWorkspace\n          applyPresetLabel=",
  "<RecordEditorWorkspace\n          authToken=",
  '<div className="eyebrow">{panelCopy.workspace}</div>',
  "{panelCopy.structuredResults}",
  "{panelCopy.newRecord}",
]) {
  if (source.includes(forbiddenToken)) {
    throw new Error(`record-panel-v2.tsx must remain a thin shell; found forbidden token: ${forbiddenToken}`);
  }
}

const maxAllowedLines = 125;
if (normalizedLines.length > maxAllowedLines) {
  throw new Error(`record-panel-v2.tsx exceeded ${maxAllowedLines} lines: ${normalizedLines.length}`);
}

const maxWorkspacePropsLines = 20;
if (workspacePropsLines > maxWorkspacePropsLines) {
  throw new Error(
    `record-panel-v2-workspace-props.ts exceeded ${maxWorkspacePropsLines} lines: ${workspacePropsLines}`,
  );
}

for (const requiredWorkspacePropsTypesExport of [
  'export type {',
  'RecordBrowseWorkspaceProps,',
  'RecordEditorWorkspaceProps,',
  'RecordPanelDetailCopy,',
  'RecordBrowseWorkspaceTypeSupport,',
  '} from "./record-panel-v2-workspace-props-core.types";',
  'export type { BuildRecordBrowseWorkspacePropsInput } from "./record-panel-v2-browse-workspace-props.types";',
  'export type { BuildRecordEditorWorkspacePropsInput } from "./record-panel-v2-editor-workspace-props.types";',
]) {
  if (!workspacePropsTypesSource.includes(requiredWorkspacePropsTypesExport)) {
    throw new Error(
      `record-panel-v2-workspace-props.types.ts must remain a stable re-export boundary: ${requiredWorkspacePropsTypesExport}`,
    );
  }
}

const maxWorkspacePropsTypesLines = 15;
if (workspacePropsTypesLines > maxWorkspacePropsTypesLines) {
  throw new Error(
    `record-panel-v2-workspace-props.types.ts exceeded ${maxWorkspacePropsTypesLines} lines: ${workspacePropsTypesLines}`,
  );
}

for (const requiredWorkspacePropsCoreTypesImport of [
  'import type { ComponentProps, Dispatch, SetStateAction } from "react";',
  'import { RecordBrowseWorkspace } from "./record-browse-workspace";',
  'import { RecordEditorWorkspace } from "./record-editor-workspace";',
]) {
  if (!workspacePropsCoreTypesSource.includes(requiredWorkspacePropsCoreTypesImport)) {
    throw new Error(
      `record-panel-v2-workspace-props-core.types.ts must import shared workspace type dependencies: ${requiredWorkspacePropsCoreTypesImport}`,
    );
  }
}

for (const requiredWorkspacePropsCoreTypesUsage of [
  "export type RecordBrowseWorkspaceProps = ComponentProps<typeof RecordBrowseWorkspace>;",
  "export type RecordEditorWorkspaceProps = ComponentProps<typeof RecordEditorWorkspace>;",
  'export type RecordPanelDetailCopy = ReturnType<typeof getRecordPanelDetailBundle>["copy"];',
  "export type RecordBrowseWorkspaceTypeSupport = {",
  'setViewMode: Dispatch<SetStateAction<"timeline" | "list">>;',
]) {
  if (!workspacePropsCoreTypesSource.includes(requiredWorkspacePropsCoreTypesUsage)) {
    throw new Error(
      `record-panel-v2-workspace-props-core.types.ts must own shared workspace prop contracts: ${requiredWorkspacePropsCoreTypesUsage}`,
    );
  }
}

const maxWorkspacePropsCoreTypesLines = 25;
if (workspacePropsCoreTypesLines > maxWorkspacePropsCoreTypesLines) {
  throw new Error(
    `record-panel-v2-workspace-props-core.types.ts exceeded ${maxWorkspacePropsCoreTypesLines} lines: ${workspacePropsCoreTypesLines}`,
  );
}

for (const requiredRecordPanelV2TypesImport of [
  'from "./record-panel-v2-props-action.types";',
  'from "./record-panel-v2-props-data.types";',
  'from "./record-panel-v2-input.types";',
]) {
  if (!recordPanelV2TypesSource.includes(requiredRecordPanelV2TypesImport)) {
    throw new Error(
      `record-panel-v2.types.ts must import delegated v2 type slices: ${requiredRecordPanelV2TypesImport}`,
    );
  }
}

for (const requiredRecordPanelV2TypesUsage of [
  "export type { RecordPanelBulkRetryMediaDeadLetterInput, RecordPanelCreateReminderInput, RecordPanelLocationFilterInput, ReminderUpdateInput, SaveRecordInput, ViewMode } from \"./record-panel-v2-input.types\";",
  "export type RecordPanelV2Props = RecordPanelV2ActionProps & RecordPanelV2DataProps;",
]) {
  if (!recordPanelV2TypesSource.includes(requiredRecordPanelV2TypesUsage)) {
    throw new Error(
      `record-panel-v2.types.ts must compose delegated v2 contracts: ${requiredRecordPanelV2TypesUsage}`,
    );
  }
}

for (const forbiddenRecordPanelV2TypesToken of [
  'from "../lib/types";',
  'MediaAsset,',
  'export type SaveRecordInput = {',
  'export type ReminderUpdateInput = Partial<{',
  'export type RecordPanelV2Props = {',
]) {
  if (recordPanelV2TypesSource.includes(forbiddenRecordPanelV2TypesToken)) {
    throw new Error(
      `record-panel-v2.types.ts must keep v2 contract internals delegated: ${forbiddenRecordPanelV2TypesToken}`,
    );
  }
}

const maxRecordPanelV2TypesLines = 10;
if (recordPanelV2TypesLines > maxRecordPanelV2TypesLines) {
  throw new Error(
    `record-panel-v2.types.ts exceeded ${maxRecordPanelV2TypesLines} lines: ${recordPanelV2TypesLines}`,
  );
}

for (const requiredRecordPanelV2InputTypesImport of ['from "../lib/types";']) {
  if (!recordPanelV2InputTypesSource.includes(requiredRecordPanelV2InputTypesImport)) {
    throw new Error(
      `record-panel-v2-input.types.ts must import v2 input type dependencies: ${requiredRecordPanelV2InputTypesImport}`,
    );
  }
}

for (const requiredRecordPanelV2InputTypesUsage of [
  'export type ViewMode = "timeline" | "list";',
  "export type SaveRecordInput = {",
  "export type ReminderUpdateInput = Partial<{",
  "export type RecordPanelCreateReminderInput = {",
  "export type RecordPanelBulkRetryMediaDeadLetterInput = {",
  'export type RecordPanelLocationFilterInput = Pick<RecordFilterState, "placeQuery" | "reviewStatus" | "mappedOnly">;',
]) {
  if (!recordPanelV2InputTypesSource.includes(requiredRecordPanelV2InputTypesUsage)) {
    throw new Error(
      `record-panel-v2-input.types.ts must own shared v2 input contracts: ${requiredRecordPanelV2InputTypesUsage}`,
    );
  }
}

const maxRecordPanelV2InputTypesLines = 10;
if (recordPanelV2InputTypesLines > maxRecordPanelV2InputTypesLines) {
  throw new Error(
    `record-panel-v2-input.types.ts exceeded ${maxRecordPanelV2InputTypesLines} lines: ${recordPanelV2InputTypesLines}`,
  );
}

for (const requiredRecordPanelV2PropsDataTypesImport of ['from "../lib/types";']) {
  if (!recordPanelV2PropsDataTypesSource.includes(requiredRecordPanelV2PropsDataTypesImport)) {
    throw new Error(
      `record-panel-v2-props-data.types.ts must import v2 data type dependencies: ${requiredRecordPanelV2PropsDataTypesImport}`,
    );
  }
}

for (const requiredRecordPanelV2PropsDataTypesUsage of [
  "export type RecordPanelV2DataProps = {",
  "authToken: string | null;",
  "mediaStorageSummary: MediaStorageSummary | null;",
  "filteringRecords: boolean;",
]) {
  if (!recordPanelV2PropsDataTypesSource.includes(requiredRecordPanelV2PropsDataTypesUsage)) {
    throw new Error(
      `record-panel-v2-props-data.types.ts must own v2 data prop contracts: ${requiredRecordPanelV2PropsDataTypesUsage}`,
    );
  }
}

const maxRecordPanelV2PropsDataTypesLines = 10;
if (recordPanelV2PropsDataTypesLines > maxRecordPanelV2PropsDataTypesLines) {
  throw new Error(
    `record-panel-v2-props-data.types.ts exceeded ${maxRecordPanelV2PropsDataTypesLines} lines: ${recordPanelV2PropsDataTypesLines}`,
  );
}

for (const requiredRecordPanelV2PropsActionTypesImport of [
  'from "../lib/types";',
  'from "./record-panel-v2-input.types";',
]) {
  if (!recordPanelV2PropsActionTypesSource.includes(requiredRecordPanelV2PropsActionTypesImport)) {
    throw new Error(
      `record-panel-v2-props-action.types.ts must import v2 action type dependencies: ${requiredRecordPanelV2PropsActionTypesImport}`,
    );
  }
}

for (const requiredRecordPanelV2PropsActionTypesUsage of [
  "export type RecordPanelV2ActionProps = {",
  "onSaveRecord: (input: SaveRecordInput) => Promise<void>;",
  "onCreateReminder: (input: RecordPanelCreateReminderInput) => Promise<void>;",
  "onBulkRetryMediaDeadLetter: (input: RecordPanelBulkRetryMediaDeadLetterInput) => Promise<void>;",
  "onApplyLocationFilter: (nextFilter: RecordPanelLocationFilterInput) => Promise<void>;",
]) {
  if (!recordPanelV2PropsActionTypesSource.includes(requiredRecordPanelV2PropsActionTypesUsage)) {
    throw new Error(
      `record-panel-v2-props-action.types.ts must own v2 action prop contracts: ${requiredRecordPanelV2PropsActionTypesUsage}`,
    );
  }
}

const maxRecordPanelV2PropsActionTypesLines = 10;
if (recordPanelV2PropsActionTypesLines > maxRecordPanelV2PropsActionTypesLines) {
  throw new Error(
    `record-panel-v2-props-action.types.ts exceeded ${maxRecordPanelV2PropsActionTypesLines} lines: ${recordPanelV2PropsActionTypesLines}`,
  );
}

for (const requiredBrowseWorkspacePropsTypesImport of [
  'from "./record-panel-v2-browse-workspace-controller-input.types";',
  'from "./record-panel-v2-browse-workspace-prop-input.types";',
]) {
  if (!browseWorkspacePropsTypesSource.includes(requiredBrowseWorkspacePropsTypesImport)) {
    throw new Error(
      `record-panel-v2-browse-workspace-props.types.ts must import browse workspace type dependencies: ${requiredBrowseWorkspacePropsTypesImport}`,
    );
  }
}

for (const requiredBrowseWorkspacePropsTypesUsage of [
  "export type BuildRecordBrowseWorkspacePropsInput =",
  "BuildRecordBrowseWorkspacePropInput &",
  "BuildRecordBrowseWorkspaceControllerInput;",
]) {
  if (!browseWorkspacePropsTypesSource.includes(requiredBrowseWorkspacePropsTypesUsage)) {
    throw new Error(
      `record-panel-v2-browse-workspace-props.types.ts must own browse workspace input contracts: ${requiredBrowseWorkspacePropsTypesUsage}`,
    );
  }
}

const maxBrowseWorkspacePropsTypesLines = 10;
if (browseWorkspacePropsTypesLines > maxBrowseWorkspacePropsTypesLines) {
  throw new Error(
    `record-panel-v2-browse-workspace-props.types.ts exceeded ${maxBrowseWorkspacePropsTypesLines} lines: ${browseWorkspacePropsTypesLines}`,
  );
}

for (const requiredBrowseWorkspacePropInputTypesImport of [
  'from "./record-panel-v2.types";',
]) {
  if (!browseWorkspacePropInputTypesSource.includes(requiredBrowseWorkspacePropInputTypesImport)) {
    throw new Error(
      `record-panel-v2-browse-workspace-prop-input.types.ts must import browse workspace prop-input type dependencies: ${requiredBrowseWorkspacePropInputTypesImport}`,
    );
  }
}

for (const requiredBrowseWorkspacePropInputTypesUsage of [
  "export type BuildRecordBrowseWorkspacePropInput = Pick<",
  '"onApplyLocationFilter"',
  '"onSelectRecord"',
]) {
  if (!browseWorkspacePropInputTypesSource.includes(requiredBrowseWorkspacePropInputTypesUsage)) {
    throw new Error(
      `record-panel-v2-browse-workspace-prop-input.types.ts must own browse workspace prop-input contracts: ${requiredBrowseWorkspacePropInputTypesUsage}`,
    );
  }
}

const maxBrowseWorkspacePropInputTypesLines = 20;
if (browseWorkspacePropInputTypesLines > maxBrowseWorkspacePropInputTypesLines) {
  throw new Error(
    `record-panel-v2-browse-workspace-prop-input.types.ts exceeded ${maxBrowseWorkspacePropInputTypesLines} lines: ${browseWorkspacePropInputTypesLines}`,
  );
}

for (const requiredBrowseWorkspaceControllerInputTypesImport of [
  'from "./record-panel-v2-workspace-props-core.types";',
]) {
  if (!browseWorkspaceControllerInputTypesSource.includes(requiredBrowseWorkspaceControllerInputTypesImport)) {
    throw new Error(
      `record-panel-v2-browse-workspace-controller-input.types.ts must import browse workspace controller-input type dependencies: ${requiredBrowseWorkspaceControllerInputTypesImport}`,
    );
  }
}

for (const requiredBrowseWorkspaceControllerInputTypesUsage of [
  "export type BuildRecordBrowseWorkspaceControllerInput =",
  "RecordBrowseWorkspaceTypeSupport & {",
  "detailCopy: RecordPanelDetailCopy;",
  'summarizeRecordFilterLabel: (filter: RecordBrowseWorkspaceTypeSupport["filterDraft"]) => string;',
]) {
  if (!browseWorkspaceControllerInputTypesSource.includes(requiredBrowseWorkspaceControllerInputTypesUsage)) {
    throw new Error(
      `record-panel-v2-browse-workspace-controller-input.types.ts must own browse workspace controller-input contracts: ${requiredBrowseWorkspaceControllerInputTypesUsage}`,
    );
  }
}

const maxBrowseWorkspaceControllerInputTypesLines = 25;
if (browseWorkspaceControllerInputTypesLines > maxBrowseWorkspaceControllerInputTypesLines) {
  throw new Error(
    `record-panel-v2-browse-workspace-controller-input.types.ts exceeded ${maxBrowseWorkspaceControllerInputTypesLines} lines: ${browseWorkspaceControllerInputTypesLines}`,
  );
}

for (const requiredEditorWorkspacePropsTypesImport of [
  'from "./record-panel-v2-editor-workspace-controller-input.types";',
  'from "./record-panel-v2-editor-workspace-prop-input.types";',
]) {
  if (!editorWorkspacePropsTypesSource.includes(requiredEditorWorkspacePropsTypesImport)) {
    throw new Error(
      `record-panel-v2-editor-workspace-props.types.ts must import editor workspace type dependencies: ${requiredEditorWorkspacePropsTypesImport}`,
    );
  }
}

for (const requiredEditorWorkspacePropsTypesUsage of [
  "export type BuildRecordEditorWorkspacePropsInput =",
  "BuildRecordEditorWorkspacePropInput &",
  "BuildRecordEditorWorkspaceControllerInput;",
]) {
  if (!editorWorkspacePropsTypesSource.includes(requiredEditorWorkspacePropsTypesUsage)) {
    throw new Error(
      `record-panel-v2-editor-workspace-props.types.ts must own editor workspace input contracts: ${requiredEditorWorkspacePropsTypesUsage}`,
    );
  }
}

const maxEditorWorkspacePropsTypesLines = 10;
if (editorWorkspacePropsTypesLines > maxEditorWorkspacePropsTypesLines) {
  throw new Error(
    `record-panel-v2-editor-workspace-props.types.ts exceeded ${maxEditorWorkspacePropsTypesLines} lines: ${editorWorkspacePropsTypesLines}`,
  );
}

for (const requiredEditorWorkspacePropInputTypesImport of [
  'from "./record-panel-v2.types";',
]) {
  if (!editorWorkspacePropInputTypesSource.includes(requiredEditorWorkspacePropInputTypesImport)) {
    throw new Error(
      `record-panel-v2-editor-workspace-prop-input.types.ts must import editor workspace prop-input type dependencies: ${requiredEditorWorkspacePropInputTypesImport}`,
    );
  }
}

for (const requiredEditorWorkspacePropInputTypesUsage of [
  "export type BuildRecordEditorWorkspacePropInput = Pick<",
  '"mediaProcessingOverview"',
  '"onUpdateReminder"',
]) {
  if (!editorWorkspacePropInputTypesSource.includes(requiredEditorWorkspacePropInputTypesUsage)) {
    throw new Error(
      `record-panel-v2-editor-workspace-prop-input.types.ts must own editor workspace prop-input contracts: ${requiredEditorWorkspacePropInputTypesUsage}`,
    );
  }
}

const maxEditorWorkspacePropInputTypesLines = 20;
if (editorWorkspacePropInputTypesLines > maxEditorWorkspacePropInputTypesLines) {
  throw new Error(
    `record-panel-v2-editor-workspace-prop-input.types.ts exceeded ${maxEditorWorkspacePropInputTypesLines} lines: ${editorWorkspacePropInputTypesLines}`,
  );
}

for (const requiredEditorWorkspaceControllerInputTypesImport of [
  'from "./record-panel-v2-editor-workspace-controller-action-input.types";',
  'from "./record-panel-v2-editor-workspace-controller-display-input.types";',
  'from "./record-panel-v2-editor-workspace-controller-formatter-input.types";',
]) {
  if (!editorWorkspaceControllerInputTypesSource.includes(requiredEditorWorkspaceControllerInputTypesImport)) {
    throw new Error(
      `record-panel-v2-editor-workspace-controller-input.types.ts must import delegated controller-input type slices: ${requiredEditorWorkspaceControllerInputTypesImport}`,
    );
  }
}

for (const requiredEditorWorkspaceControllerInputTypesUsage of [
  "export type BuildRecordEditorWorkspaceControllerInput =",
  "BuildRecordEditorWorkspaceControllerActionInput &",
  "BuildRecordEditorWorkspaceControllerDisplayInput &",
  "BuildRecordEditorWorkspaceControllerFormatterInput;",
]) {
  if (!editorWorkspaceControllerInputTypesSource.includes(requiredEditorWorkspaceControllerInputTypesUsage)) {
    throw new Error(
      `record-panel-v2-editor-workspace-controller-input.types.ts must compose delegated controller-input type slices: ${requiredEditorWorkspaceControllerInputTypesUsage}`,
    );
  }
}

const maxEditorWorkspaceControllerInputTypesLines = 10;
if (editorWorkspaceControllerInputTypesLines > maxEditorWorkspaceControllerInputTypesLines) {
  throw new Error(
    `record-panel-v2-editor-workspace-controller-input.types.ts exceeded ${maxEditorWorkspaceControllerInputTypesLines} lines: ${editorWorkspaceControllerInputTypesLines}`,
  );
}

for (const requiredEditorWorkspaceControllerActionInputTypesImport of [
  'from "./record-panel-v2-shell-props.types";',
]) {
  if (!editorWorkspaceControllerActionInputTypesSource.includes(requiredEditorWorkspaceControllerActionInputTypesImport)) {
    throw new Error(
      `record-panel-v2-editor-workspace-controller-action-input.types.ts must import action-input type dependencies: ${requiredEditorWorkspaceControllerActionInputTypesImport}`,
    );
  }
}

for (const requiredEditorWorkspaceControllerActionInputTypesUsage of [
  "export type BuildRecordEditorWorkspaceControllerActionInput = Pick<",
  "RecordPanelController,",
  '"handleBulkRetryDeadLetter"',
  '"handleUpload"',
  '"setReminderForm"',
]) {
  if (!editorWorkspaceControllerActionInputTypesSource.includes(requiredEditorWorkspaceControllerActionInputTypesUsage)) {
    throw new Error(
      `record-panel-v2-editor-workspace-controller-action-input.types.ts must own controller action-input contracts: ${requiredEditorWorkspaceControllerActionInputTypesUsage}`,
    );
  }
}

const maxEditorWorkspaceControllerActionInputTypesLines = 20;
if (editorWorkspaceControllerActionInputTypesLines > maxEditorWorkspaceControllerActionInputTypesLines) {
  throw new Error(
    `record-panel-v2-editor-workspace-controller-action-input.types.ts exceeded ${maxEditorWorkspaceControllerActionInputTypesLines} lines: ${editorWorkspaceControllerActionInputTypesLines}`,
  );
}

for (const requiredEditorWorkspaceControllerDisplayInputTypesImport of [
  'from "./record-panel-v2-shell-props.types";',
]) {
  if (!editorWorkspaceControllerDisplayInputTypesSource.includes(requiredEditorWorkspaceControllerDisplayInputTypesImport)) {
    throw new Error(
      `record-panel-v2-editor-workspace-controller-display-input.types.ts must import display-input type dependencies: ${requiredEditorWorkspaceControllerDisplayInputTypesImport}`,
    );
  }
}

for (const requiredEditorWorkspaceControllerDisplayInputTypesUsage of [
  "export type BuildRecordEditorWorkspaceControllerDisplayInput = Pick<",
  "RecordPanelController,",
  '"detailCopy"',
  '"selectedRecordMediaSizeLabel"',
  '"uploading"',
]) {
  if (!editorWorkspaceControllerDisplayInputTypesSource.includes(requiredEditorWorkspaceControllerDisplayInputTypesUsage)) {
    throw new Error(
      `record-panel-v2-editor-workspace-controller-display-input.types.ts must own controller display-input contracts: ${requiredEditorWorkspaceControllerDisplayInputTypesUsage}`,
    );
  }
}

const maxEditorWorkspaceControllerDisplayInputTypesLines = 30;
if (editorWorkspaceControllerDisplayInputTypesLines > maxEditorWorkspaceControllerDisplayInputTypesLines) {
  throw new Error(
    `record-panel-v2-editor-workspace-controller-display-input.types.ts exceeded ${maxEditorWorkspaceControllerDisplayInputTypesLines} lines: ${editorWorkspaceControllerDisplayInputTypesLines}`,
  );
}

for (const requiredEditorWorkspaceControllerFormatterInputTypesImport of [
  'from "./record-panel-v2-shell-props.types";',
]) {
  if (!editorWorkspaceControllerFormatterInputTypesSource.includes(requiredEditorWorkspaceControllerFormatterInputTypesImport)) {
    throw new Error(
      `record-panel-v2-editor-workspace-controller-formatter-input.types.ts must import formatter-input type dependencies: ${requiredEditorWorkspaceControllerFormatterInputTypesImport}`,
    );
  }
}

for (const requiredEditorWorkspaceControllerFormatterInputTypesUsage of [
  "export type BuildRecordEditorWorkspaceControllerFormatterInput = Pick<",
  "RecordPanelController,",
  '"formatFileCountLabel"',
  '"formatReviewStatusLabel"',
  '"summarizeHistoryActionLabel"',
]) {
  if (!editorWorkspaceControllerFormatterInputTypesSource.includes(requiredEditorWorkspaceControllerFormatterInputTypesUsage)) {
    throw new Error(
      `record-panel-v2-editor-workspace-controller-formatter-input.types.ts must own controller formatter-input contracts: ${requiredEditorWorkspaceControllerFormatterInputTypesUsage}`,
    );
  }
}

const maxEditorWorkspaceControllerFormatterInputTypesLines = 15;
if (editorWorkspaceControllerFormatterInputTypesLines > maxEditorWorkspaceControllerFormatterInputTypesLines) {
  throw new Error(
    `record-panel-v2-editor-workspace-controller-formatter-input.types.ts exceeded ${maxEditorWorkspaceControllerFormatterInputTypesLines} lines: ${editorWorkspaceControllerFormatterInputTypesLines}`,
  );
}

for (const requiredBrowseWorkspacePropsImport of [
  'from "./record-panel-v2-workspace-props.types";',
  'from "./record-panel-v2-browse-workspace-props-helpers";',
]) {
  if (!browseWorkspacePropsSource.includes(requiredBrowseWorkspacePropsImport)) {
    throw new Error(
      `record-panel-v2-browse-workspace-props.ts must import delegated browse prop helpers: ${requiredBrowseWorkspacePropsImport}`,
    );
  }
}

for (const requiredBrowseWorkspacePropsUsage of [
  "buildRecordBrowseWorkspaceCopyProps(input)",
  "buildRecordBrowseWorkspaceDraftLocationProps(input)",
  "buildRecordBrowseWorkspaceFilterProps(input)",
  "buildRecordBrowseWorkspaceRecordProps(input)",
  "...copyProps",
  "...draftLocationProps",
  "...filterProps",
  "...recordProps",
]) {
  if (!browseWorkspacePropsSource.includes(requiredBrowseWorkspacePropsUsage)) {
    throw new Error(
      `record-panel-v2-browse-workspace-props.ts must delegate browse prop mapping: ${requiredBrowseWorkspacePropsUsage}`,
    );
  }
}

for (const forbiddenBrowseWorkspacePropsToken of [
  "applyPresetLabel: panelCopy.applyPreset",
  "avoidRecordLabel: detailCopy.avoidLabel",
  "draftLocation: canWriteWorkspace ? form.location ?? null : null",
  "onDraftLocationChange: canWriteWorkspace",
  "timelineViewLabel: detailCopy.timelineView",
  "visibleRecordsLabel: panelCopy.visibleRecords",
  "currentFilterSummary: input.summarizeRecordFilterLabel(input.recordFilter)",
  "onApplyFilter: input.handleApplyFilter",
  "visibleRecordCount: input.records.length",
]) {
  if (browseWorkspacePropsSource.includes(forbiddenBrowseWorkspacePropsToken)) {
    throw new Error(
      `record-panel-v2-browse-workspace-props.ts must keep browse copy and draft-location internals delegated: ${forbiddenBrowseWorkspacePropsToken}`,
    );
  }
}

const maxBrowseWorkspacePropsLines = 75;
if (browseWorkspacePropsLines > maxBrowseWorkspacePropsLines) {
  throw new Error(
    `record-panel-v2-browse-workspace-props.ts exceeded ${maxBrowseWorkspacePropsLines} lines: ${browseWorkspacePropsLines}`,
  );
}

for (const requiredBrowseWorkspacePropsHelpersExport of [
  'from "./record-panel-v2-browse-workspace-copy-props";',
  'from "./record-panel-v2-browse-workspace-draft-location-props";',
  'from "./record-panel-v2-browse-workspace-filter-props";',
  'from "./record-panel-v2-browse-workspace-record-props";',
]) {
  if (!browseWorkspacePropsHelpersSource.includes(requiredBrowseWorkspacePropsHelpersExport)) {
    throw new Error(
      `record-panel-v2-browse-workspace-props-helpers.ts must remain a stable browse helper boundary: ${requiredBrowseWorkspacePropsHelpersExport}`,
    );
  }
}

for (const requiredBrowseWorkspacePropsHelpersUsage of [
  "export { buildRecordBrowseWorkspaceCopyProps }",
  "export { buildRecordBrowseWorkspaceDraftLocationProps }",
  "export { buildRecordBrowseWorkspaceFilterProps }",
  "export { buildRecordBrowseWorkspaceRecordProps }",
]) {
  if (!browseWorkspacePropsHelpersSource.includes(requiredBrowseWorkspacePropsHelpersUsage)) {
    throw new Error(
      `record-panel-v2-browse-workspace-props-helpers.ts must expose delegated browse helpers: ${requiredBrowseWorkspacePropsHelpersUsage}`,
    );
  }
}

const maxBrowseWorkspacePropsHelpersLines = 15;
if (browseWorkspacePropsHelpersLines > maxBrowseWorkspacePropsHelpersLines) {
  throw new Error(
    `record-panel-v2-browse-workspace-props-helpers.ts exceeded ${maxBrowseWorkspacePropsHelpersLines} lines: ${browseWorkspacePropsHelpersLines}`,
  );
}

for (const requiredBrowseWorkspaceFilterPropsImport of [
  'from "./record-panel-v2-workspace-props.types";',
]) {
  if (!browseWorkspaceFilterPropsSource.includes(requiredBrowseWorkspaceFilterPropsImport)) {
    throw new Error(
      `record-panel-v2-browse-workspace-filter-props.ts must import filter prop contracts: ${requiredBrowseWorkspaceFilterPropsImport}`,
    );
  }
}

for (const requiredBrowseWorkspaceFilterPropsUsage of [
  "export function buildRecordBrowseWorkspaceFilterProps(input: BuildRecordBrowseWorkspacePropsInput)",
  "currentFilterSummary: input.summarizeRecordFilterLabel(input.recordFilter)",
  "onApplyFilter: input.handleApplyFilter",
  "summarizeRecordFilterLabel: input.summarizeRecordFilterLabel",
]) {
  if (!browseWorkspaceFilterPropsSource.includes(requiredBrowseWorkspaceFilterPropsUsage)) {
    throw new Error(
      `record-panel-v2-browse-workspace-filter-props.ts must own filter prop mapping: ${requiredBrowseWorkspaceFilterPropsUsage}`,
    );
  }
}

const maxBrowseWorkspaceFilterPropsLines = 25;
if (browseWorkspaceFilterPropsLines > maxBrowseWorkspaceFilterPropsLines) {
  throw new Error(
    `record-panel-v2-browse-workspace-filter-props.ts exceeded ${maxBrowseWorkspaceFilterPropsLines} lines: ${browseWorkspaceFilterPropsLines}`,
  );
}

for (const requiredBrowseWorkspaceRecordPropsImport of [
  'from "./record-panel-v2-workspace-props.types";',
]) {
  if (!browseWorkspaceRecordPropsSource.includes(requiredBrowseWorkspaceRecordPropsImport)) {
    throw new Error(
      `record-panel-v2-browse-workspace-record-props.ts must import record prop contracts: ${requiredBrowseWorkspaceRecordPropsImport}`,
    );
  }
}

for (const requiredBrowseWorkspaceRecordPropsUsage of [
  "export function buildRecordBrowseWorkspaceRecordProps(input: BuildRecordBrowseWorkspacePropsInput)",
  "avoidCount: input.avoidCount",
  "panelCopy: input.panelCopy",
  "visibleRecordCount: input.records.length",
]) {
  if (!browseWorkspaceRecordPropsSource.includes(requiredBrowseWorkspaceRecordPropsUsage)) {
    throw new Error(
      `record-panel-v2-browse-workspace-record-props.ts must own record prop mapping: ${requiredBrowseWorkspaceRecordPropsUsage}`,
    );
  }
}

const maxBrowseWorkspaceRecordPropsLines = 30;
if (browseWorkspaceRecordPropsLines > maxBrowseWorkspaceRecordPropsLines) {
  throw new Error(
    `record-panel-v2-browse-workspace-record-props.ts exceeded ${maxBrowseWorkspaceRecordPropsLines} lines: ${browseWorkspaceRecordPropsLines}`,
  );
}

for (const requiredBrowseWorkspaceCopyPropsImport of [
  'from "./record-panel-v2-workspace-props.types";',
]) {
  if (!browseWorkspaceCopyPropsSource.includes(requiredBrowseWorkspaceCopyPropsImport)) {
    throw new Error(
      `record-panel-v2-browse-workspace-copy-props.ts must import browse workspace copy contracts: ${requiredBrowseWorkspaceCopyPropsImport}`,
    );
  }
}

for (const requiredBrowseWorkspaceCopyPropsUsage of [
  "export function buildRecordBrowseWorkspaceCopyProps({",
  "applyPresetLabel: panelCopy.applyPreset",
  "timelineViewLabel: detailCopy.timelineView",
  "visibleRecordsLabel: panelCopy.visibleRecords",
]) {
  if (!browseWorkspaceCopyPropsSource.includes(requiredBrowseWorkspaceCopyPropsUsage)) {
    throw new Error(
      `record-panel-v2-browse-workspace-copy-props.ts must own browse copy details: ${requiredBrowseWorkspaceCopyPropsUsage}`,
    );
  }
}

const maxBrowseWorkspaceCopyPropsLines = 25;
if (browseWorkspaceCopyPropsLines > maxBrowseWorkspaceCopyPropsLines) {
  throw new Error(
    `record-panel-v2-browse-workspace-copy-props.ts exceeded ${maxBrowseWorkspaceCopyPropsLines} lines: ${browseWorkspaceCopyPropsLines}`,
  );
}

for (const requiredEditorWorkspaceCopyPropsInputTypesImport of [
  'from "./record-panel-v2-workspace-props.types";',
]) {
  if (!editorWorkspaceCopyPropsInputTypesSource.includes(requiredEditorWorkspaceCopyPropsInputTypesImport)) {
    throw new Error(
      `record-panel-v2-editor-workspace-copy-props-input.types.ts must import editor copy input contracts: ${requiredEditorWorkspaceCopyPropsInputTypesImport}`,
    );
  }
}

for (const requiredEditorWorkspaceCopyPropsInputTypesUsage of [
  'export type RecordEditorWorkspaceCopyPropsInput = Pick<BuildRecordEditorWorkspacePropsInput, "detailCopy">;',
]) {
  if (!editorWorkspaceCopyPropsInputTypesSource.includes(requiredEditorWorkspaceCopyPropsInputTypesUsage)) {
    throw new Error(
      `record-panel-v2-editor-workspace-copy-props-input.types.ts must own editor copy input typing: ${requiredEditorWorkspaceCopyPropsInputTypesUsage}`,
    );
  }
}

const maxEditorWorkspaceCopyPropsInputTypesLines = 5;
if (editorWorkspaceCopyPropsInputTypesLines > maxEditorWorkspaceCopyPropsInputTypesLines) {
  throw new Error(
    `record-panel-v2-editor-workspace-copy-props-input.types.ts exceeded ${maxEditorWorkspaceCopyPropsInputTypesLines} lines: ${editorWorkspaceCopyPropsInputTypesLines}`,
  );
}

for (const requiredEditorWorkspaceCopyPropsImport of [
  'from "./record-panel-v2-editor-workspace-copy-props-input.types";',
  'from "./record-panel-v2-editor-workspace-channel-copy-props";',
  'from "./record-panel-v2-editor-workspace-media-copy-props";',
  'from "./record-panel-v2-editor-workspace-reminder-copy-props";',
]) {
  if (!editorWorkspaceCopyPropsSource.includes(requiredEditorWorkspaceCopyPropsImport)) {
    throw new Error(
      `record-panel-v2-editor-workspace-copy-props.ts must import delegated editor copy helpers: ${requiredEditorWorkspaceCopyPropsImport}`,
    );
  }
}

for (const requiredEditorWorkspaceCopyPropsUsage of [
  "export function buildRecordEditorWorkspaceCopyProps({",
  "...buildRecordEditorWorkspaceChannelCopyProps(input)",
  "...buildRecordEditorWorkspaceMediaCopyProps(input)",
  "...buildRecordEditorWorkspaceReminderCopyProps(input)",
]) {
  if (!editorWorkspaceCopyPropsSource.includes(requiredEditorWorkspaceCopyPropsUsage)) {
    throw new Error(
      `record-panel-v2-editor-workspace-copy-props.ts must compose delegated editor copy helpers: ${requiredEditorWorkspaceCopyPropsUsage}`,
    );
  }
}

for (const forbiddenEditorWorkspaceCopyPropsToken of [
  "Parameters<typeof buildRecordEditorWorkspaceChannelCopyProps>[0]",
  "channelInAppLabel: detailCopy.channelInApp",
  "largestFilePrefixLabel: detailCopy.largestFilePrefix",
  "reminderSectionDescription: detailCopy.reminderSectionDescription",
]) {
  if (editorWorkspaceCopyPropsSource.includes(forbiddenEditorWorkspaceCopyPropsToken)) {
    throw new Error(
      `record-panel-v2-editor-workspace-copy-props.ts must keep editor copy mapping delegated: ${forbiddenEditorWorkspaceCopyPropsToken}`,
    );
  }
}

const maxEditorWorkspaceCopyPropsLines = 15;
if (editorWorkspaceCopyPropsLines > maxEditorWorkspaceCopyPropsLines) {
  throw new Error(
    `record-panel-v2-editor-workspace-copy-props.ts exceeded ${maxEditorWorkspaceCopyPropsLines} lines: ${editorWorkspaceCopyPropsLines}`,
  );
}

for (const requiredEditorWorkspaceChannelCopyPropsImport of [
  'from "./record-panel-v2-workspace-props.types";',
  'from "./record-panel-v2-editor-workspace-copy-props-input.types";',
]) {
  if (!editorWorkspaceChannelCopyPropsSource.includes(requiredEditorWorkspaceChannelCopyPropsImport)) {
    throw new Error(
      `record-panel-v2-editor-workspace-channel-copy-props.ts must import channel copy contracts: ${requiredEditorWorkspaceChannelCopyPropsImport}`,
    );
  }
}

for (const requiredEditorWorkspaceChannelCopyPropsUsage of [
  "export function buildRecordEditorWorkspaceChannelCopyProps({ detailCopy }",
  "channelInAppLabel: detailCopy.channelInApp",
  "channelLabel: detailCopy.channelLabel",
]) {
  if (!editorWorkspaceChannelCopyPropsSource.includes(requiredEditorWorkspaceChannelCopyPropsUsage)) {
    throw new Error(
      `record-panel-v2-editor-workspace-channel-copy-props.ts must own channel copy mapping: ${requiredEditorWorkspaceChannelCopyPropsUsage}`,
    );
  }
}

for (const forbiddenEditorWorkspaceChannelCopyPropsToken of [
  "BuildRecordEditorWorkspacePropsInput",
  'Pick<BuildRecordEditorWorkspacePropsInput, "detailCopy">',
]) {
  if (editorWorkspaceChannelCopyPropsSource.includes(forbiddenEditorWorkspaceChannelCopyPropsToken)) {
    throw new Error(
      `record-panel-v2-editor-workspace-channel-copy-props.ts must keep editor copy input contracts delegated: ${forbiddenEditorWorkspaceChannelCopyPropsToken}`,
    );
  }
}

const maxEditorWorkspaceChannelCopyPropsLines = 5;
if (editorWorkspaceChannelCopyPropsLines > maxEditorWorkspaceChannelCopyPropsLines) {
  throw new Error(
    `record-panel-v2-editor-workspace-channel-copy-props.ts exceeded ${maxEditorWorkspaceChannelCopyPropsLines} lines: ${editorWorkspaceChannelCopyPropsLines}`,
  );
}

for (const requiredEditorWorkspaceMediaCopyPropsImport of [
  'from "./record-panel-v2-workspace-props.types";',
  'from "./record-panel-v2-editor-workspace-copy-props-input.types";',
]) {
  if (!editorWorkspaceMediaCopyPropsSource.includes(requiredEditorWorkspaceMediaCopyPropsImport)) {
    throw new Error(
      `record-panel-v2-editor-workspace-media-copy-props.ts must import media copy contracts: ${requiredEditorWorkspaceMediaCopyPropsImport}`,
    );
  }
}

for (const requiredEditorWorkspaceMediaCopyPropsUsage of [
  "export function buildRecordEditorWorkspaceMediaCopyProps({ detailCopy }",
  "largestFilePrefixLabel: detailCopy.largestFilePrefix",
  "noMediaLabel: detailCopy.noMedia",
]) {
  if (!editorWorkspaceMediaCopyPropsSource.includes(requiredEditorWorkspaceMediaCopyPropsUsage)) {
    throw new Error(
      `record-panel-v2-editor-workspace-media-copy-props.ts must own media copy mapping: ${requiredEditorWorkspaceMediaCopyPropsUsage}`,
    );
  }
}

for (const forbiddenEditorWorkspaceMediaCopyPropsToken of [
  "BuildRecordEditorWorkspacePropsInput",
  'Pick<BuildRecordEditorWorkspacePropsInput, "detailCopy">',
]) {
  if (editorWorkspaceMediaCopyPropsSource.includes(forbiddenEditorWorkspaceMediaCopyPropsToken)) {
    throw new Error(
      `record-panel-v2-editor-workspace-media-copy-props.ts must keep editor copy input contracts delegated: ${forbiddenEditorWorkspaceMediaCopyPropsToken}`,
    );
  }
}

const maxEditorWorkspaceMediaCopyPropsLines = 5;
if (editorWorkspaceMediaCopyPropsLines > maxEditorWorkspaceMediaCopyPropsLines) {
  throw new Error(
    `record-panel-v2-editor-workspace-media-copy-props.ts exceeded ${maxEditorWorkspaceMediaCopyPropsLines} lines: ${editorWorkspaceMediaCopyPropsLines}`,
  );
}

for (const requiredEditorWorkspaceReminderCopyPropsImport of [
  'from "./record-panel-v2-workspace-props.types";',
  'from "./record-panel-v2-editor-workspace-copy-props-input.types";',
]) {
  if (!editorWorkspaceReminderCopyPropsSource.includes(requiredEditorWorkspaceReminderCopyPropsImport)) {
    throw new Error(
      `record-panel-v2-editor-workspace-reminder-copy-props.ts must import reminder copy contracts: ${requiredEditorWorkspaceReminderCopyPropsImport}`,
    );
  }
}

for (const requiredEditorWorkspaceReminderCopyPropsUsage of [
  "export function buildRecordEditorWorkspaceReminderCopyProps({ detailCopy }",
  "createReminderLabel: detailCopy.createReminder",
  "reminderSectionDescription: detailCopy.reminderSectionDescription",
  "untitledReminderLabel: detailCopy.untitledReminder",
]) {
  if (!editorWorkspaceReminderCopyPropsSource.includes(requiredEditorWorkspaceReminderCopyPropsUsage)) {
    throw new Error(
      `record-panel-v2-editor-workspace-reminder-copy-props.ts must own reminder copy mapping: ${requiredEditorWorkspaceReminderCopyPropsUsage}`,
    );
  }
}

for (const forbiddenEditorWorkspaceReminderCopyPropsToken of [
  "BuildRecordEditorWorkspacePropsInput",
  'Pick<BuildRecordEditorWorkspacePropsInput, "detailCopy">',
]) {
  if (editorWorkspaceReminderCopyPropsSource.includes(forbiddenEditorWorkspaceReminderCopyPropsToken)) {
    throw new Error(
      `record-panel-v2-editor-workspace-reminder-copy-props.ts must keep editor copy input contracts delegated: ${forbiddenEditorWorkspaceReminderCopyPropsToken}`,
    );
  }
}

const maxEditorWorkspaceReminderCopyPropsLines = 25;
if (editorWorkspaceReminderCopyPropsLines > maxEditorWorkspaceReminderCopyPropsLines) {
  throw new Error(
    `record-panel-v2-editor-workspace-reminder-copy-props.ts exceeded ${maxEditorWorkspaceReminderCopyPropsLines} lines: ${editorWorkspaceReminderCopyPropsLines}`,
  );
}

for (const requiredBrowseWorkspaceDraftLocationPropsImport of [
  'from "./record-panel-v2-workspace-props.types";',
]) {
  if (!browseWorkspaceDraftLocationPropsSource.includes(requiredBrowseWorkspaceDraftLocationPropsImport)) {
    throw new Error(
      `record-panel-v2-browse-workspace-draft-location-props.ts must import draft-location contracts: ${requiredBrowseWorkspaceDraftLocationPropsImport}`,
    );
  }
}

for (const requiredBrowseWorkspaceDraftLocationPropsUsage of [
  "export function buildRecordBrowseWorkspaceDraftLocationProps({",
  "draftLocation: canWriteWorkspace ? form.location ?? null : null",
  "setForm((prev) => ({",
]) {
  if (!browseWorkspaceDraftLocationPropsSource.includes(requiredBrowseWorkspaceDraftLocationPropsUsage)) {
    throw new Error(
      `record-panel-v2-browse-workspace-draft-location-props.ts must own draft-location details: ${requiredBrowseWorkspaceDraftLocationPropsUsage}`,
    );
  }
}

const maxBrowseWorkspaceDraftLocationPropsLines = 20;
if (browseWorkspaceDraftLocationPropsLines > maxBrowseWorkspaceDraftLocationPropsLines) {
  throw new Error(
    `record-panel-v2-browse-workspace-draft-location-props.ts exceeded ${maxBrowseWorkspaceDraftLocationPropsLines} lines: ${browseWorkspaceDraftLocationPropsLines}`,
  );
}

for (const requiredBrowseWorkspaceInputImport of [
  'from "./record-panel-v2-shell-props.types";',
  'from "./record-panel-v2-browse-workspace-controller-input";',
  'from "./record-panel-v2-browse-workspace-prop-input";',
]) {
  if (!browseWorkspaceInputSource.includes(requiredBrowseWorkspaceInputImport)) {
    throw new Error(
      `record-panel-v2-browse-workspace-input.ts must import delegated browse workspace input helpers: ${requiredBrowseWorkspaceInputImport}`,
    );
  }
}

for (const requiredBrowseWorkspaceInputUsage of [
  "export function buildRecordBrowseWorkspaceInput({",
  "...buildRecordBrowseWorkspacePropInput({ props })",
  "...buildRecordBrowseWorkspaceControllerInput({ controller })",
]) {
  if (!browseWorkspaceInputSource.includes(requiredBrowseWorkspaceInputUsage)) {
    throw new Error(
      `record-panel-v2-browse-workspace-input.ts must delegate browse workspace input assembly: ${requiredBrowseWorkspaceInputUsage}`,
    );
  }
}

for (const forbiddenBrowseWorkspaceInputToken of [
  "canWriteWorkspace: props.canWriteWorkspace",
  "avoidCount: controller.avoidCount",
  "setViewMode: controller.setViewMode",
  "savingSearchPreset: props.savingSearchPreset",
]) {
  if (browseWorkspaceInputSource.includes(forbiddenBrowseWorkspaceInputToken)) {
    throw new Error(
      `record-panel-v2-browse-workspace-input.ts must keep prop/controller field mapping delegated: ${forbiddenBrowseWorkspaceInputToken}`,
    );
  }
}

const maxBrowseWorkspaceInputLines = 20;
if (browseWorkspaceInputLines > maxBrowseWorkspaceInputLines) {
  throw new Error(
    `record-panel-v2-browse-workspace-input.ts exceeded ${maxBrowseWorkspaceInputLines} lines: ${browseWorkspaceInputLines}`,
  );
}

for (const requiredBrowseWorkspacePropInputImport of [
  'from "./record-panel-v2-shell-props.types";',
]) {
  if (!browseWorkspacePropInputSource.includes(requiredBrowseWorkspacePropInputImport)) {
    throw new Error(
      `record-panel-v2-browse-workspace-prop-input.ts must import browse workspace prop-input contracts: ${requiredBrowseWorkspacePropInputImport}`,
    );
  }
}

for (const requiredBrowseWorkspacePropInputUsage of [
  'export function buildRecordBrowseWorkspacePropInput({ props }: Pick<RecordPanelShellInput, "props">)',
  "canWriteWorkspace: props.canWriteWorkspace",
  "searchPresets: props.searchPresets",
  "savingSearchPreset: props.savingSearchPreset",
]) {
  if (!browseWorkspacePropInputSource.includes(requiredBrowseWorkspacePropInputUsage)) {
    throw new Error(
      `record-panel-v2-browse-workspace-prop-input.ts must own browse workspace prop field mapping: ${requiredBrowseWorkspacePropInputUsage}`,
    );
  }
}

const maxBrowseWorkspacePropInputLines = 20;
if (browseWorkspacePropInputLines > maxBrowseWorkspacePropInputLines) {
  throw new Error(
    `record-panel-v2-browse-workspace-prop-input.ts exceeded ${maxBrowseWorkspacePropInputLines} lines: ${browseWorkspacePropInputLines}`,
  );
}

for (const requiredBrowseWorkspaceControllerInputImport of [
  'from "./record-panel-v2-shell-props.types";',
]) {
  if (!browseWorkspaceControllerInputSource.includes(requiredBrowseWorkspaceControllerInputImport)) {
    throw new Error(
      `record-panel-v2-browse-workspace-controller-input.ts must import browse workspace controller-input contracts: ${requiredBrowseWorkspaceControllerInputImport}`,
    );
  }
}

for (const requiredBrowseWorkspaceControllerInputUsage of [
  'export function buildRecordBrowseWorkspaceControllerInput({',
  "avoidCount: controller.avoidCount",
  "handleSavePreset: controller.handleSavePreset",
  "summarizeRecordFilterLabel: controller.summarizeRecordFilterLabel",
  "viewMode: controller.viewMode",
]) {
  if (!browseWorkspaceControllerInputSource.includes(requiredBrowseWorkspaceControllerInputUsage)) {
    throw new Error(
      `record-panel-v2-browse-workspace-controller-input.ts must own browse workspace controller field mapping: ${requiredBrowseWorkspaceControllerInputUsage}`,
    );
  }
}

const maxBrowseWorkspaceControllerInputLines = 30;
if (browseWorkspaceControllerInputLines > maxBrowseWorkspaceControllerInputLines) {
  throw new Error(
    `record-panel-v2-browse-workspace-controller-input.ts exceeded ${maxBrowseWorkspaceControllerInputLines} lines: ${browseWorkspaceControllerInputLines}`,
  );
}

for (const requiredEditorWorkspacePropsImport of [
  'from "./record-panel-v2-workspace-props.types";',
  'from "./record-panel-v2-editor-workspace-action-props";',
  'from "./record-panel-v2-editor-workspace-base-props";',
  'from "./record-panel-v2-editor-workspace-copy-props";',
  'from "./record-panel-v2-editor-workspace-props-inputs";',
]) {
  if (!editorWorkspacePropsSource.includes(requiredEditorWorkspacePropsImport)) {
    throw new Error(`record-panel-v2-editor-workspace-props.ts must import delegated editor prop helpers: ${requiredEditorWorkspacePropsImport}`);
  }
}

for (const requiredEditorWorkspacePropsUsage of [
  "buildRecordEditorWorkspaceBaseProps(buildRecordEditorWorkspaceBasePropsInput(input))",
  "buildRecordEditorWorkspaceCopyProps({ detailCopy })",
  "buildRecordEditorWorkspaceActionProps(buildRecordEditorWorkspaceActionPropsInput(input))",
  "...baseProps",
  "...copyProps",
  "...actionProps",
]) {
  if (!editorWorkspacePropsSource.includes(requiredEditorWorkspacePropsUsage)) {
    throw new Error(`record-panel-v2-editor-workspace-props.ts must delegate editor prop assembly: ${requiredEditorWorkspacePropsUsage}`);
  }
}

for (const forbiddenEditorWorkspacePropsToken of [
  "channelInAppLabel: detailCopy.channelInApp",
  "onBulkRetryAllDeadLetter: () => handleBulkRetryDeadLetter(\"all\")",
  "reminderSectionDescription: detailCopy.reminderSectionDescription",
  "authToken,",
  "handleBulkRetryDeadLetter,",
  "selectedRecordMediaSizeLabel,",
]) {
  if (editorWorkspacePropsSource.includes(forbiddenEditorWorkspacePropsToken)) {
    throw new Error(`record-panel-v2-editor-workspace-props.ts must keep copy/action internals delegated: ${forbiddenEditorWorkspacePropsToken}`);
  }
}

const maxEditorWorkspacePropsLines = 130;
if (editorWorkspacePropsLines > maxEditorWorkspacePropsLines) {
  throw new Error(
    `record-panel-v2-editor-workspace-props.ts exceeded ${maxEditorWorkspacePropsLines} lines: ${editorWorkspacePropsLines}`,
  );
}

for (const requiredEditorWorkspacePropsInputsImport of [
  'from "./record-panel-v2-editor-workspace-action-props-input";',
  'from "./record-panel-v2-editor-workspace-base-props-input";',
]) {
  if (!editorWorkspacePropsInputsSource.includes(requiredEditorWorkspacePropsInputsImport)) {
    throw new Error(
      `record-panel-v2-editor-workspace-props-inputs.ts must import shared workspace prop types: ${requiredEditorWorkspacePropsInputsImport}`,
    );
  }
}

for (const requiredEditorWorkspacePropsInputsUsage of [
  "export { buildRecordEditorWorkspaceBasePropsInput }",
  "export { buildRecordEditorWorkspaceActionPropsInput }",
]) {
  if (!editorWorkspacePropsInputsSource.includes(requiredEditorWorkspacePropsInputsUsage)) {
    throw new Error(
      `record-panel-v2-editor-workspace-props-inputs.ts must own editor prop input mapping: ${requiredEditorWorkspacePropsInputsUsage}`,
    );
  }
}

const maxEditorWorkspacePropsInputsLines = 10;
if (editorWorkspacePropsInputsLines > maxEditorWorkspacePropsInputsLines) {
  throw new Error(
    `record-panel-v2-editor-workspace-props-inputs.ts exceeded ${maxEditorWorkspacePropsInputsLines} lines: ${editorWorkspacePropsInputsLines}`,
  );
}

for (const requiredEditorWorkspaceBasePropsInputImport of [
  'from "./record-panel-v2-workspace-props.types";',
]) {
  if (!editorWorkspaceBasePropsInputSource.includes(requiredEditorWorkspaceBasePropsInputImport)) {
    throw new Error(
      `record-panel-v2-editor-workspace-base-props-input.ts must import shared workspace prop types: ${requiredEditorWorkspaceBasePropsInputImport}`,
    );
  }
}

for (const requiredEditorWorkspaceBasePropsInputUsage of [
  'type EditorWorkspacePropsBuilderInput = Omit<BuildRecordEditorWorkspacePropsInput, "detailCopy">',
  "export function buildRecordEditorWorkspaceBasePropsInput(input: EditorWorkspacePropsBuilderInput)",
  "return input;",
]) {
  if (!editorWorkspaceBasePropsInputSource.includes(requiredEditorWorkspaceBasePropsInputUsage)) {
    throw new Error(
      `record-panel-v2-editor-workspace-base-props-input.ts must own base-props input mapping: ${requiredEditorWorkspaceBasePropsInputUsage}`,
    );
  }
}

const maxEditorWorkspaceBasePropsInputLines = 10;
if (editorWorkspaceBasePropsInputLines > maxEditorWorkspaceBasePropsInputLines) {
  throw new Error(
    `record-panel-v2-editor-workspace-base-props-input.ts exceeded ${maxEditorWorkspaceBasePropsInputLines} lines: ${editorWorkspaceBasePropsInputLines}`,
  );
}

for (const requiredEditorWorkspaceActionPropsInputTypesImport of [
  'from "./record-panel-v2-editor-workspace-props.types";',
]) {
  if (!editorWorkspaceActionPropsInputTypesSource.includes(requiredEditorWorkspaceActionPropsInputTypesImport)) {
    throw new Error(
      `record-panel-v2-editor-workspace-action-props-input.types.ts must import editor action input contracts: ${requiredEditorWorkspaceActionPropsInputTypesImport}`,
    );
  }
}

for (const requiredEditorWorkspaceActionPropsInputTypesUsage of [
  "export type RecordEditorWorkspaceDeadLetterActionPropsInput = Pick<BuildRecordEditorWorkspacePropsInput,",
  "export type RecordEditorWorkspacePrimaryActionPropsInput = Pick<BuildRecordEditorWorkspacePropsInput,",
  "export type RecordEditorWorkspaceActionPropsInput = RecordEditorWorkspaceDeadLetterActionPropsInput & RecordEditorWorkspacePrimaryActionPropsInput;",
]) {
  if (!editorWorkspaceActionPropsInputTypesSource.includes(requiredEditorWorkspaceActionPropsInputTypesUsage)) {
    throw new Error(
      `record-panel-v2-editor-workspace-action-props-input.types.ts must own editor action input typing: ${requiredEditorWorkspaceActionPropsInputTypesUsage}`,
    );
  }
}

const maxEditorWorkspaceActionPropsInputTypesLines = 5;
if (editorWorkspaceActionPropsInputTypesLines > maxEditorWorkspaceActionPropsInputTypesLines) {
  throw new Error(
    `record-panel-v2-editor-workspace-action-props-input.types.ts exceeded ${maxEditorWorkspaceActionPropsInputTypesLines} lines: ${editorWorkspaceActionPropsInputTypesLines}`,
  );
}

for (const requiredEditorWorkspaceActionPropsInputImport of [
  'from "./record-panel-v2-workspace-props.types";',
  'from "./record-panel-v2-editor-workspace-action-props-input.types";',
]) {
  if (!editorWorkspaceActionPropsInputSource.includes(requiredEditorWorkspaceActionPropsInputImport)) {
    throw new Error(
      `record-panel-v2-editor-workspace-action-props-input.ts must import shared workspace prop types: ${requiredEditorWorkspaceActionPropsInputImport}`,
    );
  }
}

for (const requiredEditorWorkspaceActionPropsInputUsage of [
  'type EditorWorkspacePropsBuilderInput = Omit<BuildRecordEditorWorkspacePropsInput, "detailCopy">',
  "export function buildRecordEditorWorkspaceActionPropsInput({",
  "handleBulkRetryDeadLetter,",
  "onUpdateReminder,",
  "}: EditorWorkspacePropsBuilderInput): RecordEditorWorkspaceActionPropsInput {",
]) {
  if (!editorWorkspaceActionPropsInputSource.includes(requiredEditorWorkspaceActionPropsInputUsage)) {
    throw new Error(
      `record-panel-v2-editor-workspace-action-props-input.ts must own action-props input mapping: ${requiredEditorWorkspaceActionPropsInputUsage}`,
    );
  }
}

for (const forbiddenEditorWorkspaceActionPropsInputToken of [
  "RecordEditorWorkspaceDeadLetterActionPropsInput =",
  "RecordEditorWorkspacePrimaryActionPropsInput =",
]) {
  if (editorWorkspaceActionPropsInputSource.includes(forbiddenEditorWorkspaceActionPropsInputToken)) {
    throw new Error(
      `record-panel-v2-editor-workspace-action-props-input.ts must keep editor action input typing delegated: ${forbiddenEditorWorkspaceActionPropsInputToken}`,
    );
  }
}

const maxEditorWorkspaceActionPropsInputLines = 40;
if (editorWorkspaceActionPropsInputLines > maxEditorWorkspaceActionPropsInputLines) {
  throw new Error(
    `record-panel-v2-editor-workspace-action-props-input.ts exceeded ${maxEditorWorkspaceActionPropsInputLines} lines: ${editorWorkspaceActionPropsInputLines}`,
  );
}

for (const requiredEditorWorkspaceActionPropsImport of [
  'from "./record-panel-v2-editor-workspace-action-props-input.types";',
  'from "./record-panel-v2-editor-workspace-dead-letter-action-props";',
  'from "./record-panel-v2-editor-workspace-primary-action-props";',
]) {
  if (!editorWorkspaceActionPropsSource.includes(requiredEditorWorkspaceActionPropsImport)) {
    throw new Error(
      `record-panel-v2-editor-workspace-action-props.ts must import delegated editor action helpers: ${requiredEditorWorkspaceActionPropsImport}`,
    );
  }
}

for (const requiredEditorWorkspaceActionPropsUsage of [
  "export function buildRecordEditorWorkspaceActionProps({ ...input }: RecordEditorWorkspaceActionPropsInput)",
  "buildRecordEditorWorkspaceDeadLetterActionProps(input)",
  "buildRecordEditorWorkspacePrimaryActionProps(input)",
  "...deadLetterActionProps",
  "...primaryActionProps",
]) {
  if (!editorWorkspaceActionPropsSource.includes(requiredEditorWorkspaceActionPropsUsage)) {
    throw new Error(
      `record-panel-v2-editor-workspace-action-props.ts must delegate editor action assembly: ${requiredEditorWorkspaceActionPropsUsage}`,
    );
  }
}

for (const forbiddenEditorWorkspaceActionPropsToken of [
  "Parameters<typeof buildRecordEditorWorkspaceDeadLetterActionProps>[0]",
  "Parameters<typeof buildRecordEditorWorkspacePrimaryActionProps>[0]",
  "onBulkRetryAllDeadLetter: () => handleBulkRetryDeadLetter(\"all\")",
  "onCreateReminder: handleCreateReminderSubmit",
  "onDeleteMediaAsset: handleDeleteMediaAsset",
  "onUpload: handleUpload",
]) {
  if (editorWorkspaceActionPropsSource.includes(forbiddenEditorWorkspaceActionPropsToken)) {
    throw new Error(
      `record-panel-v2-editor-workspace-action-props.ts must keep action mapping internals delegated: ${forbiddenEditorWorkspaceActionPropsToken}`,
    );
  }
}

const maxEditorWorkspaceActionPropsLines = 25;
if (editorWorkspaceActionPropsLines > maxEditorWorkspaceActionPropsLines) {
  throw new Error(
    `record-panel-v2-editor-workspace-action-props.ts exceeded ${maxEditorWorkspaceActionPropsLines} lines: ${editorWorkspaceActionPropsLines}`,
  );
}

for (const requiredEditorWorkspaceDeadLetterActionPropsImport of [
  'from "./record-panel-v2-workspace-props.types";',
  'from "./record-panel-v2-editor-workspace-action-props-input.types";',
]) {
  if (!editorWorkspaceDeadLetterActionPropsSource.includes(requiredEditorWorkspaceDeadLetterActionPropsImport)) {
    throw new Error(
      `record-panel-v2-editor-workspace-dead-letter-action-props.ts must import dead-letter action contracts: ${requiredEditorWorkspaceDeadLetterActionPropsImport}`,
    );
  }
}

for (const forbiddenEditorWorkspaceDeadLetterActionPropsToken of [
  "BuildRecordEditorWorkspacePropsInput",
  '"handleBulkRetryDeadLetter"',
  '"handleToggleDeadLetterSelection"',
]) {
  if (editorWorkspaceDeadLetterActionPropsSource.includes(forbiddenEditorWorkspaceDeadLetterActionPropsToken)) {
    throw new Error(
      `record-panel-v2-editor-workspace-dead-letter-action-props.ts must keep dead-letter input typing delegated: ${forbiddenEditorWorkspaceDeadLetterActionPropsToken}`,
    );
  }
}

for (const requiredEditorWorkspaceDeadLetterActionPropsUsage of [
  "export function buildRecordEditorWorkspaceDeadLetterActionProps({",
  "onBulkRetryAllDeadLetter: () => handleBulkRetryDeadLetter(\"all\")",
  "onBulkRetrySelectedDeadLetter: () => handleBulkRetryDeadLetter(\"selected\")",
  "onToggleDeadLetterSelection: handleToggleDeadLetterSelection",
]) {
  if (!editorWorkspaceDeadLetterActionPropsSource.includes(requiredEditorWorkspaceDeadLetterActionPropsUsage)) {
    throw new Error(
      `record-panel-v2-editor-workspace-dead-letter-action-props.ts must own dead-letter action mapping: ${requiredEditorWorkspaceDeadLetterActionPropsUsage}`,
    );
  }
}

const maxEditorWorkspaceDeadLetterActionPropsLines = 30;
if (editorWorkspaceDeadLetterActionPropsLines > maxEditorWorkspaceDeadLetterActionPropsLines) {
  throw new Error(
    `record-panel-v2-editor-workspace-dead-letter-action-props.ts exceeded ${maxEditorWorkspaceDeadLetterActionPropsLines} lines: ${editorWorkspaceDeadLetterActionPropsLines}`,
  );
}

for (const requiredEditorWorkspacePrimaryActionPropsImport of [
  'from "./record-panel-v2-workspace-props.types";',
  'from "./record-panel-v2-editor-workspace-action-props-input.types";',
]) {
  if (!editorWorkspacePrimaryActionPropsSource.includes(requiredEditorWorkspacePrimaryActionPropsImport)) {
    throw new Error(
      `record-panel-v2-editor-workspace-primary-action-props.ts must import primary action contracts: ${requiredEditorWorkspacePrimaryActionPropsImport}`,
    );
  }
}

for (const forbiddenEditorWorkspacePrimaryActionPropsToken of [
  "type EditorWorkspacePrimaryActionPropsInput = Pick<",
  "BuildRecordEditorWorkspacePropsInput",
]) {
  if (editorWorkspacePrimaryActionPropsSource.includes(forbiddenEditorWorkspacePrimaryActionPropsToken)) {
    throw new Error(
      `record-panel-v2-editor-workspace-primary-action-props.ts must keep primary action input typing delegated: ${forbiddenEditorWorkspacePrimaryActionPropsToken}`,
    );
  }
}

for (const requiredEditorWorkspacePrimaryActionPropsUsage of [
  "export function buildRecordEditorWorkspacePrimaryActionProps({",
  "onCreateReminder: handleCreateReminderSubmit",
  "onDeleteMediaAsset: handleDeleteMediaAsset",
  "onRefreshMedia: handleRefreshMedia",
  "onUpload: handleUpload",
]) {
  if (!editorWorkspacePrimaryActionPropsSource.includes(requiredEditorWorkspacePrimaryActionPropsUsage)) {
    throw new Error(
      `record-panel-v2-editor-workspace-primary-action-props.ts must own primary action mapping: ${requiredEditorWorkspacePrimaryActionPropsUsage}`,
    );
  }
}

const maxEditorWorkspacePrimaryActionPropsLines = 35;
if (editorWorkspacePrimaryActionPropsLines > maxEditorWorkspacePrimaryActionPropsLines) {
  throw new Error(
    `record-panel-v2-editor-workspace-primary-action-props.ts exceeded ${maxEditorWorkspacePrimaryActionPropsLines} lines: ${editorWorkspacePrimaryActionPropsLines}`,
  );
}

for (const requiredEditorWorkspaceBasePropsImport of [
  'from "./record-panel-v2-editor-workspace-base-props.types";',
  'from "./record-panel-v2-editor-workspace-base-form-props";',
  'from "./record-panel-v2-editor-workspace-base-media-props";',
  'from "./record-panel-v2-editor-workspace-base-session-props";',
  'from "./record-panel-v2-editor-workspace-base-state-props";',
]) {
  if (!editorWorkspaceBasePropsSource.includes(requiredEditorWorkspaceBasePropsImport)) {
    throw new Error(
      `record-panel-v2-editor-workspace-base-props.ts must import shared editor prop types: ${requiredEditorWorkspaceBasePropsImport}`,
    );
  }
}

for (const requiredEditorWorkspaceBasePropsUsage of [
  "export function buildRecordEditorWorkspaceBaseProps({",
  "...buildRecordEditorWorkspaceBaseFormProps(input)",
  "...buildRecordEditorWorkspaceBaseMediaProps(input)",
  "...buildRecordEditorWorkspaceBaseSessionProps(input)",
  "...buildRecordEditorWorkspaceBaseStateProps(input)",
]) {
  if (!editorWorkspaceBasePropsSource.includes(requiredEditorWorkspaceBasePropsUsage)) {
    throw new Error(
      `record-panel-v2-editor-workspace-base-props.ts must compose delegated base editor prop slices: ${requiredEditorWorkspaceBasePropsUsage}`,
    );
  }
}

for (const forbiddenEditorWorkspaceBasePropsToken of [
  "authToken,",
  "mediaAssets,",
  "selectedRecordMediaSizeLabel,",
  "workspaceId,",
]) {
  if (editorWorkspaceBasePropsSource.includes(forbiddenEditorWorkspaceBasePropsToken)) {
    throw new Error(
      `record-panel-v2-editor-workspace-base-props.ts must keep base editor prop mapping delegated: ${forbiddenEditorWorkspaceBasePropsToken}`,
    );
  }
}

const maxEditorWorkspaceBasePropsLines = 20;
if (editorWorkspaceBasePropsLines > maxEditorWorkspaceBasePropsLines) {
  throw new Error(
    `record-panel-v2-editor-workspace-base-props.ts exceeded ${maxEditorWorkspaceBasePropsLines} lines: ${editorWorkspaceBasePropsLines}`,
  );
}

for (const requiredEditorWorkspaceBasePropsTypesImport of [
  'from "./record-panel-v2-editor-workspace-base-form-props.types";',
  'from "./record-panel-v2-editor-workspace-base-media-props.types";',
  'from "./record-panel-v2-editor-workspace-base-session-props.types";',
  'from "./record-panel-v2-editor-workspace-base-state-props.types";',
]) {
  if (!editorWorkspaceBasePropsTypesSource.includes(requiredEditorWorkspaceBasePropsTypesImport)) {
    throw new Error(
      `record-panel-v2-editor-workspace-base-props.types.ts must import shared workspace prop types: ${requiredEditorWorkspaceBasePropsTypesImport}`,
    );
  }
}

for (const requiredEditorWorkspaceBasePropsTypesUsage of [
  "export type BuildRecordEditorWorkspaceBasePropsInput =",
  "BuildRecordEditorWorkspaceBaseFormPropsInput &",
  "BuildRecordEditorWorkspaceBaseMediaPropsInput &",
  "BuildRecordEditorWorkspaceBaseSessionPropsInput &",
  "BuildRecordEditorWorkspaceBaseStatePropsInput;",
  "export type RecordEditorWorkspaceBaseProps =",
  "RecordEditorWorkspaceBaseFormProps &",
  "RecordEditorWorkspaceBaseMediaProps &",
  "RecordEditorWorkspaceBaseSessionProps &",
  "RecordEditorWorkspaceBaseStateProps;",
]) {
  if (!editorWorkspaceBasePropsTypesSource.includes(requiredEditorWorkspaceBasePropsTypesUsage)) {
    throw new Error(
      `record-panel-v2-editor-workspace-base-props.types.ts must compose delegated base prop type slices: ${requiredEditorWorkspaceBasePropsTypesUsage}`,
    );
  }
}

const maxEditorWorkspaceBasePropsTypesLines = 20;
if (editorWorkspaceBasePropsTypesLines > maxEditorWorkspaceBasePropsTypesLines) {
  throw new Error(
    `record-panel-v2-editor-workspace-base-props.types.ts exceeded ${maxEditorWorkspaceBasePropsTypesLines} lines: ${editorWorkspaceBasePropsTypesLines}`,
  );
}

for (const requiredEditorWorkspaceBaseSessionPropsImport of [
  'from "./record-panel-v2-editor-workspace-base-session-props.types";',
]) {
  if (!editorWorkspaceBaseSessionPropsSource.includes(requiredEditorWorkspaceBaseSessionPropsImport)) {
    throw new Error(
      `record-panel-v2-editor-workspace-base-session-props.ts must import session prop contracts: ${requiredEditorWorkspaceBaseSessionPropsImport}`,
    );
  }
}

for (const requiredEditorWorkspaceBaseSessionPropsUsage of [
  "export function buildRecordEditorWorkspaceBaseSessionProps({",
  "authToken,",
  "panelCopy,",
  "workspaceId",
]) {
  if (!editorWorkspaceBaseSessionPropsSource.includes(requiredEditorWorkspaceBaseSessionPropsUsage)) {
    throw new Error(
      `record-panel-v2-editor-workspace-base-session-props.ts must own session prop mapping: ${requiredEditorWorkspaceBaseSessionPropsUsage}`,
    );
  }
}

const maxEditorWorkspaceBaseSessionPropsLines = 10;
if (editorWorkspaceBaseSessionPropsLines > maxEditorWorkspaceBaseSessionPropsLines) {
  throw new Error(
    `record-panel-v2-editor-workspace-base-session-props.ts exceeded ${maxEditorWorkspaceBaseSessionPropsLines} lines: ${editorWorkspaceBaseSessionPropsLines}`,
  );
}

for (const requiredEditorWorkspaceBaseStatePropsImport of [
  'from "./record-panel-v2-editor-workspace-base-state-props.types";',
]) {
  if (!editorWorkspaceBaseStatePropsSource.includes(requiredEditorWorkspaceBaseStatePropsImport)) {
    throw new Error(
      `record-panel-v2-editor-workspace-base-state-props.ts must import state prop contracts: ${requiredEditorWorkspaceBaseStatePropsImport}`,
    );
  }
}

for (const requiredEditorWorkspaceBaseStatePropsUsage of [
  "export function buildRecordEditorWorkspaceBaseStateProps({",
  "bulkRetryingDeadLetter,",
  "retryingMediaId,",
  "uploading",
]) {
  if (!editorWorkspaceBaseStatePropsSource.includes(requiredEditorWorkspaceBaseStatePropsUsage)) {
    throw new Error(
      `record-panel-v2-editor-workspace-base-state-props.ts must own state prop mapping: ${requiredEditorWorkspaceBaseStatePropsUsage}`,
    );
  }
}

const maxEditorWorkspaceBaseStatePropsLines = 10;
if (editorWorkspaceBaseStatePropsLines > maxEditorWorkspaceBaseStatePropsLines) {
  throw new Error(
    `record-panel-v2-editor-workspace-base-state-props.ts exceeded ${maxEditorWorkspaceBaseStatePropsLines} lines: ${editorWorkspaceBaseStatePropsLines}`,
  );
}

for (const requiredEditorWorkspaceBaseFormPropsImport of [
  'from "./record-panel-v2-editor-workspace-base-form-props.types";',
]) {
  if (!editorWorkspaceBaseFormPropsSource.includes(requiredEditorWorkspaceBaseFormPropsImport)) {
    throw new Error(
      `record-panel-v2-editor-workspace-base-form-props.ts must import form prop contracts: ${requiredEditorWorkspaceBaseFormPropsImport}`,
    );
  }
}

for (const requiredEditorWorkspaceBaseFormPropsUsage of [
  "export function buildRecordEditorWorkspaceBaseFormProps({",
  "form,",
  "selectedRecord,",
  "setReminderForm",
]) {
  if (!editorWorkspaceBaseFormPropsSource.includes(requiredEditorWorkspaceBaseFormPropsUsage)) {
    throw new Error(
      `record-panel-v2-editor-workspace-base-form-props.ts must own form prop mapping: ${requiredEditorWorkspaceBaseFormPropsUsage}`,
    );
  }
}

const maxEditorWorkspaceBaseFormPropsLines = 10;
if (editorWorkspaceBaseFormPropsLines > maxEditorWorkspaceBaseFormPropsLines) {
  throw new Error(
    `record-panel-v2-editor-workspace-base-form-props.ts exceeded ${maxEditorWorkspaceBaseFormPropsLines} lines: ${editorWorkspaceBaseFormPropsLines}`,
  );
}

for (const requiredEditorWorkspaceBaseMediaPropsImport of [
  'from "./record-panel-v2-editor-workspace-base-media-props.types";',
]) {
  if (!editorWorkspaceBaseMediaPropsSource.includes(requiredEditorWorkspaceBaseMediaPropsImport)) {
    throw new Error(
      `record-panel-v2-editor-workspace-base-media-props.ts must import media prop contracts: ${requiredEditorWorkspaceBaseMediaPropsImport}`,
    );
  }
}

for (const requiredEditorWorkspaceBaseMediaPropsUsage of [
  "export function buildRecordEditorWorkspaceBaseMediaProps({",
  "formatFileCountLabel,",
  "mediaAssets,",
  "summarizeHistoryActionLabel",
]) {
  if (!editorWorkspaceBaseMediaPropsSource.includes(requiredEditorWorkspaceBaseMediaPropsUsage)) {
    throw new Error(
      `record-panel-v2-editor-workspace-base-media-props.ts must own media prop mapping: ${requiredEditorWorkspaceBaseMediaPropsUsage}`,
    );
  }
}

const maxEditorWorkspaceBaseMediaPropsLines = 10;
if (editorWorkspaceBaseMediaPropsLines > maxEditorWorkspaceBaseMediaPropsLines) {
  throw new Error(
    `record-panel-v2-editor-workspace-base-media-props.ts exceeded ${maxEditorWorkspaceBaseMediaPropsLines} lines: ${editorWorkspaceBaseMediaPropsLines}`,
  );
}

for (const requiredEditorWorkspaceBaseSessionPropsTypesImport of [
  'from "./record-panel-v2-workspace-props.types";',
]) {
  if (!editorWorkspaceBaseSessionPropsTypesSource.includes(requiredEditorWorkspaceBaseSessionPropsTypesImport)) {
    throw new Error(
      `record-panel-v2-editor-workspace-base-session-props.types.ts must import session type dependencies: ${requiredEditorWorkspaceBaseSessionPropsTypesImport}`,
    );
  }
}

for (const requiredEditorWorkspaceBaseSessionPropsTypesUsage of [
  "export type BuildRecordEditorWorkspaceBaseSessionPropsInput = Pick<",
  "export type RecordEditorWorkspaceBaseSessionProps = Pick<",
  '"authToken"',
  '"workspaceId"',
]) {
  if (!editorWorkspaceBaseSessionPropsTypesSource.includes(requiredEditorWorkspaceBaseSessionPropsTypesUsage)) {
    throw new Error(
      `record-panel-v2-editor-workspace-base-session-props.types.ts must own session prop type contracts: ${requiredEditorWorkspaceBaseSessionPropsTypesUsage}`,
    );
  }
}

const maxEditorWorkspaceBaseSessionPropsTypesLines = 5;
if (editorWorkspaceBaseSessionPropsTypesLines > maxEditorWorkspaceBaseSessionPropsTypesLines) {
  throw new Error(
    `record-panel-v2-editor-workspace-base-session-props.types.ts exceeded ${maxEditorWorkspaceBaseSessionPropsTypesLines} lines: ${editorWorkspaceBaseSessionPropsTypesLines}`,
  );
}

for (const requiredEditorWorkspaceBaseStatePropsTypesImport of [
  'from "./record-panel-v2-workspace-props.types";',
]) {
  if (!editorWorkspaceBaseStatePropsTypesSource.includes(requiredEditorWorkspaceBaseStatePropsTypesImport)) {
    throw new Error(
      `record-panel-v2-editor-workspace-base-state-props.types.ts must import state type dependencies: ${requiredEditorWorkspaceBaseStatePropsTypesImport}`,
    );
  }
}

for (const requiredEditorWorkspaceBaseStatePropsTypesUsage of [
  "export type BuildRecordEditorWorkspaceBaseStatePropsInput = Pick<",
  "export type RecordEditorWorkspaceBaseStateProps = Pick<",
  '"bulkRetryingDeadLetter"',
  '"uploading"',
]) {
  if (!editorWorkspaceBaseStatePropsTypesSource.includes(requiredEditorWorkspaceBaseStatePropsTypesUsage)) {
    throw new Error(
      `record-panel-v2-editor-workspace-base-state-props.types.ts must own state prop type contracts: ${requiredEditorWorkspaceBaseStatePropsTypesUsage}`,
    );
  }
}

const maxEditorWorkspaceBaseStatePropsTypesLines = 5;
if (editorWorkspaceBaseStatePropsTypesLines > maxEditorWorkspaceBaseStatePropsTypesLines) {
  throw new Error(
    `record-panel-v2-editor-workspace-base-state-props.types.ts exceeded ${maxEditorWorkspaceBaseStatePropsTypesLines} lines: ${editorWorkspaceBaseStatePropsTypesLines}`,
  );
}

for (const requiredEditorWorkspaceBaseFormPropsTypesImport of [
  'from "./record-panel-v2-workspace-props.types";',
]) {
  if (!editorWorkspaceBaseFormPropsTypesSource.includes(requiredEditorWorkspaceBaseFormPropsTypesImport)) {
    throw new Error(
      `record-panel-v2-editor-workspace-base-form-props.types.ts must import form type dependencies: ${requiredEditorWorkspaceBaseFormPropsTypesImport}`,
    );
  }
}

for (const requiredEditorWorkspaceBaseFormPropsTypesUsage of [
  "export type BuildRecordEditorWorkspaceBaseFormPropsInput = Pick<",
  "export type RecordEditorWorkspaceBaseFormProps = Pick<",
  '"form"',
  '"setReminderForm"',
]) {
  if (!editorWorkspaceBaseFormPropsTypesSource.includes(requiredEditorWorkspaceBaseFormPropsTypesUsage)) {
    throw new Error(
      `record-panel-v2-editor-workspace-base-form-props.types.ts must own form prop type contracts: ${requiredEditorWorkspaceBaseFormPropsTypesUsage}`,
    );
  }
}

const maxEditorWorkspaceBaseFormPropsTypesLines = 5;
if (editorWorkspaceBaseFormPropsTypesLines > maxEditorWorkspaceBaseFormPropsTypesLines) {
  throw new Error(
    `record-panel-v2-editor-workspace-base-form-props.types.ts exceeded ${maxEditorWorkspaceBaseFormPropsTypesLines} lines: ${editorWorkspaceBaseFormPropsTypesLines}`,
  );
}

for (const requiredEditorWorkspaceBaseMediaPropsTypesImport of [
  'from "./record-panel-v2-workspace-props.types";',
]) {
  if (!editorWorkspaceBaseMediaPropsTypesSource.includes(requiredEditorWorkspaceBaseMediaPropsTypesImport)) {
    throw new Error(
      `record-panel-v2-editor-workspace-base-media-props.types.ts must import media type dependencies: ${requiredEditorWorkspaceBaseMediaPropsTypesImport}`,
    );
  }
}

for (const requiredEditorWorkspaceBaseMediaPropsTypesUsage of [
  "export type BuildRecordEditorWorkspaceBaseMediaPropsInput = Pick<",
  "export type RecordEditorWorkspaceBaseMediaProps = Pick<",
  '"mediaAssets"',
  '"summarizeHistoryActionLabel"',
]) {
  if (!editorWorkspaceBaseMediaPropsTypesSource.includes(requiredEditorWorkspaceBaseMediaPropsTypesUsage)) {
    throw new Error(
      `record-panel-v2-editor-workspace-base-media-props.types.ts must own media prop type contracts: ${requiredEditorWorkspaceBaseMediaPropsTypesUsage}`,
    );
  }
}

const maxEditorWorkspaceBaseMediaPropsTypesLines = 5;
if (editorWorkspaceBaseMediaPropsTypesLines > maxEditorWorkspaceBaseMediaPropsTypesLines) {
  throw new Error(
    `record-panel-v2-editor-workspace-base-media-props.types.ts exceeded ${maxEditorWorkspaceBaseMediaPropsTypesLines} lines: ${editorWorkspaceBaseMediaPropsTypesLines}`,
  );
}

for (const requiredEditorWorkspaceInputImport of [
  'from "./record-panel-v2-shell-props.types";',
  'from "./record-panel-v2-editor-workspace-controller-input";',
  'from "./record-panel-v2-editor-workspace-prop-input";',
]) {
  if (!editorWorkspaceInputSource.includes(requiredEditorWorkspaceInputImport)) {
    throw new Error(
      `record-panel-v2-editor-workspace-input.ts must import delegated editor workspace input helpers: ${requiredEditorWorkspaceInputImport}`,
    );
  }
}

for (const requiredEditorWorkspaceInputUsage of [
  "export function buildRecordEditorWorkspaceInput({",
  "...buildRecordEditorWorkspacePropInput({ props })",
  "...buildRecordEditorWorkspaceControllerInput({ controller })",
]) {
  if (!editorWorkspaceInputSource.includes(requiredEditorWorkspaceInputUsage)) {
    throw new Error(
      `record-panel-v2-editor-workspace-input.ts must delegate editor workspace input assembly: ${requiredEditorWorkspaceInputUsage}`,
    );
  }
}

for (const forbiddenEditorWorkspaceInputToken of [
  "authToken: props.authToken",
  "bulkRetryingDeadLetter: controller.bulkRetryingDeadLetter",
  "selectedRecordMediaSizeLabel: controller.selectedRecordMediaSizeLabel",
  "handleUpload: controller.handleUpload",
]) {
  if (editorWorkspaceInputSource.includes(forbiddenEditorWorkspaceInputToken)) {
    throw new Error(
      `record-panel-v2-editor-workspace-input.ts must keep prop/controller field mapping delegated: ${forbiddenEditorWorkspaceInputToken}`,
    );
  }
}

const maxEditorWorkspaceInputLines = 20;
if (editorWorkspaceInputLines > maxEditorWorkspaceInputLines) {
  throw new Error(
    `record-panel-v2-editor-workspace-input.ts exceeded ${maxEditorWorkspaceInputLines} lines: ${editorWorkspaceInputLines}`,
  );
}

for (const requiredEditorWorkspacePropInputImport of [
  'from "./record-panel-v2-shell-props.types";',
]) {
  if (!editorWorkspacePropInputSource.includes(requiredEditorWorkspacePropInputImport)) {
    throw new Error(
      `record-panel-v2-editor-workspace-prop-input.ts must import editor workspace prop-input contracts: ${requiredEditorWorkspacePropInputImport}`,
    );
  }
}

for (const requiredEditorWorkspacePropInputUsage of [
  'export function buildRecordEditorWorkspacePropInput({ props }: Pick<RecordPanelShellInput, "props">)',
  "authToken: props.authToken",
  "mediaStorageSummary: props.mediaStorageSummary",
  "onUpdateReminder: props.onUpdateReminder",
]) {
  if (!editorWorkspacePropInputSource.includes(requiredEditorWorkspacePropInputUsage)) {
    throw new Error(
      `record-panel-v2-editor-workspace-prop-input.ts must own editor workspace prop field mapping: ${requiredEditorWorkspacePropInputUsage}`,
    );
  }
}

const maxEditorWorkspacePropInputLines = 20;
if (editorWorkspacePropInputLines > maxEditorWorkspacePropInputLines) {
  throw new Error(
    `record-panel-v2-editor-workspace-prop-input.ts exceeded ${maxEditorWorkspacePropInputLines} lines: ${editorWorkspacePropInputLines}`,
  );
}

for (const requiredEditorWorkspaceControllerInputImport of [
  'from "./record-panel-v2-shell-props.types";',
  'from "./record-panel-v2-editor-workspace-controller-action-input";',
  'from "./record-panel-v2-editor-workspace-controller-display-input";',
  'from "./record-panel-v2-editor-workspace-controller-formatter-input";',
]) {
  if (!editorWorkspaceControllerInputSource.includes(requiredEditorWorkspaceControllerInputImport)) {
    throw new Error(
      `record-panel-v2-editor-workspace-controller-input.ts must import editor workspace controller-input contracts: ${requiredEditorWorkspaceControllerInputImport}`,
    );
  }
}

for (const requiredEditorWorkspaceControllerInputUsage of [
  'export function buildRecordEditorWorkspaceControllerInput({',
  "buildRecordEditorWorkspaceControllerActionInput(input)",
  "buildRecordEditorWorkspaceControllerDisplayInput(input)",
  "buildRecordEditorWorkspaceControllerFormatterInput(input)",
]) {
  if (!editorWorkspaceControllerInputSource.includes(requiredEditorWorkspaceControllerInputUsage)) {
    throw new Error(
      `record-panel-v2-editor-workspace-controller-input.ts must compose delegated controller field mapping: ${requiredEditorWorkspaceControllerInputUsage}`,
    );
  }
}

for (const forbiddenEditorWorkspaceControllerInputToken of [
  "bulkRetryingDeadLetter: controller.bulkRetryingDeadLetter",
  "handleUpload: controller.handleUpload",
  "selectedRecordMediaSizeLabel: controller.selectedRecordMediaSizeLabel",
  "summarizeHistoryActionLabel: controller.summarizeHistoryActionLabel",
]) {
  if (editorWorkspaceControllerInputSource.includes(forbiddenEditorWorkspaceControllerInputToken)) {
    throw new Error(
      `record-panel-v2-editor-workspace-controller-input.ts must keep controller field mapping delegated: ${forbiddenEditorWorkspaceControllerInputToken}`,
    );
  }
}

const maxEditorWorkspaceControllerInputLines = 20;
if (editorWorkspaceControllerInputLines > maxEditorWorkspaceControllerInputLines) {
  throw new Error(
    `record-panel-v2-editor-workspace-controller-input.ts exceeded ${maxEditorWorkspaceControllerInputLines} lines: ${editorWorkspaceControllerInputLines}`,
  );
}

for (const requiredEditorWorkspaceControllerActionInputImport of [
  'from "./record-panel-v2-shell-props.types";',
]) {
  if (!editorWorkspaceControllerActionInputSource.includes(requiredEditorWorkspaceControllerActionInputImport)) {
    throw new Error(
      `record-panel-v2-editor-workspace-controller-action-input.ts must import controller action-input contracts: ${requiredEditorWorkspaceControllerActionInputImport}`,
    );
  }
}

for (const requiredEditorWorkspaceControllerActionInputUsage of [
  "export function buildRecordEditorWorkspaceControllerActionInput({ controller }: Pick<RecordPanelShellInput, \"controller\">)",
  "handleBulkRetryDeadLetter: controller.handleBulkRetryDeadLetter",
  "handleUpload: controller.handleUpload",
  "setReminderForm: controller.setReminderForm",
]) {
  if (!editorWorkspaceControllerActionInputSource.includes(requiredEditorWorkspaceControllerActionInputUsage)) {
    throw new Error(
      `record-panel-v2-editor-workspace-controller-action-input.ts must own controller action mapping: ${requiredEditorWorkspaceControllerActionInputUsage}`,
    );
  }
}

const maxEditorWorkspaceControllerActionInputLines = 25;
if (editorWorkspaceControllerActionInputLines > maxEditorWorkspaceControllerActionInputLines) {
  throw new Error(
    `record-panel-v2-editor-workspace-controller-action-input.ts exceeded ${maxEditorWorkspaceControllerActionInputLines} lines: ${editorWorkspaceControllerActionInputLines}`,
  );
}

for (const requiredEditorWorkspaceControllerDisplayInputImport of [
  'from "./record-panel-v2-shell-props.types";',
]) {
  if (!editorWorkspaceControllerDisplayInputSource.includes(requiredEditorWorkspaceControllerDisplayInputImport)) {
    throw new Error(
      `record-panel-v2-editor-workspace-controller-display-input.ts must import controller display-input contracts: ${requiredEditorWorkspaceControllerDisplayInputImport}`,
    );
  }
}

for (const requiredEditorWorkspaceControllerDisplayInputUsage of [
  "export function buildRecordEditorWorkspaceControllerDisplayInput({ controller }: Pick<RecordPanelShellInput, \"controller\">)",
  "bulkRetryingDeadLetter: controller.bulkRetryingDeadLetter",
  "detailCopy: controller.detailCopy",
  "selectedRecordMediaSizeLabel: controller.selectedRecordMediaSizeLabel",
  "uploading: controller.uploading",
]) {
  if (!editorWorkspaceControllerDisplayInputSource.includes(requiredEditorWorkspaceControllerDisplayInputUsage)) {
    throw new Error(
      `record-panel-v2-editor-workspace-controller-display-input.ts must own controller display mapping: ${requiredEditorWorkspaceControllerDisplayInputUsage}`,
    );
  }
}

const maxEditorWorkspaceControllerDisplayInputLines = 30;
if (editorWorkspaceControllerDisplayInputLines > maxEditorWorkspaceControllerDisplayInputLines) {
  throw new Error(
    `record-panel-v2-editor-workspace-controller-display-input.ts exceeded ${maxEditorWorkspaceControllerDisplayInputLines} lines: ${editorWorkspaceControllerDisplayInputLines}`,
  );
}

for (const requiredEditorWorkspaceControllerFormatterInputImport of [
  'from "./record-panel-v2-shell-props.types";',
]) {
  if (!editorWorkspaceControllerFormatterInputSource.includes(requiredEditorWorkspaceControllerFormatterInputImport)) {
    throw new Error(
      `record-panel-v2-editor-workspace-controller-formatter-input.ts must import controller formatter-input contracts: ${requiredEditorWorkspaceControllerFormatterInputImport}`,
    );
  }
}

for (const requiredEditorWorkspaceControllerFormatterInputUsage of [
  "export function buildRecordEditorWorkspaceControllerFormatterInput({ controller }: Pick<RecordPanelShellInput, \"controller\">)",
  "formatFileCountLabel: controller.formatFileCountLabel",
  "formatReviewStatusLabel: controller.formatReviewStatusLabel",
  "summarizeHistoryActionLabel: controller.summarizeHistoryActionLabel",
]) {
  if (!editorWorkspaceControllerFormatterInputSource.includes(requiredEditorWorkspaceControllerFormatterInputUsage)) {
    throw new Error(
      `record-panel-v2-editor-workspace-controller-formatter-input.ts must own controller formatter mapping: ${requiredEditorWorkspaceControllerFormatterInputUsage}`,
    );
  }
}

const maxEditorWorkspaceControllerFormatterInputLines = 15;
if (editorWorkspaceControllerFormatterInputLines > maxEditorWorkspaceControllerFormatterInputLines) {
  throw new Error(
    `record-panel-v2-editor-workspace-controller-formatter-input.ts exceeded ${maxEditorWorkspaceControllerFormatterInputLines} lines: ${editorWorkspaceControllerFormatterInputLines}`,
  );
}

for (const requiredShellPropsExport of [
  'export { buildRecordBrowseWorkspaceInput } from "./record-panel-v2-browse-workspace-input";',
  'export { buildRecordPanelControllerInput } from "./record-panel-v2-controller-input";',
  'export { buildRecordEditorWorkspaceInput } from "./record-panel-v2-editor-workspace-input";',
  'export { buildRecordPanelHeaderProps } from "./record-panel-v2-header-props";',
  'export { buildRecordPanelShellViewProps } from "./record-panel-v2-shell-view-props";',
]) {
  if (!shellPropsSource.includes(requiredShellPropsExport)) {
    throw new Error(`record-panel-v2-shell-props.ts must remain a stable re-export boundary: ${requiredShellPropsExport}`);
  }
}

const maxShellPropsLines = 10;
if (shellPropsLines > maxShellPropsLines) {
  throw new Error(
    `record-panel-v2-shell-props.ts exceeded ${maxShellPropsLines} lines: ${shellPropsLines}`,
  );
}

for (const requiredShellViewPropsImport of [
  'from "./record-panel-v2-shell-props.types";',
  'from "./record-panel-v2-browse-workspace-input";',
  'from "./record-panel-v2-editor-workspace-input";',
  'from "./record-panel-v2-header-props";',
  'from "./record-panel-v2-workspace-props";',
]) {
  if (!shellViewPropsSource.includes(requiredShellViewPropsImport)) {
    throw new Error(
      `record-panel-v2-shell-view-props.ts must import delegated shell-view contracts: ${requiredShellViewPropsImport}`,
    );
  }
}

for (const requiredShellViewPropsUsage of [
  "export function buildRecordPanelShellViewProps({ controller, props }: RecordPanelShellInput)",
  "buildRecordBrowseWorkspaceProps(",
  "buildRecordBrowseWorkspaceInput({ controller, props })",
  "buildRecordEditorWorkspaceProps(",
  "buildRecordEditorWorkspaceInput({ controller, props })",
  "buildRecordPanelHeaderProps({",
]) {
  if (!shellViewPropsSource.includes(requiredShellViewPropsUsage)) {
    throw new Error(
      `record-panel-v2-shell-view-props.ts must own shell-view prop assembly: ${requiredShellViewPropsUsage}`,
    );
  }
}

const maxShellViewPropsLines = 30;
if (shellViewPropsLines > maxShellViewPropsLines) {
  throw new Error(
    `record-panel-v2-shell-view-props.ts exceeded ${maxShellViewPropsLines} lines: ${shellViewPropsLines}`,
  );
}

for (const requiredControllerImport of [
  'from "./record-panel-controller.types";',
  'from "./record-panel-controller-handler-groups-input";',
  'from "./record-panel-controller-sync-input";',
  'from "./record-panel-controller-handler-groups";',
  'from "./record-panel-controller-result";',
  'from "./use-record-panel-controller-sync";',
  'from "./use-record-panel-controller-state";',
  'from "./use-record-panel-controller-view-data";',
]) {
  if (!controllerSource.includes(requiredControllerImport)) {
    throw new Error(`use-record-panel-controller.ts must import delegated controller helpers: ${requiredControllerImport}`);
  }
}

for (const requiredHandlerGroupsImport of [
  'from "./record-panel-controller-handler-group-inputs";',
  'from "./record-panel-controller-media-handlers";',
  'from "./record-panel-controller-record-handlers";',
]) {
  if (!fs.readFileSync(recordPanelControllerHandlerGroupsPath, "utf8").includes(requiredHandlerGroupsImport)) {
    throw new Error(
      `record-panel-controller-handler-groups.ts must import delegated handler-group helpers: ${requiredHandlerGroupsImport}`,
    );
  }
}

for (const requiredControllerUsage of [
  "useRecordPanelControllerSync(buildRecordPanelControllerSyncInput({ props, state, viewData }))",
  "useRecordPanelControllerViewData({",
  "useRecordPanelControllerState(props.recordFilter)",
  "buildRecordPanelControllerHandlerGroupsInput({ props, state, viewData })",
  "createRecordPanelControllerHandlerGroups(",
  "const { recordHandlers, mediaHandlers } = createRecordPanelControllerHandlerGroups(",
  "buildRecordPanelControllerResult({ mediaHandlers, recordHandlers, state, viewData })",
]) {
  if (!controllerSource.includes(requiredControllerUsage)) {
    throw new Error(`use-record-panel-controller.ts must delegate controller orchestration: ${requiredControllerUsage}`);
  }
}

for (const forbiddenControllerToken of [
  'from "../lib/api";',
  "useEffect(",
  "useMemo(",
  "useState(",
  "const handle",
  "fetchMediaBlob(",
  "event.preventDefault()",
  "URL.createObjectURL(",
  "actionableDeadLetterIds: viewData.actionableDeadLetterIds",
  "recordFilter: props.recordFilter",
  "selectedRecord: viewData.selectedRecord",
  "setFilterDraft: state.setFilterDraft",
  "setForm: state.setForm",
  "setLocationReviewForm: state.setLocationReviewForm",
  "setReminderForm: state.setReminderForm",
  "setSelectedDeadLetterIds: state.setSelectedDeadLetterIds",
  "setSelectedDeadLetterIds((current)",
  "locale,",
  "...recordHandlers",
  "...mediaHandlers",
  "detailCopy: viewData.detailCopy,",
  "workspaceId,",
]) {
  if (controllerSource.includes(forbiddenControllerToken)) {
    throw new Error(`use-record-panel-controller.ts must keep sync and handler details delegated: ${forbiddenControllerToken}`);
  }
}

const maxControllerLines = 130;
if (controllerLines > maxControllerLines) {
  throw new Error(`use-record-panel-controller.ts exceeded ${maxControllerLines} lines: ${controllerLines}`);
}

for (const requiredControllerSyncInputImport of [
  'from "./record-panel-controller.types";',
  'from "./use-record-panel-controller-state";',
  'from "./use-record-panel-controller-view-data";',
]) {
  if (!controllerSyncInputSource.includes(requiredControllerSyncInputImport)) {
    throw new Error(
      `record-panel-controller-sync-input.ts must import delegated sync-input contracts: ${requiredControllerSyncInputImport}`,
    );
  }
}

for (const requiredControllerSyncInputUsage of [
  "export function buildRecordPanelControllerSyncInput({",
  'props: Pick<ControllerProps, "recordFilter">;',
  'viewData: Pick<ControllerViewData, "actionableDeadLetterIds" | "selectedRecord">;',
  "actionableDeadLetterIds: viewData.actionableDeadLetterIds,",
  "setSelectedDeadLetterIds: state.setSelectedDeadLetterIds,",
]) {
  if (!controllerSyncInputSource.includes(requiredControllerSyncInputUsage)) {
    throw new Error(
      `record-panel-controller-sync-input.ts must own sync-input assembly: ${requiredControllerSyncInputUsage}`,
    );
  }
}

const maxControllerSyncInputLines = 35;
if (controllerSyncInputLines > maxControllerSyncInputLines) {
  throw new Error(
    `record-panel-controller-sync-input.ts exceeded ${maxControllerSyncInputLines} lines: ${controllerSyncInputLines}`,
  );
}

for (const requiredControllerSyncImport of [
  'from "./use-record-panel-controller-dead-letter-sync";',
  'from "./use-record-panel-controller-filter-sync";',
  'from "./use-record-panel-controller-selected-record-sync";',
  'from "./use-record-panel-controller-sync.types";',
]) {
  if (!controllerSyncSource.includes(requiredControllerSyncImport)) {
    throw new Error(
      `use-record-panel-controller-sync.ts must import delegated sync hooks: ${requiredControllerSyncImport}`,
    );
  }
}

for (const requiredControllerSyncUsage of [
  "useRecordPanelControllerDeadLetterSync({ actionableDeadLetterIds, setSelectedDeadLetterIds })",
  "useRecordPanelControllerSelectedRecordSync({",
  "useRecordPanelControllerFilterSync({ recordFilter, setFilterDraft })",
  "}: RecordPanelControllerSyncInput)",
]) {
  if (!controllerSyncSource.includes(requiredControllerSyncUsage)) {
    throw new Error(
      `use-record-panel-controller-sync.ts must delegate sync orchestration: ${requiredControllerSyncUsage}`,
    );
  }
}

for (const forbiddenControllerSyncToken of [
  'from "../lib/record-panel-forms";',
  'from "../lib/types";',
  "useEffect(",
  "createEmptyForm(",
  "createEmptyReminderForm(",
  "formatDatetimeInput(",
  "readLocationForm(",
  "readLocationReviewForm(",
  "setSelectedDeadLetterIds((current)",
  "actionableDeadLetterIds: Set<string>;",
  "recordFilter: RecordFilterState;",
  "selectedRecord: RecordItem | null;",
]) {
  if (controllerSyncSource.includes(forbiddenControllerSyncToken)) {
    throw new Error(
      `use-record-panel-controller-sync.ts must keep sync effect internals delegated: ${forbiddenControllerSyncToken}`,
    );
  }
}

const maxControllerSyncLines = 35;
if (controllerSyncLines > maxControllerSyncLines) {
  throw new Error(
    `use-record-panel-controller-sync.ts exceeded ${maxControllerSyncLines} lines: ${controllerSyncLines}`,
  );
}

for (const requiredControllerSyncTypesImport of [
  'from "./record-panel-controller.types";',
  'from "./use-record-panel-controller-state";',
  'from "./use-record-panel-controller-view-data";',
]) {
  if (!controllerSyncTypesSource.includes(requiredControllerSyncTypesImport)) {
    throw new Error(
      `use-record-panel-controller-sync.types.ts must import controller sync-type dependencies: ${requiredControllerSyncTypesImport}`,
    );
  }
}

for (const requiredControllerSyncTypesUsage of [
  "type ControllerState = ReturnType<typeof useRecordPanelControllerState>;",
  "type ControllerViewData = ReturnType<typeof useRecordPanelControllerViewData>;",
  'export type RecordPanelControllerSyncInput = { recordFilter: ControllerProps["recordFilter"] } &',
  '"actionableDeadLetterIds" | "selectedRecord"',
  '"recordFilter"',
]) {
  if (!controllerSyncTypesSource.includes(requiredControllerSyncTypesUsage)) {
    throw new Error(
      `use-record-panel-controller-sync.types.ts must own controller sync typing: ${requiredControllerSyncTypesUsage}`,
    );
  }
}

const maxControllerSyncTypesLines = 20;
if (controllerSyncTypesLines > maxControllerSyncTypesLines) {
  throw new Error(
    `use-record-panel-controller-sync.types.ts exceeded ${maxControllerSyncTypesLines} lines: ${controllerSyncTypesLines}`,
  );
}

for (const requiredControllerDeadLetterSyncImport of [
  'from "react";',
]) {
  if (!controllerDeadLetterSyncSource.includes(requiredControllerDeadLetterSyncImport)) {
    throw new Error(
      `use-record-panel-controller-dead-letter-sync.ts must import dead-letter sync contracts: ${requiredControllerDeadLetterSyncImport}`,
    );
  }
}

for (const requiredControllerDeadLetterSyncUsage of [
  "export function useRecordPanelControllerDeadLetterSync({",
  "useEffect(() => {",
  "setSelectedDeadLetterIds((current) => current.filter((item) => actionableDeadLetterIds.has(item)))",
]) {
  if (!controllerDeadLetterSyncSource.includes(requiredControllerDeadLetterSyncUsage)) {
    throw new Error(
      `use-record-panel-controller-dead-letter-sync.ts must own dead-letter selection sync: ${requiredControllerDeadLetterSyncUsage}`,
    );
  }
}

const maxControllerDeadLetterSyncLines = 18;
if (controllerDeadLetterSyncLines > maxControllerDeadLetterSyncLines) {
  throw new Error(
    `use-record-panel-controller-dead-letter-sync.ts exceeded ${maxControllerDeadLetterSyncLines} lines: ${controllerDeadLetterSyncLines}`,
  );
}

for (const requiredControllerSelectedRecordSyncTypesImport of [
  'from "react";',
  'from "../lib/record-panel-forms";',
  'from "../lib/types";',
]) {
  if (!controllerSelectedRecordSyncTypesSource.includes(requiredControllerSelectedRecordSyncTypesImport)) {
    throw new Error(
      `use-record-panel-controller-selected-record-sync.types.ts must import selected-record sync types: ${requiredControllerSelectedRecordSyncTypesImport}`,
    );
  }
}

for (const requiredControllerSelectedRecordSyncTypesUsage of [
  "type SelectedRecord = RecordItem | null;",
  "export type SelectedRecordFormSyncInput = {",
  "export type SelectedRecordReminderSyncInput = {",
  "export type SelectedRecordSyncInput = SelectedRecordFormSyncInput & SelectedRecordReminderSyncInput;",
]) {
  if (!controllerSelectedRecordSyncTypesSource.includes(requiredControllerSelectedRecordSyncTypesUsage)) {
    throw new Error(
      `use-record-panel-controller-selected-record-sync.types.ts must own selected-record sync contracts: ${requiredControllerSelectedRecordSyncTypesUsage}`,
    );
  }
}

const maxControllerSelectedRecordSyncTypesLines = 10;
if (controllerSelectedRecordSyncTypesLines > maxControllerSelectedRecordSyncTypesLines) {
  throw new Error(
    `use-record-panel-controller-selected-record-sync.types.ts exceeded ${maxControllerSelectedRecordSyncTypesLines} lines: ${controllerSelectedRecordSyncTypesLines}`,
  );
}

for (const requiredControllerSelectedRecordSyncImport of [
  'from "./use-record-panel-controller-selected-record-form-sync";',
  'from "./use-record-panel-controller-selected-record-reminder-sync";',
  'from "./use-record-panel-controller-selected-record-sync.types";',
]) {
  if (!controllerSelectedRecordSyncSource.includes(requiredControllerSelectedRecordSyncImport)) {
    throw new Error(
      `use-record-panel-controller-selected-record-sync.ts must import selected-record sync contracts: ${requiredControllerSelectedRecordSyncImport}`,
    );
  }
}

for (const requiredControllerSelectedRecordSyncUsage of [
  "export function useRecordPanelControllerSelectedRecordSync({",
  "useRecordPanelControllerSelectedRecordFormSync({ selectedRecord, setForm, setLocationReviewForm })",
  "useRecordPanelControllerSelectedRecordReminderSync({ selectedRecord, setReminderForm })",
]) {
  if (!controllerSelectedRecordSyncSource.includes(requiredControllerSelectedRecordSyncUsage)) {
    throw new Error(
      `use-record-panel-controller-selected-record-sync.ts must compose selected-record sync helpers: ${requiredControllerSelectedRecordSyncUsage}`,
    );
  }
}

for (const forbiddenControllerSelectedRecordSyncToken of [
  "Parameters<typeof useRecordPanelControllerSelectedRecordFormSync>[0]",
  "Parameters<typeof useRecordPanelControllerSelectedRecordReminderSync>[0]",
  "createEmptyForm()",
  "createEmptyReminderForm()",
  "formatDatetimeInput(selectedRecord.occurred_at)",
  "readLocationForm(selectedRecord)",
  "readLocationReviewForm(selectedRecord)",
  'setLocationReviewForm({ status: "pending", note: "" })',
]) {
  if (controllerSelectedRecordSyncSource.includes(forbiddenControllerSelectedRecordSyncToken)) {
    throw new Error(
      `use-record-panel-controller-selected-record-sync.ts must keep selected-record sync details delegated: ${forbiddenControllerSelectedRecordSyncToken}`,
    );
  }
}

const maxControllerSelectedRecordSyncLines = 15;
if (controllerSelectedRecordSyncLines > maxControllerSelectedRecordSyncLines) {
  throw new Error(
    `use-record-panel-controller-selected-record-sync.ts exceeded ${maxControllerSelectedRecordSyncLines} lines: ${controllerSelectedRecordSyncLines}`,
  );
}

for (const requiredControllerSelectedRecordFormSyncImport of [
  'from "../lib/record-panel-forms";',
  'from "./use-record-panel-controller-selected-record-sync.types";',
]) {
  if (!controllerSelectedRecordFormSyncSource.includes(requiredControllerSelectedRecordFormSyncImport)) {
    throw new Error(
      `use-record-panel-controller-selected-record-form-sync.ts must import selected-record form sync contracts: ${requiredControllerSelectedRecordFormSyncImport}`,
    );
  }
}

for (const requiredControllerSelectedRecordFormSyncUsage of [
  "export function useRecordPanelControllerSelectedRecordFormSync({",
  "createEmptyForm()",
  "formatDatetimeInput(selectedRecord.occurred_at)",
  "readLocationForm(selectedRecord)",
  "readLocationReviewForm(selectedRecord)",
  'setLocationReviewForm({ status: "pending", note: "" })',
]) {
  if (!controllerSelectedRecordFormSyncSource.includes(requiredControllerSelectedRecordFormSyncUsage)) {
    throw new Error(
      `use-record-panel-controller-selected-record-form-sync.ts must own selected-record form sync details: ${requiredControllerSelectedRecordFormSyncUsage}`,
    );
  }
}

for (const forbiddenControllerSelectedRecordFormSyncToken of [
  'import type { Dispatch, SetStateAction } from "react";',
  'from "../lib/types";',
  "selectedRecord: RecordItem | null;",
  "setForm: Dispatch<SetStateAction<RecordFormState>>;",
  "setLocationReviewForm: Dispatch<SetStateAction<LocationReviewFormState>>;",
]) {
  if (controllerSelectedRecordFormSyncSource.includes(forbiddenControllerSelectedRecordFormSyncToken)) {
    throw new Error(
      `use-record-panel-controller-selected-record-form-sync.ts must keep selected-record form input contracts delegated: ${forbiddenControllerSelectedRecordFormSyncToken}`,
    );
  }
}

const maxControllerSelectedRecordFormSyncLines = 40;
if (controllerSelectedRecordFormSyncLines > maxControllerSelectedRecordFormSyncLines) {
  throw new Error(
    `use-record-panel-controller-selected-record-form-sync.ts exceeded ${maxControllerSelectedRecordFormSyncLines} lines: ${controllerSelectedRecordFormSyncLines}`,
  );
}

for (const requiredControllerSelectedRecordReminderSyncImport of [
  'from "../lib/record-panel-forms";',
  'from "./use-record-panel-controller-selected-record-sync.types";',
]) {
  if (!controllerSelectedRecordReminderSyncSource.includes(requiredControllerSelectedRecordReminderSyncImport)) {
    throw new Error(
      `use-record-panel-controller-selected-record-reminder-sync.ts must import selected-record reminder sync contracts: ${requiredControllerSelectedRecordReminderSyncImport}`,
    );
  }
}

for (const requiredControllerSelectedRecordReminderSyncUsage of [
  "export function useRecordPanelControllerSelectedRecordReminderSync({",
  "createEmptyReminderForm()",
  'setReminderForm({ title: selectedRecord.title ?? "", message: "", remind_at: "" })',
]) {
  if (!controllerSelectedRecordReminderSyncSource.includes(requiredControllerSelectedRecordReminderSyncUsage)) {
    throw new Error(
      `use-record-panel-controller-selected-record-reminder-sync.ts must own selected-record reminder sync details: ${requiredControllerSelectedRecordReminderSyncUsage}`,
    );
  }
}

for (const forbiddenControllerSelectedRecordReminderSyncToken of [
  'import type { Dispatch, SetStateAction } from "react";',
  'from "../lib/types";',
  'type ReminderFormState',
  "selectedRecord: RecordItem | null;",
  "setReminderForm: Dispatch<SetStateAction<ReminderFormState>>",
]) {
  if (controllerSelectedRecordReminderSyncSource.includes(forbiddenControllerSelectedRecordReminderSyncToken)) {
    throw new Error(
      `use-record-panel-controller-selected-record-reminder-sync.ts must keep selected-record reminder input contracts delegated: ${forbiddenControllerSelectedRecordReminderSyncToken}`,
    );
  }
}

const maxControllerSelectedRecordReminderSyncLines = 20;
if (controllerSelectedRecordReminderSyncLines > maxControllerSelectedRecordReminderSyncLines) {
  throw new Error(
    `use-record-panel-controller-selected-record-reminder-sync.ts exceeded ${maxControllerSelectedRecordReminderSyncLines} lines: ${controllerSelectedRecordReminderSyncLines}`,
  );
}

for (const requiredControllerFilterSyncImport of [
  'from "react";',
  'from "../lib/types";',
]) {
  if (!controllerFilterSyncSource.includes(requiredControllerFilterSyncImport)) {
    throw new Error(
      `use-record-panel-controller-filter-sync.ts must import filter sync contracts: ${requiredControllerFilterSyncImport}`,
    );
  }
}

for (const requiredControllerFilterSyncUsage of [
  "export function useRecordPanelControllerFilterSync({",
  "useEffect(() => {",
  "setFilterDraft(recordFilter)",
]) {
  if (!controllerFilterSyncSource.includes(requiredControllerFilterSyncUsage)) {
    throw new Error(
      `use-record-panel-controller-filter-sync.ts must own filter draft sync: ${requiredControllerFilterSyncUsage}`,
    );
  }
}

const maxControllerFilterSyncLines = 15;
if (controllerFilterSyncLines > maxControllerFilterSyncLines) {
  throw new Error(
    `use-record-panel-controller-filter-sync.ts exceeded ${maxControllerFilterSyncLines} lines: ${controllerFilterSyncLines}`,
  );
}

for (const requiredControllerStateImport of [
  'from "../lib/types";',
  'from "./use-record-panel-controller-browse-state";',
  'from "./use-record-panel-controller-form-state";',
  'from "./use-record-panel-controller-media-state";',
]) {
  if (!controllerStateSource.includes(requiredControllerStateImport)) {
    throw new Error(
      `use-record-panel-controller-state.ts must import delegated state hooks: ${requiredControllerStateImport}`,
    );
  }
}

for (const requiredControllerStateUsage of [
  "useRecordPanelControllerFormState()",
  "useRecordPanelControllerMediaState()",
  "useRecordPanelControllerBrowseState(recordFilter)",
  "...formState",
  "...mediaState",
  "...browseState",
]) {
  if (!controllerStateSource.includes(requiredControllerStateUsage)) {
    throw new Error(
      `use-record-panel-controller-state.ts must delegate state-domain assembly: ${requiredControllerStateUsage}`,
    );
  }
}

for (const forbiddenControllerStateToken of [
  'from "react";',
  'from "../lib/record-panel-forms";',
  'from "./record-panel-v2.types";',
  "useState(",
  "createEmptyForm(",
  "createEmptyReminderForm(",
]) {
  if (controllerStateSource.includes(forbiddenControllerStateToken)) {
    throw new Error(
      `use-record-panel-controller-state.ts must keep state internals delegated: ${forbiddenControllerStateToken}`,
    );
  }
}

const maxControllerStateLines = 20;
if (controllerStateLines > maxControllerStateLines) {
  throw new Error(
    `use-record-panel-controller-state.ts exceeded ${maxControllerStateLines} lines: ${controllerStateLines}`,
  );
}

for (const requiredControllerFormStateImport of [
  'from "./use-record-panel-controller-record-form-state";',
  'from "./use-record-panel-controller-supporting-form-state";',
]) {
  if (!controllerFormStateSource.includes(requiredControllerFormStateImport)) {
    throw new Error(
      `use-record-panel-controller-form-state.ts must import form-state contracts: ${requiredControllerFormStateImport}`,
    );
  }
}

for (const requiredControllerFormStateUsage of [
  "export function useRecordPanelControllerFormState()",
  "useRecordPanelControllerRecordFormState()",
  "useRecordPanelControllerSupportingFormState()",
  "...recordFormState",
  "...supportingFormState",
]) {
  if (!controllerFormStateSource.includes(requiredControllerFormStateUsage)) {
    throw new Error(
      `use-record-panel-controller-form-state.ts must own form-state details: ${requiredControllerFormStateUsage}`,
    );
  }
}

for (const forbiddenControllerFormStateToken of [
  'from "react";',
  'from "../lib/record-panel-forms";',
  "createEmptyForm",
  "createEmptyReminderForm",
  'status: "pending"',
  "const [error, setError] = useState(\"\")",
]) {
  if (controllerFormStateSource.includes(forbiddenControllerFormStateToken)) {
    throw new Error(
      `use-record-panel-controller-form-state.ts must keep form-state internals delegated: ${forbiddenControllerFormStateToken}`,
    );
  }
}

const maxControllerFormStateLines = 15;
if (controllerFormStateLines > maxControllerFormStateLines) {
  throw new Error(
    `use-record-panel-controller-form-state.ts exceeded ${maxControllerFormStateLines} lines: ${controllerFormStateLines}`,
  );
}

for (const requiredControllerRecordFormStateImport of [
  'from "react";',
  'from "../lib/record-panel-forms";',
]) {
  if (!controllerRecordFormStateSource.includes(requiredControllerRecordFormStateImport)) {
    throw new Error(
      `use-record-panel-controller-record-form-state.ts must import record-form-state contracts: ${requiredControllerRecordFormStateImport}`,
    );
  }
}

for (const requiredControllerRecordFormStateUsage of [
  "export function useRecordPanelControllerRecordFormState()",
  "const [form, setForm] = useState(createEmptyForm)",
  "const [saving, setSaving] = useState(false)",
  "const [deleting, setDeleting] = useState(false)",
]) {
  if (!controllerRecordFormStateSource.includes(requiredControllerRecordFormStateUsage)) {
    throw new Error(
      `use-record-panel-controller-record-form-state.ts must own record-form-state details: ${requiredControllerRecordFormStateUsage}`,
    );
  }
}

const maxControllerRecordFormStateLines = 15;
if (controllerRecordFormStateLines > maxControllerRecordFormStateLines) {
  throw new Error(
    `use-record-panel-controller-record-form-state.ts exceeded ${maxControllerRecordFormStateLines} lines: ${controllerRecordFormStateLines}`,
  );
}

for (const requiredControllerSupportingFormStateImport of [
  'from "react";',
  'from "../lib/record-panel-forms";',
]) {
  if (!controllerSupportingFormStateSource.includes(requiredControllerSupportingFormStateImport)) {
    throw new Error(
      `use-record-panel-controller-supporting-form-state.ts must import supporting-form-state contracts: ${requiredControllerSupportingFormStateImport}`,
    );
  }
}

for (const requiredControllerSupportingFormStateUsage of [
  "export function useRecordPanelControllerSupportingFormState()",
  "createEmptyReminderForm",
  "const [savingReminder, setSavingReminder] = useState(false)",
  'status: "pending"',
  "const [error, setError] = useState(\"\")",
]) {
  if (!controllerSupportingFormStateSource.includes(requiredControllerSupportingFormStateUsage)) {
    throw new Error(
      `use-record-panel-controller-supporting-form-state.ts must own supporting-form-state details: ${requiredControllerSupportingFormStateUsage}`,
    );
  }
}

const maxControllerSupportingFormStateLines = 30;
if (controllerSupportingFormStateLines > maxControllerSupportingFormStateLines) {
  throw new Error(
    `use-record-panel-controller-supporting-form-state.ts exceeded ${maxControllerSupportingFormStateLines} lines: ${controllerSupportingFormStateLines}`,
  );
}

for (const requiredControllerMediaStateImport of [
  'from "react";',
]) {
  if (!controllerMediaStateSource.includes(requiredControllerMediaStateImport)) {
    throw new Error(
      `use-record-panel-controller-media-state.ts must import media-state contracts: ${requiredControllerMediaStateImport}`,
    );
  }
}

for (const requiredControllerMediaStateUsage of [
  "export function useRecordPanelControllerMediaState()",
  "const [uploading, setUploading] = useState(false)",
  "const [refreshingMediaId, setRefreshingMediaId] = useState<string | null>(null)",
  "const [selectedDeadLetterIds, setSelectedDeadLetterIds] = useState<string[]>([])",
]) {
  if (!controllerMediaStateSource.includes(requiredControllerMediaStateUsage)) {
    throw new Error(
      `use-record-panel-controller-media-state.ts must own media-state details: ${requiredControllerMediaStateUsage}`,
    );
  }
}

const maxControllerMediaStateLines = 35;
if (controllerMediaStateLines > maxControllerMediaStateLines) {
  throw new Error(
    `use-record-panel-controller-media-state.ts exceeded ${maxControllerMediaStateLines} lines: ${controllerMediaStateLines}`,
  );
}

for (const requiredControllerBrowseStateImport of [
  'from "react";',
  'from "../lib/types";',
  'from "./record-panel-v2.types";',
]) {
  if (!controllerBrowseStateSource.includes(requiredControllerBrowseStateImport)) {
    throw new Error(
      `use-record-panel-controller-browse-state.ts must import browse-state contracts: ${requiredControllerBrowseStateImport}`,
    );
  }
}

for (const requiredControllerBrowseStateUsage of [
  "export function useRecordPanelControllerBrowseState(recordFilter: RecordFilterState)",
  'useState<ViewMode>("timeline")',
  "useState<RecordFilterState>(recordFilter)",
  "const [presetName, setPresetName] = useState(\"\")",
]) {
  if (!controllerBrowseStateSource.includes(requiredControllerBrowseStateUsage)) {
    throw new Error(
      `use-record-panel-controller-browse-state.ts must own browse-state details: ${requiredControllerBrowseStateUsage}`,
    );
  }
}

const maxControllerBrowseStateLines = 20;
if (controllerBrowseStateLines > maxControllerBrowseStateLines) {
  throw new Error(
    `use-record-panel-controller-browse-state.ts exceeded ${maxControllerBrowseStateLines} lines: ${controllerBrowseStateLines}`,
  );
}

for (const requiredControllerHandlerGroupsInputTypesImport of [
  'from "./record-panel-controller-handler-group-props-input.types";',
  'from "./record-panel-controller-handler-group-state-input.types";',
  'from "./record-panel-controller-handler-group-view-data-input.types";',
]) {
  if (!controllerHandlerGroupsInputTypesSource.includes(requiredControllerHandlerGroupsInputTypesImport)) {
    throw new Error(
      `record-panel-controller-handler-groups-input.types.ts must import handler-group input contracts: ${requiredControllerHandlerGroupsInputTypesImport}`,
    );
  }
}

for (const requiredControllerHandlerGroupsInputTypesUsage of [
  "export type RecordPanelControllerHandlerGroupsInputArgs = {",
  "props: RecordPanelControllerHandlerGroupPropsInput;",
  "state: RecordPanelControllerHandlerGroupStateInput;",
  "viewData: RecordPanelControllerHandlerGroupViewDataInput;",
]) {
  if (!controllerHandlerGroupsInputTypesSource.includes(requiredControllerHandlerGroupsInputTypesUsage)) {
    throw new Error(
      `record-panel-controller-handler-groups-input.types.ts must own handler-group input typing: ${requiredControllerHandlerGroupsInputTypesUsage}`,
    );
  }
}

const maxControllerHandlerGroupsInputTypesLines = 10;
if (controllerHandlerGroupsInputTypesLines > maxControllerHandlerGroupsInputTypesLines) {
  throw new Error(
    `record-panel-controller-handler-groups-input.types.ts exceeded ${maxControllerHandlerGroupsInputTypesLines} lines: ${controllerHandlerGroupsInputTypesLines}`,
  );
}

for (const requiredControllerHandlerGroupsInputImport of [
  'from "./record-panel-controller-handler-groups-input.types";',
  'from "./record-panel-controller-handler-groups-props-input";',
  'from "./record-panel-controller-handler-groups-state-input";',
  'from "./record-panel-controller-handler-groups-view-data-input";',
]) {
  if (!controllerHandlerGroupsInputSource.includes(requiredControllerHandlerGroupsInputImport)) {
    throw new Error(
      `record-panel-controller-handler-groups-input.ts must import controller handler-group dependencies: ${requiredControllerHandlerGroupsInputImport}`,
    );
  }
}

for (const requiredControllerHandlerGroupsInputUsage of [
  "export function buildRecordPanelControllerHandlerGroupsInput({",
  "buildRecordPanelControllerHandlerGroupsPropsInput(props)",
  "buildRecordPanelControllerHandlerGroupsStateInput(state)",
  "buildRecordPanelControllerHandlerGroupsViewDataInput(viewData)",
]) {
  if (!controllerHandlerGroupsInputSource.includes(requiredControllerHandlerGroupsInputUsage)) {
    throw new Error(
      `record-panel-controller-handler-groups-input.ts must own handler-group input assembly: ${requiredControllerHandlerGroupsInputUsage}`,
    );
  }
}

for (const forbiddenControllerHandlerGroupsInputToken of [
  "type ControllerHandlerGroupsInputArgs = {",
  "Parameters<typeof buildRecordPanelControllerHandlerGroupsPropsInput>[0]",
  "Parameters<typeof buildRecordPanelControllerHandlerGroupsStateInput>[0]",
  "Parameters<typeof buildRecordPanelControllerHandlerGroupsViewDataInput>[0]",
]) {
  if (controllerHandlerGroupsInputSource.includes(forbiddenControllerHandlerGroupsInputToken)) {
    throw new Error(
      `record-panel-controller-handler-groups-input.ts must keep handler-group input typing delegated: ${forbiddenControllerHandlerGroupsInputToken}`,
    );
  }
}

const maxControllerHandlerGroupsInputLines = 30;
if (controllerHandlerGroupsInputLines > maxControllerHandlerGroupsInputLines) {
  throw new Error(
    `record-panel-controller-handler-groups-input.ts exceeded ${maxControllerHandlerGroupsInputLines} lines: ${controllerHandlerGroupsInputLines}`,
  );
}

for (const requiredControllerHandlerGroupsPropsInputImport of [
  'from "./record-panel-controller-handler-group-props-input.types";',
]) {
  if (!controllerHandlerGroupsPropsInputSource.includes(requiredControllerHandlerGroupsPropsInputImport)) {
    throw new Error(
      `record-panel-controller-handler-groups-props-input.ts must import controller prop contracts: ${requiredControllerHandlerGroupsPropsInputImport}`,
    );
  }
}

for (const forbiddenControllerHandlerGroupsPropsInputToken of [
  'from "./record-panel-controller.types";',
  "Pick<",
  "ControllerProps,",
]) {
  if (controllerHandlerGroupsPropsInputSource.includes(forbiddenControllerHandlerGroupsPropsInputToken)) {
    throw new Error(
      `record-panel-controller-handler-groups-props-input.ts must keep prop input typing delegated: ${forbiddenControllerHandlerGroupsPropsInputToken}`,
    );
  }
}

for (const requiredControllerHandlerGroupsPropsInputUsage of [
  "export function buildRecordPanelControllerHandlerGroupsPropsInput(",
  "mediaDeadLetterOverview: props.mediaDeadLetterOverview,",
  "onUploadMedia: props.onUploadMedia,",
  "workspaceId: props.workspaceId,",
]) {
  if (!controllerHandlerGroupsPropsInputSource.includes(requiredControllerHandlerGroupsPropsInputUsage)) {
    throw new Error(
      `record-panel-controller-handler-groups-props-input.ts must own prop-derived handler-group input mapping: ${requiredControllerHandlerGroupsPropsInputUsage}`,
    );
  }
}

const maxControllerHandlerGroupsPropsInputLines = 40;
if (controllerHandlerGroupsPropsInputLines > maxControllerHandlerGroupsPropsInputLines) {
  throw new Error(
    `record-panel-controller-handler-groups-props-input.ts exceeded ${maxControllerHandlerGroupsPropsInputLines} lines: ${controllerHandlerGroupsPropsInputLines}`,
  );
}

for (const requiredControllerHandlerGroupsStateInputImport of [
  'from "./record-panel-controller-handler-group-state-input.types";',
]) {
  if (!controllerHandlerGroupsStateInputSource.includes(requiredControllerHandlerGroupsStateInputImport)) {
    throw new Error(
      `record-panel-controller-handler-groups-state-input.ts must import controller state contracts: ${requiredControllerHandlerGroupsStateInputImport}`,
    );
  }
}

for (const requiredControllerHandlerGroupsStateInputUsage of [
  "export function buildRecordPanelControllerHandlerGroupsStateInput(",
  "filterDraft: state.filterDraft,",
  "setSavingReminder: state.setSavingReminder,",
  "setUploading: state.setUploading,",
]) {
  if (!controllerHandlerGroupsStateInputSource.includes(requiredControllerHandlerGroupsStateInputUsage)) {
    throw new Error(
      `record-panel-controller-handler-groups-state-input.ts must own state-derived handler-group input mapping: ${requiredControllerHandlerGroupsStateInputUsage}`,
    );
  }
}

for (const forbiddenControllerHandlerGroupsStateInputToken of [
  'from "./use-record-panel-controller-state";',
  "type ControllerState =",
  "state: ControllerState",
]) {
  if (controllerHandlerGroupsStateInputSource.includes(forbiddenControllerHandlerGroupsStateInputToken)) {
    throw new Error(
      `record-panel-controller-handler-groups-state-input.ts must keep state input typing delegated: ${forbiddenControllerHandlerGroupsStateInputToken}`,
    );
  }
}

const maxControllerHandlerGroupsStateInputLines = 35;
if (controllerHandlerGroupsStateInputLines > maxControllerHandlerGroupsStateInputLines) {
  throw new Error(
    `record-panel-controller-handler-groups-state-input.ts exceeded ${maxControllerHandlerGroupsStateInputLines} lines: ${controllerHandlerGroupsStateInputLines}`,
  );
}

for (const requiredControllerHandlerGroupsViewDataInputImport of [
  'from "./record-panel-controller-handler-group-view-data-input.types";',
]) {
  if (!controllerHandlerGroupsViewDataInputSource.includes(requiredControllerHandlerGroupsViewDataInputImport)) {
    throw new Error(
      `record-panel-controller-handler-groups-view-data-input.ts must import controller view-data contracts: ${requiredControllerHandlerGroupsViewDataInputImport}`,
    );
  }
}

for (const requiredControllerHandlerGroupsViewDataInputUsage of [
  "export function buildRecordPanelControllerHandlerGroupsViewDataInput(",
  "detailCopy: viewData.detailCopy,",
  "selectedRecord: viewData.selectedRecord,",
]) {
  if (!controllerHandlerGroupsViewDataInputSource.includes(requiredControllerHandlerGroupsViewDataInputUsage)) {
    throw new Error(
      `record-panel-controller-handler-groups-view-data-input.ts must own view-data-derived handler-group input mapping: ${requiredControllerHandlerGroupsViewDataInputUsage}`,
    );
  }
}

for (const forbiddenControllerHandlerGroupsViewDataInputToken of [
  'from "./use-record-panel-controller-view-data";',
  "type ControllerViewData =",
  "viewData: ControllerViewData",
]) {
  if (controllerHandlerGroupsViewDataInputSource.includes(forbiddenControllerHandlerGroupsViewDataInputToken)) {
    throw new Error(
      `record-panel-controller-handler-groups-view-data-input.ts must keep view-data input typing delegated: ${forbiddenControllerHandlerGroupsViewDataInputToken}`,
    );
  }
}

const maxControllerHandlerGroupsViewDataInputLines = 15;
if (controllerHandlerGroupsViewDataInputLines > maxControllerHandlerGroupsViewDataInputLines) {
  throw new Error(
    `record-panel-controller-handler-groups-view-data-input.ts exceeded ${maxControllerHandlerGroupsViewDataInputLines} lines: ${controllerHandlerGroupsViewDataInputLines}`,
  );
}

for (const requiredControllerViewDataImport of [
  'from "./record-panel-controller-record-view-data";',
  'from "./record-panel-controller-selected-record-view-data";',
  'from "./use-record-panel-controller-localized-view-data";',
]) {
  if (!controllerViewDataSource.includes(requiredControllerViewDataImport)) {
    throw new Error(
      `use-record-panel-controller-view-data.ts must import delegated view-data helpers: ${requiredControllerViewDataImport}`,
    );
  }
}

for (const requiredControllerViewDataUsage of [
  "buildRecordPanelRecordViewData({ records, selectedRecordId })",
  "buildRecordPanelSelectedRecordViewData({ mediaAssets, mediaDeadLetterOverview, selectedRecord: recordViewData.selectedRecord })",
  "useRecordPanelControllerLocalizedViewData()",
  "...recordViewData",
  "...selectedRecordViewData",
  "...localizedViewData",
]) {
  if (!controllerViewDataSource.includes(requiredControllerViewDataUsage)) {
    throw new Error(
      `use-record-panel-controller-view-data.ts must delegate view-data derivation: ${requiredControllerViewDataUsage}`,
    );
  }
}

for (const forbiddenControllerViewDataToken of [
  'from "../lib/location";',
  'from "../lib/locale";',
  'from "../lib/record-panel-detail";',
  'from "../lib/record-panel-ui";',
  'from "./record-panel-controller-localized-view-data";',
  "records.filter((record) => record.is_avoid).length",
  'records.filter((record) => record.type_code === "food").length',
  "records.find((record) => record.id === selectedRecordId) ?? null",
  "formatByteCount(mediaAssets.reduce((sum, asset) => sum + asset.size_bytes, 0))",
  "canRetryMediaIssue(item)",
  "readLocationReview(selectedRecord?.extra_data)",
  "readLocationHistory(selectedRecord?.extra_data).slice().reverse()",
  "getRecordPanelUiBundle(locale)",
  "getRecordPanelDetailBundle(locale)",
  "useStoredLocale()",
  "buildRecordPanelLocalizedViewData(locale)",
  "countAvoidRecords(records)",
  "countFoodRecords(records)",
  "findSelectedRecord(records, selectedRecordId)",
  "getSelectedRecordLocationReview(selectedRecord)",
  "getSelectedRecordLocationHistory(selectedRecord)",
  "getSelectedRecordMediaSizeLabel(mediaAssets)",
  "getActionableDeadLetterIds(mediaDeadLetterOverview)",
]) {
  if (controllerViewDataSource.includes(forbiddenControllerViewDataToken)) {
    throw new Error(
      `use-record-panel-controller-view-data.ts must keep view-data derivation internals delegated: ${forbiddenControllerViewDataToken}`,
    );
  }
}

const maxControllerViewDataLines = 40;
if (controllerViewDataLines > maxControllerViewDataLines) {
  throw new Error(
    `use-record-panel-controller-view-data.ts exceeded ${maxControllerViewDataLines} lines: ${controllerViewDataLines}`,
  );
}

for (const requiredControllerLocalizedViewDataHookImport of [
  'from "react";',
  'from "../lib/locale";',
  'from "./record-panel-controller-localized-view-data";',
]) {
  if (!controllerLocalizedViewDataHookSource.includes(requiredControllerLocalizedViewDataHookImport)) {
    throw new Error(
      `use-record-panel-controller-localized-view-data.ts must import localized view-data hook dependencies: ${requiredControllerLocalizedViewDataHookImport}`,
    );
  }
}

for (const requiredControllerLocalizedViewDataHookUsage of [
  "export function useRecordPanelControllerLocalizedViewData()",
  "useStoredLocale()",
  "buildRecordPanelLocalizedViewData(locale)",
  "...localizedViewData",
]) {
  if (!controllerLocalizedViewDataHookSource.includes(requiredControllerLocalizedViewDataHookUsage)) {
    throw new Error(
      `use-record-panel-controller-localized-view-data.ts must own locale-aware localized view-data derivation: ${requiredControllerLocalizedViewDataHookUsage}`,
    );
  }
}

const maxControllerLocalizedViewDataHookLines = 20;
if (controllerLocalizedViewDataHookLines > maxControllerLocalizedViewDataHookLines) {
  throw new Error(
    `use-record-panel-controller-localized-view-data.ts exceeded ${maxControllerLocalizedViewDataHookLines} lines: ${controllerLocalizedViewDataHookLines}`,
  );
}

for (const requiredControllerRecordViewDataImport of [
  'from "../lib/types";',
  'from "./record-panel-controller-view-data-helpers";',
]) {
  if (!controllerRecordViewDataSource.includes(requiredControllerRecordViewDataImport)) {
    throw new Error(
      `record-panel-controller-record-view-data.ts must import record view-data contracts: ${requiredControllerRecordViewDataImport}`,
    );
  }
}

for (const requiredControllerRecordViewDataUsage of [
  "export function buildRecordPanelRecordViewData({ records, selectedRecordId }",
  "avoidCount: countAvoidRecords(records)",
  "foodCount: countFoodRecords(records)",
  "selectedRecord: findSelectedRecord(records, selectedRecordId)",
]) {
  if (!controllerRecordViewDataSource.includes(requiredControllerRecordViewDataUsage)) {
    throw new Error(
      `record-panel-controller-record-view-data.ts must own record view-data derivation: ${requiredControllerRecordViewDataUsage}`,
    );
  }
}

const maxControllerRecordViewDataLines = 10;
if (controllerRecordViewDataLines > maxControllerRecordViewDataLines) {
  throw new Error(
    `record-panel-controller-record-view-data.ts exceeded ${maxControllerRecordViewDataLines} lines: ${controllerRecordViewDataLines}`,
  );
}

for (const requiredControllerSelectedRecordViewDataImport of [
  'from "../lib/types";',
  'from "./record-panel-controller-location-view-data";',
  'from "./record-panel-controller-view-data-helpers";',
]) {
  if (!controllerSelectedRecordViewDataSource.includes(requiredControllerSelectedRecordViewDataImport)) {
    throw new Error(
      `record-panel-controller-selected-record-view-data.ts must import selected-record view-data contracts: ${requiredControllerSelectedRecordViewDataImport}`,
    );
  }
}

for (const requiredControllerSelectedRecordViewDataUsage of [
  "export function buildRecordPanelSelectedRecordViewData({",
  "selectedLocationReview: getSelectedRecordLocationReview(selectedRecord)",
  "selectedLocationHistory: getSelectedRecordLocationHistory(selectedRecord)",
  "selectedRecordMediaSizeLabel: getSelectedRecordMediaSizeLabel(mediaAssets)",
  "actionableDeadLetterIds: getActionableDeadLetterIds(mediaDeadLetterOverview)",
]) {
  if (!controllerSelectedRecordViewDataSource.includes(requiredControllerSelectedRecordViewDataUsage)) {
    throw new Error(
      `record-panel-controller-selected-record-view-data.ts must own selected-record view-data derivation: ${requiredControllerSelectedRecordViewDataUsage}`,
    );
  }
}

const maxControllerSelectedRecordViewDataLines = 20;
if (controllerSelectedRecordViewDataLines > maxControllerSelectedRecordViewDataLines) {
  throw new Error(
    `record-panel-controller-selected-record-view-data.ts exceeded ${maxControllerSelectedRecordViewDataLines} lines: ${controllerSelectedRecordViewDataLines}`,
  );
}

for (const requiredControllerLocationViewDataImport of [
  'from "../lib/location";',
  'from "../lib/types";',
]) {
  if (!controllerLocationViewDataSource.includes(requiredControllerLocationViewDataImport)) {
    throw new Error(
      `record-panel-controller-location-view-data.ts must import location view-data contracts: ${requiredControllerLocationViewDataImport}`,
    );
  }
}

for (const requiredControllerLocationViewDataUsage of [
  "export function getSelectedRecordLocationReview(selectedRecord: RecordItem | null)",
  "export function getSelectedRecordLocationHistory(selectedRecord: RecordItem | null)",
  "readLocationReview(selectedRecord?.extra_data)",
  "readLocationHistory(selectedRecord?.extra_data).slice().reverse()",
]) {
  if (!controllerLocationViewDataSource.includes(requiredControllerLocationViewDataUsage)) {
    throw new Error(
      `record-panel-controller-location-view-data.ts must own selected-record location derivation: ${requiredControllerLocationViewDataUsage}`,
    );
  }
}

const maxControllerLocationViewDataLines = 15;
if (controllerLocationViewDataLines > maxControllerLocationViewDataLines) {
  throw new Error(
    `record-panel-controller-location-view-data.ts exceeded ${maxControllerLocationViewDataLines} lines: ${controllerLocationViewDataLines}`,
  );
}

for (const requiredControllerLocalizedViewDataImport of [
  'from "../lib/locale";',
  'from "../lib/record-panel-detail";',
  'from "../lib/record-panel-ui";',
]) {
  if (!controllerLocalizedViewDataSource.includes(requiredControllerLocalizedViewDataImport)) {
    throw new Error(
      `record-panel-controller-localized-view-data.ts must import localized view-data contracts: ${requiredControllerLocalizedViewDataImport}`,
    );
  }
}

for (const requiredControllerLocalizedViewDataUsage of [
  "export function buildRecordPanelLocalizedViewData(locale: LocaleCode)",
  "getRecordPanelUiBundle(locale)",
  "getRecordPanelDetailBundle(locale)",
  "detailCopy: detailBundle.copy",
  "summarizeRecordFilterLabel: detailBundle.summarizeRecordFilterLabel",
]) {
  if (!controllerLocalizedViewDataSource.includes(requiredControllerLocalizedViewDataUsage)) {
    throw new Error(
      `record-panel-controller-localized-view-data.ts must own localized view-data assembly: ${requiredControllerLocalizedViewDataUsage}`,
    );
  }
}

const maxControllerLocalizedViewDataLines = 25;
if (controllerLocalizedViewDataLines > maxControllerLocalizedViewDataLines) {
  throw new Error(
    `record-panel-controller-localized-view-data.ts exceeded ${maxControllerLocalizedViewDataLines} lines: ${controllerLocalizedViewDataLines}`,
  );
}

for (const requiredControllerViewDataHelpersExport of [
  'from "./record-panel-controller-record-summary-helpers";',
  'from "./record-panel-controller-media-view-data-helpers";',
]) {
  if (!controllerViewDataHelpersSource.includes(requiredControllerViewDataHelpersExport)) {
    throw new Error(
      `record-panel-controller-view-data-helpers.ts must remain a stable view-data helper boundary: ${requiredControllerViewDataHelpersExport}`,
    );
  }
}

for (const requiredControllerViewDataHelpersUsage of [
  "export {",
  "countAvoidRecords,",
  "countFoodRecords,",
  "findSelectedRecord,",
  "getActionableDeadLetterIds,",
  "getSelectedRecordMediaSizeLabel,",
]) {
  if (!controllerViewDataHelpersSource.includes(requiredControllerViewDataHelpersUsage)) {
    throw new Error(
      `record-panel-controller-view-data-helpers.ts must expose delegated view-data helpers: ${requiredControllerViewDataHelpersUsage}`,
    );
  }
}

const maxControllerViewDataHelpersLines = 10;
if (controllerViewDataHelpersLines > maxControllerViewDataHelpersLines) {
  throw new Error(
    `record-panel-controller-view-data-helpers.ts exceeded ${maxControllerViewDataHelpersLines} lines: ${controllerViewDataHelpersLines}`,
  );
}

for (const requiredRecordSummaryHelpersImport of [
  'from "../lib/types";',
]) {
  if (!recordSummaryHelpersSource.includes(requiredRecordSummaryHelpersImport)) {
    throw new Error(
      `record-panel-controller-record-summary-helpers.ts must import record-summary helper contracts: ${requiredRecordSummaryHelpersImport}`,
    );
  }
}

for (const requiredRecordSummaryHelpersUsage of [
  "export function countAvoidRecords(records: RecordItem[])",
  "export function countFoodRecords(records: RecordItem[])",
  "export function findSelectedRecord(records: RecordItem[], selectedRecordId?: string | null)",
]) {
  if (!recordSummaryHelpersSource.includes(requiredRecordSummaryHelpersUsage)) {
    throw new Error(
      `record-panel-controller-record-summary-helpers.ts must own record summary helper details: ${requiredRecordSummaryHelpersUsage}`,
    );
  }
}

const maxRecordSummaryHelpersLines = 20;
if (recordSummaryHelpersLines > maxRecordSummaryHelpersLines) {
  throw new Error(
    `record-panel-controller-record-summary-helpers.ts exceeded ${maxRecordSummaryHelpersLines} lines: ${recordSummaryHelpersLines}`,
  );
}

for (const requiredMediaViewDataHelpersImport of [
  'from "../lib/record-panel-format";',
  'from "../lib/record-panel-media";',
  'from "../lib/types";',
]) {
  if (!mediaViewDataHelpersSource.includes(requiredMediaViewDataHelpersImport)) {
    throw new Error(
      `record-panel-controller-media-view-data-helpers.ts must import media view-data helper contracts: ${requiredMediaViewDataHelpersImport}`,
    );
  }
}

for (const requiredMediaViewDataHelpersUsage of [
  "export function getSelectedRecordMediaSizeLabel(mediaAssets: MediaAsset[])",
  "export function getActionableDeadLetterIds(",
  "formatByteCount(",
  "canRetryMediaIssue(",
]) {
  if (!mediaViewDataHelpersSource.includes(requiredMediaViewDataHelpersUsage)) {
    throw new Error(
      `record-panel-controller-media-view-data-helpers.ts must own media view-data helper details: ${requiredMediaViewDataHelpersUsage}`,
    );
  }
}

const maxMediaViewDataHelpersLines = 25;
if (mediaViewDataHelpersLines > maxMediaViewDataHelpersLines) {
  throw new Error(
    `record-panel-controller-media-view-data-helpers.ts exceeded ${maxMediaViewDataHelpersLines} lines: ${mediaViewDataHelpersLines}`,
  );
}

const handlerGroupsSource = fs.readFileSync(recordPanelControllerHandlerGroupsPath, "utf8");
const handlerGroupsLines = handlerGroupsSource.split(/\r?\n/).length;

for (const requiredHandlerGroupUsage of [
  "buildRecordPanelControllerRecordHandlerInput(input)",
  "buildRecordPanelControllerMediaHandlerInput(input)",
  "createRecordPanelControllerRecordHandlers(",
  "createRecordPanelControllerMediaHandlers(",
]) {
  if (!handlerGroupsSource.includes(requiredHandlerGroupUsage)) {
    throw new Error(
      `record-panel-controller-handler-groups.ts must delegate handler input assembly: ${requiredHandlerGroupUsage}`,
    );
  }
}

for (const forbiddenHandlerGroupToken of [
  "detailCopy,",
  "filterDraft,",
  "locationReviewForm,",
  "selectedDeadLetterIds,",
  "setBulkRetryingDeadLetter,",
  "setRetryingMediaId,",
]) {
  if (handlerGroupsSource.includes(forbiddenHandlerGroupToken)) {
    throw new Error(
      `record-panel-controller-handler-groups.ts must keep handler input details delegated: ${forbiddenHandlerGroupToken}`,
    );
  }
}
const maxHandlerGroupsLines = 35;
if (handlerGroupsLines > maxHandlerGroupsLines) {
  throw new Error(
    `record-panel-controller-handler-groups.ts exceeded ${maxHandlerGroupsLines} lines: ${handlerGroupsLines}`,
  );
}

for (const requiredHandlerGroupInputsExport of [
  'export type { RecordPanelControllerHandlerGroupInput } from "./record-panel-controller-handler-group-inputs.types";',
  'export { buildRecordPanelControllerMediaHandlerInput } from "./record-panel-controller-media-handler-input";',
  'export { buildRecordPanelControllerRecordHandlerInput } from "./record-panel-controller-record-handler-input";',
]) {
  if (!handlerGroupInputsSource.includes(requiredHandlerGroupInputsExport)) {
    throw new Error(
      `record-panel-controller-handler-group-inputs.ts must remain a stable re-export boundary: ${requiredHandlerGroupInputsExport}`,
    );
  }
}

const maxHandlerGroupInputsLines = 10;
if (handlerGroupInputsLines > maxHandlerGroupInputsLines) {
  throw new Error(
    `record-panel-controller-handler-group-inputs.ts exceeded ${maxHandlerGroupInputsLines} lines: ${handlerGroupInputsLines}`,
  );
}

for (const requiredHandlerGroupInputTypesImport of [
  'from "./record-panel-controller-handler-group-props-input.types";',
  'from "./record-panel-controller-handler-group-state-input.types";',
  'from "./record-panel-controller-handler-group-view-data-input.types";',
]) {
  if (!handlerGroupInputTypesSource.includes(requiredHandlerGroupInputTypesImport)) {
    throw new Error(
      `record-panel-controller-handler-group-inputs.types.ts must import shared controller types: ${requiredHandlerGroupInputTypesImport}`,
    );
  }
}

for (const requiredHandlerGroupInputTypesUsage of [
  "export type RecordPanelControllerHandlerGroupInput =",
  "RecordPanelControllerHandlerGroupPropsInput &",
  "RecordPanelControllerHandlerGroupStateInput &",
  "RecordPanelControllerHandlerGroupViewDataInput;",
]) {
  if (!handlerGroupInputTypesSource.includes(requiredHandlerGroupInputTypesUsage)) {
    throw new Error(
      `record-panel-controller-handler-group-inputs.types.ts must own the shared handler-group contract: ${requiredHandlerGroupInputTypesUsage}`,
    );
  }
}

const maxHandlerGroupInputTypesLines = 15;
if (handlerGroupInputTypesLines > maxHandlerGroupInputTypesLines) {
  throw new Error(
    `record-panel-controller-handler-group-inputs.types.ts exceeded ${maxHandlerGroupInputTypesLines} lines: ${handlerGroupInputTypesLines}`,
  );
}

for (const requiredHandlerGroupPropsInputTypesImport of [
  'from "./record-panel-controller.types";',
]) {
  if (!handlerGroupPropsInputTypesSource.includes(requiredHandlerGroupPropsInputTypesImport)) {
    throw new Error(
      `record-panel-controller-handler-group-props-input.types.ts must import controller props: ${requiredHandlerGroupPropsInputTypesImport}`,
    );
  }
}

for (const requiredHandlerGroupPropsInputTypesUsage of [
  "export type RecordPanelControllerHandlerGroupPropsInput = Pick<",
  '"workspaceId"',
  '"onUploadMedia"',
]) {
  if (!handlerGroupPropsInputTypesSource.includes(requiredHandlerGroupPropsInputTypesUsage)) {
    throw new Error(
      `record-panel-controller-handler-group-props-input.types.ts must own prop type slices: ${requiredHandlerGroupPropsInputTypesUsage}`,
    );
  }
}

const maxHandlerGroupPropsInputTypesLines = 25;
if (handlerGroupPropsInputTypesLines > maxHandlerGroupPropsInputTypesLines) {
  throw new Error(
    `record-panel-controller-handler-group-props-input.types.ts exceeded ${maxHandlerGroupPropsInputTypesLines} lines: ${handlerGroupPropsInputTypesLines}`,
  );
}

for (const requiredHandlerGroupStateInputTypesImport of [
  'from "./use-record-panel-controller-state";',
]) {
  if (!handlerGroupStateInputTypesSource.includes(requiredHandlerGroupStateInputTypesImport)) {
    throw new Error(
      `record-panel-controller-handler-group-state-input.types.ts must import controller state: ${requiredHandlerGroupStateInputTypesImport}`,
    );
  }
}

for (const requiredHandlerGroupStateInputTypesUsage of [
  "export type RecordPanelControllerHandlerGroupStateInput = Pick<",
  '"setSavingReminder"',
  '"setUploading"',
]) {
  if (!handlerGroupStateInputTypesSource.includes(requiredHandlerGroupStateInputTypesUsage)) {
    throw new Error(
      `record-panel-controller-handler-group-state-input.types.ts must own state type slices: ${requiredHandlerGroupStateInputTypesUsage}`,
    );
  }
}

const maxHandlerGroupStateInputTypesLines = 30;
if (handlerGroupStateInputTypesLines > maxHandlerGroupStateInputTypesLines) {
  throw new Error(
    `record-panel-controller-handler-group-state-input.types.ts exceeded ${maxHandlerGroupStateInputTypesLines} lines: ${handlerGroupStateInputTypesLines}`,
  );
}

for (const requiredHandlerGroupViewDataInputTypesImport of [
  'from "./use-record-panel-controller-view-data";',
]) {
  if (!handlerGroupViewDataInputTypesSource.includes(requiredHandlerGroupViewDataInputTypesImport)) {
    throw new Error(
      `record-panel-controller-handler-group-view-data-input.types.ts must import controller view data: ${requiredHandlerGroupViewDataInputTypesImport}`,
    );
  }
}

for (const requiredHandlerGroupViewDataInputTypesUsage of [
  "export type RecordPanelControllerHandlerGroupViewDataInput = Pick<",
  '"detailCopy" | "selectedRecord"',
]) {
  if (!handlerGroupViewDataInputTypesSource.includes(requiredHandlerGroupViewDataInputTypesUsage)) {
    throw new Error(
      `record-panel-controller-handler-group-view-data-input.types.ts must own view-data type slices: ${requiredHandlerGroupViewDataInputTypesUsage}`,
    );
  }
}

const maxHandlerGroupViewDataInputTypesLines = 15;
if (handlerGroupViewDataInputTypesLines > maxHandlerGroupViewDataInputTypesLines) {
  throw new Error(
    `record-panel-controller-handler-group-view-data-input.types.ts exceeded ${maxHandlerGroupViewDataInputTypesLines} lines: ${handlerGroupViewDataInputTypesLines}`,
  );
}

for (const requiredRecordHandlerInputTypesImport of [
  'from "./record-panel-controller-filter-action-input.types";',
  'from "./record-panel-controller-form-action-input.types";',
]) {
  if (!recordHandlerInputTypesSource.includes(requiredRecordHandlerInputTypesImport)) {
    throw new Error(
      `record-panel-controller-record-handler-input.types.ts must import shared record-handler contracts: ${requiredRecordHandlerInputTypesImport}`,
    );
  }
}

for (const requiredRecordHandlerInputTypesUsage of [
  "export type RecordPanelControllerRecordHandlerInput =",
  "RecordPanelControllerFormActionInput &",
  "RecordPanelControllerFilterActionInput;",
]) {
  if (!recordHandlerInputTypesSource.includes(requiredRecordHandlerInputTypesUsage)) {
    throw new Error(
      `record-panel-controller-record-handler-input.types.ts must own record-handler contract composition: ${requiredRecordHandlerInputTypesUsage}`,
    );
  }
}

const maxRecordHandlerInputTypesLines = 10;
if (recordHandlerInputTypesLines > maxRecordHandlerInputTypesLines) {
  throw new Error(
    `record-panel-controller-record-handler-input.types.ts exceeded ${maxRecordHandlerInputTypesLines} lines: ${recordHandlerInputTypesLines}`,
  );
}

for (const requiredRecordHandlerInputImport of [
  'from "./record-panel-controller-handler-group-inputs.types";',
  'from "./record-panel-controller-record-handler-input.types";',
]) {
  if (!recordHandlerInputSource.includes(requiredRecordHandlerInputImport)) {
    throw new Error(
      `record-panel-controller-record-handler-input.ts must import the shared handler-group contract: ${requiredRecordHandlerInputImport}`,
    );
  }
}

for (const requiredRecordHandlerInputUsage of [
  "export function buildRecordPanelControllerRecordHandlerInput(",
  "): RecordPanelControllerRecordHandlerInput {",
  "detailCopy: input.detailCopy,",
  "setSavingReminder: input.setSavingReminder,",
]) {
  if (!recordHandlerInputSource.includes(requiredRecordHandlerInputUsage)) {
    throw new Error(
      `record-panel-controller-record-handler-input.ts must own record handler input shaping: ${requiredRecordHandlerInputUsage}`,
    );
  }
}

const maxRecordHandlerInputLines = 35;
if (recordHandlerInputLines > maxRecordHandlerInputLines) {
  throw new Error(
    `record-panel-controller-record-handler-input.ts exceeded ${maxRecordHandlerInputLines} lines: ${recordHandlerInputLines}`,
  );
}

for (const requiredMediaHandlerInputTypesImport of [
  'from "./record-panel-controller-dead-letter-action-input.types";',
  'from "./record-panel-controller-media-asset-action-input.types";',
]) {
  if (!mediaHandlerInputTypesSource.includes(requiredMediaHandlerInputTypesImport)) {
    throw new Error(
      `record-panel-controller-media-handler-input.types.ts must import shared media-handler contracts: ${requiredMediaHandlerInputTypesImport}`,
    );
  }
}

for (const requiredMediaHandlerInputTypesUsage of [
  "export type RecordPanelControllerMediaHandlerInput =",
  "RecordPanelControllerMediaAssetActionInput &",
  "RecordPanelControllerDeadLetterActionInput;",
]) {
  if (!mediaHandlerInputTypesSource.includes(requiredMediaHandlerInputTypesUsage)) {
    throw new Error(
      `record-panel-controller-media-handler-input.types.ts must own media-handler contract composition: ${requiredMediaHandlerInputTypesUsage}`,
    );
  }
}

const maxMediaHandlerInputTypesLines = 10;
if (mediaHandlerInputTypesLines > maxMediaHandlerInputTypesLines) {
  throw new Error(
    `record-panel-controller-media-handler-input.types.ts exceeded ${maxMediaHandlerInputTypesLines} lines: ${mediaHandlerInputTypesLines}`,
  );
}

for (const requiredMediaHandlerInputImport of [
  'from "./record-panel-controller-handler-group-inputs.types";',
  'from "./record-panel-controller-media-handler-input.types";',
]) {
  if (!mediaHandlerInputSource.includes(requiredMediaHandlerInputImport)) {
    throw new Error(
      `record-panel-controller-media-handler-input.ts must import the shared handler-group contract: ${requiredMediaHandlerInputImport}`,
    );
  }
}

for (const requiredMediaHandlerInputUsage of [
  "export function buildRecordPanelControllerMediaHandlerInput(",
  "): RecordPanelControllerMediaHandlerInput {",
  "authToken: input.authToken,",
  "workspaceId: input.workspaceId,",
]) {
  if (!mediaHandlerInputSource.includes(requiredMediaHandlerInputUsage)) {
    throw new Error(
      `record-panel-controller-media-handler-input.ts must own media handler input shaping: ${requiredMediaHandlerInputUsage}`,
    );
  }
}

const maxMediaHandlerInputLines = 35;
if (mediaHandlerInputLines > maxMediaHandlerInputLines) {
  throw new Error(
    `record-panel-controller-media-handler-input.ts exceeded ${maxMediaHandlerInputLines} lines: ${mediaHandlerInputLines}`,
  );
}

for (const requiredControllerResultImport of [
  'from "./record-panel-controller-handler-groups";',
  'from "./record-panel-controller-state-result";',
  'from "./record-panel-controller-view-data-result";',
  'from "./use-record-panel-controller-state";',
  'from "./use-record-panel-controller-view-data";',
]) {
  if (!controllerResultSource.includes(requiredControllerResultImport)) {
    throw new Error(
      `record-panel-controller-result.ts must import delegated controller result types: ${requiredControllerResultImport}`,
    );
  }
}

for (const requiredControllerResultUsage of [
  "export function buildRecordPanelControllerResult({",
  "buildRecordPanelControllerViewDataResult(viewData)",
  "buildRecordPanelControllerStateResult(state)",
  "...recordHandlers",
  "...mediaHandlers",
]) {
  if (!controllerResultSource.includes(requiredControllerResultUsage)) {
    throw new Error(
      `record-panel-controller-result.ts must own final controller result assembly: ${requiredControllerResultUsage}`,
    );
  }
}

for (const forbiddenControllerResultToken of [
  "useEffect(",
  "useMemo(",
  "useState(",
  "createRecordPanelControllerHandlerGroups(",
  "useRecordPanelControllerSync(",
  "locale: viewData.locale,",
  "form: state.form,",
  "detailCopy: viewData.detailCopy,",
]) {
  if (controllerResultSource.includes(forbiddenControllerResultToken)) {
    throw new Error(
      `record-panel-controller-result.ts must keep orchestration delegated: ${forbiddenControllerResultToken}`,
    );
  }
}

const maxControllerResultLines = 80;
if (controllerResultLines > maxControllerResultLines) {
  throw new Error(
    `record-panel-controller-result.ts exceeded ${maxControllerResultLines} lines: ${controllerResultLines}`,
  );
}

for (const requiredControllerStateResultImport of [
  'from "./use-record-panel-controller-state";',
]) {
  if (!controllerStateResultSource.includes(requiredControllerStateResultImport)) {
    throw new Error(
      `record-panel-controller-state-result.ts must import controller state dependencies: ${requiredControllerStateResultImport}`,
    );
  }
}

for (const requiredControllerStateResultUsage of [
  "export function buildRecordPanelControllerStateResult(state: ControllerState)",
  "form: state.form,",
  "setViewMode: state.setViewMode,",
  "error: state.error,",
]) {
  if (!controllerStateResultSource.includes(requiredControllerStateResultUsage)) {
    throw new Error(
      `record-panel-controller-state-result.ts must own state result assembly: ${requiredControllerStateResultUsage}`,
    );
  }
}

const maxControllerStateResultLines = 35;
if (controllerStateResultLines > maxControllerStateResultLines) {
  throw new Error(
    `record-panel-controller-state-result.ts exceeded ${maxControllerStateResultLines} lines: ${controllerStateResultLines}`,
  );
}

for (const requiredControllerViewDataResultImport of [
  'from "./record-panel-controller-core-view-data-result";',
  'from "./record-panel-controller-localized-view-data-result";',
  'from "./use-record-panel-controller-view-data";',
]) {
  if (!controllerViewDataResultSource.includes(requiredControllerViewDataResultImport)) {
    throw new Error(
      `record-panel-controller-view-data-result.ts must import controller view-data dependencies: ${requiredControllerViewDataResultImport}`,
    );
  }
}

for (const requiredControllerViewDataResultUsage of [
  "export function buildRecordPanelControllerViewDataResult(viewData: ControllerViewData)",
  "buildRecordPanelControllerCoreViewDataResult(viewData)",
  "buildRecordPanelControllerLocalizedViewDataResult(viewData)",
]) {
  if (!controllerViewDataResultSource.includes(requiredControllerViewDataResultUsage)) {
    throw new Error(
      `record-panel-controller-view-data-result.ts must own view-data result assembly: ${requiredControllerViewDataResultUsage}`,
    );
  }
}

for (const forbiddenControllerViewDataResultToken of [
  "locale: viewData.locale,",
  "selectedRecord: viewData.selectedRecord,",
  "detailCopy: viewData.detailCopy,",
  "formatReminderStatusLabel: viewData.formatReminderStatusLabel,",
  "summarizeRecordFilterLabel: viewData.summarizeRecordFilterLabel,",
]) {
  if (controllerViewDataResultSource.includes(forbiddenControllerViewDataResultToken)) {
    throw new Error(
      `record-panel-controller-view-data-result.ts must keep core/localized field details delegated: ${forbiddenControllerViewDataResultToken}`,
    );
  }
}

const maxControllerViewDataResultLines = 20;
if (controllerViewDataResultLines > maxControllerViewDataResultLines) {
  throw new Error(
    `record-panel-controller-view-data-result.ts exceeded ${maxControllerViewDataResultLines} lines: ${controllerViewDataResultLines}`,
  );
}

for (const requiredControllerCoreViewDataResultImport of [
  'from "./use-record-panel-controller-view-data";',
]) {
  if (!controllerCoreViewDataResultSource.includes(requiredControllerCoreViewDataResultImport)) {
    throw new Error(
      `record-panel-controller-core-view-data-result.ts must import controller view-data dependencies: ${requiredControllerCoreViewDataResultImport}`,
    );
  }
}

for (const requiredControllerCoreViewDataResultUsage of [
  "export function buildRecordPanelControllerCoreViewDataResult(viewData: ControllerViewData)",
  "locale: viewData.locale,",
  "selectedRecord: viewData.selectedRecord,",
  "selectedRecordMediaSizeLabel: viewData.selectedRecordMediaSizeLabel,",
]) {
  if (!controllerCoreViewDataResultSource.includes(requiredControllerCoreViewDataResultUsage)) {
    throw new Error(
      `record-panel-controller-core-view-data-result.ts must own non-localized result assembly: ${requiredControllerCoreViewDataResultUsage}`,
    );
  }
}

const maxControllerCoreViewDataResultLines = 20;
if (controllerCoreViewDataResultLines > maxControllerCoreViewDataResultLines) {
  throw new Error(
    `record-panel-controller-core-view-data-result.ts exceeded ${maxControllerCoreViewDataResultLines} lines: ${controllerCoreViewDataResultLines}`,
  );
}

for (const requiredControllerLocalizedViewDataResultImport of [
  'from "./use-record-panel-controller-view-data";',
]) {
  if (!controllerLocalizedViewDataResultSource.includes(requiredControllerLocalizedViewDataResultImport)) {
    throw new Error(
      `record-panel-controller-localized-view-data-result.ts must import controller view-data dependencies: ${requiredControllerLocalizedViewDataResultImport}`,
    );
  }
}

for (const requiredControllerLocalizedViewDataResultUsage of [
  "export function buildRecordPanelControllerLocalizedViewDataResult(viewData: ControllerViewData)",
  "detailCopy: viewData.detailCopy,",
  "formatReminderStatusLabel: viewData.formatReminderStatusLabel,",
  "summarizeRecordFilterLabel: viewData.summarizeRecordFilterLabel,",
]) {
  if (!controllerLocalizedViewDataResultSource.includes(requiredControllerLocalizedViewDataResultUsage)) {
    throw new Error(
      `record-panel-controller-localized-view-data-result.ts must own localized result assembly: ${requiredControllerLocalizedViewDataResultUsage}`,
    );
  }
}

const maxControllerLocalizedViewDataResultLines = 25;
if (controllerLocalizedViewDataResultLines > maxControllerLocalizedViewDataResultLines) {
  throw new Error(
    `record-panel-controller-localized-view-data-result.ts exceeded ${maxControllerLocalizedViewDataResultLines} lines: ${controllerLocalizedViewDataResultLines}`,
  );
}

for (const requiredRecordHandlersImport of [
  'from "./record-panel-controller-filter-actions";',
  'from "./record-panel-controller-form-actions";',
  'from "./record-panel-controller-record-handler-input.types";',
]) {
  if (!recordHandlersSource.includes(requiredRecordHandlersImport)) {
    throw new Error(`record-panel-controller-record-handlers.ts must import delegated record helpers: ${requiredRecordHandlersImport}`);
  }
}

for (const requiredRecordHandlersUsage of [
  "createRecordPanelControllerFormActions(props)",
  "createRecordPanelControllerFilterActions(props)",
  "...formActions",
  "...filterActions",
]) {
  if (!recordHandlersSource.includes(requiredRecordHandlersUsage)) {
    throw new Error(`record-panel-controller-record-handlers.ts must delegate record handler assembly: ${requiredRecordHandlersUsage}`);
  }
}

for (const forbiddenRecordHandlersToken of [
  'from "../lib/record-panel-forms";',
  "Parameters<typeof createRecordPanelControllerFormActions>[0]",
  "Parameters<typeof createRecordPanelControllerFilterActions>[0]",
  "const handleSubmit",
  "const handleApplyFilter",
  "event.preventDefault()",
  "onSaveRecord(",
  "onCreateSearchPreset(",
]) {
  if (recordHandlersSource.includes(forbiddenRecordHandlersToken)) {
    throw new Error(`record-panel-controller-record-handlers.ts must keep record internals delegated: ${forbiddenRecordHandlersToken}`);
  }
}

const maxRecordHandlersLines = 20;
if (recordHandlersLines > maxRecordHandlersLines) {
  throw new Error(
    `record-panel-controller-record-handlers.ts exceeded ${maxRecordHandlersLines} lines: ${recordHandlersLines}`,
  );
}

for (const requiredFormActionInputTypesImport of [
  'from "./record-panel-controller-record-submit-action-input.types";',
  'from "./record-panel-controller-reminder-action-input.types";',
]) {
  if (!formActionInputTypesSource.includes(requiredFormActionInputTypesImport)) {
    throw new Error(
      `record-panel-controller-form-action-input.types.ts must import shared form contracts: ${requiredFormActionInputTypesImport}`,
    );
  }
}

for (const requiredFormActionInputTypesUsage of [
  "export type RecordPanelControllerFormActionInput =",
  "RecordPanelControllerRecordSubmitActionInput &",
  "RecordPanelControllerReminderActionInput;",
]) {
  if (!formActionInputTypesSource.includes(requiredFormActionInputTypesUsage)) {
    throw new Error(
      `record-panel-controller-form-action-input.types.ts must own form contract composition: ${requiredFormActionInputTypesUsage}`,
    );
  }
}

const maxFormActionInputTypesLines = 10;
if (formActionInputTypesLines > maxFormActionInputTypesLines) {
  throw new Error(
    `record-panel-controller-form-action-input.types.ts exceeded ${maxFormActionInputTypesLines} lines: ${formActionInputTypesLines}`,
  );
}

for (const requiredFormActionsImport of [
  'from "./record-panel-controller-form-action-input.types";',
  'from "./record-panel-controller-record-submit-actions";',
  'from "./record-panel-controller-reminder-actions";',
]) {
  if (!formActionsSource.includes(requiredFormActionsImport)) {
    throw new Error(`record-panel-controller-form-actions.ts must import delegated form helpers: ${requiredFormActionsImport}`);
  }
}

for (const requiredFormActionsUsage of [
  "createRecordPanelControllerRecordSubmitActions(props)",
  "createRecordPanelControllerReminderActions(props)",
  "...recordSubmitActions",
  "...reminderActions",
]) {
  if (!formActionsSource.includes(requiredFormActionsUsage)) {
    throw new Error(`record-panel-controller-form-actions.ts must delegate form action assembly: ${requiredFormActionsUsage}`);
  }
}

for (const forbiddenFormActionsToken of [
  'from "../lib/record-panel-forms";',
  "Parameters<typeof createRecordPanelControllerRecordSubmitActions>[0]",
  "Parameters<typeof createRecordPanelControllerReminderActions>[0]",
  "const handleSubmit",
  "const handleDelete",
  "const handleCreateReminderSubmit",
  "event.preventDefault()",
  "onSaveRecord(",
  "onCreateReminder(",
  "onDeleteRecord(",
]) {
  if (formActionsSource.includes(forbiddenFormActionsToken)) {
    throw new Error(`record-panel-controller-form-actions.ts must keep form/reminder internals delegated: ${forbiddenFormActionsToken}`);
  }
}

const maxFormActionsLines = 20;
if (formActionsLines > maxFormActionsLines) {
  throw new Error(
    `record-panel-controller-form-actions.ts exceeded ${maxFormActionsLines} lines: ${formActionsLines}`,
  );
}

for (const requiredFilterActionInputTypesImport of [
  'from "./record-panel-controller.types";',
  'from "./record-panel-controller-filter-preset-action-input.types";',
]) {
  if (!filterActionInputTypesSource.includes(requiredFilterActionInputTypesImport)) {
    throw new Error(
      `record-panel-controller-filter-action-input.types.ts must import shared filter contracts: ${requiredFilterActionInputTypesImport}`,
    );
  }
}

for (const requiredFilterActionInputTypesUsage of [
  "export type RecordPanelControllerFilterActionInput =",
  "RecordPanelControllerFilterPresetActionInput & {",
  'onApplyRecordFilter: ControllerProps["onApplyRecordFilter"];',
]) {
  if (!filterActionInputTypesSource.includes(requiredFilterActionInputTypesUsage)) {
    throw new Error(
      `record-panel-controller-filter-action-input.types.ts must own filter contract composition: ${requiredFilterActionInputTypesUsage}`,
    );
  }
}

const maxFilterActionInputTypesLines = 10;
if (filterActionInputTypesLines > maxFilterActionInputTypesLines) {
  throw new Error(
    `record-panel-controller-filter-action-input.types.ts exceeded ${maxFilterActionInputTypesLines} lines: ${filterActionInputTypesLines}`,
  );
}

for (const requiredFilterActionsImport of [
  'from "./record-panel-controller-filter-action-input.types";',
  'from "./record-panel-controller-filter-apply-action";',
  'from "./record-panel-controller-filter-preset-actions";',
]) {
  if (!filterActionsSource.includes(requiredFilterActionsImport)) {
    throw new Error(
      `record-panel-controller-filter-actions.ts must import delegated filter helpers: ${requiredFilterActionsImport}`,
    );
  }
}

for (const requiredFilterActionsUsage of [
  "createRecordPanelControllerFilterApplyAction(props)",
  "createRecordPanelControllerFilterPresetActions(props)",
  "...applyAction",
  "...presetActions",
]) {
  if (!filterActionsSource.includes(requiredFilterActionsUsage)) {
    throw new Error(
      `record-panel-controller-filter-actions.ts must delegate filter error and preset-name handling: ${requiredFilterActionsUsage}`,
    );
  }
}

for (const forbiddenFilterActionsToken of [
  'from "./record-panel-controller.types";',
  'from "./record-panel-controller-filter-preset-action-input.types";',
  "type FilterActionProps =",
  "function getErrorMessage(",
  "getRecordPanelFilterErrorMessage(",
  "resolveRecordPanelPresetName(",
  "onCreateSearchPreset(",
  "onDeleteSearchPreset(",
  "onApplyRecordFilter(",
]) {
  if (filterActionsSource.includes(forbiddenFilterActionsToken)) {
    throw new Error(
      `record-panel-controller-filter-actions.ts must keep filter internals delegated: ${forbiddenFilterActionsToken}`,
    );
  }
}

const maxFilterActionsLines = 45;
if (filterActionsLines > maxFilterActionsLines) {
  throw new Error(
    `record-panel-controller-filter-actions.ts exceeded ${maxFilterActionsLines} lines: ${filterActionsLines}`,
  );
}

for (const requiredFilterApplyActionImport of [
  'from "../lib/record-panel-detail";',
  'from "./record-panel-controller.types";',
  'from "./record-panel-controller-filter-helpers";',
]) {
  if (!filterApplyActionSource.includes(requiredFilterApplyActionImport)) {
    throw new Error(
      `record-panel-controller-filter-apply-action.ts must import filter-apply contracts: ${requiredFilterApplyActionImport}`,
    );
  }
}

for (const requiredFilterApplyActionUsage of [
  "export function createRecordPanelControllerFilterApplyAction({",
  "filterDraft: ControllerProps[\"recordFilter\"]",
  "await onApplyRecordFilter(filterDraft)",
  "getRecordPanelFilterErrorMessage(caught, detailCopy.applyFilterError)",
]) {
  if (!filterApplyActionSource.includes(requiredFilterApplyActionUsage)) {
    throw new Error(
      `record-panel-controller-filter-apply-action.ts must own filter-apply details: ${requiredFilterApplyActionUsage}`,
    );
  }
}

const maxFilterApplyActionLines = 30;
if (filterApplyActionLines > maxFilterApplyActionLines) {
  throw new Error(
    `record-panel-controller-filter-apply-action.ts exceeded ${maxFilterApplyActionLines} lines: ${filterApplyActionLines}`,
  );
}

for (const requiredFilterPresetActionsImport of [
  'from "./record-panel-controller-filter-preset-action-input.types";',
  'from "./record-panel-controller-filter-preset-delete-action";',
  'from "./record-panel-controller-filter-preset-save-action";',
]) {
  if (!filterPresetActionsSource.includes(requiredFilterPresetActionsImport)) {
    throw new Error(
      `record-panel-controller-filter-preset-actions.ts must import delegated preset-action contracts: ${requiredFilterPresetActionsImport}`,
    );
  }
}

for (const requiredFilterPresetActionsUsage of [
  "export function createRecordPanelControllerFilterPresetActions({",
  "createRecordPanelControllerFilterPresetDeleteAction(props)",
  "createRecordPanelControllerFilterPresetSaveAction(props)",
  "...presetSaveAction",
  "...presetDeleteAction",
]) {
  if (!filterPresetActionsSource.includes(requiredFilterPresetActionsUsage)) {
    throw new Error(
      `record-panel-controller-filter-preset-actions.ts must own preset save/delete orchestration: ${requiredFilterPresetActionsUsage}`,
    );
  }
}

for (const forbiddenFilterPresetActionsToken of [
  'from "../lib/record-panel-detail";',
  'from "../lib/types";',
  'from "./record-panel-controller.types";',
  "type DetailCopy =",
  "export type RecordPanelControllerFilterPresetActionInput = {",
  "onCreateSearchPreset: ControllerProps",
  "onDeleteSearchPreset: ControllerProps",
]) {
  if (filterPresetActionsSource.includes(forbiddenFilterPresetActionsToken)) {
    throw new Error(
      `record-panel-controller-filter-preset-actions.ts must keep preset-action input contracts delegated: ${forbiddenFilterPresetActionsToken}`,
    );
  }
}

const maxFilterPresetActionsLines = 25;
if (filterPresetActionsLines > maxFilterPresetActionsLines) {
  throw new Error(
    `record-panel-controller-filter-preset-actions.ts exceeded ${maxFilterPresetActionsLines} lines: ${filterPresetActionsLines}`,
  );
}

for (const requiredFilterPresetActionInputTypesImport of [
  'from "../lib/record-panel-detail";',
  'from "../lib/types";',
  'from "./record-panel-controller.types";',
]) {
  if (!filterPresetActionInputTypesSource.includes(requiredFilterPresetActionInputTypesImport)) {
    throw new Error(
      `record-panel-controller-filter-preset-action-input.types.ts must import preset-action input contracts: ${requiredFilterPresetActionInputTypesImport}`,
    );
  }
}

for (const requiredFilterPresetActionInputTypesUsage of [
  "type DetailCopy = ReturnType<typeof getRecordPanelDetailBundle>[\"copy\"];",
  "export type RecordPanelControllerFilterPresetActionInput = {",
  "filterDraft: RecordFilterState;",
  "onCreateSearchPreset: ControllerProps[\"onCreateSearchPreset\"];",
  "onDeleteSearchPreset: ControllerProps[\"onDeleteSearchPreset\"];",
]) {
  if (!filterPresetActionInputTypesSource.includes(requiredFilterPresetActionInputTypesUsage)) {
    throw new Error(
      `record-panel-controller-filter-preset-action-input.types.ts must own preset-action input typing: ${requiredFilterPresetActionInputTypesUsage}`,
    );
  }
}

const maxFilterPresetActionInputTypesLines = 20;
if (filterPresetActionInputTypesLines > maxFilterPresetActionInputTypesLines) {
  throw new Error(
    `record-panel-controller-filter-preset-action-input.types.ts exceeded ${maxFilterPresetActionInputTypesLines} lines: ${filterPresetActionInputTypesLines}`,
  );
}

for (const requiredFilterPresetSaveActionImport of [
  'from "./record-panel-controller-filter-helpers";',
  'from "./record-panel-controller-filter-preset-action-input.types";',
]) {
  if (!filterPresetSaveActionSource.includes(requiredFilterPresetSaveActionImport)) {
    throw new Error(
      `record-panel-controller-filter-preset-save-action.ts must import preset-save contracts: ${requiredFilterPresetSaveActionImport}`,
    );
  }
}

for (const requiredFilterPresetSaveActionUsage of [
  "export function createRecordPanelControllerFilterPresetSaveAction({",
  "resolveRecordPanelPresetName(detailCopy, presetName)",
  "await onCreateSearchPreset(presetInput.presetName, filterDraft)",
  "detailCopy.savePresetError",
]) {
  if (!filterPresetSaveActionSource.includes(requiredFilterPresetSaveActionUsage)) {
    throw new Error(
      `record-panel-controller-filter-preset-save-action.ts must own preset save orchestration: ${requiredFilterPresetSaveActionUsage}`,
    );
  }
}

for (const forbiddenFilterPresetSaveActionToken of [
  'from "../lib/record-panel-detail";',
  'from "../lib/types";',
  'from "./record-panel-controller.types";',
  "type DetailCopy =",
  "onCreateSearchPreset: ControllerProps",
  "filterDraft: RecordFilterState;",
]) {
  if (filterPresetSaveActionSource.includes(forbiddenFilterPresetSaveActionToken)) {
    throw new Error(
      `record-panel-controller-filter-preset-save-action.ts must keep preset-save input contracts delegated: ${forbiddenFilterPresetSaveActionToken}`,
    );
  }
}

const maxFilterPresetSaveActionLines = 45;
if (filterPresetSaveActionLines > maxFilterPresetSaveActionLines) {
  throw new Error(
    `record-panel-controller-filter-preset-save-action.ts exceeded ${maxFilterPresetSaveActionLines} lines: ${filterPresetSaveActionLines}`,
  );
}

for (const requiredFilterPresetDeleteActionImport of [
  'from "./record-panel-controller-filter-helpers";',
  'from "./record-panel-controller-filter-preset-action-input.types";',
]) {
  if (!filterPresetDeleteActionSource.includes(requiredFilterPresetDeleteActionImport)) {
    throw new Error(
      `record-panel-controller-filter-preset-delete-action.ts must import preset-delete contracts: ${requiredFilterPresetDeleteActionImport}`,
    );
  }
}

for (const requiredFilterPresetDeleteActionUsage of [
  "export function createRecordPanelControllerFilterPresetDeleteAction({",
  "await onDeleteSearchPreset(presetId)",
  "detailCopy.deletePresetError",
]) {
  if (!filterPresetDeleteActionSource.includes(requiredFilterPresetDeleteActionUsage)) {
    throw new Error(
      `record-panel-controller-filter-preset-delete-action.ts must own preset delete orchestration: ${requiredFilterPresetDeleteActionUsage}`,
    );
  }
}

for (const forbiddenFilterPresetDeleteActionToken of [
  'from "../lib/record-panel-detail";',
  'from "./record-panel-controller.types";',
  "type DetailCopy =",
  "onDeleteSearchPreset: ControllerProps",
]) {
  if (filterPresetDeleteActionSource.includes(forbiddenFilterPresetDeleteActionToken)) {
    throw new Error(
      `record-panel-controller-filter-preset-delete-action.ts must keep preset-delete input contracts delegated: ${forbiddenFilterPresetDeleteActionToken}`,
    );
  }
}

const maxFilterPresetDeleteActionLines = 30;
if (filterPresetDeleteActionLines > maxFilterPresetDeleteActionLines) {
  throw new Error(
    `record-panel-controller-filter-preset-delete-action.ts exceeded ${maxFilterPresetDeleteActionLines} lines: ${filterPresetDeleteActionLines}`,
  );
}

for (const requiredFilterHelpersExport of [
  'from "./record-panel-controller-filter-error-helpers";',
  'from "./record-panel-controller-filter-preset-name";',
]) {
  if (!filterHelpersSource.includes(requiredFilterHelpersExport)) {
    throw new Error(
      `record-panel-controller-filter-helpers.ts must remain a stable filter-helper boundary: ${requiredFilterHelpersExport}`,
    );
  }
}

for (const requiredFilterHelpersUsage of [
  "export { getRecordPanelFilterErrorMessage }",
  "export { resolveRecordPanelPresetName }",
]) {
  if (!filterHelpersSource.includes(requiredFilterHelpersUsage)) {
    throw new Error(
      `record-panel-controller-filter-helpers.ts must expose delegated filter helpers: ${requiredFilterHelpersUsage}`,
    );
  }
}

const maxFilterHelpersLines = 10;
if (filterHelpersLines > maxFilterHelpersLines) {
  throw new Error(
    `record-panel-controller-filter-helpers.ts exceeded ${maxFilterHelpersLines} lines: ${filterHelpersLines}`,
  );
}

for (const requiredFilterErrorHelpersUsage of [
  "export function getRecordPanelFilterErrorMessage(",
]) {
  if (!filterErrorHelpersSource.includes(requiredFilterErrorHelpersUsage)) {
    throw new Error(
      `record-panel-controller-filter-error-helpers.ts must own filter error formatting: ${requiredFilterErrorHelpersUsage}`,
    );
  }
}

const maxFilterErrorHelpersLines = 10;
if (filterErrorHelpersLines > maxFilterErrorHelpersLines) {
  throw new Error(
    `record-panel-controller-filter-error-helpers.ts exceeded ${maxFilterErrorHelpersLines} lines: ${filterErrorHelpersLines}`,
  );
}

for (const requiredFilterPresetNameImport of [
  'from "../lib/record-panel-detail";',
]) {
  if (!filterPresetNameSource.includes(requiredFilterPresetNameImport)) {
    throw new Error(
      `record-panel-controller-filter-preset-name.ts must import preset-name contracts: ${requiredFilterPresetNameImport}`,
    );
  }
}

for (const requiredFilterPresetNameUsage of [
  "export function resolveRecordPanelPresetName(",
  "presetNameRequiredError",
]) {
  if (!filterPresetNameSource.includes(requiredFilterPresetNameUsage)) {
    throw new Error(
      `record-panel-controller-filter-preset-name.ts must own preset-name validation: ${requiredFilterPresetNameUsage}`,
    );
  }
}

const maxFilterPresetNameLines = 20;
if (filterPresetNameLines > maxFilterPresetNameLines) {
  throw new Error(
    `record-panel-controller-filter-preset-name.ts exceeded ${maxFilterPresetNameLines} lines: ${filterPresetNameLines}`,
  );
}

for (const requiredRecordSubmitActionInputTypesImport of [
  'from "./record-panel-controller-record-delete-action-input.types";',
  'from "./record-panel-controller-record-save-action-input.types";',
]) {
  if (!recordSubmitActionInputTypesSource.includes(requiredRecordSubmitActionInputTypesImport)) {
    throw new Error(
      `record-panel-controller-record-submit-action-input.types.ts must import shared submit contracts: ${requiredRecordSubmitActionInputTypesImport}`,
    );
  }
}

for (const requiredRecordSubmitActionInputTypesUsage of [
  "export type RecordPanelControllerRecordSubmitActionInput =",
  "RecordPanelControllerRecordSaveActionInput &",
  "RecordPanelControllerRecordDeleteActionInput;",
]) {
  if (!recordSubmitActionInputTypesSource.includes(requiredRecordSubmitActionInputTypesUsage)) {
    throw new Error(
      `record-panel-controller-record-submit-action-input.types.ts must own submit contract composition: ${requiredRecordSubmitActionInputTypesUsage}`,
    );
  }
}

const maxRecordSubmitActionInputTypesLines = 10;
if (recordSubmitActionInputTypesLines > maxRecordSubmitActionInputTypesLines) {
  throw new Error(
    `record-panel-controller-record-submit-action-input.types.ts exceeded ${maxRecordSubmitActionInputTypesLines} lines: ${recordSubmitActionInputTypesLines}`,
  );
}

for (const requiredRecordSubmitActionsImport of [
  'from "./record-panel-controller-record-submit-action-input.types";',
  'from "./record-panel-controller-record-delete-actions";',
  'from "./record-panel-controller-record-save-actions";',
]) {
  if (!recordSubmitActionsSource.includes(requiredRecordSubmitActionsImport)) {
    throw new Error(`record-panel-controller-record-submit-actions.ts must import delegated submit helpers: ${requiredRecordSubmitActionsImport}`);
  }
}

for (const requiredRecordSubmitActionsUsage of [
  "createRecordPanelControllerRecordSaveActions(props)",
  "createRecordPanelControllerRecordDeleteActions(props)",
  "...recordSaveActions",
  "...recordDeleteActions",
]) {
  if (!recordSubmitActionsSource.includes(requiredRecordSubmitActionsUsage)) {
    throw new Error(`record-panel-controller-record-submit-actions.ts must delegate submit action assembly: ${requiredRecordSubmitActionsUsage}`);
  }
}

for (const forbiddenRecordSubmitActionsToken of [
  'from "../lib/record-panel-forms";',
  'from "../lib/record-panel-detail";',
  "Parameters<typeof createRecordPanelControllerRecordSaveActions>[0]",
  "Parameters<typeof createRecordPanelControllerRecordDeleteActions>[0]",
  "const handleSubmit",
  "const handleDelete",
  "event.preventDefault()",
  "onSaveRecord(",
  "onDeleteRecord(",
]) {
  if (recordSubmitActionsSource.includes(forbiddenRecordSubmitActionsToken)) {
    throw new Error(`record-panel-controller-record-submit-actions.ts must keep save/delete internals delegated: ${forbiddenRecordSubmitActionsToken}`);
  }
}

const maxRecordSubmitActionsLines = 20;
if (recordSubmitActionsLines > maxRecordSubmitActionsLines) {
  throw new Error(
    `record-panel-controller-record-submit-actions.ts exceeded ${maxRecordSubmitActionsLines} lines: ${recordSubmitActionsLines}`,
  );
}

for (const requiredRecordDeleteActionInputTypesImport of [
  'from "../lib/record-panel-detail";',
  'from "../lib/types";',
  'from "./record-panel-controller.types";',
]) {
  if (!recordDeleteActionInputTypesSource.includes(requiredRecordDeleteActionInputTypesImport)) {
    throw new Error(
      `record-panel-controller-record-delete-action-input.types.ts must import delete input contracts: ${requiredRecordDeleteActionInputTypesImport}`,
    );
  }
}

for (const requiredRecordDeleteActionInputTypesUsage of [
  "type DetailCopy = ReturnType<typeof getRecordPanelDetailBundle>[\"copy\"];",
  "export type RecordPanelControllerRecordDeleteActionInput = {",
  'onDeleteRecord: ControllerProps["onDeleteRecord"];',
  "selectedRecord: RecordItem | null;",
  "setDeleting: (value: boolean) => void;",
]) {
  if (!recordDeleteActionInputTypesSource.includes(requiredRecordDeleteActionInputTypesUsage)) {
    throw new Error(
      `record-panel-controller-record-delete-action-input.types.ts must own delete action input typing: ${requiredRecordDeleteActionInputTypesUsage}`,
    );
  }
}

const maxRecordDeleteActionInputTypesLines = 20;
if (recordDeleteActionInputTypesLines > maxRecordDeleteActionInputTypesLines) {
  throw new Error(
    `record-panel-controller-record-delete-action-input.types.ts exceeded ${maxRecordDeleteActionInputTypesLines} lines: ${recordDeleteActionInputTypesLines}`,
  );
}

for (const requiredRecordDeleteActionsImport of [
  'from "./record-panel-controller-record-delete-action-input.types";',
  'from "./record-panel-controller-record-delete-run-action";',
]) {
  if (!recordDeleteActionsSource.includes(requiredRecordDeleteActionsImport)) {
    throw new Error(
      `record-panel-controller-record-delete-actions.ts must import delegated delete helpers: ${requiredRecordDeleteActionsImport}`,
    );
  }
}

for (const requiredRecordDeleteActionsUsage of [
  "export function createRecordPanelControllerRecordDeleteActions(",
  "createRecordPanelControllerRecordDeleteRunAction(props)",
]) {
  if (!recordDeleteActionsSource.includes(requiredRecordDeleteActionsUsage)) {
    throw new Error(
      `record-panel-controller-record-delete-actions.ts must delegate delete error handling: ${requiredRecordDeleteActionsUsage}`,
    );
  }
}

for (const forbiddenRecordDeleteActionsToken of [
  "Parameters<typeof createRecordPanelControllerRecordDeleteRunAction>[0]",
  "function getErrorMessage(",
  "detailCopy.deleteRecordError",
  "caught instanceof Error ? caught.message : fallbackMessage",
  "getRecordPanelRecordDeleteFallbackMessage(",
  "await onDeleteRecord(selectedRecord.id)",
  "getRecordPanelRecordDeleteErrorMessage(",
]) {
  if (recordDeleteActionsSource.includes(forbiddenRecordDeleteActionsToken)) {
    throw new Error(
      `record-panel-controller-record-delete-actions.ts must keep delete helper internals delegated: ${forbiddenRecordDeleteActionsToken}`,
    );
  }
}

const maxRecordDeleteActionsLines = 10;
if (recordDeleteActionsLines > maxRecordDeleteActionsLines) {
  throw new Error(
    `record-panel-controller-record-delete-actions.ts exceeded ${maxRecordDeleteActionsLines} lines: ${recordDeleteActionsLines}`,
  );
}

for (const requiredRecordDeleteRunActionImport of [
  'from "./record-panel-controller-record-delete-helpers";',
  'from "./record-panel-controller-record-delete-action-input.types";',
]) {
  if (!recordDeleteRunActionSource.includes(requiredRecordDeleteRunActionImport)) {
    throw new Error(
      `record-panel-controller-record-delete-run-action.ts must import delete-run contracts: ${requiredRecordDeleteRunActionImport}`,
    );
  }
}

for (const requiredRecordDeleteRunActionUsage of [
  "export function createRecordPanelControllerRecordDeleteRunAction({",
  "getRecordPanelRecordDeleteFallbackMessage(detailCopy)",
  "await onDeleteRecord(selectedRecord.id)",
  "getRecordPanelRecordDeleteErrorMessage(caught, fallbackMessage)",
]) {
  if (!recordDeleteRunActionSource.includes(requiredRecordDeleteRunActionUsage)) {
    throw new Error(
      `record-panel-controller-record-delete-run-action.ts must own delete-run orchestration: ${requiredRecordDeleteRunActionUsage}`,
    );
  }
}

for (const forbiddenRecordDeleteRunActionToken of [
  'from "../lib/record-panel-detail";',
  'from "../lib/types";',
  'from "./record-panel-controller.types";',
  "type DetailCopy =",
  'onDeleteRecord: ControllerProps["onDeleteRecord"];',
  "selectedRecord: RecordItem | null;",
  "setDeleting: (value: boolean) => void;",
]) {
  if (recordDeleteRunActionSource.includes(forbiddenRecordDeleteRunActionToken)) {
    throw new Error(
      `record-panel-controller-record-delete-run-action.ts must keep delete input contracts delegated: ${forbiddenRecordDeleteRunActionToken}`,
    );
  }
}

const maxRecordDeleteRunActionLines = 40;
if (recordDeleteRunActionLines > maxRecordDeleteRunActionLines) {
  throw new Error(
    `record-panel-controller-record-delete-run-action.ts exceeded ${maxRecordDeleteRunActionLines} lines: ${recordDeleteRunActionLines}`,
  );
}

for (const requiredRecordDeleteHelpersImport of [
  'from "../lib/record-panel-detail";',
]) {
  if (!recordDeleteHelpersSource.includes(requiredRecordDeleteHelpersImport)) {
    throw new Error(
      `record-panel-controller-record-delete-helpers.ts must import delegated delete copy contracts: ${requiredRecordDeleteHelpersImport}`,
    );
  }
}

for (const requiredRecordDeleteHelpersUsage of [
  "export function getRecordPanelRecordDeleteErrorMessage(",
  "export function getRecordPanelRecordDeleteFallbackMessage(detailCopy: DetailCopy)",
  "return caught instanceof Error ? caught.message : fallbackMessage;",
  "return detailCopy.deleteRecordError;",
]) {
  if (!recordDeleteHelpersSource.includes(requiredRecordDeleteHelpersUsage)) {
    throw new Error(
      `record-panel-controller-record-delete-helpers.ts must own delete helper details: ${requiredRecordDeleteHelpersUsage}`,
    );
  }
}

const maxRecordDeleteHelpersLines = 20;
if (recordDeleteHelpersLines > maxRecordDeleteHelpersLines) {
  throw new Error(
    `record-panel-controller-record-delete-helpers.ts exceeded ${maxRecordDeleteHelpersLines} lines: ${recordDeleteHelpersLines}`,
  );
}

for (const requiredRecordSaveActionsImport of [
  'from "./record-panel-controller-record-save-submit-action";',
  'from "./record-panel-controller-record-save-action-input.types";',
]) {
  if (!recordSaveActionsSource.includes(requiredRecordSaveActionsImport)) {
    throw new Error(
      `record-panel-controller-record-save-actions.ts must import delegated save helpers: ${requiredRecordSaveActionsImport}`,
    );
  }
}

for (const requiredRecordSaveActionsUsage of [
  "createRecordPanelControllerRecordSaveSubmitAction(props)",
]) {
  if (!recordSaveActionsSource.includes(requiredRecordSaveActionsUsage)) {
    throw new Error(
      `record-panel-controller-record-save-actions.ts must delegate validation and payload assembly: ${requiredRecordSaveActionsUsage}`,
    );
  }
}

for (const forbiddenRecordSaveActionsToken of [
  "function getErrorMessage(",
  "createEmptyForm(",
  "const latitude = form.location.latitude.trim() ? Number(form.location.latitude) : null;",
  "const longitude = form.location.longitude.trim() ? Number(form.location.longitude) : null;",
  "const hasLocation =",
  "latitudeInvalidError",
  "longitudeInvalidError",
  "extra_data: hasLocation",
  "if (!selectedRecord) {",
  "resolveRecordPanelRecordSaveActionInput(",
  "applyRecordPanelRecordSaveSuccessState(",
  "getRecordPanelRecordSaveErrorMessage(",
  "await onSaveRecord(saveInput.payload)",
  "event.preventDefault()",
]) {
  if (recordSaveActionsSource.includes(forbiddenRecordSaveActionsToken)) {
    throw new Error(
      `record-panel-controller-record-save-actions.ts must keep validation and payload internals delegated: ${forbiddenRecordSaveActionsToken}`,
    );
  }
}

const maxRecordSaveActionsLines = 10;
if (recordSaveActionsLines > maxRecordSaveActionsLines) {
  throw new Error(
    `record-panel-controller-record-save-actions.ts exceeded ${maxRecordSaveActionsLines} lines: ${recordSaveActionsLines}`,
  );
}

for (const requiredRecordSaveSubmitActionImport of [
  'from "react";',
  'from "./record-panel-controller-record-save-helpers";',
  'from "./record-panel-controller-record-save-action-input.types";',
  'from "./record-panel-controller-record-save-success-helpers";',
]) {
  if (!recordSaveSubmitActionSource.includes(requiredRecordSaveSubmitActionImport)) {
    throw new Error(
      `record-panel-controller-record-save-submit-action.ts must import save-submit contracts: ${requiredRecordSaveSubmitActionImport}`,
    );
  }
}

for (const requiredRecordSaveSubmitActionUsage of [
  "export function createRecordPanelControllerRecordSaveSubmitAction({",
  "async function handleSubmit(event: FormEvent<HTMLFormElement>)",
  "resolveRecordPanelRecordSaveActionInput({",
  "await onSaveRecord(saveInput.payload)",
  "applyRecordPanelRecordSaveSuccessState({ selectedRecord, setForm })",
  "getRecordPanelRecordSaveErrorMessage(caught, detailCopy.saveRecordError)",
]) {
  if (!recordSaveSubmitActionSource.includes(requiredRecordSaveSubmitActionUsage)) {
    throw new Error(
      `record-panel-controller-record-save-submit-action.ts must own save-submit orchestration: ${requiredRecordSaveSubmitActionUsage}`,
    );
  }
}

const maxRecordSaveSubmitActionLines = 45;
if (recordSaveSubmitActionLines > maxRecordSaveSubmitActionLines) {
  throw new Error(
    `record-panel-controller-record-save-submit-action.ts exceeded ${maxRecordSaveSubmitActionLines} lines: ${recordSaveSubmitActionLines}`,
  );
}

for (const requiredRecordSaveActionInputTypesImport of [
  'from "../lib/record-panel-detail";',
  'from "../lib/record-panel-forms";',
  'from "../lib/types";',
  'from "./record-panel-controller.types";',
]) {
  if (!recordSaveActionInputTypesSource.includes(requiredRecordSaveActionInputTypesImport)) {
    throw new Error(
      `record-panel-controller-record-save-action-input.types.ts must import save action input contracts: ${requiredRecordSaveActionInputTypesImport}`,
    );
  }
}

for (const requiredRecordSaveActionInputTypesUsage of [
  "export type RecordPanelControllerRecordSaveActionInput = {",
  "locationReviewForm: LocationReviewFormState;",
  'onSaveRecord: ControllerProps["onSaveRecord"];',
  "setForm: React.Dispatch<React.SetStateAction<RecordFormState>>;",
]) {
  if (!recordSaveActionInputTypesSource.includes(requiredRecordSaveActionInputTypesUsage)) {
    throw new Error(
      `record-panel-controller-record-save-action-input.types.ts must own save action input typing: ${requiredRecordSaveActionInputTypesUsage}`,
    );
  }
}

const maxRecordSaveActionInputTypesLines = 20;
if (recordSaveActionInputTypesLines > maxRecordSaveActionInputTypesLines) {
  throw new Error(
    `record-panel-controller-record-save-action-input.types.ts exceeded ${maxRecordSaveActionInputTypesLines} lines: ${recordSaveActionInputTypesLines}`,
  );
}

for (const requiredRecordSaveSuccessHelpersImport of [
  'from "../lib/record-panel-forms";',
  'from "../lib/types";',
]) {
  if (!recordSaveSuccessHelpersSource.includes(requiredRecordSaveSuccessHelpersImport)) {
    throw new Error(
      `record-panel-controller-record-save-success-helpers.ts must import save success contracts: ${requiredRecordSaveSuccessHelpersImport}`,
    );
  }
}

for (const requiredRecordSaveSuccessHelpersUsage of [
  "export function applyRecordPanelRecordSaveSuccessState({",
  "selectedRecord: RecordItem | null;",
  "setForm: React.Dispatch<React.SetStateAction<RecordFormState>>;",
  "setForm(createEmptyForm())",
]) {
  if (!recordSaveSuccessHelpersSource.includes(requiredRecordSaveSuccessHelpersUsage)) {
    throw new Error(
      `record-panel-controller-record-save-success-helpers.ts must own post-save reset behavior: ${requiredRecordSaveSuccessHelpersUsage}`,
    );
  }
}

const maxRecordSaveSuccessHelpersLines = 20;
if (recordSaveSuccessHelpersLines > maxRecordSaveSuccessHelpersLines) {
  throw new Error(
    `record-panel-controller-record-save-success-helpers.ts exceeded ${maxRecordSaveSuccessHelpersLines} lines: ${recordSaveSuccessHelpersLines}`,
  );
}

for (const requiredRecordSaveHelpersExport of [
  'from "./record-panel-controller-record-save-error-helpers";',
  'from "./record-panel-controller-record-save-resolution";',
]) {
  if (!recordSaveHelpersSource.includes(requiredRecordSaveHelpersExport)) {
    throw new Error(
      `record-panel-controller-record-save-helpers.ts must remain a stable save-helper boundary: ${requiredRecordSaveHelpersExport}`,
    );
  }
}

for (const requiredRecordSaveHelpersUsage of [
  "export { getRecordPanelRecordSaveErrorMessage }",
  "export { resolveRecordPanelRecordSaveActionInput }",
]) {
  if (!recordSaveHelpersSource.includes(requiredRecordSaveHelpersUsage)) {
    throw new Error(
      `record-panel-controller-record-save-helpers.ts must expose delegated save helpers: ${requiredRecordSaveHelpersUsage}`,
    );
  }
}

const maxRecordSaveHelpersLines = 10;
if (recordSaveHelpersLines > maxRecordSaveHelpersLines) {
  throw new Error(
    `record-panel-controller-record-save-helpers.ts exceeded ${maxRecordSaveHelpersLines} lines: ${recordSaveHelpersLines}`,
  );
}

for (const requiredRecordSaveErrorHelpersUsage of [
  "export function getRecordPanelRecordSaveErrorMessage(",
]) {
  if (!recordSaveErrorHelpersSource.includes(requiredRecordSaveErrorHelpersUsage)) {
    throw new Error(
      `record-panel-controller-record-save-error-helpers.ts must own save error formatting: ${requiredRecordSaveErrorHelpersUsage}`,
    );
  }
}

const maxRecordSaveErrorHelpersLines = 10;
if (recordSaveErrorHelpersLines > maxRecordSaveErrorHelpersLines) {
  throw new Error(
    `record-panel-controller-record-save-error-helpers.ts exceeded ${maxRecordSaveErrorHelpersLines} lines: ${recordSaveErrorHelpersLines}`,
  );
}

for (const requiredRecordSaveResolutionImport of [
  'from "./record-panel-controller-record-save-payload";',
]) {
  if (!recordSaveResolutionSource.includes(requiredRecordSaveResolutionImport)) {
    throw new Error(
      `record-panel-controller-record-save-resolution.ts must import delegated save resolution contracts: ${requiredRecordSaveResolutionImport}`,
    );
  }
}

for (const requiredRecordSaveResolutionUsage of [
  "export function resolveRecordPanelRecordSaveActionInput(",
  "parseRecordPanelCoordinate(input.form.location.latitude)",
  "buildRecordPanelSavePayload({",
  "contentRequiredError",
  "latitudeInvalidError",
  "longitudeInvalidError",
]) {
  if (!recordSaveResolutionSource.includes(requiredRecordSaveResolutionUsage)) {
    throw new Error(
      `record-panel-controller-record-save-resolution.ts must own save validation and payload assembly: ${requiredRecordSaveResolutionUsage}`,
    );
  }
}

const maxRecordSaveResolutionLines = 30;
if (recordSaveResolutionLines > maxRecordSaveResolutionLines) {
  throw new Error(
    `record-panel-controller-record-save-resolution.ts exceeded ${maxRecordSaveResolutionLines} lines: ${recordSaveResolutionLines}`,
  );
}

for (const requiredRecordSavePayloadImport of [
  'from "./record-panel-controller-record-save-coordinate";',
  'from "./record-panel-controller-record-save-payload.types";',
  'from "./record-panel-controller-record-location-payload";',
]) {
  if (!recordSavePayloadSource.includes(requiredRecordSavePayloadImport)) {
    throw new Error(
      `record-panel-controller-record-save-payload.ts must import delegated save payload contracts: ${requiredRecordSavePayloadImport}`,
    );
  }
}

for (const requiredRecordSavePayloadUsage of [
  'export { parseRecordPanelCoordinate } from "./record-panel-controller-record-save-coordinate";',
  'export type { RecordSavePayload, ResolveRecordSaveActionInput } from "./record-panel-controller-record-save-payload.types";',
  "export function buildRecordPanelSavePayload({",
  "extra_data: buildRecordPanelLocationExtraData({",
  "occurred_at: form.occurred_at ? new Date(form.occurred_at).toISOString() : undefined,",
]) {
  if (!recordSavePayloadSource.includes(requiredRecordSavePayloadUsage)) {
    throw new Error(
      `record-panel-controller-record-save-payload.ts must own save payload assembly details: ${requiredRecordSavePayloadUsage}`,
    );
  }
}

for (const forbiddenRecordSavePayloadToken of [
  'from "../lib/record-panel-detail";',
  'from "../lib/record-panel-forms";',
  'from "./record-panel-controller.types";',
  "export type ResolveRecordSaveActionInput = {",
  "export function parseRecordPanelCoordinate(value: string)",
]) {
  if (recordSavePayloadSource.includes(forbiddenRecordSavePayloadToken)) {
    throw new Error(
      `record-panel-controller-record-save-payload.ts must keep save payload internals delegated: ${forbiddenRecordSavePayloadToken}`,
    );
  }
}

const maxRecordSavePayloadLines = 30;
if (recordSavePayloadLines > maxRecordSavePayloadLines) {
  throw new Error(
    `record-panel-controller-record-save-payload.ts exceeded ${maxRecordSavePayloadLines} lines: ${recordSavePayloadLines}`,
  );
}

for (const requiredRecordSavePayloadTypesImport of [
  'from "../lib/record-panel-detail";',
  'from "../lib/record-panel-forms";',
  'from "../lib/types";',
  'from "./record-panel-controller.types";',
]) {
  if (!recordSavePayloadTypesSource.includes(requiredRecordSavePayloadTypesImport)) {
    throw new Error(
      `record-panel-controller-record-save-payload.types.ts must import save payload type contracts: ${requiredRecordSavePayloadTypesImport}`,
    );
  }
}

for (const requiredRecordSavePayloadTypesUsage of [
  'type DetailCopy = ReturnType<typeof getRecordPanelDetailBundle>["copy"];',
  'export type RecordSavePayload = Parameters<ControllerProps["onSaveRecord"]>[0];',
  "export type ResolveRecordSaveActionInput = {",
  "locationReviewForm: LocationReviewFormState;",
  "selectedRecord: RecordItem | null;",
]) {
  if (!recordSavePayloadTypesSource.includes(requiredRecordSavePayloadTypesUsage)) {
    throw new Error(
      `record-panel-controller-record-save-payload.types.ts must own save payload type details: ${requiredRecordSavePayloadTypesUsage}`,
    );
  }
}

const maxRecordSavePayloadTypesLines = 15;
if (recordSavePayloadTypesLines > maxRecordSavePayloadTypesLines) {
  throw new Error(
    `record-panel-controller-record-save-payload.types.ts exceeded ${maxRecordSavePayloadTypesLines} lines: ${recordSavePayloadTypesLines}`,
  );
}

for (const requiredRecordSaveCoordinateUsage of [
  "export function parseRecordPanelCoordinate(value: string)",
  "const trimmedValue = value.trim();",
  "return Number.isNaN(coordinate) ? Number.NaN : coordinate;",
]) {
  if (!recordSaveCoordinateSource.includes(requiredRecordSaveCoordinateUsage)) {
    throw new Error(
      `record-panel-controller-record-save-coordinate.ts must own coordinate parsing details: ${requiredRecordSaveCoordinateUsage}`,
    );
  }
}

const maxRecordSaveCoordinateLines = 10;
if (recordSaveCoordinateLines > maxRecordSaveCoordinateLines) {
  throw new Error(
    `record-panel-controller-record-save-coordinate.ts exceeded ${maxRecordSaveCoordinateLines} lines: ${recordSaveCoordinateLines}`,
  );
}

for (const requiredRecordLocationPayloadImport of [
  'from "../lib/record-panel-forms";',
]) {
  if (!recordLocationPayloadSource.includes(requiredRecordLocationPayloadImport)) {
    throw new Error(
      `record-panel-controller-record-location-payload.ts must import location payload contracts: ${requiredRecordLocationPayloadImport}`,
    );
  }
}

for (const requiredRecordLocationPayloadUsage of [
  "export function buildRecordPanelLocationExtraData({",
  "const hasLocation =",
  'source: form.location.source || "manual"',
  "location_review: {",
  "location_review: null,",
]) {
  if (!recordLocationPayloadSource.includes(requiredRecordLocationPayloadUsage)) {
    throw new Error(
      `record-panel-controller-record-location-payload.ts must own location extra-data assembly: ${requiredRecordLocationPayloadUsage}`,
    );
  }
}

const maxRecordLocationPayloadLines = 40;
if (recordLocationPayloadLines > maxRecordLocationPayloadLines) {
  throw new Error(
    `record-panel-controller-record-location-payload.ts exceeded ${maxRecordLocationPayloadLines} lines: ${recordLocationPayloadLines}`,
  );
}

for (const requiredReminderActionsImport of [
  'from "./record-panel-controller-reminder-action-input.types";',
  'from "./record-panel-controller-reminder-submit-action";',
]) {
  if (!reminderActionsSource.includes(requiredReminderActionsImport)) {
    throw new Error(
      `record-panel-controller-reminder-actions.ts must import delegated reminder helpers: ${requiredReminderActionsImport}`,
    );
  }
}

for (const requiredReminderActionsUsage of [
  "props: RecordPanelControllerReminderActionInput,",
  "return createRecordPanelControllerReminderSubmitAction(props);",
]) {
  if (!reminderActionsSource.includes(requiredReminderActionsUsage)) {
    throw new Error(
      `record-panel-controller-reminder-actions.ts must remain a thin reminder-action wrapper: ${requiredReminderActionsUsage}`,
    );
  }
}

for (const forbiddenReminderActionsToken of [
  'from "./record-panel-controller-reminder-helpers";',
  'from "./record-panel-controller-reminder-success-helpers";',
  "function getErrorMessage(",
  '"Save or select a record before adding a reminder"',
  "detailCopy.reminderTimeRequiredError",
  "recordId: selectedRecord.id,",
  'channel_code: "in_app"',
  "setReminderForm((prev) => ({ ...prev, message: \"\", remind_at: \"\" }))",
  "resolveRecordPanelReminderActionInput({",
  "getRecordPanelReminderErrorMessage(",
  "await onCreateReminder(reminderInput.payload)",
  "applyRecordPanelReminderSuccessState({ setReminderForm })",
]) {
  if (reminderActionsSource.includes(forbiddenReminderActionsToken)) {
    throw new Error(
      `record-panel-controller-reminder-actions.ts must keep reminder internals delegated: ${forbiddenReminderActionsToken}`,
    );
  }
}

const maxReminderActionsLines = 10;
if (reminderActionsLines > maxReminderActionsLines) {
  throw new Error(
    `record-panel-controller-reminder-actions.ts exceeded ${maxReminderActionsLines} lines: ${reminderActionsLines}`,
  );
}

for (const requiredReminderSubmitActionImport of [
  'from "./record-panel-controller-reminder-helpers";',
  'from "./record-panel-controller-reminder-action-input.types";',
  'from "./record-panel-controller-reminder-success-helpers";',
]) {
  if (!reminderSubmitActionSource.includes(requiredReminderSubmitActionImport)) {
    throw new Error(
      `record-panel-controller-reminder-submit-action.ts must import reminder-submit contracts: ${requiredReminderSubmitActionImport}`,
    );
  }
}

for (const requiredReminderSubmitActionUsage of [
  "export function createRecordPanelControllerReminderSubmitAction({",
  "resolveRecordPanelReminderActionInput({",
  "getRecordPanelReminderErrorMessage(",
  "await onCreateReminder(reminderInput.payload)",
  "applyRecordPanelReminderSuccessState({ setReminderForm })",
]) {
  if (!reminderSubmitActionSource.includes(requiredReminderSubmitActionUsage)) {
    throw new Error(
      `record-panel-controller-reminder-submit-action.ts must own reminder submit orchestration: ${requiredReminderSubmitActionUsage}`,
    );
  }
}

const maxReminderSubmitActionLines = 45;
if (reminderSubmitActionLines > maxReminderSubmitActionLines) {
  throw new Error(
    `record-panel-controller-reminder-submit-action.ts exceeded ${maxReminderSubmitActionLines} lines: ${reminderSubmitActionLines}`,
  );
}

for (const requiredReminderActionInputTypesImport of [
  'from "../lib/record-panel-detail";',
  'from "../lib/record-panel-forms";',
  'from "../lib/types";',
  'from "./record-panel-controller.types";',
]) {
  if (!reminderActionInputTypesSource.includes(requiredReminderActionInputTypesImport)) {
    throw new Error(
      `record-panel-controller-reminder-action-input.types.ts must import reminder action input contracts: ${requiredReminderActionInputTypesImport}`,
    );
  }
}

for (const requiredReminderActionInputTypesUsage of [
  "export type RecordPanelControllerReminderActionInput = {",
  'onCreateReminder: ControllerProps["onCreateReminder"];',
  "selectedRecord: RecordItem | null;",
  "setSavingReminder: (value: boolean) => void;",
]) {
  if (!reminderActionInputTypesSource.includes(requiredReminderActionInputTypesUsage)) {
    throw new Error(
      `record-panel-controller-reminder-action-input.types.ts must own reminder action input typing: ${requiredReminderActionInputTypesUsage}`,
    );
  }
}

const maxReminderActionInputTypesLines = 20;
if (reminderActionInputTypesLines > maxReminderActionInputTypesLines) {
  throw new Error(
    `record-panel-controller-reminder-action-input.types.ts exceeded ${maxReminderActionInputTypesLines} lines: ${reminderActionInputTypesLines}`,
  );
}

for (const requiredReminderSuccessHelpersImport of [
  'from "../lib/record-panel-forms";',
]) {
  if (!reminderSuccessHelpersSource.includes(requiredReminderSuccessHelpersImport)) {
    throw new Error(
      `record-panel-controller-reminder-success-helpers.ts must import reminder success contracts: ${requiredReminderSuccessHelpersImport}`,
    );
  }
}

for (const requiredReminderSuccessHelpersUsage of [
  "export function applyRecordPanelReminderSuccessState({",
  "setReminderForm: React.Dispatch<React.SetStateAction<ReminderFormState>>;",
  'setReminderForm((prev) => ({ ...prev, message: "", remind_at: "" }));',
]) {
  if (!reminderSuccessHelpersSource.includes(requiredReminderSuccessHelpersUsage)) {
    throw new Error(
      `record-panel-controller-reminder-success-helpers.ts must own post-reminder reset behavior: ${requiredReminderSuccessHelpersUsage}`,
    );
  }
}

const maxReminderSuccessHelpersLines = 15;
if (reminderSuccessHelpersLines > maxReminderSuccessHelpersLines) {
  throw new Error(
    `record-panel-controller-reminder-success-helpers.ts exceeded ${maxReminderSuccessHelpersLines} lines: ${reminderSuccessHelpersLines}`,
  );
}

for (const requiredReminderHelpersExport of [
  'from "./record-panel-controller-reminder-error-helpers";',
  'from "./record-panel-controller-reminder-resolution";',
]) {
  if (!reminderHelpersSource.includes(requiredReminderHelpersExport)) {
    throw new Error(
      `record-panel-controller-reminder-helpers.ts must remain a stable reminder-helper boundary: ${requiredReminderHelpersExport}`,
    );
  }
}

for (const requiredReminderHelpersUsage of [
  "export { getRecordPanelReminderErrorMessage }",
  "export { resolveRecordPanelReminderActionInput }",
]) {
  if (!reminderHelpersSource.includes(requiredReminderHelpersUsage)) {
    throw new Error(
      `record-panel-controller-reminder-helpers.ts must expose delegated reminder helpers: ${requiredReminderHelpersUsage}`,
    );
  }
}

const maxReminderHelpersLines = 10;
if (reminderHelpersLines > maxReminderHelpersLines) {
  throw new Error(
    `record-panel-controller-reminder-helpers.ts exceeded ${maxReminderHelpersLines} lines: ${reminderHelpersLines}`,
  );
}

for (const requiredReminderErrorHelpersUsage of [
  "export function getRecordPanelReminderErrorMessage(",
]) {
  if (!reminderErrorHelpersSource.includes(requiredReminderErrorHelpersUsage)) {
    throw new Error(
      `record-panel-controller-reminder-error-helpers.ts must own reminder error formatting: ${requiredReminderErrorHelpersUsage}`,
    );
  }
}

const maxReminderErrorHelpersLines = 10;
if (reminderErrorHelpersLines > maxReminderErrorHelpersLines) {
  throw new Error(
    `record-panel-controller-reminder-error-helpers.ts exceeded ${maxReminderErrorHelpersLines} lines: ${reminderErrorHelpersLines}`,
  );
}

for (const requiredReminderResolutionImport of [
  'from "./record-panel-controller-reminder-payload";',
]) {
  if (!reminderResolutionSource.includes(requiredReminderResolutionImport)) {
    throw new Error(
      `record-panel-controller-reminder-resolution.ts must import shared reminder resolution contracts: ${requiredReminderResolutionImport}`,
    );
  }
}

for (const requiredReminderResolutionUsage of [
  "export function resolveRecordPanelReminderActionInput(",
  "buildRecordPanelReminderPayload({",
  '"Save or select a record before adding a reminder"',
  "reminderTimeRequiredError",
]) {
  if (!reminderResolutionSource.includes(requiredReminderResolutionUsage)) {
    throw new Error(
      `record-panel-controller-reminder-resolution.ts must own reminder validation and payload assembly: ${requiredReminderResolutionUsage}`,
    );
  }
}

const maxReminderResolutionLines = 25;
if (reminderResolutionLines > maxReminderResolutionLines) {
  throw new Error(
    `record-panel-controller-reminder-resolution.ts exceeded ${maxReminderResolutionLines} lines: ${reminderResolutionLines}`,
  );
}

for (const requiredReminderPayloadImport of [
  'from "../lib/record-panel-detail";',
  'from "../lib/record-panel-forms";',
  'from "../lib/types";',
  'from "./record-panel-controller.types";',
]) {
  if (!reminderPayloadSource.includes(requiredReminderPayloadImport)) {
    throw new Error(
      `record-panel-controller-reminder-payload.ts must import shared reminder payload contracts: ${requiredReminderPayloadImport}`,
    );
  }
}

for (const requiredReminderPayloadUsage of [
  "export type ResolveReminderActionInput = {",
  "export function buildRecordPanelReminderPayload({",
  "recordId: selectedRecord.id,",
  'channel_code: "in_app"',
]) {
  if (!reminderPayloadSource.includes(requiredReminderPayloadUsage)) {
    throw new Error(
      `record-panel-controller-reminder-payload.ts must own reminder payload assembly: ${requiredReminderPayloadUsage}`,
    );
  }
}

const maxReminderPayloadLines = 35;
if (reminderPayloadLines > maxReminderPayloadLines) {
  throw new Error(
    `record-panel-controller-reminder-payload.ts exceeded ${maxReminderPayloadLines} lines: ${reminderPayloadLines}`,
  );
}

for (const requiredMediaStatusActionsImport of [
  'from "./record-panel-controller-media-status-action-input.types";',
  'from "./record-panel-controller-media-refresh-action";',
  'from "./record-panel-controller-media-retry-action";',
]) {
  if (!mediaStatusActionsSource.includes(requiredMediaStatusActionsImport)) {
    throw new Error(
      `record-panel-controller-media-status-actions.ts must import delegated media-status helpers: ${requiredMediaStatusActionsImport}`,
    );
  }
}

for (const requiredMediaStatusActionsUsage of [
  "createRecordPanelControllerMediaRefreshAction(props)",
  "createRecordPanelControllerMediaRetryAction(props)",
  "...mediaRefreshAction",
  "...mediaRetryAction",
]) {
  if (!mediaStatusActionsSource.includes(requiredMediaStatusActionsUsage)) {
    throw new Error(
      `record-panel-controller-media-status-actions.ts must delegate media-status execution details: ${requiredMediaStatusActionsUsage}`,
    );
  }
}

for (const forbiddenMediaStatusActionsToken of [
  'from "../lib/record-panel-detail";',
  "Parameters<typeof createRecordPanelControllerMediaRefreshAction>[0]",
  "Parameters<typeof createRecordPanelControllerMediaRetryAction>[0]",
  "getRecordPanelMediaStatusErrorMessages(",
  "runRecordPanelMediaStatusAction({",
  "const errorMessages",
  "handleRefreshMedia",
  "handleRetryMediaProcessing",
]) {
  if (mediaStatusActionsSource.includes(forbiddenMediaStatusActionsToken)) {
    throw new Error(
      `record-panel-controller-media-status-actions.ts must keep media-status internals delegated: ${forbiddenMediaStatusActionsToken}`,
    );
  }
}

const maxMediaStatusActionsLines = 20;
if (mediaStatusActionsLines > maxMediaStatusActionsLines) {
  throw new Error(
    `record-panel-controller-media-status-actions.ts exceeded ${maxMediaStatusActionsLines} lines: ${mediaStatusActionsLines}`,
  );
}

for (const requiredMediaStatusActionInputTypesImport of [
  'from "../lib/record-panel-detail";',
  'from "./record-panel-controller.types";',
]) {
  if (!mediaStatusActionInputTypesSource.includes(requiredMediaStatusActionInputTypesImport)) {
    throw new Error(
      `record-panel-controller-media-status-action-input.types.ts must import media-status input contracts: ${requiredMediaStatusActionInputTypesImport}`,
    );
  }
}

for (const requiredMediaStatusActionInputTypesUsage of [
  "type DetailCopy = ReturnType<typeof getRecordPanelDetailBundle>[\"copy\"];",
  "export type RecordPanelControllerMediaRefreshActionInput = {",
  'onRefreshMediaStatus: ControllerProps["onRefreshMediaStatus"];',
  "export type RecordPanelControllerMediaRetryActionInput = {",
  'onRetryMedia: ControllerProps["onRetryMedia"];',
  "export type RecordPanelControllerMediaStatusActionInput =",
]) {
  if (!mediaStatusActionInputTypesSource.includes(requiredMediaStatusActionInputTypesUsage)) {
    throw new Error(
      `record-panel-controller-media-status-action-input.types.ts must own media-status input typing: ${requiredMediaStatusActionInputTypesUsage}`,
    );
  }
}

const maxMediaStatusActionInputTypesLines = 25;
if (mediaStatusActionInputTypesLines > maxMediaStatusActionInputTypesLines) {
  throw new Error(
    `record-panel-controller-media-status-action-input.types.ts exceeded ${maxMediaStatusActionInputTypesLines} lines: ${mediaStatusActionInputTypesLines}`,
  );
}

for (const requiredMediaRefreshActionImport of [
  'from "./record-panel-controller-media-status-helpers";',
  'from "./record-panel-controller-media-status-action-input.types";',
]) {
  if (!mediaRefreshActionSource.includes(requiredMediaRefreshActionImport)) {
    throw new Error(
      `record-panel-controller-media-refresh-action.ts must import delegated media-refresh contracts: ${requiredMediaRefreshActionImport}`,
    );
  }
}

for (const requiredMediaRefreshActionUsage of [
  "export function createRecordPanelControllerMediaRefreshAction({",
  "getRecordPanelMediaStatusErrorMessages(detailCopy)",
  "runRecordPanelMediaStatusAction({",
  "fallbackMessage: errorMessages.refreshMediaError",
  "setActiveMediaId: setRefreshingMediaId",
]) {
  if (!mediaRefreshActionSource.includes(requiredMediaRefreshActionUsage)) {
    throw new Error(
      `record-panel-controller-media-refresh-action.ts must own refresh orchestration: ${requiredMediaRefreshActionUsage}`,
    );
  }
}

for (const forbiddenMediaRefreshActionToken of [
  'from "../lib/record-panel-detail";',
  'from "./record-panel-controller.types";',
  "type DetailCopy =",
  'onRefreshMediaStatus: ControllerProps["onRefreshMediaStatus"];',
  "setRefreshingMediaId: (value: string | null) => void;",
]) {
  if (mediaRefreshActionSource.includes(forbiddenMediaRefreshActionToken)) {
    throw new Error(
      `record-panel-controller-media-refresh-action.ts must keep media-refresh input contracts delegated: ${forbiddenMediaRefreshActionToken}`,
    );
  }
}

const maxMediaRefreshActionLines = 40;
if (mediaRefreshActionLines > maxMediaRefreshActionLines) {
  throw new Error(
    `record-panel-controller-media-refresh-action.ts exceeded ${maxMediaRefreshActionLines} lines: ${mediaRefreshActionLines}`,
  );
}

for (const requiredMediaRetryActionImport of [
  'from "./record-panel-controller-media-status-helpers";',
  'from "./record-panel-controller-media-status-action-input.types";',
]) {
  if (!mediaRetryActionSource.includes(requiredMediaRetryActionImport)) {
    throw new Error(
      `record-panel-controller-media-retry-action.ts must import delegated media-retry contracts: ${requiredMediaRetryActionImport}`,
    );
  }
}

for (const requiredMediaRetryActionUsage of [
  "export function createRecordPanelControllerMediaRetryAction({",
  "getRecordPanelMediaStatusErrorMessages(detailCopy)",
  "runRecordPanelMediaStatusAction({",
  "fallbackMessage: errorMessages.retryMediaError",
  "setActiveMediaId: setRetryingMediaId",
]) {
  if (!mediaRetryActionSource.includes(requiredMediaRetryActionUsage)) {
    throw new Error(
      `record-panel-controller-media-retry-action.ts must own retry orchestration: ${requiredMediaRetryActionUsage}`,
    );
  }
}

for (const forbiddenMediaRetryActionToken of [
  'from "../lib/record-panel-detail";',
  'from "./record-panel-controller.types";',
  "type DetailCopy =",
  'onRetryMedia: ControllerProps["onRetryMedia"];',
  "setRetryingMediaId: (value: string | null) => void;",
]) {
  if (mediaRetryActionSource.includes(forbiddenMediaRetryActionToken)) {
    throw new Error(
      `record-panel-controller-media-retry-action.ts must keep media-retry input contracts delegated: ${forbiddenMediaRetryActionToken}`,
    );
  }
}

const maxMediaRetryActionLines = 40;
if (mediaRetryActionLines > maxMediaRetryActionLines) {
  throw new Error(
    `record-panel-controller-media-retry-action.ts exceeded ${maxMediaRetryActionLines} lines: ${mediaRetryActionLines}`,
  );
}

for (const requiredMediaStatusHelpersExport of [
  'from "./record-panel-controller-media-status-error-helpers";',
  'from "./record-panel-controller-media-status-runner";',
]) {
  if (!mediaStatusHelpersSource.includes(requiredMediaStatusHelpersExport)) {
    throw new Error(
      `record-panel-controller-media-status-helpers.ts must remain a stable media-status helper boundary: ${requiredMediaStatusHelpersExport}`,
    );
  }
}

for (const requiredMediaStatusHelpersUsage of [
  "export {",
  "getRecordPanelMediaStatusErrorMessage,",
  "getRecordPanelMediaStatusErrorMessages,",
  "export { runRecordPanelMediaStatusAction }",
]) {
  if (!mediaStatusHelpersSource.includes(requiredMediaStatusHelpersUsage)) {
    throw new Error(
      `record-panel-controller-media-status-helpers.ts must expose delegated media-status helpers: ${requiredMediaStatusHelpersUsage}`,
    );
  }
}

const maxMediaStatusHelpersLines = 10;
if (mediaStatusHelpersLines > maxMediaStatusHelpersLines) {
  throw new Error(
    `record-panel-controller-media-status-helpers.ts exceeded ${maxMediaStatusHelpersLines} lines: ${mediaStatusHelpersLines}`,
  );
}

for (const requiredMediaStatusErrorHelpersImport of [
  'from "../lib/record-panel-detail";',
]) {
  if (!mediaStatusErrorHelpersSource.includes(requiredMediaStatusErrorHelpersImport)) {
    throw new Error(
      `record-panel-controller-media-status-error-helpers.ts must import media-status copy contracts: ${requiredMediaStatusErrorHelpersImport}`,
    );
  }
}

for (const requiredMediaStatusErrorHelpersUsage of [
  "export function getRecordPanelMediaStatusErrorMessage(",
  "export function getRecordPanelMediaStatusErrorMessages(detailCopy: DetailCopy)",
  "refreshMediaError",
  "retryMediaError",
]) {
  if (!mediaStatusErrorHelpersSource.includes(requiredMediaStatusErrorHelpersUsage)) {
    throw new Error(
      `record-panel-controller-media-status-error-helpers.ts must own media-status error copy details: ${requiredMediaStatusErrorHelpersUsage}`,
    );
  }
}

const maxMediaStatusErrorHelpersLines = 20;
if (mediaStatusErrorHelpersLines > maxMediaStatusErrorHelpersLines) {
  throw new Error(
    `record-panel-controller-media-status-error-helpers.ts exceeded ${maxMediaStatusErrorHelpersLines} lines: ${mediaStatusErrorHelpersLines}`,
  );
}

for (const requiredMediaStatusRunnerImport of [
  'from "./record-panel-controller-media-status-error-helpers";',
]) {
  if (!mediaStatusRunnerSource.includes(requiredMediaStatusRunnerImport)) {
    throw new Error(
      `record-panel-controller-media-status-runner.ts must import media-status runner dependencies: ${requiredMediaStatusRunnerImport}`,
    );
  }
}

for (const requiredMediaStatusRunnerUsage of [
  "export async function runRecordPanelMediaStatusAction({",
  "setActiveMediaId(mediaId);",
  "setError(getRecordPanelMediaStatusErrorMessage(caught, fallbackMessage));",
  "setActiveMediaId(null);",
]) {
  if (!mediaStatusRunnerSource.includes(requiredMediaStatusRunnerUsage)) {
    throw new Error(
      `record-panel-controller-media-status-runner.ts must own media-status execution details: ${requiredMediaStatusRunnerUsage}`,
    );
  }
}

const maxMediaStatusRunnerLines = 25;
if (mediaStatusRunnerLines > maxMediaStatusRunnerLines) {
  throw new Error(
    `record-panel-controller-media-status-runner.ts exceeded ${maxMediaStatusRunnerLines} lines: ${mediaStatusRunnerLines}`,
  );
}

for (const requiredMediaFileActionsImport of [
  'from "./record-panel-controller-media-delete-action";',
  'from "./record-panel-controller-media-file-action-input.types";',
  'from "./record-panel-controller-media-transfer-actions";',
]) {
  if (!mediaFileActionsSource.includes(requiredMediaFileActionsImport)) {
    throw new Error(
      `record-panel-controller-media-file-actions.ts must import delegated media-file helpers: ${requiredMediaFileActionsImport}`,
    );
  }
}

for (const requiredMediaFileActionsUsage of [
  "createRecordPanelControllerMediaTransferActions(props)",
  "createRecordPanelControllerMediaDeleteAction(props)",
  "...mediaTransferActions",
  "...mediaDeleteAction",
]) {
  if (!mediaFileActionsSource.includes(requiredMediaFileActionsUsage)) {
    throw new Error(
      `record-panel-controller-media-file-actions.ts must delegate media-file execution details: ${requiredMediaFileActionsUsage}`,
    );
  }
}

for (const forbiddenMediaFileActionsToken of [
  'from "../lib/api";',
  'from "../lib/record-panel-detail";',
  "Parameters<typeof createRecordPanelControllerMediaDeleteAction>[0]",
  "Parameters<typeof createRecordPanelControllerMediaTransferActions>[0]",
  "const handleUpload",
  "const handleDeleteMediaAsset",
  "const handleDownloadMedia",
  "resolveRecordPanelUploadInput(",
  "downloadRecordPanelMediaFile({",
]) {
  if (mediaFileActionsSource.includes(forbiddenMediaFileActionsToken)) {
    throw new Error(
      `record-panel-controller-media-file-actions.ts must keep media-file internals delegated: ${forbiddenMediaFileActionsToken}`,
    );
  }
}

const maxMediaFileActionsLines = 20;
if (mediaFileActionsLines > maxMediaFileActionsLines) {
  throw new Error(
    `record-panel-controller-media-file-actions.ts exceeded ${maxMediaFileActionsLines} lines: ${mediaFileActionsLines}`,
  );
}

for (const requiredMediaFileActionInputTypesImport of [
  'from "../lib/record-panel-detail";',
  'from "./record-panel-controller.types";',
  'from "./record-panel-controller-media-transfer-action-input.types";',
]) {
  if (!mediaFileActionInputTypesSource.includes(requiredMediaFileActionInputTypesImport)) {
    throw new Error(
      `record-panel-controller-media-file-action-input.types.ts must import media-file input contracts: ${requiredMediaFileActionInputTypesImport}`,
    );
  }
}

for (const requiredMediaFileActionInputTypesUsage of [
  "type DetailCopy = ReturnType<typeof getRecordPanelDetailBundle>[\"copy\"];",
  "export type RecordPanelControllerMediaDeleteActionInput = {",
  "onDeleteMedia: ControllerProps[\"onDeleteMedia\"];",
  "export type RecordPanelControllerMediaFileActionInput =",
  "RecordPanelControllerMediaTransferActionInput & RecordPanelControllerMediaDeleteActionInput",
]) {
  if (!mediaFileActionInputTypesSource.includes(requiredMediaFileActionInputTypesUsage)) {
    throw new Error(
      `record-panel-controller-media-file-action-input.types.ts must own media-file input typing: ${requiredMediaFileActionInputTypesUsage}`,
    );
  }
}

const maxMediaFileActionInputTypesLines = 20;
if (mediaFileActionInputTypesLines > maxMediaFileActionInputTypesLines) {
  throw new Error(
    `record-panel-controller-media-file-action-input.types.ts exceeded ${maxMediaFileActionInputTypesLines} lines: ${mediaFileActionInputTypesLines}`,
  );
}

for (const requiredMediaTransferActionsImport of [
  'from "./record-panel-controller-media-transfer-action-input.types";',
  'from "./record-panel-controller-media-download-action";',
  'from "./record-panel-controller-media-upload-action";',
]) {
  if (!mediaTransferActionsSource.includes(requiredMediaTransferActionsImport)) {
    throw new Error(
      `record-panel-controller-media-transfer-actions.ts must import delegated media-transfer contracts: ${requiredMediaTransferActionsImport}`,
    );
  }
}

for (const requiredMediaTransferActionsUsage of [
  "createRecordPanelControllerMediaDownloadAction(props)",
  "createRecordPanelControllerMediaUploadAction(props)",
  "...mediaUploadAction",
  "...mediaDownloadAction",
]) {
  if (!mediaTransferActionsSource.includes(requiredMediaTransferActionsUsage)) {
    throw new Error(
      `record-panel-controller-media-transfer-actions.ts must own upload/download orchestration: ${requiredMediaTransferActionsUsage}`,
    );
  }
}

for (const forbiddenMediaTransferActionsToken of [
  "Parameters<typeof createRecordPanelControllerMediaDownloadAction>[0]",
  "Parameters<typeof createRecordPanelControllerMediaUploadAction>[0]",
]) {
  if (mediaTransferActionsSource.includes(forbiddenMediaTransferActionsToken)) {
    throw new Error(
      `record-panel-controller-media-transfer-actions.ts must keep transfer-action input contracts delegated: ${forbiddenMediaTransferActionsToken}`,
    );
  }
}

const maxMediaTransferActionsLines = 20;
if (mediaTransferActionsLines > maxMediaTransferActionsLines) {
  throw new Error(
    `record-panel-controller-media-transfer-actions.ts exceeded ${maxMediaTransferActionsLines} lines: ${mediaTransferActionsLines}`,
  );
}

for (const requiredMediaTransferActionInputTypesImport of [
  'from "../lib/record-panel-detail";',
  'from "../lib/types";',
  'from "./record-panel-controller.types";',
]) {
  if (!mediaTransferActionInputTypesSource.includes(requiredMediaTransferActionInputTypesImport)) {
    throw new Error(
      `record-panel-controller-media-transfer-action-input.types.ts must import media-transfer input contracts: ${requiredMediaTransferActionInputTypesImport}`,
    );
  }
}

for (const requiredMediaTransferActionInputTypesUsage of [
  "type DetailCopy = ReturnType<typeof getRecordPanelDetailBundle>[\"copy\"];",
  "export type RecordPanelControllerMediaUploadActionInput = {",
  "export type RecordPanelControllerMediaDownloadActionInput = {",
  "export type RecordPanelControllerMediaTransferActionInput =",
  "export type RecordPanelControllerMediaDownloadAsset = MediaAsset;",
]) {
  if (!mediaTransferActionInputTypesSource.includes(requiredMediaTransferActionInputTypesUsage)) {
    throw new Error(
      `record-panel-controller-media-transfer-action-input.types.ts must own media-transfer input typing: ${requiredMediaTransferActionInputTypesUsage}`,
    );
  }
}

const maxMediaTransferActionInputTypesLines = 30;
if (mediaTransferActionInputTypesLines > maxMediaTransferActionInputTypesLines) {
  throw new Error(
    `record-panel-controller-media-transfer-action-input.types.ts exceeded ${maxMediaTransferActionInputTypesLines} lines: ${mediaTransferActionInputTypesLines}`,
  );
}

for (const requiredMediaUploadActionImport of [
  'from "./record-panel-controller-media-file-helpers";',
  'from "./record-panel-controller-media-transfer-action-input.types";',
]) {
  if (!mediaUploadActionSource.includes(requiredMediaUploadActionImport)) {
    throw new Error(
      `record-panel-controller-media-upload-action.ts must import media-upload contracts: ${requiredMediaUploadActionImport}`,
    );
  }
}

for (const requiredMediaUploadActionUsage of [
  "export function createRecordPanelControllerMediaUploadAction({",
  "getRecordPanelMediaFileFallbackMessages(detailCopy)",
  "resolveRecordPanelUploadInput(event, selectedRecord)",
  "await onUploadMedia(uploadInput.recordId, uploadInput.file)",
  "fallbackMessages.uploadMediaError",
]) {
  if (!mediaUploadActionSource.includes(requiredMediaUploadActionUsage)) {
    throw new Error(
      `record-panel-controller-media-upload-action.ts must own upload orchestration: ${requiredMediaUploadActionUsage}`,
    );
  }
}

for (const forbiddenMediaUploadActionToken of [
  'from "../lib/record-panel-detail";',
  'from "../lib/types";',
  'from "./record-panel-controller.types";',
  "type DetailCopy =",
  "onUploadMedia: ControllerProps[",
  "selectedRecord: RecordItem | null;",
]) {
  if (mediaUploadActionSource.includes(forbiddenMediaUploadActionToken)) {
    throw new Error(
      `record-panel-controller-media-upload-action.ts must keep media-upload input contracts delegated: ${forbiddenMediaUploadActionToken}`,
    );
  }
}

const maxMediaUploadActionLines = 45;
if (mediaUploadActionLines > maxMediaUploadActionLines) {
  throw new Error(
    `record-panel-controller-media-upload-action.ts exceeded ${maxMediaUploadActionLines} lines: ${mediaUploadActionLines}`,
  );
}

for (const requiredMediaDownloadActionImport of [
  'from "./record-panel-controller-media-file-helpers";',
  'from "./record-panel-controller-media-transfer-action-input.types";',
]) {
  if (!mediaDownloadActionSource.includes(requiredMediaDownloadActionImport)) {
    throw new Error(
      `record-panel-controller-media-download-action.ts must import media-download-action contracts: ${requiredMediaDownloadActionImport}`,
    );
  }
}

for (const requiredMediaDownloadActionUsage of [
  "export function createRecordPanelControllerMediaDownloadAction({",
  "getRecordPanelMediaFileFallbackMessages(detailCopy)",
  "fallbackMessages.notAuthenticated",
  "downloadRecordPanelMediaFile({ asset, authToken, workspaceId })",
  "fallbackMessages.downloadMediaError",
]) {
  if (!mediaDownloadActionSource.includes(requiredMediaDownloadActionUsage)) {
    throw new Error(
      `record-panel-controller-media-download-action.ts must own download orchestration: ${requiredMediaDownloadActionUsage}`,
    );
  }
}

for (const forbiddenMediaDownloadActionToken of [
  'from "../lib/record-panel-detail";',
  'from "../lib/types";',
  "type DetailCopy =",
  "authToken: string | null;",
  "setDownloadingMediaId: (value: string | null) => void;",
  "handleDownloadMedia(asset: MediaAsset)",
]) {
  if (mediaDownloadActionSource.includes(forbiddenMediaDownloadActionToken)) {
    throw new Error(
      `record-panel-controller-media-download-action.ts must keep media-download input contracts delegated: ${forbiddenMediaDownloadActionToken}`,
    );
  }
}

const maxMediaDownloadActionLines = 45;
if (mediaDownloadActionLines > maxMediaDownloadActionLines) {
  throw new Error(
    `record-panel-controller-media-download-action.ts exceeded ${maxMediaDownloadActionLines} lines: ${mediaDownloadActionLines}`,
  );
}

for (const requiredMediaDeleteActionImport of [
  'from "./record-panel-controller-media-file-helpers";',
  'from "./record-panel-controller-media-file-action-input.types";',
]) {
  if (!mediaDeleteActionSource.includes(requiredMediaDeleteActionImport)) {
    throw new Error(
      `record-panel-controller-media-delete-action.ts must import delegated media-delete contracts: ${requiredMediaDeleteActionImport}`,
    );
  }
}

for (const requiredMediaDeleteActionUsage of [
  "export function createRecordPanelControllerMediaDeleteAction({",
  "getRecordPanelMediaFileFallbackMessages(detailCopy)",
  "await onDeleteMedia(mediaId)",
  "fallbackMessages.deleteMediaError",
]) {
  if (!mediaDeleteActionSource.includes(requiredMediaDeleteActionUsage)) {
    throw new Error(
      `record-panel-controller-media-delete-action.ts must own delete orchestration: ${requiredMediaDeleteActionUsage}`,
    );
  }
}

for (const forbiddenMediaDeleteActionToken of [
  'from "../lib/record-panel-detail";',
  'from "./record-panel-controller.types";',
  "type DetailCopy =",
  "onDeleteMedia: ControllerProps[",
  "setDeletingMediaId: (value: string | null) => void;",
]) {
  if (mediaDeleteActionSource.includes(forbiddenMediaDeleteActionToken)) {
    throw new Error(
      `record-panel-controller-media-delete-action.ts must keep media-delete input contracts delegated: ${forbiddenMediaDeleteActionToken}`,
    );
  }
}

const maxMediaDeleteActionLines = 40;
if (mediaDeleteActionLines > maxMediaDeleteActionLines) {
  throw new Error(
    `record-panel-controller-media-delete-action.ts exceeded ${maxMediaDeleteActionLines} lines: ${mediaDeleteActionLines}`,
  );
}

for (const requiredMediaFileHelpersImport of [
  'from "../lib/record-panel-detail";',
  'from "../lib/types";',
  'from "./record-panel-controller-media-download";',
]) {
  if (!mediaFileHelpersSource.includes(requiredMediaFileHelpersImport)) {
    throw new Error(
      `record-panel-controller-media-file-helpers.ts must import media-file helper contracts: ${requiredMediaFileHelpersImport}`,
    );
  }
}

for (const requiredMediaFileHelpersUsage of [
  'export { downloadRecordPanelMediaFile } from "./record-panel-controller-media-download";',
  "export function getRecordPanelMediaFileErrorMessage(",
  "export function resolveRecordPanelUploadInput(",
  "export function getRecordPanelMediaFileFallbackMessages(detailCopy: DetailCopy)",
  "notAuthenticated",
]) {
  if (!mediaFileHelpersSource.includes(requiredMediaFileHelpersUsage)) {
    throw new Error(
      `record-panel-controller-media-file-helpers.ts must own media-file helper details: ${requiredMediaFileHelpersUsage}`,
    );
  }
}

const maxMediaFileHelpersLines = 40;
if (mediaFileHelpersLines > maxMediaFileHelpersLines) {
  throw new Error(
    `record-panel-controller-media-file-helpers.ts exceeded ${maxMediaFileHelpersLines} lines: ${mediaFileHelpersLines}`,
  );
}

for (const requiredMediaDownloadImport of [
  'from "../lib/api";',
  'from "../lib/types";',
]) {
  if (!mediaDownloadSource.includes(requiredMediaDownloadImport)) {
    throw new Error(
      `record-panel-controller-media-download.ts must import media download contracts: ${requiredMediaDownloadImport}`,
    );
  }
}

for (const requiredMediaDownloadUsage of [
  "export async function downloadRecordPanelMediaFile({",
  "fetchMediaBlob(",
  "URL.createObjectURL(",
  'anchor.download = asset.original_filename || `${asset.id}.bin`;',
]) {
  if (!mediaDownloadSource.includes(requiredMediaDownloadUsage)) {
    throw new Error(
      `record-panel-controller-media-download.ts must own browser download details: ${requiredMediaDownloadUsage}`,
    );
  }
}

const maxMediaDownloadLines = 25;
if (mediaDownloadLines > maxMediaDownloadLines) {
  throw new Error(
    `record-panel-controller-media-download.ts exceeded ${maxMediaDownloadLines} lines: ${mediaDownloadLines}`,
  );
}

for (const requiredDeadLetterActionsImport of [
  'from "./record-panel-controller-dead-letter-action-input.types";',
  'from "./record-panel-controller-dead-letter-retry-action";',
  'from "./record-panel-controller-dead-letter-selection-actions";',
]) {
  if (!deadLetterActionsSource.includes(requiredDeadLetterActionsImport)) {
    throw new Error(
      `record-panel-controller-dead-letter-actions.ts must import delegated dead-letter helpers: ${requiredDeadLetterActionsImport}`,
    );
  }
}

for (const requiredDeadLetterActionsUsage of [
  "createRecordPanelControllerDeadLetterRetryAction(props)",
  "createRecordPanelControllerDeadLetterSelectionActions(props)",
  "...deadLetterSelectionActions",
  "...deadLetterRetryAction",
]) {
  if (!deadLetterActionsSource.includes(requiredDeadLetterActionsUsage)) {
    throw new Error(
      `record-panel-controller-dead-letter-actions.ts must delegate dead-letter internals: ${requiredDeadLetterActionsUsage}`,
    );
  }
}

for (const forbiddenDeadLetterActionsToken of [
  'from "../lib/record-panel-detail";',
  "Parameters<typeof createRecordPanelControllerDeadLetterRetryAction>[0]",
  "Parameters<typeof createRecordPanelControllerDeadLetterSelectionActions>[0]",
  "toggleRecordPanelDeadLetterSelection(",
  "getRecordPanelSelectableDeadLetterIds(",
  "getRecordPanelDeadLetterRetryRequest(",
  "getRecordPanelDeadLetterErrorMessage(",
  "handleBulkRetryDeadLetter",
  "handleToggleDeadLetterSelection",
]) {
  if (deadLetterActionsSource.includes(forbiddenDeadLetterActionsToken)) {
    throw new Error(
      `record-panel-controller-dead-letter-actions.ts must keep dead-letter internals delegated: ${forbiddenDeadLetterActionsToken}`,
    );
  }
}

const maxDeadLetterActionsLines = 20;
if (deadLetterActionsLines > maxDeadLetterActionsLines) {
  throw new Error(
    `record-panel-controller-dead-letter-actions.ts exceeded ${maxDeadLetterActionsLines} lines: ${deadLetterActionsLines}`,
  );
}

for (const requiredDeadLetterActionInputTypesImport of [
  'from "../lib/record-panel-detail";',
  'from "../lib/types";',
  'from "./record-panel-controller.types";',
]) {
  if (!deadLetterActionInputTypesSource.includes(requiredDeadLetterActionInputTypesImport)) {
    throw new Error(
      `record-panel-controller-dead-letter-action-input.types.ts must import dead-letter input contracts: ${requiredDeadLetterActionInputTypesImport}`,
    );
  }
}

for (const requiredDeadLetterActionInputTypesUsage of [
  "type DetailCopy = ReturnType<typeof getRecordPanelDetailBundle>[\"copy\"];",
  "export type RecordPanelControllerDeadLetterSelectionActionInput = {",
  "export type RecordPanelControllerDeadLetterRetryActionInput = {",
  'onBulkRetryMediaDeadLetter: ControllerProps["onBulkRetryMediaDeadLetter"];',
  "export type RecordPanelControllerDeadLetterActionInput =",
]) {
  if (!deadLetterActionInputTypesSource.includes(requiredDeadLetterActionInputTypesUsage)) {
    throw new Error(
      `record-panel-controller-dead-letter-action-input.types.ts must own dead-letter input typing: ${requiredDeadLetterActionInputTypesUsage}`,
    );
  }
}

const maxDeadLetterActionInputTypesLines = 25;
if (deadLetterActionInputTypesLines > maxDeadLetterActionInputTypesLines) {
  throw new Error(
    `record-panel-controller-dead-letter-action-input.types.ts exceeded ${maxDeadLetterActionInputTypesLines} lines: ${deadLetterActionInputTypesLines}`,
  );
}

for (const requiredDeadLetterSelectionActionsImport of [
  'from "./record-panel-controller-dead-letter-helpers";',
  'from "./record-panel-controller-dead-letter-action-input.types";',
]) {
  if (!deadLetterSelectionActionsSource.includes(requiredDeadLetterSelectionActionsImport)) {
    throw new Error(
      `record-panel-controller-dead-letter-selection-actions.ts must import dead-letter selection contracts: ${requiredDeadLetterSelectionActionsImport}`,
    );
  }
}

for (const requiredDeadLetterSelectionActionsUsage of [
  "export function createRecordPanelControllerDeadLetterSelectionActions({",
  "toggleRecordPanelDeadLetterSelection(current, mediaId, checked)",
  "getRecordPanelSelectableDeadLetterIds(mediaDeadLetterOverview)",
  "setSelectedDeadLetterIds([])",
]) {
  if (!deadLetterSelectionActionsSource.includes(requiredDeadLetterSelectionActionsUsage)) {
    throw new Error(
      `record-panel-controller-dead-letter-selection-actions.ts must own selection orchestration: ${requiredDeadLetterSelectionActionsUsage}`,
    );
  }
}

for (const forbiddenDeadLetterSelectionActionsToken of [
  'from "../lib/types";',
  "mediaDeadLetterOverview: MediaDeadLetterOverview | null;",
  "setSelectedDeadLetterIds: React.Dispatch<React.SetStateAction<string[]>>;",
]) {
  if (deadLetterSelectionActionsSource.includes(forbiddenDeadLetterSelectionActionsToken)) {
    throw new Error(
      `record-panel-controller-dead-letter-selection-actions.ts must keep dead-letter selection input contracts delegated: ${forbiddenDeadLetterSelectionActionsToken}`,
    );
  }
}

const maxDeadLetterSelectionActionsLines = 40;
if (deadLetterSelectionActionsLines > maxDeadLetterSelectionActionsLines) {
  throw new Error(
    `record-panel-controller-dead-letter-selection-actions.ts exceeded ${maxDeadLetterSelectionActionsLines} lines: ${deadLetterSelectionActionsLines}`,
  );
}

for (const requiredDeadLetterRetryActionImport of [
  'from "./record-panel-controller-dead-letter-action-input.types";',
  'from "./record-panel-controller-dead-letter-helpers";',
]) {
  if (!deadLetterRetryActionSource.includes(requiredDeadLetterRetryActionImport)) {
    throw new Error(
      `record-panel-controller-dead-letter-retry-action.ts must import dead-letter retry contracts: ${requiredDeadLetterRetryActionImport}`,
    );
  }
}

for (const requiredDeadLetterRetryActionUsage of [
  "export function createRecordPanelControllerDeadLetterRetryAction({",
  "getRecordPanelDeadLetterFallbackMessage(detailCopy)",
  "getRecordPanelDeadLetterRetryRequest(mode, selectedDeadLetterIds)",
  "getRecordPanelDeadLetterErrorMessage(caught, fallbackMessage)",
  'if (mode === "selected") {',
]) {
  if (!deadLetterRetryActionSource.includes(requiredDeadLetterRetryActionUsage)) {
    throw new Error(
      `record-panel-controller-dead-letter-retry-action.ts must own retry orchestration: ${requiredDeadLetterRetryActionUsage}`,
    );
  }
}

for (const forbiddenDeadLetterRetryActionToken of [
  'from "../lib/record-panel-detail";',
  'from "./record-panel-controller.types";',
  "type DetailCopy =",
  'onBulkRetryMediaDeadLetter: ControllerProps["onBulkRetryMediaDeadLetter"];',
  "selectedDeadLetterIds: string[];",
]) {
  if (deadLetterRetryActionSource.includes(forbiddenDeadLetterRetryActionToken)) {
    throw new Error(
      `record-panel-controller-dead-letter-retry-action.ts must keep dead-letter retry input contracts delegated: ${forbiddenDeadLetterRetryActionToken}`,
    );
  }
}

const maxDeadLetterRetryActionLines = 45;
if (deadLetterRetryActionLines > maxDeadLetterRetryActionLines) {
  throw new Error(
    `record-panel-controller-dead-letter-retry-action.ts exceeded ${maxDeadLetterRetryActionLines} lines: ${deadLetterRetryActionLines}`,
  );
}

for (const requiredDeadLetterHelpersExport of [
  'from "./record-panel-controller-dead-letter-selection-helpers";',
  'from "./record-panel-controller-dead-letter-retry-helpers";',
]) {
  if (!deadLetterHelpersSource.includes(requiredDeadLetterHelpersExport)) {
    throw new Error(
      `record-panel-controller-dead-letter-helpers.ts must remain a stable dead-letter helper boundary: ${requiredDeadLetterHelpersExport}`,
    );
  }
}

for (const requiredDeadLetterHelpersUsage of [
  "export {",
  "getRecordPanelSelectableDeadLetterIds,",
  "toggleRecordPanelDeadLetterSelection,",
  "getRecordPanelDeadLetterErrorMessage,",
  "getRecordPanelDeadLetterRetryRequest,",
]) {
  if (!deadLetterHelpersSource.includes(requiredDeadLetterHelpersUsage)) {
    throw new Error(
      `record-panel-controller-dead-letter-helpers.ts must expose delegated dead-letter helper contracts: ${requiredDeadLetterHelpersUsage}`,
    );
  }
}

const maxDeadLetterHelpersLines = 10;
if (deadLetterHelpersLines > maxDeadLetterHelpersLines) {
  throw new Error(
    `record-panel-controller-dead-letter-helpers.ts exceeded ${maxDeadLetterHelpersLines} lines: ${deadLetterHelpersLines}`,
  );
}

for (const requiredDeadLetterSelectionHelpersImport of [
  'from "../lib/record-panel-media";',
  'from "../lib/types";',
]) {
  if (!deadLetterSelectionHelpersSource.includes(requiredDeadLetterSelectionHelpersImport)) {
    throw new Error(
      `record-panel-controller-dead-letter-selection-helpers.ts must import dead-letter selection helper contracts: ${requiredDeadLetterSelectionHelpersImport}`,
    );
  }
}

for (const requiredDeadLetterSelectionHelpersUsage of [
  "export function toggleRecordPanelDeadLetterSelection(",
  "export function getRecordPanelSelectableDeadLetterIds(",
  "canRetryMediaIssue(",
  "current.includes(mediaId) ? current : [...current, mediaId]",
]) {
  if (!deadLetterSelectionHelpersSource.includes(requiredDeadLetterSelectionHelpersUsage)) {
    throw new Error(
      `record-panel-controller-dead-letter-selection-helpers.ts must own dead-letter selection details: ${requiredDeadLetterSelectionHelpersUsage}`,
    );
  }
}

const maxDeadLetterSelectionHelpersLines = 30;
if (deadLetterSelectionHelpersLines > maxDeadLetterSelectionHelpersLines) {
  throw new Error(
    `record-panel-controller-dead-letter-selection-helpers.ts exceeded ${maxDeadLetterSelectionHelpersLines} lines: ${deadLetterSelectionHelpersLines}`,
  );
}

for (const requiredDeadLetterRetryHelpersImport of [
  'from "../lib/record-panel-detail";',
]) {
  if (!deadLetterRetryHelpersSource.includes(requiredDeadLetterRetryHelpersImport)) {
    throw new Error(
      `record-panel-controller-dead-letter-retry-helpers.ts must import dead-letter retry helper contracts: ${requiredDeadLetterRetryHelpersImport}`,
    );
  }
}

for (const requiredDeadLetterRetryHelpersUsage of [
  "export function getRecordPanelDeadLetterErrorMessage(",
  "export function getRecordPanelDeadLetterRetryRequest(",
  "export function getRecordPanelDeadLetterFallbackMessage(detailCopy: DetailCopy)",
  '"manual_only", "exhausted", "disabled"',
  "bulkRetryError",
]) {
  if (!deadLetterRetryHelpersSource.includes(requiredDeadLetterRetryHelpersUsage)) {
    throw new Error(
      `record-panel-controller-dead-letter-retry-helpers.ts must own dead-letter retry details: ${requiredDeadLetterRetryHelpersUsage}`,
    );
  }
}

const maxDeadLetterRetryHelpersLines = 30;
if (deadLetterRetryHelpersLines > maxDeadLetterRetryHelpersLines) {
  throw new Error(
    `record-panel-controller-dead-letter-retry-helpers.ts exceeded ${maxDeadLetterRetryHelpersLines} lines: ${deadLetterRetryHelpersLines}`,
  );
}

for (const requiredMediaAssetActionInputTypesImport of [
  'from "./record-panel-controller-media-file-action-input.types";',
  'from "./record-panel-controller-media-status-action-input.types";',
]) {
  if (!mediaAssetActionInputTypesSource.includes(requiredMediaAssetActionInputTypesImport)) {
    throw new Error(
      `record-panel-controller-media-asset-action-input.types.ts must import shared media-asset contracts: ${requiredMediaAssetActionInputTypesImport}`,
    );
  }
}

for (const requiredMediaAssetActionInputTypesUsage of [
  "export type RecordPanelControllerMediaAssetActionInput =",
  "RecordPanelControllerMediaFileActionInput &",
  "RecordPanelControllerMediaStatusActionInput;",
]) {
  if (!mediaAssetActionInputTypesSource.includes(requiredMediaAssetActionInputTypesUsage)) {
    throw new Error(
      `record-panel-controller-media-asset-action-input.types.ts must own media-asset contract composition: ${requiredMediaAssetActionInputTypesUsage}`,
    );
  }
}

const maxMediaAssetActionInputTypesLines = 10;
if (mediaAssetActionInputTypesLines > maxMediaAssetActionInputTypesLines) {
  throw new Error(
    `record-panel-controller-media-asset-action-input.types.ts exceeded ${maxMediaAssetActionInputTypesLines} lines: ${mediaAssetActionInputTypesLines}`,
  );
}

for (const requiredMediaAssetActionsImport of [
  'from "./record-panel-controller-media-asset-action-input.types";',
  'from "./record-panel-controller-media-file-actions";',
  'from "./record-panel-controller-media-status-actions";',
]) {
  if (!mediaAssetActionsSource.includes(requiredMediaAssetActionsImport)) {
    throw new Error(`record-panel-controller-media-asset-actions.ts must import delegated media-asset helpers: ${requiredMediaAssetActionsImport}`);
  }
}

for (const requiredMediaAssetActionsUsage of [
  "createRecordPanelControllerMediaFileActions(props)",
  "createRecordPanelControllerMediaStatusActions(props)",
  "...mediaFileActions",
  "...mediaStatusActions",
]) {
  if (!mediaAssetActionsSource.includes(requiredMediaAssetActionsUsage)) {
    throw new Error(`record-panel-controller-media-asset-actions.ts must delegate media-asset action assembly: ${requiredMediaAssetActionsUsage}`);
  }
}

for (const forbiddenMediaAssetActionsToken of [
  'from "../lib/api";',
  'from "../lib/record-panel-detail";',
  "Parameters<typeof createRecordPanelControllerMediaFileActions>[0]",
  "Parameters<typeof createRecordPanelControllerMediaStatusActions>[0]",
  "const handleUpload",
  "const handleRefreshMedia",
  "const handleRetryMediaProcessing",
  "const handleDownloadMedia",
  "const handleDeleteMediaAsset",
  "fetchMediaBlob(",
  "onRefreshMediaStatus(",
  "onRetryMedia(",
]) {
  if (mediaAssetActionsSource.includes(forbiddenMediaAssetActionsToken)) {
    throw new Error(`record-panel-controller-media-asset-actions.ts must keep media file/status internals delegated: ${forbiddenMediaAssetActionsToken}`);
  }
}

const maxMediaAssetActionsLines = 20;
if (mediaAssetActionsLines > maxMediaAssetActionsLines) {
  throw new Error(
    `record-panel-controller-media-asset-actions.ts exceeded ${maxMediaAssetActionsLines} lines: ${mediaAssetActionsLines}`,
  );
}

for (const requiredMediaHandlersImport of [
  'from "./record-panel-controller-dead-letter-actions";',
  'from "./record-panel-controller-media-asset-actions";',
  'from "./record-panel-controller-media-handler-input.types";',
]) {
  if (!mediaHandlersSource.includes(requiredMediaHandlersImport)) {
    throw new Error(`record-panel-controller-media-handlers.ts must import delegated media helpers: ${requiredMediaHandlersImport}`);
  }
}

for (const requiredMediaHandlersUsage of [
  "createRecordPanelControllerMediaAssetActions(props)",
  "createRecordPanelControllerDeadLetterActions(props)",
  "...mediaAssetActions",
  "...deadLetterActions",
]) {
  if (!mediaHandlersSource.includes(requiredMediaHandlersUsage)) {
    throw new Error(`record-panel-controller-media-handlers.ts must delegate media handler assembly: ${requiredMediaHandlersUsage}`);
  }
}

for (const forbiddenMediaHandlersToken of [
  'from "../lib/api";',
  'from "../lib/record-panel-media";',
  "Parameters<typeof createRecordPanelControllerMediaAssetActions>[0]",
  "Parameters<typeof createRecordPanelControllerDeadLetterActions>[0]",
  "const handleUpload",
  "const handleToggleDeadLetterSelection",
  "fetchMediaBlob(",
  "canRetryMediaIssue(",
]) {
  if (mediaHandlersSource.includes(forbiddenMediaHandlersToken)) {
    throw new Error(`record-panel-controller-media-handlers.ts must keep media internals delegated: ${forbiddenMediaHandlersToken}`);
  }
}

const maxMediaHandlersLines = 20;
if (mediaHandlersLines > maxMediaHandlersLines) {
  throw new Error(
    `record-panel-controller-media-handlers.ts exceeded ${maxMediaHandlersLines} lines: ${mediaHandlersLines}`,
  );
}

for (const requiredLegacyImport of [
  'import { createRecordPanelLegacyActions } from "./record-panel-legacy-actions";',
  'import { RecordPanelLegacyForm } from "./record-panel-legacy-form";',
  'import { RecordPanelLegacyList } from "./record-panel-legacy-list";',
  'import { useRecordPanelLegacyState } from "./record-panel-legacy-state";',
  'import { RecordPanelLegacyStats } from "./record-panel-legacy-stats";',
  'import { useRecordPanelLegacySync } from "./record-panel-legacy-sync";',
  'import { useRecordPanelLegacyViewData } from "./use-record-panel-legacy-view-data";',
  'import type { RecordPanelProps } from "./record-panel.types";',
]) {
  if (!legacyRecordPanelSource.includes(requiredLegacyImport)) {
    throw new Error(`record-panel.tsx must import delegated legacy helpers: ${requiredLegacyImport}`);
  }
}

for (const requiredLegacyUsage of [
  "useRecordPanelLegacyViewData({",
  "useRecordPanelLegacyState()",
  "useRecordPanelLegacySync({ selectedRecord, setForm })",
  "createRecordPanelLegacyActions({",
  "<RecordPanelLegacyStats",
  "<RecordPanelLegacyForm",
  "<RecordPanelLegacyList",
]) {
  if (!legacyRecordPanelSource.includes(requiredLegacyUsage)) {
    throw new Error(`record-panel.tsx must compose delegated legacy sections: ${requiredLegacyUsage}`);
  }
}

for (const forbiddenLegacyToken of [
  'import type { MediaAsset, RecordItem } from "../lib/types";',
  'className="panel-header"',
  'className="stats-grid"',
  'className="record-card form-stack"',
  'className="record-list compact-list"',
  "useEffect(",
  "useMemo(",
  "useState(",
  "const EMPTY_FORM",
  "const handleSubmit",
  "const handleDelete",
  "const handleUpload",
  "records.filter(",
  "records.find(",
  "records.map((record) => (",
  "mediaAssets.map((asset) => (",
]) {
  if (legacyRecordPanelSource.includes(forbiddenLegacyToken)) {
    throw new Error(`record-panel.tsx must keep legacy layout details delegated: ${forbiddenLegacyToken}`);
  }
}

for (const requiredLegacyViewDataImport of [
  'from "react";',
  'from "../lib/types";',
  'from "./record-panel-controller-record-view-data";',
]) {
  if (!legacyRecordPanelViewDataSource.includes(requiredLegacyViewDataImport)) {
    throw new Error(`use-record-panel-legacy-view-data.ts must import legacy view-data contracts: ${requiredLegacyViewDataImport}`);
  }
}

for (const requiredLegacyViewDataUsage of [
  "export function useRecordPanelLegacyViewData({",
  "return useMemo(",
  "buildRecordPanelRecordViewData({ records, selectedRecordId })",
]) {
  if (!legacyRecordPanelViewDataSource.includes(requiredLegacyViewDataUsage)) {
    throw new Error(`use-record-panel-legacy-view-data.ts must own legacy record summary derivation: ${requiredLegacyViewDataUsage}`);
  }
}

const maxLegacyRecordPanelViewDataLines = 20;
if (legacyRecordPanelViewDataLines > maxLegacyRecordPanelViewDataLines) {
  throw new Error(
    `use-record-panel-legacy-view-data.ts exceeded ${maxLegacyRecordPanelViewDataLines} lines: ${legacyRecordPanelViewDataLines}`,
  );
}

for (const requiredLegacyActionInputTypesImport of [
  'from "../lib/types";',
  'from "./record-panel.types";',
]) {
  if (!legacyRecordPanelActionInputTypesSource.includes(requiredLegacyActionInputTypesImport)) {
    throw new Error(`record-panel-legacy-action-input.types.ts must import legacy action contracts: ${requiredLegacyActionInputTypesImport}`);
  }
}

for (const requiredLegacyActionInputTypesUsage of [
  "export type RecordPanelLegacyDeleteActionInput = {",
  "export type RecordPanelLegacySubmitActionInput = {",
  "export type RecordPanelLegacyUploadActionInput = {",
  "export type LegacyActionsInput = RecordPanelLegacyDeleteActionInput & RecordPanelLegacySubmitActionInput & RecordPanelLegacyUploadActionInput;",
]) {
  if (!legacyRecordPanelActionInputTypesSource.includes(requiredLegacyActionInputTypesUsage)) {
    throw new Error(`record-panel-legacy-action-input.types.ts must own legacy action typing: ${requiredLegacyActionInputTypesUsage}`);
  }
}

const maxLegacyActionInputTypesLines = 10;
if (legacyRecordPanelActionInputTypesLines > maxLegacyActionInputTypesLines) {
  throw new Error(
    `record-panel-legacy-action-input.types.ts exceeded ${maxLegacyActionInputTypesLines} lines: ${legacyRecordPanelActionInputTypesLines}`,
  );
}

for (const requiredLegacyActionsImport of [
  'from "./record-panel-legacy-action-input.types";',
  'from "./record-panel-legacy-delete-action";',
  'from "./record-panel-legacy-submit-action";',
  'from "./record-panel-legacy-upload-action";',
]) {
  if (!legacyRecordPanelActionsSource.includes(requiredLegacyActionsImport)) {
    throw new Error(`record-panel-legacy-actions.ts must import delegated legacy action helpers: ${requiredLegacyActionsImport}`);
  }
}

for (const requiredLegacyActionsUsage of [
  "createRecordPanelLegacySubmitAction(input)",
  "createRecordPanelLegacyDeleteAction(input)",
  "createRecordPanelLegacyUploadAction(input)",
]) {
  if (!legacyRecordPanelActionsSource.includes(requiredLegacyActionsUsage)) {
    throw new Error(`record-panel-legacy-actions.ts must compose delegated legacy actions: ${requiredLegacyActionsUsage}`);
  }
}

for (const forbiddenLegacyActionsToken of [
  "Parameters<typeof createRecordPanelLegacyDeleteAction>[0]",
  "Parameters<typeof createRecordPanelLegacySubmitAction>[0]",
  "Parameters<typeof createRecordPanelLegacyUploadAction>[0]",
  "function getRecordPanelErrorMessage(",
  "event.preventDefault()",
  'setError("Content is required")',
  "await onDeleteRecord(selectedRecord.id)",
  "await onUploadMedia(selectedRecord.id, file)",
]) {
  if (legacyRecordPanelActionsSource.includes(forbiddenLegacyActionsToken)) {
    throw new Error(`record-panel-legacy-actions.ts must keep legacy action internals delegated: ${forbiddenLegacyActionsToken}`);
  }
}

const maxLegacyRecordPanelActionsLines = 20;
if (legacyRecordPanelActionsLines > maxLegacyRecordPanelActionsLines) {
  throw new Error(
    `record-panel-legacy-actions.ts exceeded ${maxLegacyRecordPanelActionsLines} lines: ${legacyRecordPanelActionsLines}`,
  );
}

for (const requiredLegacyActionErrorUsage of [
  "export function getRecordPanelErrorMessage(",
  "return caught instanceof Error ? caught.message : fallbackMessage;",
]) {
  if (!legacyRecordPanelActionErrorSource.includes(requiredLegacyActionErrorUsage)) {
    throw new Error(`record-panel-legacy-action-error.ts must own legacy action error formatting: ${requiredLegacyActionErrorUsage}`);
  }
}

const maxLegacyActionErrorLines = 5;
if (legacyRecordPanelActionErrorLines > maxLegacyActionErrorLines) {
  throw new Error(
    `record-panel-legacy-action-error.ts exceeded ${maxLegacyActionErrorLines} lines: ${legacyRecordPanelActionErrorLines}`,
  );
}

for (const requiredLegacySubmitActionImport of [
  'from "react";',
  'from "./record-panel-legacy-action-error";',
  'from "./record-panel-legacy-action-input.types";',
]) {
  if (!legacyRecordPanelSubmitActionSource.includes(requiredLegacySubmitActionImport)) {
    throw new Error(`record-panel-legacy-submit-action.ts must import legacy submit action contracts: ${requiredLegacySubmitActionImport}`);
  }
}

for (const requiredLegacySubmitActionUsage of [
  "export function createRecordPanelLegacySubmitAction({",
  "event.preventDefault()",
  'setError("Content is required")',
  "await onSaveRecord({",
  'setError(getRecordPanelErrorMessage(caught, "Failed to save record"))',
]) {
  if (!legacyRecordPanelSubmitActionSource.includes(requiredLegacySubmitActionUsage)) {
    throw new Error(`record-panel-legacy-submit-action.ts must own legacy submit details: ${requiredLegacySubmitActionUsage}`);
  }
}

for (const forbiddenLegacySubmitActionToken of [
  'from "../lib/types";',
  'from "./record-panel.types";',
  "form: RecordPanelFormState;",
  'onSaveRecord: RecordPanelProps["onSaveRecord"];',
  "selectedRecord: RecordItem | null;",
  "setSaving: (value: boolean) => void;",
]) {
  if (legacyRecordPanelSubmitActionSource.includes(forbiddenLegacySubmitActionToken)) {
    throw new Error(`record-panel-legacy-submit-action.ts must keep legacy submit input contracts delegated: ${forbiddenLegacySubmitActionToken}`);
  }
}

const maxLegacySubmitActionLines = 45;
if (legacyRecordPanelSubmitActionLines > maxLegacySubmitActionLines) {
  throw new Error(
    `record-panel-legacy-submit-action.ts exceeded ${maxLegacySubmitActionLines} lines: ${legacyRecordPanelSubmitActionLines}`,
  );
}

for (const requiredLegacyDeleteActionImport of [
  'from "./record-panel-legacy-action-error";',
  'from "./record-panel-legacy-action-input.types";',
]) {
  if (!legacyRecordPanelDeleteActionSource.includes(requiredLegacyDeleteActionImport)) {
    throw new Error(`record-panel-legacy-delete-action.ts must import legacy delete action contracts: ${requiredLegacyDeleteActionImport}`);
  }
}

for (const requiredLegacyDeleteActionUsage of [
  "export function createRecordPanelLegacyDeleteAction({",
  "if (!selectedRecord) {",
  "await onDeleteRecord(selectedRecord.id)",
  'setError(getRecordPanelErrorMessage(caught, "Failed to delete record"))',
]) {
  if (!legacyRecordPanelDeleteActionSource.includes(requiredLegacyDeleteActionUsage)) {
    throw new Error(`record-panel-legacy-delete-action.ts must own legacy delete details: ${requiredLegacyDeleteActionUsage}`);
  }
}

for (const forbiddenLegacyDeleteActionToken of [
  'from "../lib/types";',
  'from "./record-panel.types";',
  'onDeleteRecord: RecordPanelProps["onDeleteRecord"];',
  "selectedRecord: RecordItem | null;",
  "setDeleting: (value: boolean) => void;",
]) {
  if (legacyRecordPanelDeleteActionSource.includes(forbiddenLegacyDeleteActionToken)) {
    throw new Error(`record-panel-legacy-delete-action.ts must keep legacy delete input contracts delegated: ${forbiddenLegacyDeleteActionToken}`);
  }
}

const maxLegacyDeleteActionLines = 30;
if (legacyRecordPanelDeleteActionLines > maxLegacyDeleteActionLines) {
  throw new Error(
    `record-panel-legacy-delete-action.ts exceeded ${maxLegacyDeleteActionLines} lines: ${legacyRecordPanelDeleteActionLines}`,
  );
}

for (const requiredLegacyUploadActionImport of [
  'from "react";',
  'from "./record-panel-legacy-action-error";',
  'from "./record-panel-legacy-action-input.types";',
]) {
  if (!legacyRecordPanelUploadActionSource.includes(requiredLegacyUploadActionImport)) {
    throw new Error(`record-panel-legacy-upload-action.ts must import legacy upload action contracts: ${requiredLegacyUploadActionImport}`);
  }
}

for (const requiredLegacyUploadActionUsage of [
  "export function createRecordPanelLegacyUploadAction({",
  "const file = event.target.files?.[0];",
  "await onUploadMedia(selectedRecord.id, file)",
  'setError(getRecordPanelErrorMessage(caught, "Failed to upload media"))',
]) {
  if (!legacyRecordPanelUploadActionSource.includes(requiredLegacyUploadActionUsage)) {
    throw new Error(`record-panel-legacy-upload-action.ts must own legacy upload details: ${requiredLegacyUploadActionUsage}`);
  }
}

for (const forbiddenLegacyUploadActionToken of [
  'from "../lib/types";',
  'from "./record-panel.types";',
  'onUploadMedia: RecordPanelProps["onUploadMedia"];',
  "selectedRecord: RecordItem | null;",
  "setUploading: (value: boolean) => void;",
]) {
  if (legacyRecordPanelUploadActionSource.includes(forbiddenLegacyUploadActionToken)) {
    throw new Error(`record-panel-legacy-upload-action.ts must keep legacy upload input contracts delegated: ${forbiddenLegacyUploadActionToken}`);
  }
}

const maxLegacyUploadActionLines = 35;
if (legacyRecordPanelUploadActionLines > maxLegacyUploadActionLines) {
  throw new Error(
    `record-panel-legacy-upload-action.ts exceeded ${maxLegacyUploadActionLines} lines: ${legacyRecordPanelUploadActionLines}`,
  );
}

for (const requiredLegacyFormImport of [
  'import { RecordPanelLegacyFormActions } from "./record-panel-legacy-form-actions";',
  'import { RecordPanelLegacyFormFields } from "./record-panel-legacy-form-fields";',
  'import { RecordPanelLegacyFormMedia } from "./record-panel-legacy-form-media";',
  'import type { RecordPanelLegacyFormProps } from "./record-panel-legacy-form.types";',
]) {
  if (!legacyRecordPanelFormSource.includes(requiredLegacyFormImport)) {
    throw new Error(`record-panel-legacy-form.tsx must import delegated form helpers: ${requiredLegacyFormImport}`);
  }
}

for (const requiredLegacyFormUsage of [
  "<RecordPanelLegacyFormFields",
  "<RecordPanelLegacyFormActions",
  "<RecordPanelLegacyFormMedia",
]) {
  if (!legacyRecordPanelFormSource.includes(requiredLegacyFormUsage)) {
    throw new Error(`record-panel-legacy-form.tsx must compose delegated form sections: ${requiredLegacyFormUsage}`);
  }
}

for (const forbiddenLegacyFormToken of [
  'import type { MediaAsset, RecordItem } from "../lib/types";',
  'import type { RecordPanelFormState } from "./record-panel.types";',
  "type RecordPanelLegacyFormProps = {",
  'placeholder="Optional title"',
  'placeholder="Write a note, food review, or reminder"',
  'className="action-row"',
  '"Saving..."',
  '"Update record"',
  '"Create record"',
  '"Deleting..."',
  '"Delete record"',
  'className="record-list compact-list"',
  "No media uploaded for this record yet.",
]) {
  if (legacyRecordPanelFormSource.includes(forbiddenLegacyFormToken)) {
    throw new Error(`record-panel-legacy-form.tsx must keep field and media details delegated: ${forbiddenLegacyFormToken}`);
  }
}

const maxLegacyRecordPanelFormLines = 60;
if (legacyRecordPanelFormLines > maxLegacyRecordPanelFormLines) {
  throw new Error(
    `record-panel-legacy-form.tsx exceeded ${maxLegacyRecordPanelFormLines} lines: ${legacyRecordPanelFormLines}`,
  );
}

for (const requiredLegacyFormActionsUsage of [
  'import type { RecordPanelLegacyFormProps } from "./record-panel-legacy-form.types";',
  "export function RecordPanelLegacyFormActions({",
  'className="action-row"',
  '"Saving..."',
  '"Delete record"',
]) {
  if (!legacyRecordPanelFormActionsSource.includes(requiredLegacyFormActionsUsage)) {
    throw new Error(`record-panel-legacy-form-actions.tsx must own legacy form action rendering: ${requiredLegacyFormActionsUsage}`);
  }
}

const maxLegacyRecordPanelFormActionsLines = 30;
if (legacyRecordPanelFormActionsLines > maxLegacyRecordPanelFormActionsLines) {
  throw new Error(
    `record-panel-legacy-form-actions.tsx exceeded ${maxLegacyRecordPanelFormActionsLines} lines: ${legacyRecordPanelFormActionsLines}`,
  );
}

for (const requiredLegacyFormTypesUsage of [
  "export type RecordPanelLegacyFormProps = {",
  "mediaAssets: MediaAsset[];",
  "setForm: Dispatch<SetStateAction<RecordPanelFormState>>;",
]) {
  if (!legacyRecordPanelFormTypesSource.includes(requiredLegacyFormTypesUsage)) {
    throw new Error(`record-panel-legacy-form.types.ts must own the shared form contract: ${requiredLegacyFormTypesUsage}`);
  }
}

const maxLegacyRecordPanelFormTypesLines = 25;
if (legacyRecordPanelFormTypesLines > maxLegacyRecordPanelFormTypesLines) {
  throw new Error(
    `record-panel-legacy-form.types.ts exceeded ${maxLegacyRecordPanelFormTypesLines} lines: ${legacyRecordPanelFormTypesLines}`,
  );
}

for (const requiredLegacyFormFieldsUsage of [
  'import { RecordPanelLegacyClassificationFields } from "./record-panel-legacy-classification-fields";',
  'import type { RecordPanelLegacyFormProps } from "./record-panel-legacy-form.types";',
  'import { RecordPanelLegacyPrimaryFields } from "./record-panel-legacy-primary-fields";',
  "export function RecordPanelLegacyFormFields({",
  "<RecordPanelLegacyPrimaryFields",
  "<RecordPanelLegacyClassificationFields",
]) {
  if (!legacyRecordPanelFormFieldsSource.includes(requiredLegacyFormFieldsUsage)) {
    throw new Error(`record-panel-legacy-form-fields.tsx must own editable field rendering: ${requiredLegacyFormFieldsUsage}`);
  }
}

for (const forbiddenLegacyFormFieldsToken of [
  'placeholder="Optional title"',
  'placeholder="Write a note, food review, or reminder"',
  '<option value="memo">',
  "Avoid item",
]) {
  if (legacyRecordPanelFormFieldsSource.includes(forbiddenLegacyFormFieldsToken)) {
    throw new Error(`record-panel-legacy-form-fields.tsx must keep primary/classification field details delegated: ${forbiddenLegacyFormFieldsToken}`);
  }
}

const maxLegacyRecordPanelFormFieldsLines = 20;
if (legacyRecordPanelFormFieldsLines > maxLegacyRecordPanelFormFieldsLines) {
  throw new Error(
    `record-panel-legacy-form-fields.tsx exceeded ${maxLegacyRecordPanelFormFieldsLines} lines: ${legacyRecordPanelFormFieldsLines}`,
  );
}

for (const requiredLegacyPrimaryFieldsUsage of [
  'import type { RecordPanelLegacyFormProps } from "./record-panel-legacy-form.types";',
  "export function RecordPanelLegacyPrimaryFields({",
  'placeholder="Optional title"',
  'placeholder="Write a note, food review, or reminder"',
]) {
  if (!legacyRecordPanelPrimaryFieldsSource.includes(requiredLegacyPrimaryFieldsUsage)) {
    throw new Error(`record-panel-legacy-primary-fields.tsx must own title/content field rendering: ${requiredLegacyPrimaryFieldsUsage}`);
  }
}

const maxLegacyRecordPanelPrimaryFieldsLines = 35;
if (legacyRecordPanelPrimaryFieldsLines > maxLegacyRecordPanelPrimaryFieldsLines) {
  throw new Error(
    `record-panel-legacy-primary-fields.tsx exceeded ${maxLegacyRecordPanelPrimaryFieldsLines} lines: ${legacyRecordPanelPrimaryFieldsLines}`,
  );
}

for (const requiredLegacyClassificationFieldsUsage of [
  'import type { RecordPanelLegacyFormProps } from "./record-panel-legacy-form.types";',
  "export function RecordPanelLegacyClassificationFields({",
  '<option value="memo">memo</option>',
  '<option value="bad_experience">bad_experience</option>',
  'placeholder="1-5"',
  "Avoid item",
]) {
  if (!legacyRecordPanelClassificationFieldsSource.includes(requiredLegacyClassificationFieldsUsage)) {
    throw new Error(`record-panel-legacy-classification-fields.tsx must own type/rating/avoid rendering: ${requiredLegacyClassificationFieldsUsage}`);
  }
}

const maxLegacyRecordPanelClassificationFieldsLines = 45;
if (legacyRecordPanelClassificationFieldsLines > maxLegacyRecordPanelClassificationFieldsLines) {
  throw new Error(
    `record-panel-legacy-classification-fields.tsx exceeded ${maxLegacyRecordPanelClassificationFieldsLines} lines: ${legacyRecordPanelClassificationFieldsLines}`,
  );
}

for (const requiredLegacyFormMediaUsage of [
  'import type { RecordPanelLegacyFormProps } from "./record-panel-legacy-form.types";',
  "export function RecordPanelLegacyFormMedia({",
  "if (!selectedRecord) {",
  "Uploading media...",
  "No media uploaded for this record yet.",
]) {
  if (!legacyRecordPanelFormMediaSource.includes(requiredLegacyFormMediaUsage)) {
    throw new Error(`record-panel-legacy-form-media.tsx must own media rendering: ${requiredLegacyFormMediaUsage}`);
  }
}

const maxLegacyRecordPanelFormMediaLines = 45;
if (legacyRecordPanelFormMediaLines > maxLegacyRecordPanelFormMediaLines) {
  throw new Error(
    `record-panel-legacy-form-media.tsx exceeded ${maxLegacyRecordPanelFormMediaLines} lines: ${legacyRecordPanelFormMediaLines}`,
  );
}

for (const requiredLegacyStatsUsage of [
  'import { RecordPanelLegacyStatsGrid } from "./record-panel-legacy-stats-grid";',
  'import { RecordPanelLegacyStatsHeader } from "./record-panel-legacy-stats-header";',
  "export function RecordPanelLegacyStats({",
  "<RecordPanelLegacyStatsHeader",
  "<RecordPanelLegacyStatsGrid",
]) {
  if (!legacyRecordPanelStatsSource.includes(requiredLegacyStatsUsage)) {
    throw new Error(`record-panel-legacy-stats.tsx must compose delegated legacy stats sections: ${requiredLegacyStatsUsage}`);
  }
}

for (const forbiddenLegacyStatsToken of [
  'className="panel-header"',
  'className="stats-grid"',
  "Structured Results",
  "Visible records",
  "Reset list",
]) {
  if (legacyRecordPanelStatsSource.includes(forbiddenLegacyStatsToken)) {
    throw new Error(`record-panel-legacy-stats.tsx must keep header/grid details delegated: ${forbiddenLegacyStatsToken}`);
  }
}

const maxLegacyRecordPanelStatsLines = 30;
if (legacyRecordPanelStatsLines > maxLegacyRecordPanelStatsLines) {
  throw new Error(
    `record-panel-legacy-stats.tsx exceeded ${maxLegacyRecordPanelStatsLines} lines: ${legacyRecordPanelStatsLines}`,
  );
}

for (const requiredLegacyStatsHeaderUsage of [
  "export function RecordPanelLegacyStatsHeader({",
  '{workspaceId}',
  "Structured Results",
  "Reset list",
]) {
  if (!legacyRecordPanelStatsHeaderSource.includes(requiredLegacyStatsHeaderUsage)) {
    throw new Error(`record-panel-legacy-stats-header.tsx must own legacy stats header rendering: ${requiredLegacyStatsHeaderUsage}`);
  }
}

const maxLegacyRecordPanelStatsHeaderLines = 30;
if (legacyRecordPanelStatsHeaderLines > maxLegacyRecordPanelStatsHeaderLines) {
  throw new Error(
    `record-panel-legacy-stats-header.tsx exceeded ${maxLegacyRecordPanelStatsHeaderLines} lines: ${legacyRecordPanelStatsHeaderLines}`,
  );
}

for (const requiredLegacyStatsGridUsage of [
  "export function RecordPanelLegacyStatsGrid({",
  "Visible records",
  "{recordCount}",
  "{foodCount}",
  "{avoidCount}",
]) {
  if (!legacyRecordPanelStatsGridSource.includes(requiredLegacyStatsGridUsage)) {
    throw new Error(`record-panel-legacy-stats-grid.tsx must own legacy stats grid rendering: ${requiredLegacyStatsGridUsage}`);
  }
}

const maxLegacyRecordPanelStatsGridLines = 35;
if (legacyRecordPanelStatsGridLines > maxLegacyRecordPanelStatsGridLines) {
  throw new Error(
    `record-panel-legacy-stats-grid.tsx exceeded ${maxLegacyRecordPanelStatsGridLines} lines: ${legacyRecordPanelStatsGridLines}`,
  );
}

for (const requiredLegacyListUsage of [
  'import type { RecordItem } from "../lib/types";',
  'import { RecordPanelLegacyListEmpty } from "./record-panel-legacy-list-empty";',
  'import { RecordPanelLegacyListItem } from "./record-panel-legacy-list-item";',
  "export function RecordPanelLegacyList({",
  "<RecordPanelLegacyListItem",
  "<RecordPanelLegacyListEmpty",
]) {
  if (!legacyRecordPanelListSource.includes(requiredLegacyListUsage)) {
    throw new Error(`record-panel-legacy-list.tsx must compose delegated legacy list sections: ${requiredLegacyListUsage}`);
  }
}

for (const forbiddenLegacyListToken of [
  '<article',
  'className="notice"',
  "No records yet. Save one from the chat panel or create one manually above.",
  'className={`record-card selectable-card',
  '{record.title || "Untitled"}',
]) {
  if (legacyRecordPanelListSource.includes(forbiddenLegacyListToken)) {
    throw new Error(`record-panel-legacy-list.tsx must keep empty-state and card details delegated: ${forbiddenLegacyListToken}`);
  }
}

const maxLegacyRecordPanelListLines = 35;
if (legacyRecordPanelListLines > maxLegacyRecordPanelListLines) {
  throw new Error(
    `record-panel-legacy-list.tsx exceeded ${maxLegacyRecordPanelListLines} lines: ${legacyRecordPanelListLines}`,
  );
}

for (const requiredLegacyListItemUsage of [
  'import type { RecordItem } from "../lib/types";',
  "export function RecordPanelLegacyListItem({",
  '{record.title || "Untitled"}',
  '{record.content || "No content"}',
  '{record.is_avoid ? <span className="tag">avoid</span> : null}',
]) {
  if (!legacyRecordPanelListItemSource.includes(requiredLegacyListItemUsage)) {
    throw new Error(`record-panel-legacy-list-item.tsx must own legacy record-card rendering: ${requiredLegacyListItemUsage}`);
  }
}

const maxLegacyRecordPanelListItemLines = 35;
if (legacyRecordPanelListItemLines > maxLegacyRecordPanelListItemLines) {
  throw new Error(
    `record-panel-legacy-list-item.tsx exceeded ${maxLegacyRecordPanelListItemLines} lines: ${legacyRecordPanelListItemLines}`,
  );
}

for (const requiredLegacyListEmptyUsage of [
  "export function RecordPanelLegacyListEmpty() {",
  "No records yet. Save one from the chat panel or create one manually above.",
]) {
  if (!legacyRecordPanelListEmptySource.includes(requiredLegacyListEmptyUsage)) {
    throw new Error(`record-panel-legacy-list-empty.tsx must own legacy empty-state rendering: ${requiredLegacyListEmptyUsage}`);
  }
}

const maxLegacyRecordPanelListEmptyLines = 10;
if (legacyRecordPanelListEmptyLines > maxLegacyRecordPanelListEmptyLines) {
  throw new Error(
    `record-panel-legacy-list-empty.tsx exceeded ${maxLegacyRecordPanelListEmptyLines} lines: ${legacyRecordPanelListEmptyLines}`,
  );
}

const maxLegacyRecordPanelLines = 150;
if (legacyRecordPanelLines > maxLegacyRecordPanelLines) {
  throw new Error(
    `record-panel.tsx exceeded ${maxLegacyRecordPanelLines} lines: ${legacyRecordPanelLines}`,
  );
}

console.log("record-panel structure verification passed");
