import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import defRouter from "./Routers/routes.js";
import userRouter from "./Routers/user.js";
import { errorMiddleware } from "./middlewares/error.js";
import path from "path";
import { fileURLToPath } from "url";

//Custom Dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log(__dirname);

dotenv.config();


export const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: [process.env.FRONTEND_URL],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);


app.use("/api", defRouter);
app.use("/api", userRouter);
app.use(errorMiddleware);

// Adding the Frotend 

app.use(express.static(path.join(__dirname, "Frontend/jobgeniefrontend/dist")));

//Render the index.html file
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "Frontend/jobgeniefrontend/dist", "index.html"));
});