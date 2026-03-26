import fs from "node:fs";
import path from "node:path";

const recordPanelPath = path.resolve(process.cwd(), "components/record-panel-v2.tsx");
const recordPanelHeaderPath = path.resolve(process.cwd(), "components/record-panel-header.tsx");
const recordPanelHeaderTypesPath = path.resolve(process.cwd(), "components/record-panel-header.types.ts");
const recordQuickAddBarPath = path.resolve(process.cwd(), "components/record-quick-add-bar.tsx");
const recordQuickAddBarHelpersPath = path.resolve(
  process.cwd(),
  "components/record-quick-add-bar.helpers.ts",
);
const recordQuickAddPreviewPath = path.resolve(
  process.cwd(),
  "components/record-quick-add-preview.tsx",
);
const recordQuickAddPreviewTypesPath = path.resolve(
  process.cwd(),
  "components/record-quick-add-preview.types.ts",
);
const recordQuickAddBarHelpersTypesPath = path.resolve(
  process.cwd(),
  "components/record-quick-add-bar.helpers.types.ts",
);
const recordQuickAddBarTypesPath = path.resolve(
  process.cwd(),
  "components/record-quick-add-bar.types.ts",
);
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
const legacyRecordPanelSyncPath = path.resolve(
  process.cwd(),
  "components/record-panel-legacy-sync.ts",
);
const legacyRecordPanelSyncTypesPath = path.resolve(
  process.cwd(),
  "components/record-panel-legacy-sync.types.ts",
);
const legacyRecordPanelViewDataTypesPath = path.resolve(
  process.cwd(),
  "components/use-record-panel-legacy-view-data.types.ts",
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
const recordPanelDetailCopyTypesPath = path.resolve(
  process.cwd(),
  "components/record-panel-detail-copy.types.ts",
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
const recordEditorWorkspaceMainSectionsPropsPath = path.resolve(
  process.cwd(),
  "components/record-editor-workspace-main-sections-props.ts",
);
const recordEditorWorkspaceMainSectionsPropsTypesPath = path.resolve(
  process.cwd(),
  "components/record-editor-workspace-main-sections-props.types.ts",
);
const recordReminderToolsPanelPropsPath = path.resolve(
  process.cwd(),
  "components/record-reminder-tools-panel-props.ts",
);
const recordReminderToolsPanelPropsTypesPath = path.resolve(
  process.cwd(),
  "components/record-reminder-tools-panel-props.types.ts",
);
const recordPanelBrowseWorkspaceOutputPropsTypesPath = path.resolve(
  process.cwd(),
  "components/record-panel-v2-browse-workspace-output-props.types.ts",
);
const recordPanelBrowseWorkspaceCopyPropsPath = path.resolve(
  process.cwd(),
  "components/record-panel-v2-browse-workspace-copy-props.ts",
);
const recordPanelBrowseWorkspacePropsInputTypesPath = path.resolve(
  process.cwd(),
  "components/record-panel-v2-browse-workspace-props-input.types.ts",
);
const recordPanelEditorWorkspaceCopyPropsPath = path.resolve(
  process.cwd(),
  "components/record-panel-v2-editor-workspace-copy-props.ts",
);
const recordPanelEditorWorkspaceCopyOutputPropsTypesPath = path.resolve(
  process.cwd(),
  "components/record-panel-v2-editor-workspace-copy-output-props.types.ts",
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
const recordPanelEditorWorkspacePropsBuilderInputTypesPath = path.resolve(
  process.cwd(),
  "components/record-panel-v2-editor-workspace-props-builder-input.types.ts",
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
const recordPanelEditorWorkspaceActionPropsTypesPath = path.resolve(
  process.cwd(),
  "components/record-panel-v2-editor-workspace-action-props.types.ts",
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
const recordPanelShellPropsTypesPath = path.resolve(
  process.cwd(),
  "components/record-panel-v2-shell-props.types.ts",
);
const recordPanelShellViewPropsPath = path.resolve(
  process.cwd(),
  "components/record-panel-v2-shell-view-props.ts",
);
const recordPanelHeaderPropsPath = path.resolve(
  process.cwd(),
  "components/record-panel-v2-header-props.ts",
);
const recordPanelHeaderPropsTypesPath = path.resolve(
  process.cwd(),
  "components/record-panel-v2-header-props.types.ts",
);
const recordPanelControllerOutputTypesPath = path.resolve(
  process.cwd(),
  "components/record-panel-controller-output.types.ts",
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
const recordPanelControllerDeadLetterSyncTypesPath = path.resolve(
  process.cwd(),
  "components/use-record-panel-controller-dead-letter-sync.types.ts",
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
const recordPanelControllerFilterSyncTypesPath = path.resolve(
  process.cwd(),
  "components/use-record-panel-controller-filter-sync.types.ts",
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
const recordPanelControllerResultTypesPath = path.resolve(
  process.cwd(),
  "components/record-panel-controller-result.types.ts",
);
const recordPanelControllerHandlerGroupsResultTypesPath = path.resolve(
  process.cwd(),
  "components/record-panel-controller-handler-groups-result.types.ts",
);
const recordPanelControllerStateResultPath = path.resolve(
  process.cwd(),
  "components/record-panel-controller-state-result.ts",
);
const recordPanelControllerStateResultTypesPath = path.resolve(
  process.cwd(),
  "components/record-panel-controller-state-result.types.ts",
);
const recordPanelControllerViewDataResultPath = path.resolve(
  process.cwd(),
  "components/record-panel-controller-view-data-result.ts",
);
const recordPanelControllerViewDataResultTypesPath = path.resolve(
  process.cwd(),
  "components/record-panel-controller-view-data-result.types.ts",
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
const recordPanelControllerViewDataTypesPath = path.resolve(
  process.cwd(),
  "components/use-record-panel-controller-view-data.types.ts",
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
const recordPanelControllerRecordViewDataTypesPath = path.resolve(
  process.cwd(),
  "components/record-panel-controller-record-view-data.types.ts",
);
const recordPanelControllerSelectedRecordViewDataPath = path.resolve(
  process.cwd(),
  "components/record-panel-controller-selected-record-view-data.ts",
);
const recordPanelControllerSelectedRecordViewDataTypesPath = path.resolve(
  process.cwd(),
  "components/record-panel-controller-selected-record-view-data.types.ts",
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
const recordPanelFilterApplyActionTypesPath = path.resolve(
  process.cwd(),
  "components/record-panel-controller-filter-apply-action.types.ts",
);
const recordPanelControllerDetailCopyTypesPath = path.resolve(
  process.cwd(),
  "components/record-panel-controller-detail-copy.types.ts",
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
const recordPanelFilterPresetSaveActionTypesPath = path.resolve(
  process.cwd(),
  "components/record-panel-controller-filter-preset-save-action.types.ts",
);
const recordPanelFilterPresetDeleteActionPath = path.resolve(
  process.cwd(),
  "components/record-panel-controller-filter-preset-delete-action.ts",
);
const recordPanelFilterPresetDeleteActionTypesPath = path.resolve(
  process.cwd(),
  "components/record-panel-controller-filter-preset-delete-action.types.ts",
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
const recordPanelFilterPresetNameTypesPath = path.resolve(
  process.cwd(),
  "components/record-panel-controller-filter-preset-name.types.ts",
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
const recordPanelRecordSaveSuccessHelpersTypesPath = path.resolve(
  process.cwd(),
  "components/record-panel-controller-record-save-success-helpers.types.ts",
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
const recordPanelRecordLocationPayloadTypesPath = path.resolve(
  process.cwd(),
  "components/record-panel-controller-record-location-payload.types.ts",
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
const recordPanelReminderSuccessHelpersTypesPath = path.resolve(
  process.cwd(),
  "components/record-panel-controller-reminder-success-helpers.types.ts",
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
const recordPanelReminderPayloadTypesPath = path.resolve(
  process.cwd(),
  "components/record-panel-controller-reminder-payload.types.ts",
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
const recordPanelMediaStatusRunnerTypesPath = path.resolve(
  process.cwd(),
  "components/record-panel-controller-media-status-runner.types.ts",
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
const recordPanelMediaDownloadTypesPath = path.resolve(
  process.cwd(),
  "components/record-panel-controller-media-download.types.ts",
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
const legacyRecordPanelFormFieldsTypesPath = path.resolve(
  process.cwd(),
  "components/record-panel-legacy-form-fields.types.ts",
);
const legacyRecordPanelPrimaryFieldsPath = path.resolve(
  process.cwd(),
  "components/record-panel-legacy-primary-fields.tsx",
);
const legacyRecordPanelPrimaryFieldsTypesPath = path.resolve(
  process.cwd(),
  "components/record-panel-legacy-primary-fields.types.ts",
);
const legacyRecordPanelClassificationFieldsPath = path.resolve(
  process.cwd(),
  "components/record-panel-legacy-classification-fields.tsx",
);
const legacyRecordPanelClassificationFieldsTypesPath = path.resolve(
  process.cwd(),
  "components/record-panel-legacy-classification-fields.types.ts",
);
const legacyRecordPanelFormMediaPath = path.resolve(
  process.cwd(),
  "components/record-panel-legacy-form-media.tsx",
);
const legacyRecordPanelFormMediaTypesPath = path.resolve(
  process.cwd(),
  "components/record-panel-legacy-form-media.types.ts",
);
const legacyRecordPanelFormActionsPath = path.resolve(
  process.cwd(),
  "components/record-panel-legacy-form-actions.tsx",
);
const legacyRecordPanelFormActionsTypesPath = path.resolve(
  process.cwd(),
  "components/record-panel-legacy-form-actions.types.ts",
);
const legacyRecordPanelListPath = path.resolve(
  process.cwd(),
  "components/record-panel-legacy-list.tsx",
);
const legacyRecordPanelListTypesPath = path.resolve(
  process.cwd(),
  "components/record-panel-legacy-list.types.ts",
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
const legacyRecordPanelStatsTypesPath = path.resolve(
  process.cwd(),
  "components/record-panel-legacy-stats.types.ts",
);
const legacyRecordPanelStatsHeaderPath = path.resolve(
  process.cwd(),
  "components/record-panel-legacy-stats-header.tsx",
);
const legacyRecordPanelStatsGridPath = path.resolve(
  process.cwd(),
  "components/record-panel-legacy-stats-grid.tsx",
);
const workspaceShellActionsResultTypesPath = path.resolve(
  process.cwd(),
  "components/workspace-shell-actions-result.types.ts",
);
const workspaceShellClientPropsTypesPath = path.resolve(
  process.cwd(),
  "components/workspace-shell-client-props.types.ts",
);
const workspaceShellClientPath = path.resolve(process.cwd(), "components/workspace-shell-client.tsx");
const workspaceShellClientTypesPath = path.resolve(
  process.cwd(),
  "components/workspace-shell-client.types.ts",
);
const workspaceShellClientActionsInputPath = path.resolve(
  process.cwd(),
  "components/workspace-shell-client-actions-input.ts",
);
const workspaceShellClientActionsInputTypesPath = path.resolve(
  process.cwd(),
  "components/workspace-shell-client-actions-input.types.ts",
);
const workspaceShellClientRefreshersInputPath = path.resolve(
  process.cwd(),
  "components/workspace-shell-client-refreshers-input.ts",
);
const workspaceShellClientRefreshersInputTypesPath = path.resolve(
  process.cwd(),
  "components/workspace-shell-client-refreshers-input.types.ts",
);
const workspaceShellClientEffectsInputPath = path.resolve(
  process.cwd(),
  "components/workspace-shell-client-effects-input.ts",
);
const workspaceShellClientEffectsInputTypesPath = path.resolve(
  process.cwd(),
  "components/workspace-shell-client-effects-input.types.ts",
);
const workspaceShellClientPanelsPropsPath = path.resolve(
  process.cwd(),
  "components/workspace-shell-client-panels-props.ts",
);
const workspaceShellClientPanelsPropsTypesPath = path.resolve(
  process.cwd(),
  "components/workspace-shell-client-panels-props.types.ts",
);
const workspaceShellConversationStateLoadPath = path.resolve(
  process.cwd(),
  "components/workspace-shell-conversation-state-load.ts",
);
const workspaceShellConversationStateLoadTypesPath = path.resolve(
  process.cwd(),
  "components/workspace-shell-conversation-state-load.types.ts",
);
const workspaceShellManagedStateLoadPath = path.resolve(
  process.cwd(),
  "components/workspace-shell-managed-state-load.ts",
);
const workspaceShellManagedStateLoadTypesPath = path.resolve(
  process.cwd(),
  "components/workspace-shell-managed-state-load.types.ts",
);
const workspaceShellInitialFollowUpPath = path.resolve(
  process.cwd(),
  "components/workspace-shell-initial-follow-up.ts",
);
const workspaceShellInitialFollowUpTypesPath = path.resolve(
  process.cwd(),
  "components/workspace-shell-initial-follow-up.types.ts",
);
const workspaceShellInitialLoadHelpersPath = path.resolve(
  process.cwd(),
  "components/workspace-shell-initial-load-helpers.ts",
);
const workspaceShellInitialLoadHelpersTypesPath = path.resolve(
  process.cwd(),
  "components/workspace-shell-initial-load-helpers.types.ts",
);
const workspaceShellInitialBootstrapPath = path.resolve(
  process.cwd(),
  "components/workspace-shell-initial-bootstrap.ts",
);
const workspaceShellInitialBootstrapTypesPath = path.resolve(
  process.cwd(),
  "components/workspace-shell-initial-bootstrap.types.ts",
);
const useWorkspaceShellNotificationEffectPath = path.resolve(
  process.cwd(),
  "components/use-workspace-shell-notification-effect.ts",
);
const useWorkspaceShellNotificationEffectTypesPath = path.resolve(
  process.cwd(),
  "components/use-workspace-shell-notification-effect.types.ts",
);
const useWorkspaceShellSelectionEffectsPath = path.resolve(
  process.cwd(),
  "components/use-workspace-shell-selection-effects.ts",
);
const useWorkspaceShellSelectionEffectsTypesPath = path.resolve(
  process.cwd(),
  "components/use-workspace-shell-selection-effects.types.ts",
);
const workspaceShellRecordFilterActionsPath = path.resolve(
  process.cwd(),
  "components/workspace-shell-record-filter-actions.ts",
);
const workspaceShellRecordFilterActionsTypesPath = path.resolve(
  process.cwd(),
  "components/workspace-shell-record-filter-actions.types.ts",
);
const workspaceShellFramePath = path.resolve(process.cwd(), "components/workspace-shell-frame.tsx");
const workspaceShellFrameTypesPath = path.resolve(
  process.cwd(),
  "components/workspace-shell-frame.types.ts",
);
const workspaceShellRefreshersResultTypesPath = path.resolve(
  process.cwd(),
  "components/workspace-shell-refreshers-result.types.ts",
);
const workspaceShellRouterTypesPath = path.resolve(
  process.cwd(),
  "components/workspace-shell-router.types.ts",
);
const workspaceShellStateResultTypesPath = path.resolve(
  process.cwd(),
  "components/workspace-shell-state-result.types.ts",
);
const mediaAssetSectionPath = path.resolve(process.cwd(), "components/media-asset-section.tsx");
const mediaAssetSectionTypesPath = path.resolve(
  process.cwd(),
  "components/media-asset-section.types.ts",
);
const mediaAssetSectionSummaryPath = path.resolve(
  process.cwd(),
  "components/media-asset-section-summary.tsx",
);
const mediaAssetSectionSummaryTypesPath = path.resolve(
  process.cwd(),
  "components/media-asset-section-summary.types.ts",
);
const mediaAssetSectionEmptyPath = path.resolve(
  process.cwd(),
  "components/media-asset-section-empty.tsx",
);
const mediaAssetSectionEmptyTypesPath = path.resolve(
  process.cwd(),
  "components/media-asset-section-empty.types.ts",
);
const mediaAssetCardPath = path.resolve(process.cwd(), "components/media-asset-card.tsx");
const mediaAssetCardIntroPath = path.resolve(
  process.cwd(),
  "components/media-asset-card-intro.tsx",
);
const mediaAssetCardIntroTypesPath = path.resolve(
  process.cwd(),
  "components/media-asset-card-intro.types.ts",
);
const mediaAssetCardExtractedTextPath = path.resolve(
  process.cwd(),
  "components/media-asset-card-extracted-text.tsx",
);
const mediaAssetCardExtractedTextTypesPath = path.resolve(
  process.cwd(),
  "components/media-asset-card-extracted-text.types.ts",
);
const mediaAssetCardPreviewPath = path.resolve(
  process.cwd(),
  "components/media-asset-card-preview.tsx",
);
const mediaAssetCardPreviewTypesPath = path.resolve(
  process.cwd(),
  "components/media-asset-card-preview.types.ts",
);
const mediaAssetCardErrorPath = path.resolve(
  process.cwd(),
  "components/media-asset-card-error.tsx",
);
const mediaAssetCardErrorTypesPath = path.resolve(
  process.cwd(),
  "components/media-asset-card-error.types.ts",
);
const mediaAssetCardActionsPath = path.resolve(
  process.cwd(),
  "components/media-asset-card-actions.tsx",
);
const mediaAssetCardActionsTypesPath = path.resolve(
  process.cwd(),
  "components/media-asset-card-actions.types.ts",
);
const mediaStorageOverviewPath = path.resolve(
  process.cwd(),
  "components/media-storage-overview.tsx",
);
const mediaStorageOverviewTypesPath = path.resolve(
  process.cwd(),
  "components/media-storage-overview.types.ts",
);
const mediaStorageOverviewSummaryPath = path.resolve(
  process.cwd(),
  "components/media-storage-overview-summary.tsx",
);
const mediaStorageOverviewSummaryTypesPath = path.resolve(
  process.cwd(),
  "components/media-storage-overview-summary.types.ts",
);
const mediaStorageOverviewUsageGridPath = path.resolve(
  process.cwd(),
  "components/media-storage-overview-usage-grid.tsx",
);
const mediaStorageOverviewUsageGridTypesPath = path.resolve(
  process.cwd(),
  "components/media-storage-overview-usage-grid.types.ts",
);
const mediaStorageOverviewProcessingGridPath = path.resolve(
  process.cwd(),
  "components/media-storage-overview-processing-grid.tsx",
);
const mediaStorageOverviewProcessingGridTypesPath = path.resolve(
  process.cwd(),
  "components/media-storage-overview-processing-grid.types.ts",
);
const mediaStorageOverviewProviderTagsPath = path.resolve(
  process.cwd(),
  "components/media-storage-overview-provider-tags.tsx",
);
const mediaStorageOverviewProviderTagsTypesPath = path.resolve(
  process.cwd(),
  "components/media-storage-overview-provider-tags.types.ts",
);
const recordMediaProcessingPanelsPath = path.resolve(
  process.cwd(),
  "components/record-media-processing-panels.tsx",
);
const recordMediaProcessingPanelsTypesPath = path.resolve(
  process.cwd(),
  "components/record-media-processing-panels.types.ts",
);
const recordMediaSelectedContentPropsPath = path.resolve(
  process.cwd(),
  "components/record-media-selected-content-props.ts",
);
const mapPanelContentPath = path.resolve(process.cwd(), "components/map-panel-content.tsx");
const mapPanelContentTypesPath = path.resolve(
  process.cwd(),
  "components/map-panel-content.types.ts",
);
const mapDrilldownCardPath = path.resolve(process.cwd(), "components/map-drilldown-card.tsx");
const mapDrilldownCardTypesPath = path.resolve(
  process.cwd(),
  "components/map-drilldown-card.types.ts",
);
const mapDrilldownCardActionsPath = path.resolve(
  process.cwd(),
  "components/map-drilldown-card-actions.tsx",
);
const mapDrilldownCardActionsTypesPath = path.resolve(
  process.cwd(),
  "components/map-drilldown-card-actions.types.ts",
);
const mapDrilldownCardIntroPath = path.resolve(
  process.cwd(),
  "components/map-drilldown-card-intro.tsx",
);
const mapDrilldownCardIntroTypesPath = path.resolve(
  process.cwd(),
  "components/map-drilldown-card-intro.types.ts",
);
const mapDrilldownCardFieldsPath = path.resolve(
  process.cwd(),
  "components/map-drilldown-card-fields.tsx",
);
const mapDrilldownCardFieldsTypesPath = path.resolve(
  process.cwd(),
  "components/map-drilldown-card-fields.types.ts",
);
const mapStatusNoticesPath = path.resolve(process.cwd(), "components/map-status-notices.tsx");
const mapStatusNoticesTypesPath = path.resolve(
  process.cwd(),
  "components/map-status-notices.types.ts",
);
const mapPanelHeaderPath = path.resolve(process.cwd(), "components/map-panel-header.tsx");
const mapPanelHeaderTypesPath = path.resolve(
  process.cwd(),
  "components/map-panel-header.types.ts",
);
const mappedRecordsListPath = path.resolve(process.cwd(), "components/mapped-records-list.tsx");
const mappedRecordsListTypesPath = path.resolve(
  process.cwd(),
  "components/mapped-records-list.types.ts",
);
const mapSearchFormPath = path.resolve(process.cwd(), "components/map-search-form.tsx");
const mapSearchFormTypesPath = path.resolve(
  process.cwd(),
  "components/map-search-form.types.ts",
);
const mapPanelControllerResultTypesPath = path.resolve(
  process.cwd(),
  "components/map-panel-controller-result.types.ts",
);
const mapPanelControllerPath = path.resolve(process.cwd(), "components/use-map-panel-controller.ts");
const mapPanelControllerTypesPath = path.resolve(
  process.cwd(),
  "components/use-map-panel-controller.types.ts",
);
const mapPanelControllerActionsPath = path.resolve(
  process.cwd(),
  "components/map-panel-controller-actions.ts",
);
const mapPanelControllerActionsTypesPath = path.resolve(
  process.cwd(),
  "components/map-panel-controller-actions.types.ts",
);
const mapPanelControllerSearchPath = path.resolve(
  process.cwd(),
  "components/map-panel-controller-search.ts",
);
const mapPanelControllerSearchTypesPath = path.resolve(
  process.cwd(),
  "components/map-panel-controller-search.types.ts",
);
const useMapPanelDerivedDataPath = path.resolve(
  process.cwd(),
  "components/use-map-panel-derived-data.ts",
);
const useMapPanelDerivedDataTypesPath = path.resolve(
  process.cwd(),
  "components/use-map-panel-derived-data.types.ts",
);
const useMapPanelSyncPath = path.resolve(process.cwd(), "components/use-map-panel-sync.ts");
const useMapPanelSyncTypesPath = path.resolve(
  process.cwd(),
  "components/use-map-panel-sync.types.ts",
);
const useMapPanelAmapInitPath = path.resolve(
  process.cwd(),
  "components/use-map-panel-amap-init.ts",
);
const useMapPanelAmapInitTypesPath = path.resolve(
  process.cwd(),
  "components/use-map-panel-amap-init.types.ts",
);
const useMapPanelAmapMarkersPath = path.resolve(
  process.cwd(),
  "components/use-map-panel-amap-markers.ts",
);
const useMapPanelAmapMarkersTypesPath = path.resolve(
  process.cwd(),
  "components/use-map-panel-amap-markers.types.ts",
);
const providerSettingsPanelHelpersPath = path.resolve(
  process.cwd(),
  "components/provider-settings-panel-helpers.ts",
);
const providerSettingsPanelHelpersTypesPath = path.resolve(
  process.cwd(),
  "components/provider-settings-panel-helpers.types.ts",
);
const useProviderSettingsDraftSyncPath = path.resolve(
  process.cwd(),
  "components/use-provider-settings-draft-sync.ts",
);
const useProviderSettingsDraftSyncTypesPath = path.resolve(
  process.cwd(),
  "components/use-provider-settings-draft-sync.types.ts",
);
const workspaceTransferJobCardPath = path.resolve(
  process.cwd(),
  "components/workspace-transfer-job-card.tsx",
);
const workspaceTransferJobCardTypesPath = path.resolve(
  process.cwd(),
  "components/workspace-transfer-job-card.types.ts",
);
const workspaceTransferJobsListPath = path.resolve(
  process.cwd(),
  "components/workspace-transfer-jobs-list.tsx",
);
const workspaceTransferJobsListTypesPath = path.resolve(
  process.cwd(),
  "components/workspace-transfer-jobs-list.types.ts",
);
const workspaceEntryJobActionsPath = path.resolve(
  process.cwd(),
  "components/workspace-entry-job-actions.ts",
);
const workspaceEntryJobActionsTypesPath = path.resolve(
  process.cwd(),
  "components/workspace-entry-job-actions.types.ts",
);
const workspaceExportControllerPath = path.resolve(
  process.cwd(),
  "components/use-workspace-export-controller.ts",
);
const providerSettingsControllerActionsPath = path.resolve(
  process.cwd(),
  "components/provider-settings-controller-actions.ts",
);
const providerSettingsControllerActionsTypesPath = path.resolve(
  process.cwd(),
  "components/provider-settings-controller-actions.types.ts",
);
const recordSearchPanelFilterFieldsPath = path.resolve(
  process.cwd(),
  "components/record-search-panel-filter-fields.tsx",
);
const recordSearchPanelFilterFieldsTypesPath = path.resolve(
  process.cwd(),
  "components/record-search-panel-filter-fields.types.ts",
);
const recordSearchPanelPresetControlsPath = path.resolve(
  process.cwd(),
  "components/record-search-panel-preset-controls.tsx",
);
const recordSearchPanelPresetControlsTypesPath = path.resolve(
  process.cwd(),
  "components/record-search-panel-preset-controls.types.ts",
);
const workspaceExportControllerTypesPath = path.resolve(
  process.cwd(),
  "components/use-workspace-export-controller.types.ts",
);
const workspaceExportCardPath = path.resolve(
  process.cwd(),
  "components/workspace-export-card.tsx",
);
const workspaceExportContentPath = path.resolve(
  process.cwd(),
  "components/workspace-export-content.tsx",
);
const workspaceExportContentTypesPath = path.resolve(
  process.cwd(),
  "components/workspace-export-content.types.ts",
);
const workspaceExportSummaryPath = path.resolve(
  process.cwd(),
  "components/workspace-export-summary.tsx",
);
const workspaceExportSummaryTypesPath = path.resolve(
  process.cwd(),
  "components/workspace-export-summary.types.ts",
);
const workspaceExportCardTypesPath = path.resolve(
  process.cwd(),
  "components/workspace-export-card.types.ts",
);
const workspaceExportControlsPath = path.resolve(
  process.cwd(),
  "components/workspace-export-controls.tsx",
);
const workspaceExportControlsActionPath = path.resolve(
  process.cwd(),
  "components/workspace-export-controls-action.tsx",
);
const workspaceExportControlsActionTypesPath = path.resolve(
  process.cwd(),
  "components/workspace-export-controls-action.types.ts",
);
const workspaceExportControlsStatusPath = path.resolve(
  process.cwd(),
  "components/workspace-export-controls-status.tsx",
);
const workspaceExportControlsStatusTypesPath = path.resolve(
  process.cwd(),
  "components/workspace-export-controls-status.types.ts",
);
const workspaceExportControlsTypesPath = path.resolve(
  process.cwd(),
  "components/workspace-export-controls.types.ts",
);
const workspaceExportJobsActionsPath = path.resolve(
  process.cwd(),
  "components/workspace-export-jobs-actions.ts",
);
const workspaceExportJobsActionsTypesPath = path.resolve(
  process.cwd(),
  "components/workspace-export-jobs-actions.types.ts",
);
const workspaceExportJobsCardPath = path.resolve(
  process.cwd(),
  "components/workspace-export-jobs-card.tsx",
);
const workspaceExportJobsContentPath = path.resolve(
  process.cwd(),
  "components/workspace-export-jobs-content.tsx",
);
const workspaceExportJobsContentTypesPath = path.resolve(
  process.cwd(),
  "components/workspace-export-jobs-content.types.ts",
);
const workspaceExportJobsCardTypesPath = path.resolve(
  process.cwd(),
  "components/workspace-export-jobs-card.types.ts",
);
const workspaceExportJobsListPath = path.resolve(
  process.cwd(),
  "components/workspace-export-jobs-list.tsx",
);
const workspaceExportJobsEmptyStatePath = path.resolve(
  process.cwd(),
  "components/workspace-export-jobs-empty-state.tsx",
);
const workspaceExportJobsEmptyStateTypesPath = path.resolve(
  process.cwd(),
  "components/workspace-export-jobs-empty-state.types.ts",
);
const workspaceExportJobsHeaderPath = path.resolve(
  process.cwd(),
  "components/workspace-export-jobs-header.tsx",
);
const workspaceExportJobsHeaderIntroPath = path.resolve(
  process.cwd(),
  "components/workspace-export-jobs-header-intro.tsx",
);
const workspaceExportJobsHeaderIntroTypesPath = path.resolve(
  process.cwd(),
  "components/workspace-export-jobs-header-intro.types.ts",
);
const workspaceExportJobsHeaderActionsPath = path.resolve(
  process.cwd(),
  "components/workspace-export-jobs-header-actions.tsx",
);
const workspaceExportJobsHeaderActionsTypesPath = path.resolve(
  process.cwd(),
  "components/workspace-export-jobs-header-actions.types.ts",
);
const workspaceExportJobsHeaderTypesPath = path.resolve(
  process.cwd(),
  "components/workspace-export-jobs-header.types.ts",
);
const workspaceExportJobsNoticesPath = path.resolve(
  process.cwd(),
  "components/workspace-export-jobs-notices.tsx",
);
const workspaceExportJobsNoticesTypesPath = path.resolve(
  process.cwd(),
  "components/workspace-export-jobs-notices.types.ts",
);
const workspaceExportJobsListItemPath = path.resolve(
  process.cwd(),
  "components/workspace-export-jobs-list-item.tsx",
);
const workspaceExportJobsListItemActionPath = path.resolve(
  process.cwd(),
  "components/workspace-export-jobs-list-item-action.tsx",
);
const workspaceExportJobsListItemActionTypesPath = path.resolve(
  process.cwd(),
  "components/workspace-export-jobs-list-item-action.types.ts",
);
const workspaceExportJobsListItemErrorPath = path.resolve(
  process.cwd(),
  "components/workspace-export-jobs-list-item-error.tsx",
);
const workspaceExportJobsListItemErrorTypesPath = path.resolve(
  process.cwd(),
  "components/workspace-export-jobs-list-item-error.types.ts",
);
const workspaceExportJobsListItemSummaryPath = path.resolve(
  process.cwd(),
  "components/workspace-export-jobs-list-item-summary.tsx",
);
const workspaceExportJobsListItemSummaryTypesPath = path.resolve(
  process.cwd(),
  "components/workspace-export-jobs-list-item-summary.types.ts",
);
const workspaceExportJobsListItemTypesPath = path.resolve(
  process.cwd(),
  "components/workspace-export-jobs-list-item.types.ts",
);
const workspaceExportJobsListTypesPath = path.resolve(
  process.cwd(),
  "components/workspace-export-jobs-list.types.ts",
);
const workspaceExportJobsControllerPath = path.resolve(
  process.cwd(),
  "components/use-workspace-export-jobs-controller.ts",
);
const workspaceExportJobsControllerTypesPath = path.resolve(
  process.cwd(),
  "components/use-workspace-export-jobs-controller.types.ts",
);
const workspaceSettingsHeaderPath = path.resolve(
  process.cwd(),
  "components/workspace-settings-header.tsx",
);
const workspaceSettingsHeaderTypesPath = path.resolve(
  process.cwd(),
  "components/workspace-settings-header.types.ts",
);
const workspaceSettingsHeaderIntroPath = path.resolve(
  process.cwd(),
  "components/workspace-settings-header-intro.tsx",
);
const workspaceSettingsHeaderIntroTypesPath = path.resolve(
  process.cwd(),
  "components/workspace-settings-header-intro.types.ts",
);
const workspaceSettingsHeaderActionsPath = path.resolve(
  process.cwd(),
  "components/workspace-settings-header-actions.tsx",
);
const workspaceSettingsHeaderActionsTypesPath = path.resolve(
  process.cwd(),
  "components/workspace-settings-header-actions.types.ts",
);
const workspaceSettingsOverviewCardPath = path.resolve(
  process.cwd(),
  "components/workspace-settings-overview-card.tsx",
);
const workspaceSettingsOverviewSummaryPath = path.resolve(
  process.cwd(),
  "components/workspace-settings-overview-summary.tsx",
);
const workspaceSettingsOverviewSummaryTypesPath = path.resolve(
  process.cwd(),
  "components/workspace-settings-overview-summary.types.ts",
);
const workspaceSettingsOverviewDetailsPath = path.resolve(
  process.cwd(),
  "components/workspace-settings-overview-details.tsx",
);
const workspaceSettingsOverviewDetailsTypesPath = path.resolve(
  process.cwd(),
  "components/workspace-settings-overview-details.types.ts",
);
const workspaceSettingsOverviewCardTypesPath = path.resolve(
  process.cwd(),
  "components/workspace-settings-overview-card.types.ts",
);
const workspaceMembersSectionPath = path.resolve(
  process.cwd(),
  "components/workspace-members-section.tsx",
);
const workspaceMembersSectionIntroPath = path.resolve(
  process.cwd(),
  "components/workspace-members-section-intro.tsx",
);
const workspaceMembersSectionIntroTypesPath = path.resolve(
  process.cwd(),
  "components/workspace-members-section-intro.types.ts",
);
const workspaceMembersSectionListPath = path.resolve(
  process.cwd(),
  "components/workspace-members-section-list.tsx",
);
const workspaceMembersSectionListTypesPath = path.resolve(
  process.cwd(),
  "components/workspace-members-section-list.types.ts",
);
const workspaceMembersSectionTypesPath = path.resolve(
  process.cwd(),
  "components/workspace-members-section.types.ts",
);
const workspaceMembersSectionItemPath = path.resolve(
  process.cwd(),
  "components/workspace-members-section-item.tsx",
);
const workspaceMembersSectionItemSummaryPath = path.resolve(
  process.cwd(),
  "components/workspace-members-section-item-summary.tsx",
);
const workspaceMembersSectionItemSummaryTypesPath = path.resolve(
  process.cwd(),
  "components/workspace-members-section-item-summary.types.ts",
);
const workspaceMembersSectionItemControlsPath = path.resolve(
  process.cwd(),
  "components/workspace-members-section-item-controls.tsx",
);
const workspaceMembersSectionItemControlsTypesPath = path.resolve(
  process.cwd(),
  "components/workspace-members-section-item-controls.types.ts",
);
const workspaceMembersSectionItemTypesPath = path.resolve(
  process.cwd(),
  "components/workspace-members-section-item.types.ts",
);
const workspaceMediaRetentionCardPath = path.resolve(
  process.cwd(),
  "components/workspace-media-retention-card.tsx",
);
const workspaceMediaRetentionContentPath = path.resolve(
  process.cwd(),
  "components/workspace-media-retention-content.tsx",
);
const workspaceMediaRetentionContentTypesPath = path.resolve(
  process.cwd(),
  "components/workspace-media-retention-content.types.ts",
);
const workspaceMediaRetentionCardTypesPath = path.resolve(
  process.cwd(),
  "components/workspace-media-retention-card.types.ts",
);
const workspaceMediaRetentionHeaderPath = path.resolve(
  process.cwd(),
  "components/workspace-media-retention-header.tsx",
);
const workspaceMediaRetentionHeaderIntroPath = path.resolve(
  process.cwd(),
  "components/workspace-media-retention-header-intro.tsx",
);
const workspaceMediaRetentionHeaderIntroTypesPath = path.resolve(
  process.cwd(),
  "components/workspace-media-retention-header-intro.types.ts",
);
const workspaceMediaRetentionHeaderControlsPath = path.resolve(
  process.cwd(),
  "components/workspace-media-retention-header-controls.tsx",
);
const workspaceMediaRetentionHeaderControlsTypesPath = path.resolve(
  process.cwd(),
  "components/workspace-media-retention-header-controls.types.ts",
);
const workspaceMediaRetentionHeaderTypesPath = path.resolve(
  process.cwd(),
  "components/workspace-media-retention-header.types.ts",
);
const workspaceMediaRetentionActionsPath = path.resolve(
  process.cwd(),
  "components/workspace-media-retention-actions.tsx",
);
const workspaceMediaRetentionActionsContentPath = path.resolve(
  process.cwd(),
  "components/workspace-media-retention-actions-content.tsx",
);
const workspaceMediaRetentionActionsContentTypesPath = path.resolve(
  process.cwd(),
  "components/workspace-media-retention-actions-content.types.ts",
);
const workspaceMediaRetentionActionsTypesPath = path.resolve(
  process.cwd(),
  "components/workspace-media-retention-actions.types.ts",
);
const workspaceMediaRetentionOwnerActionsPath = path.resolve(
  process.cwd(),
  "components/workspace-media-retention-owner-actions.tsx",
);
const workspaceMediaRetentionOwnerActionsSummaryPath = path.resolve(
  process.cwd(),
  "components/workspace-media-retention-owner-actions-summary.tsx",
);
const workspaceMediaRetentionOwnerActionsSummaryTypesPath = path.resolve(
  process.cwd(),
  "components/workspace-media-retention-owner-actions-summary.types.ts",
);
const workspaceMediaRetentionOwnerActionsButtonsPath = path.resolve(
  process.cwd(),
  "components/workspace-media-retention-owner-actions-buttons.tsx",
);
const workspaceMediaRetentionOwnerActionsButtonsTypesPath = path.resolve(
  process.cwd(),
  "components/workspace-media-retention-owner-actions-buttons.types.ts",
);
const workspaceMediaRetentionOwnerActionsTypesPath = path.resolve(
  process.cwd(),
  "components/workspace-media-retention-owner-actions.types.ts",
);
const workspaceMediaRetentionEditorNoticePath = path.resolve(
  process.cwd(),
  "components/workspace-media-retention-editor-notice.tsx",
);
const workspaceMediaRetentionEditorNoticeTypesPath = path.resolve(
  process.cwd(),
  "components/workspace-media-retention-editor-notice.types.ts",
);
const workspaceMediaRetentionSelectionActionsPath = path.resolve(
  process.cwd(),
  "components/workspace-media-retention-selection-actions.ts",
);
const workspaceMediaRetentionSelectionActionsTypesPath = path.resolve(
  process.cwd(),
  "components/workspace-media-retention-selection-actions.types.ts",
);
const useWorkspaceMediaRetentionReportPath = path.resolve(
  process.cwd(),
  "components/use-workspace-media-retention-report.ts",
);
const useWorkspaceMediaRetentionReportTypesPath = path.resolve(
  process.cwd(),
  "components/use-workspace-media-retention-report.types.ts",
);
const workspaceMediaRetentionControllerActionsPath = path.resolve(
  process.cwd(),
  "components/workspace-media-retention-controller-actions.ts",
);
const workspaceMediaRetentionControllerActionsTypesPath = path.resolve(
  process.cwd(),
  "components/workspace-media-retention-controller-actions.types.ts",
);
const workspaceMediaRetentionExecutionActionsPath = path.resolve(
  process.cwd(),
  "components/workspace-media-retention-execution-actions.ts",
);
const workspaceMediaRetentionExecutionActionsTypesPath = path.resolve(
  process.cwd(),
  "components/workspace-media-retention-execution-actions.types.ts",
);
const workspaceMediaRetentionCardActionHelpersPath = path.resolve(
  process.cwd(),
  "components/workspace-media-retention-card-action-helpers.ts",
);
const workspaceMediaRetentionCardActionHelpersTypesPath = path.resolve(
  process.cwd(),
  "components/workspace-media-retention-card-action-helpers.types.ts",
);
const workspaceMediaRetentionCardCopyHelpersPath = path.resolve(
  process.cwd(),
  "components/workspace-media-retention-card-copy-helpers.ts",
);
const workspaceMediaRetentionCardCopyHelpersTypesPath = path.resolve(
  process.cwd(),
  "components/workspace-media-retention-card-copy-helpers.types.ts",
);
const workspaceMediaRetentionListsPath = path.resolve(
  process.cwd(),
  "components/workspace-media-retention-lists.tsx",
);
const workspaceMediaRetentionLargestListPath = path.resolve(
  process.cwd(),
  "components/workspace-media-retention-largest-list.tsx",
);
const workspaceMediaRetentionLargestListTypesPath = path.resolve(
  process.cwd(),
  "components/workspace-media-retention-largest-list.types.ts",
);
const workspaceMediaRetentionCandidatesListPath = path.resolve(
  process.cwd(),
  "components/workspace-media-retention-candidates-list.tsx",
);
const workspaceMediaRetentionCandidatesListTypesPath = path.resolve(
  process.cwd(),
  "components/workspace-media-retention-candidates-list.types.ts",
);
const workspaceMediaRetentionListsTypesPath = path.resolve(
  process.cwd(),
  "components/workspace-media-retention-lists.types.ts",
);
const workspaceMediaRetentionNoticesPath = path.resolve(
  process.cwd(),
  "components/workspace-media-retention-notices.tsx",
);
const workspaceMediaRetentionNoticesTypesPath = path.resolve(
  process.cwd(),
  "components/workspace-media-retention-notices.types.ts",
);
const workspaceMediaRetentionSummaryPath = path.resolve(
  process.cwd(),
  "components/workspace-media-retention-summary.tsx",
);
const workspaceMediaRetentionSummaryGridPath = path.resolve(
  process.cwd(),
  "components/workspace-media-retention-summary-grid.tsx",
);
const workspaceMediaRetentionSummaryGridTypesPath = path.resolve(
  process.cwd(),
  "components/workspace-media-retention-summary-grid.types.ts",
);
const workspaceMediaRetentionSummaryNotePath = path.resolve(
  process.cwd(),
  "components/workspace-media-retention-summary-note.tsx",
);
const workspaceMediaRetentionSummaryNoteTypesPath = path.resolve(
  process.cwd(),
  "components/workspace-media-retention-summary-note.types.ts",
);
const workspaceMediaRetentionSummaryTypesPath = path.resolve(
  process.cwd(),
  "components/workspace-media-retention-summary.types.ts",
);
const mediaRetentionItemCardPath = path.resolve(
  process.cwd(),
  "components/media-retention-item-card.tsx",
);
const mediaRetentionItemCardTypesPath = path.resolve(
  process.cwd(),
  "components/media-retention-item-card.types.ts",
);
const providerFeatureMediaStorageOptionsPath = path.resolve(
  process.cwd(),
  "components/provider-feature-media-storage-options.tsx",
);
const providerFeatureMediaStorageOptionTogglesPath = path.resolve(
  process.cwd(),
  "components/provider-feature-media-storage-option-toggles.tsx",
);
const providerFeatureMediaStorageOptionTogglesTypesPath = path.resolve(
  process.cwd(),
  "components/provider-feature-media-storage-option-toggles.types.ts",
);
const providerFeatureMediaStorageRetryFieldsPath = path.resolve(
  process.cwd(),
  "components/provider-feature-media-storage-retry-fields.tsx",
);
const providerFeatureMediaStorageRetryFieldsTypesPath = path.resolve(
  process.cwd(),
  "components/provider-feature-media-storage-retry-fields.types.ts",
);
const providerFeatureCardActionsPath = path.resolve(
  process.cwd(),
  "components/provider-feature-card-actions.tsx",
);
const providerFeatureCardActionsTypesPath = path.resolve(
  process.cwd(),
  "components/provider-feature-card-actions.types.ts",
);
const providerFeatureCardFieldsPath = path.resolve(
  process.cwd(),
  "components/provider-feature-card-fields.tsx",
);
const providerFeatureCardFieldsTypesPath = path.resolve(
  process.cwd(),
  "components/provider-feature-card-fields.types.ts",
);
const providerFeatureCardEnabledTogglePath = path.resolve(
  process.cwd(),
  "components/provider-feature-card-enabled-toggle.tsx",
);
const providerFeatureCardEnabledToggleTypesPath = path.resolve(
  process.cwd(),
  "components/provider-feature-card-enabled-toggle.types.ts",
);
const providerFeatureCardCoreFieldsPath = path.resolve(
  process.cwd(),
  "components/provider-feature-card-core-fields.tsx",
);
const providerFeatureCardCoreFieldsTypesPath = path.resolve(
  process.cwd(),
  "components/provider-feature-card-core-fields.types.ts",
);
const providerFeatureMediaStorageOptionsTypesPath = path.resolve(
  process.cwd(),
  "components/provider-feature-media-storage-options.types.ts",
);
const providerFeatureMediaStorageOptionsHelpersPath = path.resolve(
  process.cwd(),
  "components/provider-feature-media-storage-options.helpers.ts",
);
const providerFeatureMediaStorageOptionsHelpersTypesPath = path.resolve(
  process.cwd(),
  "components/provider-feature-media-storage-options.helpers.types.ts",
);
const providerSettingsFeatureListPath = path.resolve(
  process.cwd(),
  "components/provider-settings-feature-list.tsx",
);
const providerSettingsFeatureListTypesPath = path.resolve(
  process.cwd(),
  "components/provider-settings-feature-list.types.ts",
);
const providerSettingsJumpNavPath = path.resolve(
  process.cwd(),
  "components/provider-settings-jump-nav.tsx",
);
const providerSettingsJumpNavTypesPath = path.resolve(
  process.cwd(),
  "components/provider-settings-jump-nav.types.ts",
);
const workspaceSettingsLoadingShellPath = path.resolve(
  process.cwd(),
  "components/workspace-settings-loading-shell.tsx",
);
const workspaceSettingsLoadingShellTypesPath = path.resolve(
  process.cwd(),
  "components/workspace-settings-loading-shell.types.ts",
);
const useWorkspaceSettingsAnchorPath = path.resolve(
  process.cwd(),
  "components/use-workspace-settings-anchor.ts",
);
const useWorkspaceSettingsAnchorTypesPath = path.resolve(
  process.cwd(),
  "components/use-workspace-settings-anchor.types.ts",
);
const useWorkspaceSettingsLoadPath = path.resolve(
  process.cwd(),
  "components/use-workspace-settings-load.ts",
);
const useWorkspaceSettingsLoadTypesPath = path.resolve(
  process.cwd(),
  "components/use-workspace-settings-load.types.ts",
);
const workspaceSettingsActionsPath = path.resolve(
  process.cwd(),
  "components/workspace-settings-actions.ts",
);
const workspaceSettingsActionsTypesPath = path.resolve(
  process.cwd(),
  "components/workspace-settings-actions.types.ts",
);
const workspaceSettingsMemberActionsPath = path.resolve(
  process.cwd(),
  "components/workspace-settings-member-actions.ts",
);
const workspaceSettingsMemberActionsTypesPath = path.resolve(
  process.cwd(),
  "components/workspace-settings-member-actions.types.ts",
);
const workspaceSettingsProviderActionsPath = path.resolve(
  process.cwd(),
  "components/workspace-settings-provider-actions.ts",
);
const workspaceSettingsProviderActionsTypesPath = path.resolve(
  process.cwd(),
  "components/workspace-settings-provider-actions.types.ts",
);
const useChatPanelActionDerivedDataPath = path.resolve(
  process.cwd(),
  "components/use-chat-panel-action-derived-data.ts",
);
const chatPanelActionDerivedDataResultTypesPath = path.resolve(
  process.cwd(),
  "components/chat-panel-action-derived-data-result.types.ts",
);
const chatPanelActionHandlerInputsPath = path.resolve(
  process.cwd(),
  "components/chat-panel-action-handler-inputs.ts",
);
const chatPanelActionHandlerInputsTypesPath = path.resolve(
  process.cwd(),
  "components/chat-panel-action-handler-inputs.types.ts",
);
const chatPanelActionHelpersPath = path.resolve(
  process.cwd(),
  "components/chat-panel-action-helpers.ts",
);
const chatPanelActionHelpersTypesPath = path.resolve(
  process.cwd(),
  "components/chat-panel-action-helpers.types.ts",
);
const chatPanelOperatorHandlersPath = path.resolve(
  process.cwd(),
  "components/chat-panel-operator-handlers.ts",
);
const chatPanelOperatorHandlersTypesPath = path.resolve(
  process.cwd(),
  "components/chat-panel-operator-handlers.types.ts",
);
const chatPanelActionStateResultTypesPath = path.resolve(
  process.cwd(),
  "components/chat-panel-action-state-result.types.ts",
);
const chatPanelActionsResultTypesPath = path.resolve(
  process.cwd(),
  "components/chat-panel-actions-result.types.ts",
);
const chatPanelShareHandlersPath = path.resolve(
  process.cwd(),
  "components/chat-panel-share-handlers.ts",
);
const chatPanelShareHandlersTypesPath = path.resolve(
  process.cwd(),
  "components/chat-panel-share-handlers.types.ts",
);
const useChatPanelActionsPath = path.resolve(process.cwd(), "components/use-chat-panel-actions.ts");
const chatPanelContentPropsPath = path.resolve(
  process.cwd(),
  "components/chat-panel-content-props.ts",
);
const chatPanelContentPropsTypesPath = path.resolve(
  process.cwd(),
  "components/chat-panel-content-props.types.ts",
);
const chatPanelContentTypesPath = path.resolve(
  process.cwd(),
  "components/chat-panel-content.types.ts",
);
const useChatPanelActionDerivedDataTypesPath = path.resolve(
  process.cwd(),
  "components/use-chat-panel-action-derived-data.types.ts",
);
const chatMessageThreadPath = path.resolve(process.cwd(), "components/chat-message-thread.tsx");
const chatMessageThreadTypesPath = path.resolve(
  process.cwd(),
  "components/chat-message-thread.types.ts",
);
const chatPanelHeaderPath = path.resolve(process.cwd(), "components/chat-panel-header.tsx");
const chatPanelHeaderTypesPath = path.resolve(
  process.cwd(),
  "components/chat-panel-header.types.ts",
);
const chatPanelComposerPath = path.resolve(process.cwd(), "components/chat-panel-composer.tsx");
const chatPanelComposerTypesPath = path.resolve(
  process.cwd(),
  "components/chat-panel-composer.types.ts",
);
const chatConversationBarPath = path.resolve(
  process.cwd(),
  "components/chat-conversation-bar.tsx",
);
const chatConversationBarTypesPath = path.resolve(
  process.cwd(),
  "components/chat-conversation-bar.types.ts",
);
const chatMessageSourcesPath = path.resolve(
  process.cwd(),
  "components/chat-message-sources.tsx",
);
const chatMessageSourcesTypesPath = path.resolve(
  process.cwd(),
  "components/chat-message-sources.types.ts",
);
const chatAuditLogsCardPath = path.resolve(
  process.cwd(),
  "components/chat-audit-logs-card.tsx",
);
const chatAuditLogsCardTypesPath = path.resolve(
  process.cwd(),
  "components/chat-audit-logs-card.types.ts",
);
const chatKnowledgeCardPath = path.resolve(
  process.cwd(),
  "components/chat-knowledge-card.tsx",
);
const chatKnowledgeCardTypesPath = path.resolve(
  process.cwd(),
  "components/chat-knowledge-card.types.ts",
);
const chatNotificationsCardPath = path.resolve(
  process.cwd(),
  "components/chat-notifications-card.tsx",
);
const chatNotificationsCardTypesPath = path.resolve(
  process.cwd(),
  "components/chat-notifications-card.types.ts",
);
const chatShareLinksCardPath = path.resolve(
  process.cwd(),
  "components/chat-share-links-card.tsx",
);
const chatShareLinksCardTypesPath = path.resolve(
  process.cwd(),
  "components/chat-share-links-card.types.ts",
);
const chatShareLinksCreateFormPath = path.resolve(
  process.cwd(),
  "components/chat-share-links-create-form.tsx",
);
const chatShareLinksCreateFormTypesPath = path.resolve(
  process.cwd(),
  "components/chat-share-links-create-form.types.ts",
);
const chatShareLinkListItemPath = path.resolve(
  process.cwd(),
  "components/chat-share-link-list-item.tsx",
);
const chatShareLinkListItemTypesPath = path.resolve(
  process.cwd(),
  "components/chat-share-link-list-item.types.ts",
);
const authFormFramePath = path.resolve(process.cwd(), "components/auth-form-frame.tsx");
const authFormFrameTypesPath = path.resolve(
  process.cwd(),
  "components/auth-form-frame.types.ts",
);
const mediaAssetCardMetadataPath = path.resolve(
  process.cwd(),
  "components/media-asset-card-metadata.tsx",
);
const mediaAssetCardMetadataTypesPath = path.resolve(
  process.cwd(),
  "components/media-asset-card-metadata.types.ts",
);
const mediaAssetCardMetadataDetailsPath = path.resolve(
  process.cwd(),
  "components/media-asset-card-metadata-details.tsx",
);
const mediaAssetCardMetadataDetailsTypesPath = path.resolve(
  process.cwd(),
  "components/media-asset-card-metadata-details.types.ts",
);
const mediaAssetCardMetadataTagsPath = path.resolve(
  process.cwd(),
  "components/media-asset-card-metadata-tags.tsx",
);
const mediaAssetCardMetadataTagsTypesPath = path.resolve(
  process.cwd(),
  "components/media-asset-card-metadata-tags.types.ts",
);
const sharePreviewClientPath = path.resolve(process.cwd(), "components/share-preview-client.tsx");
const sharePreviewClientTypesPath = path.resolve(
  process.cwd(),
  "components/share-preview-client.types.ts",
);
const workspaceEntryLoadingShellPath = path.resolve(
  process.cwd(),
  "components/workspace-entry-loading-shell.tsx",
);
const workspaceEntryLoadingShellTypesPath = path.resolve(
  process.cwd(),
  "components/workspace-entry-loading-shell.types.ts",
);
const languageSwitcherPath = path.resolve(process.cwd(), "components/language-switcher.tsx");
const languageSwitcherTypesPath = path.resolve(
  process.cwd(),
  "components/language-switcher.types.ts",
);
const workspaceEntryHeaderPath = path.resolve(process.cwd(), "components/workspace-entry-header.tsx");
const workspaceEntryHeaderTypesPath = path.resolve(
  process.cwd(),
  "components/workspace-entry-header.types.ts",
);
const workspaceCreateSectionPath = path.resolve(
  process.cwd(),
  "components/workspace-create-section.tsx",
);
const workspaceCreateSectionTypesPath = path.resolve(
  process.cwd(),
  "components/workspace-create-section.types.ts",
);
const workspaceJoinSectionPath = path.resolve(
  process.cwd(),
  "components/workspace-join-section.tsx",
);
const workspaceJoinSectionTypesPath = path.resolve(
  process.cwd(),
  "components/workspace-join-section.types.ts",
);
const workspaceImportSectionPath = path.resolve(
  process.cwd(),
  "components/workspace-import-section.tsx",
);
const workspaceImportSectionTypesPath = path.resolve(
  process.cwd(),
  "components/workspace-import-section.types.ts",
);
const workspaceListSectionPath = path.resolve(
  process.cwd(),
  "components/workspace-list-section.tsx",
);
const workspaceListSectionTypesPath = path.resolve(
  process.cwd(),
  "components/workspace-list-section.types.ts",
);
const useWorkspaceEntryControllerDerivedDataPath = path.resolve(
  process.cwd(),
  "components/use-workspace-entry-controller-derived-data.ts",
);
const useWorkspaceEntryControllerDerivedDataTypesPath = path.resolve(
  process.cwd(),
  "components/use-workspace-entry-controller-derived-data.types.ts",
);
const useWorkspaceEntryLoadPath = path.resolve(
  process.cwd(),
  "components/use-workspace-entry-load.ts",
);
const useWorkspaceEntryLoadTypesPath = path.resolve(
  process.cwd(),
  "components/use-workspace-entry-load.types.ts",
);
const workspaceEntryControllerActionsPath = path.resolve(
  process.cwd(),
  "components/workspace-entry-controller-actions.ts",
);
const workspaceEntryControllerActionsTypesPath = path.resolve(
  process.cwd(),
  "components/workspace-entry-controller-actions.types.ts",
);
const workspaceEntryCreateActionsPath = path.resolve(
  process.cwd(),
  "components/workspace-entry-create-actions.ts",
);
const workspaceEntryCreateActionsTypesPath = path.resolve(
  process.cwd(),
  "components/workspace-entry-create-actions.types.ts",
);
const workspaceEntryImportActionsPath = path.resolve(
  process.cwd(),
  "components/workspace-entry-import-actions.ts",
);
const workspaceEntryImportActionsTypesPath = path.resolve(
  process.cwd(),
  "components/workspace-entry-import-actions.types.ts",
);
const workspaceEntryWorkspaceActionsPath = path.resolve(
  process.cwd(),
  "components/workspace-entry-workspace-actions.ts",
);
const workspaceEntryWorkspaceActionsTypesPath = path.resolve(
  process.cwd(),
  "components/workspace-entry-workspace-actions.types.ts",
);
const workspaceEntryShareActionsPath = path.resolve(
  process.cwd(),
  "components/workspace-entry-share-actions.ts",
);
const workspaceEntryShareActionsTypesPath = path.resolve(
  process.cwd(),
  "components/workspace-entry-share-actions.types.ts",
);
const recordSummaryCardPath = path.resolve(process.cwd(), "components/record-summary-card.tsx");
const recordSummaryCardTypesPath = path.resolve(
  process.cwd(),
  "components/record-summary-card.types.ts",
);
const recordResultsViewSwitcherPath = path.resolve(
  process.cwd(),
  "components/record-results-view-switcher.tsx",
);
const recordResultsViewSwitcherTypesPath = path.resolve(
  process.cwd(),
  "components/record-results-view-switcher.types.ts",
);
const searchPresetListPath = path.resolve(process.cwd(), "components/search-preset-list.tsx");
const searchPresetListTypesPath = path.resolve(
  process.cwd(),
  "components/search-preset-list.types.ts",
);
const recordPanelStatsPath = path.resolve(process.cwd(), "components/record-panel-stats.tsx");
const recordPanelStatsTypesPath = path.resolve(
  process.cwd(),
  "components/record-panel-stats.types.ts",
);
const deadLetterRecoverySummaryPath = path.resolve(
  process.cwd(),
  "components/dead-letter-recovery-summary.tsx",
);
const deadLetterRecoverySummaryTypesPath = path.resolve(
  process.cwd(),
  "components/dead-letter-recovery-summary.types.ts",
);
const deadLetterRecoverySummaryActionsPath = path.resolve(
  process.cwd(),
  "components/dead-letter-recovery-summary-actions.tsx",
);
const deadLetterRecoverySummaryActionsTypesPath = path.resolve(
  process.cwd(),
  "components/dead-letter-recovery-summary-actions.types.ts",
);
const deadLetterRecoverySummaryStatsPath = path.resolve(
  process.cwd(),
  "components/dead-letter-recovery-summary-stats.tsx",
);
const deadLetterRecoverySummaryStatsTypesPath = path.resolve(
  process.cwd(),
  "components/dead-letter-recovery-summary-stats.types.ts",
);
const locationReviewPanelPath = path.resolve(
  process.cwd(),
  "components/location-review-panel.tsx",
);
const locationReviewIntroPath = path.resolve(
  process.cwd(),
  "components/location-review-intro.tsx",
);
const locationReviewIntroTypesPath = path.resolve(
  process.cwd(),
  "components/location-review-intro.types.ts",
);
const locationReviewActionsPath = path.resolve(
  process.cwd(),
  "components/location-review-actions.tsx",
);
const locationReviewActionsTypesPath = path.resolve(
  process.cwd(),
  "components/location-review-actions.types.ts",
);
const locationReviewFormFieldsPath = path.resolve(
  process.cwd(),
  "components/location-review-form-fields.tsx",
);
const locationReviewFormFieldsTypesPath = path.resolve(
  process.cwd(),
  "components/location-review-form-fields.types.ts",
);
const locationReviewHistoryListPath = path.resolve(
  process.cwd(),
  "components/location-review-history-list.tsx",
);
const locationReviewHistoryListTypesPath = path.resolve(
  process.cwd(),
  "components/location-review-history-list.types.ts",
);
const locationReviewStatusSummaryPath = path.resolve(
  process.cwd(),
  "components/location-review-status-summary.tsx",
);
const locationReviewStatusSummaryTypesPath = path.resolve(
  process.cwd(),
  "components/location-review-status-summary.types.ts",
);
const recentMediaIssueCardPath = path.resolve(
  process.cwd(),
  "components/recent-media-issue-card.tsx",
);
const recentMediaIssueCardIntroPath = path.resolve(
  process.cwd(),
  "components/recent-media-issue-card-intro.tsx",
);
const recentMediaIssueCardIntroTypesPath = path.resolve(
  process.cwd(),
  "components/recent-media-issue-card-intro.types.ts",
);
const recentMediaIssueCardErrorPath = path.resolve(
  process.cwd(),
  "components/recent-media-issue-card-error.tsx",
);
const recentMediaIssueCardErrorTypesPath = path.resolve(
  process.cwd(),
  "components/recent-media-issue-card-error.types.ts",
);
const recentMediaIssueCardMetadataPath = path.resolve(
  process.cwd(),
  "components/recent-media-issue-card-metadata.tsx",
);
const recentMediaIssueCardMetadataTypesPath = path.resolve(
  process.cwd(),
  "components/recent-media-issue-card-metadata.types.ts",
);
const recentMediaIssueCardActionsPath = path.resolve(
  process.cwd(),
  "components/recent-media-issue-card-actions.tsx",
);
const recentMediaIssueCardActionsTypesPath = path.resolve(
  process.cwd(),
  "components/recent-media-issue-card-actions.types.ts",
);
const recentMediaIssueCardTagsPath = path.resolve(
  process.cwd(),
  "components/recent-media-issue-card-tags.tsx",
);
const recentMediaIssueCardTagsTypesPath = path.resolve(
  process.cwd(),
  "components/recent-media-issue-card-tags.types.ts",
);
const mediaPreviewContentPath = path.resolve(process.cwd(), "components/media-preview-content.tsx");
const mediaPreviewContentTypesPath = path.resolve(
  process.cwd(),
  "components/media-preview-content.types.ts",
);
const providerFeatureCardStatusPath = path.resolve(
  process.cwd(),
  "components/provider-feature-card-status.tsx",
);
const providerFeatureCardStatusTypesPath = path.resolve(
  process.cwd(),
  "components/provider-feature-card-status.types.ts",
);
const recordEditorLocationFieldsPath = path.resolve(
  process.cwd(),
  "components/record-editor-location-fields.tsx",
);
const recordEditorLocationFieldsTypesPath = path.resolve(
  process.cwd(),
  "components/record-editor-location-fields.types.ts",
);
const recordEditorPrimaryFieldsPath = path.resolve(
  process.cwd(),
  "components/record-editor-primary-fields.tsx",
);
const recordEditorPrimaryFieldsTypesPath = path.resolve(
  process.cwd(),
  "components/record-editor-primary-fields.types.ts",
);
const recordEditorMetadataFieldsPath = path.resolve(
  process.cwd(),
  "components/record-editor-metadata-fields.tsx",
);
const recordEditorMetadataFieldsTypesPath = path.resolve(
  process.cwd(),
  "components/record-editor-metadata-fields.types.ts",
);
const recordMediaToolsActionsPath = path.resolve(
  process.cwd(),
  "components/record-media-tools-actions.tsx",
);
const recordMediaToolsActionsTypesPath = path.resolve(
  process.cwd(),
  "components/record-media-tools-actions.types.ts",
);
const recordEditorSupportToolsMediaCopyPropsPath = path.resolve(
  process.cwd(),
  "components/record-editor-support-tools-media-copy-props.ts",
);
const recordEditorSupportToolsMediaCopyPropsTypesPath = path.resolve(
  process.cwd(),
  "components/record-editor-support-tools-media-copy-props.types.ts",
);
const recordEditorSupportToolsReminderDerivedPropsPath = path.resolve(
  process.cwd(),
  "components/record-editor-support-tools-reminder-derived-props.ts",
);
const recordEditorSupportToolsReminderDerivedPropsTypesPath = path.resolve(
  process.cwd(),
  "components/record-editor-support-tools-reminder-derived-props.types.ts",
);
const recordReminderFormPath = path.resolve(process.cwd(), "components/record-reminder-form.tsx");
const recordReminderFormTypesPath = path.resolve(
  process.cwd(),
  "components/record-reminder-form.types.ts",
);
const recordReminderFormFieldsPath = path.resolve(
  process.cwd(),
  "components/record-reminder-form-fields.tsx",
);
const recordReminderFormFieldsTypesPath = path.resolve(
  process.cwd(),
  "components/record-reminder-form-fields.types.ts",
);
const recordReminderFormActionsPath = path.resolve(
  process.cwd(),
  "components/record-reminder-form-actions.tsx",
);
const recordReminderFormActionsTypesPath = path.resolve(
  process.cwd(),
  "components/record-reminder-form-actions.types.ts",
);
const recordReminderListPath = path.resolve(process.cwd(), "components/record-reminder-list.tsx");
const recordReminderListTypesPath = path.resolve(
  process.cwd(),
  "components/record-reminder-list.types.ts",
);
const deadLetterRecoveryItemCardActionsPath = path.resolve(
  process.cwd(),
  "components/dead-letter-recovery-item-card-actions.tsx",
);
const deadLetterRecoveryItemCardActionsTypesPath = path.resolve(
  process.cwd(),
  "components/dead-letter-recovery-item-card-actions.types.ts",
);
const deadLetterRecoveryItemCardPath = path.resolve(
  process.cwd(),
  "components/dead-letter-recovery-item-card.tsx",
);
const deadLetterRecoveryItemCardHeaderPath = path.resolve(
  process.cwd(),
  "components/dead-letter-recovery-item-card-header.tsx",
);
const deadLetterRecoveryItemCardHeaderTypesPath = path.resolve(
  process.cwd(),
  "components/dead-letter-recovery-item-card-header.types.ts",
);
const deadLetterRecoveryItemCardStatusPath = path.resolve(
  process.cwd(),
  "components/dead-letter-recovery-item-card-status.tsx",
);
const deadLetterRecoveryItemCardStatusTypesPath = path.resolve(
  process.cwd(),
  "components/dead-letter-recovery-item-card-status.types.ts",
);
const deadLetterRecoveryItemCardTagsPath = path.resolve(
  process.cwd(),
  "components/dead-letter-recovery-item-card-tags.tsx",
);
const deadLetterRecoveryItemCardTagsTypesPath = path.resolve(
  process.cwd(),
  "components/dead-letter-recovery-item-card-tags.types.ts",
);
const deadLetterRecoveryPanelContentPath = path.resolve(
  process.cwd(),
  "components/dead-letter-recovery-panel-content.tsx",
);
const deadLetterRecoveryPanelContentTypesPath = path.resolve(
  process.cwd(),
  "components/dead-letter-recovery-panel-content.types.ts",
);
const mediaStorageHealthCapabilitiesPath = path.resolve(
  process.cwd(),
  "components/media-storage-health-capabilities.tsx",
);
const mediaStorageHealthCapabilitiesTypesPath = path.resolve(
  process.cwd(),
  "components/media-storage-health-capabilities.types.ts",
);
const mediaStorageHealthCardPath = path.resolve(
  process.cwd(),
  "components/media-storage-health-card.tsx",
);
const mediaStorageHealthHeaderPath = path.resolve(
  process.cwd(),
  "components/media-storage-health-header.tsx",
);
const mediaStorageHealthHeaderTypesPath = path.resolve(
  process.cwd(),
  "components/media-storage-health-header.types.ts",
);
const mediaStorageHealthMetadataPath = path.resolve(
  process.cwd(),
  "components/media-storage-health-metadata.tsx",
);
const mediaStorageHealthMetadataTypesPath = path.resolve(
  process.cwd(),
  "components/media-storage-health-metadata.types.ts",
);
const recordResultsListViewPath = path.resolve(
  process.cwd(),
  "components/record-results-list-view.tsx",
);
const recordResultsListViewTypesPath = path.resolve(
  process.cwd(),
  "components/record-results-list-view.types.ts",
);
const recordResultsTimelineViewPath = path.resolve(
  process.cwd(),
  "components/record-results-timeline-view.tsx",
);
const recordResultsTimelineViewTypesPath = path.resolve(
  process.cwd(),
  "components/record-results-timeline-view.types.ts",
);
const legacyRecordPanelSource = fs.readFileSync(legacyRecordPanelPath, "utf8");
const legacyRecordPanelViewDataSource = fs.readFileSync(legacyRecordPanelViewDataPath, "utf8");
const legacyRecordPanelSyncSource = fs.readFileSync(legacyRecordPanelSyncPath, "utf8");
const legacyRecordPanelSyncTypesSource = fs.readFileSync(legacyRecordPanelSyncTypesPath, "utf8");
const legacyRecordPanelViewDataTypesSource = fs.readFileSync(legacyRecordPanelViewDataTypesPath, "utf8");
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
const legacyRecordPanelFormFieldsTypesSource = fs.readFileSync(
  legacyRecordPanelFormFieldsTypesPath,
  "utf8",
);
const legacyRecordPanelPrimaryFieldsSource = fs.readFileSync(
  legacyRecordPanelPrimaryFieldsPath,
  "utf8",
);
const legacyRecordPanelPrimaryFieldsTypesSource = fs.readFileSync(
  legacyRecordPanelPrimaryFieldsTypesPath,
  "utf8",
);
const legacyRecordPanelClassificationFieldsSource = fs.readFileSync(
  legacyRecordPanelClassificationFieldsPath,
  "utf8",
);
const legacyRecordPanelClassificationFieldsTypesSource = fs.readFileSync(
  legacyRecordPanelClassificationFieldsTypesPath,
  "utf8",
);
const legacyRecordPanelFormMediaSource = fs.readFileSync(legacyRecordPanelFormMediaPath, "utf8");
const legacyRecordPanelFormMediaTypesSource = fs.readFileSync(
  legacyRecordPanelFormMediaTypesPath,
  "utf8",
);
const legacyRecordPanelFormActionsSource = fs.readFileSync(legacyRecordPanelFormActionsPath, "utf8");
const legacyRecordPanelFormActionsTypesSource = fs.readFileSync(
  legacyRecordPanelFormActionsTypesPath,
  "utf8",
);
const legacyRecordPanelListSource = fs.readFileSync(legacyRecordPanelListPath, "utf8");
const legacyRecordPanelListTypesSource = fs.readFileSync(legacyRecordPanelListTypesPath, "utf8");
const legacyRecordPanelListItemSource = fs.readFileSync(legacyRecordPanelListItemPath, "utf8");
const legacyRecordPanelListEmptySource = fs.readFileSync(legacyRecordPanelListEmptyPath, "utf8");
const legacyRecordPanelStatsSource = fs.readFileSync(legacyRecordPanelStatsPath, "utf8");
const legacyRecordPanelStatsTypesSource = fs.readFileSync(legacyRecordPanelStatsTypesPath, "utf8");
const legacyRecordPanelStatsHeaderSource = fs.readFileSync(
  legacyRecordPanelStatsHeaderPath,
  "utf8",
);
const legacyRecordPanelStatsGridSource = fs.readFileSync(
  legacyRecordPanelStatsGridPath,
  "utf8",
);
const workspaceShellActionsResultTypesSource = fs.readFileSync(
  workspaceShellActionsResultTypesPath,
  "utf8",
);
const workspaceShellClientPropsTypesSource = fs.readFileSync(
  workspaceShellClientPropsTypesPath,
  "utf8",
);
const workspaceShellClientSource = fs.readFileSync(workspaceShellClientPath, "utf8");
const workspaceShellClientTypesSource = fs.readFileSync(workspaceShellClientTypesPath, "utf8");
const workspaceShellClientActionsInputSource = fs.readFileSync(
  workspaceShellClientActionsInputPath,
  "utf8",
);
const workspaceShellClientActionsInputTypesSource = fs.readFileSync(
  workspaceShellClientActionsInputTypesPath,
  "utf8",
);
const workspaceShellClientRefreshersInputSource = fs.readFileSync(
  workspaceShellClientRefreshersInputPath,
  "utf8",
);
const workspaceShellClientRefreshersInputTypesSource = fs.readFileSync(
  workspaceShellClientRefreshersInputTypesPath,
  "utf8",
);
const workspaceShellClientEffectsInputSource = fs.readFileSync(
  workspaceShellClientEffectsInputPath,
  "utf8",
);
const workspaceShellClientEffectsInputTypesSource = fs.readFileSync(
  workspaceShellClientEffectsInputTypesPath,
  "utf8",
);
const workspaceShellClientPanelsPropsSource = fs.readFileSync(
  workspaceShellClientPanelsPropsPath,
  "utf8",
);
const workspaceShellClientPanelsPropsTypesSource = fs.readFileSync(
  workspaceShellClientPanelsPropsTypesPath,
  "utf8",
);
const workspaceShellConversationStateLoadSource = fs.readFileSync(
  workspaceShellConversationStateLoadPath,
  "utf8",
);
const workspaceShellConversationStateLoadTypesSource = fs.readFileSync(
  workspaceShellConversationStateLoadTypesPath,
  "utf8",
);
const workspaceShellManagedStateLoadSource = fs.readFileSync(
  workspaceShellManagedStateLoadPath,
  "utf8",
);
const workspaceShellManagedStateLoadTypesSource = fs.readFileSync(
  workspaceShellManagedStateLoadTypesPath,
  "utf8",
);
const workspaceShellInitialFollowUpSource = fs.readFileSync(
  workspaceShellInitialFollowUpPath,
  "utf8",
);
const workspaceShellInitialFollowUpTypesSource = fs.readFileSync(
  workspaceShellInitialFollowUpTypesPath,
  "utf8",
);
const workspaceShellInitialLoadHelpersSource = fs.readFileSync(
  workspaceShellInitialLoadHelpersPath,
  "utf8",
);
const workspaceShellInitialLoadHelpersTypesSource = fs.readFileSync(
  workspaceShellInitialLoadHelpersTypesPath,
  "utf8",
);
const workspaceShellInitialBootstrapSource = fs.readFileSync(
  workspaceShellInitialBootstrapPath,
  "utf8",
);
const workspaceShellInitialBootstrapTypesSource = fs.readFileSync(
  workspaceShellInitialBootstrapTypesPath,
  "utf8",
);
const useWorkspaceShellNotificationEffectSource = fs.readFileSync(
  useWorkspaceShellNotificationEffectPath,
  "utf8",
);
const useWorkspaceShellNotificationEffectTypesSource = fs.readFileSync(
  useWorkspaceShellNotificationEffectTypesPath,
  "utf8",
);
const useWorkspaceShellSelectionEffectsSource = fs.readFileSync(
  useWorkspaceShellSelectionEffectsPath,
  "utf8",
);
const useWorkspaceShellSelectionEffectsTypesSource = fs.readFileSync(
  useWorkspaceShellSelectionEffectsTypesPath,
  "utf8",
);
const workspaceShellRecordFilterActionsSource = fs.readFileSync(
  workspaceShellRecordFilterActionsPath,
  "utf8",
);
const workspaceShellRecordFilterActionsTypesSource = fs.readFileSync(
  workspaceShellRecordFilterActionsTypesPath,
  "utf8",
);
const workspaceShellFrameSource = fs.readFileSync(workspaceShellFramePath, "utf8");
const workspaceShellFrameTypesSource = fs.readFileSync(workspaceShellFrameTypesPath, "utf8");
const workspaceShellRefreshersResultTypesSource = fs.readFileSync(
  workspaceShellRefreshersResultTypesPath,
  "utf8",
);
const workspaceShellRouterTypesSource = fs.readFileSync(workspaceShellRouterTypesPath, "utf8");
const workspaceShellStateResultTypesSource = fs.readFileSync(
  workspaceShellStateResultTypesPath,
  "utf8",
);
const mediaAssetSectionSource = fs.readFileSync(mediaAssetSectionPath, "utf8");
const mediaAssetSectionTypesSource = fs.readFileSync(mediaAssetSectionTypesPath, "utf8");
const mediaAssetSectionSummarySource = fs.readFileSync(mediaAssetSectionSummaryPath, "utf8");
const mediaAssetSectionSummaryTypesSource = fs.readFileSync(
  mediaAssetSectionSummaryTypesPath,
  "utf8",
);
const mediaAssetSectionEmptySource = fs.readFileSync(mediaAssetSectionEmptyPath, "utf8");
const mediaAssetSectionEmptyTypesSource = fs.readFileSync(
  mediaAssetSectionEmptyTypesPath,
  "utf8",
);
const mediaAssetCardSource = fs.readFileSync(mediaAssetCardPath, "utf8");
const mediaAssetCardIntroSource = fs.readFileSync(mediaAssetCardIntroPath, "utf8");
const mediaAssetCardIntroTypesSource = fs.readFileSync(mediaAssetCardIntroTypesPath, "utf8");
const mediaAssetCardExtractedTextSource = fs.readFileSync(
  mediaAssetCardExtractedTextPath,
  "utf8",
);
const mediaAssetCardExtractedTextTypesSource = fs.readFileSync(
  mediaAssetCardExtractedTextTypesPath,
  "utf8",
);
const mediaAssetCardPreviewSource = fs.readFileSync(mediaAssetCardPreviewPath, "utf8");
const mediaAssetCardPreviewTypesSource = fs.readFileSync(
  mediaAssetCardPreviewTypesPath,
  "utf8",
);
const mediaAssetCardErrorSource = fs.readFileSync(mediaAssetCardErrorPath, "utf8");
const mediaAssetCardErrorTypesSource = fs.readFileSync(mediaAssetCardErrorTypesPath, "utf8");
const mediaAssetCardActionsSource = fs.readFileSync(mediaAssetCardActionsPath, "utf8");
const mediaAssetCardActionsTypesSource = fs.readFileSync(
  mediaAssetCardActionsTypesPath,
  "utf8",
);
const mediaStorageOverviewSource = fs.readFileSync(mediaStorageOverviewPath, "utf8");
const mediaStorageOverviewTypesSource = fs.readFileSync(mediaStorageOverviewTypesPath, "utf8");
const mediaStorageOverviewSummarySource = fs.readFileSync(
  mediaStorageOverviewSummaryPath,
  "utf8",
);
const mediaStorageOverviewSummaryTypesSource = fs.readFileSync(
  mediaStorageOverviewSummaryTypesPath,
  "utf8",
);
const mediaStorageOverviewUsageGridSource = fs.readFileSync(
  mediaStorageOverviewUsageGridPath,
  "utf8",
);
const mediaStorageOverviewUsageGridTypesSource = fs.readFileSync(
  mediaStorageOverviewUsageGridTypesPath,
  "utf8",
);
const mediaStorageOverviewProcessingGridSource = fs.readFileSync(
  mediaStorageOverviewProcessingGridPath,
  "utf8",
);
const mediaStorageOverviewProcessingGridTypesSource = fs.readFileSync(
  mediaStorageOverviewProcessingGridTypesPath,
  "utf8",
);
const mediaStorageOverviewProviderTagsSource = fs.readFileSync(
  mediaStorageOverviewProviderTagsPath,
  "utf8",
);
const mediaStorageOverviewProviderTagsTypesSource = fs.readFileSync(
  mediaStorageOverviewProviderTagsTypesPath,
  "utf8",
);
const recordMediaProcessingPanelsSource = fs.readFileSync(recordMediaProcessingPanelsPath, "utf8");
const recordMediaProcessingPanelsTypesSource = fs.readFileSync(
  recordMediaProcessingPanelsTypesPath,
  "utf8",
);
const recordMediaSelectedContentPropsSource = fs.readFileSync(
  recordMediaSelectedContentPropsPath,
  "utf8",
);
const recordEditorWorkspaceMainSectionsPropsSource = fs.readFileSync(
  recordEditorWorkspaceMainSectionsPropsPath,
  "utf8",
);
const recordEditorWorkspaceMainSectionsPropsTypesSource = fs.readFileSync(
  recordEditorWorkspaceMainSectionsPropsTypesPath,
  "utf8",
);
const recordReminderToolsPanelPropsSource = fs.readFileSync(
  recordReminderToolsPanelPropsPath,
  "utf8",
);
const recordReminderToolsPanelPropsTypesSource = fs.readFileSync(
  recordReminderToolsPanelPropsTypesPath,
  "utf8",
);
const mapPanelContentSource = fs.readFileSync(mapPanelContentPath, "utf8");
const mapPanelContentTypesSource = fs.readFileSync(mapPanelContentTypesPath, "utf8");
const mapDrilldownCardSource = fs.readFileSync(mapDrilldownCardPath, "utf8");
const mapDrilldownCardTypesSource = fs.readFileSync(mapDrilldownCardTypesPath, "utf8");
const mapDrilldownCardActionsSource = fs.readFileSync(mapDrilldownCardActionsPath, "utf8");
const mapDrilldownCardActionsTypesSource = fs.readFileSync(
  mapDrilldownCardActionsTypesPath,
  "utf8",
);
const mapDrilldownCardIntroSource = fs.readFileSync(mapDrilldownCardIntroPath, "utf8");
const mapDrilldownCardIntroTypesSource = fs.readFileSync(
  mapDrilldownCardIntroTypesPath,
  "utf8",
);
const mapDrilldownCardFieldsSource = fs.readFileSync(mapDrilldownCardFieldsPath, "utf8");
const mapDrilldownCardFieldsTypesSource = fs.readFileSync(
  mapDrilldownCardFieldsTypesPath,
  "utf8",
);
const mapStatusNoticesSource = fs.readFileSync(mapStatusNoticesPath, "utf8");
const mapStatusNoticesTypesSource = fs.readFileSync(mapStatusNoticesTypesPath, "utf8");
const mapPanelHeaderSource = fs.readFileSync(mapPanelHeaderPath, "utf8");
const mapPanelHeaderTypesSource = fs.readFileSync(mapPanelHeaderTypesPath, "utf8");
const mappedRecordsListSource = fs.readFileSync(mappedRecordsListPath, "utf8");
const mappedRecordsListTypesSource = fs.readFileSync(mappedRecordsListTypesPath, "utf8");
const mapSearchFormSource = fs.readFileSync(mapSearchFormPath, "utf8");
const mapSearchFormTypesSource = fs.readFileSync(mapSearchFormTypesPath, "utf8");
const mapPanelControllerResultTypesSource = fs.readFileSync(
  mapPanelControllerResultTypesPath,
  "utf8",
);
const mapPanelControllerSource = fs.readFileSync(mapPanelControllerPath, "utf8");
const mapPanelControllerTypesSource = fs.readFileSync(mapPanelControllerTypesPath, "utf8");
const mapPanelControllerActionsSource = fs.readFileSync(mapPanelControllerActionsPath, "utf8");
const mapPanelControllerActionsTypesSource = fs.readFileSync(
  mapPanelControllerActionsTypesPath,
  "utf8",
);
const mapPanelControllerSearchSource = fs.readFileSync(mapPanelControllerSearchPath, "utf8");
const mapPanelControllerSearchTypesSource = fs.readFileSync(
  mapPanelControllerSearchTypesPath,
  "utf8",
);
const useMapPanelDerivedDataSource = fs.readFileSync(useMapPanelDerivedDataPath, "utf8");
const useMapPanelDerivedDataTypesSource = fs.readFileSync(
  useMapPanelDerivedDataTypesPath,
  "utf8",
);
const useMapPanelSyncSource = fs.readFileSync(useMapPanelSyncPath, "utf8");
const useMapPanelSyncTypesSource = fs.readFileSync(useMapPanelSyncTypesPath, "utf8");
const useMapPanelAmapInitSource = fs.readFileSync(useMapPanelAmapInitPath, "utf8");
const useMapPanelAmapInitTypesSource = fs.readFileSync(useMapPanelAmapInitTypesPath, "utf8");
const useMapPanelAmapMarkersSource = fs.readFileSync(useMapPanelAmapMarkersPath, "utf8");
const useMapPanelAmapMarkersTypesSource = fs.readFileSync(
  useMapPanelAmapMarkersTypesPath,
  "utf8",
);
const providerSettingsPanelHelpersSource = fs.readFileSync(providerSettingsPanelHelpersPath, "utf8");
const providerSettingsPanelHelpersTypesSource = fs.readFileSync(
  providerSettingsPanelHelpersTypesPath,
  "utf8",
);
const useProviderSettingsDraftSyncSource = fs.readFileSync(
  useProviderSettingsDraftSyncPath,
  "utf8",
);
const useProviderSettingsDraftSyncTypesSource = fs.readFileSync(
  useProviderSettingsDraftSyncTypesPath,
  "utf8",
);
const workspaceTransferJobCardSource = fs.readFileSync(workspaceTransferJobCardPath, "utf8");
const workspaceTransferJobCardTypesSource = fs.readFileSync(
  workspaceTransferJobCardTypesPath,
  "utf8",
);
const workspaceTransferJobsListSource = fs.readFileSync(workspaceTransferJobsListPath, "utf8");
const workspaceTransferJobsListTypesSource = fs.readFileSync(
  workspaceTransferJobsListTypesPath,
  "utf8",
);
const workspaceEntryJobActionsSource = fs.readFileSync(workspaceEntryJobActionsPath, "utf8");
const workspaceEntryJobActionsTypesSource = fs.readFileSync(
  workspaceEntryJobActionsTypesPath,
  "utf8",
);
const workspaceExportCardSource = fs.readFileSync(workspaceExportCardPath, "utf8");
const workspaceExportContentSource = fs.readFileSync(workspaceExportContentPath, "utf8");
const workspaceExportContentTypesSource = fs.readFileSync(
  workspaceExportContentTypesPath,
  "utf8",
);
const workspaceExportSummarySource = fs.readFileSync(workspaceExportSummaryPath, "utf8");
const workspaceExportSummaryTypesSource = fs.readFileSync(
  workspaceExportSummaryTypesPath,
  "utf8",
);
const workspaceExportCardTypesSource = fs.readFileSync(workspaceExportCardTypesPath, "utf8");
const workspaceExportControlsSource = fs.readFileSync(workspaceExportControlsPath, "utf8");
const workspaceExportControlsActionSource = fs.readFileSync(
  workspaceExportControlsActionPath,
  "utf8",
);
const workspaceExportControlsActionTypesSource = fs.readFileSync(
  workspaceExportControlsActionTypesPath,
  "utf8",
);
const workspaceExportControlsStatusSource = fs.readFileSync(
  workspaceExportControlsStatusPath,
  "utf8",
);
const workspaceExportControlsStatusTypesSource = fs.readFileSync(
  workspaceExportControlsStatusTypesPath,
  "utf8",
);
const workspaceExportControlsTypesSource = fs.readFileSync(
  workspaceExportControlsTypesPath,
  "utf8",
);
const workspaceExportControllerSource = fs.readFileSync(workspaceExportControllerPath, "utf8");
const workspaceExportControllerTypesSource = fs.readFileSync(
  workspaceExportControllerTypesPath,
  "utf8",
);
const workspaceExportJobsActionsSource = fs.readFileSync(workspaceExportJobsActionsPath, "utf8");
const workspaceExportJobsActionsTypesSource = fs.readFileSync(
  workspaceExportJobsActionsTypesPath,
  "utf8",
);
const workspaceExportJobsCardSource = fs.readFileSync(workspaceExportJobsCardPath, "utf8");
const workspaceExportJobsContentSource = fs.readFileSync(
  workspaceExportJobsContentPath,
  "utf8",
);
const workspaceExportJobsContentTypesSource = fs.readFileSync(
  workspaceExportJobsContentTypesPath,
  "utf8",
);
const workspaceExportJobsCardTypesSource = fs.readFileSync(
  workspaceExportJobsCardTypesPath,
  "utf8",
);
const workspaceExportJobsListSource = fs.readFileSync(workspaceExportJobsListPath, "utf8");
const workspaceExportJobsEmptyStateSource = fs.readFileSync(
  workspaceExportJobsEmptyStatePath,
  "utf8",
);
const workspaceExportJobsEmptyStateTypesSource = fs.readFileSync(
  workspaceExportJobsEmptyStateTypesPath,
  "utf8",
);
const workspaceExportJobsHeaderSource = fs.readFileSync(
  workspaceExportJobsHeaderPath,
  "utf8",
);
const workspaceExportJobsHeaderIntroSource = fs.readFileSync(
  workspaceExportJobsHeaderIntroPath,
  "utf8",
);
const workspaceExportJobsHeaderIntroTypesSource = fs.readFileSync(
  workspaceExportJobsHeaderIntroTypesPath,
  "utf8",
);
const workspaceExportJobsHeaderActionsSource = fs.readFileSync(
  workspaceExportJobsHeaderActionsPath,
  "utf8",
);
const workspaceExportJobsHeaderActionsTypesSource = fs.readFileSync(
  workspaceExportJobsHeaderActionsTypesPath,
  "utf8",
);
const workspaceExportJobsHeaderTypesSource = fs.readFileSync(
  workspaceExportJobsHeaderTypesPath,
  "utf8",
);
const workspaceExportJobsNoticesSource = fs.readFileSync(
  workspaceExportJobsNoticesPath,
  "utf8",
);
const workspaceExportJobsNoticesTypesSource = fs.readFileSync(
  workspaceExportJobsNoticesTypesPath,
  "utf8",
);
const workspaceExportJobsListItemSource = fs.readFileSync(
  workspaceExportJobsListItemPath,
  "utf8",
);
const workspaceExportJobsListItemActionSource = fs.readFileSync(
  workspaceExportJobsListItemActionPath,
  "utf8",
);
const workspaceExportJobsListItemActionTypesSource = fs.readFileSync(
  workspaceExportJobsListItemActionTypesPath,
  "utf8",
);
const workspaceExportJobsListItemErrorSource = fs.readFileSync(
  workspaceExportJobsListItemErrorPath,
  "utf8",
);
const workspaceExportJobsListItemErrorTypesSource = fs.readFileSync(
  workspaceExportJobsListItemErrorTypesPath,
  "utf8",
);
const workspaceExportJobsListItemSummarySource = fs.readFileSync(
  workspaceExportJobsListItemSummaryPath,
  "utf8",
);
const workspaceExportJobsListItemSummaryTypesSource = fs.readFileSync(
  workspaceExportJobsListItemSummaryTypesPath,
  "utf8",
);
const workspaceExportJobsListItemTypesSource = fs.readFileSync(
  workspaceExportJobsListItemTypesPath,
  "utf8",
);
const workspaceExportJobsListTypesSource = fs.readFileSync(
  workspaceExportJobsListTypesPath,
  "utf8",
);
const workspaceExportJobsControllerSource = fs.readFileSync(
  workspaceExportJobsControllerPath,
  "utf8",
);
const workspaceExportJobsControllerTypesSource = fs.readFileSync(
  workspaceExportJobsControllerTypesPath,
  "utf8",
);
const workspaceSettingsHeaderSource = fs.readFileSync(workspaceSettingsHeaderPath, "utf8");
const workspaceSettingsHeaderTypesSource = fs.readFileSync(
  workspaceSettingsHeaderTypesPath,
  "utf8",
);
const workspaceSettingsHeaderIntroSource = fs.readFileSync(
  workspaceSettingsHeaderIntroPath,
  "utf8",
);
const workspaceSettingsHeaderIntroTypesSource = fs.readFileSync(
  workspaceSettingsHeaderIntroTypesPath,
  "utf8",
);
const workspaceSettingsHeaderActionsSource = fs.readFileSync(
  workspaceSettingsHeaderActionsPath,
  "utf8",
);
const workspaceSettingsHeaderActionsTypesSource = fs.readFileSync(
  workspaceSettingsHeaderActionsTypesPath,
  "utf8",
);
const workspaceSettingsOverviewCardSource = fs.readFileSync(
  workspaceSettingsOverviewCardPath,
  "utf8",
);
const workspaceSettingsOverviewSummarySource = fs.readFileSync(
  workspaceSettingsOverviewSummaryPath,
  "utf8",
);
const workspaceSettingsOverviewSummaryTypesSource = fs.readFileSync(
  workspaceSettingsOverviewSummaryTypesPath,
  "utf8",
);
const workspaceSettingsOverviewDetailsSource = fs.readFileSync(
  workspaceSettingsOverviewDetailsPath,
  "utf8",
);
const workspaceSettingsOverviewDetailsTypesSource = fs.readFileSync(
  workspaceSettingsOverviewDetailsTypesPath,
  "utf8",
);
const workspaceSettingsOverviewCardTypesSource = fs.readFileSync(
  workspaceSettingsOverviewCardTypesPath,
  "utf8",
);
const workspaceMembersSectionSource = fs.readFileSync(workspaceMembersSectionPath, "utf8");
const workspaceMembersSectionIntroSource = fs.readFileSync(
  workspaceMembersSectionIntroPath,
  "utf8",
);
const workspaceMembersSectionIntroTypesSource = fs.readFileSync(
  workspaceMembersSectionIntroTypesPath,
  "utf8",
);
const workspaceMembersSectionListSource = fs.readFileSync(
  workspaceMembersSectionListPath,
  "utf8",
);
const workspaceMembersSectionListTypesSource = fs.readFileSync(
  workspaceMembersSectionListTypesPath,
  "utf8",
);
const workspaceMembersSectionTypesSource = fs.readFileSync(
  workspaceMembersSectionTypesPath,
  "utf8",
);
const workspaceMembersSectionItemSource = fs.readFileSync(
  workspaceMembersSectionItemPath,
  "utf8",
);
const workspaceMembersSectionItemSummarySource = fs.readFileSync(
  workspaceMembersSectionItemSummaryPath,
  "utf8",
);
const workspaceMembersSectionItemSummaryTypesSource = fs.readFileSync(
  workspaceMembersSectionItemSummaryTypesPath,
  "utf8",
);
const workspaceMembersSectionItemControlsSource = fs.readFileSync(
  workspaceMembersSectionItemControlsPath,
  "utf8",
);
const workspaceMembersSectionItemControlsTypesSource = fs.readFileSync(
  workspaceMembersSectionItemControlsTypesPath,
  "utf8",
);
const workspaceMembersSectionItemTypesSource = fs.readFileSync(
  workspaceMembersSectionItemTypesPath,
  "utf8",
);
const workspaceMediaRetentionCardSource = fs.readFileSync(
  workspaceMediaRetentionCardPath,
  "utf8",
);
const workspaceMediaRetentionContentSource = fs.readFileSync(
  workspaceMediaRetentionContentPath,
  "utf8",
);
const workspaceMediaRetentionContentTypesSource = fs.readFileSync(
  workspaceMediaRetentionContentTypesPath,
  "utf8",
);
const workspaceMediaRetentionCardTypesSource = fs.readFileSync(
  workspaceMediaRetentionCardTypesPath,
  "utf8",
);
const workspaceMediaRetentionActionsSource = fs.readFileSync(
  workspaceMediaRetentionActionsPath,
  "utf8",
);
const workspaceMediaRetentionActionsContentSource = fs.readFileSync(
  workspaceMediaRetentionActionsContentPath,
  "utf8",
);
const workspaceMediaRetentionActionsContentTypesSource = fs.readFileSync(
  workspaceMediaRetentionActionsContentTypesPath,
  "utf8",
);
const workspaceMediaRetentionActionsTypesSource = fs.readFileSync(
  workspaceMediaRetentionActionsTypesPath,
  "utf8",
);
const workspaceMediaRetentionOwnerActionsSource = fs.readFileSync(
  workspaceMediaRetentionOwnerActionsPath,
  "utf8",
);
const workspaceMediaRetentionOwnerActionsSummarySource = fs.readFileSync(
  workspaceMediaRetentionOwnerActionsSummaryPath,
  "utf8",
);
const workspaceMediaRetentionOwnerActionsSummaryTypesSource = fs.readFileSync(
  workspaceMediaRetentionOwnerActionsSummaryTypesPath,
  "utf8",
);
const workspaceMediaRetentionOwnerActionsButtonsSource = fs.readFileSync(
  workspaceMediaRetentionOwnerActionsButtonsPath,
  "utf8",
);
const workspaceMediaRetentionOwnerActionsButtonsTypesSource = fs.readFileSync(
  workspaceMediaRetentionOwnerActionsButtonsTypesPath,
  "utf8",
);
const workspaceMediaRetentionOwnerActionsTypesSource = fs.readFileSync(
  workspaceMediaRetentionOwnerActionsTypesPath,
  "utf8",
);
const workspaceMediaRetentionEditorNoticeSource = fs.readFileSync(
  workspaceMediaRetentionEditorNoticePath,
  "utf8",
);
const workspaceMediaRetentionEditorNoticeTypesSource = fs.readFileSync(
  workspaceMediaRetentionEditorNoticeTypesPath,
  "utf8",
);
const workspaceMediaRetentionSelectionActionsSource = fs.readFileSync(
  workspaceMediaRetentionSelectionActionsPath,
  "utf8",
);
const workspaceMediaRetentionSelectionActionsTypesSource = fs.readFileSync(
  workspaceMediaRetentionSelectionActionsTypesPath,
  "utf8",
);
const useWorkspaceMediaRetentionReportSource = fs.readFileSync(
  useWorkspaceMediaRetentionReportPath,
  "utf8",
);
const useWorkspaceMediaRetentionReportTypesSource = fs.readFileSync(
  useWorkspaceMediaRetentionReportTypesPath,
  "utf8",
);
const workspaceMediaRetentionControllerActionsSource = fs.readFileSync(
  workspaceMediaRetentionControllerActionsPath,
  "utf8",
);
const workspaceMediaRetentionControllerActionsTypesSource = fs.readFileSync(
  workspaceMediaRetentionControllerActionsTypesPath,
  "utf8",
);
const workspaceMediaRetentionExecutionActionsSource = fs.readFileSync(
  workspaceMediaRetentionExecutionActionsPath,
  "utf8",
);
const workspaceMediaRetentionExecutionActionsTypesSource = fs.readFileSync(
  workspaceMediaRetentionExecutionActionsTypesPath,
  "utf8",
);
const workspaceMediaRetentionCardActionHelpersSource = fs.readFileSync(
  workspaceMediaRetentionCardActionHelpersPath,
  "utf8",
);
const workspaceMediaRetentionCardActionHelpersTypesSource = fs.readFileSync(
  workspaceMediaRetentionCardActionHelpersTypesPath,
  "utf8",
);
const workspaceMediaRetentionCardCopyHelpersSource = fs.readFileSync(
  workspaceMediaRetentionCardCopyHelpersPath,
  "utf8",
);
const workspaceMediaRetentionCardCopyHelpersTypesSource = fs.readFileSync(
  workspaceMediaRetentionCardCopyHelpersTypesPath,
  "utf8",
);
const workspaceMediaRetentionHeaderSource = fs.readFileSync(
  workspaceMediaRetentionHeaderPath,
  "utf8",
);
const workspaceMediaRetentionHeaderIntroSource = fs.readFileSync(
  workspaceMediaRetentionHeaderIntroPath,
  "utf8",
);
const workspaceMediaRetentionHeaderIntroTypesSource = fs.readFileSync(
  workspaceMediaRetentionHeaderIntroTypesPath,
  "utf8",
);
const workspaceMediaRetentionHeaderControlsSource = fs.readFileSync(
  workspaceMediaRetentionHeaderControlsPath,
  "utf8",
);
const workspaceMediaRetentionHeaderControlsTypesSource = fs.readFileSync(
  workspaceMediaRetentionHeaderControlsTypesPath,
  "utf8",
);
const workspaceMediaRetentionHeaderTypesSource = fs.readFileSync(
  workspaceMediaRetentionHeaderTypesPath,
  "utf8",
);
const workspaceMediaRetentionListsSource = fs.readFileSync(
  workspaceMediaRetentionListsPath,
  "utf8",
);
const workspaceMediaRetentionLargestListSource = fs.readFileSync(
  workspaceMediaRetentionLargestListPath,
  "utf8",
);
const workspaceMediaRetentionLargestListTypesSource = fs.readFileSync(
  workspaceMediaRetentionLargestListTypesPath,
  "utf8",
);
const workspaceMediaRetentionCandidatesListSource = fs.readFileSync(
  workspaceMediaRetentionCandidatesListPath,
  "utf8",
);
const workspaceMediaRetentionCandidatesListTypesSource = fs.readFileSync(
  workspaceMediaRetentionCandidatesListTypesPath,
  "utf8",
);
const workspaceMediaRetentionListsTypesSource = fs.readFileSync(
  workspaceMediaRetentionListsTypesPath,
  "utf8",
);
const workspaceMediaRetentionNoticesSource = fs.readFileSync(
  workspaceMediaRetentionNoticesPath,
  "utf8",
);
const workspaceMediaRetentionNoticesTypesSource = fs.readFileSync(
  workspaceMediaRetentionNoticesTypesPath,
  "utf8",
);
const workspaceMediaRetentionSummarySource = fs.readFileSync(
  workspaceMediaRetentionSummaryPath,
  "utf8",
);
const workspaceMediaRetentionSummaryGridSource = fs.readFileSync(
  workspaceMediaRetentionSummaryGridPath,
  "utf8",
);
const workspaceMediaRetentionSummaryGridTypesSource = fs.readFileSync(
  workspaceMediaRetentionSummaryGridTypesPath,
  "utf8",
);
const workspaceMediaRetentionSummaryNoteSource = fs.readFileSync(
  workspaceMediaRetentionSummaryNotePath,
  "utf8",
);
const workspaceMediaRetentionSummaryNoteTypesSource = fs.readFileSync(
  workspaceMediaRetentionSummaryNoteTypesPath,
  "utf8",
);
const workspaceMediaRetentionSummaryTypesSource = fs.readFileSync(
  workspaceMediaRetentionSummaryTypesPath,
  "utf8",
);
const mediaRetentionItemCardSource = fs.readFileSync(mediaRetentionItemCardPath, "utf8");
const mediaRetentionItemCardTypesSource = fs.readFileSync(
  mediaRetentionItemCardTypesPath,
  "utf8",
);
const providerFeatureCardActionsSource = fs.readFileSync(providerFeatureCardActionsPath, "utf8");
const providerFeatureCardActionsTypesSource = fs.readFileSync(
  providerFeatureCardActionsTypesPath,
  "utf8",
);
const providerFeatureCardFieldsSource = fs.readFileSync(providerFeatureCardFieldsPath, "utf8");
const providerFeatureCardFieldsTypesSource = fs.readFileSync(
  providerFeatureCardFieldsTypesPath,
  "utf8",
);
const providerFeatureCardEnabledToggleSource = fs.readFileSync(
  providerFeatureCardEnabledTogglePath,
  "utf8",
);
const providerFeatureCardEnabledToggleTypesSource = fs.readFileSync(
  providerFeatureCardEnabledToggleTypesPath,
  "utf8",
);
const providerFeatureCardCoreFieldsSource = fs.readFileSync(
  providerFeatureCardCoreFieldsPath,
  "utf8",
);
const providerFeatureCardCoreFieldsTypesSource = fs.readFileSync(
  providerFeatureCardCoreFieldsTypesPath,
  "utf8",
);
const providerFeatureMediaStorageOptionsSource = fs.readFileSync(
  providerFeatureMediaStorageOptionsPath,
  "utf8",
);
const providerFeatureMediaStorageOptionTogglesSource = fs.readFileSync(
  providerFeatureMediaStorageOptionTogglesPath,
  "utf8",
);
const providerFeatureMediaStorageOptionTogglesTypesSource = fs.readFileSync(
  providerFeatureMediaStorageOptionTogglesTypesPath,
  "utf8",
);
const providerFeatureMediaStorageRetryFieldsSource = fs.readFileSync(
  providerFeatureMediaStorageRetryFieldsPath,
  "utf8",
);
const providerFeatureMediaStorageRetryFieldsTypesSource = fs.readFileSync(
  providerFeatureMediaStorageRetryFieldsTypesPath,
  "utf8",
);
const providerFeatureMediaStorageOptionsTypesSource = fs.readFileSync(
  providerFeatureMediaStorageOptionsTypesPath,
  "utf8",
);
const providerFeatureMediaStorageOptionsHelpersSource = fs.readFileSync(
  providerFeatureMediaStorageOptionsHelpersPath,
  "utf8",
);
const providerFeatureMediaStorageOptionsHelpersTypesSource = fs.readFileSync(
  providerFeatureMediaStorageOptionsHelpersTypesPath,
  "utf8",
);
const providerSettingsFeatureListSource = fs.readFileSync(
  providerSettingsFeatureListPath,
  "utf8",
);
const providerSettingsFeatureListTypesSource = fs.readFileSync(
  providerSettingsFeatureListTypesPath,
  "utf8",
);
const providerSettingsJumpNavSource = fs.readFileSync(providerSettingsJumpNavPath, "utf8");
const providerSettingsJumpNavTypesSource = fs.readFileSync(
  providerSettingsJumpNavTypesPath,
  "utf8",
);
const workspaceSettingsLoadingShellSource = fs.readFileSync(
  workspaceSettingsLoadingShellPath,
  "utf8",
);
const workspaceSettingsLoadingShellTypesSource = fs.readFileSync(
  workspaceSettingsLoadingShellTypesPath,
  "utf8",
);
const useWorkspaceSettingsAnchorSource = fs.readFileSync(useWorkspaceSettingsAnchorPath, "utf8");
const useWorkspaceSettingsAnchorTypesSource = fs.readFileSync(
  useWorkspaceSettingsAnchorTypesPath,
  "utf8",
);
const useWorkspaceSettingsLoadSource = fs.readFileSync(useWorkspaceSettingsLoadPath, "utf8");
const useWorkspaceSettingsLoadTypesSource = fs.readFileSync(
  useWorkspaceSettingsLoadTypesPath,
  "utf8",
);
const workspaceSettingsActionsSource = fs.readFileSync(workspaceSettingsActionsPath, "utf8");
const workspaceSettingsActionsTypesSource = fs.readFileSync(
  workspaceSettingsActionsTypesPath,
  "utf8",
);
const workspaceSettingsMemberActionsSource = fs.readFileSync(
  workspaceSettingsMemberActionsPath,
  "utf8",
);
const workspaceSettingsMemberActionsTypesSource = fs.readFileSync(
  workspaceSettingsMemberActionsTypesPath,
  "utf8",
);
const workspaceSettingsProviderActionsSource = fs.readFileSync(
  workspaceSettingsProviderActionsPath,
  "utf8",
);
const workspaceSettingsProviderActionsTypesSource = fs.readFileSync(
  workspaceSettingsProviderActionsTypesPath,
  "utf8",
);
const useChatPanelActionDerivedDataSource = fs.readFileSync(
  useChatPanelActionDerivedDataPath,
  "utf8",
);
const chatPanelActionDerivedDataResultTypesSource = fs.readFileSync(
  chatPanelActionDerivedDataResultTypesPath,
  "utf8",
);
const chatPanelActionHandlerInputsSource = fs.readFileSync(
  chatPanelActionHandlerInputsPath,
  "utf8",
);
const chatPanelActionHandlerInputsTypesSource = fs.readFileSync(
  chatPanelActionHandlerInputsTypesPath,
  "utf8",
);
const chatPanelActionHelpersSource = fs.readFileSync(chatPanelActionHelpersPath, "utf8");
const chatPanelActionHelpersTypesSource = fs.readFileSync(
  chatPanelActionHelpersTypesPath,
  "utf8",
);
const chatPanelOperatorHandlersSource = fs.readFileSync(chatPanelOperatorHandlersPath, "utf8");
const chatPanelOperatorHandlersTypesSource = fs.readFileSync(
  chatPanelOperatorHandlersTypesPath,
  "utf8",
);
const chatPanelActionStateResultTypesSource = fs.readFileSync(
  chatPanelActionStateResultTypesPath,
  "utf8",
);
const chatPanelActionsResultTypesSource = fs.readFileSync(chatPanelActionsResultTypesPath, "utf8");
const chatPanelShareHandlersSource = fs.readFileSync(chatPanelShareHandlersPath, "utf8");
const chatPanelShareHandlersTypesSource = fs.readFileSync(
  chatPanelShareHandlersTypesPath,
  "utf8",
);
const useChatPanelActionsSource = fs.readFileSync(useChatPanelActionsPath, "utf8");
const chatPanelContentPropsSource = fs.readFileSync(chatPanelContentPropsPath, "utf8");
const chatPanelContentPropsTypesSource = fs.readFileSync(chatPanelContentPropsTypesPath, "utf8");
const chatPanelContentTypesSource = fs.readFileSync(chatPanelContentTypesPath, "utf8");
const useChatPanelActionDerivedDataTypesSource = fs.readFileSync(
  useChatPanelActionDerivedDataTypesPath,
  "utf8",
);
const chatMessageThreadSource = fs.readFileSync(chatMessageThreadPath, "utf8");
const chatMessageThreadTypesSource = fs.readFileSync(chatMessageThreadTypesPath, "utf8");
const chatPanelHeaderSource = fs.readFileSync(chatPanelHeaderPath, "utf8");
const chatPanelHeaderTypesSource = fs.readFileSync(chatPanelHeaderTypesPath, "utf8");
const chatPanelComposerSource = fs.readFileSync(chatPanelComposerPath, "utf8");
const chatPanelComposerTypesSource = fs.readFileSync(chatPanelComposerTypesPath, "utf8");
const chatConversationBarSource = fs.readFileSync(chatConversationBarPath, "utf8");
const chatConversationBarTypesSource = fs.readFileSync(chatConversationBarTypesPath, "utf8");
const chatMessageSourcesSource = fs.readFileSync(chatMessageSourcesPath, "utf8");
const chatMessageSourcesTypesSource = fs.readFileSync(chatMessageSourcesTypesPath, "utf8");
const chatAuditLogsCardSource = fs.readFileSync(chatAuditLogsCardPath, "utf8");
const chatAuditLogsCardTypesSource = fs.readFileSync(chatAuditLogsCardTypesPath, "utf8");
const chatKnowledgeCardSource = fs.readFileSync(chatKnowledgeCardPath, "utf8");
const chatKnowledgeCardTypesSource = fs.readFileSync(chatKnowledgeCardTypesPath, "utf8");
const chatNotificationsCardSource = fs.readFileSync(chatNotificationsCardPath, "utf8");
const chatNotificationsCardTypesSource = fs.readFileSync(
  chatNotificationsCardTypesPath,
  "utf8",
);
const chatShareLinksCardSource = fs.readFileSync(chatShareLinksCardPath, "utf8");
const chatShareLinksCardTypesSource = fs.readFileSync(chatShareLinksCardTypesPath, "utf8");
const chatShareLinksCreateFormSource = fs.readFileSync(chatShareLinksCreateFormPath, "utf8");
const chatShareLinksCreateFormTypesSource = fs.readFileSync(
  chatShareLinksCreateFormTypesPath,
  "utf8",
);
const chatShareLinkListItemSource = fs.readFileSync(chatShareLinkListItemPath, "utf8");
const chatShareLinkListItemTypesSource = fs.readFileSync(
  chatShareLinkListItemTypesPath,
  "utf8",
);
const authFormFrameSource = fs.readFileSync(authFormFramePath, "utf8");
const authFormFrameTypesSource = fs.readFileSync(authFormFrameTypesPath, "utf8");
const mediaAssetCardMetadataSource = fs.readFileSync(mediaAssetCardMetadataPath, "utf8");
const mediaAssetCardMetadataTypesSource = fs.readFileSync(mediaAssetCardMetadataTypesPath, "utf8");
const mediaAssetCardMetadataDetailsSource = fs.readFileSync(
  mediaAssetCardMetadataDetailsPath,
  "utf8",
);
const mediaAssetCardMetadataDetailsTypesSource = fs.readFileSync(
  mediaAssetCardMetadataDetailsTypesPath,
  "utf8",
);
const mediaAssetCardMetadataTagsSource = fs.readFileSync(mediaAssetCardMetadataTagsPath, "utf8");
const mediaAssetCardMetadataTagsTypesSource = fs.readFileSync(
  mediaAssetCardMetadataTagsTypesPath,
  "utf8",
);
const sharePreviewClientSource = fs.readFileSync(sharePreviewClientPath, "utf8");
const sharePreviewClientTypesSource = fs.readFileSync(sharePreviewClientTypesPath, "utf8");
const workspaceEntryLoadingShellSource = fs.readFileSync(workspaceEntryLoadingShellPath, "utf8");
const workspaceEntryLoadingShellTypesSource = fs.readFileSync(
  workspaceEntryLoadingShellTypesPath,
  "utf8",
);
const languageSwitcherSource = fs.readFileSync(languageSwitcherPath, "utf8");
const languageSwitcherTypesSource = fs.readFileSync(languageSwitcherTypesPath, "utf8");
const workspaceEntryHeaderSource = fs.readFileSync(workspaceEntryHeaderPath, "utf8");
const workspaceEntryHeaderTypesSource = fs.readFileSync(
  workspaceEntryHeaderTypesPath,
  "utf8",
);
const workspaceCreateSectionSource = fs.readFileSync(workspaceCreateSectionPath, "utf8");
const workspaceCreateSectionTypesSource = fs.readFileSync(
  workspaceCreateSectionTypesPath,
  "utf8",
);
const workspaceJoinSectionSource = fs.readFileSync(workspaceJoinSectionPath, "utf8");
const workspaceJoinSectionTypesSource = fs.readFileSync(
  workspaceJoinSectionTypesPath,
  "utf8",
);
const workspaceImportSectionSource = fs.readFileSync(workspaceImportSectionPath, "utf8");
const workspaceImportSectionTypesSource = fs.readFileSync(
  workspaceImportSectionTypesPath,
  "utf8",
);
const workspaceListSectionSource = fs.readFileSync(workspaceListSectionPath, "utf8");
const workspaceListSectionTypesSource = fs.readFileSync(
  workspaceListSectionTypesPath,
  "utf8",
);
const useWorkspaceEntryControllerDerivedDataSource = fs.readFileSync(
  useWorkspaceEntryControllerDerivedDataPath,
  "utf8",
);
const useWorkspaceEntryControllerDerivedDataTypesSource = fs.readFileSync(
  useWorkspaceEntryControllerDerivedDataTypesPath,
  "utf8",
);
const useWorkspaceEntryLoadSource = fs.readFileSync(useWorkspaceEntryLoadPath, "utf8");
const useWorkspaceEntryLoadTypesSource = fs.readFileSync(
  useWorkspaceEntryLoadTypesPath,
  "utf8",
);
const workspaceEntryControllerActionsSource = fs.readFileSync(
  workspaceEntryControllerActionsPath,
  "utf8",
);
const workspaceEntryControllerActionsTypesSource = fs.readFileSync(
  workspaceEntryControllerActionsTypesPath,
  "utf8",
);
const workspaceEntryCreateActionsSource = fs.readFileSync(workspaceEntryCreateActionsPath, "utf8");
const workspaceEntryCreateActionsTypesSource = fs.readFileSync(
  workspaceEntryCreateActionsTypesPath,
  "utf8",
);
const workspaceEntryImportActionsSource = fs.readFileSync(workspaceEntryImportActionsPath, "utf8");
const workspaceEntryImportActionsTypesSource = fs.readFileSync(
  workspaceEntryImportActionsTypesPath,
  "utf8",
);
const workspaceEntryWorkspaceActionsSource = fs.readFileSync(
  workspaceEntryWorkspaceActionsPath,
  "utf8",
);
const workspaceEntryWorkspaceActionsTypesSource = fs.readFileSync(
  workspaceEntryWorkspaceActionsTypesPath,
  "utf8",
);
const workspaceEntryShareActionsSource = fs.readFileSync(workspaceEntryShareActionsPath, "utf8");
const workspaceEntryShareActionsTypesSource = fs.readFileSync(
  workspaceEntryShareActionsTypesPath,
  "utf8",
);
const recordSummaryCardSource = fs.readFileSync(recordSummaryCardPath, "utf8");
const recordSummaryCardTypesSource = fs.readFileSync(recordSummaryCardTypesPath, "utf8");
const recordResultsViewSwitcherSource = fs.readFileSync(recordResultsViewSwitcherPath, "utf8");
const recordResultsViewSwitcherTypesSource = fs.readFileSync(
  recordResultsViewSwitcherTypesPath,
  "utf8",
);
const searchPresetListSource = fs.readFileSync(searchPresetListPath, "utf8");
const searchPresetListTypesSource = fs.readFileSync(searchPresetListTypesPath, "utf8");
const recordPanelStatsSource = fs.readFileSync(recordPanelStatsPath, "utf8");
const recordPanelStatsTypesSource = fs.readFileSync(recordPanelStatsTypesPath, "utf8");
const deadLetterRecoverySummarySource = fs.readFileSync(deadLetterRecoverySummaryPath, "utf8");
const deadLetterRecoverySummaryTypesSource = fs.readFileSync(
  deadLetterRecoverySummaryTypesPath,
  "utf8",
);
const deadLetterRecoverySummaryActionsSource = fs.readFileSync(
  deadLetterRecoverySummaryActionsPath,
  "utf8",
);
const deadLetterRecoverySummaryActionsTypesSource = fs.readFileSync(
  deadLetterRecoverySummaryActionsTypesPath,
  "utf8",
);
const deadLetterRecoverySummaryStatsSource = fs.readFileSync(
  deadLetterRecoverySummaryStatsPath,
  "utf8",
);
const deadLetterRecoverySummaryStatsTypesSource = fs.readFileSync(
  deadLetterRecoverySummaryStatsTypesPath,
  "utf8",
);
const locationReviewPanelSource = fs.readFileSync(locationReviewPanelPath, "utf8");
const locationReviewIntroSource = fs.readFileSync(locationReviewIntroPath, "utf8");
const locationReviewIntroTypesSource = fs.readFileSync(locationReviewIntroTypesPath, "utf8");
const locationReviewActionsSource = fs.readFileSync(locationReviewActionsPath, "utf8");
const locationReviewActionsTypesSource = fs.readFileSync(
  locationReviewActionsTypesPath,
  "utf8",
);
const locationReviewFormFieldsSource = fs.readFileSync(locationReviewFormFieldsPath, "utf8");
const locationReviewFormFieldsTypesSource = fs.readFileSync(
  locationReviewFormFieldsTypesPath,
  "utf8",
);
const locationReviewHistoryListSource = fs.readFileSync(locationReviewHistoryListPath, "utf8");
const locationReviewHistoryListTypesSource = fs.readFileSync(
  locationReviewHistoryListTypesPath,
  "utf8",
);
const locationReviewStatusSummarySource = fs.readFileSync(
  locationReviewStatusSummaryPath,
  "utf8",
);
const locationReviewStatusSummaryTypesSource = fs.readFileSync(
  locationReviewStatusSummaryTypesPath,
  "utf8",
);
const recentMediaIssueCardSource = fs.readFileSync(recentMediaIssueCardPath, "utf8");
const recentMediaIssueCardIntroSource = fs.readFileSync(recentMediaIssueCardIntroPath, "utf8");
const recentMediaIssueCardIntroTypesSource = fs.readFileSync(
  recentMediaIssueCardIntroTypesPath,
  "utf8",
);
const recentMediaIssueCardErrorSource = fs.readFileSync(recentMediaIssueCardErrorPath, "utf8");
const recentMediaIssueCardErrorTypesSource = fs.readFileSync(
  recentMediaIssueCardErrorTypesPath,
  "utf8",
);
const recentMediaIssueCardMetadataSource = fs.readFileSync(
  recentMediaIssueCardMetadataPath,
  "utf8",
);
const recentMediaIssueCardMetadataTypesSource = fs.readFileSync(
  recentMediaIssueCardMetadataTypesPath,
  "utf8",
);
const recentMediaIssueCardActionsSource = fs.readFileSync(recentMediaIssueCardActionsPath, "utf8");
const recentMediaIssueCardActionsTypesSource = fs.readFileSync(
  recentMediaIssueCardActionsTypesPath,
  "utf8",
);
const recentMediaIssueCardTagsSource = fs.readFileSync(recentMediaIssueCardTagsPath, "utf8");
const recentMediaIssueCardTagsTypesSource = fs.readFileSync(
  recentMediaIssueCardTagsTypesPath,
  "utf8",
);
const mediaPreviewContentSource = fs.readFileSync(mediaPreviewContentPath, "utf8");
const mediaPreviewContentTypesSource = fs.readFileSync(mediaPreviewContentTypesPath, "utf8");
const providerFeatureCardStatusSource = fs.readFileSync(providerFeatureCardStatusPath, "utf8");
const providerFeatureCardStatusTypesSource = fs.readFileSync(
  providerFeatureCardStatusTypesPath,
  "utf8",
);
const recordEditorLocationFieldsSource = fs.readFileSync(recordEditorLocationFieldsPath, "utf8");
const recordEditorLocationFieldsTypesSource = fs.readFileSync(
  recordEditorLocationFieldsTypesPath,
  "utf8",
);
const recordEditorPrimaryFieldsSource = fs.readFileSync(recordEditorPrimaryFieldsPath, "utf8");
const recordEditorPrimaryFieldsTypesSource = fs.readFileSync(
  recordEditorPrimaryFieldsTypesPath,
  "utf8",
);
const recordEditorMetadataFieldsSource = fs.readFileSync(recordEditorMetadataFieldsPath, "utf8");
const recordEditorMetadataFieldsTypesSource = fs.readFileSync(
  recordEditorMetadataFieldsTypesPath,
  "utf8",
);
const recordMediaToolsActionsSource = fs.readFileSync(recordMediaToolsActionsPath, "utf8");
const recordMediaToolsActionsTypesSource = fs.readFileSync(
  recordMediaToolsActionsTypesPath,
  "utf8",
);
const recordEditorSupportToolsMediaCopyPropsSource = fs.readFileSync(
  recordEditorSupportToolsMediaCopyPropsPath,
  "utf8",
);
const recordEditorSupportToolsMediaCopyPropsTypesSource = fs.readFileSync(
  recordEditorSupportToolsMediaCopyPropsTypesPath,
  "utf8",
);
const recordEditorSupportToolsReminderDerivedPropsSource = fs.readFileSync(
  recordEditorSupportToolsReminderDerivedPropsPath,
  "utf8",
);
const recordEditorSupportToolsReminderDerivedPropsTypesSource = fs.readFileSync(
  recordEditorSupportToolsReminderDerivedPropsTypesPath,
  "utf8",
);
const recordReminderFormSource = fs.readFileSync(recordReminderFormPath, "utf8");
const recordReminderFormTypesSource = fs.readFileSync(recordReminderFormTypesPath, "utf8");
const recordReminderFormFieldsSource = fs.readFileSync(recordReminderFormFieldsPath, "utf8");
const recordReminderFormFieldsTypesSource = fs.readFileSync(
  recordReminderFormFieldsTypesPath,
  "utf8",
);
const recordReminderFormActionsSource = fs.readFileSync(recordReminderFormActionsPath, "utf8");
const recordReminderFormActionsTypesSource = fs.readFileSync(
  recordReminderFormActionsTypesPath,
  "utf8",
);
const recordReminderListSource = fs.readFileSync(recordReminderListPath, "utf8");
const recordReminderListTypesSource = fs.readFileSync(recordReminderListTypesPath, "utf8");
const providerSettingsControllerActionsSource = fs.readFileSync(
  providerSettingsControllerActionsPath,
  "utf8",
);
const providerSettingsControllerActionsTypesSource = fs.readFileSync(
  providerSettingsControllerActionsTypesPath,
  "utf8",
);
const recordSearchPanelFilterFieldsSource = fs.readFileSync(
  recordSearchPanelFilterFieldsPath,
  "utf8",
);
const recordSearchPanelFilterFieldsTypesSource = fs.readFileSync(
  recordSearchPanelFilterFieldsTypesPath,
  "utf8",
);
const recordSearchPanelPresetControlsSource = fs.readFileSync(
  recordSearchPanelPresetControlsPath,
  "utf8",
);
const recordSearchPanelPresetControlsTypesSource = fs.readFileSync(
  recordSearchPanelPresetControlsTypesPath,
  "utf8",
);
const deadLetterRecoveryItemCardActionsSource = fs.readFileSync(
  deadLetterRecoveryItemCardActionsPath,
  "utf8",
);
const deadLetterRecoveryItemCardActionsTypesSource = fs.readFileSync(
  deadLetterRecoveryItemCardActionsTypesPath,
  "utf8",
);
const deadLetterRecoveryItemCardSource = fs.readFileSync(deadLetterRecoveryItemCardPath, "utf8");
const deadLetterRecoveryItemCardHeaderSource = fs.readFileSync(
  deadLetterRecoveryItemCardHeaderPath,
  "utf8",
);
const deadLetterRecoveryItemCardHeaderTypesSource = fs.readFileSync(
  deadLetterRecoveryItemCardHeaderTypesPath,
  "utf8",
);
const deadLetterRecoveryItemCardStatusSource = fs.readFileSync(
  deadLetterRecoveryItemCardStatusPath,
  "utf8",
);
const deadLetterRecoveryItemCardStatusTypesSource = fs.readFileSync(
  deadLetterRecoveryItemCardStatusTypesPath,
  "utf8",
);
const deadLetterRecoveryItemCardTagsSource = fs.readFileSync(
  deadLetterRecoveryItemCardTagsPath,
  "utf8",
);
const deadLetterRecoveryItemCardTagsTypesSource = fs.readFileSync(
  deadLetterRecoveryItemCardTagsTypesPath,
  "utf8",
);
const deadLetterRecoveryPanelContentSource = fs.readFileSync(
  deadLetterRecoveryPanelContentPath,
  "utf8",
);
const deadLetterRecoveryPanelContentTypesSource = fs.readFileSync(
  deadLetterRecoveryPanelContentTypesPath,
  "utf8",
);
const mediaStorageHealthCardSource = fs.readFileSync(mediaStorageHealthCardPath, "utf8");
const mediaStorageHealthCapabilitiesSource = fs.readFileSync(
  mediaStorageHealthCapabilitiesPath,
  "utf8",
);
const mediaStorageHealthCapabilitiesTypesSource = fs.readFileSync(
  mediaStorageHealthCapabilitiesTypesPath,
  "utf8",
);
const mediaStorageHealthHeaderSource = fs.readFileSync(mediaStorageHealthHeaderPath, "utf8");
const mediaStorageHealthHeaderTypesSource = fs.readFileSync(
  mediaStorageHealthHeaderTypesPath,
  "utf8",
);
const mediaStorageHealthMetadataSource = fs.readFileSync(mediaStorageHealthMetadataPath, "utf8");
const mediaStorageHealthMetadataTypesSource = fs.readFileSync(
  mediaStorageHealthMetadataTypesPath,
  "utf8",
);
const recordResultsListViewSource = fs.readFileSync(recordResultsListViewPath, "utf8");
const recordResultsListViewTypesSource = fs.readFileSync(
  recordResultsListViewTypesPath,
  "utf8",
);
const recordResultsTimelineViewSource = fs.readFileSync(
  recordResultsTimelineViewPath,
  "utf8",
);
const recordResultsTimelineViewTypesSource = fs.readFileSync(
  recordResultsTimelineViewTypesPath,
  "utf8",
);
const source = fs.readFileSync(recordPanelPath, "utf8");
const recordPanelHeaderSource = fs.readFileSync(recordPanelHeaderPath, "utf8");
const recordPanelHeaderTypesSource = fs.readFileSync(recordPanelHeaderTypesPath, "utf8");
const recordQuickAddBarSource = fs.readFileSync(recordQuickAddBarPath, "utf8");
const recordQuickAddBarHelpersSource = fs.readFileSync(recordQuickAddBarHelpersPath, "utf8");
const recordQuickAddPreviewSource = fs.readFileSync(recordQuickAddPreviewPath, "utf8");
const recordQuickAddPreviewTypesSource = fs.readFileSync(
  recordQuickAddPreviewTypesPath,
  "utf8",
);
const recordQuickAddBarHelpersTypesSource = fs.readFileSync(
  recordQuickAddBarHelpersTypesPath,
  "utf8",
);
const recordQuickAddBarTypesSource = fs.readFileSync(recordQuickAddBarTypesPath, "utf8");
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
const recordPanelDetailCopyTypesSource = fs.readFileSync(recordPanelDetailCopyTypesPath, "utf8");
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
const browseWorkspaceOutputPropsTypesSource = fs.readFileSync(
  recordPanelBrowseWorkspaceOutputPropsTypesPath,
  "utf8",
);
const browseWorkspaceCopyPropsSource = fs.readFileSync(
  recordPanelBrowseWorkspaceCopyPropsPath,
  "utf8",
);
const browseWorkspacePropsInputTypesSource = fs.readFileSync(
  recordPanelBrowseWorkspacePropsInputTypesPath,
  "utf8",
);
const editorWorkspaceCopyPropsSource = fs.readFileSync(
  recordPanelEditorWorkspaceCopyPropsPath,
  "utf8",
);
const editorWorkspaceCopyOutputPropsTypesSource = fs.readFileSync(
  recordPanelEditorWorkspaceCopyOutputPropsTypesPath,
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
const editorWorkspacePropsBuilderInputTypesSource = fs.readFileSync(
  recordPanelEditorWorkspacePropsBuilderInputTypesPath,
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
const editorWorkspaceActionPropsTypesSource = fs.readFileSync(
  recordPanelEditorWorkspaceActionPropsTypesPath,
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
const shellPropsTypesSource = fs.readFileSync(recordPanelShellPropsTypesPath, "utf8");
const shellViewPropsSource = fs.readFileSync(recordPanelShellViewPropsPath, "utf8");
const headerPropsSource = fs.readFileSync(recordPanelHeaderPropsPath, "utf8");
const headerPropsTypesSource = fs.readFileSync(recordPanelHeaderPropsTypesPath, "utf8");
const controllerOutputTypesSource = fs.readFileSync(recordPanelControllerOutputTypesPath, "utf8");
const controllerSource = fs.readFileSync(recordPanelControllerPath, "utf8");
const controllerSyncSource = fs.readFileSync(recordPanelControllerSyncPath, "utf8");
const controllerSyncTypesSource = fs.readFileSync(recordPanelControllerSyncTypesPath, "utf8");
const controllerSyncInputSource = fs.readFileSync(recordPanelControllerSyncInputPath, "utf8");
const controllerDeadLetterSyncSource = fs.readFileSync(
  recordPanelControllerDeadLetterSyncPath,
  "utf8",
);
const controllerDeadLetterSyncTypesSource = fs.readFileSync(
  recordPanelControllerDeadLetterSyncTypesPath,
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
const controllerFilterSyncTypesSource = fs.readFileSync(
  recordPanelControllerFilterSyncTypesPath,
  "utf8",
);
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
const controllerResultTypesSource = fs.readFileSync(
  recordPanelControllerResultTypesPath,
  "utf8",
);
const controllerHandlerGroupsResultTypesSource = fs.readFileSync(
  recordPanelControllerHandlerGroupsResultTypesPath,
  "utf8",
);
const controllerStateResultSource = fs.readFileSync(recordPanelControllerStateResultPath, "utf8");
const controllerStateResultTypesSource = fs.readFileSync(
  recordPanelControllerStateResultTypesPath,
  "utf8",
);
const controllerViewDataResultSource = fs.readFileSync(
  recordPanelControllerViewDataResultPath,
  "utf8",
);
const controllerViewDataResultTypesSource = fs.readFileSync(
  recordPanelControllerViewDataResultTypesPath,
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
const controllerViewDataTypesSource = fs.readFileSync(recordPanelControllerViewDataTypesPath, "utf8");
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
const controllerRecordViewDataTypesSource = fs.readFileSync(
  recordPanelControllerRecordViewDataTypesPath,
  "utf8",
);
const controllerSelectedRecordViewDataSource = fs.readFileSync(
  recordPanelControllerSelectedRecordViewDataPath,
  "utf8",
);
const controllerSelectedRecordViewDataTypesSource = fs.readFileSync(
  recordPanelControllerSelectedRecordViewDataTypesPath,
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
const filterApplyActionTypesSource = fs.readFileSync(
  recordPanelFilterApplyActionTypesPath,
  "utf8",
);
const controllerDetailCopyTypesSource = fs.readFileSync(
  recordPanelControllerDetailCopyTypesPath,
  "utf8",
);
const filterPresetActionsSource = fs.readFileSync(recordPanelFilterPresetActionsPath, "utf8");
const filterPresetActionInputTypesSource = fs.readFileSync(
  recordPanelFilterPresetActionInputTypesPath,
  "utf8",
);
const filterPresetSaveActionSource = fs.readFileSync(recordPanelFilterPresetSaveActionPath, "utf8");
const filterPresetSaveActionTypesSource = fs.readFileSync(
  recordPanelFilterPresetSaveActionTypesPath,
  "utf8",
);
const filterPresetDeleteActionSource = fs.readFileSync(
  recordPanelFilterPresetDeleteActionPath,
  "utf8",
);
const filterPresetDeleteActionTypesSource = fs.readFileSync(
  recordPanelFilterPresetDeleteActionTypesPath,
  "utf8",
);
const filterHelpersSource = fs.readFileSync(recordPanelFilterHelpersPath, "utf8");
const filterErrorHelpersSource = fs.readFileSync(recordPanelFilterErrorHelpersPath, "utf8");
const filterPresetNameSource = fs.readFileSync(recordPanelFilterPresetNamePath, "utf8");
const filterPresetNameTypesSource = fs.readFileSync(
  recordPanelFilterPresetNameTypesPath,
  "utf8",
);
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
const recordSaveSuccessHelpersTypesSource = fs.readFileSync(
  recordPanelRecordSaveSuccessHelpersTypesPath,
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
const recordLocationPayloadTypesSource = fs.readFileSync(
  recordPanelRecordLocationPayloadTypesPath,
  "utf8",
);
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
const reminderSuccessHelpersTypesSource = fs.readFileSync(
  recordPanelReminderSuccessHelpersTypesPath,
  "utf8",
);
const reminderHelpersSource = fs.readFileSync(recordPanelReminderHelpersPath, "utf8");
const reminderErrorHelpersSource = fs.readFileSync(recordPanelReminderErrorHelpersPath, "utf8");
const reminderResolutionSource = fs.readFileSync(recordPanelReminderResolutionPath, "utf8");
const reminderPayloadSource = fs.readFileSync(recordPanelReminderPayloadPath, "utf8");
const reminderPayloadTypesSource = fs.readFileSync(
  recordPanelReminderPayloadTypesPath,
  "utf8",
);
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
const mediaStatusRunnerTypesSource = fs.readFileSync(
  recordPanelMediaStatusRunnerTypesPath,
  "utf8",
);
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
const mediaDownloadTypesSource = fs.readFileSync(
  recordPanelMediaDownloadTypesPath,
  "utf8",
);
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
const recordPanelHeaderLines = recordPanelHeaderSource.split(/\r?\n/).length;
const recordPanelHeaderTypesLines = recordPanelHeaderTypesSource.split(/\r?\n/).length;
const recordQuickAddBarLines = recordQuickAddBarSource.split(/\r?\n/).length;
const recordQuickAddBarHelpersLines = recordQuickAddBarHelpersSource.split(/\r?\n/).length;
const recordQuickAddPreviewLines = recordQuickAddPreviewSource.split(/\r?\n/).length;
const recordQuickAddPreviewTypesLines = recordQuickAddPreviewTypesSource.split(/\r?\n/).length;
const recordQuickAddBarHelpersTypesLines = recordQuickAddBarHelpersTypesSource.split(/\r?\n/).length;
const recordQuickAddBarTypesLines = recordQuickAddBarTypesSource.split(/\r?\n/).length;
const legacyRecordPanelLines = legacyRecordPanelSource.split(/\r?\n/).length;
const legacyRecordPanelViewDataLines = legacyRecordPanelViewDataSource.split(/\r?\n/).length;
const legacyRecordPanelSyncLines = legacyRecordPanelSyncSource.split(/\r?\n/).length;
const legacyRecordPanelSyncTypesLines =
  legacyRecordPanelSyncTypesSource.split(/\r?\n/).length;
const legacyRecordPanelViewDataTypesLines =
  legacyRecordPanelViewDataTypesSource.split(/\r?\n/).length;
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
const legacyRecordPanelFormFieldsTypesLines =
  legacyRecordPanelFormFieldsTypesSource.split(/\r?\n/).length;
const legacyRecordPanelPrimaryFieldsLines =
  legacyRecordPanelPrimaryFieldsSource.split(/\r?\n/).length;
const legacyRecordPanelPrimaryFieldsTypesLines =
  legacyRecordPanelPrimaryFieldsTypesSource.split(/\r?\n/).length;
const legacyRecordPanelClassificationFieldsLines =
  legacyRecordPanelClassificationFieldsSource.split(/\r?\n/).length;
const legacyRecordPanelClassificationFieldsTypesLines =
  legacyRecordPanelClassificationFieldsTypesSource.split(/\r?\n/).length;
const legacyRecordPanelFormMediaLines = legacyRecordPanelFormMediaSource.split(/\r?\n/).length;
const legacyRecordPanelFormMediaTypesLines =
  legacyRecordPanelFormMediaTypesSource.split(/\r?\n/).length;
const legacyRecordPanelFormActionsLines =
  legacyRecordPanelFormActionsSource.split(/\r?\n/).length;
const legacyRecordPanelFormActionsTypesLines =
  legacyRecordPanelFormActionsTypesSource.split(/\r?\n/).length;
const legacyRecordPanelListLines = legacyRecordPanelListSource.split(/\r?\n/).length;
const legacyRecordPanelListTypesLines =
  legacyRecordPanelListTypesSource.split(/\r?\n/).length;
const legacyRecordPanelListItemLines = legacyRecordPanelListItemSource.split(/\r?\n/).length;
const legacyRecordPanelListEmptyLines = legacyRecordPanelListEmptySource.split(/\r?\n/).length;
const legacyRecordPanelStatsLines = legacyRecordPanelStatsSource.split(/\r?\n/).length;
const legacyRecordPanelStatsTypesLines =
  legacyRecordPanelStatsTypesSource.split(/\r?\n/).length;
const legacyRecordPanelStatsHeaderLines =
  legacyRecordPanelStatsHeaderSource.split(/\r?\n/).length;
const legacyRecordPanelStatsGridLines = legacyRecordPanelStatsGridSource.split(/\r?\n/).length;
const workspaceShellActionsResultTypesLines =
  workspaceShellActionsResultTypesSource.split(/\r?\n/).length;
const workspaceShellClientPropsTypesLines =
  workspaceShellClientPropsTypesSource.split(/\r?\n/).length;
const workspaceShellClientTypesLines = workspaceShellClientTypesSource.split(/\r?\n/).length;
const workspaceShellClientActionsInputTypesLines =
  workspaceShellClientActionsInputTypesSource.split(/\r?\n/).length;
const workspaceShellClientRefreshersInputTypesLines =
  workspaceShellClientRefreshersInputTypesSource.split(/\r?\n/).length;
const workspaceShellClientEffectsInputTypesLines =
  workspaceShellClientEffectsInputTypesSource.split(/\r?\n/).length;
const workspaceShellClientPanelsPropsTypesLines =
  workspaceShellClientPanelsPropsTypesSource.split(/\r?\n/).length;
const workspaceShellConversationStateLoadTypesLines =
  workspaceShellConversationStateLoadTypesSource.split(/\r?\n/).length;
const workspaceShellManagedStateLoadTypesLines =
  workspaceShellManagedStateLoadTypesSource.split(/\r?\n/).length;
const workspaceShellInitialFollowUpTypesLines =
  workspaceShellInitialFollowUpTypesSource.split(/\r?\n/).length;
const workspaceShellInitialLoadHelpersTypesLines =
  workspaceShellInitialLoadHelpersTypesSource.split(/\r?\n/).length;
const workspaceShellInitialBootstrapTypesLines =
  workspaceShellInitialBootstrapTypesSource.split(/\r?\n/).length;
const useWorkspaceShellNotificationEffectTypesLines =
  useWorkspaceShellNotificationEffectTypesSource.split(/\r?\n/).length;
const useWorkspaceShellSelectionEffectsTypesLines =
  useWorkspaceShellSelectionEffectsTypesSource.split(/\r?\n/).length;
const workspaceShellRecordFilterActionsTypesLines =
  workspaceShellRecordFilterActionsTypesSource.split(/\r?\n/).length;
const workspaceShellFrameTypesLines = workspaceShellFrameTypesSource.split(/\r?\n/).length;
const workspaceShellRefreshersResultTypesLines =
  workspaceShellRefreshersResultTypesSource.split(/\r?\n/).length;
const workspaceShellRouterTypesLines = workspaceShellRouterTypesSource.split(/\r?\n/).length;
const workspaceShellStateResultTypesLines =
  workspaceShellStateResultTypesSource.split(/\r?\n/).length;
const mediaAssetSectionTypesLines = mediaAssetSectionTypesSource.split(/\r?\n/).length;
const mediaAssetSectionSummaryLines = mediaAssetSectionSummarySource.split(/\r?\n/).length;
const mediaAssetSectionSummaryTypesLines =
  mediaAssetSectionSummaryTypesSource.split(/\r?\n/).length;
const mediaAssetSectionEmptyLines = mediaAssetSectionEmptySource.split(/\r?\n/).length;
const mediaAssetSectionEmptyTypesLines =
  mediaAssetSectionEmptyTypesSource.split(/\r?\n/).length;
const mediaAssetCardLines = mediaAssetCardSource.split(/\r?\n/).length;
const mediaAssetCardIntroLines = mediaAssetCardIntroSource.split(/\r?\n/).length;
const mediaAssetCardIntroTypesLines = mediaAssetCardIntroTypesSource.split(/\r?\n/).length;
const mediaAssetCardExtractedTextLines =
  mediaAssetCardExtractedTextSource.split(/\r?\n/).length;
const mediaAssetCardExtractedTextTypesLines =
  mediaAssetCardExtractedTextTypesSource.split(/\r?\n/).length;
const mediaAssetCardPreviewLines = mediaAssetCardPreviewSource.split(/\r?\n/).length;
const mediaAssetCardPreviewTypesLines =
  mediaAssetCardPreviewTypesSource.split(/\r?\n/).length;
const mediaAssetCardErrorLines = mediaAssetCardErrorSource.split(/\r?\n/).length;
const mediaAssetCardErrorTypesLines = mediaAssetCardErrorTypesSource.split(/\r?\n/).length;
const mediaAssetCardActionsTypesLines =
  mediaAssetCardActionsTypesSource.split(/\r?\n/).length;
const mediaStorageOverviewTypesLines = mediaStorageOverviewTypesSource.split(/\r?\n/).length;
const mediaStorageOverviewSummaryLines =
  mediaStorageOverviewSummarySource.split(/\r?\n/).length;
const mediaStorageOverviewSummaryTypesLines =
  mediaStorageOverviewSummaryTypesSource.split(/\r?\n/).length;
const mediaStorageOverviewUsageGridLines =
  mediaStorageOverviewUsageGridSource.split(/\r?\n/).length;
const mediaStorageOverviewUsageGridTypesLines =
  mediaStorageOverviewUsageGridTypesSource.split(/\r?\n/).length;
const mediaStorageOverviewProcessingGridLines =
  mediaStorageOverviewProcessingGridSource.split(/\r?\n/).length;
const mediaStorageOverviewProcessingGridTypesLines =
  mediaStorageOverviewProcessingGridTypesSource.split(/\r?\n/).length;
const mediaStorageOverviewProviderTagsLines =
  mediaStorageOverviewProviderTagsSource.split(/\r?\n/).length;
const mediaStorageOverviewProviderTagsTypesLines =
  mediaStorageOverviewProviderTagsTypesSource.split(/\r?\n/).length;
const recordMediaProcessingPanelsTypesLines =
  recordMediaProcessingPanelsTypesSource.split(/\r?\n/).length;
const recordMediaSelectedContentPropsLines =
  recordMediaSelectedContentPropsSource.split(/\r?\n/).length;
const recordEditorWorkspaceMainSectionsPropsTypesLines =
  recordEditorWorkspaceMainSectionsPropsTypesSource.split(/\r?\n/).length;
const recordReminderToolsPanelPropsTypesLines =
  recordReminderToolsPanelPropsTypesSource.split(/\r?\n/).length;
const mapPanelContentTypesLines = mapPanelContentTypesSource.split(/\r?\n/).length;
const mapDrilldownCardLines = mapDrilldownCardSource.split(/\r?\n/).length;
const mapDrilldownCardTypesLines = mapDrilldownCardTypesSource.split(/\r?\n/).length;
const mapDrilldownCardActionsLines = mapDrilldownCardActionsSource.split(/\r?\n/).length;
const mapDrilldownCardActionsTypesLines =
  mapDrilldownCardActionsTypesSource.split(/\r?\n/).length;
const mapDrilldownCardIntroLines = mapDrilldownCardIntroSource.split(/\r?\n/).length;
const mapDrilldownCardIntroTypesLines =
  mapDrilldownCardIntroTypesSource.split(/\r?\n/).length;
const mapDrilldownCardFieldsLines = mapDrilldownCardFieldsSource.split(/\r?\n/).length;
const mapDrilldownCardFieldsTypesLines =
  mapDrilldownCardFieldsTypesSource.split(/\r?\n/).length;
const mapStatusNoticesTypesLines = mapStatusNoticesTypesSource.split(/\r?\n/).length;
const mapPanelHeaderTypesLines = mapPanelHeaderTypesSource.split(/\r?\n/).length;
const mappedRecordsListTypesLines = mappedRecordsListTypesSource.split(/\r?\n/).length;
const mapSearchFormTypesLines = mapSearchFormTypesSource.split(/\r?\n/).length;
const mapPanelControllerResultTypesLines =
  mapPanelControllerResultTypesSource.split(/\r?\n/).length;
const mapPanelControllerTypesLines = mapPanelControllerTypesSource.split(/\r?\n/).length;
const mapPanelControllerActionsTypesLines =
  mapPanelControllerActionsTypesSource.split(/\r?\n/).length;
const mapPanelControllerSearchTypesLines =
  mapPanelControllerSearchTypesSource.split(/\r?\n/).length;
const useMapPanelDerivedDataTypesLines =
  useMapPanelDerivedDataTypesSource.split(/\r?\n/).length;
const useMapPanelSyncTypesLines = useMapPanelSyncTypesSource.split(/\r?\n/).length;
const useMapPanelAmapInitTypesLines = useMapPanelAmapInitTypesSource.split(/\r?\n/).length;
const useMapPanelAmapMarkersTypesLines =
  useMapPanelAmapMarkersTypesSource.split(/\r?\n/).length;
const providerSettingsPanelHelpersTypesLines =
  providerSettingsPanelHelpersTypesSource.split(/\r?\n/).length;
const useProviderSettingsDraftSyncTypesLines =
  useProviderSettingsDraftSyncTypesSource.split(/\r?\n/).length;
const workspaceTransferJobCardTypesLines =
  workspaceTransferJobCardTypesSource.split(/\r?\n/).length;
const workspaceTransferJobsListTypesLines =
  workspaceTransferJobsListTypesSource.split(/\r?\n/).length;
const workspaceEntryJobActionsTypesLines =
  workspaceEntryJobActionsTypesSource.split(/\r?\n/).length;
const workspaceExportCardLines = workspaceExportCardSource.split(/\r?\n/).length;
const workspaceExportContentLines = workspaceExportContentSource.split(/\r?\n/).length;
const workspaceExportContentTypesLines =
  workspaceExportContentTypesSource.split(/\r?\n/).length;
const workspaceExportSummaryLines = workspaceExportSummarySource.split(/\r?\n/).length;
const workspaceExportSummaryTypesLines =
  workspaceExportSummaryTypesSource.split(/\r?\n/).length;
const workspaceExportControlsLines = workspaceExportControlsSource.split(/\r?\n/).length;
const workspaceExportControlsActionLines =
  workspaceExportControlsActionSource.split(/\r?\n/).length;
const workspaceExportControlsActionTypesLines =
  workspaceExportControlsActionTypesSource.split(/\r?\n/).length;
const workspaceExportControlsStatusLines =
  workspaceExportControlsStatusSource.split(/\r?\n/).length;
const workspaceExportControlsStatusTypesLines =
  workspaceExportControlsStatusTypesSource.split(/\r?\n/).length;
const workspaceExportCardTypesLines = workspaceExportCardTypesSource.split(/\r?\n/).length;
const workspaceExportControlsTypesLines =
  workspaceExportControlsTypesSource.split(/\r?\n/).length;
const workspaceExportControllerTypesLines =
  workspaceExportControllerTypesSource.split(/\r?\n/).length;
const workspaceExportJobsActionsTypesLines =
  workspaceExportJobsActionsTypesSource.split(/\r?\n/).length;
const workspaceExportJobsCardLines = workspaceExportJobsCardSource.split(/\r?\n/).length;
const workspaceExportJobsContentLines =
  workspaceExportJobsContentSource.split(/\r?\n/).length;
const workspaceExportJobsContentTypesLines =
  workspaceExportJobsContentTypesSource.split(/\r?\n/).length;
const workspaceExportJobsCardTypesLines =
  workspaceExportJobsCardTypesSource.split(/\r?\n/).length;
const workspaceExportJobsListLines = workspaceExportJobsListSource.split(/\r?\n/).length;
const workspaceExportJobsEmptyStateLines =
  workspaceExportJobsEmptyStateSource.split(/\r?\n/).length;
const workspaceExportJobsEmptyStateTypesLines =
  workspaceExportJobsEmptyStateTypesSource.split(/\r?\n/).length;
const workspaceExportJobsHeaderLines =
  workspaceExportJobsHeaderSource.split(/\r?\n/).length;
const workspaceExportJobsHeaderIntroLines =
  workspaceExportJobsHeaderIntroSource.split(/\r?\n/).length;
const workspaceExportJobsHeaderIntroTypesLines =
  workspaceExportJobsHeaderIntroTypesSource.split(/\r?\n/).length;
const workspaceExportJobsHeaderActionsLines =
  workspaceExportJobsHeaderActionsSource.split(/\r?\n/).length;
const workspaceExportJobsHeaderActionsTypesLines =
  workspaceExportJobsHeaderActionsTypesSource.split(/\r?\n/).length;
const workspaceExportJobsHeaderTypesLines =
  workspaceExportJobsHeaderTypesSource.split(/\r?\n/).length;
const workspaceExportJobsNoticesLines =
  workspaceExportJobsNoticesSource.split(/\r?\n/).length;
const workspaceExportJobsNoticesTypesLines =
  workspaceExportJobsNoticesTypesSource.split(/\r?\n/).length;
const workspaceExportJobsListItemLines =
  workspaceExportJobsListItemSource.split(/\r?\n/).length;
const workspaceExportJobsListItemActionLines =
  workspaceExportJobsListItemActionSource.split(/\r?\n/).length;
const workspaceExportJobsListItemActionTypesLines =
  workspaceExportJobsListItemActionTypesSource.split(/\r?\n/).length;
const workspaceExportJobsListItemErrorLines =
  workspaceExportJobsListItemErrorSource.split(/\r?\n/).length;
const workspaceExportJobsListItemErrorTypesLines =
  workspaceExportJobsListItemErrorTypesSource.split(/\r?\n/).length;
const workspaceExportJobsListItemSummaryLines =
  workspaceExportJobsListItemSummarySource.split(/\r?\n/).length;
const workspaceExportJobsListItemSummaryTypesLines =
  workspaceExportJobsListItemSummaryTypesSource.split(/\r?\n/).length;
const workspaceExportJobsListItemTypesLines =
  workspaceExportJobsListItemTypesSource.split(/\r?\n/).length;
const workspaceExportJobsListTypesLines =
  workspaceExportJobsListTypesSource.split(/\r?\n/).length;
const workspaceExportJobsControllerTypesLines =
  workspaceExportJobsControllerTypesSource.split(/\r?\n/).length;
const workspaceSettingsOverviewCardLines =
  workspaceSettingsOverviewCardSource.split(/\r?\n/).length;
const workspaceSettingsOverviewSummaryLines =
  workspaceSettingsOverviewSummarySource.split(/\r?\n/).length;
const workspaceSettingsOverviewSummaryTypesLines =
  workspaceSettingsOverviewSummaryTypesSource.split(/\r?\n/).length;
const workspaceSettingsOverviewDetailsLines =
  workspaceSettingsOverviewDetailsSource.split(/\r?\n/).length;
const workspaceSettingsOverviewDetailsTypesLines =
  workspaceSettingsOverviewDetailsTypesSource.split(/\r?\n/).length;
const workspaceSettingsHeaderLines = workspaceSettingsHeaderSource.split(/\r?\n/).length;
const workspaceSettingsHeaderTypesLines =
  workspaceSettingsHeaderTypesSource.split(/\r?\n/).length;
const workspaceSettingsHeaderIntroLines =
  workspaceSettingsHeaderIntroSource.split(/\r?\n/).length;
const workspaceSettingsHeaderIntroTypesLines =
  workspaceSettingsHeaderIntroTypesSource.split(/\r?\n/).length;
const workspaceSettingsHeaderActionsLines =
  workspaceSettingsHeaderActionsSource.split(/\r?\n/).length;
const workspaceSettingsHeaderActionsTypesLines =
  workspaceSettingsHeaderActionsTypesSource.split(/\r?\n/).length;
const workspaceSettingsOverviewCardTypesLines =
  workspaceSettingsOverviewCardTypesSource.split(/\r?\n/).length;
const workspaceMembersSectionLines = workspaceMembersSectionSource.split(/\r?\n/).length;
const workspaceMembersSectionIntroLines =
  workspaceMembersSectionIntroSource.split(/\r?\n/).length;
const workspaceMembersSectionIntroTypesLines =
  workspaceMembersSectionIntroTypesSource.split(/\r?\n/).length;
const workspaceMembersSectionListLines = workspaceMembersSectionListSource.split(/\r?\n/).length;
const workspaceMembersSectionListTypesLines =
  workspaceMembersSectionListTypesSource.split(/\r?\n/).length;
const workspaceMembersSectionTypesLines =
  workspaceMembersSectionTypesSource.split(/\r?\n/).length;
const workspaceMembersSectionItemLines =
  workspaceMembersSectionItemSource.split(/\r?\n/).length;
const workspaceMembersSectionItemSummaryLines =
  workspaceMembersSectionItemSummarySource.split(/\r?\n/).length;
const workspaceMembersSectionItemSummaryTypesLines =
  workspaceMembersSectionItemSummaryTypesSource.split(/\r?\n/).length;
const workspaceMembersSectionItemControlsLines =
  workspaceMembersSectionItemControlsSource.split(/\r?\n/).length;
const workspaceMembersSectionItemControlsTypesLines =
  workspaceMembersSectionItemControlsTypesSource.split(/\r?\n/).length;
const workspaceMembersSectionItemTypesLines =
  workspaceMembersSectionItemTypesSource.split(/\r?\n/).length;
const workspaceMediaRetentionCardLines =
  workspaceMediaRetentionCardSource.split(/\r?\n/).length;
const workspaceMediaRetentionContentLines =
  workspaceMediaRetentionContentSource.split(/\r?\n/).length;
const workspaceMediaRetentionContentTypesLines =
  workspaceMediaRetentionContentTypesSource.split(/\r?\n/).length;
const workspaceMediaRetentionCardTypesLines =
  workspaceMediaRetentionCardTypesSource.split(/\r?\n/).length;
const workspaceMediaRetentionActionsLines =
  workspaceMediaRetentionActionsSource.split(/\r?\n/).length;
const workspaceMediaRetentionActionsContentLines =
  workspaceMediaRetentionActionsContentSource.split(/\r?\n/).length;
const workspaceMediaRetentionActionsContentTypesLines =
  workspaceMediaRetentionActionsContentTypesSource.split(/\r?\n/).length;
const workspaceMediaRetentionActionsTypesLines =
  workspaceMediaRetentionActionsTypesSource.split(/\r?\n/).length;
const workspaceMediaRetentionOwnerActionsLines =
  workspaceMediaRetentionOwnerActionsSource.split(/\r?\n/).length;
const workspaceMediaRetentionOwnerActionsSummaryLines =
  workspaceMediaRetentionOwnerActionsSummarySource.split(/\r?\n/).length;
const workspaceMediaRetentionOwnerActionsSummaryTypesLines =
  workspaceMediaRetentionOwnerActionsSummaryTypesSource.split(/\r?\n/).length;
const workspaceMediaRetentionOwnerActionsButtonsLines =
  workspaceMediaRetentionOwnerActionsButtonsSource.split(/\r?\n/).length;
const workspaceMediaRetentionOwnerActionsButtonsTypesLines =
  workspaceMediaRetentionOwnerActionsButtonsTypesSource.split(/\r?\n/).length;
const workspaceMediaRetentionOwnerActionsTypesLines =
  workspaceMediaRetentionOwnerActionsTypesSource.split(/\r?\n/).length;
const workspaceMediaRetentionEditorNoticeLines =
  workspaceMediaRetentionEditorNoticeSource.split(/\r?\n/).length;
const workspaceMediaRetentionEditorNoticeTypesLines =
  workspaceMediaRetentionEditorNoticeTypesSource.split(/\r?\n/).length;
const workspaceMediaRetentionSelectionActionsTypesLines =
  workspaceMediaRetentionSelectionActionsTypesSource.split(/\r?\n/).length;
const useWorkspaceMediaRetentionReportTypesLines =
  useWorkspaceMediaRetentionReportTypesSource.split(/\r?\n/).length;
const workspaceMediaRetentionControllerActionsTypesLines =
  workspaceMediaRetentionControllerActionsTypesSource.split(/\r?\n/).length;
const workspaceMediaRetentionExecutionActionsTypesLines =
  workspaceMediaRetentionExecutionActionsTypesSource.split(/\r?\n/).length;
const workspaceMediaRetentionCardActionHelpersTypesLines =
  workspaceMediaRetentionCardActionHelpersTypesSource.split(/\r?\n/).length;
const workspaceMediaRetentionCardCopyHelpersTypesLines =
  workspaceMediaRetentionCardCopyHelpersTypesSource.split(/\r?\n/).length;
const workspaceMediaRetentionHeaderLines =
  workspaceMediaRetentionHeaderSource.split(/\r?\n/).length;
const workspaceMediaRetentionHeaderIntroLines =
  workspaceMediaRetentionHeaderIntroSource.split(/\r?\n/).length;
const workspaceMediaRetentionHeaderIntroTypesLines =
  workspaceMediaRetentionHeaderIntroTypesSource.split(/\r?\n/).length;
const workspaceMediaRetentionHeaderControlsLines =
  workspaceMediaRetentionHeaderControlsSource.split(/\r?\n/).length;
const workspaceMediaRetentionHeaderControlsTypesLines =
  workspaceMediaRetentionHeaderControlsTypesSource.split(/\r?\n/).length;
const workspaceMediaRetentionHeaderTypesLines =
  workspaceMediaRetentionHeaderTypesSource.split(/\r?\n/).length;
const workspaceMediaRetentionListsLines =
  workspaceMediaRetentionListsSource.split(/\r?\n/).length;
const workspaceMediaRetentionLargestListLines =
  workspaceMediaRetentionLargestListSource.split(/\r?\n/).length;
const workspaceMediaRetentionLargestListTypesLines =
  workspaceMediaRetentionLargestListTypesSource.split(/\r?\n/).length;
const workspaceMediaRetentionCandidatesListLines =
  workspaceMediaRetentionCandidatesListSource.split(/\r?\n/).length;
const workspaceMediaRetentionCandidatesListTypesLines =
  workspaceMediaRetentionCandidatesListTypesSource.split(/\r?\n/).length;
const workspaceMediaRetentionListsTypesLines =
  workspaceMediaRetentionListsTypesSource.split(/\r?\n/).length;
const workspaceMediaRetentionNoticesTypesLines =
  workspaceMediaRetentionNoticesTypesSource.split(/\r?\n/).length;
const workspaceMediaRetentionSummaryLines =
  workspaceMediaRetentionSummarySource.split(/\r?\n/).length;
const workspaceMediaRetentionSummaryGridLines =
  workspaceMediaRetentionSummaryGridSource.split(/\r?\n/).length;
const workspaceMediaRetentionSummaryGridTypesLines =
  workspaceMediaRetentionSummaryGridTypesSource.split(/\r?\n/).length;
const workspaceMediaRetentionSummaryNoteLines =
  workspaceMediaRetentionSummaryNoteSource.split(/\r?\n/).length;
const workspaceMediaRetentionSummaryNoteTypesLines =
  workspaceMediaRetentionSummaryNoteTypesSource.split(/\r?\n/).length;
const workspaceMediaRetentionSummaryTypesLines =
  workspaceMediaRetentionSummaryTypesSource.split(/\r?\n/).length;
const mediaRetentionItemCardTypesLines = mediaRetentionItemCardTypesSource.split(/\r?\n/).length;
const providerFeatureCardActionsTypesLines =
  providerFeatureCardActionsTypesSource.split(/\r?\n/).length;
const providerFeatureCardFieldsLines =
  providerFeatureCardFieldsSource.split(/\r?\n/).length;
const providerFeatureCardFieldsTypesLines =
  providerFeatureCardFieldsTypesSource.split(/\r?\n/).length;
const providerFeatureCardEnabledToggleLines =
  providerFeatureCardEnabledToggleSource.split(/\r?\n/).length;
const providerFeatureCardEnabledToggleTypesLines =
  providerFeatureCardEnabledToggleTypesSource.split(/\r?\n/).length;
const providerFeatureCardCoreFieldsLines =
  providerFeatureCardCoreFieldsSource.split(/\r?\n/).length;
const providerFeatureCardCoreFieldsTypesLines =
  providerFeatureCardCoreFieldsTypesSource.split(/\r?\n/).length;
const providerFeatureMediaStorageOptionsTypesLines =
  providerFeatureMediaStorageOptionsTypesSource.split(/\r?\n/).length;
const providerFeatureMediaStorageOptionTogglesLines =
  providerFeatureMediaStorageOptionTogglesSource.split(/\r?\n/).length;
const providerFeatureMediaStorageOptionTogglesTypesLines =
  providerFeatureMediaStorageOptionTogglesTypesSource.split(/\r?\n/).length;
const providerFeatureMediaStorageRetryFieldsLines =
  providerFeatureMediaStorageRetryFieldsSource.split(/\r?\n/).length;
const providerFeatureMediaStorageRetryFieldsTypesLines =
  providerFeatureMediaStorageRetryFieldsTypesSource.split(/\r?\n/).length;
const providerFeatureMediaStorageOptionsHelpersLines =
  providerFeatureMediaStorageOptionsHelpersSource.split(/\r?\n/).length;
const providerFeatureMediaStorageOptionsHelpersTypesLines =
  providerFeatureMediaStorageOptionsHelpersTypesSource.split(/\r?\n/).length;
const providerSettingsFeatureListTypesLines =
  providerSettingsFeatureListTypesSource.split(/\r?\n/).length;
const providerSettingsJumpNavTypesLines =
  providerSettingsJumpNavTypesSource.split(/\r?\n/).length;
const workspaceSettingsLoadingShellTypesLines =
  workspaceSettingsLoadingShellTypesSource.split(/\r?\n/).length;
const useWorkspaceSettingsAnchorTypesLines =
  useWorkspaceSettingsAnchorTypesSource.split(/\r?\n/).length;
const useWorkspaceSettingsLoadTypesLines =
  useWorkspaceSettingsLoadTypesSource.split(/\r?\n/).length;
const workspaceSettingsActionsTypesLines =
  workspaceSettingsActionsTypesSource.split(/\r?\n/).length;
const workspaceSettingsMemberActionsTypesLines =
  workspaceSettingsMemberActionsTypesSource.split(/\r?\n/).length;
const workspaceSettingsProviderActionsTypesLines =
  workspaceSettingsProviderActionsTypesSource.split(/\r?\n/).length;
const providerSettingsControllerActionsTypesLines =
  providerSettingsControllerActionsTypesSource.split(/\r?\n/).length;
const chatPanelActionDerivedDataResultTypesLines =
  chatPanelActionDerivedDataResultTypesSource.split(/\r?\n/).length;
const chatPanelActionHandlerInputsTypesLines =
  chatPanelActionHandlerInputsTypesSource.split(/\r?\n/).length;
const chatPanelActionHelpersTypesLines = chatPanelActionHelpersTypesSource.split(/\r?\n/).length;
const chatPanelOperatorHandlersTypesLines =
  chatPanelOperatorHandlersTypesSource.split(/\r?\n/).length;
const chatPanelActionStateResultTypesLines =
  chatPanelActionStateResultTypesSource.split(/\r?\n/).length;
const chatPanelActionsResultTypesLines =
  chatPanelActionsResultTypesSource.split(/\r?\n/).length;
const chatPanelShareHandlersTypesLines = chatPanelShareHandlersTypesSource.split(/\r?\n/).length;
const chatPanelContentPropsTypesLines = chatPanelContentPropsTypesSource.split(/\r?\n/).length;
const useChatPanelActionDerivedDataTypesLines =
  useChatPanelActionDerivedDataTypesSource.split(/\r?\n/).length;
const chatMessageThreadTypesLines = chatMessageThreadTypesSource.split(/\r?\n/).length;
const chatPanelHeaderTypesLines = chatPanelHeaderTypesSource.split(/\r?\n/).length;
const chatPanelComposerTypesLines = chatPanelComposerTypesSource.split(/\r?\n/).length;
const chatConversationBarTypesLines = chatConversationBarTypesSource.split(/\r?\n/).length;
const chatMessageSourcesTypesLines = chatMessageSourcesTypesSource.split(/\r?\n/).length;
const chatAuditLogsCardTypesLines = chatAuditLogsCardTypesSource.split(/\r?\n/).length;
const chatKnowledgeCardTypesLines = chatKnowledgeCardTypesSource.split(/\r?\n/).length;
const chatNotificationsCardTypesLines = chatNotificationsCardTypesSource.split(/\r?\n/).length;
const chatShareLinksCardTypesLines = chatShareLinksCardTypesSource.split(/\r?\n/).length;
const chatShareLinksCreateFormLines =
  chatShareLinksCreateFormSource.split(/\r?\n/).length;
const chatShareLinksCreateFormTypesLines =
  chatShareLinksCreateFormTypesSource.split(/\r?\n/).length;
const chatShareLinkListItemLines = chatShareLinkListItemSource.split(/\r?\n/).length;
const chatShareLinkListItemTypesLines =
  chatShareLinkListItemTypesSource.split(/\r?\n/).length;
const authFormFrameTypesLines = authFormFrameTypesSource.split(/\r?\n/).length;
const mediaAssetCardMetadataTypesLines = mediaAssetCardMetadataTypesSource.split(/\r?\n/).length;
const mediaAssetCardMetadataDetailsLines =
  mediaAssetCardMetadataDetailsSource.split(/\r?\n/).length;
const mediaAssetCardMetadataDetailsTypesLines =
  mediaAssetCardMetadataDetailsTypesSource.split(/\r?\n/).length;
const mediaAssetCardMetadataTagsLines = mediaAssetCardMetadataTagsSource.split(/\r?\n/).length;
const mediaAssetCardMetadataTagsTypesLines =
  mediaAssetCardMetadataTagsTypesSource.split(/\r?\n/).length;
const sharePreviewClientTypesLines = sharePreviewClientTypesSource.split(/\r?\n/).length;
const workspaceEntryLoadingShellTypesLines =
  workspaceEntryLoadingShellTypesSource.split(/\r?\n/).length;
const languageSwitcherTypesLines = languageSwitcherTypesSource.split(/\r?\n/).length;
const workspaceEntryHeaderTypesLines = workspaceEntryHeaderTypesSource.split(/\r?\n/).length;
const workspaceCreateSectionTypesLines = workspaceCreateSectionTypesSource.split(/\r?\n/).length;
const workspaceJoinSectionTypesLines = workspaceJoinSectionTypesSource.split(/\r?\n/).length;
const workspaceImportSectionTypesLines = workspaceImportSectionTypesSource.split(/\r?\n/).length;
const workspaceListSectionTypesLines = workspaceListSectionTypesSource.split(/\r?\n/).length;
const useWorkspaceEntryControllerDerivedDataTypesLines =
  useWorkspaceEntryControllerDerivedDataTypesSource.split(/\r?\n/).length;
const useWorkspaceEntryLoadTypesLines = useWorkspaceEntryLoadTypesSource.split(/\r?\n/).length;
const workspaceEntryControllerActionsTypesLines =
  workspaceEntryControllerActionsTypesSource.split(/\r?\n/).length;
const workspaceEntryCreateActionsTypesLines =
  workspaceEntryCreateActionsTypesSource.split(/\r?\n/).length;
const workspaceEntryImportActionsTypesLines =
  workspaceEntryImportActionsTypesSource.split(/\r?\n/).length;
const workspaceEntryWorkspaceActionsTypesLines =
  workspaceEntryWorkspaceActionsTypesSource.split(/\r?\n/).length;
const workspaceEntryShareActionsTypesLines =
  workspaceEntryShareActionsTypesSource.split(/\r?\n/).length;
const recordSummaryCardTypesLines = recordSummaryCardTypesSource.split(/\r?\n/).length;
const recordResultsViewSwitcherTypesLines =
  recordResultsViewSwitcherTypesSource.split(/\r?\n/).length;
const searchPresetListTypesLines = searchPresetListTypesSource.split(/\r?\n/).length;
const recordSearchPanelFilterFieldsTypesLines =
  recordSearchPanelFilterFieldsTypesSource.split(/\r?\n/).length;
const recordSearchPanelPresetControlsTypesLines =
  recordSearchPanelPresetControlsTypesSource.split(/\r?\n/).length;
const recordPanelStatsTypesLines = recordPanelStatsTypesSource.split(/\r?\n/).length;
const deadLetterRecoverySummaryTypesLines =
  deadLetterRecoverySummaryTypesSource.split(/\r?\n/).length;
const deadLetterRecoverySummaryActionsTypesLines =
  deadLetterRecoverySummaryActionsTypesSource.split(/\r?\n/).length;
const deadLetterRecoverySummaryStatsTypesLines =
  deadLetterRecoverySummaryStatsTypesSource.split(/\r?\n/).length;
const locationReviewPanelLines = locationReviewPanelSource.split(/\r?\n/).length;
const locationReviewIntroLines = locationReviewIntroSource.split(/\r?\n/).length;
const locationReviewIntroTypesLines = locationReviewIntroTypesSource.split(/\r?\n/).length;
const locationReviewActionsLines = locationReviewActionsSource.split(/\r?\n/).length;
const locationReviewActionsTypesLines =
  locationReviewActionsTypesSource.split(/\r?\n/).length;
const locationReviewFormFieldsLines =
  locationReviewFormFieldsSource.split(/\r?\n/).length;
const locationReviewFormFieldsTypesLines =
  locationReviewFormFieldsTypesSource.split(/\r?\n/).length;
const locationReviewHistoryListTypesLines =
  locationReviewHistoryListTypesSource.split(/\r?\n/).length;
const locationReviewStatusSummaryTypesLines =
  locationReviewStatusSummaryTypesSource.split(/\r?\n/).length;
const recentMediaIssueCardLines = recentMediaIssueCardSource.split(/\r?\n/).length;
const recentMediaIssueCardIntroLines = recentMediaIssueCardIntroSource.split(/\r?\n/).length;
const recentMediaIssueCardIntroTypesLines =
  recentMediaIssueCardIntroTypesSource.split(/\r?\n/).length;
const recentMediaIssueCardErrorLines = recentMediaIssueCardErrorSource.split(/\r?\n/).length;
const recentMediaIssueCardErrorTypesLines =
  recentMediaIssueCardErrorTypesSource.split(/\r?\n/).length;
const recentMediaIssueCardMetadataLines =
  recentMediaIssueCardMetadataSource.split(/\r?\n/).length;
const recentMediaIssueCardMetadataTypesLines =
  recentMediaIssueCardMetadataTypesSource.split(/\r?\n/).length;
const recentMediaIssueCardActionsTypesLines =
  recentMediaIssueCardActionsTypesSource.split(/\r?\n/).length;
const recentMediaIssueCardTagsTypesLines =
  recentMediaIssueCardTagsTypesSource.split(/\r?\n/).length;
const mediaPreviewContentTypesLines = mediaPreviewContentTypesSource.split(/\r?\n/).length;
const providerFeatureCardStatusTypesLines =
  providerFeatureCardStatusTypesSource.split(/\r?\n/).length;
const recordEditorLocationFieldsTypesLines =
  recordEditorLocationFieldsTypesSource.split(/\r?\n/).length;
const recordEditorPrimaryFieldsTypesLines =
  recordEditorPrimaryFieldsTypesSource.split(/\r?\n/).length;
const recordEditorMetadataFieldsTypesLines =
  recordEditorMetadataFieldsTypesSource.split(/\r?\n/).length;
const recordMediaToolsActionsTypesLines =
  recordMediaToolsActionsTypesSource.split(/\r?\n/).length;
const recordEditorSupportToolsMediaCopyPropsTypesLines =
  recordEditorSupportToolsMediaCopyPropsTypesSource.split(/\r?\n/).length;
const recordEditorSupportToolsReminderDerivedPropsTypesLines =
  recordEditorSupportToolsReminderDerivedPropsTypesSource.split(/\r?\n/).length;
const recordReminderFormLines = recordReminderFormSource.split(/\r?\n/).length;
const recordReminderFormTypesLines = recordReminderFormTypesSource.split(/\r?\n/).length;
const recordReminderFormFieldsLines = recordReminderFormFieldsSource.split(/\r?\n/).length;
const recordReminderFormFieldsTypesLines =
  recordReminderFormFieldsTypesSource.split(/\r?\n/).length;
const recordReminderFormActionsLines = recordReminderFormActionsSource.split(/\r?\n/).length;
const recordReminderFormActionsTypesLines =
  recordReminderFormActionsTypesSource.split(/\r?\n/).length;
const recordReminderListTypesLines = recordReminderListTypesSource.split(/\r?\n/).length;
const deadLetterRecoveryItemCardLines = deadLetterRecoveryItemCardSource.split(/\r?\n/).length;
const deadLetterRecoveryItemCardActionsTypesLines =
  deadLetterRecoveryItemCardActionsTypesSource.split(/\r?\n/).length;
const deadLetterRecoveryItemCardHeaderLines =
  deadLetterRecoveryItemCardHeaderSource.split(/\r?\n/).length;
const deadLetterRecoveryItemCardHeaderTypesLines =
  deadLetterRecoveryItemCardHeaderTypesSource.split(/\r?\n/).length;
const deadLetterRecoveryItemCardStatusLines =
  deadLetterRecoveryItemCardStatusSource.split(/\r?\n/).length;
const deadLetterRecoveryItemCardStatusTypesLines =
  deadLetterRecoveryItemCardStatusTypesSource.split(/\r?\n/).length;
const deadLetterRecoveryItemCardTagsTypesLines =
  deadLetterRecoveryItemCardTagsTypesSource.split(/\r?\n/).length;
const deadLetterRecoveryPanelContentTypesLines =
  deadLetterRecoveryPanelContentTypesSource.split(/\r?\n/).length;
const mediaStorageHealthCardLines = mediaStorageHealthCardSource.split(/\r?\n/).length;
const mediaStorageHealthCapabilitiesTypesLines =
  mediaStorageHealthCapabilitiesTypesSource.split(/\r?\n/).length;
const mediaStorageHealthHeaderLines = mediaStorageHealthHeaderSource.split(/\r?\n/).length;
const mediaStorageHealthHeaderTypesLines =
  mediaStorageHealthHeaderTypesSource.split(/\r?\n/).length;
const mediaStorageHealthMetadataLines = mediaStorageHealthMetadataSource.split(/\r?\n/).length;
const mediaStorageHealthMetadataTypesLines =
  mediaStorageHealthMetadataTypesSource.split(/\r?\n/).length;
const recordResultsListViewTypesLines =
  recordResultsListViewTypesSource.split(/\r?\n/).length;
const recordResultsTimelineViewTypesLines =
  recordResultsTimelineViewTypesSource.split(/\r?\n/).length;
const recordPanelV2TypesLines = recordPanelV2TypesSource.split(/\r?\n/).length;
const recordPanelV2InputTypesLines = recordPanelV2InputTypesSource.split(/\r?\n/).length;
const recordPanelV2PropsDataTypesLines = recordPanelV2PropsDataTypesSource.split(/\r?\n/).length;
const recordPanelV2PropsActionTypesLines =
  recordPanelV2PropsActionTypesSource.split(/\r?\n/).length;
const workspacePropsLines = workspacePropsSource.split(/\r?\n/).length;
const workspacePropsTypesLines = workspacePropsTypesSource.split(/\r?\n/).length;
const workspacePropsCoreTypesLines = workspacePropsCoreTypesSource.split(/\r?\n/).length;
const recordPanelDetailCopyTypesLines = recordPanelDetailCopyTypesSource.split(/\r?\n/).length;
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
const browseWorkspaceOutputPropsTypesLines =
  browseWorkspaceOutputPropsTypesSource.split(/\r?\n/).length;
const browseWorkspaceCopyPropsLines = browseWorkspaceCopyPropsSource.split(/\r?\n/).length;
const browseWorkspacePropsInputTypesLines =
  browseWorkspacePropsInputTypesSource.split(/\r?\n/).length;
const editorWorkspaceCopyPropsLines = editorWorkspaceCopyPropsSource.split(/\r?\n/).length;
const editorWorkspaceCopyOutputPropsTypesLines =
  editorWorkspaceCopyOutputPropsTypesSource.split(/\r?\n/).length;
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
const editorWorkspacePropsBuilderInputTypesLines =
  editorWorkspacePropsBuilderInputTypesSource.split(/\r?\n/).length;
const editorWorkspaceActionPropsInputLines =
  editorWorkspaceActionPropsInputSource.split(/\r?\n/).length;
const editorWorkspaceActionPropsInputTypesLines =
  editorWorkspaceActionPropsInputTypesSource.split(/\r?\n/).length;
const editorWorkspaceActionPropsLines = editorWorkspaceActionPropsSource.split(/\r?\n/).length;
const editorWorkspaceActionPropsTypesLines =
  editorWorkspaceActionPropsTypesSource.split(/\r?\n/).length;
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
const shellPropsTypesLines = shellPropsTypesSource.split(/\r?\n/).length;
const shellViewPropsLines = shellViewPropsSource.split(/\r?\n/).length;
const headerPropsLines = headerPropsSource.split(/\r?\n/).length;
const headerPropsTypesLines = headerPropsTypesSource.split(/\r?\n/).length;
const controllerOutputTypesLines = controllerOutputTypesSource.split(/\r?\n/).length;
const controllerLines = controllerSource.split(/\r?\n/).length;
const controllerSyncLines = controllerSyncSource.split(/\r?\n/).length;
const controllerSyncTypesLines = controllerSyncTypesSource.split(/\r?\n/).length;
const controllerSyncInputLines = controllerSyncInputSource.split(/\r?\n/).length;
const controllerDeadLetterSyncLines = controllerDeadLetterSyncSource.split(/\r?\n/).length;
const controllerDeadLetterSyncTypesLines =
  controllerDeadLetterSyncTypesSource.split(/\r?\n/).length;
const controllerSelectedRecordSyncLines = controllerSelectedRecordSyncSource.split(/\r?\n/).length;
const controllerSelectedRecordSyncTypesLines =
  controllerSelectedRecordSyncTypesSource.split(/\r?\n/).length;
const controllerSelectedRecordFormSyncLines =
  controllerSelectedRecordFormSyncSource.split(/\r?\n/).length;
const controllerSelectedRecordReminderSyncLines =
  controllerSelectedRecordReminderSyncSource.split(/\r?\n/).length;
const controllerFilterSyncLines = controllerFilterSyncSource.split(/\r?\n/).length;
const controllerFilterSyncTypesLines =
  controllerFilterSyncTypesSource.split(/\r?\n/).length;
const controllerStateLines = controllerStateSource.split(/\r?\n/).length;
const controllerFormStateLines = controllerFormStateSource.split(/\r?\n/).length;
const controllerRecordFormStateLines = controllerRecordFormStateSource.split(/\r?\n/).length;
const controllerSupportingFormStateLines =
  controllerSupportingFormStateSource.split(/\r?\n/).length;
const controllerMediaStateLines = controllerMediaStateSource.split(/\r?\n/).length;
const controllerBrowseStateLines = controllerBrowseStateSource.split(/\r?\n/).length;
const controllerResultLines = controllerResultSource.split(/\r?\n/).length;
const controllerResultTypesLines = controllerResultTypesSource.split(/\r?\n/).length;
const controllerHandlerGroupsResultTypesLines =
  controllerHandlerGroupsResultTypesSource.split(/\r?\n/).length;
const controllerStateResultLines = controllerStateResultSource.split(/\r?\n/).length;
const controllerStateResultTypesLines =
  controllerStateResultTypesSource.split(/\r?\n/).length;
const controllerViewDataResultLines =
  controllerViewDataResultSource.split(/\r?\n/).length;
const controllerViewDataResultTypesLines =
  controllerViewDataResultTypesSource.split(/\r?\n/).length;
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
const controllerViewDataTypesLines = controllerViewDataTypesSource.split(/\r?\n/).length;
const controllerLocalizedViewDataHookLines =
  controllerLocalizedViewDataHookSource.split(/\r?\n/).length;
const controllerViewDataHelpersLines = controllerViewDataHelpersSource.split(/\r?\n/).length;
const controllerRecordViewDataLines = controllerRecordViewDataSource.split(/\r?\n/).length;
const controllerRecordViewDataTypesLines =
  controllerRecordViewDataTypesSource.split(/\r?\n/).length;
const controllerSelectedRecordViewDataLines =
  controllerSelectedRecordViewDataSource.split(/\r?\n/).length;
const controllerSelectedRecordViewDataTypesLines =
  controllerSelectedRecordViewDataTypesSource.split(/\r?\n/).length;
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
const filterApplyActionTypesLines = filterApplyActionTypesSource.split(/\r?\n/).length;
const controllerDetailCopyTypesLines = controllerDetailCopyTypesSource.split(/\r?\n/).length;
const filterPresetActionsLines = filterPresetActionsSource.split(/\r?\n/).length;
const filterPresetActionInputTypesLines =
  filterPresetActionInputTypesSource.split(/\r?\n/).length;
const filterPresetSaveActionLines = filterPresetSaveActionSource.split(/\r?\n/).length;
const filterPresetDeleteActionLines = filterPresetDeleteActionSource.split(/\r?\n/).length;
const filterPresetSaveActionTypesLines = filterPresetSaveActionTypesSource.split(/\r?\n/).length;
const filterPresetDeleteActionTypesLines =
  filterPresetDeleteActionTypesSource.split(/\r?\n/).length;
const filterHelpersLines = filterHelpersSource.split(/\r?\n/).length;
const filterErrorHelpersLines = filterErrorHelpersSource.split(/\r?\n/).length;
const filterPresetNameLines = filterPresetNameSource.split(/\r?\n/).length;
const filterPresetNameTypesLines = filterPresetNameTypesSource.split(/\r?\n/).length;
const recordSubmitActionsLines = recordSubmitActionsSource.split(/\r?\n/).length;
const recordSubmitActionInputTypesLines =
  recordSubmitActionInputTypesSource.split(/\r?\n/).length;
const recordSaveActionsLines = recordSaveActionsSource.split(/\r?\n/).length;
const recordSaveSubmitActionLines = recordSaveSubmitActionSource.split(/\r?\n/).length;
const recordSaveActionInputTypesLines = recordSaveActionInputTypesSource.split(/\r?\n/).length;
const recordSaveSuccessHelpersLines = recordSaveSuccessHelpersSource.split(/\r?\n/).length;
const recordSaveSuccessHelpersTypesLines =
  recordSaveSuccessHelpersTypesSource.split(/\r?\n/).length;
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
const recordLocationPayloadTypesLines =
  recordLocationPayloadTypesSource.split(/\r?\n/).length;
const reminderActionsLines = reminderActionsSource.split(/\r?\n/).length;
const reminderSubmitActionLines = reminderSubmitActionSource.split(/\r?\n/).length;
const reminderActionInputTypesLines = reminderActionInputTypesSource.split(/\r?\n/).length;
const reminderSuccessHelpersLines = reminderSuccessHelpersSource.split(/\r?\n/).length;
const reminderSuccessHelpersTypesLines =
  reminderSuccessHelpersTypesSource.split(/\r?\n/).length;
const reminderHelpersLines = reminderHelpersSource.split(/\r?\n/).length;
const reminderErrorHelpersLines = reminderErrorHelpersSource.split(/\r?\n/).length;
const reminderResolutionLines = reminderResolutionSource.split(/\r?\n/).length;
const reminderPayloadLines = reminderPayloadSource.split(/\r?\n/).length;
const reminderPayloadTypesLines = reminderPayloadTypesSource.split(/\r?\n/).length;
const mediaStatusActionsLines = mediaStatusActionsSource.split(/\r?\n/).length;
const mediaRefreshActionLines = mediaRefreshActionSource.split(/\r?\n/).length;
const mediaRetryActionLines = mediaRetryActionSource.split(/\r?\n/).length;
const mediaStatusActionInputTypesLines =
  mediaStatusActionInputTypesSource.split(/\r?\n/).length;
const mediaStatusHelpersLines = mediaStatusHelpersSource.split(/\r?\n/).length;
const mediaStatusErrorHelpersLines = mediaStatusErrorHelpersSource.split(/\r?\n/).length;
const mediaStatusRunnerLines = mediaStatusRunnerSource.split(/\r?\n/).length;
const mediaStatusRunnerTypesLines = mediaStatusRunnerTypesSource.split(/\r?\n/).length;
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
const mediaDownloadTypesLines = mediaDownloadTypesSource.split(/\r?\n/).length;
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

for (const requiredRecordPanelQuickAddUsage of [
  'import { RecordQuickAddBar } from "./record-quick-add-bar";',
  "<RecordQuickAddBar",
  "canWriteWorkspace={props.canWriteWorkspace}",
  "onSaveRecord={props.onSaveRecord}",
]) {
  if (!source.includes(requiredRecordPanelQuickAddUsage)) {
    throw new Error(
      `record-panel-v2.tsx must compose the extracted quick-add entry bar: ${requiredRecordPanelQuickAddUsage}`,
    );
  }
}

for (const requiredRecordPanelHeaderUsage of [
  'from "./record-panel-header.types";',
  "export function RecordPanelHeader({ canWriteWorkspace, onCreateRecord, panelCopy, workspaceId }: RecordPanelHeaderComponentProps)",
  '{panelCopy.workspace}',
  '{panelCopy.structuredResults}',
  '{panelCopy.newRecord}',
]) {
  if (!recordPanelHeaderSource.includes(requiredRecordPanelHeaderUsage)) {
    throw new Error(`record-panel-header.tsx must own focused header rendering: ${requiredRecordPanelHeaderUsage}`);
  }
}

for (const forbiddenRecordPanelHeaderToken of [
  'from "../lib/record-panel-ui";',
  "canWriteWorkspace: boolean;",
  "onCreateRecord: () => void;",
  'panelCopy: Pick<PanelCopy, "workspace" | "structuredResults" | "newRecord">;',
  "workspaceId: string;",
]) {
  if (recordPanelHeaderSource.includes(forbiddenRecordPanelHeaderToken)) {
    throw new Error(`record-panel-header.tsx must keep header typing delegated: ${forbiddenRecordPanelHeaderToken}`);
  }
}

const maxRecordPanelHeaderLines = 25;
if (recordPanelHeaderLines > maxRecordPanelHeaderLines) {
  throw new Error(
    `record-panel-header.tsx exceeded ${maxRecordPanelHeaderLines} lines: ${recordPanelHeaderLines}`,
  );
}

for (const requiredRecordPanelHeaderTypesImport of ['from "../lib/record-panel-ui";']) {
  if (!recordPanelHeaderTypesSource.includes(requiredRecordPanelHeaderTypesImport)) {
    throw new Error(`record-panel-header.types.ts must import header prop contracts: ${requiredRecordPanelHeaderTypesImport}`);
  }
}

for (const requiredRecordPanelHeaderTypesUsage of [
  'export type RecordPanelHeaderComponentProps = { canWriteWorkspace: boolean; onCreateRecord: () => void; panelCopy: Pick<PanelCopy, "workspace" | "structuredResults" | "newRecord">; workspaceId: string };',
]) {
  if (!recordPanelHeaderTypesSource.includes(requiredRecordPanelHeaderTypesUsage)) {
    throw new Error(`record-panel-header.types.ts must own header prop typing: ${requiredRecordPanelHeaderTypesUsage}`);
  }
}

const maxRecordPanelHeaderTypesLines = 5;
if (recordPanelHeaderTypesLines > maxRecordPanelHeaderTypesLines) {
  throw new Error(
    `record-panel-header.types.ts exceeded ${maxRecordPanelHeaderTypesLines} lines: ${recordPanelHeaderTypesLines}`,
  );
}

for (const requiredRecordQuickAddBarUsage of [
  'from "../lib/locale";',
  'from "../lib/record-panel-ui";',
  'import { buildQuickAddRecordDraft } from "./record-quick-add-bar.helpers";',
  'import { RecordQuickAddPreview } from "./record-quick-add-preview";',
  'import type { RecordQuickAddBarProps } from "./record-quick-add-bar.types";',
  "const { locale } = useStoredLocale()",
  "const { panelCopy } = getRecordPanelUiBundle(locale)",
  "const quickAddDraft = buildQuickAddRecordDraft(content);",
  "...quickAddDraft,",
  "extra_data: {",
  "...quickAddDraft.extra_data,",
  'capture_mode: "quick_add",',
  "panelCopy.quickAddPlaceholder",
  "panelCopy.quickAddDisabled",
  "panelCopy.quickAddHint",
  "panelCopy.quickAddSave",
  "panelCopy.quickAddSaving",
  "panelCopy.quickAddError",
  "<RecordQuickAddPreview",
]) {
  if (!recordQuickAddBarSource.includes(requiredRecordQuickAddBarUsage)) {
    throw new Error(
      `record-quick-add-bar.tsx must own the quick-add single-input workflow: ${requiredRecordQuickAddBarUsage}`,
    );
  }
}

for (const forbiddenRecordQuickAddBarToken of [
  'import type { RecordPanelV2Props } from "./record-panel-v2.types";',
  'canWriteWorkspace: boolean;',
  'onSaveRecord: RecordPanelV2Props["onSaveRecord"];',
  "function buildQuickAddTitle(content: string)",
  'type_code: "memo",',
]) {
  if (recordQuickAddBarSource.includes(forbiddenRecordQuickAddBarToken)) {
    throw new Error(
      `record-quick-add-bar.tsx must keep quick-add prop typing delegated: ${forbiddenRecordQuickAddBarToken}`,
    );
  }
}

const maxRecordQuickAddBarLines = 65;
if (recordQuickAddBarLines > maxRecordQuickAddBarLines) {
  throw new Error(
    `record-quick-add-bar.tsx exceeded ${maxRecordQuickAddBarLines} lines: ${recordQuickAddBarLines}`,
  );
}

for (const requiredRecordQuickAddPreviewUsage of [
  'import { buildQuickAddRecordDraft } from "./record-quick-add-bar.helpers";',
  'import type { RecordQuickAddPreviewProps } from "./record-quick-add-preview.types";',
  "function shouldShowQuickAddPreview(draft: string)",
  'return /^\\s*(#|@|\\d{4}[-/.]\\d{1,2}[-/.]\\d{1,2}|\\d{1,2}:\\d{2}(?::\\d{2})?|today\\b|yesterday\\b|\\u4eca\\u5929|\\u6628\\u5929|\\d(?:\\/5|star|\\u661f|\\u5206)|\\[|\\u3010)/i.test(draft);',
  "function formatTypeLabel(typeCode: string, panelCopy: RecordQuickAddPreviewProps[\"panelCopy\"])",
  "const parsed = buildQuickAddRecordDraft(draft.trim());",
  "panelCopy.quickAddPreview",
  "panelCopy.food",
  "panelCopy.title",
  "panelCopy.occurredAt",
  "panelCopy.rating",
  "panelCopy.placeName",
  "panelCopy.address",
  "panelCopy.latitude",
  "panelCopy.longitude",
]) {
  if (!recordQuickAddPreviewSource.includes(requiredRecordQuickAddPreviewUsage)) {
    throw new Error(
      `record-quick-add-preview.tsx must own quick-add preview rendering: ${requiredRecordQuickAddPreviewUsage}`,
    );
  }
}

const maxRecordQuickAddPreviewLines = 45;
if (recordQuickAddPreviewLines > maxRecordQuickAddPreviewLines) {
  throw new Error(
    `record-quick-add-preview.tsx exceeded ${maxRecordQuickAddPreviewLines} lines: ${recordQuickAddPreviewLines}`,
  );
}

for (const requiredRecordQuickAddPreviewTypesUsage of [
  'import type { LocaleCode } from "../lib/locale"; import type { PanelCopy } from "../lib/record-panel-ui"; export type RecordQuickAddPreviewProps = { draft: string; locale: LocaleCode; panelCopy: Pick<PanelCopy, "address" | "badExperience" | "food" | "latitude" | "longitude" | "memo" | "occurredAt" | "placeName" | "quickAddPreview" | "rating" | "snack" | "title"> };',
]) {
  if (!recordQuickAddPreviewTypesSource.includes(requiredRecordQuickAddPreviewTypesUsage)) {
    throw new Error(
      `record-quick-add-preview.types.ts must own quick-add preview typing: ${requiredRecordQuickAddPreviewTypesUsage}`,
    );
  }
}

const maxRecordQuickAddPreviewTypesLines = 2;
if (recordQuickAddPreviewTypesLines > maxRecordQuickAddPreviewTypesLines) {
  throw new Error(
    `record-quick-add-preview.types.ts exceeded ${maxRecordQuickAddPreviewTypesLines} lines: ${recordQuickAddPreviewTypesLines}`,
  );
}

for (const requiredRecordQuickAddBarHelpersUsage of [
  'import type { QuickAddRecordDraft } from "./record-quick-add-bar.helpers.types";',
  'const QUICK_ADD_TAG_RULES: Record<string, QuickAddTagRule> = {',
  '"#memo": DEFAULT_QUICK_ADD_RULE,',
  '"#\\u5907\\u5fd8": DEFAULT_QUICK_ADD_RULE,',
  "const FOOD_QUICK_ADD_RULE: QuickAddTagRule = {",
  'type_code: "food",',
  '"#food": FOOD_QUICK_ADD_RULE,',
  '"#meal": FOOD_QUICK_ADD_RULE,',
  '"#\\u6b63\\u9910": FOOD_QUICK_ADD_RULE,',
  'const QUICK_ADD_TIME_TOKENS: Record<string, QuickAddTimeTokenRule> = {',
  '"\\u4eca\\u5929": "today",',
  '"\\u6628\\u5929": "yesterday",',
  "const SNACK_QUICK_ADD_RULE: QuickAddTagRule = {",
  'type_code: "snack",',
  '"#\\u96f6\\u98df": SNACK_QUICK_ADD_RULE,',
  "const AVOID_QUICK_ADD_RULE: QuickAddTagRule = {",
  'type_code: "bad_experience",',
  '"#warning": AVOID_QUICK_ADD_RULE,',
  '"#\\u907f\\u96f7": AVOID_QUICK_ADD_RULE,',
  '"#\\u8e29\\u96f7": AVOID_QUICK_ADD_RULE,',
  "function buildQuickAddTitle(content: string)",
  "function buildQuickAddOccurredAt(timeRule: QuickAddTimeTokenRule | null, now: Date)",
  "function parseQuickAddAbsoluteDateToken(token: string, now: Date)",
  'const match = token.match(/^(\\d{4})[-/.](\\d{1,2})[-/.](\\d{1,2})$/);',
  "function parseQuickAddTimeOfDayToken(token: string, baseOccurredAt: string)",
  'const match = token.match(/^(\\d{1,2}):(\\d{2})(?::(\\d{2}))?$/);',
  "function parseQuickAddRatingToken(token: string)",
  'const match = token.match(/^([1-5])(?:\\/5|star|\\u661f|\\u5206)$/i);',
  "function readQuickAddCoordinate(value: string, min: number, max: number)",
  "function parseQuickAddLocationSegment(content: string)",
  'const match = content.match(/^@(.+?)(?:\\(\\s*(-?\\d+(?:\\.\\d+)?)\\s*,\\s*(-?\\d+(?:\\.\\d+)?)\\s*\\))?(?:\\s*\\|\\s*([^:\\uFF1A]+))?[:\\uFF1A]\\s*(.*)$/);',
  "const latitude = match[2] ? readQuickAddCoordinate(match[2], -90, 90) : null;",
  "const longitude = match[3] ? readQuickAddCoordinate(match[3], -180, 180) : null;",
  "const address = match[4]?.trim();",
  "function parseQuickAddExplicitTitle(content: string)",
  'const match = content.match(/^(?:\\[(.+?)\\]|\\u3010(.+?)\\u3011)\\s*(.*)$/);',
  "function parseQuickAddControlTokens(rawContent: string, now: Date)",
  "const timeRule = QUICK_ADD_TIME_TOKENS[token];",
  "const absoluteDate = parseQuickAddAbsoluteDateToken(tokens[startIndex], now);",
  "const timeOfDay = parseQuickAddTimeOfDayToken(tokens[startIndex], nextOccurredAt);",
  "const rating = parseQuickAddRatingToken(token);",
  "if (absoluteDate) nextOccurredAt = absoluteDate;",
  "if (timeOfDay) nextOccurredAt = timeOfDay;",
  'const parsedLocation = parseQuickAddLocationSegment(tokens.slice(startIndex).join(" ").trim() || rawContent.trim());',
  "const parsedTitle = parseQuickAddExplicitTitle(parsedLocation.content);",
  "extra_data: parsedLocation.extra_data,",
  "rating: nextRating,",
  "occurred_at: nextOccurredAt,",
  "return { ...parsed, title: parsed.title ?? buildQuickAddTitle(parsed.content) };",
]) {
  if (!recordQuickAddBarHelpersSource.includes(requiredRecordQuickAddBarHelpersUsage)) {
    throw new Error(
      `record-quick-add-bar.helpers.ts must own quick-add parsing and title helpers: ${requiredRecordQuickAddBarHelpersUsage}`,
    );
  }
}

for (const forbiddenRecordQuickAddBarHelpersToken of [
  'from "../lib/locale";',
  'from "../lib/record-panel-ui";',
  'from "./record-quick-add-bar.types";',
]) {
  if (recordQuickAddBarHelpersSource.includes(forbiddenRecordQuickAddBarHelpersToken)) {
    throw new Error(
      `record-quick-add-bar.helpers.ts must stay independent from UI-only concerns: ${forbiddenRecordQuickAddBarHelpersToken}`,
    );
  }
}

const maxRecordQuickAddBarHelpersLines = 130;
if (recordQuickAddBarHelpersLines > maxRecordQuickAddBarHelpersLines) {
  throw new Error(
    `record-quick-add-bar.helpers.ts exceeded ${maxRecordQuickAddBarHelpersLines} lines: ${recordQuickAddBarHelpersLines}`,
  );
}

for (const requiredRecordQuickAddBarHelpersTypesUsage of [
  'import type { SaveRecordInput } from "./record-panel-v2-input.types"; export type QuickAddRecordDraft = Pick<SaveRecordInput, "content" | "extra_data" | "is_avoid" | "occurred_at" | "rating" | "type_code"> & { title: string };',
]) {
  if (!recordQuickAddBarHelpersTypesSource.includes(requiredRecordQuickAddBarHelpersTypesUsage)) {
    throw new Error(
      `record-quick-add-bar.helpers.types.ts must own quick-add parsing output typing: ${requiredRecordQuickAddBarHelpersTypesUsage}`,
    );
  }
}

const maxRecordQuickAddBarHelpersTypesLines = 2;
if (recordQuickAddBarHelpersTypesLines > maxRecordQuickAddBarHelpersTypesLines) {
  throw new Error(
    `record-quick-add-bar.helpers.types.ts exceeded ${maxRecordQuickAddBarHelpersTypesLines} lines: ${recordQuickAddBarHelpersTypesLines}`,
  );
}

for (const requiredRecordQuickAddBarTypesUsage of [
  'import type { RecordPanelV2Props } from "./record-panel-v2.types"; export type RecordQuickAddBarProps = Pick<RecordPanelV2Props, "canWriteWorkspace" | "onSaveRecord">;',
]) {
  if (!recordQuickAddBarTypesSource.includes(requiredRecordQuickAddBarTypesUsage)) {
    throw new Error(
      `record-quick-add-bar.types.ts must own quick-add prop typing: ${requiredRecordQuickAddBarTypesUsage}`,
    );
  }
}

const maxRecordQuickAddBarTypesLines = 2;
if (recordQuickAddBarTypesLines > maxRecordQuickAddBarTypesLines) {
  throw new Error(
    `record-quick-add-bar.types.ts exceeded ${maxRecordQuickAddBarTypesLines} lines: ${recordQuickAddBarTypesLines}`,
  );
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
  'import type { Dispatch, SetStateAction } from "react";',
  'import type { RecordPanelDetailCopy as RecordPanelDetailCopyValue } from "./record-panel-detail-copy.types";',
  'import type { RecordBrowseWorkspaceProps as RecordBrowseWorkspacePropsValue } from "./record-browse-workspace.types";',
  'import type { RecordEditorWorkspaceProps as RecordEditorWorkspacePropsValue } from "./record-editor-workspace.types";',
]) {
  if (!workspacePropsCoreTypesSource.includes(requiredWorkspacePropsCoreTypesImport)) {
    throw new Error(
      `record-panel-v2-workspace-props-core.types.ts must import shared workspace type dependencies: ${requiredWorkspacePropsCoreTypesImport}`,
    );
  }
}

for (const requiredWorkspacePropsCoreTypesUsage of [
  "export type RecordBrowseWorkspaceProps = RecordBrowseWorkspacePropsValue;",
  "export type RecordEditorWorkspaceProps = RecordEditorWorkspacePropsValue;",
  "export type RecordPanelDetailCopy = RecordPanelDetailCopyValue;",
  "export type RecordBrowseWorkspaceTypeSupport = {",
  'setViewMode: Dispatch<SetStateAction<"timeline" | "list">>;',
]) {
  if (!workspacePropsCoreTypesSource.includes(requiredWorkspacePropsCoreTypesUsage)) {
    throw new Error(
      `record-panel-v2-workspace-props-core.types.ts must own shared workspace prop contracts: ${requiredWorkspacePropsCoreTypesUsage}`,
    );
  }
}

for (const forbiddenWorkspacePropsCoreTypesToken of [
  "ComponentProps",
  "getRecordPanelDetailBundle",
  'from "./record-browse-workspace";',
  'from "./record-editor-workspace";',
  "ReturnType<",
]) {
  if (workspacePropsCoreTypesSource.includes(forbiddenWorkspacePropsCoreTypesToken)) {
    throw new Error(
      `record-panel-v2-workspace-props-core.types.ts must keep workspace signature inference delegated: ${forbiddenWorkspacePropsCoreTypesToken}`,
    );
  }
}

const maxWorkspacePropsCoreTypesLines = 25;
if (workspacePropsCoreTypesLines > maxWorkspacePropsCoreTypesLines) {
  throw new Error(
    `record-panel-v2-workspace-props-core.types.ts exceeded ${maxWorkspacePropsCoreTypesLines} lines: ${workspacePropsCoreTypesLines}`,
  );
}

for (const requiredRecordPanelDetailCopyTypesUsage of [
  'import type { getRecordPanelDetailBundle } from "../lib/record-panel-detail";',
  'export type RecordPanelDetailCopy = ReturnType<typeof getRecordPanelDetailBundle>["copy"];',
]) {
  if (!recordPanelDetailCopyTypesSource.includes(requiredRecordPanelDetailCopyTypesUsage)) {
    throw new Error(
      `record-panel-detail-copy.types.ts must own the shared detail-copy boundary: ${requiredRecordPanelDetailCopyTypesUsage}`,
    );
  }
}

const maxRecordPanelDetailCopyTypesLines = 3;
if (recordPanelDetailCopyTypesLines > maxRecordPanelDetailCopyTypesLines) {
  throw new Error(
    `record-panel-detail-copy.types.ts exceeded ${maxRecordPanelDetailCopyTypesLines} lines: ${recordPanelDetailCopyTypesLines}`,
  );
}

for (const requiredControllerOutputTypesUsage of [
  'import type { useRecordPanelController } from "./use-record-panel-controller";',
  "export type RecordPanelController = ReturnType<typeof useRecordPanelController>;",
]) {
  if (!controllerOutputTypesSource.includes(requiredControllerOutputTypesUsage)) {
    throw new Error(
      `record-panel-controller-output.types.ts must own the controller output boundary: ${requiredControllerOutputTypesUsage}`,
    );
  }
}

const maxControllerOutputTypesLines = 3;
if (controllerOutputTypesLines > maxControllerOutputTypesLines) {
  throw new Error(
    `record-panel-controller-output.types.ts exceeded ${maxControllerOutputTypesLines} lines: ${controllerOutputTypesLines}`,
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
  'from "./record-panel-v2-shell-props.types";',
  'from "./record-panel-v2.types";',
]) {
  if (!browseWorkspacePropInputTypesSource.includes(requiredBrowseWorkspacePropInputTypesImport)) {
    throw new Error(
      `record-panel-v2-browse-workspace-prop-input.types.ts must import browse workspace prop-input type dependencies: ${requiredBrowseWorkspacePropInputTypesImport}`,
    );
  }
}

for (const requiredBrowseWorkspacePropInputTypesUsage of [
  'export type BuildRecordBrowseWorkspacePropInputArgs = { props: RecordPanelShellInput["props"] };',
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
  'from "./record-panel-v2-shell-props.types";',
  'from "./record-panel-v2-workspace-props-core.types";',
]) {
  if (!browseWorkspaceControllerInputTypesSource.includes(requiredBrowseWorkspaceControllerInputTypesImport)) {
    throw new Error(
      `record-panel-v2-browse-workspace-controller-input.types.ts must import browse workspace controller-input type dependencies: ${requiredBrowseWorkspaceControllerInputTypesImport}`,
    );
  }
}

for (const requiredBrowseWorkspaceControllerInputTypesUsage of [
  "export type BuildRecordBrowseWorkspaceControllerInputArgs = { controller: RecordPanelController };",
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
  'from "./record-panel-v2-shell-props.types";',
  'from "./record-panel-v2.types";',
]) {
  if (!editorWorkspacePropInputTypesSource.includes(requiredEditorWorkspacePropInputTypesImport)) {
    throw new Error(
      `record-panel-v2-editor-workspace-prop-input.types.ts must import editor workspace prop-input type dependencies: ${requiredEditorWorkspacePropInputTypesImport}`,
    );
  }
}

for (const requiredEditorWorkspacePropInputTypesUsage of [
  'export type BuildRecordEditorWorkspacePropInputArgs = { props: RecordPanelShellInput["props"] };',
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
  'from "./record-panel-v2-shell-props.types";',
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
  "export type BuildRecordEditorWorkspaceControllerInputArgs = { controller: RecordPanelController };",
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
  'from "./record-panel-v2-browse-workspace-output-props.types";',
  'from "./record-panel-v2-workspace-props.types";',
]) {
  if (!browseWorkspaceFilterPropsSource.includes(requiredBrowseWorkspaceFilterPropsImport)) {
    throw new Error(
      `record-panel-v2-browse-workspace-filter-props.ts must import filter prop contracts: ${requiredBrowseWorkspaceFilterPropsImport}`,
    );
  }
}

for (const requiredBrowseWorkspaceFilterPropsUsage of [
  "export function buildRecordBrowseWorkspaceFilterProps(input: BuildRecordBrowseWorkspacePropsInput): RecordBrowseWorkspaceFilterProps {",
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

for (const forbiddenBrowseWorkspaceFilterPropsToken of [
  'RecordBrowseWorkspaceProps } from "./record-panel-v2-workspace-props.types";',
  'Pick<RecordBrowseWorkspaceProps, "currentFilterSummary"',
]) {
  if (browseWorkspaceFilterPropsSource.includes(forbiddenBrowseWorkspaceFilterPropsToken)) {
    throw new Error(
      `record-panel-v2-browse-workspace-filter-props.ts must keep filter prop typing delegated: ${forbiddenBrowseWorkspaceFilterPropsToken}`,
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
  'from "./record-panel-v2-browse-workspace-output-props.types";',
  'from "./record-panel-v2-workspace-props.types";',
]) {
  if (!browseWorkspaceRecordPropsSource.includes(requiredBrowseWorkspaceRecordPropsImport)) {
    throw new Error(
      `record-panel-v2-browse-workspace-record-props.ts must import record prop contracts: ${requiredBrowseWorkspaceRecordPropsImport}`,
    );
  }
}

for (const requiredBrowseWorkspaceRecordPropsUsage of [
  "export function buildRecordBrowseWorkspaceRecordProps(input: BuildRecordBrowseWorkspacePropsInput): RecordBrowseWorkspaceRecordProps {",
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

for (const forbiddenBrowseWorkspaceRecordPropsToken of [
  'RecordBrowseWorkspaceProps } from "./record-panel-v2-workspace-props.types";',
  'Pick<RecordBrowseWorkspaceProps, "avoidCount"',
]) {
  if (browseWorkspaceRecordPropsSource.includes(forbiddenBrowseWorkspaceRecordPropsToken)) {
    throw new Error(
      `record-panel-v2-browse-workspace-record-props.ts must keep record prop typing delegated: ${forbiddenBrowseWorkspaceRecordPropsToken}`,
    );
  }
}

const maxBrowseWorkspaceRecordPropsLines = 30;
if (browseWorkspaceRecordPropsLines > maxBrowseWorkspaceRecordPropsLines) {
  throw new Error(
    `record-panel-v2-browse-workspace-record-props.ts exceeded ${maxBrowseWorkspaceRecordPropsLines} lines: ${browseWorkspaceRecordPropsLines}`,
  );
}

for (const requiredBrowseWorkspaceOutputPropsTypesImport of [
  'from "./record-browse-workspace.types";',
]) {
  if (!browseWorkspaceOutputPropsTypesSource.includes(requiredBrowseWorkspaceOutputPropsTypesImport)) {
    throw new Error(
      `record-panel-v2-browse-workspace-output-props.types.ts must import browse workspace output contracts: ${requiredBrowseWorkspaceOutputPropsTypesImport}`,
    );
  }
}

for (const requiredBrowseWorkspaceOutputPropsTypesUsage of [
  'export type RecordBrowseWorkspaceFilterProps = Pick<RecordBrowseWorkspaceProps, "currentFilterSummary" | "filterDraft" | "onApplyFilter" | "onApplyLocationFilter" | "onApplyPreset" | "onDeletePreset" | "onResetFilter" | "onSavePreset" | "presetName" | "recordFilter" | "savingSearchPreset" | "searchPresets" | "setFilterDraft" | "setPresetName" | "summarizeRecordFilterLabel">;',
  'export type RecordBrowseWorkspaceRecordProps = Pick<RecordBrowseWorkspaceProps, "avoidCount" | "canWriteWorkspace" | "filteringRecords" | "foodCount" | "formatAvoidCountLabel" | "formatRecordTimestampLabel" | "formatReviewStatusLabel" | "formatTimelineCountLabel" | "formatTimelineDateLabel" | "onSelectRecord" | "panelCopy" | "records" | "selectedRecordId" | "setViewMode" | "timelineDays" | "viewMode" | "visibleRecordCount">;',
  'export type RecordBrowseWorkspaceCopyProps = Pick<RecordBrowseWorkspaceProps, "applyPresetLabel" | "avoidRecordLabel" | "avoidStatsLabel" | "deletePresetLabel" | "flatListViewLabel" | "foodLabel" | "mapPrefixLabel" | "noContentLabel" | "noRecordsLabel" | "noSavedFiltersLabel" | "ratingPrefixLabel" | "savedPresetLabel" | "timelineDayLabel" | "timelineViewLabel" | "unknownPlaceLabel" | "untitledRecordLabel" | "visibleRecordsLabel">;',
  'export type RecordBrowseWorkspaceDraftLocationProps = Pick<RecordBrowseWorkspaceProps, "draftLocation" | "onDraftLocationChange">;',
]) {
  if (!browseWorkspaceOutputPropsTypesSource.includes(requiredBrowseWorkspaceOutputPropsTypesUsage)) {
    throw new Error(
      `record-panel-v2-browse-workspace-output-props.types.ts must own browse workspace output typing: ${requiredBrowseWorkspaceOutputPropsTypesUsage}`,
    );
  }
}

const maxBrowseWorkspaceOutputPropsTypesLines = 6;
if (browseWorkspaceOutputPropsTypesLines > maxBrowseWorkspaceOutputPropsTypesLines) {
  throw new Error(
    `record-panel-v2-browse-workspace-output-props.types.ts exceeded ${maxBrowseWorkspaceOutputPropsTypesLines} lines: ${browseWorkspaceOutputPropsTypesLines}`,
  );
}

for (const requiredBrowseWorkspacePropsInputTypesImport of [
  'from "./record-panel-v2-workspace-props.types";',
]) {
  if (!browseWorkspacePropsInputTypesSource.includes(requiredBrowseWorkspacePropsInputTypesImport)) {
    throw new Error(
      `record-panel-v2-browse-workspace-props-input.types.ts must import browse workspace input contracts: ${requiredBrowseWorkspacePropsInputTypesImport}`,
    );
  }
}

for (const requiredBrowseWorkspacePropsInputTypesUsage of [
  'export type RecordBrowseWorkspaceCopyPropsInput = Pick<BuildRecordBrowseWorkspacePropsInput, "detailCopy" | "panelCopy">;',
  'export type RecordBrowseWorkspaceDraftLocationPropsInput = Pick<BuildRecordBrowseWorkspacePropsInput, "canWriteWorkspace" | "form" | "setForm">;',
]) {
  if (!browseWorkspacePropsInputTypesSource.includes(requiredBrowseWorkspacePropsInputTypesUsage)) {
    throw new Error(
      `record-panel-v2-browse-workspace-props-input.types.ts must own browse workspace input typing: ${requiredBrowseWorkspacePropsInputTypesUsage}`,
    );
  }
}

const maxBrowseWorkspacePropsInputTypesLines = 5;
if (browseWorkspacePropsInputTypesLines > maxBrowseWorkspacePropsInputTypesLines) {
  throw new Error(
    `record-panel-v2-browse-workspace-props-input.types.ts exceeded ${maxBrowseWorkspacePropsInputTypesLines} lines: ${browseWorkspacePropsInputTypesLines}`,
  );
}

for (const requiredBrowseWorkspaceCopyPropsImport of [
  'from "./record-panel-v2-browse-workspace-output-props.types";',
  'from "./record-panel-v2-browse-workspace-props-input.types";',
]) {
  if (!browseWorkspaceCopyPropsSource.includes(requiredBrowseWorkspaceCopyPropsImport)) {
    throw new Error(
      `record-panel-v2-browse-workspace-copy-props.ts must import browse workspace copy contracts: ${requiredBrowseWorkspaceCopyPropsImport}`,
    );
  }
}

for (const requiredBrowseWorkspaceCopyPropsUsage of [
  "export function buildRecordBrowseWorkspaceCopyProps({ detailCopy, panelCopy }: RecordBrowseWorkspaceCopyPropsInput): RecordBrowseWorkspaceCopyProps {",
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

for (const forbiddenBrowseWorkspaceCopyPropsToken of [
  'from "./record-panel-v2-workspace-props.types";',
  'Pick<BuildRecordBrowseWorkspacePropsInput, "detailCopy" | "panelCopy">',
  'Pick<RecordBrowseWorkspaceProps, "applyPresetLabel"',
]) {
  if (browseWorkspaceCopyPropsSource.includes(forbiddenBrowseWorkspaceCopyPropsToken)) {
    throw new Error(
      `record-panel-v2-browse-workspace-copy-props.ts must keep browse workspace copy typing delegated: ${forbiddenBrowseWorkspaceCopyPropsToken}`,
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
  'from "./record-panel-v2-editor-workspace-copy-output-props.types";',
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
  "}: RecordEditorWorkspaceCopyPropsInput): RecordEditorWorkspaceCopyProps {",
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

for (const requiredEditorWorkspaceCopyOutputPropsTypesImport of [
  'from "./record-panel-v2-workspace-props.types";',
]) {
  if (!editorWorkspaceCopyOutputPropsTypesSource.includes(requiredEditorWorkspaceCopyOutputPropsTypesImport)) {
    throw new Error(
      `record-panel-v2-editor-workspace-copy-output-props.types.ts must import editor copy output contracts: ${requiredEditorWorkspaceCopyOutputPropsTypesImport}`,
    );
  }
}

for (const requiredEditorWorkspaceCopyOutputPropsTypesUsage of [
  'export type RecordEditorWorkspaceChannelCopyProps = Pick<RecordEditorWorkspaceProps, "channelInAppLabel" | "channelLabel">;',
  'export type RecordEditorWorkspaceMediaCopyProps = Pick<RecordEditorWorkspaceProps, "largestFilePrefixLabel" | "noMediaLabel">;',
  'export type RecordEditorWorkspaceReminderCopyProps = Pick<RecordEditorWorkspaceProps, "createReminderLabel" | "deleteReminderLabel" | "enableReminderLabel" | "markReminderDoneLabel" | "noRemindersLabel" | "pauseReminderLabel" | "reminderNoteLabel" | "reminderNotePlaceholder" | "reminderSectionDescription" | "reminderSectionTitle" | "reminderTitleLabel" | "reminderTitlePlaceholder" | "remindAtLabel" | "savingReminderLabel" | "untitledReminderLabel">;',
  "export type RecordEditorWorkspaceCopyProps = RecordEditorWorkspaceChannelCopyProps & RecordEditorWorkspaceMediaCopyProps & RecordEditorWorkspaceReminderCopyProps;",
]) {
  if (!editorWorkspaceCopyOutputPropsTypesSource.includes(requiredEditorWorkspaceCopyOutputPropsTypesUsage)) {
    throw new Error(
      `record-panel-v2-editor-workspace-copy-output-props.types.ts must own editor copy output typing: ${requiredEditorWorkspaceCopyOutputPropsTypesUsage}`,
    );
  }
}

const maxEditorWorkspaceCopyOutputPropsTypesLines = 7;
if (editorWorkspaceCopyOutputPropsTypesLines > maxEditorWorkspaceCopyOutputPropsTypesLines) {
  throw new Error(
    `record-panel-v2-editor-workspace-copy-output-props.types.ts exceeded ${maxEditorWorkspaceCopyOutputPropsTypesLines} lines: ${editorWorkspaceCopyOutputPropsTypesLines}`,
  );
}

for (const requiredEditorWorkspaceChannelCopyPropsImport of [
  'from "./record-panel-v2-editor-workspace-copy-output-props.types";',
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
  'from "./record-panel-v2-workspace-props.types";',
  'Pick<RecordEditorWorkspaceProps, "channelInAppLabel" | "channelLabel">',
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
  'from "./record-panel-v2-editor-workspace-copy-output-props.types";',
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
  'from "./record-panel-v2-workspace-props.types";',
  'Pick<RecordEditorWorkspaceProps, "largestFilePrefixLabel" | "noMediaLabel">',
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
  'from "./record-panel-v2-editor-workspace-copy-output-props.types";',
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
  'from "./record-panel-v2-workspace-props.types";',
  'Pick<RecordEditorWorkspaceProps, "createReminderLabel"',
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
  'from "./record-panel-v2-browse-workspace-output-props.types";',
  'from "./record-panel-v2-browse-workspace-props-input.types";',
]) {
  if (!browseWorkspaceDraftLocationPropsSource.includes(requiredBrowseWorkspaceDraftLocationPropsImport)) {
    throw new Error(
      `record-panel-v2-browse-workspace-draft-location-props.ts must import draft-location contracts: ${requiredBrowseWorkspaceDraftLocationPropsImport}`,
    );
  }
}

for (const requiredBrowseWorkspaceDraftLocationPropsUsage of [
  "export function buildRecordBrowseWorkspaceDraftLocationProps({",
  "}: RecordBrowseWorkspaceDraftLocationPropsInput): RecordBrowseWorkspaceDraftLocationProps {",
  "draftLocation: canWriteWorkspace ? form.location ?? null : null",
  "setForm((prev) => ({",
]) {
  if (!browseWorkspaceDraftLocationPropsSource.includes(requiredBrowseWorkspaceDraftLocationPropsUsage)) {
    throw new Error(
      `record-panel-v2-browse-workspace-draft-location-props.ts must own draft-location details: ${requiredBrowseWorkspaceDraftLocationPropsUsage}`,
    );
  }
}

for (const forbiddenBrowseWorkspaceDraftLocationPropsToken of [
  'from "./record-panel-v2-workspace-props.types";',
  'Pick<BuildRecordBrowseWorkspacePropsInput, "canWriteWorkspace" | "form" | "setForm">',
  'Pick<RecordBrowseWorkspaceProps, "draftLocation" | "onDraftLocationChange">',
]) {
  if (browseWorkspaceDraftLocationPropsSource.includes(forbiddenBrowseWorkspaceDraftLocationPropsToken)) {
    throw new Error(
      `record-panel-v2-browse-workspace-draft-location-props.ts must keep draft-location input typing delegated: ${forbiddenBrowseWorkspaceDraftLocationPropsToken}`,
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
  'from "./record-panel-v2-browse-workspace-prop-input.types";',
]) {
  if (!browseWorkspacePropInputSource.includes(requiredBrowseWorkspacePropInputImport)) {
    throw new Error(
      `record-panel-v2-browse-workspace-prop-input.ts must import browse workspace prop-input contracts: ${requiredBrowseWorkspacePropInputImport}`,
    );
  }
}

for (const requiredBrowseWorkspacePropInputUsage of [
  'export function buildRecordBrowseWorkspacePropInput({ props }: BuildRecordBrowseWorkspacePropInputArgs)',
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

for (const forbiddenBrowseWorkspacePropInputToken of [
  'from "./record-panel-v2-shell-props.types";',
  'Pick<RecordPanelShellInput, "props">',
]) {
  if (browseWorkspacePropInputSource.includes(forbiddenBrowseWorkspacePropInputToken)) {
    throw new Error(
      `record-panel-v2-browse-workspace-prop-input.ts must keep browse workspace prop-input arg typing delegated: ${forbiddenBrowseWorkspacePropInputToken}`,
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
  'from "./record-panel-v2-browse-workspace-controller-input.types";',
]) {
  if (!browseWorkspaceControllerInputSource.includes(requiredBrowseWorkspaceControllerInputImport)) {
    throw new Error(
      `record-panel-v2-browse-workspace-controller-input.ts must import browse workspace controller-input contracts: ${requiredBrowseWorkspaceControllerInputImport}`,
    );
  }
}

for (const requiredBrowseWorkspaceControllerInputUsage of [
  "export function buildRecordBrowseWorkspaceControllerInput({ controller }: BuildRecordBrowseWorkspaceControllerInputArgs) {",
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

for (const forbiddenBrowseWorkspaceControllerInputToken of [
  'from "./record-panel-v2-shell-props.types";',
  'Pick<RecordPanelShellInput, "controller">',
]) {
  if (browseWorkspaceControllerInputSource.includes(forbiddenBrowseWorkspaceControllerInputToken)) {
    throw new Error(
      `record-panel-v2-browse-workspace-controller-input.ts must keep browse workspace controller-input arg typing delegated: ${forbiddenBrowseWorkspaceControllerInputToken}`,
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

for (const requiredEditorWorkspacePropsBuilderInputTypesImport of [
  'from "./record-panel-v2-workspace-props.types";',
]) {
  if (!editorWorkspacePropsBuilderInputTypesSource.includes(requiredEditorWorkspacePropsBuilderInputTypesImport)) {
    throw new Error(
      `record-panel-v2-editor-workspace-props-builder-input.types.ts must import workspace prop builder contracts: ${requiredEditorWorkspacePropsBuilderInputTypesImport}`,
    );
  }
}

for (const requiredEditorWorkspacePropsBuilderInputTypesUsage of [
  'export type RecordEditorWorkspacePropsBuilderInput = Omit<BuildRecordEditorWorkspacePropsInput, "detailCopy">;',
]) {
  if (!editorWorkspacePropsBuilderInputTypesSource.includes(requiredEditorWorkspacePropsBuilderInputTypesUsage)) {
    throw new Error(
      `record-panel-v2-editor-workspace-props-builder-input.types.ts must own shared workspace builder typing: ${requiredEditorWorkspacePropsBuilderInputTypesUsage}`,
    );
  }
}

const maxEditorWorkspacePropsBuilderInputTypesLines = 5;
if (editorWorkspacePropsBuilderInputTypesLines > maxEditorWorkspacePropsBuilderInputTypesLines) {
  throw new Error(
    `record-panel-v2-editor-workspace-props-builder-input.types.ts exceeded ${maxEditorWorkspacePropsBuilderInputTypesLines} lines: ${editorWorkspacePropsBuilderInputTypesLines}`,
  );
}

for (const requiredEditorWorkspaceBasePropsInputImport of [
  'from "./record-panel-v2-editor-workspace-props-builder-input.types";',
]) {
  if (!editorWorkspaceBasePropsInputSource.includes(requiredEditorWorkspaceBasePropsInputImport)) {
    throw new Error(
      `record-panel-v2-editor-workspace-base-props-input.ts must import shared workspace prop types: ${requiredEditorWorkspaceBasePropsInputImport}`,
    );
  }
}

for (const requiredEditorWorkspaceBasePropsInputUsage of [
  "export function buildRecordEditorWorkspaceBasePropsInput(",
  "input: RecordEditorWorkspacePropsBuilderInput,",
  "return input;",
]) {
  if (!editorWorkspaceBasePropsInputSource.includes(requiredEditorWorkspaceBasePropsInputUsage)) {
    throw new Error(
      `record-panel-v2-editor-workspace-base-props-input.ts must own base-props input mapping: ${requiredEditorWorkspaceBasePropsInputUsage}`,
    );
  }
}

for (const forbiddenEditorWorkspaceBasePropsInputToken of [
  'from "./record-panel-v2-workspace-props.types";',
  "type EditorWorkspacePropsBuilderInput = Omit<",
]) {
  if (editorWorkspaceBasePropsInputSource.includes(forbiddenEditorWorkspaceBasePropsInputToken)) {
    throw new Error(
      `record-panel-v2-editor-workspace-base-props-input.ts must keep workspace builder typing delegated: ${forbiddenEditorWorkspaceBasePropsInputToken}`,
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
  'from "./record-panel-v2-editor-workspace-action-props-input.types";',
  'from "./record-panel-v2-editor-workspace-props-builder-input.types";',
]) {
  if (!editorWorkspaceActionPropsInputSource.includes(requiredEditorWorkspaceActionPropsInputImport)) {
    throw new Error(
      `record-panel-v2-editor-workspace-action-props-input.ts must import shared workspace prop types: ${requiredEditorWorkspaceActionPropsInputImport}`,
    );
  }
}

for (const requiredEditorWorkspaceActionPropsInputUsage of [
  "export function buildRecordEditorWorkspaceActionPropsInput({",
  "handleBulkRetryDeadLetter,",
  "onUpdateReminder,",
  "}: RecordEditorWorkspacePropsBuilderInput): RecordEditorWorkspaceActionPropsInput {",
]) {
  if (!editorWorkspaceActionPropsInputSource.includes(requiredEditorWorkspaceActionPropsInputUsage)) {
    throw new Error(
      `record-panel-v2-editor-workspace-action-props-input.ts must own action-props input mapping: ${requiredEditorWorkspaceActionPropsInputUsage}`,
    );
  }
}

for (const forbiddenEditorWorkspaceActionPropsInputToken of [
  'from "./record-panel-v2-workspace-props.types";',
  "type EditorWorkspacePropsBuilderInput = Omit<",
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
  'from "./record-panel-v2-editor-workspace-action-props.types";',
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
  "export function buildRecordEditorWorkspaceActionProps({ ...input }: RecordEditorWorkspaceActionPropsInput): RecordEditorWorkspaceActionProps {",
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
  "RecordEditorWorkspaceDeadLetterActionProps =",
  "RecordEditorWorkspacePrimaryActionProps =",
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

for (const requiredEditorWorkspaceActionPropsTypesImport of [
  'from "./record-panel-v2-workspace-props.types";',
]) {
  if (!editorWorkspaceActionPropsTypesSource.includes(requiredEditorWorkspaceActionPropsTypesImport)) {
    throw new Error(
      `record-panel-v2-editor-workspace-action-props.types.ts must import editor action output contracts: ${requiredEditorWorkspaceActionPropsTypesImport}`,
    );
  }
}

for (const requiredEditorWorkspaceActionPropsTypesUsage of [
  'export type RecordEditorWorkspaceDeadLetterActionProps = Pick<RecordEditorWorkspaceProps, "onBulkRetryAllDeadLetter" | "onBulkRetrySelectedDeadLetter" | "onClearDeadLetterSelection" | "onSelectAllDeadLetter" | "onToggleDeadLetterSelection">;',
  'export type RecordEditorWorkspacePrimaryActionProps = Pick<RecordEditorWorkspaceProps, "onCreateReminder" | "onDelete" | "onDeleteMediaAsset" | "onDeleteReminder" | "onDownloadMedia" | "onRefreshMedia" | "onRetryMediaProcessing" | "onSubmit" | "onUpdateReminder" | "onUpload">;',
  "export type RecordEditorWorkspaceActionProps = RecordEditorWorkspaceDeadLetterActionProps & RecordEditorWorkspacePrimaryActionProps;",
]) {
  if (!editorWorkspaceActionPropsTypesSource.includes(requiredEditorWorkspaceActionPropsTypesUsage)) {
    throw new Error(
      `record-panel-v2-editor-workspace-action-props.types.ts must own editor action output typing: ${requiredEditorWorkspaceActionPropsTypesUsage}`,
    );
  }
}

const maxEditorWorkspaceActionPropsTypesLines = 6;
if (editorWorkspaceActionPropsTypesLines > maxEditorWorkspaceActionPropsTypesLines) {
  throw new Error(
    `record-panel-v2-editor-workspace-action-props.types.ts exceeded ${maxEditorWorkspaceActionPropsTypesLines} lines: ${editorWorkspaceActionPropsTypesLines}`,
  );
}

for (const requiredEditorWorkspaceDeadLetterActionPropsImport of [
  'from "./record-panel-v2-editor-workspace-action-props.types";',
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
  'from "./record-panel-v2-workspace-props.types";',
  'Pick<RecordEditorWorkspaceProps,',
]) {
  if (editorWorkspaceDeadLetterActionPropsSource.includes(forbiddenEditorWorkspaceDeadLetterActionPropsToken)) {
    throw new Error(
      `record-panel-v2-editor-workspace-dead-letter-action-props.ts must keep dead-letter input typing delegated: ${forbiddenEditorWorkspaceDeadLetterActionPropsToken}`,
    );
  }
}

for (const requiredEditorWorkspaceDeadLetterActionPropsUsage of [
  "export function buildRecordEditorWorkspaceDeadLetterActionProps({",
  "}: RecordEditorWorkspaceDeadLetterActionPropsInput): RecordEditorWorkspaceDeadLetterActionProps {",
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
  'from "./record-panel-v2-editor-workspace-action-props.types";',
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
  'from "./record-panel-v2-workspace-props.types";',
  "type EditorWorkspacePrimaryActionProps = Pick<",
]) {
  if (editorWorkspacePrimaryActionPropsSource.includes(forbiddenEditorWorkspacePrimaryActionPropsToken)) {
    throw new Error(
      `record-panel-v2-editor-workspace-primary-action-props.ts must keep primary action input typing delegated: ${forbiddenEditorWorkspacePrimaryActionPropsToken}`,
    );
  }
}

for (const requiredEditorWorkspacePrimaryActionPropsUsage of [
  "export function buildRecordEditorWorkspacePrimaryActionProps({",
  "}: RecordEditorWorkspacePrimaryActionPropsInput): RecordEditorWorkspacePrimaryActionProps {",
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
  'from "./record-panel-v2-editor-workspace-prop-input.types";',
]) {
  if (!editorWorkspacePropInputSource.includes(requiredEditorWorkspacePropInputImport)) {
    throw new Error(
      `record-panel-v2-editor-workspace-prop-input.ts must import editor workspace prop-input contracts: ${requiredEditorWorkspacePropInputImport}`,
    );
  }
}

for (const requiredEditorWorkspacePropInputUsage of [
  'export function buildRecordEditorWorkspacePropInput({ props }: BuildRecordEditorWorkspacePropInputArgs)',
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

for (const forbiddenEditorWorkspacePropInputToken of [
  'from "./record-panel-v2-shell-props.types";',
  'Pick<RecordPanelShellInput, "props">',
]) {
  if (editorWorkspacePropInputSource.includes(forbiddenEditorWorkspacePropInputToken)) {
    throw new Error(
      `record-panel-v2-editor-workspace-prop-input.ts must keep editor workspace prop-input arg typing delegated: ${forbiddenEditorWorkspacePropInputToken}`,
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
  'from "./record-panel-v2-editor-workspace-controller-input.types";',
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
  "export function buildRecordEditorWorkspaceControllerInput({ ...input }: BuildRecordEditorWorkspaceControllerInputArgs) {",
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
  'from "./record-panel-v2-shell-props.types";',
  'Pick<RecordPanelShellInput, "controller">',
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
  'from "./record-panel-v2-editor-workspace-controller-input.types";',
]) {
  if (!editorWorkspaceControllerActionInputSource.includes(requiredEditorWorkspaceControllerActionInputImport)) {
    throw new Error(
      `record-panel-v2-editor-workspace-controller-action-input.ts must import controller action-input contracts: ${requiredEditorWorkspaceControllerActionInputImport}`,
    );
  }
}

for (const requiredEditorWorkspaceControllerActionInputUsage of [
  "export function buildRecordEditorWorkspaceControllerActionInput({ controller }: BuildRecordEditorWorkspaceControllerInputArgs)",
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

for (const forbiddenEditorWorkspaceControllerActionInputToken of [
  'from "./record-panel-v2-shell-props.types";',
  'Pick<RecordPanelShellInput, "controller">',
]) {
  if (editorWorkspaceControllerActionInputSource.includes(forbiddenEditorWorkspaceControllerActionInputToken)) {
    throw new Error(
      `record-panel-v2-editor-workspace-controller-action-input.ts must keep controller action arg typing delegated: ${forbiddenEditorWorkspaceControllerActionInputToken}`,
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
  'from "./record-panel-v2-editor-workspace-controller-input.types";',
]) {
  if (!editorWorkspaceControllerDisplayInputSource.includes(requiredEditorWorkspaceControllerDisplayInputImport)) {
    throw new Error(
      `record-panel-v2-editor-workspace-controller-display-input.ts must import controller display-input contracts: ${requiredEditorWorkspaceControllerDisplayInputImport}`,
    );
  }
}

for (const requiredEditorWorkspaceControllerDisplayInputUsage of [
  "export function buildRecordEditorWorkspaceControllerDisplayInput({ controller }: BuildRecordEditorWorkspaceControllerInputArgs)",
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

for (const forbiddenEditorWorkspaceControllerDisplayInputToken of [
  'from "./record-panel-v2-shell-props.types";',
  'Pick<RecordPanelShellInput, "controller">',
]) {
  if (editorWorkspaceControllerDisplayInputSource.includes(forbiddenEditorWorkspaceControllerDisplayInputToken)) {
    throw new Error(
      `record-panel-v2-editor-workspace-controller-display-input.ts must keep controller display arg typing delegated: ${forbiddenEditorWorkspaceControllerDisplayInputToken}`,
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
  'from "./record-panel-v2-editor-workspace-controller-input.types";',
]) {
  if (!editorWorkspaceControllerFormatterInputSource.includes(requiredEditorWorkspaceControllerFormatterInputImport)) {
    throw new Error(
      `record-panel-v2-editor-workspace-controller-formatter-input.ts must import controller formatter-input contracts: ${requiredEditorWorkspaceControllerFormatterInputImport}`,
    );
  }
}

for (const requiredEditorWorkspaceControllerFormatterInputUsage of [
  "export function buildRecordEditorWorkspaceControllerFormatterInput({ controller }: BuildRecordEditorWorkspaceControllerInputArgs)",
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

for (const forbiddenEditorWorkspaceControllerFormatterInputToken of [
  'from "./record-panel-v2-shell-props.types";',
  'Pick<RecordPanelShellInput, "controller">',
]) {
  if (editorWorkspaceControllerFormatterInputSource.includes(forbiddenEditorWorkspaceControllerFormatterInputToken)) {
    throw new Error(
      `record-panel-v2-editor-workspace-controller-formatter-input.ts must keep controller formatter arg typing delegated: ${forbiddenEditorWorkspaceControllerFormatterInputToken}`,
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

for (const requiredShellPropsTypesImport of [
  'from "./record-panel-controller-output.types";',
  'from "./record-panel-header.types";',
  'from "./record-panel-v2.types";',
]) {
  if (!shellPropsTypesSource.includes(requiredShellPropsTypesImport)) {
    throw new Error(
      `record-panel-v2-shell-props.types.ts must import explicit shell boundaries: ${requiredShellPropsTypesImport}`,
    );
  }
}

for (const requiredShellPropsTypesUsage of [
  "export type RecordPanelHeaderProps = RecordPanelHeaderComponentProps;",
  "export type RecordPanelController = RecordPanelControllerValue;",
  "export type RecordPanelShellInput = { controller: RecordPanelController; props: RecordPanelV2Props };",
]) {
  if (!shellPropsTypesSource.includes(requiredShellPropsTypesUsage)) {
    throw new Error(
      `record-panel-v2-shell-props.types.ts must own shell input typing through explicit boundaries: ${requiredShellPropsTypesUsage}`,
    );
  }
}

for (const forbiddenShellPropsTypesToken of [
  "ComponentProps<",
  "RecordPanelHeader }",
  "ReturnType<",
  'from "./record-panel-header";',
  'from "./use-record-panel-controller"',
]) {
  if (shellPropsTypesSource.includes(forbiddenShellPropsTypesToken)) {
    throw new Error(
      `record-panel-v2-shell-props.types.ts must keep component and hook inference delegated: ${forbiddenShellPropsTypesToken}`,
    );
  }
}

const maxShellPropsTypesLines = 8;
if (shellPropsTypesLines > maxShellPropsTypesLines) {
  throw new Error(
    `record-panel-v2-shell-props.types.ts exceeded ${maxShellPropsTypesLines} lines: ${shellPropsTypesLines}`,
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

for (const requiredHeaderPropsImport of [
  'from "./record-panel-v2-shell-props.types";',
  'from "./record-panel-v2-header-props.types";',
]) {
  if (!headerPropsSource.includes(requiredHeaderPropsImport)) {
    throw new Error(
      `record-panel-v2-header-props.ts must import delegated header-prop contracts: ${requiredHeaderPropsImport}`,
    );
  }
}

for (const requiredHeaderPropsUsage of [
  "export function buildRecordPanelHeaderProps({ canWriteWorkspace, onSelectRecord, panelCopy, workspaceId }: BuildRecordPanelHeaderPropsInput): RecordPanelHeaderProps",
  "onCreateRecord: () => onSelectRecord(null)",
]) {
  if (!headerPropsSource.includes(requiredHeaderPropsUsage)) {
    throw new Error(
      `record-panel-v2-header-props.ts must keep header prop assembly focused: ${requiredHeaderPropsUsage}`,
    );
  }
}

for (const forbiddenHeaderPropsToken of [
  'from "./record-panel-v2.types";',
  "canWriteWorkspace: boolean;",
  'onSelectRecord: RecordPanelV2Props["onSelectRecord"];',
  'panelCopy: RecordPanelHeaderProps["panelCopy"];',
  "workspaceId: string;",
]) {
  if (headerPropsSource.includes(forbiddenHeaderPropsToken)) {
    throw new Error(
      `record-panel-v2-header-props.ts must keep header prop typing delegated: ${forbiddenHeaderPropsToken}`,
    );
  }
}

const maxHeaderPropsLines = 12;
if (headerPropsLines > maxHeaderPropsLines) {
  throw new Error(
    `record-panel-v2-header-props.ts exceeded ${maxHeaderPropsLines} lines: ${headerPropsLines}`,
  );
}

for (const requiredHeaderPropsTypesImport of [
  'from "./record-panel-v2-shell-props.types";',
  'from "./record-panel-v2.types";',
]) {
  if (!headerPropsTypesSource.includes(requiredHeaderPropsTypesImport)) {
    throw new Error(
      `record-panel-v2-header-props.types.ts must import header prop input contracts: ${requiredHeaderPropsTypesImport}`,
    );
  }
}

for (const requiredHeaderPropsTypesUsage of [
  'export type BuildRecordPanelHeaderPropsInput = { canWriteWorkspace: boolean; onSelectRecord: RecordPanelV2Props["onSelectRecord"]; panelCopy: RecordPanelHeaderProps["panelCopy"]; workspaceId: string };',
]) {
  if (!headerPropsTypesSource.includes(requiredHeaderPropsTypesUsage)) {
    throw new Error(
      `record-panel-v2-header-props.types.ts must own header prop input typing: ${requiredHeaderPropsTypesUsage}`,
    );
  }
}

const maxHeaderPropsTypesLines = 5;
if (headerPropsTypesLines > maxHeaderPropsTypesLines) {
  throw new Error(
    `record-panel-v2-header-props.types.ts exceeded ${maxHeaderPropsTypesLines} lines: ${headerPropsTypesLines}`,
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
  'from "./use-record-panel-controller-sync.types";',
]) {
  if (!controllerSyncInputSource.includes(requiredControllerSyncInputImport)) {
    throw new Error(
      `record-panel-controller-sync-input.ts must import delegated sync-input contracts: ${requiredControllerSyncInputImport}`,
    );
  }
}

for (const requiredControllerSyncInputUsage of [
  "export function buildRecordPanelControllerSyncInput({",
  "}: BuildRecordPanelControllerSyncInputArgs) {",
  "actionableDeadLetterIds: viewData.actionableDeadLetterIds,",
  "setSelectedDeadLetterIds: state.setSelectedDeadLetterIds,",
]) {
  if (!controllerSyncInputSource.includes(requiredControllerSyncInputUsage)) {
    throw new Error(
      `record-panel-controller-sync-input.ts must own sync-input assembly: ${requiredControllerSyncInputUsage}`,
    );
  }
}

for (const forbiddenControllerSyncInputToken of [
  'from "./record-panel-controller.types";',
  'from "./use-record-panel-controller-state";',
  'from "./use-record-panel-controller-view-data";',
  "type ControllerState = ReturnType<",
  "type ControllerViewData = ReturnType<",
  'props: Pick<ControllerProps, "recordFilter">;',
  'viewData: Pick<ControllerViewData, "actionableDeadLetterIds" | "selectedRecord">;',
]) {
  if (controllerSyncInputSource.includes(forbiddenControllerSyncInputToken)) {
    throw new Error(
      `record-panel-controller-sync-input.ts must keep sync-input typing delegated: ${forbiddenControllerSyncInputToken}`,
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
  'from "./record-panel-controller-state-result.types";',
  'from "./record-panel-controller-view-data-result.types";',
]) {
  if (!controllerSyncTypesSource.includes(requiredControllerSyncTypesImport)) {
    throw new Error(
      `use-record-panel-controller-sync.types.ts must import controller sync-type dependencies: ${requiredControllerSyncTypesImport}`,
    );
  }
}

for (const requiredControllerSyncTypesUsage of [
  'export type BuildRecordPanelControllerSyncInputArgs = { props: Pick<ControllerProps, "recordFilter">; state: Pick<BuildRecordPanelControllerStateResultInput, "setFilterDraft" | "setForm" | "setLocationReviewForm" | "setReminderForm" | "setSelectedDeadLetterIds">; viewData: Pick<BuildRecordPanelControllerViewDataResultInput, "actionableDeadLetterIds" | "selectedRecord">; };',
  'export type RecordPanelControllerSyncInput = { recordFilter: ControllerProps["recordFilter"] } &',
  'BuildRecordPanelControllerViewDataResultInput',
  'BuildRecordPanelControllerStateResultInput',
  '"actionableDeadLetterIds" | "selectedRecord"',
  '"recordFilter"',
]) {
  if (!controllerSyncTypesSource.includes(requiredControllerSyncTypesUsage)) {
    throw new Error(
      `use-record-panel-controller-sync.types.ts must own controller sync typing: ${requiredControllerSyncTypesUsage}`,
    );
  }
}

for (const forbiddenControllerSyncTypesToken of [
  'from "./use-record-panel-controller-state";',
  'from "./use-record-panel-controller-view-data";',
  "type ControllerState = ReturnType<typeof useRecordPanelControllerState>;",
  "type ControllerViewData = ReturnType<typeof useRecordPanelControllerViewData>;",
  "ControllerState,",
  "ControllerViewData,",
]) {
  if (controllerSyncTypesSource.includes(forbiddenControllerSyncTypesToken)) {
    throw new Error(
      `use-record-panel-controller-sync.types.ts must keep sync typing delegated to result boundaries: ${forbiddenControllerSyncTypesToken}`,
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
  'from "./use-record-panel-controller-dead-letter-sync.types";',
]) {
  if (!controllerDeadLetterSyncSource.includes(requiredControllerDeadLetterSyncImport)) {
    throw new Error(
      `use-record-panel-controller-dead-letter-sync.ts must import dead-letter sync contracts: ${requiredControllerDeadLetterSyncImport}`,
    );
  }
}

for (const requiredControllerDeadLetterSyncUsage of [
  "export function useRecordPanelControllerDeadLetterSync({ actionableDeadLetterIds, setSelectedDeadLetterIds }: UseRecordPanelControllerDeadLetterSyncInput)",
  "useEffect(() => {",
  "setSelectedDeadLetterIds((current) => current.filter((item) => actionableDeadLetterIds.has(item)))",
]) {
  if (!controllerDeadLetterSyncSource.includes(requiredControllerDeadLetterSyncUsage)) {
    throw new Error(
      `use-record-panel-controller-dead-letter-sync.ts must own dead-letter selection sync: ${requiredControllerDeadLetterSyncUsage}`,
    );
  }
}

for (const forbiddenControllerDeadLetterSyncToken of [
  "actionableDeadLetterIds: Set<string>;",
  "setSelectedDeadLetterIds: Dispatch<SetStateAction<string[]>>;",
]) {
  if (controllerDeadLetterSyncSource.includes(forbiddenControllerDeadLetterSyncToken)) {
    throw new Error(
      `use-record-panel-controller-dead-letter-sync.ts must keep dead-letter sync typing delegated: ${forbiddenControllerDeadLetterSyncToken}`,
    );
  }
}

const maxControllerDeadLetterSyncLines = 10;
if (controllerDeadLetterSyncLines > maxControllerDeadLetterSyncLines) {
  throw new Error(
    `use-record-panel-controller-dead-letter-sync.ts exceeded ${maxControllerDeadLetterSyncLines} lines: ${controllerDeadLetterSyncLines}`,
  );
}

for (const requiredControllerDeadLetterSyncTypesImport of ['from "react";']) {
  if (!controllerDeadLetterSyncTypesSource.includes(requiredControllerDeadLetterSyncTypesImport)) {
    throw new Error(
      `use-record-panel-controller-dead-letter-sync.types.ts must import dead-letter sync type contracts: ${requiredControllerDeadLetterSyncTypesImport}`,
    );
  }
}

for (const requiredControllerDeadLetterSyncTypesUsage of [
  "export type UseRecordPanelControllerDeadLetterSyncInput = { actionableDeadLetterIds: Set<string>; setSelectedDeadLetterIds: Dispatch<SetStateAction<string[]>> };",
]) {
  if (!controllerDeadLetterSyncTypesSource.includes(requiredControllerDeadLetterSyncTypesUsage)) {
    throw new Error(
      `use-record-panel-controller-dead-letter-sync.types.ts must own dead-letter sync type contracts: ${requiredControllerDeadLetterSyncTypesUsage}`,
    );
  }
}

const maxControllerDeadLetterSyncTypesLines = 5;
if (controllerDeadLetterSyncTypesLines > maxControllerDeadLetterSyncTypesLines) {
  throw new Error(
    `use-record-panel-controller-dead-letter-sync.types.ts exceeded ${maxControllerDeadLetterSyncTypesLines} lines: ${controllerDeadLetterSyncTypesLines}`,
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
  'from "./use-record-panel-controller-filter-sync.types";',
]) {
  if (!controllerFilterSyncSource.includes(requiredControllerFilterSyncImport)) {
    throw new Error(
      `use-record-panel-controller-filter-sync.ts must import filter sync contracts: ${requiredControllerFilterSyncImport}`,
    );
  }
}

for (const requiredControllerFilterSyncUsage of [
  "export function useRecordPanelControllerFilterSync({ recordFilter, setFilterDraft }: UseRecordPanelControllerFilterSyncInput)",
  "useEffect(() => {",
  "setFilterDraft(recordFilter)",
]) {
  if (!controllerFilterSyncSource.includes(requiredControllerFilterSyncUsage)) {
    throw new Error(
      `use-record-panel-controller-filter-sync.ts must own filter draft sync: ${requiredControllerFilterSyncUsage}`,
    );
  }
}

for (const forbiddenControllerFilterSyncToken of [
  "recordFilter: RecordFilterState;",
  "setFilterDraft: Dispatch<SetStateAction<RecordFilterState>>;",
]) {
  if (controllerFilterSyncSource.includes(forbiddenControllerFilterSyncToken)) {
    throw new Error(
      `use-record-panel-controller-filter-sync.ts must keep filter sync typing delegated: ${forbiddenControllerFilterSyncToken}`,
    );
  }
}

const maxControllerFilterSyncLines = 15;
if (controllerFilterSyncLines > maxControllerFilterSyncLines) {
  throw new Error(
    `use-record-panel-controller-filter-sync.ts exceeded ${maxControllerFilterSyncLines} lines: ${controllerFilterSyncLines}`,
  );
}

for (const requiredControllerFilterSyncTypesImport of [
  'from "react";',
  'from "../lib/types";',
]) {
  if (!controllerFilterSyncTypesSource.includes(requiredControllerFilterSyncTypesImport)) {
    throw new Error(
      `use-record-panel-controller-filter-sync.types.ts must import filter sync type contracts: ${requiredControllerFilterSyncTypesImport}`,
    );
  }
}

for (const requiredControllerFilterSyncTypesUsage of [
  "export type UseRecordPanelControllerFilterSyncInput = { recordFilter: RecordFilterState; setFilterDraft: Dispatch<SetStateAction<RecordFilterState>> };",
]) {
  if (!controllerFilterSyncTypesSource.includes(requiredControllerFilterSyncTypesUsage)) {
    throw new Error(
      `use-record-panel-controller-filter-sync.types.ts must own filter sync type contracts: ${requiredControllerFilterSyncTypesUsage}`,
    );
  }
}

const maxControllerFilterSyncTypesLines = 6;
if (controllerFilterSyncTypesLines > maxControllerFilterSyncTypesLines) {
  throw new Error(
    `use-record-panel-controller-filter-sync.types.ts exceeded ${maxControllerFilterSyncTypesLines} lines: ${controllerFilterSyncTypesLines}`,
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
  'from "./use-record-panel-controller-view-data.types";',
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
  "export function useRecordPanelControllerViewData({ mediaAssets, mediaDeadLetterOverview, records, selectedRecordId }: UseRecordPanelControllerViewDataInput)",
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
  "mediaAssets: MediaAsset[];",
  "mediaDeadLetterOverview: MediaDeadLetterOverview | null;",
  "records: RecordItem[];",
  "selectedRecordId?: string | null;",
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

for (const requiredControllerViewDataTypesImport of ['from "../lib/types";']) {
  if (!controllerViewDataTypesSource.includes(requiredControllerViewDataTypesImport)) {
    throw new Error(
      `use-record-panel-controller-view-data.types.ts must import view-data input contracts: ${requiredControllerViewDataTypesImport}`,
    );
  }
}

for (const requiredControllerViewDataTypesUsage of [
  "export type UseRecordPanelControllerViewDataInput = { mediaAssets: MediaAsset[]; mediaDeadLetterOverview: MediaDeadLetterOverview | null; records: RecordItem[]; selectedRecordId?: string | null };",
]) {
  if (!controllerViewDataTypesSource.includes(requiredControllerViewDataTypesUsage)) {
    throw new Error(
      `use-record-panel-controller-view-data.types.ts must own view-data input typing: ${requiredControllerViewDataTypesUsage}`,
    );
  }
}

const maxControllerViewDataTypesLines = 5;
if (controllerViewDataTypesLines > maxControllerViewDataTypesLines) {
  throw new Error(
    `use-record-panel-controller-view-data.types.ts exceeded ${maxControllerViewDataTypesLines} lines: ${controllerViewDataTypesLines}`,
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
  'from "./record-panel-controller-record-view-data.types";',
  'from "./record-panel-controller-view-data-helpers";',
]) {
  if (!controllerRecordViewDataSource.includes(requiredControllerRecordViewDataImport)) {
    throw new Error(
      `record-panel-controller-record-view-data.ts must import record view-data contracts: ${requiredControllerRecordViewDataImport}`,
    );
  }
}

for (const requiredControllerRecordViewDataUsage of [
  "export function buildRecordPanelRecordViewData({ records, selectedRecordId }: BuildRecordPanelRecordViewDataInput)",
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

for (const forbiddenControllerRecordViewDataToken of [
  'from "../lib/types";',
  "{ records: RecordItem[]; selectedRecordId?: string | null }",
]) {
  if (controllerRecordViewDataSource.includes(forbiddenControllerRecordViewDataToken)) {
    throw new Error(
      `record-panel-controller-record-view-data.ts must keep record view-data typing delegated: ${forbiddenControllerRecordViewDataToken}`,
    );
  }
}

const maxControllerRecordViewDataLines = 10;
if (controllerRecordViewDataLines > maxControllerRecordViewDataLines) {
  throw new Error(
    `record-panel-controller-record-view-data.ts exceeded ${maxControllerRecordViewDataLines} lines: ${controllerRecordViewDataLines}`,
  );
}

for (const requiredControllerRecordViewDataTypesImport of [
  'from "../lib/types";',
]) {
  if (!controllerRecordViewDataTypesSource.includes(requiredControllerRecordViewDataTypesImport)) {
    throw new Error(
      `record-panel-controller-record-view-data.types.ts must import record view-data type contracts: ${requiredControllerRecordViewDataTypesImport}`,
    );
  }
}

for (const requiredControllerRecordViewDataTypesUsage of [
  "export type BuildRecordPanelRecordViewDataInput = { records: RecordItem[]; selectedRecordId?: string | null };",
]) {
  if (!controllerRecordViewDataTypesSource.includes(requiredControllerRecordViewDataTypesUsage)) {
    throw new Error(
      `record-panel-controller-record-view-data.types.ts must own record view-data type contracts: ${requiredControllerRecordViewDataTypesUsage}`,
    );
  }
}

const maxControllerRecordViewDataTypesLines = 5;
if (controllerRecordViewDataTypesLines > maxControllerRecordViewDataTypesLines) {
  throw new Error(
    `record-panel-controller-record-view-data.types.ts exceeded ${maxControllerRecordViewDataTypesLines} lines: ${controllerRecordViewDataTypesLines}`,
  );
}

for (const requiredControllerSelectedRecordViewDataImport of [
  'from "./record-panel-controller-selected-record-view-data.types";',
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
  "}: BuildRecordPanelSelectedRecordViewDataInput) {",
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

for (const forbiddenControllerSelectedRecordViewDataToken of [
  'from "../lib/types";',
  "mediaAssets: MediaAsset[];",
  "mediaDeadLetterOverview: MediaDeadLetterOverview | null;",
  "selectedRecord: RecordItem | null;",
]) {
  if (controllerSelectedRecordViewDataSource.includes(forbiddenControllerSelectedRecordViewDataToken)) {
    throw new Error(
      `record-panel-controller-selected-record-view-data.ts must keep selected-record view-data typing delegated: ${forbiddenControllerSelectedRecordViewDataToken}`,
    );
  }
}

const maxControllerSelectedRecordViewDataLines = 20;
if (controllerSelectedRecordViewDataLines > maxControllerSelectedRecordViewDataLines) {
  throw new Error(
    `record-panel-controller-selected-record-view-data.ts exceeded ${maxControllerSelectedRecordViewDataLines} lines: ${controllerSelectedRecordViewDataLines}`,
  );
}

for (const requiredControllerSelectedRecordViewDataTypesImport of [
  'from "../lib/types";',
]) {
  if (!controllerSelectedRecordViewDataTypesSource.includes(requiredControllerSelectedRecordViewDataTypesImport)) {
    throw new Error(
      `record-panel-controller-selected-record-view-data.types.ts must import selected-record view-data type contracts: ${requiredControllerSelectedRecordViewDataTypesImport}`,
    );
  }
}

for (const requiredControllerSelectedRecordViewDataTypesUsage of [
  "export type BuildRecordPanelSelectedRecordViewDataInput = { mediaAssets: MediaAsset[]; mediaDeadLetterOverview: MediaDeadLetterOverview | null; selectedRecord: RecordItem | null };",
]) {
  if (!controllerSelectedRecordViewDataTypesSource.includes(requiredControllerSelectedRecordViewDataTypesUsage)) {
    throw new Error(
      `record-panel-controller-selected-record-view-data.types.ts must own selected-record view-data type contracts: ${requiredControllerSelectedRecordViewDataTypesUsage}`,
    );
  }
}

const maxControllerSelectedRecordViewDataTypesLines = 5;
if (controllerSelectedRecordViewDataTypesLines > maxControllerSelectedRecordViewDataTypesLines) {
  throw new Error(
    `record-panel-controller-selected-record-view-data.types.ts exceeded ${maxControllerSelectedRecordViewDataTypesLines} lines: ${controllerSelectedRecordViewDataTypesLines}`,
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
  'from "./record-panel-controller-state-result.types";',
]) {
  if (!handlerGroupStateInputTypesSource.includes(requiredHandlerGroupStateInputTypesImport)) {
    throw new Error(
      `record-panel-controller-handler-group-state-input.types.ts must import controller state: ${requiredHandlerGroupStateInputTypesImport}`,
    );
  }
}

for (const requiredHandlerGroupStateInputTypesUsage of [
  "export type RecordPanelControllerHandlerGroupStateInput = Pick<",
  "BuildRecordPanelControllerStateResultInput,",
  '"setSavingReminder"',
  '"setUploading"',
]) {
  if (!handlerGroupStateInputTypesSource.includes(requiredHandlerGroupStateInputTypesUsage)) {
    throw new Error(
      `record-panel-controller-handler-group-state-input.types.ts must own state type slices: ${requiredHandlerGroupStateInputTypesUsage}`,
    );
  }
}

for (const forbiddenHandlerGroupStateInputTypesToken of [
  'from "./use-record-panel-controller-state";',
  "type ControllerState = ReturnType<typeof useRecordPanelControllerState>;",
  "ControllerState,",
]) {
  if (handlerGroupStateInputTypesSource.includes(forbiddenHandlerGroupStateInputTypesToken)) {
    throw new Error(
      `record-panel-controller-handler-group-state-input.types.ts must keep hook return typing delegated: ${forbiddenHandlerGroupStateInputTypesToken}`,
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
  'from "./record-panel-controller-view-data-result.types";',
]) {
  if (!handlerGroupViewDataInputTypesSource.includes(requiredHandlerGroupViewDataInputTypesImport)) {
    throw new Error(
      `record-panel-controller-handler-group-view-data-input.types.ts must import controller view data: ${requiredHandlerGroupViewDataInputTypesImport}`,
    );
  }
}

for (const requiredHandlerGroupViewDataInputTypesUsage of [
  "export type RecordPanelControllerHandlerGroupViewDataInput = Pick<",
  "BuildRecordPanelControllerViewDataResultInput,",
  '"detailCopy" | "selectedRecord"',
]) {
  if (!handlerGroupViewDataInputTypesSource.includes(requiredHandlerGroupViewDataInputTypesUsage)) {
    throw new Error(
      `record-panel-controller-handler-group-view-data-input.types.ts must own view-data type slices: ${requiredHandlerGroupViewDataInputTypesUsage}`,
    );
  }
}

for (const forbiddenHandlerGroupViewDataInputTypesToken of [
  'from "./use-record-panel-controller-view-data";',
  "type ControllerViewData = ReturnType<typeof useRecordPanelControllerViewData>;",
  "ControllerViewData,",
]) {
  if (handlerGroupViewDataInputTypesSource.includes(forbiddenHandlerGroupViewDataInputTypesToken)) {
    throw new Error(
      `record-panel-controller-handler-group-view-data-input.types.ts must keep hook return typing delegated: ${forbiddenHandlerGroupViewDataInputTypesToken}`,
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
  'from "./record-panel-controller-result.types";',
  'from "./record-panel-controller-state-result";',
  'from "./record-panel-controller-view-data-result";',
]) {
  if (!controllerResultSource.includes(requiredControllerResultImport)) {
    throw new Error(
      `record-panel-controller-result.ts must import delegated controller result types: ${requiredControllerResultImport}`,
    );
  }
}

for (const requiredControllerResultUsage of [
  "export function buildRecordPanelControllerResult({",
  "}: BuildRecordPanelControllerResultInput) {",
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
  'from "./record-panel-controller-handler-groups";',
  'from "./use-record-panel-controller-state";',
  'from "./use-record-panel-controller-view-data";',
  "type ControllerState = ReturnType<",
  "type ControllerViewData = ReturnType<",
  "type ControllerHandlers = ReturnType<",
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

for (const requiredControllerResultTypesImport of [
  'from "./record-panel-controller-handler-groups-result.types";',
  'from "./record-panel-controller-state-result.types";',
  'from "./record-panel-controller-view-data-result.types";',
]) {
  if (!controllerResultTypesSource.includes(requiredControllerResultTypesImport)) {
    throw new Error(
      `record-panel-controller-result.types.ts must import controller result type contracts: ${requiredControllerResultTypesImport}`,
    );
  }
}

for (const requiredControllerResultTypesUsage of [
  'export type BuildRecordPanelControllerResultInput = { mediaHandlers: BuildRecordPanelControllerHandlerGroupsResultInput["mediaHandlers"]; recordHandlers: BuildRecordPanelControllerHandlerGroupsResultInput["recordHandlers"]; state: BuildRecordPanelControllerStateResultInput; viewData: BuildRecordPanelControllerViewDataResultInput };',
]) {
  if (!controllerResultTypesSource.includes(requiredControllerResultTypesUsage)) {
    throw new Error(
      `record-panel-controller-result.types.ts must own controller result type contracts: ${requiredControllerResultTypesUsage}`,
    );
  }
}

for (const forbiddenControllerResultTypesToken of [
  'from "./record-panel-controller-handler-groups";',
  'from "./use-record-panel-controller-state";',
  'from "./use-record-panel-controller-view-data";',
  "type ControllerState = ReturnType<typeof useRecordPanelControllerState>;",
  "type ControllerViewData = ReturnType<typeof useRecordPanelControllerViewData>;",
  "type ControllerHandlers = ReturnType<typeof createRecordPanelControllerHandlerGroups>;",
  "ControllerState;",
  "ControllerViewData;",
  'ControllerHandlers["mediaHandlers"]',
  'ControllerHandlers["recordHandlers"]',
]) {
  if (controllerResultTypesSource.includes(forbiddenControllerResultTypesToken)) {
    throw new Error(
      `record-panel-controller-result.types.ts must keep result typing delegated to result boundaries: ${forbiddenControllerResultTypesToken}`,
    );
  }
}

const maxControllerResultTypesLines = 8;
if (controllerResultTypesLines > maxControllerResultTypesLines) {
  throw new Error(
    `record-panel-controller-result.types.ts exceeded ${maxControllerResultTypesLines} lines: ${controllerResultTypesLines}`,
  );
}

for (const requiredControllerHandlerGroupsResultTypesImport of [
  'from "./record-panel-controller-handler-groups";',
]) {
  if (!controllerHandlerGroupsResultTypesSource.includes(requiredControllerHandlerGroupsResultTypesImport)) {
    throw new Error(
      `record-panel-controller-handler-groups-result.types.ts must import handler-groups result contracts: ${requiredControllerHandlerGroupsResultTypesImport}`,
    );
  }
}

for (const requiredControllerHandlerGroupsResultTypesUsage of [
  "export type BuildRecordPanelControllerHandlerGroupsResultInput = ReturnType<typeof createRecordPanelControllerHandlerGroups>;",
]) {
  if (!controllerHandlerGroupsResultTypesSource.includes(requiredControllerHandlerGroupsResultTypesUsage)) {
    throw new Error(
      `record-panel-controller-handler-groups-result.types.ts must own handler-groups result typing: ${requiredControllerHandlerGroupsResultTypesUsage}`,
    );
  }
}

const maxControllerHandlerGroupsResultTypesLines = 4;
if (controllerHandlerGroupsResultTypesLines > maxControllerHandlerGroupsResultTypesLines) {
  throw new Error(
    `record-panel-controller-handler-groups-result.types.ts exceeded ${maxControllerHandlerGroupsResultTypesLines} lines: ${controllerHandlerGroupsResultTypesLines}`,
  );
}

for (const requiredControllerStateResultImport of [
  'from "./record-panel-controller-state-result.types";',
]) {
  if (!controllerStateResultSource.includes(requiredControllerStateResultImport)) {
    throw new Error(
      `record-panel-controller-state-result.ts must import controller state dependencies: ${requiredControllerStateResultImport}`,
    );
  }
}

for (const requiredControllerStateResultUsage of [
  "export function buildRecordPanelControllerStateResult(state: BuildRecordPanelControllerStateResultInput)",
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

for (const forbiddenControllerStateResultToken of [
  'from "./use-record-panel-controller-state";',
  "type ControllerState = ReturnType<",
]) {
  if (controllerStateResultSource.includes(forbiddenControllerStateResultToken)) {
    throw new Error(
      `record-panel-controller-state-result.ts must keep state result typing delegated: ${forbiddenControllerStateResultToken}`,
    );
  }
}

const maxControllerStateResultLines = 35;
if (controllerStateResultLines > maxControllerStateResultLines) {
  throw new Error(
    `record-panel-controller-state-result.ts exceeded ${maxControllerStateResultLines} lines: ${controllerStateResultLines}`,
  );
}

for (const requiredControllerStateResultTypesImport of [
  'from "./use-record-panel-controller-state";',
]) {
  if (!controllerStateResultTypesSource.includes(requiredControllerStateResultTypesImport)) {
    throw new Error(
      `record-panel-controller-state-result.types.ts must import controller state result type contracts: ${requiredControllerStateResultTypesImport}`,
    );
  }
}

for (const requiredControllerStateResultTypesUsage of [
  "export type BuildRecordPanelControllerStateResultInput = ReturnType<typeof useRecordPanelControllerState>;",
]) {
  if (!controllerStateResultTypesSource.includes(requiredControllerStateResultTypesUsage)) {
    throw new Error(
      `record-panel-controller-state-result.types.ts must own controller state result type contracts: ${requiredControllerStateResultTypesUsage}`,
    );
  }
}

const maxControllerStateResultTypesLines = 5;
if (controllerStateResultTypesLines > maxControllerStateResultTypesLines) {
  throw new Error(
    `record-panel-controller-state-result.types.ts exceeded ${maxControllerStateResultTypesLines} lines: ${controllerStateResultTypesLines}`,
  );
}

for (const requiredControllerViewDataResultImport of [
  'from "./record-panel-controller-core-view-data-result";',
  'from "./record-panel-controller-localized-view-data-result";',
  'from "./record-panel-controller-view-data-result.types";',
]) {
  if (!controllerViewDataResultSource.includes(requiredControllerViewDataResultImport)) {
    throw new Error(
      `record-panel-controller-view-data-result.ts must import controller view-data dependencies: ${requiredControllerViewDataResultImport}`,
    );
  }
}

for (const requiredControllerViewDataResultUsage of [
  "export function buildRecordPanelControllerViewDataResult(viewData: BuildRecordPanelControllerViewDataResultInput)",
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
  'from "./use-record-panel-controller-view-data";',
  "type ControllerViewData = ReturnType<",
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

for (const requiredControllerViewDataResultTypesImport of [
  'from "./use-record-panel-controller-view-data";',
]) {
  if (!controllerViewDataResultTypesSource.includes(requiredControllerViewDataResultTypesImport)) {
    throw new Error(
      `record-panel-controller-view-data-result.types.ts must import controller view-data result type contracts: ${requiredControllerViewDataResultTypesImport}`,
    );
  }
}

for (const requiredControllerViewDataResultTypesUsage of [
  "export type BuildRecordPanelControllerViewDataResultInput = ReturnType<typeof useRecordPanelControllerViewData>;",
]) {
  if (!controllerViewDataResultTypesSource.includes(requiredControllerViewDataResultTypesUsage)) {
    throw new Error(
      `record-panel-controller-view-data-result.types.ts must own controller view-data result type contracts: ${requiredControllerViewDataResultTypesUsage}`,
    );
  }
}

const maxControllerViewDataResultTypesLines = 5;
if (controllerViewDataResultTypesLines > maxControllerViewDataResultTypesLines) {
  throw new Error(
    `record-panel-controller-view-data-result.types.ts exceeded ${maxControllerViewDataResultTypesLines} lines: ${controllerViewDataResultTypesLines}`,
  );
}

for (const requiredControllerCoreViewDataResultImport of [
  'from "./record-panel-controller-view-data-result.types";',
]) {
  if (!controllerCoreViewDataResultSource.includes(requiredControllerCoreViewDataResultImport)) {
    throw new Error(
      `record-panel-controller-core-view-data-result.ts must import controller view-data dependencies: ${requiredControllerCoreViewDataResultImport}`,
    );
  }
}

for (const requiredControllerCoreViewDataResultUsage of [
  "export function buildRecordPanelControllerCoreViewDataResult(viewData: BuildRecordPanelControllerViewDataResultInput)",
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

for (const forbiddenControllerCoreViewDataResultToken of [
  'from "./use-record-panel-controller-view-data";',
  "type ControllerViewData = ReturnType<",
]) {
  if (controllerCoreViewDataResultSource.includes(forbiddenControllerCoreViewDataResultToken)) {
    throw new Error(
      `record-panel-controller-core-view-data-result.ts must keep core view-data typing delegated: ${forbiddenControllerCoreViewDataResultToken}`,
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
  'from "./record-panel-controller-view-data-result.types";',
]) {
  if (!controllerLocalizedViewDataResultSource.includes(requiredControllerLocalizedViewDataResultImport)) {
    throw new Error(
      `record-panel-controller-localized-view-data-result.ts must import controller view-data dependencies: ${requiredControllerLocalizedViewDataResultImport}`,
    );
  }
}

for (const requiredControllerLocalizedViewDataResultUsage of [
  "export function buildRecordPanelControllerLocalizedViewDataResult(viewData: BuildRecordPanelControllerViewDataResultInput)",
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

for (const forbiddenControllerLocalizedViewDataResultToken of [
  'from "./use-record-panel-controller-view-data";',
  "type ControllerViewData = ReturnType<",
]) {
  if (controllerLocalizedViewDataResultSource.includes(forbiddenControllerLocalizedViewDataResultToken)) {
    throw new Error(
      `record-panel-controller-localized-view-data-result.ts must keep localized view-data typing delegated: ${forbiddenControllerLocalizedViewDataResultToken}`,
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
  'from "./record-panel-controller-filter-apply-action.types";',
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
  "}: RecordPanelControllerFilterApplyActionInput) {",
  "await onApplyRecordFilter(filterDraft)",
  "getRecordPanelFilterErrorMessage(caught, detailCopy.applyFilterError)",
]) {
  if (!filterApplyActionSource.includes(requiredFilterApplyActionUsage)) {
    throw new Error(
      `record-panel-controller-filter-apply-action.ts must own filter-apply details: ${requiredFilterApplyActionUsage}`,
    );
  }
}

for (const forbiddenFilterApplyActionToken of [
  'from "../lib/record-panel-detail";',
  'from "./record-panel-controller.types";',
  "type DetailCopy = ReturnType<",
  'filterDraft: ControllerProps["recordFilter"]',
]) {
  if (filterApplyActionSource.includes(forbiddenFilterApplyActionToken)) {
    throw new Error(
      `record-panel-controller-filter-apply-action.ts must keep filter-apply typing delegated: ${forbiddenFilterApplyActionToken}`,
    );
  }
}

const maxFilterApplyActionLines = 30;
if (filterApplyActionLines > maxFilterApplyActionLines) {
  throw new Error(
    `record-panel-controller-filter-apply-action.ts exceeded ${maxFilterApplyActionLines} lines: ${filterApplyActionLines}`,
  );
}

for (const requiredFilterApplyActionTypesImport of [
  'from "./record-panel-controller.types";',
  'from "./record-panel-controller-detail-copy.types";',
]) {
  if (!filterApplyActionTypesSource.includes(requiredFilterApplyActionTypesImport)) {
    throw new Error(
      `record-panel-controller-filter-apply-action.types.ts must import filter-apply type contracts: ${requiredFilterApplyActionTypesImport}`,
    );
  }
}

for (const requiredFilterApplyActionTypesUsage of [
  'export type RecordPanelControllerFilterApplyActionInput = { detailCopy: RecordPanelControllerDetailCopy; filterDraft: ControllerProps["recordFilter"]; onApplyRecordFilter: ControllerProps["onApplyRecordFilter"]; setError: (value: string) => void };',
]) {
  if (!filterApplyActionTypesSource.includes(requiredFilterApplyActionTypesUsage)) {
    throw new Error(
      `record-panel-controller-filter-apply-action.types.ts must own filter-apply type contracts: ${requiredFilterApplyActionTypesUsage}`,
    );
  }
}

for (const forbiddenFilterApplyActionTypesToken of [
  'from "../lib/record-panel-detail";',
  'type DetailCopy = ReturnType<typeof getRecordPanelDetailBundle>["copy"];',
  "detailCopy: DetailCopy;",
]) {
  if (filterApplyActionTypesSource.includes(forbiddenFilterApplyActionTypesToken)) {
    throw new Error(
      `record-panel-controller-filter-apply-action.types.ts must keep detail-copy typing delegated: ${forbiddenFilterApplyActionTypesToken}`,
    );
  }
}

const maxFilterApplyActionTypesLines = 6;
if (filterApplyActionTypesLines > maxFilterApplyActionTypesLines) {
  throw new Error(
    `record-panel-controller-filter-apply-action.types.ts exceeded ${maxFilterApplyActionTypesLines} lines: ${filterApplyActionTypesLines}`,
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
  'from "../lib/types";',
  'from "./record-panel-controller.types";',
  'from "./record-panel-controller-detail-copy.types";',
]) {
  if (!filterPresetActionInputTypesSource.includes(requiredFilterPresetActionInputTypesImport)) {
    throw new Error(
      `record-panel-controller-filter-preset-action-input.types.ts must import preset-action input contracts: ${requiredFilterPresetActionInputTypesImport}`,
    );
  }
}

for (const requiredFilterPresetActionInputTypesUsage of [
  "export type RecordPanelControllerFilterPresetActionInput = {",
  "detailCopy: RecordPanelControllerDetailCopy;",
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

for (const forbiddenFilterPresetActionInputTypesToken of [
  'from "../lib/record-panel-detail";',
  "type DetailCopy = ReturnType<typeof getRecordPanelDetailBundle>[\"copy\"];",
  "detailCopy: DetailCopy;",
]) {
  if (filterPresetActionInputTypesSource.includes(forbiddenFilterPresetActionInputTypesToken)) {
    throw new Error(
      `record-panel-controller-filter-preset-action-input.types.ts must keep detail-copy typing delegated: ${forbiddenFilterPresetActionInputTypesToken}`,
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
  'from "./record-panel-controller-filter-preset-save-action.types";',
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
  'from "./record-panel-controller-filter-preset-action-input.types";',
  "type DetailCopy =",
  "RecordPanelControllerFilterPresetActionInput",
  "onCreateSearchPreset: ControllerProps",
  "filterDraft: RecordFilterState;",
  "}: Pick<",
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

for (const requiredFilterPresetSaveActionTypesUsage of [
  'import type { RecordPanelControllerFilterPresetActionInput } from "./record-panel-controller-filter-preset-action-input.types"; export type CreateRecordPanelControllerFilterPresetSaveActionInput = Pick<RecordPanelControllerFilterPresetActionInput, "detailCopy" | "filterDraft" | "onCreateSearchPreset" | "presetName" | "setError" | "setPresetName">;',
]) {
  if (!filterPresetSaveActionTypesSource.includes(requiredFilterPresetSaveActionTypesUsage)) {
    throw new Error(
      `record-panel-controller-filter-preset-save-action.types.ts must own preset-save input typing: ${requiredFilterPresetSaveActionTypesUsage}`,
    );
  }
}

const maxFilterPresetSaveActionTypesLines = 2;
if (filterPresetSaveActionTypesLines > maxFilterPresetSaveActionTypesLines) {
  throw new Error(
    `record-panel-controller-filter-preset-save-action.types.ts exceeded ${maxFilterPresetSaveActionTypesLines} lines: ${filterPresetSaveActionTypesLines}`,
  );
}

for (const requiredFilterPresetDeleteActionImport of [
  'from "./record-panel-controller-filter-helpers";',
  'from "./record-panel-controller-filter-preset-delete-action.types";',
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
  'from "./record-panel-controller-filter-preset-action-input.types";',
  "type DetailCopy =",
  "RecordPanelControllerFilterPresetActionInput",
  "onDeleteSearchPreset: ControllerProps",
  "}: Pick<",
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

for (const requiredFilterPresetDeleteActionTypesUsage of [
  'import type { RecordPanelControllerFilterPresetActionInput } from "./record-panel-controller-filter-preset-action-input.types"; export type CreateRecordPanelControllerFilterPresetDeleteActionInput = Pick<RecordPanelControllerFilterPresetActionInput, "detailCopy" | "onDeleteSearchPreset" | "setError">;',
]) {
  if (!filterPresetDeleteActionTypesSource.includes(requiredFilterPresetDeleteActionTypesUsage)) {
    throw new Error(
      `record-panel-controller-filter-preset-delete-action.types.ts must own preset-delete input typing: ${requiredFilterPresetDeleteActionTypesUsage}`,
    );
  }
}

const maxFilterPresetDeleteActionTypesLines = 2;
if (filterPresetDeleteActionTypesLines > maxFilterPresetDeleteActionTypesLines) {
  throw new Error(
    `record-panel-controller-filter-preset-delete-action.types.ts exceeded ${maxFilterPresetDeleteActionTypesLines} lines: ${filterPresetDeleteActionTypesLines}`,
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
  'from "./record-panel-controller-detail-copy.types";',
  'from "./record-panel-controller-filter-preset-name.types";',
]) {
  if (!filterPresetNameSource.includes(requiredFilterPresetNameImport)) {
    throw new Error(
      `record-panel-controller-filter-preset-name.ts must import preset-name contracts: ${requiredFilterPresetNameImport}`,
    );
  }
}

for (const requiredFilterPresetNameUsage of [
  "export function resolveRecordPanelPresetName(",
  "detailCopy: RecordPanelControllerDetailCopy,",
  "presetNameRequiredError",
]) {
  if (!filterPresetNameSource.includes(requiredFilterPresetNameUsage)) {
    throw new Error(
      `record-panel-controller-filter-preset-name.ts must own preset-name validation: ${requiredFilterPresetNameUsage}`,
    );
  }
}

for (const forbiddenFilterPresetNameToken of [
  'from "../lib/record-panel-detail";',
  "type PresetNameResolution = { errorMessage: string } | { presetName: string };",
  'type DetailCopy = ReturnType<typeof getRecordPanelDetailBundle>["copy"];',
  "detailCopy: DetailCopy,",
]) {
  if (filterPresetNameSource.includes(forbiddenFilterPresetNameToken)) {
    throw new Error(
      `record-panel-controller-filter-preset-name.ts must keep detail-copy typing delegated: ${forbiddenFilterPresetNameToken}`,
    );
  }
}

const maxFilterPresetNameLines = 20;
if (filterPresetNameLines > maxFilterPresetNameLines) {
  throw new Error(
    `record-panel-controller-filter-preset-name.ts exceeded ${maxFilterPresetNameLines} lines: ${filterPresetNameLines}`,
  );
}

for (const requiredFilterPresetNameTypesUsage of [
  'export type PresetNameResolution = { errorMessage: string } | { presetName: string };',
]) {
  if (!filterPresetNameTypesSource.includes(requiredFilterPresetNameTypesUsage)) {
    throw new Error(
      `record-panel-controller-filter-preset-name.types.ts must own preset-name result typing: ${requiredFilterPresetNameTypesUsage}`,
    );
  }
}

const maxFilterPresetNameTypesLines = 2;
if (filterPresetNameTypesLines > maxFilterPresetNameTypesLines) {
  throw new Error(
    `record-panel-controller-filter-preset-name.types.ts exceeded ${maxFilterPresetNameTypesLines} lines: ${filterPresetNameTypesLines}`,
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
  'from "../lib/types";',
  'from "./record-panel-controller.types";',
  'from "./record-panel-controller-detail-copy.types";',
]) {
  if (!recordDeleteActionInputTypesSource.includes(requiredRecordDeleteActionInputTypesImport)) {
    throw new Error(
      `record-panel-controller-record-delete-action-input.types.ts must import delete input contracts: ${requiredRecordDeleteActionInputTypesImport}`,
    );
  }
}

for (const requiredRecordDeleteActionInputTypesUsage of [
  "export type RecordPanelControllerRecordDeleteActionInput = {",
  "detailCopy: RecordPanelControllerDetailCopy;",
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

for (const forbiddenRecordDeleteActionInputTypesToken of [
  'from "../lib/record-panel-detail";',
  "type DetailCopy = ReturnType<typeof getRecordPanelDetailBundle>[\"copy\"];",
  "detailCopy: DetailCopy;",
]) {
  if (recordDeleteActionInputTypesSource.includes(forbiddenRecordDeleteActionInputTypesToken)) {
    throw new Error(
      `record-panel-controller-record-delete-action-input.types.ts must keep detail-copy typing delegated: ${forbiddenRecordDeleteActionInputTypesToken}`,
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
  'from "./record-panel-controller-detail-copy.types";',
]) {
  if (!recordDeleteHelpersSource.includes(requiredRecordDeleteHelpersImport)) {
    throw new Error(
      `record-panel-controller-record-delete-helpers.ts must import delegated delete copy contracts: ${requiredRecordDeleteHelpersImport}`,
    );
  }
}

for (const requiredRecordDeleteHelpersUsage of [
  "export function getRecordPanelRecordDeleteErrorMessage(",
  "export function getRecordPanelRecordDeleteFallbackMessage(detailCopy: RecordPanelControllerDetailCopy)",
  "return caught instanceof Error ? caught.message : fallbackMessage;",
  "return detailCopy.deleteRecordError;",
]) {
  if (!recordDeleteHelpersSource.includes(requiredRecordDeleteHelpersUsage)) {
    throw new Error(
      `record-panel-controller-record-delete-helpers.ts must own delete helper details: ${requiredRecordDeleteHelpersUsage}`,
    );
  }
}

for (const forbiddenRecordDeleteHelpersToken of [
  'from "../lib/record-panel-detail";',
  'type DetailCopy = ReturnType<typeof getRecordPanelDetailBundle>["copy"];',
  "detailCopy: DetailCopy)",
]) {
  if (recordDeleteHelpersSource.includes(forbiddenRecordDeleteHelpersToken)) {
    throw new Error(
      `record-panel-controller-record-delete-helpers.ts must keep detail-copy typing delegated: ${forbiddenRecordDeleteHelpersToken}`,
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
  'from "../lib/record-panel-forms";',
  'from "../lib/types";',
  'from "./record-panel-controller.types";',
  'from "./record-panel-controller-detail-copy.types";',
]) {
  if (!recordSaveActionInputTypesSource.includes(requiredRecordSaveActionInputTypesImport)) {
    throw new Error(
      `record-panel-controller-record-save-action-input.types.ts must import save action input contracts: ${requiredRecordSaveActionInputTypesImport}`,
    );
  }
}

for (const requiredRecordSaveActionInputTypesUsage of [
  "export type RecordPanelControllerRecordSaveActionInput = {",
  "detailCopy: RecordPanelControllerDetailCopy;",
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

for (const forbiddenRecordSaveActionInputTypesToken of [
  'from "../lib/record-panel-detail";',
  'type DetailCopy = ReturnType<typeof getRecordPanelDetailBundle>["copy"];',
  "detailCopy: DetailCopy;",
]) {
  if (recordSaveActionInputTypesSource.includes(forbiddenRecordSaveActionInputTypesToken)) {
    throw new Error(
      `record-panel-controller-record-save-action-input.types.ts must keep detail-copy typing delegated: ${forbiddenRecordSaveActionInputTypesToken}`,
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
  'from "./record-panel-controller-record-save-success-helpers.types";',
]) {
  if (!recordSaveSuccessHelpersSource.includes(requiredRecordSaveSuccessHelpersImport)) {
    throw new Error(
      `record-panel-controller-record-save-success-helpers.ts must import save success contracts: ${requiredRecordSaveSuccessHelpersImport}`,
    );
  }
}

for (const requiredRecordSaveSuccessHelpersUsage of [
  "export function applyRecordPanelRecordSaveSuccessState({",
  "}: ApplyRecordPanelRecordSaveSuccessStateInput) {",
  "setForm(createEmptyForm())",
]) {
  if (!recordSaveSuccessHelpersSource.includes(requiredRecordSaveSuccessHelpersUsage)) {
    throw new Error(
      `record-panel-controller-record-save-success-helpers.ts must own post-save reset behavior: ${requiredRecordSaveSuccessHelpersUsage}`,
    );
  }
}

for (const forbiddenRecordSaveSuccessHelpersToken of [
  'from "../lib/types";',
  "selectedRecord: RecordItem | null;",
  "setForm: React.Dispatch<React.SetStateAction<RecordFormState>>;",
]) {
  if (recordSaveSuccessHelpersSource.includes(forbiddenRecordSaveSuccessHelpersToken)) {
    throw new Error(
      `record-panel-controller-record-save-success-helpers.ts must keep save success typing delegated: ${forbiddenRecordSaveSuccessHelpersToken}`,
    );
  }
}

const maxRecordSaveSuccessHelpersLines = 20;
if (recordSaveSuccessHelpersLines > maxRecordSaveSuccessHelpersLines) {
  throw new Error(
    `record-panel-controller-record-save-success-helpers.ts exceeded ${maxRecordSaveSuccessHelpersLines} lines: ${recordSaveSuccessHelpersLines}`,
  );
}

for (const requiredRecordSaveSuccessHelpersTypesImport of [
  'from "../lib/record-panel-forms";',
  'from "../lib/types";',
]) {
  if (!recordSaveSuccessHelpersTypesSource.includes(requiredRecordSaveSuccessHelpersTypesImport)) {
    throw new Error(
      `record-panel-controller-record-save-success-helpers.types.ts must import save success type contracts: ${requiredRecordSaveSuccessHelpersImport}`,
    );
  }
}

for (const requiredRecordSaveSuccessHelpersTypesUsage of [
  "export type ApplyRecordPanelRecordSaveSuccessStateInput = { selectedRecord: RecordItem | null; setForm: React.Dispatch<React.SetStateAction<RecordFormState>> };",
]) {
  if (!recordSaveSuccessHelpersTypesSource.includes(requiredRecordSaveSuccessHelpersTypesUsage)) {
    throw new Error(
      `record-panel-controller-record-save-success-helpers.types.ts must own save success type contracts: ${requiredRecordSaveSuccessHelpersTypesUsage}`,
    );
  }
}

const maxRecordSaveSuccessHelpersTypesLines = 5;
if (recordSaveSuccessHelpersTypesLines > maxRecordSaveSuccessHelpersTypesLines) {
  throw new Error(
    `record-panel-controller-record-save-success-helpers.types.ts exceeded ${maxRecordSaveSuccessHelpersTypesLines} lines: ${recordSaveSuccessHelpersTypesLines}`,
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
  "type RecordSaveResolution =",
  "| { payload: RecordSavePayload };",
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

for (const forbiddenRecordSaveResolutionToken of [
  "ReturnType<typeof buildRecordPanelSavePayload>",
]) {
  if (recordSaveResolutionSource.includes(forbiddenRecordSaveResolutionToken)) {
    throw new Error(
      `record-panel-controller-record-save-resolution.ts must keep save payload typing delegated: ${forbiddenRecordSaveResolutionToken}`,
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
  'export type { BuildRecordSavePayloadInput, RecordSavePayload, ResolveRecordSaveActionInput } from "./record-panel-controller-record-save-payload.types";',
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
  "ResolveRecordSaveActionInput & { latitude: number | null; longitude: number | null }",
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
  'from "../lib/record-panel-forms";',
  'from "../lib/types";',
  'from "./record-panel-controller.types";',
  'from "./record-panel-controller-detail-copy.types";',
]) {
  if (!recordSavePayloadTypesSource.includes(requiredRecordSavePayloadTypesImport)) {
    throw new Error(
      `record-panel-controller-record-save-payload.types.ts must import save payload type contracts: ${requiredRecordSavePayloadTypesImport}`,
    );
  }
}

for (const requiredRecordSavePayloadTypesUsage of [
  'export type RecordSavePayload = Parameters<ControllerProps["onSaveRecord"]>[0];',
  "export type ResolveRecordSaveActionInput = { detailCopy: RecordPanelControllerDetailCopy; form: RecordFormState; locationReviewForm: LocationReviewFormState; selectedRecord: RecordItem | null };",
  "export type BuildRecordSavePayloadInput = ResolveRecordSaveActionInput & { latitude: number | null; longitude: number | null };",
]) {
  if (!recordSavePayloadTypesSource.includes(requiredRecordSavePayloadTypesUsage)) {
    throw new Error(
      `record-panel-controller-record-save-payload.types.ts must own save payload type details: ${requiredRecordSavePayloadTypesUsage}`,
    );
  }
}

for (const forbiddenRecordSavePayloadTypesToken of [
  'from "../lib/record-panel-detail";',
  'type DetailCopy = ReturnType<typeof getRecordPanelDetailBundle>["copy"];',
  "detailCopy: DetailCopy;",
]) {
  if (recordSavePayloadTypesSource.includes(forbiddenRecordSavePayloadTypesToken)) {
    throw new Error(
      `record-panel-controller-record-save-payload.types.ts must keep detail-copy typing delegated: ${forbiddenRecordSavePayloadTypesToken}`,
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
  'from "./record-panel-controller-record-location-payload.types";',
]) {
  if (!recordLocationPayloadSource.includes(requiredRecordLocationPayloadImport)) {
    throw new Error(
      `record-panel-controller-record-location-payload.ts must import location payload contracts: ${requiredRecordLocationPayloadImport}`,
    );
  }
}

for (const requiredRecordLocationPayloadUsage of [
  "export function buildRecordPanelLocationExtraData({",
  "}: BuildRecordPanelLocationExtraDataInput) {",
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

for (const forbiddenRecordLocationPayloadToken of [
  'from "../lib/record-panel-forms";',
  "form: RecordFormState;",
  "latitude: number | null;",
  "locationReviewForm: LocationReviewFormState;",
  "longitude: number | null;",
]) {
  if (recordLocationPayloadSource.includes(forbiddenRecordLocationPayloadToken)) {
    throw new Error(
      `record-panel-controller-record-location-payload.ts must keep location payload typing delegated: ${forbiddenRecordLocationPayloadToken}`,
    );
  }
}

const maxRecordLocationPayloadLines = 40;
if (recordLocationPayloadLines > maxRecordLocationPayloadLines) {
  throw new Error(
    `record-panel-controller-record-location-payload.ts exceeded ${maxRecordLocationPayloadLines} lines: ${recordLocationPayloadLines}`,
  );
}

for (const requiredRecordLocationPayloadTypesImport of [
  'from "../lib/record-panel-forms";',
]) {
  if (!recordLocationPayloadTypesSource.includes(requiredRecordLocationPayloadTypesImport)) {
    throw new Error(
      `record-panel-controller-record-location-payload.types.ts must import location payload type contracts: ${requiredRecordLocationPayloadTypesImport}`,
    );
  }
}

for (const requiredRecordLocationPayloadTypesUsage of [
  "export type BuildRecordPanelLocationExtraDataInput = { form: RecordFormState; latitude: number | null; locationReviewForm: LocationReviewFormState; longitude: number | null };",
]) {
  if (!recordLocationPayloadTypesSource.includes(requiredRecordLocationPayloadTypesUsage)) {
    throw new Error(
      `record-panel-controller-record-location-payload.types.ts must own location payload type contracts: ${requiredRecordLocationPayloadTypesUsage}`,
    );
  }
}

const maxRecordLocationPayloadTypesLines = 5;
if (recordLocationPayloadTypesLines > maxRecordLocationPayloadTypesLines) {
  throw new Error(
    `record-panel-controller-record-location-payload.types.ts exceeded ${maxRecordLocationPayloadTypesLines} lines: ${recordLocationPayloadTypesLines}`,
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
  'from "../lib/record-panel-forms";',
  'from "../lib/types";',
  'from "./record-panel-controller.types";',
  'from "./record-panel-controller-detail-copy.types";',
]) {
  if (!reminderActionInputTypesSource.includes(requiredReminderActionInputTypesImport)) {
    throw new Error(
      `record-panel-controller-reminder-action-input.types.ts must import reminder action input contracts: ${requiredReminderActionInputTypesImport}`,
    );
  }
}

for (const requiredReminderActionInputTypesUsage of [
  "export type RecordPanelControllerReminderActionInput = {",
  "detailCopy: RecordPanelControllerDetailCopy;",
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

for (const forbiddenReminderActionInputTypesToken of [
  'from "../lib/record-panel-detail";',
  'type DetailCopy = ReturnType<typeof getRecordPanelDetailBundle>["copy"];',
  "detailCopy: DetailCopy;",
]) {
  if (reminderActionInputTypesSource.includes(forbiddenReminderActionInputTypesToken)) {
    throw new Error(
      `record-panel-controller-reminder-action-input.types.ts must keep detail-copy typing delegated: ${forbiddenReminderActionInputTypesToken}`,
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
  'from "./record-panel-controller-reminder-success-helpers.types";',
]) {
  if (!reminderSuccessHelpersSource.includes(requiredReminderSuccessHelpersImport)) {
    throw new Error(
      `record-panel-controller-reminder-success-helpers.ts must import reminder success contracts: ${requiredReminderSuccessHelpersImport}`,
    );
  }
}

for (const requiredReminderSuccessHelpersUsage of [
  "export function applyRecordPanelReminderSuccessState({",
  "}: ApplyRecordPanelReminderSuccessStateInput) {",
  'setReminderForm((prev) => ({ ...prev, message: "", remind_at: "" }));',
]) {
  if (!reminderSuccessHelpersSource.includes(requiredReminderSuccessHelpersUsage)) {
    throw new Error(
      `record-panel-controller-reminder-success-helpers.ts must own post-reminder reset behavior: ${requiredReminderSuccessHelpersUsage}`,
    );
  }
}

for (const forbiddenReminderSuccessHelpersToken of [
  "setReminderForm: React.Dispatch<React.SetStateAction<ReminderFormState>>;",
]) {
  if (reminderSuccessHelpersSource.includes(forbiddenReminderSuccessHelpersToken)) {
    throw new Error(
      `record-panel-controller-reminder-success-helpers.ts must keep reminder success typing delegated: ${forbiddenReminderSuccessHelpersToken}`,
    );
  }
}

const maxReminderSuccessHelpersLines = 15;
if (reminderSuccessHelpersLines > maxReminderSuccessHelpersLines) {
  throw new Error(
    `record-panel-controller-reminder-success-helpers.ts exceeded ${maxReminderSuccessHelpersLines} lines: ${reminderSuccessHelpersLines}`,
  );
}

for (const requiredReminderSuccessHelpersTypesImport of [
  'from "../lib/record-panel-forms";',
]) {
  if (!reminderSuccessHelpersTypesSource.includes(requiredReminderSuccessHelpersTypesImport)) {
    throw new Error(
      `record-panel-controller-reminder-success-helpers.types.ts must import reminder success type contracts: ${requiredReminderSuccessHelpersImport}`,
    );
  }
}

for (const requiredReminderSuccessHelpersTypesUsage of [
  "export type ApplyRecordPanelReminderSuccessStateInput = { setReminderForm: React.Dispatch<React.SetStateAction<ReminderFormState>> };",
]) {
  if (!reminderSuccessHelpersTypesSource.includes(requiredReminderSuccessHelpersTypesUsage)) {
    throw new Error(
      `record-panel-controller-reminder-success-helpers.types.ts must own reminder success type contracts: ${requiredReminderSuccessHelpersTypesUsage}`,
    );
  }
}

const maxReminderSuccessHelpersTypesLines = 5;
if (reminderSuccessHelpersTypesLines > maxReminderSuccessHelpersTypesLines) {
  throw new Error(
    `record-panel-controller-reminder-success-helpers.types.ts exceeded ${maxReminderSuccessHelpersTypesLines} lines: ${reminderSuccessHelpersTypesLines}`,
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
  'from "./record-panel-controller-reminder-payload.types";',
]) {
  if (!reminderResolutionSource.includes(requiredReminderResolutionImport)) {
    throw new Error(
      `record-panel-controller-reminder-resolution.ts must import shared reminder resolution contracts: ${requiredReminderResolutionImport}`,
    );
  }
}

for (const requiredReminderResolutionUsage of [
  "type ReminderResolution =",
  "| { payload: ReminderPayload };",
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

for (const forbiddenReminderResolutionToken of [
  "ReturnType<typeof buildRecordPanelReminderPayload>",
]) {
  if (reminderResolutionSource.includes(forbiddenReminderResolutionToken)) {
    throw new Error(
      `record-panel-controller-reminder-resolution.ts must keep reminder payload typing delegated: ${forbiddenReminderResolutionToken}`,
    );
  }
}

const maxReminderResolutionLines = 25;
if (reminderResolutionLines > maxReminderResolutionLines) {
  throw new Error(
    `record-panel-controller-reminder-resolution.ts exceeded ${maxReminderResolutionLines} lines: ${reminderResolutionLines}`,
  );
}

for (const requiredReminderPayloadTypesImport of [
  'from "../lib/record-panel-forms";',
  'from "../lib/types";',
  'from "./record-panel-controller.types";',
  'from "./record-panel-controller-detail-copy.types";',
]) {
  if (!reminderPayloadTypesSource.includes(requiredReminderPayloadTypesImport)) {
    throw new Error(
      `record-panel-controller-reminder-payload.types.ts must import reminder payload contracts: ${requiredReminderPayloadTypesImport}`,
    );
  }
}

for (const requiredReminderPayloadTypesUsage of [
  'export type ReminderPayload = Parameters<ControllerProps["onCreateReminder"]>[0];',
  "export type ResolveReminderActionInput = { detailCopy: RecordPanelControllerDetailCopy; reminderForm: ReminderFormState; selectedRecord: RecordItem | null };",
  "export type BuildReminderPayloadInput = { reminderForm: ReminderFormState; selectedRecord: RecordItem };",
]) {
  if (!reminderPayloadTypesSource.includes(requiredReminderPayloadTypesUsage)) {
    throw new Error(
      `record-panel-controller-reminder-payload.types.ts must own reminder payload typing: ${requiredReminderPayloadTypesUsage}`,
    );
  }
}

for (const forbiddenReminderPayloadTypesToken of [
  'from "../lib/record-panel-detail";',
  "type DetailCopy = ReturnType<typeof getRecordPanelDetailBundle>[\"copy\"];",
  "detailCopy: DetailCopy;",
]) {
  if (reminderPayloadTypesSource.includes(forbiddenReminderPayloadTypesToken)) {
    throw new Error(
      `record-panel-controller-reminder-payload.types.ts must keep detail-copy typing delegated: ${forbiddenReminderPayloadTypesToken}`,
    );
  }
}

const maxReminderPayloadTypesLines = 10;
if (reminderPayloadTypesLines > maxReminderPayloadTypesLines) {
  throw new Error(
    `record-panel-controller-reminder-payload.types.ts exceeded ${maxReminderPayloadTypesLines} lines: ${reminderPayloadTypesLines}`,
  );
}

for (const requiredReminderPayloadImport of [
  'from "../lib/record-panel-forms";',
  'from "../lib/types";',
  'from "./record-panel-controller-reminder-payload.types";',
]) {
  if (!reminderPayloadSource.includes(requiredReminderPayloadImport)) {
    throw new Error(
      `record-panel-controller-reminder-payload.ts must import shared reminder payload contracts: ${requiredReminderPayloadImport}`,
    );
  }
}

for (const requiredReminderPayloadUsage of [
  "export function buildRecordPanelReminderPayload({",
  "}: BuildReminderPayloadInput): ReminderPayload {",
  "recordId: selectedRecord.id,",
  'channel_code: "in_app"',
]) {
  if (!reminderPayloadSource.includes(requiredReminderPayloadUsage)) {
    throw new Error(
      `record-panel-controller-reminder-payload.ts must own reminder payload assembly: ${requiredReminderPayloadUsage}`,
    );
  }
}

for (const forbiddenReminderPayloadToken of [
  'from "../lib/record-panel-detail";',
  'from "./record-panel-controller.types";',
  "type DetailCopy =",
  "export type ResolveReminderActionInput = {",
  "reminderForm: ReminderFormState;",
  "selectedRecord: RecordItem;",
]) {
  if (reminderPayloadSource.includes(forbiddenReminderPayloadToken)) {
    throw new Error(
      `record-panel-controller-reminder-payload.ts must keep reminder payload typing delegated: ${forbiddenReminderPayloadToken}`,
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
  'from "./record-panel-controller.types";',
  'from "./record-panel-controller-detail-copy.types";',
]) {
  if (!mediaStatusActionInputTypesSource.includes(requiredMediaStatusActionInputTypesImport)) {
    throw new Error(
      `record-panel-controller-media-status-action-input.types.ts must import media-status input contracts: ${requiredMediaStatusActionInputTypesImport}`,
    );
  }
}

for (const requiredMediaStatusActionInputTypesUsage of [
  "export type RecordPanelControllerMediaRefreshActionInput = {",
  "detailCopy: RecordPanelControllerDetailCopy;",
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

for (const forbiddenMediaStatusActionInputTypesToken of [
  'from "../lib/record-panel-detail";',
  "type DetailCopy = ReturnType<typeof getRecordPanelDetailBundle>[\"copy\"];",
  "detailCopy: DetailCopy;",
]) {
  if (mediaStatusActionInputTypesSource.includes(forbiddenMediaStatusActionInputTypesToken)) {
    throw new Error(
      `record-panel-controller-media-status-action-input.types.ts must keep detail-copy typing delegated: ${forbiddenMediaStatusActionInputTypesToken}`,
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
  'from "./record-panel-controller-detail-copy.types";',
]) {
  if (!mediaStatusErrorHelpersSource.includes(requiredMediaStatusErrorHelpersImport)) {
    throw new Error(
      `record-panel-controller-media-status-error-helpers.ts must import media-status copy contracts: ${requiredMediaStatusErrorHelpersImport}`,
    );
  }
}

for (const requiredMediaStatusErrorHelpersUsage of [
  "export function getRecordPanelMediaStatusErrorMessage(",
  "export function getRecordPanelMediaStatusErrorMessages(detailCopy: RecordPanelControllerDetailCopy)",
  "refreshMediaError",
  "retryMediaError",
]) {
  if (!mediaStatusErrorHelpersSource.includes(requiredMediaStatusErrorHelpersUsage)) {
    throw new Error(
      `record-panel-controller-media-status-error-helpers.ts must own media-status error copy details: ${requiredMediaStatusErrorHelpersUsage}`,
    );
  }
}

for (const forbiddenMediaStatusErrorHelpersToken of [
  'from "../lib/record-panel-detail";',
  'type DetailCopy = ReturnType<typeof getRecordPanelDetailBundle>["copy"];',
  "detailCopy: DetailCopy)",
]) {
  if (mediaStatusErrorHelpersSource.includes(forbiddenMediaStatusErrorHelpersToken)) {
    throw new Error(
      `record-panel-controller-media-status-error-helpers.ts must keep detail-copy typing delegated: ${forbiddenMediaStatusErrorHelpersToken}`,
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
  'from "./record-panel-controller-media-status-runner.types";',
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
  "}: RunRecordPanelMediaStatusActionInput) {",
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

for (const forbiddenMediaStatusRunnerToken of [
  "action: (mediaId: string) => Promise<void>;",
  "fallbackMessage: string;",
  "mediaId: string;",
  "setActiveMediaId: (value: string | null) => void;",
  "setError: (value: string) => void;",
]) {
  if (mediaStatusRunnerSource.includes(forbiddenMediaStatusRunnerToken)) {
    throw new Error(
      `record-panel-controller-media-status-runner.ts must keep media-status runner typing delegated: ${forbiddenMediaStatusRunnerToken}`,
    );
  }
}

const maxMediaStatusRunnerLines = 25;
if (mediaStatusRunnerLines > maxMediaStatusRunnerLines) {
  throw new Error(
    `record-panel-controller-media-status-runner.ts exceeded ${maxMediaStatusRunnerLines} lines: ${mediaStatusRunnerLines}`,
  );
}

for (const requiredMediaStatusRunnerTypesUsage of [
  'export type RunRecordPanelMediaStatusActionInput = { action: (mediaId: string) => Promise<void>; fallbackMessage: string; mediaId: string; setActiveMediaId: (value: string | null) => void; setError: (value: string) => void };',
]) {
  if (!mediaStatusRunnerTypesSource.includes(requiredMediaStatusRunnerTypesUsage)) {
    throw new Error(
      `record-panel-controller-media-status-runner.types.ts must own media-status runner type contracts: ${requiredMediaStatusRunnerTypesUsage}`,
    );
  }
}

const maxMediaStatusRunnerTypesLines = 4;
if (mediaStatusRunnerTypesLines > maxMediaStatusRunnerTypesLines) {
  throw new Error(
    `record-panel-controller-media-status-runner.types.ts exceeded ${maxMediaStatusRunnerTypesLines} lines: ${mediaStatusRunnerTypesLines}`,
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
  'from "./record-panel-controller.types";',
  'from "./record-panel-controller-detail-copy.types";',
  'from "./record-panel-controller-media-transfer-action-input.types";',
]) {
  if (!mediaFileActionInputTypesSource.includes(requiredMediaFileActionInputTypesImport)) {
    throw new Error(
      `record-panel-controller-media-file-action-input.types.ts must import media-file input contracts: ${requiredMediaFileActionInputTypesImport}`,
    );
  }
}

for (const requiredMediaFileActionInputTypesUsage of [
  "export type RecordPanelControllerMediaDeleteActionInput = {",
  "detailCopy: RecordPanelControllerDetailCopy;",
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

for (const forbiddenMediaFileActionInputTypesToken of [
  'from "../lib/record-panel-detail";',
  "type DetailCopy = ReturnType<typeof getRecordPanelDetailBundle>[\"copy\"];",
  "detailCopy: DetailCopy;",
]) {
  if (mediaFileActionInputTypesSource.includes(forbiddenMediaFileActionInputTypesToken)) {
    throw new Error(
      `record-panel-controller-media-file-action-input.types.ts must keep detail-copy typing delegated: ${forbiddenMediaFileActionInputTypesToken}`,
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
  'from "../lib/types";',
  'from "./record-panel-controller.types";',
  'from "./record-panel-controller-detail-copy.types";',
]) {
  if (!mediaTransferActionInputTypesSource.includes(requiredMediaTransferActionInputTypesImport)) {
    throw new Error(
      `record-panel-controller-media-transfer-action-input.types.ts must import media-transfer input contracts: ${requiredMediaTransferActionInputTypesImport}`,
    );
  }
}

for (const requiredMediaTransferActionInputTypesUsage of [
  "export type RecordPanelControllerMediaUploadActionInput = {",
  "detailCopy: RecordPanelControllerDetailCopy;",
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

for (const forbiddenMediaTransferActionInputTypesToken of [
  'from "../lib/record-panel-detail";',
  "type DetailCopy = ReturnType<typeof getRecordPanelDetailBundle>[\"copy\"];",
  "detailCopy: DetailCopy;",
]) {
  if (mediaTransferActionInputTypesSource.includes(forbiddenMediaTransferActionInputTypesToken)) {
    throw new Error(
      `record-panel-controller-media-transfer-action-input.types.ts must keep detail-copy typing delegated: ${forbiddenMediaTransferActionInputTypesToken}`,
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
  'from "../lib/types";',
  'from "./record-panel-controller-detail-copy.types";',
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
  "export function getRecordPanelMediaFileFallbackMessages(detailCopy: RecordPanelControllerDetailCopy)",
  "notAuthenticated",
]) {
  if (!mediaFileHelpersSource.includes(requiredMediaFileHelpersUsage)) {
    throw new Error(
      `record-panel-controller-media-file-helpers.ts must own media-file helper details: ${requiredMediaFileHelpersUsage}`,
    );
  }
}

for (const forbiddenMediaFileHelpersToken of [
  'from "../lib/record-panel-detail";',
  'type DetailCopy = ReturnType<typeof getRecordPanelDetailBundle>["copy"];',
  "detailCopy: DetailCopy)",
]) {
  if (mediaFileHelpersSource.includes(forbiddenMediaFileHelpersToken)) {
    throw new Error(
      `record-panel-controller-media-file-helpers.ts must keep detail-copy typing delegated: ${forbiddenMediaFileHelpersToken}`,
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
  'from "./record-panel-controller-media-download.types";',
]) {
  if (!mediaDownloadSource.includes(requiredMediaDownloadImport)) {
    throw new Error(
      `record-panel-controller-media-download.ts must import media download contracts: ${requiredMediaDownloadImport}`,
    );
  }
}

for (const requiredMediaDownloadUsage of [
  "export async function downloadRecordPanelMediaFile({",
  "}: DownloadRecordPanelMediaFileInput) {",
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

for (const forbiddenMediaDownloadToken of [
  'from "../lib/types";',
  "asset: MediaAsset;",
  "authToken: string;",
  "workspaceId: string;",
]) {
  if (mediaDownloadSource.includes(forbiddenMediaDownloadToken)) {
    throw new Error(
      `record-panel-controller-media-download.ts must keep media download typing delegated: ${forbiddenMediaDownloadToken}`,
    );
  }
}

const maxMediaDownloadLines = 25;
if (mediaDownloadLines > maxMediaDownloadLines) {
  throw new Error(
    `record-panel-controller-media-download.ts exceeded ${maxMediaDownloadLines} lines: ${mediaDownloadLines}`,
  );
}

for (const requiredMediaDownloadTypesImport of [
  'from "../lib/types";',
]) {
  if (!mediaDownloadTypesSource.includes(requiredMediaDownloadTypesImport)) {
    throw new Error(
      `record-panel-controller-media-download.types.ts must import media download type contracts: ${requiredMediaDownloadTypesImport}`,
    );
  }
}

for (const requiredMediaDownloadTypesUsage of [
  'export type DownloadRecordPanelMediaFileInput = { asset: MediaAsset; authToken: string; workspaceId: string };',
]) {
  if (!mediaDownloadTypesSource.includes(requiredMediaDownloadTypesUsage)) {
    throw new Error(
      `record-panel-controller-media-download.types.ts must own media download type contracts: ${requiredMediaDownloadTypesUsage}`,
    );
  }
}

const maxMediaDownloadTypesLines = 5;
if (mediaDownloadTypesLines > maxMediaDownloadTypesLines) {
  throw new Error(
    `record-panel-controller-media-download.types.ts exceeded ${maxMediaDownloadTypesLines} lines: ${mediaDownloadTypesLines}`,
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
  'from "../lib/types";',
  'from "./record-panel-controller.types";',
  'from "./record-panel-controller-detail-copy.types";',
]) {
  if (!deadLetterActionInputTypesSource.includes(requiredDeadLetterActionInputTypesImport)) {
    throw new Error(
      `record-panel-controller-dead-letter-action-input.types.ts must import dead-letter input contracts: ${requiredDeadLetterActionInputTypesImport}`,
    );
  }
}

for (const requiredDeadLetterActionInputTypesUsage of [
  "export type RecordPanelControllerDeadLetterSelectionActionInput = {",
  "export type RecordPanelControllerDeadLetterRetryActionInput = {",
  "detailCopy: RecordPanelControllerDetailCopy;",
  'onBulkRetryMediaDeadLetter: ControllerProps["onBulkRetryMediaDeadLetter"];',
  "export type RecordPanelControllerDeadLetterActionInput =",
]) {
  if (!deadLetterActionInputTypesSource.includes(requiredDeadLetterActionInputTypesUsage)) {
    throw new Error(
      `record-panel-controller-dead-letter-action-input.types.ts must own dead-letter input typing: ${requiredDeadLetterActionInputTypesUsage}`,
    );
  }
}

for (const forbiddenDeadLetterActionInputTypesToken of [
  'from "../lib/record-panel-detail";',
  "type DetailCopy = ReturnType<typeof getRecordPanelDetailBundle>[\"copy\"];",
  "detailCopy: DetailCopy;",
]) {
  if (deadLetterActionInputTypesSource.includes(forbiddenDeadLetterActionInputTypesToken)) {
    throw new Error(
      `record-panel-controller-dead-letter-action-input.types.ts must keep detail-copy typing delegated: ${forbiddenDeadLetterActionInputTypesToken}`,
    );
  }
}

const maxDeadLetterActionInputTypesLines = 25;
if (deadLetterActionInputTypesLines > maxDeadLetterActionInputTypesLines) {
  throw new Error(
    `record-panel-controller-dead-letter-action-input.types.ts exceeded ${maxDeadLetterActionInputTypesLines} lines: ${deadLetterActionInputTypesLines}`,
  );
}

for (const requiredControllerDetailCopyTypesImport of [
  'from "../lib/record-panel-detail";',
]) {
  if (!controllerDetailCopyTypesSource.includes(requiredControllerDetailCopyTypesImport)) {
    throw new Error(
      `record-panel-controller-detail-copy.types.ts must import detail-copy contracts: ${requiredControllerDetailCopyTypesImport}`,
    );
  }
}

for (const requiredControllerDetailCopyTypesUsage of [
  'export type RecordPanelControllerDetailCopy = ReturnType<typeof getRecordPanelDetailBundle>["copy"];',
]) {
  if (!controllerDetailCopyTypesSource.includes(requiredControllerDetailCopyTypesUsage)) {
    throw new Error(
      `record-panel-controller-detail-copy.types.ts must own shared detail-copy typing: ${requiredControllerDetailCopyTypesUsage}`,
    );
  }
}

const maxControllerDetailCopyTypesLines = 4;
if (controllerDetailCopyTypesLines > maxControllerDetailCopyTypesLines) {
  throw new Error(
    `record-panel-controller-detail-copy.types.ts exceeded ${maxControllerDetailCopyTypesLines} lines: ${controllerDetailCopyTypesLines}`,
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
  'from "./record-panel-controller-detail-copy.types";',
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
  "export function getRecordPanelDeadLetterFallbackMessage(detailCopy: RecordPanelControllerDetailCopy)",
  '"manual_only", "exhausted", "disabled"',
  "bulkRetryError",
]) {
  if (!deadLetterRetryHelpersSource.includes(requiredDeadLetterRetryHelpersUsage)) {
    throw new Error(
      `record-panel-controller-dead-letter-retry-helpers.ts must own dead-letter retry details: ${requiredDeadLetterRetryHelpersUsage}`,
    );
  }
}

for (const forbiddenDeadLetterRetryHelpersToken of [
  'from "../lib/record-panel-detail";',
  'type DetailCopy = ReturnType<typeof getRecordPanelDetailBundle>["copy"];',
  "detailCopy: DetailCopy)",
]) {
  if (deadLetterRetryHelpersSource.includes(forbiddenDeadLetterRetryHelpersToken)) {
    throw new Error(
      `record-panel-controller-dead-letter-retry-helpers.ts must keep detail-copy typing delegated: ${forbiddenDeadLetterRetryHelpersToken}`,
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
  'from "./record-panel-controller-record-view-data";',
  'from "./use-record-panel-legacy-view-data.types";',
]) {
  if (!legacyRecordPanelViewDataSource.includes(requiredLegacyViewDataImport)) {
    throw new Error(`use-record-panel-legacy-view-data.ts must import legacy view-data contracts: ${requiredLegacyViewDataImport}`);
  }
}

for (const requiredLegacyViewDataUsage of [
  "export function useRecordPanelLegacyViewData({ records, selectedRecordId }: UseRecordPanelLegacyViewDataInput)",
  "return useMemo(",
  "buildRecordPanelRecordViewData({ records, selectedRecordId })",
]) {
  if (!legacyRecordPanelViewDataSource.includes(requiredLegacyViewDataUsage)) {
    throw new Error(`use-record-panel-legacy-view-data.ts must own legacy record summary derivation: ${requiredLegacyViewDataUsage}`);
  }
}

for (const forbiddenLegacyViewDataToken of [
  "records: RecordItem[];",
  "selectedRecordId: string | null;",
]) {
  if (legacyRecordPanelViewDataSource.includes(forbiddenLegacyViewDataToken)) {
    throw new Error(`use-record-panel-legacy-view-data.ts must keep legacy view-data typing delegated: ${forbiddenLegacyViewDataToken}`);
  }
}

const maxLegacyRecordPanelViewDataLines = 20;
if (legacyRecordPanelViewDataLines > maxLegacyRecordPanelViewDataLines) {
  throw new Error(
    `use-record-panel-legacy-view-data.ts exceeded ${maxLegacyRecordPanelViewDataLines} lines: ${legacyRecordPanelViewDataLines}`,
  );
}

for (const requiredLegacyViewDataTypesImport of ['from "../lib/types";']) {
  if (!legacyRecordPanelViewDataTypesSource.includes(requiredLegacyViewDataTypesImport)) {
    throw new Error(`use-record-panel-legacy-view-data.types.ts must import legacy view-data input contracts: ${requiredLegacyViewDataTypesImport}`);
  }
}

for (const requiredLegacyViewDataTypesUsage of [
  "export type UseRecordPanelLegacyViewDataInput = { records: RecordItem[]; selectedRecordId: string | null };",
]) {
  if (!legacyRecordPanelViewDataTypesSource.includes(requiredLegacyViewDataTypesUsage)) {
    throw new Error(`use-record-panel-legacy-view-data.types.ts must own legacy view-data input typing: ${requiredLegacyViewDataTypesUsage}`);
  }
}

const maxLegacyRecordPanelViewDataTypesLines = 5;
if (legacyRecordPanelViewDataTypesLines > maxLegacyRecordPanelViewDataTypesLines) {
  throw new Error(
    `use-record-panel-legacy-view-data.types.ts exceeded ${maxLegacyRecordPanelViewDataTypesLines} lines: ${legacyRecordPanelViewDataTypesLines}`,
  );
}

for (const requiredLegacySyncImport of [
  'from "react";',
  'from "./record-panel-legacy-state";',
  'from "./record-panel-legacy-sync.types";',
]) {
  if (!legacyRecordPanelSyncSource.includes(requiredLegacySyncImport)) {
    throw new Error(`record-panel-legacy-sync.ts must import legacy sync contracts: ${requiredLegacySyncImport}`);
  }
}

for (const requiredLegacySyncUsage of [
  "export function useRecordPanelLegacySync({ selectedRecord, setForm }: UseRecordPanelLegacySyncInput)",
  "setForm(EMPTY_RECORD_PANEL_FORM)",
  'title: selectedRecord.title ?? ""',
  "content: selectedRecord.content ?? \"\"",
]) {
  if (!legacyRecordPanelSyncSource.includes(requiredLegacySyncUsage)) {
    throw new Error(`record-panel-legacy-sync.ts must keep legacy form sync focused: ${requiredLegacySyncUsage}`);
  }
}

for (const forbiddenLegacySyncToken of [
  "selectedRecord: RecordItem | null;",
  "setForm: React.Dispatch<React.SetStateAction<RecordPanelFormState>>;",
]) {
  if (legacyRecordPanelSyncSource.includes(forbiddenLegacySyncToken)) {
    throw new Error(`record-panel-legacy-sync.ts must keep legacy sync typing delegated: ${forbiddenLegacySyncToken}`);
  }
}

const maxLegacyRecordPanelSyncLines = 18;
if (legacyRecordPanelSyncLines > maxLegacyRecordPanelSyncLines) {
  throw new Error(
    `record-panel-legacy-sync.ts exceeded ${maxLegacyRecordPanelSyncLines} lines: ${legacyRecordPanelSyncLines}`,
  );
}

for (const requiredLegacySyncTypesImport of [
  'from "react";',
  'from "../lib/types";',
  'from "./record-panel.types";',
]) {
  if (!legacyRecordPanelSyncTypesSource.includes(requiredLegacySyncTypesImport)) {
    throw new Error(`record-panel-legacy-sync.types.ts must import legacy sync input contracts: ${requiredLegacySyncTypesImport}`);
  }
}

for (const requiredLegacySyncTypesUsage of [
  "export type UseRecordPanelLegacySyncInput = { selectedRecord: RecordItem | null; setForm: Dispatch<SetStateAction<RecordPanelFormState>> };",
]) {
  if (!legacyRecordPanelSyncTypesSource.includes(requiredLegacySyncTypesUsage)) {
    throw new Error(`record-panel-legacy-sync.types.ts must own legacy sync input typing: ${requiredLegacySyncTypesUsage}`);
  }
}

const maxLegacyRecordPanelSyncTypesLines = 6;
if (legacyRecordPanelSyncTypesLines > maxLegacyRecordPanelSyncTypesLines) {
  throw new Error(
    `record-panel-legacy-sync.types.ts exceeded ${maxLegacyRecordPanelSyncTypesLines} lines: ${legacyRecordPanelSyncTypesLines}`,
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

for (const [componentName, componentSource, componentTypesSource, importLine, signatureLine, requiredSourceTokens, forbiddenTokens, typesLine, maxLines, actualLines] of [
  [
    "record-panel-legacy-form-fields",
    legacyRecordPanelFormFieldsSource,
    legacyRecordPanelFormFieldsTypesSource,
    'import type { RecordPanelLegacyFormFieldsProps } from "./record-panel-legacy-form-fields.types";',
    "}: RecordPanelLegacyFormFieldsProps) {",
    [
      'import { RecordPanelLegacyClassificationFields } from "./record-panel-legacy-classification-fields";',
      'import { RecordPanelLegacyPrimaryFields } from "./record-panel-legacy-primary-fields";',
      "<RecordPanelLegacyPrimaryFields",
      "<RecordPanelLegacyClassificationFields",
    ],
    [
      'import type { RecordPanelLegacyFormProps } from "./record-panel-legacy-form.types";',
      "}: Pick<RecordPanelLegacyFormProps",
      'placeholder="Optional title"',
      'placeholder="Write a note, food review, or reminder"',
      '<option value="memo">',
      "Avoid item",
    ],
    'import type { RecordPanelLegacyFormProps } from "./record-panel-legacy-form.types"; export type RecordPanelLegacyFormFieldsProps = Pick<RecordPanelLegacyFormProps, "form" | "setForm">;',
    2,
    legacyRecordPanelFormFieldsTypesLines,
  ],
  [
    "record-panel-legacy-primary-fields",
    legacyRecordPanelPrimaryFieldsSource,
    legacyRecordPanelPrimaryFieldsTypesSource,
    'import type { RecordPanelLegacyPrimaryFieldsProps } from "./record-panel-legacy-primary-fields.types";',
    "}: RecordPanelLegacyPrimaryFieldsProps) {",
    ['placeholder="Optional title"', 'placeholder="Write a note, food review, or reminder"'],
    [
      'import type { RecordPanelLegacyFormProps } from "./record-panel-legacy-form.types";',
      "}: Pick<RecordPanelLegacyFormProps",
    ],
    'import type { RecordPanelLegacyFormProps } from "./record-panel-legacy-form.types"; export type RecordPanelLegacyPrimaryFieldsProps = Pick<RecordPanelLegacyFormProps, "form" | "setForm">;',
    2,
    legacyRecordPanelPrimaryFieldsTypesLines,
  ],
  [
    "record-panel-legacy-classification-fields",
    legacyRecordPanelClassificationFieldsSource,
    legacyRecordPanelClassificationFieldsTypesSource,
    'import type { RecordPanelLegacyClassificationFieldsProps } from "./record-panel-legacy-classification-fields.types";',
    "}: RecordPanelLegacyClassificationFieldsProps) {",
    [
      '<option value="memo">memo</option>',
      '<option value="bad_experience">bad_experience</option>',
      'placeholder="1-5"',
      "Avoid item",
    ],
    [
      'import type { RecordPanelLegacyFormProps } from "./record-panel-legacy-form.types";',
      "}: Pick<RecordPanelLegacyFormProps",
    ],
    'import type { RecordPanelLegacyFormProps } from "./record-panel-legacy-form.types"; export type RecordPanelLegacyClassificationFieldsProps = Pick<RecordPanelLegacyFormProps, "form" | "setForm">;',
    2,
    legacyRecordPanelClassificationFieldsTypesLines,
  ],
  [
    "record-panel-legacy-form-media",
    legacyRecordPanelFormMediaSource,
    legacyRecordPanelFormMediaTypesSource,
    'import type { RecordPanelLegacyFormMediaProps } from "./record-panel-legacy-form-media.types";',
    "}: RecordPanelLegacyFormMediaProps) {",
    ["if (!selectedRecord) {", "Uploading media...", "No media uploaded for this record yet."],
    [
      'import type { RecordPanelLegacyFormProps } from "./record-panel-legacy-form.types";',
      "}: Pick<RecordPanelLegacyFormProps",
    ],
    'import type { RecordPanelLegacyFormProps } from "./record-panel-legacy-form.types"; export type RecordPanelLegacyFormMediaProps = Pick<RecordPanelLegacyFormProps, "handleUpload" | "mediaAssets" | "selectedRecord" | "uploading">;',
    2,
    legacyRecordPanelFormMediaTypesLines,
  ],
  [
    "record-panel-legacy-form-actions",
    legacyRecordPanelFormActionsSource,
    legacyRecordPanelFormActionsTypesSource,
    'import type { RecordPanelLegacyFormActionsProps } from "./record-panel-legacy-form-actions.types";',
    "}: RecordPanelLegacyFormActionsProps) {",
    ['className="action-row"', '"Saving..."', '"Delete record"'],
    [
      'import type { RecordPanelLegacyFormProps } from "./record-panel-legacy-form.types";',
      "}: Pick<RecordPanelLegacyFormProps",
    ],
    'import type { RecordPanelLegacyFormProps } from "./record-panel-legacy-form.types"; export type RecordPanelLegacyFormActionsProps = Pick<RecordPanelLegacyFormProps, "deleting" | "handleDelete" | "saving" | "selectedRecord">;',
    2,
    legacyRecordPanelFormActionsTypesLines,
  ],
]) {
  for (const requiredUsage of [importLine, signatureLine, ...requiredSourceTokens]) {
    if (!componentSource.includes(requiredUsage)) {
      throw new Error(`${componentName}.tsx must reuse the extracted legacy leaf props type: ${requiredUsage}`);
    }
  }
  for (const forbiddenToken of forbiddenTokens) {
    if (componentSource.includes(forbiddenToken)) {
      throw new Error(`${componentName}.tsx must keep legacy leaf prop typing delegated: ${forbiddenToken}`);
    }
  }
  if (!componentTypesSource.includes(typesLine)) {
    throw new Error(`${componentName}.types.ts must own legacy leaf prop typing: ${typesLine}`);
  }
  if (actualLines > maxLines) {
    throw new Error(`${componentName}.types.ts exceeded ${maxLines} lines: ${actualLines}`);
  }
}

const maxLegacyRecordPanelFormFieldsLines = 20;
if (legacyRecordPanelFormFieldsLines > maxLegacyRecordPanelFormFieldsLines) {
  throw new Error(
    `record-panel-legacy-form-fields.tsx exceeded ${maxLegacyRecordPanelFormFieldsLines} lines: ${legacyRecordPanelFormFieldsLines}`,
  );
}

const maxLegacyRecordPanelPrimaryFieldsLines = 35;
if (legacyRecordPanelPrimaryFieldsLines > maxLegacyRecordPanelPrimaryFieldsLines) {
  throw new Error(
    `record-panel-legacy-primary-fields.tsx exceeded ${maxLegacyRecordPanelPrimaryFieldsLines} lines: ${legacyRecordPanelPrimaryFieldsLines}`,
  );
}

const maxLegacyRecordPanelClassificationFieldsLines = 45;
if (legacyRecordPanelClassificationFieldsLines > maxLegacyRecordPanelClassificationFieldsLines) {
  throw new Error(
    `record-panel-legacy-classification-fields.tsx exceeded ${maxLegacyRecordPanelClassificationFieldsLines} lines: ${legacyRecordPanelClassificationFieldsLines}`,
  );
}

const maxLegacyRecordPanelFormMediaLines = 45;
if (legacyRecordPanelFormMediaLines > maxLegacyRecordPanelFormMediaLines) {
  throw new Error(
    `record-panel-legacy-form-media.tsx exceeded ${maxLegacyRecordPanelFormMediaLines} lines: ${legacyRecordPanelFormMediaLines}`,
  );
}

const maxLegacyRecordPanelFormActionsLines = 30;
if (legacyRecordPanelFormActionsLines > maxLegacyRecordPanelFormActionsLines) {
  throw new Error(
    `record-panel-legacy-form-actions.tsx exceeded ${maxLegacyRecordPanelFormActionsLines} lines: ${legacyRecordPanelFormActionsLines}`,
  );
}

for (const requiredLegacyStatsUsage of [
  'import { RecordPanelLegacyStatsGrid } from "./record-panel-legacy-stats-grid";',
  'import { RecordPanelLegacyStatsHeader } from "./record-panel-legacy-stats-header";',
  'from "./record-panel-legacy-stats.types";',
  "export function RecordPanelLegacyStats({ avoidCount, foodCount, recordCount, workspaceId, onResetFilter }: RecordPanelLegacyStatsProps)",
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
  "avoidCount: number;",
  "foodCount: number;",
  "recordCount: number;",
  "workspaceId: string;",
  "onResetFilter: () => Promise<void>;",
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

for (const requiredLegacyStatsTypesUsage of [
  "export type RecordPanelLegacyStatsHeaderProps = { workspaceId: string; onResetFilter: () => Promise<void> };",
  "export type RecordPanelLegacyStatsGridProps = { avoidCount: number; foodCount: number; recordCount: number };",
  "export type RecordPanelLegacyStatsProps = RecordPanelLegacyStatsHeaderProps & RecordPanelLegacyStatsGridProps;",
]) {
  if (!legacyRecordPanelStatsTypesSource.includes(requiredLegacyStatsTypesUsage)) {
    throw new Error(`record-panel-legacy-stats.types.ts must own shared legacy stats typing: ${requiredLegacyStatsTypesUsage}`);
  }
}

const maxLegacyRecordPanelStatsTypesLines = 5;
if (legacyRecordPanelStatsTypesLines > maxLegacyRecordPanelStatsTypesLines) {
  throw new Error(
    `record-panel-legacy-stats.types.ts exceeded ${maxLegacyRecordPanelStatsTypesLines} lines: ${legacyRecordPanelStatsTypesLines}`,
  );
}

for (const requiredLegacyStatsHeaderUsage of [
  'from "./record-panel-legacy-stats.types";',
  "export function RecordPanelLegacyStatsHeader({ workspaceId, onResetFilter }: RecordPanelLegacyStatsHeaderProps)",
  '{workspaceId}',
  "Structured Results",
  "Reset list",
]) {
  if (!legacyRecordPanelStatsHeaderSource.includes(requiredLegacyStatsHeaderUsage)) {
    throw new Error(`record-panel-legacy-stats-header.tsx must own legacy stats header rendering: ${requiredLegacyStatsHeaderUsage}`);
  }
}

for (const forbiddenLegacyStatsHeaderToken of [
  "workspaceId: string;",
  "onResetFilter: () => Promise<void>;",
]) {
  if (legacyRecordPanelStatsHeaderSource.includes(forbiddenLegacyStatsHeaderToken)) {
    throw new Error(`record-panel-legacy-stats-header.tsx must keep shared stats-header typing delegated: ${forbiddenLegacyStatsHeaderToken}`);
  }
}

const maxLegacyRecordPanelStatsHeaderLines = 30;
if (legacyRecordPanelStatsHeaderLines > maxLegacyRecordPanelStatsHeaderLines) {
  throw new Error(
    `record-panel-legacy-stats-header.tsx exceeded ${maxLegacyRecordPanelStatsHeaderLines} lines: ${legacyRecordPanelStatsHeaderLines}`,
  );
}

for (const requiredLegacyStatsGridUsage of [
  'from "./record-panel-legacy-stats.types";',
  "export function RecordPanelLegacyStatsGrid({ avoidCount, foodCount, recordCount }: RecordPanelLegacyStatsGridProps)",
  "Visible records",
  "{recordCount}",
  "{foodCount}",
  "{avoidCount}",
]) {
  if (!legacyRecordPanelStatsGridSource.includes(requiredLegacyStatsGridUsage)) {
    throw new Error(`record-panel-legacy-stats-grid.tsx must own legacy stats grid rendering: ${requiredLegacyStatsGridUsage}`);
  }
}

for (const forbiddenLegacyStatsGridToken of [
  "avoidCount: number;",
  "foodCount: number;",
  "recordCount: number;",
]) {
  if (legacyRecordPanelStatsGridSource.includes(forbiddenLegacyStatsGridToken)) {
    throw new Error(`record-panel-legacy-stats-grid.tsx must keep shared stats-grid typing delegated: ${forbiddenLegacyStatsGridToken}`);
  }
}

const maxLegacyRecordPanelStatsGridLines = 35;
if (legacyRecordPanelStatsGridLines > maxLegacyRecordPanelStatsGridLines) {
  throw new Error(
    `record-panel-legacy-stats-grid.tsx exceeded ${maxLegacyRecordPanelStatsGridLines} lines: ${legacyRecordPanelStatsGridLines}`,
  );
}

for (const requiredLegacyListUsage of [
  'import { RecordPanelLegacyListEmpty } from "./record-panel-legacy-list-empty";',
  'import { RecordPanelLegacyListItem } from "./record-panel-legacy-list-item";',
  'from "./record-panel-legacy-list.types";',
  "export function RecordPanelLegacyList({ records, selectedRecordId, onSelectRecord }: RecordPanelLegacyListProps)",
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
  "records: RecordItem[];",
  "selectedRecordId: string | null;",
  "onSelectRecord: (recordId: string) => void;",
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

for (const requiredLegacyListTypesImport of ['from "../lib/types";']) {
  if (!legacyRecordPanelListTypesSource.includes(requiredLegacyListTypesImport)) {
    throw new Error(`record-panel-legacy-list.types.ts must import legacy list contracts: ${requiredLegacyListTypesImport}`);
  }
}

for (const requiredLegacyListTypesUsage of [
  "export type RecordPanelLegacyListSelection = { onSelectRecord: (recordId: string) => void };",
  "export type RecordPanelLegacyListItemProps = { record: RecordItem; selected: boolean } & RecordPanelLegacyListSelection;",
  "export type RecordPanelLegacyListProps = { records: RecordItem[]; selectedRecordId: string | null } & RecordPanelLegacyListSelection;",
]) {
  if (!legacyRecordPanelListTypesSource.includes(requiredLegacyListTypesUsage)) {
    throw new Error(`record-panel-legacy-list.types.ts must own shared legacy list typing: ${requiredLegacyListTypesUsage}`);
  }
}

const maxLegacyRecordPanelListTypesLines = 6;
if (legacyRecordPanelListTypesLines > maxLegacyRecordPanelListTypesLines) {
  throw new Error(
    `record-panel-legacy-list.types.ts exceeded ${maxLegacyRecordPanelListTypesLines} lines: ${legacyRecordPanelListTypesLines}`,
  );
}

for (const requiredLegacyListItemUsage of [
  'from "./record-panel-legacy-list.types";',
  "export function RecordPanelLegacyListItem({ record, selected, onSelectRecord }: RecordPanelLegacyListItemProps)",
  '{record.title || "Untitled"}',
  '{record.content || "No content"}',
  '{record.is_avoid ? <span className="tag">avoid</span> : null}',
]) {
  if (!legacyRecordPanelListItemSource.includes(requiredLegacyListItemUsage)) {
    throw new Error(`record-panel-legacy-list-item.tsx must own legacy record-card rendering: ${requiredLegacyListItemUsage}`);
  }
}

for (const forbiddenLegacyListItemToken of [
  "record: RecordItem;",
  "selected: boolean;",
  "onSelectRecord: (recordId: string) => void;",
]) {
  if (legacyRecordPanelListItemSource.includes(forbiddenLegacyListItemToken)) {
    throw new Error(`record-panel-legacy-list-item.tsx must keep shared list-item typing delegated: ${forbiddenLegacyListItemToken}`);
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

for (const requiredWorkspaceShellClientPropsTypesUsage of [
  'export type { WorkspaceShellActions } from "./workspace-shell-actions-result.types";',
  'export type { WorkspaceShellPanelsProps } from "./workspace-shell-panels.types";',
  'export type { WorkspaceShellRefreshers } from "./workspace-shell-refreshers-result.types";',
  'export type { WorkspaceShellRouter } from "./workspace-shell-router.types";',
  'export type { WorkspaceShellState } from "./workspace-shell-state-result.types";',
]) {
  if (!workspaceShellClientPropsTypesSource.includes(requiredWorkspaceShellClientPropsTypesUsage)) {
    throw new Error(
      `workspace-shell-client-props.types.ts must stay a stable re-export boundary: ${requiredWorkspaceShellClientPropsTypesUsage}`,
    );
  }
}

for (const forbiddenWorkspaceShellClientPropsTypesToken of [
  "ComponentProps",
  "useRouter",
  'from "./workspace-shell-panels";',
  'from "./use-workspace-shell-refreshers";',
  'from "./use-workspace-shell-actions";',
  'from "./use-workspace-shell-state";',
  "ReturnType<",
]) {
  if (workspaceShellClientPropsTypesSource.includes(forbiddenWorkspaceShellClientPropsTypesToken)) {
    throw new Error(
      `workspace-shell-client-props.types.ts must keep hook, router, and panel inference delegated: ${forbiddenWorkspaceShellClientPropsTypesToken}`,
    );
  }
}

const maxWorkspaceShellClientPropsTypesLines = 7;
if (workspaceShellClientPropsTypesLines > maxWorkspaceShellClientPropsTypesLines) {
  throw new Error(
    `workspace-shell-client-props.types.ts exceeded ${maxWorkspaceShellClientPropsTypesLines} lines: ${workspaceShellClientPropsTypesLines}`,
  );
}

for (const requiredWorkspaceShellClientUsage of [
  'import type { WorkspaceShellClientProps } from "./workspace-shell-client.types";',
  "}: WorkspaceShellClientProps) {",
]) {
  if (!workspaceShellClientSource.includes(requiredWorkspaceShellClientUsage)) {
    throw new Error(
      `workspace-shell-client.tsx must reuse the extracted shell-client props type: ${requiredWorkspaceShellClientUsage}`,
    );
  }
}

if (workspaceShellClientSource.includes("workspaceId }: { workspaceId: string }")) {
  throw new Error("workspace-shell-client.tsx must keep shell-client prop typing delegated");
}

for (const requiredWorkspaceShellClientTypesUsage of [
  'export type WorkspaceShellClientProps = { workspaceId: string };',
]) {
  if (!workspaceShellClientTypesSource.includes(requiredWorkspaceShellClientTypesUsage)) {
    throw new Error(
      `workspace-shell-client.types.ts must own shell-client prop typing: ${requiredWorkspaceShellClientTypesUsage}`,
    );
  }
}

const maxWorkspaceShellClientTypesLines = 2;
if (workspaceShellClientTypesLines > maxWorkspaceShellClientTypesLines) {
  throw new Error(
    `workspace-shell-client.types.ts exceeded ${maxWorkspaceShellClientTypesLines} lines: ${workspaceShellClientTypesLines}`,
  );
}

for (const requiredWorkspaceShellClientActionsInputUsage of [
  'import type { BuildWorkspaceShellActionsInput } from "./workspace-shell-client-actions-input.types";',
  "}: BuildWorkspaceShellActionsInput) {",
]) {
  if (!workspaceShellClientActionsInputSource.includes(requiredWorkspaceShellClientActionsInputUsage)) {
    throw new Error(
      `workspace-shell-client-actions-input.ts must reuse the extracted shell-actions input type: ${requiredWorkspaceShellClientActionsInputUsage}`,
    );
  }
}

for (const forbiddenWorkspaceShellClientActionsInputToken of [
  "WorkspaceShellRefreshers",
  "WorkspaceShellState",
  "}: {",
]) {
  if (workspaceShellClientActionsInputSource.includes(forbiddenWorkspaceShellClientActionsInputToken)) {
    throw new Error(
      `workspace-shell-client-actions-input.ts must keep shell-actions input typing delegated: ${forbiddenWorkspaceShellClientActionsInputToken}`,
    );
  }
}

for (const requiredWorkspaceShellClientActionsInputTypesUsage of [
  'import type { WorkspaceShellRefreshers, WorkspaceShellState } from "./workspace-shell-client-props.types"; export type BuildWorkspaceShellActionsInput = { refreshers: WorkspaceShellRefreshers; state: WorkspaceShellState; workspaceId: string };',
]) {
  if (!workspaceShellClientActionsInputTypesSource.includes(requiredWorkspaceShellClientActionsInputTypesUsage)) {
    throw new Error(
      `workspace-shell-client-actions-input.types.ts must own shell-actions input typing: ${requiredWorkspaceShellClientActionsInputTypesUsage}`,
    );
  }
}

const maxWorkspaceShellClientActionsInputTypesLines = 2;
if (workspaceShellClientActionsInputTypesLines > maxWorkspaceShellClientActionsInputTypesLines) {
  throw new Error(
    `workspace-shell-client-actions-input.types.ts exceeded ${maxWorkspaceShellClientActionsInputTypesLines} lines: ${workspaceShellClientActionsInputTypesLines}`,
  );
}

for (const requiredWorkspaceShellClientRefreshersInputUsage of [
  'import type { BuildWorkspaceShellRefreshersInput } from "./workspace-shell-client-refreshers-input.types";',
  "}: BuildWorkspaceShellRefreshersInput) {",
]) {
  if (!workspaceShellClientRefreshersInputSource.includes(requiredWorkspaceShellClientRefreshersInputUsage)) {
    throw new Error(
      `workspace-shell-client-refreshers-input.ts must reuse the extracted shell-refreshers input type: ${requiredWorkspaceShellClientRefreshersInputUsage}`,
    );
  }
}

for (const forbiddenWorkspaceShellClientRefreshersInputToken of [
  "WorkspaceShellState",
  "}: {",
]) {
  if (workspaceShellClientRefreshersInputSource.includes(forbiddenWorkspaceShellClientRefreshersInputToken)) {
    throw new Error(
      `workspace-shell-client-refreshers-input.ts must keep shell-refreshers input typing delegated: ${forbiddenWorkspaceShellClientRefreshersInputToken}`,
    );
  }
}

for (const requiredWorkspaceShellClientRefreshersInputTypesUsage of [
  'import type { WorkspaceShellState } from "./workspace-shell-client-props.types"; export type BuildWorkspaceShellRefreshersInput = { state: WorkspaceShellState; workspaceId: string };',
]) {
  if (!workspaceShellClientRefreshersInputTypesSource.includes(requiredWorkspaceShellClientRefreshersInputTypesUsage)) {
    throw new Error(
      `workspace-shell-client-refreshers-input.types.ts must own shell-refreshers input typing: ${requiredWorkspaceShellClientRefreshersInputTypesUsage}`,
    );
  }
}

const maxWorkspaceShellClientRefreshersInputTypesLines = 2;
if (workspaceShellClientRefreshersInputTypesLines > maxWorkspaceShellClientRefreshersInputTypesLines) {
  throw new Error(
    `workspace-shell-client-refreshers-input.types.ts exceeded ${maxWorkspaceShellClientRefreshersInputTypesLines} lines: ${workspaceShellClientRefreshersInputTypesLines}`,
  );
}

for (const requiredWorkspaceShellClientEffectsInputUsage of [
  'import type { BuildWorkspaceShellEffectsInput } from "./workspace-shell-client-effects-input.types";',
  "}: BuildWorkspaceShellEffectsInput) {",
]) {
  if (!workspaceShellClientEffectsInputSource.includes(requiredWorkspaceShellClientEffectsInputUsage)) {
    throw new Error(
      `workspace-shell-client-effects-input.ts must reuse the extracted shell-effects input type: ${requiredWorkspaceShellClientEffectsInputUsage}`,
    );
  }
}

for (const forbiddenWorkspaceShellClientEffectsInputToken of [
  "WorkspaceShellRouter",
  "WorkspaceShellState",
  "}: {",
]) {
  if (workspaceShellClientEffectsInputSource.includes(forbiddenWorkspaceShellClientEffectsInputToken)) {
    throw new Error(
      `workspace-shell-client-effects-input.ts must keep shell-effects input typing delegated: ${forbiddenWorkspaceShellClientEffectsInputToken}`,
    );
  }
}

for (const requiredWorkspaceShellClientEffectsInputTypesUsage of [
  'import type { WorkspaceShellRouter, WorkspaceShellState } from "./workspace-shell-client-props.types"; export type BuildWorkspaceShellEffectsInput = { router: WorkspaceShellRouter; state: WorkspaceShellState; workspaceId: string };',
]) {
  if (!workspaceShellClientEffectsInputTypesSource.includes(requiredWorkspaceShellClientEffectsInputTypesUsage)) {
    throw new Error(
      `workspace-shell-client-effects-input.types.ts must own shell-effects input typing: ${requiredWorkspaceShellClientEffectsInputTypesUsage}`,
    );
  }
}

const maxWorkspaceShellClientEffectsInputTypesLines = 2;
if (workspaceShellClientEffectsInputTypesLines > maxWorkspaceShellClientEffectsInputTypesLines) {
  throw new Error(
    `workspace-shell-client-effects-input.types.ts exceeded ${maxWorkspaceShellClientEffectsInputTypesLines} lines: ${workspaceShellClientEffectsInputTypesLines}`,
  );
}

for (const requiredWorkspaceShellClientPanelsPropsUsage of [
  'import type { BuildWorkspaceShellPanelsPropsInput } from "./workspace-shell-client-panels-props.types";',
  "}: BuildWorkspaceShellPanelsPropsInput): WorkspaceShellPanelsProps {",
]) {
  if (!workspaceShellClientPanelsPropsSource.includes(requiredWorkspaceShellClientPanelsPropsUsage)) {
    throw new Error(
      `workspace-shell-client-panels-props.ts must reuse the extracted shell-panels input type: ${requiredWorkspaceShellClientPanelsPropsUsage}`,
    );
  }
}

for (const forbiddenWorkspaceShellClientPanelsPropsToken of [
  "WorkspaceShellActions",
  "WorkspaceShellState",
  "}: {",
]) {
  if (workspaceShellClientPanelsPropsSource.includes(forbiddenWorkspaceShellClientPanelsPropsToken)) {
    throw new Error(
      `workspace-shell-client-panels-props.ts must keep shell-panels input typing delegated: ${forbiddenWorkspaceShellClientPanelsPropsToken}`,
    );
  }
}

for (const requiredWorkspaceShellClientPanelsPropsTypesUsage of [
  'import type { WorkspaceShellActions, WorkspaceShellState } from "./workspace-shell-client-props.types"; export type BuildWorkspaceShellPanelsPropsInput = { actions: WorkspaceShellActions; state: WorkspaceShellState; workspaceId: string };',
]) {
  if (!workspaceShellClientPanelsPropsTypesSource.includes(requiredWorkspaceShellClientPanelsPropsTypesUsage)) {
    throw new Error(
      `workspace-shell-client-panels-props.types.ts must own shell-panels input typing: ${requiredWorkspaceShellClientPanelsPropsTypesUsage}`,
    );
  }
}

const maxWorkspaceShellClientPanelsPropsTypesLines = 2;
if (workspaceShellClientPanelsPropsTypesLines > maxWorkspaceShellClientPanelsPropsTypesLines) {
  throw new Error(
    `workspace-shell-client-panels-props.types.ts exceeded ${maxWorkspaceShellClientPanelsPropsTypesLines} lines: ${workspaceShellClientPanelsPropsTypesLines}`,
  );
}

for (const requiredWorkspaceShellConversationStateLoadUsage of [
  'from "./workspace-shell-conversation-state-load.types";',
  "LoadWorkspaceShellConversationStateInput,",
  "WorkspaceShellLoadRole,",
  "}: LoadWorkspaceShellConversationStateInput) {",
]) {
  if (!workspaceShellConversationStateLoadSource.includes(requiredWorkspaceShellConversationStateLoadUsage)) {
    throw new Error(
      `workspace-shell-conversation-state-load.ts must reuse the extracted shell-conversation input type: ${requiredWorkspaceShellConversationStateLoadUsage}`,
    );
  }
}

for (const forbiddenWorkspaceShellConversationStateLoadToken of [
  'import type { UseWorkspaceShellEffectsProps } from "./workspace-shell-effects.types";',
  'type WorkspaceRole = "owner" | "editor" | "viewer";',
  "}: {",
]) {
  if (workspaceShellConversationStateLoadSource.includes(forbiddenWorkspaceShellConversationStateLoadToken)) {
    throw new Error(
      `workspace-shell-conversation-state-load.ts must keep shell-conversation input typing delegated: ${forbiddenWorkspaceShellConversationStateLoadToken}`,
    );
  }
}

for (const requiredWorkspaceShellConversationStateLoadTypesUsage of [
  'import type { UseWorkspaceShellEffectsProps } from "./workspace-shell-effects.types"; export type WorkspaceShellLoadRole = "owner" | "editor" | "viewer"; export type LoadWorkspaceShellConversationStateInput = { activeToken: string; role: WorkspaceShellLoadRole; setActiveConversationId: UseWorkspaceShellEffectsProps["setActiveConversationId"]; setConversations: UseWorkspaceShellEffectsProps["setConversations"]; setMessages: UseWorkspaceShellEffectsProps["setMessages"]; workspaceId: string };',
]) {
  if (!workspaceShellConversationStateLoadTypesSource.includes(requiredWorkspaceShellConversationStateLoadTypesUsage)) {
    throw new Error(
      `workspace-shell-conversation-state-load.types.ts must own shell-conversation input typing: ${requiredWorkspaceShellConversationStateLoadTypesUsage}`,
    );
  }
}

const maxWorkspaceShellConversationStateLoadTypesLines = 2;
if (workspaceShellConversationStateLoadTypesLines > maxWorkspaceShellConversationStateLoadTypesLines) {
  throw new Error(
    `workspace-shell-conversation-state-load.types.ts exceeded ${maxWorkspaceShellConversationStateLoadTypesLines} lines: ${workspaceShellConversationStateLoadTypesLines}`,
  );
}

for (const requiredWorkspaceShellManagedStateLoadUsage of [
  'import type { LoadWorkspaceShellManagedStateInput } from "./workspace-shell-managed-state-load.types";',
  'import type { WorkspaceShellLoadRole } from "./workspace-shell-conversation-state-load.types";',
  "}: LoadWorkspaceShellManagedStateInput) {",
]) {
  if (!workspaceShellManagedStateLoadSource.includes(requiredWorkspaceShellManagedStateLoadUsage)) {
    throw new Error(
      `workspace-shell-managed-state-load.ts must reuse the extracted shell-managed input type: ${requiredWorkspaceShellManagedStateLoadUsage}`,
    );
  }
}

for (const forbiddenWorkspaceShellManagedStateLoadToken of [
  'import type { UseWorkspaceShellEffectsProps } from "./workspace-shell-effects.types";',
  'type WorkspaceRole = "owner" | "editor" | "viewer";',
  "}: {",
]) {
  if (workspaceShellManagedStateLoadSource.includes(forbiddenWorkspaceShellManagedStateLoadToken)) {
    throw new Error(
      `workspace-shell-managed-state-load.ts must keep shell-managed input typing delegated: ${forbiddenWorkspaceShellManagedStateLoadToken}`,
    );
  }
}

for (const requiredWorkspaceShellManagedStateLoadTypesUsage of [
  'import type { UseWorkspaceShellEffectsProps } from "./workspace-shell-effects.types"; import type { WorkspaceShellLoadRole } from "./workspace-shell-conversation-state-load.types"; export type LoadWorkspaceShellManagedStateInput = { activeToken: string; role: WorkspaceShellLoadRole; setLatestSharePath: UseWorkspaceShellEffectsProps["setLatestSharePath"]; setMediaDeadLetterOverview: UseWorkspaceShellEffectsProps["setMediaDeadLetterOverview"]; setShareLinks: UseWorkspaceShellEffectsProps["setShareLinks"]; workspaceId: string };',
]) {
  if (!workspaceShellManagedStateLoadTypesSource.includes(requiredWorkspaceShellManagedStateLoadTypesUsage)) {
    throw new Error(
      `workspace-shell-managed-state-load.types.ts must own shell-managed input typing: ${requiredWorkspaceShellManagedStateLoadTypesUsage}`,
    );
  }
}

const maxWorkspaceShellManagedStateLoadTypesLines = 2;
if (workspaceShellManagedStateLoadTypesLines > maxWorkspaceShellManagedStateLoadTypesLines) {
  throw new Error(
    `workspace-shell-managed-state-load.types.ts exceeded ${maxWorkspaceShellManagedStateLoadTypesLines} lines: ${workspaceShellManagedStateLoadTypesLines}`,
  );
}

for (const requiredWorkspaceShellInitialFollowUpUsage of [
  'import type { LoadWorkspaceShellInitialFollowUpInput } from "./workspace-shell-initial-follow-up.types";',
  "}: LoadWorkspaceShellInitialFollowUpInput) {",
]) {
  if (!workspaceShellInitialFollowUpSource.includes(requiredWorkspaceShellInitialFollowUpUsage)) {
    throw new Error(
      `workspace-shell-initial-follow-up.ts must reuse the extracted shell-follow-up input type: ${requiredWorkspaceShellInitialFollowUpUsage}`,
    );
  }
}

for (const forbiddenWorkspaceShellInitialFollowUpToken of [
  'import type { UseWorkspaceShellEffectsProps } from "./workspace-shell-effects.types";',
  'type WorkspaceRole = "owner" | "editor" | "viewer";',
  "}: {",
]) {
  if (workspaceShellInitialFollowUpSource.includes(forbiddenWorkspaceShellInitialFollowUpToken)) {
    throw new Error(
      `workspace-shell-initial-follow-up.ts must keep shell-follow-up input typing delegated: ${forbiddenWorkspaceShellInitialFollowUpToken}`,
    );
  }
}

for (const requiredWorkspaceShellInitialFollowUpTypesUsage of [
  'import type { UseWorkspaceShellEffectsProps } from "./workspace-shell-effects.types"; import type { WorkspaceShellLoadRole } from "./workspace-shell-conversation-state-load.types"; export type LoadWorkspaceShellInitialFollowUpInput = { activeToken: string; role: WorkspaceShellLoadRole; setAuditLogs: UseWorkspaceShellEffectsProps["setAuditLogs"]; setLatestSharePath: UseWorkspaceShellEffectsProps["setLatestSharePath"]; setMediaDeadLetterOverview: UseWorkspaceShellEffectsProps["setMediaDeadLetterOverview"]; setSearchPresets: UseWorkspaceShellEffectsProps["setSearchPresets"]; setShareLinks: UseWorkspaceShellEffectsProps["setShareLinks"]; workspaceId: string };',
]) {
  if (!workspaceShellInitialFollowUpTypesSource.includes(requiredWorkspaceShellInitialFollowUpTypesUsage)) {
    throw new Error(
      `workspace-shell-initial-follow-up.types.ts must own shell-follow-up input typing: ${requiredWorkspaceShellInitialFollowUpTypesUsage}`,
    );
  }
}

const maxWorkspaceShellInitialFollowUpTypesLines = 2;
if (workspaceShellInitialFollowUpTypesLines > maxWorkspaceShellInitialFollowUpTypesLines) {
  throw new Error(
    `workspace-shell-initial-follow-up.types.ts exceeded ${maxWorkspaceShellInitialFollowUpTypesLines} lines: ${workspaceShellInitialFollowUpTypesLines}`,
  );
}

for (const requiredWorkspaceShellInitialLoadHelpersUsage of [
  'import type { LoadWorkspaceShellInitialDataInput } from "./workspace-shell-initial-load-helpers.types";',
  "}: LoadWorkspaceShellInitialDataInput) {",
]) {
  if (!workspaceShellInitialLoadHelpersSource.includes(requiredWorkspaceShellInitialLoadHelpersUsage)) {
    throw new Error(
      `workspace-shell-initial-load-helpers.ts must reuse the extracted shell-initial-load input type: ${requiredWorkspaceShellInitialLoadHelpersUsage}`,
    );
  }
}

for (const forbiddenWorkspaceShellInitialLoadHelpersToken of [
  'import type { UseWorkspaceShellEffectsProps } from "./workspace-shell-effects.types";',
  'import { loadWorkspaceShellConversationState } from "./workspace-shell-conversation-state-load";',
  'import { loadWorkspaceShellManagedState } from "./workspace-shell-managed-state-load";',
  "}: {",
]) {
  if (workspaceShellInitialLoadHelpersSource.includes(forbiddenWorkspaceShellInitialLoadHelpersToken)) {
    throw new Error(
      `workspace-shell-initial-load-helpers.ts must keep shell-initial-load input typing delegated: ${forbiddenWorkspaceShellInitialLoadHelpersToken}`,
    );
  }
}

for (const requiredWorkspaceShellInitialLoadHelpersTypesUsage of [
  'import type { UseWorkspaceShellEffectsProps } from "./workspace-shell-effects.types"; export type LoadWorkspaceShellInitialDataInput = { activeToken: string; setActiveConversationId: UseWorkspaceShellEffectsProps["setActiveConversationId"]; setAuditLogs: UseWorkspaceShellEffectsProps["setAuditLogs"]; setConversations: UseWorkspaceShellEffectsProps["setConversations"]; setKnowledgeStats: UseWorkspaceShellEffectsProps["setKnowledgeStats"]; setLatestSharePath: UseWorkspaceShellEffectsProps["setLatestSharePath"]; setMediaDeadLetterOverview: UseWorkspaceShellEffectsProps["setMediaDeadLetterOverview"]; setMediaProcessingOverview: UseWorkspaceShellEffectsProps["setMediaProcessingOverview"]; setMediaStorageSummary: UseWorkspaceShellEffectsProps["setMediaStorageSummary"]; setMessages: UseWorkspaceShellEffectsProps["setMessages"]; setNotifications: UseWorkspaceShellEffectsProps["setNotifications"]; setRecords: UseWorkspaceShellEffectsProps["setRecords"]; setSearchPresets: UseWorkspaceShellEffectsProps["setSearchPresets"]; setSelectedRecordId: UseWorkspaceShellEffectsProps["setSelectedRecordId"]; setShareLinks: UseWorkspaceShellEffectsProps["setShareLinks"]; setTimelineDays: UseWorkspaceShellEffectsProps["setTimelineDays"]; setVisibleRecords: UseWorkspaceShellEffectsProps["setVisibleRecords"]; setWorkspace: UseWorkspaceShellEffectsProps["setWorkspace"]; workspaceId: string };',
]) {
  if (!workspaceShellInitialLoadHelpersTypesSource.includes(requiredWorkspaceShellInitialLoadHelpersTypesUsage)) {
    throw new Error(
      `workspace-shell-initial-load-helpers.types.ts must own shell-initial-load input typing: ${requiredWorkspaceShellInitialLoadHelpersTypesUsage}`,
    );
  }
}

const maxWorkspaceShellInitialLoadHelpersTypesLines = 2;
if (workspaceShellInitialLoadHelpersTypesLines > maxWorkspaceShellInitialLoadHelpersTypesLines) {
  throw new Error(
    `workspace-shell-initial-load-helpers.types.ts exceeded ${maxWorkspaceShellInitialLoadHelpersTypesLines} lines: ${workspaceShellInitialLoadHelpersTypesLines}`,
  );
}

for (const requiredWorkspaceShellInitialBootstrapUsage of [
  'import type { LoadWorkspaceShellInitialBootstrapInput } from "./workspace-shell-initial-bootstrap.types";',
  'import type { WorkspaceShellLoadRole } from "./workspace-shell-conversation-state-load.types";',
  "}: LoadWorkspaceShellInitialBootstrapInput) {",
]) {
  if (!workspaceShellInitialBootstrapSource.includes(requiredWorkspaceShellInitialBootstrapUsage)) {
    throw new Error(
      `workspace-shell-initial-bootstrap.ts must reuse the extracted shell-bootstrap input type: ${requiredWorkspaceShellInitialBootstrapUsage}`,
    );
  }
}

for (const forbiddenWorkspaceShellInitialBootstrapToken of [
  'import type { UseWorkspaceShellEffectsProps } from "./workspace-shell-effects.types";',
  'type WorkspaceRole = "owner" | "editor" | "viewer";',
  "}: {",
]) {
  if (workspaceShellInitialBootstrapSource.includes(forbiddenWorkspaceShellInitialBootstrapToken)) {
    throw new Error(
      `workspace-shell-initial-bootstrap.ts must keep shell-bootstrap input typing delegated: ${forbiddenWorkspaceShellInitialBootstrapToken}`,
    );
  }
}

for (const requiredWorkspaceShellInitialBootstrapTypesUsage of [
  'import type { UseWorkspaceShellEffectsProps } from "./workspace-shell-effects.types"; export type LoadWorkspaceShellInitialBootstrapInput = { activeToken: string; setActiveConversationId: UseWorkspaceShellEffectsProps["setActiveConversationId"]; setConversations: UseWorkspaceShellEffectsProps["setConversations"]; setKnowledgeStats: UseWorkspaceShellEffectsProps["setKnowledgeStats"]; setMediaProcessingOverview: UseWorkspaceShellEffectsProps["setMediaProcessingOverview"]; setMediaStorageSummary: UseWorkspaceShellEffectsProps["setMediaStorageSummary"]; setMessages: UseWorkspaceShellEffectsProps["setMessages"]; setNotifications: UseWorkspaceShellEffectsProps["setNotifications"]; setRecords: UseWorkspaceShellEffectsProps["setRecords"]; setSelectedRecordId: UseWorkspaceShellEffectsProps["setSelectedRecordId"]; setTimelineDays: UseWorkspaceShellEffectsProps["setTimelineDays"]; setVisibleRecords: UseWorkspaceShellEffectsProps["setVisibleRecords"]; setWorkspace: UseWorkspaceShellEffectsProps["setWorkspace"]; workspaceId: string };',
]) {
  if (!workspaceShellInitialBootstrapTypesSource.includes(requiredWorkspaceShellInitialBootstrapTypesUsage)) {
    throw new Error(
      `workspace-shell-initial-bootstrap.types.ts must own shell-bootstrap input typing: ${requiredWorkspaceShellInitialBootstrapTypesUsage}`,
    );
  }
}

const maxWorkspaceShellInitialBootstrapTypesLines = 2;
if (workspaceShellInitialBootstrapTypesLines > maxWorkspaceShellInitialBootstrapTypesLines) {
  throw new Error(
    `workspace-shell-initial-bootstrap.types.ts exceeded ${maxWorkspaceShellInitialBootstrapTypesLines} lines: ${workspaceShellInitialBootstrapTypesLines}`,
  );
}

for (const requiredUseWorkspaceShellNotificationEffectUsage of [
  'import type { UseWorkspaceShellNotificationEffectInput } from "./use-workspace-shell-notification-effect.types";',
  "}: UseWorkspaceShellNotificationEffectInput) {",
]) {
  if (!useWorkspaceShellNotificationEffectSource.includes(requiredUseWorkspaceShellNotificationEffectUsage)) {
    throw new Error(
      `use-workspace-shell-notification-effect.ts must reuse the extracted shell-notification input type: ${requiredUseWorkspaceShellNotificationEffectUsage}`,
    );
  }
}

for (const forbiddenUseWorkspaceShellNotificationEffectToken of [
  'import type { UseWorkspaceShellEffectsProps } from "./workspace-shell-effects.types";',
  "}: Pick<",
]) {
  if (useWorkspaceShellNotificationEffectSource.includes(forbiddenUseWorkspaceShellNotificationEffectToken)) {
    throw new Error(
      `use-workspace-shell-notification-effect.ts must keep shell-notification input typing delegated: ${forbiddenUseWorkspaceShellNotificationEffectToken}`,
    );
  }
}

for (const requiredUseWorkspaceShellNotificationEffectTypesUsage of [
  'import type { UseWorkspaceShellEffectsProps } from "./workspace-shell-effects.types"; export type UseWorkspaceShellNotificationEffectInput = Pick<UseWorkspaceShellEffectsProps, "token" | "workspaceId" | "setNotifications">;',
]) {
  if (!useWorkspaceShellNotificationEffectTypesSource.includes(requiredUseWorkspaceShellNotificationEffectTypesUsage)) {
    throw new Error(
      `use-workspace-shell-notification-effect.types.ts must own shell-notification input typing: ${requiredUseWorkspaceShellNotificationEffectTypesUsage}`,
    );
  }
}

const maxUseWorkspaceShellNotificationEffectTypesLines = 2;
if (useWorkspaceShellNotificationEffectTypesLines > maxUseWorkspaceShellNotificationEffectTypesLines) {
  throw new Error(
    `use-workspace-shell-notification-effect.types.ts exceeded ${maxUseWorkspaceShellNotificationEffectTypesLines} lines: ${useWorkspaceShellNotificationEffectTypesLines}`,
  );
}

for (const requiredUseWorkspaceShellSelectionEffectsUsage of [
  'import type { UseWorkspaceShellSelectionEffectsInput } from "./use-workspace-shell-selection-effects.types";',
  "}: UseWorkspaceShellSelectionEffectsInput) {",
]) {
  if (!useWorkspaceShellSelectionEffectsSource.includes(requiredUseWorkspaceShellSelectionEffectsUsage)) {
    throw new Error(
      `use-workspace-shell-selection-effects.ts must reuse the extracted shell-selection input type: ${requiredUseWorkspaceShellSelectionEffectsUsage}`,
    );
  }
}

for (const forbiddenUseWorkspaceShellSelectionEffectsToken of [
  'import type { UseWorkspaceShellEffectsProps } from "./workspace-shell-effects.types";',
  "}: Pick<",
]) {
  if (useWorkspaceShellSelectionEffectsSource.includes(forbiddenUseWorkspaceShellSelectionEffectsToken)) {
    throw new Error(
      `use-workspace-shell-selection-effects.ts must keep shell-selection input typing delegated: ${forbiddenUseWorkspaceShellSelectionEffectsToken}`,
    );
  }
}

for (const requiredUseWorkspaceShellSelectionEffectsTypesUsage of [
  'import type { UseWorkspaceShellEffectsProps } from "./workspace-shell-effects.types"; export type UseWorkspaceShellSelectionEffectsInput = Pick<UseWorkspaceShellEffectsProps, "token" | "workspaceId" | "selectedRecordId" | "setMediaAssets" | "setReminders">;',
]) {
  if (!useWorkspaceShellSelectionEffectsTypesSource.includes(requiredUseWorkspaceShellSelectionEffectsTypesUsage)) {
    throw new Error(
      `use-workspace-shell-selection-effects.types.ts must own shell-selection input typing: ${requiredUseWorkspaceShellSelectionEffectsTypesUsage}`,
    );
  }
}

const maxUseWorkspaceShellSelectionEffectsTypesLines = 2;
if (useWorkspaceShellSelectionEffectsTypesLines > maxUseWorkspaceShellSelectionEffectsTypesLines) {
  throw new Error(
    `use-workspace-shell-selection-effects.types.ts exceeded ${maxUseWorkspaceShellSelectionEffectsTypesLines} lines: ${useWorkspaceShellSelectionEffectsTypesLines}`,
  );
}

for (const requiredWorkspaceShellRecordFilterActionsUsage of [
  'import type { ApplyWorkspaceShellLocationFilterInput } from "./workspace-shell-record-filter-actions.types";',
  "}: ApplyWorkspaceShellLocationFilterInput) {",
]) {
  if (!workspaceShellRecordFilterActionsSource.includes(requiredWorkspaceShellRecordFilterActionsUsage)) {
    throw new Error(
      `workspace-shell-record-filter-actions.ts must reuse the extracted shell-location-filter input type: ${requiredWorkspaceShellRecordFilterActionsUsage}`,
    );
  }
}

if (workspaceShellRecordFilterActionsSource.includes('}: Pick<UseWorkspaceShellActionsProps["recordFilter"], "placeQuery" | "reviewStatus" | "mappedOnly">) {')) {
  throw new Error(
    "workspace-shell-record-filter-actions.ts must keep shell-location-filter input typing delegated",
  );
}

for (const requiredWorkspaceShellRecordFilterActionsTypesUsage of [
  'import type { UseWorkspaceShellActionsProps } from "./workspace-shell-actions.types"; export type ApplyWorkspaceShellLocationFilterInput = Pick<UseWorkspaceShellActionsProps["recordFilter"], "placeQuery" | "reviewStatus" | "mappedOnly">;',
]) {
  if (!workspaceShellRecordFilterActionsTypesSource.includes(requiredWorkspaceShellRecordFilterActionsTypesUsage)) {
    throw new Error(
      `workspace-shell-record-filter-actions.types.ts must own shell-location-filter input typing: ${requiredWorkspaceShellRecordFilterActionsTypesUsage}`,
    );
  }
}

const maxWorkspaceShellRecordFilterActionsTypesLines = 2;
if (workspaceShellRecordFilterActionsTypesLines > maxWorkspaceShellRecordFilterActionsTypesLines) {
  throw new Error(
    `workspace-shell-record-filter-actions.types.ts exceeded ${maxWorkspaceShellRecordFilterActionsTypesLines} lines: ${workspaceShellRecordFilterActionsTypesLines}`,
  );
}

for (const requiredWorkspaceShellFrameUsage of [
  'import type { WorkspaceShellFrameProps } from "./workspace-shell-frame.types";',
  "}: WorkspaceShellFrameProps) {",
]) {
  if (!workspaceShellFrameSource.includes(requiredWorkspaceShellFrameUsage)) {
    throw new Error(
      `workspace-shell-frame.tsx must reuse the extracted shell-frame props type: ${requiredWorkspaceShellFrameUsage}`,
    );
  }
}

for (const forbiddenWorkspaceShellFrameToken of [
  'import type { ReactNode } from "react";',
  "type WorkspaceShellFrameProps = {",
]) {
  if (workspaceShellFrameSource.includes(forbiddenWorkspaceShellFrameToken)) {
    throw new Error(
      `workspace-shell-frame.tsx must keep shell-frame prop typing delegated: ${forbiddenWorkspaceShellFrameToken}`,
    );
  }
}

for (const requiredWorkspaceShellFrameTypesUsage of [
  'import type { ReactNode } from "react"; export type WorkspaceShellFrameProps = { children: ReactNode; error: string; loading: boolean };',
]) {
  if (!workspaceShellFrameTypesSource.includes(requiredWorkspaceShellFrameTypesUsage)) {
    throw new Error(
      `workspace-shell-frame.types.ts must own shell-frame prop typing: ${requiredWorkspaceShellFrameTypesUsage}`,
    );
  }
}

const maxWorkspaceShellFrameTypesLines = 2;
if (workspaceShellFrameTypesLines > maxWorkspaceShellFrameTypesLines) {
  throw new Error(
    `workspace-shell-frame.types.ts exceeded ${maxWorkspaceShellFrameTypesLines} lines: ${workspaceShellFrameTypesLines}`,
  );
}

for (const requiredWorkspaceShellActionsResultTypesUsage of [
  'import type { useWorkspaceShellActions } from "./use-workspace-shell-actions";',
  "export type WorkspaceShellActions = ReturnType<typeof useWorkspaceShellActions>;",
]) {
  if (!workspaceShellActionsResultTypesSource.includes(requiredWorkspaceShellActionsResultTypesUsage)) {
    throw new Error(
      `workspace-shell-actions-result.types.ts must own the actions result boundary: ${requiredWorkspaceShellActionsResultTypesUsage}`,
    );
  }
}

const maxWorkspaceShellActionsResultTypesLines = 3;
if (workspaceShellActionsResultTypesLines > maxWorkspaceShellActionsResultTypesLines) {
  throw new Error(
    `workspace-shell-actions-result.types.ts exceeded ${maxWorkspaceShellActionsResultTypesLines} lines: ${workspaceShellActionsResultTypesLines}`,
  );
}

for (const requiredWorkspaceShellRefreshersResultTypesUsage of [
  'import type { createWorkspaceShellRefreshers } from "./use-workspace-shell-refreshers";',
  "export type WorkspaceShellRefreshers = ReturnType<typeof createWorkspaceShellRefreshers>;",
]) {
  if (!workspaceShellRefreshersResultTypesSource.includes(requiredWorkspaceShellRefreshersResultTypesUsage)) {
    throw new Error(
      `workspace-shell-refreshers-result.types.ts must own the refreshers result boundary: ${requiredWorkspaceShellRefreshersResultTypesUsage}`,
    );
  }
}

const maxWorkspaceShellRefreshersResultTypesLines = 3;
if (workspaceShellRefreshersResultTypesLines > maxWorkspaceShellRefreshersResultTypesLines) {
  throw new Error(
    `workspace-shell-refreshers-result.types.ts exceeded ${maxWorkspaceShellRefreshersResultTypesLines} lines: ${workspaceShellRefreshersResultTypesLines}`,
  );
}

for (const requiredWorkspaceShellRouterTypesUsage of [
  'import type { RouterLike } from "./workspace-shell-effects.types";',
  "export type WorkspaceShellRouter = RouterLike;",
]) {
  if (!workspaceShellRouterTypesSource.includes(requiredWorkspaceShellRouterTypesUsage)) {
    throw new Error(
      `workspace-shell-router.types.ts must own the router boundary: ${requiredWorkspaceShellRouterTypesUsage}`,
    );
  }
}

for (const forbiddenWorkspaceShellRouterTypesToken of ["useRouter", "ReturnType<"]) {
  if (workspaceShellRouterTypesSource.includes(forbiddenWorkspaceShellRouterTypesToken)) {
    throw new Error(
      `workspace-shell-router.types.ts must stay decoupled from router-hook inference: ${forbiddenWorkspaceShellRouterTypesToken}`,
    );
  }
}

const maxWorkspaceShellRouterTypesLines = 3;
if (workspaceShellRouterTypesLines > maxWorkspaceShellRouterTypesLines) {
  throw new Error(
    `workspace-shell-router.types.ts exceeded ${maxWorkspaceShellRouterTypesLines} lines: ${workspaceShellRouterTypesLines}`,
  );
}

for (const requiredWorkspaceShellStateResultTypesUsage of [
  'import type { useWorkspaceShellState } from "./use-workspace-shell-state";',
  "export type WorkspaceShellState = ReturnType<typeof useWorkspaceShellState>;",
]) {
  if (!workspaceShellStateResultTypesSource.includes(requiredWorkspaceShellStateResultTypesUsage)) {
    throw new Error(
      `workspace-shell-state-result.types.ts must own the state result boundary: ${requiredWorkspaceShellStateResultTypesUsage}`,
    );
  }
}

const maxWorkspaceShellStateResultTypesLines = 3;
if (workspaceShellStateResultTypesLines > maxWorkspaceShellStateResultTypesLines) {
  throw new Error(
    `workspace-shell-state-result.types.ts exceeded ${maxWorkspaceShellStateResultTypesLines} lines: ${workspaceShellStateResultTypesLines}`,
  );
}

for (const requiredRecordMediaSelectedContentPropsUsage of [
  'import type { MediaAssetSectionProps } from "./media-asset-section.types";',
  'import type { MediaStorageOverviewProps } from "./media-storage-overview.types";',
  'import type { RecordMediaProcessingPanelsProps } from "./record-media-processing-panels.types";',
  "export function buildMediaStorageOverviewProps(",
  "export function buildRecordMediaProcessingPanelsProps(",
  "export function buildMediaAssetSectionProps(",
]) {
  if (!recordMediaSelectedContentPropsSource.includes(requiredRecordMediaSelectedContentPropsUsage)) {
    throw new Error(
      `record-media-selected-content-props.ts must reuse explicit media child props contracts: ${requiredRecordMediaSelectedContentPropsUsage}`,
    );
  }
}

for (const forbiddenRecordMediaSelectedContentPropsToken of [
  "ComponentProps",
  'from "./media-asset-section";',
  'from "./media-storage-overview";',
  'from "./record-media-processing-panels";',
]) {
  if (recordMediaSelectedContentPropsSource.includes(forbiddenRecordMediaSelectedContentPropsToken)) {
    throw new Error(
      `record-media-selected-content-props.ts must keep component-signature inference delegated: ${forbiddenRecordMediaSelectedContentPropsToken}`,
    );
  }
}

const maxRecordMediaSelectedContentPropsLines = 80;
if (recordMediaSelectedContentPropsLines > maxRecordMediaSelectedContentPropsLines) {
  throw new Error(
    `record-media-selected-content-props.ts exceeded ${maxRecordMediaSelectedContentPropsLines} lines: ${recordMediaSelectedContentPropsLines}`,
  );
}

for (const requiredRecordEditorWorkspaceMainSectionsPropsUsage of [
  'import type { BuildRecordEditorMainSectionsPropsInput } from "./record-editor-workspace-main-sections-props.types";',
  "}: BuildRecordEditorMainSectionsPropsInput): RecordEditorMainSectionsProps {",
]) {
  if (!recordEditorWorkspaceMainSectionsPropsSource.includes(requiredRecordEditorWorkspaceMainSectionsPropsUsage)) {
    throw new Error(
      `record-editor-workspace-main-sections-props.ts must reuse the extracted editor-main-sections input type: ${requiredRecordEditorWorkspaceMainSectionsPropsUsage}`,
    );
  }
}

if (recordEditorWorkspaceMainSectionsPropsSource.includes("}: {")) {
  throw new Error(
    "record-editor-workspace-main-sections-props.ts must keep editor-main-sections input typing delegated",
  );
}

for (const requiredRecordEditorWorkspaceMainSectionsPropsTypesUsage of [
  'import type { RecordEditorMainSectionsProps } from "./record-editor-main-sections.types"; import type { RecordEditorWorkspaceProps } from "./record-editor-workspace.types"; export type BuildRecordEditorMainSectionsPropsInput = { fieldBindings: RecordEditorMainSectionsProps["fieldBindings"]; locationReviewBindings: RecordEditorMainSectionsProps["locationReviewBindings"]; props: RecordEditorWorkspaceProps };',
]) {
  if (!recordEditorWorkspaceMainSectionsPropsTypesSource.includes(requiredRecordEditorWorkspaceMainSectionsPropsTypesUsage)) {
    throw new Error(
      `record-editor-workspace-main-sections-props.types.ts must own editor-main-sections input typing: ${requiredRecordEditorWorkspaceMainSectionsPropsTypesUsage}`,
    );
  }
}

const maxRecordEditorWorkspaceMainSectionsPropsTypesLines = 2;
if (recordEditorWorkspaceMainSectionsPropsTypesLines > maxRecordEditorWorkspaceMainSectionsPropsTypesLines) {
  throw new Error(
    `record-editor-workspace-main-sections-props.types.ts exceeded ${maxRecordEditorWorkspaceMainSectionsPropsTypesLines} lines: ${recordEditorWorkspaceMainSectionsPropsTypesLines}`,
  );
}

for (const requiredRecordReminderToolsPanelPropsUsage of [
  'import type { BuildRecordReminderPanelPropsInput } from "./record-reminder-tools-panel-props.types";',
  "}: BuildRecordReminderPanelPropsInput): RecordReminderPanelProps {",
]) {
  if (!recordReminderToolsPanelPropsSource.includes(requiredRecordReminderToolsPanelPropsUsage)) {
    throw new Error(
      `record-reminder-tools-panel-props.ts must reuse the extracted reminder-panel input type: ${requiredRecordReminderToolsPanelPropsUsage}`,
    );
  }
}

for (const forbiddenRecordReminderToolsPanelPropsToken of [
  "type ReminderBindings = Pick<",
  "}: {",
]) {
  if (recordReminderToolsPanelPropsSource.includes(forbiddenRecordReminderToolsPanelPropsToken)) {
    throw new Error(
      `record-reminder-tools-panel-props.ts must keep reminder-panel input typing delegated: ${forbiddenRecordReminderToolsPanelPropsToken}`,
    );
  }
}

for (const requiredRecordReminderToolsPanelPropsTypesUsage of [
  'import type { RecordReminderPanelProps } from "./record-reminder-panel.types"; import type { RecordReminderToolsProps } from "./record-reminder-tools.types"; export type ReminderBindings = Pick<RecordReminderPanelProps, "onMarkReminderDone" | "onMessageChange" | "onRemindAtChange" | "onTitleChange" | "onToggleReminderEnabled">; export type BuildRecordReminderPanelPropsInput = { bindings: ReminderBindings; props: RecordReminderToolsProps };',
]) {
  if (!recordReminderToolsPanelPropsTypesSource.includes(requiredRecordReminderToolsPanelPropsTypesUsage)) {
    throw new Error(
      `record-reminder-tools-panel-props.types.ts must own reminder-panel input typing: ${requiredRecordReminderToolsPanelPropsTypesUsage}`,
    );
  }
}

const maxRecordReminderToolsPanelPropsTypesLines = 2;
if (recordReminderToolsPanelPropsTypesLines > maxRecordReminderToolsPanelPropsTypesLines) {
  throw new Error(
    `record-reminder-tools-panel-props.types.ts exceeded ${maxRecordReminderToolsPanelPropsTypesLines} lines: ${recordReminderToolsPanelPropsTypesLines}`,
  );
}

for (const requiredMediaStorageOverviewUsage of [
  'import { MediaStorageOverviewProviderTags } from "./media-storage-overview-provider-tags";',
  'import { MediaStorageOverviewSummary } from "./media-storage-overview-summary";',
  'import type { MediaStorageOverviewProps } from "./media-storage-overview.types";',
  "export function MediaStorageOverview({",
  "<MediaStorageOverviewSummary",
  "<MediaStorageOverviewProviderTags",
]) {
  if (!mediaStorageOverviewSource.includes(requiredMediaStorageOverviewUsage)) {
    throw new Error(
      `media-storage-overview.tsx must import delegated media overview props: ${requiredMediaStorageOverviewUsage}`,
    );
  }
}

for (const forbiddenMediaStorageOverviewToken of [
  "type MediaStorageOverviewProps = {",
  'className="detail-grid"',
  'Object.entries(mediaProcessingOverview.by_storage_provider)',
]) {
  if (mediaStorageOverviewSource.includes(forbiddenMediaStorageOverviewToken)) {
    throw new Error(`media-storage-overview.tsx must keep overview detail rendering delegated: ${forbiddenMediaStorageOverviewToken}`);
  }
}

for (const requiredMediaStorageOverviewTypesUsage of [
  'import type { MediaProcessingOverview, MediaStorageSummary } from "../lib/types";',
  "export type MediaStorageOverviewProps = {",
]) {
  if (!mediaStorageOverviewTypesSource.includes(requiredMediaStorageOverviewTypesUsage)) {
    throw new Error(
      `media-storage-overview.types.ts must own overview prop typing: ${requiredMediaStorageOverviewTypesUsage}`,
    );
  }
}

const maxMediaStorageOverviewTypesLines = 3;
if (mediaStorageOverviewTypesLines > maxMediaStorageOverviewTypesLines) {
  throw new Error(
    `media-storage-overview.types.ts exceeded ${maxMediaStorageOverviewTypesLines} lines: ${mediaStorageOverviewTypesLines}`,
  );
}

for (const requiredMediaStorageOverviewSummaryUsage of [
  'import { MediaStorageOverviewProcessingGrid } from "./media-storage-overview-processing-grid";',
  'import { MediaStorageOverviewUsageGrid } from "./media-storage-overview-usage-grid";',
  'import type { MediaStorageOverviewSummaryProps } from "./media-storage-overview-summary.types";',
  "}: MediaStorageOverviewSummaryProps) {",
  "<MediaStorageOverviewUsageGrid",
  "<MediaStorageOverviewProcessingGrid",
]) {
  if (!mediaStorageOverviewSummarySource.includes(requiredMediaStorageOverviewSummaryUsage)) {
    throw new Error(
      `media-storage-overview-summary.tsx must own overview summary rendering: ${requiredMediaStorageOverviewSummaryUsage}`,
    );
  }
}

for (const forbiddenMediaStorageOverviewSummaryToken of [
  'className="detail-grid"',
  "mediaStorageSummary.missing_file_count",
  "mediaProcessingOverview.completed_count",
]) {
  if (mediaStorageOverviewSummarySource.includes(forbiddenMediaStorageOverviewSummaryToken)) {
    throw new Error(
      `media-storage-overview-summary.tsx must keep overview grid rendering delegated: ${forbiddenMediaStorageOverviewSummaryToken}`,
    );
  }
}

const maxMediaStorageOverviewSummaryLines = 55;
if (mediaStorageOverviewSummaryLines > maxMediaStorageOverviewSummaryLines) {
  throw new Error(
    `media-storage-overview-summary.tsx exceeded ${maxMediaStorageOverviewSummaryLines} lines: ${mediaStorageOverviewSummaryLines}`,
  );
}

for (const requiredMediaStorageOverviewSummaryTypesUsage of [
  'import type { MediaStorageOverviewProps } from "./media-storage-overview.types"; export type MediaStorageOverviewSummaryProps = Pick<MediaStorageOverviewProps, "allTrackedFilesPresentLabel" | "formatFileCountLabel" | "mediaAssetCount" | "mediaProcessingOverview" | "mediaStorageSummary" | "missingFilesLabel" | "needsAttentionLabel" | "processingCompletedLabel" | "queueStateLabel" | "queuedLabel" | "remoteLabel" | "selectedRecordMediaSizeLabel" | "storageHealthLabel" | "storageMixLabel" | "thisRecordMediaLabel" | "workspaceStorageLabel" | "localLabel">;',
]) {
  if (!mediaStorageOverviewSummaryTypesSource.includes(requiredMediaStorageOverviewSummaryTypesUsage)) {
    throw new Error(
      `media-storage-overview-summary.types.ts must own overview summary prop typing: ${requiredMediaStorageOverviewSummaryTypesUsage}`,
    );
  }
}

const maxMediaStorageOverviewSummaryTypesLines = 2;
if (mediaStorageOverviewSummaryTypesLines > maxMediaStorageOverviewSummaryTypesLines) {
  throw new Error(
    `media-storage-overview-summary.types.ts exceeded ${maxMediaStorageOverviewSummaryTypesLines} lines: ${mediaStorageOverviewSummaryTypesLines}`,
  );
}

for (const requiredMediaStorageOverviewUsageGridUsage of [
  'import type { MediaStorageOverviewUsageGridProps } from "./media-storage-overview-usage-grid.types";',
  "}: MediaStorageOverviewUsageGridProps) {",
  'className="detail-grid"',
  "mediaStorageSummary.missing_file_count",
]) {
  if (!mediaStorageOverviewUsageGridSource.includes(requiredMediaStorageOverviewUsageGridUsage)) {
    throw new Error(
      `media-storage-overview-usage-grid.tsx must own overview usage rendering: ${requiredMediaStorageOverviewUsageGridUsage}`,
    );
  }
}

if (mediaStorageOverviewUsageGridSource.includes("type MediaStorageOverviewUsageGridProps = Pick<")) {
  throw new Error("media-storage-overview-usage-grid.tsx must keep usage-grid prop typing delegated");
}

const maxMediaStorageOverviewUsageGridLines = 45;
if (mediaStorageOverviewUsageGridLines > maxMediaStorageOverviewUsageGridLines) {
  throw new Error(
    `media-storage-overview-usage-grid.tsx exceeded ${maxMediaStorageOverviewUsageGridLines} lines: ${mediaStorageOverviewUsageGridLines}`,
  );
}

for (const requiredMediaStorageOverviewUsageGridTypesUsage of [
  'import type { MediaStorageOverviewSummaryProps } from "./media-storage-overview-summary.types"; export type MediaStorageOverviewUsageGridProps = Pick<MediaStorageOverviewSummaryProps, "allTrackedFilesPresentLabel" | "formatFileCountLabel" | "mediaAssetCount" | "mediaStorageSummary" | "missingFilesLabel" | "selectedRecordMediaSizeLabel" | "storageHealthLabel" | "thisRecordMediaLabel" | "workspaceStorageLabel">;',
]) {
  if (!mediaStorageOverviewUsageGridTypesSource.includes(requiredMediaStorageOverviewUsageGridTypesUsage)) {
    throw new Error(
      `media-storage-overview-usage-grid.types.ts must own usage-grid prop typing: ${requiredMediaStorageOverviewUsageGridTypesUsage}`,
    );
  }
}

const maxMediaStorageOverviewUsageGridTypesLines = 2;
if (mediaStorageOverviewUsageGridTypesLines > maxMediaStorageOverviewUsageGridTypesLines) {
  throw new Error(
    `media-storage-overview-usage-grid.types.ts exceeded ${maxMediaStorageOverviewUsageGridTypesLines} lines: ${mediaStorageOverviewUsageGridTypesLines}`,
  );
}

for (const requiredMediaStorageOverviewProcessingGridUsage of [
  'import type { MediaStorageOverviewProcessingGridProps } from "./media-storage-overview-processing-grid.types";',
  "}: MediaStorageOverviewProcessingGridProps) {",
  "if (!mediaProcessingOverview) {",
  "mediaProcessingOverview.completed_count",
  "mediaProcessingOverview.local_item_count",
]) {
  if (!mediaStorageOverviewProcessingGridSource.includes(requiredMediaStorageOverviewProcessingGridUsage)) {
    throw new Error(
      `media-storage-overview-processing-grid.tsx must own overview processing rendering: ${requiredMediaStorageOverviewProcessingGridUsage}`,
    );
  }
}

if (mediaStorageOverviewProcessingGridSource.includes("type MediaStorageOverviewProcessingGridProps = Pick<")) {
  throw new Error(
    "media-storage-overview-processing-grid.tsx must keep processing-grid prop typing delegated",
  );
}

const maxMediaStorageOverviewProcessingGridLines = 50;
if (mediaStorageOverviewProcessingGridLines > maxMediaStorageOverviewProcessingGridLines) {
  throw new Error(
    `media-storage-overview-processing-grid.tsx exceeded ${maxMediaStorageOverviewProcessingGridLines} lines: ${mediaStorageOverviewProcessingGridLines}`,
  );
}

for (const requiredMediaStorageOverviewProcessingGridTypesUsage of [
  'import type { MediaStorageOverviewSummaryProps } from "./media-storage-overview-summary.types"; export type MediaStorageOverviewProcessingGridProps = Pick<MediaStorageOverviewSummaryProps, "localLabel" | "mediaProcessingOverview" | "needsAttentionLabel" | "processingCompletedLabel" | "queueStateLabel" | "queuedLabel" | "remoteLabel" | "storageMixLabel">;',
]) {
  if (!mediaStorageOverviewProcessingGridTypesSource.includes(requiredMediaStorageOverviewProcessingGridTypesUsage)) {
    throw new Error(
      `media-storage-overview-processing-grid.types.ts must own processing-grid prop typing: ${requiredMediaStorageOverviewProcessingGridTypesUsage}`,
    );
  }
}

const maxMediaStorageOverviewProcessingGridTypesLines = 2;
if (mediaStorageOverviewProcessingGridTypesLines > maxMediaStorageOverviewProcessingGridTypesLines) {
  throw new Error(
    `media-storage-overview-processing-grid.types.ts exceeded ${maxMediaStorageOverviewProcessingGridTypesLines} lines: ${mediaStorageOverviewProcessingGridTypesLines}`,
  );
}

for (const requiredMediaStorageOverviewProviderTagsUsage of [
  'import type { MediaStorageOverviewProviderTagsProps } from "./media-storage-overview-provider-tags.types";',
  "}: MediaStorageOverviewProviderTagsProps) {",
  "Object.entries(mediaProcessingOverview.by_storage_provider)",
]) {
  if (!mediaStorageOverviewProviderTagsSource.includes(requiredMediaStorageOverviewProviderTagsUsage)) {
    throw new Error(
      `media-storage-overview-provider-tags.tsx must own provider-tag rendering: ${requiredMediaStorageOverviewProviderTagsUsage}`,
    );
  }
}

const maxMediaStorageOverviewProviderTagsLines = 25;
if (mediaStorageOverviewProviderTagsLines > maxMediaStorageOverviewProviderTagsLines) {
  throw new Error(
    `media-storage-overview-provider-tags.tsx exceeded ${maxMediaStorageOverviewProviderTagsLines} lines: ${mediaStorageOverviewProviderTagsLines}`,
  );
}

for (const requiredMediaStorageOverviewProviderTagsTypesUsage of [
  'import type { MediaStorageOverviewProps } from "./media-storage-overview.types"; export type MediaStorageOverviewProviderTagsProps = Pick<MediaStorageOverviewProps, "mediaProcessingOverview">;',
]) {
  if (!mediaStorageOverviewProviderTagsTypesSource.includes(requiredMediaStorageOverviewProviderTagsTypesUsage)) {
    throw new Error(
      `media-storage-overview-provider-tags.types.ts must own provider-tag prop typing: ${requiredMediaStorageOverviewProviderTagsTypesUsage}`,
    );
  }
}

const maxMediaStorageOverviewProviderTagsTypesLines = 2;
if (mediaStorageOverviewProviderTagsTypesLines > maxMediaStorageOverviewProviderTagsTypesLines) {
  throw new Error(
    `media-storage-overview-provider-tags.types.ts exceeded ${maxMediaStorageOverviewProviderTagsTypesLines} lines: ${mediaStorageOverviewProviderTagsTypesLines}`,
  );
}

for (const requiredRecordMediaProcessingPanelsUsage of [
  'import type { RecordMediaProcessingPanelsProps } from "./record-media-processing-panels.types";',
  "export function RecordMediaProcessingPanels({",
]) {
  if (!recordMediaProcessingPanelsSource.includes(requiredRecordMediaProcessingPanelsUsage)) {
    throw new Error(
      `record-media-processing-panels.tsx must import delegated media processing props: ${requiredRecordMediaProcessingPanelsUsage}`,
    );
  }
}

if (recordMediaProcessingPanelsSource.includes("type RecordMediaProcessingPanelsProps = Pick<")) {
  throw new Error(
    "record-media-processing-panels.tsx must keep processing-panel prop typing delegated",
  );
}

for (const requiredRecordMediaProcessingPanelsTypesUsage of [
  'import type { RecordMediaToolsProps } from "./record-media-tools.types";',
  "export type RecordMediaProcessingPanelsProps = Pick<RecordMediaToolsProps,",
]) {
  if (!recordMediaProcessingPanelsTypesSource.includes(requiredRecordMediaProcessingPanelsTypesUsage)) {
    throw new Error(
      `record-media-processing-panels.types.ts must own processing-panel prop typing: ${requiredRecordMediaProcessingPanelsTypesUsage}`,
    );
  }
}

const maxRecordMediaProcessingPanelsTypesLines = 3;
if (recordMediaProcessingPanelsTypesLines > maxRecordMediaProcessingPanelsTypesLines) {
  throw new Error(
    `record-media-processing-panels.types.ts exceeded ${maxRecordMediaProcessingPanelsTypesLines} lines: ${recordMediaProcessingPanelsTypesLines}`,
  );
}

for (const requiredMediaAssetSectionUsage of [
  'import { MediaAssetSectionEmpty } from "./media-asset-section-empty";',
  'import { MediaAssetSectionSummary } from "./media-asset-section-summary";',
  'import type { MediaAssetSectionProps } from "./media-asset-section.types";',
  "export function MediaAssetSection({",
  "<MediaAssetSectionEmpty",
  "<MediaAssetSectionSummary",
]) {
  if (!mediaAssetSectionSource.includes(requiredMediaAssetSectionUsage)) {
    throw new Error(
      `media-asset-section.tsx must import delegated media asset props: ${requiredMediaAssetSectionUsage}`,
    );
  }
}

for (const forbiddenMediaAssetSectionToken of [
  "type MediaAssetSectionProps = {",
  "{largestFilePrefixLabel}: {largestItemName}",
  '{largestItemSizeLabel ? ` (${largestItemSizeLabel})` : ""}',
  '<div className="notice">{noMediaLabel}</div>',
]) {
  if (mediaAssetSectionSource.includes(forbiddenMediaAssetSectionToken)) {
    throw new Error(
      `media-asset-section.tsx must keep media asset section summary delegated: ${forbiddenMediaAssetSectionToken}`,
    );
  }
}

for (const requiredMediaAssetSectionTypesUsage of [
  'import type { MediaAsset } from "../lib/types";',
  'import type { MediaIssueCopy } from "../lib/record-panel-ui";',
  "export type MediaAssetSectionProps = {",
]) {
  if (!mediaAssetSectionTypesSource.includes(requiredMediaAssetSectionTypesUsage)) {
    throw new Error(
      `media-asset-section.types.ts must own media asset prop typing: ${requiredMediaAssetSectionTypesUsage}`,
    );
  }
}

const maxMediaAssetSectionTypesLines = 4;
if (mediaAssetSectionTypesLines > maxMediaAssetSectionTypesLines) {
  throw new Error(
    `media-asset-section.types.ts exceeded ${maxMediaAssetSectionTypesLines} lines: ${mediaAssetSectionTypesLines}`,
  );
}

for (const requiredMediaAssetSectionSummaryUsage of [
  'import type { MediaAssetSectionSummaryProps } from "./media-asset-section-summary.types";',
  "}: MediaAssetSectionSummaryProps) {",
  "{largestFilePrefixLabel}: {largestItemName}",
  '{largestItemSizeLabel ? ` (${largestItemSizeLabel})` : ""}',
]) {
  if (!mediaAssetSectionSummarySource.includes(requiredMediaAssetSectionSummaryUsage)) {
    throw new Error(
      `media-asset-section-summary.tsx must reuse the extracted media asset summary props type: ${requiredMediaAssetSectionSummaryUsage}`,
    );
  }
}

if (mediaAssetSectionSummarySource.includes("type MediaAssetSectionSummaryProps = Pick<")) {
  throw new Error("media-asset-section-summary.tsx must keep media asset summary prop typing delegated");
}

const maxMediaAssetSectionSummaryLines = 8;
if (mediaAssetSectionSummaryLines > maxMediaAssetSectionSummaryLines) {
  throw new Error(
    `media-asset-section-summary.tsx exceeded ${maxMediaAssetSectionSummaryLines} lines: ${mediaAssetSectionSummaryLines}`,
  );
}

for (const requiredMediaAssetSectionSummaryTypesUsage of [
  'import type { MediaAssetSectionProps } from "./media-asset-section.types"; export type MediaAssetSectionSummaryProps = Pick<MediaAssetSectionProps, "largestFilePrefixLabel" | "largestItemName" | "largestItemSizeLabel">;',
]) {
  if (!mediaAssetSectionSummaryTypesSource.includes(requiredMediaAssetSectionSummaryTypesUsage)) {
    throw new Error(
      `media-asset-section-summary.types.ts must own media asset summary prop typing: ${requiredMediaAssetSectionSummaryTypesUsage}`,
    );
  }
}

const maxMediaAssetSectionSummaryTypesLines = 2;
if (mediaAssetSectionSummaryTypesLines > maxMediaAssetSectionSummaryTypesLines) {
  throw new Error(
    `media-asset-section-summary.types.ts exceeded ${maxMediaAssetSectionSummaryTypesLines} lines: ${mediaAssetSectionSummaryTypesLines}`,
  );
}

for (const requiredMediaAssetSectionEmptyUsage of [
  'import type { MediaAssetSectionEmptyProps } from "./media-asset-section-empty.types";',
  "}: MediaAssetSectionEmptyProps) {",
  '<div className="notice">{noMediaLabel}</div>',
]) {
  if (!mediaAssetSectionEmptySource.includes(requiredMediaAssetSectionEmptyUsage)) {
    throw new Error(
      `media-asset-section-empty.tsx must reuse the extracted media asset empty props type: ${requiredMediaAssetSectionEmptyUsage}`,
    );
  }
}

if (mediaAssetSectionEmptySource.includes("type MediaAssetSectionEmptyProps = Pick<")) {
  throw new Error("media-asset-section-empty.tsx must keep media asset empty prop typing delegated");
}

const maxMediaAssetSectionEmptyLines = 8;
if (mediaAssetSectionEmptyLines > maxMediaAssetSectionEmptyLines) {
  throw new Error(
    `media-asset-section-empty.tsx exceeded ${maxMediaAssetSectionEmptyLines} lines: ${mediaAssetSectionEmptyLines}`,
  );
}

for (const requiredMediaAssetSectionEmptyTypesUsage of [
  'import type { MediaAssetSectionProps } from "./media-asset-section.types"; export type MediaAssetSectionEmptyProps = Pick<MediaAssetSectionProps, "noMediaLabel">;',
]) {
  if (!mediaAssetSectionEmptyTypesSource.includes(requiredMediaAssetSectionEmptyTypesUsage)) {
    throw new Error(
      `media-asset-section-empty.types.ts must own media asset empty prop typing: ${requiredMediaAssetSectionEmptyTypesUsage}`,
    );
  }
}

const maxMediaAssetSectionEmptyTypesLines = 2;
if (mediaAssetSectionEmptyTypesLines > maxMediaAssetSectionEmptyTypesLines) {
  throw new Error(
    `media-asset-section-empty.types.ts exceeded ${maxMediaAssetSectionEmptyTypesLines} lines: ${mediaAssetSectionEmptyTypesLines}`,
  );
}

for (const requiredMediaAssetCardUsage of [
  'import { MediaAssetCardActions } from "./media-asset-card-actions";',
  'import { MediaAssetCardError } from "./media-asset-card-error";',
  'import { MediaAssetCardExtractedText } from "./media-asset-card-extracted-text";',
  'import { MediaAssetCardIntro } from "./media-asset-card-intro";',
  'import { MediaAssetCardMetadata } from "./media-asset-card-metadata";',
  'import { MediaAssetCardPreview } from "./media-asset-card-preview";',
  'import type { MediaAssetCardProps } from "./media-asset-card.types";',
  "}: MediaAssetCardProps) {",
  "<MediaAssetCardIntro",
  "<MediaAssetCardMetadata",
  "<MediaAssetCardPreview",
  "<MediaAssetCardExtractedText",
  "<MediaAssetCardError",
  "<MediaAssetCardActions",
]) {
  if (!mediaAssetCardSource.includes(requiredMediaAssetCardUsage)) {
    throw new Error(
      `media-asset-card.tsx must delegate intro, metadata, preview, and actions to focused leaves: ${requiredMediaAssetCardUsage}`,
    );
  }
}

for (const forbiddenMediaAssetCardToken of [
  '<div className="eyebrow">{asset.media_type}</div>',
  "{asset.original_filename}",
  '{asset.mime_type}',
  'asset.processing_error ? <div className="notice error" style={{ marginTop: 10 }}>{asset.processing_error}</div> : null',
  'asset.extracted_text ? (',
  'asset.extracted_text.length > 280 ? `${asset.extracted_text.slice(0, 280)}...` : asset.extracted_text',
  'authToken ? (',
  '<MediaPreview asset={asset} token={authToken} workspaceId={workspaceId} />',
]) {
  if (mediaAssetCardSource.includes(forbiddenMediaAssetCardToken)) {
    throw new Error(
      `media-asset-card.tsx must keep asset identity rendering delegated: ${forbiddenMediaAssetCardToken}`,
    );
  }
}

const maxMediaAssetCardLines = 65;
if (mediaAssetCardLines > maxMediaAssetCardLines) {
  throw new Error(
    `media-asset-card.tsx exceeded ${maxMediaAssetCardLines} lines: ${mediaAssetCardLines}`,
  );
}

for (const requiredMediaAssetCardIntroUsage of [
  'import type { MediaAssetCardIntroProps } from "./media-asset-card-intro.types";',
  "}: MediaAssetCardIntroProps) {",
  '<div className="eyebrow">{asset.media_type}</div>',
  "{asset.original_filename}",
  '{asset.mime_type}',
]) {
  if (!mediaAssetCardIntroSource.includes(requiredMediaAssetCardIntroUsage)) {
    throw new Error(
      `media-asset-card-intro.tsx must reuse the extracted media-asset intro props type: ${requiredMediaAssetCardIntroUsage}`,
    );
  }
}

if (mediaAssetCardIntroSource.includes("type MediaAssetCardIntroProps = Pick<")) {
  throw new Error("media-asset-card-intro.tsx must keep media-asset intro prop typing delegated");
}

const maxMediaAssetCardIntroLines = 8;
if (mediaAssetCardIntroLines > maxMediaAssetCardIntroLines) {
  throw new Error(
    `media-asset-card-intro.tsx exceeded ${maxMediaAssetCardIntroLines} lines: ${mediaAssetCardIntroLines}`,
  );
}

for (const requiredMediaAssetCardIntroTypesUsage of [
  'import type { MediaAssetCardProps } from "./media-asset-card.types"; export type MediaAssetCardIntroProps = Pick<MediaAssetCardProps, "asset">;',
]) {
  if (!mediaAssetCardIntroTypesSource.includes(requiredMediaAssetCardIntroTypesUsage)) {
    throw new Error(
      `media-asset-card-intro.types.ts must own media-asset intro prop typing: ${requiredMediaAssetCardIntroTypesUsage}`,
    );
  }
}

const maxMediaAssetCardIntroTypesLines = 2;
if (mediaAssetCardIntroTypesLines > maxMediaAssetCardIntroTypesLines) {
  throw new Error(
    `media-asset-card-intro.types.ts exceeded ${maxMediaAssetCardIntroTypesLines} lines: ${mediaAssetCardIntroTypesLines}`,
  );
}

for (const requiredMediaAssetCardExtractedTextUsage of [
  'import type { MediaAssetCardExtractedTextProps } from "./media-asset-card-extracted-text.types";',
  "}: MediaAssetCardExtractedTextProps) {",
  'asset.extracted_text ? <p style={{ margin: "10px 0 0", lineHeight: 1.6, whiteSpace: "pre-wrap" }}>{asset.extracted_text.length > 280 ? `${asset.extracted_text.slice(0, 280)}...` : asset.extracted_text}</p> : null;',
]) {
  if (!mediaAssetCardExtractedTextSource.includes(requiredMediaAssetCardExtractedTextUsage)) {
    throw new Error(
      `media-asset-card-extracted-text.tsx must reuse the extracted media-asset extracted-text props type: ${requiredMediaAssetCardExtractedTextUsage}`,
    );
  }
}

if (mediaAssetCardExtractedTextSource.includes("type MediaAssetCardExtractedTextProps = Pick<")) {
  throw new Error("media-asset-card-extracted-text.tsx must keep media-asset extracted-text prop typing delegated");
}

const maxMediaAssetCardExtractedTextLines = 8;
if (mediaAssetCardExtractedTextLines > maxMediaAssetCardExtractedTextLines) {
  throw new Error(
    `media-asset-card-extracted-text.tsx exceeded ${maxMediaAssetCardExtractedTextLines} lines: ${mediaAssetCardExtractedTextLines}`,
  );
}

for (const requiredMediaAssetCardExtractedTextTypesUsage of [
  'import type { MediaAssetCardProps } from "./media-asset-card.types"; export type MediaAssetCardExtractedTextProps = Pick<MediaAssetCardProps, "asset">;',
]) {
  if (!mediaAssetCardExtractedTextTypesSource.includes(requiredMediaAssetCardExtractedTextTypesUsage)) {
    throw new Error(
      `media-asset-card-extracted-text.types.ts must own media-asset extracted-text prop typing: ${requiredMediaAssetCardExtractedTextTypesUsage}`,
    );
  }
}

const maxMediaAssetCardExtractedTextTypesLines = 2;
if (mediaAssetCardExtractedTextTypesLines > maxMediaAssetCardExtractedTextTypesLines) {
  throw new Error(
    `media-asset-card-extracted-text.types.ts exceeded ${maxMediaAssetCardExtractedTextTypesLines} lines: ${mediaAssetCardExtractedTextTypesLines}`,
  );
}

for (const requiredMediaAssetCardPreviewUsage of [
  'import { MediaPreview } from "./media-preview";',
  'import type { MediaAssetCardPreviewProps } from "./media-asset-card-preview.types";',
  "}: MediaAssetCardPreviewProps) {",
  '<MediaPreview asset={asset} token={authToken} workspaceId={workspaceId} />',
  'authToken ? <div style={{ marginTop: 12 }}>',
]) {
  if (!mediaAssetCardPreviewSource.includes(requiredMediaAssetCardPreviewUsage)) {
    throw new Error(
      `media-asset-card-preview.tsx must reuse the extracted media-asset preview props type: ${requiredMediaAssetCardPreviewUsage}`,
    );
  }
}

if (mediaAssetCardPreviewSource.includes("type MediaAssetCardPreviewProps = Pick<")) {
  throw new Error("media-asset-card-preview.tsx must keep media-asset preview prop typing delegated");
}

const maxMediaAssetCardPreviewLines = 9;
if (mediaAssetCardPreviewLines > maxMediaAssetCardPreviewLines) {
  throw new Error(
    `media-asset-card-preview.tsx exceeded ${maxMediaAssetCardPreviewLines} lines: ${mediaAssetCardPreviewLines}`,
  );
}

for (const requiredMediaAssetCardPreviewTypesUsage of [
  'import type { MediaAssetCardProps } from "./media-asset-card.types"; export type MediaAssetCardPreviewProps = Pick<MediaAssetCardProps, "asset" | "authToken" | "workspaceId">;',
]) {
  if (!mediaAssetCardPreviewTypesSource.includes(requiredMediaAssetCardPreviewTypesUsage)) {
    throw new Error(
      `media-asset-card-preview.types.ts must own media-asset preview prop typing: ${requiredMediaAssetCardPreviewTypesUsage}`,
    );
  }
}

const maxMediaAssetCardPreviewTypesLines = 2;
if (mediaAssetCardPreviewTypesLines > maxMediaAssetCardPreviewTypesLines) {
  throw new Error(
    `media-asset-card-preview.types.ts exceeded ${maxMediaAssetCardPreviewTypesLines} lines: ${mediaAssetCardPreviewTypesLines}`,
  );
}

for (const requiredMediaAssetCardErrorUsage of [
  'import type { MediaAssetCardErrorProps } from "./media-asset-card-error.types";',
  "}: MediaAssetCardErrorProps) {",
  'asset.processing_error ? <div className="notice error" style={{ marginTop: 10 }}>{asset.processing_error}</div> : null',
]) {
  if (!mediaAssetCardErrorSource.includes(requiredMediaAssetCardErrorUsage)) {
    throw new Error(
      `media-asset-card-error.tsx must reuse the extracted media-asset error props type: ${requiredMediaAssetCardErrorUsage}`,
    );
  }
}

if (mediaAssetCardErrorSource.includes("type MediaAssetCardErrorProps = Pick<")) {
  throw new Error("media-asset-card-error.tsx must keep media-asset error prop typing delegated");
}

const maxMediaAssetCardErrorLines = 8;
if (mediaAssetCardErrorLines > maxMediaAssetCardErrorLines) {
  throw new Error(
    `media-asset-card-error.tsx exceeded ${maxMediaAssetCardErrorLines} lines: ${mediaAssetCardErrorLines}`,
  );
}

for (const requiredMediaAssetCardErrorTypesUsage of [
  'import type { MediaAssetCardProps } from "./media-asset-card.types"; export type MediaAssetCardErrorProps = Pick<MediaAssetCardProps, "asset">;',
]) {
  if (!mediaAssetCardErrorTypesSource.includes(requiredMediaAssetCardErrorTypesUsage)) {
    throw new Error(
      `media-asset-card-error.types.ts must own media-asset error prop typing: ${requiredMediaAssetCardErrorTypesUsage}`,
    );
  }
}

const maxMediaAssetCardErrorTypesLines = 2;
if (mediaAssetCardErrorTypesLines > maxMediaAssetCardErrorTypesLines) {
  throw new Error(
    `media-asset-card-error.types.ts exceeded ${maxMediaAssetCardErrorTypesLines} lines: ${mediaAssetCardErrorTypesLines}`,
  );
}

for (const requiredMediaAssetCardActionsUsage of [
  'import type { MediaAssetCardActionsProps } from "./media-asset-card-actions.types";',
  "}: MediaAssetCardActionsProps) {",
]) {
  if (!mediaAssetCardActionsSource.includes(requiredMediaAssetCardActionsUsage)) {
    throw new Error(
      `media-asset-card-actions.tsx must reuse the extracted media-action props type: ${requiredMediaAssetCardActionsUsage}`,
    );
  }
}

for (const forbiddenMediaAssetCardActionsToken of [
  'import type { MediaIssueCopy } from "../lib/record-panel-ui";',
  'import type { MediaAsset } from "../lib/types";',
  "type MediaAssetCardActionsProps = {",
]) {
  if (mediaAssetCardActionsSource.includes(forbiddenMediaAssetCardActionsToken)) {
    throw new Error(
      `media-asset-card-actions.tsx must keep media-action prop typing delegated: ${forbiddenMediaAssetCardActionsToken}`,
    );
  }
}

for (const requiredMediaAssetCardActionsTypesUsage of [
  'import type { MediaAssetCardProps } from "./media-asset-card.types"; export type MediaAssetCardActionsProps = Pick<MediaAssetCardProps, "asset" | "canWriteWorkspace" | "deletingMediaId" | "downloadingMediaId" | "mediaIssueCopy" | "onDeleteMediaAsset" | "onDownloadMedia" | "onRefreshMedia" | "onRetryMediaProcessing" | "refreshingMediaId" | "retryingMediaId">;',
]) {
  if (!mediaAssetCardActionsTypesSource.includes(requiredMediaAssetCardActionsTypesUsage)) {
    throw new Error(
      `media-asset-card-actions.types.ts must own media-action prop typing: ${requiredMediaAssetCardActionsTypesUsage}`,
    );
  }
}

const maxMediaAssetCardActionsTypesLines = 2;
if (mediaAssetCardActionsTypesLines > maxMediaAssetCardActionsTypesLines) {
  throw new Error(
    `media-asset-card-actions.types.ts exceeded ${maxMediaAssetCardActionsTypesLines} lines: ${mediaAssetCardActionsTypesLines}`,
  );
}

for (const requiredMapPanelContentUsage of [
  'import type { MapPanelContentProps } from "./map-panel-content.types";',
  "}: MapPanelContentProps) {",
]) {
  if (!mapPanelContentSource.includes(requiredMapPanelContentUsage)) {
    throw new Error(
      `map-panel-content.tsx must reuse the extracted map-content props type: ${requiredMapPanelContentUsage}`,
    );
  }
}

for (const forbiddenMapPanelContentToken of [
  'import type { RefObject } from "react";',
  'import type { LocationDraft } from "../lib/map-panel";',
  'import type { MapPanelControllerState } from "./map-panel-controller-result.types";',
  "type MapPanelContentProps = {",
]) {
  if (mapPanelContentSource.includes(forbiddenMapPanelContentToken)) {
    throw new Error(
      `map-panel-content.tsx must keep map-content prop typing delegated: ${forbiddenMapPanelContentToken}`,
    );
  }
}

for (const requiredMapPanelContentTypesUsage of [
  'import type { RefObject } from "react"; import type { MapPanelProps } from "./map-panel.types"; import type { MapPanelControllerState } from "./map-panel-controller-result.types"; export type MapPanelContentProps = Pick<MapPanelProps, "draftLocation" | "onSelectRecord" | "selectedRecordId"> & { containerRef: RefObject<HTMLDivElement | null>; controller: MapPanelControllerState };',
]) {
  if (!mapPanelContentTypesSource.includes(requiredMapPanelContentTypesUsage)) {
    throw new Error(
      `map-panel-content.types.ts must own map-content prop typing: ${requiredMapPanelContentTypesUsage}`,
    );
  }
}

const maxMapPanelContentTypesLines = 2;
if (mapPanelContentTypesLines > maxMapPanelContentTypesLines) {
  throw new Error(
    `map-panel-content.types.ts exceeded ${maxMapPanelContentTypesLines} lines: ${mapPanelContentTypesLines}`,
  );
}

for (const requiredMapDrilldownCardUsage of [
  'import { MapDrilldownCardActions } from "./map-drilldown-card-actions";',
  'import { MapDrilldownCardFields } from "./map-drilldown-card-fields";',
  'import { MapDrilldownCardIntro } from "./map-drilldown-card-intro";',
  'import type { MapDrilldownCardProps } from "./map-drilldown-card.types";',
  "}: MapDrilldownCardProps) {",
  "<MapDrilldownCardIntro",
  "<MapDrilldownCardFields",
  "<MapDrilldownCardActions",
]) {
  if (!mapDrilldownCardSource.includes(requiredMapDrilldownCardUsage)) {
    throw new Error(
      `map-drilldown-card.tsx must reuse the extracted map drill-down props type: ${requiredMapDrilldownCardUsage}`,
    );
  }
}

for (const forbiddenMapDrilldownCardToken of [
  'import type { LocationFilterState } from "../lib/types";',
  "}: {",
  '<div className="action-row">',
  '{filteringRecords ? "Filtering..." : "Apply location filter"}',
  "Mapped only",
  "Clear location filter",
  '<div className="inline-fields">',
  "Place query",
  "Map status",
  "needs_review",
  '<div className="eyebrow">Map drill-down</div>',
]) {
  if (mapDrilldownCardSource.includes(forbiddenMapDrilldownCardToken)) {
    throw new Error(
      `map-drilldown-card.tsx must keep map drill-down prop typing delegated: ${forbiddenMapDrilldownCardToken}`,
    );
  }
}

const maxMapDrilldownCardLines = 75;
if (mapDrilldownCardLines > maxMapDrilldownCardLines) {
  throw new Error(
    `map-drilldown-card.tsx exceeded ${maxMapDrilldownCardLines} lines: ${mapDrilldownCardLines}`,
  );
}

for (const requiredMapDrilldownCardTypesUsage of [
  'import type { LocationFilterState } from "../lib/types"; export type MapDrilldownCardProps = { filterDraft: LocationFilterState; filteringRecords: boolean; onApplyFilter: () => Promise<void>; onClearFilter: () => Promise<void>; onFilterDraftChange: (updater: (current: LocationFilterState) => LocationFilterState) => void; onUseMappedOnly: () => Promise<void> };',
]) {
  if (!mapDrilldownCardTypesSource.includes(requiredMapDrilldownCardTypesUsage)) {
    throw new Error(
      `map-drilldown-card.types.ts must own map drill-down prop typing: ${requiredMapDrilldownCardTypesUsage}`,
    );
  }
}

const maxMapDrilldownCardTypesLines = 2;
if (mapDrilldownCardTypesLines > maxMapDrilldownCardTypesLines) {
  throw new Error(
    `map-drilldown-card.types.ts exceeded ${maxMapDrilldownCardTypesLines} lines: ${mapDrilldownCardTypesLines}`,
  );
}

for (const requiredMapDrilldownCardIntroUsage of [
  'import type { MapDrilldownCardIntroProps } from "./map-drilldown-card-intro.types";',
  "}: MapDrilldownCardIntroProps) {",
  '<div className="eyebrow">Map drill-down</div>',
]) {
  if (!mapDrilldownCardIntroSource.includes(requiredMapDrilldownCardIntroUsage)) {
    throw new Error(
      `map-drilldown-card-intro.tsx must reuse the extracted map drill-down intro props type: ${requiredMapDrilldownCardIntroUsage}`,
    );
  }
}

if (mapDrilldownCardIntroSource.includes("type MapDrilldownCardIntroProps =")) {
  throw new Error("map-drilldown-card-intro.tsx must keep map drill-down intro prop typing delegated");
}

const maxMapDrilldownCardIntroLines = 8;
if (mapDrilldownCardIntroLines > maxMapDrilldownCardIntroLines) {
  throw new Error(
    `map-drilldown-card-intro.tsx exceeded ${maxMapDrilldownCardIntroLines} lines: ${mapDrilldownCardIntroLines}`,
  );
}

for (const requiredMapDrilldownCardIntroTypesUsage of [
  'export type MapDrilldownCardIntroProps = Record<string, never>;',
]) {
  if (!mapDrilldownCardIntroTypesSource.includes(requiredMapDrilldownCardIntroTypesUsage)) {
    throw new Error(
      `map-drilldown-card-intro.types.ts must own map drill-down intro prop typing: ${requiredMapDrilldownCardIntroTypesUsage}`,
    );
  }
}

const maxMapDrilldownCardIntroTypesLines = 2;
if (mapDrilldownCardIntroTypesLines > maxMapDrilldownCardIntroTypesLines) {
  throw new Error(
    `map-drilldown-card-intro.types.ts exceeded ${maxMapDrilldownCardIntroTypesLines} lines: ${mapDrilldownCardIntroTypesLines}`,
  );
}

for (const requiredMapDrilldownCardFieldsUsage of [
  'import type { MapDrilldownCardFieldsProps } from "./map-drilldown-card-fields.types";',
  'import type { MapDrilldownCardProps } from "./map-drilldown-card.types";',
  "}: MapDrilldownCardFieldsProps) {",
  '<div className="inline-fields">',
  "Place query",
  "Map status",
  "needs_review",
]) {
  if (!mapDrilldownCardFieldsSource.includes(requiredMapDrilldownCardFieldsUsage)) {
    throw new Error(
      `map-drilldown-card-fields.tsx must reuse the extracted map drill-down fields props type: ${requiredMapDrilldownCardFieldsUsage}`,
    );
  }
}

if (mapDrilldownCardFieldsSource.includes("type MapDrilldownCardFieldsProps = Pick<")) {
  throw new Error("map-drilldown-card-fields.tsx must keep map drill-down fields prop typing delegated");
}

const maxMapDrilldownCardFieldsLines = 9;
if (mapDrilldownCardFieldsLines > maxMapDrilldownCardFieldsLines) {
  throw new Error(
    `map-drilldown-card-fields.tsx exceeded ${maxMapDrilldownCardFieldsLines} lines: ${mapDrilldownCardFieldsLines}`,
  );
}

for (const requiredMapDrilldownCardFieldsTypesUsage of [
  'import type { MapDrilldownCardProps } from "./map-drilldown-card.types"; export type MapDrilldownCardFieldsProps = Pick<MapDrilldownCardProps, "filterDraft" | "onFilterDraftChange">;',
]) {
  if (!mapDrilldownCardFieldsTypesSource.includes(requiredMapDrilldownCardFieldsTypesUsage)) {
    throw new Error(
      `map-drilldown-card-fields.types.ts must own map drill-down fields prop typing: ${requiredMapDrilldownCardFieldsTypesUsage}`,
    );
  }
}

const maxMapDrilldownCardFieldsTypesLines = 2;
if (mapDrilldownCardFieldsTypesLines > maxMapDrilldownCardFieldsTypesLines) {
  throw new Error(
    `map-drilldown-card-fields.types.ts exceeded ${maxMapDrilldownCardFieldsTypesLines} lines: ${mapDrilldownCardFieldsTypesLines}`,
  );
}

for (const requiredMapDrilldownCardActionsUsage of [
  'import type { MapDrilldownCardActionsProps } from "./map-drilldown-card-actions.types";',
  "}: MapDrilldownCardActionsProps) {",
  '<div className="action-row">',
  '{filteringRecords ? "Filtering..." : "Apply location filter"}',
  "Mapped only",
  "Clear location filter",
]) {
  if (!mapDrilldownCardActionsSource.includes(requiredMapDrilldownCardActionsUsage)) {
    throw new Error(
      `map-drilldown-card-actions.tsx must reuse the extracted map drill-down actions props type: ${requiredMapDrilldownCardActionsUsage}`,
    );
  }
}

if (mapDrilldownCardActionsSource.includes("type MapDrilldownCardActionsProps = Pick<")) {
  throw new Error("map-drilldown-card-actions.tsx must keep map drill-down actions prop typing delegated");
}

const maxMapDrilldownCardActionsLines = 8;
if (mapDrilldownCardActionsLines > maxMapDrilldownCardActionsLines) {
  throw new Error(
    `map-drilldown-card-actions.tsx exceeded ${maxMapDrilldownCardActionsLines} lines: ${mapDrilldownCardActionsLines}`,
  );
}

for (const requiredMapDrilldownCardActionsTypesUsage of [
  'import type { MapDrilldownCardProps } from "./map-drilldown-card.types"; export type MapDrilldownCardActionsProps = Pick<MapDrilldownCardProps, "filteringRecords" | "onApplyFilter" | "onClearFilter" | "onUseMappedOnly">;',
]) {
  if (!mapDrilldownCardActionsTypesSource.includes(requiredMapDrilldownCardActionsTypesUsage)) {
    throw new Error(
      `map-drilldown-card-actions.types.ts must own map drill-down actions prop typing: ${requiredMapDrilldownCardActionsTypesUsage}`,
    );
  }
}

const maxMapDrilldownCardActionsTypesLines = 2;
if (mapDrilldownCardActionsTypesLines > maxMapDrilldownCardActionsTypesLines) {
  throw new Error(
    `map-drilldown-card-actions.types.ts exceeded ${maxMapDrilldownCardActionsTypesLines} lines: ${mapDrilldownCardActionsTypesLines}`,
  );
}

for (const requiredMapStatusNoticesUsage of [
  'import type { MapStatusNoticesProps } from "./map-status-notices.types";',
  "}: MapStatusNoticesProps) {",
]) {
  if (!mapStatusNoticesSource.includes(requiredMapStatusNoticesUsage)) {
    throw new Error(
      `map-status-notices.tsx must reuse the extracted map status props type: ${requiredMapStatusNoticesUsage}`,
    );
  }
}

for (const forbiddenMapStatusNoticesToken of [
  'import type { LocationDraft } from "../lib/map-panel";',
  "}: {",
]) {
  if (mapStatusNoticesSource.includes(forbiddenMapStatusNoticesToken)) {
    throw new Error(
      `map-status-notices.tsx must keep map status prop typing delegated: ${forbiddenMapStatusNoticesToken}`,
    );
  }
}

for (const requiredMapStatusNoticesTypesUsage of [
  'import type { LocationDraft } from "../lib/map-panel"; export type MapStatusNoticesProps = { draftCoordinates: [number, number] | null; draftLocation?: LocationDraft | null; isEditable: boolean; loadError: string; mappedRecordCount: number; searchError: string };',
]) {
  if (!mapStatusNoticesTypesSource.includes(requiredMapStatusNoticesTypesUsage)) {
    throw new Error(
      `map-status-notices.types.ts must own map status prop typing: ${requiredMapStatusNoticesTypesUsage}`,
    );
  }
}

const maxMapStatusNoticesTypesLines = 2;
if (mapStatusNoticesTypesLines > maxMapStatusNoticesTypesLines) {
  throw new Error(
    `map-status-notices.types.ts exceeded ${maxMapStatusNoticesTypesLines} lines: ${mapStatusNoticesTypesLines}`,
  );
}

for (const requiredMapPanelHeaderUsage of [
  'import type { MapPanelHeaderProps } from "./map-panel-header.types";',
  "}: MapPanelHeaderProps) {",
]) {
  if (!mapPanelHeaderSource.includes(requiredMapPanelHeaderUsage)) {
    throw new Error(
      `map-panel-header.tsx must reuse the extracted map header props type: ${requiredMapPanelHeaderUsage}`,
    );
  }
}

if (mapPanelHeaderSource.includes("}: {")) {
  throw new Error("map-panel-header.tsx must keep map header prop typing delegated");
}

for (const requiredMapPanelHeaderTypesUsage of [
  'export type MapPanelHeaderProps = { confirmedCount: number; isEditable: boolean; mappedCount: number; needsReviewCount: number };',
]) {
  if (!mapPanelHeaderTypesSource.includes(requiredMapPanelHeaderTypesUsage)) {
    throw new Error(
      `map-panel-header.types.ts must own map header prop typing: ${requiredMapPanelHeaderTypesUsage}`,
    );
  }
}

const maxMapPanelHeaderTypesLines = 2;
if (mapPanelHeaderTypesLines > maxMapPanelHeaderTypesLines) {
  throw new Error(
    `map-panel-header.types.ts exceeded ${maxMapPanelHeaderTypesLines} lines: ${mapPanelHeaderTypesLines}`,
  );
}

for (const requiredMappedRecordsListUsage of [
  'import type { MappedRecordsListProps } from "./mapped-records-list.types";',
  "}: MappedRecordsListProps) {",
]) {
  if (!mappedRecordsListSource.includes(requiredMappedRecordsListUsage)) {
    throw new Error(
      `mapped-records-list.tsx must reuse the extracted mapped-records props type: ${requiredMappedRecordsListUsage}`,
    );
  }
}

if (mappedRecordsListSource.includes("}: {")) {
  throw new Error("mapped-records-list.tsx must keep mapped-records prop typing delegated");
}

for (const requiredMappedRecordsListTypesUsage of [
  'import type { MappedRecord } from "../lib/map-panel"; import type { MapPanelProps } from "./map-panel.types"; export type MappedRecordsListProps = { mappedRecords: MappedRecord[]; onSelectRecord: MapPanelProps["onSelectRecord"]; selectedRecordId: string | null };',
]) {
  if (!mappedRecordsListTypesSource.includes(requiredMappedRecordsListTypesUsage)) {
    throw new Error(
      `mapped-records-list.types.ts must own mapped-records prop typing: ${requiredMappedRecordsListTypesUsage}`,
    );
  }
}

const maxMappedRecordsListTypesLines = 2;
if (mappedRecordsListTypesLines > maxMappedRecordsListTypesLines) {
  throw new Error(
    `mapped-records-list.types.ts exceeded ${maxMappedRecordsListTypesLines} lines: ${mappedRecordsListTypesLines}`,
  );
}

for (const requiredMapSearchFormUsage of [
  'import type { MapSearchFormProps } from "./map-search-form.types";',
  "}: MapSearchFormProps) {",
]) {
  if (!mapSearchFormSource.includes(requiredMapSearchFormUsage)) {
    throw new Error(
      `map-search-form.tsx must reuse the extracted map search props type: ${requiredMapSearchFormUsage}`,
    );
  }
}

for (const forbiddenMapSearchFormToken of [
  'import type { FormEventHandler } from "react";',
  "}: {",
]) {
  if (mapSearchFormSource.includes(forbiddenMapSearchFormToken)) {
    throw new Error(
      `map-search-form.tsx must keep map search prop typing delegated: ${forbiddenMapSearchFormToken}`,
    );
  }
}

for (const requiredMapSearchFormTypesUsage of [
  'import type { FormEventHandler } from "react"; export type MapSearchFormProps = { onSearchQueryChange: (value: string) => void; onSubmit: FormEventHandler<HTMLFormElement>; searchQuery: string; searching: boolean };',
]) {
  if (!mapSearchFormTypesSource.includes(requiredMapSearchFormTypesUsage)) {
    throw new Error(
      `map-search-form.types.ts must own map search prop typing: ${requiredMapSearchFormTypesUsage}`,
    );
  }
}

const maxMapSearchFormTypesLines = 2;
if (mapSearchFormTypesLines > maxMapSearchFormTypesLines) {
  throw new Error(
    `map-search-form.types.ts exceeded ${maxMapSearchFormTypesLines} lines: ${mapSearchFormTypesLines}`,
  );
}

if (mapPanelControllerSource.includes("export type MapPanelControllerState = ReturnType<typeof useMapPanelController>;")) {
  throw new Error("use-map-panel-controller.ts must keep the controller result boundary delegated");
}

for (const requiredMapPanelControllerUsage of [
  'import type { UseMapPanelControllerProps } from "./use-map-panel-controller.types";',
  "}: UseMapPanelControllerProps) {",
]) {
  if (!mapPanelControllerSource.includes(requiredMapPanelControllerUsage)) {
    throw new Error(
      `use-map-panel-controller.ts must reuse the extracted map controller input type: ${requiredMapPanelControllerUsage}`,
    );
  }
}

for (const forbiddenMapPanelControllerToken of [
  "type UseMapPanelControllerProps = {",
  "AMapGeocoderInstance",
  "AMapMapInstance",
  "LocationFilterState",
  "RecordItem[]",
]) {
  if (mapPanelControllerSource.includes(forbiddenMapPanelControllerToken)) {
    throw new Error(
      `use-map-panel-controller.ts must keep map controller input typing delegated: ${forbiddenMapPanelControllerToken}`,
    );
  }
}

for (const requiredMapPanelControllerResultTypesUsage of [
  'import type { useMapPanelController } from "./use-map-panel-controller";',
  "export type MapPanelControllerState = ReturnType<typeof useMapPanelController>;",
]) {
  if (!mapPanelControllerResultTypesSource.includes(requiredMapPanelControllerResultTypesUsage)) {
    throw new Error(
      `map-panel-controller-result.types.ts must own the map controller result boundary: ${requiredMapPanelControllerResultTypesUsage}`,
    );
  }
}

const maxMapPanelControllerResultTypesLines = 3;
if (mapPanelControllerResultTypesLines > maxMapPanelControllerResultTypesLines) {
  throw new Error(
    `map-panel-controller-result.types.ts exceeded ${maxMapPanelControllerResultTypesLines} lines: ${mapPanelControllerResultTypesLines}`,
  );
}

for (const requiredMapPanelControllerTypesUsage of [
  'import { type AMapGeocoderInstance, type AMapMapInstance } from "../lib/map-panel";',
  'import type { MapPanelProps } from "./map-panel.types";',
  'export type UseMapPanelControllerProps = Omit<MapPanelProps, "onSelectRecord"> & { geocoderRef: { current: AMapGeocoderInstance | null }; mapRef: { current: AMapMapInstance | null } };',
]) {
  if (!mapPanelControllerTypesSource.includes(requiredMapPanelControllerTypesUsage)) {
    throw new Error(
      `use-map-panel-controller.types.ts must own the map controller input boundary: ${requiredMapPanelControllerTypesUsage}`,
    );
  }
}

const maxMapPanelControllerTypesLines = 3;
if (mapPanelControllerTypesLines > maxMapPanelControllerTypesLines) {
  throw new Error(
    `use-map-panel-controller.types.ts exceeded ${maxMapPanelControllerTypesLines} lines: ${mapPanelControllerTypesLines}`,
  );
}

for (const requiredMapPanelControllerActionsUsage of [
  'import type { CreateMapPanelControllerActionsInput } from "./map-panel-controller-actions.types";',
  "}: CreateMapPanelControllerActionsInput) {",
]) {
  if (!mapPanelControllerActionsSource.includes(requiredMapPanelControllerActionsUsage)) {
    throw new Error(
      `map-panel-controller-actions.ts must reuse the extracted controller-actions input type: ${requiredMapPanelControllerActionsUsage}`,
    );
  }
}

for (const forbiddenMapPanelControllerActionsToken of [
  'import type { AMapGeocoderInstance, AMapMapInstance, LocationDraft } from "../lib/map-panel";',
  'import type { LocationFilterState } from "../lib/types";',
  "type CreateMapPanelControllerActionsInput = {",
]) {
  if (mapPanelControllerActionsSource.includes(forbiddenMapPanelControllerActionsToken)) {
    throw new Error(
      `map-panel-controller-actions.ts must keep controller-actions input typing delegated: ${forbiddenMapPanelControllerActionsToken}`,
    );
  }
}

for (const requiredMapPanelControllerActionsTypesUsage of [
  'import type { AMapGeocoderInstance, AMapMapInstance, LocationDraft } from "../lib/map-panel"; import type { LocationFilterState } from "../lib/types"; export type CreateMapPanelControllerActionsInput = { draftLocation?: LocationDraft | null; filterDraft: LocationFilterState; geocoderRef: { current: AMapGeocoderInstance | null }; mapRef: { current: AMapMapInstance | null }; onApplyLocationFilter: (nextFilter: LocationFilterState) => Promise<void>; onDraftLocationChange?: (next: LocationDraft) => void; searchQuery: string; setFilterDraft: (nextFilter: LocationFilterState) => void; setSearchError: (value: string) => void; setSearching: (value: boolean) => void };',
]) {
  if (!mapPanelControllerActionsTypesSource.includes(requiredMapPanelControllerActionsTypesUsage)) {
    throw new Error(
      `map-panel-controller-actions.types.ts must own controller-actions input typing: ${requiredMapPanelControllerActionsTypesUsage}`,
    );
  }
}

const maxMapPanelControllerActionsTypesLines = 2;
if (mapPanelControllerActionsTypesLines > maxMapPanelControllerActionsTypesLines) {
  throw new Error(
    `map-panel-controller-actions.types.ts exceeded ${maxMapPanelControllerActionsTypesLines} lines: ${mapPanelControllerActionsTypesLines}`,
  );
}

for (const requiredMapPanelControllerSearchUsage of [
  'import type { SearchMapPanelLocationInput } from "./map-panel-controller-search.types";',
  "}: SearchMapPanelLocationInput) {",
]) {
  if (!mapPanelControllerSearchSource.includes(requiredMapPanelControllerSearchUsage)) {
    throw new Error(
      `map-panel-controller-search.ts must reuse the extracted controller-search input type: ${requiredMapPanelControllerSearchUsage}`,
    );
  }
}

for (const forbiddenMapPanelControllerSearchToken of [
  "type AMapGeocoderInstance",
  "type AMapMapInstance",
  "type LocationDraft",
  "}: {",
]) {
  if (mapPanelControllerSearchSource.includes(forbiddenMapPanelControllerSearchToken)) {
    throw new Error(
      `map-panel-controller-search.ts must keep controller-search input typing delegated: ${forbiddenMapPanelControllerSearchToken}`,
    );
  }
}

for (const requiredMapPanelControllerSearchTypesUsage of [
  'import type { AMapGeocoderInstance, AMapMapInstance, LocationDraft } from "../lib/map-panel"; export type SearchMapPanelLocationInput = { draftLocation?: LocationDraft | null; geocoder: AMapGeocoderInstance; keyword: string; map?: AMapMapInstance | null; onDraftLocationChange: (next: LocationDraft) => void };',
]) {
  if (!mapPanelControllerSearchTypesSource.includes(requiredMapPanelControllerSearchTypesUsage)) {
    throw new Error(
      `map-panel-controller-search.types.ts must own controller-search input typing: ${requiredMapPanelControllerSearchTypesUsage}`,
    );
  }
}

const maxMapPanelControllerSearchTypesLines = 2;
if (mapPanelControllerSearchTypesLines > maxMapPanelControllerSearchTypesLines) {
  throw new Error(
    `map-panel-controller-search.types.ts exceeded ${maxMapPanelControllerSearchTypesLines} lines: ${mapPanelControllerSearchTypesLines}`,
  );
}

for (const requiredUseMapPanelDerivedDataUsage of [
  'import type { UseMapPanelDerivedDataInput } from "./use-map-panel-derived-data.types";',
  "}: UseMapPanelDerivedDataInput) {",
]) {
  if (!useMapPanelDerivedDataSource.includes(requiredUseMapPanelDerivedDataUsage)) {
    throw new Error(
      `use-map-panel-derived-data.ts must reuse the extracted derived-data input type: ${requiredUseMapPanelDerivedDataUsage}`,
    );
  }
}

for (const forbiddenUseMapPanelDerivedDataToken of [
  "type LocationDraft",
  'import type { RecordItem } from "../lib/types";',
  "}: {",
]) {
  if (useMapPanelDerivedDataSource.includes(forbiddenUseMapPanelDerivedDataToken)) {
    throw new Error(
      `use-map-panel-derived-data.ts must keep derived-data input typing delegated: ${forbiddenUseMapPanelDerivedDataToken}`,
    );
  }
}

for (const requiredUseMapPanelDerivedDataTypesUsage of [
  'import type { LocationDraft } from "../lib/map-panel"; import type { RecordItem } from "../lib/types"; export type UseMapPanelDerivedDataInput = { draftLocation?: LocationDraft | null; records: RecordItem[] };',
]) {
  if (!useMapPanelDerivedDataTypesSource.includes(requiredUseMapPanelDerivedDataTypesUsage)) {
    throw new Error(
      `use-map-panel-derived-data.types.ts must own derived-data input typing: ${requiredUseMapPanelDerivedDataTypesUsage}`,
    );
  }
}

const maxUseMapPanelDerivedDataTypesLines = 2;
if (useMapPanelDerivedDataTypesLines > maxUseMapPanelDerivedDataTypesLines) {
  throw new Error(
    `use-map-panel-derived-data.types.ts exceeded ${maxUseMapPanelDerivedDataTypesLines} lines: ${useMapPanelDerivedDataTypesLines}`,
  );
}

for (const requiredUseMapPanelSyncUsage of [
  'import type { UseMapPanelSyncInput } from "./use-map-panel-sync.types";',
  "}: UseMapPanelSyncInput) {",
]) {
  if (!useMapPanelSyncSource.includes(requiredUseMapPanelSyncUsage)) {
    throw new Error(
      `use-map-panel-sync.ts must reuse the extracted map-sync input type: ${requiredUseMapPanelSyncUsage}`,
    );
  }
}

for (const forbiddenUseMapPanelSyncToken of [
  'import type { LocationDraft } from "../lib/map-panel";',
  'import type { LocationFilterState } from "../lib/types";',
  "}: {",
]) {
  if (useMapPanelSyncSource.includes(forbiddenUseMapPanelSyncToken)) {
    throw new Error(
      `use-map-panel-sync.ts must keep map-sync input typing delegated: ${forbiddenUseMapPanelSyncToken}`,
    );
  }
}

for (const requiredUseMapPanelSyncTypesUsage of [
  'import type { LocationDraft } from "../lib/map-panel"; import type { LocationFilterState } from "../lib/types"; export type UseMapPanelSyncInput = { draftLocation?: LocationDraft | null; locationFilter: LocationFilterState; selectedRecordId: string | null; setFilterDraft: (value: LocationFilterState) => void; setSearchQuery: (value: string) => void };',
]) {
  if (!useMapPanelSyncTypesSource.includes(requiredUseMapPanelSyncTypesUsage)) {
    throw new Error(
      `use-map-panel-sync.types.ts must own map-sync input typing: ${requiredUseMapPanelSyncTypesUsage}`,
    );
  }
}

const maxUseMapPanelSyncTypesLines = 2;
if (useMapPanelSyncTypesLines > maxUseMapPanelSyncTypesLines) {
  throw new Error(
    `use-map-panel-sync.types.ts exceeded ${maxUseMapPanelSyncTypesLines} lines: ${useMapPanelSyncTypesLines}`,
  );
}

for (const [componentName, componentSource, componentTypesSource, importLine, signatureLine, forbiddenTokens, typesLine, maxLines, actualLines] of [
  [
    "use-map-panel-amap-init",
    useMapPanelAmapInitSource,
    useMapPanelAmapInitTypesSource,
    'import type { UseMapPanelAmapInitInput } from "./use-map-panel-amap-init.types";',
    "}: UseMapPanelAmapInitInput) {",
    ["UseMapPanelAmapProps", "}: Pick<"],
    'import type { UseMapPanelAmapProps } from "./use-map-panel-amap.types"; export type UseMapPanelAmapInitInput = Pick<UseMapPanelAmapProps, "amapKey" | "containerRef" | "geocoderRef" | "mapRef" | "onDraftLocationChange" | "setLoadError">;',
    2,
    useMapPanelAmapInitTypesLines,
  ],
  [
    "use-map-panel-amap-markers",
    useMapPanelAmapMarkersSource,
    useMapPanelAmapMarkersTypesSource,
    'import type { UseMapPanelAmapMarkersInput } from "./use-map-panel-amap-markers.types";',
    "}: UseMapPanelAmapMarkersInput) {",
    ["UseMapPanelAmapProps", "}: Pick<"],
    'import type { UseMapPanelAmapProps } from "./use-map-panel-amap.types"; export type UseMapPanelAmapMarkersInput = Pick<UseMapPanelAmapProps, "draftCoordinates" | "draftLocation" | "mappedRecords" | "mapRef" | "onSelectRecord" | "selectedRecordId">;',
    2,
    useMapPanelAmapMarkersTypesLines,
  ],
]) {
  for (const requiredUsage of [importLine, signatureLine]) {
    if (!componentSource.includes(requiredUsage)) {
      throw new Error(`${componentName}.ts must reuse the extracted map-amap input type: ${requiredUsage}`);
    }
  }
  for (const forbiddenToken of forbiddenTokens) {
    if (componentSource.includes(forbiddenToken)) {
      throw new Error(`${componentName}.ts must keep map-amap input typing delegated: ${forbiddenToken}`);
    }
  }
  if (!componentTypesSource.includes(typesLine)) {
    throw new Error(`${componentName}.types.ts must own map-amap input typing: ${typesLine}`);
  }
  if (actualLines > maxLines) {
    throw new Error(`${componentName}.types.ts exceeded ${maxLines} lines: ${actualLines}`);
  }
}

for (const requiredProviderSettingsPanelHelpersUsage of [
  'import type { BuildProviderFeatureCardPropsInput } from "./provider-settings-panel-helpers.types";',
  "}: BuildProviderFeatureCardPropsInput): ProviderFeatureCardProps {",
]) {
  if (!providerSettingsPanelHelpersSource.includes(requiredProviderSettingsPanelHelpersUsage)) {
    throw new Error(
      `provider-settings-panel-helpers.ts must reuse the extracted provider helper input type: ${requiredProviderSettingsPanelHelpersUsage}`,
    );
  }
}

for (const forbiddenProviderSettingsPanelHelpersToken of [
  'import type { LocaleCode } from "../lib/locale";',
  'import type { MediaStorageProviderHealth, ProviderFeatureConfig } from "../lib/types";',
  'import type { ProviderDraft } from "./provider-settings-controller.types";',
  "}: {",
]) {
  if (providerSettingsPanelHelpersSource.includes(forbiddenProviderSettingsPanelHelpersToken)) {
    throw new Error(
      `provider-settings-panel-helpers.ts must keep provider helper input typing delegated: ${forbiddenProviderSettingsPanelHelpersToken}`,
    );
  }
}

for (const requiredProviderSettingsPanelHelpersTypesUsage of [
  'import type { LocaleCode } from "../lib/locale"; import type { MediaStorageProviderHealth, ProviderFeatureConfig } from "../lib/types"; import type { ProviderFeatureCardProps } from "./provider-feature-card.types"; import type { ProviderSettingsCopy } from "./provider-settings-copy"; import type { ProviderDraft } from "./provider-settings-controller.types"; export type BuildProviderFeatureCardPropsInput = { copy: ProviderSettingsCopy; draftItem: ProviderDraft; formatSecretStatus: ProviderFeatureCardProps["formatSecretStatus"]; highlightedAnchor?: string | null; isDirty: boolean; item: ProviderFeatureConfig; locale: LocaleCode; mediaStorageHealth?: MediaStorageProviderHealth | null; onProviderDraftChange: ProviderFeatureCardProps["onProviderDraftChange"]; onRefreshMediaStorageHealth?: (() => Promise<void>) | null; onReset: ProviderFeatureCardProps["onReset"]; onSave: ProviderFeatureCardProps["onSave"]; providerSavingCode: string; refreshingMediaStorageHealth?: boolean };',
]) {
  if (!providerSettingsPanelHelpersTypesSource.includes(requiredProviderSettingsPanelHelpersTypesUsage)) {
    throw new Error(
      `provider-settings-panel-helpers.types.ts must own provider helper input typing: ${requiredProviderSettingsPanelHelpersTypesUsage}`,
    );
  }
}

const maxProviderSettingsPanelHelpersTypesLines = 2;
if (providerSettingsPanelHelpersTypesLines > maxProviderSettingsPanelHelpersTypesLines) {
  throw new Error(
    `provider-settings-panel-helpers.types.ts exceeded ${maxProviderSettingsPanelHelpersTypesLines} lines: ${providerSettingsPanelHelpersTypesLines}`,
  );
}

for (const requiredUseProviderSettingsDraftSyncUsage of [
  'import type { UseProviderSettingsDraftSyncInput } from "./use-provider-settings-draft-sync.types";',
  "}: UseProviderSettingsDraftSyncInput) {",
]) {
  if (!useProviderSettingsDraftSyncSource.includes(requiredUseProviderSettingsDraftSyncUsage)) {
    throw new Error(
      `use-provider-settings-draft-sync.ts must reuse the extracted provider-draft-sync input type: ${requiredUseProviderSettingsDraftSyncUsage}`,
    );
  }
}

for (const forbiddenUseProviderSettingsDraftSyncToken of [
  "UseProviderSettingsControllerProps",
  "UseProviderSettingsControllerState",
  "}: Pick<",
]) {
  if (useProviderSettingsDraftSyncSource.includes(forbiddenUseProviderSettingsDraftSyncToken)) {
    throw new Error(
      `use-provider-settings-draft-sync.ts must keep provider-draft-sync input typing delegated: ${forbiddenUseProviderSettingsDraftSyncToken}`,
    );
  }
}

for (const requiredUseProviderSettingsDraftSyncTypesUsage of [
  'import type { UseProviderSettingsControllerProps, UseProviderSettingsControllerState } from "./provider-settings-controller.types"; export type UseProviderSettingsDraftSyncInput = Pick<UseProviderSettingsControllerProps, "providerConfigs"> & Pick<UseProviderSettingsControllerState, "setProviderDrafts">;',
]) {
  if (!useProviderSettingsDraftSyncTypesSource.includes(requiredUseProviderSettingsDraftSyncTypesUsage)) {
    throw new Error(
      `use-provider-settings-draft-sync.types.ts must own provider-draft-sync input typing: ${requiredUseProviderSettingsDraftSyncTypesUsage}`,
    );
  }
}

const maxUseProviderSettingsDraftSyncTypesLines = 2;
if (useProviderSettingsDraftSyncTypesLines > maxUseProviderSettingsDraftSyncTypesLines) {
  throw new Error(
    `use-provider-settings-draft-sync.types.ts exceeded ${maxUseProviderSettingsDraftSyncTypesLines} lines: ${useProviderSettingsDraftSyncTypesLines}`,
  );
}

for (const requiredWorkspaceTransferJobCardUsage of [
  'import type { WorkspaceTransferJobCardProps } from "./workspace-transfer-job-card.types";',
  "}: WorkspaceTransferJobCardProps) {",
]) {
  if (!workspaceTransferJobCardSource.includes(requiredWorkspaceTransferJobCardUsage)) {
    throw new Error(
      `workspace-transfer-job-card.tsx must reuse the extracted transfer-job props type: ${requiredWorkspaceTransferJobCardUsage}`,
    );
  }
}

for (const forbiddenWorkspaceTransferJobCardToken of [
  'import type { LocaleCode } from "../lib/locale";',
  'import type { WorkspaceTransferJob } from "../lib/types";',
  'import type { WorkspaceTransferJobsCopy } from "./workspace-transfer-jobs-section.types";',
  "}: {",
]) {
  if (workspaceTransferJobCardSource.includes(forbiddenWorkspaceTransferJobCardToken)) {
    throw new Error(
      `workspace-transfer-job-card.tsx must keep transfer-job prop typing delegated: ${forbiddenWorkspaceTransferJobCardToken}`,
    );
  }
}

for (const requiredWorkspaceTransferJobCardTypesUsage of [
  'import type { LocaleCode } from "../lib/locale"; import type { WorkspaceTransferJob } from "../lib/types"; import type { WorkspaceTransferJobsCopy } from "./workspace-transfer-jobs-section.types"; export type WorkspaceTransferJobCardProps = { copy: WorkspaceTransferJobsCopy; job: WorkspaceTransferJob; locale: LocaleCode; onDownloadTransferJob: (jobId: string) => Promise<void> };',
]) {
  if (!workspaceTransferJobCardTypesSource.includes(requiredWorkspaceTransferJobCardTypesUsage)) {
    throw new Error(
      `workspace-transfer-job-card.types.ts must own transfer-job prop typing: ${requiredWorkspaceTransferJobCardTypesUsage}`,
    );
  }
}

const maxWorkspaceTransferJobCardTypesLines = 2;
if (workspaceTransferJobCardTypesLines > maxWorkspaceTransferJobCardTypesLines) {
  throw new Error(
    `workspace-transfer-job-card.types.ts exceeded ${maxWorkspaceTransferJobCardTypesLines} lines: ${workspaceTransferJobCardTypesLines}`,
  );
}

for (const requiredWorkspaceTransferJobsListUsage of [
  'import type { WorkspaceTransferJobsListProps } from "./workspace-transfer-jobs-list.types";',
  "}: WorkspaceTransferJobsListProps) {",
]) {
  if (!workspaceTransferJobsListSource.includes(requiredWorkspaceTransferJobsListUsage)) {
    throw new Error(
      `workspace-transfer-jobs-list.tsx must reuse the extracted transfer-jobs-list props type: ${requiredWorkspaceTransferJobsListUsage}`,
    );
  }
}

for (const forbiddenWorkspaceTransferJobsListToken of [
  'import type { WorkspaceTransferJobsSectionProps } from "./workspace-transfer-jobs-section.types";',
  "}: Pick<",
]) {
  if (workspaceTransferJobsListSource.includes(forbiddenWorkspaceTransferJobsListToken)) {
    throw new Error(
      `workspace-transfer-jobs-list.tsx must keep transfer-jobs-list prop typing delegated: ${forbiddenWorkspaceTransferJobsListToken}`,
    );
  }
}

for (const requiredWorkspaceTransferJobsListTypesUsage of [
  'import type { WorkspaceTransferJobsSectionProps } from "./workspace-transfer-jobs-section.types"; export type WorkspaceTransferJobsListProps = Pick<WorkspaceTransferJobsSectionProps, "copy" | "locale" | "transferJobs" | "onDownloadTransferJob">;',
]) {
  if (!workspaceTransferJobsListTypesSource.includes(requiredWorkspaceTransferJobsListTypesUsage)) {
    throw new Error(
      `workspace-transfer-jobs-list.types.ts must keep transfer-jobs-list prop typing aligned with its delegated source: ${requiredWorkspaceTransferJobsListTypesUsage}`,
    );
  }
}

const maxWorkspaceTransferJobsListTypesLines = 2;
if (workspaceTransferJobsListTypesLines > maxWorkspaceTransferJobsListTypesLines) {
  throw new Error(
    `workspace-transfer-jobs-list.types.ts exceeded ${maxWorkspaceTransferJobsListTypesLines} lines: ${workspaceTransferJobsListTypesLines}`,
  );
}

for (const requiredWorkspaceEntryJobActionsUsage of [
  'import type { CreateWorkspaceEntryJobActionsInput } from "./workspace-entry-job-actions.types";',
  "}: CreateWorkspaceEntryJobActionsInput) {",
]) {
  if (!workspaceEntryJobActionsSource.includes(requiredWorkspaceEntryJobActionsUsage)) {
    throw new Error(
      `workspace-entry-job-actions.ts must reuse the extracted entry-job input type: ${requiredWorkspaceEntryJobActionsUsage}`,
    );
  }
}

for (const forbiddenWorkspaceEntryJobActionsToken of [
  'import type { WorkspaceEntryControllerState,',
  "}: Pick<",
]) {
  if (workspaceEntryJobActionsSource.includes(forbiddenWorkspaceEntryJobActionsToken)) {
    throw new Error(
      `workspace-entry-job-actions.ts must keep entry-job input typing delegated: ${forbiddenWorkspaceEntryJobActionsToken}`,
    );
  }
}

for (const requiredWorkspaceEntryJobActionsTypesUsage of [
  'import type { WorkspaceEntryControllerState } from "./workspace-entry-controller.types"; export type CreateWorkspaceEntryJobActionsInput = Pick<WorkspaceEntryControllerState, "setError" | "setJobsLoading" | "setTransferJobs" | "token">;',
]) {
  if (!workspaceEntryJobActionsTypesSource.includes(requiredWorkspaceEntryJobActionsTypesUsage)) {
    throw new Error(
      `workspace-entry-job-actions.types.ts must own entry-job input typing: ${requiredWorkspaceEntryJobActionsTypesUsage}`,
    );
  }
}

const maxWorkspaceEntryJobActionsTypesLines = 2;
if (workspaceEntryJobActionsTypesLines > maxWorkspaceEntryJobActionsTypesLines) {
  throw new Error(
    `workspace-entry-job-actions.types.ts exceeded ${maxWorkspaceEntryJobActionsTypesLines} lines: ${workspaceEntryJobActionsTypesLines}`,
  );
}

for (const requiredWorkspaceExportControllerUsage of [
  'import type { UseWorkspaceExportControllerProps } from "./use-workspace-export-controller.types";',
  "}: UseWorkspaceExportControllerProps) {",
]) {
  if (!workspaceExportControllerSource.includes(requiredWorkspaceExportControllerUsage)) {
    throw new Error(
      `use-workspace-export-controller.ts must reuse the extracted export controller input type: ${requiredWorkspaceExportControllerUsage}`,
    );
  }
}

if (workspaceExportControllerSource.includes("type UseWorkspaceExportControllerProps = {")) {
  throw new Error("use-workspace-export-controller.ts must keep export controller input typing delegated");
}

for (const requiredWorkspaceExportControllerTypesUsage of [
  'export type UseWorkspaceExportControllerProps = { token: string; workspaceId: string; workspaceSlug?: string | null; successMessage: string; failedMessage: string };',
]) {
  if (!workspaceExportControllerTypesSource.includes(requiredWorkspaceExportControllerTypesUsage)) {
    throw new Error(
      `use-workspace-export-controller.types.ts must own export controller input typing: ${requiredWorkspaceExportControllerTypesUsage}`,
    );
  }
}

const maxWorkspaceExportControllerTypesLines = 2;
if (workspaceExportControllerTypesLines > maxWorkspaceExportControllerTypesLines) {
  throw new Error(
    `use-workspace-export-controller.types.ts exceeded ${maxWorkspaceExportControllerTypesLines} lines: ${workspaceExportControllerTypesLines}`,
  );
}

for (const requiredWorkspaceExportCardUsage of [
  'import { WorkspaceExportContent } from "./workspace-export-content";',
  'import type { WorkspaceExportCardProps } from "./workspace-export-card.types";',
  "}: WorkspaceExportCardProps) {",
  "<WorkspaceExportContent",
]) {
  if (!workspaceExportCardSource.includes(requiredWorkspaceExportCardUsage)) {
    throw new Error(
      `workspace-export-card.tsx must reuse the extracted export card props type: ${requiredWorkspaceExportCardUsage}`,
    );
  }
}

for (const forbiddenWorkspaceExportCardToken of [
  'import type { LocaleCode } from "../lib/locale";',
  "token: string;",
  'role: "owner" | "editor";',
  'import { WorkspaceExportControls } from "./workspace-export-controls";',
  'import { WorkspaceExportSummary } from "./workspace-export-summary";',
  '<div className="eyebrow">{copy.eyebrow}</div>',
  "{copy.description}",
  "{copy.note}",
  "<WorkspaceExportControls",
  "<WorkspaceExportSummary",
]) {
  if (workspaceExportCardSource.includes(forbiddenWorkspaceExportCardToken)) {
    throw new Error(
      `workspace-export-card.tsx must keep export card prop typing delegated: ${forbiddenWorkspaceExportCardToken}`,
    );
  }
}

const maxWorkspaceExportCardLines = 30;
if (workspaceExportCardLines > maxWorkspaceExportCardLines) {
  throw new Error(
    `workspace-export-card.tsx exceeded ${maxWorkspaceExportCardLines} lines: ${workspaceExportCardLines}`,
  );
}

for (const requiredWorkspaceExportContentUsage of [
  'import { WorkspaceExportControls } from "./workspace-export-controls";',
  'import { WorkspaceExportSummary } from "./workspace-export-summary";',
  'import type { WorkspaceExportContentProps } from "./workspace-export-content.types";',
  "}: WorkspaceExportContentProps) {",
  "<WorkspaceExportSummary",
  "<WorkspaceExportControls",
]) {
  if (!workspaceExportContentSource.includes(requiredWorkspaceExportContentUsage)) {
    throw new Error(
      `workspace-export-content.tsx must own export-content composition: ${requiredWorkspaceExportContentUsage}`,
    );
  }
}

if (workspaceExportContentSource.includes("type WorkspaceExportContentProps =")) {
  throw new Error("workspace-export-content.tsx must keep export-content prop typing delegated");
}

const maxWorkspaceExportContentLines = 9;
if (workspaceExportContentLines > maxWorkspaceExportContentLines) {
  throw new Error(
    `workspace-export-content.tsx exceeded ${maxWorkspaceExportContentLines} lines: ${workspaceExportContentLines}`,
  );
}

for (const requiredWorkspaceExportContentTypesUsage of [
  'import type { WorkspaceExportControlsProps } from "./workspace-export-controls.types"; import type { WorkspaceExportSummaryProps } from "./workspace-export-summary.types"; export type WorkspaceExportContentProps = { contentProps: WorkspaceExportSummaryProps; controlsProps: WorkspaceExportControlsProps };',
]) {
  if (!workspaceExportContentTypesSource.includes(requiredWorkspaceExportContentTypesUsage)) {
    throw new Error(
      `workspace-export-content.types.ts must own export-content prop typing: ${requiredWorkspaceExportContentTypesUsage}`,
    );
  }
}

const maxWorkspaceExportContentTypesLines = 2;
if (workspaceExportContentTypesLines > maxWorkspaceExportContentTypesLines) {
  throw new Error(
    `workspace-export-content.types.ts exceeded ${maxWorkspaceExportContentTypesLines} lines: ${workspaceExportContentTypesLines}`,
  );
}

for (const requiredWorkspaceExportSummaryUsage of [
  'import type { WorkspaceExportSummaryProps } from "./workspace-export-summary.types";',
  "}: WorkspaceExportSummaryProps) {",
  '<div className="eyebrow">{copy.eyebrow}</div>',
  "{copy.description}",
  "{copy.note}",
]) {
  if (!workspaceExportSummarySource.includes(requiredWorkspaceExportSummaryUsage)) {
    throw new Error(
      `workspace-export-summary.tsx must reuse the extracted export-summary props type: ${requiredWorkspaceExportSummaryUsage}`,
    );
  }
}

if (workspaceExportSummarySource.includes("type WorkspaceExportSummaryProps = {")) {
  throw new Error("workspace-export-summary.tsx must keep export-summary prop typing delegated");
}

const maxWorkspaceExportSummaryLines = 18;
if (workspaceExportSummaryLines > maxWorkspaceExportSummaryLines) {
  throw new Error(
    `workspace-export-summary.tsx exceeded ${maxWorkspaceExportSummaryLines} lines: ${workspaceExportSummaryLines}`,
  );
}

for (const requiredWorkspaceExportSummaryTypesUsage of [
  'import { getWorkspaceExportCopy } from "./workspace-export-copy"; export type WorkspaceExportSummaryProps = { copy: ReturnType<typeof getWorkspaceExportCopy> };',
]) {
  if (!workspaceExportSummaryTypesSource.includes(requiredWorkspaceExportSummaryTypesUsage)) {
    throw new Error(
      `workspace-export-summary.types.ts must own export-summary prop typing: ${requiredWorkspaceExportSummaryTypesUsage}`,
    );
  }
}

const maxWorkspaceExportSummaryTypesLines = 2;
if (workspaceExportSummaryTypesLines > maxWorkspaceExportSummaryTypesLines) {
  throw new Error(
    `workspace-export-summary.types.ts exceeded ${maxWorkspaceExportSummaryTypesLines} lines: ${workspaceExportSummaryTypesLines}`,
  );
}

for (const requiredWorkspaceExportCardTypesUsage of [
  'import type { LocaleCode } from "../lib/locale";',
  'export type WorkspaceExportCardProps = { token: string; workspaceId: string; workspaceSlug?: string | null; locale: LocaleCode; role: "owner" | "editor" };',
]) {
  if (!workspaceExportCardTypesSource.includes(requiredWorkspaceExportCardTypesUsage)) {
    throw new Error(
      `workspace-export-card.types.ts must own export card prop typing: ${requiredWorkspaceExportCardTypesUsage}`,
    );
  }
}

const maxWorkspaceExportCardTypesLines = 2;
if (workspaceExportCardTypesLines > maxWorkspaceExportCardTypesLines) {
  throw new Error(
    `workspace-export-card.types.ts exceeded ${maxWorkspaceExportCardTypesLines} lines: ${workspaceExportCardTypesLines}`,
  );
}

for (const requiredWorkspaceExportControlsUsage of [
  'import { WorkspaceExportControlsAction } from "./workspace-export-controls-action";',
  'import { WorkspaceExportControlsStatus } from "./workspace-export-controls-status";',
  'import type { WorkspaceExportControlsProps } from "./workspace-export-controls.types";',
  "}: WorkspaceExportControlsProps) {",
  "<WorkspaceExportControlsAction",
  "<WorkspaceExportControlsStatus",
]) {
  if (!workspaceExportControlsSource.includes(requiredWorkspaceExportControlsUsage)) {
    throw new Error(
      `workspace-export-controls.tsx must reuse the extracted export-controls props type: ${requiredWorkspaceExportControlsUsage}`,
    );
  }
}

for (const forbiddenWorkspaceExportControlsToken of [
  "type WorkspaceExportControlsProps = {",
  'role === "owner" ? (',
  '<button className="button secondary" disabled={loading} type="button" onClick={onDownload}>',
  '<div className="notice error" style={{ marginTop: 16 }}>{error}</div>',
  '<div className="notice" style={{ marginTop: 16 }}>{success}</div>',
]) {
  if (workspaceExportControlsSource.includes(forbiddenWorkspaceExportControlsToken)) {
    throw new Error(
      `workspace-export-controls.tsx must keep export-controls internals delegated: ${forbiddenWorkspaceExportControlsToken}`,
    );
  }
}

const maxWorkspaceExportControlsLines = 15;
if (workspaceExportControlsLines > maxWorkspaceExportControlsLines) {
  throw new Error(
    `workspace-export-controls.tsx exceeded ${maxWorkspaceExportControlsLines} lines: ${workspaceExportControlsLines}`,
  );
}

for (const requiredWorkspaceExportControlsActionUsage of [
  'import type { WorkspaceExportControlsActionProps } from "./workspace-export-controls-action.types";',
  "}: WorkspaceExportControlsActionProps) {",
  'role === "owner" ? (',
  '<button className="button secondary" disabled={loading} type="button" onClick={onDownload}>',
  "{ownerOnlyLabel}",
]) {
  if (!workspaceExportControlsActionSource.includes(requiredWorkspaceExportControlsActionUsage)) {
    throw new Error(
      `workspace-export-controls-action.tsx must reuse the extracted export-controls action props type: ${requiredWorkspaceExportControlsActionUsage}`,
    );
  }
}

if (workspaceExportControlsActionSource.includes("type WorkspaceExportControlsActionProps = Pick<")) {
  throw new Error("workspace-export-controls-action.tsx must keep export-controls action prop typing delegated");
}

const maxWorkspaceExportControlsActionLines = 20;
if (workspaceExportControlsActionLines > maxWorkspaceExportControlsActionLines) {
  throw new Error(
    `workspace-export-controls-action.tsx exceeded ${maxWorkspaceExportControlsActionLines} lines: ${workspaceExportControlsActionLines}`,
  );
}

for (const requiredWorkspaceExportControlsActionTypesUsage of [
  'import type { WorkspaceExportControlsProps } from "./workspace-export-controls.types"; export type WorkspaceExportControlsActionProps = Pick<WorkspaceExportControlsProps, "buttonLabel" | "loading" | "ownerOnlyLabel" | "role" | "onDownload">;',
]) {
  if (!workspaceExportControlsActionTypesSource.includes(requiredWorkspaceExportControlsActionTypesUsage)) {
    throw new Error(
      `workspace-export-controls-action.types.ts must own export-controls action prop typing: ${requiredWorkspaceExportControlsActionTypesUsage}`,
    );
  }
}

const maxWorkspaceExportControlsActionTypesLines = 2;
if (workspaceExportControlsActionTypesLines > maxWorkspaceExportControlsActionTypesLines) {
  throw new Error(
    `workspace-export-controls-action.types.ts exceeded ${maxWorkspaceExportControlsActionTypesLines} lines: ${workspaceExportControlsActionTypesLines}`,
  );
}

for (const requiredWorkspaceExportControlsStatusUsage of [
  'import type { WorkspaceExportControlsStatusProps } from "./workspace-export-controls-status.types";',
  "}: WorkspaceExportControlsStatusProps) {",
  '<div className="notice error" style={{ marginTop: 16 }}>{error}</div>',
  '<div className="notice" style={{ marginTop: 16 }}>{success}</div>',
]) {
  if (!workspaceExportControlsStatusSource.includes(requiredWorkspaceExportControlsStatusUsage)) {
    throw new Error(
      `workspace-export-controls-status.tsx must reuse the extracted export-controls status props type: ${requiredWorkspaceExportControlsStatusUsage}`,
    );
  }
}

if (workspaceExportControlsStatusSource.includes("type WorkspaceExportControlsStatusProps = Pick<")) {
  throw new Error("workspace-export-controls-status.tsx must keep export-controls status prop typing delegated");
}

const maxWorkspaceExportControlsStatusLines = 14;
if (workspaceExportControlsStatusLines > maxWorkspaceExportControlsStatusLines) {
  throw new Error(
    `workspace-export-controls-status.tsx exceeded ${maxWorkspaceExportControlsStatusLines} lines: ${workspaceExportControlsStatusLines}`,
  );
}

for (const requiredWorkspaceExportControlsStatusTypesUsage of [
  'import type { WorkspaceExportControlsProps } from "./workspace-export-controls.types"; export type WorkspaceExportControlsStatusProps = Pick<WorkspaceExportControlsProps, "error" | "success">;',
]) {
  if (!workspaceExportControlsStatusTypesSource.includes(requiredWorkspaceExportControlsStatusTypesUsage)) {
    throw new Error(
      `workspace-export-controls-status.types.ts must own export-controls status prop typing: ${requiredWorkspaceExportControlsStatusTypesUsage}`,
    );
  }
}

const maxWorkspaceExportControlsStatusTypesLines = 2;
if (workspaceExportControlsStatusTypesLines > maxWorkspaceExportControlsStatusTypesLines) {
  throw new Error(
    `workspace-export-controls-status.types.ts exceeded ${maxWorkspaceExportControlsStatusTypesLines} lines: ${workspaceExportControlsStatusTypesLines}`,
  );
}

for (const requiredWorkspaceExportControlsTypesUsage of [
  'export type WorkspaceExportControlsProps = { buttonLabel: string; error: string; loading: boolean; ownerOnlyLabel: string; role: "owner" | "editor"; success: string; onDownload: () => void };',
]) {
  if (!workspaceExportControlsTypesSource.includes(requiredWorkspaceExportControlsTypesUsage)) {
    throw new Error(
      `workspace-export-controls.types.ts must own export-controls prop typing: ${requiredWorkspaceExportControlsTypesUsage}`,
    );
  }
}

const maxWorkspaceExportControlsTypesLines = 2;
if (workspaceExportControlsTypesLines > maxWorkspaceExportControlsTypesLines) {
  throw new Error(
    `workspace-export-controls.types.ts exceeded ${maxWorkspaceExportControlsTypesLines} lines: ${workspaceExportControlsTypesLines}`,
  );
}

for (const requiredWorkspaceExportJobsControllerUsage of [
  'import type { UseWorkspaceExportJobsControllerProps } from "./use-workspace-export-jobs-controller.types";',
  "}: UseWorkspaceExportJobsControllerProps) {",
]) {
  if (!workspaceExportJobsControllerSource.includes(requiredWorkspaceExportJobsControllerUsage)) {
    throw new Error(
      `use-workspace-export-jobs-controller.ts must reuse the extracted export-jobs controller input type: ${requiredWorkspaceExportJobsControllerUsage}`,
    );
  }
}

if (workspaceExportJobsControllerSource.includes("type UseWorkspaceExportJobsControllerProps = {")) {
  throw new Error(
    "use-workspace-export-jobs-controller.ts must keep export-jobs controller input typing delegated",
  );
}

for (const requiredWorkspaceExportJobsControllerTypesUsage of [
  'export type UseWorkspaceExportJobsControllerProps = { token: string; workspaceId: string; loadFailedMessage: string; createFailedMessage: string; downloadFailedMessage: string; queuedMessage: string };',
]) {
  if (!workspaceExportJobsControllerTypesSource.includes(requiredWorkspaceExportJobsControllerTypesUsage)) {
    throw new Error(
      `use-workspace-export-jobs-controller.types.ts must own export-jobs controller input typing: ${requiredWorkspaceExportJobsControllerTypesUsage}`,
    );
  }
}

const maxWorkspaceExportJobsControllerTypesLines = 2;
if (workspaceExportJobsControllerTypesLines > maxWorkspaceExportJobsControllerTypesLines) {
  throw new Error(
    `use-workspace-export-jobs-controller.types.ts exceeded ${maxWorkspaceExportJobsControllerTypesLines} lines: ${workspaceExportJobsControllerTypesLines}`,
  );
}

for (const requiredWorkspaceExportJobsCardUsage of [
  'import { WorkspaceExportJobsContent } from "./workspace-export-jobs-content";',
  'import type { WorkspaceExportJobsCardProps } from "./workspace-export-jobs-card.types";',
  "}: WorkspaceExportJobsCardProps) {",
  "<WorkspaceExportJobsContent",
]) {
  if (!workspaceExportJobsCardSource.includes(requiredWorkspaceExportJobsCardUsage)) {
    throw new Error(
      `workspace-export-jobs-card.tsx must reuse the extracted export-jobs card props type: ${requiredWorkspaceExportJobsCardUsage}`,
    );
  }
}

for (const forbiddenWorkspaceExportJobsCardToken of [
  'import type { LocaleCode } from "../lib/locale";',
  "token: string;",
  'role: "owner" | "editor";',
  'import { WorkspaceExportJobsHeader } from "./workspace-export-jobs-header";',
  'import { WorkspaceExportJobsNotices } from "./workspace-export-jobs-notices";',
  'import { WorkspaceExportJobsList } from "./workspace-export-jobs-list";',
  '<div className="action-row" style={{ justifyContent: "space-between", alignItems: "flex-start", gap: 16 }}>',
  "onClick={() => void loadJobs()}",
  "onClick={() => void handleCreateJob()}",
  'role !== "owner" ? <div className="notice" style={{ marginTop: 16 }}>{copy.ownerOnly}</div> : null',
  'error ? <div className="notice error" style={{ marginTop: 16 }}>{error}</div> : null',
  'message ? <div className="notice" style={{ marginTop: 16 }}>{message}</div> : null',
  "<WorkspaceExportJobsHeader",
  "<WorkspaceExportJobsNotices",
  "<WorkspaceExportJobsList",
]) {
  if (workspaceExportJobsCardSource.includes(forbiddenWorkspaceExportJobsCardToken)) {
    throw new Error(
      `workspace-export-jobs-card.tsx must keep export-jobs card prop typing delegated: ${forbiddenWorkspaceExportJobsCardToken}`,
    );
  }
}

const maxWorkspaceExportJobsCardLines = 55;
if (workspaceExportJobsCardLines > maxWorkspaceExportJobsCardLines) {
  throw new Error(
    `workspace-export-jobs-card.tsx exceeded ${maxWorkspaceExportJobsCardLines} lines: ${workspaceExportJobsCardLines}`,
  );
}

for (const requiredWorkspaceExportJobsContentUsage of [
  'import { WorkspaceExportJobsHeader } from "./workspace-export-jobs-header";',
  'import { WorkspaceExportJobsList } from "./workspace-export-jobs-list";',
  'import { WorkspaceExportJobsNotices } from "./workspace-export-jobs-notices";',
  'import type { WorkspaceExportJobsContentProps } from "./workspace-export-jobs-content.types";',
  "}: WorkspaceExportJobsContentProps) {",
  "<WorkspaceExportJobsHeader",
  "<WorkspaceExportJobsNotices",
  "<WorkspaceExportJobsList",
]) {
  if (!workspaceExportJobsContentSource.includes(requiredWorkspaceExportJobsContentUsage)) {
    throw new Error(
      `workspace-export-jobs-content.tsx must own export-jobs content composition: ${requiredWorkspaceExportJobsContentUsage}`,
    );
  }
}

if (workspaceExportJobsContentSource.includes("type WorkspaceExportJobsContentProps =")) {
  throw new Error("workspace-export-jobs-content.tsx must keep export-jobs content prop typing delegated");
}

const maxWorkspaceExportJobsContentLines = 10;
if (workspaceExportJobsContentLines > maxWorkspaceExportJobsContentLines) {
  throw new Error(
    `workspace-export-jobs-content.tsx exceeded ${maxWorkspaceExportJobsContentLines} lines: ${workspaceExportJobsContentLines}`,
  );
}

for (const requiredWorkspaceExportJobsContentTypesUsage of [
  'import type { WorkspaceExportJobsHeaderProps } from "./workspace-export-jobs-header.types"; import type { WorkspaceExportJobsListProps } from "./workspace-export-jobs-list.types"; import type { WorkspaceExportJobsNoticesProps } from "./workspace-export-jobs-notices.types"; export type WorkspaceExportJobsContentProps = { headerProps: WorkspaceExportJobsHeaderProps; listProps: WorkspaceExportJobsListProps; noticesProps: WorkspaceExportJobsNoticesProps };',
]) {
  if (!workspaceExportJobsContentTypesSource.includes(requiredWorkspaceExportJobsContentTypesUsage)) {
    throw new Error(
      `workspace-export-jobs-content.types.ts must own export-jobs content prop typing: ${requiredWorkspaceExportJobsContentTypesUsage}`,
    );
  }
}

const maxWorkspaceExportJobsContentTypesLines = 2;
if (workspaceExportJobsContentTypesLines > maxWorkspaceExportJobsContentTypesLines) {
  throw new Error(
    `workspace-export-jobs-content.types.ts exceeded ${maxWorkspaceExportJobsContentTypesLines} lines: ${workspaceExportJobsContentTypesLines}`,
  );
}

for (const requiredWorkspaceExportJobsCardTypesUsage of [
  'import type { LocaleCode } from "../lib/locale";',
  'export type WorkspaceExportJobsCardProps = { token: string; workspaceId: string; locale: LocaleCode; role: "owner" | "editor" };',
]) {
  if (!workspaceExportJobsCardTypesSource.includes(requiredWorkspaceExportJobsCardTypesUsage)) {
    throw new Error(
      `workspace-export-jobs-card.types.ts must own export-jobs card prop typing: ${requiredWorkspaceExportJobsCardTypesUsage}`,
    );
  }
}

const maxWorkspaceExportJobsCardTypesLines = 2;
if (workspaceExportJobsCardTypesLines > maxWorkspaceExportJobsCardTypesLines) {
  throw new Error(
    `workspace-export-jobs-card.types.ts exceeded ${maxWorkspaceExportJobsCardTypesLines} lines: ${workspaceExportJobsCardTypesLines}`,
  );
}

for (const requiredWorkspaceExportJobsListUsage of [
  'import { WorkspaceExportJobsEmptyState } from "./workspace-export-jobs-empty-state";',
  'import { WorkspaceExportJobsListItem } from "./workspace-export-jobs-list-item";',
  'import type { WorkspaceExportJobsListProps } from "./workspace-export-jobs-list.types";',
  "}: WorkspaceExportJobsListProps) {",
  "<WorkspaceExportJobsListItem",
  "<WorkspaceExportJobsEmptyState",
]) {
  if (!workspaceExportJobsListSource.includes(requiredWorkspaceExportJobsListUsage)) {
    throw new Error(
      `workspace-export-jobs-list.tsx must reuse the extracted export-jobs-list props type: ${requiredWorkspaceExportJobsListUsage}`,
    );
  }
}

for (const forbiddenWorkspaceExportJobsListToken of [
  'import type { LocaleCode } from "../lib/locale";',
  'import type { WorkspaceTransferJob } from "../lib/types";',
  "type WorkspaceExportJobsListProps = {",
  'new Date(job.created_at).toLocaleString(locale)',
  'job.status === "completed"',
  'job.error_message ? <div className="notice error" style={{ marginTop: 12 }}>{job.error_message}</div> : null',
  '<div className="notice">{emptyLabel}</div>',
]) {
  if (workspaceExportJobsListSource.includes(forbiddenWorkspaceExportJobsListToken)) {
    throw new Error(
      `workspace-export-jobs-list.tsx must keep export-jobs-list prop typing delegated: ${forbiddenWorkspaceExportJobsListToken}`,
    );
  }
}

const maxWorkspaceExportJobsListLines = 30;
if (workspaceExportJobsListLines > maxWorkspaceExportJobsListLines) {
  throw new Error(
    `workspace-export-jobs-list.tsx exceeded ${maxWorkspaceExportJobsListLines} lines: ${workspaceExportJobsListLines}`,
  );
}

for (const requiredWorkspaceExportJobsEmptyStateUsage of [
  'import type { WorkspaceExportJobsEmptyStateProps } from "./workspace-export-jobs-empty-state.types";',
  "}: WorkspaceExportJobsEmptyStateProps) {",
  '<div className="notice">{emptyLabel}</div>',
]) {
  if (!workspaceExportJobsEmptyStateSource.includes(requiredWorkspaceExportJobsEmptyStateUsage)) {
    throw new Error(
      `workspace-export-jobs-empty-state.tsx must reuse the extracted export-jobs empty-state props type: ${requiredWorkspaceExportJobsEmptyStateUsage}`,
    );
  }
}

if (workspaceExportJobsEmptyStateSource.includes("type WorkspaceExportJobsEmptyStateProps = Pick<")) {
  throw new Error("workspace-export-jobs-empty-state.tsx must keep export-jobs empty-state prop typing delegated");
}

const maxWorkspaceExportJobsEmptyStateLines = 8;
if (workspaceExportJobsEmptyStateLines > maxWorkspaceExportJobsEmptyStateLines) {
  throw new Error(
    `workspace-export-jobs-empty-state.tsx exceeded ${maxWorkspaceExportJobsEmptyStateLines} lines: ${workspaceExportJobsEmptyStateLines}`,
  );
}

for (const requiredWorkspaceExportJobsEmptyStateTypesUsage of [
  'import type { WorkspaceExportJobsListProps } from "./workspace-export-jobs-list.types"; export type WorkspaceExportJobsEmptyStateProps = Pick<WorkspaceExportJobsListProps, "emptyLabel">;',
]) {
  if (!workspaceExportJobsEmptyStateTypesSource.includes(requiredWorkspaceExportJobsEmptyStateTypesUsage)) {
    throw new Error(
      `workspace-export-jobs-empty-state.types.ts must own export-jobs empty-state prop typing: ${requiredWorkspaceExportJobsEmptyStateTypesUsage}`,
    );
  }
}

const maxWorkspaceExportJobsEmptyStateTypesLines = 2;
if (workspaceExportJobsEmptyStateTypesLines > maxWorkspaceExportJobsEmptyStateTypesLines) {
  throw new Error(
    `workspace-export-jobs-empty-state.types.ts exceeded ${maxWorkspaceExportJobsEmptyStateTypesLines} lines: ${workspaceExportJobsEmptyStateTypesLines}`,
  );
}

for (const requiredWorkspaceExportJobsHeaderUsage of [
  'import { WorkspaceExportJobsHeaderActions } from "./workspace-export-jobs-header-actions";',
  'import { WorkspaceExportJobsHeaderIntro } from "./workspace-export-jobs-header-intro";',
  'import type { WorkspaceExportJobsHeaderProps } from "./workspace-export-jobs-header.types";',
  "}: WorkspaceExportJobsHeaderProps) {",
  '<div className="action-row" style={{ justifyContent: "space-between", alignItems: "flex-start", gap: 16 }}>',
  "<WorkspaceExportJobsHeaderIntro",
  "<WorkspaceExportJobsHeaderActions",
]) {
  if (!workspaceExportJobsHeaderSource.includes(requiredWorkspaceExportJobsHeaderUsage)) {
    throw new Error(
      `workspace-export-jobs-header.tsx must reuse the extracted export-jobs header props type: ${requiredWorkspaceExportJobsHeaderUsage}`,
    );
  }
}

for (const forbiddenWorkspaceExportJobsHeaderToken of [
  "type WorkspaceExportJobsHeaderProps = {",
  '<div className="action-row">',
  "onClick={onLoadJobs}",
  "onClick={onCreateJob}",
  'role === "owner" ? (',
  '<div className="eyebrow">{copy.eyebrow}</div>',
  "{copy.title}",
  "{copy.description}",
]) {
  if (workspaceExportJobsHeaderSource.includes(forbiddenWorkspaceExportJobsHeaderToken)) {
    throw new Error(
      `workspace-export-jobs-header.tsx must keep export-jobs header internals delegated: ${forbiddenWorkspaceExportJobsHeaderToken}`,
    );
  }
}

const maxWorkspaceExportJobsHeaderLines = 20;
if (workspaceExportJobsHeaderLines > maxWorkspaceExportJobsHeaderLines) {
  throw new Error(
    `workspace-export-jobs-header.tsx exceeded ${maxWorkspaceExportJobsHeaderLines} lines: ${workspaceExportJobsHeaderLines}`,
  );
}

for (const requiredWorkspaceExportJobsHeaderIntroUsage of [
  'import type { WorkspaceExportJobsHeaderIntroProps } from "./workspace-export-jobs-header-intro.types";',
  "}: WorkspaceExportJobsHeaderIntroProps) {",
  '<div className="eyebrow">{copy.eyebrow}</div>',
  "{copy.title}",
  "{copy.description}",
]) {
  if (!workspaceExportJobsHeaderIntroSource.includes(requiredWorkspaceExportJobsHeaderIntroUsage)) {
    throw new Error(
      `workspace-export-jobs-header-intro.tsx must reuse the extracted export-jobs header-intro props type: ${requiredWorkspaceExportJobsHeaderIntroUsage}`,
    );
  }
}

if (workspaceExportJobsHeaderIntroSource.includes("type WorkspaceExportJobsHeaderIntroProps = Pick<")) {
  throw new Error(
    "workspace-export-jobs-header-intro.tsx must keep export-jobs header-intro prop typing delegated",
  );
}

const maxWorkspaceExportJobsHeaderIntroLines = 8;
if (workspaceExportJobsHeaderIntroLines > maxWorkspaceExportJobsHeaderIntroLines) {
  throw new Error(
    `workspace-export-jobs-header-intro.tsx exceeded ${maxWorkspaceExportJobsHeaderIntroLines} lines: ${workspaceExportJobsHeaderIntroLines}`,
  );
}

for (const requiredWorkspaceExportJobsHeaderIntroTypesUsage of [
  'import type { WorkspaceExportJobsHeaderProps } from "./workspace-export-jobs-header.types"; export type WorkspaceExportJobsHeaderIntroProps = Pick<WorkspaceExportJobsHeaderProps, "copy">;',
]) {
  if (!workspaceExportJobsHeaderIntroTypesSource.includes(requiredWorkspaceExportJobsHeaderIntroTypesUsage)) {
    throw new Error(
      `workspace-export-jobs-header-intro.types.ts must own export-jobs header-intro prop typing: ${requiredWorkspaceExportJobsHeaderIntroTypesUsage}`,
    );
  }
}

const maxWorkspaceExportJobsHeaderIntroTypesLines = 2;
if (workspaceExportJobsHeaderIntroTypesLines > maxWorkspaceExportJobsHeaderIntroTypesLines) {
  throw new Error(
    `workspace-export-jobs-header-intro.types.ts exceeded ${maxWorkspaceExportJobsHeaderIntroTypesLines} lines: ${workspaceExportJobsHeaderIntroTypesLines}`,
  );
}

for (const requiredWorkspaceExportJobsHeaderActionsUsage of [
  'import type { WorkspaceExportJobsHeaderActionsProps } from "./workspace-export-jobs-header-actions.types";',
  "}: WorkspaceExportJobsHeaderActionsProps) {",
  '<div className="action-row">',
  "onClick={onLoadJobs}",
  "onClick={onCreateJob}",
  'role === "owner" ? (',
]) {
  if (!workspaceExportJobsHeaderActionsSource.includes(requiredWorkspaceExportJobsHeaderActionsUsage)) {
    throw new Error(
      `workspace-export-jobs-header-actions.tsx must reuse the extracted export-jobs header-actions props type: ${requiredWorkspaceExportJobsHeaderActionsUsage}`,
    );
  }
}

if (workspaceExportJobsHeaderActionsSource.includes("type WorkspaceExportJobsHeaderActionsProps = Pick<")) {
  throw new Error("workspace-export-jobs-header-actions.tsx must keep export-jobs header-actions prop typing delegated");
}

const maxWorkspaceExportJobsHeaderActionsLines = 22;
if (workspaceExportJobsHeaderActionsLines > maxWorkspaceExportJobsHeaderActionsLines) {
  throw new Error(
    `workspace-export-jobs-header-actions.tsx exceeded ${maxWorkspaceExportJobsHeaderActionsLines} lines: ${workspaceExportJobsHeaderActionsLines}`,
  );
}

for (const requiredWorkspaceExportJobsHeaderActionsTypesUsage of [
  'import type { WorkspaceExportJobsHeaderProps } from "./workspace-export-jobs-header.types"; export type WorkspaceExportJobsHeaderActionsProps = Pick<WorkspaceExportJobsHeaderProps, "actionLoading" | "copy" | "loading" | "onCreateJob" | "onLoadJobs" | "role">;',
]) {
  if (!workspaceExportJobsHeaderActionsTypesSource.includes(requiredWorkspaceExportJobsHeaderActionsTypesUsage)) {
    throw new Error(
      `workspace-export-jobs-header-actions.types.ts must own export-jobs header-actions prop typing: ${requiredWorkspaceExportJobsHeaderActionsTypesUsage}`,
    );
  }
}

const maxWorkspaceExportJobsHeaderActionsTypesLines = 2;
if (workspaceExportJobsHeaderActionsTypesLines > maxWorkspaceExportJobsHeaderActionsTypesLines) {
  throw new Error(
    `workspace-export-jobs-header-actions.types.ts exceeded ${maxWorkspaceExportJobsHeaderActionsTypesLines} lines: ${workspaceExportJobsHeaderActionsTypesLines}`,
  );
}

for (const requiredWorkspaceExportJobsHeaderTypesUsage of [
  'import { getWorkspaceExportJobsCopy } from "./workspace-export-jobs-copy"; export type WorkspaceExportJobsHeaderProps = { actionLoading: boolean; copy: ReturnType<typeof getWorkspaceExportJobsCopy>; loading: boolean; onCreateJob: () => void; onLoadJobs: () => void; role: "owner" | "editor" };',
]) {
  if (!workspaceExportJobsHeaderTypesSource.includes(requiredWorkspaceExportJobsHeaderTypesUsage)) {
    throw new Error(
      `workspace-export-jobs-header.types.ts must own export-jobs header prop typing: ${requiredWorkspaceExportJobsHeaderTypesUsage}`,
    );
  }
}

const maxWorkspaceExportJobsHeaderTypesLines = 2;
if (workspaceExportJobsHeaderTypesLines > maxWorkspaceExportJobsHeaderTypesLines) {
  throw new Error(
    `workspace-export-jobs-header.types.ts exceeded ${maxWorkspaceExportJobsHeaderTypesLines} lines: ${workspaceExportJobsHeaderTypesLines}`,
  );
}

for (const requiredWorkspaceExportJobsNoticesUsage of [
  'import type { WorkspaceExportJobsNoticesProps } from "./workspace-export-jobs-notices.types";',
  "}: WorkspaceExportJobsNoticesProps) {",
  'role !== "owner" ? <div className="notice" style={{ marginTop: 16 }}>{ownerOnlyLabel}</div> : null',
  'error ? <div className="notice error" style={{ marginTop: 16 }}>{error}</div> : null',
  'message ? <div className="notice" style={{ marginTop: 16 }}>{message}</div> : null',
]) {
  if (!workspaceExportJobsNoticesSource.includes(requiredWorkspaceExportJobsNoticesUsage)) {
    throw new Error(
      `workspace-export-jobs-notices.tsx must reuse the extracted export-jobs notices props type: ${requiredWorkspaceExportJobsNoticesUsage}`,
    );
  }
}

if (workspaceExportJobsNoticesSource.includes("type WorkspaceExportJobsNoticesProps = Pick<")) {
  throw new Error("workspace-export-jobs-notices.tsx must keep export-jobs notices prop typing delegated");
}

const maxWorkspaceExportJobsNoticesLines = 18;
if (workspaceExportJobsNoticesLines > maxWorkspaceExportJobsNoticesLines) {
  throw new Error(
    `workspace-export-jobs-notices.tsx exceeded ${maxWorkspaceExportJobsNoticesLines} lines: ${workspaceExportJobsNoticesLines}`,
  );
}

for (const requiredWorkspaceExportJobsNoticesTypesUsage of [
  'import type { WorkspaceExportJobsCardProps } from "./workspace-export-jobs-card.types"; export type WorkspaceExportJobsNoticesProps = Pick<WorkspaceExportJobsCardProps, "role"> & { error: string; message: string; ownerOnlyLabel: string };',
]) {
  if (!workspaceExportJobsNoticesTypesSource.includes(requiredWorkspaceExportJobsNoticesTypesUsage)) {
    throw new Error(
      `workspace-export-jobs-notices.types.ts must own export-jobs notices prop typing: ${requiredWorkspaceExportJobsNoticesTypesUsage}`,
    );
  }
}

const maxWorkspaceExportJobsNoticesTypesLines = 2;
if (workspaceExportJobsNoticesTypesLines > maxWorkspaceExportJobsNoticesTypesLines) {
  throw new Error(
    `workspace-export-jobs-notices.types.ts exceeded ${maxWorkspaceExportJobsNoticesTypesLines} lines: ${workspaceExportJobsNoticesTypesLines}`,
  );
}

for (const requiredWorkspaceExportJobsListItemUsage of [
  'import { WorkspaceExportJobsListItemAction } from "./workspace-export-jobs-list-item-action";',
  'import { WorkspaceExportJobsListItemError } from "./workspace-export-jobs-list-item-error";',
  'import { WorkspaceExportJobsListItemSummary } from "./workspace-export-jobs-list-item-summary";',
  'import type { WorkspaceExportJobsListItemProps } from "./workspace-export-jobs-list-item.types";',
  "}: WorkspaceExportJobsListItemProps) {",
  "<WorkspaceExportJobsListItemAction",
  "<WorkspaceExportJobsListItemError",
  "<WorkspaceExportJobsListItemSummary",
]) {
  if (!workspaceExportJobsListItemSource.includes(requiredWorkspaceExportJobsListItemUsage)) {
    throw new Error(
      `workspace-export-jobs-list-item.tsx must own single-job export rendering: ${requiredWorkspaceExportJobsListItemUsage}`,
    );
  }
}

for (const forbiddenWorkspaceExportJobsListItemToken of [
  "type WorkspaceExportJobsListItemProps = Pick<",
  'job.status === "completed"',
  'onClick={() => void onDownload(job.id)}',
  '<button className="button secondary" disabled={actionLoading} type="button" onClick={() => void onDownload(job.id)}>',
  'job.error_message ? <div className="notice error" style={{ marginTop: 12 }}>{job.error_message}</div> : null',
  'new Date(job.created_at).toLocaleString(locale)',
  '<div className="eyebrow">{job.job_type} / {job.status}</div>',
  '<div style={{ marginTop: 8, fontWeight: 600 }}>{job.id}</div>',
]) {
  if (workspaceExportJobsListItemSource.includes(forbiddenWorkspaceExportJobsListItemToken)) {
    throw new Error(
      `workspace-export-jobs-list-item.tsx must keep list-item summary delegated: ${forbiddenWorkspaceExportJobsListItemToken}`,
    );
  }
}

const maxWorkspaceExportJobsListItemLines = 22;
if (workspaceExportJobsListItemLines > maxWorkspaceExportJobsListItemLines) {
  throw new Error(
    `workspace-export-jobs-list-item.tsx exceeded ${maxWorkspaceExportJobsListItemLines} lines: ${workspaceExportJobsListItemLines}`,
  );
}

for (const requiredWorkspaceExportJobsListItemActionUsage of [
  'import type { WorkspaceExportJobsListItemActionProps } from "./workspace-export-jobs-list-item-action.types";',
  "}: WorkspaceExportJobsListItemActionProps) {",
  'job.status === "completed"',
  'onClick={() => void onDownload(job.id)}',
  "{downloadLabel}",
]) {
  if (!workspaceExportJobsListItemActionSource.includes(requiredWorkspaceExportJobsListItemActionUsage)) {
    throw new Error(
      `workspace-export-jobs-list-item-action.tsx must reuse the extracted export-jobs item-action props type: ${requiredWorkspaceExportJobsListItemActionUsage}`,
    );
  }
}

if (workspaceExportJobsListItemActionSource.includes("type WorkspaceExportJobsListItemActionProps = Pick<")) {
  throw new Error(
    "workspace-export-jobs-list-item-action.tsx must keep export-jobs item-action prop typing delegated",
  );
}

const maxWorkspaceExportJobsListItemActionLines = 8;
if (workspaceExportJobsListItemActionLines > maxWorkspaceExportJobsListItemActionLines) {
  throw new Error(
    `workspace-export-jobs-list-item-action.tsx exceeded ${maxWorkspaceExportJobsListItemActionLines} lines: ${workspaceExportJobsListItemActionLines}`,
  );
}

for (const requiredWorkspaceExportJobsListItemActionTypesUsage of [
  'import type { WorkspaceExportJobsListItemProps } from "./workspace-export-jobs-list-item.types"; export type WorkspaceExportJobsListItemActionProps = Pick<WorkspaceExportJobsListItemProps, "actionLoading" | "downloadLabel" | "job" | "onDownload">;',
]) {
  if (!workspaceExportJobsListItemActionTypesSource.includes(requiredWorkspaceExportJobsListItemActionTypesUsage)) {
    throw new Error(
      `workspace-export-jobs-list-item-action.types.ts must own export-jobs item-action prop typing: ${requiredWorkspaceExportJobsListItemActionTypesUsage}`,
    );
  }
}

const maxWorkspaceExportJobsListItemActionTypesLines = 2;
if (workspaceExportJobsListItemActionTypesLines > maxWorkspaceExportJobsListItemActionTypesLines) {
  throw new Error(
    `workspace-export-jobs-list-item-action.types.ts exceeded ${maxWorkspaceExportJobsListItemActionTypesLines} lines: ${workspaceExportJobsListItemActionTypesLines}`,
  );
}

for (const requiredWorkspaceExportJobsListItemErrorUsage of [
  'import type { WorkspaceExportJobsListItemErrorProps } from "./workspace-export-jobs-list-item-error.types";',
  "}: WorkspaceExportJobsListItemErrorProps) {",
  'job.error_message ? <div className="notice error" style={{ marginTop: 12 }}>{job.error_message}</div> : null',
]) {
  if (!workspaceExportJobsListItemErrorSource.includes(requiredWorkspaceExportJobsListItemErrorUsage)) {
    throw new Error(
      `workspace-export-jobs-list-item-error.tsx must reuse the extracted export-jobs item-error props type: ${requiredWorkspaceExportJobsListItemErrorUsage}`,
    );
  }
}

if (workspaceExportJobsListItemErrorSource.includes("type WorkspaceExportJobsListItemErrorProps = Pick<")) {
  throw new Error(
    "workspace-export-jobs-list-item-error.tsx must keep export-jobs item-error prop typing delegated",
  );
}

const maxWorkspaceExportJobsListItemErrorLines = 8;
if (workspaceExportJobsListItemErrorLines > maxWorkspaceExportJobsListItemErrorLines) {
  throw new Error(
    `workspace-export-jobs-list-item-error.tsx exceeded ${maxWorkspaceExportJobsListItemErrorLines} lines: ${workspaceExportJobsListItemErrorLines}`,
  );
}

for (const requiredWorkspaceExportJobsListItemErrorTypesUsage of [
  'import type { WorkspaceExportJobsListItemProps } from "./workspace-export-jobs-list-item.types"; export type WorkspaceExportJobsListItemErrorProps = Pick<WorkspaceExportJobsListItemProps, "job">;',
]) {
  if (!workspaceExportJobsListItemErrorTypesSource.includes(requiredWorkspaceExportJobsListItemErrorTypesUsage)) {
    throw new Error(
      `workspace-export-jobs-list-item-error.types.ts must own export-jobs item-error prop typing: ${requiredWorkspaceExportJobsListItemErrorTypesUsage}`,
    );
  }
}

const maxWorkspaceExportJobsListItemErrorTypesLines = 2;
if (workspaceExportJobsListItemErrorTypesLines > maxWorkspaceExportJobsListItemErrorTypesLines) {
  throw new Error(
    `workspace-export-jobs-list-item-error.types.ts exceeded ${maxWorkspaceExportJobsListItemErrorTypesLines} lines: ${workspaceExportJobsListItemErrorTypesLines}`,
  );
}

for (const requiredWorkspaceExportJobsListItemSummaryUsage of [
  'import type { WorkspaceExportJobsListItemSummaryProps } from "./workspace-export-jobs-list-item-summary.types";',
  "}: WorkspaceExportJobsListItemSummaryProps) {",
  '<div className="eyebrow">{job.job_type} / {job.status}</div>',
  '<div style={{ marginTop: 8, fontWeight: 600 }}>{job.id}</div>',
  'new Date(job.created_at).toLocaleString(locale)',
]) {
  if (!workspaceExportJobsListItemSummarySource.includes(requiredWorkspaceExportJobsListItemSummaryUsage)) {
    throw new Error(
      `workspace-export-jobs-list-item-summary.tsx must reuse the extracted export-jobs summary props type: ${requiredWorkspaceExportJobsListItemSummaryUsage}`,
    );
  }
}

if (workspaceExportJobsListItemSummarySource.includes("type WorkspaceExportJobsListItemSummaryProps = Pick<")) {
  throw new Error("workspace-export-jobs-list-item-summary.tsx must keep export-jobs summary prop typing delegated");
}

const maxWorkspaceExportJobsListItemSummaryLines = 14;
if (workspaceExportJobsListItemSummaryLines > maxWorkspaceExportJobsListItemSummaryLines) {
  throw new Error(
    `workspace-export-jobs-list-item-summary.tsx exceeded ${maxWorkspaceExportJobsListItemSummaryLines} lines: ${workspaceExportJobsListItemSummaryLines}`,
  );
}

for (const requiredWorkspaceExportJobsListItemSummaryTypesUsage of [
  'import type { WorkspaceExportJobsListItemProps } from "./workspace-export-jobs-list-item.types"; export type WorkspaceExportJobsListItemSummaryProps = Pick<WorkspaceExportJobsListItemProps, "job" | "locale">;',
]) {
  if (!workspaceExportJobsListItemSummaryTypesSource.includes(requiredWorkspaceExportJobsListItemSummaryTypesUsage)) {
    throw new Error(
      `workspace-export-jobs-list-item-summary.types.ts must own export-jobs summary prop typing: ${requiredWorkspaceExportJobsListItemSummaryTypesUsage}`,
    );
  }
}

const maxWorkspaceExportJobsListItemSummaryTypesLines = 2;
if (workspaceExportJobsListItemSummaryTypesLines > maxWorkspaceExportJobsListItemSummaryTypesLines) {
  throw new Error(
    `workspace-export-jobs-list-item-summary.types.ts exceeded ${maxWorkspaceExportJobsListItemSummaryTypesLines} lines: ${workspaceExportJobsListItemSummaryTypesLines}`,
  );
}

for (const requiredWorkspaceExportJobsListItemTypesUsage of [
  'import type { WorkspaceExportJobsListProps } from "./workspace-export-jobs-list.types"; export type WorkspaceExportJobsListItemProps = Pick<WorkspaceExportJobsListProps, "actionLoading" | "downloadLabel" | "locale" | "onDownload"> & { job: WorkspaceExportJobsListProps["jobs"][number] };',
]) {
  if (!workspaceExportJobsListItemTypesSource.includes(requiredWorkspaceExportJobsListItemTypesUsage)) {
    throw new Error(
      `workspace-export-jobs-list-item.types.ts must own export-jobs list-item prop typing: ${requiredWorkspaceExportJobsListItemTypesUsage}`,
    );
  }
}

const maxWorkspaceExportJobsListItemTypesLines = 2;
if (workspaceExportJobsListItemTypesLines > maxWorkspaceExportJobsListItemTypesLines) {
  throw new Error(
    `workspace-export-jobs-list-item.types.ts exceeded ${maxWorkspaceExportJobsListItemTypesLines} lines: ${workspaceExportJobsListItemTypesLines}`,
  );
}

for (const requiredWorkspaceExportJobsListTypesUsage of [
  'import type { LocaleCode } from "../lib/locale"; import type { WorkspaceTransferJob } from "../lib/types"; export type WorkspaceExportJobsListProps = { actionLoading: boolean; downloadLabel: string; emptyLabel: string; jobs: WorkspaceTransferJob[]; locale: LocaleCode; onDownload: (jobId: string) => Promise<void> };',
]) {
  if (!workspaceExportJobsListTypesSource.includes(requiredWorkspaceExportJobsListTypesUsage)) {
    throw new Error(
      `workspace-export-jobs-list.types.ts must own export-jobs-list prop typing: ${requiredWorkspaceExportJobsListTypesUsage}`,
    );
  }
}

const maxWorkspaceExportJobsListTypesLines = 2;
if (workspaceExportJobsListTypesLines > maxWorkspaceExportJobsListTypesLines) {
  throw new Error(
    `workspace-export-jobs-list.types.ts exceeded ${maxWorkspaceExportJobsListTypesLines} lines: ${workspaceExportJobsListTypesLines}`,
  );
}

for (const requiredWorkspaceSettingsHeaderUsage of [
  'import { WorkspaceSettingsHeaderActions } from "./workspace-settings-header-actions";',
  'import { WorkspaceSettingsHeaderIntro } from "./workspace-settings-header-intro";',
  'import type { WorkspaceSettingsHeaderProps } from "./workspace-settings-header.types";',
  "}: WorkspaceSettingsHeaderProps) {",
  "<WorkspaceSettingsHeaderIntro",
  "<WorkspaceSettingsHeaderActions",
]) {
  if (!workspaceSettingsHeaderSource.includes(requiredWorkspaceSettingsHeaderUsage)) {
    throw new Error(
      `workspace-settings-header.tsx must reuse the extracted settings header props type: ${requiredWorkspaceSettingsHeaderUsage}`,
    );
  }
}

for (const forbiddenWorkspaceSettingsHeaderToken of [
  'import type { LocaleCode } from "../lib/locale";',
  'import type { Workspace } from "../lib/types";',
  "type WorkspaceSettingsHeaderProps = {",
  'import Link from "next/link";',
  'import { LanguageSwitcher } from "./language-switcher";',
  '<div className="hero-actions">',
  "<LanguageSwitcher",
  '<Link className="button secondary"',
  '<div className="eyebrow">{copy.eyebrow}</div>',
  '<h1 className="title">{copy.title}</h1>',
  "{copy.subtitle}",
  '<div className="muted" style={{ marginTop: 8 }}>{username}{workspace ? ` / ${workspace.role}` : ""}</div>',
]) {
  if (workspaceSettingsHeaderSource.includes(forbiddenWorkspaceSettingsHeaderToken)) {
    throw new Error(
      `workspace-settings-header.tsx must keep settings header prop typing delegated: ${forbiddenWorkspaceSettingsHeaderToken}`,
    );
  }
}

const maxWorkspaceSettingsHeaderLines = 25;
if (workspaceSettingsHeaderLines > maxWorkspaceSettingsHeaderLines) {
  throw new Error(
    `workspace-settings-header.tsx exceeded ${maxWorkspaceSettingsHeaderLines} lines: ${workspaceSettingsHeaderLines}`,
  );
}

for (const requiredWorkspaceSettingsHeaderTypesUsage of [
  'import type { LocaleCode } from "../lib/locale"; import type { Workspace } from "../lib/types"; import type { WorkspaceSettingsCopy } from "./workspace-settings-copy";',
  "export type WorkspaceSettingsHeaderProps = { copy: WorkspaceSettingsCopy; locale: LocaleCode; onLocaleChange: (locale: LocaleCode) => void; username?: string | null; workspace?: Workspace | null; workspaceId: string };",
]) {
  if (!workspaceSettingsHeaderTypesSource.includes(requiredWorkspaceSettingsHeaderTypesUsage)) {
    throw new Error(
      `workspace-settings-header.types.ts must own settings header prop typing: ${requiredWorkspaceSettingsHeaderTypesUsage}`,
    );
  }
}

const maxWorkspaceSettingsHeaderTypesLines = 2;
if (workspaceSettingsHeaderTypesLines > maxWorkspaceSettingsHeaderTypesLines) {
  throw new Error(
    `workspace-settings-header.types.ts exceeded ${maxWorkspaceSettingsHeaderTypesLines} lines: ${workspaceSettingsHeaderTypesLines}`,
  );
}

for (const requiredWorkspaceSettingsHeaderIntroUsage of [
  'import type { WorkspaceSettingsHeaderIntroProps } from "./workspace-settings-header-intro.types";',
  "}: WorkspaceSettingsHeaderIntroProps) {",
  '<div className="eyebrow">{copy.eyebrow}</div>',
  '<h1 className="title">{copy.title}</h1>',
  "{copy.subtitle}",
  "{username}",
]) {
  if (!workspaceSettingsHeaderIntroSource.includes(requiredWorkspaceSettingsHeaderIntroUsage)) {
    throw new Error(
      `workspace-settings-header-intro.tsx must reuse the extracted settings header-intro props type: ${requiredWorkspaceSettingsHeaderIntroUsage}`,
    );
  }
}

if (workspaceSettingsHeaderIntroSource.includes("type WorkspaceSettingsHeaderIntroProps = Pick<")) {
  throw new Error(
    "workspace-settings-header-intro.tsx must keep settings header-intro prop typing delegated",
  );
}

const maxWorkspaceSettingsHeaderIntroLines = 8;
if (workspaceSettingsHeaderIntroLines > maxWorkspaceSettingsHeaderIntroLines) {
  throw new Error(
    `workspace-settings-header-intro.tsx exceeded ${maxWorkspaceSettingsHeaderIntroLines} lines: ${workspaceSettingsHeaderIntroLines}`,
  );
}

for (const requiredWorkspaceSettingsHeaderIntroTypesUsage of [
  'import type { WorkspaceSettingsHeaderProps } from "./workspace-settings-header.types"; export type WorkspaceSettingsHeaderIntroProps = Pick<WorkspaceSettingsHeaderProps, "copy" | "username" | "workspace">;',
]) {
  if (!workspaceSettingsHeaderIntroTypesSource.includes(requiredWorkspaceSettingsHeaderIntroTypesUsage)) {
    throw new Error(
      `workspace-settings-header-intro.types.ts must own settings header-intro prop typing: ${requiredWorkspaceSettingsHeaderIntroTypesUsage}`,
    );
  }
}

const maxWorkspaceSettingsHeaderIntroTypesLines = 2;
if (workspaceSettingsHeaderIntroTypesLines > maxWorkspaceSettingsHeaderIntroTypesLines) {
  throw new Error(
    `workspace-settings-header-intro.types.ts exceeded ${maxWorkspaceSettingsHeaderIntroTypesLines} lines: ${workspaceSettingsHeaderIntroTypesLines}`,
  );
}

for (const requiredWorkspaceSettingsHeaderActionsUsage of [
  'import Link from "next/link";',
  'import { LanguageSwitcher } from "./language-switcher";',
  'import type { WorkspaceSettingsHeaderActionsProps } from "./workspace-settings-header-actions.types";',
  "}: WorkspaceSettingsHeaderActionsProps) {",
  '<div className="hero-actions">',
  "<LanguageSwitcher",
  '<Link className="button secondary"',
]) {
  if (!workspaceSettingsHeaderActionsSource.includes(requiredWorkspaceSettingsHeaderActionsUsage)) {
    throw new Error(
      `workspace-settings-header-actions.tsx must reuse the extracted header-actions props type: ${requiredWorkspaceSettingsHeaderActionsUsage}`,
    );
  }
}

if (workspaceSettingsHeaderActionsSource.includes("type WorkspaceSettingsHeaderActionsProps = Pick<")) {
  throw new Error("workspace-settings-header-actions.tsx must keep header-actions prop typing delegated");
}

const maxWorkspaceSettingsHeaderActionsLines = 20;
if (workspaceSettingsHeaderActionsLines > maxWorkspaceSettingsHeaderActionsLines) {
  throw new Error(
    `workspace-settings-header-actions.tsx exceeded ${maxWorkspaceSettingsHeaderActionsLines} lines: ${workspaceSettingsHeaderActionsLines}`,
  );
}

for (const requiredWorkspaceSettingsHeaderActionsTypesUsage of [
  'import type { WorkspaceSettingsHeaderProps } from "./workspace-settings-header.types"; export type WorkspaceSettingsHeaderActionsProps = Pick<WorkspaceSettingsHeaderProps, "copy" | "locale" | "onLocaleChange" | "workspaceId">;',
]) {
  if (!workspaceSettingsHeaderActionsTypesSource.includes(requiredWorkspaceSettingsHeaderActionsTypesUsage)) {
    throw new Error(
      `workspace-settings-header-actions.types.ts must own header-actions prop typing: ${requiredWorkspaceSettingsHeaderActionsTypesUsage}`,
    );
  }
}

const maxWorkspaceSettingsHeaderActionsTypesLines = 2;
if (workspaceSettingsHeaderActionsTypesLines > maxWorkspaceSettingsHeaderActionsTypesLines) {
  throw new Error(
    `workspace-settings-header-actions.types.ts exceeded ${maxWorkspaceSettingsHeaderActionsTypesLines} lines: ${workspaceSettingsHeaderActionsTypesLines}`,
  );
}

for (const requiredWorkspaceSettingsOverviewCardUsage of [
  'import { WorkspaceSettingsOverviewSummary } from "./workspace-settings-overview-summary";',
  'import { WorkspaceSettingsOverviewDetails } from "./workspace-settings-overview-details";',
  'import type { WorkspaceSettingsOverviewCardProps } from "./workspace-settings-overview-card.types";',
  "}: WorkspaceSettingsOverviewCardProps) {",
  "<WorkspaceSettingsOverviewSummary",
  "<WorkspaceSettingsOverviewDetails",
]) {
  if (!workspaceSettingsOverviewCardSource.includes(requiredWorkspaceSettingsOverviewCardUsage)) {
    throw new Error(
      `workspace-settings-overview-card.tsx must reuse the extracted settings overview props type: ${requiredWorkspaceSettingsOverviewCardUsage}`,
    );
  }
}

for (const forbiddenWorkspaceSettingsOverviewCardToken of [
  'import type { KnowledgeStats } from "../lib/types";',
  "type WorkspaceSettingsOverviewCardProps = {",
  '<div className="eyebrow">{copy.apiTitle}</div>',
  "{copy.apiDescription}",
  'process.env.NEXT_PUBLIC_API_BASE_URL',
  'process.env.NEXT_PUBLIC_AMAP_KEY',
  'knowledgeStats ? `${knowledgeStats.chunk_count} chunks / ${knowledgeStats.record_count} records` : "-"',
  '<div className="detail-grid" style={{ marginTop: 16 }}>',
]) {
  if (workspaceSettingsOverviewCardSource.includes(forbiddenWorkspaceSettingsOverviewCardToken)) {
    throw new Error(
      `workspace-settings-overview-card.tsx must keep settings overview prop typing delegated: ${forbiddenWorkspaceSettingsOverviewCardToken}`,
    );
  }
}

const maxWorkspaceSettingsOverviewCardLines = 20;
if (workspaceSettingsOverviewCardLines > maxWorkspaceSettingsOverviewCardLines) {
  throw new Error(
    `workspace-settings-overview-card.tsx exceeded ${maxWorkspaceSettingsOverviewCardLines} lines: ${workspaceSettingsOverviewCardLines}`,
  );
}

for (const requiredWorkspaceSettingsOverviewSummaryUsage of [
  'import type { WorkspaceSettingsOverviewSummaryProps } from "./workspace-settings-overview-summary.types";',
  "}: WorkspaceSettingsOverviewSummaryProps) {",
  '<div className="eyebrow">{copy.apiTitle}</div>',
  "{copy.apiDescription}",
]) {
  if (!workspaceSettingsOverviewSummarySource.includes(requiredWorkspaceSettingsOverviewSummaryUsage)) {
    throw new Error(
      `workspace-settings-overview-summary.tsx must reuse the extracted overview-summary props type: ${requiredWorkspaceSettingsOverviewSummaryUsage}`,
    );
  }
}

if (workspaceSettingsOverviewSummarySource.includes("type WorkspaceSettingsOverviewSummaryProps = Pick<")) {
  throw new Error("workspace-settings-overview-summary.tsx must keep overview-summary prop typing delegated");
}

const maxWorkspaceSettingsOverviewSummaryLines = 12;
if (workspaceSettingsOverviewSummaryLines > maxWorkspaceSettingsOverviewSummaryLines) {
  throw new Error(
    `workspace-settings-overview-summary.tsx exceeded ${maxWorkspaceSettingsOverviewSummaryLines} lines: ${workspaceSettingsOverviewSummaryLines}`,
  );
}

for (const requiredWorkspaceSettingsOverviewSummaryTypesUsage of [
  'import type { WorkspaceSettingsOverviewCardProps } from "./workspace-settings-overview-card.types"; export type WorkspaceSettingsOverviewSummaryProps = Pick<WorkspaceSettingsOverviewCardProps, "copy">;',
]) {
  if (!workspaceSettingsOverviewSummaryTypesSource.includes(requiredWorkspaceSettingsOverviewSummaryTypesUsage)) {
    throw new Error(
      `workspace-settings-overview-summary.types.ts must own overview-summary prop typing: ${requiredWorkspaceSettingsOverviewSummaryTypesUsage}`,
    );
  }
}

const maxWorkspaceSettingsOverviewSummaryTypesLines = 2;
if (workspaceSettingsOverviewSummaryTypesLines > maxWorkspaceSettingsOverviewSummaryTypesLines) {
  throw new Error(
    `workspace-settings-overview-summary.types.ts exceeded ${maxWorkspaceSettingsOverviewSummaryTypesLines} lines: ${workspaceSettingsOverviewSummaryTypesLines}`,
  );
}

for (const requiredWorkspaceSettingsOverviewDetailsUsage of [
  'import type { WorkspaceSettingsOverviewDetailsProps } from "./workspace-settings-overview-details.types";',
  "}: WorkspaceSettingsOverviewDetailsProps) {",
  '<div className="detail-grid" style={{ marginTop: 16 }}>',
  'process.env.NEXT_PUBLIC_API_BASE_URL',
  'process.env.NEXT_PUBLIC_AMAP_KEY',
  'knowledgeStats ? `${knowledgeStats.chunk_count} chunks / ${knowledgeStats.record_count} records` : "-"',
]) {
  if (!workspaceSettingsOverviewDetailsSource.includes(requiredWorkspaceSettingsOverviewDetailsUsage)) {
    throw new Error(
      `workspace-settings-overview-details.tsx must reuse the extracted overview-details props type: ${requiredWorkspaceSettingsOverviewDetailsUsage}`,
    );
  }
}

if (workspaceSettingsOverviewDetailsSource.includes("type WorkspaceSettingsOverviewDetailsProps = Pick<")) {
  throw new Error("workspace-settings-overview-details.tsx must keep overview-details prop typing delegated");
}

const maxWorkspaceSettingsOverviewDetailsLines = 30;
if (workspaceSettingsOverviewDetailsLines > maxWorkspaceSettingsOverviewDetailsLines) {
  throw new Error(
    `workspace-settings-overview-details.tsx exceeded ${maxWorkspaceSettingsOverviewDetailsLines} lines: ${workspaceSettingsOverviewDetailsLines}`,
  );
}

for (const requiredWorkspaceSettingsOverviewDetailsTypesUsage of [
  'import type { WorkspaceSettingsOverviewCardProps } from "./workspace-settings-overview-card.types"; export type WorkspaceSettingsOverviewDetailsProps = Pick<WorkspaceSettingsOverviewCardProps, "copy" | "knowledgeStats">;',
]) {
  if (!workspaceSettingsOverviewDetailsTypesSource.includes(requiredWorkspaceSettingsOverviewDetailsTypesUsage)) {
    throw new Error(
      `workspace-settings-overview-details.types.ts must own overview-details prop typing: ${requiredWorkspaceSettingsOverviewDetailsTypesUsage}`,
    );
  }
}

const maxWorkspaceSettingsOverviewDetailsTypesLines = 2;
if (workspaceSettingsOverviewDetailsTypesLines > maxWorkspaceSettingsOverviewDetailsTypesLines) {
  throw new Error(
    `workspace-settings-overview-details.types.ts exceeded ${maxWorkspaceSettingsOverviewDetailsTypesLines} lines: ${workspaceSettingsOverviewDetailsTypesLines}`,
  );
}

for (const requiredWorkspaceSettingsOverviewCardTypesUsage of [
  'import type { KnowledgeStats } from "../lib/types"; import type { WorkspaceSettingsCopy } from "./workspace-settings-copy";',
  "export type WorkspaceSettingsOverviewCardProps = { copy: WorkspaceSettingsCopy; knowledgeStats: KnowledgeStats | null };",
]) {
  if (!workspaceSettingsOverviewCardTypesSource.includes(requiredWorkspaceSettingsOverviewCardTypesUsage)) {
    throw new Error(
      `workspace-settings-overview-card.types.ts must own settings overview prop typing: ${requiredWorkspaceSettingsOverviewCardTypesUsage}`,
    );
  }
}

const maxWorkspaceSettingsOverviewCardTypesLines = 2;
if (workspaceSettingsOverviewCardTypesLines > maxWorkspaceSettingsOverviewCardTypesLines) {
  throw new Error(
    `workspace-settings-overview-card.types.ts exceeded ${maxWorkspaceSettingsOverviewCardTypesLines} lines: ${workspaceSettingsOverviewCardTypesLines}`,
  );
}

for (const requiredWorkspaceMembersSectionUsage of [
  'import { WorkspaceMembersSectionIntro } from "./workspace-members-section-intro";',
  'import { WorkspaceMembersSectionList } from "./workspace-members-section-list";',
  'import type { WorkspaceMembersSectionProps } from "./workspace-members-section.types";',
  "}: WorkspaceMembersSectionProps) {",
  "<WorkspaceMembersSectionIntro",
  "<WorkspaceMembersSectionList",
]) {
  if (!workspaceMembersSectionSource.includes(requiredWorkspaceMembersSectionUsage)) {
    throw new Error(
      `workspace-members-section.tsx must reuse the extracted members-section props type: ${requiredWorkspaceMembersSectionUsage}`,
    );
  }
}

for (const forbiddenWorkspaceMembersSectionToken of [
  'import type { LocaleCode } from "../lib/locale";',
  'import type { WorkspaceMemberItem } from "../lib/types";',
  'import type { WorkspaceSettingsCopy } from "./workspace-settings-copy";',
  'import { WorkspaceMembersSectionItem } from "./workspace-members-section-item";',
  '<article className="message"',
  '<div className="eyebrow">{copy.membersTitle}</div>',
  '{workspaceRole === "owner" ? copy.membersDescription : copy.membersReadOnly}',
  '<div className="record-list compact-list" style={{ marginTop: 16 }}>',
  'new Date(member.created_at).toLocaleString(locale)',
  "const isProtected = member.role === \"owner\" || member.user_id === userId;",
  "copy: WorkspaceSettingsCopy;",
  "members: WorkspaceMemberItem[];",
  "type WorkspaceMembersSectionProps = {",
]) {
  if (workspaceMembersSectionSource.includes(forbiddenWorkspaceMembersSectionToken)) {
    throw new Error(
      `workspace-members-section.tsx must keep members-section prop typing delegated: ${forbiddenWorkspaceMembersSectionToken}`,
    );
  }
}

const maxWorkspaceMembersSectionLines = 20;
if (workspaceMembersSectionLines > maxWorkspaceMembersSectionLines) {
  throw new Error(
    `workspace-members-section.tsx exceeded ${maxWorkspaceMembersSectionLines} lines: ${workspaceMembersSectionLines}`,
  );
}

for (const requiredWorkspaceMembersSectionIntroUsage of [
  'import type { WorkspaceMembersSectionIntroProps } from "./workspace-members-section-intro.types";',
  "}: WorkspaceMembersSectionIntroProps) {",
  '<div className="eyebrow">{copy.membersTitle}</div>',
  '{workspaceRole === "owner" ? copy.membersDescription : copy.membersReadOnly}',
]) {
  if (!workspaceMembersSectionIntroSource.includes(requiredWorkspaceMembersSectionIntroUsage)) {
    throw new Error(
      `workspace-members-section-intro.tsx must own members intro rendering: ${requiredWorkspaceMembersSectionIntroUsage}`,
    );
  }
}

if (workspaceMembersSectionIntroSource.includes("type WorkspaceMembersSectionIntroProps = Pick<")) {
  throw new Error("workspace-members-section-intro.tsx must keep members-intro prop typing delegated");
}

const maxWorkspaceMembersSectionIntroLines = 14;
if (workspaceMembersSectionIntroLines > maxWorkspaceMembersSectionIntroLines) {
  throw new Error(
    `workspace-members-section-intro.tsx exceeded ${maxWorkspaceMembersSectionIntroLines} lines: ${workspaceMembersSectionIntroLines}`,
  );
}

for (const requiredWorkspaceMembersSectionIntroTypesUsage of [
  'import type { WorkspaceMembersSectionProps } from "./workspace-members-section.types"; export type WorkspaceMembersSectionIntroProps = Pick<WorkspaceMembersSectionProps, "copy" | "workspaceRole">;',
]) {
  if (!workspaceMembersSectionIntroTypesSource.includes(requiredWorkspaceMembersSectionIntroTypesUsage)) {
    throw new Error(
      `workspace-members-section-intro.types.ts must own members-intro prop typing: ${requiredWorkspaceMembersSectionIntroTypesUsage}`,
    );
  }
}

const maxWorkspaceMembersSectionIntroTypesLines = 2;
if (workspaceMembersSectionIntroTypesLines > maxWorkspaceMembersSectionIntroTypesLines) {
  throw new Error(
    `workspace-members-section-intro.types.ts exceeded ${maxWorkspaceMembersSectionIntroTypesLines} lines: ${workspaceMembersSectionIntroTypesLines}`,
  );
}

for (const requiredWorkspaceMembersSectionListUsage of [
  'import { WorkspaceMembersSectionItem } from "./workspace-members-section-item";',
  'import type { WorkspaceMembersSectionListProps } from "./workspace-members-section-list.types";',
  "}: WorkspaceMembersSectionListProps) {",
  '<div className="record-list compact-list" style={{ marginTop: 16 }}>',
  "<WorkspaceMembersSectionItem",
  '<div className="notice">{copy.membersEmpty}</div>',
]) {
  if (!workspaceMembersSectionListSource.includes(requiredWorkspaceMembersSectionListUsage)) {
    throw new Error(
      `workspace-members-section-list.tsx must own members list rendering: ${requiredWorkspaceMembersSectionListUsage}`,
    );
  }
}

if (workspaceMembersSectionListSource.includes("type WorkspaceMembersSectionListProps = Pick<")) {
  throw new Error("workspace-members-section-list.tsx must keep members-list prop typing delegated");
}

const maxWorkspaceMembersSectionListLines = 24;
if (workspaceMembersSectionListLines > maxWorkspaceMembersSectionListLines) {
  throw new Error(
    `workspace-members-section-list.tsx exceeded ${maxWorkspaceMembersSectionListLines} lines: ${workspaceMembersSectionListLines}`,
  );
}

for (const requiredWorkspaceMembersSectionListTypesUsage of [
  'import type { WorkspaceMembersSectionProps } from "./workspace-members-section.types"; export type WorkspaceMembersSectionListProps = Pick<WorkspaceMembersSectionProps, "copy" | "locale" | "members" | "onRemoveMember" | "onUpdateMemberRole" | "removingMemberId" | "savingMemberId" | "userId" | "workspaceRole">;',
]) {
  if (!workspaceMembersSectionListTypesSource.includes(requiredWorkspaceMembersSectionListTypesUsage)) {
    throw new Error(
      `workspace-members-section-list.types.ts must own members-list prop typing: ${requiredWorkspaceMembersSectionListTypesUsage}`,
    );
  }
}

const maxWorkspaceMembersSectionListTypesLines = 2;
if (workspaceMembersSectionListTypesLines > maxWorkspaceMembersSectionListTypesLines) {
  throw new Error(
    `workspace-members-section-list.types.ts exceeded ${maxWorkspaceMembersSectionListTypesLines} lines: ${workspaceMembersSectionListTypesLines}`,
  );
}

for (const requiredWorkspaceMembersSectionTypesUsage of [
  'import type { WorkspaceSettingsManagedSectionsProps } from "./workspace-settings-managed-sections.types";',
  'export type WorkspaceMembersSectionProps = Pick<WorkspaceSettingsManagedSectionsProps, "copy" | "locale" | "members" | "onRemoveMember" | "onUpdateMemberRole" | "removingMemberId" | "savingMemberId" | "userId"> & { workspaceRole: "owner" | "editor" };',
]) {
  if (!workspaceMembersSectionTypesSource.includes(requiredWorkspaceMembersSectionTypesUsage)) {
    throw new Error(
      `workspace-members-section.types.ts must own members-section prop typing: ${requiredWorkspaceMembersSectionTypesUsage}`,
    );
  }
}

const maxWorkspaceMembersSectionTypesLines = 2;
if (workspaceMembersSectionTypesLines > maxWorkspaceMembersSectionTypesLines) {
  throw new Error(
    `workspace-members-section.types.ts exceeded ${maxWorkspaceMembersSectionTypesLines} lines: ${workspaceMembersSectionTypesLines}`,
  );
}

for (const requiredWorkspaceMembersSectionItemUsage of [
  'import { WorkspaceMembersSectionItemControls } from "./workspace-members-section-item-controls";',
  'import { WorkspaceMembersSectionItemSummary } from "./workspace-members-section-item-summary";',
  'import type { WorkspaceMembersSectionItemProps } from "./workspace-members-section-item.types";',
  "}: WorkspaceMembersSectionItemProps) {",
  "const isProtected = member.role === \"owner\" || member.user_id === userId;",
  '<article className="message">',
  "<WorkspaceMembersSectionItemSummary",
  "<WorkspaceMembersSectionItemControls",
]) {
  if (!workspaceMembersSectionItemSource.includes(requiredWorkspaceMembersSectionItemUsage)) {
    throw new Error(
      `workspace-members-section-item.tsx must own member-item rendering: ${requiredWorkspaceMembersSectionItemUsage}`,
    );
  }
}

for (const forbiddenWorkspaceMembersSectionItemToken of [
  'import type { WorkspaceSettingsManagedSectionsProps } from "./workspace-settings-managed-sections.types";',
  "type WorkspaceMembersSectionItemProps = Pick<",
  'new Date(member.created_at).toLocaleString(locale)',
  '<div style={{ minWidth: 220 }}>',
  '<select',
  '<button',
]) {
  if (workspaceMembersSectionItemSource.includes(forbiddenWorkspaceMembersSectionItemToken)) {
    throw new Error(
      `workspace-members-section-item.tsx must keep member-item prop typing delegated: ${forbiddenWorkspaceMembersSectionItemToken}`,
    );
  }
}

const maxWorkspaceMembersSectionItemLines = 30;
if (workspaceMembersSectionItemLines > maxWorkspaceMembersSectionItemLines) {
  throw new Error(
    `workspace-members-section-item.tsx exceeded ${maxWorkspaceMembersSectionItemLines} lines: ${workspaceMembersSectionItemLines}`,
  );
}

for (const requiredWorkspaceMembersSectionItemSummaryUsage of [
  'import type { WorkspaceMembersSectionItemSummaryProps } from "./workspace-members-section-item-summary.types";',
  "}: WorkspaceMembersSectionItemSummaryProps) {",
  '<div className="eyebrow">{member.username}</div>',
  "member.display_name || member.email || member.user_id",
  'new Date(member.created_at).toLocaleString(locale)',
]) {
  if (!workspaceMembersSectionItemSummarySource.includes(requiredWorkspaceMembersSectionItemSummaryUsage)) {
    throw new Error(
      `workspace-members-section-item-summary.tsx must own member summary rendering: ${requiredWorkspaceMembersSectionItemSummaryUsage}`,
    );
  }
}

if (workspaceMembersSectionItemSummarySource.includes("type WorkspaceMembersSectionItemSummaryProps = Pick<")) {
  throw new Error(
    "workspace-members-section-item-summary.tsx must keep member-summary prop typing delegated",
  );
}

const maxWorkspaceMembersSectionItemSummaryLines = 18;
if (workspaceMembersSectionItemSummaryLines > maxWorkspaceMembersSectionItemSummaryLines) {
  throw new Error(
    `workspace-members-section-item-summary.tsx exceeded ${maxWorkspaceMembersSectionItemSummaryLines} lines: ${workspaceMembersSectionItemSummaryLines}`,
  );
}

for (const requiredWorkspaceMembersSectionItemSummaryTypesUsage of [
  'import type { WorkspaceMembersSectionItemProps } from "./workspace-members-section-item.types"; export type WorkspaceMembersSectionItemSummaryProps = Pick<WorkspaceMembersSectionItemProps, "copy" | "locale" | "member">;',
]) {
  if (!workspaceMembersSectionItemSummaryTypesSource.includes(requiredWorkspaceMembersSectionItemSummaryTypesUsage)) {
    throw new Error(
      `workspace-members-section-item-summary.types.ts must own member-summary prop typing: ${requiredWorkspaceMembersSectionItemSummaryTypesUsage}`,
    );
  }
}

const maxWorkspaceMembersSectionItemSummaryTypesLines = 2;
if (workspaceMembersSectionItemSummaryTypesLines > maxWorkspaceMembersSectionItemSummaryTypesLines) {
  throw new Error(
    `workspace-members-section-item-summary.types.ts exceeded ${maxWorkspaceMembersSectionItemSummaryTypesLines} lines: ${workspaceMembersSectionItemSummaryTypesLines}`,
  );
}

for (const requiredWorkspaceMembersSectionItemControlsUsage of [
  'import type { WorkspaceMembersSectionItemControlsProps } from "./workspace-members-section-item-controls.types";',
  "}: WorkspaceMembersSectionItemControlsProps) {",
  '<div style={{ minWidth: 220 }}>',
  '<select',
  '<button',
  "{isProtected ? <div className=\"muted\">{copy.ownerProtected}</div> : null}",
]) {
  if (!workspaceMembersSectionItemControlsSource.includes(requiredWorkspaceMembersSectionItemControlsUsage)) {
    throw new Error(
      `workspace-members-section-item-controls.tsx must own member-controls rendering: ${requiredWorkspaceMembersSectionItemControlsUsage}`,
    );
  }
}

if (workspaceMembersSectionItemControlsSource.includes("type WorkspaceMembersSectionItemControlsProps = Pick<")) {
  throw new Error(
    "workspace-members-section-item-controls.tsx must keep member-controls prop typing delegated",
  );
}

const maxWorkspaceMembersSectionItemControlsLines = 42;
if (workspaceMembersSectionItemControlsLines > maxWorkspaceMembersSectionItemControlsLines) {
  throw new Error(
    `workspace-members-section-item-controls.tsx exceeded ${maxWorkspaceMembersSectionItemControlsLines} lines: ${workspaceMembersSectionItemControlsLines}`,
  );
}

for (const requiredWorkspaceMembersSectionItemControlsTypesUsage of [
  'import type { WorkspaceMembersSectionItemProps } from "./workspace-members-section-item.types"; export type WorkspaceMembersSectionItemControlsProps = Pick<WorkspaceMembersSectionItemProps, "copy" | "member" | "onRemoveMember" | "onUpdateMemberRole" | "removingMemberId" | "savingMemberId" | "workspaceRole"> & { isProtected: boolean };',
]) {
  if (!workspaceMembersSectionItemControlsTypesSource.includes(requiredWorkspaceMembersSectionItemControlsTypesUsage)) {
    throw new Error(
      `workspace-members-section-item-controls.types.ts must own member-controls prop typing: ${requiredWorkspaceMembersSectionItemControlsTypesUsage}`,
    );
  }
}

const maxWorkspaceMembersSectionItemControlsTypesLines = 2;
if (workspaceMembersSectionItemControlsTypesLines > maxWorkspaceMembersSectionItemControlsTypesLines) {
  throw new Error(
    `workspace-members-section-item-controls.types.ts exceeded ${maxWorkspaceMembersSectionItemControlsTypesLines} lines: ${workspaceMembersSectionItemControlsTypesLines}`,
  );
}

for (const requiredWorkspaceMembersSectionItemTypesUsage of [
  'import type { WorkspaceMembersSectionProps } from "./workspace-members-section.types"; export type WorkspaceMembersSectionItemProps = Pick<WorkspaceMembersSectionProps, "copy" | "locale" | "onRemoveMember" | "onUpdateMemberRole" | "removingMemberId" | "savingMemberId" | "userId" | "workspaceRole"> & { member: WorkspaceMembersSectionProps["members"][number] };',
]) {
  if (!workspaceMembersSectionItemTypesSource.includes(requiredWorkspaceMembersSectionItemTypesUsage)) {
    throw new Error(
      `workspace-members-section-item.types.ts must own member-item prop typing: ${requiredWorkspaceMembersSectionItemTypesUsage}`,
    );
  }
}

const maxWorkspaceMembersSectionItemTypesLines = 2;
if (workspaceMembersSectionItemTypesLines > maxWorkspaceMembersSectionItemTypesLines) {
  throw new Error(
    `workspace-members-section-item.types.ts exceeded ${maxWorkspaceMembersSectionItemTypesLines} lines: ${workspaceMembersSectionItemTypesLines}`,
  );
}

for (const requiredWorkspaceMediaRetentionCardUsage of [
  'import { WorkspaceMediaRetentionContent } from "./workspace-media-retention-content";',
  'import type { WorkspaceMediaRetentionCardProps } from "./workspace-media-retention-card.types";',
  "}: WorkspaceMediaRetentionCardProps) {",
  "<WorkspaceMediaRetentionContent",
]) {
  if (!workspaceMediaRetentionCardSource.includes(requiredWorkspaceMediaRetentionCardUsage)) {
    throw new Error(
      `workspace-media-retention-card.tsx must reuse the extracted retention-card props type: ${requiredWorkspaceMediaRetentionCardUsage}`,
    );
  }
}

for (const forbiddenWorkspaceMediaRetentionCardToken of [
  'import type { LocaleCode } from "../lib/locale";',
  "token: string;",
  'role: "owner" | "editor";',
  'import { MediaRetentionItemCard } from "./media-retention-item-card";',
  "<WorkspaceMediaRetentionHeader",
  "<WorkspaceMediaRetentionNotices",
  "<WorkspaceMediaRetentionSummary",
  "<WorkspaceMediaRetentionActions",
  "<WorkspaceMediaRetentionLists",
  "remoteReferenceLabel",
]) {
  if (workspaceMediaRetentionCardSource.includes(forbiddenWorkspaceMediaRetentionCardToken)) {
    throw new Error(
      `workspace-media-retention-card.tsx must keep retention-card prop typing delegated: ${forbiddenWorkspaceMediaRetentionCardToken}`,
    );
  }
}

const maxWorkspaceMediaRetentionCardLines = 75;
if (workspaceMediaRetentionCardLines > maxWorkspaceMediaRetentionCardLines) {
  throw new Error(
    `workspace-media-retention-card.tsx exceeded ${maxWorkspaceMediaRetentionCardLines} lines: ${workspaceMediaRetentionCardLines}`,
  );
}

for (const requiredWorkspaceMediaRetentionContentUsage of [
  'import { WorkspaceMediaRetentionActions } from "./workspace-media-retention-actions";',
  'import { WorkspaceMediaRetentionHeader } from "./workspace-media-retention-header";',
  'import { WorkspaceMediaRetentionLists } from "./workspace-media-retention-lists";',
  'import { WorkspaceMediaRetentionNotices } from "./workspace-media-retention-notices";',
  'import { WorkspaceMediaRetentionSummary } from "./workspace-media-retention-summary";',
  'import type { WorkspaceMediaRetentionContentProps } from "./workspace-media-retention-content.types";',
  "}: WorkspaceMediaRetentionContentProps) {",
  "<WorkspaceMediaRetentionHeader",
  "<WorkspaceMediaRetentionNotices",
  "<WorkspaceMediaRetentionSummary",
  "<WorkspaceMediaRetentionActions",
  "<WorkspaceMediaRetentionLists",
]) {
  if (!workspaceMediaRetentionContentSource.includes(requiredWorkspaceMediaRetentionContentUsage)) {
    throw new Error(
      `workspace-media-retention-content.tsx must own retention-content composition: ${requiredWorkspaceMediaRetentionContentUsage}`,
    );
  }
}

if (workspaceMediaRetentionContentSource.includes("type WorkspaceMediaRetentionContentProps =")) {
  throw new Error("workspace-media-retention-content.tsx must keep retention-content prop typing delegated");
}

const maxWorkspaceMediaRetentionContentLines = 18;
if (workspaceMediaRetentionContentLines > maxWorkspaceMediaRetentionContentLines) {
  throw new Error(
    `workspace-media-retention-content.tsx exceeded ${maxWorkspaceMediaRetentionContentLines} lines: ${workspaceMediaRetentionContentLines}`,
  );
}

for (const requiredWorkspaceMediaRetentionContentTypesUsage of [
  'import type { WorkspaceMediaRetentionActionsProps } from "./workspace-media-retention-actions.types"; import type { WorkspaceMediaRetentionHeaderProps } from "./workspace-media-retention-header.types"; import type { WorkspaceMediaRetentionListsProps } from "./workspace-media-retention-lists.types"; import type { WorkspaceMediaRetentionNoticesProps } from "./workspace-media-retention-notices.types"; import type { WorkspaceMediaRetentionSummaryProps } from "./workspace-media-retention-summary.types"; export type WorkspaceMediaRetentionContentProps = { actionProps: WorkspaceMediaRetentionActionsProps; headerProps: WorkspaceMediaRetentionHeaderProps; listsProps: WorkspaceMediaRetentionListsProps; noticesProps: WorkspaceMediaRetentionNoticesProps; summaryProps: WorkspaceMediaRetentionSummaryProps };',
]) {
  if (!workspaceMediaRetentionContentTypesSource.includes(requiredWorkspaceMediaRetentionContentTypesUsage)) {
    throw new Error(
      `workspace-media-retention-content.types.ts must own retention-content prop typing: ${requiredWorkspaceMediaRetentionContentTypesUsage}`,
    );
  }
}

const maxWorkspaceMediaRetentionContentTypesLines = 2;
if (workspaceMediaRetentionContentTypesLines > maxWorkspaceMediaRetentionContentTypesLines) {
  throw new Error(
    `workspace-media-retention-content.types.ts exceeded ${maxWorkspaceMediaRetentionContentTypesLines} lines: ${workspaceMediaRetentionContentTypesLines}`,
  );
}

for (const requiredWorkspaceMediaRetentionCardTypesUsage of [
  'import type { LocaleCode } from "../lib/locale"; export type WorkspaceMediaRetentionCardProps = { token: string; workspaceId: string; locale: LocaleCode; role: "owner" | "editor" };',
]) {
  if (!workspaceMediaRetentionCardTypesSource.includes(requiredWorkspaceMediaRetentionCardTypesUsage)) {
    throw new Error(
      `workspace-media-retention-card.types.ts must own retention-card prop typing: ${requiredWorkspaceMediaRetentionCardTypesUsage}`,
    );
  }
}

const maxWorkspaceMediaRetentionCardTypesLines = 2;
if (workspaceMediaRetentionCardTypesLines > maxWorkspaceMediaRetentionCardTypesLines) {
  throw new Error(
    `workspace-media-retention-card.types.ts exceeded ${maxWorkspaceMediaRetentionCardTypesLines} lines: ${workspaceMediaRetentionCardTypesLines}`,
  );
}

for (const requiredWorkspaceMediaRetentionActionsUsage of [
  'import { WorkspaceMediaRetentionActionsContent } from "./workspace-media-retention-actions-content";',
  'import type { WorkspaceMediaRetentionActionsProps } from "./workspace-media-retention-actions.types";',
  '{ ownerActions, ...props }: WorkspaceMediaRetentionActionsProps) {',
  "<WorkspaceMediaRetentionActionsContent",
  "}: WorkspaceMediaRetentionActionsProps) {",
]) {
  if (!workspaceMediaRetentionActionsSource.includes(requiredWorkspaceMediaRetentionActionsUsage)) {
    throw new Error(
      `workspace-media-retention-actions.tsx must reuse the extracted retention-actions props type: ${requiredWorkspaceMediaRetentionActionsUsage}`,
    );
  }
}

for (const forbiddenWorkspaceMediaRetentionActionsToken of [
  "export type WorkspaceMediaRetentionActionsProps = {",
  'import { WorkspaceMediaRetentionEditorNotice } from "./workspace-media-retention-editor-notice";',
  'import { WorkspaceMediaRetentionOwnerActions } from "./workspace-media-retention-owner-actions";',
  'role === "owner" ? (',
  "<WorkspaceMediaRetentionOwnerActions",
  "<WorkspaceMediaRetentionEditorNotice",
]) {
  if (workspaceMediaRetentionActionsSource.includes(forbiddenWorkspaceMediaRetentionActionsToken)) {
    throw new Error(
      `workspace-media-retention-actions.tsx must keep retention-action leaf rendering delegated: ${forbiddenWorkspaceMediaRetentionActionsToken}`,
    );
  }
}

const maxWorkspaceMediaRetentionActionsLines = 12;
if (workspaceMediaRetentionActionsLines > maxWorkspaceMediaRetentionActionsLines) {
  throw new Error(
    `workspace-media-retention-actions.tsx exceeded ${maxWorkspaceMediaRetentionActionsLines} lines: ${workspaceMediaRetentionActionsLines}`,
  );
}

for (const requiredWorkspaceMediaRetentionActionsContentUsage of [
  'import { WorkspaceMediaRetentionEditorNotice } from "./workspace-media-retention-editor-notice";',
  'import { WorkspaceMediaRetentionOwnerActions } from "./workspace-media-retention-owner-actions";',
  'import type { WorkspaceMediaRetentionActionsContentProps } from "./workspace-media-retention-actions-content.types";',
  "{ role, ...props }: WorkspaceMediaRetentionActionsContentProps) {",
  '<WorkspaceMediaRetentionOwnerActions',
  '<WorkspaceMediaRetentionEditorNotice editorReadOnly={props.editorReadOnly} />',
]) {
  if (!workspaceMediaRetentionActionsContentSource.includes(requiredWorkspaceMediaRetentionActionsContentUsage)) {
    throw new Error(
      `workspace-media-retention-actions-content.tsx must own retention-action branch rendering: ${requiredWorkspaceMediaRetentionActionsContentUsage}`,
    );
  }
}

if (workspaceMediaRetentionActionsContentSource.includes("type WorkspaceMediaRetentionActionsContentProps =")) {
  throw new Error(
    "workspace-media-retention-actions-content.tsx must keep retention-action content prop typing delegated",
  );
}

const maxWorkspaceMediaRetentionActionsContentLines = 8;
if (workspaceMediaRetentionActionsContentLines > maxWorkspaceMediaRetentionActionsContentLines) {
  throw new Error(
    `workspace-media-retention-actions-content.tsx exceeded ${maxWorkspaceMediaRetentionActionsContentLines} lines: ${workspaceMediaRetentionActionsContentLines}`,
  );
}

for (const requiredWorkspaceMediaRetentionActionsContentTypesUsage of [
  'import type { WorkspaceMediaRetentionActionsProps } from "./workspace-media-retention-actions.types"; export type WorkspaceMediaRetentionActionsContentProps = Omit<WorkspaceMediaRetentionActionsProps, "ownerActions">;',
]) {
  if (!workspaceMediaRetentionActionsContentTypesSource.includes(requiredWorkspaceMediaRetentionActionsContentTypesUsage)) {
    throw new Error(
      `workspace-media-retention-actions-content.types.ts must own retention-action content prop typing: ${requiredWorkspaceMediaRetentionActionsContentTypesUsage}`,
    );
  }
}

const maxWorkspaceMediaRetentionActionsContentTypesLines = 2;
if (workspaceMediaRetentionActionsContentTypesLines > maxWorkspaceMediaRetentionActionsContentTypesLines) {
  throw new Error(
    `workspace-media-retention-actions-content.types.ts exceeded ${maxWorkspaceMediaRetentionActionsContentTypesLines} lines: ${workspaceMediaRetentionActionsContentTypesLines}`,
  );
}

for (const requiredWorkspaceMediaRetentionActionsTypesUsage of [
  'export type WorkspaceMediaRetentionActionsProps = { actionLoading: boolean; archiveConfirmSelected: string; archiveSelectedLabel: string; canDeleteOrphans: boolean; canSelectAll: boolean; clearSelectionLabel: string; deleteOrphansLabel: string; deleteSelectedLabel: string; editorReadOnly: string; onArchive: (confirmMessage: string) => Promise<void>; onCleanupOrphans: () => Promise<void>; onCleanupSelected: () => Promise<void>; onClearSelection: () => void; onSelectAllCandidates: () => void; ownerActions: string; processingLabel: string; role: "owner" | "editor"; selectedCount: number; selectedSummary: string; selectAllLabel: string };',
]) {
  if (!workspaceMediaRetentionActionsTypesSource.includes(requiredWorkspaceMediaRetentionActionsTypesUsage)) {
    throw new Error(
      `workspace-media-retention-actions.types.ts must own retention-actions prop typing: ${requiredWorkspaceMediaRetentionActionsTypesUsage}`,
    );
  }
}

const maxWorkspaceMediaRetentionActionsTypesLines = 2;
if (workspaceMediaRetentionActionsTypesLines > maxWorkspaceMediaRetentionActionsTypesLines) {
  throw new Error(
    `workspace-media-retention-actions.types.ts exceeded ${maxWorkspaceMediaRetentionActionsTypesLines} lines: ${workspaceMediaRetentionActionsTypesLines}`,
  );
}

for (const requiredWorkspaceMediaRetentionOwnerActionsUsage of [
  'import { WorkspaceMediaRetentionOwnerActionsButtons } from "./workspace-media-retention-owner-actions-buttons";',
  'import { WorkspaceMediaRetentionOwnerActionsSummary } from "./workspace-media-retention-owner-actions-summary";',
  'import type { WorkspaceMediaRetentionOwnerActionsProps } from "./workspace-media-retention-owner-actions.types";',
  "}: WorkspaceMediaRetentionOwnerActionsProps) {",
  "<WorkspaceMediaRetentionOwnerActionsSummary",
  "<WorkspaceMediaRetentionOwnerActionsButtons",
]) {
  if (!workspaceMediaRetentionOwnerActionsSource.includes(requiredWorkspaceMediaRetentionOwnerActionsUsage)) {
    throw new Error(
      `workspace-media-retention-owner-actions.tsx must reuse the extracted owner-actions props type: ${requiredWorkspaceMediaRetentionOwnerActionsUsage}`,
    );
  }
}

if (workspaceMediaRetentionOwnerActionsSource.includes("type WorkspaceMediaRetentionOwnerActionsProps =")) {
  throw new Error(
    "workspace-media-retention-owner-actions.tsx must keep owner-actions prop typing delegated",
  );
}

for (const forbiddenWorkspaceMediaRetentionOwnerActionsToken of [
  'className="action-row"',
  "{selectedSummary}: {selectedCount}",
  "onClick={() => void onArchive(archiveConfirmSelected)}",
  "onClick={() => void onCleanupSelected()}",
  "onClick={() => void onCleanupOrphans()}",
]) {
  if (workspaceMediaRetentionOwnerActionsSource.includes(forbiddenWorkspaceMediaRetentionOwnerActionsToken)) {
    throw new Error(
      `workspace-media-retention-owner-actions.tsx must keep owner-action internals delegated: ${forbiddenWorkspaceMediaRetentionOwnerActionsToken}`,
    );
  }
}

const maxWorkspaceMediaRetentionOwnerActionsLines = 20;
if (workspaceMediaRetentionOwnerActionsLines > maxWorkspaceMediaRetentionOwnerActionsLines) {
  throw new Error(
    `workspace-media-retention-owner-actions.tsx exceeded ${maxWorkspaceMediaRetentionOwnerActionsLines} lines: ${workspaceMediaRetentionOwnerActionsLines}`,
  );
}

for (const requiredWorkspaceMediaRetentionOwnerActionsSummaryUsage of [
  'import type { WorkspaceMediaRetentionOwnerActionsSummaryProps } from "./workspace-media-retention-owner-actions-summary.types";',
  "}: WorkspaceMediaRetentionOwnerActionsSummaryProps) {",
  "{selectedSummary}: {selectedCount}",
]) {
  if (!workspaceMediaRetentionOwnerActionsSummarySource.includes(requiredWorkspaceMediaRetentionOwnerActionsSummaryUsage)) {
    throw new Error(
      `workspace-media-retention-owner-actions-summary.tsx must own owner-action summary rendering: ${requiredWorkspaceMediaRetentionOwnerActionsSummaryUsage}`,
    );
  }
}

if (workspaceMediaRetentionOwnerActionsSummarySource.includes("type WorkspaceMediaRetentionOwnerActionsSummaryProps =")) {
  throw new Error(
    "workspace-media-retention-owner-actions-summary.tsx must keep owner-action summary prop typing delegated",
  );
}

const maxWorkspaceMediaRetentionOwnerActionsSummaryLines = 10;
if (workspaceMediaRetentionOwnerActionsSummaryLines > maxWorkspaceMediaRetentionOwnerActionsSummaryLines) {
  throw new Error(
    `workspace-media-retention-owner-actions-summary.tsx exceeded ${maxWorkspaceMediaRetentionOwnerActionsSummaryLines} lines: ${workspaceMediaRetentionOwnerActionsSummaryLines}`,
  );
}

for (const requiredWorkspaceMediaRetentionOwnerActionsSummaryTypesUsage of [
  'import type { WorkspaceMediaRetentionOwnerActionsProps } from "./workspace-media-retention-owner-actions.types"; export type WorkspaceMediaRetentionOwnerActionsSummaryProps = Pick<WorkspaceMediaRetentionOwnerActionsProps, "selectedCount" | "selectedSummary">;',
]) {
  if (!workspaceMediaRetentionOwnerActionsSummaryTypesSource.includes(requiredWorkspaceMediaRetentionOwnerActionsSummaryTypesUsage)) {
    throw new Error(
      `workspace-media-retention-owner-actions-summary.types.ts must own owner-action summary prop typing: ${requiredWorkspaceMediaRetentionOwnerActionsSummaryTypesUsage}`,
    );
  }
}

const maxWorkspaceMediaRetentionOwnerActionsSummaryTypesLines = 2;
if (workspaceMediaRetentionOwnerActionsSummaryTypesLines > maxWorkspaceMediaRetentionOwnerActionsSummaryTypesLines) {
  throw new Error(
    `workspace-media-retention-owner-actions-summary.types.ts exceeded ${maxWorkspaceMediaRetentionOwnerActionsSummaryTypesLines} lines: ${workspaceMediaRetentionOwnerActionsSummaryTypesLines}`,
  );
}

for (const requiredWorkspaceMediaRetentionOwnerActionsButtonsUsage of [
  'import type { WorkspaceMediaRetentionOwnerActionsButtonsProps } from "./workspace-media-retention-owner-actions-buttons.types";',
  "}: WorkspaceMediaRetentionOwnerActionsButtonsProps) {",
  'className="action-row"',
  "onClick={() => void onArchive(archiveConfirmSelected)}",
  "onClick={() => void onCleanupSelected()}",
  "onClick={() => void onCleanupOrphans()}",
]) {
  if (!workspaceMediaRetentionOwnerActionsButtonsSource.includes(requiredWorkspaceMediaRetentionOwnerActionsButtonsUsage)) {
    throw new Error(
      `workspace-media-retention-owner-actions-buttons.tsx must own owner-action button rendering: ${requiredWorkspaceMediaRetentionOwnerActionsButtonsUsage}`,
    );
  }
}

if (workspaceMediaRetentionOwnerActionsButtonsSource.includes("type WorkspaceMediaRetentionOwnerActionsButtonsProps =")) {
  throw new Error(
    "workspace-media-retention-owner-actions-buttons.tsx must keep owner-action buttons prop typing delegated",
  );
}

const maxWorkspaceMediaRetentionOwnerActionsButtonsLines = 30;
if (workspaceMediaRetentionOwnerActionsButtonsLines > maxWorkspaceMediaRetentionOwnerActionsButtonsLines) {
  throw new Error(
    `workspace-media-retention-owner-actions-buttons.tsx exceeded ${maxWorkspaceMediaRetentionOwnerActionsButtonsLines} lines: ${workspaceMediaRetentionOwnerActionsButtonsLines}`,
  );
}

for (const requiredWorkspaceMediaRetentionOwnerActionsButtonsTypesUsage of [
  'import type { WorkspaceMediaRetentionOwnerActionsProps } from "./workspace-media-retention-owner-actions.types"; export type WorkspaceMediaRetentionOwnerActionsButtonsProps = Pick<WorkspaceMediaRetentionOwnerActionsProps, "actionLoading" | "archiveConfirmSelected" | "archiveSelectedLabel" | "canDeleteOrphans" | "canSelectAll" | "clearSelectionLabel" | "deleteOrphansLabel" | "deleteSelectedLabel" | "onArchive" | "onCleanupOrphans" | "onCleanupSelected" | "onClearSelection" | "onSelectAllCandidates" | "processingLabel" | "selectedCount" | "selectAllLabel">;',
]) {
  if (!workspaceMediaRetentionOwnerActionsButtonsTypesSource.includes(requiredWorkspaceMediaRetentionOwnerActionsButtonsTypesUsage)) {
    throw new Error(
      `workspace-media-retention-owner-actions-buttons.types.ts must own owner-action buttons prop typing: ${requiredWorkspaceMediaRetentionOwnerActionsButtonsTypesUsage}`,
    );
  }
}

const maxWorkspaceMediaRetentionOwnerActionsButtonsTypesLines = 2;
if (workspaceMediaRetentionOwnerActionsButtonsTypesLines > maxWorkspaceMediaRetentionOwnerActionsButtonsTypesLines) {
  throw new Error(
    `workspace-media-retention-owner-actions-buttons.types.ts exceeded ${maxWorkspaceMediaRetentionOwnerActionsButtonsTypesLines} lines: ${workspaceMediaRetentionOwnerActionsButtonsTypesLines}`,
  );
}

for (const requiredWorkspaceMediaRetentionOwnerActionsTypesUsage of [
  'import type { WorkspaceMediaRetentionActionsProps } from "./workspace-media-retention-actions.types"; export type WorkspaceMediaRetentionOwnerActionsProps = Pick<WorkspaceMediaRetentionActionsProps, "actionLoading" | "archiveConfirmSelected" | "archiveSelectedLabel" | "canDeleteOrphans" | "canSelectAll" | "clearSelectionLabel" | "deleteOrphansLabel" | "deleteSelectedLabel" | "onArchive" | "onCleanupOrphans" | "onCleanupSelected" | "onClearSelection" | "onSelectAllCandidates" | "processingLabel" | "selectedCount" | "selectedSummary" | "selectAllLabel">;',
]) {
  if (!workspaceMediaRetentionOwnerActionsTypesSource.includes(requiredWorkspaceMediaRetentionOwnerActionsTypesUsage)) {
    throw new Error(
      `workspace-media-retention-owner-actions.types.ts must own owner-actions prop typing: ${requiredWorkspaceMediaRetentionOwnerActionsTypesUsage}`,
    );
  }
}

const maxWorkspaceMediaRetentionOwnerActionsTypesLines = 2;
if (workspaceMediaRetentionOwnerActionsTypesLines > maxWorkspaceMediaRetentionOwnerActionsTypesLines) {
  throw new Error(
    `workspace-media-retention-owner-actions.types.ts exceeded ${maxWorkspaceMediaRetentionOwnerActionsTypesLines} lines: ${workspaceMediaRetentionOwnerActionsTypesLines}`,
  );
}

for (const requiredWorkspaceMediaRetentionEditorNoticeUsage of [
  'import type { WorkspaceMediaRetentionEditorNoticeProps } from "./workspace-media-retention-editor-notice.types";',
  "}: WorkspaceMediaRetentionEditorNoticeProps) {",
  "editorReadOnly",
]) {
  if (!workspaceMediaRetentionEditorNoticeSource.includes(requiredWorkspaceMediaRetentionEditorNoticeUsage)) {
    throw new Error(
      `workspace-media-retention-editor-notice.tsx must reuse the extracted editor-notice props type: ${requiredWorkspaceMediaRetentionEditorNoticeUsage}`,
    );
  }
}

if (workspaceMediaRetentionEditorNoticeSource.includes("type WorkspaceMediaRetentionEditorNoticeProps =")) {
  throw new Error(
    "workspace-media-retention-editor-notice.tsx must keep editor-notice prop typing delegated",
  );
}

const maxWorkspaceMediaRetentionEditorNoticeLines = 10;
if (workspaceMediaRetentionEditorNoticeLines > maxWorkspaceMediaRetentionEditorNoticeLines) {
  throw new Error(
    `workspace-media-retention-editor-notice.tsx exceeded ${maxWorkspaceMediaRetentionEditorNoticeLines} lines: ${workspaceMediaRetentionEditorNoticeLines}`,
  );
}

for (const requiredWorkspaceMediaRetentionEditorNoticeTypesUsage of [
  'import type { WorkspaceMediaRetentionActionsProps } from "./workspace-media-retention-actions.types"; export type WorkspaceMediaRetentionEditorNoticeProps = Pick<WorkspaceMediaRetentionActionsProps, "editorReadOnly">;',
]) {
  if (!workspaceMediaRetentionEditorNoticeTypesSource.includes(requiredWorkspaceMediaRetentionEditorNoticeTypesUsage)) {
    throw new Error(
      `workspace-media-retention-editor-notice.types.ts must own editor-notice prop typing: ${requiredWorkspaceMediaRetentionEditorNoticeTypesUsage}`,
    );
  }
}

const maxWorkspaceMediaRetentionEditorNoticeTypesLines = 2;
if (workspaceMediaRetentionEditorNoticeTypesLines > maxWorkspaceMediaRetentionEditorNoticeTypesLines) {
  throw new Error(
    `workspace-media-retention-editor-notice.types.ts exceeded ${maxWorkspaceMediaRetentionEditorNoticeTypesLines} lines: ${workspaceMediaRetentionEditorNoticeTypesLines}`,
  );
}

for (const requiredWorkspaceMediaRetentionSelectionActionsUsage of [
  'import type { CreateWorkspaceMediaRetentionSelectionActionsInput } from "./workspace-media-retention-selection-actions.types";',
  "}: CreateWorkspaceMediaRetentionSelectionActionsInput) {",
]) {
  if (!workspaceMediaRetentionSelectionActionsSource.includes(requiredWorkspaceMediaRetentionSelectionActionsUsage)) {
    throw new Error(
      `workspace-media-retention-selection-actions.ts must reuse the extracted retention-selection input type: ${requiredWorkspaceMediaRetentionSelectionActionsUsage}`,
    );
  }
}

for (const forbiddenWorkspaceMediaRetentionSelectionActionsToken of [
  "WorkspaceMediaRetentionControllerState",
  "}: Pick<",
]) {
  if (workspaceMediaRetentionSelectionActionsSource.includes(forbiddenWorkspaceMediaRetentionSelectionActionsToken)) {
    throw new Error(
      `workspace-media-retention-selection-actions.ts must keep retention-selection input typing delegated: ${forbiddenWorkspaceMediaRetentionSelectionActionsToken}`,
    );
  }
}

for (const requiredWorkspaceMediaRetentionSelectionActionsTypesUsage of [
  'import type { WorkspaceMediaRetentionControllerState } from "./workspace-media-retention-controller.types"; export type CreateWorkspaceMediaRetentionSelectionActionsInput = Pick<WorkspaceMediaRetentionControllerState, "report" | "setSelectedMediaIds">;',
]) {
  if (!workspaceMediaRetentionSelectionActionsTypesSource.includes(requiredWorkspaceMediaRetentionSelectionActionsTypesUsage)) {
    throw new Error(
      `workspace-media-retention-selection-actions.types.ts must own retention-selection input typing: ${requiredWorkspaceMediaRetentionSelectionActionsTypesUsage}`,
    );
  }
}

const maxWorkspaceMediaRetentionSelectionActionsTypesLines = 2;
if (workspaceMediaRetentionSelectionActionsTypesLines > maxWorkspaceMediaRetentionSelectionActionsTypesLines) {
  throw new Error(
    `workspace-media-retention-selection-actions.types.ts exceeded ${maxWorkspaceMediaRetentionSelectionActionsTypesLines} lines: ${workspaceMediaRetentionSelectionActionsTypesLines}`,
  );
}

for (const [componentName, componentSource, componentTypesSource, importLine, signatureLine, forbiddenTokens, typesLine, maxLines, actualLines] of [
  [
    "use-workspace-media-retention-report",
    useWorkspaceMediaRetentionReportSource,
    useWorkspaceMediaRetentionReportTypesSource,
    'import type { UseWorkspaceMediaRetentionReportInput } from "./use-workspace-media-retention-report.types";',
    "}: UseWorkspaceMediaRetentionReportInput) {",
    ["UseWorkspaceMediaRetentionControllerProps", "WorkspaceMediaRetentionControllerState", "}: Pick<"],
    'import type { UseWorkspaceMediaRetentionControllerProps, WorkspaceMediaRetentionControllerState } from "./workspace-media-retention-controller.types"; export type UseWorkspaceMediaRetentionReportInput = Pick<UseWorkspaceMediaRetentionControllerProps, "loadFailedMessage" | "token" | "workspaceId"> & Pick<WorkspaceMediaRetentionControllerState, "olderThanDays" | "setError" | "setLoading" | "setReport" | "setSelectedMediaIds">;',
    2,
    useWorkspaceMediaRetentionReportTypesLines,
  ],
  [
    "workspace-media-retention-controller-actions",
    workspaceMediaRetentionControllerActionsSource,
    workspaceMediaRetentionControllerActionsTypesSource,
    'import type { CreateWorkspaceMediaRetentionControllerActionsInput } from "./workspace-media-retention-controller-actions.types";',
    "}: CreateWorkspaceMediaRetentionControllerActionsInput) {",
    ["UseWorkspaceMediaRetentionControllerProps", "WorkspaceMediaRetentionControllerState", "}: Pick<"],
    'import type { UseWorkspaceMediaRetentionControllerProps, WorkspaceMediaRetentionControllerState } from "./workspace-media-retention-controller.types"; export type CreateWorkspaceMediaRetentionControllerActionsInput = Pick<UseWorkspaceMediaRetentionControllerProps, "actionFailedMessage" | "token" | "workspaceId"> & Pick<WorkspaceMediaRetentionControllerState, "olderThanDays" | "report" | "selectedMediaIds" | "setActionError" | "setActionLoading" | "setActionResult" | "setSelectedMediaIds"> & { loadReport: (threshold: number) => Promise<void> };',
    2,
    workspaceMediaRetentionControllerActionsTypesLines,
  ],
  [
    "workspace-media-retention-execution-actions",
    workspaceMediaRetentionExecutionActionsSource,
    workspaceMediaRetentionExecutionActionsTypesSource,
    'import type { CreateWorkspaceMediaRetentionExecutionActionsInput } from "./workspace-media-retention-execution-actions.types";',
    "}: CreateWorkspaceMediaRetentionExecutionActionsInput) {",
    ["UseWorkspaceMediaRetentionControllerProps", "WorkspaceMediaRetentionControllerState", "}: Pick<"],
    'import type { UseWorkspaceMediaRetentionControllerProps, WorkspaceMediaRetentionControllerState } from "./workspace-media-retention-controller.types"; export type CreateWorkspaceMediaRetentionExecutionActionsInput = Pick<UseWorkspaceMediaRetentionControllerProps, "actionFailedMessage" | "token" | "workspaceId"> & Pick<WorkspaceMediaRetentionControllerState, "olderThanDays" | "selectedMediaIds" | "setActionError" | "setActionLoading" | "setActionResult"> & { loadReport: (threshold: number) => Promise<void> };',
    2,
    workspaceMediaRetentionExecutionActionsTypesLines,
  ],
]) {
  for (const requiredUsage of [importLine, signatureLine]) {
    if (!componentSource.includes(requiredUsage)) {
      throw new Error(`${componentName}.ts must reuse the extracted retention input type: ${requiredUsage}`);
    }
  }
  for (const forbiddenToken of forbiddenTokens) {
    if (componentSource.includes(forbiddenToken)) {
      throw new Error(`${componentName}.ts must keep retention input typing delegated: ${forbiddenToken}`);
    }
  }
  if (!componentTypesSource.includes(typesLine)) {
    throw new Error(`${componentName}.types.ts must own retention input typing: ${typesLine}`);
  }
  if (actualLines > maxLines) {
    throw new Error(`${componentName}.types.ts exceeded ${maxLines} lines: ${actualLines}`);
  }
}

for (const requiredWorkspaceMediaRetentionCardActionHelpersUsage of [
  'import type {',
  'from "./workspace-media-retention-card-action-helpers.types";',
  "}: BuildWorkspaceMediaRetentionActionMessageInput) {",
  "}: BuildWorkspaceMediaRetentionActionsPropsInput): WorkspaceMediaRetentionActionsProps {",
]) {
  if (!workspaceMediaRetentionCardActionHelpersSource.includes(requiredWorkspaceMediaRetentionCardActionHelpersUsage)) {
    throw new Error(
      `workspace-media-retention-card-action-helpers.ts must reuse extracted helper input types: ${requiredWorkspaceMediaRetentionCardActionHelpersUsage}`,
    );
  }
}

for (const forbiddenWorkspaceMediaRetentionCardActionHelpersToken of [
  "}: {",
  "actionResult: MediaRetentionActionResult | null;",
  "handleArchive: WorkspaceMediaRetentionActionsProps[\"onArchive\"];",
]) {
  if (workspaceMediaRetentionCardActionHelpersSource.includes(forbiddenWorkspaceMediaRetentionCardActionHelpersToken)) {
    throw new Error(
      `workspace-media-retention-card-action-helpers.ts must keep helper input typing delegated: ${forbiddenWorkspaceMediaRetentionCardActionHelpersToken}`,
    );
  }
}

for (const requiredWorkspaceMediaRetentionCardActionHelpersTypesUsage of [
  'import type { MediaRetentionActionResult } from "./workspace-media-retention-controller.types"; import type { WorkspaceMediaRetentionActionsProps } from "./workspace-media-retention-actions.types"; import type { WorkspaceMediaRetentionCopy } from "./workspace-media-retention-copy"; export type BuildWorkspaceMediaRetentionActionMessageInput = { actionResult: MediaRetentionActionResult | null; archiveCompleted: string; cleanupCompleted: string }; export type BuildWorkspaceMediaRetentionActionsPropsInput = { actionLoading: boolean; clearSelection: () => void; copy: WorkspaceMediaRetentionCopy; handleArchive: WorkspaceMediaRetentionActionsProps["onArchive"]; handleCleanup: (input: { mediaIds: string[]; purgeOrphanFiles: boolean; confirmMessage: string }) => Promise<void>; report: { orphan_file_count?: number; retention_candidates: Array<{ media_id: string }> } | null; role: WorkspaceMediaRetentionActionsProps["role"]; selectAllCandidates: () => void; selectedMediaIds: string[] };',
]) {
  if (!workspaceMediaRetentionCardActionHelpersTypesSource.includes(requiredWorkspaceMediaRetentionCardActionHelpersTypesUsage)) {
    throw new Error(
      `workspace-media-retention-card-action-helpers.types.ts must own helper input typing: ${requiredWorkspaceMediaRetentionCardActionHelpersTypesUsage}`,
    );
  }
}

const maxWorkspaceMediaRetentionCardActionHelpersTypesLines = 2;
if (workspaceMediaRetentionCardActionHelpersTypesLines > maxWorkspaceMediaRetentionCardActionHelpersTypesLines) {
  throw new Error(
    `workspace-media-retention-card-action-helpers.types.ts exceeded ${maxWorkspaceMediaRetentionCardActionHelpersTypesLines} lines: ${workspaceMediaRetentionCardActionHelpersTypesLines}`,
  );
}

for (const requiredWorkspaceMediaRetentionCardCopyHelpersUsage of [
  'import type { BuildWorkspaceMediaRetentionControllerInputArgs } from "./workspace-media-retention-card-copy-helpers.types";',
  "}: BuildWorkspaceMediaRetentionControllerInputArgs) {",
]) {
  if (!workspaceMediaRetentionCardCopyHelpersSource.includes(requiredWorkspaceMediaRetentionCardCopyHelpersUsage)) {
    throw new Error(
      `workspace-media-retention-card-copy-helpers.ts must reuse the extracted retention-copy helper input type: ${requiredWorkspaceMediaRetentionCardCopyHelpersUsage}`,
    );
  }
}

if (workspaceMediaRetentionCardCopyHelpersSource.includes("}: {")) {
  throw new Error(
    "workspace-media-retention-card-copy-helpers.ts must keep retention-copy helper input typing delegated",
  );
}

for (const requiredWorkspaceMediaRetentionCardCopyHelpersTypesUsage of [
  'export type BuildWorkspaceMediaRetentionControllerInputArgs = { actionFailedMessage: string; allHealthyLabel: string; loadFailedMessage: string; missingFilesLabel: string; orphanFilesLabel: string; remoteMediaLabel: string; token: string; workspaceId: string };',
]) {
  if (!workspaceMediaRetentionCardCopyHelpersTypesSource.includes(requiredWorkspaceMediaRetentionCardCopyHelpersTypesUsage)) {
    throw new Error(
      `workspace-media-retention-card-copy-helpers.types.ts must own retention-copy helper input typing: ${requiredWorkspaceMediaRetentionCardCopyHelpersTypesUsage}`,
    );
  }
}

const maxWorkspaceMediaRetentionCardCopyHelpersTypesLines = 2;
if (workspaceMediaRetentionCardCopyHelpersTypesLines > maxWorkspaceMediaRetentionCardCopyHelpersTypesLines) {
  throw new Error(
    `workspace-media-retention-card-copy-helpers.types.ts exceeded ${maxWorkspaceMediaRetentionCardCopyHelpersTypesLines} lines: ${workspaceMediaRetentionCardCopyHelpersTypesLines}`,
  );
}

for (const requiredWorkspaceMediaRetentionHeaderUsage of [
  'import { WorkspaceMediaRetentionHeaderControls } from "./workspace-media-retention-header-controls";',
  'import { WorkspaceMediaRetentionHeaderIntro } from "./workspace-media-retention-header-intro";',
  'import type { WorkspaceMediaRetentionHeaderProps } from "./workspace-media-retention-header.types";',
  "}: WorkspaceMediaRetentionHeaderProps) {",
  "<WorkspaceMediaRetentionHeaderIntro",
  "<WorkspaceMediaRetentionHeaderControls",
]) {
  if (!workspaceMediaRetentionHeaderSource.includes(requiredWorkspaceMediaRetentionHeaderUsage)) {
    throw new Error(
      `workspace-media-retention-header.tsx must reuse the extracted retention-header props type: ${requiredWorkspaceMediaRetentionHeaderUsage}`,
    );
  }
}

for (const forbiddenWorkspaceMediaRetentionHeaderToken of [
  "type WorkspaceMediaRetentionHeaderCopy = {",
  "copy: WorkspaceMediaRetentionHeaderCopy;",
  '<div className="eyebrow">{copy.eyebrow}</div>',
  'className="form-stack"',
  "<select className=\"input\"",
]) {
  if (workspaceMediaRetentionHeaderSource.includes(forbiddenWorkspaceMediaRetentionHeaderToken)) {
    throw new Error(
      `workspace-media-retention-header.tsx must keep retention-header prop typing delegated: ${forbiddenWorkspaceMediaRetentionHeaderToken}`,
    );
  }
}

const maxWorkspaceMediaRetentionHeaderLines = 15;
if (workspaceMediaRetentionHeaderLines > maxWorkspaceMediaRetentionHeaderLines) {
  throw new Error(
    `workspace-media-retention-header.tsx exceeded ${maxWorkspaceMediaRetentionHeaderLines} lines: ${workspaceMediaRetentionHeaderLines}`,
  );
}

for (const requiredWorkspaceMediaRetentionHeaderIntroUsage of [
  'import type { WorkspaceMediaRetentionHeaderIntroProps } from "./workspace-media-retention-header-intro.types";',
  "}: WorkspaceMediaRetentionHeaderIntroProps) {",
  '<div className="eyebrow">{copy.eyebrow}</div>',
  "{copy.title}",
  "{copy.description}",
]) {
  if (!workspaceMediaRetentionHeaderIntroSource.includes(requiredWorkspaceMediaRetentionHeaderIntroUsage)) {
    throw new Error(
      `workspace-media-retention-header-intro.tsx must own retention-header intro rendering: ${requiredWorkspaceMediaRetentionHeaderIntroUsage}`,
    );
  }
}

if (workspaceMediaRetentionHeaderIntroSource.includes("type WorkspaceMediaRetentionHeaderIntroProps =")) {
  throw new Error(
    "workspace-media-retention-header-intro.tsx must keep retention-header intro prop typing delegated",
  );
}

const maxWorkspaceMediaRetentionHeaderIntroLines = 12;
if (workspaceMediaRetentionHeaderIntroLines > maxWorkspaceMediaRetentionHeaderIntroLines) {
  throw new Error(
    `workspace-media-retention-header-intro.tsx exceeded ${maxWorkspaceMediaRetentionHeaderIntroLines} lines: ${workspaceMediaRetentionHeaderIntroLines}`,
  );
}

for (const requiredWorkspaceMediaRetentionHeaderIntroTypesUsage of [
  'import type { WorkspaceMediaRetentionHeaderProps } from "./workspace-media-retention-header.types"; export type WorkspaceMediaRetentionHeaderIntroProps = Pick<WorkspaceMediaRetentionHeaderProps, "copy">;',
]) {
  if (!workspaceMediaRetentionHeaderIntroTypesSource.includes(requiredWorkspaceMediaRetentionHeaderIntroTypesUsage)) {
    throw new Error(
      `workspace-media-retention-header-intro.types.ts must own retention-header intro prop typing: ${requiredWorkspaceMediaRetentionHeaderIntroTypesUsage}`,
    );
  }
}

const maxWorkspaceMediaRetentionHeaderIntroTypesLines = 2;
if (workspaceMediaRetentionHeaderIntroTypesLines > maxWorkspaceMediaRetentionHeaderIntroTypesLines) {
  throw new Error(
    `workspace-media-retention-header-intro.types.ts exceeded ${maxWorkspaceMediaRetentionHeaderIntroTypesLines} lines: ${workspaceMediaRetentionHeaderIntroTypesLines}`,
  );
}

for (const requiredWorkspaceMediaRetentionHeaderControlsUsage of [
  'import type { WorkspaceMediaRetentionHeaderControlsProps } from "./workspace-media-retention-header-controls.types";',
  "}: WorkspaceMediaRetentionHeaderControlsProps) {",
  'className="form-stack"',
  "<select className=\"input\"",
  "onClick={() => void onRefresh()}",
]) {
  if (!workspaceMediaRetentionHeaderControlsSource.includes(requiredWorkspaceMediaRetentionHeaderControlsUsage)) {
    throw new Error(
      `workspace-media-retention-header-controls.tsx must own retention-header control rendering: ${requiredWorkspaceMediaRetentionHeaderControlsUsage}`,
    );
  }
}

if (workspaceMediaRetentionHeaderControlsSource.includes("type WorkspaceMediaRetentionHeaderControlsProps =")) {
  throw new Error(
    "workspace-media-retention-header-controls.tsx must keep retention-header controls prop typing delegated",
  );
}

const maxWorkspaceMediaRetentionHeaderControlsLines = 22;
if (workspaceMediaRetentionHeaderControlsLines > maxWorkspaceMediaRetentionHeaderControlsLines) {
  throw new Error(
    `workspace-media-retention-header-controls.tsx exceeded ${maxWorkspaceMediaRetentionHeaderControlsLines} lines: ${workspaceMediaRetentionHeaderControlsLines}`,
  );
}

for (const requiredWorkspaceMediaRetentionHeaderControlsTypesUsage of [
  'import type { WorkspaceMediaRetentionHeaderProps } from "./workspace-media-retention-header.types"; export type WorkspaceMediaRetentionHeaderControlsProps = Pick<WorkspaceMediaRetentionHeaderProps, "copy" | "loading" | "olderThanDays" | "onOlderThanDaysChange" | "onRefresh">;',
]) {
  if (!workspaceMediaRetentionHeaderControlsTypesSource.includes(requiredWorkspaceMediaRetentionHeaderControlsTypesUsage)) {
    throw new Error(
      `workspace-media-retention-header-controls.types.ts must own retention-header controls prop typing: ${requiredWorkspaceMediaRetentionHeaderControlsTypesUsage}`,
    );
  }
}

const maxWorkspaceMediaRetentionHeaderControlsTypesLines = 2;
if (workspaceMediaRetentionHeaderControlsTypesLines > maxWorkspaceMediaRetentionHeaderControlsTypesLines) {
  throw new Error(
    `workspace-media-retention-header-controls.types.ts exceeded ${maxWorkspaceMediaRetentionHeaderControlsTypesLines} lines: ${workspaceMediaRetentionHeaderControlsTypesLines}`,
  );
}

for (const requiredWorkspaceMediaRetentionHeaderTypesUsage of [
  "export type WorkspaceMediaRetentionHeaderCopy = {",
  "export type WorkspaceMediaRetentionHeaderProps = { copy: WorkspaceMediaRetentionHeaderCopy; loading: boolean; olderThanDays: number; onOlderThanDaysChange: (value: number) => void; onRefresh: () => Promise<void> };",
]) {
  if (!workspaceMediaRetentionHeaderTypesSource.includes(requiredWorkspaceMediaRetentionHeaderTypesUsage)) {
    throw new Error(
      `workspace-media-retention-header.types.ts must own retention-header prop typing: ${requiredWorkspaceMediaRetentionHeaderTypesUsage}`,
    );
  }
}

const maxWorkspaceMediaRetentionHeaderTypesLines = 2;
if (workspaceMediaRetentionHeaderTypesLines > maxWorkspaceMediaRetentionHeaderTypesLines) {
  throw new Error(
    `workspace-media-retention-header.types.ts exceeded ${maxWorkspaceMediaRetentionHeaderTypesLines} lines: ${workspaceMediaRetentionHeaderTypesLines}`,
  );
}

for (const requiredWorkspaceMediaRetentionSummaryUsage of [
  'import { WorkspaceMediaRetentionSummaryGrid } from "./workspace-media-retention-summary-grid";',
  'import { WorkspaceMediaRetentionSummaryNote } from "./workspace-media-retention-summary-note";',
  'import type { WorkspaceMediaRetentionSummaryProps } from "./workspace-media-retention-summary.types";',
  "}: WorkspaceMediaRetentionSummaryProps) {",
  "<WorkspaceMediaRetentionSummaryGrid",
  "<WorkspaceMediaRetentionSummaryNote",
]) {
  if (!workspaceMediaRetentionSummarySource.includes(requiredWorkspaceMediaRetentionSummaryUsage)) {
    throw new Error(
      `workspace-media-retention-summary.tsx must reuse the extracted retention-summary props type: ${requiredWorkspaceMediaRetentionSummaryUsage}`,
    );
  }
}

for (const forbiddenWorkspaceMediaRetentionSummaryToken of [
  "type WorkspaceMediaRetentionSummaryCopy = {",
  "copy: WorkspaceMediaRetentionSummaryCopy;",
  '<div className="detail-grid" style={{ marginTop: 16 }}>',
  "report.oldest_media_age_days",
  "report.orphan_file_count",
]) {
  if (workspaceMediaRetentionSummarySource.includes(forbiddenWorkspaceMediaRetentionSummaryToken)) {
    throw new Error(
      `workspace-media-retention-summary.tsx must keep retention-summary prop typing delegated: ${forbiddenWorkspaceMediaRetentionSummaryToken}`,
    );
  }
}

const maxWorkspaceMediaRetentionSummaryLines = 15;
if (workspaceMediaRetentionSummaryLines > maxWorkspaceMediaRetentionSummaryLines) {
  throw new Error(
    `workspace-media-retention-summary.tsx exceeded ${maxWorkspaceMediaRetentionSummaryLines} lines: ${workspaceMediaRetentionSummaryLines}`,
  );
}

for (const requiredWorkspaceMediaRetentionSummaryGridUsage of [
  'import type { WorkspaceMediaRetentionSummaryGridProps } from "./workspace-media-retention-summary-grid.types";',
  "}: WorkspaceMediaRetentionSummaryGridProps) {",
  '<div className="detail-grid" style={{ marginTop: 16 }}>',
  "report.oldest_media_age_days",
  "report.remote_item_count",
  "{storageRiskLabel}",
]) {
  if (!workspaceMediaRetentionSummaryGridSource.includes(requiredWorkspaceMediaRetentionSummaryGridUsage)) {
    throw new Error(
      `workspace-media-retention-summary-grid.tsx must own retention-summary grid rendering: ${requiredWorkspaceMediaRetentionSummaryGridUsage}`,
    );
  }
}

if (workspaceMediaRetentionSummaryGridSource.includes("type WorkspaceMediaRetentionSummaryGridProps =")) {
  throw new Error(
    "workspace-media-retention-summary-grid.tsx must keep retention-summary grid prop typing delegated",
  );
}

const maxWorkspaceMediaRetentionSummaryGridLines = 28;
if (workspaceMediaRetentionSummaryGridLines > maxWorkspaceMediaRetentionSummaryGridLines) {
  throw new Error(
    `workspace-media-retention-summary-grid.tsx exceeded ${maxWorkspaceMediaRetentionSummaryGridLines} lines: ${workspaceMediaRetentionSummaryGridLines}`,
  );
}

for (const requiredWorkspaceMediaRetentionSummaryGridTypesUsage of [
  'import type { WorkspaceMediaRetentionSummaryProps } from "./workspace-media-retention-summary.types"; export type WorkspaceMediaRetentionSummaryGridProps = Pick<WorkspaceMediaRetentionSummaryProps, "copy" | "remoteMediaLabel" | "report" | "storageRiskLabel">;',
]) {
  if (!workspaceMediaRetentionSummaryGridTypesSource.includes(requiredWorkspaceMediaRetentionSummaryGridTypesUsage)) {
    throw new Error(
      `workspace-media-retention-summary-grid.types.ts must own retention-summary grid prop typing: ${requiredWorkspaceMediaRetentionSummaryGridTypesUsage}`,
    );
  }
}

const maxWorkspaceMediaRetentionSummaryGridTypesLines = 2;
if (workspaceMediaRetentionSummaryGridTypesLines > maxWorkspaceMediaRetentionSummaryGridTypesLines) {
  throw new Error(
    `workspace-media-retention-summary-grid.types.ts exceeded ${maxWorkspaceMediaRetentionSummaryGridTypesLines} lines: ${workspaceMediaRetentionSummaryGridTypesLines}`,
  );
}

for (const requiredWorkspaceMediaRetentionSummaryNoteUsage of [
  'import type { WorkspaceMediaRetentionSummaryNoteProps } from "./workspace-media-retention-summary-note.types";',
  "}: WorkspaceMediaRetentionSummaryNoteProps) {",
  "report.orphan_file_count",
  "copy.cleanupNote",
]) {
  if (!workspaceMediaRetentionSummaryNoteSource.includes(requiredWorkspaceMediaRetentionSummaryNoteUsage)) {
    throw new Error(
      `workspace-media-retention-summary-note.tsx must own retention-summary note rendering: ${requiredWorkspaceMediaRetentionSummaryNoteUsage}`,
    );
  }
}

if (workspaceMediaRetentionSummaryNoteSource.includes("type WorkspaceMediaRetentionSummaryNoteProps =")) {
  throw new Error(
    "workspace-media-retention-summary-note.tsx must keep retention-summary note prop typing delegated",
  );
}

const maxWorkspaceMediaRetentionSummaryNoteLines = 8;
if (workspaceMediaRetentionSummaryNoteLines > maxWorkspaceMediaRetentionSummaryNoteLines) {
  throw new Error(
    `workspace-media-retention-summary-note.tsx exceeded ${maxWorkspaceMediaRetentionSummaryNoteLines} lines: ${workspaceMediaRetentionSummaryNoteLines}`,
  );
}

for (const requiredWorkspaceMediaRetentionSummaryNoteTypesUsage of [
  'import type { WorkspaceMediaRetentionSummaryProps } from "./workspace-media-retention-summary.types"; export type WorkspaceMediaRetentionSummaryNoteProps = Pick<WorkspaceMediaRetentionSummaryProps, "copy" | "report">;',
]) {
  if (!workspaceMediaRetentionSummaryNoteTypesSource.includes(requiredWorkspaceMediaRetentionSummaryNoteTypesUsage)) {
    throw new Error(
      `workspace-media-retention-summary-note.types.ts must own retention-summary note prop typing: ${requiredWorkspaceMediaRetentionSummaryNoteTypesUsage}`,
    );
  }
}

const maxWorkspaceMediaRetentionSummaryNoteTypesLines = 2;
if (workspaceMediaRetentionSummaryNoteTypesLines > maxWorkspaceMediaRetentionSummaryNoteTypesLines) {
  throw new Error(
    `workspace-media-retention-summary-note.types.ts exceeded ${maxWorkspaceMediaRetentionSummaryNoteTypesLines} lines: ${workspaceMediaRetentionSummaryNoteTypesLines}`,
  );
}

for (const requiredWorkspaceMediaRetentionSummaryTypesUsage of [
  'import type { MediaRetentionReport } from "../lib/types"; export type WorkspaceMediaRetentionSummaryCopy = { agedMedia: string; archivedMedia: string; cleanupNote: string; oldestMedia: string; orphanFiles: string; storageRisk: string; totalTracked: string; days: string };',
  "export type WorkspaceMediaRetentionSummaryProps = { copy: WorkspaceMediaRetentionSummaryCopy; remoteMediaLabel: string; report: MediaRetentionReport | null; storageRiskLabel: string };",
]) {
  if (!workspaceMediaRetentionSummaryTypesSource.includes(requiredWorkspaceMediaRetentionSummaryTypesUsage)) {
    throw new Error(
      `workspace-media-retention-summary.types.ts must own retention-summary prop typing: ${requiredWorkspaceMediaRetentionSummaryTypesUsage}`,
    );
  }
}

const maxWorkspaceMediaRetentionSummaryTypesLines = 2;
if (workspaceMediaRetentionSummaryTypesLines > maxWorkspaceMediaRetentionSummaryTypesLines) {
  throw new Error(
    `workspace-media-retention-summary.types.ts exceeded ${maxWorkspaceMediaRetentionSummaryTypesLines} lines: ${workspaceMediaRetentionSummaryTypesLines}`,
  );
}

for (const requiredMediaRetentionItemCardUsage of [
  'import type { MediaRetentionItemCardProps } from "./media-retention-item-card.types";',
  "}: MediaRetentionItemCardProps) {",
]) {
  if (!mediaRetentionItemCardSource.includes(requiredMediaRetentionItemCardUsage)) {
    throw new Error(
      `media-retention-item-card.tsx must reuse the extracted retention-item props type: ${requiredMediaRetentionItemCardUsage}`,
    );
  }
}

for (const forbiddenMediaRetentionItemCardToken of [
  'import type { MediaRetentionItem } from "../lib/types";',
  "type MediaRetentionItemCopy = {",
  "}: {",
]) {
  if (mediaRetentionItemCardSource.includes(forbiddenMediaRetentionItemCardToken)) {
    throw new Error(
      `media-retention-item-card.tsx must keep retention-item prop typing delegated: ${forbiddenMediaRetentionItemCardToken}`,
    );
  }
}

for (const requiredMediaRetentionItemCardTypesUsage of [
  'import type { LocaleCode } from "../lib/locale"; import type { MediaRetentionItem } from "../lib/types"; export type MediaRetentionItemCopy = { createdAt: string; ageDays: string; days: string; missing: string; archived: string; primary: string; remoteReference?: string; selectLabel: string }; export type MediaRetentionItemCardProps = { actionLoading?: boolean; copy: MediaRetentionItemCopy; item: MediaRetentionItem; locale: LocaleCode; onToggleSelected?: (mediaId: string) => void; selectable?: boolean; selected?: boolean };',
]) {
  if (!mediaRetentionItemCardTypesSource.includes(requiredMediaRetentionItemCardTypesUsage)) {
    throw new Error(
      `media-retention-item-card.types.ts must own retention-item prop typing: ${requiredMediaRetentionItemCardTypesUsage}`,
    );
  }
}

const maxMediaRetentionItemCardTypesLines = 2;
if (mediaRetentionItemCardTypesLines > maxMediaRetentionItemCardTypesLines) {
  throw new Error(
    `media-retention-item-card.types.ts exceeded ${maxMediaRetentionItemCardTypesLines} lines: ${mediaRetentionItemCardTypesLines}`,
  );
}

for (const requiredWorkspaceMediaRetentionListsUsage of [
  'import { WorkspaceMediaRetentionCandidatesList } from "./workspace-media-retention-candidates-list";',
  'import { WorkspaceMediaRetentionLargestList } from "./workspace-media-retention-largest-list";',
  'import type { WorkspaceMediaRetentionListsProps } from "./workspace-media-retention-lists.types";',
  "}: WorkspaceMediaRetentionListsProps) {",
  "<WorkspaceMediaRetentionLargestList",
  "<WorkspaceMediaRetentionCandidatesList",
]) {
  if (!workspaceMediaRetentionListsSource.includes(requiredWorkspaceMediaRetentionListsUsage)) {
    throw new Error(
      `workspace-media-retention-lists.tsx must reuse the extracted retention-lists props type: ${requiredWorkspaceMediaRetentionListsUsage}`,
    );
  }
}

for (const forbiddenWorkspaceMediaRetentionListsToken of [
  "type WorkspaceMediaRetentionListsCopy = {",
  "copy: WorkspaceMediaRetentionListsCopy;",
  'import { MediaRetentionItemCard } from "./media-retention-item-card";',
  '{report?.largest_items.length',
  '{report?.retention_candidates.length',
]) {
  if (workspaceMediaRetentionListsSource.includes(forbiddenWorkspaceMediaRetentionListsToken)) {
    throw new Error(
      `workspace-media-retention-lists.tsx must keep retention-lists prop typing delegated: ${forbiddenWorkspaceMediaRetentionListsToken}`,
    );
  }
}

const maxWorkspaceMediaRetentionListsLines = 15;
if (workspaceMediaRetentionListsLines > maxWorkspaceMediaRetentionListsLines) {
  throw new Error(
    `workspace-media-retention-lists.tsx exceeded ${maxWorkspaceMediaRetentionListsLines} lines: ${workspaceMediaRetentionListsLines}`,
  );
}

for (const requiredWorkspaceMediaRetentionLargestListUsage of [
  'import { MediaRetentionItemCard } from "./media-retention-item-card";',
  'import type { WorkspaceMediaRetentionLargestListProps } from "./workspace-media-retention-largest-list.types";',
  "}: WorkspaceMediaRetentionLargestListProps) {",
  '<div className="eyebrow">{copy.largestTitle}</div>',
  "{report?.largest_items.length",
  '<div className="notice">{copy.noLargestItems}</div>',
]) {
  if (!workspaceMediaRetentionLargestListSource.includes(requiredWorkspaceMediaRetentionLargestListUsage)) {
    throw new Error(
      `workspace-media-retention-largest-list.tsx must own largest-list rendering: ${requiredWorkspaceMediaRetentionLargestListUsage}`,
    );
  }
}

if (workspaceMediaRetentionLargestListSource.includes("type WorkspaceMediaRetentionLargestListProps =")) {
  throw new Error(
    "workspace-media-retention-largest-list.tsx must keep largest-list prop typing delegated",
  );
}

const maxWorkspaceMediaRetentionLargestListLines = 16;
if (workspaceMediaRetentionLargestListLines > maxWorkspaceMediaRetentionLargestListLines) {
  throw new Error(
    `workspace-media-retention-largest-list.tsx exceeded ${maxWorkspaceMediaRetentionLargestListLines} lines: ${workspaceMediaRetentionLargestListLines}`,
  );
}

for (const requiredWorkspaceMediaRetentionLargestListTypesUsage of [
  'import type { WorkspaceMediaRetentionListsProps } from "./workspace-media-retention-lists.types"; export type WorkspaceMediaRetentionLargestListProps = Pick<WorkspaceMediaRetentionListsProps, "copy" | "locale" | "report">;',
]) {
  if (!workspaceMediaRetentionLargestListTypesSource.includes(requiredWorkspaceMediaRetentionLargestListTypesUsage)) {
    throw new Error(
      `workspace-media-retention-largest-list.types.ts must own largest-list prop typing: ${requiredWorkspaceMediaRetentionLargestListTypesUsage}`,
    );
  }
}

const maxWorkspaceMediaRetentionLargestListTypesLines = 2;
if (workspaceMediaRetentionLargestListTypesLines > maxWorkspaceMediaRetentionLargestListTypesLines) {
  throw new Error(
    `workspace-media-retention-largest-list.types.ts exceeded ${maxWorkspaceMediaRetentionLargestListTypesLines} lines: ${workspaceMediaRetentionLargestListTypesLines}`,
  );
}

for (const requiredWorkspaceMediaRetentionCandidatesListUsage of [
  'import { MediaRetentionItemCard } from "./media-retention-item-card";',
  'import type { WorkspaceMediaRetentionCandidatesListProps } from "./workspace-media-retention-candidates-list.types";',
  "}: WorkspaceMediaRetentionCandidatesListProps) {",
  '<div className="eyebrow">{copy.candidatesTitle}</div>',
  "{report?.retention_candidates.length",
  'selectable={role === "owner"}',
  '<div className="notice">{copy.noCandidates}</div>',
]) {
  if (!workspaceMediaRetentionCandidatesListSource.includes(requiredWorkspaceMediaRetentionCandidatesListUsage)) {
    throw new Error(
      `workspace-media-retention-candidates-list.tsx must own candidates-list rendering: ${requiredWorkspaceMediaRetentionCandidatesListUsage}`,
    );
  }
}

if (workspaceMediaRetentionCandidatesListSource.includes("type WorkspaceMediaRetentionCandidatesListProps =")) {
  throw new Error(
    "workspace-media-retention-candidates-list.tsx must keep candidates-list prop typing delegated",
  );
}

const maxWorkspaceMediaRetentionCandidatesListLines = 20;
if (workspaceMediaRetentionCandidatesListLines > maxWorkspaceMediaRetentionCandidatesListLines) {
  throw new Error(
    `workspace-media-retention-candidates-list.tsx exceeded ${maxWorkspaceMediaRetentionCandidatesListLines} lines: ${workspaceMediaRetentionCandidatesListLines}`,
  );
}

for (const requiredWorkspaceMediaRetentionCandidatesListTypesUsage of [
  'import type { WorkspaceMediaRetentionListsProps } from "./workspace-media-retention-lists.types"; export type WorkspaceMediaRetentionCandidatesListProps = Pick<WorkspaceMediaRetentionListsProps, "actionLoading" | "copy" | "locale" | "onToggleSelected" | "report" | "role" | "selectedMediaIds">;',
]) {
  if (!workspaceMediaRetentionCandidatesListTypesSource.includes(requiredWorkspaceMediaRetentionCandidatesListTypesUsage)) {
    throw new Error(
      `workspace-media-retention-candidates-list.types.ts must own candidates-list prop typing: ${requiredWorkspaceMediaRetentionCandidatesListTypesUsage}`,
    );
  }
}

const maxWorkspaceMediaRetentionCandidatesListTypesLines = 2;
if (workspaceMediaRetentionCandidatesListTypesLines > maxWorkspaceMediaRetentionCandidatesListTypesLines) {
  throw new Error(
    `workspace-media-retention-candidates-list.types.ts exceeded ${maxWorkspaceMediaRetentionCandidatesListTypesLines} lines: ${workspaceMediaRetentionCandidatesListTypesLines}`,
  );
}

for (const requiredWorkspaceMediaRetentionListsTypesUsage of [
  'import type { LocaleCode } from "../lib/locale"; import type { MediaRetentionReport } from "../lib/types"; export type WorkspaceMediaRetentionListsCopy = { largestTitle: string; noLargestItems: string; candidatesTitle: string; noCandidates: string; selectLabel: string; createdAt: string; ageDays: string; days: string; missing: string; archived: string; primary: string; remoteReference?: string };',
  'export type WorkspaceMediaRetentionListsProps = { actionLoading: boolean; copy: WorkspaceMediaRetentionListsCopy; locale: LocaleCode; onToggleSelected: (mediaId: string) => void; report: MediaRetentionReport | null; role: "owner" | "editor"; selectedMediaIds: string[] };',
]) {
  if (!workspaceMediaRetentionListsTypesSource.includes(requiredWorkspaceMediaRetentionListsTypesUsage)) {
    throw new Error(
      `workspace-media-retention-lists.types.ts must own retention-lists prop typing: ${requiredWorkspaceMediaRetentionListsTypesUsage}`,
    );
  }
}

const maxWorkspaceMediaRetentionListsTypesLines = 2;
if (workspaceMediaRetentionListsTypesLines > maxWorkspaceMediaRetentionListsTypesLines) {
  throw new Error(
    `workspace-media-retention-lists.types.ts exceeded ${maxWorkspaceMediaRetentionListsTypesLines} lines: ${workspaceMediaRetentionListsTypesLines}`,
  );
}

for (const requiredWorkspaceMediaRetentionNoticesUsage of [
  'import type { WorkspaceMediaRetentionNoticesProps } from "./workspace-media-retention-notices.types";',
  "}: WorkspaceMediaRetentionNoticesProps) {",
]) {
  if (!workspaceMediaRetentionNoticesSource.includes(requiredWorkspaceMediaRetentionNoticesUsage)) {
    throw new Error(
      `workspace-media-retention-notices.tsx must reuse the extracted retention-notices props type: ${requiredWorkspaceMediaRetentionNoticesUsage}`,
    );
  }
}

for (const forbiddenWorkspaceMediaRetentionNoticesToken of [
  "actionError: string;",
  "actionMessage: string;",
  "error: string;",
]) {
  if (workspaceMediaRetentionNoticesSource.includes(forbiddenWorkspaceMediaRetentionNoticesToken)) {
    throw new Error(
      `workspace-media-retention-notices.tsx must keep retention-notices prop typing delegated: ${forbiddenWorkspaceMediaRetentionNoticesToken}`,
    );
  }
}

for (const requiredWorkspaceMediaRetentionNoticesTypesUsage of [
  'export type WorkspaceMediaRetentionNoticesProps = { actionError: string; actionMessage: string; error: string };',
]) {
  if (!workspaceMediaRetentionNoticesTypesSource.includes(requiredWorkspaceMediaRetentionNoticesTypesUsage)) {
    throw new Error(
      `workspace-media-retention-notices.types.ts must own retention-notices prop typing: ${requiredWorkspaceMediaRetentionNoticesTypesUsage}`,
    );
  }
}

const maxWorkspaceMediaRetentionNoticesTypesLines = 2;
if (workspaceMediaRetentionNoticesTypesLines > maxWorkspaceMediaRetentionNoticesTypesLines) {
  throw new Error(
    `workspace-media-retention-notices.types.ts exceeded ${maxWorkspaceMediaRetentionNoticesTypesLines} lines: ${workspaceMediaRetentionNoticesTypesLines}`,
  );
}

for (const requiredProviderSettingsJumpNavUsage of [
  'import type { ProviderSettingsJumpNavProps } from "./provider-settings-jump-nav.types";',
  "}: ProviderSettingsJumpNavProps) {",
]) {
  if (!providerSettingsJumpNavSource.includes(requiredProviderSettingsJumpNavUsage)) {
    throw new Error(
      `provider-settings-jump-nav.tsx must reuse the extracted jump-nav props type: ${requiredProviderSettingsJumpNavUsage}`,
    );
  }
}

for (const forbiddenProviderSettingsJumpNavToken of [
  'import type { ProviderFeatureConfig } from "../lib/types";',
  "providerConfigs: ProviderFeatureConfig[];",
]) {
  if (providerSettingsJumpNavSource.includes(forbiddenProviderSettingsJumpNavToken)) {
    throw new Error(
      `provider-settings-jump-nav.tsx must keep jump-nav prop typing delegated: ${forbiddenProviderSettingsJumpNavToken}`,
    );
  }
}

for (const requiredProviderSettingsJumpNavTypesUsage of [
  'import type { ProviderFeatureConfig } from "../lib/types"; export type ProviderSettingsJumpNavProps = { jumpToLabel: string; healthSectionLabel: string; providerConfigs: ProviderFeatureConfig[] };',
]) {
  if (!providerSettingsJumpNavTypesSource.includes(requiredProviderSettingsJumpNavTypesUsage)) {
    throw new Error(
      `provider-settings-jump-nav.types.ts must own jump-nav prop typing: ${requiredProviderSettingsJumpNavTypesUsage}`,
    );
  }
}

const maxProviderSettingsJumpNavTypesLines = 2;
if (providerSettingsJumpNavTypesLines > maxProviderSettingsJumpNavTypesLines) {
  throw new Error(
    `provider-settings-jump-nav.types.ts exceeded ${maxProviderSettingsJumpNavTypesLines} lines: ${providerSettingsJumpNavTypesLines}`,
  );
}

for (const requiredProviderFeatureCardActionsUsage of [
  'import type { ProviderFeatureCardActionsProps } from "./provider-feature-card-actions.types";',
  "}: ProviderFeatureCardActionsProps) {",
]) {
  if (!providerFeatureCardActionsSource.includes(requiredProviderFeatureCardActionsUsage)) {
    throw new Error(
      `provider-feature-card-actions.tsx must reuse the extracted feature-card-actions props type: ${requiredProviderFeatureCardActionsUsage}`,
    );
  }
}

for (const forbiddenProviderFeatureCardActionsToken of [
  'import type { ProviderFeatureCardProps } from "./provider-feature-card.types";',
  "Pick<",
]) {
  if (providerFeatureCardActionsSource.includes(forbiddenProviderFeatureCardActionsToken)) {
    throw new Error(
      `provider-feature-card-actions.tsx must keep feature-card-actions prop typing delegated: ${forbiddenProviderFeatureCardActionsToken}`,
    );
  }
}

for (const requiredProviderFeatureCardActionsTypesUsage of [
  'import type { ProviderFeatureCardProps } from "./provider-feature-card.types"; export type ProviderFeatureCardActionsProps = Pick<ProviderFeatureCardProps, "copy" | "isDirty" | "item" | "onReset" | "onSave" | "providerSavingCode">;',
]) {
  if (!providerFeatureCardActionsTypesSource.includes(requiredProviderFeatureCardActionsTypesUsage)) {
    throw new Error(
      `provider-feature-card-actions.types.ts must own feature-card-actions prop typing: ${requiredProviderFeatureCardActionsTypesUsage}`,
    );
  }
}

const maxProviderFeatureCardActionsTypesLines = 2;
if (providerFeatureCardActionsTypesLines > maxProviderFeatureCardActionsTypesLines) {
  throw new Error(
    `provider-feature-card-actions.types.ts exceeded ${maxProviderFeatureCardActionsTypesLines} lines: ${providerFeatureCardActionsTypesLines}`,
  );
}

for (const requiredProviderFeatureCardFieldsUsage of [
  'import { ProviderFeatureCardCoreFields } from "./provider-feature-card-core-fields";',
  'import { ProviderFeatureCardEnabledToggle } from "./provider-feature-card-enabled-toggle";',
  'import { ProviderFeatureMediaStorageOptions } from "./provider-feature-media-storage-options";',
  'import type { ProviderFeatureCardFieldsProps } from "./provider-feature-card-fields.types";',
  "}: ProviderFeatureCardFieldsProps) {",
  "<ProviderFeatureCardEnabledToggle",
  "<ProviderFeatureCardCoreFields",
]) {
  if (!providerFeatureCardFieldsSource.includes(requiredProviderFeatureCardFieldsUsage)) {
    throw new Error(
      `provider-feature-card-fields.tsx must reuse the extracted feature-card-fields props type: ${requiredProviderFeatureCardFieldsUsage}`,
    );
  }
}

for (const forbiddenProviderFeatureCardFieldsToken of [
  'import type { ProviderFeatureCardProps } from "./provider-feature-card.types";',
  "type ProviderFeatureCardFieldsProps = Pick<",
  'checked={draftItem.is_enabled}',
  'value={draftItem.provider_code}',
  'placeholder={copy.modelName}',
]) {
  if (providerFeatureCardFieldsSource.includes(forbiddenProviderFeatureCardFieldsToken)) {
    throw new Error(
      `provider-feature-card-fields.tsx must keep feature-card-fields prop typing delegated: ${forbiddenProviderFeatureCardFieldsToken}`,
    );
  }
}

const maxProviderFeatureCardFieldsLines = 45;
if (providerFeatureCardFieldsLines > maxProviderFeatureCardFieldsLines) {
  throw new Error(
    `provider-feature-card-fields.tsx exceeded ${maxProviderFeatureCardFieldsLines} lines: ${providerFeatureCardFieldsLines}`,
  );
}

for (const requiredProviderFeatureCardFieldsTypesUsage of [
  'import type { ProviderFeatureCardProps } from "./provider-feature-card.types"; export type ProviderFeatureCardFieldsProps = Pick<ProviderFeatureCardProps, "copy" | "draftItem" | "item" | "onProviderDraftChange">;',
]) {
  if (!providerFeatureCardFieldsTypesSource.includes(requiredProviderFeatureCardFieldsTypesUsage)) {
    throw new Error(
      `provider-feature-card-fields.types.ts must own feature-card-fields prop typing: ${requiredProviderFeatureCardFieldsTypesUsage}`,
    );
  }
}

const maxProviderFeatureCardFieldsTypesLines = 2;
if (providerFeatureCardFieldsTypesLines > maxProviderFeatureCardFieldsTypesLines) {
  throw new Error(
    `provider-feature-card-fields.types.ts exceeded ${maxProviderFeatureCardFieldsTypesLines} lines: ${providerFeatureCardFieldsTypesLines}`,
  );
}

for (const requiredProviderFeatureCardEnabledToggleUsage of [
  'import type { ProviderFeatureCardEnabledToggleProps } from "./provider-feature-card-enabled-toggle.types";',
  "}: ProviderFeatureCardEnabledToggleProps) {",
  'checked={draftItem.is_enabled}',
  'onProviderDraftChange(item.feature_code, { is_enabled: event.target.checked })',
]) {
  if (!providerFeatureCardEnabledToggleSource.includes(requiredProviderFeatureCardEnabledToggleUsage)) {
    throw new Error(
      `provider-feature-card-enabled-toggle.tsx must reuse the extracted enabled-toggle props type: ${requiredProviderFeatureCardEnabledToggleUsage}`,
    );
  }
}

if (providerFeatureCardEnabledToggleSource.includes("type ProviderFeatureCardEnabledToggleProps = Pick<")) {
  throw new Error(
    "provider-feature-card-enabled-toggle.tsx must keep enabled-toggle prop typing delegated",
  );
}

const maxProviderFeatureCardEnabledToggleLines = 25;
if (providerFeatureCardEnabledToggleLines > maxProviderFeatureCardEnabledToggleLines) {
  throw new Error(
    `provider-feature-card-enabled-toggle.tsx exceeded ${maxProviderFeatureCardEnabledToggleLines} lines: ${providerFeatureCardEnabledToggleLines}`,
  );
}

for (const requiredProviderFeatureCardEnabledToggleTypesUsage of [
  'import type { ProviderFeatureCardFieldsProps } from "./provider-feature-card-fields.types"; export type ProviderFeatureCardEnabledToggleProps = Pick<ProviderFeatureCardFieldsProps, "copy" | "draftItem" | "item" | "onProviderDraftChange">;',
]) {
  if (!providerFeatureCardEnabledToggleTypesSource.includes(requiredProviderFeatureCardEnabledToggleTypesUsage)) {
    throw new Error(
      `provider-feature-card-enabled-toggle.types.ts must own enabled-toggle prop typing: ${requiredProviderFeatureCardEnabledToggleTypesUsage}`,
    );
  }
}

const maxProviderFeatureCardEnabledToggleTypesLines = 2;
if (providerFeatureCardEnabledToggleTypesLines > maxProviderFeatureCardEnabledToggleTypesLines) {
  throw new Error(
    `provider-feature-card-enabled-toggle.types.ts exceeded ${maxProviderFeatureCardEnabledToggleTypesLines} lines: ${providerFeatureCardEnabledToggleTypesLines}`,
  );
}

for (const requiredProviderFeatureCardCoreFieldsUsage of [
  'import type { ProviderFeatureCardCoreFieldsProps } from "./provider-feature-card-core-fields.types";',
  "}: ProviderFeatureCardCoreFieldsProps) {",
  'value={draftItem.provider_code}',
  'placeholder={copy.modelName}',
  'placeholder={copy.apiBaseUrl}',
  'placeholder={copy.apiKeyEnvName}',
]) {
  if (!providerFeatureCardCoreFieldsSource.includes(requiredProviderFeatureCardCoreFieldsUsage)) {
    throw new Error(
      `provider-feature-card-core-fields.tsx must reuse the extracted core-fields props type: ${requiredProviderFeatureCardCoreFieldsUsage}`,
    );
  }
}

if (providerFeatureCardCoreFieldsSource.includes("type ProviderFeatureCardCoreFieldsProps = Pick<")) {
  throw new Error(
    "provider-feature-card-core-fields.tsx must keep core-fields prop typing delegated",
  );
}

const maxProviderFeatureCardCoreFieldsLines = 60;
if (providerFeatureCardCoreFieldsLines > maxProviderFeatureCardCoreFieldsLines) {
  throw new Error(
    `provider-feature-card-core-fields.tsx exceeded ${maxProviderFeatureCardCoreFieldsLines} lines: ${providerFeatureCardCoreFieldsLines}`,
  );
}

for (const requiredProviderFeatureCardCoreFieldsTypesUsage of [
  'import type { ProviderFeatureCardFieldsProps } from "./provider-feature-card-fields.types"; export type ProviderFeatureCardCoreFieldsProps = Pick<ProviderFeatureCardFieldsProps, "copy" | "draftItem" | "item" | "onProviderDraftChange">;',
]) {
  if (!providerFeatureCardCoreFieldsTypesSource.includes(requiredProviderFeatureCardCoreFieldsTypesUsage)) {
    throw new Error(
      `provider-feature-card-core-fields.types.ts must own core-fields prop typing: ${requiredProviderFeatureCardCoreFieldsTypesUsage}`,
    );
  }
}

const maxProviderFeatureCardCoreFieldsTypesLines = 2;
if (providerFeatureCardCoreFieldsTypesLines > maxProviderFeatureCardCoreFieldsTypesLines) {
  throw new Error(
    `provider-feature-card-core-fields.types.ts exceeded ${maxProviderFeatureCardCoreFieldsTypesLines} lines: ${providerFeatureCardCoreFieldsTypesLines}`,
  );
}

for (const requiredProviderSettingsFeatureListUsage of [
  'import type { ProviderSettingsFeatureListProps } from "./provider-settings-feature-list.types";',
  "}: ProviderSettingsFeatureListProps) {",
]) {
  if (!providerSettingsFeatureListSource.includes(requiredProviderSettingsFeatureListUsage)) {
    throw new Error(
      `provider-settings-feature-list.tsx must reuse the extracted feature-list props type: ${requiredProviderSettingsFeatureListUsage}`,
    );
  }
}

for (const forbiddenProviderSettingsFeatureListToken of [
  'import type { ProviderSettingsCopy } from "./provider-settings-copy";',
  'import type { ProviderSettingsPanelProps } from "./provider-settings-panel.types";',
  'import type { ProviderFeatureCardProps } from "./provider-feature-card.types";',
  'import type { ProviderDraft } from "./provider-settings-controller.types";',
  "type ProviderSettingsFeatureListProps = Pick<",
]) {
  if (providerSettingsFeatureListSource.includes(forbiddenProviderSettingsFeatureListToken)) {
    throw new Error(
      `provider-settings-feature-list.tsx must keep feature-list prop typing delegated: ${forbiddenProviderSettingsFeatureListToken}`,
    );
  }
}

for (const requiredProviderSettingsFeatureListTypesUsage of [
  'import type { ProviderFeatureCardProps } from "./provider-feature-card.types"; import type { ProviderSettingsCopy } from "./provider-settings-copy"; import type { ProviderDraft } from "./provider-settings-controller.types"; import type { ProviderSettingsPanelProps } from "./provider-settings-panel.types";',
  'export type ProviderSettingsFeatureListProps = Pick<ProviderSettingsPanelProps, "highlightedAnchor" | "locale" | "mediaStorageHealth" | "onRefreshMediaStorageHealth" | "providerConfigs" | "refreshingMediaStorageHealth"> & { copy: ProviderSettingsCopy; handleProviderDraftChange: ProviderFeatureCardProps["onProviderDraftChange"]; handleResetProviderConfig: ProviderFeatureCardProps["onReset"]; handleSaveProviderConfig: ProviderFeatureCardProps["onSave"]; isProviderDraftDirty: (item: ProviderSettingsPanelProps["providerConfigs"][number]) => boolean; providerDrafts: Record<string, ProviderDraft>; providerSavingCode: string };',
]) {
  if (!providerSettingsFeatureListTypesSource.includes(requiredProviderSettingsFeatureListTypesUsage)) {
    throw new Error(
      `provider-settings-feature-list.types.ts must own feature-list prop typing: ${requiredProviderSettingsFeatureListTypesUsage}`,
    );
  }
}

const maxProviderSettingsFeatureListTypesLines = 2;
if (providerSettingsFeatureListTypesLines > maxProviderSettingsFeatureListTypesLines) {
  throw new Error(
    `provider-settings-feature-list.types.ts exceeded ${maxProviderSettingsFeatureListTypesLines} lines: ${providerSettingsFeatureListTypesLines}`,
  );
}

for (const requiredProviderFeatureMediaStorageOptionsUsage of [
  'import { ProviderFeatureMediaStorageOptionToggles } from "./provider-feature-media-storage-option-toggles";',
  'import { ProviderFeatureMediaStorageRetryFields } from "./provider-feature-media-storage-retry-fields";',
  'import type { ProviderFeatureMediaStorageOptionsProps } from "./provider-feature-media-storage-options.types";',
  "}: ProviderFeatureMediaStorageOptionsProps) {",
  "<ProviderFeatureMediaStorageOptionToggles",
  "<ProviderFeatureMediaStorageRetryFields",
]) {
  if (!providerFeatureMediaStorageOptionsSource.includes(requiredProviderFeatureMediaStorageOptionsUsage)) {
    throw new Error(
      `provider-feature-media-storage-options.tsx must reuse the extracted media-storage option props type: ${requiredProviderFeatureMediaStorageOptionsUsage}`,
    );
  }
}

for (const forbiddenProviderFeatureMediaStorageOptionsToken of [
  'import type { ProviderSettingsCopy } from "./provider-settings-copy";',
  'import type { ProviderDraft } from "./provider-settings-controller.types";',
  'const MEDIA_STORAGE_FALLBACK_OPTION = "fallback_to_local_on_upload_failure";',
  'const MEDIA_STORAGE_AUTO_RETRY_OPTION = "auto_retry_enabled";',
  'const MEDIA_STORAGE_RETRY_MAX_ATTEMPTS_OPTION = "remote_retry_max_attempts";',
  'const MEDIA_STORAGE_RETRY_BACKOFF_OPTION = "remote_retry_backoff_seconds";',
  "readProviderFeatureMediaStorageBooleanOption(",
  "readProviderFeatureMediaStorageTextOption(",
  "buildProviderFeatureMediaStorageOptionsPatch(",
  "copy: ProviderSettingsCopy;",
  "draftItem: ProviderDraft;",
  "copy.fallbackToLocal",
  "copy.autoRetry",
  "copy.retryAttempts",
  "copy.retryBackoff",
  "MEDIA_STORAGE_FALLBACK_OPTION",
  "MEDIA_STORAGE_AUTO_RETRY_OPTION",
  "MEDIA_STORAGE_RETRY_MAX_ATTEMPTS_OPTION",
  "MEDIA_STORAGE_RETRY_BACKOFF_OPTION",
]) {
  if (providerFeatureMediaStorageOptionsSource.includes(forbiddenProviderFeatureMediaStorageOptionsToken)) {
    throw new Error(
      `provider-feature-media-storage-options.tsx must keep media-storage option prop typing delegated: ${forbiddenProviderFeatureMediaStorageOptionsToken}`,
    );
  }
}

for (const requiredProviderFeatureMediaStorageOptionTogglesUsage of [
  'from "./provider-feature-media-storage-options.helpers";',
  'import type { ProviderFeatureMediaStorageOptionTogglesProps } from "./provider-feature-media-storage-option-toggles.types";',
  "}: ProviderFeatureMediaStorageOptionTogglesProps) {",
  "readProviderFeatureMediaStorageBooleanOption(",
  "buildProviderFeatureMediaStorageOptionsPatch(",
  "copy.fallbackToLocal",
  "copy.autoRetry",
  "MEDIA_STORAGE_FALLBACK_OPTION",
  "MEDIA_STORAGE_AUTO_RETRY_OPTION",
]) {
  if (!providerFeatureMediaStorageOptionTogglesSource.includes(requiredProviderFeatureMediaStorageOptionTogglesUsage)) {
    throw new Error(
      `provider-feature-media-storage-option-toggles.tsx must own media-storage toggle rendering: ${requiredProviderFeatureMediaStorageOptionTogglesUsage}`,
    );
  }
}

for (const forbiddenProviderFeatureMediaStorageOptionTogglesToken of [
  'import type { ProviderSettingsCopy } from "./provider-settings-copy";',
  'import type { ProviderDraft } from "./provider-settings-controller.types";',
  "readProviderFeatureMediaStorageTextOption(",
  "copy.retryAttempts",
  "copy.retryBackoff",
  "copy.retryHint",
]) {
  if (providerFeatureMediaStorageOptionTogglesSource.includes(forbiddenProviderFeatureMediaStorageOptionTogglesToken)) {
    throw new Error(
      `provider-feature-media-storage-option-toggles.tsx must stay focused on toggle rendering only: ${forbiddenProviderFeatureMediaStorageOptionTogglesToken}`,
    );
  }
}

const maxProviderFeatureMediaStorageOptionTogglesLines = 60;
if (providerFeatureMediaStorageOptionTogglesLines > maxProviderFeatureMediaStorageOptionTogglesLines) {
  throw new Error(
    `provider-feature-media-storage-option-toggles.tsx exceeded ${maxProviderFeatureMediaStorageOptionTogglesLines} lines: ${providerFeatureMediaStorageOptionTogglesLines}`,
  );
}

for (const requiredProviderFeatureMediaStorageOptionTogglesTypesUsage of [
  'import type { ProviderFeatureMediaStorageOptionsProps } from "./provider-feature-media-storage-options.types"; export type ProviderFeatureMediaStorageOptionTogglesProps = Pick<ProviderFeatureMediaStorageOptionsProps, "copy" | "draftItem" | "featureCode" | "onProviderDraftChange">;',
]) {
  if (!providerFeatureMediaStorageOptionTogglesTypesSource.includes(requiredProviderFeatureMediaStorageOptionTogglesTypesUsage)) {
    throw new Error(
      `provider-feature-media-storage-option-toggles.types.ts must own media-storage toggle typing: ${requiredProviderFeatureMediaStorageOptionTogglesTypesUsage}`,
    );
  }
}

const maxProviderFeatureMediaStorageOptionTogglesTypesLines = 2;
if (
  providerFeatureMediaStorageOptionTogglesTypesLines >
  maxProviderFeatureMediaStorageOptionTogglesTypesLines
) {
  throw new Error(
    `provider-feature-media-storage-option-toggles.types.ts exceeded ${maxProviderFeatureMediaStorageOptionTogglesTypesLines} lines: ${providerFeatureMediaStorageOptionTogglesTypesLines}`,
  );
}

for (const requiredProviderFeatureMediaStorageRetryFieldsUsage of [
  'from "./provider-feature-media-storage-options.helpers";',
  'import type { ProviderFeatureMediaStorageRetryFieldsProps } from "./provider-feature-media-storage-retry-fields.types";',
  "}: ProviderFeatureMediaStorageRetryFieldsProps) {",
  "readProviderFeatureMediaStorageTextOption(",
  "buildProviderFeatureMediaStorageOptionsPatch(",
  "copy.retryAttempts",
  "copy.retryBackoff",
  "MEDIA_STORAGE_RETRY_MAX_ATTEMPTS_OPTION",
  "MEDIA_STORAGE_RETRY_BACKOFF_OPTION",
]) {
  if (!providerFeatureMediaStorageRetryFieldsSource.includes(requiredProviderFeatureMediaStorageRetryFieldsUsage)) {
    throw new Error(
      `provider-feature-media-storage-retry-fields.tsx must own media-storage retry input rendering: ${requiredProviderFeatureMediaStorageRetryFieldsUsage}`,
    );
  }
}

for (const forbiddenProviderFeatureMediaStorageRetryFieldsToken of [
  'import type { ProviderSettingsCopy } from "./provider-settings-copy";',
  'import type { ProviderDraft } from "./provider-settings-controller.types";',
  "readProviderFeatureMediaStorageBooleanOption(",
  "copy.fallbackToLocal",
  "copy.autoRetry",
  "copy.retryHint",
  "MEDIA_STORAGE_FALLBACK_OPTION",
  "MEDIA_STORAGE_AUTO_RETRY_OPTION",
]) {
  if (providerFeatureMediaStorageRetryFieldsSource.includes(forbiddenProviderFeatureMediaStorageRetryFieldsToken)) {
    throw new Error(
      `provider-feature-media-storage-retry-fields.tsx must stay focused on retry inputs only: ${forbiddenProviderFeatureMediaStorageRetryFieldsToken}`,
    );
  }
}

const maxProviderFeatureMediaStorageRetryFieldsLines = 25;
if (providerFeatureMediaStorageRetryFieldsLines > maxProviderFeatureMediaStorageRetryFieldsLines) {
  throw new Error(
    `provider-feature-media-storage-retry-fields.tsx exceeded ${maxProviderFeatureMediaStorageRetryFieldsLines} lines: ${providerFeatureMediaStorageRetryFieldsLines}`,
  );
}

for (const requiredProviderFeatureMediaStorageRetryFieldsTypesUsage of [
  'import type { ProviderFeatureMediaStorageOptionsProps } from "./provider-feature-media-storage-options.types"; export type ProviderFeatureMediaStorageRetryFieldsProps = Pick<ProviderFeatureMediaStorageOptionsProps, "copy" | "draftItem" | "featureCode" | "onProviderDraftChange">;',
]) {
  if (!providerFeatureMediaStorageRetryFieldsTypesSource.includes(requiredProviderFeatureMediaStorageRetryFieldsTypesUsage)) {
    throw new Error(
      `provider-feature-media-storage-retry-fields.types.ts must own media-storage retry-field typing: ${requiredProviderFeatureMediaStorageRetryFieldsTypesUsage}`,
    );
  }
}

const maxProviderFeatureMediaStorageRetryFieldsTypesLines = 2;
if (
  providerFeatureMediaStorageRetryFieldsTypesLines >
  maxProviderFeatureMediaStorageRetryFieldsTypesLines
) {
  throw new Error(
    `provider-feature-media-storage-retry-fields.types.ts exceeded ${maxProviderFeatureMediaStorageRetryFieldsTypesLines} lines: ${providerFeatureMediaStorageRetryFieldsTypesLines}`,
  );
}

for (const requiredProviderFeatureMediaStorageOptionsTypesUsage of [
  'import type { ProviderSettingsCopy } from "./provider-settings-copy"; import type { ProviderDraft } from "./provider-settings-controller.types";',
  'export type ProviderFeatureMediaStorageOptionsProps = { copy: ProviderSettingsCopy; draftItem: ProviderDraft; featureCode: string; onProviderDraftChange: (featureCode: string, patch: Partial<ProviderDraft>) => void };',
]) {
  if (!providerFeatureMediaStorageOptionsTypesSource.includes(requiredProviderFeatureMediaStorageOptionsTypesUsage)) {
    throw new Error(
      `provider-feature-media-storage-options.types.ts must own media-storage option prop typing: ${requiredProviderFeatureMediaStorageOptionsTypesUsage}`,
    );
  }
}

const maxProviderFeatureMediaStorageOptionsTypesLines = 2;
if (providerFeatureMediaStorageOptionsTypesLines > maxProviderFeatureMediaStorageOptionsTypesLines) {
  throw new Error(
    `provider-feature-media-storage-options.types.ts exceeded ${maxProviderFeatureMediaStorageOptionsTypesLines} lines: ${providerFeatureMediaStorageOptionsTypesLines}`,
  );
}

for (const requiredProviderFeatureMediaStorageOptionsHelpersUsage of [
  'from "./provider-settings-controller.types";',
  'from "./provider-feature-media-storage-options.helpers.types";',
  'export const MEDIA_STORAGE_FALLBACK_OPTION: ProviderFeatureMediaStorageOptionKey =',
  'export const MEDIA_STORAGE_AUTO_RETRY_OPTION: ProviderFeatureMediaStorageOptionKey =',
  'export const MEDIA_STORAGE_RETRY_MAX_ATTEMPTS_OPTION: ProviderFeatureMediaStorageOptionKey =',
  'export const MEDIA_STORAGE_RETRY_BACKOFF_OPTION: ProviderFeatureMediaStorageOptionKey =',
  "export function readProviderFeatureMediaStorageBooleanOption(",
  "export function readProviderFeatureMediaStorageTextOption(",
  "export function buildProviderFeatureMediaStorageOptionsPatch(",
]) {
  if (!providerFeatureMediaStorageOptionsHelpersSource.includes(requiredProviderFeatureMediaStorageOptionsHelpersUsage)) {
    throw new Error(
      `provider-feature-media-storage-options.helpers.ts must own media-storage option helper logic: ${requiredProviderFeatureMediaStorageOptionsHelpersUsage}`,
    );
  }
}

const maxProviderFeatureMediaStorageOptionsHelpersLines = 55;
if (providerFeatureMediaStorageOptionsHelpersLines > maxProviderFeatureMediaStorageOptionsHelpersLines) {
  throw new Error(
    `provider-feature-media-storage-options.helpers.ts exceeded ${maxProviderFeatureMediaStorageOptionsHelpersLines} lines: ${providerFeatureMediaStorageOptionsHelpersLines}`,
  );
}

for (const requiredProviderFeatureMediaStorageOptionsHelpersTypesUsage of [
  'import type { ProviderDraft } from "./provider-settings-controller.types"; export type ProviderFeatureMediaStorageOptionKey = "fallback_to_local_on_upload_failure" | "auto_retry_enabled" | "remote_retry_max_attempts" | "remote_retry_backoff_seconds"; export type ProviderFeatureMediaStorageOptionsPatch = Pick<ProviderDraft, "options_json">;',
]) {
  if (!providerFeatureMediaStorageOptionsHelpersTypesSource.includes(requiredProviderFeatureMediaStorageOptionsHelpersTypesUsage)) {
    throw new Error(
      `provider-feature-media-storage-options.helpers.types.ts must own media-storage option helper typing: ${requiredProviderFeatureMediaStorageOptionsHelpersTypesUsage}`,
    );
  }
}

const maxProviderFeatureMediaStorageOptionsHelpersTypesLines = 2;
if (
  providerFeatureMediaStorageOptionsHelpersTypesLines >
  maxProviderFeatureMediaStorageOptionsHelpersTypesLines
) {
  throw new Error(
    `provider-feature-media-storage-options.helpers.types.ts exceeded ${maxProviderFeatureMediaStorageOptionsHelpersTypesLines} lines: ${providerFeatureMediaStorageOptionsHelpersTypesLines}`,
  );
}

for (const requiredWorkspaceSettingsLoadingShellUsage of [
  'import type { WorkspaceSettingsLoadingShellProps } from "./workspace-settings-loading-shell.types";',
  "}: WorkspaceSettingsLoadingShellProps) {",
]) {
  if (!workspaceSettingsLoadingShellSource.includes(requiredWorkspaceSettingsLoadingShellUsage)) {
    throw new Error(
      `workspace-settings-loading-shell.tsx must reuse the extracted loading-shell props type: ${requiredWorkspaceSettingsLoadingShellUsage}`,
    );
  }
}

if (workspaceSettingsLoadingShellSource.includes("loadingLabel }: { loadingLabel: string }")) {
  throw new Error(
    "workspace-settings-loading-shell.tsx must keep loading-shell prop typing delegated",
  );
}

for (const requiredWorkspaceSettingsLoadingShellTypesUsage of [
  'export type WorkspaceSettingsLoadingShellProps = { loadingLabel: string };',
]) {
  if (!workspaceSettingsLoadingShellTypesSource.includes(requiredWorkspaceSettingsLoadingShellTypesUsage)) {
    throw new Error(
      `workspace-settings-loading-shell.types.ts must own loading-shell prop typing: ${requiredWorkspaceSettingsLoadingShellTypesUsage}`,
    );
  }
}

const maxWorkspaceSettingsLoadingShellTypesLines = 2;
if (workspaceSettingsLoadingShellTypesLines > maxWorkspaceSettingsLoadingShellTypesLines) {
  throw new Error(
    `workspace-settings-loading-shell.types.ts exceeded ${maxWorkspaceSettingsLoadingShellTypesLines} lines: ${workspaceSettingsLoadingShellTypesLines}`,
  );
}

for (const requiredUseWorkspaceSettingsAnchorUsage of [
  'import type { UseWorkspaceSettingsAnchorInput } from "./use-workspace-settings-anchor.types";',
  "}: UseWorkspaceSettingsAnchorInput) {",
]) {
  if (!useWorkspaceSettingsAnchorSource.includes(requiredUseWorkspaceSettingsAnchorUsage)) {
    throw new Error(
      `use-workspace-settings-anchor.ts must reuse the extracted settings-anchor input type: ${requiredUseWorkspaceSettingsAnchorUsage}`,
    );
  }
}

if (useWorkspaceSettingsAnchorSource.includes("}: {")) {
  throw new Error("use-workspace-settings-anchor.ts must keep settings-anchor input typing delegated");
}

for (const requiredUseWorkspaceSettingsAnchorTypesUsage of [
  'export type UseWorkspaceSettingsAnchorInput = { highlightedAnchor: string | null; providerConfigCount: number; healthCheckedAt?: string | null; setHighlightedAnchor: (value: string | null) => void };',
]) {
  if (!useWorkspaceSettingsAnchorTypesSource.includes(requiredUseWorkspaceSettingsAnchorTypesUsage)) {
    throw new Error(
      `use-workspace-settings-anchor.types.ts must own settings-anchor input typing: ${requiredUseWorkspaceSettingsAnchorTypesUsage}`,
    );
  }
}

const maxUseWorkspaceSettingsAnchorTypesLines = 2;
if (useWorkspaceSettingsAnchorTypesLines > maxUseWorkspaceSettingsAnchorTypesLines) {
  throw new Error(
    `use-workspace-settings-anchor.types.ts exceeded ${maxUseWorkspaceSettingsAnchorTypesLines} lines: ${useWorkspaceSettingsAnchorTypesLines}`,
  );
}

for (const requiredUseWorkspaceSettingsLoadUsage of [
  'import type { UseWorkspaceSettingsLoadInput } from "./use-workspace-settings-load.types";',
  "}: UseWorkspaceSettingsLoadInput) {",
]) {
  if (!useWorkspaceSettingsLoadSource.includes(requiredUseWorkspaceSettingsLoadUsage)) {
    throw new Error(
      `use-workspace-settings-load.ts must reuse the extracted settings-load input type: ${requiredUseWorkspaceSettingsLoadUsage}`,
    );
  }
}

for (const forbiddenUseWorkspaceSettingsLoadToken of [
  'import type { RouterLike, UseWorkspaceSettingsControllerState } from "./workspace-settings-controller.types";',
  "}: {",
]) {
  if (useWorkspaceSettingsLoadSource.includes(forbiddenUseWorkspaceSettingsLoadToken)) {
    throw new Error(
      `use-workspace-settings-load.ts must keep settings-load input typing delegated: ${forbiddenUseWorkspaceSettingsLoadToken}`,
    );
  }
}

for (const requiredUseWorkspaceSettingsLoadTypesUsage of [
  'import type { RouterLike, UseWorkspaceSettingsControllerState } from "./workspace-settings-controller.types"; export type UseWorkspaceSettingsLoadInput = { router: RouterLike; state: UseWorkspaceSettingsControllerState; workspaceId: string };',
]) {
  if (!useWorkspaceSettingsLoadTypesSource.includes(requiredUseWorkspaceSettingsLoadTypesUsage)) {
    throw new Error(
      `use-workspace-settings-load.types.ts must own settings-load input typing: ${requiredUseWorkspaceSettingsLoadTypesUsage}`,
    );
  }
}

const maxUseWorkspaceSettingsLoadTypesLines = 2;
if (useWorkspaceSettingsLoadTypesLines > maxUseWorkspaceSettingsLoadTypesLines) {
  throw new Error(
    `use-workspace-settings-load.types.ts exceeded ${maxUseWorkspaceSettingsLoadTypesLines} lines: ${useWorkspaceSettingsLoadTypesLines}`,
  );
}

for (const requiredWorkspaceSettingsActionsUsage of [
  'import type { CreateWorkspaceSettingsActionsInput } from "./workspace-settings-actions.types";',
  "}: CreateWorkspaceSettingsActionsInput) {",
]) {
  if (!workspaceSettingsActionsSource.includes(requiredWorkspaceSettingsActionsUsage)) {
    throw new Error(
      `workspace-settings-actions.ts must reuse the extracted settings-actions input type: ${requiredWorkspaceSettingsActionsUsage}`,
    );
  }
}

for (const forbiddenWorkspaceSettingsActionsToken of [
  'import type { UseWorkspaceSettingsControllerState } from "./workspace-settings-controller.types";',
  "}: {",
]) {
  if (workspaceSettingsActionsSource.includes(forbiddenWorkspaceSettingsActionsToken)) {
    throw new Error(
      `workspace-settings-actions.ts must keep settings-actions input typing delegated: ${forbiddenWorkspaceSettingsActionsToken}`,
    );
  }
}

for (const requiredWorkspaceSettingsActionsTypesUsage of [
  'import type { UseWorkspaceSettingsControllerState } from "./workspace-settings-controller.types"; export type CreateWorkspaceSettingsActionsInput = { state: UseWorkspaceSettingsControllerState; workspaceId: string };',
]) {
  if (!workspaceSettingsActionsTypesSource.includes(requiredWorkspaceSettingsActionsTypesUsage)) {
    throw new Error(
      `workspace-settings-actions.types.ts must own settings-actions input typing: ${requiredWorkspaceSettingsActionsTypesUsage}`,
    );
  }
}

const maxWorkspaceSettingsActionsTypesLines = 2;
if (workspaceSettingsActionsTypesLines > maxWorkspaceSettingsActionsTypesLines) {
  throw new Error(
    `workspace-settings-actions.types.ts exceeded ${maxWorkspaceSettingsActionsTypesLines} lines: ${workspaceSettingsActionsTypesLines}`,
  );
}

for (const requiredWorkspaceSettingsMemberActionsUsage of [
  'import type { CreateWorkspaceSettingsMemberActionsInput } from "./workspace-settings-member-actions.types";',
  "}: CreateWorkspaceSettingsMemberActionsInput) {",
]) {
  if (!workspaceSettingsMemberActionsSource.includes(requiredWorkspaceSettingsMemberActionsUsage)) {
    throw new Error(
      `workspace-settings-member-actions.ts must reuse the extracted settings-member action input type: ${requiredWorkspaceSettingsMemberActionsUsage}`,
    );
  }
}

for (const forbiddenWorkspaceSettingsMemberActionsToken of [
  'import type { UseWorkspaceSettingsControllerState } from "./workspace-settings-controller.types";',
  "}: {",
]) {
  if (workspaceSettingsMemberActionsSource.includes(forbiddenWorkspaceSettingsMemberActionsToken)) {
    throw new Error(
      `workspace-settings-member-actions.ts must keep settings-member action typing delegated: ${forbiddenWorkspaceSettingsMemberActionsToken}`,
    );
  }
}

for (const requiredWorkspaceSettingsMemberActionsTypesUsage of [
  'import type { UseWorkspaceSettingsControllerState } from "./workspace-settings-controller.types"; export type CreateWorkspaceSettingsMemberActionsInput = { state: UseWorkspaceSettingsControllerState; workspaceId: string };',
]) {
  if (!workspaceSettingsMemberActionsTypesSource.includes(requiredWorkspaceSettingsMemberActionsTypesUsage)) {
    throw new Error(
      `workspace-settings-member-actions.types.ts must own settings-member action typing: ${requiredWorkspaceSettingsMemberActionsTypesUsage}`,
    );
  }
}

const maxWorkspaceSettingsMemberActionsTypesLines = 2;
if (workspaceSettingsMemberActionsTypesLines > maxWorkspaceSettingsMemberActionsTypesLines) {
  throw new Error(
    `workspace-settings-member-actions.types.ts exceeded ${maxWorkspaceSettingsMemberActionsTypesLines} lines: ${workspaceSettingsMemberActionsTypesLines}`,
  );
}

for (const requiredWorkspaceSettingsProviderActionsUsage of [
  'import type { CreateWorkspaceSettingsProviderActionsInput } from "./workspace-settings-provider-actions.types";',
  "}: CreateWorkspaceSettingsProviderActionsInput) {",
]) {
  if (!workspaceSettingsProviderActionsSource.includes(requiredWorkspaceSettingsProviderActionsUsage)) {
    throw new Error(
      `workspace-settings-provider-actions.ts must reuse the extracted settings-provider action input type: ${requiredWorkspaceSettingsProviderActionsUsage}`,
    );
  }
}

for (const forbiddenWorkspaceSettingsProviderActionsToken of [
  '  UseWorkspaceSettingsControllerState,',
  "}: {",
]) {
  if (workspaceSettingsProviderActionsSource.includes(forbiddenWorkspaceSettingsProviderActionsToken)) {
    throw new Error(
      `workspace-settings-provider-actions.ts must keep settings-provider action typing delegated: ${forbiddenWorkspaceSettingsProviderActionsToken}`,
    );
  }
}

for (const requiredWorkspaceSettingsProviderActionsTypesUsage of [
  'import type { UseWorkspaceSettingsControllerState } from "./workspace-settings-controller.types"; export type CreateWorkspaceSettingsProviderActionsInput = { state: UseWorkspaceSettingsControllerState; workspaceId: string };',
]) {
  if (!workspaceSettingsProviderActionsTypesSource.includes(requiredWorkspaceSettingsProviderActionsTypesUsage)) {
    throw new Error(
      `workspace-settings-provider-actions.types.ts must own settings-provider action typing: ${requiredWorkspaceSettingsProviderActionsTypesUsage}`,
    );
  }
}

const maxWorkspaceSettingsProviderActionsTypesLines = 2;
if (workspaceSettingsProviderActionsTypesLines > maxWorkspaceSettingsProviderActionsTypesLines) {
  throw new Error(
    `workspace-settings-provider-actions.types.ts exceeded ${maxWorkspaceSettingsProviderActionsTypesLines} lines: ${workspaceSettingsProviderActionsTypesLines}`,
  );
}

for (const requiredProviderSettingsControllerActionsUsage of [
  'import type { CreateProviderSettingsControllerActionsInput } from "./provider-settings-controller-actions.types";',
  "}: CreateProviderSettingsControllerActionsInput) {",
]) {
  if (!providerSettingsControllerActionsSource.includes(requiredProviderSettingsControllerActionsUsage)) {
    throw new Error(
      `provider-settings-controller-actions.ts must reuse the extracted provider-settings action input type: ${requiredProviderSettingsControllerActionsUsage}`,
    );
  }
}

for (const forbiddenProviderSettingsControllerActionsToken of [
  "UseProviderSettingsControllerProps",
  "UseProviderSettingsControllerState",
  "}: Pick<",
]) {
  if (providerSettingsControllerActionsSource.includes(forbiddenProviderSettingsControllerActionsToken)) {
    throw new Error(
      `provider-settings-controller-actions.ts must keep provider-settings action typing delegated: ${forbiddenProviderSettingsControllerActionsToken}`,
    );
  }
}

for (const requiredProviderSettingsControllerActionsTypesUsage of [
  'import type { UseProviderSettingsControllerProps, UseProviderSettingsControllerState } from "./provider-settings-controller.types"; export type CreateProviderSettingsControllerActionsInput = Pick<UseProviderSettingsControllerProps, "onSaveProviderConfig"> & Pick<UseProviderSettingsControllerState, "providerDrafts" | "setError" | "setProviderDrafts" | "setProviderSavingCode">;',
]) {
  if (!providerSettingsControllerActionsTypesSource.includes(requiredProviderSettingsControllerActionsTypesUsage)) {
    throw new Error(
      `provider-settings-controller-actions.types.ts must own provider-settings action typing: ${requiredProviderSettingsControllerActionsTypesUsage}`,
    );
  }
}

const maxProviderSettingsControllerActionsTypesLines = 2;
if (providerSettingsControllerActionsTypesLines > maxProviderSettingsControllerActionsTypesLines) {
  throw new Error(
    `provider-settings-controller-actions.types.ts exceeded ${maxProviderSettingsControllerActionsTypesLines} lines: ${providerSettingsControllerActionsTypesLines}`,
  );
}

for (const requiredWorkspaceExportJobsActionsUsage of [
  'import type { CreateWorkspaceExportJobsActionsInput } from "./workspace-export-jobs-actions.types";',
  "}: CreateWorkspaceExportJobsActionsInput) {",
]) {
  if (!workspaceExportJobsActionsSource.includes(requiredWorkspaceExportJobsActionsUsage)) {
    throw new Error(
      `workspace-export-jobs-actions.ts must reuse the extracted export-jobs action types: ${requiredWorkspaceExportJobsActionsUsage}`,
    );
  }
}

for (const forbiddenWorkspaceExportJobsActionsToken of [
  "type WorkspaceExportJobsState = {",
  "type CreateWorkspaceExportJobsActionsInput = {",
]) {
  if (workspaceExportJobsActionsSource.includes(forbiddenWorkspaceExportJobsActionsToken)) {
    throw new Error(
      `workspace-export-jobs-actions.ts must keep export-jobs action typing delegated: ${forbiddenWorkspaceExportJobsActionsToken}`,
    );
  }
}

for (const requiredWorkspaceExportJobsActionsTypesUsage of [
  'import type { WorkspaceTransferJob } from "../lib/types";',
  'import type { UseWorkspaceExportJobsControllerProps } from "./use-workspace-export-jobs-controller.types";',
  "export type WorkspaceExportJobsState = {",
  "export type CreateWorkspaceExportJobsActionsInput = UseWorkspaceExportJobsControllerProps & { state: WorkspaceExportJobsState };",
]) {
  if (!workspaceExportJobsActionsTypesSource.includes(requiredWorkspaceExportJobsActionsTypesUsage)) {
    throw new Error(
      `workspace-export-jobs-actions.types.ts must own export-jobs action typing: ${requiredWorkspaceExportJobsActionsTypesUsage}`,
    );
  }
}

const maxWorkspaceExportJobsActionsTypesLines = 4;
if (workspaceExportJobsActionsTypesLines > maxWorkspaceExportJobsActionsTypesLines) {
  throw new Error(
    `workspace-export-jobs-actions.types.ts exceeded ${maxWorkspaceExportJobsActionsTypesLines} lines: ${workspaceExportJobsActionsTypesLines}`,
  );
}

for (const requiredChatPanelActionHandlerInputsUsage of [
  'import type {',
  'from "./chat-panel-action-handler-inputs.types";',
  'import type { ChatPanelActionDerivedData } from "./chat-panel-action-derived-data-result.types";',
  'import type { ChatPanelActionState } from "./chat-panel-action-state-result.types";',
  "}: BuildChatPanelOperatorHandlerInput) {",
  "}: BuildChatPanelShareHandlerInput) {",
  "}: BuildChatPanelActionsResultInput) {",
]) {
  if (!chatPanelActionHandlerInputsSource.includes(requiredChatPanelActionHandlerInputsUsage)) {
    throw new Error(
      `chat-panel-action-handler-inputs.ts must reuse chat action result boundaries: ${requiredChatPanelActionHandlerInputsUsage}`,
    );
  }
}

for (const forbiddenChatPanelActionHandlerInputsToken of [
  'import type { NotificationItem } from "../lib/types";',
  "export type UseChatPanelActionsProps = {",
  'from "./use-chat-panel-action-derived-data";',
  'from "./use-chat-panel-action-state";',
  "}: {",
  "ReturnType<typeof useChatPanelActionDerivedData>",
  "ReturnType<typeof useChatPanelActionState>",
]) {
  if (chatPanelActionHandlerInputsSource.includes(forbiddenChatPanelActionHandlerInputsToken)) {
    throw new Error(
      `chat-panel-action-handler-inputs.ts must keep hook result inference delegated: ${forbiddenChatPanelActionHandlerInputsToken}`,
    );
  }
}

for (const requiredChatPanelActionHandlerInputsTypesUsage of [
  'import type { NotificationItem } from "../lib/types"; import type { ChatPanelActionDerivedData } from "./chat-panel-action-derived-data-result.types"; import type { ChatPanelActionState } from "./chat-panel-action-state-result.types"; export type UseChatPanelActionsProps = { latestSharePath: string; notifications: NotificationItem[]; onCreateShareLink: (input: { name?: string; permission_code: string; max_uses?: number | null }) => Promise<void>; onDisableShareLink: (shareLinkId: string) => Promise<void>; onRefreshAuditLogs: () => Promise<void>; onReindexKnowledge: () => Promise<void>; onSyncNotifications: () => Promise<void>; onSendMessage: (message: string) => Promise<void> };',
  'export type BuildChatPanelOperatorHandlerInput = { props: UseChatPanelActionsProps; state: ChatPanelActionState }; export type BuildChatPanelShareHandlerInput = { props: UseChatPanelActionsProps; state: ChatPanelActionState }; export type BuildChatPanelActionsResultInput = { derivedData: ChatPanelActionDerivedData; operatorHandlers: { handleRefreshAuditLogs: () => Promise<void>; handleReindexKnowledge: () => Promise<void>; handleSend: () => Promise<void>; handleSyncNotifications: () => Promise<void> }; shareHandlers: { handleCreateShareLink: () => Promise<void>; handleDisableShareLink: (shareLinkId: string) => Promise<void> }; state: ChatPanelActionState };',
]) {
  if (!chatPanelActionHandlerInputsTypesSource.includes(requiredChatPanelActionHandlerInputsTypesUsage)) {
    throw new Error(
      `chat-panel-action-handler-inputs.types.ts must own chat action handler input typing: ${requiredChatPanelActionHandlerInputsTypesUsage}`,
    );
  }
}

const maxChatPanelActionHandlerInputsTypesLines = 3;
if (chatPanelActionHandlerInputsTypesLines > maxChatPanelActionHandlerInputsTypesLines) {
  throw new Error(
    `chat-panel-action-handler-inputs.types.ts exceeded ${maxChatPanelActionHandlerInputsTypesLines} lines: ${chatPanelActionHandlerInputsTypesLines}`,
  );
}

for (const requiredChatPanelActionHelpersUsage of [
  'import type { BuildCreateShareLinkInput } from "./chat-panel-action-helpers.types";',
  "}: BuildCreateShareLinkInput) {",
]) {
  if (!chatPanelActionHelpersSource.includes(requiredChatPanelActionHelpersUsage)) {
    throw new Error(
      `chat-panel-action-helpers.ts must reuse the extracted chat action-helper input type: ${requiredChatPanelActionHelpersUsage}`,
    );
  }
}

if (chatPanelActionHelpersSource.includes("}: {")) {
  throw new Error("chat-panel-action-helpers.ts must keep action-helper input typing delegated");
}

for (const requiredChatPanelActionHelpersTypesUsage of [
  'export type BuildCreateShareLinkInput = { shareMaxUses: string; shareName: string; sharePermission: string };',
]) {
  if (!chatPanelActionHelpersTypesSource.includes(requiredChatPanelActionHelpersTypesUsage)) {
    throw new Error(
      `chat-panel-action-helpers.types.ts must own chat action-helper input typing: ${requiredChatPanelActionHelpersTypesUsage}`,
    );
  }
}

const maxChatPanelActionHelpersTypesLines = 2;
if (chatPanelActionHelpersTypesLines > maxChatPanelActionHelpersTypesLines) {
  throw new Error(
    `chat-panel-action-helpers.types.ts exceeded ${maxChatPanelActionHelpersTypesLines} lines: ${chatPanelActionHelpersTypesLines}`,
  );
}

for (const requiredChatPanelOperatorHandlersUsage of [
  'import type { CreateChatPanelOperatorHandlersInput } from "./chat-panel-operator-handlers.types";',
  "}: CreateChatPanelOperatorHandlersInput) {",
]) {
  if (!chatPanelOperatorHandlersSource.includes(requiredChatPanelOperatorHandlersUsage)) {
    throw new Error(
      `chat-panel-operator-handlers.ts must reuse the extracted operator-handler input type: ${requiredChatPanelOperatorHandlersUsage}`,
    );
  }
}

if (chatPanelOperatorHandlersSource.includes("}: {")) {
  throw new Error(
    "chat-panel-operator-handlers.ts must keep operator-handler input typing delegated",
  );
}

for (const requiredChatPanelOperatorHandlersTypesUsage of [
  'export type CreateChatPanelOperatorHandlersInput = { draft: string; onRefreshAuditLogs: () => Promise<void>; onReindexKnowledge: () => Promise<void>; onSendMessage: (message: string) => Promise<void>; onSyncNotifications: () => Promise<void>; setDraft: (value: string) => void; setError: (value: string) => void; setLoading: (value: boolean) => void; setRefreshingAudit: (value: boolean) => void; setReindexing: (value: boolean) => void; setSyncing: (value: boolean) => void };',
]) {
  if (!chatPanelOperatorHandlersTypesSource.includes(requiredChatPanelOperatorHandlersTypesUsage)) {
    throw new Error(
      `chat-panel-operator-handlers.types.ts must own operator-handler input typing: ${requiredChatPanelOperatorHandlersTypesUsage}`,
    );
  }
}

const maxChatPanelOperatorHandlersTypesLines = 2;
if (chatPanelOperatorHandlersTypesLines > maxChatPanelOperatorHandlersTypesLines) {
  throw new Error(
    `chat-panel-operator-handlers.types.ts exceeded ${maxChatPanelOperatorHandlersTypesLines} lines: ${chatPanelOperatorHandlersTypesLines}`,
  );
}

for (const requiredUseChatPanelActionsUsage of [
  'import type { UseChatPanelActionsProps } from "./chat-panel-action-handler-inputs.types";',
  "export function useChatPanelActions(props: UseChatPanelActionsProps) {",
]) {
  if (!useChatPanelActionsSource.includes(requiredUseChatPanelActionsUsage)) {
    throw new Error(
      `use-chat-panel-actions.ts must reuse the extracted chat action props boundary: ${requiredUseChatPanelActionsUsage}`,
    );
  }
}

if (useChatPanelActionsSource.includes('type UseChatPanelActionsProps,')) {
  throw new Error("use-chat-panel-actions.ts must keep chat action props typing delegated");
}

for (const requiredChatPanelShareHandlersUsage of [
  'import type { CreateChatPanelShareHandlersInput } from "./chat-panel-share-handlers.types";',
  "}: CreateChatPanelShareHandlersInput) {",
]) {
  if (!chatPanelShareHandlersSource.includes(requiredChatPanelShareHandlersUsage)) {
    throw new Error(
      `chat-panel-share-handlers.ts must reuse the extracted share-handler input type: ${requiredChatPanelShareHandlersUsage}`,
    );
  }
}

if (chatPanelShareHandlersSource.includes("}: {")) {
  throw new Error("chat-panel-share-handlers.ts must keep share-handler input typing delegated");
}

for (const requiredChatPanelShareHandlersTypesUsage of [
  'import type { UseChatPanelActionsProps } from "./chat-panel-action-handler-inputs.types"; export type CreateChatPanelShareHandlersInput = { onCreateShareLink: UseChatPanelActionsProps["onCreateShareLink"]; onDisableShareLink: UseChatPanelActionsProps["onDisableShareLink"]; setCreatingShare: (value: boolean) => void; setDisablingShareId: (value: string) => void; setError: (value: string) => void; setShareMaxUses: (value: string) => void; setShareName: (value: string) => void; shareMaxUses: string; shareName: string; sharePermission: string };',
]) {
  if (!chatPanelShareHandlersTypesSource.includes(requiredChatPanelShareHandlersTypesUsage)) {
    throw new Error(
      `chat-panel-share-handlers.types.ts must own share-handler input typing: ${requiredChatPanelShareHandlersTypesUsage}`,
    );
  }
}

const maxChatPanelShareHandlersTypesLines = 2;
if (chatPanelShareHandlersTypesLines > maxChatPanelShareHandlersTypesLines) {
  throw new Error(
    `chat-panel-share-handlers.types.ts exceeded ${maxChatPanelShareHandlersTypesLines} lines: ${chatPanelShareHandlersTypesLines}`,
  );
}

for (const requiredChatPanelContentPropsUsage of [
  'import type { BuildChatPanelContentPropsInput } from "./chat-panel-content-props.types";',
  'import type { ChatPanelActions } from "./chat-panel-actions-result.types";',
  "}: BuildChatPanelContentPropsInput): ChatPanelContentProps {",
]) {
  if (!chatPanelContentPropsSource.includes(requiredChatPanelContentPropsUsage)) {
    throw new Error(
      `chat-panel-content-props.ts must reuse the chat actions result boundary: ${requiredChatPanelContentPropsUsage}`,
    );
  }
}

for (const forbiddenChatPanelContentPropsToken of [
  'import type { ChatPanelProps } from "./chat-panel.types";',
  "ReturnType<typeof import(",
  'from "./use-chat-panel-actions"',
  "}: {",
]) {
  if (chatPanelContentPropsSource.includes(forbiddenChatPanelContentPropsToken)) {
    throw new Error(
      `chat-panel-content-props.ts must keep chat action inference delegated: ${forbiddenChatPanelContentPropsToken}`,
    );
  }
}

for (const requiredChatPanelContentPropsTypesUsage of [
  'import type { ChatPanelActions } from "./chat-panel-actions-result.types"; import type { ChatPanelProps } from "./chat-panel.types"; export type BuildChatPanelContentPropsInput = { actions: ChatPanelActions; props: ChatPanelProps };',
]) {
  if (!chatPanelContentPropsTypesSource.includes(requiredChatPanelContentPropsTypesUsage)) {
    throw new Error(
      `chat-panel-content-props.types.ts must own chat content-props input typing: ${requiredChatPanelContentPropsTypesUsage}`,
    );
  }
}

const maxChatPanelContentPropsTypesLines = 2;
if (chatPanelContentPropsTypesLines > maxChatPanelContentPropsTypesLines) {
  throw new Error(
    `chat-panel-content-props.types.ts exceeded ${maxChatPanelContentPropsTypesLines} lines: ${chatPanelContentPropsTypesLines}`,
  );
}

for (const requiredChatPanelContentTypesUsage of [
  'import type { ChatPanelActions } from "./chat-panel-actions-result.types";',
  "ChatPanelActions;",
]) {
  if (!chatPanelContentTypesSource.includes(requiredChatPanelContentTypesUsage)) {
    throw new Error(
      `chat-panel-content.types.ts must reuse the chat actions result boundary: ${requiredChatPanelContentTypesUsage}`,
    );
  }
}

for (const forbiddenChatPanelContentTypesToken of [
  "ReturnType<",
  'from "./use-chat-panel-actions"',
]) {
  if (chatPanelContentTypesSource.includes(forbiddenChatPanelContentTypesToken)) {
    throw new Error(
      `chat-panel-content.types.ts must keep chat action inference delegated: ${forbiddenChatPanelContentTypesToken}`,
    );
  }
}

for (const requiredChatPanelActionDerivedDataResultTypesUsage of [
  'import type { useChatPanelActionDerivedData } from "./use-chat-panel-action-derived-data";',
  "export type ChatPanelActionDerivedData = ReturnType<typeof useChatPanelActionDerivedData>;",
]) {
  if (!chatPanelActionDerivedDataResultTypesSource.includes(requiredChatPanelActionDerivedDataResultTypesUsage)) {
    throw new Error(
      `chat-panel-action-derived-data-result.types.ts must own the derived-data result boundary: ${requiredChatPanelActionDerivedDataResultTypesUsage}`,
    );
  }
}

const maxChatPanelActionDerivedDataResultTypesLines = 3;
if (chatPanelActionDerivedDataResultTypesLines > maxChatPanelActionDerivedDataResultTypesLines) {
  throw new Error(
    `chat-panel-action-derived-data-result.types.ts exceeded ${maxChatPanelActionDerivedDataResultTypesLines} lines: ${chatPanelActionDerivedDataResultTypesLines}`,
  );
}

for (const requiredUseChatPanelActionDerivedDataUsage of [
  'import type { UseChatPanelActionDerivedDataInput } from "./use-chat-panel-action-derived-data.types";',
  "}: UseChatPanelActionDerivedDataInput) {",
]) {
  if (!useChatPanelActionDerivedDataSource.includes(requiredUseChatPanelActionDerivedDataUsage)) {
    throw new Error(
      `use-chat-panel-action-derived-data.ts must reuse the extracted derived-data input type: ${requiredUseChatPanelActionDerivedDataUsage}`,
    );
  }
}

for (const forbiddenUseChatPanelActionDerivedDataToken of [
  'import type { NotificationItem } from "../lib/types";',
  "}: {",
]) {
  if (useChatPanelActionDerivedDataSource.includes(forbiddenUseChatPanelActionDerivedDataToken)) {
    throw new Error(
      `use-chat-panel-action-derived-data.ts must keep derived-data input typing delegated: ${forbiddenUseChatPanelActionDerivedDataToken}`,
    );
  }
}

for (const requiredUseChatPanelActionDerivedDataTypesUsage of [
  'import type { NotificationItem } from "../lib/types"; export type UseChatPanelActionDerivedDataInput = { latestSharePath: string; notifications: NotificationItem[] };',
]) {
  if (!useChatPanelActionDerivedDataTypesSource.includes(requiredUseChatPanelActionDerivedDataTypesUsage)) {
    throw new Error(
      `use-chat-panel-action-derived-data.types.ts must own derived-data input typing: ${requiredUseChatPanelActionDerivedDataTypesUsage}`,
    );
  }
}

const maxUseChatPanelActionDerivedDataTypesLines = 2;
if (useChatPanelActionDerivedDataTypesLines > maxUseChatPanelActionDerivedDataTypesLines) {
  throw new Error(
    `use-chat-panel-action-derived-data.types.ts exceeded ${maxUseChatPanelActionDerivedDataTypesLines} lines: ${useChatPanelActionDerivedDataTypesLines}`,
  );
}

for (const requiredChatPanelActionStateResultTypesUsage of [
  'import type { useChatPanelActionState } from "./use-chat-panel-action-state";',
  "export type ChatPanelActionState = ReturnType<typeof useChatPanelActionState>;",
]) {
  if (!chatPanelActionStateResultTypesSource.includes(requiredChatPanelActionStateResultTypesUsage)) {
    throw new Error(
      `chat-panel-action-state-result.types.ts must own the state result boundary: ${requiredChatPanelActionStateResultTypesUsage}`,
    );
  }
}

const maxChatPanelActionStateResultTypesLines = 3;
if (chatPanelActionStateResultTypesLines > maxChatPanelActionStateResultTypesLines) {
  throw new Error(
    `chat-panel-action-state-result.types.ts exceeded ${maxChatPanelActionStateResultTypesLines} lines: ${chatPanelActionStateResultTypesLines}`,
  );
}

for (const requiredChatPanelActionsResultTypesUsage of [
  'import type { useChatPanelActions } from "./use-chat-panel-actions";',
  "export type ChatPanelActions = ReturnType<typeof useChatPanelActions>;",
]) {
  if (!chatPanelActionsResultTypesSource.includes(requiredChatPanelActionsResultTypesUsage)) {
    throw new Error(
      `chat-panel-actions-result.types.ts must own the actions result boundary: ${requiredChatPanelActionsResultTypesUsage}`,
    );
  }
}

const maxChatPanelActionsResultTypesLines = 3;
if (chatPanelActionsResultTypesLines > maxChatPanelActionsResultTypesLines) {
  throw new Error(
    `chat-panel-actions-result.types.ts exceeded ${maxChatPanelActionsResultTypesLines} lines: ${chatPanelActionsResultTypesLines}`,
  );
}

for (const requiredChatMessageThreadUsage of [
  'import type { ChatMessageThreadProps } from "./chat-message-thread.types";',
  "}: ChatMessageThreadProps) {",
]) {
  if (!chatMessageThreadSource.includes(requiredChatMessageThreadUsage)) {
    throw new Error(
      `chat-message-thread.tsx must reuse the extracted message-thread props type: ${requiredChatMessageThreadUsage}`,
    );
  }
}

if (chatMessageThreadSource.includes("messages }: { messages: ChatMessage[] }")) {
  throw new Error("chat-message-thread.tsx must keep message-thread prop typing delegated");
}

for (const requiredChatMessageThreadTypesUsage of [
  'import type { ChatMessage } from "../lib/types"; export type ChatMessageThreadProps = { messages: ChatMessage[] };',
]) {
  if (!chatMessageThreadTypesSource.includes(requiredChatMessageThreadTypesUsage)) {
    throw new Error(
      `chat-message-thread.types.ts must own message-thread prop typing: ${requiredChatMessageThreadTypesUsage}`,
    );
  }
}

const maxChatMessageThreadTypesLines = 2;
if (chatMessageThreadTypesLines > maxChatMessageThreadTypesLines) {
  throw new Error(
    `chat-message-thread.types.ts exceeded ${maxChatMessageThreadTypesLines} lines: ${chatMessageThreadTypesLines}`,
  );
}

for (const requiredChatPanelHeaderUsage of [
  'import type { ChatPanelHeaderProps } from "./chat-panel-header.types";',
  "}: ChatPanelHeaderProps) {",
]) {
  if (!chatPanelHeaderSource.includes(requiredChatPanelHeaderUsage)) {
    throw new Error(
      `chat-panel-header.tsx must reuse the extracted panel-header props type: ${requiredChatPanelHeaderUsage}`,
    );
  }
}

if (chatPanelHeaderSource.includes("type ChatPanelHeaderProps = {")) {
  throw new Error("chat-panel-header.tsx must keep panel-header prop typing delegated");
}

for (const requiredChatPanelHeaderTypesUsage of [
  'import type { ChatPanelProps } from "./chat-panel.types"; export type ChatPanelHeaderProps = Pick<ChatPanelProps, "canManageWorkspace" | "workspaceId" | "workspaceRole">;',
]) {
  if (!chatPanelHeaderTypesSource.includes(requiredChatPanelHeaderTypesUsage)) {
    throw new Error(
      `chat-panel-header.types.ts must own panel-header prop typing: ${requiredChatPanelHeaderTypesUsage}`,
    );
  }
}

const maxChatPanelHeaderTypesLines = 2;
if (chatPanelHeaderTypesLines > maxChatPanelHeaderTypesLines) {
  throw new Error(
    `chat-panel-header.types.ts exceeded ${maxChatPanelHeaderTypesLines} lines: ${chatPanelHeaderTypesLines}`,
  );
}

for (const requiredChatPanelComposerUsage of [
  'import type { ChatPanelComposerProps } from "./chat-panel-composer.types";',
  "}: ChatPanelComposerProps) {",
]) {
  if (!chatPanelComposerSource.includes(requiredChatPanelComposerUsage)) {
    throw new Error(
      `chat-panel-composer.tsx must reuse the extracted panel-composer props type: ${requiredChatPanelComposerUsage}`,
    );
  }
}

if (chatPanelComposerSource.includes("type ChatPanelComposerProps = {")) {
  throw new Error("chat-panel-composer.tsx must keep panel-composer prop typing delegated");
}

for (const requiredChatPanelComposerTypesUsage of [
  'export type ChatPanelComposerProps = { canWriteWorkspace: boolean; draft: string; error: string; loading: boolean; setDraft: (value: string) => void; onSend: () => void };',
]) {
  if (!chatPanelComposerTypesSource.includes(requiredChatPanelComposerTypesUsage)) {
    throw new Error(
      `chat-panel-composer.types.ts must own panel-composer prop typing: ${requiredChatPanelComposerTypesUsage}`,
    );
  }
}

const maxChatPanelComposerTypesLines = 2;
if (chatPanelComposerTypesLines > maxChatPanelComposerTypesLines) {
  throw new Error(
    `chat-panel-composer.types.ts exceeded ${maxChatPanelComposerTypesLines} lines: ${chatPanelComposerTypesLines}`,
  );
}

for (const requiredChatConversationBarUsage of [
  'import type { ChatConversationBarProps } from "./chat-conversation-bar.types";',
  "}: ChatConversationBarProps) {",
]) {
  if (!chatConversationBarSource.includes(requiredChatConversationBarUsage)) {
    throw new Error(
      `chat-conversation-bar.tsx must reuse the extracted conversation-bar props type: ${requiredChatConversationBarUsage}`,
    );
  }
}

for (const forbiddenChatConversationBarToken of [
  'import type { Conversation } from "../lib/types";',
  "}: {",
]) {
  if (chatConversationBarSource.includes(forbiddenChatConversationBarToken)) {
    throw new Error(
      `chat-conversation-bar.tsx must keep conversation-bar prop typing delegated: ${forbiddenChatConversationBarToken}`,
    );
  }
}

for (const requiredChatConversationBarTypesUsage of [
  'import type { ChatPanelConversationContentProps } from "./chat-panel-content.types"; export type ChatConversationBarProps = Pick<ChatPanelConversationContentProps, "activeConversationId" | "canWriteWorkspace" | "conversations" | "onCreateConversation" | "onSelectConversation" | "syncing"> & { onSyncNotifications: ChatPanelConversationContentProps["handleSyncNotifications"] };',
]) {
  if (!chatConversationBarTypesSource.includes(requiredChatConversationBarTypesUsage)) {
    throw new Error(
      `chat-conversation-bar.types.ts must own conversation-bar prop typing: ${requiredChatConversationBarTypesUsage}`,
    );
  }
}

const maxChatConversationBarTypesLines = 2;
if (chatConversationBarTypesLines > maxChatConversationBarTypesLines) {
  throw new Error(
    `chat-conversation-bar.types.ts exceeded ${maxChatConversationBarTypesLines} lines: ${chatConversationBarTypesLines}`,
  );
}

for (const requiredChatMessageSourcesUsage of [
  'import type { ChatMessageSource, ChatMessageSourcesProps } from "./chat-message-sources.types";',
  "}: ChatMessageSourcesProps) {",
]) {
  if (!chatMessageSourcesSource.includes(requiredChatMessageSourcesUsage)) {
    throw new Error(
      `chat-message-sources.tsx must reuse the extracted message-sources types: ${requiredChatMessageSourcesUsage}`,
    );
  }
}

for (const forbiddenChatMessageSourcesToken of [
  "type ChatMessageSource = {",
  "}: {",
]) {
  if (chatMessageSourcesSource.includes(forbiddenChatMessageSourcesToken)) {
    throw new Error(
      `chat-message-sources.tsx must keep message-sources typing delegated: ${forbiddenChatMessageSourcesToken}`,
    );
  }
}

for (const requiredChatMessageSourcesTypesUsage of [
  'export type ChatMessageSource = { record_title?: string; source_label?: string; source_type?: string; snippet?: string; score?: number }; export type ChatMessageSourcesProps = { messageId: string; sources: unknown[] };',
]) {
  if (!chatMessageSourcesTypesSource.includes(requiredChatMessageSourcesTypesUsage)) {
    throw new Error(
      `chat-message-sources.types.ts must own message-sources typing: ${requiredChatMessageSourcesTypesUsage}`,
    );
  }
}

const maxChatMessageSourcesTypesLines = 2;
if (chatMessageSourcesTypesLines > maxChatMessageSourcesTypesLines) {
  throw new Error(
    `chat-message-sources.types.ts exceeded ${maxChatMessageSourcesTypesLines} lines: ${chatMessageSourcesTypesLines}`,
  );
}

for (const requiredChatAuditLogsCardUsage of [
  'import type { ChatAuditLogsCardProps } from "./chat-audit-logs-card.types";',
  "}: ChatAuditLogsCardProps) {",
]) {
  if (!chatAuditLogsCardSource.includes(requiredChatAuditLogsCardUsage)) {
    throw new Error(
      `chat-audit-logs-card.tsx must reuse the extracted audit-logs props type: ${requiredChatAuditLogsCardUsage}`,
    );
  }
}

for (const forbiddenChatAuditLogsCardToken of [
  'import type { AuditLogItem } from "../lib/types";',
  "}: {",
]) {
  if (chatAuditLogsCardSource.includes(forbiddenChatAuditLogsCardToken)) {
    throw new Error(
      `chat-audit-logs-card.tsx must keep audit-logs prop typing delegated: ${forbiddenChatAuditLogsCardToken}`,
    );
  }
}

for (const requiredChatAuditLogsCardTypesUsage of [
  'import type { ChatPanelManagementContentProps } from "./chat-panel-content.types"; export type ChatAuditLogsCardProps = Pick<ChatPanelManagementContentProps, "auditLogs" | "refreshingAudit"> & { onRefreshAuditLogs: ChatPanelManagementContentProps["handleRefreshAuditLogs"] };',
]) {
  if (!chatAuditLogsCardTypesSource.includes(requiredChatAuditLogsCardTypesUsage)) {
    throw new Error(
      `chat-audit-logs-card.types.ts must own audit-logs prop typing: ${requiredChatAuditLogsCardTypesUsage}`,
    );
  }
}

const maxChatAuditLogsCardTypesLines = 2;
if (chatAuditLogsCardTypesLines > maxChatAuditLogsCardTypesLines) {
  throw new Error(
    `chat-audit-logs-card.types.ts exceeded ${maxChatAuditLogsCardTypesLines} lines: ${chatAuditLogsCardTypesLines}`,
  );
}

for (const requiredChatKnowledgeCardUsage of [
  'import type { ChatKnowledgeCardProps } from "./chat-knowledge-card.types";',
  "}: ChatKnowledgeCardProps) {",
]) {
  if (!chatKnowledgeCardSource.includes(requiredChatKnowledgeCardUsage)) {
    throw new Error(
      `chat-knowledge-card.tsx must reuse the extracted knowledge-card props type: ${requiredChatKnowledgeCardUsage}`,
    );
  }
}

for (const forbiddenChatKnowledgeCardToken of [
  'import type { KnowledgeStats } from "../lib/types";',
  "}: {",
]) {
  if (chatKnowledgeCardSource.includes(forbiddenChatKnowledgeCardToken)) {
    throw new Error(
      `chat-knowledge-card.tsx must keep knowledge-card prop typing delegated: ${forbiddenChatKnowledgeCardToken}`,
    );
  }
}

for (const requiredChatKnowledgeCardTypesUsage of [
  'import type { ChatPanelManagementSectionProps } from "./chat-panel-management-section.types"; export type ChatKnowledgeCardProps = Pick<ChatPanelManagementSectionProps, "canManageWorkspace" | "knowledgeStats" | "onReindexKnowledge" | "reindexing">;',
]) {
  if (!chatKnowledgeCardTypesSource.includes(requiredChatKnowledgeCardTypesUsage)) {
    throw new Error(
      `chat-knowledge-card.types.ts must own knowledge-card prop typing: ${requiredChatKnowledgeCardTypesUsage}`,
    );
  }
}

const maxChatKnowledgeCardTypesLines = 2;
if (chatKnowledgeCardTypesLines > maxChatKnowledgeCardTypesLines) {
  throw new Error(
    `chat-knowledge-card.types.ts exceeded ${maxChatKnowledgeCardTypesLines} lines: ${chatKnowledgeCardTypesLines}`,
  );
}

for (const requiredChatNotificationsCardUsage of [
  'import type { ChatNotificationsCardProps } from "./chat-notifications-card.types";',
  "}: ChatNotificationsCardProps) {",
]) {
  if (!chatNotificationsCardSource.includes(requiredChatNotificationsCardUsage)) {
    throw new Error(
      `chat-notifications-card.tsx must reuse the extracted notifications-card props type: ${requiredChatNotificationsCardUsage}`,
    );
  }
}

for (const forbiddenChatNotificationsCardToken of [
  'import type { NotificationItem } from "../lib/types";',
  "}: {",
]) {
  if (chatNotificationsCardSource.includes(forbiddenChatNotificationsCardToken)) {
    throw new Error(
      `chat-notifications-card.tsx must keep notifications-card prop typing delegated: ${forbiddenChatNotificationsCardToken}`,
    );
  }
}

for (const requiredChatNotificationsCardTypesUsage of [
  'import type { ChatPanelManagementContentProps } from "./chat-panel-content.types"; export type ChatNotificationsCardProps = Pick<ChatPanelManagementContentProps, "notifications" | "onMarkNotificationRead" | "unreadCount">;',
]) {
  if (!chatNotificationsCardTypesSource.includes(requiredChatNotificationsCardTypesUsage)) {
    throw new Error(
      `chat-notifications-card.types.ts must own notifications-card prop typing: ${requiredChatNotificationsCardTypesUsage}`,
    );
  }
}

const maxChatNotificationsCardTypesLines = 2;
if (chatNotificationsCardTypesLines > maxChatNotificationsCardTypesLines) {
  throw new Error(
    `chat-notifications-card.types.ts exceeded ${maxChatNotificationsCardTypesLines} lines: ${chatNotificationsCardTypesLines}`,
  );
}

for (const requiredChatShareLinksCardUsage of [
  'import { ChatShareLinksCreateForm } from "./chat-share-links-create-form";',
  'import { ChatShareLinkListItem } from "./chat-share-link-list-item";',
  'import type { ChatShareLinksCardProps } from "./chat-share-links-card.types";',
  "}: ChatShareLinksCardProps) {",
  "<ChatShareLinksCreateForm",
  "<ChatShareLinkListItem",
]) {
  if (!chatShareLinksCardSource.includes(requiredChatShareLinksCardUsage)) {
    throw new Error(
      `chat-share-links-card.tsx must reuse the extracted share-links props type: ${requiredChatShareLinksCardUsage}`,
    );
  }
}

for (const forbiddenChatShareLinksCardToken of [
  'import type { ShareLinkItem } from "../lib/types";',
  "}: {",
  'placeholder="Share name"',
  'placeholder="Max uses"',
  'item.permission_code} / {item.is_enabled ? "enabled" : "disabled"',
  'onClick={() => void onDisableShareLink(item.id)}',
]) {
  if (chatShareLinksCardSource.includes(forbiddenChatShareLinksCardToken)) {
    throw new Error(
      `chat-share-links-card.tsx must keep share-links prop typing delegated: ${forbiddenChatShareLinksCardToken}`,
    );
  }
}

for (const requiredChatShareLinksCardTypesUsage of [
  'import type { ChatPanelManagementSectionProps } from "./chat-panel-management-section.types"; export type ChatShareLinksCardProps = Pick<ChatPanelManagementSectionProps, "creatingShare" | "disablingShareId" | "latestShareUrl" | "onCreateShareLink" | "onDisableShareLink" | "setShareMaxUses" | "setShareName" | "setSharePermission" | "shareLinks" | "shareMaxUses" | "shareName" | "sharePermission">;',
]) {
  if (!chatShareLinksCardTypesSource.includes(requiredChatShareLinksCardTypesUsage)) {
    throw new Error(
      `chat-share-links-card.types.ts must own share-links prop typing: ${requiredChatShareLinksCardTypesUsage}`,
    );
  }
}

const maxChatShareLinksCardTypesLines = 2;
if (chatShareLinksCardTypesLines > maxChatShareLinksCardTypesLines) {
  throw new Error(
    `chat-share-links-card.types.ts exceeded ${maxChatShareLinksCardTypesLines} lines: ${chatShareLinksCardTypesLines}`,
  );
}

for (const requiredChatShareLinksCreateFormUsage of [
  'import type { ChatShareLinksCreateFormProps } from "./chat-share-links-create-form.types";',
  "}: ChatShareLinksCreateFormProps) {",
  'placeholder="Share name"',
  'placeholder="Max uses"',
  'setShareMaxUses(event.target.value.replace(/[^0-9]/g, ""))',
]) {
  if (!chatShareLinksCreateFormSource.includes(requiredChatShareLinksCreateFormUsage)) {
    throw new Error(
      `chat-share-links-create-form.tsx must own share-link create form rendering: ${requiredChatShareLinksCreateFormUsage}`,
    );
  }
}

const maxChatShareLinksCreateFormLines = 50;
if (chatShareLinksCreateFormLines > maxChatShareLinksCreateFormLines) {
  throw new Error(
    `chat-share-links-create-form.tsx exceeded ${maxChatShareLinksCreateFormLines} lines: ${chatShareLinksCreateFormLines}`,
  );
}

for (const requiredChatShareLinksCreateFormTypesUsage of [
  'import type { ChatShareLinksCardProps } from "./chat-share-links-card.types"; export type ChatShareLinksCreateFormProps = Pick<ChatShareLinksCardProps, "creatingShare" | "onCreateShareLink" | "setShareMaxUses" | "setShareName" | "setSharePermission" | "shareMaxUses" | "shareName" | "sharePermission">;',
]) {
  if (!chatShareLinksCreateFormTypesSource.includes(requiredChatShareLinksCreateFormTypesUsage)) {
    throw new Error(
      `chat-share-links-create-form.types.ts must own share-link create-form prop typing: ${requiredChatShareLinksCreateFormTypesUsage}`,
    );
  }
}

const maxChatShareLinksCreateFormTypesLines = 2;
if (chatShareLinksCreateFormTypesLines > maxChatShareLinksCreateFormTypesLines) {
  throw new Error(
    `chat-share-links-create-form.types.ts exceeded ${maxChatShareLinksCreateFormTypesLines} lines: ${chatShareLinksCreateFormTypesLines}`,
  );
}

for (const requiredChatShareLinkListItemUsage of [
  'import type { ChatShareLinkListItemProps } from "./chat-share-link-list-item.types";',
  "}: ChatShareLinkListItemProps) {",
  'item.permission_code} / {item.is_enabled ? "enabled" : "disabled"',
  'onClick={() => void onDisableShareLink(item.id)}',
]) {
  if (!chatShareLinkListItemSource.includes(requiredChatShareLinkListItemUsage)) {
    throw new Error(
      `chat-share-link-list-item.tsx must own share-link item rendering: ${requiredChatShareLinkListItemUsage}`,
    );
  }
}

const maxChatShareLinkListItemLines = 35;
if (chatShareLinkListItemLines > maxChatShareLinkListItemLines) {
  throw new Error(
    `chat-share-link-list-item.tsx exceeded ${maxChatShareLinkListItemLines} lines: ${chatShareLinkListItemLines}`,
  );
}

for (const requiredChatShareLinkListItemTypesUsage of [
  'import type { ChatShareLinksCardProps } from "./chat-share-links-card.types"; export type ChatShareLinkListItemProps = Pick<ChatShareLinksCardProps, "disablingShareId" | "onDisableShareLink"> & { item: ChatShareLinksCardProps["shareLinks"][number] };',
]) {
  if (!chatShareLinkListItemTypesSource.includes(requiredChatShareLinkListItemTypesUsage)) {
    throw new Error(
      `chat-share-link-list-item.types.ts must own share-link item prop typing: ${requiredChatShareLinkListItemTypesUsage}`,
    );
  }
}

const maxChatShareLinkListItemTypesLines = 2;
if (chatShareLinkListItemTypesLines > maxChatShareLinkListItemTypesLines) {
  throw new Error(
    `chat-share-link-list-item.types.ts exceeded ${maxChatShareLinkListItemTypesLines} lines: ${chatShareLinkListItemTypesLines}`,
  );
}

for (const requiredAuthFormFrameUsage of [
  'import type { AuthFormFrameProps } from "./auth-form-frame.types";',
  "}: AuthFormFrameProps) {",
]) {
  if (!authFormFrameSource.includes(requiredAuthFormFrameUsage)) {
    throw new Error(
      `auth-form-frame.tsx must reuse the extracted auth-frame props type: ${requiredAuthFormFrameUsage}`,
    );
  }
}

for (const forbiddenAuthFormFrameToken of [
  'import type { ReactNode } from "react";',
  'import type { LocaleCode } from "../lib/locale";',
  "type AuthFormFrameProps = {",
]) {
  if (authFormFrameSource.includes(forbiddenAuthFormFrameToken)) {
    throw new Error(
      `auth-form-frame.tsx must keep auth-frame prop typing delegated: ${forbiddenAuthFormFrameToken}`,
    );
  }
}

for (const requiredAuthFormFrameTypesUsage of [
  'import type { ReactNode } from "react"; import type { LocaleCode } from "../lib/locale"; export type AuthFormFrameProps = { alternateHref: string; alternateLabel: string; children: ReactNode; eyebrow: string; locale: LocaleCode; onLocaleChange: (locale: LocaleCode) => void; title: string };',
]) {
  if (!authFormFrameTypesSource.includes(requiredAuthFormFrameTypesUsage)) {
    throw new Error(
      `auth-form-frame.types.ts must own auth-frame prop typing: ${requiredAuthFormFrameTypesUsage}`,
    );
  }
}

const maxAuthFormFrameTypesLines = 2;
if (authFormFrameTypesLines > maxAuthFormFrameTypesLines) {
  throw new Error(
    `auth-form-frame.types.ts exceeded ${maxAuthFormFrameTypesLines} lines: ${authFormFrameTypesLines}`,
  );
}

for (const requiredMediaAssetCardMetadataUsage of [
  'import { MediaAssetCardMetadataDetails } from "./media-asset-card-metadata-details";',
  'import { MediaAssetCardMetadataTags } from "./media-asset-card-metadata-tags";',
  'import type { MediaAssetCardMetadataProps } from "./media-asset-card-metadata.types";',
  "}: MediaAssetCardMetadataProps) {",
  "<MediaAssetCardMetadataDetails",
  "<MediaAssetCardMetadataTags",
]) {
  if (!mediaAssetCardMetadataSource.includes(requiredMediaAssetCardMetadataUsage)) {
    throw new Error(
      `media-asset-card-metadata.tsx must reuse the extracted metadata props type: ${requiredMediaAssetCardMetadataUsage}`,
    );
  }
}

for (const forbiddenMediaAssetCardMetadataToken of [
  'import { formatMediaSize } from "../lib/record-panel-format";',
  'import type { MediaIssueCopy } from "../lib/record-panel-ui";',
  'import type { MediaAsset } from "../lib/types";',
  "type MediaAssetCardMetadataProps = {",
  '<div className="tag-row">',
  "{asset.processing_status}",
  "{asset.storage_provider}",
  "{formatMediaSize(asset)}",
  '<div className="detail-grid" style={{ marginTop: 12 }}>',
  "{mediaIssueCopy.dimensions}",
  "{mediaIssueCopy.textChars}",
  "{mediaIssueCopy.textLines}",
]) {
  if (mediaAssetCardMetadataSource.includes(forbiddenMediaAssetCardMetadataToken)) {
    throw new Error(
      `media-asset-card-metadata.tsx must keep metadata prop typing delegated: ${forbiddenMediaAssetCardMetadataToken}`,
    );
  }
}

const maxMediaAssetCardMetadataLines = 70;
if (mediaAssetCardMetadataSource.split(/\r?\n/).length > maxMediaAssetCardMetadataLines) {
  throw new Error(
    `media-asset-card-metadata.tsx exceeded ${maxMediaAssetCardMetadataLines} lines: ${mediaAssetCardMetadataSource.split(/\r?\n/).length}`,
  );
}

for (const requiredMediaAssetCardMetadataTypesUsage of [
  'import type { MediaIssueCopy } from "../lib/record-panel-ui"; import type { MediaAsset } from "../lib/types"; export type MediaAssetCardMetadataProps = { asset: MediaAsset; mediaIssueCopy: MediaIssueCopy; formatHistoryTimestampLabel: (value?: string | null) => string };',
]) {
  if (!mediaAssetCardMetadataTypesSource.includes(requiredMediaAssetCardMetadataTypesUsage)) {
    throw new Error(
      `media-asset-card-metadata.types.ts must own metadata prop typing: ${requiredMediaAssetCardMetadataTypesUsage}`,
    );
  }
}

const maxMediaAssetCardMetadataTypesLines = 2;
if (mediaAssetCardMetadataTypesLines > maxMediaAssetCardMetadataTypesLines) {
  throw new Error(
    `media-asset-card-metadata.types.ts exceeded ${maxMediaAssetCardMetadataTypesLines} lines: ${mediaAssetCardMetadataTypesLines}`,
  );
}

for (const requiredMediaAssetCardMetadataDetailsUsage of [
  'import type { MediaAssetCardMetadataDetailsProps } from "./media-asset-card-metadata-details.types";',
  "}: MediaAssetCardMetadataDetailsProps) {",
  '<div className="detail-grid" style={{ marginTop: 12 }}>',
  "{mediaIssueCopy.dimensions}",
  "{mediaIssueCopy.textChars}",
  "{mediaIssueCopy.textLines}",
]) {
  if (!mediaAssetCardMetadataDetailsSource.includes(requiredMediaAssetCardMetadataDetailsUsage)) {
    throw new Error(
      `media-asset-card-metadata-details.tsx must reuse the extracted metadata-details props type: ${requiredMediaAssetCardMetadataDetailsUsage}`,
    );
  }
}

if (mediaAssetCardMetadataDetailsSource.includes("type MediaAssetCardMetadataDetailsProps =")) {
  throw new Error("media-asset-card-metadata-details.tsx must keep metadata-details prop typing delegated");
}

const maxMediaAssetCardMetadataDetailsLines = 8;
if (mediaAssetCardMetadataDetailsLines > maxMediaAssetCardMetadataDetailsLines) {
  throw new Error(
    `media-asset-card-metadata-details.tsx exceeded ${maxMediaAssetCardMetadataDetailsLines} lines: ${mediaAssetCardMetadataDetailsLines}`,
  );
}

for (const requiredMediaAssetCardMetadataDetailsTypesUsage of [
  'import type { MediaAssetCardMetadataProps } from "./media-asset-card-metadata.types"; export type MediaAssetCardMetadataDetailsProps = Pick<MediaAssetCardMetadataProps, "asset" | "formatHistoryTimestampLabel" | "mediaIssueCopy"> & { lastAttemptAt: string | null; nextRetryAt: string | null };',
]) {
  if (!mediaAssetCardMetadataDetailsTypesSource.includes(requiredMediaAssetCardMetadataDetailsTypesUsage)) {
    throw new Error(
      `media-asset-card-metadata-details.types.ts must own metadata-details prop typing: ${requiredMediaAssetCardMetadataDetailsTypesUsage}`,
    );
  }
}

const maxMediaAssetCardMetadataDetailsTypesLines = 2;
if (mediaAssetCardMetadataDetailsTypesLines > maxMediaAssetCardMetadataDetailsTypesLines) {
  throw new Error(
    `media-asset-card-metadata-details.types.ts exceeded ${maxMediaAssetCardMetadataDetailsTypesLines} lines: ${mediaAssetCardMetadataDetailsTypesLines}`,
  );
}

for (const requiredMediaAssetCardMetadataTagsUsage of [
  'import { formatMediaSize } from "../lib/record-panel-format";',
  'import { readMetadataNumber, readMetadataText } from "../lib/record-panel-media";',
  'import type { MediaAssetCardMetadataTagsProps } from "./media-asset-card-metadata-tags.types";',
  "}: MediaAssetCardMetadataTagsProps) {",
  '<div className="tag-row">',
  "{asset.processing_status}",
  "{asset.storage_provider}",
  "{formatMediaSize(asset)}",
]) {
  if (!mediaAssetCardMetadataTagsSource.includes(requiredMediaAssetCardMetadataTagsUsage)) {
    throw new Error(
      `media-asset-card-metadata-tags.tsx must reuse the extracted metadata-tags props type: ${requiredMediaAssetCardMetadataTagsUsage}`,
    );
  }
}

if (mediaAssetCardMetadataTagsSource.includes("type MediaAssetCardMetadataTagsProps = Pick<")) {
  throw new Error("media-asset-card-metadata-tags.tsx must keep metadata-tags prop typing delegated");
}

const maxMediaAssetCardMetadataTagsLines = 17;
if (mediaAssetCardMetadataTagsLines > maxMediaAssetCardMetadataTagsLines) {
  throw new Error(
    `media-asset-card-metadata-tags.tsx exceeded ${maxMediaAssetCardMetadataTagsLines} lines: ${mediaAssetCardMetadataTagsLines}`,
  );
}

for (const requiredMediaAssetCardMetadataTagsTypesUsage of [
  'import type { MediaAssetCardMetadataProps } from "./media-asset-card-metadata.types"; export type MediaAssetCardMetadataTagsProps = Pick<MediaAssetCardMetadataProps, "asset" | "mediaIssueCopy">;',
]) {
  if (!mediaAssetCardMetadataTagsTypesSource.includes(requiredMediaAssetCardMetadataTagsTypesUsage)) {
    throw new Error(
      `media-asset-card-metadata-tags.types.ts must own metadata-tags prop typing: ${requiredMediaAssetCardMetadataTagsTypesUsage}`,
    );
  }
}

const maxMediaAssetCardMetadataTagsTypesLines = 2;
if (mediaAssetCardMetadataTagsTypesLines > maxMediaAssetCardMetadataTagsTypesLines) {
  throw new Error(
    `media-asset-card-metadata-tags.types.ts exceeded ${maxMediaAssetCardMetadataTagsTypesLines} lines: ${mediaAssetCardMetadataTagsTypesLines}`,
  );
}

for (const requiredSharePreviewClientUsage of [
  'import type { SharePreviewClientProps } from "./share-preview-client.types";',
  "}: SharePreviewClientProps) {",
]) {
  if (!sharePreviewClientSource.includes(requiredSharePreviewClientUsage)) {
    throw new Error(
      `share-preview-client.tsx must reuse the extracted share-preview props type: ${requiredSharePreviewClientUsage}`,
    );
  }
}

if (sharePreviewClientSource.includes("tokenValue }: { tokenValue: string }")) {
  throw new Error("share-preview-client.tsx must keep share-preview prop typing delegated");
}

for (const requiredSharePreviewClientTypesUsage of [
  'export type SharePreviewClientProps = { tokenValue: string };',
]) {
  if (!sharePreviewClientTypesSource.includes(requiredSharePreviewClientTypesUsage)) {
    throw new Error(
      `share-preview-client.types.ts must own share-preview prop typing: ${requiredSharePreviewClientTypesUsage}`,
    );
  }
}

const maxSharePreviewClientTypesLines = 2;
if (sharePreviewClientTypesLines > maxSharePreviewClientTypesLines) {
  throw new Error(
    `share-preview-client.types.ts exceeded ${maxSharePreviewClientTypesLines} lines: ${sharePreviewClientTypesLines}`,
  );
}

for (const requiredLanguageSwitcherUsage of [
  'import type { LanguageSwitcherProps } from "./language-switcher.types";',
  "}: LanguageSwitcherProps) {",
]) {
  if (!languageSwitcherSource.includes(requiredLanguageSwitcherUsage)) {
    throw new Error(
      `language-switcher.tsx must reuse the extracted language-switcher props type: ${requiredLanguageSwitcherUsage}`,
    );
  }
}

if (languageSwitcherSource.includes("}: {")) {
  throw new Error("language-switcher.tsx must keep language-switcher prop typing delegated");
}

for (const requiredLanguageSwitcherTypesUsage of [
  'import type { LocaleCode } from "../lib/locale"; export type LanguageSwitcherProps = { locale: LocaleCode; onChange: (locale: LocaleCode) => void };',
]) {
  if (!languageSwitcherTypesSource.includes(requiredLanguageSwitcherTypesUsage)) {
    throw new Error(
      `language-switcher.types.ts must own language-switcher prop typing: ${requiredLanguageSwitcherTypesUsage}`,
    );
  }
}

const maxLanguageSwitcherTypesLines = 2;
if (languageSwitcherTypesLines > maxLanguageSwitcherTypesLines) {
  throw new Error(
    `language-switcher.types.ts exceeded ${maxLanguageSwitcherTypesLines} lines: ${languageSwitcherTypesLines}`,
  );
}

for (const requiredWorkspaceEntryLoadingShellUsage of [
  'import type { WorkspaceEntryLoadingShellProps } from "./workspace-entry-loading-shell.types";',
  "}: WorkspaceEntryLoadingShellProps) {",
]) {
  if (!workspaceEntryLoadingShellSource.includes(requiredWorkspaceEntryLoadingShellUsage)) {
    throw new Error(
      `workspace-entry-loading-shell.tsx must reuse the extracted entry-loading props type: ${requiredWorkspaceEntryLoadingShellUsage}`,
    );
  }
}

if (workspaceEntryLoadingShellSource.includes("loadingLabel }: { loadingLabel: string }")) {
  throw new Error(
    "workspace-entry-loading-shell.tsx must keep entry-loading prop typing delegated",
  );
}

for (const requiredWorkspaceEntryLoadingShellTypesUsage of [
  'export type WorkspaceEntryLoadingShellProps = { loadingLabel: string };',
]) {
  if (!workspaceEntryLoadingShellTypesSource.includes(requiredWorkspaceEntryLoadingShellTypesUsage)) {
    throw new Error(
      `workspace-entry-loading-shell.types.ts must own entry-loading prop typing: ${requiredWorkspaceEntryLoadingShellTypesUsage}`,
    );
  }
}

const maxWorkspaceEntryLoadingShellTypesLines = 2;
if (workspaceEntryLoadingShellTypesLines > maxWorkspaceEntryLoadingShellTypesLines) {
  throw new Error(
    `workspace-entry-loading-shell.types.ts exceeded ${maxWorkspaceEntryLoadingShellTypesLines} lines: ${workspaceEntryLoadingShellTypesLines}`,
  );
}

for (const requiredWorkspaceEntryHeaderUsage of [
  'import type { WorkspaceEntryHeaderProps } from "./workspace-entry-header.types";',
  "}: WorkspaceEntryHeaderProps) {",
]) {
  if (!workspaceEntryHeaderSource.includes(requiredWorkspaceEntryHeaderUsage)) {
    throw new Error(
      `workspace-entry-header.tsx must reuse the extracted entry-header props type: ${requiredWorkspaceEntryHeaderUsage}`,
    );
  }
}

for (const forbiddenWorkspaceEntryHeaderToken of [
  'import type { LocaleCode } from "../lib/locale";',
  "type WorkspaceEntryHeaderCopy = {",
  "}: {",
]) {
  if (workspaceEntryHeaderSource.includes(forbiddenWorkspaceEntryHeaderToken)) {
    throw new Error(
      `workspace-entry-header.tsx must keep entry-header prop typing delegated: ${forbiddenWorkspaceEntryHeaderToken}`,
    );
  }
}

for (const requiredWorkspaceEntryHeaderTypesUsage of [
  'import type { LocaleCode } from "../lib/locale"; export type WorkspaceEntryHeaderCopy = { eyebrow: string; title: string; signedInAs: string; signedIn: string; signOut: string }; export type WorkspaceEntryHeaderProps = { copy: WorkspaceEntryHeaderCopy; locale: LocaleCode; username?: string | null; onLocaleChange: (nextLocale: LocaleCode) => void; onLogout: () => void };',
]) {
  if (!workspaceEntryHeaderTypesSource.includes(requiredWorkspaceEntryHeaderTypesUsage)) {
    throw new Error(
      `workspace-entry-header.types.ts must own entry-header prop typing: ${requiredWorkspaceEntryHeaderTypesUsage}`,
    );
  }
}

const maxWorkspaceEntryHeaderTypesLines = 2;
if (workspaceEntryHeaderTypesLines > maxWorkspaceEntryHeaderTypesLines) {
  throw new Error(
    `workspace-entry-header.types.ts exceeded ${maxWorkspaceEntryHeaderTypesLines} lines: ${workspaceEntryHeaderTypesLines}`,
  );
}

for (const requiredWorkspaceCreateSectionUsage of [
  'import type { WorkspaceCreateSectionProps } from "./workspace-create-section.types";',
  "}: WorkspaceCreateSectionProps) {",
]) {
  if (!workspaceCreateSectionSource.includes(requiredWorkspaceCreateSectionUsage)) {
    throw new Error(
      `workspace-create-section.tsx must reuse the extracted create-section props type: ${requiredWorkspaceCreateSectionUsage}`,
    );
  }
}

for (const forbiddenWorkspaceCreateSectionToken of [
  'import type { FormEvent } from "react";',
  "type WorkspaceCreateCopy = {",
  "}: {",
]) {
  if (workspaceCreateSectionSource.includes(forbiddenWorkspaceCreateSectionToken)) {
    throw new Error(
      `workspace-create-section.tsx must keep create-section prop typing delegated: ${forbiddenWorkspaceCreateSectionToken}`,
    );
  }
}

for (const requiredWorkspaceCreateSectionTypesUsage of [
  'import type { FormEvent } from "react"; export type WorkspaceCreateCopy = { createEyebrow: string; createTitle: string; name: string; slugPreview: string; createWorkspace: string }; export type WorkspaceCreateSectionProps = { copy: WorkspaceCreateCopy; name: string; suggestedSlug: string; creating: boolean; onNameChange: (value: string) => void; onSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void> };',
]) {
  if (!workspaceCreateSectionTypesSource.includes(requiredWorkspaceCreateSectionTypesUsage)) {
    throw new Error(
      `workspace-create-section.types.ts must own create-section prop typing: ${requiredWorkspaceCreateSectionTypesUsage}`,
    );
  }
}

const maxWorkspaceCreateSectionTypesLines = 2;
if (workspaceCreateSectionTypesLines > maxWorkspaceCreateSectionTypesLines) {
  throw new Error(
    `workspace-create-section.types.ts exceeded ${maxWorkspaceCreateSectionTypesLines} lines: ${workspaceCreateSectionTypesLines}`,
  );
}

for (const requiredWorkspaceJoinSectionUsage of [
  'import type { WorkspaceJoinSectionProps } from "./workspace-join-section.types";',
  "}: WorkspaceJoinSectionProps) {",
]) {
  if (!workspaceJoinSectionSource.includes(requiredWorkspaceJoinSectionUsage)) {
    throw new Error(
      `workspace-join-section.tsx must reuse the extracted join-section props type: ${requiredWorkspaceJoinSectionUsage}`,
    );
  }
}

for (const forbiddenWorkspaceJoinSectionToken of [
  'import type { SharePreview } from "../lib/types";',
  "type WorkspaceJoinCopy = {",
  "}: {",
]) {
  if (workspaceJoinSectionSource.includes(forbiddenWorkspaceJoinSectionToken)) {
    throw new Error(
      `workspace-join-section.tsx must keep join-section prop typing delegated: ${forbiddenWorkspaceJoinSectionToken}`,
    );
  }
}

for (const requiredWorkspaceJoinSectionTypesUsage of [
  'import type { SharePreview } from "../lib/types"; export type WorkspaceJoinCopy = { joinEyebrow: string; joinTitle: string; sharePlaceholder: string; previewShare: string; joinWorkspace: string }; export type WorkspaceJoinSectionProps = { copy: WorkspaceJoinCopy; shareTokenInput: string; previewing: boolean; joining: boolean; sharePreview: SharePreview | null; onShareTokenInputChange: (value: string) => void; onPreviewShare: () => Promise<void>; onAcceptShare: () => Promise<void> };',
]) {
  if (!workspaceJoinSectionTypesSource.includes(requiredWorkspaceJoinSectionTypesUsage)) {
    throw new Error(
      `workspace-join-section.types.ts must own join-section prop typing: ${requiredWorkspaceJoinSectionTypesUsage}`,
    );
  }
}

const maxWorkspaceJoinSectionTypesLines = 2;
if (workspaceJoinSectionTypesLines > maxWorkspaceJoinSectionTypesLines) {
  throw new Error(
    `workspace-join-section.types.ts exceeded ${maxWorkspaceJoinSectionTypesLines} lines: ${workspaceJoinSectionTypesLines}`,
  );
}

for (const requiredWorkspaceImportSectionUsage of [
  'import type { WorkspaceImportSectionProps } from "./workspace-import-section.types";',
  "}: WorkspaceImportSectionProps) {",
]) {
  if (!workspaceImportSectionSource.includes(requiredWorkspaceImportSectionUsage)) {
    throw new Error(
      `workspace-import-section.tsx must reuse the extracted import-section props type: ${requiredWorkspaceImportSectionUsage}`,
    );
  }
}

for (const forbiddenWorkspaceImportSectionToken of [
  'import type { RefObject } from "react";',
  "type WorkspaceImportCopy = {",
  "}: {",
]) {
  if (workspaceImportSectionSource.includes(forbiddenWorkspaceImportSectionToken)) {
    throw new Error(
      `workspace-import-section.tsx must keep import-section prop typing delegated: ${forbiddenWorkspaceImportSectionToken}`,
    );
  }
}

for (const requiredWorkspaceImportSectionTypesUsage of [
  'import type { RefObject } from "react"; export type WorkspaceImportCopy = { importEyebrow: string; importTitle: string; importArchive: string; importName: string; importSlug: string; importWorkspace: string; queueImportJob: string }; export type WorkspaceImportSectionProps = { copy: WorkspaceImportCopy; fileInputRef: RefObject<HTMLInputElement | null>; importName: string; importSlug: string; importFile: File | null; importing: boolean; queueingImportJob: boolean; onImportNameChange: (value: string) => void; onImportSlugChange: (value: string) => void; onImportFileChange: (file: File | null) => void; onImportWorkspace: () => Promise<void>; onQueueImportJob: () => Promise<void> };',
]) {
  if (!workspaceImportSectionTypesSource.includes(requiredWorkspaceImportSectionTypesUsage)) {
    throw new Error(
      `workspace-import-section.types.ts must own import-section prop typing: ${requiredWorkspaceImportSectionTypesUsage}`,
    );
  }
}

const maxWorkspaceImportSectionTypesLines = 2;
if (workspaceImportSectionTypesLines > maxWorkspaceImportSectionTypesLines) {
  throw new Error(
    `workspace-import-section.types.ts exceeded ${maxWorkspaceImportSectionTypesLines} lines: ${workspaceImportSectionTypesLines}`,
  );
}

for (const requiredWorkspaceListSectionUsage of [
  'import type { WorkspaceListSectionProps } from "./workspace-list-section.types";',
  "}: WorkspaceListSectionProps) {",
]) {
  if (!workspaceListSectionSource.includes(requiredWorkspaceListSectionUsage)) {
    throw new Error(
      `workspace-list-section.tsx must reuse the extracted list-section props type: ${requiredWorkspaceListSectionUsage}`,
    );
  }
}

for (const forbiddenWorkspaceListSectionToken of [
  'import type { Workspace } from "../lib/types";',
  "type WorkspaceListCopy = {",
  "}: {",
]) {
  if (workspaceListSectionSource.includes(forbiddenWorkspaceListSectionToken)) {
    throw new Error(
      `workspace-list-section.tsx must keep list-section prop typing delegated: ${forbiddenWorkspaceListSectionToken}`,
    );
  }
}

for (const requiredWorkspaceListSectionTypesUsage of [
  'import type { Workspace } from "../lib/types"; export type WorkspaceListCopy = { listEyebrow: string; listTitle: string; openWorkspace: string; settings: string; noWorkspace: string }; export type WorkspaceListSectionProps = { copy: WorkspaceListCopy; workspaces: Workspace[] };',
]) {
  if (!workspaceListSectionTypesSource.includes(requiredWorkspaceListSectionTypesUsage)) {
    throw new Error(
      `workspace-list-section.types.ts must own list-section prop typing: ${requiredWorkspaceListSectionTypesUsage}`,
    );
  }
}

const maxWorkspaceListSectionTypesLines = 2;
if (workspaceListSectionTypesLines > maxWorkspaceListSectionTypesLines) {
  throw new Error(
    `workspace-list-section.types.ts exceeded ${maxWorkspaceListSectionTypesLines} lines: ${workspaceListSectionTypesLines}`,
  );
}

for (const requiredUseWorkspaceEntryControllerDerivedDataUsage of [
  'import type { UseWorkspaceEntryControllerDerivedDataInput } from "./use-workspace-entry-controller-derived-data.types";',
  "}: UseWorkspaceEntryControllerDerivedDataInput) {",
]) {
  if (!useWorkspaceEntryControllerDerivedDataSource.includes(requiredUseWorkspaceEntryControllerDerivedDataUsage)) {
    throw new Error(
      `use-workspace-entry-controller-derived-data.ts must reuse the extracted entry-derived-data input type: ${requiredUseWorkspaceEntryControllerDerivedDataUsage}`,
    );
  }
}

if (useWorkspaceEntryControllerDerivedDataSource.includes("}: {")) {
  throw new Error(
    "use-workspace-entry-controller-derived-data.ts must keep entry-derived-data input typing delegated",
  );
}

for (const requiredUseWorkspaceEntryControllerDerivedDataTypesUsage of [
  'export type UseWorkspaceEntryControllerDerivedDataInput = { name: string; shareTokenInput: string };',
]) {
  if (!useWorkspaceEntryControllerDerivedDataTypesSource.includes(requiredUseWorkspaceEntryControllerDerivedDataTypesUsage)) {
    throw new Error(
      `use-workspace-entry-controller-derived-data.types.ts must own entry-derived-data input typing: ${requiredUseWorkspaceEntryControllerDerivedDataTypesUsage}`,
    );
  }
}

const maxUseWorkspaceEntryControllerDerivedDataTypesLines = 2;
if (useWorkspaceEntryControllerDerivedDataTypesLines > maxUseWorkspaceEntryControllerDerivedDataTypesLines) {
  throw new Error(
    `use-workspace-entry-controller-derived-data.types.ts exceeded ${maxUseWorkspaceEntryControllerDerivedDataTypesLines} lines: ${useWorkspaceEntryControllerDerivedDataTypesLines}`,
  );
}

for (const requiredUseWorkspaceEntryLoadUsage of [
  'import type { UseWorkspaceEntryLoadInput } from "./use-workspace-entry-load.types";',
  "}: UseWorkspaceEntryLoadInput) {",
]) {
  if (!useWorkspaceEntryLoadSource.includes(requiredUseWorkspaceEntryLoadUsage)) {
    throw new Error(
      `use-workspace-entry-load.ts must reuse the extracted entry-load input type: ${requiredUseWorkspaceEntryLoadUsage}`,
    );
  }
}

for (const forbiddenUseWorkspaceEntryLoadToken of [
  'import type { RouterLike, WorkspaceEntryControllerState } from "./workspace-entry-controller.types";',
  "}: {",
]) {
  if (useWorkspaceEntryLoadSource.includes(forbiddenUseWorkspaceEntryLoadToken)) {
    throw new Error(
      `use-workspace-entry-load.ts must keep entry-load input typing delegated: ${forbiddenUseWorkspaceEntryLoadToken}`,
    );
  }
}

for (const requiredUseWorkspaceEntryLoadTypesUsage of [
  'import type { RouterLike, WorkspaceEntryControllerState } from "./workspace-entry-controller.types"; export type UseWorkspaceEntryLoadInput = { loadTransferJobs: (activeToken: string) => Promise<void>; router: RouterLike; setError: WorkspaceEntryControllerState["setError"]; setLoading: WorkspaceEntryControllerState["setLoading"]; setToken: WorkspaceEntryControllerState["setToken"]; setUser: WorkspaceEntryControllerState["setUser"]; setWorkspaces: WorkspaceEntryControllerState["setWorkspaces"] };',
]) {
  if (!useWorkspaceEntryLoadTypesSource.includes(requiredUseWorkspaceEntryLoadTypesUsage)) {
    throw new Error(
      `use-workspace-entry-load.types.ts must own entry-load input typing: ${requiredUseWorkspaceEntryLoadTypesUsage}`,
    );
  }
}

const maxUseWorkspaceEntryLoadTypesLines = 2;
if (useWorkspaceEntryLoadTypesLines > maxUseWorkspaceEntryLoadTypesLines) {
  throw new Error(
    `use-workspace-entry-load.types.ts exceeded ${maxUseWorkspaceEntryLoadTypesLines} lines: ${useWorkspaceEntryLoadTypesLines}`,
  );
}

for (const requiredWorkspaceEntryControllerActionsUsage of [
  'import type { CreateWorkspaceEntryControllerActionsInput } from "./workspace-entry-controller-actions.types";',
  "}: CreateWorkspaceEntryControllerActionsInput) {",
]) {
  if (!workspaceEntryControllerActionsSource.includes(requiredWorkspaceEntryControllerActionsUsage)) {
    throw new Error(
      `workspace-entry-controller-actions.ts must reuse the extracted entry-controller action input type: ${requiredWorkspaceEntryControllerActionsUsage}`,
    );
  }
}

for (const forbiddenWorkspaceEntryControllerActionsToken of [
  "RouterLike",
  "WorkspaceEntryControllerState",
  "}: {",
]) {
  if (workspaceEntryControllerActionsSource.includes(forbiddenWorkspaceEntryControllerActionsToken)) {
    throw new Error(
      `workspace-entry-controller-actions.ts must keep entry-controller action typing delegated: ${forbiddenWorkspaceEntryControllerActionsToken}`,
    );
  }
}

for (const requiredWorkspaceEntryControllerActionsTypesUsage of [
  'import type { RouterLike, WorkspaceEntryControllerState } from "./workspace-entry-controller.types"; export type CreateWorkspaceEntryControllerActionsInput = { router: RouterLike; state: WorkspaceEntryControllerState };',
]) {
  if (!workspaceEntryControllerActionsTypesSource.includes(requiredWorkspaceEntryControllerActionsTypesUsage)) {
    throw new Error(
      `workspace-entry-controller-actions.types.ts must own entry-controller action typing: ${requiredWorkspaceEntryControllerActionsTypesUsage}`,
    );
  }
}

const maxWorkspaceEntryControllerActionsTypesLines = 2;
if (workspaceEntryControllerActionsTypesLines > maxWorkspaceEntryControllerActionsTypesLines) {
  throw new Error(
    `workspace-entry-controller-actions.types.ts exceeded ${maxWorkspaceEntryControllerActionsTypesLines} lines: ${workspaceEntryControllerActionsTypesLines}`,
  );
}

for (const requiredWorkspaceEntryCreateActionsUsage of [
  'import type { CreateWorkspaceEntryCreateActionsInput } from "./workspace-entry-create-actions.types";',
  "}: CreateWorkspaceEntryCreateActionsInput) {",
]) {
  if (!workspaceEntryCreateActionsSource.includes(requiredWorkspaceEntryCreateActionsUsage)) {
    throw new Error(
      `workspace-entry-create-actions.ts must reuse the extracted entry-create action input type: ${requiredWorkspaceEntryCreateActionsUsage}`,
    );
  }
}

for (const forbiddenWorkspaceEntryCreateActionsToken of [
  "RouterLike",
  "WorkspaceEntryControllerState",
  "}: {",
]) {
  if (workspaceEntryCreateActionsSource.includes(forbiddenWorkspaceEntryCreateActionsToken)) {
    throw new Error(
      `workspace-entry-create-actions.ts must keep entry-create action typing delegated: ${forbiddenWorkspaceEntryCreateActionsToken}`,
    );
  }
}

for (const requiredWorkspaceEntryCreateActionsTypesUsage of [
  'import type { RouterLike, WorkspaceEntryControllerState } from "./workspace-entry-controller.types"; export type CreateWorkspaceEntryCreateActionsInput = { router: RouterLike; state: WorkspaceEntryControllerState };',
]) {
  if (!workspaceEntryCreateActionsTypesSource.includes(requiredWorkspaceEntryCreateActionsTypesUsage)) {
    throw new Error(
      `workspace-entry-create-actions.types.ts must own entry-create action typing: ${requiredWorkspaceEntryCreateActionsTypesUsage}`,
    );
  }
}

const maxWorkspaceEntryCreateActionsTypesLines = 2;
if (workspaceEntryCreateActionsTypesLines > maxWorkspaceEntryCreateActionsTypesLines) {
  throw new Error(
    `workspace-entry-create-actions.types.ts exceeded ${maxWorkspaceEntryCreateActionsTypesLines} lines: ${workspaceEntryCreateActionsTypesLines}`,
  );
}

for (const requiredWorkspaceEntryImportActionsUsage of [
  'import type { CreateWorkspaceEntryImportActionsInput } from "./workspace-entry-import-actions.types";',
  "}: CreateWorkspaceEntryImportActionsInput) {",
]) {
  if (!workspaceEntryImportActionsSource.includes(requiredWorkspaceEntryImportActionsUsage)) {
    throw new Error(
      `workspace-entry-import-actions.ts must reuse the extracted entry-import action input type: ${requiredWorkspaceEntryImportActionsUsage}`,
    );
  }
}

for (const forbiddenWorkspaceEntryImportActionsToken of [
  "RouterLike",
  "WorkspaceEntryControllerState",
  "}: {",
]) {
  if (workspaceEntryImportActionsSource.includes(forbiddenWorkspaceEntryImportActionsToken)) {
    throw new Error(
      `workspace-entry-import-actions.ts must keep entry-import action typing delegated: ${forbiddenWorkspaceEntryImportActionsToken}`,
    );
  }
}

for (const requiredWorkspaceEntryImportActionsTypesUsage of [
  'import type { RouterLike, WorkspaceEntryControllerState } from "./workspace-entry-controller.types"; export type CreateWorkspaceEntryImportActionsInput = { loadTransferJobs: (activeToken: string) => Promise<void>; router: RouterLike; state: WorkspaceEntryControllerState };',
]) {
  if (!workspaceEntryImportActionsTypesSource.includes(requiredWorkspaceEntryImportActionsTypesUsage)) {
    throw new Error(
      `workspace-entry-import-actions.types.ts must own entry-import action typing: ${requiredWorkspaceEntryImportActionsTypesUsage}`,
    );
  }
}

const maxWorkspaceEntryImportActionsTypesLines = 2;
if (workspaceEntryImportActionsTypesLines > maxWorkspaceEntryImportActionsTypesLines) {
  throw new Error(
    `workspace-entry-import-actions.types.ts exceeded ${maxWorkspaceEntryImportActionsTypesLines} lines: ${workspaceEntryImportActionsTypesLines}`,
  );
}

for (const requiredWorkspaceEntryWorkspaceActionsUsage of [
  'import type { CreateWorkspaceEntryWorkspaceActionsInput } from "./workspace-entry-workspace-actions.types";',
  "}: CreateWorkspaceEntryWorkspaceActionsInput) {",
]) {
  if (!workspaceEntryWorkspaceActionsSource.includes(requiredWorkspaceEntryWorkspaceActionsUsage)) {
    throw new Error(
      `workspace-entry-workspace-actions.ts must reuse the extracted entry-workspace action input type: ${requiredWorkspaceEntryWorkspaceActionsUsage}`,
    );
  }
}

for (const forbiddenWorkspaceEntryWorkspaceActionsToken of [
  "RouterLike",
  "WorkspaceEntryControllerState",
  "}: {",
]) {
  if (workspaceEntryWorkspaceActionsSource.includes(forbiddenWorkspaceEntryWorkspaceActionsToken)) {
    throw new Error(
      `workspace-entry-workspace-actions.ts must keep entry-workspace action typing delegated: ${forbiddenWorkspaceEntryWorkspaceActionsToken}`,
    );
  }
}

for (const requiredWorkspaceEntryWorkspaceActionsTypesUsage of [
  'import type { RouterLike, WorkspaceEntryControllerState } from "./workspace-entry-controller.types"; export type CreateWorkspaceEntryWorkspaceActionsInput = { loadTransferJobs: (activeToken: string) => Promise<void>; router: RouterLike; state: WorkspaceEntryControllerState };',
]) {
  if (!workspaceEntryWorkspaceActionsTypesSource.includes(requiredWorkspaceEntryWorkspaceActionsTypesUsage)) {
    throw new Error(
      `workspace-entry-workspace-actions.types.ts must own entry-workspace action typing: ${requiredWorkspaceEntryWorkspaceActionsTypesUsage}`,
    );
  }
}

const maxWorkspaceEntryWorkspaceActionsTypesLines = 2;
if (workspaceEntryWorkspaceActionsTypesLines > maxWorkspaceEntryWorkspaceActionsTypesLines) {
  throw new Error(
    `workspace-entry-workspace-actions.types.ts exceeded ${maxWorkspaceEntryWorkspaceActionsTypesLines} lines: ${workspaceEntryWorkspaceActionsTypesLines}`,
  );
}

for (const requiredWorkspaceEntryShareActionsUsage of [
  'import type { CreateWorkspaceEntryShareActionsInput } from "./workspace-entry-share-actions.types";',
  "}: CreateWorkspaceEntryShareActionsInput) {",
]) {
  if (!workspaceEntryShareActionsSource.includes(requiredWorkspaceEntryShareActionsUsage)) {
    throw new Error(
      `workspace-entry-share-actions.ts must reuse the extracted entry-share action input type: ${requiredWorkspaceEntryShareActionsUsage}`,
    );
  }
}

for (const forbiddenWorkspaceEntryShareActionsToken of [
  "RouterLike",
  "WorkspaceEntryControllerState",
  "}: {",
]) {
  if (workspaceEntryShareActionsSource.includes(forbiddenWorkspaceEntryShareActionsToken)) {
    throw new Error(
      `workspace-entry-share-actions.ts must keep entry-share action typing delegated: ${forbiddenWorkspaceEntryShareActionsToken}`,
    );
  }
}

for (const requiredWorkspaceEntryShareActionsTypesUsage of [
  'import type { RouterLike, WorkspaceEntryControllerState } from "./workspace-entry-controller.types"; export type CreateWorkspaceEntryShareActionsInput = { router: RouterLike; state: WorkspaceEntryControllerState };',
]) {
  if (!workspaceEntryShareActionsTypesSource.includes(requiredWorkspaceEntryShareActionsTypesUsage)) {
    throw new Error(
      `workspace-entry-share-actions.types.ts must own entry-share action typing: ${requiredWorkspaceEntryShareActionsTypesUsage}`,
    );
  }
}

const maxWorkspaceEntryShareActionsTypesLines = 2;
if (workspaceEntryShareActionsTypesLines > maxWorkspaceEntryShareActionsTypesLines) {
  throw new Error(
    `workspace-entry-share-actions.types.ts exceeded ${maxWorkspaceEntryShareActionsTypesLines} lines: ${workspaceEntryShareActionsTypesLines}`,
  );
}

for (const requiredRecordSummaryCardUsage of [
  'import type { RecordSummaryCardProps } from "./record-summary-card.types";',
  "}: RecordSummaryCardProps) {",
]) {
  if (!recordSummaryCardSource.includes(requiredRecordSummaryCardUsage)) {
    throw new Error(
      `record-summary-card.tsx must reuse the extracted summary-card props type: ${requiredRecordSummaryCardUsage}`,
    );
  }
}

for (const forbiddenRecordSummaryCardToken of [
  'import type { RecordItem } from "../lib/types";',
  "type RecordSummaryCardProps = {",
]) {
  if (recordSummaryCardSource.includes(forbiddenRecordSummaryCardToken)) {
    throw new Error(
      `record-summary-card.tsx must keep summary-card prop typing delegated: ${forbiddenRecordSummaryCardToken}`,
    );
  }
}

for (const requiredRecordSummaryCardTypesUsage of [
  'import type { RecordItem } from "../lib/types"; import type { RecordResultsSharedCardProps } from "./record-results-view.types"; export type RecordSummaryCardProps = Pick<RecordResultsSharedCardProps, "avoidLabel" | "formatRecordTimestampLabel" | "formatReviewStatusLabel" | "mapPrefixLabel" | "noContentLabel" | "onSelectRecord" | "ratingPrefixLabel" | "unknownPlaceLabel" | "untitledRecordLabel"> & { isSelected: boolean; record: RecordItem };',
]) {
  if (!recordSummaryCardTypesSource.includes(requiredRecordSummaryCardTypesUsage)) {
    throw new Error(
      `record-summary-card.types.ts must own summary-card prop typing: ${requiredRecordSummaryCardTypesUsage}`,
    );
  }
}

const maxRecordSummaryCardTypesLines = 2;
if (recordSummaryCardTypesLines > maxRecordSummaryCardTypesLines) {
  throw new Error(
    `record-summary-card.types.ts exceeded ${maxRecordSummaryCardTypesLines} lines: ${recordSummaryCardTypesLines}`,
  );
}

for (const requiredRecordResultsViewSwitcherUsage of [
  'import type { RecordResultsViewSwitcherProps } from "./record-results-view-switcher.types";',
  "}: RecordResultsViewSwitcherProps) {",
]) {
  if (!recordResultsViewSwitcherSource.includes(requiredRecordResultsViewSwitcherUsage)) {
    throw new Error(
      `record-results-view-switcher.tsx must reuse the extracted results-switcher props type: ${requiredRecordResultsViewSwitcherUsage}`,
    );
  }
}

if (recordResultsViewSwitcherSource.includes("type RecordResultsViewSwitcherProps = {")) {
  throw new Error(
    "record-results-view-switcher.tsx must keep results-switcher prop typing delegated",
  );
}

for (const requiredRecordResultsViewSwitcherTypesUsage of [
  'import type { RecordResultsViewProps } from "./record-results-view.types"; export type RecordResultsViewSwitcherProps = Pick<RecordResultsViewProps, "flatListViewLabel" | "onViewModeChange" | "timelineViewLabel" | "viewMode">;',
]) {
  if (!recordResultsViewSwitcherTypesSource.includes(requiredRecordResultsViewSwitcherTypesUsage)) {
    throw new Error(
      `record-results-view-switcher.types.ts must own results-switcher prop typing: ${requiredRecordResultsViewSwitcherTypesUsage}`,
    );
  }
}

const maxRecordResultsViewSwitcherTypesLines = 2;
if (recordResultsViewSwitcherTypesLines > maxRecordResultsViewSwitcherTypesLines) {
  throw new Error(
    `record-results-view-switcher.types.ts exceeded ${maxRecordResultsViewSwitcherTypesLines} lines: ${recordResultsViewSwitcherTypesLines}`,
  );
}

for (const requiredSearchPresetListUsage of [
  'import type { SearchPresetListProps } from "./search-preset-list.types";',
  "}: SearchPresetListProps) {",
]) {
  if (!searchPresetListSource.includes(requiredSearchPresetListUsage)) {
    throw new Error(
      `search-preset-list.tsx must reuse the extracted preset-list props type: ${requiredSearchPresetListUsage}`,
    );
  }
}

for (const forbiddenSearchPresetListToken of [
  'import type { RecordFilterState, SearchPresetItem } from "../lib/types";',
  "type SearchPresetListProps = {",
]) {
  if (searchPresetListSource.includes(forbiddenSearchPresetListToken)) {
    throw new Error(
      `search-preset-list.tsx must keep preset-list prop typing delegated: ${forbiddenSearchPresetListToken}`,
    );
  }
}

for (const requiredSearchPresetListTypesUsage of [
  'import type { RecordBrowseWorkspaceProps } from "./record-browse-workspace.types"; export type SearchPresetListProps = Pick<RecordBrowseWorkspaceProps, "applyPresetLabel" | "canWriteWorkspace" | "deletePresetLabel" | "filteringRecords" | "onApplyPreset" | "onDeletePreset" | "savedPresetLabel" | "summarizeRecordFilterLabel"> & { emptyLabel: string; presets: RecordBrowseWorkspaceProps["searchPresets"] };',
]) {
  if (!searchPresetListTypesSource.includes(requiredSearchPresetListTypesUsage)) {
    throw new Error(
      `search-preset-list.types.ts must own preset-list prop typing: ${requiredSearchPresetListTypesUsage}`,
    );
  }
}

const maxSearchPresetListTypesLines = 2;
if (searchPresetListTypesLines > maxSearchPresetListTypesLines) {
  throw new Error(
    `search-preset-list.types.ts exceeded ${maxSearchPresetListTypesLines} lines: ${searchPresetListTypesLines}`,
  );
}

for (const requiredRecordSearchPanelFilterFieldsUsage of [
  'import type { RecordSearchPanelFilterFieldsProps } from "./record-search-panel-filter-fields.types";',
  "}: RecordSearchPanelFilterFieldsProps) {",
]) {
  if (!recordSearchPanelFilterFieldsSource.includes(requiredRecordSearchPanelFilterFieldsUsage)) {
    throw new Error(
      `record-search-panel-filter-fields.tsx must reuse the extracted filter-fields props type: ${requiredRecordSearchPanelFilterFieldsUsage}`,
    );
  }
}

for (const forbiddenRecordSearchPanelFilterFieldsToken of [
  "RecordSearchPanelProps",
  "}: Pick<",
]) {
  if (recordSearchPanelFilterFieldsSource.includes(forbiddenRecordSearchPanelFilterFieldsToken)) {
    throw new Error(
      `record-search-panel-filter-fields.tsx must keep filter-fields prop typing delegated: ${forbiddenRecordSearchPanelFilterFieldsToken}`,
    );
  }
}

for (const requiredRecordSearchPanelFilterFieldsTypesUsage of [
  'import type { RecordSearchPanelProps } from "./record-search-panel.types"; export type RecordSearchPanelFilterFieldsProps = Pick<RecordSearchPanelProps, "filterDraft" | "onAvoidOnlyChange" | "onQueryChange" | "onTypeCodeChange" | "panelCopy">;',
]) {
  if (!recordSearchPanelFilterFieldsTypesSource.includes(requiredRecordSearchPanelFilterFieldsTypesUsage)) {
    throw new Error(
      `record-search-panel-filter-fields.types.ts must own filter-fields prop typing: ${requiredRecordSearchPanelFilterFieldsTypesUsage}`,
    );
  }
}

const maxRecordSearchPanelFilterFieldsTypesLines = 2;
if (recordSearchPanelFilterFieldsTypesLines > maxRecordSearchPanelFilterFieldsTypesLines) {
  throw new Error(
    `record-search-panel-filter-fields.types.ts exceeded ${maxRecordSearchPanelFilterFieldsTypesLines} lines: ${recordSearchPanelFilterFieldsTypesLines}`,
  );
}

for (const requiredRecordSearchPanelPresetControlsUsage of [
  'import type { RecordSearchPanelPresetControlsProps } from "./record-search-panel-preset-controls.types";',
  "}: RecordSearchPanelPresetControlsProps) {",
]) {
  if (!recordSearchPanelPresetControlsSource.includes(requiredRecordSearchPanelPresetControlsUsage)) {
    throw new Error(
      `record-search-panel-preset-controls.tsx must reuse the extracted preset-controls props type: ${requiredRecordSearchPanelPresetControlsUsage}`,
    );
  }
}

for (const forbiddenRecordSearchPanelPresetControlsToken of [
  "RecordSearchPanelProps",
  "}: Pick<",
]) {
  if (recordSearchPanelPresetControlsSource.includes(forbiddenRecordSearchPanelPresetControlsToken)) {
    throw new Error(
      `record-search-panel-preset-controls.tsx must keep preset-controls prop typing delegated: ${forbiddenRecordSearchPanelPresetControlsToken}`,
    );
  }
}

for (const requiredRecordSearchPanelPresetControlsTypesUsage of [
  'import type { RecordSearchPanelProps } from "./record-search-panel.types"; export type RecordSearchPanelPresetControlsProps = Pick<RecordSearchPanelProps, "canWriteWorkspace" | "onPresetNameChange" | "onSavePreset" | "panelCopy" | "presetName" | "savingSearchPreset">;',
]) {
  if (!recordSearchPanelPresetControlsTypesSource.includes(requiredRecordSearchPanelPresetControlsTypesUsage)) {
    throw new Error(
      `record-search-panel-preset-controls.types.ts must own preset-controls prop typing: ${requiredRecordSearchPanelPresetControlsTypesUsage}`,
    );
  }
}

const maxRecordSearchPanelPresetControlsTypesLines = 2;
if (recordSearchPanelPresetControlsTypesLines > maxRecordSearchPanelPresetControlsTypesLines) {
  throw new Error(
    `record-search-panel-preset-controls.types.ts exceeded ${maxRecordSearchPanelPresetControlsTypesLines} lines: ${recordSearchPanelPresetControlsTypesLines}`,
  );
}

for (const requiredRecordPanelStatsUsage of [
  'import type { RecordPanelStatsProps } from "./record-panel-stats.types";',
  "}: RecordPanelStatsProps) {",
]) {
  if (!recordPanelStatsSource.includes(requiredRecordPanelStatsUsage)) {
    throw new Error(
      `record-panel-stats.tsx must reuse the extracted panel-stats props type: ${requiredRecordPanelStatsUsage}`,
    );
  }
}

if (recordPanelStatsSource.includes("type RecordPanelStatsProps = {")) {
  throw new Error("record-panel-stats.tsx must keep panel-stats prop typing delegated");
}

for (const requiredRecordPanelStatsTypesUsage of [
  'export type RecordPanelStatsProps = { visibleRecordsLabel: string; foodLabel: string; avoidLabel: string; visibleRecordCount: number; foodCount: number; avoidCount: number };',
]) {
  if (!recordPanelStatsTypesSource.includes(requiredRecordPanelStatsTypesUsage)) {
    throw new Error(
      `record-panel-stats.types.ts must own panel-stats prop typing: ${requiredRecordPanelStatsTypesUsage}`,
    );
  }
}

const maxRecordPanelStatsTypesLines = 2;
if (recordPanelStatsTypesLines > maxRecordPanelStatsTypesLines) {
  throw new Error(
    `record-panel-stats.types.ts exceeded ${maxRecordPanelStatsTypesLines} lines: ${recordPanelStatsTypesLines}`,
  );
}

for (const requiredDeadLetterRecoverySummaryUsage of [
  'import type { DeadLetterRecoverySummaryProps } from "./dead-letter-recovery-summary.types";',
  "}: DeadLetterRecoverySummaryProps) {",
]) {
  if (!deadLetterRecoverySummarySource.includes(requiredDeadLetterRecoverySummaryUsage)) {
    throw new Error(
      `dead-letter-recovery-summary.tsx must reuse the extracted dead-letter summary props type: ${requiredDeadLetterRecoverySummaryUsage}`,
    );
  }
}

if (deadLetterRecoverySummarySource.includes("type DeadLetterRecoverySummaryProps = Pick<")) {
  throw new Error("dead-letter-recovery-summary.tsx must keep dead-letter summary prop typing delegated");
}

for (const requiredDeadLetterRecoverySummaryTypesUsage of [
  'import type { DeadLetterRecoveryPanelProps } from "./dead-letter-recovery-panel.types"; export type DeadLetterRecoverySummaryProps = Pick<DeadLetterRecoveryPanelProps, "bulkRetryingDeadLetter" | "locale" | "mediaDeadLetterOverview" | "mediaIssueCopy" | "onBulkRetryAll" | "onBulkRetrySelected" | "onClearSelection" | "onSelectAll" | "selectedDeadLetterIds">;',
]) {
  if (!deadLetterRecoverySummaryTypesSource.includes(requiredDeadLetterRecoverySummaryTypesUsage)) {
    throw new Error(
      `dead-letter-recovery-summary.types.ts must own dead-letter summary prop typing: ${requiredDeadLetterRecoverySummaryTypesUsage}`,
    );
  }
}

const maxDeadLetterRecoverySummaryTypesLines = 2;
if (deadLetterRecoverySummaryTypesLines > maxDeadLetterRecoverySummaryTypesLines) {
  throw new Error(
    `dead-letter-recovery-summary.types.ts exceeded ${maxDeadLetterRecoverySummaryTypesLines} lines: ${deadLetterRecoverySummaryTypesLines}`,
  );
}

for (const requiredDeadLetterRecoverySummaryActionsUsage of [
  'import type { DeadLetterRecoverySummaryActionsProps } from "./dead-letter-recovery-summary-actions.types";',
  "}: DeadLetterRecoverySummaryActionsProps) {",
]) {
  if (!deadLetterRecoverySummaryActionsSource.includes(requiredDeadLetterRecoverySummaryActionsUsage)) {
    throw new Error(
      `dead-letter-recovery-summary-actions.tsx must reuse the extracted dead-letter summary-actions props type: ${requiredDeadLetterRecoverySummaryActionsUsage}`,
    );
  }
}

if (deadLetterRecoverySummaryActionsSource.includes("type DeadLetterRecoverySummaryActionsProps = Pick<")) {
  throw new Error(
    "dead-letter-recovery-summary-actions.tsx must keep dead-letter summary-actions prop typing delegated",
  );
}

for (const requiredDeadLetterRecoverySummaryActionsTypesUsage of [
  'import type { DeadLetterRecoveryPanelProps } from "./dead-letter-recovery-panel.types"; export type DeadLetterRecoverySummaryActionsProps = Pick<DeadLetterRecoveryPanelProps, "bulkRetryingDeadLetter" | "mediaDeadLetterOverview" | "mediaIssueCopy" | "onBulkRetryAll" | "onBulkRetrySelected" | "onClearSelection" | "onSelectAll" | "selectedDeadLetterIds">;',
]) {
  if (!deadLetterRecoverySummaryActionsTypesSource.includes(requiredDeadLetterRecoverySummaryActionsTypesUsage)) {
    throw new Error(
      `dead-letter-recovery-summary-actions.types.ts must own dead-letter summary-actions prop typing: ${requiredDeadLetterRecoverySummaryActionsTypesUsage}`,
    );
  }
}

const maxDeadLetterRecoverySummaryActionsTypesLines = 2;
if (deadLetterRecoverySummaryActionsTypesLines > maxDeadLetterRecoverySummaryActionsTypesLines) {
  throw new Error(
    `dead-letter-recovery-summary-actions.types.ts exceeded ${maxDeadLetterRecoverySummaryActionsTypesLines} lines: ${deadLetterRecoverySummaryActionsTypesLines}`,
  );
}

for (const requiredDeadLetterRecoverySummaryStatsUsage of [
  'import type { DeadLetterRecoverySummaryStatsProps } from "./dead-letter-recovery-summary-stats.types";',
  "}: DeadLetterRecoverySummaryStatsProps) {",
]) {
  if (!deadLetterRecoverySummaryStatsSource.includes(requiredDeadLetterRecoverySummaryStatsUsage)) {
    throw new Error(
      `dead-letter-recovery-summary-stats.tsx must reuse the extracted dead-letter summary-stats props type: ${requiredDeadLetterRecoverySummaryStatsUsage}`,
    );
  }
}

if (deadLetterRecoverySummaryStatsSource.includes("type DeadLetterRecoverySummaryStatsProps = Pick<")) {
  throw new Error(
    "dead-letter-recovery-summary-stats.tsx must keep dead-letter summary-stats prop typing delegated",
  );
}

for (const requiredDeadLetterRecoverySummaryStatsTypesUsage of [
  'import type { DeadLetterRecoveryPanelProps } from "./dead-letter-recovery-panel.types"; export type DeadLetterRecoverySummaryStatsProps = Pick<DeadLetterRecoveryPanelProps, "locale" | "mediaDeadLetterOverview" | "mediaIssueCopy">;',
]) {
  if (!deadLetterRecoverySummaryStatsTypesSource.includes(requiredDeadLetterRecoverySummaryStatsTypesUsage)) {
    throw new Error(
      `dead-letter-recovery-summary-stats.types.ts must own dead-letter summary-stats prop typing: ${requiredDeadLetterRecoverySummaryStatsTypesUsage}`,
    );
  }
}

const maxDeadLetterRecoverySummaryStatsTypesLines = 2;
if (deadLetterRecoverySummaryStatsTypesLines > maxDeadLetterRecoverySummaryStatsTypesLines) {
  throw new Error(
    `dead-letter-recovery-summary-stats.types.ts exceeded ${maxDeadLetterRecoverySummaryStatsTypesLines} lines: ${deadLetterRecoverySummaryStatsTypesLines}`,
  );
}

for (const requiredLocationReviewPanelUsage of [
  'import { LocationReviewActions } from "./location-review-actions";',
  'import { LocationReviewFormFields } from "./location-review-form-fields";',
  'import { LocationReviewHistoryList } from "./location-review-history-list";',
  'import { LocationReviewIntro } from "./location-review-intro";',
  'import { LocationReviewStatusSummary } from "./location-review-status-summary";',
  'import type { LocationReviewPanelProps } from "./location-review-panel.types";',
  "}: LocationReviewPanelProps) {",
  "<LocationReviewIntro",
  "<LocationReviewFormFields",
  "<LocationReviewActions",
  "<LocationReviewStatusSummary",
  "<LocationReviewHistoryList",
]) {
  if (!locationReviewPanelSource.includes(requiredLocationReviewPanelUsage)) {
    throw new Error(
      `location-review-panel.tsx must delegate review form and actions to extracted leaves: ${requiredLocationReviewPanelUsage}`,
    );
  }
}

for (const forbiddenLocationReviewPanelToken of [
  '<div className="inline-fields">',
  '<div className="action-row">',
  "onClick={onMarkConfirmed}",
  "onClick={onMarkNeedsReview}",
  "onClick={onResetReview}",
  "placeholder={panelCopy.reviewNotePlaceholder}",
  '<div className="eyebrow">{panelCopy.locationReview}</div>',
  "{panelCopy.locationReviewDescription}",
]) {
  if (locationReviewPanelSource.includes(forbiddenLocationReviewPanelToken)) {
    throw new Error(
      `location-review-panel.tsx must keep review field and action rendering delegated: ${forbiddenLocationReviewPanelToken}`,
    );
  }
}

const maxLocationReviewPanelLines = 65;
if (locationReviewPanelLines > maxLocationReviewPanelLines) {
  throw new Error(
    `location-review-panel.tsx exceeded ${maxLocationReviewPanelLines} lines: ${locationReviewPanelLines}`,
  );
}

for (const requiredLocationReviewIntroUsage of [
  'import type { LocationReviewIntroProps } from "./location-review-intro.types";',
  "}: LocationReviewIntroProps) {",
  '<div className="eyebrow">{panelCopy.locationReview}</div>',
  "{panelCopy.locationReviewDescription}",
]) {
  if (!locationReviewIntroSource.includes(requiredLocationReviewIntroUsage)) {
    throw new Error(
      `location-review-intro.tsx must reuse the extracted review-intro props type: ${requiredLocationReviewIntroUsage}`,
    );
  }
}

if (locationReviewIntroSource.includes("type LocationReviewIntroProps = Pick<")) {
  throw new Error("location-review-intro.tsx must keep review-intro prop typing delegated");
}

const maxLocationReviewIntroLines = 8;
if (locationReviewIntroLines > maxLocationReviewIntroLines) {
  throw new Error(
    `location-review-intro.tsx exceeded ${maxLocationReviewIntroLines} lines: ${locationReviewIntroLines}`,
  );
}

for (const requiredLocationReviewIntroTypesUsage of [
  'import type { LocationReviewPanelProps } from "./location-review-panel.types"; export type LocationReviewIntroProps = Pick<LocationReviewPanelProps, "panelCopy">;',
]) {
  if (!locationReviewIntroTypesSource.includes(requiredLocationReviewIntroTypesUsage)) {
    throw new Error(
      `location-review-intro.types.ts must own review-intro prop typing: ${requiredLocationReviewIntroTypesUsage}`,
    );
  }
}

const maxLocationReviewIntroTypesLines = 2;
if (locationReviewIntroTypesLines > maxLocationReviewIntroTypesLines) {
  throw new Error(
    `location-review-intro.types.ts exceeded ${maxLocationReviewIntroTypesLines} lines: ${locationReviewIntroTypesLines}`,
  );
}

for (const requiredLocationReviewActionsUsage of [
  'import type { LocationReviewActionsProps } from "./location-review-actions.types";',
  "}: LocationReviewActionsProps) {",
  '<div className="action-row">',
  "onClick={onMarkConfirmed}",
  "onClick={onMarkNeedsReview}",
  "onClick={onResetReview}",
]) {
  if (!locationReviewActionsSource.includes(requiredLocationReviewActionsUsage)) {
    throw new Error(
      `location-review-actions.tsx must reuse the extracted review-actions props type: ${requiredLocationReviewActionsUsage}`,
    );
  }
}

if (locationReviewActionsSource.includes("type LocationReviewActionsProps = Pick<")) {
  throw new Error("location-review-actions.tsx must keep review-actions prop typing delegated");
}

const maxLocationReviewActionsLines = 30;
if (locationReviewActionsLines > maxLocationReviewActionsLines) {
  throw new Error(
    `location-review-actions.tsx exceeded ${maxLocationReviewActionsLines} lines: ${locationReviewActionsLines}`,
  );
}

for (const requiredLocationReviewActionsTypesUsage of [
  'import type { LocationReviewPanelProps } from "./location-review-panel.types"; export type LocationReviewActionsProps = Pick<LocationReviewPanelProps, "canWriteWorkspace" | "onMarkConfirmed" | "onMarkNeedsReview" | "onResetReview" | "panelCopy">;',
]) {
  if (!locationReviewActionsTypesSource.includes(requiredLocationReviewActionsTypesUsage)) {
    throw new Error(
      `location-review-actions.types.ts must own review-actions prop typing: ${requiredLocationReviewActionsTypesUsage}`,
    );
  }
}

const maxLocationReviewActionsTypesLines = 2;
if (locationReviewActionsTypesLines > maxLocationReviewActionsTypesLines) {
  throw new Error(
    `location-review-actions.types.ts exceeded ${maxLocationReviewActionsTypesLines} lines: ${locationReviewActionsTypesLines}`,
  );
}

for (const requiredLocationReviewFormFieldsUsage of [
  'import type { LocationReviewFormFieldsProps } from "./location-review-form-fields.types";',
  "}: LocationReviewFormFieldsProps) {",
  '<div className="inline-fields">',
  "onChange={(event) => onStatusChange(event.target.value)}",
  "onChange={(event) => onNoteChange(event.target.value)}",
  "placeholder={panelCopy.reviewNotePlaceholder}",
]) {
  if (!locationReviewFormFieldsSource.includes(requiredLocationReviewFormFieldsUsage)) {
    throw new Error(
      `location-review-form-fields.tsx must reuse the extracted review-form props type: ${requiredLocationReviewFormFieldsUsage}`,
    );
  }
}

if (locationReviewFormFieldsSource.includes("type LocationReviewFormFieldsProps = Pick<")) {
  throw new Error("location-review-form-fields.tsx must keep review-form prop typing delegated");
}

const maxLocationReviewFormFieldsLines = 40;
if (locationReviewFormFieldsLines > maxLocationReviewFormFieldsLines) {
  throw new Error(
    `location-review-form-fields.tsx exceeded ${maxLocationReviewFormFieldsLines} lines: ${locationReviewFormFieldsLines}`,
  );
}

for (const requiredLocationReviewFormFieldsTypesUsage of [
  'import type { LocationReviewPanelProps } from "./location-review-panel.types"; export type LocationReviewFormFieldsProps = Pick<LocationReviewPanelProps, "canWriteWorkspace" | "onNoteChange" | "onStatusChange" | "panelCopy" | "reviewForm">;',
]) {
  if (!locationReviewFormFieldsTypesSource.includes(requiredLocationReviewFormFieldsTypesUsage)) {
    throw new Error(
      `location-review-form-fields.types.ts must own review-form prop typing: ${requiredLocationReviewFormFieldsTypesUsage}`,
    );
  }
}

const maxLocationReviewFormFieldsTypesLines = 2;
if (locationReviewFormFieldsTypesLines > maxLocationReviewFormFieldsTypesLines) {
  throw new Error(
    `location-review-form-fields.types.ts exceeded ${maxLocationReviewFormFieldsTypesLines} lines: ${locationReviewFormFieldsTypesLines}`,
  );
}

for (const requiredLocationReviewHistoryListUsage of [
  'import type { LocationReviewHistoryListProps } from "./location-review-history-list.types";',
  "}: LocationReviewHistoryListProps) {",
]) {
  if (!locationReviewHistoryListSource.includes(requiredLocationReviewHistoryListUsage)) {
    throw new Error(
      `location-review-history-list.tsx must reuse the extracted location-history props type: ${requiredLocationReviewHistoryListUsage}`,
    );
  }
}

if (locationReviewHistoryListSource.includes("type LocationReviewHistoryListProps = Pick<")) {
  throw new Error("location-review-history-list.tsx must keep location-history prop typing delegated");
}

for (const requiredLocationReviewHistoryListTypesUsage of [
  'import type { LocationReviewPanelProps } from "./location-review-panel.types"; export type LocationReviewHistoryListProps = Pick<LocationReviewPanelProps, "formatHistoryTimestampLabel" | "formatReviewStatusLabel" | "panelCopy" | "selectedLocationHistory" | "summarizeHistoryActionLabel">;',
]) {
  if (!locationReviewHistoryListTypesSource.includes(requiredLocationReviewHistoryListTypesUsage)) {
    throw new Error(
      `location-review-history-list.types.ts must own location-history prop typing: ${requiredLocationReviewHistoryListTypesUsage}`,
    );
  }
}

const maxLocationReviewHistoryListTypesLines = 2;
if (locationReviewHistoryListTypesLines > maxLocationReviewHistoryListTypesLines) {
  throw new Error(
    `location-review-history-list.types.ts exceeded ${maxLocationReviewHistoryListTypesLines} lines: ${locationReviewHistoryListTypesLines}`,
  );
}

for (const requiredLocationReviewStatusSummaryUsage of [
  'import type { LocationReviewStatusSummaryProps } from "./location-review-status-summary.types";',
  "}: LocationReviewStatusSummaryProps) {",
]) {
  if (!locationReviewStatusSummarySource.includes(requiredLocationReviewStatusSummaryUsage)) {
    throw new Error(
      `location-review-status-summary.tsx must reuse the extracted location-status props type: ${requiredLocationReviewStatusSummaryUsage}`,
    );
  }
}

if (locationReviewStatusSummarySource.includes("type LocationReviewStatusSummaryProps = Pick<")) {
  throw new Error("location-review-status-summary.tsx must keep location-status prop typing delegated");
}

for (const requiredLocationReviewStatusSummaryTypesUsage of [
  'import type { LocationReviewPanelProps } from "./location-review-panel.types"; export type LocationReviewStatusSummaryProps = Pick<LocationReviewPanelProps, "formatHistoryTimestampLabel" | "formatReviewStatusLabel" | "panelCopy" | "selectedLocationReview">;',
]) {
  if (!locationReviewStatusSummaryTypesSource.includes(requiredLocationReviewStatusSummaryTypesUsage)) {
    throw new Error(
      `location-review-status-summary.types.ts must own location-status prop typing: ${requiredLocationReviewStatusSummaryTypesUsage}`,
    );
  }
}

const maxLocationReviewStatusSummaryTypesLines = 2;
if (locationReviewStatusSummaryTypesLines > maxLocationReviewStatusSummaryTypesLines) {
  throw new Error(
    `location-review-status-summary.types.ts exceeded ${maxLocationReviewStatusSummaryTypesLines} lines: ${locationReviewStatusSummaryTypesLines}`,
  );
}

for (const requiredRecentMediaIssueCardUsage of [
  'import { RecentMediaIssueCardActions } from "./recent-media-issue-card-actions";',
  'import { RecentMediaIssueCardError } from "./recent-media-issue-card-error";',
  'import { RecentMediaIssueCardIntro } from "./recent-media-issue-card-intro";',
  'import { RecentMediaIssueCardMetadata } from "./recent-media-issue-card-metadata";',
  'import { RecentMediaIssueCardTags } from "./recent-media-issue-card-tags";',
  'import type { RecentMediaIssueCardProps } from "./recent-media-issues-panel.types";',
  "}: RecentMediaIssueCardProps) {",
  "<RecentMediaIssueCardIntro",
  "<RecentMediaIssueCardTags",
  "<RecentMediaIssueCardMetadata",
  "<RecentMediaIssueCardActions",
  "<RecentMediaIssueCardError",
]) {
  if (!recentMediaIssueCardSource.includes(requiredRecentMediaIssueCardUsage)) {
    throw new Error(
      `recent-media-issue-card.tsx must delegate intro, tags, and actions to extracted leaves: ${requiredRecentMediaIssueCardUsage}`,
    );
  }
}

for (const forbiddenRecentMediaIssueCardToken of [
  '<div className="eyebrow">{issue.media_type}</div>',
  "{issue.original_filename}",
  'issue.processing_error ? <div className="notice error" style={{ marginTop: 10 }}>{issue.processing_error}</div> : null',
  '{mediaIssueCopy.lastAttempt}: {formatHistoryTimestampLabel(issue.processing_last_attempt_at)}',
  '{mediaIssueCopy.lastFailure}: {formatHistoryTimestampLabel(issue.processing_last_failure_at)}',
  '{mediaIssueCopy.nextRetry}: {formatHistoryTimestampLabel(issue.processing_retry_next_attempt_at)}',
  '{action.label}{action.detail ? `: ${action.detail}` : ""}',
]) {
  if (recentMediaIssueCardSource.includes(forbiddenRecentMediaIssueCardToken)) {
    throw new Error(
      `recent-media-issue-card.tsx must keep issue identity rendering delegated: ${forbiddenRecentMediaIssueCardToken}`,
    );
  }
}

const maxRecentMediaIssueCardLines = 65;
if (recentMediaIssueCardLines > maxRecentMediaIssueCardLines) {
  throw new Error(
    `recent-media-issue-card.tsx exceeded ${maxRecentMediaIssueCardLines} lines: ${recentMediaIssueCardLines}`,
  );
}

for (const requiredRecentMediaIssueCardIntroUsage of [
  'import type { RecentMediaIssueCardIntroProps } from "./recent-media-issue-card-intro.types";',
  "}: RecentMediaIssueCardIntroProps) {",
  '<div className="eyebrow">{issue.media_type}</div>',
  "{issue.original_filename}",
]) {
  if (!recentMediaIssueCardIntroSource.includes(requiredRecentMediaIssueCardIntroUsage)) {
    throw new Error(
      `recent-media-issue-card-intro.tsx must reuse the extracted recent-media card-intro props type: ${requiredRecentMediaIssueCardIntroUsage}`,
    );
  }
}

if (recentMediaIssueCardIntroSource.includes("type RecentMediaIssueCardIntroProps = Pick<")) {
  throw new Error("recent-media-issue-card-intro.tsx must keep recent-media card-intro prop typing delegated");
}

const maxRecentMediaIssueCardIntroLines = 8;
if (recentMediaIssueCardIntroLines > maxRecentMediaIssueCardIntroLines) {
  throw new Error(
    `recent-media-issue-card-intro.tsx exceeded ${maxRecentMediaIssueCardIntroLines} lines: ${recentMediaIssueCardIntroLines}`,
  );
}

for (const requiredRecentMediaIssueCardIntroTypesUsage of [
  'import type { RecentMediaIssueCardProps } from "./recent-media-issues-panel.types"; export type RecentMediaIssueCardIntroProps = Pick<RecentMediaIssueCardProps, "issue">;',
]) {
  if (!recentMediaIssueCardIntroTypesSource.includes(requiredRecentMediaIssueCardIntroTypesUsage)) {
    throw new Error(
      `recent-media-issue-card-intro.types.ts must own recent-media card-intro prop typing: ${requiredRecentMediaIssueCardIntroTypesUsage}`,
    );
  }
}

const maxRecentMediaIssueCardIntroTypesLines = 2;
if (recentMediaIssueCardIntroTypesLines > maxRecentMediaIssueCardIntroTypesLines) {
  throw new Error(
    `recent-media-issue-card-intro.types.ts exceeded ${maxRecentMediaIssueCardIntroTypesLines} lines: ${recentMediaIssueCardIntroTypesLines}`,
  );
}

for (const requiredRecentMediaIssueCardErrorUsage of [
  'import type { RecentMediaIssueCardErrorProps } from "./recent-media-issue-card-error.types";',
  "}: RecentMediaIssueCardErrorProps) {",
  'issue.processing_error ? <div className="notice error" style={{ marginTop: 10 }}>{issue.processing_error}</div> : null',
]) {
  if (!recentMediaIssueCardErrorSource.includes(requiredRecentMediaIssueCardErrorUsage)) {
    throw new Error(
      `recent-media-issue-card-error.tsx must reuse the extracted recent-media card-error props type: ${requiredRecentMediaIssueCardErrorUsage}`,
    );
  }
}

if (recentMediaIssueCardErrorSource.includes("type RecentMediaIssueCardErrorProps = Pick<")) {
  throw new Error("recent-media-issue-card-error.tsx must keep recent-media card-error prop typing delegated");
}

const maxRecentMediaIssueCardErrorLines = 8;
if (recentMediaIssueCardErrorLines > maxRecentMediaIssueCardErrorLines) {
  throw new Error(
    `recent-media-issue-card-error.tsx exceeded ${maxRecentMediaIssueCardErrorLines} lines: ${recentMediaIssueCardErrorLines}`,
  );
}

for (const requiredRecentMediaIssueCardErrorTypesUsage of [
  'import type { RecentMediaIssueCardProps } from "./recent-media-issues-panel.types"; export type RecentMediaIssueCardErrorProps = Pick<RecentMediaIssueCardProps, "issue">;',
]) {
  if (!recentMediaIssueCardErrorTypesSource.includes(requiredRecentMediaIssueCardErrorTypesUsage)) {
    throw new Error(
      `recent-media-issue-card-error.types.ts must own recent-media card-error prop typing: ${requiredRecentMediaIssueCardErrorTypesUsage}`,
    );
  }
}

const maxRecentMediaIssueCardErrorTypesLines = 2;
if (recentMediaIssueCardErrorTypesLines > maxRecentMediaIssueCardErrorTypesLines) {
  throw new Error(
    `recent-media-issue-card-error.types.ts exceeded ${maxRecentMediaIssueCardErrorTypesLines} lines: ${recentMediaIssueCardErrorTypesLines}`,
  );
}

for (const requiredRecentMediaIssueCardMetadataUsage of [
  'import type { RecentMediaIssueCardMetadataProps } from "./recent-media-issue-card-metadata.types";',
  "}: RecentMediaIssueCardMetadataProps) {",
  '{mediaIssueCopy.lastAttempt}: {formatHistoryTimestampLabel(issue.processing_last_attempt_at)}',
  '{mediaIssueCopy.lastFailure}: {formatHistoryTimestampLabel(issue.processing_last_failure_at)}',
  '{mediaIssueCopy.nextRetry}: {formatHistoryTimestampLabel(issue.processing_retry_next_attempt_at)}',
  '{action.label}{action.detail ? `: ${action.detail}` : ""}',
]) {
  if (!recentMediaIssueCardMetadataSource.includes(requiredRecentMediaIssueCardMetadataUsage)) {
    throw new Error(
      `recent-media-issue-card-metadata.tsx must reuse the extracted recent-media card-metadata props type: ${requiredRecentMediaIssueCardMetadataUsage}`,
    );
  }
}

if (recentMediaIssueCardMetadataSource.includes("type RecentMediaIssueCardMetadataProps =")) {
  throw new Error("recent-media-issue-card-metadata.tsx must keep recent-media card-metadata prop typing delegated");
}

const maxRecentMediaIssueCardMetadataLines = 8;
if (recentMediaIssueCardMetadataLines > maxRecentMediaIssueCardMetadataLines) {
  throw new Error(
    `recent-media-issue-card-metadata.tsx exceeded ${maxRecentMediaIssueCardMetadataLines} lines: ${recentMediaIssueCardMetadataLines}`,
  );
}

for (const requiredRecentMediaIssueCardMetadataTypesUsage of [
  'import type { RecentMediaIssueCardProps } from "./recent-media-issues-panel.types"; import type { getMediaIssueAction } from "../lib/media-issue-display"; export type RecentMediaIssueCardMetadataProps = Pick<RecentMediaIssueCardProps, "formatHistoryTimestampLabel" | "issue" | "mediaIssueCopy"> & { action: ReturnType<typeof getMediaIssueAction> };',
]) {
  if (!recentMediaIssueCardMetadataTypesSource.includes(requiredRecentMediaIssueCardMetadataTypesUsage)) {
    throw new Error(
      `recent-media-issue-card-metadata.types.ts must own recent-media card-metadata prop typing: ${requiredRecentMediaIssueCardMetadataTypesUsage}`,
    );
  }
}

const maxRecentMediaIssueCardMetadataTypesLines = 2;
if (recentMediaIssueCardMetadataTypesLines > maxRecentMediaIssueCardMetadataTypesLines) {
  throw new Error(
    `recent-media-issue-card-metadata.types.ts exceeded ${maxRecentMediaIssueCardMetadataTypesLines} lines: ${recentMediaIssueCardMetadataTypesLines}`,
  );
}

for (const requiredRecentMediaIssueCardActionsUsage of [
  'import type { RecentMediaIssueCardActionsProps } from "./recent-media-issue-card-actions.types";',
  "}: RecentMediaIssueCardActionsProps) {",
]) {
  if (!recentMediaIssueCardActionsSource.includes(requiredRecentMediaIssueCardActionsUsage)) {
    throw new Error(
      `recent-media-issue-card-actions.tsx must reuse the extracted recent-media actions props type: ${requiredRecentMediaIssueCardActionsUsage}`,
    );
  }
}

if (recentMediaIssueCardActionsSource.includes("}: Pick<")) {
  throw new Error("recent-media-issue-card-actions.tsx must keep recent-media actions prop typing delegated");
}

for (const requiredRecentMediaIssueCardActionsTypesUsage of [
  'import type { RecentMediaIssueCardProps } from "./recent-media-issues-panel.types"; export type RecentMediaIssueCardActionsProps = Pick<RecentMediaIssueCardProps, "canWriteWorkspace" | "issue" | "mediaIssueCopy" | "onRetryMediaProcessing" | "retryingMediaId"> & { settingsHref: string | null };',
]) {
  if (!recentMediaIssueCardActionsTypesSource.includes(requiredRecentMediaIssueCardActionsTypesUsage)) {
    throw new Error(
      `recent-media-issue-card-actions.types.ts must own recent-media actions prop typing: ${requiredRecentMediaIssueCardActionsTypesUsage}`,
    );
  }
}

const maxRecentMediaIssueCardActionsTypesLines = 2;
if (recentMediaIssueCardActionsTypesLines > maxRecentMediaIssueCardActionsTypesLines) {
  throw new Error(
    `recent-media-issue-card-actions.types.ts exceeded ${maxRecentMediaIssueCardActionsTypesLines} lines: ${recentMediaIssueCardActionsTypesLines}`,
  );
}

for (const requiredRecentMediaIssueCardTagsUsage of [
  'import type { RecentMediaIssueCardTagsProps } from "./recent-media-issue-card-tags.types";',
  "}: RecentMediaIssueCardTagsProps) {",
]) {
  if (!recentMediaIssueCardTagsSource.includes(requiredRecentMediaIssueCardTagsUsage)) {
    throw new Error(
      `recent-media-issue-card-tags.tsx must reuse the extracted recent-media tags props type: ${requiredRecentMediaIssueCardTagsUsage}`,
    );
  }
}

if (recentMediaIssueCardTagsSource.includes("}: Pick<RecentMediaIssueCardProps")) {
  throw new Error("recent-media-issue-card-tags.tsx must keep recent-media tags prop typing delegated");
}

for (const requiredRecentMediaIssueCardTagsTypesUsage of [
  'import type { RecentMediaIssueCardProps } from "./recent-media-issues-panel.types"; export type RecentMediaIssueCardTagsProps = Pick<RecentMediaIssueCardProps, "issue" | "locale" | "mediaIssueCopy">;',
]) {
  if (!recentMediaIssueCardTagsTypesSource.includes(requiredRecentMediaIssueCardTagsTypesUsage)) {
    throw new Error(
      `recent-media-issue-card-tags.types.ts must own recent-media tags prop typing: ${requiredRecentMediaIssueCardTagsTypesUsage}`,
    );
  }
}

const maxRecentMediaIssueCardTagsTypesLines = 2;
if (recentMediaIssueCardTagsTypesLines > maxRecentMediaIssueCardTagsTypesLines) {
  throw new Error(
    `recent-media-issue-card-tags.types.ts exceeded ${maxRecentMediaIssueCardTagsTypesLines} lines: ${recentMediaIssueCardTagsTypesLines}`,
  );
}

for (const requiredMediaPreviewContentUsage of [
  'import type { MediaPreviewContentProps } from "./media-preview-content.types";',
  "}: MediaPreviewContentProps) {",
]) {
  if (!mediaPreviewContentSource.includes(requiredMediaPreviewContentUsage)) {
    throw new Error(
      `media-preview-content.tsx must reuse the extracted media-preview-content props type: ${requiredMediaPreviewContentUsage}`,
    );
  }
}

if (mediaPreviewContentSource.includes("type MediaPreviewContentProps =")) {
  throw new Error("media-preview-content.tsx must keep media-preview-content prop typing delegated");
}

for (const requiredMediaPreviewContentTypesUsage of [
  'import type { MediaPreviewControllerResult, MediaPreviewProps } from "./media-preview.types"; export type MediaPreviewContentProps = Pick<MediaPreviewProps, "asset"> & MediaPreviewControllerResult;',
]) {
  if (!mediaPreviewContentTypesSource.includes(requiredMediaPreviewContentTypesUsage)) {
    throw new Error(
      `media-preview-content.types.ts must own media-preview-content prop typing: ${requiredMediaPreviewContentTypesUsage}`,
    );
  }
}

const maxMediaPreviewContentTypesLines = 2;
if (mediaPreviewContentTypesLines > maxMediaPreviewContentTypesLines) {
  throw new Error(
    `media-preview-content.types.ts exceeded ${maxMediaPreviewContentTypesLines} lines: ${mediaPreviewContentTypesLines}`,
  );
}

for (const requiredProviderFeatureCardStatusUsage of [
  'import type { ProviderFeatureCardStatusProps } from "./provider-feature-card-status.types";',
  "}: ProviderFeatureCardStatusProps) {",
]) {
  if (!providerFeatureCardStatusSource.includes(requiredProviderFeatureCardStatusUsage)) {
    throw new Error(
      `provider-feature-card-status.tsx must reuse the extracted provider-status props type: ${requiredProviderFeatureCardStatusUsage}`,
    );
  }
}

if (providerFeatureCardStatusSource.includes("type ProviderFeatureCardStatusProps = Pick<")) {
  throw new Error("provider-feature-card-status.tsx must keep provider-status prop typing delegated");
}

for (const requiredProviderFeatureCardStatusTypesUsage of [
  'import type { ProviderFeatureCardProps } from "./provider-feature-card.types"; export type ProviderFeatureCardStatusProps = Pick<ProviderFeatureCardProps, "copy" | "formatSecretStatus" | "isDirty" | "item">;',
]) {
  if (!providerFeatureCardStatusTypesSource.includes(requiredProviderFeatureCardStatusTypesUsage)) {
    throw new Error(
      `provider-feature-card-status.types.ts must own provider-status prop typing: ${requiredProviderFeatureCardStatusTypesUsage}`,
    );
  }
}

const maxProviderFeatureCardStatusTypesLines = 2;
if (providerFeatureCardStatusTypesLines > maxProviderFeatureCardStatusTypesLines) {
  throw new Error(
    `provider-feature-card-status.types.ts exceeded ${maxProviderFeatureCardStatusTypesLines} lines: ${providerFeatureCardStatusTypesLines}`,
  );
}

for (const requiredRecordReminderFormUsage of [
  'import { RecordReminderFormActions } from "./record-reminder-form-actions";',
  'import { RecordReminderFormFields } from "./record-reminder-form-fields";',
  'import type { RecordReminderFormProps } from "./record-reminder-form.types";',
  "<RecordReminderFormFields",
  "<RecordReminderFormActions",
]) {
  if (!recordReminderFormSource.includes(requiredRecordReminderFormUsage)) {
    throw new Error(
      `record-reminder-form.tsx must delegate reminder form sections to extracted leaves: ${requiredRecordReminderFormUsage}`,
    );
  }
}

for (const forbiddenRecordReminderFormToken of [
  'type="datetime-local"',
  'className="action-row"',
  'placeholder={reminderNotePlaceholder}',
  'onClick={() => void onCreateReminder()}',
]) {
  if (recordReminderFormSource.includes(forbiddenRecordReminderFormToken)) {
    throw new Error(
      `record-reminder-form.tsx must keep reminder field and action rendering delegated: ${forbiddenRecordReminderFormToken}`,
    );
  }
}

const maxRecordReminderFormLines = 55;
if (recordReminderFormLines > maxRecordReminderFormLines) {
  throw new Error(
    `record-reminder-form.tsx exceeded ${maxRecordReminderFormLines} lines: ${recordReminderFormLines}`,
  );
}

for (const requiredRecordReminderFormFieldsUsage of [
  'import type { RecordReminderFormFieldsProps } from "./record-reminder-form-fields.types";',
  "}: RecordReminderFormFieldsProps) {",
  'type="datetime-local"',
  'placeholder={reminderNotePlaceholder}',
  'onChange={(event) => onTitleChange(event.target.value)}',
]) {
  if (!recordReminderFormFieldsSource.includes(requiredRecordReminderFormFieldsUsage)) {
    throw new Error(
      `record-reminder-form-fields.tsx must reuse the extracted reminder-fields props type: ${requiredRecordReminderFormFieldsUsage}`,
    );
  }
}

if (recordReminderFormFieldsSource.includes("type RecordReminderFormFieldsProps = Pick<")) {
  throw new Error("record-reminder-form-fields.tsx must keep reminder-fields prop typing delegated");
}

const maxRecordReminderFormFieldsLines = 65;
if (recordReminderFormFieldsLines > maxRecordReminderFormFieldsLines) {
  throw new Error(
    `record-reminder-form-fields.tsx exceeded ${maxRecordReminderFormFieldsLines} lines: ${recordReminderFormFieldsLines}`,
  );
}

for (const requiredRecordReminderFormFieldsTypesUsage of [
  'import type { RecordReminderFormProps } from "./record-reminder-form.types"; export type RecordReminderFormFieldsProps = Pick<RecordReminderFormProps, "canWriteWorkspace" | "channelInApp" | "channelLabel" | "onMessageChange" | "onRemindAtChange" | "onTitleChange" | "remindAtLabel" | "reminderForm" | "reminderNoteLabel" | "reminderNotePlaceholder" | "reminderTitleLabel" | "reminderTitlePlaceholder">;',
]) {
  if (!recordReminderFormFieldsTypesSource.includes(requiredRecordReminderFormFieldsTypesUsage)) {
    throw new Error(
      `record-reminder-form-fields.types.ts must own reminder-fields prop typing: ${requiredRecordReminderFormFieldsTypesUsage}`,
    );
  }
}

const maxRecordReminderFormFieldsTypesLines = 2;
if (recordReminderFormFieldsTypesLines > maxRecordReminderFormFieldsTypesLines) {
  throw new Error(
    `record-reminder-form-fields.types.ts exceeded ${maxRecordReminderFormFieldsTypesLines} lines: ${recordReminderFormFieldsTypesLines}`,
  );
}

for (const requiredRecordReminderFormActionsUsage of [
  'import type { RecordReminderFormActionsProps } from "./record-reminder-form-actions.types";',
  "}: RecordReminderFormActionsProps) {",
  'className="action-row"',
  'onClick={() => void onCreateReminder()}',
]) {
  if (!recordReminderFormActionsSource.includes(requiredRecordReminderFormActionsUsage)) {
    throw new Error(
      `record-reminder-form-actions.tsx must reuse the extracted reminder-actions props type: ${requiredRecordReminderFormActionsUsage}`,
    );
  }
}

if (recordReminderFormActionsSource.includes("type RecordReminderFormActionsProps = Pick<")) {
  throw new Error("record-reminder-form-actions.tsx must keep reminder-actions prop typing delegated");
}

const maxRecordReminderFormActionsLines = 25;
if (recordReminderFormActionsLines > maxRecordReminderFormActionsLines) {
  throw new Error(
    `record-reminder-form-actions.tsx exceeded ${maxRecordReminderFormActionsLines} lines: ${recordReminderFormActionsLines}`,
  );
}

for (const requiredRecordReminderFormActionsTypesUsage of [
  'import type { RecordReminderFormProps } from "./record-reminder-form.types"; export type RecordReminderFormActionsProps = Pick<RecordReminderFormProps, "canWriteWorkspace" | "createReminderLabel" | "onCreateReminder" | "savingReminder" | "savingReminderLabel">;',
]) {
  if (!recordReminderFormActionsTypesSource.includes(requiredRecordReminderFormActionsTypesUsage)) {
    throw new Error(
      `record-reminder-form-actions.types.ts must own reminder-actions prop typing: ${requiredRecordReminderFormActionsTypesUsage}`,
    );
  }
}

const maxRecordReminderFormActionsTypesLines = 2;
if (recordReminderFormActionsTypesLines > maxRecordReminderFormActionsTypesLines) {
  throw new Error(
    `record-reminder-form-actions.types.ts exceeded ${maxRecordReminderFormActionsTypesLines} lines: ${recordReminderFormActionsTypesLines}`,
  );
}

for (const requiredDeadLetterRecoveryItemCardUsage of [
  'import { buildMediaIssueSettingsHref } from "../lib/record-panel-media";',
  'import { DeadLetterRecoveryItemCardActions } from "./dead-letter-recovery-item-card-actions";',
  'import { DeadLetterRecoveryItemCardHeader } from "./dead-letter-recovery-item-card-header";',
  'import { DeadLetterRecoveryItemCardStatus } from "./dead-letter-recovery-item-card-status";',
  'import type { DeadLetterRecoveryItemCardProps } from "./dead-letter-recovery-panel.types";',
  "}: DeadLetterRecoveryItemCardProps) {",
  "<DeadLetterRecoveryItemCardHeader",
  "<DeadLetterRecoveryItemCardStatus",
  "<DeadLetterRecoveryItemCardActions",
]) {
  if (!deadLetterRecoveryItemCardSource.includes(requiredDeadLetterRecoveryItemCardUsage)) {
    throw new Error(
      `dead-letter-recovery-item-card.tsx must delegate header and status rendering to extracted leaves: ${requiredDeadLetterRecoveryItemCardUsage}`,
    );
  }
}

for (const forbiddenDeadLetterRecoveryItemCardToken of [
  "getMediaIssueAction(",
  '<label className="action-row"',
  "{mediaIssueCopy.lastAttempt}: {formatHistoryTimestampLabel(item.processing_last_attempt_at)}",
  "item.processing_last_failure_at ? (",
  'className="notice" style={{ marginTop: 10 }}',
]) {
  if (deadLetterRecoveryItemCardSource.includes(forbiddenDeadLetterRecoveryItemCardToken)) {
    throw new Error(
      `dead-letter-recovery-item-card.tsx must keep header and status rendering delegated: ${forbiddenDeadLetterRecoveryItemCardToken}`,
    );
  }
}

const maxDeadLetterRecoveryItemCardLines = 60;
if (deadLetterRecoveryItemCardLines > maxDeadLetterRecoveryItemCardLines) {
  throw new Error(
    `dead-letter-recovery-item-card.tsx exceeded ${maxDeadLetterRecoveryItemCardLines} lines: ${deadLetterRecoveryItemCardLines}`,
  );
}

for (const requiredDeadLetterRecoveryItemCardHeaderUsage of [
  'import { canRetryMediaIssue } from "../lib/record-panel-media";',
  'import { DeadLetterRecoveryItemCardTags } from "./dead-letter-recovery-item-card-tags";',
  'import type { DeadLetterRecoveryItemCardHeaderProps } from "./dead-letter-recovery-item-card-header.types";',
  "}: DeadLetterRecoveryItemCardHeaderProps) {",
  '<label className="action-row"',
  "selectedDeadLetterIds.includes(item.media_id)",
  "onChange={(event) => onToggleSelection(item.media_id, event.target.checked)}",
]) {
  if (!deadLetterRecoveryItemCardHeaderSource.includes(requiredDeadLetterRecoveryItemCardHeaderUsage)) {
    throw new Error(
      `dead-letter-recovery-item-card-header.tsx must reuse the extracted item-header props type: ${requiredDeadLetterRecoveryItemCardHeaderUsage}`,
    );
  }
}

if (deadLetterRecoveryItemCardHeaderSource.includes("type DeadLetterRecoveryItemCardHeaderProps = Pick<")) {
  throw new Error(
    "dead-letter-recovery-item-card-header.tsx must keep item-header prop typing delegated",
  );
}

const maxDeadLetterRecoveryItemCardHeaderLines = 35;
if (deadLetterRecoveryItemCardHeaderLines > maxDeadLetterRecoveryItemCardHeaderLines) {
  throw new Error(
    `dead-letter-recovery-item-card-header.tsx exceeded ${maxDeadLetterRecoveryItemCardHeaderLines} lines: ${deadLetterRecoveryItemCardHeaderLines}`,
  );
}

for (const requiredDeadLetterRecoveryItemCardHeaderTypesUsage of [
  'import type { DeadLetterRecoveryItemCardProps } from "./dead-letter-recovery-panel.types"; export type DeadLetterRecoveryItemCardHeaderProps = Pick<DeadLetterRecoveryItemCardProps, "bulkRetryingDeadLetter" | "canWriteWorkspace" | "item" | "locale" | "mediaIssueCopy" | "onToggleSelection" | "selectedDeadLetterIds">;',
]) {
  if (!deadLetterRecoveryItemCardHeaderTypesSource.includes(requiredDeadLetterRecoveryItemCardHeaderTypesUsage)) {
    throw new Error(
      `dead-letter-recovery-item-card-header.types.ts must own item-header prop typing: ${requiredDeadLetterRecoveryItemCardHeaderTypesUsage}`,
    );
  }
}

const maxDeadLetterRecoveryItemCardHeaderTypesLines = 2;
if (deadLetterRecoveryItemCardHeaderTypesLines > maxDeadLetterRecoveryItemCardHeaderTypesLines) {
  throw new Error(
    `dead-letter-recovery-item-card-header.types.ts exceeded ${maxDeadLetterRecoveryItemCardHeaderTypesLines} lines: ${deadLetterRecoveryItemCardHeaderTypesLines}`,
  );
}

for (const requiredDeadLetterRecoveryItemCardStatusUsage of [
  'import { getMediaIssueAction } from "../lib/media-issue-display";',
  'import type { DeadLetterRecoveryItemCardStatusProps } from "./dead-letter-recovery-item-card-status.types";',
  "}: DeadLetterRecoveryItemCardStatusProps) {",
  "getMediaIssueAction(locale, item)",
  "{mediaIssueCopy.lastAttempt}: {formatHistoryTimestampLabel(item.processing_last_attempt_at)}",
  'className="notice" style={{ marginTop: 10 }}',
]) {
  if (!deadLetterRecoveryItemCardStatusSource.includes(requiredDeadLetterRecoveryItemCardStatusUsage)) {
    throw new Error(
      `dead-letter-recovery-item-card-status.tsx must reuse the extracted item-status props type: ${requiredDeadLetterRecoveryItemCardStatusUsage}`,
    );
  }
}

if (deadLetterRecoveryItemCardStatusSource.includes("type DeadLetterRecoveryItemCardStatusProps = Pick<")) {
  throw new Error(
    "dead-letter-recovery-item-card-status.tsx must keep item-status prop typing delegated",
  );
}

const maxDeadLetterRecoveryItemCardStatusLines = 45;
if (deadLetterRecoveryItemCardStatusLines > maxDeadLetterRecoveryItemCardStatusLines) {
  throw new Error(
    `dead-letter-recovery-item-card-status.tsx exceeded ${maxDeadLetterRecoveryItemCardStatusLines} lines: ${deadLetterRecoveryItemCardStatusLines}`,
  );
}

for (const requiredDeadLetterRecoveryItemCardStatusTypesUsage of [
  'import type { DeadLetterRecoveryItemCardProps } from "./dead-letter-recovery-panel.types"; export type DeadLetterRecoveryItemCardStatusProps = Pick<DeadLetterRecoveryItemCardProps, "formatHistoryTimestampLabel" | "item" | "locale" | "mediaIssueCopy">;',
]) {
  if (!deadLetterRecoveryItemCardStatusTypesSource.includes(requiredDeadLetterRecoveryItemCardStatusTypesUsage)) {
    throw new Error(
      `dead-letter-recovery-item-card-status.types.ts must own item-status prop typing: ${requiredDeadLetterRecoveryItemCardStatusTypesUsage}`,
    );
  }
}

const maxDeadLetterRecoveryItemCardStatusTypesLines = 2;
if (deadLetterRecoveryItemCardStatusTypesLines > maxDeadLetterRecoveryItemCardStatusTypesLines) {
  throw new Error(
    `dead-letter-recovery-item-card-status.types.ts exceeded ${maxDeadLetterRecoveryItemCardStatusTypesLines} lines: ${deadLetterRecoveryItemCardStatusTypesLines}`,
  );
}

for (const requiredMediaStorageHealthCardUsage of [
  'import { MediaStorageHealthCapabilities } from "./media-storage-health-capabilities";',
  'import { MediaStorageHealthHeader } from "./media-storage-health-header";',
  'import { MediaStorageHealthMetadata } from "./media-storage-health-metadata";',
  'import type { MediaStorageHealthCardProps } from "./media-storage-health-card.types";',
  "}: MediaStorageHealthCardProps) {",
  "<MediaStorageHealthHeader",
  "<MediaStorageHealthCapabilities",
  "<MediaStorageHealthMetadata",
]) {
  if (!mediaStorageHealthCardSource.includes(requiredMediaStorageHealthCardUsage)) {
    throw new Error(
      `media-storage-health-card.tsx must delegate health card sections to extracted leaves: ${requiredMediaStorageHealthCardUsage}`,
    );
  }
}

for (const forbiddenMediaStorageHealthCardToken of [
  '<div className="action-row" style={{ justifyContent: "space-between", alignItems: "flex-start" }}>',
  '<div className="tag-row">',
  "new Date(mediaStorageHealth.checked_at).toLocaleString(locale)",
  'mediaStorageHealth.warnings.join(" ")',
]) {
  if (mediaStorageHealthCardSource.includes(forbiddenMediaStorageHealthCardToken)) {
    throw new Error(
      `media-storage-health-card.tsx must keep health-card internals delegated: ${forbiddenMediaStorageHealthCardToken}`,
    );
  }
}

const maxMediaStorageHealthCardLines = 45;
if (mediaStorageHealthCardLines > maxMediaStorageHealthCardLines) {
  throw new Error(
    `media-storage-health-card.tsx exceeded ${maxMediaStorageHealthCardLines} lines: ${mediaStorageHealthCardLines}`,
  );
}

for (const requiredMediaStorageHealthHeaderUsage of [
  'import type { MediaStorageHealthHeaderProps } from "./media-storage-health-header.types";',
  "}: MediaStorageHealthHeaderProps) {",
  '<div className="action-row" style={{ justifyContent: "space-between", alignItems: "flex-start" }}>',
  "onClick={() => void onRefreshMediaStorageHealth()}",
  "{mediaStorageHealth.message}",
]) {
  if (!mediaStorageHealthHeaderSource.includes(requiredMediaStorageHealthHeaderUsage)) {
    throw new Error(
      `media-storage-health-header.tsx must reuse the extracted health-header props type: ${requiredMediaStorageHealthHeaderUsage}`,
    );
  }
}

if (mediaStorageHealthHeaderSource.includes("type MediaStorageHealthHeaderProps = Pick<")) {
  throw new Error("media-storage-health-header.tsx must keep health-header prop typing delegated");
}

const maxMediaStorageHealthHeaderLines = 40;
if (mediaStorageHealthHeaderLines > maxMediaStorageHealthHeaderLines) {
  throw new Error(
    `media-storage-health-header.tsx exceeded ${maxMediaStorageHealthHeaderLines} lines: ${mediaStorageHealthHeaderLines}`,
  );
}

for (const requiredMediaStorageHealthHeaderTypesUsage of [
  'import type { MediaStorageHealthCardProps } from "./media-storage-health-card.types"; export type MediaStorageHealthHeaderProps = Pick<MediaStorageHealthCardProps, "copy" | "mediaStorageHealth" | "onRefreshMediaStorageHealth" | "refreshingMediaStorageHealth">;',
]) {
  if (!mediaStorageHealthHeaderTypesSource.includes(requiredMediaStorageHealthHeaderTypesUsage)) {
    throw new Error(
      `media-storage-health-header.types.ts must own health-header prop typing: ${requiredMediaStorageHealthHeaderTypesUsage}`,
    );
  }
}

const maxMediaStorageHealthHeaderTypesLines = 2;
if (mediaStorageHealthHeaderTypesLines > maxMediaStorageHealthHeaderTypesLines) {
  throw new Error(
    `media-storage-health-header.types.ts exceeded ${maxMediaStorageHealthHeaderTypesLines} lines: ${mediaStorageHealthHeaderTypesLines}`,
  );
}

for (const requiredMediaStorageHealthMetadataUsage of [
  'import type { MediaStorageHealthMetadataProps } from "./media-storage-health-metadata.types";',
  "}: MediaStorageHealthMetadataProps) {",
  '<div className="tag-row">',
  "new Date(mediaStorageHealth.checked_at).toLocaleString(locale)",
  'mediaStorageHealth.warnings.join(" ")',
]) {
  if (!mediaStorageHealthMetadataSource.includes(requiredMediaStorageHealthMetadataUsage)) {
    throw new Error(
      `media-storage-health-metadata.tsx must reuse the extracted health-metadata props type: ${requiredMediaStorageHealthMetadataUsage}`,
    );
  }
}

if (mediaStorageHealthMetadataSource.includes("type MediaStorageHealthMetadataProps = Pick<")) {
  throw new Error(
    "media-storage-health-metadata.tsx must keep health-metadata prop typing delegated",
  );
}

const maxMediaStorageHealthMetadataLines = 50;
if (mediaStorageHealthMetadataLines > maxMediaStorageHealthMetadataLines) {
  throw new Error(
    `media-storage-health-metadata.tsx exceeded ${maxMediaStorageHealthMetadataLines} lines: ${mediaStorageHealthMetadataLines}`,
  );
}

for (const requiredMediaStorageHealthMetadataTypesUsage of [
  'import type { MediaStorageHealthCardProps } from "./media-storage-health-card.types"; export type MediaStorageHealthMetadataProps = Pick<MediaStorageHealthCardProps, "copy" | "formatSecretStatus" | "locale" | "mediaStorageHealth">;',
]) {
  if (!mediaStorageHealthMetadataTypesSource.includes(requiredMediaStorageHealthMetadataTypesUsage)) {
    throw new Error(
      `media-storage-health-metadata.types.ts must own health-metadata prop typing: ${requiredMediaStorageHealthMetadataTypesUsage}`,
    );
  }
}

const maxMediaStorageHealthMetadataTypesLines = 2;
if (mediaStorageHealthMetadataTypesLines > maxMediaStorageHealthMetadataTypesLines) {
  throw new Error(
    `media-storage-health-metadata.types.ts exceeded ${maxMediaStorageHealthMetadataTypesLines} lines: ${mediaStorageHealthMetadataTypesLines}`,
  );
}

for (const [componentName, componentSource, componentTypesSource, importLine, signatureLine, forbiddenLine, typesLine, maxLines, actualLines] of [
  [
    "record-editor-location-fields",
    recordEditorLocationFieldsSource,
    recordEditorLocationFieldsTypesSource,
    'import type { RecordEditorLocationFieldsProps } from "./record-editor-location-fields.types";',
    "}: RecordEditorLocationFieldsProps) {",
    "type RecordEditorLocationFieldsProps = Pick<",
    'import type { RecordEditorFieldsProps } from "./record-editor-fields.types"; export type RecordEditorLocationFieldsProps = Pick<RecordEditorFieldsProps, "canWriteWorkspace" | "form" | "onAddressChange" | "onAvoidChange" | "onLatitudeChange" | "onLongitudeChange" | "onPlaceNameChange" | "panelCopy">;',
    2,
    recordEditorLocationFieldsTypesLines,
  ],
  [
    "record-editor-primary-fields",
    recordEditorPrimaryFieldsSource,
    recordEditorPrimaryFieldsTypesSource,
    'import type { RecordEditorPrimaryFieldsProps } from "./record-editor-primary-fields.types";',
    "}: RecordEditorPrimaryFieldsProps) {",
    "type RecordEditorPrimaryFieldsProps = Pick<",
    'import type { RecordEditorFieldsProps } from "./record-editor-fields.types"; export type RecordEditorPrimaryFieldsProps = Pick<RecordEditorFieldsProps, "canWriteWorkspace" | "editorLabel" | "form" | "onContentChange" | "onTitleChange" | "panelCopy">;',
    2,
    recordEditorPrimaryFieldsTypesLines,
  ],
  [
    "record-editor-metadata-fields",
    recordEditorMetadataFieldsSource,
    recordEditorMetadataFieldsTypesSource,
    'import type { RecordEditorMetadataFieldsProps } from "./record-editor-metadata-fields.types";',
    "}: RecordEditorMetadataFieldsProps) {",
    "type RecordEditorMetadataFieldsProps = Pick<",
    'import type { RecordEditorFieldsProps } from "./record-editor-fields.types"; export type RecordEditorMetadataFieldsProps = Pick<RecordEditorFieldsProps, "canWriteWorkspace" | "form" | "onOccurredAtChange" | "onRatingChange" | "onTypeCodeChange" | "panelCopy">;',
    2,
    recordEditorMetadataFieldsTypesLines,
  ],
  [
    "record-media-tools-actions",
    recordMediaToolsActionsSource,
    recordMediaToolsActionsTypesSource,
    'import type { RecordMediaToolsActionsProps } from "./record-media-tools-actions.types";',
    "}: RecordMediaToolsActionsProps) {",
    "type RecordMediaToolsActionsProps = Pick<",
    'import type { RecordMediaToolsProps } from "./record-media-tools.types"; export type RecordMediaToolsActionsProps = Pick<RecordMediaToolsProps, "canWriteWorkspace" | "deleteButtonLabel" | "deleting" | "error" | "hasSelectedRecord" | "onDelete" | "onUpload" | "saveButtonLabel" | "saving" | "uploadAttachmentLabel" | "uploading" | "uploadingMediaLabel">;',
    2,
    recordMediaToolsActionsTypesLines,
  ],
  [
    "record-reminder-form",
    recordReminderFormSource,
    recordReminderFormTypesSource,
    'import type { RecordReminderFormProps } from "./record-reminder-form.types";',
    "}: RecordReminderFormProps) {",
    "type RecordReminderFormProps = Pick<",
    'import type { RecordReminderPanelProps } from "./record-reminder-panel.types"; export type RecordReminderFormProps = Pick<RecordReminderPanelProps, "canWriteWorkspace" | "channelInApp" | "channelLabel" | "createReminderLabel" | "onCreateReminder" | "onMessageChange" | "onRemindAtChange" | "onTitleChange" | "remindAtLabel" | "reminderForm" | "reminderNoteLabel" | "reminderNotePlaceholder" | "reminderTitleLabel" | "reminderTitlePlaceholder" | "savingReminder" | "savingReminderLabel">;',
    2,
    recordReminderFormTypesLines,
  ],
  [
    "record-reminder-list",
    recordReminderListSource,
    recordReminderListTypesSource,
    'import type { RecordReminderListProps } from "./record-reminder-list.types";',
    "}: RecordReminderListProps) {",
    "type RecordReminderListProps = Pick<",
    'import type { RecordReminderPanelProps } from "./record-reminder-panel.types"; export type RecordReminderListProps = Pick<RecordReminderPanelProps, "canWriteWorkspace" | "deleteReminderLabel" | "enableReminderLabel" | "formatReminderEnabledLabel" | "formatReminderStatusLabel" | "formatReminderTimestampLabel" | "markReminderDoneLabel" | "noRemindersLabel" | "onDeleteReminder" | "onMarkReminderDone" | "onToggleReminderEnabled" | "pauseReminderLabel" | "reminders" | "selectedRecordTitle" | "untitledReminderLabel">;',
    2,
    recordReminderListTypesLines,
  ],
]) {
  for (const requiredUsage of [importLine, signatureLine]) {
    if (!componentSource.includes(requiredUsage)) {
      throw new Error(`${componentName}.tsx must reuse the extracted leaf props type: ${requiredUsage}`);
    }
  }
  if (componentSource.includes(forbiddenLine)) {
    throw new Error(`${componentName}.tsx must keep leaf prop typing delegated`);
  }
  if (!componentTypesSource.includes(typesLine)) {
    throw new Error(`${componentName}.types.ts must own leaf prop typing: ${typesLine}`);
  }
  if (actualLines > maxLines) {
    throw new Error(`${componentName}.types.ts exceeded ${maxLines} lines: ${actualLines}`);
  }
}

for (const [componentName, componentSource, componentTypesSource, importLine, signatureLine, forbiddenTokens, typesLine, maxLines, actualLines] of [
  [
    "record-editor-support-tools-media-copy-props",
    recordEditorSupportToolsMediaCopyPropsSource,
    recordEditorSupportToolsMediaCopyPropsTypesSource,
    'import type { BuildRecordMediaToolsCopyPropsInput } from "./record-editor-support-tools-media-copy-props.types";',
    "}: BuildRecordMediaToolsCopyPropsInput) {",
    ["RecordEditorSupportToolsProps", "}: Pick<"],
    'import type { RecordEditorSupportToolsProps } from "./record-editor-support-tools.types"; export type BuildRecordMediaToolsCopyPropsInput = Pick<RecordEditorSupportToolsProps, "deleting" | "panelCopy" | "saving" | "selectedRecord">;',
    2,
    recordEditorSupportToolsMediaCopyPropsTypesLines,
  ],
  [
    "record-editor-support-tools-reminder-derived-props",
    recordEditorSupportToolsReminderDerivedPropsSource,
    recordEditorSupportToolsReminderDerivedPropsTypesSource,
    'import type { BuildRecordReminderToolsDerivedPropsInput } from "./record-editor-support-tools-reminder-derived-props.types";',
    "}: BuildRecordReminderToolsDerivedPropsInput) {",
    ["RecordEditorSupportToolsProps", "}: Pick<"],
    'import type { RecordEditorSupportToolsProps } from "./record-editor-support-tools.types"; export type BuildRecordReminderToolsDerivedPropsInput = Pick<RecordEditorSupportToolsProps, "channelInAppLabel" | "selectedRecord">;',
    2,
    recordEditorSupportToolsReminderDerivedPropsTypesLines,
  ],
]) {
  for (const requiredUsage of [importLine, signatureLine]) {
    if (!componentSource.includes(requiredUsage)) {
      throw new Error(`${componentName}.ts must reuse the extracted support-tools input type: ${requiredUsage}`);
    }
  }
  for (const forbiddenToken of forbiddenTokens) {
    if (componentSource.includes(forbiddenToken)) {
      throw new Error(`${componentName}.ts must keep support-tools input typing delegated: ${forbiddenToken}`);
    }
  }
  if (!componentTypesSource.includes(typesLine)) {
    throw new Error(`${componentName}.types.ts must own support-tools input typing: ${typesLine}`);
  }
  if (actualLines > maxLines) {
    throw new Error(`${componentName}.types.ts exceeded ${maxLines} lines: ${actualLines}`);
  }
}

for (const [componentName, componentSource, componentTypesSource, importLine, signatureLine, forbiddenLine, typesLine, maxLines, actualLines] of [
  [
    "dead-letter-recovery-item-card-actions",
    deadLetterRecoveryItemCardActionsSource,
    deadLetterRecoveryItemCardActionsTypesSource,
    'import type { DeadLetterRecoveryItemCardActionsProps } from "./dead-letter-recovery-item-card-actions.types";',
    "}: DeadLetterRecoveryItemCardActionsProps) {",
    "}: Pick<",
    'import type { DeadLetterRecoveryItemCardProps } from "./dead-letter-recovery-panel.types"; export type DeadLetterRecoveryItemCardActionsProps = Pick<DeadLetterRecoveryItemCardProps, "item" | "canWriteWorkspace" | "mediaIssueCopy" | "onRetryMediaProcessing" | "retryingMediaId"> & { settingsHref: string | null };',
    2,
    deadLetterRecoveryItemCardActionsTypesLines,
  ],
  [
    "dead-letter-recovery-item-card-tags",
    deadLetterRecoveryItemCardTagsSource,
    deadLetterRecoveryItemCardTagsTypesSource,
    'import type { DeadLetterRecoveryItemCardTagsProps } from "./dead-letter-recovery-item-card-tags.types";',
    "}: DeadLetterRecoveryItemCardTagsProps) {",
    "}: Pick<DeadLetterRecoveryItemCardProps",
    'import type { DeadLetterRecoveryItemCardProps } from "./dead-letter-recovery-panel.types"; export type DeadLetterRecoveryItemCardTagsProps = Pick<DeadLetterRecoveryItemCardProps, "item" | "locale" | "mediaIssueCopy">;',
    2,
    deadLetterRecoveryItemCardTagsTypesLines,
  ],
  [
    "dead-letter-recovery-panel-content",
    deadLetterRecoveryPanelContentSource,
    deadLetterRecoveryPanelContentTypesSource,
    'import type { DeadLetterRecoveryPanelContentProps } from "./dead-letter-recovery-panel-content.types";',
    "}: DeadLetterRecoveryPanelContentProps) {",
    "}: Pick<",
    'import type { DeadLetterRecoveryPanelProps } from "./dead-letter-recovery-panel.types"; export type DeadLetterRecoveryPanelContentProps = Pick<DeadLetterRecoveryPanelProps, "bulkRetryingDeadLetter" | "canWriteWorkspace" | "formatHistoryTimestampLabel" | "locale" | "mediaDeadLetterOverview" | "mediaIssueCopy" | "onRetryMediaProcessing" | "onToggleSelection" | "retryingMediaId" | "selectedDeadLetterIds" | "workspaceId">;',
    2,
    deadLetterRecoveryPanelContentTypesLines,
  ],
  [
    "media-storage-health-capabilities",
    mediaStorageHealthCapabilitiesSource,
    mediaStorageHealthCapabilitiesTypesSource,
    'import type { MediaStorageHealthCapabilitiesProps } from "./media-storage-health-capabilities.types";',
    "}: MediaStorageHealthCapabilitiesProps) {",
    "}: Pick<MediaStorageHealthCardProps",
    'import type { MediaStorageHealthCardProps } from "./media-storage-health-card.types"; export type MediaStorageHealthCapabilitiesProps = Pick<MediaStorageHealthCardProps, "copy" | "mediaStorageHealth">;',
    2,
    mediaStorageHealthCapabilitiesTypesLines,
  ],
  [
    "record-results-list-view",
    recordResultsListViewSource,
    recordResultsListViewTypesSource,
    'import type { RecordResultsListViewProps } from "./record-results-list-view.types";',
    "}: RecordResultsListViewProps) {",
    "type RecordResultsListViewProps = Pick<",
    'import type { RecordResultsSharedCardProps, RecordResultsViewProps } from "./record-results-view.types"; export type RecordResultsListViewProps = Pick<RecordResultsViewProps, "noRecordsLabel" | "records"> & { sharedCardProps: RecordResultsSharedCardProps };',
    2,
    recordResultsListViewTypesLines,
  ],
  [
    "record-results-timeline-view",
    recordResultsTimelineViewSource,
    recordResultsTimelineViewTypesSource,
    'import type { RecordResultsTimelineViewProps } from "./record-results-timeline-view.types";',
    "}: RecordResultsTimelineViewProps) {",
    "type RecordResultsTimelineViewProps = Pick<",
    'import type { RecordResultsSharedCardProps, RecordResultsViewProps } from "./record-results-view.types"; export type RecordResultsTimelineViewProps = Pick<RecordResultsViewProps, "formatAvoidCountLabel" | "formatTimelineCountLabel" | "formatTimelineDateLabel" | "noRecordsLabel" | "timelineDayLabel" | "timelineDays"> & { sharedCardProps: RecordResultsSharedCardProps };',
    2,
    recordResultsTimelineViewTypesLines,
  ],
]) {
  for (const requiredUsage of [importLine, signatureLine]) {
    if (!componentSource.includes(requiredUsage)) {
      throw new Error(`${componentName}.tsx must reuse the extracted leaf props type: ${requiredUsage}`);
    }
  }
  if (componentSource.includes(forbiddenLine)) {
    throw new Error(`${componentName}.tsx must keep leaf prop typing delegated`);
  }
  if (!componentTypesSource.includes(typesLine)) {
    throw new Error(`${componentName}.types.ts must own leaf prop typing: ${typesLine}`);
  }
  if (actualLines > maxLines) {
    throw new Error(`${componentName}.types.ts exceeded ${maxLines} lines: ${actualLines}`);
  }
}

console.log("record-panel structure verification passed");
