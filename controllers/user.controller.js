const { User } = require("../models/userSchema");

exports.postUser = async (req, res) => {
  try {
    const { username, name, lastName, phone, email, address, photo } = req.body;
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({
        status: false,
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
        status: true,
        message: "Foydalanuvchi muvaffaqiyatli qo'shildi!",
        data: newUser,
      });
    }
  } catch (error) {
    console.error("Error — ", error);
    return res.status(500).json({
      status: false,
      message: "Serverda xatolik yuz berdi: User qo'shishda muammo",
    });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.find({});
    return res.status(200).json({
      status: true,
      message: "Foydalanuvchilar ro'yxati",
      data: user,
    });
  } catch (error) {
    console.error("Error — ", error);
    return res.status(500).json({
      status: false,
      message: "Serverda xatolik yuz berdi: Foydalanuvchilarni olishda muammo",
    });
  }
};
