import { Role, UserStatus } from "../../generated/prisma/enums"
import { AppError } from "../../src/error/AppError"
import { prisma } from "../../src/lib/prisma"

const manageUser = async (userId: string, role?: Role, status?: UserStatus ) => {
    console.log(userId, role, status)
    if (!role && !status) {
        throw new AppError("No update data provided", 400)
    }
    const existingUser = await prisma.user.findUnique({ where: { id: userId } })
    if (!existingUser) {
        throw new AppError("User not found", 404)
    }
    console.log(existingUser)
    return await prisma.user.update({
        where: { id: userId },
        data: {
            role: role || existingUser.role,
            status: status ? UserStatus.BANNED : existingUser.status
        }
    })
}

export const getSystemStats = async () => {
    const now = new Date();
    const startOfToday = new Date(now.setHours(0, 0, 0, 0));

    const [
        overallStats,
        todayStats,
        userRoleCounts,
        recentOrders,
        pendingProviders,
        totalCategories
    ] = await Promise.all([
        // ১. মোট রেভিনিউ এবং অর্ডার
        prisma.order.aggregate({
            where: { status: "DELIVERED" },
            _sum: { totalPrice: true },
            _count: { id: true },
            _avg: { totalPrice: true }
        }),

        // ২. আজকের সেলস
        prisma.order.aggregate({
            where: {
                status: "DELIVERED",
                createdAt: { gte: startOfToday }
            },
            _sum: { totalPrice: true },
            _count: { id: true }
        }),

        // ৩. রোল অনুযায়ী ইউজার সেগমেন্টেশন
        prisma.user.groupBy({
            by: ['role'],
            _count: { id: true }
        }),

        // ৪. লেটেস্ট ৫টি অর্ডার (উইথ কাস্টমার ডিটেইলস)
        prisma.order.findMany({
            take: 5,
            orderBy: { createdAt: 'desc' },
            include: {
                customer: { select: { name: true, image: true } },
            }
        }),

        // ৫. পেন্ডিং ভেরিফিকেশন (সুপার এডমিনের জন্য জরুরি)
        prisma.providerProfile.count({
            where: { adminVerified: false }
        }),

        // ৬. মোট ক্যাটাগরি সংখ্যা
        prisma.category.count()
    ]);

    // ৭. টপ ৫ খাবার (OrderItem থেকে ক্যালকুলেশন)
    const topMeals = await prisma.orderItem.groupBy({
        by: ['mealId'],
        _count: { id: true },
        _sum: { price: true },
        orderBy: {
            _count: { id: 'desc' }
        },
        take: 5
    });

    return {
        overview: {
            totalRevenue: overallStats._sum.totalPrice || 0,
            totalOrders: overallStats._count.id,
            averageOrderValue: overallStats._avg.totalPrice?.toFixed(2) || 0,
            totalCategories
        },
        today: {
            revenue: todayStats._sum.totalPrice || 0,
            orders: todayStats._count.id,
        },
        userSegments: userRoleCounts,
        recentActivity: recentOrders,
        topSellingMeals: topMeals,
        alerts: {
            pendingProviderApprovals: pendingProviders
        }
    };
};
const verifyProvider = async (providerId: string, isVerified: boolean) => {
    if (typeof isVerified !== "boolean") {
        throw new AppError("Invalid verification status", 400)
    }
    if (!providerId) {
        throw new AppError("Provider ID is required", 400)
    }
    const existingProvider = await prisma.providerProfile.findUnique({ where: { id: providerId } })
    if (!existingProvider) {
        throw new AppError("Provider not found", 404)
    }
    return await prisma.providerProfile.update({
        where: { id: providerId },
        data: {
            adminVerified: isVerified
        }
    })
}
const verifyDeliveryMan = async (deliveryManId: string, isVerified: boolean) => {
    if (typeof isVerified !== "boolean") {
        throw new AppError("Invalid verification status", 400)
    }
    if (!deliveryManId) {
        throw new AppError("Delivery Man ID is required", 400)
    }
    const existingDeliveryMan = await prisma.deliveryProfile.findUnique({ where: { id: deliveryManId } })
    if (!existingDeliveryMan) {
        throw new AppError("Delivery Man not found", 404)
    }
    return await prisma.deliveryProfile.update({
        where: { id: deliveryManId },
        data: {
            adminVerified: isVerified
        }
    })
}

const createCategory = async (name: string) => {
    return await prisma.category.create({
        data: { name }
    })
}

const getAllOrders = async () => {
    return await prisma.order.findMany({
        include: {
            customer: { select: { name: true } },
            items: { include: { meal: { select: { name: true } } } }
        },
        orderBy: { createdAt: 'desc' }
    })
}

const getAllProvidersProfile = async () => {
    return await prisma.providerProfile.findMany({
        include: {
            user: { select: { name: true, email: true } },
        }
    })
}
const getAllDeliveryMenProfiles = async () => {
    return await prisma.deliveryProfile.findMany({
        include: {
            user: { select: { name: true, email: true } },
        }
    })
}

export const superAdminServices = {
    manageUser,
    getSystemStats,
    verifyProvider,
    createCategory,
    getAllOrders,
    verifyDeliveryMan,
    getAllProvidersProfile,
    getAllDeliveryMenProfiles
}