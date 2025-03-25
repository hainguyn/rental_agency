const Conversation = require("../models/conversation");
const db = require("../models");

const getConversation = async (currentUserId) => {
  if (currentUserId) {
    const currentUserConversations = await Conversation.find({
      $or: [{ sender: currentUserId }, { receiver: currentUserId }],
    })
      .sort({ updatedAt: -1 })
      .populate("messages");

    // console.log("currentUserConversations", currentUserConversations);

    // Duyệt qua các cuộc trò chuyện và lấy thông tin từ MySQL
    const conversation = await Promise.all(
      currentUserConversations.map(async (conv) => {
        // console.log(conv.receiver, conv.sender);
        // Lấy thông tin chi tiết của sender và receiver từ MySQL
        const sender = await db.User.findOne({
          where: { id: conv.sender },
          attributes: ["name", "avatar", "id"],
        });
        const receiver = await db.User.findOne({
          where: { id: conv.receiver },
          attributes: ["name", "avatar", "id"],
        });
        // console.log(sender.dataValues, receiver.dataValues);
        if (sender && sender.avatar) {
          sender.avatar = sender.avatar.toString("base64");
        }
        if (receiver && receiver.avatar) {
          receiver.avatar = receiver.avatar.toString("base64");
        }
        const countUnseenMsg = conv?.messages.reduce(
          (preve, curr) => preve + (curr.seen ? 0 : 1),
          0
        );

        return {
          _id: conv?._id,
          sender,
          receiver,
          unseenMsg: countUnseenMsg,
          lastMsg: conv?.messages[conv?.messages.length - 1],
        };
      })
    );
    return conversation;
  } else {
    return [];
  }
};

module.exports = getConversation;
