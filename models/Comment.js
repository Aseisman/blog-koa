const mongoose = require("mongoose");
const autoIncrement = require('mongoose-auto-increment');

// 评论模型
const commentSchema = new mongoose.Schema({
	// 评论所在的文章 id
    article_id: { type: mongoose.Schema.Types.ObjectId, required: true },
	// content
    content: { type: String, required: true, validate: /\S+/ },
    //用户id
    user_id:{type: mongoose.Schema.Types.ObjectId, required: true},
    //用户头像
    user_avatar:{type: String, default:'admin'},
    //用户名称
    user_name:{type: String, default:'admin'},
    // 被赞数
    likes: { type: Number, default: 0 },
    // 父评论 id
	father_id: { type: mongoose.Schema.Types.ObjectId, required: true },
});

// 自增 ID 插件配置
commentSchema.plugin(autoIncrement.plugin, {
	model: 'Comment',
	field: 'id',
	startAt: 1,
	incrementBy: 1,
});

// 标签模型
module.exports = mongoose.model('Comment', commentSchema);