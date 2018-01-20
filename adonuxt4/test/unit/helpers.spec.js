const { test } = use('Test/Suite')('Helpers unit test')
const sqlHelpers = use('App/Helpers/sql')

test('prepareTsQuery', ({ assert }) => {
  assert.equal(sqlHelpers.prepareTsQuery('16 cli)'),'16:* | cli:*'     ,'parenthesis at the end')
  assert.equal(sqlHelpers.prepareTsQuery('16 c(li'),'16:* | c:* | li:*')
  assert.equal(sqlHelpers.prepareTsQuery('1,2')    ,'1.2:*'            )
  assert.equal(sqlHelpers.prepareTsQuery('(75)')   ,'75:*'             )
})
