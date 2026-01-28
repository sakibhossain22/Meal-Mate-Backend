import express from 'express';

import auth, { UserRole } from '../../src/lib/middlewares/auth';
import { orderController } from './order.controller';

const router = express.Router()
// Provider
router.get("/provider", auth(UserRole.PROVIDER), orderController.getAllOrder)
router.patch("/provider/update-order/:id", auth(UserRole.PROVIDER), orderController.updateOrder)
// customer
router.post('/', auth(UserRole.CUSTOMER),orderController.postOrder)
router.get('/customer', auth(UserRole.CUSTOMER),orderController.getOrders)

export const orderRouter = router