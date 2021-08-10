const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017';
const dbname = 'conFusion';

MongoClient.connect(url, (err, client) =>{
    assert.equal(err, null); //check if the error is equal to null

    console.log('Connected correctly to the server');

    const db = client.db(dbname);
    const collection = db.collection('dishes');

    collection.insertOne({"name": "Dominos_Pizza", "description": "test"}, (err, result) =>{
        assert.equal(err, null);
        console.log('After Insert:\n');
        console.log(result.ops);

        collection.find({}).toArray((err, docs) => {
            assert.equal(err, null);

            console.log('Found:\n');
            console.log(docs); //documents matched with our criteria will be returnd (here all docs)

            db.dropCollection('dishes', (err, result) =>{
                assert.equal(err, null);
                client.close();
            });
        });
    });
});