const Router = require("koa-router");
const router = new Router();
const Tag = require("../../models/Tag");
/**
 * @route POST api/tags/add
 * @desc 添加标签
 * @access 接口需token
 */
router.post("/add", async (ctx) => {
  const { name } = ctx.request.body;
  const result = await Tag.findOne({ name: name });
  console.log(result);
  if (result) {
    //找得到
    ctx.status = 200;
    ctx.body = { code: 500, msg: "标签已存在" };
  } else {
    const newTag = new Tag({
      name,
    });
    await newTag
      .save()
      .then((tag) => {
        ctx.status = 200;
        ctx.body = { code: 200, data: tag, mes: "创建成功" };
      })
      .catch((err) => {
        console.log(err);
        ctx.body = { code: 500, msg: err };
      });
  }
});
router.post("/del", async (ctx) => {
  const { id } = ctx.request.body;
  const result = await Tag.findOne({ _id: id });
  if (result) {
    //找得到
    await Tag.remove({_id:id})
    // await Tag.deleteOne({ _id: id })
      .then((res) => {
        console.log(res);
        ctx.status = 200;
        ctx.body = { code: 200, msg: "删除成功" };
      })
      .catch((err) => {
        console.log(err);
        ctx.status = 200;
        ctx.body = { code: 500, msg: "删除失败" };
      });
  } else {
    //找不到
    ctx.status = 200;
    ctx.body = { code: 500, msg: "标签不存在" };
  }
});
router.get("/all", async (ctx) => {
    const result=await Tag.find();
    console.log(result);
    ctx.status = 200;
    ctx.body = { code: 200,data:result};
});
router.post("/update", async (ctx) => {
    const { id,name } = ctx.request.body;
    await Tag.findOneAndUpdate({_id:id},{name:name}).then(res=>{
        console.log(res);
        ctx.status=200;
        ctx.body={code:200,msg:"修改成功"};
    }).catch(err=>{
        ctx.status=200;
        console.log(err);
        ctx.body={code:500,msg:err};
    })
  });
module.exports = router.routes();
