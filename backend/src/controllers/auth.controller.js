import User from "../models/User.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    user.save()

    res.status(201).json({ message: "Registered successfully", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ token, user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const saveProfile = async (req, res) => {


  try {
      const {
        name,
        email,
        phone,
        weddingDate,
        weddingType,
        budget,
        location
      } = req.body;

    const updatedUser = await User.findOneAndUpdate(
      { email: email },  
      {
        $set: {
          name,
          phone,
          weddingDate,
          weddingType,
          budget,
          location
        }
      },
      {
        new: true,       
        runValidators: true
      }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User details updated successfully",
      user: updatedUser
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Update failed" });
  }
};


export const getUserProfile = async (req, res) => {


  try {

    const userId = req.body.userId

    const user = await User.findById(userId);
    if (!user)
      return res.status(404).json({ message: "User not found" });
     
    res.status(200).json({
      message: "User details updated successfully",
      user: user
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Update failed" });
  }
};
  
    


