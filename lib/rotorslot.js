import { plainAlphabet } from "./alphabet"
import { Rotor } from './rotors'

// models one rotor slot
// it holds rotor and its current state - offset and ringSetting
// provides interface for SetOfRotors

// property offset -> current letter offset
// move() -> moves offset
// convertForwars(letter), convertBackwards(letter) -> converts letter in respective direction
// isInNotchPosition() -> boolean
export class RotorSlot {
  constructor(rotor) {
    if (!(rotor instanceof Rotor))
      throw new Error(`${rotor} is not a rotor`)
    this._rotor = rotor
    this._offset = 0
    this._ringSetting = 0
  }

  // move by one position
  move() {
    this._offset = (this._offset + 1) % plainAlphabet.length
  }

  // converts letter in forward direction
  convertForwards(letter) {
    const inIndex = this.inputIndex(letter)
    letter = this._rotor.alphabet.charAt(inIndex)
    const outIndex = this.outputIndex(letter, plainAlphabet)
    return plainAlphabet.charAt(outIndex)
  }

  inputIndex(letter) {
    const index = plainAlphabet.indexOf(letter)
    return mod(index + this._offset - this._ringSetting, plainAlphabet)
  }

  outputIndex(letter, alphabet) {
    const index = alphabet.indexOf(letter)
    return mod(index - this._offset + this._ringSetting, plainAlphabet)
  }

  // converts letter in backward direction
  convertBackwards(letter) {
    const inIndex = this.inputIndex(letter)
    letter = plainAlphabet.charAt(inIndex)
    const outIndex = this.outputIndex(letter, this._rotor.alphabet)
    return plainAlphabet.charAt(outIndex)
  }

  isInNotchPosition() {
    return this._offset === this._rotor.notchPosition
  }

  get offset() {
    return convertIntToLetter(this._offset)
  }

  set offset(letter) {
    this._offset = convertLetterToInt(letter)
  }
}

function mod(x, y) {
  const r = x % y
  return r < 0 ? r + y : r
}

function convertIntToLetter(number) {
  return String.fromCharCode(number + 65)
}

function convertLetterToInt(letter) {
  return letter.charCodeAt(0) - 65
}