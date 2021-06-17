const router = require("express").Router();
const handle = require("../handlers");
const auth = require("../middlewares/auth");

router.get("/:id", handle.getDuePayment);
router.post("/create", handle.createDuePayment);
router.post("/delete", handle.deleteDuePayment);

module.exports = router;
