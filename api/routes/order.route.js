const router = require("express").Router();
const {
    getOrders,
    addOrder,
    updateOrder,
    deleteOrder,
} = require("./../controllers/order.controller");
const { verifyToken, isAdmin } = require("../middlewares/auth.middleware");

// Orders routes
router.get("/orders", verifyToken, isAdmin, getOrders);
router.post("/order", addOrder);
router.route("/order/:id").put(updateOrder).delete(deleteOrder);

module.exports = router;
