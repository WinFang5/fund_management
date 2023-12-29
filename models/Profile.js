const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// 创建 UserSchema 类
const ProfileSchema = new Schema({
  type: {
    type: String,
  },
  describe: {
    type: String,
  },
  income: {
    type: String,
    required:true
  },
  expend: {
    type: String,
    required:true
  },
  cash: {
    type: String,
    required:true
  },
  remark: {
    type: String,
  },
  // 用户注册日期，默认当前时间
  date: {
    type: Date,
    default: Date.now,
  },
});

// 将 UserSchema 导出为 User 模型
module.exports = Profile = mongoose.model("profile", ProfileSchema);
