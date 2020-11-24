/**
 *
 */

const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");

//文章模型
const articleSchema = new mongoose.Schema({
  //标题
  title: { type: String, required: true, validate: /\S+/ },
  // 文章描述
  desc: { type: String, default: "" },
  // 文章内容
  content: { type: String, required: true, validate: /\S+/ },
  // 文章标签
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag", required: true }],
  // 文章发布状态 => 0 草稿，1 已发布
  state: { type: Number, default: 1 },
  // 封面图
  img_url: {
    type: String,
    default:
      "https://upload-images.jianshu.io/upload_images/12890819-80fa7517ab3f2783.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
  },
  // 点赞的用户
  like_users: [
    {
      // 用户id
      id: { type: String, required: true },
      // 名字
      name: { type: String, required: true, default: "" },
      // 头像
      avatar: {
        type: String,
        default:
          "https://upload-images.jianshu.io/upload_images/12890819-80fa7517ab3f2783.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
      },
      // 创建日期
      create_time: { type: Date, default: Date.now },
    },
  ],
  //评论
  comments: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Comment", required: true },
  ],
  // 创建日期
  create_time: { type: Date, default: Date.now },
  // 最后修改日期
  update_time: { type: Date, default: Date.now },

  //用户id
  user_id: { type: mongoose.Schema.Types.ObjectId, required: true },
  //用户头像
  user_avatar: { type: String, default: "admin" },
  //用户名称
  user_name: { type: String, default: "admin" },

  // 其他元信息
  meta: {
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    comments: { type: Number, default: 0 },
  },
});

// 自增 ID 插件配置
articleSchema.plugin(autoIncrement.plugin, {
  model: "Article",
  field: "id",
  startAt: 1,
  incrementBy: 1,
});

// 文章模型
module.exports = mongoose.model("Article", articleSchema);
