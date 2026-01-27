import { Request, Response } from "express";
import { customerService } from "./customer.service";
import { UserType } from "../../src/types/types";

const customerOrders = async (req: Request, res: Response) => {
    try {
        const data = await customerService.customerOrders(req.user as UserType)
        res.status(200).json({
            success: true,
            ok: true,
            data,
        })

    } catch (error) {
        const errorMessage = (error instanceof Error) ? error.message : "Failed to Fetch Orders"
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
export const customerController = {
    customerOrders
}