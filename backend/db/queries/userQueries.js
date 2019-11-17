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

  




  module.exports={getAllUsers}