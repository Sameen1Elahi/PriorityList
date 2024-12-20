//const connection = require('./connection.js');
const jwt = require('jsonwebtoken');


const authenticateToken= async (req,res,next) =>{
    const authHeader = req.headers['authorization'];
    //console.log(authHeader);
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).json("Token not found");

    jwt.verify(token,'secretkey', (err,id)=>{
        if(err) return res.status(403).json("Access denied");
        req.id = id;
        next();
    })
}
module.exports = {authenticateToken};
