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
    const address = { address: bodyData.address }
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
        price: item.price.toFixed(2),
        address: bodyData.address
    }));

    const ress = await prisma.orderItem.createMany({
        data: orderItemsData
    });
    console.log(ress);

    if (bodyData.items && bodyData.items.length > 0) {
        for (const item of bodyData.items) {
            if (item.id) {
                await prisma.cartItem.delete({
                    where: { id: item.id }
                }).catch(() => null);
            }
            else if (item.cartId) {
                await prisma.cartItem.deleteMany({
                    where: { cartId: item.cartId }
                });
            }
        }
    }

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
const singleOrderDetails = async (user: UserType, id: string) => {
    const order = await prisma.order.findUniqueOrThrow({
        where: {
            id,
        },
        include: {
            customer: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            },
            items: {
                include: {
                    meal: true,
                },
            },
        },
    });

    // authorization
    if (order.customerId !== user.id && user.role !== "ADMIN") {
        throw new Error("You are not allowed to view this order");
    }

    return order;
};

const updateOrder = async (
    bodyData: any,
    id: string
) => {

    const updatedOrder = await prisma.order.update({
        where: {
            id: id,
        },
        data: bodyData
    });

    return updatedOrder;
};



export const orderServices = {
    getAllOrder,
    updateOrder,
    postOrder,
    getOrders,
    singleOrderDetails
}
