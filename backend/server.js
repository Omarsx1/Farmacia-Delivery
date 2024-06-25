import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import userRouter from './routes/userRoute.js';
import foodRouter from './routes/foodRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';
import dotenv from 'dotenv';

// Cargar las variables de entorno desde el archivo .env
dotenv.config();

// App config
const app = express();
const port = process.env.PORT || 5000;  // Cambiar aquí de 4000 a 5000

// Middlewares
app.use(express.json());
app.use(cors());

// DB connection
const startServer = async () => {
    await connectDB();

    // API endpoints
    app.use('/api/user', userRouter);
    app.use('/api/food', foodRouter);
    app.use('/images', express.static('uploads'));
    app.use('/api/cart', cartRouter);
    app.use('/api/order', orderRouter);

    app.get('/', (req, res) => {
        res.send('API Working');
    });

    app.listen(port, () => console.log(`Server started on http://localhost:${port}`));
};

startServer();
