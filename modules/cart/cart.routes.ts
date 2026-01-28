import express from "express";
import { cartController } from "./cart.controller";
import auth, { UserRole } from "../../src/lib/middlewares/auth";


const router = express.Router();


router.post("/", auth(UserRole.CUSTOMER), cartController.addToCart);
router.get("/", auth(UserRole.CUSTOMER),cartController.getCart);
// router.delete("/item/:itemId", removeFromCart);


export const cartRouter = router;
