const mongoose = require("mongoose");

// const history = mongoose.model('history', {
//     name: {
const NoteSchema = new mongoose.Schema({
  bloodGroup: {
    type: String,
  },
  bloodPressure: {
    type: String,
  },
  sugarLevel: {
    type: String,
  },
  surgicalRecords: {
    type: String,
  },
  otherRecords: {
    type: String,
  },
  userId: {
    type: String,
  },
  date: {
    type: Date,
  },
});

module.exports = mongoose.model("Note", NoteSchema);
