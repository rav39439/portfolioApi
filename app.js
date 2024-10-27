var express = require("express")
const path = require('path')
var session = require("express-session")
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const cookieparser = require('cookie-parser')
const cors = require('cors');
const crypto = require('crypto');
const nodemailer = require('nodemailer')
const { GridFsStorage } = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
///const methodOverride = require('method-override');
//Grid = require('mongodb').Grid
Grid.mongo = mongoose.mongo;
//const fileUpload=require("express-fileupload")
//const pdfParse=require("pdf-parse")
var app = express()

const fs = require("fs")
const multer = require('multer')
//const { ObjectId } = require('mongodb');
var bodyParser = require('body-parser')

const dotenv = require("dotenv");
require('dotenv').config()
app.use(cookieparser())

app.use(bodyParser.json());
// app.use(
//     session({
//       secret: 'ugkufyufy',
//       resave: false,
//       saveUninitialized: false,
//       cookie: {
//         maxAge: 20000,
//         secure: false,
//       },
//     })
//   );
  
const MongodbSession = require('connect-mongodb-session')(session);
console.log(process.env.URL)
const store = new MongodbSession({
    uri: process.env.URL,
    collection: "mysessions",

})


var http = require("http").createServer(app)
var io = require("socket.io")(http, {
    cors: {
        // origin: "https://newblogecomm.herokuapp.com/",
        origin: "https://rav39439.github.io/ArticleJavascript.github.io",
        credentials: true
    }
})

app.use(cors({
    origin: "https://rav39439.github.io/ArticleJavascript.github.io" // Allow requests only from this origin
}));

const bcrypt = require('bcrypt');
var bodyParser = require("body-parser")
var ObjectId = require("mongodb").ObjectId
app.use(bodyParser.urlencoded())
app.get('/public', express.static('public'));
app.use(express.static('public'));
app.use("/public", express.static(__dirname + "/public"))
// app.use(session({
//     key:"admin",
//     secret:"any random string",
//     resave: true, 
//     saveUninitialized: true,
//     cookie: { maxAge:24 * 60 * 60 * 1000 },
//     store:store
// }))


app.use(session({
    secret:process.env.YURL, // Replace with a secure key in production
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: { maxAge: 300000 } // Session valid for 5 minutes
}));
function newmiddle1(req, res, next) {
    let userdata = req.body
    req.session.email = userdata.username
    req.session.organization = userdata.organization

    next()
}




const conn = mongoose.createConnection(process.env.URL, { useNewUrlParser: true, useUnifiedTopology: true });


//--------------------------gridfs-------------------------------------------------------------
let gfs
conn.once('open', () => {


    gridFSBucket = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: 'uploads'
    });
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads');
});


const storage = new GridFsStorage({
    url: process.env.URL,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                const filename = buf.toString('hex') + path.extname(file.originalname);
                const fileInfo = {
                    filename: filename,
                    bucketName: 'uploads'
                };
                resolve(fileInfo);
            });
        });
    }
});

const upload = multer({ storage });
app.set("view engine", "ejs")
var MongoClient = require("mongodb").MongoClient;

MongoClient.connect(process.env.URL, { useNewUrlParser: true }, function (error, client) {
    var blog = client.db("blog")
    console.log("DB connected")

    app.get("/myprofile", (req, res) => {
        res.clearCookie('admin')
        blog.collection("messages").find().sort({ _id: 1 }).toArray(function (error, mymessages) {
            res.json({ messages: mymessages, messegeg: "You can send message now" })
            // console.log(mymessages)
        })
    })

    app.get("/myprofile/messagewithrav34897", (req, res) => {
        // res.render('user/messaging')
        res.send('start message')
    })

    app.get("/getform", (req, res) => {
        res.cookie('username', req.query.username, {
            maxAge: 300000
        })
        res.cookie('password', req.query.password, {
            maxAge: 300000
        })
        // blog.collection("messages").find().sort({ _id: 1 }).toArray(function (error, mymessages) {
        //     res.render("user/myprofile", { messages: mymessages, messegeg: "You can send message now" })
        // })
    })
    

    app.get('/logout', (req, res) => {
        req.session.destroy(err => {
            if (err) {
                return res.status(500).send('Failed to logout');
            }
            res.send('Session destroyed successfully');
        });
    });


    // app.post("/setUserSession", (req, res) => {
    //     const { username, organization } = req.body;
    
    //     // Set cookies for username and organization
    //     res.cookie('username', username, {
    //         maxAge: 300000,  // Cookie valid for 5 minutes
    //         httpOnly: true,  // Helps prevent cross-site scripting attacks
    //         secure: false    // Set to true if using HTTPS
    //     });
        
    //     res.cookie('organization', organization, {
    //         maxAge: 300000,
    //         httpOnly: true,
    //         secure: false
    //     });
    
    //     res.send('Session created successfully');
    // });
    // app.post("/myprofile/sendmessage", (req, res) => {
    //     console.log(req.cookies)
    //     console.log(req.cookies.username)

    //     if (req.cookies.username) {
    //         blog.collection("messages").insertOne({
    //             "username": req.cookies.username,
    //             "password": req.cookies.password,
    //             "message": req.body.comment,
    //         }, function (error, data) {
    //             res.json({
    //                 'username': req.cookies.username,
    //                 'password': req.cookies.password,
    //                 'comment': req.body.comment
    //             })
    //         })
    //     } else {
    //         res.json({
    //             'comment': "Not logged in"
    //         })
    //     }
    // })

    app.post("/setUserSession", (req, res) => {
        const { username, organization } = req.body;
        
        // Set session data
        req.session.username = username;
        req.session.organization = organization;

        res.send("Session created successfully");
    });
    
    // Route to access session data and send message
    app.post("/myprofile/sendmessage", (req, res) => {
        if (req.body.username) {
            // Using session data instead of cookies
            blog.collection("messages").insertOne({
                "username": req.body.username,
                "organization": req.body.organization,
                "message": req.body.comment,
            }, function (error, data) {
                if (error) {
                    return res.status(500).send("Error saving message");
                }
                res.json({
                    'username': req.body.username,
                    'organization': req.body.organization,
                    'comment': req.body.comment
                });
            });
        } else {
            res.json({
                'comment': "Not logged in"
            });
        }
    });
    

    app.get("/terminatesession", (req, res) => {
        res.clearCookie('username')
        res.clearCookie('password')
        res.clearCookie('admin')
        res.redirect("/myprofile")
    })

    //-----------------------------------------------------------------------------------------------
    http.listen(process.env.PORT || 3000, function () {
        console.log("connected")

    })
})