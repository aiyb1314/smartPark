// pages/play_time/play_time.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageList:[1,2,3],
    clientHeight:''
  },

  toMusic: ()=>{
      wx.navigateTo({
        url: '/pages/index/index',
      })
  },

  toVideo:()=>{
    wx.navigateTo({
      url: '/pages/mv/recommend/recommend',
    })
  },
  
  toTalk:()=>{
    wx.navigateTo({
      url: '/pages/weather/weather',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    wx.getSystemInfo({
      success: function (res) {
      that.setData({
      clientHeight: res.windowHeight / 3.5});}})
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