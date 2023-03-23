const express = require('express')
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer')
const app = express()

app.use(bodyParser.json())


app.use(bodyParser.urlencoded({
    extended : true
}))

app.get('/',(req,res) => {
    res.send(`<h1 style = 'text-align:center; color : blue'>Welcome to my Home Page</h1>`)
})



app.post('/api/sendEmail' , (req,res) =>{
    res.send("Yes i got")
    let data = req.body
    console.log(data)
    const transporter = nodemailer.createTransport({
        service : 'gmail',
        auth : {
            user : 'example@gmail.com' /*enter an email id to send emails */,
            pass : 'password' /*enter an app password for the above user email id */
        }
    })
    
    const mailOptions = {
        from : 'example@gmail.com' /* enter an email id given in the auth :{user:} */,
        to: 'example22@gmail.com' /* enter an emaid id to receive message from contact form */,
        subject : 'Message from client',
        html : `
        <ul>
        <li><h1>Name : ${data.name}</h1></li>
        <l1><h4>Phone_Number : ${data.phoneNumber}</h4></li>
        <l1><h4>Email : ${data.email}</h4></li>
        <l1><h4>Message : ${data.message}</h4></li>
        </ul>
        `
    }

    transporter.sendMail(mailOptions , (error,info) => {
        if(error){
            console.log(error);
        }else{
            console.log(`Email sent : ${info.response}`);
        }
    })
    transporter.close()
})

app.listen(8000 , () =>{
    console.log('sever listenting at port 8000!');
})
