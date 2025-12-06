import { verifyToken } from "../utils/jwt.js";

export const auth = (req, res, next) => {
  const header = req.headers["authorization"];

  if (!header)
    return res.status(401).json({
      status: false,
      statusCode: 401,
      message: "Token tidak ditemukan",
    });

  const parts = header.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer")
    return res.status(401).json({
      status: false,
      statusCode: 401,
      message: "Format token salah",
    });

  const token = parts[1];

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      status: false,
      message: "Token tidak valid",
    });
  }
};
