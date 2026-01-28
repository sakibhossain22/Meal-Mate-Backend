import express from 'express';

import auth, { UserRole } from '../../src/lib/middlewares/auth';
import { userProfileController } from './userProfile.controller';


const router = express.Router()

router.get('/', auth(UserRole.ADMIN,UserRole.CUSTOMER, UserRole.PROVIDER), userProfileController.userProfile)



export const userProfileRouter = router