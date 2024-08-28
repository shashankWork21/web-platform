export const slotInclusions = {
  host: {
    select: {
      firstName: true,
      lastName: true,
      email: true,
    },
  },
  user: {
    select: {
      firstName: true,
      lastName: true,
      email: true,
    },
  },
  serviceRequest: {
    include: {
      variant: {
        select: {
          details: true,
        },
        include: {
          resource: {
            select: {
              title: true,
              description: true,
            },
          },
        },
      },
    },
  },
};
