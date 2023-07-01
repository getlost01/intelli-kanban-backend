import express from "express";
import { Configuration, OpenAIApi } from "openai";
import * as dotenv from "dotenv";

// Express router & env config
const router = express.Router();
dotenv.config();

// OpenAI API config
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

// Route to get prompt response from OpenAI API
router.post("/", async (req, res) => {
    try {
        const prompts = req.body.prompts;

        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `${prompts}`,
            temperature: 0.2,
            max_tokens: 2000,
            top_p: 1,
            frequency_penalty: 0.5,
            presence_penalty: 0,
        });

        res.status(200).send({ message: "success", data: response.data.choices[0].text });

    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "error", error: error });
    }
});

export default router;