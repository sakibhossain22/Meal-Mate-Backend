import { prisma } from "../../src/lib/prisma"
import { UserType } from "../../src/types/types";


const providerStats = async (user: UserType) => {
  console.log(user)
  const provider = await prisma.providerProfile.findUniqueOrThrow({
    where: {
      userId: user.id
    }
  });


  const [
    totalMeals, availableMeals, unavailableMeals, orderItems, revenueResult, reviewAggregate,
  ] = await Promise.all([
    prisma.meal.count({
      where: { providerProfileId: provider.id },
    }),
    prisma.meal.count({
      where: {
        providerProfileId: provider.id,
        isAvailable: true,
      },
    }),
    prisma.meal.count({
      where: {
        providerProfileId: provider.id,
        isAvailable: false,
      },
    }),
    prisma.orderItem.findMany({
      where: {
        meal: {
          providerProfileId: provider.id,
        },
      },
      include: {
        order: true,
      },
    }),
    prisma.orderItem.aggregate({
      where: {
        meal: {
          providerProfileId: provider.id,
        },
      },
      _sum: { price: true },
    }),
    prisma.review.aggregate({
      where: {
        meal: {
          providerProfileId: provider.id,
        },
      },
      _count: { id: true },
      _avg: { rating: true },
    }),
  ]);

  const uniqueOrders = new Set(orderItems.map(i => i.orderId));
  const uniqueCustomers = new Set(
    orderItems.map(i => i.order.customerId)
  );

  return {
    meals: {
      total: totalMeals,
      available: availableMeals,
      unavailable: unavailableMeals,
    },
    orders: {
      totalOrderItems: orderItems.length,
      totalOrders: uniqueOrders.size,
      revenue: revenueResult._sum.price || 0,
    },
    customers: {
      unique: uniqueCustomers.size,
    },
    reviews: {
      total: reviewAggregate._count.id,
      averageRating: Number(
        (reviewAggregate._avg.rating || 0).toFixed(1)
      ),
    },
  };
};


const getAllProvider = async () => {
  const data = await prisma.providerProfile.findMany({
    include: {
      user: true,
      meals: true
    }
  })
  return data
}
const createProvider = async (bodyData: { userId: string, businessName: string, address: string, contactNumber: string, description: string }) => {
  const data = await prisma.providerProfile.create({
    data: bodyData
  })
  return data
}
const providerDetails = async (id: string) => {
  const data = await prisma.providerProfile.findUniqueOrThrow({
    where: {
      id: id
    },
    include: {
      user: true,
      meals: true
    }
  })
  return data
}



const getAllProviderMeal = async (user: UserType) => {
  console.log(user);
  const data = await prisma.providerProfile.findUniqueOrThrow({
    where: {
      userId: user.id
    },
    include: {
      meals: true
    }
  })
  console.log(data);
  return data
}



export const providerServices = {
  getAllProvider,
  providerDetails,
  providerStats,
  createProvider,
  getAllProviderMeal
}
