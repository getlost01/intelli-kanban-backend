import mongoose from "mongoose";
import * as dotenv from 'dotenv'; 
dotenv.config();

const userSchema = new mongoose.Schema({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	userName: { type: String, required: true },
	avatar: { type: String, required: false },
	password: { type: String, required: true },
	boardIDs: { type: Array, required: false, default: [] },
	recentBoard: { type: String, required: false },
});

export default mongoose.model("User", userSchema);
