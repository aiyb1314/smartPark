// // var MongoClient = require('mongodb').MongoClient;
// // var url = "mongodb://localhost:27017/";
 
// // MongoClient.connect(url, function(err, db) {
// //     if (err) throw err;
// //     var dbo = db.db("smarkParking"); //连接Mongodb 
//     // var myobj =  [
//     //     { id: 1,price: 5,distance: 12,location: 3,img: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3225163326,3627210682&fm=26&gp=0.jpg'},
//     //     { id: 2,price: 3,distance: 11,location: 32,img: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimage1.nphoto.net%2Fnews%2Fimage%2F201307%2F084a057c5177ae78.jpg&refer=http%3A%2F%2Fimage1.nphoto.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1620995044&t=1e2bc00f5c10b2e1ba0e2901adabb4f9'},
//     //     { id: 3,price: 2,distance: 10,location: 13,img: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fs13.sinaimg.cn%2Fbmiddle%2F4d049168cc5e11e7fb13c&refer=http%3A%2F%2Fs13.sinaimg.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1620995044&t=ab7307292b8327521afdd8b458d548b6'}
//     //    ];
// //     dbo.collection("park").insertMany(myobj, function(err, res) {
// //         if (err) throw err;
// //         console.log("插入的文档数量为: " + res.insertedCount);
// //         db.close();
// //     });
// // });

// // var MongoClient = require('mongodb').MongoClient;
// // var url = 'mongodb://localhost:27017/runoob';
// // MongoClient.connect(url, function (err, db) {
// //     if (err) throw err;
// //     console.log('数据库已创建');
// //     var dbase = db.db("smarkParking");
// //     dbase.createCollection('park', function (err, res) {
// //         if (err) throw err;
// //         console.log("创建集合!");
// //         db.close();
// //     });
// // });

// // var MongoClient = require('mongodb').MongoClient;
// // var url = "mongodb://localhost:27017/";

// // var data
// // MongoClient.connect(url, function(err, db) {
// //     if (err) throw err;
// //     var dbo = db.db("smarkParking");
// //     dbo.collection("park"). find({}).toArray(function(err, result) { // 返回集合中所有数据
// //         if (err) throw err;
// //         // console.log(result);
// //         data = result
// //         db.close();
// //     });
// // });


let express = require('express')
let bodyParser = require('body-parser')
let app = express()
const https = require('https');
const request = require('request')


app.use(bodyParser.json())
var myobj =  [
    { id: 1,price: 5,distance: 12,location: 3,img: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=263309222,2798196468&fm=26&gp=0.jpg'},
    { id: 2,price: 3,distance: 11,location: 32,img: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fdpic.tiankong.com%2Fmp%2Fxa%2FQJ8167455339.jpg&refer=http%3A%2F%2Fdpic.tiankong.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1621343664&t=584faca627c224cd7fb5b7c17e7cdff5'},
    { id: 3,price: 2,distance: 10,location: 13,img: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fmpic.tiankong.com%2Fcf1%2Fe90%2Fcf1e9043f6d50a071b5bf7c3ab2edc55%2F640.jpg%40%21670w&refer=http%3A%2F%2Fmpic.tiankong.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1621343664&t=3703febeb422c3bcd4e1f17a64a9839f'}
   ];

var timelist =  {
    code:200,
    id: 1,
    priceList:
    [
        {price:'免费',time:'30min',carport:30},
        {price:'免费',time:'1hour',carport:30},
        {price:'2元',time:'2hour',carport:20},
        {price:'5元',time:'1天',carport:100},
        {price:'15元',time:'2天'},
        {price:'25元',time:'3天'},
        {price:'35',time:'4天'}],
    parkInfo:{
        id: 1,
        code: 200,
        img: ['https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fqcloud.dpfile.com%2Fpc%2FFckjykT2TbnNbgrb8hUhWRiRdFC9sJ_qZ3wLoe2d_ri1oo9IaTilO-QeTxH8qvI8TYGVDmosZWTLal1WbWRW3A.jpg&refer=http%3A%2F%2Fqcloud.dpfile.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1621343664&t=5539a0456486fc826a4109aed383fb66',
    'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Ffile.youboy.com%2Fa%2F56%2F24%2F16%2F7%2F3750567s.jpg&refer=http%3A%2F%2Ffile.youboy.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1621343664&t=619965200d0edf2fe15e5602770c1b7d',
'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fqcloud.dpfile.com%2Fpc%2FDJmyMZn8usngEcwnMJiVNstJhI1NpAAqi1h5EonA2uLYHjee-0LEhGpIHh8-GsN8TK-l1dfmC-sNXFHV2eRvcw.jpg&refer=http%3A%2F%2Fqcloud.dpfile.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1621343664&t=f2f6f696496f1a7eb9f2d8f68babc2cf'],
        title:'宣城市宣州区万达广场',
        price: 5,
        info: '值得来停车',
        location:{ latitude: '30.94622', longitude: '118.75634' }
      }
}


var orderList = 
{
    data:[ 
      {id:1,time: '2016-3-3 17:00:00',location:'安徽省宣城市宣州区万达停车场',cost:20,code:1,price: 12,rules:'每小时5元'},
      {id:2,time: '2032-4-4 23:43:54',location:'安徽省宣城市宣州区国购广场',cost:30,code:1,price: 12,rules:'每小时4元'},
      {id:3,time: '2032-4-4 23:43:54',location:'安徽省宣城市宣州区丽晶国际',cost:30,code:2,
      rules:'每小时4元'},
      {id:4,time: '2032-4-4 23:43:54',location:'安徽省宣城市泾县高铁站', cancelTime: '2032-3-4 21:03:43',cost:30,code:3},
      {id:5,time: '2032-4-4 23:43:54',location:'安徽省宣城市宣州区高铁站',cost:30,code:2,
      rules:'每小时5元'}
    ],
    code: 200
  }


  var orderInfo = {
    code: 200,
    data: {
      id:1,
      username: 'xj',
      telphone: '188xxxxxxxxx',
      startposition: '安徽省宣城市宣州区合肥工业大学宣城校区',
      lastposition: '安徽省宣城市宣州区万达广场',
      orderId: 32232,
      orderTime: '2021-2-4 11:30:32',
      parkTime: '3hour 40min 30second',
      payTime: '2021-2-4 14:30:45',
      price: '5元/小时',
      totalPrice:'15元',
      actPrice: '15',
      statuscode: 1
    }
  }


app.post('/park',(req,res)=>{
    console.log(req.body)
    res.json(myobj)
})

app.get('/Cpark/timeList',(req,res)=>{
    res.json(timelist)
})

app.post("/Cpark/timeList",(req,res)=>{
    let body = req.body
    body.id = orderList.data[orderList.data.length-1].id + 1
    orderList.data.push(body)
    res.end('ok')
})

app.post("/order",(req,res)=>{
     res.json(orderList)
})

app.get("/order/lock",(req,res)=>{
    request(`http://127.0.0.1:8000?parkid=${req.query.parkId}`, function (err, response, body) {
      if (!err && response.statusCode == 200) { 
        console.log(response)
      }
    })
    res.json({code:200,msg: 'successful'})
})

app.get("/Cpark/stopTime",(req,res)=>{
    let num = req.query.id
    if(orderList.data[num-1]){
        orderList.data[num-1].cancelTime = req.query.time
        orderList.data[num-1].code = 3
    }
    res.end('ok')
})

app.get('/showDetail',(req,res)=>{
    console.log(req.query)
    res.json(orderInfo)
})

app.listen(3000,()=>{
    console.log('connect waiting...')
})

// let app = require('express')()

// app.get('/',(req,res)=>{
//   console.log(new Date())
//   res.end('ok')
// }).listen(8000,()=>{
//   console.log('connect waiting')
// })