import { auth } from "../../src/lib/auth";
import { prisma } from "../../src/lib/prisma";
import { UserType } from "../../src/types/types";


const addToCart = async (bodyData: any, userId: string,) => {
    const { mealId, quantity } = bodyData;

    const cart = await prisma.cart.create({
        data: { userId },
    });
    const meal = await prisma.meal.findUnique({
        where: { id: mealId },
    });

    if (!meal) {
        throw new Error("Meal not found");
    }
    const cartItem = await prisma.cartItem.create({
        data: {
            cartId: cart.id,
            mealId,
            quantity,
            price: meal.price * quantity,
        },
    });

    return cartItem;
};

const getCart = async (user: UserType) => {
    const data = await prisma.cart.findMany({
        where: {
            userId: user.id
        },
        include: {
            items: {
                include: {
                    meal: true
                }
            }
        }

    });

    return data;
};
const deleteFromCart = async (itemId: any) => {
    return await prisma.cartItem.delete({
        where: {
            id: itemId
        }
    });
};
const clearCart = async (orderData: any) => {
    try {

        const cartIds = [...new Set(orderData.items.map((item: any) => item.cartId as string))] as string[];
        console.log(cartIds);
        if (cartIds.length === 0) return;

        const result = await prisma.cartItem.deleteMany({
            where: {
                cartId: {
                    in: cartIds
                }
            }
        });

        return result;
    } catch (error) {
        console.error("Error clearing cart:", error);
        throw error;
    }
};


export const cartService = {
    addToCart,
    getCart,
    deleteFromCart,
    clearCart
}