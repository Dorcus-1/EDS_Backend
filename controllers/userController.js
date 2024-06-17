// const jwt = require("jsonwebtoken")
// const password_complexity = require("joi-password-complexity")
// const bcryptjs  = require ("bcryptjs")
// const {userModel }= require ("../models//userModel")
// const {validate} = require("../utils/userValidations.js")




// exports.createUser = async (req, res) => {
//   const { error } = validate(req.body);
//   if (error) return res.status(400).send(error.details[0].message);

//   const { email, password, confirmPassword } = req.body;

//   // Check if password matches confirmPassword
//   if (password !== confirmPassword) {
//     return res.status(400).send("Passwords do not match");
//   }

//   let user = await userModel.findOne({ email });
//   if (user) {
//     return res.status(400).send(`The user with email ${email} already exists`);
//   }

//   try {
//     const salt = await bcryptjs.genSalt(10);
//     const hashedPassword = await bcryptjs.hash(password, salt);

//     // Create a new user instance
//     user = new userModel({
//       email,
//       password: hashedPassword
//     });

//     console.log("Before token");
//     let token = jwt.sign({ _id: user._id }, process.env.SECRET, {
//       expiresIn: "1h"
//     });
//       console.log(token);

//     // Save the user to the database
//     await user.save();

//     // Generate token
    

//     // Send success response with user and token
//     res.status(201).send({ user, token });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("An error occurred while creating the user");
//   }
// };



// exports.loginUser = async (req, res, next) => {
//   try {
//     const { email, password } = req.body;
//     const user = await userModel.findOne({
//       email: email
//     });
//     if (!user) {
//       return res.status(404).send("incorrect fname or password ");
//     }
//     const passwordMatch = await bcryptjs.compare(password, user.password);
//     if (!passwordMatch) {
//       return res.status(404).send("incorrect fname or password");
//     }
//     let token = jwt.sign(
//       {
//         _id: user._id
//       },
//       process.env.SECRET
//     );
   

//     res.status(200).header("Authorization", token).json({
//       success: true,
//       token: token,

//     });

//     next();
//   } catch (error) {
//     console.log(error);
//   }
// }


const jwt = require("jsonwebtoken");
const password_complexity = require("joi-password-complexity");
const bcryptjs = require("bcryptjs");
const User = require("../models/userModel");
const { validate } = require("../utils/userValidations");


exports.createUser = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).send("Passwords do not match");
  }

  try {
    let user = await User.findOne({ where: { email } });
    if (user) {
      return res
        .status(400)
        .send(`The user with email ${email} already exists`);
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    user = await User.create({
      email,
      password: hashedPassword
    });
    res.status(201).send({ user});
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while creating the user");
  }
};

exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).send("Incorrect email or password");
    }

    const passwordMatch = await bcryptjs.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(404).send("Incorrect email or password");
    }

    const token = jwt.sign({ id: user.id }, process.env.SECRET, {
      expiresIn: "3d"
    });

     res
       .status(200)
       .header("Authorization", `Bearer ${token}`)
       .json({  
         success: true,
         token: `Bearer ${token}`
       });

    next();
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while logging in the user");
  }
};

