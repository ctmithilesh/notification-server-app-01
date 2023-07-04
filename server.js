require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
var corOptions = {
    origin:true
}

app.use(express.json())
app.use(express.urlencoded({
    extended:true
}))
app.use(cors(corOptions))   

app.get('/',(req,res)=>{

        res.send({message:'Welcome to Notifications Server version 1.0'})

})
require('./routes/email.routes')(app);


const PORT = process.env.PORT || 5001 
app.listen(PORT,()=>{
    console.log(`Server started at ${PORT}`)
})