"use client";

import { Typography } from "@material-tailwind/react";
import ServiceRequestEditForm from "./service-request-edif-from";

export default function ServiceRequestList({ serviceRequests }: any) {
  return (
    <div className="w full space-y-4">
      <Typography variant="h3" className="my-4 w-full text-center">
        Service Requests
      </Typography>
      {serviceRequests?.map((request: any) => (
        <ServiceRequestEditForm key={request.id} serviceRequest={request} />
      ))}
    </div>
  );
}
