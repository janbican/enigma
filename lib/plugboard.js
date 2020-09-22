import { alphabet as plainAlphabet, check as checkLetter} from './alphabet'

// models plugboard
// two letters could be paired -> they are switched
// plugboard provides alphabet which reflects pairs
export class Plugboard {
  constructor() {
    this._pairs = new Map()
  }

  // assembles plugboard alphabet based on pairs
  // returns mapping relative to plain alphabet
  get alphabet() {
    let alphabet = plainAlphabet.split('')
    for (const pair of this._pairs.entries()) {
      const [first, second] = pair
      const index = plainAlphabet.indexOf(second)
      alphabet[index] = first
    }
    return alphabet.join('')
  }

  plug(pair) {
    this.validate(pair)
    const [first, second] = pair.split('')
    this.unplugPair(first, second)
    this._pairs.set(first, second)
    this._pairs.set(second, first)
  }

  validate(pair) {
    if (typeof pair !== 'string' || pair.length !== 2)
      throw new Error(`${pair} is not a valid pair (2 letter string)`)
    for (const letter of pair)
      checkLetter(letter)
  }

  unplugPair(first, second) {
    this._pairs.delete(first)
    this._pairs.delete(second)
  }

  unplug(first) {
    checkLetter(first)
    const second = this._pairs.get(first)
    if (second != undefined) {
      this.unplugPair(first, second)
    }
  }

  unplugAll() {
    this._pairs.clear()
  }
}