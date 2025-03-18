const express= require('express')
const router = express.Router()
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const UserModel = require('../../models/User')
const passport = require('passport')
//Load Input Validation
const validateRegisterInput = require('../../validation/register')
const validateLoginInput = require('../../validation/login')

require('dotenv').config()

// @route                              GET api/users/test
// @desc                               Tests users route
// @access                             Public
router.get('/test',(req,res)=>res.json({msg:'Hello this user works'}))

// @route                              POST api/users/register
// @desc                               Tests Register route
// @access                             Public
router.post('/register',(req,res)=>{

    const {isValid,errors} = validateRegisterInput(req.body)
    if(!isValid){ 
        return res.status(404).json(errors)
    }

    UserModel.findOne({email: req.body.email})
    .then(user=>{
        if(user){
            errors.email = 'Email Already Exists'
            return res.status(400).json(errors)
        }
        else {
            const avatar = gravatar.url(req.body.email, {
                 s: '200', //Size
                 r: 'pg', //rating 
                 d: 'mm' //Default
                })
            const newUser = new UserModel({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                avatar,
            });
            bcrypt.genSalt(10, (err,salt)=>{
                bcrypt.hash(newUser.password,salt,(err,hash)=>{
                    if(err) throw err;
                    newUser.password = hash;
                    newUser.save()
                    .then(user=>res.json(user))
                    .catch(err=>console.log(err))
                })
            })
        }
    });
});

// @route                              GET api/users/login
// @desc                               Tests Login user / return JWT
// @access                             Public
router.post('/login',(req,res)=>{
    const {isValid,errors} = validateLoginInput(req.body)
    if(!isValid){ 
        return res.status(404).json(errors)
    }

    const email = req.body.email
    const password = req.body.password
    //Find by email
    UserModel.findOne({email})
    .then(user=>{
        if(!user){
            errors.email='Invalid Credentials'
            errors.password='Invalid Credentials'
            return res.status(404).json(errors)
        }
        else{
            //Check password
            bcrypt.compare(password,user.password)
            .then(isMatch=>{
                if(isMatch){
                    //Success
                    const paylaod = {id: user._id,name: user.name, avatar:user.avatar} //Create JWT payload
                    //Sign TOken
                    jwt.sign(
                        paylaod,
                        process.env.SECRET,
                        {expiresIn: 3600},//Expires in 3600s or 1-hour
                        (err,token)=>{
                            res.json({ 
                                success: true,
                                token: 'Bearer ' + token
                            })
                        }
                    )
                }
                else{
                    errors.email='Invalid Credentials'
                    errors.password='Invalid Credentials'
                    res.status(404).json(errors)
                }
            })
        }
    })
})
 
// @route                              GET api/users/current
// @desc                               Tests Current route
// @access                             Private
router.get('/current',passport.authenticate('jwt',{session:false}),(req,res)=>{
    res.json({
        id:req.user._id,
        name: req.user.name,
        email: req.user.email
    })
})
module.exports = router