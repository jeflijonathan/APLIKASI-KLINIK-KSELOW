import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secretkey123";

export default function generateToken(user) {
  return jwt.sign(
    { id: user._id, username: user.username, role: user.role },
    JWT_SECRET,
    { expiresIn: "1d" }
  );
}

export function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET);
}
