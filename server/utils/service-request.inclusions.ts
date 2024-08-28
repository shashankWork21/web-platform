export const serviceRequestInclusions = {
  user: { select: { firstName: true, lastName: true, email: true } },
  slot: { select: { meetingLink: true, timestamp: true } },
  variant: {
    include: {
      currency: {
        select: {
          name: true,
          shortform: true,
          symbol: true,
          inrConversion: true,
        },
      },
      resource: {
        include: {
          createdBy: {
            select: { firstName: true, lastName: true, email: true },
          },
        },
      },
    },
  },
};
