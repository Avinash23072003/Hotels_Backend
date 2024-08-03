const mongoose=require('mongoose');
const mongoURl='mongodb://localhost:27017/hotels'

mongoose.connect(mongoURl,{
    useNewUrlParser: true ,
    useUnifiedTopology:true
})

const db=mongoose.connection
db.on('connected',()=>{
    console.log("database connected succesfully");
})

db.on('error',(err)=>{
    console.log('MongoDB connection error', err)
})
db.on('disconnected',()=>{
    console.log("database disconnected");
})

module.exports=db