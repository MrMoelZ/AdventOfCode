const fs = require('fs')

let file = fs.readFileSync('input.txt').toString()
// trenne input auf in zeilen
let data = file.split('\r\n')

let horizontal = 0
let depth = 0

let forward_sum = 0
let up_sum = 0
let down_sum = 0

// input in spalte A (text) und B (zahl) trennen
for (let x = 0; x < data.length; x++) {
  let line = data[x].split(' ')
  // wenn in spalte A "forward" steht dann summiere spalte B in Zelle C1
  if (line[0] == 'forward') horizontal += parseInt(line[1])
  // wenn in spalte A "up" steht dann summiere spalte B in Zelle C2
  if (line[0] == 'up') depth -= parseInt(line[1])
  // wenn in spalte A "down" steht dann summiere spalte B in Zelle C3
  if (line[0] == 'down') depth += parseInt(line[1])
}

// forward * (up - down)
// console.log(`Result: ${forward_sum * (down_sum - up_sum)}`) 
console.log(`Result: ${horizontal * depth}`) 
