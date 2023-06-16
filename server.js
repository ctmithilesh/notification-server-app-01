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
const formData = require('form-data');
const Mailgun = require('mailgun.js')
const mailgun = new Mailgun(formData);

const mg = mailgun.client({
    username:'api',
    key: data.MAILGUN_API_KEY,
    public_key: data.PUBLIC_KEY

})

app.get('/',(req,res)=>{

        res.send({message:'Welcome to Notifications Server version 1.0'})

})

app.post('/api/email', async (req,res)=>{

    const { to, subject, message } = req.body 
    console.log(subject)
    const emailInfo = {
        from:"mithilesh.tarkar@gmail.com",
        to:`${to}`,
        subject:`${subject}`,
        html:`${message}`
    }
    console.log(emailInfo)

    try{
        mg.messages.create(data.MAILGUN_DOMAIN, {
            from: emailInfo.from,
            to: emailInfo.to,
            subject: emailInfo.subject,
            html: "<h1>Testing some Mailgun awesomness!</h1>"
          })
          .then(msg => {
                console.log(msg)
                res.sendStatus(200)
          }) 
          .catch(err => {
            console.error(err)
          });
    }
    catch(e){
        console.log(e)
    }

})

const PORT = process.env.PORT || 8080 
app.listen(PORT,()=>{
    console.log(`Server started at ${PORT}`)
})