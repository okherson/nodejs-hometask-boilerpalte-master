const { Router } = require('express');
const UserService = require('../services/userService');
const { createUserValid, updateUserValid } = require('../middlewares/user.validation.middleware');
const { responseMiddleware } = require('../middlewares/response.middleware');

const router = Router();

// TODO: Implement route controllers for user
router.get('/', function (req, res, next) {
  const users = UserService.getAll();
  if (users) {
    console.log(users);
    res.status(200).send(JSON.stringify(user));
  } else {
    const error = {
      "error": true,
      "message": "Users not found!"
    }
    res.status(404).send(JSON.stringify(error));
  }
});

router.get('/:id', function (req, res, next) {
  const user = UserService.getOneUser(req.params.id);;
  if (user) {
    res.status(200).send(JSON.stringify(user));
  } else {
    const error = {
      "error": true,
      "message": "User not found!"
    };
    res.status(404).send(JSON.stringify(error));
  }
});

router.post('/', createUserValid, function (req, res) {
  // try {
  const user = UserService.create(req.body);
  if (user) {
    res.status(200).send(JSON.stringify({"message": "User creation success!"}));
  } else {
    const error = {
      "error": true,
      "message": "ERROR! User does not created!"
    };
    console.log(res);
    res.status(400).send(JSON.stringify(error));
  }
});

router.put('/:id', updateUserValid, function (req, res) {
  const user = UserService.update(req.params.id, req.body);
  if (user) {
    res.status(200).send(JSON.stringify({"message": "User update success"}));
  } else {
    const error = {
      error: true,
      message: "ERROR! User does not updated!"
    };
    res.status(400).send(JSON.stringify(error));
  }
});

router.delete('/:id', function (req, res) {
  const user = UserService.delete(req.params.id);
  if (user) {
    res.status(200).send(JSON.stringify({"message": "User delete success"}));
  } else {
    const error = {
      error: true,
      message: "ERROR! User does not deleted!"
    };
    res.status(400).send(JSON.stringify(error));
  }
});

module.exports = router;
