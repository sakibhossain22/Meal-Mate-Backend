import express from 'express';

import auth, { UserRole } from '../../src/lib/middlewares/auth';
import { providerController } from './provider.controller';

const router = express.Router()

router.get('/provider/stats', auth(UserRole.PROVIDER), providerController.providerStats)
router.get('/', providerController.getAllProvider)
router.get('/:id', providerController.providerDetails)

export const providerRouter = router