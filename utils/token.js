const jwt = require('jsonwebtoken')
// 我的秘钥
const MYSCRET = 'MSI_CND'

//jwt生成加密token，username是公文，密钥是“secret”，1小时 60 * 60 * 1 后过期
exports.generateToken = (name) => {
  token = jwt.sign({ name }, MYSCRET, { expiresIn: '3600000ms' });
  return token;
}

// 验证token解密
exports.validateToken = async(token) => {
   try {
    let res =   await jwt.verify(token, MYSCRET)
    console.log(res)
    return res
   } catch (error) {
     console.log(error.name)
     return 'error'
   }
    
    // console.log(res)
   
}

