import type { ServiceRequest } from "@prisma/client";

export type ServiceRequestWithResource = ServiceRequest & {
  variant: {
    details: string[];
    resource: {
      title: string;
      description: string;
    };
  };
};
