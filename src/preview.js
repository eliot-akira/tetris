import { pieces, previewCtx, previewCanvas } from './tetris'
import { clear, draw, rng } from './utils'

class Preview {
  constructor() {
    this.grabBag = this.gen()
  }

  init() {
    // TODO fix ugly code lolwut
    // while (1) {
    //   this.grabBag = this.gen()
    //   if ([3, 4, 6].indexOf(this.grabBag[0]) === -1) break
    // }
    this.grabBag.push.apply(this.grabBag, this.gen())

    // Initial grabbag is different when countdown ends?
    this.draw()
  }

  next() {
    const next = this.grabBag.shift()
    if (this.grabBag.length === 7) {
      this.grabBag.push.apply(this.grabBag, this.gen())
    }
    this.draw()
    return next
  }

  /**
   * Creates a "grab bag" of the 7 tetrominos.
   */
  gen() {
    console.log('Preview.gen')
    const pieceList = [0, 1, 2, 3, 4, 5, 6]
    return pieceList.sort(function () {
      return 0.5 - rng.next()
    })
  }

  /**
   * Draws the piece preview.
   */
  draw() {
    clear(previewCtx)
    for (let i = 0; i < 6; i++) {
      if (this.grabBag[i] === 0 || this.grabBag[i] === 3) {
        draw(
          pieces[this.grabBag[i]].tetro,
          pieces[this.grabBag[i]].x - 3,
          pieces[this.grabBag[i]].y + 2 + i * 3,
          previewCtx
        )
      } else {
        draw(
          pieces[this.grabBag[i]].tetro,
          pieces[this.grabBag[i]].x - 2.5,
          pieces[this.grabBag[i]].y + 2 + i * 3,
          previewCtx
        )
      }
    }
  }
}

export const preview = new Preview()
