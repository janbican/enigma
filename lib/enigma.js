const SetOfRotors = require('./setofrotors')
const Plugboard = require('./plugboard')
const { plainAlphabet, checkLetter } = require('./alphabet')
const rotors = require('./rotors')

class Enigma {
  constructor(left, middle, right, offsets, ringSettings, reflector, pairs) {
    this._rotors = new SetOfRotors(left, middle, right)
    this._rotors.offset = offsets
    this._rotors.ringSettings = ringSettings
    this._reflector = reflector
    this._plugboard = new Plugboard()
    this.plugAll(pairs)
  }

  convert(letter) {
    checkLetter(letter)
    this._letter = letter
    this._rotors.move()
    return this.convertLetter()
  }

  convertLetter() {
    this.throughPlugboard()
    this.throughRotorsForwards()
    this.throughReflector()
    this.throughRotorsBackwards()
    this.throughPlugboard()
    return this._letter
  }

  throughPlugboard() {
    const index = plainAlphabet.indexOf(this._letter)
    this._letter = this._plugboard.alphabet.charAt(index)
  }

  throughRotorsForwards() {
    this._letter = this._rotors.convertForwards(this._letter)
  }

  throughReflector() {
    const index = plainAlphabet.indexOf(this._letter)
    this._letter = this._reflector.alphabet.charAt(index)
  }

  throughRotorsBackwards() {
    this._letter = this._rotors.convertBackwards(this._letter)
  }

  plugAll(pairs) {
    pairs.forEach(pair => this._plugboard.plug(pair))
  }
}

module.exports = Enigma