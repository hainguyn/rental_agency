import express from "express";
require("dotenv").config();
import cors from "cors";
import innitRouter from "./src/routes";
import { connectMongo } from "./src/config/connectMongo";
import { connectDatabase } from "./src/config/connectDatabase";
import { createServer } from "http"; // Tạo server HTTP
import { initSocket } from "./src/socket"; // Import logic WebSocket

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["POST", "PUT", "DELETE", "GET"],
  })
);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

connectDatabase();
connectMongo();
innitRouter(app);

// Tạo server HTTP
const httpServer = createServer(app);

// Khởi tạo WebSocket server
initSocket(httpServer);

const port = process.env.PORT || 8888;
const listenner = httpServer.listen(port, () => {
  console.log(`Server is running on port ${listenner.address().port}`);
});
