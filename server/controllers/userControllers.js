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
    const newName = req.body.name || user.name;
    const newEmail = req.body.email || user.email;
    const newBudget =
      req.body.budget !== undefined ? Number(req.body.budget) : user.budget;

    // Only validate budget if it was changed
    if (newBudget !== user.budget) {
      const userTransactions = await TransactionsModel.find({
        userId: user._id,
        cashflow: "Expense",
      });

      const total = userTransactions.reduce(
        (acc, curr) => acc + Number(curr.amount),
        0
      );

      if (newBudget < total) {
        res.status(400);
        throw new Error(
          `Your total expenses are $${total}. Your budget must be at least this amount.`
        );
      }
    }

    // Update fields
    user.name = newName;
    user.email = newEmail;
    user.budget = newBudget;

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
