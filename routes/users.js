const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController");

// Create User(nonAuthor) (YES)
router.get('/sign-up', userController.sign_up_get);
router.post('/sign-up', userController.sign_up_post);

// User(nonAuthor) Login (YES)
router.get("/log-in", userController.log_in_get);
router.post("/log-in", userController.log_in_post);
router.get("/log-out", userController.log_out);

// Read ALL Users (NO)
// Read User (NO)
// Update User (NO)
// Delete User (NO)

module.exports = router;