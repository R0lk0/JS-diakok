import express from 'express';
import { sign } from 'node:crypto';

const PORT = 3030;
const app = express();
app.use(express.json());

const diakok = [
{id : 1, name:  'Ann', subject: 'maths'},
{id : 2, name: 'Bob', subject: 'IT'},
{id : 3, name: 'Cloe', subject: 'PE'}
];

app.get("/students", (req, res)=>{
    res.status(200).json(diakok);
})

app.get("/students/:id", (req, res)=>{
    const id = +req.params.id;
    const diak = diakok.find(x => x.id === id);
    if (!diak){
        res.status(404).json({message: "Student not found!"});
    }
    res.status(200).json(diak);
})

app.post("/students", (req, res)=>{
    const {name, subject} = req.body;
    const id = diakok[diakok.length-1]?.id+1;
    if (!name || !subject){
        return res.status(400).json({message: "Name or subject missing!"});
    }
    const diak = {id, name, subject};
    diakok.push(diak);
    res.status(201).json({message: "Student posted successfully!"});
})

app.put("/students/:id", (req, res)=>{
    const id = +req.params.id;
    const diak = diakok.find(x=>x.id === id);
    if (!diak){
        return res.status(400).json({message: "Name or subject missing!"});
    }
    const {name, subject} = req.body;
    if (!name || !subject){
        return res.status(400).json({message: "Name or subject missing!"});
    }
    diak.name = name;
    diak.subject = subject;
    res.status(200).json({message: "Student posted successfully!"});
})

app.listen(PORT, ()=>{
console.log(`Server runs on http://localhost:${PORT}`);
})