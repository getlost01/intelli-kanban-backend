import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";

// Routes
import chatsRoutes from "./routes/chats.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(cors());

// Express server config and listen
app.listen(process.env.PORT || 8000, function(){
    console.log("➡️ ChatGPT Server listening on port %d in %s mode 👍", this.address().port, app.settings.env);
});

// Routes calling
app.use("/api/chat", chatsRoutes);

// default 404
app.get("*", (req, res) => {
    res.status(404).send({
        message: "Page not found 404", 
        endPoints: {
            "/chat": "post"
        }
    });
});