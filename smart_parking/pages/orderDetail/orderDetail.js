// pages/orderDetail/orderDetail.js
import request from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    uerinfo: '',
    orderInfo: ''
  },
  goToAssess(){
    wx.navigateTo({
      url: '/pages/showAssess/showAssess',
    })
  },
  call(){},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      let that = this
      let user = wx.getStorage({
        key: 'user',
        success: (res)=>{
          request('/showDetail',{orderId: options.id, user: res.data.nickName})
          .then(res=>{
            if(res.code === 200){
              that.setData({
                orderInfo: res.data
              })

              console.log('showDetail',res)
            }
          })
        }
      })
      
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
      
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})