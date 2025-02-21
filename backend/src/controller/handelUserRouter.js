import bcrypt from 'bcrypt'
import User from '../model/userModel.js'
import JWT from 'jsonwebtoken'

export const SignUp = async (req,res)=>{
    const {name,email,password} = req.body
    const existingUser = await User.findOne({email})
    if(existingUser){
        return res.status(400).json({message:"User already exist"})
    }
    try{
        const hasspassword = await bcrypt.hash(password,10)
        const newUser = new User({name,email,password:hasspassword,role:'user'})
        await newUser.save()
    res.status(200).json({message:"User register successfully"})
    }catch(err){
      res.status(500).json({message:"Unexpected error"})
      console.log(err.message)
    }
}


export const SignIn = async (req,res)=>{
    const {name,password} = req.body
    console.log(name,password)
    try{
        const result = await User.findOne({name})
        if(!result){
          return res.status(400).json({message:"User doesn't exist"})
        }
        const comparsion =await bcrypt.compare(password,result.password)
        if(!comparsion){
            return res.status(400).json({message:"Password Incorrect"})
        }
        const token = JWT.sign({username:result.name,email:result.email,role:result.role,username:result.name,id:result.id},process.env.JWT_TOKEN)
        res.status(201).json({token:token,role:result.role})
    }catch(err){
       res.status(500).json({message:"Unexpected error"})
    }
}