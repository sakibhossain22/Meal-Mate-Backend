
import { Request, Response } from "express";
import { UserType } from "../../src/types/types";
import { userProfileService } from "./userProfile.services";
const userProfile = async (req: Request, res: Response) => {
    try {
        const data = await userProfileService.userProfile(req.user as UserType)
        res.status(200).json({
            success: true,
            ok: true,
            data,
        })

    } catch (error) {
        const errorMessage = (error instanceof Error) ? error.message : "Failed to Fetch User Profile"
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
const updateUserProfile = async (req: Request, res: Response) => {
    try {
        const data = await userProfileService.updateUserProfile(req.body, req.user as UserType)
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
export const userProfileController = {
    userProfile,
    updateUserProfile
}