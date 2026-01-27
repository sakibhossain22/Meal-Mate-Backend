import { Request, Response } from "express"
import { mealServices } from "./meal.services"

const getMeal = async (req: Request, res: Response) => {
    try {
        const data = await mealServices.getAllMeal()
        res.status(200).json({
            success: true,
            ok: true,
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
const getMealDetails = async (req: Request, res: Response) => {
    const { id } = req.params

    try {
        const data = await mealServices.getMealDetails(id as string)
        res.status(200).json({
            success: true,
            ok: true,
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
const addMeal = async (req: Request, res: Response) => {

    try {
        const data = await mealServices.addMeal(req.body)
        res.status(200).json({
            success: true,
            ok: true,
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
    getMeal,
    getMealDetails,
    addMeal
}