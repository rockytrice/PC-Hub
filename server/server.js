const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const {readdirSync} = require('fs');
require('dotenv').config();

//import Routes

//app
const app = express();

//db
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:true,
    useUnifiedTopology:true
})
    .then(()=> console.log('Database connected'))
    .catch(err =>console.log(`DB CONNECTION FAILED: ${err}`))

//middlewares
app.use(morgan("dev"));
app.use(bodyParser.json({limit:"2mb"}));
app.use(cors());

//routes middleware
//using read dir sync so we don't have to import every route from the routes directory
readdirSync('./routes').map((r)=>
    app.use("/api",require("./routes/" + r))
);




//port
const port = process.env.PORT || 8000
app.listen(port, ()=> console.log(`🌎 Server listening on port  ${port}`))