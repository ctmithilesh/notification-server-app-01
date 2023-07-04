const formData = require('form-data');
const Mailgun = require('mailgun.js')
const mailgun = new Mailgun(formData);
const { data } = require('../data')

const mg = mailgun.client({
    username:'api',
    key: data.MAILGUN_API_KEY,
    public_key: data.PUBLIC_KEY

})

exports.sendEmail = async (req,res)=>{

        const { email, subject, message } = req.body 
        console.log(subject)
        const emailInfo = {
            from:"mithilesh.tarkar@gmail.com",
            email:`${email}`,
            subject:`${subject}`,
            html:`${message}`
        }
        console.log(emailInfo)
    
        try{
            mg.messages.create(data.MAILGUN_DOMAIN, {
                from: emailInfo.from,
                to: emailInfo.email,
                subject: emailInfo.subject,
                html: emailInfo.html
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

}