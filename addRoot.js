
const mongoose = require('mongoose');
const Schema = mongoose.Schema
const {config}= require('./db/config')
const {cryptoPWD} = require('./utils/encrypt')
const {generateToken} = require('./utils/token')
const addRoot = async() => {
    // 1. 连接数据库
    await mongoose.connect(config.DB_URL + config.MODEL_USER);
    // 2. 定义模型
    let User = new config.USER_SCHEMA({username: 'root' , password : cryptoPWD('msi@eps'), token: generateToken('root'),auth: 'root' ,depart: 'root'})
    // 3. 存储数据
    await User.save()
    // 4. 断开连接
    mongoose.disconnect()
    // 5. 返回状态
    return 'ok'

}
addRoot().then(res => {
  console.log(res)
})
