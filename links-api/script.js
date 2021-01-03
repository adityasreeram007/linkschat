var ex = require('express');

var admin = require("firebase-admin");
var serviceAccount = require("./service.json");
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var firebase = require('firebase')
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://links-chat-d00fd-default-rtdb.firebaseio.com"
});
var app = ex();
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(3006);
var firebaseConfig = {
    apiKey: "AIzaSyBr_to_AlNWY7aQ2jlto9ixxy1_hTWH82I",
    authDomain: "links-chat-d00fd.firebaseapp.com",
    projectId: "links-chat-d00fd",
    storageBucket: "links-chat-d00fd.appspot.com",
    messagingSenderId: "179909606266",
    appId: "1:179909606266:web:ea4a4490b2a563afe1b4c3",
    measurementId: "G-QEN4PK6007"
};

firebase.initializeApp(firebaseConfig);

function formater(email) {
    email = email.replace('@', '-')
    email = email.replace('.', '-')
    return email

}
app.get('/', function(req, res) {
    res.send("hello")
})
app.post("/login", async(req, res) => {
    try {
        console.log(req.body)
        console.log(formater(req.body.uname))
        await firebase.auth().signInWithEmailAndPassword(req.body.uname, req.body.pass)
        console.log(1)
        var db = admin.database()
        var ref = db.ref();

        ref.child('users').child(formater(req.body.uname)).child("friends").once("value", function(data) {
            console.log(data.val())
            return res.send({ status: true, data: data.val() })
        })



    } catch {
        console.log(1)
        return res.send({ status: false })
    }
})

app.post('/register', async(req, res) => {
    try {
        console.log(req.body)
        var db = admin.database()
        var ref = db.ref();
        firebase.auth().createUserWithEmailAndPassword(req.body.uname, req.body.pass).then(
            function() {
                var em = req.body.uname
                em = em.replace('@', '-')
                em = em.replace('.', '-')
                ref.child("users").child(em).set({
                    username: req.body.username,
                })
            }
        )
        return res.send({ status: true })
    } catch {
        return res.send({ status: false })
    }

})

app.post('/checkuser', async(req, res) => {
    console.log(req.body)
    var db = admin.database()
    var ref = db.ref();
    ref.child('users').child(formater(req.body.search)).once("value", function(data) {
        console.log(data.val())
        if (data === null) {
            console.log(null)
            return res.send({ status: false })
        }
        ref.child('users').child(formater(req.body.username)).child('friends').child(formater(req.body.search)).set({

            username: data.val().username,
            date: new Date().toDateString(),

        })


        return res.send({ status: true, data: data.val(), id: formater(req.body.search) })


    })
})