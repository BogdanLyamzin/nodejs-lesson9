const express = require('express')
const path = require('path')
const fs = require('fs').promises
const app = express()
const multer = require('multer')

const uploadDir = path.join(process.cwd(), 'temp')
const storeImage = path.join(process.cwd(), 'uploads/images')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir)
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    },
    limits: {
        fileSize: 1048576,
    },
})

const upload = multer({
    storage: storage,
})

app.post('/profile', upload.single('avatar'), async (req, res, next) => {
    const { description } = req.body
    const { path: temporaryName, originalname } = req.file
    const fileName = path.join(storeImage, originalname)
    try {
        await fs.rename(temporaryName, fileName)
    } catch (err) {
        await fs.unlink(temporaryName)
        return next(err)
    }
    res.json({ description, message: 'Файл успешно загружен', status: 200 })
})

// catch 404 and forward to error handler
app.use((req, res, next) => {
    res.status(404)
    res.json({
        status: "error",
        code: 404,
        message: ""
    })
})

app.use((err, req, res, next) => {
    const status = err.status || 500;
    res.status(status);
    res.json({ message: err.message, status: err.status, code: status })
})

const PORT = process.env.PORT || 3000

app.listen(PORT, async () => {
    console.log(`Server running. Use on port:${PORT}`)
})
