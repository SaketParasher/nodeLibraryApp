const express = require('express');
const adminRouter = express.Router();
//const MongoClient = require('mongodb').MongoClient; // we only need MongoClient
const MongoClient = require('mongodb').MongoClient;

const books = [
    {
        id: 1,
        title: 'War and Peace',
        genre: 'Historical Fiction',
        author: 'Lev Nivochski Tolstyo',
        read: false
    },
    {
        id: 2,
        title: 'Apocalypse Culture',
        genre: 'Mystery Culture',
        author: 'Adam Parfrey',
        read: false
    },
    {
        id: 3,
        title: 'Beijing Coma',
        genre: 'Historical Fiction',
        author: 'Mai Jiaen',
        read: false
    },
    {
        id: 4,
        title: 'An Area of Darkness',
        genre: 'Mystery',
        author: 'William Powell',
        read: false
    },
    {
        id: 5,
        title: 'American Psycho',
        genre: 'Historical Fiction',
        author: 'Bret Easton Ellis',
        read: false
    },
    {
        id: 6,
        title: 'Alice\'s Adventures in Wonderland',
        genre: 'Adventure Fiction',
        author: 'Lewis Carroll',
        read: false
    }
];
function router(nav) {

    adminRouter.route('/')
        .get((req, res) => {
            const url = 'mongodb://localhost:27017';
            const dbName = 'libraryApp';

            /*function mongo(){
                return new Promise((resolve,reject) =>{
                    let client;
                    try{
                        MongoClient.connect(url,(err,client) => {
                            console.log('Connected to DB');
                            const db = client.db(dbName);
                            const response = db.collection('books').insertMany(books,(err,result) => {
                                if(err){
                                    console.log(err.name,err.message);
                                    reject('Err from insertMany');
                                }
                                
                            if(result)
                                resolve(result);
                            });
                        });
                    }catch(e){
                        console.log('ERRR :--' +e);
                        reject('Error at DBBBB');
                    }
    
                });
            }
            mongo().then((resp) =>{console.log(resp);res.json(resp)},(rej) =>{console.log('Rejected ::--'+rej);res.send('ERRRRRRRR')});
          */


            (async function mongo() {
                let client;
                try {
                    client = await MongoClient.connect(url);
                    console.log('Database connected');

                    const db = client.db(dbName); // we are gonna use database libraryApp
                    const response = await db.collection('books').insertMany(books);
                    res.json(response);
                } catch (error) {
                    console.log(error);
                }
                client.close();
            }())

        });

    return adminRouter;
}

module.exports = router;

