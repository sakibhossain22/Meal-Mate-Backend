import express from 'express';
import { deliveryController } from './delivery.controller';


const router = express.Router()

// router.get('/provider/stats', auth(UserRole.PROVIDER), providerController.providerStats)
// router.get('/', providerController.getAllProvider)
// router.get('/allprovidermeal', auth(UserRole.PROVIDER), providerController.getAllProviderMeal)
// router.get('/:id', providerController.providerDetails)
router.post('/create', deliveryController.createDelivery)

export const deliveryRouter = router