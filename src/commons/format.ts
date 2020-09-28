export const toCurrency = (value = '', skipDecimals: boolean): string => {
  let toFormat = (value + '').replace(/[^0-9-]+/gi, '')
  if (!skipDecimals) {
    switch (toFormat.length) {
      case 0:
        toFormat = '0'
        break
      case 1:
        toFormat = '0.0' + toFormat
        break
      case 2:
        toFormat = '0.' + toFormat
        break
      default:
        toFormat = toFormat.slice(0, -2) + '.' + toFormat.slice(-2)
    }
  }

  const res = new Intl.NumberFormat('pt-br', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  }).format(toFormat)
  return res
}

export const toFloat = (value = '') => {
  const string = value.replace(/[^0-9,-]+/gi, '').replace(',', '.')
  return parseFloat(string).toFixed(2)
}
