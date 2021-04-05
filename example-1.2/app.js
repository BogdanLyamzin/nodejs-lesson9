const fs = require("fs").promises;
const path = require("path");

const tempDir = path.join(process.cwd(), "temp");
const storageDir = path.join(process.cwd(), "upload");

async function remoteFile(fileName){
    const tempFilePath = path.join(tempDir, fileName);
    // console.log(tempFilePath)
    const uploadFilePath = path.join(storageDir, fileName)
    // console.log(uploadFilePath)
    await fs.rename(tempFilePath, uploadFilePath)
    
}

remoteFile("1.jpg");