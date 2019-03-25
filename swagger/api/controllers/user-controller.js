const User = require('../models/User');

module.exports = {
  getUsers,
  deleteUser,
};

function getUsers(req, res) {
  User.find((err, users) => {
    if (err) {
      res.status(500).json({message: 'Unexpected error'});
    } else {
      res.json(users);
    }
  });
}

function deleteUser(req, res) {
  const userId = req.swagger.params.userId.value;
  User.findByIdAndDelete(userId, (err, user) => {
    if (err || !user) {
      res.status(404).json({message: 'not found'});
    } else {
      res.json(user);
    }
  });
}
