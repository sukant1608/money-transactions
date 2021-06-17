const jwt = require("jsonwebtoken");
const db = require("../models");

exports.register = async (req, res, next) => {
  try {
    // Create user
    const user = await db.User.create(req.body);
    const { id, username, mobile } = user;
    // Create Transaction for that user
    const userTransaction = await db.Transaction.create({ userMobile: mobile });
    await userTransaction.save();
    // Create Due Payment for that user
    const duePayments = await db.DuePayments.create({ userMobile: mobile });
    await duePayments.save();
    // Create temp for that user
    const temp = await db.Temp.create({
      name: username,
      description: `${username} joined Udhar at ${Date.now}`,
    });
    await temp.save();
    const token = jwt.sign({ id, mobile, username }, process.env.SECRET);
    await user.save();
    res.status(201).json({ id, username, mobile, token });
  } catch (err) {
    if (err.code === 11000) {
      err.message = "This mobile number is already registered.";
    }
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const user = await db.User.findOne({ mobile: req.body.mobile });
    const { id, mobile, username } = user;
    const valid = await user.comparePassword(req.body.password);

    if (valid) {
      const token = jwt.sign({ id, mobile, username }, process.env.SECRET);
      const temp = await db.Temp.create({
        name: username,
        description: `${mobile} logged in to Udhar at ${Date.now}`,
      });
      await temp.save();
      res.status(200).json({ token });
    } else {
      throw new Error("Invalid Mobile / Password");
    }
  } catch (err) {
    err.message = "Invalid Mobile / Password";
    next(err);
  }
};

exports.profile = async (req, res, next) => {
  try {
    const { mobile } = req.body;
    const user = await db.User.findOne({ mobile: mobile });
    if (user) {
      res.status(200).json(user);
    } else {
      throw new Error("User does not exist");
    }
  } catch (err) {
    err.status = 400;
    next(err);
  }
};
