import express from 'express';
import bodyParser from 'body-parser';
import viewEngine from './config/viewEngine.js';
import initWebRoutes from './route/web.js';
import connectDB from './config/connectDB.js';
import cors from 'cors';
import dotenv from 'dotenv';

// Load biến môi trường trước tiên
dotenv.config();

const app = express();

// CORS: Cho phép React gọi API
app.use(cors({
    origin: process.env.URL_REACT,
    credentials: true
}));

// Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// View engine
viewEngine(app);

// Routes
initWebRoutes(app);

// Database
connectDB();

// Cổng chạy server
const port = process.env.PORT || 8082;
app.listen(port, () => {
    console.log("✅ Server is running on port:", port);
});