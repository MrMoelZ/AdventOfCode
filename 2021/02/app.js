const fs = require("fs");

async function getData() {
  let file = fs.readFileSync("input.txt");
  let data = file.toString().split("\r\n");
  return data;
}

async function run() {
  let data = await getData()
  let horizontal = 0
  let depth = 0
  let aim = 0
  for (let x = 0; x < data.length; x++) {
    let line = data[x].split(' ')
    if (line[0] === 'forward') {
      horizontal += parseInt(line[1])
      depth += aim * parseInt(line[1])
    }
    else if (line[0] === 'up') aim -= parseInt(line[1])
    else if (line[0] === 'down') aim += parseInt(line[1])
    else console.log(`weird input: ${line[0]} ${line[1]}`)
  }
  console.log(`Result: \nHorizontal ${horizontal}\naim ${aim}\ndepth ${depth}\nproduct ${horizontal*depth}`)

}

async function _01() {
  let data = await getData()
  let horizontal = 0
  let vertical = 0
  for (let x = 0; x < data.length; x++) {
    let line = data[x].split(' ')
    if (line[0] === 'forward') horizontal += parseInt(line[1])
    else if (line[0] === 'up') vertical -= parseInt(line[1])
    else if (line[0] === 'down') vertical += parseInt(line[1])
    else console.log(`weird input: ${line[0]} ${line[1]}`)
  }
  console.log(`Result: \nHorizontal ${horizontal}\nVertical ${vertical}\nproduct ${horizontal*vertical}`)
}

(async () => {
  try {
    await run();
  } catch (e) {
    console.error(e);
  }
})();
