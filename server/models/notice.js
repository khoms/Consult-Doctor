const mongoose = require("mongoose");
const validator = require("validator");

// const User = mongoose.model('User', {
//     name: {
const NoticeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please add Title"],
    trim: true,
    // unique:true
  },
  description: {
    type: String,
    required: [true, "Please add Description"],
  },
});

module.exports = mongoose.model("notice", NoticeSchema);
