import { createCategory } from "@/actions";
import AdminRoute from "@/components/admin/admin-route";
import CategoryCreationForm from "@/components/admin/category-creation-form";

export default async function SerciveCreatePage() {
  return (
    <AdminRoute>
      <CategoryCreationForm formAction={createCategory} buttonText="Create" />
    </AdminRoute>
  );
}
