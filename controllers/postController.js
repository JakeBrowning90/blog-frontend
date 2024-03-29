const asyncHandler = require("express-async-handler");
// const { post } = require("../routes");

exports.post_read = asyncHandler(async (req, res, next) => {
    const postResponse = await fetch(`http://localhost:3000/posts/${req.params.id}`, {mode: 'cors'});
    const post = await postResponse.json();
    const commentsResponse = await fetch(`http://localhost:3000/posts/${req.params.id}/comments`, {mode: 'cors'});
    const comments= await commentsResponse.json();
    res.render("post_read", { 
        title: "Read Post",
        post: post, 
        comments: comments
    });
});

exports.post_read_add_comment = asyncHandler(async (req, res, next) => {

    const comment = new Comment({
        title: req.body.title,
        body: req.body.body,
        timestamp: Date.now(),
        user: req.user._id
    });

    res.redirect(`/posts/${req.params.id}`);
});