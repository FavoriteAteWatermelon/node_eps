const mongoose = require('mongoose');
const Schema = mongoose.Schema
const {config} = require('./config')

// 增加一个用户
const addUser = async(username,password,depart,token) => {
  try{
    // 1. 连接数据库
    await mongoose.connect(config.DB_URL + config.MODEL_USER);
    // 2. 定义模型
    let User = new config.USER_SCHEMA({username ,password, depart, token})
    // 3. 存储数据
    await User.save()
    // 4. 断开连接
    mongoose.disconnect()
    // 5. 返回状态
    return 'ok'
  }catch(e) {
    return 'error'
    console.log(e)
  }
}
// 查询所有用户信息
const getAllUserInfo = async () => {
  try {
    await mongoose.connect(config.DB_URL + config.MODEL_USER);
    let User =  config.USER_SCHEMA
    let data = await User.find({},{token: 0, password: 0}).sort({ "_id": -1 })
    mongoose.disconnect()
    // console.log(data)
    return data
  }
  catch (err) {
    // for debug
    console.error(err.message);
    process.exit(1);
    return 'err'
  }
}


// 更新资用户资料
const userUpdate = async(username, token) => {
  try{
    // 1. 连接数据库
    await mongoose.connect(config.DB_URL + config.MODEL_USER);
    // 2. 定义模型
    let User =  config.USER_SCHEMA
    // 3. 存储数据
    // console.log(username)
    let isUpdate = await User.updateOne({username}, {$set: {token}})
    // 4. 断开连接
    mongoose.disconnect()
    // 5. 返回状态
    if (isUpdate.n === 1 && isUpdate.ok === 1) {
      return 'ok'
    } else {
      return  'no_ok'
    }
    

  }catch(e) {
    return 'error'
    console.log(e)
  }
}
// 查詢用戶存在
const findUserExist = async(username) => {
  try {
    await mongoose.connect(config.DB_URL + config.MODEL_USER);
    // 2. 定义模型
    let User =  config.USER_SCHEMA
    // console.log({username,password})
    let data = await User.findOne({username})
    mongoose.disconnect()
    // 此data是mongodb对象，不能delete属性
    if (data != null) {
      let {username, depart} = data
      return {username, depart}
    } else {
      return ''
    }
    
  }
  catch (err) {
     // for debug
    console.error(err.message);
    process.exit(1);
    return 'err'
  }
}


// 查询用户信息
const findUser = async(username, password) => {
  try {
    await mongoose.connect(config.DB_URL + config.MODEL_USER);
    // 2. 定义模型
    let User =  config.USER_SCHEMA
    // console.log({username,password})
    let data = await User.findOne({username,password})
    mongoose.disconnect()
    // 此data是mongodb对象，不能delete属性
    if (data != null) {
      let {username, token ,auth, createTime, _id} = data
      return {username, token ,auth, createTime, _id}
    } else {
      return ''
    }
    
  }
  catch (err) {
     // for debug
    console.error(err.message);
    process.exit(1);
    return 'err'
  }
}


// 删除一条信息
const deleteItem = async(_id, username) => {
  try {
    // 1. 连接数据库
    await mongoose.connect(config.DB_URL + config.MODEL_USER);
    // 2. 定义模型
    let User =  config.USER_SCHEMA
    let data = await  User.deleteOne({'_id': _id})
    if (data=== 'error') {
      return ''
    } else {
      return 'ok'
    }
  } catch (error) {
    return 'error'
  }
}
exports.user= {
  addUser,
  findUser,
  userUpdate,
  getAllUserInfo,
  findUserExist,
  deleteItem
}