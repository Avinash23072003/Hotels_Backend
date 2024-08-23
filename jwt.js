const jwt= require('jsonwebtoken');
const jwtAuthMiddleware=(req,res,next)=>{
    const token=req.headers.authorization.spli('')[1];
    if(!token) return res.status(404).json({error:"Unauthorised"});

    try{
        const decoded=jwt.verify(token,process.env.JWT_KEY);
        req.user=decoded;
        next();

    }catch(err){
        console.log(err);
        res.status(401).json({error:'Invalid token'});
    }
}

const generateToken=(userdata)=>{
    return jwt.sign(userdata,process.env.JWT_KEY)
}
module.exports={generateToken,jwtAuthMiddleware};