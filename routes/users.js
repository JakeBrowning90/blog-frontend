const express = require('express');
const router = express.Router();

const userController = require("../controllers/userController");

// Reader Login (YES)
router.get("/log-in", userController.log_in_get);

router.post("/log-in", userController.log_in_post);

router.get("/log-out", userController.log_out);

// Create reader (YES)
router.get('/sign-up', userController.sign_up_get);
  
router.post('/sign-up', userController.sign_up_post);

// Read ALL reader

// Read reader

// Update reader

// Delete reader

module.exports = router;