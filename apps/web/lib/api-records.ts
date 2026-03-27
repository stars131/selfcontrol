import type { RecordFilterState, RecordItem, SearchPresetItem, TimelineDay } from "./types";
import { request } from "./api-core";

type SearchResult = {
  items: RecordItem[];
  summary: string;
};

type SearchPresetApiItem = {
  id: string;
  workspace_id: string;
  created_by: string;
  name: string;
  filters_json: {
    query?: string;
    type_code?: string;
    is_avoid?: string;
    place_query?: string;
    review_status?: string;
    mapped_only?: string;
  };
  created_at: string;
  updated_at: string;
};

function mapSearchPreset(item: SearchPresetApiItem): SearchPresetItem {
  return {
    id: item.id,
    workspace_id: item.workspace_id,
    created_by: item.created_by,
    name: item.name,
    filters: {
      query: item.filters_json.query ?? "",
      typeCode: item.filters_json.type_code ?? "all",
      avoidOnly: (item.filters_json.is_avoid as RecordFilterState["avoidOnly"]) ?? "all",
      placeQuery: item.filters_json.place_query ?? "",
      reviewStatus: (item.filters_json.review_status as RecordFilterState["reviewStatus"]) ?? "all",
      mappedOnly: (item.filters_json.mapped_only as RecordFilterState["mappedOnly"]) ?? "all",
    },
    created_at: item.created_at,
    updated_at: item.updated_at,
  };
}

export async function listRecords(
  token: string,
  workspaceId: string,
  params?: Partial<RecordFilterState>,
) {
  const searchParams = new URLSearchParams();
  if (params?.query?.trim()) {
    searchParams.set("q", params.query.trim());
  }
  if (params?.typeCode && params.typeCode !== "all") {
    searchParams.set("type_code", params.typeCode);
  }
  if (params?.avoidOnly === "avoid") {
    searchParams.set("is_avoid", "true");
  }
  if (params?.avoidOnly === "normal") {
    searchParams.set("is_avoid", "false");
  }
  if (params?.placeQuery?.trim()) {
    searchParams.set("location_query", params.placeQuery.trim());
  }
  if (params?.reviewStatus && params.reviewStatus !== "all") {
    searchParams.set("review_status", params.reviewStatus);
  }
  if (params?.mappedOnly === "mapped") {
    searchParams.set("has_coordinates", "true");
  }
  if (params?.mappedOnly === "unmapped") {
    searchParams.set("has_coordinates", "false");
  }

  const query = searchParams.toString();
  const path = query
    ? `/workspaces/${workspaceId}/records?${query}`
    : `/workspaces/${workspaceId}/records`;
  return request<{ items: RecordItem[] }>(path, { method: "GET" }, token);
}

export async function listSearchPresets(token: string, workspaceId: string) {
  const result = await request<{ items: SearchPresetApiItem[] }>(
    `/workspaces/${workspaceId}/search-presets`,
    { method: "GET" },
    token,
  );
  return { items: result.items.map(mapSearchPreset) };
}

export async function createSearchPreset(
  token: string,
  workspaceId: string,
  input: {
    name: string;
    filters: RecordFilterState;
  },
) {
  const result = await request<{ preset: SearchPresetApiItem }>(
    `/workspaces/${workspaceId}/search-presets`,
    {
      method: "POST",
      body: JSON.stringify({
        name: input.name,
        filters: {
          query: input.filters.query,
          type_code: input.filters.typeCode,
          is_avoid: input.filters.avoidOnly,
          place_query: input.filters.placeQuery,
          review_status: input.filters.reviewStatus,
          mapped_only: input.filters.mappedOnly,
        },
      }),
    },
    token,
  );
  return { preset: mapSearchPreset(result.preset) };
}

export async function deleteSearchPreset(token: string, workspaceId: string, presetId: string) {
  return request<{ deleted: boolean }>(
    `/workspaces/${workspaceId}/search-presets/${presetId}`,
    { method: "DELETE" },
    token,
  );
}

export async function getTimeline(
  token: string,
  workspaceId: string,
  params?: { typeCode?: string; isAvoid?: boolean; startDate?: string; endDate?: string },
) {
  const searchParams = new URLSearchParams();
  if (params?.typeCode) {
    searchParams.set("type_code", params.typeCode);
  }
  if (typeof params?.isAvoid === "boolean") {
    searchParams.set("is_avoid", String(params.isAvoid));
  }
  if (params?.startDate) {
    searchParams.set("start_date", params.startDate);
  }
  if (params?.endDate) {
    searchParams.set("end_date", params.endDate);
  }

  const query = searchParams.toString();
  const path = query
    ? `/workspaces/${workspaceId}/timeline?${query}`
    : `/workspaces/${workspaceId}/timeline`;
  return request<{ items: TimelineDay[]; total_days: number; total_records: number }>(
    path,
    { method: "GET" },
    token,
  );
}

export async function createRecord(
  token: string,
  workspaceId: string,
  input: {
    type_code: string;
    title?: string;
    content: string;
    rating?: number;
    occurred_at?: string;
    is_avoid?: boolean;
    source_type?: string;
    extra_data?: Record<string, unknown>;
  },
) {
  return request<{ record: RecordItem }>(
    `/workspaces/${workspaceId}/records`,
    {
      method: "POST",
      body: JSON.stringify(input),
    },
    token,
  );
}

export async function searchRecords(token: string, workspaceId: string, query: string) {
  return request<SearchResult>(
    `/workspaces/${workspaceId}/search`,
    {
      method: "POST",
      body: JSON.stringify({ query }),
    },
    token,
  );
}

export async function updateRecord(
  token: string,
  workspaceId: string,
  recordId: string,
  input: Partial<{
    title: string;
    content: string;
    rating: number | null;
    occurred_at: string | null;
    is_avoid: boolean;
    status: string;
    extra_data: Record<string, unknown>;
  }>,
) {
  return request<{ record: RecordItem }>(
    `/workspaces/${workspaceId}/records/${recordId}`,
    {
      method: "PATCH",
      body: JSON.stringify(input),
    },
    token,
  );
}

export async function deleteRecord(token: string, workspaceId: string, recordId: string) {
  return request<{ deleted: boolean }>(
    `/workspaces/${workspaceId}/records/${recordId}`,
    { method: "DELETE" },
    token,
  );
}
