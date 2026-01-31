import { Request, Response } from "express"
import { adminService } from "./admin.services"


const adminStats = async (req: Request, res: Response) => {
    try {
        const data = await adminService.adminStats()
        res.status(200).json({
            success: true,
            ok: true,
            data,
        })

    } catch (error) {
        const errorMessage = (error instanceof Error) ? error.message : "Failed to Fetch Stats"
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
const addCategory = async (req: Request, res: Response) => {
    try {
        const data = await adminService.addCategory(req.body)
        res.status(200).json({
            success: true,
            ok: true,
            data,
        })

    } catch (error) {
        const errorMessage = (error instanceof Error) ? error.message : "Failed to add Category"
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
const getAllUsers = async (req: Request, res: Response) => {
    try {
        const data = await adminService.getAllUsers()
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
const getAllOrders = async (req: Request, res: Response) => {
    try {
        const data = await adminService.getAllOrders()
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
const Allcategories = async (req: Request, res: Response) => {
    try {
        const data = await adminService.Allcategories()
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
const updateUserStatus = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const data = await adminService.updateUserStatus(req.body, id as string)
        res.status(200).json({
            success: true,
            ok: true,
            data,
        })

    } catch (error) {
        const errorMessage = (error instanceof Error) ? error.message : "Failed to Update User"
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

export const adminController = {
    getAllUsers,
    addCategory,
    updateUserStatus,
    getAllOrders,
    Allcategories,
    adminStats
}