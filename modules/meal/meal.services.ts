import { AppError } from "../../src/error/AppError"
import { prisma } from "../../src/lib/prisma"
import { MealType } from "../../src/types/types"

const getAllMeal = async (query: any) => {
    const { orderby = "desc", category, page = 1, limit = 10 } = query;

    const skip = (Number(page) - 1) * Number(limit);
    const take = Number(limit);

    const data = await prisma.meal.findMany({
        where: {
            ...(category && {
                category: {
                    name: category,
                }
            })
        },
        orderBy: {
            price: orderby === "asc" ? "asc" : "desc",
        },
        skip,
        take,
        include: {
            category: true,
            provider: {
                omit: {
                    updatedAt: true,
                    createdAt: true,
                }
            },
            reviews: true,
        }
    })
    const total = await prisma.meal.count({
        where: {
            ...(category && {
                category: {
                    name: category,
                }
            })
        }
    })

    return {
        meals: data,
        pagination: {
            total,
            page: Number(page),
            limit: Number(limit),
            totalPages: Math.ceil(total / Number(limit)),
        }
    }
}

const getMealDetails = async (id: string) => {
    const data = await prisma.meal.findUnique({
        where: {
            id: id
        },
        include: {
            provider: {
                omit: {
                    createdAt: true,
                    updatedAt: true
                }
            },
            reviews: {
                orderBy: {
                    createdAt: 'desc'
                },
                include: {
                    customer: {
                        select: {
                            email: true,
                            name: true,
                            image: true,
                        }
                    }
                }
            },
        }
    })
    return data
}
const addReview = async (bodyData: any) => {
    console.log(bodyData);
    const { rating, mealId, comment, customerId } = bodyData

    if (!rating || !mealId || !comment) {
        throw new Error("Rating, comment, and mealId are required")
    }

    const review = await prisma.review.create({
        data: {
            rating,
            comment,
            customerId,
            mealId
        },
        include: {
            meal: true,
            customer: true
        }
    })
    console.log(review);
    return review
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

const Allcategories = async () => {
    const data = await prisma.category.findMany({
        include: {
            meals: true,
        },
    });

    return data;
};
export const mealServices = {
    getAllMeal,
    getMealDetails,
    addMeal,
    updateMeal,
    deleteMeal,
    Allcategories,
    addReview
}