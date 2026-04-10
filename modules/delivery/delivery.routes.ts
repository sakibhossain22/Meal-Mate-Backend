import express from 'express';
import { deliveryController } from './delivery.controller';
import auth, { UserRole } from '../../src/lib/middlewares/auth';

const router = express.Router();

router.post('/create', deliveryController.createDelivery);

router.patch('/accept-order/:orderId',auth(UserRole.DELIVERY), deliveryController.acceptOrderService);

router.patch('/update-status/:orderId',auth(UserRole.DELIVERY), deliveryController.updateDeliveryStatusService);

router.patch('/toggle-availability',auth(UserRole.DELIVERY), deliveryController.toggleAvailabilityService);

router.get('/stats/:deliveryManId',auth(UserRole.DELIVERY), deliveryController.getDeliveryStatsService);

router.get('/history/:deliveryManId',auth(UserRole.DELIVERY), deliveryController.getDeliveryHistoryService);

export const deliveryRouter = router;