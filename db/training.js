const mongoose = require('mongoose');
const Schema = mongoose.Schema
const {config} = require('./config')
// 
// title status  summarize  imgStart imgStartDes imgDoing imgDoingDes imgEnd imgEndDes trainUser completionTime  guider createUser createDate

// 增加一个Issue
const addTraining = async(title ,status  , machineNum, summarize , imgStart, imgStartDes, imgDoing, imgDoingDes, imgEnd, imgEndDes, trainUser, completionTime,  guider, createUser ,createDate) => {
  try{
    // 1. 连接数据库
    await mongoose.connect(config.DB_URL + config.MODEL_TRAINING);
    // console.log(1232)
    // 2. 定义模型
    let Training = new config.TRIANING_SCHEMA({title ,status  ,machineNum, summarize , imgStart, imgStartDes, imgDoing, imgDoingDes, imgEnd, imgEndDes, trainUser, completionTime,  guider, createUser ,createDate})
    // 3. 存储数据
    await Training.save()
    // 4. 断开连接
    mongoose.disconnect()
    // 5. 返回状态
    return 'ok'
  }catch(e) {
    return 'error'
    console.log(e)
  }
}
// 查詢issue
const findTraining = async(skip = 0,limit = 10, dateArray) => {
  try{
    // 1. 连接数据库
    await mongoose.connect(config.DB_URL + config.MODEL_TRAINING);
    // 2. 定义模型
    // console.log(122)
    let Training = config.TRIANING_SCHEMA
    // 3. 存储数据
    let data = {}
    // console.log(ISODate)
    if (dateArray && dateArray.length > 1){
      // console.log(dateArray)
      data.total = await Training.find({happenDate:{ 
      $gte: dateArray[0],
      $lt: dateArray[1]}}).count().sort({ "_id": -1 })
      // console.log(data)
      data.data = await Training.find({happenDate:{ 
        $gte: dateArray[0],
        $lt: dateArray[1]}}).skip( parseInt(skip) ).limit(parseInt(limit)).sort({ "_id": -1 })
    } else {
      data.total = await Training.find({}).count().sort({ "_id": -1 })
      // console.log(data)
      data.data = await Training.find({}).skip( parseInt(skip) ).limit(parseInt(limit)).sort({ "_id": -1 })
    }
    // console.log(data)
    // 4. 断开连接
    mongoose.disconnect()
    // console.log(data)
    return data
  }catch(e) {
    return 'error'
    console.log(e)
  }
}
// 查詢所有
const findTrainingAll = async(dateArray) => {
  try{
    // 1. 连接数据库
    await mongoose.connect(config.DB_URL + config.MODEL_TRAINING);
    // 2. 定义模型
    // console.log(122)
    let Training = config.TRIANING_SCHEMA
    // 3. 存储数据
    let data = {}
    // console.log(ISODate)
    if (dateArray && dateArray.length > 1){
      // console.log(dateArray)
      data.total = await Training.find({happenDate:{ 
      $gte: dateArray[0],
      $lt: dateArray[1]}}).count().sort({ "_id": -1 })
      // console.log(data)
      data.data = await Training.find({happenDate:{ 
        $gte: dateArray[0],
        $lt: dateArray[1]}}).sort({ "_id": -1 })
    } else {
      data.total = await Training.find({}).count().sort({ "_id": -1 })
      // console.log(data)
      data.data = await Training.find({}).sort({ "_id": -1 })
    }
    // console.log(data)
    // 4. 断开连接
    mongoose.disconnect()
    // console.log(data)
    return data
  }catch(e) {
    return 'error'
    console.log(e)
  }
}



const updatedItem = async(_id, updateData) => {
  try {
    await mongoose.connect(config.DB_URL + config.MODEL_TRAINING);
    let Training = config.TRIANING_SCHEMA
    let data = await Training.updateOne({'_id': _id},{$set:updateData})
    console.log(data)
  }catch(error) {
    return 'error'
  }
}

// 删除一条信息
const deleteItem = async(_id, username) => {
  try {
    // 1. 连接数据库
    await mongoose.connect(config.DB_URL + config.MODEL_TRAINING);
    // 2. 定义模型
    // console.log(122)
    let Training = config.TRIANING_SCHEMA
    let data = await Training.deleteOne({'_id': _id})
    // console.log(data)
    if (data=== 'error') {
      return ''
    } else {
      return 'ok'
    }
  } catch (error) {
    return 'error'
  }
}


exports.training= {
  addTraining,
  findTraining,
  deleteItem,
  updatedItem,
  findTrainingAll
}