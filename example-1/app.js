// const fs = require("fs/promises");
const fs = require("fs").promises;
const path = require("path");

// console.log(process.cwd());

const imagesPath = path.join(process.cwd(), "images");
// const imagesPath = `${__dirname}\images`;
// console.log(imagesPath)

const fileTempName = path.join(imagesPath, "1.txt");
// fs.writeFile(fileTempName, "Some text")
//     .then(data => console.log(data))
//     .catch(error => console.log(error))

const filesPath = path.join(process.cwd(), "files");
const fileFinishName = path.join(filesPath, "1.txt");
fs.rename(fileTempName, fileFinishName);

fs.unlink(fileFinishName)