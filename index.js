const express = require('express');
const app = express();
const fs = require('fs');
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded



app.get('/',(req,res)=>{
    res.send('Todo App');
});

app.get('/read/:id',(req,res)=>{
    var data = JSON.parse(fs.readFileSync('todo_list.json','utf8'));
    let task = data.find(o => o.task_number == req.params.id);
    res.json(task);
});

app.post('/create',(req,res)=>{
    var data = JSON.parse(fs.readFileSync('todo_list.json','utf8'));
    let max = Math.max.apply(Math, data.map(function(o) { return o.task_number; }))
    max = (max>0)?max:0;
    let todo = req.body;
    todo.task_number = parseInt(max)+1;
    data.push(todo);
    fs.writeFileSync('todo_list.json',JSON.stringify(data));
    res.json(todo);
});

app.patch('/update/:id',(req,res)=>{
    var data = JSON.parse(fs.readFileSync('todo_list.json','utf8'));
    data = data.filter(function( obj ) {
        return obj.task_number != req.params.id;
    });
    let max = Math.max.apply(Math, data.map(function(o) { return o.task_number; }))
    max = (max>0)?max:0;
    let todo = req.body;
    todo.task_number = parseInt(max==null?0:max)+1;
    data.push(todo);
    fs.writeFileSync('todo_list.json',JSON.stringify(data));
    res.json(data);
});

app.delete('/delete/:id',(req,res)=>{
    var data = JSON.parse(fs.readFileSync('todo_list.json','utf8'));
    data = data.filter(function( obj ) {
        return obj.task_number != req.params.id;
    });
    fs.writeFileSync('todo_list.json',JSON.stringify(data));
    res.json(data);
});

app.listen(3000);