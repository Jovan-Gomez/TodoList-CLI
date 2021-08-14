const fs = require("fs");

const path = "./db/tasks.json";

const saveData = (data) => fs.writeFileSync(path, JSON.stringify(data));

const readData = () => {
  if (!fs.existsSync(path)) {
    return null;
  }

  const result = fs.readFileSync(path, { encoding: "utf8" });
  const data = JSON.parse(result);
  return data;
};

module.exports = { saveData, readData };
