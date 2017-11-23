function prepareTsQuery(str){
  str = str.replace(/\)|\(/, ' ')
  str = str.replace(',', '.')
  str = str.trim()
  let strArr = str.split(/\s+/)
  var prefixSearch = strArr.map((part) => {
    return part+':*'
  })
  return prefixSearch.join(' | ')
}

module.exports = {
  prepareTsQuery
}
