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
exports.scheduledFunction = functions.pubsub.schedule('00 08 1 1/1 *')
    .timeZone('America/New_York') // Users can choose timezone - default is America/Los_Angeles
    .onRun(async context => {

        const db = admin.firestore();
        const query = db.collectionGroup('pracun');
        const tasks = await query.get();
        const jobs = [];

        tasks.forEach(snapshot => {
            const data = snapshot.data();
            jobs.push({ ...data, id: snapshot.id });

        });
        jobs.map(async (job, ind) => {
            const mkkey = (length) => {
                var result = [];
                var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                var charactersLength = characters.length;
                for (var i = 0; i < length; i++) {
                    result.push(characters.charAt(Math.floor(Math.random() *
                        charactersLength)));
                }
                return result.join('');
            }
            let racun;

            let uid = job.kompanijaUid + '';
            let klijentuid = job.klijentUid + '';
            const docKey = mkkey(20);
            if (job.status === 'zavrseno') {

                const queryKomp = db.collection('kompanija').doc(uid);
                await queryKomp.get().then(snap => {
                    racun = snap.data().racun + ind + 1;
                    queryKomp.update({ racun: snap.data().racun + ind + 1 })
                })
                try {

                    const datumI = new Date().valueOf();
                    const datumV = new Date(datumI).valueOf() + 2592000000;
                    if (racun < 10) {
                        (racun = '000' + racun.toString());
                    }
                    else if (racun < 100) {
                        (racun = '00' + racun.toString());
                    }
                    else if (racun < 1000) {
                        (racun = '0' + racun.toString());
                    }
                    else {
                        (racun = racun);
                    }
                    db.collection('kompanija').doc(uid).collection('racun').doc(docKey)
                        .set({ ...job, datumIzdavanja: datumI, datumVazenja: datumV, brojracuna: racun })
                        .then(() => {
                            db.collection('klijenti').doc(klijentuid).collection('racun').doc(docKey)
                                .set({ ...job, datumIzdavanja: datumI, datumVazenja: datumV, brojracuna: racun })
                        }).then(() => {
                            queryKomp.collection('pracun').doc(docKey).update({ pocetniDatum: new Date(datumI).valueOf() })
                        })


                }
                catch (err) {
                    return err
                }
            }
        });

        return await Promise.all(jobs);
    });