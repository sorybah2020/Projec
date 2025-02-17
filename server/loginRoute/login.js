const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Login ");
});

router.post("/", (req, res) => {
  res.send("Set login route");
});

router.put("/:id", (req, res) => {
  res.send("Update login route");
});

router.delete("/", (req, res) => {
  res.send("Delete login route");
});
