"use client";

import { Card, CardBody, Typography } from "@material-tailwind/react";

export default function ServiceRequestEditForm({ serviceRequest }: any) {
  const {
    variant: {
      title,
      price,
      currency,
      resource: { title: resourceTitle },
    },
    user: { firstName, lastName },
    subject,
    description,
    createdAt,
  } = serviceRequest;

  return (
    <Card className="w-5/6 mx-auto my-4 shadow-lg bg-stone-white-5 text-signal-black">
      <CardBody>
        <Typography variant="h5" className="mb-2 ">
          {resourceTitle} ({title})
        </Typography>
        <Typography className="mb-2">
          Price: {currency.symbol}
          {price}
        </Typography>
        <Typography className="mb-2">
          Requested by:{" "}
          <span className="font-bold">
            {firstName} {lastName}
          </span>
        </Typography>
        <Typography className="mb-2">
          Subject: <span className="font-bold">{subject}</span>
        </Typography>
        {description && (
          <Typography className="mb-2">Description: {description}</Typography>
        )}
        <Typography>
          Requested at: {new Date(createdAt).toLocaleString("en-US")}
        </Typography>
      </CardBody>
    </Card>
  );
}
