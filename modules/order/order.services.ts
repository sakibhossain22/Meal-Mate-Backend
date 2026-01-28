import { prisma } from "../../src/lib/prisma"
import { UserType } from "../../src/types/types"

const getAllOrder = async (user: UserType) => {
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
const postOrder = async (user: UserType, bodyData: any) => {
    const order = await prisma.order.create({
        data: {
            customerId: user.id,
            totalPrice: bodyData.totalPrice,
        },
    });
    const orderItemsData = bodyData.items.map((item: any) => ({
        orderId: order.id,
        mealId: item.mealId,
        quantity: item.quantity,
        price: item.price,
    }));
    await prisma.orderItem.createMany({
        data: orderItemsData,
    });
    return prisma.order.findUnique({
        where: { id: order.id },
        include: {
            items: {
                include: {
                    meal: true,
                },
            },
        },
    });
};
const getOrders = async (user: UserType) => {
    return prisma.order.findMany({
        where: {
            customerId: user.id,
        },
        orderBy: {
            createdAt: "desc",
        },
        include: {
            items: {
                include: {
                    meal: {
                        select: {
                            id: true,
                            name: true,
                            price: true,
                            image: true,
                        },
                    },
                },
            },
        },
    });
};




const updateOrder = async (
    bodyData: any,
    user: UserType,
    id: string
) => {
    const providerProfile = await prisma.providerProfile.findUniqueOrThrow({
        where: {
            userId: user.id,
        },
    });
    const orderItem = await prisma.orderItem.findUniqueOrThrow({
        where: {
            id,
        },
        include: {
            meal: true,
        },
    });
    if (orderItem.meal.providerProfileId !== providerProfile.id) {
        throw new Error("You are not authorized to update this order");
    }
    const updatedOrder = await prisma.order.update({
        where: {
            id: orderItem.orderId,
        },
        data: bodyData
    });

    return updatedOrder;
};



export const orderServices = {
    getAllOrder,
    updateOrder,
    postOrder,
    getOrders
}
