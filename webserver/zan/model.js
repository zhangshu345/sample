const hzHuoshan = require("e:/文档/wechat files/wxid_jjphr89pnc0n22/filestorage/file/2020-09/999/hzhuoshan")

var task={
    id:0, //任务数字的
    state:0,// 0草稿 1 未执行的任务 2 未完成的任务 3 已经完成的任务  
    level:0, //任务的等级 只有 高于改任务等级的用户才能做此任务   在底价任务很多的时候 高价任务 全是押金用户的 任务 自动设置任务数 
    platform:1,// 1抖音 2抖音极速 3 抖音火山版   4快手 5 快手极速版 6 
    pay:{sum:0.5,
        order:0.1,//关注的单价
        like:0.05,//点赞的单价
        liken:3,//点赞的数量
        likesum:0.15,//点赞的单价
        message:0.05,//私信的单价
        messagen:6,//私信的数量
        messagesum:0.3,//私信的单价
        search:0.05,//搜索的单价
        searchn:6,//搜索的数量
        searchsum:0.3,//搜索总得出价
        location:0.01,//位置过滤的服务费
        userfiter:0.01//用户过滤的服务费
    },
    desc:"任务的描述",
    type:1,// 1关注 2 点赞 3 评论 4 私信 搜索  组合起来就是 0001 0011 0111 1111  
    order:true,  //动作 关注
    like:true,  //动作 点赞
    message:true,  //动作 私信
    comment:true,  //动作 评论
    search:true,  //动作 搜索
    location:true, // 顶点位置投放
    city:[{city:"北京",x:0.01,y:112,l:1}],//位置 根据城市定位
    userfiter:true,
    userstate:{gender:0,//0 未知 随便 1男 2女 3隐藏
        age:{min:10,max:30},
        likes:["美女","电影","吃货"],
        works:{min:0,max:20,
            keys:["作品关键词1","作品关键词"]//作品的关键词,也算是领域吧
       },
       liked:10000, //用户作品被点赞数
       liken:{min:1000,max:20000},//用户点赞作品的数量
       likern:{min:1000,max:3000},//用户关注的人数
    }
    ,
    price:0.50,  //用户出价 竞价词 凭条只提供底价 买家 用户溢价 可以保证 最快的时候去完成任务   也可以 给用户弄用户等级 保证金 做高价任务 保证 每日点赞数量少页比 点赞多来的钱多 平台 可以保证钱再平台不外流  取消押金 取消等级 取消高价任务的资格 
    search:"搜索关键词",
    author:{id:"用户的id和标识号",nickname:"用户的昵称",userurl:"可以直接跳转的用户主页",
    message:true,
    messagewords:["私信内容1","私信内容2","私信内容3","私信内容4"]
    },
    video:[{title:"视频的标题",
    liketime:6,            //点赞的时间点
    time:15,               //视频总长 
    summary:"视频的摘要",
    url:"可以直接跳转到url",  //
    search:"搜索的关键词 可以找到作品的关键词 ",
    comment:true,
    like:true,
    commentwords:["评论1","评论2","评论3"]
    },
    {title:"视频的标题",
    summary:"视频的摘要",
    url:"可以直接跳转到url",
    search:"搜索的关键词 可以找到作品的关键词 ",
    comment:true,
    like:true,
    commentwords:["评论1","评论2","评论3"]
    }
    ]
}
var user={
    id:0,  //用户的递增 
    username:"用户名",
    passsword:"账号密码",
    devices:[{
        id:1,logintime:"2020.05.06-23:23:24",
        deviceid:"一个设备码",
        token:"12345678abcdefgh123456",
        endtime:"2020.06.06-23:23:24" //有效登录事件  要是做用户的分级 就可以 更加用户的等级设置有效事件
    }],
    zhifubao:{name:"姓名",account:"账号"},
    level:0, //用户的等级    根据邀请做任务的人数 也就是手底下的机子数和押款多少来 划分  30台以上一星客户  100台以上二星客户  300台以上三星 客户 100台加押金 5000 升级为三星客户
    summoney:10000,//总提现金额
    money:3, //当前账号可提现余额
    state:0,//账号状态 0正常 1 有过作弊 2 冻结 3 停止支付   4 停止做任务
    createtime:"2018-08-06",//创建的时间
    updatetime:"2018-08-06",//更新
    gender:0,  
    age:15,
    kuaishou:[{id:"用户id",nickname:"",userurl:"用户主页",liked:1000,videon:6,liken:6000,likern:452,likes:["美女","帅哥"]}],
    douyin:[{id:"用户id",nickname:"",userurl:"用户主页",liked:1000,videon:6,liken:6000,likern:452,likes:["美女","帅哥"]}],
    kuaishoujisu:[{id:"用户id",nickname:"",userurl:"用户主页",liked:1000,videon:6,liken:6000,likern:452,likes:["美女","帅哥"]}],
    hzHuoshan:[{id:"用户id",nickname:"",userurl:"用户主页",liked:1000,videon:6,liken:6000,likern:452,likes:["美女","帅哥"]}]
}


var usertask={
    id:1,// 用户的任务数的递增
    username:"zhangshu",  //指向用户名
    level:0,  //任务的等级
    device:"",  //做任务的 内容
    time:"",  //做任务的时间
    task:1770,  //做的任务的指向
    taskinfo:"",
    state:0,    //0 未完成 1完成  2审核中 3 审核通过 4 待结算 5 结算完成 
    checker:"",
    checkresult:[{content:"截屏补全无法看清",result:false},{content:"",result:false}]
}



var code={
    user:"zhanghsu",
    task:"",
    time:"",
    checker:"",
}


/***微信 互赞 互相 求关注平台 发布自己的内容和点赞链接到微信小程序
 *   微信小程序去下单  微信小程序去接单  不行 就只是好推广  推广引流在其他平台  
 *  先做一个简单版本  可以对外出售的 当然可以做成 
 */

/**
 * 任务审核标准  上传的数据完整   任务的完成程度  任务的等级 用户的状态  
 * 
 */

/**
 * 押金管理办法: 随时可退 审核 三天 ， 审核成功就停止 等级  审核结束之前等级 不变  等级变了之后清退  
 * 一旦提交了审核退款 成功 就必须停止高等级的任务 一旦有高等级任务在执行就必须等最后一个高等级任务 的完成周期结束  
 * 还必须是改账号不能结算和 接收新任务  
 * 提交期到审核成功之间的任务的数量差额  任务差额清算成功 和结算完成
 *  在十五天之后 清点任务完成程度 任务点赞和关注被取消了 就扣减费用  退款
 *  在三十天内完成 
 *状态   提交--》审核中--》 审核成功--->任务清算中---》任务清算完成---》完成任务差额结算----》用户同意退款----》退款完成
 *                                                                                                 ----用户申诉 ----》申诉核实----》 退款完成            
 */


//需要一个检测用户任务的脚本 来给出报价 和预计单个动作完成任务时间 和完整任务完成时间  和预计任务完成的时间   和

//价格检测  一个价格表格

/*任务应该是一个静态的读取文件  定时更新  可以是任务更新了就更新静态的文件缓存  任务完成了就删除 更新任务 
 用户下载任务： 
列表到本地 自己判断自己的属性是否符合符合任务的邀请就开始进行任务
可以  做了任务会不会超标的问题 可以先    必须通过平台单个任务分发这种吗 ： 一次性分发任务    和每次获取任务 
用户做个选择 就是 可以 一次多领任务 但是要根据一定的时间间隔去更新任务 和上报任务  好处是可以抢到更多的任务 不过就是任务不一定结算 因为任务可能已经被执行完了  
可以 在执行任务的时候去请求一下任务的完成情况 判断一下当下任务完成的时候是否可以获取奖励 
每次获取任务 ：平台做好任务的发送 任务不会超标 不过服务器必须强大到可以实时处理这么多的任务请求: 预估在十万+ 
任务完成的判断是 本地任务的判断 和脚本抓取任务主页的用户的 目标值  可能 有正常量 了就省了去自己的任务量    举例子：买家要刷10万分  刷了3万粉的时候就作品爆了  自然流量增加了7万
好了 不用再刷了 这种是用户不需要 任务详单 ：  不行 不能提供任务详单 万一是钓鱼呢   只可以匿名   这样想了是不是也不能私信 和评论 毕竟后台都是可以看到各种的数据  如何避雷 防止封号呢？


*/
/**
 * 任务的操作  
 * 插入 插入一个新任务  
 * 
 * 更新 找到任务更新任务 
 * 
 * 删除  删除任务
 * 
 * 获取  获取任务 
 */