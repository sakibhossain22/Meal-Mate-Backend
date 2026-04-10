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
    return await prisma.order.update({
        where: { id: orderId },
        data: {
            deliveryManId: deliveryManId,
            status: "ON_THE_WAY", // অর্ডার এখন ডেলিভারি ম্যানের কাছে
        },
    });
};

export const updateDeliveryStatusService = async (orderId: string, status: any) => {
    return await prisma.order.update({
        where: { id: orderId },
        data: { status: status },
    });
};
export const toggleAvailabilityService = async (userId: string, isAvailable: boolean) => {
    return await prisma.deliveryProfile.update({
        where: { userId: userId },
        data: { isAvailable: isAvailable },
    });
};
export const getDeliveryStatsService = async (deliveryManId: string) => {
    const result = await prisma.order.aggregate({
        where: {
            deliveryManId: deliveryManId,
            status: "DELIVERED",
        },
        _count: { id: true },
        _sum: { totalPrice: true },
    });

    return {
        totalOrders: result._count.id,
        totalEarnings: result._sum.totalPrice || 0,
    };
};
export const getDeliveryHistoryService = async (deliveryManId: string) => {
    return await prisma.order.findMany({
        where: {
            deliveryManId: deliveryManId,
            status: "DELIVERED",
        },
        include: {
            customer: {
                select: { name: true, phone: true },
            },
            items: {
                include: { meal: true },
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
    getDeliveryHistoryService
}