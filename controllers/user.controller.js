// ----------User
const { User } = require("../models/userSchema");

// ----------postUser
exports.postUser = async (req, res) => {
  try {
    const { username, name, lastName, phone, email, address, photo } = req.body;
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Username egasi mavjud!",
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
        message: "Foydalanuvchi muvaffaqiyatli qo'shildi!",
        data: newUser,
      });
    }
  } catch (error) {
    console.error("Error — ", error);
    return res.status(500).json({
      success: false,
      message: "Serverda xatolik yuz berdi: User qo'shishda muammo!",
    });
  }
};

// ----------getUser
exports.getUser = async (req, res) => {
  try {
    const user = await User.find({});
    return res.status(200).json({
      success: true,
      message: "Foydalanuvchilar ro'yxati!",
      data: user,
    });
  } catch (error) {
    console.error("Error fetching users", error);
    return res.status(500).json({
      success: false,
      message: "Serverda xatolik yuz berdi: Foydalanuvchilarni olishda muammo!",
    });
  }
};

// ----------getUserById
exports.getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User topilmadi!",
        data: user,
      });
    } else {
      res.status(200).json({
        success: true,
        message: "User topildi!",
        data: user,
      });
    }
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    return res.status(500).json({
      success: false,
      message:
        "Server xatosi: User ID bo'yicha ma'lumot olishda xato yuz berdi!",
    });
  }
};
