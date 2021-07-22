import { Router } from "express";
import fs from "fs";
import { nanoid } from "nanoid";
const router = new Router();
const realPath = null;

// Get "/api/notes" responds with all notes from the database
router.get("/notes", (req, res) => {
  fs.readFile("./app/db/db.json", "utf-8", (err, data) => {
    if (err) throw err;
    return res.json(JSON.parse(data));
  });
});

router.post("/notes", (req, res) => {
  console.log(req.body);
  const obj = {
    id: nanoid(4),
    title: req.body.title,
    text: req.body.text,
  };
  fs.readFile("./app/db/db.json", "utf-8", (err, data) => {
    if (err) throw err;
    const db = JSON.parse(data);
    db.push(obj);
    fs.writeFile("./app/db/db.json", JSON.stringify(db), (err) => {
      if (err) throw err;
      return res.json(db);
    });
  });
});

// bonus:
// Delete "/api/notes" deletes the note with an id equal to req.params.id
router.delete("/notes/:id", (req, res) => {
  fs.readFile("./app/db/db.json", "utf-8", (err, data) => {
    if (err) throw err;
    const allNotes = JSON.parse(data);
    const deleteNote = req.params.id;

    const result = allNotes.filter((note) => note.id !== deleteNote);

    fs.writeFile("./app/db/db.json", JSON.stringify(result), (err) => {
      if (err) res.json({ err: "error deleting" });
      res.json(result);
    });
  });
});

export default router;
