import { OrderStatus } from "../../generated/prisma/enums"
import { AppError } from "../../src/error/AppError"
import { prisma } from "../../src/lib/prisma"



const createDelivery = async (bodyData: { userId: string, vehicleType: string }) => {
    if (!bodyData.userId || !bodyData.vehicleType) {
        throw new AppError("Missing required fields: userId and vehicleType", 400)
    }
    const data = await prisma.deliveryProfile.create({
        data: bodyData
    })
    return data
}
export const acceptOrderService = async (orderId: string, deliveryManId: string) => {
    console.log(orderId, deliveryManId)
    if (!orderId || !deliveryManId) {
        throw new AppError("Missing required fields: orderId and deliveryManId", 400)
    }

    return await prisma.order.update({
        where: { id: orderId },
        data: {
            deliveryManId: deliveryManId,
            status: OrderStatus.ON_THE_WAY,
        },
    });
};

export const updateDeliveryStatusService = async (orderId: string, status: OrderStatus) => {
    if (!orderId || !status) {
        throw new AppError("Missing required fields: orderId and status", 400)
    }
    return await prisma.order.update({
        where: { id: orderId },
        data: { status: status },
    });
};
export const toggleAvailabilityService = async (userId: string, isAvailable: boolean) => {
    if (!userId || isAvailable === undefined) {
        throw new AppError("Missing required fields: userId and isAvailable", 400)
    }
    return await prisma.deliveryProfile.update({
        where: { userId: userId },
        data: { isAvailable: isAvailable },
    });
};

export const getDeliveryStatsService = async (deliveryManId: string) => {
    if (!deliveryManId) {
        throw new AppError("Missing required field: deliveryManId", 400);
    }

    // ১. আজ এবং গতদিনের তারিখ সেট করা (Performance comparison এর জন্য)
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    // ২. প্যারালাল কুয়েরি রান করা (Performance এর জন্য Promise.all ব্যবহার)
    const [overallStats, monthlyStats, recentOrders] = await Promise.all([
        // ওভারঅল স্ট্যাটস
        prisma.order.aggregate({
            where: { deliveryManId, status: OrderStatus.DELIVERED },
            _count: { id: true },
            _sum: { totalPrice: true },
            _avg: { totalPrice: true },
        }),
        // চলতি মাসের স্ট্যাটস
        prisma.order.aggregate({
            where: {
                deliveryManId,
                status: OrderStatus.DELIVERED,
                updatedAt: { gte: firstDayOfMonth }
            },
            _count: { id: true },
            _sum: { totalPrice: true }
        }),
        // চার্ট ডেটার জন্য শেষ ৭ দিনের ডেইলি স্ট্যাটস
        prisma.order.groupBy({
            by: ['updatedAt'],
            where: {
                deliveryManId,
                status: OrderStatus.DELIVERED,
                updatedAt: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
            },
            _count: { id: true },
            _sum: { totalPrice: true }
        })
    ]);

    // ৩. চার্ট ডেটা ফরম্যাট করা (Frontend এ Recharts বা Chart.js এর জন্য সুবিধা হবে)
    const chartData = recentOrders.map(order => ({
        date: order.updatedAt.toLocaleDateString('en-US', { weekday: 'short' }),
        orders: order._count.id,
        revenue: order._sum.totalPrice || 0
    }));

    return {
        overview: {
            totalOrders: overallStats._count.id,
            totalEarnings: overallStats._sum.totalPrice || 0,
            averageOrderValue: Math.round(overallStats._avg.totalPrice || 0),
        },
        monthlyPerformance: {
            ordersThisMonth: monthlyStats._count.id,
            earningsThisMonth: monthlyStats._sum.totalPrice || 0,
        },
        chartData: chartData, // লাস্ট ৭ দিনের পারফরম্যান্স
        success: true
    };
};
export const getDeliveryHistoryService = async (deliveryManId: string) => {
    if (!deliveryManId) {
        throw new AppError("Missing required field: deliveryManId", 400)
    }
    return await prisma.order.findMany({
        where: {
            deliveryManId: deliveryManId,
            status: OrderStatus.DELIVERED,
        },
        include: {
            customer: {
                select: { name: true, phone: true, email: true, image: true },
            },
            items: {
                include: { meal: { omit: { updatedAt: true, createdAt: true } } },
            },
        },
        orderBy: { updatedAt: "desc" },
    });
};
export const getMyOrdersService = async (deliveryManId: string) => {
    if (!deliveryManId) {
        throw new AppError("Missing required field: deliveryManId", 400)
    }
    return await prisma.order.findMany({
        where: {
            deliveryManId: deliveryManId,
        },
        include: {
            customer: {
                select: { name: true, phone: true, email: true, image: true },
            },
            items: {
                include: { meal: { omit: { updatedAt: true, createdAt: true } } },
            },
        },
        orderBy: { updatedAt: "desc" },
    });
};



export const deliveryServices = {
    createDelivery,
    acceptOrderService,
    updateDeliveryStatusService,
    toggleAvailabilityService,
    getDeliveryStatsService,
    getDeliveryHistoryService,
    getMyOrdersService
}