const assert = require('assert');
const Collection = require('mongodb/lib/collection');
const { callbackify } = require('util');

exports.insertDocument = (db, document, collection, callback) => {
    const coll = db.collection(collection);
    coll.insert(document, (err, result) =>{
        assert.equal(err, null);
        console.log("Inserted " + result.result.n + " documents into the collection " + collection);
        callback(result);
    });
};

exports.findDocuments = (db, collection, callback) => {
    const coll = db.collection(collection);
    coll.find({}).toArray((err, docs) => {
        assert.equal(err, null);
        callback(docs);
    });
};

exports.removeDocument = (db, document, collection, callback) => {
    const coll = db.collection(collection);
    // const coll = db.collection(collection);
    coll.deleteOne(document, (err, result) => {
        assert.equal(err, result);
        console.log("Removed the document ", document);
        callback(result);
    });
};

exports.updateDocument = (db, document, update, collection, callback) => {
    const coll = db.collection(collection);
    coll.updateOne(document, {$set: update} /*<-fields to be updated */, null, (err, result) => {
        assert.equal(err, null); //error is null
        console.log("Updated the document with ", update);
        callback(result);
    });
};