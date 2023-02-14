const jwt = require("jsonwebtoken");


const generateToken = (user)=>{
    return jwt.sign({
        _id: user._id,
        name: user.name,
        email: user.email,
        username: user.username
    }, process.env.JWT_SECRET, {
        expiresIn: "7d"
    })
}


const isAuth =(req, res, next)=>{
    const {authorization} = req.headers;
    if (authorization){
      const token = authorization.slice(7, authorization.length)
        if (token) {
            jwt.verify(token,
                process.env.JWT_SECRET,
                (err, decode)=>{
                    if(err){
                        res.status(401).send({ message: "Invalid Token"})
                    } else{
                        req.user = decode;
                        // console.log(req.user)
                        next()
                    }
                })
        } else {
            res.status(401).send({message: "No hacking today"})
        }
    } else{
        res.status(401).send({message: "No hacking today and tommorrow"})
    }
}
exports.generateToken = generateToken
exports.isAuth = isAuth