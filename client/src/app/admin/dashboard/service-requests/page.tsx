import { getServiceRequestsAdmin } from "@/actions";
import AdminRoute from "@/components/admin/admin-route";
import ServiceRequestList from "@/components/admin/service-requests-list";

export default async function ServiceRequestsPage() {
  const serviceRequests = await getServiceRequestsAdmin();
  console.log(JSON.stringify(serviceRequests));
  return (
    <AdminRoute>
      <div className="w-full">
        <ServiceRequestList serviceRequests={serviceRequests} />
      </div>
    </AdminRoute>
  );
}
