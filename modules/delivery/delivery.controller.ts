import { Request, Response } from "express"
import { deliveryServices } from "./delivery.services"

const createDelivery = async (req: Request, res: Response) => {
    try {
        const data = await deliveryServices.createDelivery(req.body as any)
        res.status(200).json({
            success: true,
            ok: true,
            data,
        })

    } catch (error) {
        const errorMessage = (error instanceof Error) ? error.message : "Failed to Create Delivery"
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

export const deliveryController = {
    createDelivery
}