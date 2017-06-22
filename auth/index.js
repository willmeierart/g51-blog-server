const express = require('express')
const bcrypt = require('bcrypt')
const router = express.Router()
const User = require('../db/queries')

router.get('/', (req,res)=>{
    res.json({
        message: '✌️'
    })
})

function validUser(user){
    const validEmail = typeof user.email == 'string' && user.email.trim() != ''
    const validPassword = typeof user.password == 'string' && user.password.trim() != '' && user.password.trim().length >= 4
    return validEmail && validPassword
}

router.post('/signup', (req, res, next)=>{
    if (validUser(req.body)){
        User.getUserByEmail(req.body.email)
        .then(user=>{
            if(!user){
                bcrypt.hash(req.body.password, 10)
                .then(hash=>{
                    const user = req.body
                    user.password = hash
                    User.createUser(user).then(id=>{
                        //redirect
                        res.json({
                            id,
                            message: '☑︎'
                        })
                    })
                })
            }else{
                next(new Error('Email in use'))
            }
        })
    } else {
        next(new Error('Invalid User'))
    }
})

router.post('/login', (req,res, next)=>{
    console.log(req.body)
    if(validUser(req.body)){
        //check if in db
        User.getUserByEmail(req.body.email).then(user=>{
            console.log('user', user)
            if(user){
                //compare password with hashed password
                bcrypt.compare(req.body.password, user.password).then(result=>{
                    if(result){
                        //if passwords matched
                        //set-cookie header
                        const isSecure = req.app.get('env') != 'development'
                        res.cookie('user_id', user.id, {
                            httpOnly: true,
                            secure: isSecure,
                            signed: true
                        })
                        res.json({
                            id: user.id,
                            message: 'Logged in! 🔓'
                        })
                    }
                })
            } else {
                next(new Error('Invalid login'))
            }
        })
    } else {
        next(new Error('Invalid login'))
    }
})

module.exports = router
