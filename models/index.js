const mongoose = require("mongoose");

mongoose.set("debug", true);
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

module.exports.User = require("./user");
module.exports.Transaction = require("./transaction");
module.exports.Temp = require("./temp");
module.exports.DuePayments = require("./duePayment");
