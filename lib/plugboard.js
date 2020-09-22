import { alphabet as plainAlphabet } from './alphabet'

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
    // validation
    const [first, second] = pair.split('')
    // unplug current plugs
    this.unplugPair(first, second)
    // plug new pair
    this._pairs.set(first, second)
    this._pairs.set(second, first)
  }

  unplugPair(first, second) {
    this._pairs.delete(first)
    this._pairs.delete(second)
  }
}