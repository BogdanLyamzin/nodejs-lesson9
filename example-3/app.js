const express = require("express");
const cloudinary = require("cloudinary").v2;

const app = express();

app.use(express.json());

cloudinary.config({
    cloud_name: "dpzx4xaru",
    api_key: "213435563597343",
    api_secret: "6IN-b3EakpEsdchv4GU4gK7BXW0"
});

app.post("/profile", (req, res, next)=> {
    const data = {
        avatar: req.body.avatar,
    };

    cloudinary.uploader.upload(data.avatar)
        .then(result => {
            res.json({
                status: "success",
                code: 201,
                data: {
                    url: result
                }
            })
        })
        .catch(error => next(error))
})