const fs = require("fs");

class GlossaryItem2211104085 {
  ReadJSON(filePath) {
    try {
      const data = fs.readFileSync(filePath, "utf-8");
      const jsonData = JSON.parse(data);

      const entry = jsonData.glossary.GlossDiv.GlossList.GlossEntry;

      console.log("========== Glossary Entry ==========");
      console.log(`ID         : ${entry.ID}`);
      console.log(`Sort As    : ${entry.SortAs}`);
      console.log(`Gloss Term : ${entry.GlossTerm}`);
      console.log(`Acronym    : ${entry.Acronym}`);
      console.log(`Abbrev     : ${entry.Abbrev}`);
      console.log(`Definition : ${entry.GlossDef.para}`);
      console.log(`See Also   : ${entry.GlossDef.GlossSeeAlso.join(", ")}`);
      console.log(`See        : ${entry.GlossSee}`);
    } catch (error) {
      console.error("Gagal membaca file JSON:", error.message);
    }
  }
}

const glossary = new GlossaryItem2211104085();
glossary.ReadJSON("./solution/jurnal7_3_2211104085.json");
