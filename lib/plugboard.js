const { plainAlphabet, checkLetter} = require('./alphabet')

// Plugboard
// pair of letters -> they are switched
// plugboard provides alphabet relative to plain alphabet

// property alphabet (read only) -> relative to plain alphabet (based on pairs)
// property pairs -> plugged pairs (setter clears plugboard)

// plug(pair) -> adds pair to plugboard (if exist, current pair's plugs are removed)
// plugAll(pairs) -> adds all pairs to plugboard (plugboard is not cleared)
// unplug(first) -> if exist, remove current pair in which letter figures
// unplugAll() -> all pairs are removed

class Plugboard {
  constructor() {
    this._pairs = new Map()
  }

  // assembles plugboard alphabet based on pairs
  get alphabet() {
    const alphabet = plainAlphabet.split('')
    for (const pair of this._pairs.entries()) {
      const [first, second] = pair
      const index = plainAlphabet.indexOf(second)
      alphabet[index] = first
    }
    return alphabet.join('')
  }

  // pair example -> 'AG'
  plug(pair) {
    this._check(pair)
    const [first, second] = pair.toUpperCase().split('')
    this._unplugPair(first, second)
    this._pairs.set(first, second)
    this._pairs.set(second, first)
  }

  _check(pair) {
    if (typeof pair !== 'string' || pair.length !== 2)
      throw new Error(`${pair} is not a valid pair (2 letter string)`)
    for (const letter of pair)
      checkLetter(letter)
  }

  _unplugPair(first, second) {
    this._pairs.delete(first)
    this._pairs.delete(second)
  }

  // pairs example -> ['GR', 'FC', 'AW']
  plugAll(pairs) {
    pairs.forEach(pair => this.plug(pair))
  }

  unplug(first) {
    checkLetter(first)
    first = first.toUpperCase()
    const second = this._pairs.get(first)
    if (second != undefined) {
      this._unplugPair(first, second)
    }
  }

  unplugAll() {
    this._pairs.clear()
  }

  get pairs() {
    const pairs = []
    for (const pair of this._pairs.entries()) {
      const [first, second] = pair
      if (first < second) pairs.push(first + second)
    }
    return pairs
  }

  set pairs(pairs) {
    this.unplugAll()
    for (const pair of pairs)
      this.plug(pair)
  }
}

module.exports = Plugboard