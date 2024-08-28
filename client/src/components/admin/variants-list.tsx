"use client";

import VariantEditForm from "./variant-edit-form";

export default function VariantList({ variants }: any) {
  return (
    <div className="w-full flex flex-col space-y-5 items-center px-3 py-5">
      {variants.map((item: any) => {
        return <VariantEditForm key={item.id} variant={item} />;
      })}
    </div>
  );
}
