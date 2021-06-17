const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  userMobile: {
    type: String,
    require: true,
  },
  transactions: [
    {
      name: {
        type: String,
      },
      amount: {
        type: Number,
      },
      type: {
        type: String,
      },
    },
  ],
});

module.exports = mongoose.model("Transaction", transactionSchema);
