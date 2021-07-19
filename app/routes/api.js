import { Router } from "express";
import db from "../db/service.js";

const router = new Router();

console.log(db);

// Get "/api/notes" responds with all notes from the database
router.get("/notes", async (req, res) => {});

router.post("/notes", ({ body }, res) => {});

// bonus:
// Delete "/api/notes" deletes the note with an id equal to req.params.id
router.delete("/notes/:id", (req, res) => {});

export default router;
