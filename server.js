const express  = require('express')
const app = express()
const bodyParser= require('body-parser')
const cors = require('cors');
require('dotenv').config()

const JwtMiddleware = require('./common/security/jwt').authenticationToken

const JwtDecrypt = require('./common/security/jwt').decryptToken

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors())

//Database
const mongo = require('./database/mongodb'); 
mongo()

// Routers
const Auth = require('./routes/auth')
app.use('/api/auth', Auth)

// Default view
app.get('/',(req,res)=>{
    res.send("Working")
})
  
app.listen(process.env.PORT || 3000 , () =>{
    console.info("Server is Running On " + process.env.BASE_URL + ":" + process.env.PORT )
})