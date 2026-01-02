import authRouter from "./auth-router";
import Router from "express";
import citizenRouter from "./citizen-router";
import leaderRouter from "./leader-router";
const router = Router();

router.use("/auth", authRouter);
router.use("/citizen", citizenRouter);
router.use("/leader", leaderRouter);

export default router;
