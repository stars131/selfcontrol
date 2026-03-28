"use client";
import type { DeadLetterRecoveryItemCardTagsProps } from "./dead-letter-recovery-item-card-tags.types";
import type { BuildDeadLetterRecoveryItemCardTagsPropsInput } from "./dead-letter-recovery-item-card-tags-props.types";
export function buildDeadLetterRecoveryItemCardTagsProps({ item, locale, mediaIssueCopy }: BuildDeadLetterRecoveryItemCardTagsPropsInput): DeadLetterRecoveryItemCardTagsProps { return { item, locale, mediaIssueCopy }; }
