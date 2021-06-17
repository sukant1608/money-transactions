const mongoose = require("mongoose");

const duePaymentSchema = new mongoose.Schema({
  userMobile: {
    type: String,
    require: true,
  },
  duePayments: [
    {
      name: {
        type: String,
      },
      amount: {
        type: Number,
      },
    },
  ],
});

module.exports = mongoose.model("DuePayments", duePaymentSchema);
