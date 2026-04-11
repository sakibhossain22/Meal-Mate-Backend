import express from 'express';
import { deliveryController } from './delivery.controller';
import auth, { UserRole } from '../../src/lib/middlewares/auth';

const router = express.Router();

router.post('/create', deliveryController.createDelivery);

router.patch('/accept-order',auth(UserRole.DELIVERY), deliveryController.acceptOrderService);

router.patch('/update-status/',auth(UserRole.DELIVERY), deliveryController.updateDeliveryStatusService);

router.patch('/toggle-availability',auth(UserRole.DELIVERY), deliveryController.toggleAvailabilityService);

router.get('/stats',auth(UserRole.DELIVERY), deliveryController.getDeliveryStatsService);

router.get('/history',auth(UserRole.DELIVERY), deliveryController.getDeliveryHistoryService);

export const deliveryRouter = router;