const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dboper = require('./operations');

const url = 'mongodb://localhost:27017';
const dbname = 'conFusion';

MongoClient.connect(url, (err, client) =>{
    assert.equal(err, null); //check if the error is equal to null

    console.log('Connected correctly to the server');

    const db = client.db(dbname);
    dboper.insertDocument(db, {name: "MyDonut", description: "Test"}, 'dishes', (result) =>{
        console.log('Insert Document:\n', result.ops); //no. of operations carried out

        //next database operation
        dboper.findDocuments(db, 'dishes', (docs) => {
            console.log('Found Documents:\n', docs);

            dboper.updateDocument(db, {name: 'MyDonut'}, {description: 'Updated Test'}, 'dishes', (result)=>{
                console.log('Updated Document:\n', result.result);

                dboper.findDocuments(db, 'dishes', (docs) => {
                    console.log('Found Documents:\n', docs);

                    db.dropCollection('dishes', (result) =>{
                        console.log('Dropped Collection: ', result);

                        client.close();
                    });
                });
            });
        });
    });
});