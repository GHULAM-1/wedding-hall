import User from "../../schemas/Users.js"; 

export const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ error: "User not found" });

    res.json({ message: "User deleted", data: deletedUser });
  } catch (err) {
    res.status(400).json({ error: "Delete failed" });
  }
};