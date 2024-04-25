const express = require('express');
const router = express.Router();
const commentController = require("../controllers/commentController");

// Read comment
router.get("/:id", commentController.comment_read);
// Delete comment (YES)
router.post("/:id", commentController.comment_delete);

// Create comment (YES) In Post router
// Read ALL comments (NO)
// Update comment (NO)

module.exports = router;