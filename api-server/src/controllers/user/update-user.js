import User from "../../schemas/Users.js"; 

export const updateUser = async (req, res) => {
  try {
    const { name, age } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { name, age },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "User updated", data: updatedUser });
  } catch (err) {
    res.status(400).json({ error: "Update failed", details: err.message });
  }
};
