import { Request, Response } from "express"
import { mealServices } from "./meal.services"

const getMeal = async (req: Request, res: Response) => {

    try {
        const data = await mealServices.getAllMeal(req.query)
        res.status(200).json({
            success: true,
            ok: true,
            data,
        })

    } catch (error) {
        const errorMessage = (error instanceof Error) ? error.message : "Failed to Get Meal"
        res.status(500)
            .json(
                {
                    success: false,
                    data: null,
                    error: errorMessage
                }
            );
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
        const errorMessage = (error instanceof Error) ? error.message : "Failed to Get Meal Details"
        res.status(500)
            .json(
                {
                    success: false,
                    data: null,
                    error: errorMessage
                }
            );
    }
}
const addMeal = async (req: Request, res: Response) => {

    try {
        const data = await mealServices.addMeal(req.body, req.user as any)
        res.status(200).json({
            success: true,
            ok: true,
            data,
        })

    } catch (error) {
        const errorMessage = (error instanceof Error) ? error.message : "Failed to Add Meal"
        res.status(500)
            .json(
                {
                    success: false,
                    data: null,
                    error: errorMessage
                }
            );
    }
}
const updateMeal = async (req: Request, res: Response) => {

    try {
        const data = await mealServices.updateMeal(req.body, req.user as any, req.params.id as any)
        res.status(200).json({
            success: true,
            ok: true,
            data,
        })

    } catch (error) {
        const errorMessage = (error instanceof Error) ? error.message : "Failed to Update Meal"
        res.status(500)
            .json(
                {
                    success: false,
                    data: null,
                    error: errorMessage
                }
            );
    }
}
const deleteMeal = async (req: Request, res: Response) => {

    try {
        const data = await mealServices.deleteMeal(req.user as any, req.params.id as any)
        res.status(200).json({
            success: true,
            ok: true,
            data,
        })

    } catch (error) {
        const errorMessage = (error instanceof Error) ? error.message : "Failed to Delete Meal"
        res.status(500)
            .json(
                {
                    success: false,
                    data: null,
                    error: errorMessage
                }
            );
    }
}
export const mealController = {
    getMeal,
    getMealDetails,
    addMeal,
    updateMeal,
    deleteMeal
}