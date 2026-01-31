import { prisma } from "../../src/lib/prisma"


const adminStats = async () => {
  const [
    totalUsers, totalCustomers, totalProviders, activeUsers, totalMeals, availableMeals, unavailableMeals, totalOrders, ordersByStatus, revenueResult, providersWithMeals, totalProviderProfiles,
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
  const order = await prisma.order.findMany({
    include: {
      customer: true
    }
  });
  const orderItem = await prisma.orderItem.findMany({
    include: {
      meal: {
        include: {
          provider: true
        }
      }
    }
  });
  return { order, orderItem };
};
const Allcategories = async () => {
  const data = await prisma.category.findMany({
    include: {
      meals: true,
    },
  });

  return data;
};
const getAllReviews = async () => {
  const data = await prisma.review.findMany({
    include: {
      customer: true,
      meal: true,
    }
  })
  return data;
};
const deleteReview = async (id: string) => {
  const data = await prisma.review.delete({
    where: {
      id: id
    }
  })
  return data;
};


const updateUserStatus = async (bodyData: any, id: string) => {
  const data = await prisma.user.update({
    where: {
      id: id
    },
    data: bodyData
  })
  return data
}
const addCategory = async (bodyData: { id: string, name: string },) => {

  const getCategory = await prisma.category.findUnique({
    where: {
      id: bodyData.id
    }
  })
  if (getCategory?.id === bodyData.id) {
    throw new Error("Category Already Exists")
  }
  const data = await prisma.category.create({
    data: bodyData
  })
  return data
}
export const adminService = {
  getAllUsers,
  addCategory,
  updateUserStatus,
  getAllOrders,
  Allcategories,
  adminStats,
  getAllReviews,
  deleteReview
}