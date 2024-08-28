import AdminRoute from "@/components/admin/admin-route";
import { getAllCategories } from "@/actions";

import { getCurrencies } from "@/actions";
import CategoriesList from "@/components/admin/categories-list";

export default async function AdminDashboardCateforiesListPage() {
  const categories = await getAllCategories();
  const currencies = await getCurrencies();
  return (
    <div>
      <AdminRoute>
        <CategoriesList categories={categories} currencies={currencies} />
      </AdminRoute>
    </div>
  );
}
