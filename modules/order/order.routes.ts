import express from 'express';

import auth, { UserRole } from '../../src/lib/middlewares/auth';
import { orderController } from './order.controller';

const router = express.Router()
// Provider
router.get("/", auth(UserRole.PROVIDER), orderController.getAllOrder)
router.patch("/update-order/:id", auth(UserRole.PROVIDER), orderController.updateOrder)
// customer
router.post('/', auth(UserRole.CUSTOMER),orderController.postOrder)

export const orderRouter = router