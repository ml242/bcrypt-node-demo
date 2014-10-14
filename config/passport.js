var User = require('../models/user');


var user = new User({
  username: 'chris3',
  email: 'chris3@ex.com',
  password: 'test'
});

user.save(function(err, user){
  if(err) {
    console.log(err);
  } else {
    console.log('seeded user');
  }
});