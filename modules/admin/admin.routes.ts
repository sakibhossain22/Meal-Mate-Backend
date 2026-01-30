import express from 'express';
import { adminController } from './admin.controllers';
import auth, { UserRole } from '../../src/lib/middlewares/auth';


const router = express.Router()
router.get('/',auth(UserRole.ADMIN), adminController.adminStats)
router.get('/all-categories', auth(UserRole.ADMIN), adminController.Allcategories)
router.get('/all-users', auth(UserRole.ADMIN), adminController.getAllUsers)
router.get('/all-orders', auth(UserRole.ADMIN), adminController.getAllOrders)
router.patch('/update-user/:id', auth(UserRole.ADMIN), adminController.updateUserStatus)

export const adminRouter = router