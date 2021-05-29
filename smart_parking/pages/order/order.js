import request from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  // ['全部','当前状态','待付款','未到达','已完成']
  data: {
      list: ['全部','待付款','未成功','已完成'],
      choseId: 0,
      ready: true,
      actHeight: '1200rpx',
      current: 0,
      allinfo: '',
      allArr: [],
      windowHeight: 0
  },
 
  choseItem(e){
    let id = e.currentTarget.dataset.id
    let ready = true;
    if(this.data.allArr[id] == []){
      ready = false
    }

    this.setData({
      choseId: id,
      current: id,
      ready:ready
    })
  },

  getData(){
    wx.request({
      url: 'http://127.0.0.1:8000',
      success(res){
      }
    })
  },

  again(){
    wx.navigateTo({
      url: '/pages/packing/packing',
    })
  },

  pay(){
    wx.showModal({
      title: '是否立即支付',
      success (res) {
        if (res.confirm) {
          wx.showToast({
            title: '支付成功',
            mask:true
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  showDetail(e){
    console.log(e.currentTarget)
    wx.navigateTo({
      url: '/pages/orderDetail/orderDetail?id=' + e.currentTarget.dataset.id,
    })
  },

  currentchange(e){
    this.setData({
      choseId: e.detail.current
    })
  },

  getLoadInfo(){
    let data = this.data.allinfo
    let complete = []
    let noarrive = []
    let waitpay = []
    let arr = []
    if(data.code == 200){
      for(let i of data.data){
        if(i.code == 1){
          i.code = '已完成'
          complete.push(i)
        }
        else if(i.code == 2){
          i.code = '正在进行'
          waitpay.push(i)
        }
        else{
          i.code = '已取消'
          noarrive.push(i)
        }
      }
      arr.push(data.data)
      arr.push(waitpay)
      arr.push(noarrive)
      arr.push(complete)
      // console.log( this.data.windowHeight*2 + (data.data.length-4)*274*2+'rpx')
      this.setData({
        ready: true,
        allinfo: data,
        allArr: arr,
        actHeight: this.data.windowHeight*2 + (data.data.length-4)*274+'rpx'
      })
    }
   
    else{
      this.setData({
        ready: false
      })
    }
  },

  flushOrder(){
    var that = this
    wx.getStorage({
     key: 'user',
     success:res=>{
       request('/order',{username: res.data.nickName},'POST')
       .then(res=>{
         that.setData({
           allinfo: res
         })
         this.getLoadInfo()
       })
     },
     fail:(err)=>{
       wx.navigateTo({
         url: '/pages/login/login',
       })
     }
   })
  },
  
  showmyModal(){
    wx.showModal({
      cancelColor: '',
      title: '开锁成功'
    })
  },

  lock(){
    let that = this
    wx.showModal({
      title: '是否开锁',
      success (res) {
        if (res.confirm) {
          request('/order/lock',{parkId: 10})
          .then(res=>{
            if(res.code == 200){
              that.showmyModal()
            }  
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      wx.getSystemInfo({
        success:(res)=>{
          this.setData({
            actHeight: res.windowHeight + 'px',
            windowHeight: res.windowHeight
          })
        }
      })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.flushOrder()
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
      // this.flushOrder()
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