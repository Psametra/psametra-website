import { AdminEditor } from "@/components/admin/admin-editor";
import { contentStoreStatus, getSiteContent } from "@/lib/content-store";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const [content, status] = await Promise.all([
    getSiteContent(),
    contentStoreStatus(),
  ]);
  return (
    <AdminEditor initialContent={content} configured={status.configured} />
  );
}
