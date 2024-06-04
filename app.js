require('dotenv').config();
const express = require("express");
const expressLayout = require("express-ejs-layouts");
const connectDB = require('./server/config/db');
const app = express();
const PORT = 5000 || process.env.PORT;
app.use(expressLayout);
const session = require('express-session');
const cookieParser = require('cookie-parser');
const MongoStore = require('connect-mongo');
const methodOverride = require('method-override');
const { isActiveRoute } = require('./server/helpers/routeHelpers');
app.locals.isActiveRoute = isActiveRoute;
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');


connectDB();
//for passing data from forms
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URL
    }),
    //cookie: { maxAge: new Date ( Date.now() + (3600000) ) } 
}));
app.use(express.static('public'));
app.use(methodOverride('_method'));

app.use("/", require('./server/routes/main'));
app.use("/", require('./server/routes/admin'));

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
})