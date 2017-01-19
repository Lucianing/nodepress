/*
*
* 公告数据模型
*
*/

const mongoose = require('mongoose')
const autoIncrement = require('mongoose-auto-increment')
const mongoosePaginate = require('mongoose-paginate')

// 自增ID初始化
autoIncrement.initialize(mongoose.connection)

// 公告模型
let announcementSchema = new mongoose.Schema({

  // 公告内容
  content: { type: String, required: true },

  // 公告发布状态 => 0草稿，1已发布
  state: { type: Number, default: 1 },

  // 发布日期
  date: { type: Date, default: Date.now },

  // 自定义扩展
  extend: [{ name: String, value: Object }]
})

// 翻页 + 自增ID插件配置
announcementSchema.plugin(mongoosePaginate)
announcementSchema.plugin(autoIncrement.plugin, {
  model: 'Announcement',
  field: 'id',
  startAt: 1,
  incrementBy: 1
})

// 自增ID配置
announcementSchema.pre('save', next => {
  if (this.isNew) this.create_time = this.update_time = Date.now()
  if (!this.isNew) this.update_time = Date.now()
  next()
})

// 公告模型
const Announcement = mongoose.model('Announcement', announcementSchema)

// export
module.exports = Announcement
