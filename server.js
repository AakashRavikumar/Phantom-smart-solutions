const express = require('express')
const dotenv = require('dotenv');
const passport = require("passport");
const session = require("express-session")
const facebookStrategy = require("passport-facebook").Strategy;
const { urlencoded } = require('express');

const db = require("./database/dbConnection")
const User = require("./model/user");
const joinCollections = require("./threeCollectionJoin/threeCollectionJoin");
const callBackHell = require("./callBackHell/callBackHell");
const asyncAwait = require("./asyncFunctions/asyncAwait");
const dataEncryptDecrypt = require("./crypto/dataEncryptDecrypt");
const razorpayCreateAndVerify = require("./razorPay/razorPayIntegretion");

const app = express()
const port = process.env.PORT || 3000

dotenv.config({ path: './config.env' });

app.use(urlencoded({extended:false}));
app.use(express.json());
app.use(passport.initialize());
app.use(session({secret:process.env.SESSION_SECRET,resave:false,saveUninitialized: false}))

//connecting to db
db.connectDB();

// 2. facebook-passport Authentication 

// one should create an developer account which is mandatory to perform facebook authentication login 
passport.use(new facebookStrategy({
    clientID: process.env.CLIENT_ID_FB,
    clientSecret: process.env.CLIENT_SECRET_FB,
    callbackURL: "http://localhost:3000/auth/facebook/phantom/test", // callback url 
    profileFeilds:["id","displayName","gender","email"]
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOne({ facebookId: profile.id }, function (err, user) {
      return cb(err, user); 
    });
  }
));

// facebook authenticaton and its redirections sample :
app.get('/auth/facebook',passport.authenticate('facebook'));
app.get('/auth/facebook/phantom/test',passport.authenticate('facebook', { successRedirect: '/homePage',failureRedirect: '/login' }));
app.get("/homePage",(req,res)=> res.send("login success"));
app.get("/login",(req,res)=> res.send("login failed!"));

// three collection join sample using mongoose :
app.get('/api/threeCollectionJoin',  (req, res) => { joinCollections.joinCollections(req, res); });

// callback hell sample :
app.get('/api/callBackHell', (req, res) => { callBackHell.callBackHell(req, res); });

// three funcs called using async await :
app.get('/api/asyncAwait', (req, res) => { asyncAwait.asyncAwait(req, res); });

// data encryption and decryption using AES :
app.post('/api/encryptData', (req, res) => { dataEncryptDecrypt.encryptDate(req, res); });
app.post('/api/decryptData', (req, res) => { dataEncryptDecrypt.decryptDate(req, res); });

// razorpay integration :
app.post("/api/createOrder",(req,res)=>{razorpayCreateAndVerify.createOrder(req,res)});
app.post("/api/capturePayment",(req,res)=>{razorpayCreateAndVerify.capturePayment(req,res)});

// serialize and deserialize user for using passport
passport.serializeUser(function(user, done) { 
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id,(err,user)=>{
    done(err,user);
  })
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
})



