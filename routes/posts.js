const express = require('express');
const router = express.Router();
const postController = require("../controllers/postController");

// Read post (YES)
router.get("/:id", postController.post_read);
// Create comment for post
router.post("/:id", postController.post_read_add_comment);

// Read ALL posts (LIMITED, in index)
// Create post (NO)
// Update post (NO)
// Delete post (NO)

module.exports = router;