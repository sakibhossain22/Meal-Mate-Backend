import express from 'express';
import { mealController } from './meal.controllers';

const router = express.Router()

router.get('/', mealController.getMeal)
router.get('/:id', mealController.getMealDetails)


export const mealRouter = router