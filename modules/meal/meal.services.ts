import { prisma } from "../../src/lib/prisma"

const getAllMeal = async () => {
    const data = await prisma.meal.findMany()
    return data
}

export const mealServices = {
    getAllMeal
}