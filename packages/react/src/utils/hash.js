
const createHash = (value) => {
  var hash = 0, i, chr;
  for (i = 0; i < value.length; i++) {
    chr   = value.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
}

export default createHash;
