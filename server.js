import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import cors from 'cors';
import authRoute from './routes/authRoute.js';
import categoryRoute from './routes/categoryRoute.js';
import fileRoute from './routes/fileRoute.js';
import dietRoute from './routes/dietRoute.js';
// import path from 'path';
// import { fileURLToPath } from 'url';

// config env
dotenv.config({path: "./.env"});

// Database configuration
connectDB();

//esmodule fix
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
// app.use(express.static(path.join(__dirname, './client/dist')))

// Routes
app.use('/api/auth', authRoute);
app.use('/api/category', categoryRoute);
app.use('/api/file', fileRoute);
app.use('/api/diet', dietRoute);

// app.use('*', function(req, res){
//     res.sendFile(path.join(__dirname, './client/dist/index.html'))
// })

const PORT = process.env.PORT || 8080

app.get('/', (req, res) => {
    res.send("Welcome")
})

app.listen(PORT, () => {
    console.log(`Connected to port ${PORT}`);
})