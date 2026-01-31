import { Request, Response } from "express";
import { UserType } from "../../src/types/types";
import { cartService } from "./cart.services";

const addToCart = async (req: Request, res: Response) => {
    if (!req.body.mealId || !req.body.quantity) {
        return res.status(400).json({ success: false, message: "mealId and quantity required" });
    }
    try {
        const data = await cartService.addToCart(req.body, req.user?.id as string)
        res.status(200).json({
            success: true,
            ok: true,
            data,
        })

    } catch (error) {
        const errorMessage = (error instanceof Error) ? error.message : "Failed to add item into  cart"
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
const getCart = async (req: Request, res: Response) => {
    try {
        const data = await cartService.getCart(req.user as UserType)
        res.status(200).json({
            success: true,
            ok: true,
            data,
        })

    } catch (error) {
        const errorMessage = (error instanceof Error) ? error.message : "Failed to Fetch Cart"
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
const deleteFromCart = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const data = await cartService.deleteFromCart(id as any)
        res.status(200).json({
            success: true,
            ok: true,
            data,
        })

    } catch (error) {
        const errorMessage = (error instanceof Error) ? error.message : "Failed to delete Cart"
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
const clearCart = async (req: Request, res: Response) => {

    try {
        const data = await cartService.clearCart(req.body)
        res.status(200).json({
            success: true,
            ok: true,
            data,
        })

    } catch (error) {
        const errorMessage = (error instanceof Error) ? error.message : "Failed to Fetch Cart"
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
export const cartController = {
    getCart,
    addToCart,
    deleteFromCart,
    clearCart
}