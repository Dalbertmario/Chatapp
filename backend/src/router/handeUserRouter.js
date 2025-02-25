import express from 'express'
import { AccountDetails, SignIn, SignUp, updateAccount } from '../controller/handelUserRouter.js'
import { tokenauth } from '../middelware/tokenverfication.js'
import multer from 'multer'

const storage = multer.memoryStorage();
const upload = multer({storage})

const router = express.Router()

router.post('/signup',SignUp)
router.post('/signin',SignIn)
router.post('/user',tokenauth,(req,res)=>{
const data = req.user
const userData = {
    name:data.username,
    email:data.email,
    id:data.id
}
    res.status(200).json({message:"Welcome user",userdetails:userData})
})
router.post('/admin',tokenauth,(req,res)=>{
    res.status(200).json({message:"Welcome admin"})
})

router.get('/userData/:id',AccountDetails)

router.post('/accountupdate',upload.single('image'),updateAccount)

export default router