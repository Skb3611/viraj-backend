import authRouter from "./auth-router";
import Router from "express";
import citizenRouter from "./citizen-router";
import leaderRouter from "./leader-router";
import generalRouter from "./general-router";

const router = Router();

router.use("/auth", authRouter);
router.use("/citizen", citizenRouter);
router.use("/leader", leaderRouter);
router.use("/", generalRouter);


export default router;
