import { prisma } from "../../src/lib/prisma"


const getAllProvider = async () => {
    const data = await prisma.providerProfile.findMany()
    return data
}
const providerDetails = async (id: string) => {
    const data = await prisma.providerProfile.findUniqueOrThrow({
        where: {
            id: id
        }
    })
    return data
}



export const providerServices = {
    getAllProvider,
    providerDetails
}
