import Router, { Request, Response } from "express";
import { prisma } from "../libs/prisma";

const router = Router();

router.post("/issue/update-status", async (req: Request, res: Response) => {
  const { id, status } = req.body;
  if (!id || !status) {
    res.status(400).json({ message: "Id and status are required" });
  }
  const updatedIssue = await prisma.issue.update({
    where: { id },
    data: { status },
  });
  return updatedIssue
    ? res.status(201).json({
        message: "Issue updated successfully",
        issue: updatedIssue,
      })
    : res.status(400).json({ message: "Issue not updated" });
});
router.post("/bill/add", async (req: Request, res: Response) => {
  try {
    const { number, name, desc, budget } = req.body;
    if (!number || !name || !desc || !budget) {
      res
        .status(400)
        .json({ message: "Number, name, desc and budget are required" });
    }
    const newBill = await prisma.bill.create({
      data: {
        leaderId: number,
        name,
        desc,
        budget,
      },
    });
    return newBill
      ? res.status(201).json({
          message: "Bill created successfully",
          bill: newBill,
        })
      : res.status(400).json({ message: "Bill not created" });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Internal server error" });
  }
});
router.post("/bill/delete", async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    if (!id) {
      res.status(400).json({ message: "Id is required" });
    }
    const deletedBill = await prisma.bill.delete({
      where: { id },
    });
    return deletedBill
      ? res.status(201).json({
          message: "Bill deleted successfully",
          bill: deletedBill,
        })
      : res.status(400).json({ message: "Bill not deleted" });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
