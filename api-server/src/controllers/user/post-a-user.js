import User from "../../schemas/Users.js"; 

export const postAUser = async (req, res) => {
  try {
    const { name, age } = req.body;

    if (!name || typeof age !== "number") {
      return res.status(400).json({ error: "Invalid input data" });
    }

    const newUser = new User({ name, age });
    await newUser.save();

    res.status(201).json({ message: "User saved", data: newUser });
  } catch (err) {
    res.status(500).json({ error: "Error saving user" });
  }
};