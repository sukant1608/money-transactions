const db = require("../models");

exports.getDuePayment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const duePayments = await db.DuePayments.findOne({ userMobile: id });
    res.status(200).json(duePayments.duePayments);
  } catch (err) {
    err.status = 400;
    next(err);
  }
};

exports.createDuePayment = async (req, res, next) => {
  try {
    const { mobile, name, amount } = req.body;
    const duePay = {
      name: name,
      amount: amount,
    };
    const user = await db.DuePayments.findOne({ userMobile: mobile });
    if (user) {
      user.duePayments.push(duePay);
      await user.save();
      res.status(200).json(user);
    } else {
      next(Error("No such user exist"));
    }
  } catch (err) {
    err.status = 400;
    next(err);
  }
};

exports.deleteDuePayment = async (req, res, next) => {
  try {
    const { Id, mobile } = req.body;
    const result = await db.DuePayments.findOneAndUpdate(
      { userMobile: mobile },
      { $pull: { duePayments: { _id: Id } } },
      function (err, result) {
        if (err) {
          next(err);
        } else {
          res.status(200).json(result);
        }
      }
    );
  } catch (err) {
    err.status = 400;
    next(err);
  }
};
