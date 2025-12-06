import User from "#models/user.model.js";
import bcrypt from "bcryptjs";
import generateToken, { verifyToken } from "../utils/jwt.js";

class UserController {
  static async register(req, res) {
    try {
      const { username, email, password, role } = req.body;
      const errors = [];
      if (!username) errors.push("username is required");
      if (!email) errors.push("email is required");
      if (!password) errors.push("password is required");
      if (!role) errors.push("role is required");

      if (errors.length > 0)
        return res.status(400).json({
          status: false,
          statusCode: 400,
          message: "Bad Request",
          details: errors,
        });

      const existingUser = await User.findOne({
        $or: [{ username }, { email }],
      });
      if (existingUser)
        return res.status(400).json({
          status: false,
          statusCode: 400,
          message: "Username or Email already registered",
        });

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({
        username,
        email,
        password: hashedPassword,
        role,
      });

      return res.status(201).json({
        status: true,
        statusCode: 201,
        message: `Akun berhasil dibuat sebagai ${role}`,
        data: {
          id: newUser._id,
          username: newUser.username,
          email: newUser.email,
          role: newUser.role,
        },
      });
    } catch (err) {
      res.status(500).json({
        status: false,
        statusCode: 500,
        message: "Internal Server Error",
        details: err.message,
      });
    }
  }

  // middleware authenticate
  static authenticate(req, res, next) {
    const header = req.headers["authorization"];
    if (!header)
      return res.status(401).json({ message: "Token tidak ditemukan" });

    const parts = header.split(" ");
    if (parts.length !== 2 || parts[0] !== "Bearer")
      return res.status(401).json({ message: "Format token salah" });

    const token = parts[1];

    try {
      const decoded = verifyToken(token);
      req.user = decoded;
      next();
    } catch (err) {
      return res.status(401).json({ message: "Token tidak valid" });
    }
  }

  static async login(req, res) {
    try {
      const { identifier, password } = req.body;

      if (process.env.NODE_ENV !== "production") {
        console.log("[DEBUG] Login attempt payload:", {
          identifier,
          password: password ? "***" : undefined,
          rawBody: req.body,
        });
      }
      if (!identifier || !password)
        return res.status(400).json({
          status: false,
          statusCode: 400,
          message: "Identifier and password are required",
        });

      const user = await User.findOne({
        $or: [{ username: identifier }, { email: identifier }],
      });

      if (!user)
        return res
          .status(200)
          .json({ status: false, statusCode: 200, message: "User not found" });

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword)
        return res.status(200).json({
          status: false,
          statusCode: 200,
          message: "Invalid password",
        });

      const token = generateToken(user);

      return res.status(200).json({
        status: true,
        statusCode: 200,
        message: "Login successful",
        data: {
          id: user._id,
          username: user.username,
          email: user.email,
          role: user.role,
          token,
        },
      });
    } catch (err) {
      res.status(500).json({
        status: false,
        statusCode: 500,
        message: "Internal Server Error",
        details: err.message,
      });
    }
  }

  static async getAllUsers(req, res) {
    try {
      let { page = 1, limit = 10, search } = req.query;

      page = parseInt(page);
      limit = parseInt(limit);
      const filter = {};

      if (search) {
        filter.$or = [
          { username: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } },
        ];
      }

      const totalUsers = await User.countDocuments(filter);
      const users = await User.find(filter)
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({ username: 1 });

      res.json({
        status: true,
        statusCode: 200,
        message: "Successfully fetched users",
        data: users,
        pagination: {
          totalData: totalUsers,
          currentPage: page,
          totalPages: Math.ceil(totalUsers / limit),
          limit,
        },
      });
    } catch (err) {
      res.json({
        status: false,
        statusCode: 500,
        message: "Internal Server Error",
        details: err.message,
      });
    }
  }

  static async getUserById(req, res) {
    try {
      const { id } = req.params;

      const user = await User.findById(id);

      if (!user) {
        return res.status(404).json({
          status: false,
          statusCode: 404,
          message: "User not found",
        });
      }

      res.json({
        status: true,
        statusCode: 200,
        message: "Successfully fetched user",
        data: user,
      });
    } catch (err) {
      res.status(500).json({
        status: false,
        statusCode: 500,
        message: "Internal Server Error",
        details: err.message,
      });
    }
  }

  static async updateUser(req, res) {
    try {
      const { id } = req.params;
      const updatedData = req.body;

      if (updatedData.password) {
        updatedData.password = await bcrypt.hash(updatedData.password, 10);
      }

      const updatedUser = await User.findByIdAndUpdate(id, updatedData, {
        new: true,
        runValidators: true,
      });

      if (!updatedUser) {
        return res.status(404).json({
          status: false,
          statusCode: 404,
          message: "User not found",
        });
      }

      res.json({
        status: true,
        statusCode: 200,
        message: "Successfully updated user",
        data: updatedUser,
      });
    } catch (err) {
      res.status(500).json({
        status: false,
        statusCode: 500,
        message: "Internal Server Error",
        details: err.message,
      });
    }
  }
  static async deleteUser(req, res) {
    try {
      const { id } = req.params;
      const deletedUser = await User.findByIdAndDelete(id);

      if (!deletedUser) {
        return res.status(404).json({
          status: false,
          statusCode: 404,
          message: "User not found",
        });
      }

      res.json({
        status: true,
        statusCode: 200,
        message: "Successfully deleted user",
      });
    } catch (err) {
      res.status(500).json({
        status: false,
        statusCode: 500,
        message: "Internal Server Error",
        details: err.message,
      });
    }
  }
}

export default UserController;
