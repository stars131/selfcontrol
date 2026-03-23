"use client";

import { RecordMediaSelectedContent } from "./record-media-selected-content";
import {
  buildRecordMediaSelectedContentProps,
  buildRecordMediaToolsActionsProps,
} from "./record-media-tools-props";
import { RecordMediaToolsActions } from "./record-media-tools-actions";
import type { RecordMediaToolsProps } from "./record-media-tools.types";

export function RecordMediaTools(props: RecordMediaToolsProps) {
  return (
    <>
      <RecordMediaToolsActions {...buildRecordMediaToolsActionsProps(props)} />
      {props.hasSelectedRecord ? (
        <RecordMediaSelectedContent {...buildRecordMediaSelectedContentProps(props)} />
      ) : null}
    </>
  );
}
