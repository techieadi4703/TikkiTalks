import Message from "../models/messages.model.js";
import User from "../models/users.model.js";

export const getAllSideUsers = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } });
    clg(filteredUsers);
    res.status(200).json({ users: filteredUsers });
  } catch (error) {
    console.log("Error in getAllSideUsers route");
    res
      .status(500)
      .json({
        message:
          "message controller, getAllSideUsers went wrong, please try again later",
      });
  }
};

export const getAllMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const myId = req.user._id;
    const messages = await Message.find({
      $or: [
        { sender: myId, receiver: userToChatId },
        { sender: userToChatId, receiver: myId },
      ],
    });
    res.status(200).json({ messages });
    console.log(messages);
  } catch (error) {
    console.log("Error in getAllMessages route");
    res
      .status(500)
      .json({
        message:
          "message controller, getAllMessages went wrong, please try again later",
      });
  }
};

export const sendMessage = async (req, res) => {
    try {
        const{text,image} = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        let imageUrl;
        if(image){
            const uploadedImage = await cloudinary.uploader.upload(image);
            imageUrl = uploadedImage.secure_url;
        }
        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl,
        });
        await newMessage.save();

        //realtime functionality goes here=> socket.io
        // const io = req.app.get("io");
        // io.to(receiverId).emit("message", newMessage);
        res.status(200).json({ message: "Message sent" });
        console.log("Message sent", newMessage);

    } catch (error) {
        console.log("Error in sendMessage route");
        res
          .status(500)
          .json({
            message:
              "message controller, sendMessage went wrong, please try again later",
          });
        
    }
}