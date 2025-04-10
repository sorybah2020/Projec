import asyncHandler from "express-async-handler";
import User from "../model/userModel.js";
import generateJWT from "../utils/jwtToken.js";
import TransactionsModel from "../model/TransactionsModel.js";
// POST request
// Description: Login User controller.
// Used by: api/users/auth
const Login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateJWT(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      budget: user.budget,
    });
    console.log(`User ${user.name} logged in successfully`);
  } else {
    res.status(400);
    throw new Error("Invalid email or password");
  }
});

// POST request
// Description:  Register a new user.
// Used by: api/users
const Register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Check if user exists in the database

  const userExists = await User.findOne({ email });
  // If user exists, throw an error saying that the user already exists
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // If user does not exist, create a new user
  //with the name, email, and password provided in the request body
  const user = await User.create({
    name,
    email,
    password,
  });

  // If user is created successfully, return the user's information
  // letting the user know that the user has been registered
  if (user) {
    generateJWT(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("Something went wrong");
  }
});

// POST request
// Description: Logs out an existing user.
// Used by: api/users/logout
const Logout = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: `Logged Out ${req.params.name}!` });
});

// GET request
// Description: Gets user information.
// Used by: api/users/profile
const getUser = asyncHandler(async (req, res) => {
  const { _id, name, email, budget } = req.user;
  res.status(200).json({
    _id,
    name,
    email,
    budget,
  });

  //res.status(200).json({ message: `Gets Profile ${req.params.name}!` });
});

// PUT request
// Description: Updates user information.
// Used by: api/users/profile
const Update = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.budget = Number(req.body.budget) || user.budget;
    // if (req.body.password) {
    //   user.password = req.body.password;
    // }
    const userTransactions = await TransactionsModel.find({ userId: user._id });

    const total = userTransactions.reduce((accumulator, current) => {
      return accumulator + Number(current.amount);
    }, 0);

    if (total >= user.budget) {
      res.status(400);
      throw new Error(
        `Total of your transactions is: ${total}. Your budget must be greater than this total.`
      );
    }
    const updatedUser = await user.save();

    generateJWT(res, updatedUser._id);
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      budget: updatedUser.budget,
    });
  } else {
    throw new Error("User not found");
  }
});

export { Login, Register, Logout, getUser, Update };
