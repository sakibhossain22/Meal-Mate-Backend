import { prisma } from "../../src/lib/prisma"

const getAllMeal = async () => {
    const data = await prisma.meal.findMany()
    return data
}
const getMealDetails = async (id: string) => {
    const data = await prisma.meal.findUnique({
        where: {
            id: id
        }
    })
    return data
}
export const mealServices = {
    getAllMeal,
    getMealDetails
}