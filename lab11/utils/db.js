const fs = require("fs");
const path = require("path");

const DB_PATH = path.join(__dirname, "../data");

const read = (filename) => {
  const data = fs.readFileSync(path.join(DB_PATH, `${filename}.json`), "utf8");
  return JSON.parse(data);
};

const write = (filename, data) => {
  fs.writeFileSync(
    path.join(DB_PATH, `${filename}.json`),
    JSON.stringify(data, null, 2)
  );
};

module.exports = { read, write };