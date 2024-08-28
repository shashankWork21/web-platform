import AdminRoute from "@/components/admin/admin-route";
import { getCurrencies } from "@/actions";
import AdminDashboardCurrencies from "@/components/admin/admin-dashboard-currencies";

export default async function AdminDashboardPage() {
  const currencies = await getCurrencies();
  return (
    <div className="w-full min-h-screen">
      <AdminRoute>
        <AdminDashboardCurrencies currencies={currencies} />
      </AdminRoute>
    </div>
  );
}
