import express from "express";
import { v4 as uuidv4 } from 'uuid';
import User from "../models/user.js";
const router = express.Router();
import axios from "axios";
import * as dotenv from 'dotenv'; 
dotenv.config();

// For login
router.post("/login", async (req, res) => {
	try {
		const { email, password } = req.body;

        const user = await User.findOne({email});
        if(!user) {
            res.status(200).send({ error: true, message: "User Not Found" });
            return;
        }
        if(user.password !== password) {
            res.status(200).send({ error: true, message: "Incorrect Password" });
            return;
        }

		res.status(200).send({ error: false, message: "User get logined", user: user }); 
	} catch (error) {
		console.log(error);
		res.status(500).send({ error: true, message: "Internal Server Error" });
	}
});


router.post("/signup", async (req, res) => {
	try {
        const uniqueId = uuidv4();
        const { firstName, lastName, email, password } = req.body;
        const payload = {
            id: uniqueId,
            firstName,
            lastName,
            email,
            password,
        }

        const canUser = await User.findOne({email});
        if(canUser) {
            res.status(200).send({ error: true, message: "User Already Exists" });
            return;
        }

        // Create welcome kanban board
        const response = await axios.post(`${process.env.BASEURL}/api/board/create`, {
            name: "Welcome Board", 
            description: "This is your first board. You can create more boards and cards to organize your work and life.",
            access: [uniqueId]
        });

        if(response.error) {
            res.status(500).send({ error: true, message: "Unable to create welcome board" });
            return;
        }
        payload["recentBoard"] = response.data.board.id;
        payload["boardIDs"] = [response.data.board.id];

        const user = await new User({ ...payload}).save();

		res.status(200).send({ error: false, message: "User get logined", user: user }); 
	} catch (error) {
        console.log(error);
		res.status(500).send({ message: "Internal Server Error" });
	}
});

export default router;
