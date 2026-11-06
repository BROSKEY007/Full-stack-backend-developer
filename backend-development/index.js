const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());
const port = process.env.PORT || 8000;

app.get('/', (req,res)=>{
    res.send("Hello from Algoverse Ltd");
})

const users= [
    {id:1, name:"sazid hosain", email:"sazidhosain125@gmail.com"},
    {id:2, name:"ratul hasan sarkar", email:"ratul@gmail.com"},
    {id:3, name:"tahmid hasan", email:"tahmid@gmail.com"},
    {id:4, name:"Anika", email:"anikatahsin@gmail.com"}
]



app.get('/users', (req,res)=>{
    res.json(users);
})

app.post('/users', (req, res) => {
    console.log('new user data', req.body);
    const newUser = { ...req.body, id: users.length + 1 };
    users.push(newUser);
    res.status(201).json({ success: true, data: newUser, message: 'User created successfully' });
});



app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})