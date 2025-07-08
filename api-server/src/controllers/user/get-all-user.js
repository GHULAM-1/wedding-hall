import User from "../../schemas/Users.js"; 

export const getAllUser = async (req, res) => {
  try {
    const users = await User.find().sort({ timestamp: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Error fetching users" });
  }
};