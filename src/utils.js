import { spriteCanvas, state } from './tetris'

/**
 * Park Miller "Minimal Standard" PRNG.
 */
export const rng = new function () {
  this.seed = Math.random() // 1
  this.next = function () {
    // Returns a float between 0.0, and 1.0
    return this.gen() / 2147483647
  }
  this.gen = function () {
    return (this.seed = (this.seed * 16807) % 2147483647)
  }
}()

/**
 * Clear canvas.
 */
export function clear(ctx) {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
}

/**
 * Draws a 2d array of minos.
 */
export function draw(tetro, cx, cy, ctx, color) {
  for (let x = 0, len = tetro.length; x < len; x++) {
    for (let y = 0, wid = tetro[x].length; y < wid; y++) {
      if (tetro[x][y]) {
        drawCell(x + cx, y + cy, color !== undefined ? color : tetro[x][y], ctx)
      }
    }
  }
}

/**
 * Draws a pre-rendered mino.
 */
function drawCell(x, y, color, ctx) {
  x = x * state.cellSize
  x = ~~x
  y = ~~y * state.cellSize - 2 * state.cellSize
  ctx.drawImage(
    spriteCanvas,
    color * state.cellSize,
    0,
    state.cellSize,
    state.cellSize,
    x,
    y,
    state.cellSize,
    state.cellSize,
  )
}

export function range(start, end, inc) {
  inc = inc || 1
  const array = []
  for (let i = start; i < end; i += inc) {
    array.push(i)
  }
  return array
}

/**
 * Divisor method to do clock arithmetics, to determine tetromino orientation.
 */
export function mod(num, div) {
  return ((num % div) + div) % div
}
