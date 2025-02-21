import JWT from 'jsonwebtoken'
export const tokenauth = async (req,res,next)=>{
    const token = req.headers.authorization?.split(" ")[1]
    if(!token){
        return res.status(401).json({message:"Token Not found"})
    }
    const tokenVerify = JWT.verify(token,process.env.JWT_TOKEN)
    console.log(tokenVerify)
    if(!tokenVerify) {
        res.status(401).json({message:"Unauthorized user"})
    }
    req.user = tokenVerify
    next()
}

