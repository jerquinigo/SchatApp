const {db} = require("../index.js")


getAllUsers = (req, res, next) => {
    db.any(
      "SELECT * FROM users"
    )
      .then(users => {
        res.status(200).json({
          status: "success",
          users: users,
          message: "you have recieved all the users"
        });
      })
      .catch(err => {
        console.log(err);
        return next(err);
      });
  };

  createUser = (req,res,next) => {
    db.one(
        "INSERT INTO users(username, password, profile_pic) VALUES(${username},${password}, ${profile_pic}) RETURNING username",{
        username: req.body.username,
        password: req.body.password,
        profile_pic: req.body.profile_pic || null
        }
    ).then(() => {
        res.status(200).json({
            status: "success",
            message: "added a user"
        })
    })
  }




  module.exports={getAllUsers, createUser}