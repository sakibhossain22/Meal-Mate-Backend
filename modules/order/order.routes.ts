import express from 'express';

import auth, { UserRole } from '../../src/lib/middlewares/auth';
import { orderController } from './order.controller';

const router = express.Router()

router.get("/", auth(UserRole.PROVIDER), orderController.getAllOrder)

export const orderRouter = router