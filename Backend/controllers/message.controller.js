import Message from "../models/messages.model.js";
import User from "../models/users.model.js";

export const getAllSideUsers = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    if (!loggedInUserId) {
      return res.status(400).json({ message: "User ID not found in request" });
    }

    const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } });
    console.log(filteredUsers);
    res.status(200).json({ users: filteredUsers });
  } catch (error) {
    console.log("Error in getAllSideUsers route:", error);
    res.status(500).json({
      message: "message controller, getAllSideUsers went wrong, please try again later",
    });
  }
};


export const getAllMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const myId = req.user._id;
    if (!myId || !userToChatId) {
      return res.status(400).json({ message: "Invalid user IDs" });
    }

    const messages = await Message.find({
      $or: [
        { sender: myId, receiver: userToChatId },
        { sender: userToChatId, receiver: myId },
      ],
    });
    res.status(200).json({ messages });
    console.log(messages);
  } catch (error) {
    console.log("Error in getAllMessages route:", error);
    res.status(500).json({
      message: "message controller, getAllMessages went wrong, please try again later",
    });
  }
};


export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    if (!text && !image) {
      return res.status(400).json({ message: "Message content is required" });
    }

    let imageUrl;
    if (image) {
      try {
        const uploadedImage = await cloudinary.uploader.upload(image);
        imageUrl = uploadedImage.secure_url;
      } catch (uploadError) {
        console.log("Error uploading image:", uploadError);
        return res.status(500).json({ message: "Failed to upload image" });
      }
    }

    const newMessage = new Message({
      sender: senderId,
      receiver: receiverId,
      text,
      image: imageUrl,
    });
    await newMessage.save();

    res.status(200).json({ message: "Message sent", data: newMessage });
    console.log("Message sent", newMessage);
  } catch (error) {
    console.log("Error in sendMessage route:", error);
    res.status(500).json({
      message: "message controller, sendMessage went wrong, please try again later",
    });
  }
};
