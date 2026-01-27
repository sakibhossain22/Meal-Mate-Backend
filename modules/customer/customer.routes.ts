import express from 'express';

import auth, { UserRole } from '../../src/lib/middlewares/auth';
import { customerController } from './customer.controller';

const router = express.Router()
router.get('/orders',auth(UserRole.CUSTOMER),customerController.customerOrders)



export const customerRouter = router