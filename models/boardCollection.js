import mongoose from "mongoose";
const Schema = mongoose.Schema;

const boardCollectionSchema = new Schema({
    id: { type: String, required: true }, 
    boardName: { type: String, required: true },
    boardDescription: { type: String, required: true },
    board: { type: Schema.Types.Mixed , required: true, default: {} },
    access: { type: Array, required: true, default: [] },
	lastUpdated: { type: Date, required: true, default: Date.now },
});

export default mongoose.model("BoardColl", boardCollectionSchema);