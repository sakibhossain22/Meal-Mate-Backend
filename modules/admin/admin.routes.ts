import express from 'express';
import { adminController } from './admin.controllers';
import auth, { UserRole } from '../../src/lib/middlewares/auth';


const router = express.Router()
router.get('/',auth(UserRole.ADMIN), adminController.adminStats)
router.get('/all-reviews', adminController.getAllReviews)
router.get('/all-categories', auth(UserRole.ADMIN, UserRole.SUPERADMIN), adminController.Allcategories)
router.get('/all-users', auth(UserRole.ADMIN, UserRole.SUPERADMIN), adminController.getAllUsers)
router.get('/all-orders', auth(UserRole.ADMIN, UserRole.SUPERADMIN, UserRole.DELIVERY), adminController.getAllOrders)
router.post('/add-category', auth(UserRole.ADMIN, UserRole.SUPERADMIN), adminController.addCategory)
router.patch('/update-user/:id', auth(UserRole.ADMIN, UserRole.SUPERADMIN), adminController.updateUserStatus)
router.delete('/delete-reviews/:id', auth(UserRole.ADMIN, UserRole.SUPERADMIN), adminController.deleteReview)

export const adminRouter = router