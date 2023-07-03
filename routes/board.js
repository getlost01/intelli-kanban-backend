import express from "express";
import { v4 as uuidv4 } from 'uuid';
import Board from "../models/board.js";
import Card from "../models/card.js";
import Column from "../models/column.js";
import boardColl  from "../models/boardCollection.js";
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

		res.status(200).send({ error: false, message: "Board Created", board: payload }); 
	} catch (error) {
		console.log(error);
		res.status(500).send({ error: true, message: "Internal Server Error" });
	}
});


// Get kanban board by board ids
router.get("/:id", async (req, res) => {
	try {
        const { id } = req.params;
        const can = await boardColl.findOne({id: id});
        if(can) {
            res.status(200).send({ message: "Board Fetched", boarddata: can, through: "can" }); 
            return;
        }

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


        await new boardColl({ ...boarddata}).save();
        console.log("saved");

        res.status(200).send({ message: "Board Fetched", boarddata }); 
	} catch (error) {
        console.log(error);
		res.status(500).send({ message: "Internal Server Error" });
	}
});

router.post("/update", async (req, res) => {
	try {
        const { id, board} = req.body;
        const boardData = await boardColl.findOne({ id: id });

        if(!boardData) {
            res.status(200).send({ error: true, message: "Board Not Found" });
            return;
        }

        const response = await boardColl.updateOne({id: id}, {board});

		res.status(200).send({ error: false, message: "Updated"}); 
	} catch (error) {
		console.log(error);
		res.status(500).send({ error: true, message: "Internal Server Error" });
	}
});

export default router;
