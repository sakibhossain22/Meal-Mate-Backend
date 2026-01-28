import express from 'express';

import auth, { UserRole } from '../../src/lib/middlewares/auth';
import { providerController } from './provider.controller';

const router = express.Router()

router.get('/', providerController.getAllProvider)
router.get('/:id', providerController.providerDetails)
router.get('/stats', auth(UserRole.PROVIDER), providerController.providerStats)

export const providerRouter = router