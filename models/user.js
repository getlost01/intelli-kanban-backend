import mongoose from "mongoose";
import * as dotenv from 'dotenv'; 
dotenv.config();

const userSchema = new mongoose.Schema({
	id: { type: String, required: true },
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true },
	boardIDs: { type: Array, required: false, default: [] },
	recentBoard: { type: String, required: false },
});

export default mongoose.model("User", userSchema);
