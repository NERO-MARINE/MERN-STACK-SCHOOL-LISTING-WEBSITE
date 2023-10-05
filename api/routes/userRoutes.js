const { Router } = require("express");

const router = Router();

const {
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

const {
  verifyToken,
  verifyUser,
  verifyAdmin,
} = require("../utilitis/verifyToken");

router.get("/", getAllUsers);
router.get("/:id", verifyUser, getSingleUser);
router.put("/:id", verifyUser, updateUser);
router.delete("/:id", verifyUser, deleteUser);

module.exports = router;
