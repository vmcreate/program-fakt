const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({ origin: true });
admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.createUserNew = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        admin.auth().createUser({
            email: req.query.email.toString(),
            password: req.query.password.toString()
        })
            .then(function (userRecord) {
                // See the UserRecord reference doc for the contents of userRecord.
                console.log("Successfully created new user:", userRecord.uid);
                res.json(userRecord)
            })
            .catch(function (error) {
                console.log("Error creating new user:", error);
                res.send(error)
            });
    })

});
