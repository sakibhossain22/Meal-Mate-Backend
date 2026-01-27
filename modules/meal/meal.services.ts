import { prisma } from "../../src/lib/prisma"
import { MealType } from "../../src/types/types"

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
const addMeal = async (bodyData: MealType) => {
    console.log(bodyData);
    const data = await prisma.meal.create({
        data: bodyData
    })
    return data
}
export const mealServices = {
    getAllMeal,
    getMealDetails,
    addMeal
}