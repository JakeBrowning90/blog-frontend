const express = require('express');
const router = express.Router();

const postController = require("../controllers/postController");


// Create post (YES)

// Read ALL posts (truncate in Index?)

// Read post (YES)
// router.get("/posts/:id", postController.post_read);
router.get("/:id", postController.post_read);


// Update post (YES)

// Delete post (YES)

module.exports = router;