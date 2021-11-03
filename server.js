const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const { response } = require('express');
const mongoose = require('mongoose');
const validator = require('validator');
const User = require('./models/User');
const Expert = require('./models/Expert');//
const Task = require('./models/Task');
const bcrypt = require('bcrypt');
const { send } = require('process');
const cors = require("cors");
const { findById } = require('./models/User');


//MONGOOSE////////////////////
// const uri = `mongodb+srv://admin-elliot:deakin2021@main.hzw1z.mongodb.net/main?retryWrites=true&w=majority`;
const uri = 'mongodb://localhost:27017/itrust';
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('main db connected');
});

//EXPRESS////////////////
let app = express();
app.use(bodyParser.urlencoded({extended: true})); 
app.use(cors())
//makes things static from html (like css path)
app.use(express.static('public')); 
app.use(bodyParser.json())
const base= `${__dirname}/public`;


///////////////////  //find user according to email 
// LOGIN //////////  //if exists, compare form password to user password 

app.post('/login', (req, res)=> { 

  const {email, password} = req.body;
  User.findOne({ email: email}, (e, user)=>{
    if (e) { res.send("No such email.") }    //*FIX*- handle no email err
    else{
      bcrypt.compare(password, user.password, (e, result)=>{
        if (result) { //bool
          console.log("Password compare : " + result + ". logged in.")//true
          
          //send back json here for isLoggedIn views in react
          res.json({
            success: true
            // redirectUrl: '/'
          })
        }else{
          console.log("Password compare : " + result)//false
          res.send("Incorrect password")
        }
      })
    }
  })
})
//END LOGIN-----------------

/////////////////////////////////////////////
///// USERS API //////////////////////////////
app.get('/users', (req,res)=>{
  User.find({}, (err, users)=>{
    if(err) send(err)
    else res.send(users)
  })
})

//- USER Registration ////////////////////////
app.post('/users', (req, res)=> { //change to /users
  //create new user from body fields
  const newUser = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    country: req.body.country,
    password: req.body.password,
    password2: req.body.password2,
    address: req.body.address,
    address2: req.body.address2,
    city: req.body.city,
    state: req.body.state,
    phoneNumber: req.body.phoneNumber,
    zip: req.body.zip,
    terms: req.body.terms
  });
  //save new user to db
  newUser.save((err)=>{
    err ? console.log(err) : console.log('New User Inserted Succesfully')
  })
      //MAILCHIMP////////
      //get body form fields for mailchimp
      let {firstname, lastname, email} = req.body;
      console.log(firstname, lastname, email);

      //mailchimp api key
      const apiKey = '4cf53003ebc05f4c27f8a03b9338c6fa-us5';
      //mailchimp audience/list id
      const listId = '5f7ec9e7d7';
      //url to your list
      const url = `https://us5.api.mailchimp.com/3.0/lists/${listId}`
      const options = {
        method: "POST",
        auth: `mystring:${apiKey}`
      } 
      //create request to mailchimp w/ https
      const request = https.request(url, options, (res)=>{
        res.on('data', (data)=>{
          console.log(JSON.parse(data))
        })
      })
      //create request mailchimp obj with body fields
      const data = {
        members:[
          {
            email_address: email,
            status: 'subscribed',
            merge_fields:{
              FNAME: firstname,
              LNAME: lastname }}]}
      jsonData = JSON.stringify(data);  //convert to JSON format
      // request.write(jsonData)   // enable API Key & uncomment to enable mailchimp
      // request.end()
      //END MAILCHIMP----

  //redirect to home/welcome page - or dashboard. 
  if(res.statusCode === 200){
    res.redirect('/login.html') //redirect uses public folder
  }else{   //front end error //**TO FIX** - only sends status 200
    res.redirect('/404.html')
  }
})//end post / || /users

//delete all users
app.delete('/users', (req, res)=>{
  User.deleteMany((err)=>{
    if (err) res.send(err)
    else res.send('Deleted all users.')
  })
})
//END USERS---------------------------------------------

//////////// EXPERT API //////// TASK 6.1P ////////////////  
//get all experts
app.route('/experts')
.get((req, res)=>{
  // res.sendFile(base + '/experts.html')
  Expert.find((err, expertList)=>{
    if(err) res.send(err)
    else res.send(expertList)
  })
})
//add new expert
.post((req, res)=>{
  const expert = new Expert({
    name: req.body.name, 
    address: req.body.address, 
    mobile: req.body.mobile, 
    password: req.body.password}); 

  expert.save((err, newExpert)=>{
    if(newExpert) res.send(newExpert)
    else res.send(err)
  })
})
//delete all experts
.delete((req, res)=>{
  Expert.deleteMany((err)=>{
    if (err) res.send(err)
    else res.send('Deleted all experts.')
  })
})
//// single expert
app.route('/experts/:id')
//retreive expert
.get((req, res)=>{
  let id = req.params.id
  Expert.find({_id: id}, (err, expert)=>{
    if(err) res.send(err)
    else {
      console.log(expert)
      res.send(expert)
    }
  })
})
//replace all resource field with PUT req. using overwrite?
.put((req, res)=>{
  Expert.updateOne(
    { _id: req.params.id }, //update by name
    { $set: req.body },  // new values from all body fields
    {overwrite: true}, //true clears other fields //*FIX* doesn't overwrite
    (err)=>{  
      if (err) res.send(err)
      else res.send(`Expert Replaced`)
    }  
  )
})
//update single expert fields
.patch((req, res)=>{
  Expert.updateOne(
    { _id: req.params.id }, // search by id
    { $set: req.body },  // updates all fields in body of req.
    (err)=>{
      if (err) res.send(err)
      else res.send(`Expert Updated`)
    }  
  )
})
//remove first match expert
.delete((req, res)=>{
  let id = req.params.id
  Expert.deleteOne({_id: id}, (err)=>{
    if(err) res.send(err)
    else res.send(`${id} deleted. `)
  })
})

//update many expert via name *TO FIX* - wont update many
app.route('/expertsmany/:name')
.patch((req, res)=>{
  Expert.updateMany( 
    {name: req.params.name},
    {$set: req.body }, 
    (err)=>{
      if(!err) res.send('Experts updated successfully')
      else res.send(err)
    }
  )
})
//////END EXPERTS---------------

///TASKS///////////////////
app.route('/tasks')
.get((req, res)=>{ //get all tasks
  Task.find((err, taskList)=>{
    if(err) res.send(err)
    else res.json(taskList)
  })
})
.post((req, res)=>{ //post new task
  const newTask = new Task({ 
    title: req.body.title,
    description: req.body.description,
    type: req.body.type,
    suburb: req.body.suburb,
    image: req.body.image,
    date: req.body.date,
    budgettype: req.body.budgettype,
    budgetamount: req.body.budgetamount
  })
  newTask.save()
  .catch((err)=> console.log(err))
  res.json((`task saved to db: ${newTask}`))
  // res.redirect('/findtask') //how to redirect to react front end?
            //how to show react front end ?
})

app.route('/tasks/:id') //get task item
.get((req, res)=> { 
  console.log(req.params.id)
  Task.find({_id: req.params.id}, (err, task)=>{
    if(err) res.send(err)
    else {
      res.json(task)
      console.log(`res.json(task) - ${task}`)
    }
  })
})
.patch((req, res)=> {
  Task.updateOne(
    { _id: req.params.id},
    { $set: req.body },
    (err)=>{
      if(err) res.send(err)
      else res.send('Task Updated')
    }
  )
})
//END TASKS------------------

//error page with catch all/////////////////
app.get('/*', (req, res)=>{
  res.sendFile(`${base}/404.html`) //sendFile requiresd base directory
})

//HEROKU PORT///////////////////////////////
let port = process.env.PORT;
if (!port) {
  port = 8080;
}

app.listen(port, (req, res)=>{
  console.log(`Server is running on port: ${port}`);
}) 
