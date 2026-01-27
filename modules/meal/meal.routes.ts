import express from 'express';
import { mealController } from './meal.controllers';
import auth, { UserRole } from '../../src/lib/middlewares/auth';

const router = express.Router()

router.get('/', mealController.getMeal)
router.get('/:id', mealController.getMealDetails)
router.post('/add-meal',auth(UserRole.PROVIDER), mealController.addMeal)
router.post('/update-meal/:id',auth(UserRole.PROVIDER), mealController.updateMeal)


export const mealRouter = router