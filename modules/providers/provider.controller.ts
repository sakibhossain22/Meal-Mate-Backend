import { Request, Response, NextFunction } from "express"
import { providerServices } from "./provider.service"
import { UserType } from "../../src/types/types"

const providerStats = async (req: Request, res: Response) => {
    try {
        const data = await providerServices.providerStats(req.user as UserType)
        res.status(200).json({
            success: true,
            ok: true,
            data,
        })

    } catch (error) {
        const errorMessage = (error instanceof Error) ? error.message : "Failed to Get Provider Stats"
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
const getAllProvider = async (req: Request, res: Response) => {
    try {
        const data = await providerServices.getAllProvider()
        res.status(200).json({
            success: true,
            ok: true,
            data,
        })

    } catch (error) {
        const errorMessage = (error instanceof Error) ? error.message : "Failed to Get Order"
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
const providerDetails = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const data = await providerServices.providerDetails(id as string)
        res.status(200).json({
            success: true,
            ok: true,
            data,
        })

    } catch (error) {
        const errorMessage = (error instanceof Error) ? error.message : "Failed to Get Order"
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

export const providerController = {
    getAllProvider,
    providerDetails,
    providerStats
}
