const User = require('../models/User');

module.exports = users_get = (req, res) => {
  User.find({}, (err, users)=>{
    if(err) res.send(err)
    else res.send(users)
  })
}