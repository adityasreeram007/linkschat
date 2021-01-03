formater = (email) => {
    email = email.replace('@', '-')
    email = email.replace('.', '-')
    return email

}
var serviceAccount = require("./service.json");
var admin = require("firebase-admin");
var firebase = require('firebase')
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://links-chat-d00fd-default-rtdb.firebaseio.com"
});
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
var db = admin.database()
var ref = db.ref();
em = formater("sankarnarayanancse@gmail.com")

friend = formater("vijayganeshsreeram2003@gmail.com")
    // console.log(friend)
    // ref.child("users").child(em).child('friends').child(friend).set({
    //     date: new Date().toDateString(),
    //     username: "vijay"
    // })
ref.child('users').child(em).once("value", function(data) {
    console.log(data.val())
        // return res.send({ status: true, data: data.val() })
})