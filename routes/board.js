import express from "express";
import { v4 as uuidv4 } from 'uuid';
import Board from "../models/board.js";
import Card from "../models/card.js";
import Column from "../models/column.js";
import defaultData from "./defaultData/board.js";
const router = express.Router();
import * as dotenv from 'dotenv'; 
import column from "../models/column.js";
dotenv.config();

// Create kanban board
router.post("/create", async (req, res) => {
	try {
        const uniqueId = uuidv4();

		const { name, description, access } = req.body;
        const payload = {
            id: uniqueId,
            boardName: name,
            boardDescription: description,
            cards: [],
            columns: [],
            columnOrder: [],
            access: access,
        }

        defaultData['cards'].forEach( async (ele,index) => {
            ele.index = index;
            ele.id = uuidv4();
            payload['cards'].push(ele.id);
            await new Card({ ...ele}).save();
        });

        defaultData['columns'].forEach( async (ele,index) => {
            ele.index = index;
            ele.id = uuidv4();
            ele.cardIds = [];
            payload['columns'].push(ele.id);
            ele.cards.forEach((cardId) => {
                ele.cardIds.push(defaultData['cards'].find((card) => card.index === cardId).id);
            });

            await new column({ ...ele}).save();
        });

        defaultData['columns'].forEach( async (ele,index) => {
            payload['columnOrder'].push(ele.id);
        });

        await new Board({ ...payload}).save();

		res.status(200).send({ message: "Board Created", payload }); 
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: "Internal Server Error" });
	}
});


// Get kanban board by board ids
router.get("/:id", async (req, res) => {
	try {
        const { id } = req.params;
        const board = await Board.findOne({ id: id });
        if(!board) {
            res.status(404).send({ message: "Board Not Found" });
            return;
        }

        const columns = await Column.find({ id: { $in: board.columns } });
        const cards = await Card.find({ id: { $in: board.cards } });
        const boarddata = {
            id: board.id,
            boardName: board.boardName,
            boardDescription: board.boardDescription,
            board:{
                cards: cards,
                columns: columns,
                columnOrder: board.columnOrder,
            },
            access: board.access,
        }
        res.status(200).send({ message: "Board Fetched", boarddata }); 
	} catch (error) {
        console.log(error);
		res.status(500).send({ message: "Internal Server Error" });
	}
});

export default router;