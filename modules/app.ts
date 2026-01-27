import express from 'express';
import { toNodeHandler } from "better-auth/node";
import { auth } from '../src/lib/auth';
import cors from 'cors';
import globalErrorHandler from '../src/lib/middlewares/globalErrorHandler';
import { notFound } from '../src/lib/middlewares/notFound';
import { mealRouter } from './meal/meal.routes';


const app = express();
app.use(express.json());
app.use(cors({
    origin: process.env.APP_URL || "http://localhost:5000",
    credentials: true
}));

app.all("/api/auth/*slat", toNodeHandler(auth));
app.use('/meal', mealRouter)


app.use(notFound)
app.use(globalErrorHandler)
export default app;
