const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000/api/v1";

type Envelope<T> = {
  success: boolean;
  data: T;
  error?: {
    code?: string;
    message?: string;
  };
};

type ApiErrorPayload = {
  error?: {
    code?: string;
    message?: string;
  };
  detail?: string;
};

export class ApiRequestError extends Error {
  code: string | null;
  status: number;

  constructor(message: string, { code, status }: { code?: string | null; status: number }) {
    super(message);
    this.name = "ApiRequestError";
    this.code = code ?? null;
    this.status = status;
  }
}

function buildApiRequestError(response: Response, payload?: ApiErrorPayload | null) {
  return new ApiRequestError(payload?.error?.message?.trim() || payload?.detail?.trim() || "", {
    code: payload?.error?.code,
    status: response.status,
  });
}

async function readApiErrorPayload(response: Response) {
  try {
    return (await response.json()) as ApiErrorPayload;
  } catch {
    return null;
  }
}

export async function request<T>(path: string, init: RequestInit = {}, token?: string): Promise<T> {
  const headers = new Headers(init.headers);
  if (!headers.has("Content-Type") && init.body && !(init.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers,
  });
  let payload: (Envelope<T> & ApiErrorPayload) | null = null;

  try {
    payload = (await response.json()) as Envelope<T> & ApiErrorPayload;
  } catch {
    throw buildApiRequestError(response);
  }

  if (!response.ok || !payload?.success) {
    throw buildApiRequestError(response, payload);
  }

  return payload.data;
}

export async function requestBlob(path: string, token: string): Promise<Blob> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw buildApiRequestError(response, await readApiErrorPayload(response));
  }

  return response.blob();
}

export async function requestDownload(
  path: string,
  token: string,
): Promise<{ blob: Blob; filename: string | null }> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw buildApiRequestError(response, await readApiErrorPayload(response));
  }

  const blob = await response.blob();
  const contentDisposition = response.headers.get("content-disposition");
  const filenameMatch = contentDisposition?.match(/filename="([^"]+)"/i) ?? null;
  return {
    blob,
    filename: filenameMatch?.[1] ?? null,
  };
}
