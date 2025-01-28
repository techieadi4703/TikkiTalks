import jwt from "jsonwebtoken";
import User from "../models/users.model.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies?.jwToken;
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized - No Token Provided" });
    }
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.SECRET_KEY);
      console.log(decoded);
    } catch (error) {
      return res
        .status(401)
        .json({ message: "Unauthorized - Invalid or Expired Token" });
    }
    const user = await User.findById(decoded.userID).select("-password");
    console.log(user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.error("Error in protectRoute middleware:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
