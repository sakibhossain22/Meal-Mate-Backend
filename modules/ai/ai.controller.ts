import { Request, Response } from 'express'
import { generateAIResponse, generateMealDescription, getAiMealRecommendation } from './ai.service'

export const chatWithAI = async (req: Request, res: Response) => {
    try {
        const { message } = req.body

        if (!message) {
            return res.status(400).json({
                success: false,
                message: 'Message is required',
            })
        }

        const reply = await generateAIResponse(message)

        res.status(200).json({
            success: true,
            message: 'AI response generated successfully',
            data: reply,
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message || 'AI request failed',
        })
    }
}
export const generateMealDescriptionAI = async (req: Request, res: Response) => {
    try {
        const { mealName } = req.body

        if (!mealName) {
            return res.status(400).json({
                success: false,
                message: 'Meal Name is required',
            })
        }

        const reply = await generateMealDescription(mealName)

        res.status(200).json({
            success: true,
            message: 'AI Meal Description generated successfully',
            data: reply,
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message || 'AI request failed',
        })
    }
}
export const aiMealRecommend = async (req: Request, res: Response) => {
    try {
        const { mealId } = req.body

        if (!mealId) {
            return res.status(400).json({
                success: false,
                message: 'Meal Id is required',
            })
        }

        const reply = await getAiMealRecommendation(mealId)

        res.status(200).json({
            success: true,
            message: 'AI Meal Reconmendation generated successfully',
            data: reply,
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message || 'AI request failed',
        })
    }
}