import mongoose from "mongoose";
const Schema = mongoose.Schema;

const boardSchema = new Schema({
    id: { type: String, required: true }, 
    boardName: { type: String, required: true },
    boardDescription: { type: String, required: true },
    cards: { type: Array , required: true, default: [] },
    columns: { type: Array, required: true, default: [] },
    columnOrder: { type: Array, required: true, default: [] },
    access: { type: Array, required: true, default: [] },
	lastUpdated: { type: Date, required: true, default: Date.now },
});

export default mongoose.model("Board", boardSchema);