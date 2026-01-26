import { Request, Response } from "express"
import { prisma } from "../../src/lib/prisma"
import { mealServices } from "./meal.services"

const getMeal = async (req: Request, res: Response) => {
    try {
        const data = await mealServices.getAllMeal()
        res.status(200).json({
            success: true,
            data,
        })

    } catch (error) {
        return {
            success: false,
            data: null,
            error: error
        }
    }
}

export const mealController = {
    getMeal
}