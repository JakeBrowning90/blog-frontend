const asyncHandler = require("express-async-handler");
// const { post } = require("../routes");

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

    // if (commentResponse.status != 200) {
    //     res.render("error404", {
    //         title: "Comment not found.",
    //         message: "This comment cannot be found. Please check your URL and try again.",
    //     });
    // } 

    const comment = await commentResponse.json();
    // Block if not comment's writer or blog author
    if ((comment.user.id != localStorage.getItem('id')) && localStorage.getItem('isAuthor') == false) {
        res.render("forbidden", {
            title: "Page Forbidden",
            message: "You do not have access to this page."
        });
    } 

    if (comment == null) {
        res.redirect('/')
    } else {
        res.render('comment_detail', {
            title: 'Delete this comment?',
            comment: comment
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
