const { Router } = require("express")
const router = Router()
const {
  verifyToken,
  verifyUser,
  verifyAdmin,
} = require("../utilitis/verifyToken");

const {
  getAllSchools,
  getSingleSchool,
  createSchool,
  deleteSchool,
  updateSchool,
  searchAllSchools,
  countByState,
  UserSchools,
} = require("../controllers/schoolController")

router.get("/", getAllSchools)
router.get("/search", searchAllSchools)
router.get('/my-schools/:userId', UserSchools)
router.post("/:userId", createSchool)
router.get('/:id', getSingleSchool)
router.put('/:id', updateSchool)
router.delete('/:id/:userId', deleteSchool)
router.get('/count/countByState', countByState)

module.exports = router;
