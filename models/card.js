import mongoose from "mongoose";
const Schema = mongoose.Schema;

const cardSchema = new Schema({
	id : { type: String, required: true },
	name: { type: String, required: true },
	description: { type: String, required: false },
	assignee: { type: Array, required: false, default: [] },
	taskBreakdown: { type: String, required: false },
	completed: { type: Boolean, required: false, default: false },
	priority: { type: String, required: false, default: "low" },
	lastUpdated: { type: Date, default: Date.now },
});

export default mongoose.model("Card", cardSchema);