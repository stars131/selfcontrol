# Remote Media Storage Webhook Contract

This document defines the custom remote media storage webhook expected by SelfControl.

## Purpose

SelfControl can store media binaries in a remote service instead of local disk when the
`media_storage` provider is configured as `custom`.

The configured `api_base_url` must point to the webhook service root, for example:

- `https://storage.example.com/api`

Do not configure endpoint-specific URLs such as:

- `https://storage.example.com/api/media/upload`
- `https://storage.example.com/api/media/content`
- `https://storage.example.com/api/media/delete`

## Contract Version

Current contract version:

- `selfcontrol-media-storage-v1`

SelfControl sends this version in every remote media storage request.

## Common Headers

Every request includes:

- `X-SelfControl-Media-Storage-Contract: selfcontrol-media-storage-v1`
- `X-SelfControl-Media-Storage-Operation: upload|download|delete`

If a secret is configured for the provider, the request also includes:

- `Authorization: Bearer <server-side-secret>`

## Upload Endpoint

Request:

- `POST {api_base_url}/media/upload`
- multipart form fields:
- `workspace_id`
- `record_id`
- `contract_version`
- `file`

Successful response:

- HTTP `200`
- JSON object

Required JSON fields:

- `storage_key`: non-empty string, max length 1024, no control characters

Optional JSON fields:

- `size_bytes`: non-negative integer
- `provider_asset_id`: provider-side asset identifier
- `metadata_json`: JSON object with provider metadata

Notes:

- `metadata_json` should only contain normal JSON-compatible values
- response headers may include `x-request-id`; SelfControl stores it for diagnostics

Example response:

```json
{
  "storage_key": "remote/workspace-1/media/voice-note.m4a",
  "size_bytes": 248371,
  "provider_asset_id": "asset_12345",
  "metadata_json": {
    "bucket": "primary",
    "region": "ap-southeast-1"
  }
}
```

## Download Endpoint

Request:

- `GET {api_base_url}/media/content`
- query params:
- `storage_key`
- `contract_version`

Successful response:

- HTTP `200`
- raw file body
- `Content-Type` should match the stored media when possible

Special responses:

- HTTP `404`: object not found

## Delete Endpoint

Request:

- `POST {api_base_url}/media/delete`
- JSON body:

```json
{
  "storage_key": "remote/workspace-1/media/voice-note.m4a",
  "contract_version": "selfcontrol-media-storage-v1"
}
```

Successful response:

- HTTP `200`
- HTTP `204`

Special responses:

- HTTP `404`: treated as already deleted

## Failure Handling

SelfControl treats these cases as remote storage failures:

- request timeout
- transport/network failure
- non-JSON upload response
- upload response without `storage_key`
- invalid `storage_key`
- negative or non-integer `size_bytes`
- HTTP status `>= 400` except `404` for delete/content handling above

## Stored Metadata

For accepted upload responses, SelfControl stores:

- `remote_storage_mode: custom_webhook`
- `remote_contract_version: selfcontrol-media-storage-v1`
- `provider_asset_id` if returned
- `webhook_request_id` if present in response headers
- sanitized `metadata_json` fields from the provider
