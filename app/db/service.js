import { promises as fs } from "fs";

console.log(fs);

let realPath = null;

export default {
  async index() {
    return JSON.parse(await fs.readFile(`${realPath}/app/db/db.json`, "utf-8"));
  },
  async create(newNote) {
    const currentNotes = await this.index();
    fs.writeFile(
      `${realPath}/app/db/db.json`,
      JSON.stringify([...currentNotes, newNote])
    );
  },
};

(async () => {
  realPath = await fs.realpath("./");
})();
