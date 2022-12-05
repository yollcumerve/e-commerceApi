const jwt = require('jsonwebtoken')

// const authToken = (req,res,next) => {
//     const token = req.headers["authorization"].split(" ")[1]

//     if(token){
//         jwt.verify(token, `${process.env.JWT_SECRET_KEY}`, (err, decodedToken) => {
//             if(err){
//                 console.log(err.message)
//                 res.status(400).json(err)
//             }else{
//                 if(decodedToken.isAdmin){
//                     next()
//                 }else{
//                     res.json({succeeded: false, error: 'You are not an admin'})
//                 }
//             }
//         })
//     }else{
//         res.json({succeeded: false, error: 'No token'})
//     }
// }

//module.exports = { authToken}

const verifyToken = (req,res,next) => {
    const authHeader = req.headers.token
    if(authHeader){
        const token = authHeader.split(" ")[1]
        jwt.verify(token, `${process.env.JWT_SECRET_KEY}`, (err, user) => {
            if(err) res.status(403).json("Token is not valid!")
            req.user = user
            next()
        })
    }else{
        return res.status(401).json("Ypu are not authenticated")
    }
}

const verifyTokenAuth = (req,res,next) => {
    verifyToken(req,res, () => {
        if(req.user.id === req.params.id || req.user.isAdmin){
            next()
        }else{
            res.status(403).json("You are not allowed to do that")
        }
    })
}

const verifyTokenAdmin = (req,res,next) => {
    verifyToken(req,res, () => {
        if(req.user.isAdmin){
            next()
        }else{
            res.status(403).json('You are not aloowed to do that')
        }
    })
}




module.exports = { verifyToken, verifyTokenAuth, verifyTokenAdmin}
