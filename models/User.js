const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// 创建 UserSchema 类
const UserSchema = new Schema({
 // 用户名，必填项
  name: {
    type: String,
    required: true,
  },
 // 用户邮箱，必填项
  email: {
    type: String,
    required: true,
  },
 // 用户密码，必填项
  password: {
    type: String,
    required: true,
  },
 // 用户头像
  avatar: {
    type: String,
  },
  identity: {
    type: String,
    required: true,
  },
 // 用户注册日期，默认当前时间
  date: {
    type: Date,
    default: Date.now,
  },

});

// 将 UserSchema 导出为 User 模型
module.exports = User = mongoose.model("users", UserSchema);