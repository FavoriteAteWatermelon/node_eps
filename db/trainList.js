const mongoose = require('mongoose');
const Schema = mongoose.Schema
const {config} = require('./config')
// title requiro guider depart creator createDate
// 增加一个Issue
const addTrainList = async(title, requiro ,guider ,depart ,creater , trainOwner, trainDuring, createDate) => {
  // console.log(createDate)
  try{
    // 1. 连接数据库
    await mongoose.connect(config.DB_URL + config.MODEL_TRAIN_LIST);
    // console.log(1232)
    // console.log(title, requiro ,guider ,depart ,creater , trainOwner, trainDuring, createDate)
    // 2. 定义模型
    let TrainList = new config.TRAIN_LIST_SCHEMA({title, requiro ,guider ,depart ,creater ,trainOwner, trainDuring, createDate})
    // 3. 存储数据
    await TrainList.save()
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
const findTrainList = async(skip = 0,limit = 10, dateArray) => {
  try{
    // 1. 连接数据库
    await mongoose.connect(config.DB_URL + config.MODEL_TRAIN_LIST);
    // 2. 定义模型
    // console.log(122)
    let TrainList = config.TRAIN_LIST_SCHEMA
    // 3. 存储数据
    let data = {}
    // console.log(ISODate)
    if (dateArray && dateArray.length > 1){
      // console.log(dateArray)
      data.total = await TrainList.find({happenDate:{ 
      $gte: dateArray[0],
      $lt: dateArray[1]}}).count()
      // console.log(data)
      data.data = await TrainList.find({happenDate:{ 
        $gte: dateArray[0],
        $lt: dateArray[1]}}).skip( parseInt(skip) ).limit(parseInt(limit))
    } else {
      data.total = await TrainList.find({}).count()
      // console.log(data)
      data.data = await TrainList.find({}).skip( parseInt(skip) ).limit(parseInt(limit))
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

// 删除一条信息
const deleteItem = async(_id, username) => {
  try {
    // 1. 连接数据库
    await mongoose.connect(config.DB_URL + config.MODEL_TRAIN_LIST);
       // 2. 定义模型
    let TrainList = config.TRAIN_LIST_SCHEMA
    let data = await  TrainList.deleteOne({'_id': _id})
    if (data=== 'error') {
      return ''
    } else {
      return 'ok'
    }
  } catch (error) {
    return 'error'
  }
}


exports.trainList= {
  addTrainList,
  findTrainList,
  deleteItem
}