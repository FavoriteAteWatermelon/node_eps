
const config = require('../config')
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// 地址
const DB_URL =`mongodb://${config.db_host}:${config.db_port}/`
// 表名
const MODEL_TRAIN_LIST = 'trainingList'
const MODEL_TRAINING = 'training'
const MODEL_USER = 'epsUser'

// 用户配置表
const USER_SCHEMA = mongoose.model('epsUser', new Schema ({
  username:{
    type: String,
    required: true
  },
  password: {
    type: String,
    default: ''
  },
  token: {
    type: String,
    default: ''
  },
  depart: {
    type: String,
    default: 'Te'
  },
  auth: {
    type: String,
    default: 'user'
  },
  createTime: {
    type: Date,
    default: Date.now()
  },
})) 

// trainList表
const TRAIN_LIST_SCHEMA = mongoose.model('epsFAETrainList', new Schema ({
  title: {
    type: String,
    default: ''
  },
  requiro:{
    type: String,
    default: ''
  },
  guider: {
    type: String,
    default: ''
  },
  depart: {
    type: String,
    default: ''
  },
  creater: {
    type: String,
    default: ''
  },
  trainOwner: {
    type: String,
    default: ''
  },
  trainDuring: {
    type: String,
    default: ''
  },
  createDate: {
    type: Date,
    default: Date.now()
  }
})) 

// training表
const TRIANING_SCHEMA = mongoose.model( 'epsFAETraining', new Schema({
  title: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    default: ''
  },
  machineNum: {
    type: String,
    default: ''
  },
  summarize: {
    type: String,
    default: ''
  },
  imgStart: {
    type: String,
    default: ''
  },
  imgStartDes:{
    type: String,
    default: ''
  },
  imgDoing: {
    type: String,
    default: ''
  },
  imgDoingDes:{
    type: String,
    default: ''
  },
  imgEnd: {
    type: String,
    default: ''
  },
  imgEndDes:{
    type: String,
    default: ''
  },
  completionTime: {
    type: String,
    default: ''
  },
  trainUser: {
    type: String,
    default: ''
  },
  guider: {
    type: String,
    default: ''
  },
  createUser: {
    type: String,
    default: ''
  },
  createTime: {
    type: Date,
    default: Date.now()
  }

})

)

// 数据库默认配置
// 取消消息提示
const CONNECT_CONFIG = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}

// 导出分类
exports.config = {
  DB_URL,
  MODEL_TRAIN_LIST,
  MODEL_USER,
  MODEL_TRAINING,
  USER_SCHEMA,
  TRAIN_LIST_SCHEMA,
  TRIANING_SCHEMA,


}
