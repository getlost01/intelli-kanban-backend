import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";

// Routes
import chatsRoutes from "./routes/chats.js";
import boardsRoutes from "./routes/board.js";
import cardRoutes from "./routes/card.js";
import columnRoutes from "./routes/column.js";
import connectdb from './config/db.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(cors());

// Connect to MongoDB
connectdb();

// Express server config and listen
app.listen(process.env.PORT || 8000, function(){
    console.log("➡️ Intelli-Kanban Server listening on port %d in %s mode 👍", this.address().port, app.settings.env);
});

// Routes calling
app.use("/api/chat", chatsRoutes);
app.use("/api/board", boardsRoutes);
app.use("/api/card", cardRoutes);
app.use("/api/column", columnRoutes);

// default 404
app.get("*", (req, res) => {
    res.status(404).send({
        message: "Page not found 404", 
        endPoints: {
            "/chat": "post"
        }
    });
});