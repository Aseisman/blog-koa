const crypto = require('crypto');
const mongoose = require("mongoose");
const autoIncrement = require('mongoose-auto-increment');
const Schema = mongoose.Schema;

//实例化数据摸板
const UserSchema = new Schema({
    //名字
    name: {
        type: String,
        required: true,
        default: '',
    },
    // 用户类型 0：博主 1：其他用户
    type: { type: Number, default: 1 },

    // 手机
    phone: { type: String, default: '' },

    //封面
    img_url: { type: String, default: '' },
    //邮箱
    email: {
        type: String,
        required: true,
        validate: /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/
    },
    // 个人介绍
    introduce: { type: String, default: '' },
    // 头像
    avatar: { type: String, default: 'admin' },
    // 密码
    password: {
        type: String,
        required: true,
        default: crypto
            .createHash('md5')
            .update('123456')
            .digest('hex'),
    },
    // 创建日期
    create_time: { type: Date, default: Date.now },

    // 最后修改日期
    update_time: { type: Date, default: Date.now },
});
// 自增 ID 插件配置
UserSchema.plugin(autoIncrement.plugin, {
    model: 'User',
    field: 'id',
    startAt: 1,
    incrementBy: 1,
});
//暴露
module.exports = User = mongoose.model("users", UserSchema);