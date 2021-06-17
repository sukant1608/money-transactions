const db = require("../models");

exports.userContacts = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await db.User.findOne({ mobile: id });
    res.status(200).json(user.contacts);
  } catch (err) {
    err.status = 400;
    next(err);
  }
};

exports.addContact = async (req, res, next) => {
  try {
    const { id: userId } = req.params;
    const { debt, mobile, name } = req.body;
    const newContact = {
      name: name,
      contact: mobile,
      debt: debt,
    };
    const user = await db.User.findOne({ mobile: userId });
    if (
      user.contacts.filter((contact) => contact.contact.toString() === mobile)
        .length <= 0
    ) {
      user.contacts.push(newContact);
      await user.save();
      res.status(202).json(user);
    } else {
      next(Error("Contact already exists"));
    }
  } catch (err) {
    err.status = 400;
    next(err);
  }
};

exports.deleteContact = async (req, res, next) => {
  try {
    const { id: userId } = req.params;
    const { mobile } = req.body;
    const user = await db.User.findOne({ mobile: userId });
    if (user) {
      const index = user.contacts.findIndex(
        (contact) => contact.contact === mobile
      );
      if (index !== -1) {
        user.contacts.splice(index, 1);
        await user.save();
        res.status(202).json(user);
      } else {
        next(Error("No contact exist with this ID"));
      }
    } else {
      next(Error("No user exist with this ID"));
    }
  } catch (err) {
    err.status = 400;
    next(err);
  }
};
