import express from 'express';
import { mealController } from './meal.controllers';

const router = express.Router()

router.get('/', mealController.getMeal)


export const mealRouter = router