require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { data } = require('./data')
const app = express()
var corOptions = {
    origin:true
}

app.use(express.json())
app.use(express.urlencoded({
    extended:true
}))
app.use(cors(corOptions))
const mailgun = require('mailgun.js')
const mg = () => {
    mailgun({
        apiKey: data.MAILGUN_API_KEY,
        domain: data.MAILGUN_DOMAIN
    })
}

app.get('/',(req,res)=>{

        res.send({message:'Welcome to Notifications Server version 1.0'})

})

app.post('/api/email',(req,res)=>{

    const { to, subject, message } = req.body 
    const emailInfo = {
        from:"mithilesh.tarkar@gmail.com",
        to:`${to}`,
        subject:`${subject}`,
        html:`${message}`
    }
    console.log(emailInfo)
    res.send({message: 'Success'})

})

const PORT = process.env.PORT || 8080 
app.listen(PORT,()=>{
    console.log(`Server started at ${PORT}`)
})