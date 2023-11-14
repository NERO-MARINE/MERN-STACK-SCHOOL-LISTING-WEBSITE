const { Router } = require("express");

const router = Router();

const { resetPassword, resetRequest } = require('../controllers/forgotPasswordController')


router.post('/request-reset', resetRequest)
router.post('/reset-password', resetPassword)

module.exports = router;