import { auth } from "../../src/lib/auth";
import { prisma } from "../../src/lib/prisma";
import { UserType } from "../../src/types/types";


const customerOrders = async (user: UserType) => {
    const session = await auth.api.getSession({
        headers: {

        }
    })
    console.log(session);
    const data = await prisma.order.findMany({
        where: {
            id: user.id
        }
    });

    return data;
};
const customerStat = async (user: UserType) => {
    // সব order item যেখানে customer id match করে
    const orderItems = await prisma.orderItem.findMany({
        where: {
            order: {
                customerId: user.id,
            },
        },
        include: {
            meal: true,
            order: true,
        },
    });

    // total orders
    const uniqueOrders = new Set(orderItems.map((i) => i.orderId));

    // total amount spent
    const totalSpent = orderItems.reduce((acc, item) => acc + item.price, 0);

    // total meals ordered
    const totalMeals = orderItems.length;

    // favorite meal (most ordered)
    const mealCountMap: Record<string, number> = {};
    orderItems.forEach((item) => {
        mealCountMap[item.mealId] = (mealCountMap[item.mealId] || 0) + item.quantity;
    });

    const favoriteMealId = Object.entries(mealCountMap).reduce((a, b) =>
        b[1] > a[1] ? b : a
    )[0];

    const favoriteMeal = await prisma.meal.findUnique({
        where: { id: favoriteMealId },
        select: { id: true, name: true },
    });

    // reviews
    const reviewsAggregate = await prisma.review.aggregate({
        where: { customerId: user.id },
        _count: { id: true },
        _avg: { rating: true },
    });

    return {
        orders: {
            totalOrders: uniqueOrders.size,
            totalSpent,
        },
        meals: {
            totalMealsOrdered: totalMeals,
            favoriteMeal,
        },
        reviews: {
            total: reviewsAggregate._count.id,
            averageRating: Number((reviewsAggregate._avg.rating || 0).toFixed(1)),
        },
    };
};





export const customerService = {
    customerOrders,
    customerStat

}