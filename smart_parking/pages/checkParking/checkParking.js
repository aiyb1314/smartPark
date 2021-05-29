import request from '../../utils/request'
import getRouter from '../../utils/getRouter'

Page({
  data: {
    timeList: '',
    parkInfo: '',
    location: '',
    clientHeight: '',
    action: true,
    timeId: '',
    time: '',
    calculate: ['1、停车每小时五元;','2、若停车场车位未满，预约不收取费用;','3、车位若满，而预约还没结束，按停车标准收费;'],
    ruleshow: true,
    price_time: '',
    clickId: 0
  },

  orderParking(){
    let dic = {
      price_time: this.data.price_time.time,
      orderTime: new Date().toLocaleString()
    }
    
    wx.showModal({
      title: '预约',
      content: '是否确定预约',
      success (res) {
        if(res.confirm){
          request('/checkParking/orderTime',dic)
          wx.navigateTo({
          url: '/pages/confirm/confirm',
        })
        }   
    }    
  })
  },

  stopTime(){
    var that = this
    wx.showModal({
      title: '预约',
      content: '是否取消预约',
      success (res) {
        if(res.confirm){
          clearInterval(that.data.timeId)
          that.setData({
            time: '',
            action: true
          })
          request('/Cpark/stopTime',{id:6,time: new Date().toLocaleString()})
        }
      }
    })
   
  },

  checkAllAssess(e){
    let carId = e.currentTarget.dataset.id.id
    wx.navigateTo({
      url: '/pages/showAssess/showAssess?carId='+ carId,
    })
  },

  showRule(){
    this.setData({
      ruleshow: !this.data.ruleshow
    })
  },

  getTime(e){
    this.setData({
      price_time: e.currentTarget.dataset.time,
      clickId: e.currentTarget.dataset.id
    })
  },

  getLocation(){
    getRouter('宣城市万达广场',30.936416,118.738808);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
      if(options.order === "true"){
        var num = 0
        let orderTime = this.data.price_time
        console.log(orderTime,'order')
        if(orderTime == '30min')
          num = 30*60
        else
          num = 60*60
        that.setData({
              action: false
        })
        let id = setInterval(function(){
          let tmp = num
          let hour =  parseInt(num / 3600)
          let minute = parseInt((num /60)%60)
          while(tmp >= 60){
              tmp %= 60
          }
          let second = parseInt(tmp)
           num--;
            that.setData({
                time: `${hour}:${minute}:${second}`
            })
          },1000)
          
          that.setData({
            timeId: id
          })
        } 

      request('/Cpark/timeList',{id: options.id})
      .then(res=>{
        if(res.code == 200){
          console.log(res)
          that.setData({
            timeList: res,
            price_time: res.priceList[0],
            parkInfo: res.parkInfo,
            location: res.parkInfo.location
          })
        }
      })
  },

  bindDateChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
      let that = this
      wx.getSystemInfo({
        success: (result) => {
            that.setData({
              clientHeight: result.windowHeight / 3.5
            })          
        },
      })
  },

})