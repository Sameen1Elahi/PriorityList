const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { addUser,loginUser } = require('../models/user.js');
let tokens = []
// const accessSecret = process.env.ACCESS_TOKEN;
// const refreshSecret = process.env.REFRESH_SECRET;

class addUserClass {
    constructor(payload) {
        this.name = payload.name;
        this.email = payload.email;
        this.password = payload.password;
    }

    validateUserPayload() {
        if (!this.name || !this.email || !this.password) {
            throw new Error("Missing required fields: name, email, or password");
        }
    }

    async processUser(res) {
        this.validateUserPayload();
        let connection = res.connection1;
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(this.password, salt);

        const sqlObject0 = { name: this.name, email: this.email };
        const sqlObject = { name: this.name, email: this.email, password: hashPassword };

        const values0 = Object.values(sqlObject0);
        const columns = Object.keys(sqlObject).join(', ');
        const placeholders = Object.keys(sqlObject).map(() => '?').join(', ');
        const values = Object.values(sqlObject);

        // Call the SQL query function
        return await addUser(connection, values0, values, columns, placeholders);
    }
}


class loginUserClass {
    constructor(payload) {
        this.name = payload.name;
        this.password = payload.password;
    }
    validateUserPayload() {
        if (!this.name || !this.password) {
            throw new Error("Missing required fields: name or password");
        }
    }
    async processUser(res) {
        this.validateUserPayload();
        let connection = res.connection1;
        const result = await loginUser(connection, this.name);

        if(result.length === 0) return res.status(404).json("User not found");
        
        const checkPassword = bcrypt.compareSync(this.password, result[0].password);
        if(!checkPassword) return res.status(400).json("Invalid password")
        
        const token = jwt.sign({id: result[0].id}, 'secretkey',{expiresIn: '15sec'});
        const refreshToken = jwt.sign({id: result[0]},'secretkeyforrefreshtoken')
        tokens.push(refreshToken)
        
        return res.cookie('accessToken', token, {httpOnly: true})
        .status(200).json({token: token, refreshToken:refreshToken, others:result[0],message:"Success"});
    }
}


class verifyTokenClass {
    constructor(payload) {
        this.token = payload.token;
    }
    async processUser(res) {
        
        if (this.token == null) { return res.sendStatus(401)} 
        if (!tokens.includes(this.token)) {return res.sendStatus(403)}
        
        jwt.verify(this.token, 'secretkeyforrefreshtoken', (err, id) => {
            if (err) return res.sendStatus(403)
            const aToken = jwt.sign({id: id}, 'secretkey',{expiresIn: '15sec'});
            //console.log(aToken);

            return res.cookie('accessToken', aToken, {httpOnly: true})
            .status(200).json({aToken:aToken, message:"Success in access"});
        })
    }
}

class logOutClass{
    async processUser(req, res) {
        tokens = tokens.filter(token => token !== req.body.token)
        return res.status(204).json("Logged out successfully")
    }
}

module.exports = { addUserClass, loginUserClass, verifyTokenClass, logOutClass };
