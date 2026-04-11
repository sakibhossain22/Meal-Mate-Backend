import express from 'express';
import { superAdminController } from './superAdmin.controller';
import auth, { UserRole } from '../../src/lib/middlewares/auth';
import { Role } from '../../generated/prisma/enums';


const router = express.Router();

router.patch('/manage-user', auth(UserRole.SUPERADMIN), superAdminController.manageUser);
router.get('/system-stats', auth(UserRole.SUPERADMIN), superAdminController.getSystemStats);
router.patch('/verify-provider', auth(UserRole.SUPERADMIN), superAdminController.verifyProvider);
router.patch('/verify-delivery', auth(UserRole.SUPERADMIN), superAdminController.verifyDeliveryMan);
router.post('/categories', auth(UserRole.SUPERADMIN), superAdminController.createCategory);
router.get('/all-orders', auth(UserRole.SUPERADMIN), superAdminController.getAllOrders);
router.get('/delivery-men-profiles', auth(UserRole.SUPERADMIN), superAdminController.getAllDeliveryMenProfiles);
router.get('/providers-profiles', auth(UserRole.SUPERADMIN), superAdminController.getAllProvidersProfile);


export const superAdminRouter = router;