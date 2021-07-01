const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({ origin: true });
const nodemailer = require('nodemailer');
admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    service: 'gmail',
    auth: {
        user: 'pfsportal20@gmail.com',
        pass: 'pfsportal-20.'
    }
});
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
            if (snapshot.data().status === 'zavrseno' && new Date(snapshot.data().zavrsniDatum).valueOf() > new Date().valueOf()) {
                jobs.push({ ...data, id: snapshot.id });
            }
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
            const pracunId = job.id;
            const docKey = mkkey(20);
            const queryKomp = db.collection('kompanija').doc(uid);
            await queryKomp.get().then(snap => {

                racun = snap.data().racun + 1 + ind;
                console.log(racun)

            })
                .then(() => { queryKomp.update({ racun: Number(racun) }) })
                .then(() => {
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
                                db.collection('kompanija').doc(uid).collection('pracun').doc(pracunId).update({ pocetniDatum: new Date(datumI).valueOf() })
                            })


                    }
                    catch (err) {
                        return err
                    }
                })
                .catch(err => console.log(err))


        });

        return await Promise.all(jobs);
    });

exports.noviRacun = functions.firestore
    .document('/kompanija/{uid}/racun/{id}')
    .onCreate((snap, context) => {
        const uid = context.params.uid;
        const id = context.params.id;

        const mailOptions = {
            from: `UPRAVITELJ ZGRADE`,
            to: 'viktor.molnar1992@gmail.com',
            subject: '⚠️IMATE NOVO OBAVESTENJE⚠️', // email subject
            html: `
     <html>
     <body style="color:black;">
          <h3>✋✋Pozdrav,</h3></br>${uid, id}
          <h4 >Imate novo obavestenje na portal <span style="color:red;">Moja zgrada PFS.</span></h4>
          <a href= 'https://pfs-portal-20.firebaseapp.com' target="blank">🔗 Link do sajta</a>
    <h6>✋ Vas, PROFESIONALI UPRAVITELJI TIM 😊</h6>
      </body>
  
     </html>
     `
        };

        // returning result
        // tslint:disable-next-line: no-void-expression
        return transporter.sendMail(mailOptions, erro => {
            if (erro) {

                return erro;
            }

            return null;
        });


    });
exports.posaljiRacun = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        // getting dest email by query string
        const dest = req.query.dest;
        const pdf = req.query.pdf;
        const mailOptions = {
            from: `PROGRAM ZA FAKTURU`,
            to: dest,
            subject: 'Faktura', // email subject
            html: `
             <html>
             <h1>Obevestenje o prispelom racunu.</h1>
             <body>
             <h4>
             <a href="${pdf.replace('racun-pdf/', 'racun-pdf%2F')}"> Kliknite da bi ste preuzeli racun. </a>
            
             </h4>
              </body>
           
             </html>
             `
        };

        // returning result
        return transporter.sendMail(mailOptions, (erro, info) => {
            if (erro) {
                return res.send(erro.toString());
            }
            return res.send('Sended');
        });
    });
});