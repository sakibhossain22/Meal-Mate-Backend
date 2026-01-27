import { prisma } from "../../src/lib/prisma"


const getAllUsers = async () => {
  const data = await prisma.user.findMany({
    where: {
      OR: [
        { role: "CUSTOMER" },
        { role: "PROVIDER" },
      ],
    },
  });

  return data;
};
const getAllOrders = async () => {
  const data = await prisma.order.findMany();
  return data;
};
const Allcategories = async () => {
  const data = await prisma.category.findMany({
    include: {
      meals: true,
    },
  });

  return data;
};


const updateUserStatus = async (bodyData : any, id: string) => {
    const data = await prisma.user.update({
        where: {
            id: id
        },
        data: bodyData
    })
    return data
}

export const adminService = {
    getAllUsers,
    updateUserStatus,
    getAllOrders,
    Allcategories

}