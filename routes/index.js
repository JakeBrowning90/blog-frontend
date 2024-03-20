var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', async function(req, res, next) {
  const response = await fetch("http://localhost:3000/posts", {mode: 'cors'});
  const postList= await response.json();
  // console.log(postList);
  res.render('index', { title: 'Blog: Homepage', postList: postList});
});

// Author Dashboard
router.get('/dashboard', async function(req, res, next) {
  const response = await fetch("http://localhost:3000/posts", {mode: 'cors'});
  const postList= await response.json();
  // console.log(postList);
  res.render('index', { title: 'Blog: Author Dashboard', postList: postList});
});

router.get('/sign-up', async function(req, res, next) {
  res.render('reader_create', { title: 'Sign-Up Form' });
});

router.post('/sign-up', async function(req, res, next) {
  const response = await fetch('http://localhost:3000/readers/', {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: req.body.password,
      is_admin: false
    })
  })
  // return response.json();
  res.redirect('/')
});

module.exports = router;
