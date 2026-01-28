import { auth } from "../../src/lib/auth";
import { prisma } from "../../src/lib/prisma";
import { UserType } from "../../src/types/types";


const userProfile = async (user: UserType) => {
    const data = await prisma.user.findUnique({
        where: {
            id: user.id
        }
    })

    return data;
};


export const userProfileService = {
    userProfile
}