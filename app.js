//  app.js 首页
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = require('./routes/index')  //  引入路由
const cors = require('./cors')
const config = require('./config')

// 設置靜態目錄
app.use(express.static(__dirname+ '/public'))
//设置跨域访问
cors(app)
// 解析post请求和json
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extends: true}));
//  使用路由 /index 是路由指向名称
app.use(router)
// 服务器启动
app.listen(config.run_host,() => {console.log(`server is start on port ${config.run_host}`)})