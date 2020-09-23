import { rotors } from './rotors'
import { RotorSlot } from './rotorSlot'
import { check as checkLetter } from "./alphabet"

// models set of three rotors
// it is composed of rotors slots which contains respective rotors

// property offsets -> current offsets (e.q. 'AAA')
// move() -> moves offsets based on notch positions
// convertForwars(letter), convertBackwards(letter) -> converts letter in respective direction
export class SetOfRotors {
  constructor(left, middle, right) {
    this.checkRotors(left, right, middle)
    this._left = new RotorSlot(left)
    this._middle = new RotorSlot(middle)
    this._right = new RotorSlot(right)
  }

  // each rotor must be unique
  checkRotors(left, middle, right) {
    if (left === middle || left === right || middle === right)
      throw new Error('rotors must be unique')
  }

  // returns instance with default rotors
  static default() {
    return new SetOfRotors(rotors.I, rotors.II, rotors.III)
  }

  // moves rotors offsets
  move() {
    if (this._right.isInNotchPosition()) {
      this.rightRotorInNotchPosition()
    } else if (this._middle.isInNotchPosition()) {
      this.moveMiddleAndLeftRotor()
    }
    this._right.move()
  }

  rightRotorInNotchPosition() {
    if (this._middle.isInNotchPosition()) {
      this._left.move()
    }
    this._middle.move()
  }

  moveMiddleAndLeftRotor() {
    this._left.move()
    this._middle.move()
  }

  // converts letter in forward direction
  convertForwards(letter) {
    letter = this._right.convertForwards(letter)
    letter = this._middle.convertForwards(letter)
    return this._left.convertForwards(letter)
  }

  // converts letter in backward direction
  convertBackwards(letter) {
    letter = this._left.convertForwards(letter)
    letter = this._middle.convertForwards(letter)
    return this._right.convertForwards(letter)
  }

  get offsets() {
    return this._left.offset + this._middle.offset + this._right.offset
  }

  set offsets(offsets) {
    this.checkOffsets(offsets)
    const [left, middle, right] = offsets.split('')
    this._left.offset = left
    this._middle.offset = middle
    this._right.offset = right
  }

  checkOffsets(offsets) {
    if (typeof offsets !== 'string' || offsets.length !== 3)
      throw new Error(`${offsets} is not valid offsets format`)
    offsets.split('').forEach(letter => checkLetter(letter))
  }
}