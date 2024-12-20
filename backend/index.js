const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

const connection = require('./connection.js');
const {routeAddUser,routeLoginUser,routeTokenAccess,routeLogoutUser} = require('./routes/addUser.js');
const {routeAddPriority,routeListPriority,routeUpdatePriority,routeDeletePriority,routeUpdateTextPriority} = require('./routes/addPriority.js');

const buildconnection = async (req,res,next)=>{
    res.connection1 = connection;
    next();
}  

app.use(buildconnection);

app.use(routeAddUser);
app.use(routeLoginUser);
app.use(routeAddPriority);
app.use(routeListPriority);
app.use(routeUpdatePriority);
app.use(routeDeletePriority);
app.use(routeUpdateTextPriority);
app.use(routeTokenAccess);
app.use(routeLogoutUser)


app.listen(8000,()=>{
    console.log("listening to port 8000");
})