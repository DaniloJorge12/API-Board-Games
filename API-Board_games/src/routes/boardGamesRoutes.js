import express from "express";
import { getAllgames, getGamesByld, createGame, updateGame, deleteGame } from "../controllers/boardGamesController.js";

const router = express.Router();

router.get("/", getAllgames);
router.get("/:id", getGamesByld);
router.post("/", createGame);
router.put("/:id", updateGame);
router.delete("/:id", deleteGame);

export default router;