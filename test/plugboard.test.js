const Plugboard = require('./../lib/plugboard')
const { plainAlphabet } = require('./../lib/alphabet')

describe('Plugboard', () => {
  let plugboard

  beforeEach(() => {
    plugboard = new Plugboard()
  })

  test('plain alphabet when created', () => {
    expect(plugboard.alphabet).toBe(plainAlphabet)
  })

  test('alphabet changes when pair is plugged', () => {
    plugboard.plug('AZ')
    expect(plugboard.alphabet).toBe('ZBCDEFGHIJKLMNOPQRSTUVWXYA')
  })

  test('alphabet changes when pair is plugged (lowercase)', () => {
    plugboard.plug('xt')
    expect(plugboard.alphabet).toBe('ABCDEFGHIJKLMNOPQRSXUVWTYZ')
  })

  test('alphabet changes when more pairs are plugged', () => {
    plugboard.plug('MA')
    plugboard.plug('PT')
    plugboard.plug('XQ')
    expect(plugboard.alphabet).toBe('MBCDEFGHIJKLANOTXRSPUVWQYZ')
  })

  test('plugs changes when letter is plugged again', () => {
    plugboard.plug('GH')
    plugboard.plug('LA')
    plugboard.plug('GL')
    expect(plugboard.alphabet).toBe('ABCDEFLHIJKGMNOPQRSTUVWXYZ')
  })

  test('alphabet changes when letter is unplugged', () => {
    plugboard.plug('PT')
    plugboard.unplug('P')
    expect(plugboard.alphabet).toBe(plainAlphabet)
  })

  test('alphabet is plain when unplugAll called', () => {
    plugboard.plug('MA')
    plugboard.plug('PT')
    plugboard.plug('XQ')
    plugboard.unplugAll()
    expect(plugboard.alphabet).toBe(plainAlphabet)
  })

  test('throws error when trying to plug nothing', () => {
    expect(() => plugboard.plug('')).toThrow(Error)
  })

  test('throws error when trying to plug invalid pair', () => {
    expect(() => plugboard.plug('@A')).toThrow(Error)
  })

  test('throws error when trying to unplug invalid letter', () => {
    expect(() => plugboard.unplug(1)).toThrow(Error)
  })

  test('pairs (empty) returns empty array', () => {
    expect(plugboard.pairs).toEqual([])
  })

  test('pairs returns array of pairs', () => {
    plugboard.plug('AM')
    plugboard.plug('PT')
    plugboard.plug('QX')
    expect(plugboard.pairs).toEqual(['AM', 'PT', 'QX'])
  })

  test('set pairs', () => {
    plugboard.pairs = ['AM', 'PT', 'QX']
    expect(plugboard.alphabet).toBe('MBCDEFGHIJKLANOTXRSPUVWQYZ')
  })

  test('set pairs, invalid pair throws error', () => {
    expect(() => plugboard.pairs = ['A2']).toThrow(Error)
  })
})