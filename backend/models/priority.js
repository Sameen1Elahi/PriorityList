async function addPriority(connection,columns,placeholders,values){
    try{
        const sql = `INSERT INTO task (${columns}) VALUES (${placeholders}) `;
        const [result] = await (await connection).execute(sql,values);
        return result;
    }
    catch(error){
        console.log("Error executing query");
        throw error;
    }
}

async function listPriority(connection,values){
    try{ 
        const sql = 'SELECT * FROM task WHERE user_id = ?';
        const [result] = await (await connection).execute(sql,values);
        return result;
    }
    catch(error){
        console.log("Error executing query",error);
        throw error;
    }
}

async function updatePriority(connection,values){
    try{
        const sql = "UPDATE task SET is_completed = true WHERE id = ?";
        const [result] = await (await connection).execute(sql,values);
        return result;
    }
    catch(error){
        console.log("Error executing query",error);
        throw error;
    }
}

async function deletePriority(connection,values){
    try{
        const sql = "DELETE FROM task WHERE id =?";
        const [result] = await (await connection).execute(sql,values);
        return result;
    }
    catch(error){
        console.log("Error executing query",error);
        throw error;
    }
}

async function updateTextPriority(connection,task_id,description){
    try{
        const sql = `UPDATE task SET description = ? WHERE id = ?`;
        const [result] = await (await connection).execute(sql,[description,task_id]);
        return result;
    }
    catch(error){
        console.log("Error executing query");
        throw error;
    }
}

module.exports = {addPriority, listPriority, updatePriority, deletePriority,updateTextPriority};
