import { MealWhereInput, ProviderProfileWhereInput } from "../../generated/prisma/models"
import { AppError } from "../../src/error/AppError"
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
const addMeal = async (bodyData: MealType, user: { id: string }) => {
    const { id } = user
    console.log(bodyData);
    console.log(id);
    const findProviderId = await prisma.providerProfile.findFirstOrThrow({
        where: {
            userId: id
        }
    })
    console.log(findProviderId);
    const newData = { ...bodyData, providerProfileId: findProviderId.id }
    const data = await prisma.meal.create({
        data: newData
    })
    return data
}
const updateMeal = async (bodyData: MealType, user: { id: string }, mealId: string) => {
    const { id: userId } = user
    console.log("id", userId);
    console.log("Mealid", mealId)
    console.log("bodyData", bodyData)
    const provider = await prisma.providerProfile.findUniqueOrThrow({
        where: {
            userId: userId
        },
        select: {
            id: true,
            userId: true
        }
    })
    console.log(provider);
    if (provider.userId !== userId) {
        throw new Error("Your are not the author of this Meal")
    }

    const updateMealData = await prisma.meal.update({
        where: {
            id: mealId
        },
        data: bodyData
    })
    return updateMealData
}
const deleteMeal = async (user: { id: string }, mealId: string) => {
    const { id: userId } = user
    console.log("id", userId);
    console.log("Mealid", mealId)

    const provider = await prisma.providerProfile.findUniqueOrThrow({
        where: {
            userId: userId
        },
        select: {
            id: true,
            userId: true
        }
    })
    if (provider.userId !== userId) {
        throw new AppError("Your are not the author of this Meal", 403)
    }

    const updateMealData = await prisma.meal.delete({
        where: {
            id: mealId
        }
    })
    return updateMealData
}
export const mealServices = {
    getAllMeal,
    getMealDetails,
    addMeal,
    updateMeal,
    deleteMeal
}