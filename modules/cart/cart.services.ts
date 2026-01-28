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


export const cartService = {
    addToCart,
    getCart

}