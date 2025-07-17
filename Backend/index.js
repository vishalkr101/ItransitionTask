import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import drugRoutes from './Routes/drugRoutes.js';
import connectDB from './db/index.js';
import config from './config/config.js';
import morgan from 'morgan';

dotenv.config();
const app = express();
connectDB();

app.use(express.json());
app.use(cors({
    origin: config.corsOrigin,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));
app.use(morgan('dev')); //   Change to 'combined' for production logging

app.use('/api', drugRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT);
});