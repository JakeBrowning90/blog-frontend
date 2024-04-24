const asyncHandler = require("express-async-handler");
// const { post } = require("../routes");

exports.post_read = asyncHandler(async (req, res, next) => {
    const postResponse = await fetch(`http://localhost:3000/posts/${req.params.id}`, {mode: 'cors'});
    const post = await postResponse.json();
    const commentsResponse = await fetch(`http://localhost:3000/posts/${req.params.id}/comments`, {mode: 'cors'});
    const comments= await commentsResponse.json();
    res.render("post_read", { 
        title: post.title,
        post: post, 
        comments: comments
    });
});

exports.post_read_add_comment = asyncHandler(async (req, res, next) => {
    const response = await fetch('http://localhost:3000/comments/', {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            "authorization":  localStorage.getItem('token'),
        },
        body: JSON.stringify({ 
            body: req.body.commentBody,
            user: localStorage.getItem('id'), 
            post: req.params.id
        })
      })

    // if (response.status == 403) {
    //     localStorage.clear();
    //     res.redirect("users/log-in");
    // }
    if (response.status == 403) {
        res.render("forbidden", {
            title: "Page Forbidden",
            message: "Your validation has expired. Please log again.",
        });
    }

    res.redirect(`/posts/${req.params.id}`);
});