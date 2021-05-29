// pages/confirm/confirm.js
import request from '../../utils/request'

Page({

  /**
   * 页面的初始数据
   */

  data: {
      showIcon: 'icon-xuanze',
      choseTrue: false,
      orderInfo: '',
      show: false
  },
  
  choseItem(){
    let show = this.data.choseTrue
    let showIcon
    if (show){
      showIcon = 'icon-xuanze'
    }
    else
      showIcon =   'icon-xianshi_xuanze'

    this.setData({
      choseTrue: !this.data.choseTrue,
      showIcon: showIcon
    })
  },
  showRules(){
    this.setData({
      show: !this.data.show
    })
  },
  submitOrder(){
    wx.showModal({
      content:'是否确定提交预约订单',
      success: res=>{
        if(res.confirm){
            let dic =  {time: this.data.orderInfo.orderTime,location:this.data.orderInfo.lastposition,cost:10,code:2,rules:'每小时5元'}
            request('/orderComfirm',dic,'POST')
            wx.redirectTo({
              url: '/pages/checkParking/checkParking?order='+true,
            })
        }
        else{
          wx.showToast({
            title: '提交失败',
            icon: 'error'
          })
        }
        
      },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      request('/orderComfirm',{userID: 1})
      .then(res=>{
        console.log(res)
          this.setData({
            orderInfo: res
          })
      })
  },

  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },


})