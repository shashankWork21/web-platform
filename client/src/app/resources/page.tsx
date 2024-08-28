import { getActiveResources } from "@/actions/resources";
import ResourceList from "@/components/general/resource-list";

export default async function ResourcesPage() {
  const activeResources = await getActiveResources();
  return <ResourceList activeResources={activeResources} />;
}
