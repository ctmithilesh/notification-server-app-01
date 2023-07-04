module.exports = app => { 

    const router = require("express").Router();
    const Email = require('../controllers/email.controller')
  

    router.post("/send/email", Email.sendEmail)

    app.use('/api', router);

}