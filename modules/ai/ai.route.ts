import { Router } from 'express'
import { aiMealRecommend, chatWithAI, generateMealDescriptionAI } from './ai.controller'

const router = Router()

router.post('/chat', chatWithAI)
router.post('/meal-description', generateMealDescriptionAI)
router.post('/meal-recommend', aiMealRecommend)

export const aiRoutes = router