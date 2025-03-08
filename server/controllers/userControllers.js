import asyncHandler from "express-async-handler";

// POST request
// Description: Login User controller.
// Used by: api/users/auth
const User = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Hello ${req.params.name}!` });
});

// POST request
// Description:  Register a new user.
// Used by: api/users

const Register = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Registered ${req.params.name}` });
});

// POST request
// Description: Logs out an existing user.
// Used by: api/users/logout
const Logout = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Goodbye ${req.params.name}!` });
});

// GET request
// Description: Gets user information.
// Used by: api/users/profile
const getUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Gets Profile ${req.params.name}!` });
});

// PUT request
// Description: Updates user information.
// Used by: api/users/profile
const Update = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Updated ${req.params.name}!` });
});

export { User, Register, Logout, getUser, Update };
