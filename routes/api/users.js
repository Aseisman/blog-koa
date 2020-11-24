//用户登录注册等
const Router = require("koa-router");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const router = new Router();
const multer = require("@koa/multer");
const path = require("path");
const bcrypt = require("bcryptjs"); //加密，哈希加密
//引入User的model类
const User = require("../../models/User");
// https://upload-images.jianshu.io/upload_images/20783111-5c3e9af4da584b49.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240

//可对user数据库进行操作

/**
 * @route POST api/user/register
 * @desc 注册接口地址
 * @access 接口公开
 */
//bodyparser接受x-www-form-urlencoded的表单值
router.post("/register", async (ctx) => {
  // console.log(ctx.request.body);
  //查找有没有email
  const findResult = await User.find({ email: ctx.request.body.email });
  //是个数组，如果找不到就是空数组
  if (findResult.length > 0) {
    ctx.status = 500;
    ctx.body = { msg: "邮箱已被占用" };
  } else {
    const { name, password, avatar, email } = ctx.request.body;
    //加密
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);
    //没查到
    const newUser = new User({
      name,
      email,
      password: hash,
      avatar,
    });
    console.log(newUser);
    //存储到数据库
    await newUser
      .save()
      .then((user) => {
        //返回数据
        ctx.body = {code:200,data:user,msg:"注册成功"}
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

/**
 * @route Post api/users/login
 * @desc 返回token
 * @access 公开
 */
router.post("/login", async (ctx) => {
  const findResult = await User.find({ email: ctx.request.body.email });
  if (findResult.length <= 0) {
    ctx.status = 200;
    ctx.body = { code: 500, msg: "用户未注册" };
  } else {
    let flag = bcrypt.compareSync(
      ctx.request.body.password,
      findResult[0].password
    ); // true
    if (flag) {
      const usermessage = {
        id: findResult[0]._id,
        email: findResult[0].email,
      };
      const token = jwt.sign(usermessage, keys.secretKey, { expiresIn: 3600 });
      let mes = findResult[0].toJSON();
      delete mes.password;
      ctx.status = 200;
      ctx.body = {
        code: 200,
        data: { token: token, user: mes },
        msg: "登陆成功",
      };
    }
  }
});

router.get("/current", async (ctx) => {
  const payload = ctx.request.body.payload; //id,email
  const findResult = await User.find({ email: payload.email });
  if (findResult.length == 1) {
    let mes = findResult[0].toJSON();
    delete mes.password;
    ctx.body = { code: 200, data: mes ,msg:"获取成功"};
  }
});

router.post("/update", async (ctx) => {
  const { name, password, avatar, email } = ctx.request.body;
  const phone = ctx.request.body.phone || "";
  const img_url = ctx.request.body.img_url || "";
  const introduce = ctx.request.body.introduce || "";
  const update_time = Date.now();
  await User.findByIdAndUpdate(
    { _id: id },
    { name, password, avatar, email, phone, img_url, introduce, update_time }
  )
    .then((res) => {
      console.log(res);
      ctx.status = 200;
      ctx.body = { code: 200, msg: "修改成功" };
    })
    .catch((err) => {
      ctx.status = 200;
      console.log(err);
      ctx.body = { code: 500, msg: err };
    });
});

//头像上传
//上传文件存放路径、及文件命名
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "/avatar"));
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
router.post("/head", upload.single("avatar"), async (ctx) => {
  ctx.body = {
    code: 200,
    data: ctx.request.file.destination, //返回文件名
    msg:"上传成功"
  };
  // console.log('ctx.request.file', ctx.request.file);
  // console.log('ctx.file', ctx.file);
  // console.log('ctx.request.body', ctx.request.body);
});
module.exports = router.routes();
