import express from 'express';

import auth, { UserRole } from '../../src/lib/middlewares/auth';
import { providerController } from './provider.controller';

const router = express.Router()

router.get('/provider/stats', auth(UserRole.PROVIDER), providerController.providerStats)
router.get('/', providerController.getAllProvider)
router.get('/allprovidermeal', auth(UserRole.PROVIDER), providerController.getAllProviderMeal)
router.get('/:id', providerController.providerDetails)
router.post('/create', providerController.createProvider)

export const providerRouter = router