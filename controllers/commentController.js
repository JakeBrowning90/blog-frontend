const asyncHandler = require("express-async-handler");
// const { post } = require("../routes");

exports.comment_read = asyncHandler(async (req, res, next) => {
    const commentResponse = await fetch(`http://localhost:3000/comments/${req.params.id}`, {mode: 'cors'});
    const comment = await commentResponse.json();

    res.render('comment_detail', {
        title: 'Delete this comment?',
        comment: comment
    });
});

exports.comment_delete = asyncHandler(async (req, res, next) => {
    const deleteResponse = await fetch(`http://localhost:3000/comments/${req.params.id}`, {mode: 'cors', method: "DELETE"});
    const deleteMessage = await deleteResponse.json();
    console.log(deleteMessage)
    res.redirect('/')
});
