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
const acceptOrderService = async (req: Request, res: Response) => {
    try {
        const data = await deliveryServices.acceptOrderService(req.body.orderId, req.body.deliveryManId)
        res.status(200).json({
            success: true,
            ok: true,
            data,
        })

    } catch (error) {
        const errorMessage = (error instanceof Error) ? error.message : "Failed to Accept Order"
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
const updateDeliveryStatusService = async (req: Request, res: Response) => {
    try {
        const data = await deliveryServices.updateDeliveryStatusService(req.body.orderId, req.body.status)
        res.status(200).json({
            success: true,
            ok: true,
            data,
        })

    } catch (error) {
        const errorMessage = (error instanceof Error) ? error.message : "Failed to Update Delivery Status"
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
const toggleAvailabilityService = async (req: Request, res: Response) => {
    try {
        const data = await deliveryServices.toggleAvailabilityService(req.body.userId, req.body.isAvailable)
        res.status(200).json({
            success: true,
            ok: true,
            data,
        })

    } catch (error) {
        const errorMessage = (error instanceof Error) ? error.message : "Failed to Toggle Availability"
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
const getDeliveryStatsService = async (req: Request, res: Response) => {
    try {
        const data = await deliveryServices.getDeliveryStatsService(req.body.deliveryManId)
        res.status(200).json({
            success: true,
            ok: true,
            data,
        })

    } catch (error) {
        const errorMessage = (error instanceof Error) ? error.message : "Failed to Get Delivery Stats"
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
const getDeliveryHistoryService = async (req: Request, res: Response) => {
    try {
        const data = await deliveryServices.getDeliveryHistoryService(req.body.deliveryManId)
        res.status(200).json({
            success: true,
            ok: true,
            data,
        })

    } catch (error) {
        const errorMessage = (error instanceof Error) ? error.message : "Failed to Get Delivery History"
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
     createDelivery,
    acceptOrderService,
    updateDeliveryStatusService,
    toggleAvailabilityService,
    getDeliveryStatsService,
    getDeliveryHistoryService
}