import type { Slot } from "@prisma/client";

export type SlotWithHost = Slot & {
  host: {
    email: string;
    firstName: string;
    lastName: string;
  };
};

export type SlotWithDetails = Slot & {
  host: {
    email: string;
    firstName: string;
    lastName: string;
  };
  user: { email: string; firstName: string; lastName: string };
  serviceRequest: {
    variant: {
      details: string[];
      resource: {
        title: string;
        description: string;
      };
    };
  };
};
