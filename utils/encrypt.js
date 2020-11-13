const crypto = require('crypto')

exports.cryptoPWD = ( password,salt = 'MSI_CND') => {
  let passwordSalt = password + salt
  let md5 = crypto.createHash('md5')
  let res = md5.update(passwordSalt).digest('hex')
  return res
}