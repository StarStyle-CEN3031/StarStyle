import express from 'express';
import bodyParser from "body-parser";
import cors from "cors";
import connectDB from './config/mongodb.js'; //config/db.mjs
import verifyToken from './middleware/authenticate.js';
import User from './model/User.js'
import dotenv from 'dotenv';

dotenv.config(); //config/index.mjs

const app = express();

//middleware
// source: https://www.stackhawk.com/blog/fixing-no-access-control-allow-origin-header-present/
// const allowedOrigins = ["http://localhost:3000", "https://star-style-git-naydelin-teafanys-projects.vercel.app"];
// app.use((req, res, next) => {
//     const origin = req.headers.origin;
    
//     if (allowedOrigins.includes(origin)) {
//         res.header('Access-Control-Allow-Origin', origin);
//     }

//     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');

//     res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

//     if (req.method == 'OPTIONS') {
//         return res.status(200).end();
//     }

//     next();
// })

app.use(cors({
    origin: ["http://localhost:3000", "https://star-style-git-naydelin-teafanys-projects.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));

app.options('*', cors());

app.use(bodyParser.json());

// Connect to MongoDB
connectDB();

app.post("/api/protected", verifyToken, async(req, res) => {
    const { uid, name, email, picture } = req.user; 

    let user = await User.findOne({ uid });

    if(!user) { // create user 
        user = new User({ uid, name, email, picture });
        await user.save();
    }

    res.send(user);
}); 

// Health check
app.get('/health', (req, res) => {
    console.log('Health route hit');
    res.status(200).json({ status: 'OK' })
});

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));