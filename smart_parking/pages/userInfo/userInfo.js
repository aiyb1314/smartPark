// pages/userInfo/userInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      userInfo: '',
      array: ['男','女'],
      index: 0,
      editCard: false,
      carCard: '',
      province: ['京', '沪', '粤', '津', '冀', '晋', '蒙', '辽', '吉', '黑','苏', '浙', '皖', 
      '闽', '赣', '鲁', '豫', '鄂', '湘','桂', '琼', '渝', '川', '贵', '云', '藏',
      '陕', '甘', '青', '宁', '新'],
      pindex: 0,
      num: {id:-1,
        numlist:[
          {}
        ]
      },
      numCard: [0,1,2,3,4,5,6,7,8,9,'Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','Z','X','C','V','B','N','M']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  updateImg(){
    let that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success (res) { 
        let dic = that.data.userInfo
        dic.avatarUrl = res.tempFilePaths
        wx.showModal({
          content: '受否确定更改头像',
          success: res=>{
            that.setData({
              userInfo: dic
            })
          }
        })
      }
    })
  },

  getNickName(e){
    let user = this.data.userInfo
    user.nickName = e.detail.value
    this.setData({
      userInfo: user
    })
  },

  getIntro(e){
    let user = this.data.userInfo
    user.intro = e.detail.value
    this.setData({
      userInfo: user
    })
  },

  bindPickerChange(e){
    let usr = this.data.userInfo
    usr.sex = e.detail.value
    this.setData({
      userInfo: usr
    })
  },

  provinceChange(e){
    let dic = this.data.num
    dic.numlist[6] = {}
    dic.numlist[6].id = -1
    dic.numlist[6].title = e.detail.value
    this.setData({
      num: dic,
      pindex: e.detail.value
    })
  },

  editCard(){
    this.setData({
      editCard: !this.data.editCard
    })
  },

  keyboard(e){
    let dic = this.data.num
    dic.id = e.currentTarget.dataset.id
    this.setData({
      num: dic,
    })
  },

  getTitle(e){
    let dic = this.data.num
    let id = this.data.num.id
    dic.numlist[id] = {}
    dic.numlist[id].title = e.currentTarget.dataset.id
    dic.numlist[id].id = id
    dic.id += 1
    this.setData({
      num: dic
    })
  },

  submit(e){
    let tag = true
    let dic = this.data.num.numlist
    if(dic.length < 7){
      tag = false
      wx.showToast({
        title: '车牌未填写完整',
        icon: 'error',
        duration: 2000
      })
    }

    if(tag){
      let car = dic[6].title
      for(let i=0 ; i < 6; i++){
          car +=dic[i].title
      }
      let userinfo = this.data.userInfo
      if(userinfo.car)
        userinfo.car.push(car)
      else{
        userinfo.car = []
        userinfo.car.push(car)
      }
      this.setData({
        editCard: false,
        carNum: car,
        userInfo:userinfo
      })
    }
    
  },

  onLoad: function (options) {
      wx.getStorage({
        key: 'user',
        success: (res)=>{
            this.setData({
              userInfo: res.data
            })
        }
      })
      let dic = this.data.num
      dic.numlist[6] = {}
      dic.numlist[6].id = -1
      dic.numlist[6].title = '京'
      this.setData({
        num: dic
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
    let that = this
    
    wx.showModal({
      content: '是否保存修改的内容',
      success: res=>{
        wx.setStorage({
          data: that.data.userInfo,
          key: 'user',
        })
      }
    })
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