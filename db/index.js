const {user} = require('./user')
const {trainList} = require('./trainList')
const {training}= require('./training')
exports.db= {
  user,
  trainList,
  training
}