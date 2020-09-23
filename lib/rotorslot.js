import { plainAlphabet } from "./alphabet"
import { Rotor } from './rotors'

// models one rotor slot
// it holds rotor and its current state - offset and ringSetting
// provides interface for SetOfRotors
export class RotorSlot {
  constructor(rotor) {
    if (!(rotor instanceof Rotor))
      throw new Error(`${rotor} is not a rotor`)
    this._rotor = rotor
    this._offset = 0
    this._ringSetting = 0
  }

  move() {
    this._offset = (this._offset + 1) % plainAlphabet.length
  }

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

  convertBackwards(letter) {
    const inIndex = this.inputIndex(letter)
    letter = plainAlphabet.charAt(inIndex)
    const outIndex = this.outputIndex(letter, this._rotor.alphabet)
    return plainAlphabet.charAt(outIndex)
  }

  isInNotchPosition() {
    return this._offset === this._rotor.notchPosition
  }
}

function mod(x, y) {
  const r = x % y
  return r < 0 ? r + y : r
}