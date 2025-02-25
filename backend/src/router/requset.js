import {OAuth2Client} from  'google-auth-library'
import express from 'express'

const router = express.Router()

router.post('/',(req,res)=>{
    res.header('Access-Control-Allow-Origin','http://localhost:5173')
    res.header('Referrer-Policy','no-referrer-when-downgrade')

    const redirectURL = 'http://localhost:3000/oauth'

    const oAuthClient = new OAuth2Client(
        process.env.CLIENT_ID,
        process.env.CLIENT_SECRET ,
        redirectURL
    )

    const authorizeUrl = oAuthClient.generateAuthUrl({
        access_type:'offline',
        scope: [
            'https://www.googleapis.com/auth/userinfo.email' ,
            'https://www.googleapis.com/auth/userinfo.profile',
            'openid',
          ],
        prompt:'consent'
    });

    res.json({url:authorizeUrl})
})

export default router;