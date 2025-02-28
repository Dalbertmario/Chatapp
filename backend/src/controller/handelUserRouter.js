import bcrypt from 'bcrypt'
import User from '../model/userModel.js'
import JWT from 'jsonwebtoken'
import { encryptPrivateKey, generateRsaKeyPair } from '../utils/KeyJeneration.js'

export const SignUp = async (req,res)=>{
    const {name,email,password} = req.body
    const existingUser = await User.findOne({email})
    if(existingUser){
        return res.status(400).json({message:"User already exist"})
    }
    try{
        const hasspassword = await bcrypt.hash(password,10)
        const pvtKey =await generateRsaKeyPair()
        const encryptPvtkey = encryptPrivateKey(pvtKey.privateKey,password)
        const newUser = new User({name,email,password:hasspassword,role:'user',status:`Hey! I'm Using WhatApp`,publicKey: pvtKey.publicKey,privateKey:encryptPvtkey.encryptedPrivateKey,salt:encryptPvtkey.salt,iv:encryptPvtkey.iv})
        await newUser.save()
    res.status(200).json({message:"User register successfully"})
    }catch(err){
      res.status(500).json({message:"Unexpected error"})
      console.log(err.message)
    }
}


export const SignIn = async (req,res)=>{
    const {name,password} = req.body
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


export const AccountDetails = async (req,res)=>{
    const id =req.params.id

    try{
      const responce = await User.findById(id).select(['name','status','profile'])
      if(responce.length === 0 ){
        res.status(400).json({message:'Account not found'})
      }
      res.status(200).json(responce)
    }catch(err){
        res.status(500).json({message:"Unexpected error"})
    }
}


export const updateAccount = async (req,res)=>{
    try{
    const {id,name,status} =req.body
    const imageBuffer = req.file ? req.file.buffer.toString("base64") : null
    const updateUser = await User.findByIdAndUpdate(id,{
        name : name,
        profile: imageBuffer,
        status : status
    }, {new:true})
    if(!updateUser){
        return res.status(404).json({message:"User not found"})
    }
    res.status(201).json({message:"Successfully updated"})
    }catch(Err){
        console.log("Error in updateing the profile",Err)
        res.status(500).json({message:"Unexpected error"})
    }
}