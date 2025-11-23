import users from "#models/user.model.js";

class UserController {
  static getAllUsers(req, res) {
    // return all users
    res.json(users);
  }
}

export default UserController;
