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
  upload,
  addNewFavoriteSchool,
  getUsersFavoriteSchools,
  removeFavoriteSchool,
  getFavoriteSchools,
  sendMsgToSchool
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
router.post('/addSchoolToFavorite/:schoolId/:userId', addNewFavoriteSchool)
router.post('/removeFavoriteSchool/:schoolId/:userId', removeFavoriteSchool);
// get the favorite school ids
router.get('/getFavorites/:userId', getUsersFavoriteSchools)
// get the actual favorite schools
router.get('/favorite/Schools/:userId', getFavoriteSchools)
router.post('/contact/school/:schoolEmail/:schoolName', sendMsgToSchool)

module.exports = router;
