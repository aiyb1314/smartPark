import config from './config'
export default  (url, data={}, method='GET') => {
  wx.showLoading({
    title: '正在加载',
    mask: true
  })
  return new Promise((resolve, reject) => {
    wx.request({
      url: config.host + url,
      data,
      method,
      success: (res) => {
        if(data.isLogin){// 登录请求
          // 将用户的cookie存入至本地
          wx.setStorage({
            key: 'cookies',
            data: res.cookies
          })
        }
        resolve(res.data);
      },
      fail: (err) => {
        reject(err); 
      },
      complete:()=>{
          setTimeout(()=>{wx.hideLoading()},Math.ceil(Math.random()*200))
      }
    })
  })
  
}
