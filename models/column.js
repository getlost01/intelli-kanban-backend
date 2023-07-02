import mongoose from "mongoose";
const Schema = mongoose.Schema;

const columnSchema = new Schema({
	id : { type: String, required: true },
	name: { type: String, required: true },
	cards: { type: Array, required: true, default: [] },
	lastUpdated: { type: Date, default: Date.now, expires: 3600 },
});

export default mongoose.model("Column", columnSchema);

