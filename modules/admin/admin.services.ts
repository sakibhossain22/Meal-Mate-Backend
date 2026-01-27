import { prisma } from "../../src/lib/prisma"


const getAllUsers = async () => {
    const data = await prisma.user.findMany()
    return data
}
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
    updateUserStatus

}