// 跨域请求配置
const cors = (app) => {
  app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    // 注意理解這裡的配置需要把header 也設置為*
    // res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Content-Type', 'application/json;charset=utf-8');
    next();
  });
}
module.exports = cors