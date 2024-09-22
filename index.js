const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const router = require('./routers/router');
const path = require('path');
const port = 3009;
const Path = path.join(__dirname , "/views");
const cookieparser = require('cookie-parser');
const db = require('./config/db');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(cookieparser());

app.use(express.static(Path));
app.use('/' , express.static(path.join(__dirname , "/")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/' , router);
app.listen(port , (err) => {

    if(!err){
        console.    log(`server running on http://localhost:${port}`);
        
    }
})

