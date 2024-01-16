
const express = require('express')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const Qs = require('query-string');

const dotenv = require("dotenv");
require('dotenv').config()
var firebase = require('firebase')
const authdomain = process.env.authDomain;
const projectId = process.env.projectId;
const storageBucket = process.env.storageBucket;
const messagingSenderId = process.env.messagingSenderId;
const appId = process.env.appId;
const measurmentId = process.env.measurmentId;
const APIKEY = process.env.APIKEY;
var firebaseConfig = {
    apiKey: APIKEY,
    authDomain: authdomain,
    projectId: projectId,
    storageBucket: storageBucket,
    messagingSenderId: messagingSenderId,
    appId: appId,
    measurementId: measurmentId
}

firebase.initializeApp(firebaseConfig)





//------------test-----------------------//
const collectionName = 'articles';
const documentId = 'Physics';
//---------------------------------------//
const app = express()
var bodyParser = require("body-parser")
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var ObjectId = require("mongodb").ObjectId
const DATABASE = process.env.DATABASE;
// Now you can use Firebase services
const PASSKEY = process.env.PASSKEY;
const date = require('date-and-time')
const sendgridtransport = require('nodemailer-sendgrid-transport')
const path = require("path")
const hbs = require("hbs")
const bcrypt = require('bcryptjs');
var bodyParser = require("body-parser")
app.use(bodyParser.urlencoded())
app.engine('html', require('ejs').renderFile);
const cors = require('cors')
app.use(cors(), function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});
// const {
//     userJoin,
//     getCurrentUser,
//     userLeave,
//     getRoomUsers
// } = require('./utils/users');
// const formatMessage = require('./utils/messeges');
const formidable = require('formidable')
const fs = require('fs')
const pathset = path.join(__dirname, "/Templates/partials")
const setpath = path.join(__dirname, "/Templates/views")
hbs.registerPartials(pathset)

//--------------------mongodb-------------------------------------------------------------
var http = require("http").createServer(app)
var io = require("socket.io")(http, {
    cors: {
        origin: "https://neweducationworld.onrender.com",
        //origin: "http://localhost:8700",
        credentials: true
    }
})
var session = require("express-session");

app.use(session({
    key: "admin",
    secret: "any random string",
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 24 * 60 * 60 * 1000 }
}))
const admin = require('firebase-admin');

serviceAccount = {
    type: process.env.type,
    project_id: process.env.project_id,
    private_key_id: process.env.private_key_id,
    private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDXB28gjePCkYxz\nsJZjEptXobG601arolRsKJJ6bZUCF2ADs0Zaq+SylnnLfdaX7gUZ8lSrsk6ff3al\nt3yxSgnfI4T8UhRbW5hj5Ps4tlEqZcH0k2JYfwLGwzoV68XJqkmC8fob7F9784lL\n30wrwMdX+3etqsTuDSermybVDpSeHaeyFJ7Iy/ovuVQdPNckrtzXM2/8UBQM9pdL\neQc840GCznF1/NCR4T4UyKaZOc+DAdBX/6SfUB95wF8OBZ65DzTSakg6JeVlzaKo\n5AR240QEMaifW4En2yB7R5lJPgtEw7DsmpAx1h6CzMe1LDVKsHf4/jPKnjeAsd9w\nj9Zu88Y7AgMBAAECggEAZ2ld2kwiwwn4gBLm4FKsfqJ2tSC6R+TTsQh6GYLl7JGN\nTXpEVYrhe7m+bUzhjUOdFHNkoQYppa9JQj1SLHks8jFE3Ywj2iPcz/3pi8ayli9F\n7feLjn/Wt/xfzPcMsgXBQMZawF8XNKdU2jZTjZ8yv29iiRTdjJarA26kaEaQ1tEO\ndInD4q45exa+sLOSe2OaHTIBNb2VQEhMoCMEh1DcvOlQG95qvNQJYaa82+ppkhFE\nHQIfOiUyyekbuaGFybfpuo1FfIFvlhdgXUKe1WhccveAN9Yzq5SHS1O5B2dBG5+H\n1kVl4UhNB0FCWj29ZTg5Hg5HPYvEJVQQ/JfmtojXUQKBgQDx20Nsi3MNzVoTsC97\no7Gn3DolpQorlNHCjt9O7uomXWP0tQI1Y0Hp37AOmBG5xi5K+al2VTYV+y4E/HpZ\n/T1f2UGZAPWZmzN14FQcX8VF59Q90H/EqiTDzeyIe0oCn4YgJvGMOOr519ffTZPU\nYPqVlrXCcDQZiJkJZ17hnx27dQKBgQDjmowvdUsMkhCMRuQq5FdFgs+WRUilN6f3\ni6h7H9fWI/xr2YlgNCv5Ra5RH6ddvxPVC+SYl67QiBNevbHvgQQtvyhDBPRaOHUN\nWEVXvWNXpAZR4Lld1cXu/oWsLP+lAnrUH8q8/mhjIdlkfFKcT9wz6eouO0gSGgOi\nWy/sGeY07wKBgG1AAoDxrRM7A8mI+Kn9E68jyBBhMOrm2qnsJ+tb+OFDpndPnKPJ\nJmki5kBxaPBmGVs809PkQf5D7FHMSuiDgEnftcYLrOWqOeCxaM04ZcBiLHmPyWdp\nBBp+1q4AIzp0HP5BGTOiMmKRoa35OSHifM89uPUQAjjWf2rECxQX8DJRAoGBANMh\nuE0F51p/3G3kDSBktTg8AkkJeDwbBusxWFbu0Q9KTovVPgRKIUiZBP0n+d+Sstj8\nsU+D1ZyHvkAyg+8CpVeybazN2cYffSWl7p1Xh+HyvBIT/qA2/+eVn3Z6P6NYS4ye\n+TicX0UmTz1RvmhWBJT7tkqwn0h7bUecgzXnSI9tAoGAfjDVvuSPLhDgfMi0P9iM\nuFesBV2wyE0XfP4pn30C45hpRlSdLGBQiWSycTKjl9Lg3jz2CSGXbp/cT1QUDb+K\nreyiVevnS4G5kmVFa737mi0VRtaOqiCqITwjA+DJXncn5f8LBYEqQ09N3GWJ7gt9\nrS196gIcwy1yG1lWiXE5MRM=\n-----END PRIVATE KEY-----\n",
    client_email: process.env.client_email,
    client_id: process.env.client_id,
    auth_uri: process.env.auth_uri,
    token_uri: process.env.token_uri,
    auth_provider_x509_cert_url: process.env.auth_provider_x509_cert_url,
    client_x509_cert_url: process.env.client_x509_cert_url
}



admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://mynewproject.firebaseio.com'
});

app.use(async (req, res, next) => {
    try {
        const collectionName = 'articles';
        let db = firebase.firestore()
        let topicnames = []
        db.collection(collectionName)
            .get()
            .then((querySnapshot) => {
                const articles = [];
                querySnapshot.forEach((doc) => {
                    articles.push(doc.data());
                });

                let refinedArticles = fetchdata(articles)
                res.locals.articles = refinedArticles
                topicnames = refinedArticles.map(d => ({ topic: d.topicName, subject: d.Subject, class: d.class }))
                res.locals.subjects = topicnames;
                if (req.body) {
                }

            })
        // Attach data to res.locals to make it available in all routes
        next();
    } catch (err) {
        console.error('Error fetching data from the database:', err);
        next(err);
    }
});


function removeDuplicates(arr) {
    return arr.filter((value, index, self) => self.indexOf(value) === index);
}


app.get('/', function (req, res) {
    const collectionName = 'articles';
    let db = firebase.firestore()
    db.collection(collectionName)
        .get()
        .then((querySnapshot) => {
            const articles = [];
            querySnapshot.forEach((doc) => {
                articles.push(doc.data());
            });
            let updatedarticles = fetchdata(articles).filter(item => !Array.isArray(item))
            let k = 'default'
            let m = 'default'
            let l = 'default'
            res.send({ articles: JSON.stringify(updatedarticles), allarticles: articles, goback: JSON.stringify(l), alltopics: filterDuplicates(res.locals.subjects), alltop: JSON.stringify(res.locals.subjects), grade: JSON.stringify(k), topic: JSON.stringify(m) })
            // res.render('allArticles.ejs', { articles: JSON.stringify(updatedarticles), allarticles: articles, goback: JSON.stringify(l), alltopics: filterDuplicates(res.locals.subjects), alltop: JSON.stringify(res.locals.subjects), grade:JSON.stringify(k), topic:JSON.stringify(m)});
        })
        .catch((error) => {
            console.log('Error getting documents:', error);
        });
})

function filterDuplicates(d) {
    let b = []
    let m = []
    d.forEach(e => {
        let j = m.find(p => p == e.class)
        if (!j) {
            b.push(e)
            m.push(e.class)
        }

    })
    return b
}


function fetchdata(data) {
    let d = []
    data.forEach((e) => {
        if (Object.keys(e).length != 0) {
            let keys = Object.keys(e)
            keys.forEach((key) => {
                d.push(e[key])
            })
        }
    })
    return d
}

app.get('/searchAns', (req, res) => {
    let db = firebase.firestore()
    db.collection('articles')
        .get()
        .then((querySnapshot) => {
            const articles = [];
            querySnapshot.forEach((doc) => {
                articles.push(doc.data());
            });
            let updatedarticles = fetchdata(articles)
            console.log(articles[5])

            res.render('searchAnswers.ejs', { articles: JSON.stringify(articles[5]), documents: JSON.stringify(articles[0]) });
        })
        .catch((error) => {
            console.log('Error getting documents:', error);
        });
})

app.post('/getAll', (req, res) => {
    const collectionName = 'articles';
    let db = firebase.firestore()
    db.collection(collectionName)
        .get()
        .then((querySnapshot) => {
            const articles = [];
            querySnapshot.forEach((doc) => {
                if (doc != null) {
                    articles.push(doc.data());

                }
            });

            let refinedArticles = fetchdata(articles)
            let topicnames = refinedArticles.map(d => d.topicName).filter(dv => dv != null)
            res.send({ alltopicnames: topicnames });
        })
        .catch((error) => {
            console.log('Error getting documents:', error);
        });
})


app.post('/goBack', (req, res) => {
    let a = []
    
    const collectionName = 'articles';
    let db = firebase.firestore()
    console.log(req.body)
    // if (documentId != 'All' && documentId != 'default') {
    //     let updateddata
    //     const docRef = db.collection(collectionName).doc(documentId);
    //     docRef.get()
    //         .then((doc) => {
    //             if (doc.exists) {
    //                 const data = doc.data();
    //                 a.push(data)
    //                 let arraydata = fetchdata1(data)

    //                 let refinedA = fetchdata1(data)
    //                 if (filter2 != 'default' && filter1 != 'default') {
    //                     updateddata = refinedA.filter(e => e.class == filter2 && e.topicName == filter1)
    //                 }
    //                 else if (filter2 != 'default') {
    //                     updateddata = refinedA.filter(e => e.class == filter2)
    //                 }
    //                 else if (filter1 != 'default') {
    //                     updateddata = refinedA.filter(e => e.topicName == filter1)
    //                 }
    //                 else {
    //                     updateddata = refinedA
    //                 }
    //                 res.send({
    //                     articles: JSON.stringify(updateddata), allarticles: updateddata, goback:JSON.stringify(documentId), alltopics: res.locals.subjects, alltop: JSON.stringify(res.locals.subjects)
    //                     , grade: JSON.stringify(req.session.grade), topic: JSON.stringify(req.session.topic)
    //                 })

    //             } else {
    //                 console.log('Document not found!');
    //             }
    //         })
    //         .catch((error) => {
    //             console.log('Error getting document:', error);
    //         });
    // } else {
    //     console.log("else part is running")
    //     console.log(documentId)
    //     if(!req.session.grade){
    //         req.session.grade="default"
    //     }
    //     if(!req.session.topic){
    //         req.session.topic="default"
    //     }
    //     let updateddata
    //     db.collection(collectionName)
    //         .get()
    //         .then((querySnapshot) => {
    //             const articles = [];
    //             querySnapshot.forEach((doc) => {
    //                 articles.push(doc.data());
    //             });

    //             let refinedA = fetchdata(articles)
    //             if (filter2 != 'default' && filter1 != 'default') {
    //                 updateddata = refinedA.filter(e => e.class == filter2 && e.topicName == filter1)
    //             }
    //             else if (filter2 != 'default') {
    //                 updateddata = refinedA.filter(e => e.class == filter2)

    //             }
    //             else if (filter1 != 'default') {
    //                 updateddata = refinedA.filter(e => e.topicName == filter1)
    //             }
    //             else {
    //                 updateddata = refinedA
    //             }
    //             res.send({
    //                 articles: JSON.stringify(updateddata), allarticles: updateddata, goback: JSON.stringify(documentId), alltopics: res.locals.subjects, alltop: JSON.stringify(res.locals.subjects)
    //                 , grade: JSON.stringify(req.session.grade), topic: JSON.stringify(req.session.topic)
    //             })
    //         })
    //         .catch((error) => {
    //             console.log('Error getting documents:', error);
    //         });
    // }
    // console.log(req.body.grade)
    // console.log(req.body.subject)

    filter1=req.body.grade
    // filter2=req.body.subject
    filter3=req.body.topicnames
  req.session.grade=filter1
     req.session.topic=filter3
    db.collection(collectionName)
        .get()
        .then((querySnapshot) => {
            const articles = [];
            querySnapshot.forEach((doc) => {
                articles.push(doc.data());
            });

            let refinedA = fetchdata(articles).filter(item => !Array.isArray(item))
            console.log(refinedA)
            if (filter3 != 'default' && filter1 != 'default') {
                updateddata = refinedA
            }
            else if (filter1 != 'default' && filter3=='default') {
                updateddata = refinedA.filter(e => e.class == filter1)

            }
            else if (filter1 == 'default' && filter3!='default') {
                updateddata = refinedA.filter(e => e.topicName == filter3)
            }
            else {
                updateddata = refinedA
            }
            console.log(res.locals.subjects)
            res.send({
                articles: JSON.stringify(updateddata), allarticles: updateddata, goback: JSON.stringify(documentId), alltopics: res.locals.subjects, alltop: JSON.stringify(req.body.subject)
                , grade: JSON.stringify(req.session.grade), topic: JSON.stringify(req.session.topic)
            })
        })
        .catch((error) => {
            console.log('Error getting documents:', error);
        });

})

function fetchdata1(data) {
    let d = []
    for (const e in data) {
        d.push(data[e])
    }
    return d
}

app.post('/docdata', function (req, res) {
    const collectionName = 'articles';
    const documentId = req.body.subject;
    let filter1 = req.body.topic
    let filter2 = req.body.grade
    req.session.topic = filter1
    req.session.grade = filter2
    req.session.subject = documentId
    let db = firebase.firestore()
    if (documentId != "All" && documentId != 'default') {
        let updateddata
        const docRef = db.collection(collectionName).doc(documentId);
        docRef.get()
            .then((doc) => {
                if (doc.exists) {
                    const data = doc.data();
                    let filterdupdate = fetchdata1(data)
                    if (filter2 != 'default' && filter1 != 'default') {
                        updateddata = filterdupdate.filter(e => e.class == filter2 && e.topicName == filter1)
                    }
                    else if (filter2 != 'default') {
                        updateddata = filterdupdate.filter(e => e.class == filter2)

                    }
                    else if (filter1 != 'default') {
                        updateddata = filterdupdate.filter(e => e.topicName == filter1)

                    }
                    else {
                        updateddata = filterdupdate
                    }

                    res.send({
                        articles: data,
                        topics: res.locals.subjects,
                        sendata: updateddata
                    })
                } else {
                    console.log('Document not found!');
                }
            })
            .catch((error) => {
                console.log('Error getting document:', error);
            });

    } else if (documentId == "All" || documentId == 'default') {
        db.collection(collectionName)
            .get()
            .then((querySnapshot) => {
                const articles = [];
                querySnapshot.forEach((doc) => {
                    articles.push(doc.data());
                });

                let filterdupdate = fetchdata(articles)
                if (filter2 != 'default' && filter1 != 'default') {
                    updateddata = filterdupdate.filter(e => e.class == filter2 && e.topicName == filter1)
                }
                else if (filter2 != 'default') {
                    updateddata = filterdupdate.filter(e => e.class == filter2)

                }
                else if (filter1 != 'default') {
                    updateddata = filterdupdate.filter(e => e.topicName == filter1)

                }
                else {
                    updateddata = filterdupdate
                }
                res.send({
                    sendata: updateddata,
                    topics: res.locals.subjects
                })
            })
            .catch((error) => {
                console.log('Error getting documents:', error);
            });
    }
    else {
        console.log(documentId)
    }
})

app.post('/fetchPage', function (req, res) {
    res.send({ articledata: req.body.articlevalue })
})

app.set("view engine", "hbs")
app.set("view engine", "ejs")
app.use(express.static('public'));
app.set("views", setpath)


//----------------------------------------newquizactions--------------------------------------

const PORT = process.env.PORT
http.listen(PORT || 8800, () => {
    console.log("listening")
})


function writeBinaryJson(jsonData, filePath) {
    fs.writeFile(filePath, jsonString, 'utf-8', (err) => {
        if (err) {
            console.error(`Error writing to file: ${err}`);
        } else {
            // console.log('JSON data written to note.txt');
        }
    });
}
const jsonData = [
    { "id": 1, "content": "Note 1" },
    { "id": 2, "content": "Note 2" },
    { "id": 3, "content": "Note 3" }
];

// Convert JSON data to a string
const jsonString = JSON.stringify(jsonData, null, 2); // The '2' argument adds indentation for better readability

// Specify the file path
const filePath = './note.txt';

// Write JSON array to binary file
writeBinaryJson(jsonString, filePath);

function readBinaryJson(filePath) {
    // Read the binary data from the file
    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
            console.error(`Error reading file: ${err}`);
            return;
        }

        // Parse the JSON data
        try {
            const jsonArray = JSON.parse(data);

            // Now 'jsonArray' contains the parsed array data
        } catch (parseError) {
            console.error(`Error parsing JSON: ${parseError}`);
        }
    });
}

// Read JSON array from binary file
const retrievedJsonArray = readBinaryJson(filePath);

// Print the retrieved JSON array


app.get("/verify-email", function (req, res) {
    if (req.query.token) {
        const decodedToken = jwt.verify(req.query.token, process.env.KEY_NEW)
        username = decodedToken.username
        email = decodedToken.email
        if (decodedToken.isadmin == true) {
            req.session.username = decodedToken.username
            req.session.email = decodedToken.email
            req.session.isadmin = decodedToken.isadmin
            res.redirect('/')
        }
        else {
            req.session.destroy()
            res.send("something wrong please contact")
        }
    }
    else {
    }

})
