// pages/packing/packing.js
import request from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    parkingsInfo: [{id: 1, price: 5,distance: '20km', location: 20, 
    img: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20191213%2F4ec787f1d50c4822a52861cea19ad68d.jpeg&refer=http%3A%2F%2F5b0988e595225.cdn.sohucs.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1620478562&t=9196b830f25a322db80d952bc6cb828f', title: '宣城市宣州区万达广场'},
    {id: 2, price: 15,distance: '23km', location: 8, 
    img: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fi.serengeseba.com%2Fuploads%2Fi_4_1934562715x187896159_15.jpg&refer=http%3A%2F%2Fi.serengeseba.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1620478562&t=e1dc148cb2b46dcfdc619aecce156921', title: '宣城市宣州区万达广场'},
    {id: 1, price: 5,distance: '20km', location: 20, 
    img: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20191213%2F4ec787f1d50c4822a52861cea19ad68d.jpeg&refer=http%3A%2F%2F5b0988e595225.cdn.sohucs.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1620478562&t=9196b830f25a322db80d952bc6cb828f', title: '宣城市宣州区万达广场'},
    {id: 2, price: 15,distance: '23km', location: 8, 
    img: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fi.serengeseba.com%2Fuploads%2Fi_4_1934562715x187896159_15.jpg&refer=http%3A%2F%2Fi.serengeseba.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1620478562&t=e1dc148cb2b46dcfdc619aecce156921', title: '宣城市宣州区万达广场'},
    {id: 1, price: 5,distance: '20km', location: 20, 
    img: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20191213%2F4ec787f1d50c4822a52861cea19ad68d.jpeg&refer=http%3A%2F%2F5b0988e595225.cdn.sohucs.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1620478562&t=9196b830f25a322db80d952bc6cb828f', title: '宣城市宣州区万达广场'},
    {id: 2, price: 15,distance: '23km', location: 8, 
    img: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fi.serengeseba.com%2Fuploads%2Fi_4_1934562715x187896159_15.jpg&refer=http%3A%2F%2Fi.serengeseba.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1620478562&t=e1dc148cb2b46dcfdc619aecce156921', title: '宣城市宣州区万达广场'},
  
  ],
    clientHeight: '',
    windowHeight: ''
  },

  toOrder(e){
    wx.navigateTo({
      url: `/pages/checkParking/checkParking?id=${e.currentTarget.dataset.id}`,
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
      clientHeight: res.windowHeight / 7,
      windowHeight: res.windowHeight
    });}})

    request('/park',{
          latitude: options.latitude,
          longitude: options.longitude,},'POST')
    .then((res)=>{
      that.setData({
        parkingsInfo:res
      })
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