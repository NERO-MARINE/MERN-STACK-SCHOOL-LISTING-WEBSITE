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
  countTotalSchools,
  schools,
  getApprovedSchools,
  upload
} = require("../controllers/schoolController")

router.get("/", schools)
router.get("/featuredSchools", getAllSchools)
router.get("/approvedSchools", getApprovedSchools)
router.get("/search", searchAllSchools)
router.get('/my-schools/:userId', UserSchools)
router.post("/:userId", upload.array('images', 10), createSchool)
router.get('/:id', getSingleSchool)
router.put('/:id', updateSchool)
router.delete('/:id/:userId?', deleteSchool)
router.get('/count/countByState', countByState)
router.get('/count/countAllschools', countTotalSchools)

module.exports = router;
