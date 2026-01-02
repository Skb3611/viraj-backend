import Router, { Request, Response } from "express";
import { prisma } from "../libs/prisma";

const router = Router();

router.get("/all-issues", async (req: Request, res: Response) => {
  try {
    const issues = await prisma.issue.findMany();
    return issues
      ? res.status(200).json({ message: "Issues fetched successfully", issues })
      : res.status(400).json({ message: "Issues not fetched" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal server error" });
  }
});
router.get("/get-issue-by-id/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Issue id is required" });
    }
    const issue = await prisma.issue.findUnique({
      where: { id },
    });
    return issue
      ? res.status(200).json({ message: "Issue fetched successfully", issue })
      : res.status(400).json({ message: "Issue not fetched" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal server error" });
  }
});
router.get("/get-issues-by-pincode/:pincode", async (req: Request, res: Response) => {
  try {
    const { pincode } = req.params;
    if (!pincode) {
      return res.status(400).json({ message: "Pincode is required" });
    }
    const issues = await prisma.issue.findMany({
      where: { pincode },
    });
    return issues
      ? res.status(200).json({ message: "Issues fetched successfully", issues })
      : res.status(400).json({ message: "Issues not fetched" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal server error" });
  }
});
router.get("/get-bills", async (req: Request, res: Response) => {
  try {
    const bills = await prisma.bill.findMany();
    return bills
      ? res.status(200).json({ message: "Bills fetched successfully", bills })
      : res.status(400).json({ message: "Bills not fetched" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal server error" });
  }
});
router.get("/get-bill/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Bill id is required" });
    }
    const bill = await prisma.bill.findUnique({
      where: { id },
    });
    return bill
      ? res.status(200).json({ message: "Bill fetched successfully", bill })
      : res.status(400).json({ message: "Bill not fetched" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal server error" });
  }
});
export default router;
