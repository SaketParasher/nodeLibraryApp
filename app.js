const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(morgan('tiny')); // we can use combined or tiny options here
app.use(express.static(path.join(__dirname,'public'))); // serve static files to express from this path

// if express looks for css and js in public folder and it finds there that's great otherwise look into these paths
// static files are being served from node modules directory
app.use('/css',express.static(path.join(__dirname,'./node_modules/bootstrap/dist/css')));
app.use('/js',express.static(path.join(__dirname,'./node_modules/bootstrap/dist/js')));
app.use('/js',express.static(path.join(__dirname,'./node_modules/jquery/dist')));

const nav = [
    {'link':'/books','title':'Books'},
    {'link':'/author','title':'Authors'}
];
const bookRouter = require('./src/routes/bookRoute')(nav); // ROUTER FUNCTION
const adminRouter = require('./src/routes/adminRoutes')(nav);

app.use('/books',bookRouter); // for any route localhost:4000/books use bookRouter route
app.use('/admin',adminRouter);

// app.set is allow us set on application instance
app.set('views','./src/views');  // view directory
//app.set('view engine','pug');
app.set('view engine','ejs');   // view engine     



app.get('/',(req,res) =>{
    
    //res.sendFile(path.join(__dirname,'views','index.html'));
    //going to render a view called index it will go to /src/views/index.pug
    res.render('index',
    {
        title:'MyLibrary',
        nav:[
            {'link':'/books','title':'Books'},
            {'link':'/author','title':'Authors'}
        ]
    });
});

app.listen(port,() =>{
    console.log(`App listening at ${chalk.green(port)}`);
    debug(`App listening at ${chalk.green('3000')}`);
});