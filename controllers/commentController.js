const asyncHandler = require("express-async-handler");

exports.comment_read = asyncHandler(async (req, res, next) => {
    const commentResponse = await fetch(`http://localhost:3000/comments/${req.params.id}`, {
        mode: 'cors',
        headers: {
            "Content-Type": "application/json",
            "authorization":  localStorage.getItem('token'),
        },
    });

    // Fails verification
    if (commentResponse.status == 403) {
        res.render("forbidden", {
            title: "Page Forbidden",
            message: "You do not have access to this page."
        });
    } 

    const comment = await commentResponse.json();

    if (comment == null) {
        res.redirect('/')
    }
    // Only access if comment's writer or blog author
    if (((localStorage.getItem('isAuthor')) == "true") || (comment.user.id == localStorage.getItem('id'))) {
        res.render('comment_detail', {
            title: 'Delete this comment?',
            comment: comment
        });
    } else {       
        res.render("forbidden", {
            title: "Page Forbidden",
            message: "You do not have access to this page."
        });
    }
});

exports.comment_delete = asyncHandler(async (req, res, next) => {
    const deleteResponse = await fetch(`http://localhost:3000/comments/${req.params.id}`, {
        mode: 'cors', 
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "authorization":  localStorage.getItem('token'),
        },
    });
    if (deleteResponse.status == 403) {
        res.render("forbidden", {
            title: "Page Forbidden",
            message: "Your validation ",
        });
    }
    const deleteMessage = await deleteResponse.json();
    // console.log(deleteMessage)
    res.redirect('/')
});
