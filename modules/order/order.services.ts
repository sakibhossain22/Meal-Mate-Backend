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
    updateOrder
}
