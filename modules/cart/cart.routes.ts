import express from "express";
import { cartController } from "./cart.controller";
import auth, { UserRole } from "../../src/lib/middlewares/auth";


const router = express.Router();


router.post("/", auth(UserRole.CUSTOMER), cartController.addToCart);
router.get("/", auth(UserRole.CUSTOMER), cartController.getCart);
router.delete("/:id",auth(UserRole.CUSTOMER), cartController.deleteFromCart);
router.delete("/clearcart",auth(UserRole.CUSTOMER), cartController.clearCart);


export const cartRouter = router;
