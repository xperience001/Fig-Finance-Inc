import jwt from "jsonwebtoken";
import User from "../model/user.model";
import { hashPassword } from "../helpers/encrypt";
import { verifyPassword } from "./../helpers/encrypt";

require("dotenv").config();

export async function createUser(input, res) {
  try {
    const { username, email, password } = input;
    const hashedPassword = hashPassword(password);
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      {
        id: newUser.id,
        email: newUser.email,
        username: newUser.username,
        role: newUser.role,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: process.env.TOKEN_EXPIRATION }
    );

    return {
      user: {
        id: newUser.id,
        username: newUser.username,
        role: newUser.role,
      },
      token,
    };
  } catch (error) {
    if (error.code === 11000) {
      res.status(409);
      throw new Error("User already exists");
    } else throw new Error(error);
  }
}

export async function login(input, res) {
  try {
    const { email, password } = input;

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      res.status(400);
      throw new Error("email or password is invalid");
    }

    const confirmPassword = verifyPassword(password, user.password);
    if (!confirmPassword) {
      res.status(400);
      throw new Error("email or password is invalid");
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: process.env.TOKEN_EXPIRATION }
    );

    return {
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
      },
      token,
    };
  } catch (error) {
    throw new Error(error);
  }
}
