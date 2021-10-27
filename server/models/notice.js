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
  category: {
    type: String,
    required: [true, "Please add ntice category"],
  },
  imageUrl: {
    type: String,
    required: true,
    default: "https://iol.edu.np/wp-content/uploads/2021/03/unnamed.png",
  },
});

module.exports = mongoose.model("notice", NoticeSchema);
