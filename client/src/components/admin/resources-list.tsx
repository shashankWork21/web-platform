"use client";

import Link from "next/link";
import ResourceEditForm from "./resource-edit-form";

const ResourcesList = ({ resources, currencies }: any) => {
  return (
    <div className="w-full flex flex-col space-y-5 items-center px-3 py-5">
      {resources ? (
        resources.map((item: any) => {
          return (
            <ResourceEditForm
              key={item.id}
              resource={item}
              currencies={currencies}
            />
          );
        })
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default ResourcesList;
