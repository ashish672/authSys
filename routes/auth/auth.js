const express = require("express");
const { register, login, protect } = require("../../controllers/auth/auth");
const { authMiddleware} = require("../../middleware/auth")
const router = express.Router();

// Register Route 
router.route("/register").post(register);

// Login Route 
router.route("/login").post(login);

// Protect Route
router.route("/protect").get(authMiddleware, protect);

module.exports = router