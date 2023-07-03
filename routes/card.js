import express from "express";
import { v4 as uuidv4 } from 'uuid';
import Card from "../models/card.js";
const router = express.Router();
import * as dotenv from 'dotenv'; 
dotenv.config();

// Create card
router.post("/create", async (req, res) => {
	try {
        const uniqueId = uuidv4();

		const { name } = req.body;
        const payload = {
            id : uniqueId,
            name: name,
        }

        const response = await new Card({ ...payload}).save();

		res.status(200).send({ message: "Board Created", card: response }); 
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: "Internal Server Error" });
	}
});


// Put card data by ids
router.put("/:id", async (req, res) => {
	try {
        const { id } = req.params;
        const card = await Card.findOne({ id: id });
        if(!card) {
            res.status(404).send({ message: "Card Not Found" });
            return;
        }

        const { name, description, assignee, taskBreakdown, completed, priority } = req.body;
        const payload = {
            name,
            description,
            assignee,
            taskBreakdown,
            completed,
            priority,
        }

        const response = await Card.updateOne({id: id}, payload);

        res.status(200).send({ message: "Card Updated" }); 
	} catch (error) {
        console.log(error);
		res.status(500).send({ message: "Internal Server Error" });
	}
});

// Delete card by ID
router.delete("/:id", async (req, res) => {
	try {
        const { id } = req.params;
        const card = await Card.findOne({ id: id });
        if(!card) {
            res.status(404).send({ message: "Card Not Found" });
            return;
        }

        const response = await Card.deleteOne({id: id});

        res.status(200).send({ message: "Card Deleted" }); 
	} catch (error) {
        console.log(error);
		res.status(500).send({ message: "Internal Server Error" });
	}
});

export default router;
