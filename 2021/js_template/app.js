const fs = require("fs");

async function getData() {
  let file = fs.readFileSync("input.txt");
  let data = file.toString().split("\r\n");
  return data;
}

async function run() {

}

(async () => {
  try {
    await run();
  } catch (e) {
    console.error(e);
  }
})();
