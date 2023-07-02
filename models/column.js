import mongoose from "mongoose";
const Schema = mongoose.Schema;

const columnSchema = new Schema({
	id : { type: String, required: true },
	name: { type: String, required: true },
	cardIds: { type: Array, required: true, default: [] },
	lastUpdated: { type: Date, default: Date.now },
});

export default mongoose.model("Column", columnSchema);

