"use client";

import Link from "next/link";
import CategoryEditForm from "./category-edit-form";

const CategoriesList = ({ categories, currencies }: any) => {
  return (
    <div className="w-full flex flex-col space-y-5 items-center px-3 py-5">
      {categories ? (
        categories.map((item: any) => {
          return (
            <CategoryEditForm
              key={item.id}
              category={item}
              currencies={currencies}
            />
          );
        })
      ) : (
        <div>Loading...</div>
      )}
      <Link
        href="/admin/dashboard/categories/new"
        className="px-8 py-4 bg-signal-black shadow-md text-white rounded-lg hover:bg-signal-black-3 hover:text-signal-black-11 transition duration-300"
      >
        Create a new Category
      </Link>
    </div>
  );
};

export default CategoriesList;
