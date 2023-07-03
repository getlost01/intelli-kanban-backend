import express from "express";
import { v4 as uuidv4 } from 'uuid';
import Board from "../models/board.js";
import column from "../models/card.js";
import Column from "../models/column.js";
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

        const response = await new Column({ ...payload}).save();

		res.status(200).send({ message: "Board Created", column: response }); 
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: "Internal Server Error" });
	}
});

// Delete column Id
router.delete("/:id", async (req, res) => {
	try {
        const { id } = req.params;
        const column = await Column.findOne({ id: id });
        if(!column) {
            res.status(404).send({ message: "Column Not Found" });
            return;
        }

        const response = await Column.deleteOne({id: id});

        res.status(200).send({ message: "Column Deleted" }); 
	} catch (error) {
        console.log(error);
		res.status(500).send({ message: "Internal Server Error" });
	}
});

export default router;
