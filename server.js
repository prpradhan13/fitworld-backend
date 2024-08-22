import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import cors from 'cors';
import authRoute from './routes/authRoute.js';
import categoryRoute from './routes/categoryRoute.js';
import fileRoute from './routes/fileRoute.js';
import dietRoute from './routes/dietRoute.js';
import helmet from 'helmet';

// config env
dotenv.config({path: "./.env"});

// Database configuration
connectDB();

const app = express();

// Middleware
// Use Helmet to secure the app by setting various HTTP headers
app.use(helmet()); // Default security headers, including CSP
app.use(express.json());
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

// Routes
app.use('/api/auth', authRoute);
app.use('/api/category', categoryRoute);
app.use('/api/file', fileRoute);
app.use('/api/diet', dietRoute);

const PORT = process.env.PORT || 8080

app.get('/', (req, res) => {
    res.send("Welcome")
})

app.listen(PORT, () => {
    console.log(`Connected to port ${PORT}`);
})