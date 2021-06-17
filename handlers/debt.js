const db = require("../models");

exports.editDebt = async (req, res, next) => {
  try {
    const { id: userId } = req.params;
    var { name, mobile, debtChange, typeOfTransaction } = req.body;
    debtChange = parseInt(debtChange);
    const user = await db.User.findOne({ mobile: userId });
    if (user) {
      index = user.contacts.findIndex((contact) => contact.contact === mobile);
      const debt = user.contacts[index].debt;
      if (index !== -1) {
        user.contacts.splice(index, 1);
        const newContact = {
          name: name,
          contact: mobile,
          debt: debt + debtChange,
        };
        user.contacts.push(newContact);
        await user.save();
        const userTransactions = await db.Transaction.findOne({
          userMobile: userId,
        });
        const transaction = {
          name: name,
          amount: debtChange,
          type: typeOfTransaction,
        };
        userTransactions.transactions.push(transaction);
        await userTransactions.save();
        res.status(202).json(user);
      } else {
        next(Error("No such contact exist"));
      }
    } else {
      next(Error("No user exist with this ID"));
    }
  } catch (err) {
    err.status = 400;
    next(err);
  }
};

exports.getTransaction = async (req, res, next) => {
  try {
    const { id: userId } = req.params;
    const transaction = await db.Transaction.findOne({ userMobile: userId });
    if (transaction) {
      res.status(200).json(transaction.transactions);
    } else {
      next(Error("No such user exists"));
    }
  } catch (err) {
    err.status = 400;
    next(err);
  }
};
