import Router, { Request, Response } from "express";
import { prisma } from "../libs/prisma";
import { comparePassword, hashPassword } from "../libs/bcrypt";

const router = Router();

router.post("/citizen/signup", async (req: Request, res: Response) => {
  try {
    const { number, password, pincode, name } = req.body;
    if (!number || !password) {
      res.status(400).json({ message: "Number and password are required" });
    }
    const user = await prisma.citizen.findFirst({ where: { number } });
    if (user) {
      res.status(400).json({ message: "User already exists, please login" });
    }
    const hashedPassword = await hashPassword(password);
    const newUser = await prisma.citizen.create({
      data: {
        number,
        password: hashedPassword,
        pincode,
        name,
        img: "",
      },
    });
    newUser
      ? res.status(201).json({
          message: "User created successfully",
          user: {
            name: newUser.name,
            number: newUser.number,
            pincode: newUser.pincode,
          },
        })
      : res.status(400).json({ message: "User not created" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal server error" });
  }
});
router.post("/citizen/login", async (req: Request, res: Response) => {
  try {
    const { number, password } = req.body;
    if (!number || !password) {
      res.status(400).json({ message: "Number and password are required" });
    }
    const user = await prisma.citizen.findFirst({ where: { number } });
    if (!user) {
      res.status(400).json({ message: "User does not exist, please signup" });
    } else {
      const isMatch = await comparePassword(password, user.password);
      if (!isMatch) {
        res.status(400).json({ message: "Invalid password" });
      } else {
        res.status(200).json({
          message: "User logged in successfully",
          user: {
            name: user.name,
            number: user.number,
            img: user.img,
            pincode: user.pincode,
          },
        });
      }
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal server error" });
  }
});
router.post("/leader/signup", async (req: Request, res: Response) => {
  try {
    const { number, password, pincode, name, post } = req.body;
    if (!number || !password) {
      res.status(400).json({ message: "Number and password are required" });
    }
    const user = await prisma.leader.findFirst({ where: { number } });
    if (user) {
      res.status(400).json({ message: "User already exists, please login" });
    }
    const hashedPassword = await hashPassword(password);
    const newUser = await prisma.leader.create({
      data: {
        number,
        password: hashedPassword,
        pincode,
        img:"",
        name,
        post,
      },
    });
    newUser
      ? res.status(201).json({
          message: "User created successfully",
          user: {
            name: newUser.name,
            number: newUser.number,
            img: newUser.img,
            pincode: newUser.pincode,
            post: newUser.post,
          },
        })
      : res.status(400).json({ message: "User not created" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal server error" });
  }
});
router.post("/leader/login", async (req: Request, res: Response) => {
  try {
    const { number, password } = req.body;
    if (!number || !password) {
      res.status(400).json({ message: "Number and password are required" });
    }
    const user = await prisma.leader.findFirst({ where: { number } });
    if (!user) {
      res.status(400).json({ message: "User does not exist, please signup" });
    } else {
      const isMatch = await comparePassword(password, user.password);
      if (!isMatch) {
        res.status(400).json({ message: "Invalid password" });
      } else {
        res.status(200).json({
          message: "User logged in successfully",
          user: {
            name: user.name,
            number: user.number,
            img: user.img,
            pincode: user.pincode,
          },
        });
      }
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
