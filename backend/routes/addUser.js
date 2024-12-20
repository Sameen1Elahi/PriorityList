const express = require('express');
const app = express();

const { addUserClass, loginUserClass, verifyTokenClass, logOutClass } = require('../classes/userClass.js');

const routeAddUser = app.post('/user/sign-up', async (req,res)=>{
    const {name,email,password} = req.body;
    try{
        const user = new addUserClass({ name, email, password });
        const result = await user.processUser(res);
        return res.send(result.message);
    }
    catch(error){
        res.status(500).send("Error while entering the product");
    }
})

const routeLoginUser = app.post('/user/login',async (req,res)=>{
    const {name, password} = req.body;
    try{
        const user = new loginUserClass({ name, password });
        const result = await user.processUser(res);
        return res.send(result.message);
    }
    catch(error){
        res.status(500).send("Error while entering the product");
    }
})

const routeTokenAccess = app.post('/token/',async (req,res)=>{
    const {token} = req.body;
    try{
        const user = new verifyTokenClass({token});
        await user.processUser(res);
    }
    catch(error){
        res.status(500).send("Error while verifying token");
    }
})

const routeLogoutUser = app.post('/user/logout', async (req,res)=>{
    try{
        const user = new logOutClass();
        await user.processUser(req,res);
    }
    catch(error){
        res.status(500).send("Error while logging out");
    }

})

module.exports = {routeAddUser,routeLoginUser,routeTokenAccess,routeLogoutUser};