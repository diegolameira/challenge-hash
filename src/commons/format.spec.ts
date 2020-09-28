// #################################################
// START: AS NODE HAS DIFF IMPLEMENTATION ON INTL
// #################################################
import { NumberFormat } from 'intl'
import areIntlLocalesSupported from 'intl-locales-supported'

const localesMyAppSupports = ['pt-br']

if (global.Intl) {
  // Determine if the built-in `Intl` has the locale data we need.
  if (!areIntlLocalesSupported(localesMyAppSupports)) {
    // `Intl` exists, but it doesn't have the data we need, so load the
    // polyfill and patch the constructors we need with the polyfill's.
    Intl.NumberFormat = NumberFormat
  }
} else {
  // No `Intl`, so use and load the polyfill.
  global.Intl = require('intl')
}
// #################################################
// END: AS NODE HAS DIFF IMPLEMENTATION ON INTL
// #################################################

import { toCurrency, toFloat } from './format'

describe('toCurrency', () => {
  const cases = [
    [null, 'R$0,00'],
    [undefined, 'R$0,00'],
    [NaN, 'R$0,00'],
    [0, 'R$0,00'],
    [1, 'R$0,01'],
    [10, 'R$0,10'],
    [100, 'R$1,00'],
    ['1.00', 'R$1,00'],
    [1230, 'R$12,30'],
    ['12.30', 'R$12,30'],
    [120000000030, 'R$1.200.000.000,30'],
    ['120000000030', 'R$1.200.000.000,30'],
    ['1200000000.30', 'R$1.200.000.000,30'],
  ]
  test.each(cases)(
    'should get formatted values',
    (value: string | number, expected) => {
      expect(toCurrency(value)).toEqual(expected)
    },
  )
})

describe('toFloat', () => {
  const cases = [
    ['0.00', 'R$0,00'],
    ['0.01', 'R$0,01'],
    ['0.10', 'R$0,10'],
    ['1.00', 'R$1,00'],
    ['12.30', 'R$12,30'],
    ['1200000000.30', 'R$1.200.000.000,30'],
  ]
  test.each(cases)('should get formatted values', (expected, value: string) => {
    expect(toFloat(value)).toEqual(expected)
  })
})
