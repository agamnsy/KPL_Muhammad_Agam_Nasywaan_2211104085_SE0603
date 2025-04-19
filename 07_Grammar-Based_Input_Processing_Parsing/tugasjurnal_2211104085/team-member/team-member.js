const fs = require("fs");

class TeamMembers2211104085 {
  ReadJSON(filePath) {
    try {
      const data = fs.readFileSync(filePath, "utf-8");
      const obj = JSON.parse(data);

      console.log("Kamitetep Team Member :");
      obj.members.forEach((member) => {
        const fullName = `${member.firstName} ${member.lastName}`;
        console.log(`${member.nim} ${fullName} (${member.age} ${member.gender})`);
      });
    } catch (error) {
      console.error("Gagal membaca file JSON:", error.message);
    }
  }
}

const team = new TeamMembers2211104085();
team.ReadJSON("./solution/jurnal7_2_2211104085.json");
