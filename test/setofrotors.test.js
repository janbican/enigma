const SetOfRotors = require('./../lib/setofrotors')
const { rotors } = require('./../lib/rotors')

describe('SetOfRotors', () => {
  let setOfRotors

  beforeEach(() => {
    setOfRotors = SetOfRotors.default()
  })

  test('identical rotors throws error', () => {
    expect(() => new SetOfRotors(rotors.I, rotors.II, rotors.I)).toThrow(Error)
  })

  test('offset is set to AAA by default', () => {
    expect(setOfRotors.offsets).toBe('AAA')
  })

  test('offsets are set correctly', () => {
    setOfRotors.offsets = 'GFR'
    expect(setOfRotors.offsets).toBe('GFR')
  })

  test('invalid offsets format throws error', () => {
    expect(() => setOfRotors.offsets = 'GF').toThrow(Error)
  })

  test('invalid offsets letter throws error', () => {
    expect(() => setOfRotors.offsets = 'G&F').toThrow(Error)
  })
})