import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./DB/connectDB.js";
import employeeRoute from "./routes/employee.route.js";
import systemRoutes from "./routes/system.route.js";
import authRoute from "./routes/auth.route.js";
import userRoute from "./routes/user.route.js";
import payment from "./routes/razorpay.route.js";

const app = express();
dotenv.config();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(
  cors({
    credentials: true,
    origin: [
      "http://localhost:5173",
      "https://atofon-admin.onrender.com",
      "https://atofon.vercel.app",
      "https://atofonadmin.vercel.app",
      "https://atofon.info",
      "https://www.atofon.info",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"], // ✅ fixed here
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoute);
app.use("/api/employee", employeeRoute);
app.use("/api/systems", systemRoutes);
app.use("/api/v1", payment);
app.use("/api/user", userRoute);

app.get("/", (req, res) => {
  res.send("Welcome to atofon server!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
