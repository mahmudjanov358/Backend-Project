// ----------User Controller----------
const { User } = require("../models/userSchema");

// ----------postUser----------
exports.postUser = async (req, res) => {
  try {
    const { username, name, lastName, phone, email, address, photo } = req.body;
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Username already exists!",
      });
    } else {
      const newUser = new User({
        username,
        name,
        lastName,
        phone,
        email,
        address,
        photo,
      });
      await newUser.save();

      return res.status(201).json({
        success: true,
        message: "User successfully added!",
        data: newUser,
      });
    }
  } catch (error) {
    console.error("Error — ", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};

// ----------getUser----------
exports.getUser = async (req, res) => {
  try {
    const user = await User.find({});

    return res.status(200).json({
      success: true,
      message: "User list retrieved successfully!",
      data: user,
    });
  } catch (error) {
    console.error("Error fetching users", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};

// ----------getUserById----------
exports.getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found!",
        data: user,
      });
    } else {
      res.status(200).json({
        success: true,
        message: "User found successfully!",
        data: user,
      });
    }
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};

// -- ----------updateUser----------
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params.id;
    const { username, name, lastName, phone, email, address, photo } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        username,
        name,
        lastName,
        phone,
        email,
        address,
        photo,
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found!",
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "User successfully updated!",
        data: updatedUser,
      });
    }
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};

// ----------deleteUser----------
exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found!",
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "User successfully deleted!",
        data: deletedUser,
      });
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};
