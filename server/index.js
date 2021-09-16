const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');


mongoose.connect(`
mongodb+srv://sahil:sahil@cluster0.qdamf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
`).then(()=> {
    console.log("Connection Successful")
}).catch(err=>{
    console.log(err);
})

app.use(cors());
app.use(express.json());


const Friends = require('./models/Friends')

app.get('/',(req,res)=>{
    res.send('Hello Hi?')
})

app.post('/insert', async(req,res)=>{
    const {name,age} = req.body;
    
    const friend = new Friends({name,age});
    await friend.save();
    console.log(friend);
})

app.get('/read',(req,res)=>{
    Friends.find({},(err,result) => {
        if(err){
            res.send(err);
        }else{
            res.send(result);
        }
    })
});

app.put("/update", async(req,res)=> {
    const newAge = req.body.newAge;
    const id = req.body.id;
//    console.log("Id is -> "+id)    
    try{
        await Friends.findById(id,(erro,friendToUpdate)=>{    
            friendToUpdate.age = newAge;
            friendToUpdate.save();
        });      
    }catch(err){
        console.log('Error'+err);
    }
    res.send("hello");
})


app.delete("/delete/:id", async(req,res)=> {
    const id = req.params.id;
    console.log("Deleted Id is -> "+id)    
    await Friends.findByIdAndDelete(id);    
    res.send("deleted");
})



app.listen(5000, ()=> {
    console.log("Server is running on Port 5000")
})
