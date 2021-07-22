import { Router } from "express";
const router = new Router();
const fs = require("fs");
const { nanoid } = require("nanoid");
let realPath = null;



// Get "/api/notes" responds with all notes from the database
router.get("/notes", async (req, res) => {
  await fs.readFile(`${realPath}/app/db/db.json`, "utf-8", (err, data) => {
    if (err) throw err;
    return res.json(JSON.parse(data));
  });

router.post("/notes", ({ body }, res) => {
  let obj = {
    id: nanoid(4),
    title: body.title,
    text: body.text,
  };
  fs.readFile(`${realPath}/app/db/db.json`, "utf-8", (err, data) => {
    if (err) throw err;
    let db = JSON.parse(data);
    db.push(obj);
    fs.readFile(`${realPath}/app/db/db.json`, JSON.stringify(db), (err) => {
      if (err) throw err;
    return res.json(db);
  });
});

// bonus:
// Delete "/api/notes" deletes the note with an id equal to req.params.id
router.delete("/notes/:id", (req, res) => {
  fs.readFile(`${realPath}/app/db/db.json`, "utf-8", (err, data) => {
    if (err) throw err;
    const allNotes = JSON.parse(data);
    const deleteNote = req.params.id;

    const result = allNotes.filter(note => note.id != deleteNote);

    fs.writeFile(`${realPath}/app/db/db.json`, JSON.stringify(result), (err) => {
      if (err) res.json ({err: "error deleting"});
      res.json(result);
    });
  });
});

module.exports = router;