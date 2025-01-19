import jwt from "jsonwebtoken";
export const generateToken = (userID, res) => {
  const token = jwt.sign({ userID }, process.env.SECRET_KEY, {
    expiresIn: "7d",
  });
  res.cookie("jwToken", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production" ? true : false,
  });
  return token;
};
