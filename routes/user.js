const { getAllUsers } = require("./../controllers/user");
const { protect } = require("./../controllers/auth");
const router = require("express").Router();

router.get("/users", protect, getAllUsers);

module.exports = router;
