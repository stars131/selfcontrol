import { readLocationInfo, readLocationReview } from "./location";
import type { RecordItem } from "./types";
import type { LocationDraft } from "../components/map-panel";

export type RecordFormState = {
  title: string;
  content: string;
  type_code: string;
  rating: string;
  occurred_at: string;
  is_avoid: boolean;
  location: LocationDraft;
};

export type ReminderFormState = {
  title: string;
  message: string;
  remind_at: string;
};

export type LocationReviewFormState = {
  status: string;
  note: string;
};

export function createEmptyLocation(): LocationDraft {
  return {
    place_name: "",
    address: "",
    latitude: "",
    longitude: "",
    source: "manual",
  };
}

export function createEmptyForm(): RecordFormState {
  return {
    title: "",
    content: "",
    type_code: "memo",
    rating: "",
    occurred_at: "",
    is_avoid: false,
    location: createEmptyLocation(),
  };
}

export function readLocationForm(record: RecordItem | null): LocationDraft {
  const location = readLocationInfo(record?.extra_data);
  return {
    place_name: location.place_name,
    address: location.address,
    latitude: location.latitude === null ? "" : String(location.latitude),
    longitude: location.longitude === null ? "" : String(location.longitude),
    source: location.source,
  };
}

export function readLocationReviewForm(record: RecordItem | null): LocationReviewFormState {
  const review = readLocationReview(record?.extra_data);
  return {
    status: review?.status || "pending",
    note: review?.note || "",
  };
}

export function formatDatetimeInput(value?: string | null): string {
  if (!value) {
    return "";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "";
  }

  const timezoneOffsetMs = date.getTimezoneOffset() * 60_000;
  return new Date(date.getTime() - timezoneOffsetMs).toISOString().slice(0, 16);
}

export function createEmptyReminderForm(): ReminderFormState {
  return {
    title: "",
    message: "",
    remind_at: "",
  };
}
