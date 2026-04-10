import { Request, Response } from "express"
import { superAdminServices } from "./superAdmin.services"

const manageUser = async (req: Request, res: Response) => {
    try {
        const { userId, role, status } = req.body
        const data = await superAdminServices.manageUser(userId, { role, status })
        res.status(200).json({
            success: true,
            ok: true,
            data

        })
    } catch (error: any) {
        const errorMessage = (error instanceof Error) ? error.message : "Failed to Update Delivery Status"
        res.status(500).json({
            success: false,
            ok: false,
            error: errorMessage
        })
    }
}

const getSystemStats = async (req: Request, res: Response) => {
    try {
        const data = await superAdminServices.getSystemStats()
        res.status(200).json({ success: true, ok: true, data })
    } catch (error: any) {
        const errorMessage = (error instanceof Error) ? error.message : "Failed to Update Delivery Status"
        res.status(500).json({ success: false, ok: false, error: errorMessage })
    }
}

const verifyProvider = async (req: Request, res: Response) => {
    try {
        const { providerId, isVerified } = req.body
        const data = await superAdminServices.verifyProvider(providerId, isVerified)
        res.status(200).json({ success: true, ok: true, data })
    } catch (error: any) {
        const errorMessage = (error instanceof Error) ? error.message : "Failed to Update Delivery Status"
        res.status(500).json({ success: false, ok: false, error: errorMessage })
    }
}

const createCategory = async (req: Request, res: Response) => {
    try {
        const { name } = req.body
        const data = await superAdminServices.createCategory(name)
        res.status(201).json({ success: true, ok: true, data })
    } catch (error: any) {
        const errorMessage = (error instanceof Error) ? error.message : "Failed to Update Delivery Status"
        res.status(500).json({ success: false, ok: false, error: errorMessage })
    }
}

const getAllOrders = async (req: Request, res: Response) => {
    try {
        const data = await superAdminServices.getAllOrders()
        res.status(200).json({ success: true, ok: true, data })
    } catch (error: any) {
        const errorMessage = (error instanceof Error) ? error.message : "Failed to Update Delivery Status"
        res.status(500).json({ success: false, ok: false, error: errorMessage })
    }
}

export const superAdminController = {
    manageUser,
    getSystemStats,
    verifyProvider,
    createCategory,
    getAllOrders
}