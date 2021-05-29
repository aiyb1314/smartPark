const app = getApp();
import request from '../../utils/request'
Page({
  data: {
    current: 0,
    attitude: true,
    time: true,
    efficiency: true,
    environment: true,
    professional: true,
    code:1,
    carId: '',
    inputValue: '',
    userStars: [
      "../../static/images/assessment/redStar.png",
      "../../static/images/assessment/redStar.png",
      "../../static/images/assessment/redStar.png",
      "../../static/images/assessment/redStar.png",
      "../../static/images/assessment/redStar.png",
    ],
    wjxScore: 5,
    min: 5,//最少字数
    max: 300, //最多字数 (根据自己需求改变)
    pics: [],
  },

  starTap: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index; 
    var tempUserStars = this.data.userStars; 
    var len = tempUserStars.length; 
    for (var i = 0; i < len; i++) {
      if (i <= index) { 
        tempUserStars[i] = "../../static/images/assessment/redStar.png";
        that.setData({
          wjxScore: i + 1,
        })
      } else { 
        tempUserStars[i] = "../../static/images/assessment/grayStar.png"
      }
    }
    that.setData({
      userStars: tempUserStars
    })
  },

  
  label: function (e) {
    var that = this;
    that.setData({
      attitude: !e.currentTarget.dataset.index
    })
  },

  label1: function (e) {
    var that = this;
    that.setData({
      time: !e.currentTarget.dataset.index
    })
  },

  label2: function (e) {
    var that = this;
    that.setData({
      efficiency: !e.currentTarget.dataset.index
    })
  },

  label3: function (e) {
    var that = this;
    that.setData({
      environment: !e.currentTarget.dataset.index
    })
  },

  label4: function (e) {
    var that = this;
    that.setData({
      professional: !e.currentTarget.dataset.index
    })
  },
 
  inputs: function (e) {
    var value = e.detail.value;
    var len = parseInt(value.length);
    if (len > this.data.max)
    return;

    this.setData({
      currentWordNumber: len,
      inputValue: value
    });
  },
 
  choose: function (e) {//这里是选取图片的方法
    var that = this;
    var pics = that.data.pics;
    wx.chooseImage({
      count: 5 - pics.length, // 最多可以选择的图片张数，默认9
      sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
      success: function (res) {
        var imgsrc = res.tempFilePaths;
        pics = pics.concat(imgsrc);
        console.log(pics);
        that.setData({
          pics: pics,
        });
      },
    })
  },

  uploadimg: function () {//这里触发图片上传的方法
    var pics = this.data.pics;
    console.log(pics);
    app.uploadimg({
      url: 'https://........',//这里是你图片上传的接口
      path: pics//这里是选取的图片的地址数组
    });
  },

  onLoad: function (options) {
      console.log(options)
  },

  deleteImg: function (e) {
    var pics = this.data.pics;
    var index = e.currentTarget.dataset.index;
    pics.splice(index, 1);
    this.setData({
      pics: pics
    });
  },
  
  previewImg: function (e) {
    var index = e.currentTarget.dataset.index;
    var pics = this.data.pics;
    wx.previewImage({
      current: pics[index],
      urls: pics
    })
  },

  handleBtn(){
    let dic = {
        score: this.data.wjxScore,
        textValue: this.data.inputValue,
        pics: this.data.pics,
        stars: this.data.userStars,
        length: this.data.pics.length
    }
    wx.getStorage({
      key: 'user',
      success: res=>{
        dic.userInfo = res.data
      }
    })
    request('/userAssess',dic,'POST')
    .then(res=>{
      console.log(res)
    })
    
    if(this.data.code==1){
      wx.showToast({
        title: '评价成功',
        icon: 'succes',
        duration: 1500,
        mask: true,
        success:function(){
          setTimeout(function(){
            wx.navigateTo({
              url: '/pages/showAssess/showAssess?'
            })
          },1500)
        }
      });
    } 
  }
})