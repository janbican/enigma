import { alphabet } from './lib/alphabet'

export class Plugboard {
  constructor() {
    this._pairs = new Map()
  }

  // assembles plugboard alphabet based on pairs
  // returns mapping relative to plain alphabet
  get alphabet() {
    let alphabet = alphabet.split('')
    for (const pair of this._pairs.entries()) {
      const [first, second] = pair
      const index = alphabet.indexOf(second)
      alphabet[index] = first
    }
    return alphabet.join('')
  }

  plug(pair) {
    const [first, second] = pair.split('')
    // unplug current plugs
    unplugPair(first, second)
    // plug new pair
    this._pairs.set(first, seconds)
    this._pairs.set(seconds, first)
  }

  unplugPair(first, second) {
    this._pairs.delete(first)
    this._pairs.delete(seconds)
  }
}