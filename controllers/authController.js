import userModel from "../models/userModel.js";
import { hashPassword, comparePassword } from "../helper/authHelper.js";
import JWT from "jsonwebtoken";

// Sign Up controller
const signUpController = async (req, res) => {
  try {
    const { name, email, password, answer } = req.body;
    // validation
    if (!name || !email || !password || !answer) {
      return res.status(404).send({
        success: false,
        message: "Please fill all the fields",
      });
    }

    // Check User
    const existingUser = await userModel.findOne({ email });
    // Existing User
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "User already exists",
      });
    }

    // Register User
    const hashedPassword = await hashPassword(password);
    // save
    const user = await new userModel({
      name,
      email,
      password: hashedPassword,
      answer,
    }).save();

    // token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res
      .status(201)
      .send({
        success: true,
        message: `Welcome ${user.name}`,
        user,
        token,
      });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while registering",
    });
  }
};

// Login controller
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Validation
    if (!email || !password) {
      return res
        .status(404)
        .send({ success: false, message: "Invalid email or password" });
    }

    // Check User
    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .send({ success: false, message: "Email does not exist" });
    }

    // compare password
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }

    // token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).send({
      success: true,
      message: `Welcome back ${user.name}`,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while Login",
      error,
    });
  }
};

// Forgot Password
const forgotPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;
    if (!email) {
      return res.status(400).send({ message: "Email is required" });
    }
    if (!answer) {
      return res.status(400).send({ message: "Answer is required" });
    }
    if (!newPassword) {
      return res.status(400).send({ message: "New Password is required" });
    }

    // Check
    const user = await userModel.findOne({ email, answer });
    // Validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Wrong Email or Password",
      });
    }

    const hashed = await hashPassword(newPassword);
    await userModel.findByIdAndUpdate(user._id, { password: hashed });

    res.status(200).send({
      success: true,
      message: "Password Reset Successfully",
    });

  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error Forgoting Password"
    });
  }
};

const testController = (req, res) => {
  res.send("Test Controller");
};

// get all users
const getAllUsersController = async (req, res) => {
  try {
    const allUsers = await userModel.find({}).select('-password').select('-answer');
     res.status(200).send({
      success: true,
      message: "All Users Data Loaded Success",
      allUsers
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error getAllUsersController"
    });
  }
};

// delete users
const deleteUserController = async (req, res) => {
  try {
    const { id } = req.params
    await userModel.findByIdAndDelete(id);

    res.status(200).send({
      success: true,
      message: "User deleted successfully"
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error deleteUserController",
      error
    });
  }
};

export {signUpController, loginController, forgotPasswordController, testController, getAllUsersController, deleteUserController};
