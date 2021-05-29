import request from '../../utils/request'
Page({
    data:{
      sortList: ['环境卫生','非常方便','强烈推荐','服务态度','操作难易','出错'],
      assessList:['dsad','das'],
      num: 1,
      click: false,
      choseId: 0,
      carId: '',
      userAssess: [],
      height: 450,
    },

    choseClick(e){
      console.log(e.currentTarget.dataset.id)
    },

    toassess(){
      console.log('->',this.data.carId)
      wx.navigateTo({
        url: '/pages/assessment/assesment?carId='+1,
      })
    },

    clickZan(){
      if (this.data.click){
        this.setData({
          click:false,
          num: this.data.num - 1
        })
      }
      else{
        this.setData({
          click:true,
          num: this.data.num + 1
        })
      }
    },

    orderAgain(){
      wx.navigateTo({
        url: '/pages/checkParking/checkParking',
      })
    },

    onLoad(options){
      request('/userAssess',{parkId:1})
      .then(res=>{
          this.setData({
            userAssess: res
          })
          
      })
      this.setData({
        carId: options.parkId
      })
    },

    onHide(){
      wx.navigateTo({
        url: 'pages/home/home',
      })
    },

})