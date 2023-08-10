import { clear, rng } from './utils'
import { stack } from './stack'
import { preview } from './preview'
import { menu } from './menu'
import { settings } from './settings'
import { piece } from './piece'
import { hold } from './hold'
import {
  msg,
  statsEl,
  // statsTime,

  statsLines,
  statsPiece,

  h3,

  // Get canvases and contexts
  holdCanvas,
  bgStackCanvas,
  stackCanvas,

  activeCanvas,
  previewCanvas,

  spriteCanvas,

  holdCtx,
  bgStackCtx,

  stackCtx,

  activeCtx,
  previewCtx,
  spriteCtx,

} from './elements'

export * from './settings'
export * from './menu'
export * from './elements'


/**
 * Piece data
 */

// NOTE y values are inverted since our matrix counts from top to bottom.
const kickData = [
  [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0]],
  [[0, 0], [1, 0], [1, 1], [0, -2], [1, -2]],
  [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0]],
  [[0, 0], [-1, 0], [-1, 1], [0, -2], [-1, -2]],
]
const kickDataI = [
  [[0, 0], [-1, 0], [2, 0], [-1, 0], [2, 0]],
  [[-1, 0], [0, 0], [0, 0], [0, -1], [0, 2]],
  [[-1, -1], [1, -1], [-2, -1], [1, 0], [-2, 0]],
  [[0, -1], [0, -1], [0, -1], [0, 1], [0, -2]],
]
// TODO get rid of this lol.
const kickDataO = [[[0, 0]], [[0, 0]], [[0, 0]], [[0, 0]]]

// Define shapes and spawns.
const PieceI = {
  index: 0,
  x: 2,
  y: -1,
  kickData: kickDataI,
  tetro: [
    [0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
  ],
}
const PieceJ = {
  index: 1,
  x: 3,
  y: 0,
  kickData,
  tetro: [[2, 2, 0], [0, 2, 0], [0, 2, 0]],
}
const PieceL = {
  index: 2,
  x: 3,
  y: 0,
  kickData,
  tetro: [[0, 3, 0], [0, 3, 0], [3, 3, 0]],
}
const PieceO = {
  index: 3,
  x: 4,
  y: 0,
  kickData: kickDataO,
  tetro: [[4, 4], [4, 4]],
}
const PieceS = {
  index: 4,
  x: 3,
  y: 0,
  kickData,
  tetro: [[0, 5, 0], [5, 5, 0], [5, 0, 0]],
}
const PieceT = {
  index: 5,
  x: 3,
  y: 0,
  kickData,
  tetro: [[0, 6, 0], [6, 6, 0], [0, 6, 0]],
}
const PieceZ = {
  index: 6,
  x: 3,
  y: 0,
  kickData,
  tetro: [[7, 0, 0], [7, 7, 0], [0, 7, 0]],
}

export const pieces = [PieceI, PieceJ, PieceL, PieceO, PieceS, PieceT, PieceZ]

// Finesse data
// index x orientatio x state.column = finesse
// finesse[0][0][4] = 1
// TODO double check these.
export const finesse = [
  [
    [1, 2, 1, 0, 1, 2, 1],
    [2, 2, 2, 2, 1, 1, 2, 2, 2, 2],
    [1, 2, 1, 0, 1, 2, 1],
    [2, 2, 2, 2, 1, 1, 2, 2, 2, 2],
  ],
  [
    [1, 2, 1, 0, 1, 2, 2, 1],
    [2, 2, 3, 2, 1, 2, 3, 3, 2],
    [2, 3, 2, 1, 2, 3, 3, 2],
    [2, 3, 2, 1, 2, 3, 3, 2, 2],
  ],
  [
    [1, 2, 1, 0, 1, 2, 2, 1],
    [2, 2, 3, 2, 1, 2, 3, 3, 2],
    [2, 3, 2, 1, 2, 3, 3, 2],
    [2, 3, 2, 1, 2, 3, 3, 2, 2],
  ],
  [
    [1, 2, 2, 1, 0, 1, 2, 2, 1],
    [1, 2, 2, 1, 0, 1, 2, 2, 1],
    [1, 2, 2, 1, 0, 1, 2, 2, 1],
    [1, 2, 2, 1, 0, 1, 2, 2, 1],
  ],
  [
    [1, 2, 1, 0, 1, 2, 2, 1],
    [2, 2, 2, 1, 1, 2, 3, 2, 2],
    [1, 2, 1, 0, 1, 2, 2, 1],
    [2, 2, 2, 1, 1, 2, 3, 2, 2],
  ],
  [
    [1, 2, 1, 0, 1, 2, 2, 1],
    [2, 2, 3, 2, 1, 2, 3, 3, 2],
    [2, 3, 2, 1, 2, 3, 3, 2],
    [2, 3, 2, 1, 2, 3, 3, 2, 2],
  ],
  [
    [1, 2, 1, 0, 1, 2, 2, 1],
    [2, 2, 2, 1, 1, 2, 3, 2, 2],
    [1, 2, 1, 0, 1, 2, 2, 1],
    [2, 2, 2, 1, 1, 2, 3, 2, 2],
  ],
]

/**
 * Gameplay specific vars.
 */

export const state = {

  /**
   * Playfield.
   */
  cellSize: undefined,
  column: undefined,

  // Consolidate shared variables

  finesse: undefined,
  lines: undefined,
  piecesSet: undefined,

  startPauseTime: undefined,
  pauseTime: undefined,


  lastX: undefined,
  lastY: undefined,
  lastPos: undefined,
  landed: undefined,

  /**
   * 0 = Normal
   * 1 = win
   * 2 = countdown
   * 3 = game not played
   * 9 = loss
   */
  gameState: 3,

  paused: false,

  startTime: undefined,
  digLines: undefined,

  released: undefined,
}


const gravityUnit = 0.00390625

export let gravity

export const gravityArr = (function () {
  const array = []
  array.push(0)
  for (let i = 1; i < 64; i++) array.push(i / 64)
  for (let i = 1; i <= 20; i++) array.push(i)
  return array
})()

let frame

/**
 *Pausing variables
 */

export let lineLimit

let replayKeys
let watchingReplay = false
let toGreyRow

export let gametype

// TODO Make dirty flags for each canvas, draw them all at once during frame call.
// let dirtyHold, dirtyActive, dirtyStack, dirtyPreview;


// Stats


// Keys
export let keysDown
export let lastKeys

export const binds = {
  pause: 27,
  moveLeft: 37,
  moveRight: 39,
  moveDown: 40,
  moveUp: 38, // Added arrow up to alias rotate right
  hardDrop: 32,
  holdPiece: 67,
  rotRight: 88,
  rotLeft: 90,
  rot180: 16,
  retry: 81, // R (82) -> Q (81)
}

export const flags = {
  hardDrop: 1,
  moveRight: 2,
  moveLeft: 4,
  moveDown: 8,
  holdPiece: 16,
  rotRight: 32,
  rotLeft: 64,
  rot180: 128,
}

export function resize() {
  const a = document.getElementById('a')
  const b = document.getElementById('b')
  const c = document.getElementById('c')
  const content = document.getElementById('content')

  // TODO Finalize this.
  // Aspect ratio: 1.024
  let screenHeight = window.innerHeight - 34
  const screenWidth = ~~(screenHeight * 1.024)
  if (screenWidth > window.innerWidth) { screenHeight = ~~(window.innerWidth / 1.024) }

  if (settings.Size === 1 && screenHeight > 602) state.cellSize = 15
  else if (settings.Size === 2 && screenHeight > 602) state.cellSize = 30
  else if (settings.Size === 3 && screenHeight > 902) state.cellSize = 45
  else state.cellSize = Math.max(~~(screenHeight / 20), 10)

  const { cellSize } = state

  const pad = (window.innerHeight - (cellSize * 20 + 2)) / 2 + 'px'
  content.style.padding = pad + ' 0'
  statsEl.style.bottom = pad

  // Size elements
  a.style.padding = '0 0.5rem ' + ~~(cellSize / 2) + 'px'

  stackCanvas.width = activeCanvas.width = bgStackCanvas.width = cellSize * 10
  stackCanvas.height = activeCanvas.height = bgStackCanvas.height =
    cellSize * 20
  b.style.width = stackCanvas.width + 'px'
  b.style.height = stackCanvas.height + 'px'

  holdCanvas.width = cellSize * 4
  holdCanvas.height = cellSize * 2
  a.style.width = holdCanvas.width + 'px'
  a.style.height = holdCanvas.height + 'px'

  previewCanvas.width = cellSize * 4
  previewCanvas.height = stackCanvas.height
  c.style.width = previewCanvas.width + 'px'
  c.style.height = b.style.height

  // Scale the text so it fits in the thing.
  // TODO get rid of extra font sizes here.
  msg.style.lineHeight = b.style.height
  msg.style.fontSize = ~~(stackCanvas.width / 10) + 'px'
  statsEl.style.fontSize = ~~(stackCanvas.width / 11) + 'px'
  document.documentElement.style.fontSize = ~~(stackCanvas.width / 16) + 'px'

  statsEl.style.width = a.style.width
  for (let i = 0, len = h3.length; i < len; i++) {
    h3[i].style.lineHeight = a.style.height
    h3[i].style.fontSize = statsEl.style.fontSize
  }

  // Redraw graphics
  makeSprite()

  if (settings.Grid === 1) bg(bgStackCtx)

  if (state.gameState === 0) {
    piece.drawGhost()
    piece.draw()
    stack.draw()
    preview.draw()
    if (hold.piece) {
      hold.draw()
    }
  }
}
addEventListener('resize', resize, false)

/**
 * ========================== Model ===========================================
 */

/**
 * Resets all the settings and starts the game.
 */
export function init(gt) {
  if (gt === 'replay') {
    watchingReplay = true
  } else {
    watchingReplay = false
    replayKeys = {}
    // TODO Make new seed and rng method.
    replayKeys.seed = ~~(Math.random() * 2147483645) + 1
    gametype = gt
  }

  lineLimit = 40

  // Reset
  state.column = 0
  keysDown = 0
  lastKeys = 0

  state.released = 255

  // TODO Check if needed.
  piece.shiftDir = 0
  piece.shiftReleased = true

  state.startPauseTime = 0
  state.pauseTime = 0
  state.paused = false

  rng.seed = replayKeys.seed
  toGreyRow = 21
  frame = 0
  state.lastPos = 'reset'
  stack.new(10, 22)
  hold.piece = undefined
  if (settings.Gravity === 0) gravity = gravityUnit * 4
  state.startTime = Date.now()

  preview.init()
  // preview.draw();

  state.finesse = 0
  state.lines = 0
  state.piecesSet = 0

  statsPiece.innerHTML = state.piecesSet
  statsLines.innerHTML = lineLimit - state.lines
  statistics()
  clear(stackCtx)
  clear(activeCtx)
  clear(holdCtx)

  if (gametype === 3) {

    // Dig Race
    // make ten random numbers, make sure next isn't the same as last?
    // TODO make into function or own file.

    state.digLines = [12, 13, 14, 15, 16, 17, 18, 19, 20, 21]

    statsLines.innerHTML = 10
    statsLines.innerHTML = 10
    const randomNums = []
    for (let i = 0; i < 10; i++) {
      const random = ~~(rng.next() * 10)
      if (random !== randomNums[i - 1]) randomNums.push(random)
      else i--
    }
    for (let y = 21; y > 11; y--) {
      for (let x = 0; x < 10; x++) {
        if (randomNums[y - 12] !== x) stack.grid[x][y] = 8
      }
    }
    stack.draw()
  }

  menu()

  // Only start a loop if one is not running already.
  if (state.gameState === 3) {
    state.gameState = 2
    gameLoop()
  } else {
    state.gameState = 2
  }
}

export function pause() {
  if (state.gameState === 0) {
    state.paused = true
    state.startPauseTime = Date.now()
    msg.innerHTML = 'PAUSED'
    menu(4)
  }
}

export function unpause() {
  state.paused = false
  state.pauseTime += Date.now() - state.startPauseTime
  msg.innerHTML = ''
  menu()
}

/**
 * Draws the stats next to the tetrion.
 */
function statistics() {

  // let time = Date.now() - state.startTime - state.pauseTime;
  // let seconds = ((time / 1000) % 60).toFixed(2);
  // let minutes = ~~(time / 60000);
  // statsTime.innerHTML =
  //   (minutes < 10 ? '0' : '') + minutes + (seconds < 10 ? ':0' : ':') + seconds;
}

// ========================== View ============================================

/**
 * Draws grid in background.
 */
function bg(ctx) {

  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
  ctx.fillStyle = '#343434' // 1c1c1c
  for (let x = -1; x < ctx.canvas.width + 1; x += state.cellSize) {
    ctx.fillRect(x, 0, 2, ctx.canvas.height)
  }

  for (let y = -1; y < ctx.canvas.height + 1; y += state.cellSize) {
    ctx.fillRect(0, y, ctx.canvas.width, 2)
  }
}

/**
 * Pre-renders all mino types in all colors.
 */
function makeSprite() {

  const shaded = [
    // 0         +10        -10        -20
    ['#c1c1c1', '#dddddd', '#a6a6a6', '#8b8b8b'],
    ['#25bb9b', '#4cd7b6', '#009f81', '#008568'],
    ['#3397d9', '#57b1f6', '#007dbd', '#0064a2'],
    ['#e67e23', '#ff993f', '#c86400', '#a94b00'],
    ['#efc30f', '#ffdf3a', '#d1a800', '#b38e00'],
    ['#9ccd38', '#b9e955', '#81b214', '#659700'],
    ['#9c5ab8', '#b873d4', '#81409d', '#672782'],
    ['#e64b3c', '#ff6853', '#c62c25', '#a70010'],
    ['#898989', '#a3a3a3', '#6f6f6f', '#575757'],
  ]

  const glossy = [
    // 25         37         52         -21        -45
    ['#ffffff', '#ffffff', '#ffffff', '#888888', '#4d4d4d'],
    ['#7bffdf', '#9fffff', '#ccffff', '#008165', '#00442e'],
    ['#6cdcff', '#93feff', '#c2ffff', '#00629f', '#002c60'],
    ['#ffc166', '#ffe386', '#ffffb0', '#aa4800', '#650500'],
    ['#ffff6a', '#ffff8c', '#ffffb8', '#b68a00', '#714f00'],
    ['#efff81', '#ffffa2', '#ffffcd', '#6b9200', '#2c5600'],
    ['#dc9dfe', '#ffbeff', '#ffe9ff', '#5d287e', '#210043'],
    ['#ff9277', '#ffb497', '#ffe0bf', '#a7000a', '#600000'],
    ['#cbcbcb', '#ededed', '#ffffff', '#545454', '#1f1f1f'],
  ]

  // https://en.wikipedia.org/wiki/Tetris:_The_Grand_Master
  let tgm = [
    ['#7b7b7b', '#303030', '#6b6b6b', '#363636'],
    ['#f08000', '#a00000', '#e86008', '#b00000'],
    ['#00a8f8', '#0000b0', '#0090e8', '#0020c0'],
    ['#f8a800', '#b84000', '#e89800', '#c85800'],
    ['#e8e000', '#886800', '#d8c800', '#907800'],
    ['#f828f8', '#780078', '#e020e0', '#880088'],
    ['#00e8f0', '#0070a0', '#00d0e0', '#0080a8'],
    ['#78f800', '#007800', '#58e000', '#008800'],
    ['#7b7b7b', '#303030', '#6b6b6b', '#363636'],
  ]

  const world = []

  world[0] = tgm[0]
  world[1] = tgm[6]
  world[2] = tgm[2]
  world[3] = tgm[3]
  world[4] = tgm[4]
  world[5] = tgm[7]
  world[6] = tgm[5]
  world[7] = tgm[1]
  world[8] = tgm[8]

  const { cellSize } = state

  spriteCanvas.width = cellSize * 9
  spriteCanvas.height = cellSize
  for (let i = 0; i < 9; i++) {
    const x = i * cellSize
    if (settings.Block === 0) {
      // Shaded
      spriteCtx.fillStyle = shaded[i][1]
      spriteCtx.fillRect(x, 0, cellSize, cellSize)

      spriteCtx.fillStyle = shaded[i][3]
      spriteCtx.fillRect(x, cellSize / 2, cellSize, cellSize / 2)

      spriteCtx.fillStyle = shaded[i][0]
      spriteCtx.beginPath()
      spriteCtx.moveTo(x, 0)
      spriteCtx.lineTo(x + cellSize / 2, cellSize / 2)
      spriteCtx.lineTo(x, cellSize)
      spriteCtx.fill()

      spriteCtx.fillStyle = shaded[i][2]
      spriteCtx.beginPath()
      spriteCtx.moveTo(x + cellSize, 0)
      spriteCtx.lineTo(x + cellSize / 2, cellSize / 2)
      spriteCtx.lineTo(x + cellSize, cellSize)
      spriteCtx.fill()
    } else if (settings.Block === 1) {

      // Flat
      spriteCtx.fillStyle = shaded[i][0]
      spriteCtx.fillRect(x, 0, cellSize, cellSize)

    } else if (settings.Block === 2) {
      // Glossy
      const k = Math.max(~~(cellSize * 0.083), 1)

      let grad = spriteCtx.createLinearGradient(x, 0, x + cellSize, cellSize)
      grad.addColorStop(0.5, glossy[i][3])
      grad.addColorStop(1, glossy[i][4])
      spriteCtx.fillStyle = grad
      spriteCtx.fillRect(x, 0, cellSize, cellSize)

      grad = spriteCtx.createLinearGradient(x, 0, x + cellSize, cellSize)
      grad.addColorStop(0, glossy[i][2])
      grad.addColorStop(0.5, glossy[i][1])
      spriteCtx.fillStyle = grad
      spriteCtx.fillRect(x, 0, cellSize - k, cellSize - k)

      grad = spriteCtx.createLinearGradient(
        x + k,
        k,
        x + cellSize - k,
        cellSize - k,
      )
      grad.addColorStop(0, shaded[i][0])
      grad.addColorStop(0.5, glossy[i][0])
      grad.addColorStop(0.5, shaded[i][0])
      grad.addColorStop(1, glossy[i][0])
      spriteCtx.fillStyle = grad
      spriteCtx.fillRect(x + k, k, cellSize - k * 2, cellSize - k * 2)
    } else if (settings.Block === 3 || settings.Block === 4) {
      // Arika

      // World
      if (settings.Block === 4) tgm = world

      const k = Math.max(~~(cellSize * 0.125), 1)

      spriteCtx.fillStyle = tgm[i][1]
      spriteCtx.fillRect(x, 0, cellSize, cellSize)
      spriteCtx.fillStyle = tgm[i][0]
      spriteCtx.fillRect(x, 0, cellSize, ~~(cellSize / 2))

      let grad = spriteCtx.createLinearGradient(x, k, x, cellSize - k)
      grad.addColorStop(0, tgm[i][2])
      grad.addColorStop(1, tgm[i][3])
      spriteCtx.fillStyle = grad
      spriteCtx.fillRect(x + k, k, cellSize - k * 2, cellSize - k * 2)

      grad = spriteCtx.createLinearGradient(x, k, x, cellSize)
      grad.addColorStop(0, tgm[i][0])
      grad.addColorStop(1, tgm[i][3])
      spriteCtx.fillStyle = grad
      spriteCtx.fillRect(x, k, k, cellSize - k)

      grad = spriteCtx.createLinearGradient(x, 0, x, cellSize - k)
      grad.addColorStop(0, tgm[i][2])
      grad.addColorStop(1, tgm[i][1])
      spriteCtx.fillStyle = grad
      spriteCtx.fillRect(x + cellSize - k, 0, k, cellSize - k)
    }
  }
}

// ========================== Controller ======================================

addEventListener(
  'keydown',
  function (e) {

    // TODO send to menu or game depending on context.
    if ([32, 37, 38, 39, 40].indexOf(e.keyCode) !== -1) e.preventDefault()

    // TODO if active, prevent default for binded keys
    // if (bindsArr.indexOf(e.keyCode) !== -1)
    //  e.preventDefault();

    if (e.keyCode === binds.pause) {
      if (state.paused) {
        unpause()
      } else {
        pause()
      }
    }
    if (e.keyCode === binds.retry) {
      init(gametype)
    }
    if (!watchingReplay) {
      if (e.keyCode === binds.moveLeft) {
        keysDown |= flags.moveLeft
        // piece.finesse++
      } else if (e.keyCode === binds.moveRight) {
        keysDown |= flags.moveRight
      } else if (e.keyCode === binds.moveDown) {
        keysDown |= flags.moveDown
      } else if (e.keyCode === binds.hardDrop) {
        keysDown |= flags.hardDrop
      } else if (e.keyCode === binds.rotRight || e.keyCode === binds.moveUp) {
        keysDown |= flags.rotRight
      } else if (e.keyCode === binds.rotLeft) {
        keysDown |= flags.rotLeft
      } else if (e.keyCode === binds.rot180) {
        keysDown |= flags.rot180
      } else if (e.keyCode === binds.holdPiece) {
        keysDown |= flags.holdPiece
      }
    }
  },
  false,
)
addEventListener(
  'keyup',
  function (e) {
    if (!watchingReplay) {

      // Game over screen: Shortcut to play again
      if (state.gameState === 9 && e.keyCode === 13) {
        // Enter
        init(state.gametype)
      }

      if (e.keyCode === binds.moveLeft && keysDown & flags.moveLeft) {
        keysDown ^= flags.moveLeft
      } else if (e.keyCode === binds.moveRight && keysDown & flags.moveRight) {
        keysDown ^= flags.moveRight
      } else if (e.keyCode === binds.moveDown && keysDown & flags.moveDown) {
        keysDown ^= flags.moveDown
      } else if (e.keyCode === binds.hardDrop && keysDown & flags.hardDrop) {
        keysDown ^= flags.hardDrop
      } else if ((e.keyCode === binds.rotRight || e.keyCode === binds.moveUp) && keysDown & flags.rotRight) {
        keysDown ^= flags.rotRight
      } else if (e.keyCode === binds.rotLeft && keysDown & flags.rotLeft) {
        keysDown ^= flags.rotLeft
      } else if (e.keyCode === binds.rot180 && keysDown & flags.rot180) {
        keysDown ^= flags.rot180
      } else if (e.keyCode === binds.holdPiece && keysDown & flags.holdPiece) {
        keysDown ^= flags.holdPiece
      }
    }
  },
  false,
)

// ========================== Loop ============================================

/**
 * Runs every frame.
 */
function update() {

  // TODO Das preservation broken.
  if (lastKeys !== keysDown && !watchingReplay) {
    replayKeys[frame] = keysDown
  } else if (frame in replayKeys) {
    keysDown = replayKeys[frame]
  }

  if (!(lastKeys & flags.holdPiece) && flags.holdPiece & keysDown) {
    piece.hold()
  }

  if (flags.rotLeft & keysDown && !(lastKeys & flags.rotLeft)) {
    piece.rotate(-1)
    piece.finesse++
  } else if (flags.rotRight & keysDown && !(lastKeys & flags.rotRight)) {
    piece.rotate(1)
    piece.finesse++
  } else if (flags.rot180 & keysDown && !(lastKeys & flags.rot180)) {
    piece.rotate(1)
    piece.rotate(1)
    piece.finesse++
  }

  piece.checkShift()

  if (flags.moveDown & keysDown) {
    piece.shiftDown()
    // piece.finesse++;
  }
  if (!(lastKeys & flags.hardDrop) && flags.hardDrop & keysDown) {
    piece.hardDrop()
  }

  piece.update()

  // Win
  if (gametype !== 3) {
    if (state.lines >= lineLimit) {
      state.gameState = 1
      msg.innerHTML = 'GREAT!'
      menu(3)
    }
  } else {
    if (state.digLines.length === 0) {
      state.gameState = 1
      msg.innerHTML = 'GREAT!'
      menu(3)
    }
  }

  statistics()

  if (lastKeys !== keysDown) {
    lastKeys = keysDown
  }
}



/**
 * Shim.
 *
window.requestAnimFrame = (function () {
  return (
    window.requestAnimationFrame
    || window.mozRequestAnimationFrame
    || window.webkitRequestAnimationFrame
    || function (callback) {
      window.setTimeout(callback, 1000 / 60)
    }
  )
})()
*/

function gameLoop() {
  requestAnimationFrame(gameLoop)

  // TODO check to see how pause works in replays.
  frame++

  if (state.gameState === 0) {
    // Playing

    if (!state.paused) {
      update()
    }

    // TODO improve this with 'dirty' flags.
    if (
      piece.x !== state.lastX
      || Math.floor(piece.y) !== state.lastY
      || piece.pos !== state.lastPos
      || piece.dirty
    ) {
      clear(activeCtx)
      piece.drawGhost()
      piece.draw()
    }
    state.lastX = piece.x
    state.lastY = Math.floor(piece.y)
    state.lastPos = piece.pos
    piece.dirty = false
  } else if (state.gameState === 2) {

    // Count Down
    if (frame < 50) {
      if (msg.innerHTML !== 'READY') msg.innerHTML = 'READY'
    } else if (frame < 100) {
      if (msg.innerHTML !== 'GO!') msg.innerHTML = 'GO!'
    } else {

      msg.innerHTML = ''
      state.gameState = 0
      state.startTime = Date.now()
      piece.new(preview.next())

    }

    // DAS Preload
    if (lastKeys !== keysDown && !watchingReplay) {
      replayKeys[frame] = keysDown
    } else if (frame in replayKeys) {
      keysDown = replayKeys[frame]
    }
    if (keysDown & flags.moveLeft) {
      lastKeys = keysDown
      piece.shiftDelay = settings.DAS
      piece.shiftReleased = false
      piece.shiftDir = -1
    } else if (keysDown & flags.moveRight) {
      lastKeys = keysDown
      piece.shiftDelay = settings.DAS
      piece.shiftReleased = false
      piece.shiftDir = 1
    }
  } else if (toGreyRow >= 2) {
    /**
     * Fade to grey animation played when player loses.
     */
    if (toGreyRow === 21) clear(activeCtx)
    if (frame % 2) {
      for (let x = 0; x < 10; x++) {
        if (stack.grid[x][toGreyRow]) stack.grid[x][toGreyRow] = state.gameState - 1
      }
      stack.draw()
      toGreyRow--
    }
  }
}
