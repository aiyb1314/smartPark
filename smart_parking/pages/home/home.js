// pages/test/test.js
import getRouter from '../../utils/getRouter'

const plugin = requirePlugin('routePlan');
let QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
var qqmapsdk = new QQMapWX({
    key: 'U4KBZ-X5IWU-AWHV2-BTWHP-GQ6IH-TPFRX' 
});
 

Page({
  data: {
    backfill: {},
    objItem: ['现在','预约','扫码'],
    addId: 0,
    startLocation:'',
    country: '',
    sugData: '' ,
    weatherData: '',
    toLocation:{},
    markers: '',
    click: false,
    scanCode:'',
  },
  
 getLocation(){
    getRouter(this.data.backfill.title,this.data.backfill.latitude,this.data.backfill.longitude);
 },

 backfill: function (e) {
  var id = e.currentTarget.id;
  console.log(id)
  for (var i = 0; i < this.data.suggestion.length;i++){
    if(i == id){
      console.log(this.data.suggestion[id])
      this.setData({
        backfill: this.data.suggestion[i]
      });
    }  
  }
},

//触发关键词输入提示事件
  getsuggest: function(e) {
    var _this = this;
    //调用关键词提示接口
    qqmapsdk.getSuggestion({
      keyword: e.detail.value, //用户输入的关键词，可设置固定值,如keyword:'KFC'
      region:  this.data.markers.address_component.city, //设置城市名，限制关键词所示的地域范围，非必填参数
      success: function(res) {//搜索成功后的回调
        var sug = [],flag = true;
        for (var i = 0; i < res.data.length; i++) {
          sug.push({ // 获取返回结果，放到sug数组中
            title: res.data[i].title,
            id: res.data[i].id,
            addr: res.data[i].address,
            city: res.data[i].city,
            district: res.data[i].district,
            latitude: res.data[i].location.lat,
            longitude: res.data[i].location.lng
          });
        }
  
        if (e.detail.value.length != 1){
          flag = false
        }
        _this.setData({ //设置suggestion属性，将关键词搜索结果以列表形式展示
          suggestion: sug,
          // click: false,
          click: flag
        });
      }
    });
  },

  clickDisplay(){
      this.setData({
        click:true
      })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  addClass:function(res){
      this.setData({
        addId: res.currentTarget.dataset.id
      })
  },
  
  changeId(e){
    this.setData({
      addId: e.detail.current
    })
  },
  
  orderCarPort(){
    wx.navigateTo({
      url: '/pages/packing/packing',
    })
  },

  toParking(){
      wx.getStorage({
        key: 'user',
        success:res=>{
          wx.navigateTo({
            url: `/pages/packing/packing?latitude=${this.data.latitude}&longitude=${this.data.longitude}`,
          })
        },
        fail:err=>{
          wx.navigateTo({
            url: '/pages/login/login',
          })
        }
      })

     
  },

  scanCodeEvent: function(){
    var that = this;
    wx.scanCode({
      success(res){
        wx.request({
          url: res.result,
          success: res=>{
            console.log(res)
          }
        }) 
      },
      fail: err=>{
        console.log(err)
      }
    })
  },

  onReady: function () {
    wx.getLocation({
      success:(res)=>{
        this.setData({
          latitude:res.latitude,
          longitude:res.longitude
        })
      }
  })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
      let _this = this
      qqmapsdk.reverseGeocoder({
        location:'',
        success: function(res) {//成功后的回调
          let sl = {}
          sl.address = res.result.address
          sl.location = res.result.location
          _this.setData({
            markers: res.result,
            backfill: {},
            startLocation: sl
        })
      },
      fail(res){
        console.log(res);
      }
  })
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