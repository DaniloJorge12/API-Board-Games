import express from "express";
import dotenv from "dotenv";
import Router from "./src/routes/boardGamesRoutes.js"
import boardGames from "./src/models/dados.js";

const app = express();
app.use(express.json());

dotenv.config();
const serverPort = process.env.PORT || 3000;

app.get("/", (req,res) => {
    res.send(boardGames)
})

app.use("/BoardGames", Router);

app.listen(serverPort, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${serverPort} 🚀`);
});