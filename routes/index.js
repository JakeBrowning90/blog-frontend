const express = require('express');
const router = express.Router();
const api = require("../controllers/apiURLController");

/* GET home page. */
router.get('/', async function(req, res, next) {
  const response = await fetch(api.address + "posts", {mode: 'cors'});

  const postList= await response.json();
  res.render('index', { title: 'Blog: Homepage', postList: postList});
});

module.exports = router;
