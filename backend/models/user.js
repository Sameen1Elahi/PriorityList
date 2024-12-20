async function addUser(connection, values0, values, columns, placeholders) {
    try {
        const sql0 = `SELECT * FROM user WHERE name = ? OR email = ?`;
        const [result0] = await (await connection).execute(sql0, values0);
        if (result0.length > 0) {
            return { status: 409, message: "User already exists" };
        }
        else{
            const sql = `INSERT INTO user (${columns}) VALUES (${placeholders})`;
            const [result] = await (await connection).execute(sql, values);
            return { status: 201, message: "User registered successfully", result };
        }
    } 
    catch (error) {
        console.error("Error executing query:", error);
        return { status: 500, message: "Internal server error" };
    }
}


async function loginUser(connection,name){
    try{ 
        const sql = `SELECT * FROM user WHERE name = ? `;
        const [result] = await (await connection).execute(sql,[name]);
        return result;
    } 
    catch(error){
        console.log("Error executing query");
        throw error;
    }
}


module.exports = {addUser,loginUser};