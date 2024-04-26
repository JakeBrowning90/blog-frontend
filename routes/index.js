const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', async function(req, res, next) {
  const response = await fetch("http://localhost:3000/posts", {mode: 'cors'});
  const postList= await response.json();
  res.render('index', { title: 'Blog: Homepage', postList: postList});
});

module.exports = router;
