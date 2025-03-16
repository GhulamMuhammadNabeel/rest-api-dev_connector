const express = require('express')
const app = express()
const bodyparser = require('body-parser')
const connectDB = require('./config/db')
const users = require('./routes/api/users')
const posts = require('./routes/api/posts')
const profile = require('./routes/api/profile')
const passport  = require('passport')
require('dotenv').config()
connectDB()
 
//Body Parser to get req.body.//
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())

const port = process.env.PORT || 5000

//Passport Middleware
app.use(passport.initialize())

//Passport Config
require('./config/passport')(passport)

// Use Routes
app.use('/api/users',users)
app.use('/api/posts',posts)
app.use('/api/profile',profile)

app.listen(port,()=>console.log(`App is running  on http://localhost:${port}`))