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
router.get("/:id", getSingleUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
