const express = require('express');
const app = express();
const fs = require('fs');
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded



app.get('/',(req,res)=>{
    res.send('Todo App');
});

app.get('/read',(req,res)=>{
    let arr = ['t1','t2','t3'];
    res.send(JSON.stringify(arr));
});

app.post('/create',(req,res)=>{
    res.json(req.body);
});

app.patch('/update',(req,res)=>{
    res.json(req.body);
});

app.delete('/delete',(req,res)=>{
    res.json(req.body);
});

app.listen(3000);