const mongoose = require("mongoose");

const tempSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  created: {
    type: String,
    default: Date.now,
  },
  expires_at: {
    type: Date,
    default: Date.now,
    expires: 10,
  },
});
module.exports = mongoose.model("Temp", tempSchema);
