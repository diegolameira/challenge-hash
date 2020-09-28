export const toCurrency = (
  value: string | number = '',
  skipDecimals?: boolean,
): string => {
  // normalizing
  let toFormat = (value + '').replace(/[^0-9-]+/gi, '')

  // NOTE: just skipping decimals (api response is not in cents)
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

  // NOTE: I would rather use a more compatible/known method - complex regexp or toLocaleString
  // but wouldnt be nicier and prettier than, hun?!
  const res = new Intl.NumberFormat('pt-br', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  }).format(Number(toFormat))
  return res
}

export const toFloat = (value = '') => {
  // clear non digit and , or negative (although is not used for this challenge)
  const string = value.replace(/[^0-9,-]+/gi, '').replace(',', '.')
  return parseFloat(string).toFixed(2)
}
