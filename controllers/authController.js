import usermodel from "../models/usermodel.js";
import { comparePassword, hashpassword } from "./../helper/authHelper.js";
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;

    // vlidations
    if (!name) {
      return res.send({ error: "name is requred" });
    }
    if (!email) {
      return res.send({ error: "email is requred" });
    }
    if (!password) {
      return res.send({ error: "password is requred" });
    }
    if (!phone) {
      return res.send({ error: "phone is requred" });
    }
    if (!address) {
      return res.send({ error: "address is requred" });
    }

    const exisitinguser = await usermodel.findOne({ email });

    if (exisitinguser) {
      return res.status(200).send({
        success: true,
        message: "already register please login",
      });
    }

    const hashedpassword = await hashpassword(password);

    const user = await new usermodel({
      name,
      email,
      phone,
      address,
      password: hashedpassword,
    }).save();

    res.status(201).send({
      success: true,
      message: "user register sucessfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Registration",
      error,
    });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || password) {
      return res.status(404).send({
        success: false,
        message: "invalid email or password",
      });
    }
    const user = await usermodel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "email not register",
      });
    }
    const match = await comparePassword(password, user.password);

    if (!match) {
      return res.status(200).send({
        success: false,
        message: "invalid Password",
      });
    }

    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "login succssesfully",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in logon",
      error,
    });
  }
};
