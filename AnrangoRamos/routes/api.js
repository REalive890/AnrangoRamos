//mongo
const myQuery = require("./myQuery");
const urlDB = "mongodb://127.0.0.1:27017/";
//express
var express = require('express');
var router = express.Router();


router.get('/argomenti', async function(req, res, next) {
    try {
        var dati;
        dati = await myQuery.find(urlDB, "questionnaire", "argomenti", {});
        inviaRisposta(res, dati, 200);
    } catch (e) {
        inviaRisposta(res, { error: "Errore del server: " + e }, 500);

    }
});
router.get('/domande', async function (req, res, next) {
    try {
        //checkare session
        var utente = req.session.testo;
        console.log(utente)
        if (!utente) inviaRisposta(res, { error: "Sessione non trovata" }, 400);
        var dati;
        console.log(utente.id_argomento)
        dati = await myQuery.find(urlDB, "questionnaire", "domande", {idargomento:utente.id_argomento});
        inviaRisposta(res, dati, 200);
    } catch (err) {
        inviaRisposta(res, { error: "Errore del server: " + err }, 500);
    }
});
router.get('/correzione', async function (req, res, next) {
    var utente = req.session.testo
    
    var arg = (await myQuery.find(urlDB, "questionnaire", "argomenti", {_id:utente.id_argomento}))[0]
    var test = (await myQuery.find(urlDB, "questionnaire", "risposte", { nome: utente.nome }))[0]
    console.log(test)
    var g1 = (await myQuery.find(urlDB, "questionnaire", "domande", {_id:test.iddomanda1}))[0]
    var g2 = (await myQuery.find(urlDB, "questionnaire", "domande", { _id: test.iddomanda2 }))[0]
    var correzione ={
        argomento:arg.argomento,
            nome:utente.nome,
        data_test:test.data_test,
            risposta1:test.risposta1=='a'?g1.opz_a:test.risposta1=='b'?g1.opz_b:g1.opz_c,
        giusto1:test.risposta1==g1.risp_corretta,
        risposta2: test.risposta2=='a'?g2.opz_a:test.risposta2=='b'?g2.opz_b:g2.opz_c,
        giusto2:test.risposta2==g2.risp_corretta
    }
    console.log(correzione)
    inviaRisposta(res,correzione,200)
})
router.post('/risposte', async function (req, res, next) {
    try {
        var utente=req.session.testo
        if (!utente) inviaRisposta(res, { error: "Sessione non trovata" }, 400);
        var dati = req.body;
        var questionnaire = {
            nome: utente.nome,
            ...dati,
            data_test: new Date()

        }
        console.log(questionnaire)
        await myQuery.insertOne(urlDB, "questionnaire", "risposte", questionnaire);
        inviaRisposta(res, {msg:"Risposta inserita con successo"} , 200);
    } catch (e) {
        inviaRisposta(res, { error: "Errore del server: " + e }, 500);
    }
});
//session handlers
router.post("/session", (req, res) => {
    try {
        var txtSession = req.body;

        req.session.testo = txtSession;
        console.log(req.body)
        console.log(req.session)
        console.log(req.session.testo)
        inviaRisposta(res, "Session Creata", 200);
    } catch (err) {
        inviaRisposta(res, { error: "Errore del server: " + err }, 500);
    }
});
//leggo Session
router.get("/session", (req, res) => {
    try {
        var txtSession = { txtSession: req.session.testo };
        inviaRisposta(res, txtSession, 200);
    } catch (err) {
        inviaRisposta(res, { error: "Errore del server: " + err }, 500);
    }
});
//elimino Session
router.delete("/session", (req, res) => {
    try {
        req.session.destroy();
        inviaRisposta(res, "Session Eliminata", 200);
    } catch (err) {
        inviaRisposta(res, { error: "Errore del server: " + err }, 500);
    }
});
function inviaRisposta(res, dati, status) {
    console.log(dati);
    res.status = status;
    res.set({ "Content-Type": "application/json" });
    res.json(dati);
}

module.exports = router;