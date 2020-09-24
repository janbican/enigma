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

  test('offsets are set to AAA by default', () => {
    expect(setOfRotors.offsets).toBe('AAA')
  })

  test('offsets are set correctly', () => {
    setOfRotors.offsets = 'GFR'
    expect(setOfRotors.offsets).toBe('GFR')
  })

  test('invalid offsets format throws error', () => {
    expect(() => setOfRotors.offsets = 'GF').toThrow(Error)
  })

  test('offsets as non string value throws error', () => {
    expect(() => setOfRotors.offsets = 12).toThrow(Error)
  })

  test('invalid offsets letter throws error', () => {
    expect(() => setOfRotors.offsets = 'G&F').toThrow(Error)
  })

  test('ringSettings are set to AAA by default', () => {
    expect(setOfRotors.ringSettings).toBe('AAA')
  })

  test('ringSettings are set correctly', () => {
    setOfRotors.ringSettings = 'XDW'
    expect(setOfRotors.ringSettings).toBe('XDW')
  })

  test('invalid ringSettings format throws error', () => {
    expect(() => setOfRotors.ringSettings = '').toThrow(Error)
  })

  test('invalid ringSettings letter throws error', () => {
    expect(() => setOfRotors.ringSettings = 'G2F').toThrow(Error)
  })

  test('convertForwards returns correct letter', () => {
    setOfRotors.offsets = 'AAB'
    expect(setOfRotors.convertForwards('A')).toBe('F')
    setOfRotors.offsets = 'GMO'
    expect(setOfRotors.convertForwards('Y')).toBe('B')
    setOfRotors.offsets = 'MUV'
    expect(setOfRotors.convertForwards('L')).toBe('Y')
  })

  test('convertBackwards returns correct letter', () => {
    setOfRotors.offsets = 'AAB'
    expect(setOfRotors.convertBackwards('S')).toBe('B')
    setOfRotors.offsets = 'GMO'
    expect(setOfRotors.convertBackwards('R')).toBe('L')
    setOfRotors.offsets = 'MUV'
    expect(setOfRotors.convertBackwards('A')).toBe('U')
  })

  test('convertForwards with ringOffsets returns correct letter', () => {
    setOfRotors.ringSettings = 'FIE'
    setOfRotors.move()
    expect(setOfRotors.convertForwards('G')).toBe('I')
  })

  test('convertBackwards with ringOffsets returns correct letter', () => {
    setOfRotors.ringSettings = 'IAZ'
    setOfRotors.move()
    expect(setOfRotors.convertBackwards('H')).toBe('O')
  })

  test('right offset increments', () => {
    setOfRotors.move()
    expect(setOfRotors.offsets).toBe('AAB')
  })

  test('middle and right offset should increment', () => {
    setOfRotors.offsets = 'MUV'
    setOfRotors.move()
    expect(setOfRotors.offsets).toBe('MVW')
  })

  test('all three offsets should increment', () => {
    setOfRotors.offsets = 'QEV'
    setOfRotors.move()
    expect(setOfRotors.offsets).toBe('RFW')
  })
})