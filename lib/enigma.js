const SetOfRotors = require('./setofrotors')
const Plugboard = require('./plugboard')
const { plainAlphabet, checkLetter } = require('./alphabet')
const { rotors } = require('./rotors')
const { Reflector, reflectors } = require('./reflectors')

// models Enigma machine
// property offsets -> current offsets (e.q. 'AAA')
// property ringSettings -> current ring settings (e.q. 'AAA')
// property leftRotor -> left Rotor
// property middleRotor -> middle Rotor
// property rightRotor -> right Rotor
// property pairs -> plugged pairs (setter first clears plugboard)

// convert(letter) -> converts letter based on current settings, rotors move -> state is modified
// convertText(text) -> converts text based on current settings, state is modified
// plug(pair) -> plugs new pair
// plugAll(pairs) -> pairs is array of two letter strings, which should be paired
// unplug(letter) -> removes pair in which letter participates
// unplugAll() -> unplug all pairs
// setRotors(left, middle, right) -> sets new rotors, offsets and ringSettings is preserved
class Enigma {
  constructor({ left = rotors.I, middle = rotors.II, right = rotors.III,
                offsets = 'AAA', ringSettings = 'AAA',
                reflector = reflectors.B,
                pairs = [] } = {}) {
    this.setRotors(left, middle, right, 
      { offsets: offsets, ringSettings: ringSettings })
    this.reflector = reflector
    this._plugboard = new Plugboard()
    this.plugAll(pairs)
  }

  checkReflector(reflector) {
    if (!(reflector instanceof Reflector))
      throw new Error(`${reflector} is not a rotor`)
  }

  // converts letter
  // current settings are applied
  // rotors move -> enigma state is modified
  convert(letter) {
    checkLetter(letter)
    this._letter = letter.toUpperCase()
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

  // converts text
  // current settings are applied
  // enigma state is modified
  convertText(text) {
    text = this.normalize(text)
    let cipher = ''
    for (const letter of text)
      cipher += this.convert(letter)
    return cipher
  }

  // removes invalid characters and spaces
  // removes diacritics
  normalize(text) {
    return text.normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^A-Za-z]/g, '')
  }

  // pair example -> 'GT'
  plug(pair) {
    this._plugboard.plug(pair)
  }

  // pairs example -> ['GR', 'FC', 'AW']
  plugAll(pairs) {
    pairs.forEach(pair => this._plugboard.plug(pair))
  }

  unplug(letter) {
    this._plugboard.unplug(letter)
  }

  unplugAll() {
    this._plugboard.unplugAll()
  }

  // offsets and ringSettings is preserved
  setRotors(left, middle, right,
            { offsets = this.offsets, ringSettings = this.ringSettings } = {}) {
    this._rotors = new SetOfRotors(left, middle, right)
    this._rotors.offsets = offsets
    this._rotors.ringSettings = ringSettings
  }

  get offsets() {
    return this._rotors.offsets
  }

  set offsets(offsets) {
    this._rotors.offsets = offsets
  }

  get ringSettings() {
    return this._rotors.ringSettings
  }

  set ringSettings(ringSettings) {
    this._rotors.ringSettings = ringSettings
  }

  get pairs() {
    return this._plugboard.pairs
  }

  set pairs(pairs) {
    this._plugboard.pairs = pairs
  }

  get leftRotor() {
    return this._rotors.leftRotor
  }

  set leftRotor(rotor) {
    this._rotors.leftRotor = rotor
  }

  get middleRotor() {
    return this._rotors.middleRotor
  }

  set middleRotor(rotor) {
    this._rotors.middleRotor = rotor
  }

  get rightRotor() {
    return this._rotors.rightRotor
  }

  set rightRotor(rotor) {
    this._rotors.rightRotor = rotor
  }

  get reflector() {
    return this._reflector
  }

  set reflector(reflector) {
    this.checkReflector(reflector)
    this._reflector = reflector
  }
}

module.exports = Enigma