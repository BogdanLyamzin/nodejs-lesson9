const express = require("express");
const path = require("path");
const fs = require("fs").promises;
const multer = require("multer");

const app = express();

const uploadDir = path.join(process.cwd(), "temp");
const storageDir = path.join(process.cwd(), "uploads/avatars");

const storage = multer.diskStorage({
    destination: (req, file, cb)=> {
        cb(null, uploadDir)
    },
    filename: (req, file, cb)=>{
        const now = new Date();
        const fileName = `${now.getTime()}-${file.originalname}`;
        cb(null, fileName)
    },
    limits: {
        fileSize: 1200000
    }
});

const upload = multer({
    storage
});



/*
const profileFiles = [
    {
        name: "avatar", maxCount: 1
    },
    {
        name: "photos", maxCount: 3
    },
];
app.post("/profile", upload.files(profileFiles), async(req, res, next)=> {

})

*/

app.post("/profile", upload.single("avatar"), async(req, res, next)=> {
    const {path: tempName, filename} = req.file;
    console.log(req.file)
    const fileName = path.join(storageDir, filename);
    // console.log(tempName)
    // console.log(fileName)
    try {
        await fs.rename(tempName, fileName);
    }
    catch (error){
        await fs.unlink(tempName);
        return next(error);
    }
    res.json({
        status: "success",
        code: 201,
        message: "Файл успешно загружен"
    })
})

const port = process.env.PORT || 3000;

app.listen(port)
