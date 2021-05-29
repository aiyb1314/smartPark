module.exports = function getRouter(title,latitude,longitude,startLocation=''){
  const key = 'U4KBZ-X5IWU-AWHV2-BTWHP-GQ6IH-TPFRX'; //使用在腾讯位置服务申请的key
  const referer = 'helloworld'; //调用插件的app的名称
  let endPoint = JSON.stringify({  //终点
   'name': title,
   'latitude':  latitude,
   'longitude': longitude
 });

 wx.navigateTo({
   url: 'plugin://routePlan/index?key=' + key + '&referer='
       + referer + '&endPoint=' + endPoint +'&navigation='+1
});
}