const { plainAlphabet } = require("./alphabet")
const { Rotor } = require('./rotors')

// RotorSlot
// holds rotor and its current state - offset and ringSetting

// property offset -> current letter offset
// property ringSetting -> current ring setting
// property rotor -> rotor (instance of Rotor class)

// move() -> moves offset
// convertForwars(letter), convertBackwards(letter) -> converts letter in respective direction
// isInNotchPosition() -> boolean

class RotorSlot {
  constructor(rotor) {
    this._check(rotor)
    this._rotor = rotor
    this._offset = 0
    this._ringSetting = 0
  }

  _check(rotor) {
    if (!(rotor instanceof Rotor))
      throw new Error(`${rotor} is not a rotor`)
  }

  // move by one position
  move() {
    this._offset = (this._offset + 1) % plainAlphabet.length
  }

  // converts letter in forward direction
  convertForwards(letter) {
    const inIndex = this._inputIndex(letter)
    letter = this._rotor.alphabet.charAt(inIndex)
    const outIndex = this._outputIndex(letter, plainAlphabet)
    return plainAlphabet.charAt(outIndex)
  }

  _inputIndex(letter) {
    const index = plainAlphabet.indexOf(letter)
    return mod(index + this._offset - this._ringSetting, plainAlphabet.length)
  }

  _outputIndex(letter, alphabet) {
    const index = alphabet.indexOf(letter)
    return mod(index - this._offset + this._ringSetting, plainAlphabet.length)
  }

  // converts letter in backward direction
  convertBackwards(letter) {
    const inIndex = this._inputIndex(letter)
    letter = plainAlphabet.charAt(inIndex)
    const outIndex = this._outputIndex(letter, this._rotor.alphabet)
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

  get ringSetting() {
    return convertIntToLetter(this._ringSetting)
  }

  set ringSetting(letter) {
    this._ringSetting = convertLetterToInt(letter)
  }

  get rotor() {
    return this._rotor
  }

  set rotor(rotor) {
    this._check(rotor)
    this._rotor = rotor
  }
}

// helper functions
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

module.exports = RotorSlot