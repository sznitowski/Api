const models = require('../models');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('fastest-validator');
const generateToken = require("../utils/generateToken");
//const roles = require("../models/roles");

//RegisterUser Post: /api/user/regist
async function registerUser(req, res) {
    try {
        const existingUser = await models.User.findOne({ where: { email: req.body.email } });
        if (existingUser) {
            return res.status(409).json({
                message: 'Email already exists',
            });
        } else {
            const salt = await bcryptjs.genSalt(10);
            const hashedPassword = await bcryptjs.hash(req.body.password, salt);

            // Define el rol del usuario (por ejemplo, 'user' o 'admin')
          // const role = roles.USER; // You need to have the 'roles' object defined somewhere

            const user = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                age: req.body.age,
                password: hashedPassword,
                //role: role, // Assign the role to the user
            };

            const createdUser = await models.User.create(user);
            return res.status(201).json({
                user: createdUser,
                message: 'User created successfully',
            });
        }
    } catch (error) {
        console.error('Error:', error); // Log the error for debugging purposes
        return res.status(500).json({
            message: 'Something went wrong',
        });
    }
}

//Login Post: /api/user/login
async function loginUser(req, res) {
    try {
        const user = await models.User.findOne({ where: { email: req.body.email } });
        if (!user) {
            return res.status(401).json({
                message: "Incorrect credentials!",
            });
        }

        const isPasswordValid = await bcryptjs.compare(req.body.password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Incorrect credentials!",
            });
        }

        const token = jwt.sign(
            {
                _id: user._id,
                email: user.email,
            },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '3000s' } // '3000s' means the token will expire in 3000 seconds (50 minutes)
        );

        return res.status(200).json({
            user: { _id: user._id, email: user.email },
            message: "Authentication established!",
            token
        });
    } catch (error) {
        console.error('Error:', error); // Log the error for debugging purposes
        return res.status(500).json({
            message: "Something went wrong!",
        });
    }
}

//deleteUser Delete: /api/user/:id
async function deleteUser(req, res) {
    try {
      const id = req.params.id;
      const result = await models.User.destroy({ where: { id: id } });
  
      if (result) {
        res.status(200).json({
          message: "Usuario eliminado correctamente",
          result
        });
      } else {
        res.status(404).json({
          message: 'Usuario no encontrado',
        });
      }
    } catch (error) {
      res.status(500).json({
        message: "Algo salió mal",
        error: error
      });
    }
  }
  

// FindOneUser Get: /api/user/:id
async function findUserById(req, res) {
    try {
        const id = req.params.id;
        const result = await models.User.findByPk(id);

        if (result) {
            res.status(200).json(result);
        } else {
            res.status(404).json({
                message: 'User not found',
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            error: error
        });
    }
}

// FindallUsers Get: /api/user
async function findAllUsers(req, res) {
    try {
        const users = await models.User.findAll();
        if (users.length === 0) {
            return res.status(404).json({
                message: 'No users found.',
                data: []
            });
        }
        return res.status(200).json({
            message: 'Users list',
            data: users
        });
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({
            message: 'Something went wrong while fetching the list of users.',
            error: error.message
        });
    }
}   

//UpdateUser Patch: /api/user/:id
function updateUser(req, res) {
    const id = req.params.id;
    const updatedUser = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        age: req.body.age,
    };
    // Update validations
    const schema = {
        firstName: { type: 'string', optional: false, max: '20' },
        lastName: { type: 'string', optional: false, max: '20' },
        email: { type: 'string', optional: false, max: '25' },
        age: { type: 'string', optional: false, max: '25' },
    };

    const v = new validator();
    const validationResponse = v.validate(updatedUser, schema);

    if (validationResponse !== true) {
        return res.status(400).json({
            message: 'Validation fail',
            error: validationResponse,
        });
    }
    // Hash the password if provided
    if (req.body.password) {
        bcryptjs.genSalt(10, function (err, salt) {
            bcryptjs.hash(req.body.password, salt, function (err, hash) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error hashing password',
                        error: err,
                    });
                }
                updatedUser.password = hash;
                models.User.update(updatedUser, { where: { id: id } })
                    .then(data => {
                        res.status(200).json({
                            message: 'User updated successfully',
                            User: updatedUser,
                        });
                    })
                    .catch(error => {
                        res.status(500).json({
                            message: 'Something went wrong',
                            error: error,
                        });
                    });
            });
        });
    } else {
        // If no password change, update user directly
        models.User.update(updatedUser, { where: { id: id } })
            .then(data => {
                res.status(200).json({
                    message: 'User updated successfully',
                    User: updatedUser,
                });
            })
            .catch(error => {
                res.status(500).json({
                    message: 'Something went wrong',
                    error: error,
                });
            });
    }
}

module.exports = {
    registerUser,
    loginUser,
    deleteUser,
    findAllUsers,
    findUserById,
    updateUser
}  