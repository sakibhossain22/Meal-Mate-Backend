import express from 'express';
import { deliveryController } from './delivery.controller';


const router = express.Router()


router.post('/create', deliveryController.createDelivery)

export const deliveryRouter = router