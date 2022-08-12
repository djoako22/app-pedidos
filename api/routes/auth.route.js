const router = require("express").Router();
const { login, logout } = require("../controllers/auth.controller");
const { verifyToken, refreshToken, isAdmin } = require("../middlewares/auth.middleware");

router.post("/login", login);
router.post("/logout", verifyToken, logout);
router.post("/refresh-token", refreshToken);

module.exports = router;