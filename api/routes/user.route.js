const router = require("express").Router();
// Import controllers
const { login, signup, logout } = require("../controllers/auth.controller");
const {
    getAccount,
    updateAccount,
    deleteAccount,
} = require("../controllers/user.controller");
const {
    getUser,
    updateUser,
    deleteUser,
    getUsers,
    deleteUsers,
} = require("../controllers/admin.controller");
// Import middlewares
const {
    verifyToken,
    refreshToken,
    isAdmin,
} = require("../middlewares/auth.middleware");

router.post("/login", login);
router.post("/signup", signup);
router.post("/logout", verifyToken, logout);
// router.post("/forgot-password", forgotPassword);
router.post("/refresh-token", refreshToken);
// User routes
router
    .route("/user/me")
    .get(verifyToken, getAccount)
    .put(verifyToken, updateAccount)
    .delete(verifyToken, deleteAccount);
// Admin routes
router
    .route("/users")
    .get(verifyToken, isAdmin, getUsers)
    .delete(verifyToken, isAdmin, deleteUsers);
router
    .route("/user/:id")
    .get(verifyToken, isAdmin, getUser)
    .put(verifyToken, isAdmin, updateUser)
    .delete(verifyToken, isAdmin, deleteUser);

module.exports = router;
