import express from 'express';

import auth, { UserRole } from '../../src/lib/middlewares/auth';
import { userProfileController } from './userProfile.controller';


const router = express.Router()

router.get('/', auth(UserRole.ADMIN,UserRole.CUSTOMER, UserRole.PROVIDER, UserRole.DELIVERY, UserRole.SUPERADMIN), userProfileController.userProfile)
router.get('/user', auth(UserRole.ADMIN,UserRole.CUSTOMER, UserRole.PROVIDER, UserRole.DELIVERY, UserRole.SUPERADMIN), userProfileController.allUserProfile)
router.patch('/update', auth(UserRole.ADMIN,UserRole.CUSTOMER, UserRole.PROVIDER, UserRole.DELIVERY, UserRole.SUPERADMIN), userProfileController.updateUserProfile)



export const userProfileRouter = router