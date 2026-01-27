import { Request, Response } from "express"
import { adminService } from "./admin.services"


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
const updateUserStatus = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const data = await adminService.updateUserStatus(req.body,id as string)
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
    updateUserStatus
}