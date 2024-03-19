const asyncHandler = require("express-async-handler");
const { post } = require("../routes");

exports.post_read = asyncHandler(async (req, res, next) => {

    res.render("post_read", { 
        title: "Read Post",
        // post: post, 
    });
});