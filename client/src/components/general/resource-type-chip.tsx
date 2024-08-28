"use client";

import { Chip } from "@material-tailwind/react";

export default function ResourceTypeChip({ resourceType, size }: any) {
  const color = resourceType === "PRODUCT" ? "amber" : "green";

  return (
    <Chip
      value={resourceType
        .toLowerCase()
        .replace(/\b\w/g, (char: string) => char.toUpperCase())}
      className={`${
        color === "green"
          ? "bg-lime-green text-signal-black"
          : "bg-cypher-blue text-white"
      }`}
      size={size}
    ></Chip>
  );
}
