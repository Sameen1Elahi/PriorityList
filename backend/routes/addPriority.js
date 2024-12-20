const express = require('express');
const app = express();

const {authenticateToken} = require('../middleware.js')
const {addPriorityClass, listPriorityClass, updatePriorityClass, updateTextPriorityClass,deletePriorityClass} = require('../classes/priorityClass.js');


const routeAddPriority = app.post('/task/add', authenticateToken, async (req,res)=>{
    const {user_id, priority, description, is_completed} = req.body;
    try{
        const post = new addPriorityClass({user_id, priority, description, is_completed})
        const result = await post.processPriority(res);
        res.send(result);
    }
    catch(error){
        res.status(500).send("Error while entering the product");
    }
})

const routeListPriority = app.get('/task/', authenticateToken, async (req,res)=>{
    const {user_id} = req.query;
    try{
        const post = new listPriorityClass({user_id});
        const result = await post.processPriority(res);
        res.json(result);
    }
    catch(error){
        res.status(500).send("Error while entering the product");
    }
})

const routeUpdatePriority = app.put('/task/:task_id/complete', authenticateToken, async (req,res)=>{
    const {task_id} = req.params;
    try{
        const post = new updatePriorityClass({task_id});
        const result = await post.processPriority(res);
        res.json(result);
    }
    catch(error){
        res.status(500).send("Error while entering the product");
    }
})

const routeUpdateTextPriority = app.put('/task/:task_id/update', authenticateToken, async (req,res)=>{
    const {task_id} = req.params;
    const {description} = req.body;
    try{
        const post = new updateTextPriorityClass({task_id, description});
        const result = await post.processPriority(res);
        res.json(result);
    }
    catch(error){
        res.status(500).send("Error while entering the product");
    }
})

const routeDeletePriority = app.delete('/task/:task_id', authenticateToken, async (req, res) => {
    const { task_id } = req.params;
    try {
        const post = new deletePriorityClass({task_id});
        const result = await post.processPriority(res);
        res.json({ success: true, result });
    } 
    catch (error) {
      console.error("Error while deleting task:", error);
      res.status(500).send("Error while deleting the task");
    } 
  });

module.exports = {routeAddPriority,routeListPriority,routeUpdatePriority,routeDeletePriority,routeUpdateTextPriority};