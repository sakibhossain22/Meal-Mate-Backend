import { prisma } from "../../src/lib/prisma"


const adminStats = async () => {
  const [
    totalUsers,totalCustomers,totalProviders,activeUsers, totalMeals,availableMeals,unavailableMeals,totalOrders,ordersByStatus,revenueResult,providersWithMeals,totalProviderProfiles,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.user.count({ where: { role: "CUSTOMER" } }),
    prisma.user.count({ where: { role: "PROVIDER" } }),
    prisma.user.count({ where: { status: "ACTIVE" } }),
    prisma.meal.count(),
    prisma.meal.count({ where: { isAvailable: true } }),
    prisma.meal.count({ where: { isAvailable: false } }),
    prisma.order.count(),
    prisma.order.groupBy({
      by: ["status"],
      _count: { status: true },
    }),
    prisma.order.aggregate({
      _sum: { totalPrice: true },
    }),

    prisma.providerProfile.count({
      where: {
        meals: {
          some: {},
        },
      },
    }),
    prisma.providerProfile.count(),
  ]);

  return {
    users: {
      total: totalUsers,
      customers: totalCustomers,
      providers: totalProviders,
      active: activeUsers,
    },
    meals: {
      total: totalMeals,
      available: availableMeals,
      unavailable: unavailableMeals,
    },
    orders: {
      total: totalOrders,
      byStatus: ordersByStatus.map((o) => ({
        status: o.status,
        count: o._count.status,
      })),
      totalRevenue: revenueResult._sum.totalPrice || 0,
    },
    providers: {
      total: totalProviderProfiles,
      withMeals: providersWithMeals,
      withoutMeals: totalProviderProfiles - providersWithMeals,
    },
  };
};

const getAllUsers = async () => {
  const data = await prisma.user.findMany({
    where: {
      OR: [
        { role: "CUSTOMER" },
        { role: "PROVIDER" },
      ],
    },
  });

  return data;
};
const getAllOrders = async () => {
  const data = await prisma.order.findMany();
  return data;
};
const Allcategories = async () => {
  const data = await prisma.category.findMany({
    include: {
      meals: true,
    },
  });

  return data;
};


const updateUserStatus = async (bodyData : any, id: string) => {
    const data = await prisma.user.update({
        where: {
            id: id
        },
        data: bodyData
    })
    return data
}

export const adminService = {
    getAllUsers,
    updateUserStatus,
    getAllOrders,
    Allcategories,
    adminStats
}