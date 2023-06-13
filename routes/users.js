const express = require('express');
const User = require('../models/User');
const users_get = require('../controllers/usersController');

const router = express.Router();

router.get('/', users_get)


// router.get('/', (req, res)=>{
//   User.find({}, (err, users)=>{
//     if(err) res.send(err)
//     else res.send(users)
//   })
// })

//- USER Registration //
router.post('/', (req, res)=> { 
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
      const apiKey = process.env.MAILCHIMP_KEY;
      //mailchimp audience/list id
      const listId = process.env.LIST_ID;
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
    res.json({success:true})
  }else{   //front end error //**TO FIX** - only sends status 200
    res.redirect('/404.html')
  }
})//end post /users

//delete all users
router.delete('/', (req, res)=>{
  User.deleteMany((err)=>{
    if (err) res.send(err)
    else res.send('Deleted all users.')
  })
})
module.exports = router;