import express from  'express'
import { OAuth2Client } from 'google-auth-library'
import User from '../model/userModel.js'


const router = express.Router()

router.get('/',async(req,res)=>{
    const code = req.query.code

    try {
        const redirectURL = 'http://localhost:3000/oauth';
        const oAuthClient = new OAuth2Client(
            process.env.CLIENT_ID,
            process.env.CLIENT_SECRET,
            redirectURL
        );
        
        const tokenRes = await oAuthClient.getToken(code);
        await oAuthClient.setCredentials(tokenRes.tokens);
        const idToken = tokenRes.tokens.id_token;
        const ticket = await oAuthClient.verifyIdToken({
            idToken,
            audience:process.env.CLIENT_ID
        })
        const payload = ticket.getPayload()
      
        const {sub,name} = payload;

        let users = await User.findOne({googleId:sub})
        if(!users){
            users = new User({
                googleId:sub,
                name : name,
                role:"user",
                status:`Hey! I'm Using WhatApp`
            })
            await users.save()
        }
        console.log(users)
        
        res.redirect(`http://localhost:5173?name=${encodeURIComponent(users.name)}&id=${users._id}`)
    } catch (err) {
        console.error('Error signing in with Google:', err.message);
        res.status(500).json({ error: 'Google Sign-in failed' });
    }
})

export default router