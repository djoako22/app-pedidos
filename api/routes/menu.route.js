const router = require("express").Router();
const { getMenus, addMenu, updateMenu, deleteMenu } = require("../controllers/menu.controller");
const { verifyToken, isAdmin } = require("../middlewares/auth.middleware");
const multer = require("multer");
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});
const upload = multer({ storage });

// Menus routes
router.get("/menus", getMenus);
router.post("/menu", verifyToken, isAdmin, upload.single("image"), addMenu);
router
    .route("/menu/:id")
    .put(verifyToken, isAdmin, upload.single("image"), updateMenu)
    .delete(verifyToken, isAdmin, deleteMenu);

module.exports = router;