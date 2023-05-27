import multer from "multer"
import { AppError } from "../Services/AppError.js"




let options = (folderName)=>{
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, `uploads/${folderName}`)
        },
        filename: function (req, file, cb) {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
            cb(null, uniqueSuffix + '-' + file.originalname )
        }
    })
    function fileFilter(req, file, cb) {
        if (file.mimetype.startsWith("image")) {
            cb(null, true)
        } else {
            cb(new AppError('Invalid Image', 400), false)
        }

    }
    return multer({ storage: storage })
}


export const FileUpload = (folderName,fieldName) => {
    return options(folderName).single(fieldName)
}

export const UploadMixFile = (folderName,arrayFields) => {
    
    return options(folderName).fields(arrayFields)
}


