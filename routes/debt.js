const router = require("express").Router();
const handle = require("../handlers");
const auth = require("../middlewares/auth");

router.route("/:id").post(auth, handle.editDebt).get(handle.getTransaction);

module.exports = router;
