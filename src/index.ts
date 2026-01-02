import express from "express";
import cors from "cors";
import router from "./routes";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.send("Hello World!");
});

app.use("/api", router);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
