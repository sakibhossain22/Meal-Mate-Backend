import { prisma } from "../../src/lib/prisma"


const getAllUsers = async () => {
    const data = await prisma.user.findMany()
    return data
}
const updateUserStatus = async (id : string) => {
    const data = await prisma.user.update({
        where : {
            id : id
        },
        data : 
    })
    return data
}

export const adminService = {
    getAllUsers,
    updateUserStatus

}