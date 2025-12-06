import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import env from "dotenv";

env.config();

const mongoURI = process.env.MONGO_URI || "";

export async function seedUsers() {
  try {
    await mongoose.connect(mongoURI);

    console.log("Connected to MongoDB for seeding");

    const users = [
      {
        username: "admin",
        email: "admin@example.com",
        password: "admin123",
        role: "ADMIN",
      },
      {
        username: "dokter1",
        email: "dokter1@example.com",
        password: "dokter123",
        role: "DOKTER",
      },
      {
        username: "dokter2",
        email: "dokter2@example.com",
        password: "dokter456",
        role: "DOKTER",
      },
    ];

    for (const userData of users) {
      const existingUser = await User.findOne({
        $or: [{ username: userData.username }, { email: userData.email }],
      });

      if (!existingUser) {
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        await User.create({ ...userData, password: hashedPassword });
        console.log(`User ${userData.username} berhasil dibuat.`);
      } else {
        console.log(`User ${userData.username} sudah ada, dilewati.`);
      }
    }
  } catch (err) {
    console.error("Seeder gagal:", err);
  } finally {
    await mongoose.disconnect();
    console.log("MongoDB connection closed");
  }
}

seedUsers();
