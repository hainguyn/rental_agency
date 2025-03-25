import { Server } from "socket.io";
import { getOne } from "../services/user";
import jwt from "jsonwebtoken";
import db from "../models";
import { where } from "sequelize";
const Conversation = require("../models/conversation");
const Message = require("../models/message");
const getConversation = require("../helpers/getConversation");

export const initSocket = (httpServer) => {
  // Tích hợp Socket.IO với server HTTP
  const io = new Server(httpServer, {
    cors: {
      origin: process.env.CLIENT_URL,
      methods: ["GET", "POST"],
    },
  });

  // Lắng nghe các sự kiện WebSocket

  const onlineUser = new Set();

  io.on("connection", async (socket) => {
    console.log("A user connected: ", socket.id);

    const token = socket.handshake.auth.token;
    if (!token) {
      console.error("Token is missing");
      socket.emit("error", "Token is required.");
      socket.disconnect();
    }

    try {
      // Giải mã token để lấy id người dùng
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      const userId = decoded.id;
      const user = await getOne(userId);
      const userInfo = user?.response;
      if (user.err === 0) {
        // console.log("User info: ", userInfo);
        const userId = user?.response.id;
        socket.userId = userId;

        //create a room
        socket.join(user?.response.id)?.toString();
        onlineUser.add(user?.response.id?.toString());
        console.log("Online users: ", Array.from(onlineUser));
        io.emit("onlineUser", Array.from(onlineUser));

        //get message-page
        socket.on("message-page", async (userId) => {
          // console.log("User ID ", userId);
          const userDetails = await db.User.findOne({
            where: { id: userId },
            attributes: { exclude: ["password"] },
          });
          const payload = {
            id: userDetails?.id,
            name: userDetails?.name,
            phone: userDetails?.phone,
            avatar: userDetails?.avatar,
            online: onlineUser.has(userId),
          };
          socket.emit("message-user", payload);

          //previous message
          const getConversationmessage = await Conversation.findOne({
            $or: [
              { sender: user?.response.id, receiver: userId },
              { sender: userId, receiver: user?.response.id },
            ],
          })
            .populate("messages")
            .sort({ updatedAt: -1 });

          socket.emit("message", getConversationmessage?.messages || []);
        });

        //new message
        socket.on("new message", async (data) => {
          // check conversation is avalible or not
          let conversation = await Conversation.findOne({
            $or: [
              { sender: data?.sender, receiver: data?.receiver },
              { sender: data?.receiver, receiver: data?.sender },
            ],
          });
          if (!conversation) {
            const createConversation = await Conversation({
              sender: data?.sender,
              receiver: data?.receiver,
            });
            conversation = await createConversation.save();
          }

          const messages = await Message({
            text: data.text,
            imageUrl: data.imageUrl,
            videoUrl: data.videoUrl,
            msgByUserId: data.msgByUserId,
          });

          const saveMessage = await messages.save();

          const updateConversation = await Conversation.updateOne(
            {
              _id: conversation?._id,
            },
            {
              $push: { messages: saveMessage?._id },
            }
          );
          const getConversationmessage = await Conversation.findOne({
            $or: [
              { sender: data?.sender, receiver: data?.receiver },
              { sender: data?.receiver, receiver: data?.sender },
            ],
          })
            .populate("messages")
            .sort({ updatedAt: -1 });

          // console.log("getConversationmessage", getConversationmessage);

          io.to(data?.sender).emit(
            "message",
            getConversationmessage?.messages || []
          );
          io.to(data?.receiver).emit(
            "message",
            getConversationmessage?.messages || []
          );

          //send conversation
          const conversationSender = await getConversation(data?.sender);
          const conversationReceiver = await getConversation(data?.receiver);

          io.to(data?.sender).emit("conversations", conversationSender);
          io.to(data?.receiver).emit("conversations", conversationReceiver);
        });

        //sidebar
        socket.on("sidebar", async (currentUserId) => {
          // console.log("currentUserId", currentUserId);
          const conversation = await getConversation(currentUserId);
          socket.emit("conversations", conversation);
        });

        //seen message
        // socket.on("seen",async(msgByUserId) => {
        //     let conversation = await Conversation.findOne({
        //       $or: [
        //         { sender: user?.response.id, receiver: msgByUserId },
        //         { sender: msgByUserId, receiver: user?.response.id },
        //       ],
        //     });
        // })
      } else {
        console.error("Error fetching user info: ", user.msg);
      }
    } catch (error) {
      console.error("Error decoding token or fetching user: ", error);
      socket.emit("error", "Invalid token or unable to fetch user.");
    }

    // socket disconnect
    socket.on("disconnect", () => {
      // const userId = socket.id; // Lấy userId từ socket ID (hoặc lưu userId từ lúc connect)
      if (socket.userId) {
        onlineUser.delete(socket.userId); // Xóa người dùng khỏi danh sách online
        console.log("User disconnected: ", socket.userId);
        io.emit("onlineUser", Array.from(onlineUser));
      }
    });
  });
  return io; // Trả về đối tượng io nếu cần dùng ở nơi khác
};
