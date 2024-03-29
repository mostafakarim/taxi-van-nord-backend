var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//LOGIN 

router.post('/login',(req,res)=>{
  //you can do this either synchronously or asynchronously
  //if synhronously, you can set a variable to jwt sign and pass it into the payload with secret key
  //if async => call back 


  //Mock user
  const user = {
      id:Date.now(),
      userEmail:'example@gmail.com',
      password:'123'
  }

  //send abpve as payload
  jwt.sign({user},'secretkey',(err,token)=>{
      res.json({
          token
      })
  })
})

router.get('/profile',verifyToken,(req,res)=>{

  jwt.verify(req.token,'secretkey',(err,authData)=>{
      if(err)
          res.sendStatus(403);
      else{
          res.json({
              message:"Welcome to Profile",
              userData:authData
          })
         
      }
  })

});

//Verify Token
function verifyToken(req,res,next){
  //Auth header value = > send token into header

  const bearerHeader = req.headers['authorization'];
  //check if bearer is undefined
  if(typeof bearerHeader !== 'undefined'){

      //split the space at the bearer
      const bearer = bearerHeader.split(' ');
      //Get token from string
      const bearerToken = bearer[1];

      //set the token
      req.token = bearerToken;

      //next middleweare
      next();

  }else{
      //Fobidden
      res.sendStatus(403);
  }

}

module.exports = router;
