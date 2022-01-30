const emptyBoard = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
]
// const coolboard = [
//   [5, 3, 4, 6, 7, 8, 9, 1, 2],
//   [6, 7, 2, 1, 9, 5, 3, 4, 8],
//   [1, 9, 8, 3, 4, 2, 5, 6, 7],
//   [8, 5, 9, 7, 6, 1, 4, 2, 3],
//   [4, 2, 6, 8, 5, 3, 7, 9, 1],
//   [7, 1, 3, 9, 2, 4, 8, 5, 6],
//   [9, 6, 1, 5, 3, 7, 2, 8, 4],
//   [2, 8, 7, 4, 1, 9, 6, 3, 5],
//   [3, 4, 5, 2, 8, 6, 1, 7, 9]
// ]

const level = {
  'Easy': 81 - 36,
  'Medium': 81 - 28,
  'Hard': 81 - 17
}

const shuffle = poss => {
  const len = poss.length
  const ret = new Array(len).fill(0)

  for (let i = 0; i < len; i++) {
    const j = Math.trunc(Math.random() * (len - i))
    ret[i] = poss[j]
    poss[j] = poss[len - 1 - i]
  }
  return ret
}

const randomArray = () => {
  const arr = [...Array(81)].map((_, i) => i)
  const ret = [...Array(81)].fill(0)

  for (let i = 0; i < 81; i++) {
    const j = Math.trunc(Math.random() * (81 - i))
    ret[i] = arr[j]
    arr[j] = arr[80 - i]
  }
  return ret
}

export const removeNumbers = (grid, num) => {
  const copy = JSON.parse(JSON.stringify(grid))
  const arr = randomArray()
  let total = level[num]

  for (let i = 0; i < 81 && total > 0; i++) {
    const row = Math.trunc(arr[i] / 9)
    const col = arr[i] % 9

    if (copy[row][col]) {
      copy[row][col] = 0

      const ret = solveGrid(copy)
      if (ret.count === 1) total--
      else copy[row][col] = grid[row][col]
    }
  }
  return { answer: grid, puzzle: copy }
}


const getPossibilities = (grid, row, col) => {
  if (grid[row][col]) return grid[row][col]

  let value, ret = []
  const arr = new Array(9).fill(0)
  const startRow = Math.trunc(row / 3) * 3
  const startCol = Math.trunc(col / 3) * 3

  // find possibilities in row
  for (let i = 0; i < 9; i++) {
    value = grid[row][i]
    if (value) arr[value - 1] = 1
  }

  // find possibilities in column
  for (let i = 0; i < 9; i++) {
    value = grid[i][col]
    if (value) arr[value - 1] = 1
  }

  // find possibilities in 3x3 box
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      value = grid[startRow + i][startCol + j]
      if (value) arr[value - 1] = 1
    }
  }
  for (let i = 0; i < 9; i++) {
    if (!arr[i]) ret.push(i + 1)
  }
  return ret
}

const simpleSolve = grid => {
  let find = true, zero = 1

  // find the least number of possibilities
  let leastPoss = {}

  while (find && zero > 0) {
    find = false
    zero = 0

    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (!grid[i][j]) {
          const poss = getPossibilities(grid, i, j)
          const len = poss.length

          if (len === 1) {
            find = true
            grid[i][j] = poss[0]
          }
          else if (!len) {
            return false
          }
          else if (!leastPoss.poss) {
            leastPoss = { i, j, poss }
          }
          else if (len < leastPoss.poss.length) {
            leastPoss = { i, j, poss }
          }
          zero++
        }
      }
    }
  }
  return { grid, zero, leastPoss }
}

export const solveGrid = (board = emptyBoard) => {
  const copy = JSON.parse(JSON.stringify(board))
  const simple = simpleSolve(copy)

  if (!simple) return { count: 0 }

  const { grid, zero, leastPoss } = simple
  if (!zero) return { grid, count: 1 }

  const { i, j, poss } = leastPoss

  let val, count = 0

  for (let value of shuffle(poss)) {
    grid[i][j] = value
    const ret = solveGrid(grid)

    if (!ret.count) grid[i][j] = 0
    count += ret.count
    if (ret.count > 1) return { grid: ret.grid, count }

    if (ret.grid) val = ret.grid
  }
  return { grid: val, count }
}


// const start = new Date().getTime()
// const board = solveGrid(emptyBoard)
// const mid = new Date().getTime()
// const rm = removeNumbers(board.grid)
// const end = new Date().getTime()

// console.log(
//   'answer runtime: ', (mid - start),
//   'puzzle runtime: ', (end - mid));
// console.log('answer board: ')
// console.table(rm.answer)
// console.log('puzzle board: ')
// console.table(rm.puzzle)


