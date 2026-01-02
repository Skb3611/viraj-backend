import { Router } from "express";
import { Request, Response } from "express";
import { prisma } from "../libs/prisma";
const router = Router();
router.post("/issue/add", async (req: Request, res: Response) => {
  try {
    const { number, title, desc, pincode } = req.body;
    if (!number || !title || !desc || !pincode) {
      return res
        .status(400)
        .json({ message: "Number,title,desc,pincode are required" });
    }
    const newIssue = await prisma.issue.create({
      data: {
        citizenId: number,
        title,
        desc,
        pincode,
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
});
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
// router.post("/issue/update", (req, res) => {});

export default router;
