const express =require('express');
const app=express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose =require('mongoose');
const cors=require('cors');
require('dotenv/config');
const authJwt = require('./helper/jwt');
const errorHandler = require('./helper/error-handler');

app.use(cors());
app.options('*',cors())

//middleware
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(authJwt());
app.use('/public/uploads/', express.static(__dirname + '/public/uploads/'));
app.use(errorHandler);

//Routers
const productRouter=require('./routers/products');
const categoriesRouter=require('./routers/categories');
const ordersRouter=require('./routers/orders');
const usersRouter=require('./routers/users');

const api = process.env.API_URL;


app.use(`${api}/products`,productRouter)
app.use(`${api}/categories`,categoriesRouter)
app.use(`${api}/orders`,ordersRouter)
app.use(`${api}/users`,usersRouter)

mongoose.connect(process.env.CONNECTION_STRING , {
    useNewUrlParser:true,
    useUnifiedTopology:true,
    dbName:'wedding-mall'
} )
.then ( ()=>{
 console.log("database connetion is ready");
})
.catch( (err) =>{
    console.log(err);
})

//Development
// app.listen(3000,()=>{

//     console.log("server is running http://localhost:3000");
// })

//production
var server = app.listen(process.env.PORT || 3000 , function () {
    var port = server.address().port;
    console.log("Express is working on port " + port)
})