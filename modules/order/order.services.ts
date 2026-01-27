import { prisma } from "../../src/lib/prisma"
import { UserType } from "../../src/types/types"

const getAllOrder = async (user: UserType) => {
  // Provider profile বের করো
  const providerProfile = await prisma.providerProfile.findUniqueOrThrow({
    where: {
      userId: user.id,
    },
  });

  const data = await prisma.orderItem.findMany({
    where: {
      meal: {
        providerProfileId: providerProfile.id,
      },
    },
    include: {
      meal: true,
      order: {
        include: {
          customer: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      },
    },
  });

  return data;
};


export const orderServices = {
    getAllOrder
}
