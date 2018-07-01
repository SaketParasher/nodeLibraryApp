
const express = require('express');
const { MongoClient,ObjectID } = require('mongodb')
const bookRouter = express.Router();

// Router function which takes nav which is common to all book routes as parameter
function router(nav){

    
    //for any route localhost:4000/books/
    bookRouter.route('/').get((req,res) => {
        const url = 'mongodb://localhost:27017';
        const dbName = 'libraryApp';

        let client = () =>{
            return new Promise((resolve,reject) => {
                if(MongoClient.connect(url))
                    resolve(MongoClient.connect(url));
                else
                    reject('Error in connecting URL')
            });
        }

        client().then((connection) => {
            console.log('Connection Created'+connection);
            const db = connection.db(dbName);
                return new Promise((resolve,reject) =>{
                    if(db.collection('books'))
                        resolve(db.collection('books'));
                    else{
                        reject('Error from db.collection');
                        client.close();
                    }
                });
            
        }).then((col) => {
            console.log('Books collection '+col);
                return new Promise((resolve,reject) =>{
                    if(col.find()){
                        resolve(col.find().toArray());
                        client.close();

                    }
                    else{
                        reject('Error from col.find');
                        client.close();
                    }
                });
            
        }).then((books) =>{
            console.log('Response');
            
            res.render('books',
            {
                title:'MyLibrary',
                nav:nav,
                books:books
            });
        })
        .catch((e)=>{console.log('Promise Catch');console.log(e);});

    
    
        // res.render will render the books.ejs located at views directory which is ./src/views
        // it will also send the object to books.ejs which contains title and nav 
            /*res.render('books',
            {
                title:'MyLibrary',
                nav:nav,
                books:books
            });*/
    });
        
        //for any route localhost:4000/books/single
    bookRouter.route('/:id').get((req,res) => {
            const id = req.params.id;
            const url = 'mongodb://localhost:27017';
            const dbName = 'libraryApp';

            (async function mongo(){
                let client;
                try {
                    const client = await MongoClient.connect(url);
                    const db = client.db(dbName);

                    const col = await db.collection('books');
                    const book = await col.findOne({_id:new ObjectID(id)});
                    res.render('singleBook',
                    {
                        title:'MyLibrary',
                        nav:nav,
                        book:book
                    });
                } catch (err) {
                    console.log(err.stack);
                }
            }())
            
    });
return bookRouter;
}

// initialy we were passing bookRouter but now we have created a router function so we will pass router function
//module.exports = bookRouter;

module.exports = router;