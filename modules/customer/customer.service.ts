import { auth } from "../../src/lib/auth";
import { prisma } from "../../src/lib/prisma";
import { UserType } from "../../src/types/types";


const customerOrders = async (user: UserType) => {
    const session = await auth.api.getSession({
        headers : {
            
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




export const customerService = {
    customerOrders

}