
// Tools to convert HTML to normal strings
// Since react-native mobile can't parse HTML

// encode(decode) html text into html entity
export const decodeHtmlEntity = (str: string) => {
  if (!str) {
    return ''
  }
  return str.replace(/&#(\d+);/g, (match, dec) => {
    return String.fromCharCode(dec)
  })
}

export const encodeHtmlEntity = (str: string) => {
  if (!str) {
    return ''
  }
  var buf = []
  for (var i=str.length-1; i>=0; i--) {
    buf.unshift(['&#', str.charCodeAt(i), ';'].join(''))
  }
  return buf.join('')
}

