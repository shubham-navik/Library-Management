const User = require("../models/User");
const { route } = require("../routes/bookRoute");

//find all users
exports.getAllusers = async (req, res) => {
    try {
        const users = await User.find({role:"user"});
        res.json({ message: "total "+`${users.length}`+ " users", users });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
}

//find all admins
exports.getAllAdmins = async (req, res) => {
    try {
        const admins = await User.find({role:"admin"});
        res.json({ message: "total "+`${admins.length}`+ " admins", admins });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
}

//delete a user
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });

        if (user.role === "admin") return res.status(400).json({
            message: " you Cannot delete an admin"
        });
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
}

