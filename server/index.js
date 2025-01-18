import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.js";
import departmentRouter from "./routes/department.js";
import employeeRouter from "./routes/employee.js";
import salaryRouter from "./routes/salary.js";
import leaveRouter from "./routes/leave.js";
import connect from "./db/db.js";
import settingRouter from "./routes/setting.js";
import dashboardRouter from "./routes/dashboard.js";
import reportRouter from "./routes/report.js";
import dotenv from "dotenv";

connect();
const app = express();
app.use(
  cors({
    origin: "https://employee-maanagement.vercel.app/",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.static("public/uploads"));
app.use("/api/auth", authRouter);
app.use("/api/department", departmentRouter);
app.use("/api/employee", employeeRouter);
app.use("/api/salary", salaryRouter);
app.use("/api/leave", leaveRouter);
app.use("/api/setting", settingRouter);
app.use("/api/dashboard", dashboardRouter);
app.use("/api/report", reportRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
//"start": "nodemon --env-file=.env index.js" pakage line
