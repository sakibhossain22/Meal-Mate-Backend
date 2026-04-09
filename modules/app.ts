import express, { Request, Response } from 'express';
import { toNodeHandler } from "better-auth/node";
import { auth } from '../src/lib/auth';
import cors from 'cors';
import { notFound } from '../src/lib/middlewares/notFound';
import { mealRouter } from './meal/meal.routes';
import { orderRouter } from './order/order.routes';
import { adminRouter } from './admin/admin.routes';
import { customerRouter } from './customer/customer.routes';
import { providerRouter } from './providers/provider.routes';
import { userProfileRouter } from './userProfile/userProfile.routes';
import { cartRouter } from './cart/cart.routes';


const app = express();
app.use(express.json());
app.use(cors({
    origin: process.env.APP_URL || "http://localhost:5000",
    credentials: true
}));

app.all("/api/auth/*slat", toNodeHandler(auth));
app.use('/meal', mealRouter)
app.use("/orders", orderRouter)
app.use('/admin', adminRouter)
app.use('/customer', customerRouter)
app.use("/provider", providerRouter)
app.use("/profile", userProfileRouter)
app.use('/cart', cartRouter)


app.get('/', async (req: Request, res: Response) => {
    res.send("Hello Meal Mate Server")
})
app.use(notFound)
export default app;
