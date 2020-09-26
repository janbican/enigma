const { rotors } = require('./rotors')
const RotorSlot = require('./rotorslot')
const { checkLetter } = require('./alphabet')

// SetOfRotors (3 rotors)
// composed of rotor slots which contains respective rotors (unique set)

// property offsets -> current offsets (e.q. 'AAA')
// property ringSettings -> current ring settings (e.q. 'AAA')
// property leftRotor
// property middleRotor
// property rightRotor

// static default() -> returns set with rotors I, II, III
// move() -> moves offsets based on notch positions
// convertForwars(letter), convertBackwards(letter) -> converts letter in respective direction
class SetOfRotors {
  constructor(left, middle, right) {
    this._checkRotors(left, right, middle)
    this._left = new RotorSlot(left)
    this._middle = new RotorSlot(middle)
    this._right = new RotorSlot(right)
  }

  // each rotor must be unique
  _checkRotors(left, middle, right) {
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
      this._rightRotorInNotchPosition()
    } else if (this._middle.isInNotchPosition()) {
      this._moveMiddleAndLeftRotor()
    }
    this._right.move()
  }

  _rightRotorInNotchPosition() {
    if (this._middle.isInNotchPosition()) {
      this._left.move()
    }
    this._middle.move()
  }

  _moveMiddleAndLeftRotor() {
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
    letter = this._left.convertBackwards(letter)
    letter = this._middle.convertBackwards(letter)
    return this._right.convertBackwards(letter)
  }

  // e.g. 'AZT'
  get offsets() {
    return this._left.offset + this._middle.offset + this._right.offset
  }

  set offsets(offsets) {
    this._checkSettings(offsets)
    const [left, middle, right] = offsets.toUpperCase().split('')
    this._left.offset = left
    this._middle.offset = middle
    this._right.offset = right
  }

  _checkSettings(offsets) {
    if (typeof offsets !== 'string' || offsets.length !== 3)
      throw new Error(`${offsets} is not valid offsets format`)
    offsets.split('').forEach(letter => checkLetter(letter))
  }

  // e.g. 'AZT'
  get ringSettings() {
    return this._left.ringSetting +
           this._middle.ringSetting +
           this._right.ringSetting
  }

  set ringSettings(ringSettings) {
    this._checkSettings(ringSettings)
    const [left, middle, right] = ringSettings.toUpperCase().split('')
    this._left.ringSetting = left
    this._middle.ringSetting = middle
    this._right.ringSetting = right
  }

  get leftRotor() {
    return this._left.rotor
  }

  set leftRotor(rotor) {
    this._checkRotors(rotor, this._middle.rotor, this._right.rotor)
    this._left.rotor = rotor
  }

  get middleRotor() {
    return this._middle.rotor
  }

  set middleRotor(rotor) {
    this._checkRotors(this._left.rotor, rotor, this._right.rotor)
    this._middle.rotor = rotor
  }

  get rightRotor() {
    return this._right.rotor
  }

  set rightRotor(rotor) {
    this._checkRotors(this._left.rotor, this._middle.rotor, rotor)
    this._right.rotor = rotor
  }
}

module.exports = SetOfRotors