const user = require("./../models/user");

function validateUserExist(req, res, next) {
  user
    .findOne({ email: req.body.email })
    .then((data) => {
      if (data == null) {
        return res
          .status(200)
          .json({
            response_code: 404,
            message: "Account not found",
            response: null,
          });
      } else {
        req.temp_user = data;
        console.log("temp_user")
        console.log(data);
        next();
      }
    })
    .catch((err) => {
      console.log(err);
      return res
        .status(200)
        .json({ response_code: 500, message:"Internal server error", response: null });
    });
}

function createUserIfNotExist(req, res, next) {
  user
    .findOne({ email: req.body.email })
    .then((data) => {
      if (data == null) {
        var usernew = new user({
          email: req.body.email,
          creation_ip: req.ip,
          profile_completion : 0
        });
        usernew
          .save()
          .then((data) => {
            next();
          })
          .catch((err) => {
            if (err.name == "ValidationError") {
              return res
                .status(200)
                .json({
                  response_code: 400,
                  message: "Data validation error",
                  response: null,
                });
            } else {
              console.log(err);
              return res
                .status(200)
                .json({
                  response_code: 500,
                  message:"Internal server error",
                  response: null,
                });
            }
          });
      } else {
        next();
      }
    })
    .catch((err) => {
      console.log(err);
      return res
        .status(200)
        .json({ response_code: 500, message:"Internal Server error", response: null });
    });
}


function setProfileCompletion(req,res,next){
  try{
      user.findByIdAndUpdate(req.user_id,{
        "$set":{
          name:req.body.name,
          number:req.body.mobile,
          profile_completion:1
        }
      },(err,reply)=>{
        if(err){
          throw new Error("Error while updating profile")

        }else{
          next()
        }
      })
  }catch(e){
    console.log(e)
    res.status(200).json({
      "response_code":500,
      "message":"Internal server error",
      "response":null
    })
  }
}

module.exports = {
    createUserIfNotExist,
    validateUserExist,
    setProfileCompletion
  };