import { SharePreviewClient } from "../../../components/share-preview-client";

export default async function SharePage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  return <SharePreviewClient tokenValue={token} />;
}
