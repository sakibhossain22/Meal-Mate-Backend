import express from 'express';
import { adminController } from './admin.controllers';
import auth, { UserRole } from '../../src/lib/middlewares/auth';


const router = express.Router()
router.get('/all-users',adminController.getAllUsers )
router.get('/update-user/:id',adminController.updateUserStatus )

export const adminRoutes = router