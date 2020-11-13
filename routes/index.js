const express = require('express')
const router = express.Router()
const {db} = require('../db/index')
const {cryptoPWD} = require('../utils/encrypt')
const {generateToken, validateToken} = require('../utils/token')
const multer = require('multer')
const fs = require('fs')
const host_address = 'http://123.207.42.169:3000/upload/'
// const host_address = 'http://localhost:3000/upload/'
var upload = multer({
  dest: './public/uploads'
})


// 增加一個用戶
router.post('/eps/user/addUser', async (req, res) =>{
  // console.log(req.body)
  let {username, depart} = req.body
  let data = await validateToken(req.headers.authorization)
  if (data.name === 'root') {
    let state = await db.user.findUserExist(username)
    if(state === 'ok'){
      res.send('exist')
    }else {
      let userState = await db.user.addUser(username,cryptoPWD('msi@123'),depart,generateToken(username))
      if(userState) {
        res.send('ok')
      }else {
        res.send('')
      }
    }
  }else {
    res.send('')
  }
})

// 所有用户信息
router.get('/eps/user/info',  async (req, res) =>{
  let data = await db.user.getAllUserInfo()
  res.send(data)
})

// 刪除用戶
router.post('/eps/user/delete',  async (req, res) =>{
    validateToken(req.headers.authorization).then((data) => {
     if (data.name === 'root') {
        let {_id,username} = req.body
        // console.log(_id)
        db.user.deleteItem(_id, username).then(data => {
          res.send(data)
        })
     } else {
       return ''
     }
  })
})



// 用户登陆
router.post('/eps/user/login', async (req, res) =>{
  let {username, password} = req.body
  // console.log(password)
  let newToken = generateToken(username)
  // console.log(newToken)
  let data = await db.user.findUser(username, cryptoPWD(password))
  // console.log(data)
  if (data){
    let newdata = await db.user.userUpdate(username,newToken)
    if (newdata === 'ok') {
      return res.send(Object.assign({},data,{token: newToken}))

    } else if (newdata === 'no_ok') {
      res.send('no_ok')
    }else {
      res.send('error')
    }
  }else {
    res.send(data)
  }

})


// 查詢trainList title, requiro ,guider ,depart ,creator ,createDate
router.get('/eps/fae/trainlist/find',(req, res) => {
  let {skip,limit,dateArray} = req.query
  let trainListDateArray = JSON.parse(dateArray)
  // console.log(req.query)
  db.trainList.findTrainList(skip, limit,trainListDateArray)
  .then((data) => {
    res.send(data)
  })
})


// 新增title, requiro ,guider ,depart ,creater , trainOwner, trainDuring, createDate
router.post('/eps/fae/trainlist/add', async(req, res) => {
  let craeteDate = Date.now()
  let {title, requiro ,guider ,creater ,trainOwner, trainDuring,} = req.body
  let data = await validateToken(req.headers.authorization)
  if (data.name) {
    let {depart} = await db.user.findUserExist(creater)
    let state = await db.trainList.addTrainList(title, requiro ,guider ,depart, creater, trainOwner, trainDuring, craeteDate)
    if (state == 'ok') {
      res.send('ok')
    } else {
      res.send('error')
    }
  }else {
    res.send('')
  }
})

// 删除一个  trainList
router.post('/eps/fae/trainlist/delete',(req, res) => {
  let {_id,username} = req.body
  // console.log(_id)
  db.trainList.deleteItem(_id, username).then(data => {
    res.send(data)
  })
})



// 查詢training title status  summarize  imgStart imgStartDes imgDoing imgDoingDes imgEnd imgEndDes trainUser completionTime  guider createUser createDate
router.get('/eps/fae/training/find',(req, res) => {
  let {skip,limit,dateArray} = req.query
  let trainListDateArray = JSON.parse(dateArray)
  // console.log(req.query)
  db.training.findTraining(skip, limit,trainListDateArray)
  .then((data) => {
    res.send(data)
  })
})

// 查詢training title status  summarize  imgStart imgStartDes imgDoing imgDoingDes imgEnd imgEndDes trainUser completionTime  guider createUser createDate
router.get('/eps/fae/training/findAll',(req, res) => {
  let {dateArray} = req.query
  let trainListDateArray = JSON.parse(dateArray)
  // console.log(req.query)
  db.training.findTrainingAll(trainListDateArray)
  .then((data) => {
    res.send(data)
  })
})


// 新增title ,status  ,summarize , imgStart, imgStartDes, imgDoing, imgDoingDes, imgEnd, imgEndDes, trainUser, completionTime,  guider, createUser ,createDate
router.post('/eps/fae/training/add', async(req, res) => {
  let createDate = Date.now()
  let {title ,status  ,machineNum ,summarize , imgStart, imgStartDes, imgDoing, imgDoingDes, imgEnd, imgEndDes, trainUser, completionTime,  guider, createUser } = req.body
  let data = await validateToken(req.headers.authorization)
  if (data.name) {
    // let {depart} = await db.user.findUserExist(creater)
    let state = await db.training.addTraining(title ,status  ,machineNum ,summarize ,host_address+ imgStart, imgStartDes,host_address+ imgDoing, imgDoingDes, host_address + imgEnd, imgEndDes, trainUser, completionTime,  guider, createUser ,createDate)
    if (state == 'ok') {
      res.send('ok')
    } else {
      res.send('error')
    }
  }else {
    res.send('')
  }
})

// 更新  training
router.post('/eps/fae/training/update',(req, res) => {
  let {_id,updateData} = req.body
  // console.log(_id)
  db.training.updatedItem(_id,updateData).then(data => {
    console.log(data)
  })
  // db.training.deleteItem(_id, username).then(data => {
  //   res.send(data)
  // })
})



// 删除一个  training
router.post('/eps/fae/training/delete',(req, res) => {
  let {_id,username} = req.body
  // console.log(_id)
  db.training.deleteItem(_id, username).then(data => {
    res.send(data)
  })
})











// 处理文件上传
router.post('/image/upload',upload.single('image') ,(req,res) => {
  let now_date = Date.now()
  fs.rename(req.file.path, "public/upload/" + req.file.filename+ now_date+'.png', function(err) {
    if (err) {
       res.send({
         state: 'error'
       })
        throw err;
    }else {
      res.send({
        state: 'ok',
        url: req.file.filename+ now_date+'.png'
      })
    }
})
})





// define the about route
router.get('/about', function (req, res) {
  res.send('About birds')
})

// router.all('*', (req, res) => {
//   res.send("對不起你")
// })

module.exports = router