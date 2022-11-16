const fs = require("fs");

async function getData() {
  let file = fs.readFileSync("testinput.txt");
  let data = file.toString().split("\r\n");
  return data;
}

async function run() {
  //const start = "VNVVKSNNFPBBBVSCVBBC";
  const start = "NNCB";
  const rules = await cleanRules(await getData());

  let chain = start;
  for (let i = 0; i < 10; i++) {
    chain = await polymerization(chain, rules);
    console.log(`(${i+1}) ${chain}`)
  }

  //
  let dict = {}
  for (let el of chain) {
    if (dict[el]) {
      dict[el]++
    } else {
      dict[el] = 1;
    }
  }
  console.log(JSON.stringify(dict));

  let min = ""
  let max = ""
  for (let entry in dict) {
    if(!dict[min]) min = entry
    if(dict[min]) && dict[min] == entry)
  }
}

async function cleanRules(data) {
  let map = {};
  for (let el of data) {
    const splits = el.split(" -> ")
    map[splits[0]] = splits[1]
  }
  return map;
}

async function polymerization(chain, rules) {
  let newchain = ""
  for (let i = 0; i < chain.length - 1; i++) {
    const el = `${chain[i]}${chain[i + 1]}`
    if (rules[el]) {
      newchain = newchain + chain[i] + rules[el]
    } else {
      console.log('else', rules[el])
      newchain = newchain + chain[i]
    }
  }
  newchain = newchain + chain[chain.length - 1]
  return newchain;
}

(async () => {
  try {
    await run();
  } catch (e) {
    console.error(e);
  }
})();
