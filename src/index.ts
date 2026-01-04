import express from "express";
import cors from "cors";
import router from "./routes";
import dotenv from "dotenv";
import path from "path";
import multer from "multer";
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });
dotenv.config();
const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5500",
      "http://127.0.0.1:5500",
      "https://omkard007.github.io",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

app.get("/health", (req, res) => {
  res.send("Hello World!");
});

app.use("/api", router);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
