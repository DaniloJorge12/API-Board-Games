import express from "express";
import dotenv from "dotenv";
import gamesRoutes from "./src/routes/boardGamesRoutes.js"
import boardGames from "./src/models/dados.js";

const app = express();
app.use(express.json());

dotenv.config();
const serverPort = process.env.PORT || 3001;

app.get("/", (req,res) => {
    res.send(boardGames)
})

app.use("/BoardGames", boardGames);

app.listen(serverPort, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${serverPort} 🚀`);
});