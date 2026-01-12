import { Router } from "express";
import { Request, Response } from "express";
import { prisma } from "../libs/prisma";
import multer from "multer";
import path from "path";
import express from "express";
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

const url = "https://viraj-backend.onrender.com";
const router = Router();
router.post(
  "/issue/add",
  upload.single("image"),
  async (req: Request, res: Response) => {
    try {
      console.log(req.body, req.file);
      const { number, title, desc, pincode } = req.body;
      if (!number || !title || !desc || !pincode) {
        return res
          .status(400)
          .json({ message: "Number,title,desc,pincode are required" });
      }
      const newIssue = await prisma.issue.create({
        data: {
          citizen: { connect: { number } },
          title,
          desc,
          pincode,
          image: req.file ? url + "/" + req.file.path : null,
        },
      });
      return newIssue
        ? res
          .status(201)
          .json({ message: "Issue created successfully", issue: newIssue })
        : res.status(400).json({ message: "Issue not created" });
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);
router.post("/issue/delete", async (req: Request, res: Response) => {
  const { number, id } = req.body;
  if (!number || !id) {
    return res.status(400).json({ message: "Number,id are required" });
  }
  const issue = await prisma.issue.delete({
    where: {
      id: id,
      citizenId: number,
    },
  });
  issue
    ? res.status(200).json({ message: "Issue deleted successfully", issue })
    : res.status(400).json({ message: "Issue not deleted" });
});
router.get("/issues/:citizenId", async (req: Request, res: Response) => {
  try {

    const { citizenId } = req.params;
    const issues = await prisma.issue.findMany({
      where: {
        citizenId: citizenId,
      },
    });
    issues
      ? res.status(200).json({ message: "Issues fetched successfully", issues })
      : res.status(400).json({ message: "Issues not fetched" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal server error" });
  }
})
// router.post("/issue/update", (req, res) => {});

export default router;
