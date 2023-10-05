const jwt = require('jsonwebtoken')
const createError = require('./error.js')


// middleware to verify authentication
const verifyToken = (req, res, next)=>{
    const token = req.cookies.access_token
    if(!token){
        return next(createError(401, 'You are not authenticated, Please sign in'))
    }

    // if there is a token, we confirm its authenticity
    jwt.verify(token, process.env.JWTSECRET, (err, user)=>{
        if(err){
            return next(createError(401, 'token is invalid'))
        }
        // req.loggedInUser = user
        req.user = user
        next()
    })
}

// middleware to verify and allow signed in users or admins take certain action on the userRoutes such as delete or edit their account. In the case of admins delete other peoples account too 

const verifyUser = (req, res, next)=>{
    verifyToken(req, res, ()=>{
        if(req.user.id === req.params.id || req.user.isAdmin){
            next()
        }else{
            return next(createError(403, 'you are not authorised'))
        }
    })
}

// middleware to verify is user is an ADMIN
const verifyAdmin = (req, res, next)=>{
    verifyToken(req, res, ()=>{
        if(req.user.isAdmin){
            next()
        }else{
            return next(createError(403, 'you are not authorised'))
        }
    })
}

module.exports = {
    verifyToken,
    verifyUser,
    verifyAdmin
}