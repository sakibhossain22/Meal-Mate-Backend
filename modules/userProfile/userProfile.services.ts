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
const updateUserProfile = async (bodyData: any, user: UserType) => {
    const updateData = {
        name: bodyData.name,
        phone: bodyData.phone,
        image: bodyData.image
    }
    if (bodyData.email) {
        if (bodyData.email !== user.email) {
            throw new Error("You Are not authorized to update this info")
        }
    }
    const data = await prisma.user.update({
        where: {
            email: user.email
        },
        data: updateData
    })

    return data;
};


export const userProfileService = {
    userProfile,
    updateUserProfile
}