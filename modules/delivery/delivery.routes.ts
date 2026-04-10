import express from 'express';
import { deliveryController } from './delivery.controller';

const router = express.Router();

router.post('/create', deliveryController.createDelivery);

router.patch('/accept-order/:orderId', deliveryController.acceptOrderService);

router.patch('/update-status/:orderId', deliveryController.updateDeliveryStatusService);

router.patch('/toggle-availability', deliveryController.toggleAvailabilityService);

router.get('/stats/:deliveryManId', deliveryController.getDeliveryStatsService);

router.get('/history/:deliveryManId', deliveryController.getDeliveryHistoryService);

export const deliveryRouter = router;