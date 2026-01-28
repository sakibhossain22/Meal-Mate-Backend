import { auth } from "../../src/lib/auth";
import { prisma } from "../../src/lib/prisma";
import { UserType } from "../../src/types/types";


const customerOrders = async (user: UserType) => {
    const data = await prisma.order.findMany({
        where: {
            id: user.id
        }
    });

    return data;
};
const customerStat = async (user: UserType) => {

  const orders = await prisma.order.findMany({
    where: { customerId: user.id },
    include: {
      items: {
        include: { meal: true }
      },
    },
  });

  let totalSpent = 0;
  let totalMealsOrdered = 0;

  orders.forEach(order => {
    order.items.forEach(item => {
      totalSpent += item.price;
      totalMealsOrdered += item.quantity;
    });
  });

  const reviews = await prisma.review.findMany({
    where: { customerId: user.id },
    include: { meal: true },
  });

  return {
    totalOrders: orders.length,
    totalSpent,
    totalMealsOrdered,
    orders,  
    reviews,
  };
};







export const customerService = {
    customerOrders,
    customerStat

}