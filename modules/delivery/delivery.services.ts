import { AppError } from "../../src/error/AppError"
import { prisma } from "../../src/lib/prisma"



const createDelivery = async (bodyData: { userId: string, vehicleType: string }) => {
    if (!bodyData.userId || !bodyData.vehicleType) {
        throw new AppError("Missing required fields: userId and vehicleType", 400)
    }
    const data = await prisma.deliveryProfile.create({
        data: bodyData
    })
    return data
}




export const deliveryServices = {
    createDelivery
}