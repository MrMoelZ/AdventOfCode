const fs = require("fs");

async function getData() {
  let file = fs.readFileSync("input.txt");
  let data = file.toString().split("\r\n");
  return data;
}

async function run_01() {
  let data = await getData();

  let gamma_pos = [];
  let epsilon_pos = [];
  const total = data[0].length;

  for (let y = 0; y < total; y++) {
    gamma_pos[y] = findMostCommon(data, y) == 1 ? 1 : 0;
    epsilon_pos[y] = findMostCommon(data, y) == 1 ? 0 : 1;
  }

  console.log(
    "Result #1 ",
    parseInt(gamma_pos.join(""), 2) * parseInt(epsilon_pos.join(""), 2)
  );
}

async function run_02() {
  let orig_data = await getData();

  let m_data = orig_data.slice(0);
  let l_data = orig_data.slice(0);
  for (let i = 0; i < orig_data[0].length; i++) {
    let most = findMostCommon(m_data, i);
    let least = findMostCommon(l_data, i) == -1  ? -1 : findMostCommon(l_data, i) == 1 ? 0 : 1;
    try {
      for (let x = m_data.length - 1; x >= 0; x--) {
        if (m_data.length == 1) break;
        if (most == -1 && m_data[x][i] == 0) m_data.splice(x, 1);
        else if (most != -1 && m_data[x][i] != most) m_data.splice(x, 1);
      }

      for (let x = l_data.length - 1; x >= 0; x--) {
        if (l_data.length == 1) break;
        if (least == -1 && l_data[x][i] == 1) l_data.splice(x, 1);
        else if (least != -1 && l_data[x][i] != least) l_data.splice(x, 1);
      }
    } catch (ex) {
      console.error(i, most, least, l_data, m_data);
      throw ex;
    }
  }
  console.log("Result #2 ", parseInt(m_data[0], 2) * parseInt(l_data[0], 2));
}

function findMostCommon(input, pos) {
  let ones = 0;
  let zeros = 0;
  for (let x = 0; x < input.length; x++) {
    let line = input[x];
    line[pos] == 1 ? ones++ : zeros++;
  }
  if (ones == zeros) return -1;
  return ones > zeros ? 1 : 0;
}

(async () => {
  try {
    await run_01();
    await run_02();
  } catch (e) {
    console.error(e);
  }
})();
