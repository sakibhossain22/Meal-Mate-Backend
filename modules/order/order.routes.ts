import express from 'express';

import auth, { UserRole } from '../../src/lib/middlewares/auth';
import { orderController } from './order.controller';

const router = express.Router()
// Provider
router.get("/provider", auth(UserRole.PROVIDER), orderController.getAllOrder)
router.patch("/provider/update-order/:id", auth(UserRole.PROVIDER,UserRole.CUSTOMER), orderController.updateOrder)
// customer
router.post('/', auth(UserRole.CUSTOMER),orderController.postOrder)
router.get('/customer', auth(UserRole.CUSTOMER),orderController.getOrders)
router.get('/:id', auth(UserRole.CUSTOMER),orderController.singleOrderDetails)

export const orderRouter = router