var mongoDB = require("mongodb");

async function find(url, database, collection, query) {
    const connessione = new mongoDB.MongoClient(url);
    const db = await connessione.db(database);
    const result = await db.collection(collection).find(query).toArray();
    return result;
}
async function insertOne(url, database, collection, dato) {
    const connessione = new mongoDB.MongoClient(url);
    const db = await connessione.db(database);
    const result = await db.collection(collection).insertOne(dato);
    return result;
}
async function insertMany(url, database, collection, dati) {
    const connessione = new mongoDB.MongoClient(url);
    const db = await connessione.db(database);
    const result = await db.collection(collection).insertMany(dati);
    return result;
}
async function deleteOne(url, database, collection, filtro) {
    const connessione = new mongoDB.MongoClient(url);
    const db = await connessione.db(database);
    const result = await db.collection(collection).deleteOne(filtro);
    return result;
}
async function deleteMany(url, database, collection, filtro) {
    const connessione = new mongoDB.MongoClient(url);
    const db = await connessione.db(database);
    const result = await db.collection(collection).deleteMany(filtro);
    return result;
}
async function updateOne(url, database, collection, criterio, valore) {
    const connessione = new mongoDB.MongoClient(url);
    const db = await connessione.db(database);
    const result = await db.collection(collection).updateOne(criterio, { $set: valore });
    return result;
}
async function updateMany(url, database, collection, criterio, valore) {
    const connessione = new mongoDB.MongoClient(url);
    const db = await connessione.db(database);
    const result = await db.collection(collection).updateMany(criterio, { $set: valore });
    return result;
}
module.exports = {
    find,
    insertOne,
    insertMany,
    deleteOne,
    deleteMany,
    updateOne,
    updateMany
};