const jwt = require("jsonwebtoken");
const password_complexity = require("joi-password-complexity");
const bcryptjs = require("bcryptjs");
const User = require("../models/userModel");
const { validate } = require("../utils/userValidations");

exports.createUser = async (req, res) => {
  const { error } = validate(req.body); // Validate the incoming request body
  if (error) return res.status(400).send(error.details[0].message); // Send a 400 response if validation fails

  const { email, password, firstName, lastName } = req.body;

  try {
    let user = await User.findOne({ where: { email } }); // Check if a user with the given email already exists
    if (user) {
      return res.status(400).send(`The user with email ${email} already exists`); // Send a 400 response if the user exists
    }

    const salt = await bcryptjs.genSalt(10); // Generate a salt for password hashing
    const hashedPassword = await bcryptjs.hash(password, salt); // Hash the password with the generated salt

    user = await User.create({
      email,
      password: hashedPassword,
      firstName,
      lastName
    });
    res.status(201).send({ user }); // Send a 201 response with the created user
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while creating the user"); // Send a 500 response if an error occurs
  }
};

exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } }); // Find the user by email

    if (!user) {
      return res.status(404).send("Incorrect email or password"); // Send a 404 response if the user is not found
    }

    const passwordMatch = await bcryptjs.compare(password, user.password); // Compare the provided password with the stored hashed password
    if (!passwordMatch) {
      return res.status(404).send("Incorrect email or password"); // Send a 404 response if the password is incorrect
    }

    const token = jwt.sign({ id: user.id }, process.env.SECRET, {
      expiresIn: "3d"
    }); // Generate a JWT token with the user ID and a 3-day expiration

    res
      .status(200)
      .header("Authorization", `Bearer ${token}`)
      .json({  
        success: true,
        token: `Bearer ${token}`
      }); // Send a 200 response with the JWT token and set it in the Authorization header

    next();
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while logging in the user"); // Send a 500 response if an error occurs
  }
};
