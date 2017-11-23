const { test } = use('Test/Suite')('Helpers unit test')
const sqlHelpers = use('App/Helpers/sql')

test('prepareTsQuery', ({ assert }) => {
  let _msg = 'parenthesis at the end'
  let _in = '16 cli)'
  let _out = '16:* | cli:*'
  assert.equal(sqlHelpers.prepareTsQuery(_in),_out,_msg)
  assert.equal(sqlHelpers.prepareTsQuery('16 c(li'),'16:* | c:* | li:*')
  assert.equal(sqlHelpers.prepareTsQuery('1,2'),'1.2:*')
})
