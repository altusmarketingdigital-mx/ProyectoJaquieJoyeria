import express, { Request, Response } from 'express';
import cors from 'cors';
import authRouter from './routes/auth';
import adminRouter from './routes/admin';
import clientRouter from './routes/client';
import adminProductsRouter from './routes/adminProducts';
import ordersRouter from './routes/orders';
import { verifyJwt } from './middleware/auth';

export const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRouter);

// Protected routes
app.use('/api/client', verifyJwt, clientRouter);
app.use('/api/admin', verifyJwt, adminRouter);
app.use('/api/admin', verifyJwt, adminProductsRouter);
app.use('/api/orders', ordersRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Jacqueline Tapia Joyería API');
});
