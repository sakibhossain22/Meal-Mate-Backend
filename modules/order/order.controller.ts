import { Request, Response, NextFunction } from "express"
import { prisma } from "../../src/lib/prisma"
import { orderServices } from "./order.services"
import { UserType } from "../../src/types/types"

const getAllOrder = async (req: Request, res: Response) => {
    try {
        const data = await orderServices.getAllOrder(req.user as UserType)
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

export const orderController = {
    getAllOrder
}
