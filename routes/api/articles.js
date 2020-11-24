//文章获取
const Router = require("koa-router");
const multer = require("@koa/multer");
const path = require("path");
const router = new Router();
//articles类
const Article = require("../../models/Article");
const Tag = require("../../models/Tag");
const User =require("../../models/User");

//可对user数据库进行操作
/**
 * @route POST api/article/add
 * @desc 添加文章
 * @access 接口公开
 */
router.post("/add", async (ctx) => {
  const { state, payload, title, desc, content, tags } = ctx.request.body;
  let t = [];
  //判断标签是否存在
  for (let i = 0; i < tags.length; i++) {
    let result = await Tag.findOne({ _id: tags[i] });
    if (result) t.push(tags[i]);
    else {
      ctx.status = 200;
      ctx.body = { code: 500, msg: "标签id不存在" };
      return;
    }
  }
  const newArticle = new Article({
    title,
    desc,
    content,
    tags: t,
    user_id: payload.id,
    state,
  });
  await newArticle
    .save()
    .then((article) => {
      ctx.status = 200;
      ctx.body = { code: 200, data: article, msg: "创建成功" };
    })
    .catch((err) => {
      console.log(err);
      ctx.body = { msg: err };
    });
});
router.get("/findOne", async (ctx) => {
  const { id } = ctx.request.body;
  let result = await Article.findOne({ _id: id });
  if (result) {
    let meta = {
      views: result.meta.views + 1,
      likes: result.meta.likes,
      comments: result.meta.comments,
    };
    result = await Article.findByIdAndUpdate({ _id: id }, { meta });
    //继续找tag
    let tags = [];
    for (tag of result.tags) {
      let res = await Tag.findById({ _id: tag });
      if (res) tags.push(res);
    }
    result.tags = tags;
    ctx.status = 200;
    ctx.body = { code: 200, data: result };
  } else {
    ctx.status = 200;
    ctx.body = { code: 500, msg: "找不到该文章" };
  }
});
router.get("/find", async (ctx) => {
  const state = ctx.request.body.state || 1;
  const { tag, keyword } = ctx.request.body;
  const pageNum = parseInt(ctx.request.body.pageNum) || 1;
  const pageSize = parseInt(ctx.request.body.pageSize) || 10;
  let conditions = {};
  if (keyword) {
    const reg = new RegExp(keyword, "i"); //不区分大小写
    conditions = {
      $and: [
        { $or: [{ title: { $regex: reg } }, { desc: { $regex: reg } }] },
        { $or: [{ state: state }] },
      ],
      //   tags:{$elemMatch:{$eq: Mongoose.Types.ObjectId(tag)}}
    };
  }
  let skip = pageNum - 1 < 0 ? 0 : (pageNum - 1) * pageSize;
  let responseData = {
    count: 0,
    list: [],
  };
  // 待返回的字段
  let fields = {
    title: 1,
    desc: 1,
    img_url: 1,
    tags: 1,
    meta: 1,
    create_time: 1,
  };
  let options = {
    skip: skip,
    limit: pageSize,
    sort: { create_time: -1 },
  };
  //   let result = await Article.find(conditions,fields,options)
  const count = await Article.find().countDocuments();
  const result = await Article.find(conditions, fields, options);
  let newList = [];
  if (tag) {
    result.forEach((item) => {
      if (item.tags.indexOf(tag) > -1) {
        newList.push(item);
      }
    });
  } else {
    newList = result;
  }
  let len = newList.length;
  responseData.count = len;
  responseData.list = newList;

  //   responseData.count = count;
  //   responseData.list = result;
  //   let data = {
  //     count,
  //     pageNum,
  //     pageSize,
  //     data: result,
  //   };
  ctx.status = 200;

  ctx.body = { code: 200, data: responseData };
});
router.post("/del", async (ctx) => {
  const id = ctx.request.body.id;
  await Article.deleteOne({ _id: id })
    .then((res) => {
      ctx.status = 200;
      ctx.body = {
        code: 200,
        msg: "删除成功",
      };
    })
    .catch((err) => {
      ctx.status = 200;
      ctx.body = {
        code: 500,
        msg: "删除失败:" + err,
      };
    });
});

//点赞
router.post("/like", async (ctx) => {
    console.log(ctx.request.body.payload.id);
    let userMessage=await User.findOne({_id:ctx.request.body.payload.id});
    if(userMessage){
        //查找是否点赞
        let res=await Article.findOne({_id:ctx.request.body.id})
        // console.log(res);
        if(res){
            //判断是否点赞
            for(let i in res.like_users){
                if(res.like_users[i].id == ctx.request.body.payload.id){
                    ctx.status=200;
                    ctx.body={code:500,msg:"该用户已点赞"};
                    return ;
                }
            }
            //用户未点赞
            let meta=Object.assign({}, res.meta);
            meta.likes+=1;
            let like_user={
                id:userMessage._id,
                name:userMessage.name,
                avatar:userMessage.avatar,
            }
            let like_users=[...res.like_users];
            like_users.push(like_user);
            await Article.findOneAndUpdate({_id:ctx.request.body.id},{meta,like_users}),then(res=>{
              ctx.body={code:200,msg:"点赞成功",data:newresult};
            
            }).catch(err=>{
              ctx.body={code:500,msg:err};
            })
                
        }

  
    }else{
        ctx.status=200;
        ctx.body={
            code:500,
            msg:"用户身份失效"
        }
    }
});


//图片上传
//上传文件存放路径、及文件命名
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "/articlePhoto"));
  },
  filename: function (req, file, cb) {
    let type = file.originalname.split(".")[1];
    cb(null, `${file.fieldname}-${Date.now().toString(16)}.${type}`);
  },
});
//文件上传限制
const limits = {
  fields: 10, //非文件字段的数量
  fileSize: 500 * 1024, //文件大小 单位 b
  files: 1, //文件数量
};
const upload = multer({ storage, limits });
//上传封面图
router.post("/img",upload.single("img"),async ctx=>{
  ctx.body = {
    code: 200,
    data: ctx.request.file.destination, //返回文件名
  };
})


//评论啥的。。先不写吧。。
module.exports = router.routes();
