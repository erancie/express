const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const mongoose = require('mongoose');
const validator = require('validator');
const User = require('./models/User');
const Expert = require('./models/Expert');
const Task = require('./models/Task');
const bcrypt = require('bcrypt');
const { send } = require('process');
const cors = require("cors");
require('dotenv').config()
const path = require('path');
const passport = require('passport');
const users = require('./routes/users');


//MONGOOSE////////////////////
const uri = `mongodb+srv://admin-elliot:${process.env.MONGO_PW}@main.hzw1z.mongodb.net/main?retryWrites=true&w=majority`;
// const uri = 'mongodb://localhost:27017/itrust';
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', ()=>console.log('main db connected') )

//EXPRESS////////////////
let app = express();
app.use(bodyParser.urlencoded({extended: true})); 
app.use(cors())
app.use(bodyParser.json())

const base = `${__dirname}/public`;

// - Static declaration - 
// app.use(express.static('public'))

// For SPA static files will be built files in React client
app.use(express.static(path.join(__dirname, 'client/build')));

//This ^ will point to the entry point of the app and
//all subsequent navigations are handled by react-router.
//However, if the user wants to start at another front end route
//then the initial request for those routes will ALSO have to be 
//caught/handled by the server and redirected back to the client.

//list all other front end routes in case they navigate there first
app.use('/login', express.static(path.join(__dirname, 'client/build')));
app.use('/login2', express.static(path.join(__dirname, 'client/build')));
app.use('/register', express.static(path.join(__dirname, 'client/build')));
app.use('/ourexperts', express.static(path.join(__dirname, 'client/build')));
app.use('/newtask', express.static(path.join(__dirname, 'client/build')));
app.use('/findtask/:id', express.static(path.join(__dirname, 'client/build')));
app.use('/findtask', express.static(path.join(__dirname, 'client/build')));

// or see catch all at l.254 to handle all front end pages other than 'home'

// see below link for info re serving apps with client side routing
// https://create-react-app.dev/docs/deployment/#serving-apps-with-client-side-routing



///////////////////////// ***API*** ////////////////////////////////////
///////////////////  //find user according to email 
// LOGIN //////////  //if exists, compare form password to user password 
app.post('/login', (req, res)=> { 
  console.log(this)
  const {email, password} = req.body;
  User.findOne({ email: email}, (e, user)=>{
    if (e) { res.send("No such email.") }    //*FIX*- handle no email err
    else{
      bcrypt.compare(password, user.password, (e, result)=>{
        if (result) { //bool
          console.log("Password compare : " + result + ". logged in.")//true
          //send back json here for isLoggedIn views in react
          res.json({ success: true })
        }else{
          console.log("Password compare : " + result)//false
          res.json({ success: false })
          throw new Error('Wrong Password. Error: ' + e)
        }
      })
    }
  })
})
//END LOGIN-----------------


///// USERS API //////////////////////////////
//for all http requests to /users path use() the users router
app.use('/users', users)


//////////// EXPERTS API //////// TASK 6.1P /////////////////// 
app.route('/experts')
//get all experts
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
    password: req.body.password,
    rating: req.body.rating,
    text: req.body.text }); 

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

//// single expert //////
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
//replace all resource fields from a single expert doc with PUT req.
.put((req, res)=>{
  Expert.update( //wont overwrite doc with updateOne
    { _id: req.params.id }, 
    { name: req.body.name, //specify each to overwrite
      address: req.body.address,
      mobile: req.body.mobile,
      password: req.body.password,
      rating: req.body.rating,
      text: req.body.text},
      // __v: __v +1 },
    {overwrite: true }, //true clears other fields otherwise field is null (need for PUT)
    (err)=>{  
      if (err) res.send(err)
      else res.send(`Expert Replaced`)
    }  
  )
})
//update specific fields for single expert
.patch((req, res)=>{
  Expert.updateOne(
    { _id: req.params.id }, // search by id
    { $set: req.body },  // updates all fields populated in body of req. 
    (err)=>{
      if (err) res.send(err)
      else res.send(`Expert Updated`)
    }  
  )
})
//delete first match expert
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

///TASKS API////////////////////////////////////////
app.route('/tasks')
//get all tasks
.get((req, res)=>{ 
  Task.find((err, taskList)=>{
    if(err) res.send(err)
    else res.json(taskList)
  })
})
//post new task
.post((req, res)=>{ 
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
})

app.route('/tasks/:id')
//get single task
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
//update specific fields in single task 
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
.delete((req, res)=> {
  Task.deleteOne(
    {_id: req.params.id},
    (err)=> {
      if (err) {res.send(err)}
      else res.send(`deleted: ${id}`)
    }
  )
})
//END TASKS------------------

//in case client routes other than / are navigated to without react <Link to=...
// app.get('(/*)?', function (req, res) {
//   res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
// });

//catch all for error page/////
app.get('/*', (req, res)=>{
  res.sendFile(`${base}/404.html`) 
})

// ASSIGN PORT //////////////////
let port = process.env.PORT;
if (!port) {
  port = 8080;
}

app.listen(port, (req, res)=>{
  console.log(`Server is running on port: ${port}`);
  console.log('process.env.PORT: ' + process.env.PORT)
}) 



//create a local strategy for passport

  //verify username and password

    //get record from db

    //compare password using bcrypt



// // Node.js program to demonstrate the
// // methods to display directory
   
// // Include path module
// var path = require("path");
  
// // Methods to display directory
// console.log("__dirname:    ", __dirname);
// console.log("process.cwd() : ", process.cwd());
// console.log("./ : ", path.resolve("./"));
// console.log("filename: ", __filename);