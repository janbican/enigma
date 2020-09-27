const Enigma = require('.././lib/enigma')
const { reflectors } = require('../lib/reflectors')
const { rotors } = require('../lib/rotors')

describe('Enigma', () => {
  let enigma

  beforeEach(() => {
    enigma = new Enigma({
      left: rotors.IV,
      reflector: reflectors.C,
      offsets: 'ADU',
      pairs: ['AB', 'GV', 'ZT', 'XW']
    })
  })

  test('identical rotors throws error', () => {
    expect(() => new Enigma({ left: rotors.II })).toThrow(Error)
    expect(() => enigma.rightRotor = rotors.IV).toThrow(Error)
  })

  test('invalid rotors throws error', () => {
    expect(() => new Enigma({ left: new Object() })).toThrow(Error)
    expect(() => enigma.middleRotor = undefined).toThrow(Error)
  })

  test('invalid reflector throws error', () => {
    expect(() => new Enigma({ reflector: 3.14 })).toThrow(Error)
    expect(() => enigma.reflector = null).toThrow(Error)
  })

  test('invalid offsets throws error', () => {
    expect(() => new Enigma({ offsets: 'A2E' })).toThrow(Error)
    expect(() => enigma.offsets = '').toThrow(Error)
  })

  test('invalid ringSettings throws error', () => {
    expect(() => new Enigma({ ringSettings: 10 })).toThrow(Error)
    expect(() => enigma.ringSettings = 'GLAS').toThrow(Error)
  })

  test('invalid pairs throws error', () => {
    expect(() => new Enigma({ pairs: ['AE', 'B'] })).toThrow(Error)
    expect(() => new Enigma({ pairs: null })).toThrow(Error)
    expect(() => new Enigma({ pairs: ['AE', 12] })).toThrow(Error)
  })

  test('convert returns correct letter', () => {
    expect(enigma.convert('A')).toBe('D')
  })

  test('convert returns correct letter (lowercase)', () => {
    expect(enigma.convert('a')).toBe('D')
  })

  test('convert invalid letter throws error', () => {
    expect(() => enigma.convert('*')).toThrow(Error)
    expect(() => enigma.convert('')).toThrow(Error)
    expect(() => enigma.convert(1)).toThrow(Error)
    expect(() => enigma.convert('AD')).toThrow(Error)
    expect(() => enigma.convert()).toThrow(Error)
  })

  test('convertText encrypts text', () => {
    expect(enigma.convertText('THISISENIGMA')).toBe('VQWLKDQDWIIK')
  })

  test('convertText encrypts text (lowercase)', () => {
    expect(enigma.convertText('thisisenigma')).toBe('VQWLKDQDWIIK')
  })

  test('convertText decrypts cipher', () => {
    expect(enigma.convertText('VQWLKDQDWIIK')).toBe('THISISENIGMA')
  })

  test('convertText decrypts cipher (lowercase)', () => {
    expect(enigma.convertText('vqwlkdqdwiik')).toBe('THISISENIGMA')
  })

  test('convertText normalizes text before conversion', () => {
    expect(enigma.convertText('THíS IS 1ěNIGMA@& ')).toBe('VQWLKDQDWIIK')
  })

  test('convert moves offset', () => {
    enigma.convert('A')
    expect(enigma.offsets).toBe('ADV')
  })

  test('convertText encrypts text with ringSettings', () => {
    enigma.ringSettings = 'CPX'
    expect(enigma.convertText('THISISENIGMA')).toBe('CPQOVWQTSRYP')
  })

  test('convertText decrypts text with ringSettings', () => {
    enigma.ringSettings = 'CPX'
    expect(enigma.convertText('CPQOVWQTSRYP')).toBe('THISISENIGMA')
  })

  test('covertText encrypts text', () => {
    enigma.ringSettings = 'ABC'
    expect(enigma.convertText('PBQPVYJEJXVXXJVOYBWVWXBPMCYBATWANHPRAKYUKRRAXJPHGLJAMTMXNTMPKLBQWHXNGNPGANPHGPHCDUMFQJQHEUNRMDLFFEHYVTYZKTTPDJIUFAYXBMTENGRYUQRCAANFTHHGTHJMFEVKOPDXTSBVZGFMXXAVTPRPHWMKMEJKZPIHERBMTLLDJBXMQZDYOHFMFQJDTPOWGFKZJTTDXQUDGKRLYUJIZCYWRXSVLLYBPEFBDBIBEDNHGEJUWLZDRIVTIFMDQDRRXKTQCRJQANAPCPSQPVPUHIRFFODCXPYLYAQNDTSZLETMBOPXUENLKMWSPDPNDPUELCZYTRCAUBRBGATKOXXXSXZWZQUBUYWDVGIZXTMSKISMVIBKYQQGZEFZRHGJXEVSXFGXRGKDSBADWJNIFNBOKSEOYPVKRDVSBLMVJPJRHABPUUUWNQRGSDLOJSNZXVSQVAPLNLYDQHGWFKMUNVINO'))
      .toBe('SEDACMASSAUTTORTORLACINIAEFFICITURCURSUSUTURNASEDTEMPUSNIBHSITAMETERATTEMPORCONDIMENTUMALIQUAMPELLENTESQUEESTATLOREMGRAVIDABIBENDUMQUISQUECONDIMENTUMQUISTORTORSITAMETEFFICITURSUSPENDISSEVELLACUSEUENIMLUCTUSCONVALLISSITAMETINNULLADUISQUAMQUAMPHARETRACONSECTETURPURUSNONLACINIAMOLLISNIBHMAECENASAQUAMMAURISNULLAMSEMPERTORTORJUSTOACALIQUAMJUSTOVARIUACMAURISACLACUSLIGULAAENEANQUISQUAMMALESUADABLANDITLOREMNECCURSUSVELITPRAESENTFRINGILLASEMNECVELITRUTRUMINBLANDITMASSASODALESMAURISEGET')
  })

  test('convertText encrypts long text', () => {
    enigma.setRotors(rotors.V, rotors.I, rotors.III,
      { offsets: 'AQL', ringSettings: 'ZGD' })
    enigma.pairs = ['BQ', 'CR', 'DI', 'EJ', 'KW', 'MT', 'OS', 'PX', 'UZ', 'GH']
    expect(enigma.convertText('BOOTKLARXBEIJSCHNOORJETWAZWOSIBENXNOVXSECHSNULCBMXPROVIANTBISZWONULXDEZXBENOETIGEGLAESERYNOCHVIERKLARXSTEHEMARQUBRUNOBRUNOZWOFUNFXLAGEWIEJSCHAEFERJXNNNWWWFUNFYEINSFUNFMBSTEIGENDYGUTESICHTVVVJRASCH'))
      .toBe('CVTNLONTVSHBXUBTKZZKLTFHMGCGMXYKEBULCTPIGMIJXCYMKBZLIGLUKKMSTFJDKLUOYYCWGGVFZBPXQMXNBRQMBCDUOMOFNTTFBVWWYLLULEJFOPFOBHIVEVIFXYTWKVFMNIIYAGOLZVQLJFNVEZQDJDPOLOZWBTMPBZSQFXUMNHNHSPJCFYIOQGDFPBFNBUMX')
  })

  test('convertText decrypts long text', () => {
    enigma.setRotors(rotors.V, rotors.I, rotors.III,
      { offsets: 'AQL', ringSettings: 'ZGD' })
    enigma.pairs = ['BQ', 'CR', 'DI', 'EJ', 'KW', 'MT', 'OS', 'PX', 'UZ', 'GH']
    expect(enigma.convertText('CVTNLONTVSHBXUBTKZZKLTFHMGCGMXYKEBULCTPIGMIJXCYMKBZLIGLUKKMSTFJDKLUOYYCWGGVFZBPXQMXNBRQMBCDUOMOFNTTFBVWWYLLULEJFOPFOBHIVEVIFXYTWKVFMNIIYAGOLZVQLJFNVEZQDJDPOLOZWBTMPBZSQFXUMNHNHSPJCFYIOQGDFPBFNBUMX'))
      .toBe('BOOTKLARXBEIJSCHNOORJETWAZWOSIBENXNOVXSECHSNULCBMXPROVIANTBISZWONULXDEZXBENOETIGEGLAESERYNOCHVIERKLARXSTEHEMARQUBRUNOBRUNOZWOFUNFXLAGEWIEJSCHAEFERJXNNNWWWFUNFYEINSFUNFMBSTEIGENDYGUTESICHTVVVJRASCH')
  })

  test('setRotors preserve current settings', () => {
    enigma.ringSettings = 'VCD'
    enigma.setRotors(rotors.I, rotors.II, rotors.III)
    expect(enigma.offsets).toBe('ADU')
    expect(enigma.ringSettings).toBe('VCD')
  })

  test('setRotors sets new settings', () => {
    enigma.setRotors(rotors.I, rotors.II, rotors.III,
      { offsets: 'AAA', ringSettings: 'BBB'})
    expect(enigma.offsets).toBe('AAA')
    expect(enigma.ringSettings).toBe('BBB')
  })
})