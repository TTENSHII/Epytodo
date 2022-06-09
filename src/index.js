require('dotenv').config();
const express = require('express');
const user = require('./routes/user/user');
const app = express();
const db = require('./config/db');
const bodyparser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

app.use(express.raw());
app.use(express.json());

//////////////// LOGIN //////////////////
require('./routes/auth/login')(app, bcrypt, jwt, db);

//////////////// REGISTER ///////////////
require('./routes/auth/register')(app, bcrypt, jwt, db);

//////////////// USERS //////////////////
require('./routes/user/user')(app, bcrypt, jwt, db);
require('./routes/user/user_todos')(app, bcrypt, jwt, db);
require('./routes/user/id_email')(app, bcrypt, jwt, db);
require('./routes/user/put_user')(app, bcrypt, jwt, db);
require('./routes/user/delete_user')(app, bcrypt, jwt, db);

/////////////// TODO //////////////////////
require('./routes/todos/get_todos')(app, bcrypt, jwt, db);
require('./routes/todos/del_todos')(app, bcrypt, jwt, db);
require('./routes/todos/get_todos_id')(app, bcrypt, jwt, db);
require('./routes/todos/post_todos')(app, bcrypt, jwt, db);
require('./routes/todos/put_todos')(app, bcrypt, jwt, db);

/////////////// HOME //////////////////////
app.get("/" , ( req , res ) => {
    res.send("Hello World, welcome to our epytodo");
});

app.listen(process.env.APP_PORT, () => {
    console.log(`http://${process.env.APP_HOST}:${process.env.APP_PORT}`);
});
