const axios = require("axios");
const fs = require("fs");

async function getData() {
  let file = fs.readFileSync("input.txt");
  let data = file.toString().split("\r\n");
  return data;
}

async function day1part1() {
  let data = await getData();

  let counter = 0;
  for (let x = 1; x < data.length; x++) {
    if (parseInt(data[x]) > parseInt(data[x - 1])) counter++;
  }

  console.log(`Solution: ${counter}`);
}

async function run() {
  let data = await getData();
  let counter = 0;

  for (let x = 3; x < data.length; x++) {
    let windowA =
      parseInt(data[x - 3]) + parseInt(data[x - 2]) + parseInt(data[x - 1]);
    let windowB =
      parseInt(data[x - 2]) + parseInt(data[x - 1]) + parseInt(data[x]);
    if (windowB > windowA) counter++;
    if(x == 3) console.log(`${x} ${x-3}`)
  }

  console.log(`Solution: ${counter}`);
}

(async () => {
  try {
    await run();
  } catch (e) {
    console.error(e);
  }
})();
