const { default: mongoose } = require("mongoose");

const connectMongo = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    if (conn.connection.readyState === 1) {
      console.log("MongoDB connection successful");
    } else {
      console.log("MongoDB connection error");
    }
  } catch (error) {
    console.log("MongoDB connection error");
    throw new Error(error);
  }
};

module.exports = { connectMongo };
