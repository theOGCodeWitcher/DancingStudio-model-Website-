const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
mongoose.connect('mongodb://localhost/contactDance', { useNewUrlParser: true, useUnifiedTopology: true });
const port = 80;

// for serving static file 
app.use('/static', express.static('static'));

// for pug specific stuff
app.set('view engine', 'pug'); //setting the template engine as pug 
app.set('views', path.join(__dirname, 'views')); //setting the views directory 

app.use(express.urlencoded()); //to caputre our submitted data as the data is being taken from url 

//saving data of form onto databse using mongoose 
const danceSchema = new mongoose.Schema({
    name: String,
    contact: String,
    email: String,
    address: String,
    desc: String
});

//converting schema into model
const contact = mongoose.model('contact', danceSchema);

// End points

app.get('/', (req, res) => {
    const params = {}
    res.status(200).render('home.pug', params)
})
app.get('/contact', (req, res) => {
    const params = {}
    res.status(200).render('contact.pug', params)
})
app.post('/contact', (req, res) => {
    var mydata = new contact(req.body);
    mydata.save(function (err, mydata) {
        if (err) res.send("Unable to Save your details")
        res.send("Your details were saved onto the database")
    });

    //     let name =req.body.name;
    //     let contact =req.body.contact;
    //     let email =req.body.email;
    //     let address =req.body.address;
    //     let desc =req.body.desc;

    //     let outputDataStream=`The name of the client is ${name} ,his/her contact number is  ${contact} His/her email is ${email}.He/she resides in ${address}.${desc}`
    //     fs.writeFileSync('output.txt' ,outputDataStream )
    //    const params = {'message': 'your form has been submitted succesfully!'}
    //    res.status(200).render('contact.pug' , params);
}
)


//Start the server 
app.listen(port, () => {
    console.log(`the application started succesfully at port ${port} `);
})