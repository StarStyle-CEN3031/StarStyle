import express from 'express';
import bodyParser from "body-parser";
import cors from "cors";
import connectDB from './config/mongodb.js'; //config/db.mjs
import verifyToken from './middleware/authenticate.js';
import User from './model/User.js'
import dotenv from 'dotenv';

dotenv.config(); //config/index.mjs

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

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
app.get('/health', (req, res) => res.status(200).json({ status: 'OK' }));

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));