const fs = require("fs");

async function getData() {
  let file = fs.readFileSync("input.txt");
  let data = file.toString().split("\r\n");
  return data;
}

async function run_02() {
  let data = await getData()
  let numbers = data[0].split(",")
  let boards = getBoards(data)
  byBoardApproach_2(numbers, boards)
}

async function run_01() {
  let data = await getData()
  let numbers = data[0].split(',')
  let boards = getBoards(data)
  // naiveApproach(numbers, boards)
  byBoardApproach(numbers, boards)
}

function naiveApproach(numbers, boards) {
  for (let x = 0; x < numbers.length; x++) {
    
  }
}

function byBoardApproach_2(numbers, boards) {
  let winner = {}
  for (let x = 0; x < boards.length; x++) {
    let board = boards[x]
    let current = modifyAndCheckBoard(numbers, board, x, null)
    winner = (current && (current.iterations >  (winner.iterations || 0))) ? current : winner
    console.log({ winner }, { current })
  }
  console.log(calculateWinningNumber(winner, boards))

}


function byBoardApproach(numbers, boards) {
  let winner = {}
  for (let x = 0; x < boards.length; x++) {
    let board = boards[x]
    let current = modifyAndCheckBoard(numbers, board, x, winner.iterations)
    winner = (current && (current.iterations <  (winner.iterations || numbers.length))) ? current : winner
    console.log({ winner }, { current })
  }
  console.log(calculateWinningNumber(winner, boards))
}


function modifyAndCheckBoard(numbers, board, x, max) {
  for (let y = 0; y < max || numbers.length; y++) {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if(board[i][j] == numbers[y]) board[i][j] = -1
      }
    }
    if(checkBoard(board)) return {board: x, iterations: y, number: numbers[y]}
  }
  return null
}

function calculateWinningNumber(winner, boards) {
  let b = boards[winner.board]
  console.log({b})
  let ret = 0
  for (let x = 0; x < b.length; x++) {
    for (let y = 0; y < b[x].length; y++) {
      if (b[x][y] != -1) ret += +b[x][y]
    }
  }
  return ret * +winner.number
}

function checkBoard(board) {
  let failedx = false
  let failedy = false
  for (let x = 0; x < 5; x++) {
    failedx = false
    failedy = false
    for (let y = 0; y < 5; y++) {
      if (board[x][y] != -1) failedx = true
      if (board[y][x] != -1) failedy = true
    }
    if (!failedx) return true
    if(!failedy) return true
  }
}

function getBoards(data) {
  let boards = []
  let board = []
  for (let x = 2; x < data.length; x++) {
    let line = data[x].split(" ")
    line = line.filter(e => e != '')
    if (line.length > 1) board.push(line)
    else {
      boards.push(board)
      board = []
    }
  }
  return boards
}

(async () => {
  try {
    //await run_01();
    await run_02();
  } catch (e) {
    console.error(e);
  }
})();
