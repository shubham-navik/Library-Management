const jwt = require("jsonwebtoken");

exports.authMiddleware = (req, res, next) => {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3Y2RlMzA0ZTM1NWRmMWZlNTQ5NGFiMCIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc0MTU0NjI3MywiZXhwIjoxNzQxNjMyNjczfQ.uqjELkZ9zvHN2GTkg115ZOmGlcOL6ibCc-ul9dbkBLg";
    console.log("token : ",token);
    if (!token) return res.status(401).json({ message: "Access denied, no token provided" });

    try {
        console.log("jwt_secret : ",process.env.JWT_SECRET);
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        console.log(req.user);
        next();
    } catch (error) {
        res.status(400).json({ message: "Invalid token" });
    }
};

exports.adminMiddleware = (req, res, next) => {
    if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Access denied, admin only" });
    }
    next();
};
