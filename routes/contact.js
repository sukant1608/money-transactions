const router = require("express").Router();
const handle = require("../handlers");
const auth = require("../middlewares/auth");

router.get("/:id", handle.userContacts);
router.post("/:id", auth, handle.addContact);
router.post("/delete/:id", auth, handle.deleteContact);

module.exports = router;
