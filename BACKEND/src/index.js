import express from 'express';
import bodyParser from 'body-parser';
import viewEngine from './config/viewEngine.js';
import initWebRoutes from './route/web.js';
import connectDB from './config/connectDB.js';

import cors from 'cors';

require('dotenv').config();

let app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

// ✅ Đặt body-parser trước routes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Config view engine
viewEngine(app);

// Init web routes
initWebRoutes(app);

// Connect to the database
connectDB();

let port = process.env.PORT || 8082;
app.listen(port, () => {
    console.log("Server is running on port: " + port);
});