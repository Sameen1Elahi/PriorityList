
const { addPriority, listPriority, updatePriority, updateTextPriority, deletePriority } = require("../models/priority");

class addPriorityClass{
    constructor(payload){
        this.user_id = payload.user_id;
        this.priority = payload.priority;
        this.description = payload.description;
        this.is_completed = payload.is_completed;
    }

    async processPriority(res){
        let connection = res.connection1;
        const sqlObject = { user_id: this.user_id, priority: this.priority, 
                          description: this.description, is_completed: this.is_completed };
        const columns = Object.keys(sqlObject).join(', ');
        const placeholders = Object.keys(sqlObject).map(() => '?').join(', ');
        const values = Object.values(sqlObject);
        // Call the SQL query function
        return await addPriority(connection, columns, placeholders,values);
    }
}


class listPriorityClass{
    constructor(payload){
        this.user_id = payload.user_id;
    }
    async processPriority(res){
        let connection = res.connection1;
        const sqlObject = {user_id:this.user_id};
        const values = Object.values(sqlObject); 
        return await listPriority(connection,values)
    }
}

class updatePriorityClass{
    constructor(payload){
        this.task_id = payload.task_id;
    }
    async processPriority(res){
        let connection = res.connection1;
        const sqlObject = { task_id: this.task_id };
        const values = Object.values(sqlObject);
        return await updatePriority(connection,values)
    }
}

class updateTextPriorityClass{
    constructor(payload){
        this.task_id = payload.task_id;
        this.description = payload.description;
    }
    async processPriority(res){
        let connection = res.connection1;
        return await updateTextPriority(connection,this.task_id,this.description)
    }
}

class deletePriorityClass{
    constructor(payload){
        this.task_id = payload.task_id;
    }
    async processPriority(res){
        let connection = res.connection1;
        const sqlObject = { task_id: this.task_id };
        const values = Object.values(sqlObject);
        return await deletePriority(connection,values)
    }
}
module.exports = {addPriorityClass, listPriorityClass, updatePriorityClass, updateTextPriorityClass, deletePriorityClass};