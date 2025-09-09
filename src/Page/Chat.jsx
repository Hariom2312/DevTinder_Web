// import axios from "axios";
// import { useEffect, useState, useRef } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { useParams, useNavigate } from "react-router-dom";
// import { BASE_URL } from "../utils/constants";
// import { createSocketConnetion } from "../utils/socket";
// import { setMessages, addMessage } from "../utils/chatSlice";

// const Chat = () => {
//   const [newMessage, setNewMessage] = useState("");
//   const { targetUserId } = useParams();
//   const targetUserID = targetUserId.toString();

//   const user = useSelector((state) => state.user);
//   const connections = useSelector((state) => state.connections);
//   const chatMessages = useSelector((state) => state.chat.messages[targetUserID] || []);
//   const dispatch = useDispatch();

//   const socketRef = useRef(null);
//   const messagesEndRef = useRef(null);
//   const navigate = useNavigate();

//   const chatUser = connections?.find((c) => c._id === targetUserID);
//   const userId = user?._id;

//   useEffect(() => {
//     if (!userId || !connections) return;
//     if (!chatUser) {
//       navigate("/");
//       return;
//     }

//     // Load chat history once
//     const fetchChatHistory = async () => {
//       try {
//         const res = await axios.get(`${BASE_URL}/chat/history/${userId}/${targetUserID}`);
//         dispatch(setMessages({ targetUserId: targetUserID, messages: res.data }));
//       } catch (error) {
//         console.log("Error fetching chat history", error);
//       }
//     };

//     fetchChatHistory();

//     socketRef.current = createSocketConnetion();
//     const socket = socketRef.current;

//     socket.emit("joinChat", { userId, targetUserID });

//     socket.on("messageReceived", ({ firstName, text }) => {
//       dispatch(
//         addMessage({
//           targetUserId: targetUserID,
//           message: { sender: firstName, text },
//         })
//       );
//     });

//     return () => {
//       socket.disconnect();
//     };
//   }, [userId, targetUserID, chatUser, connections, navigate, dispatch]);

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [chatMessages]);

//   const sendMessage = async () => {
//     if (!newMessage.trim()) return;

//     const socket = socketRef.current;
//     socket.emit("sendMessage", {
//       firstName: user.firstName,
//       userId,
//       targetUserID,
//       text: newMessage,
//     });

//     try {
//       await axios.post(`${BASE_URL}/chat/message`, {
//         senderId: userId,
//         receiverId: targetUserID,
//         text: newMessage,
//       });
//     } catch (error) {
//       console.log("Error saving message", error);
//     }

//     setNewMessage("");
//   };

//   if(!user)return;

//   if (!connections || !chatUser) {
//     return (
//       <div className="w-full min-h-screen flex items-center justify-center text-white bg-gray-900">
//         <h1 className="text-xl font-semibold">No connection found 🚫</h1>
//       </div>
//     );
//   }

//   return (
//     <div className="mx-auto w-[90%] h-[500px] bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white flex flex-col">
//       <h1 className="text-2xl font-bold py-4 text-center bg-gray-800 shadow-md">
//         Chat with {chatUser.firstName} {chatUser?.lastName || ""}
//       </h1>

//       {/* Messages */}
//       <div className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-4">
//         {chatMessages.map((msg, index) => {
//           const isMine = msg.sender === user.firstName || msg.senderId === userId;
//           return (
//             <div key={index} className={`flex items-end gap-2 ${isMine ? "justify-end" : "justify-start"}`}>
//               {!isMine && (
//                 <img src={chatUser?.photoUrl} alt="avatar" className="w-8 h-8 rounded-full border" />
//               )}
//               <div
//                 className={`max-w-xs px-3 py-2 rounded-2xl text-sm shadow-md ${
//                   isMine ? "rounded-br-none bg-green-600" : "rounded-bl-none bg-blue-600"
//                 } text-white`}
//               >
//                 {msg.text}
//               </div>
//               {isMine && <img src={user?.photoUrl} alt="avatar" className="w-8 h-8 rounded-full border" />}
//             </div>
//           );
//         })}
//         <div ref={messagesEndRef} />
//       </div>

//       {/* Input */}
//       <div className="p-3 border-t bg-gray-800 flex gap-2 items-center">
//         <input
//           type="text"
//           value={newMessage}
//           onChange={(e) => setNewMessage(e.target.value)}
//           onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//           className="flex-1 p-2 rounded-xl bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
//           placeholder="Type a message..."
//         />
//         <button
//           onClick={sendMessage}
//           className="px-4 py-2 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold shadow-md transition"
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Chat;


// import axios from "axios";
// import { useEffect, useState, useRef } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { useParams, useNavigate } from "react-router-dom";
// import { BASE_URL } from "../utils/constants";
// import { createSocketConnetion } from "../utils/socket";
// import { setMessages, addMessage, updateMessageSeen } from "../utils/chatSlice";

// const Chat = () => {
//   const [newMessage, setNewMessage] = useState("");
//   const { targetUserId } = useParams();
//   const targetUserID = targetUserId.toString();

//   const user = useSelector((state) => state.user);
//   const connections = useSelector((state) => state.connections);
//   const chatMessages = useSelector(
//     (state) => state.chat.messages[targetUserID] || []
//   );
//   const dispatch = useDispatch();

//   const socketRef = useRef(null);
//   const messagesEndRef = useRef(null);
//   const navigate = useNavigate();

//   const chatUser = connections?.find((c) => c._id === targetUserID);
//   const userId = user?._id;

//   useEffect(() => {
//     if (!userId || !connections) return;
//     if (!chatUser) {
//       navigate("/");
//       return;
//     }

//     // Fetch chat history
//     const fetchChatHistory = async () => {
//       try {
//         const res = await axios.get(
//           `${BASE_URL}/chat/history/${userId}/${targetUserID}`
//         );
//         dispatch(setMessages({ targetUserId: targetUserID, messages: res.data }));
//       } catch (error) {
//         console.log("Error fetching chat history", error);
//       }
//     };

//     fetchChatHistory();

//     // Socket setup
//     socketRef.current = createSocketConnetion();
//     const socket = socketRef.current;

//     socket.emit("joinChat", { userId, targetUserID });

//     // Message received
//     socket.on("messageReceived", (msg) => {
//       dispatch(
//         addMessage({
//           targetUserId: targetUserID,
//           message: msg,
//         })
//       );
//     });

//     // Seen update
//     socket.on("messageSeen", ({ messageId, seenAt }) => {
//       dispatch(updateMessageSeen({ targetUserId: targetUserID, messageId, seenAt }));
//     });

//     return () => {
//       socket.disconnect();
//     };
//   }, [userId, targetUserID, chatUser, connections, navigate, dispatch]);

//   // Scroll bottom on new message
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [chatMessages]);

//   // Mark incoming messages as seen
//   useEffect(() => {
//     if (!chatMessages.length) return;

//     const socket = socketRef.current;
//     chatMessages.forEach((msg) => {
//       if (msg.receiverId === userId && !msg.seenAt) {
//         socket.emit("markAsSeen", { messageId: msg._id, userId });
//       }
//     });
//   }, [chatMessages, userId]);

//   const sendMessage = async () => {
//     if (!newMessage.trim()) return;

//     const socket = socketRef.current;
//     const messageData = {
//       senderId: userId,
//       receiverId: targetUserID,
//       text: newMessage,
//       firstName: user.firstName,
//     };

//     socket.emit("sendMessage", messageData);

//     try {
//       const res = await axios.post(`${BASE_URL}/chat/message`, messageData);
//       dispatch(
//         addMessage({
//           targetUserId: targetUserID,
//           message: res.data, // must include _id + createdAt + seenAt
//         })
//       );
//     } catch (error) {
//       console.log("Error saving message", error);
//     }

//     setNewMessage("");
//   };

//   if (!user) return null;

//   if (!connections || !chatUser) {
//     return (
//       <div className="w-full min-h-screen flex items-center justify-center text-white bg-gray-900">
//         <h1 className="text-xl font-semibold">No connection found 🚫</h1>
//       </div>
//     );
//   }

//   return (
//     <div className="mx-auto w-[90%] h-[500px] bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white flex flex-col">
//       <h1 className="text-2xl font-bold py-4 text-center bg-gray-800 shadow-md">
//         Chat with {chatUser.firstName} {chatUser?.lastName || ""}
//       </h1>

//       {/* Messages */}
//       <div className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-4">
//         {chatMessages.map((msg, index) => {
//           const isMine = msg.senderId === userId;
//           return (
//             <div
//               key={index}
//               className={`flex items-end gap-2 ${
//                 isMine ? "justify-end" : "justify-start"
//               }`}
//             >
//               {!isMine && (
//                 <img
//                   src={chatUser?.photoUrl}
//                   alt="avatar"
//                   className="w-8 h-8 rounded-full border"
//                 />
//               )}
//               <div
//                 className={`max-w-xs px-3 py-2 rounded-2xl text-sm shadow-md ${
//                   isMine
//                     ? "rounded-br-none bg-green-600"
//                     : "rounded-bl-none bg-blue-600"
//                 } text-white`}
//               >
//                 <div>{msg.text}</div>
//                 {isMine && msg.seenAt && (
//                   <div className="text-xs text-gray-300 mt-1 text-right">
//                     Seen at{" "}
//                     {new Date(msg.seenAt).toLocaleTimeString([], {
//                       hour: "2-digit",
//                       minute: "2-digit",
//                     })}
//                   </div>
//                 )}
//               </div>
//               {isMine && (
//                 <img
//                   src={user?.photoUrl}
//                   alt="avatar"
//                   className="w-8 h-8 rounded-full border"
//                 />
//               )}
//             </div>
//           );
//         })}
//         <div ref={messagesEndRef} />
//       </div>

//       {/* Input */}
//       <div className="p-3 border-t bg-gray-800 flex gap-2 items-center">
//         <input
//           type="text"
//           value={newMessage}
//           onChange={(e) => setNewMessage(e.target.value)}
//           onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//           className="flex-1 p-2 rounded-xl bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
//           placeholder="Type a message..."
//         />
//         <button
//           onClick={sendMessage}
//           className="px-4 py-2 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold shadow-md transition"
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Chat;


import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { createSocketConnetion } from "../utils/socket";
import { setMessages, addMessage, updateMessageSeen } from "../utils/chatSlice";

const Chat = () => {
  const [newMessage, setNewMessage] = useState("");
  const { targetUserId } = useParams();
  const targetUserID = targetUserId.toString();

  const user = useSelector((state) => state.user);
  const connections = useSelector((state) => state.connections);
  const chatMessages = useSelector(
    (state) => state.chat.messages[targetUserID] || []
  );
  const dispatch = useDispatch();

  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  const chatUser = connections?.find((c) => c._id === targetUserID);
  const userId = user?._id;

  // Setup socket + fetch history
  useEffect(() => {
    if (!userId || !connections) return;
    if (!chatUser) {
      navigate("/");
      return;
    }

    // Load chat history
    const fetchChatHistory = async () => {
      try {
        const res = await axios.get(
          `${BASE_URL}/chat/history/${userId}/${targetUserID}`
        );
        dispatch(setMessages({ targetUserId: targetUserID, messages: res.data }));
      } catch (error) {
        console.log("Error fetching chat history", error);
      }
    };
    fetchChatHistory();

    // Socket setup
    socketRef.current = createSocketConnetion();
    const socket = socketRef.current;

    socket.emit("joinChat", { userId, targetUserID });

    // Incoming message
    socket.on("messageReceived", (msg) => {
      dispatch(addMessage({ targetUserId: targetUserID, message: msg }));
    });

    // Seen event
    socket.on("messageSeen", ({ messageId, seenAt }) => {
      dispatch(updateMessageSeen({ targetUserId: targetUserID, messageId, seenAt }));
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserID, chatUser, connections, navigate, dispatch]);

  // Scroll bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  // Mark messages as seen when they arrive
  useEffect(() => {
    if (!chatMessages.length) return;

    const socket = socketRef.current;
    chatMessages.forEach((msg) => {
      if (msg.receiverId === userId && !msg.seenAt) {
        socket.emit("markAsSeen", { messageId: msg._id, userId });
      }
    });
  }, [chatMessages, userId]);

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    const socket = socketRef.current;
    const messageData = {
      userId,
      targetUserID,
      text: newMessage,
      firstName: user.firstName,
    };

    // Emit to socket (backend will broadcast)
    socket.emit("sendMessage", messageData);

    // Save to DB via API (backend returns full message object)
    try {
      const res = await axios.post(`${BASE_URL}/chat/message`, messageData);
      dispatch(addMessage({ targetUserId: targetUserID, message: res.data }));
    } catch (error) {
      console.log("Error saving message", error);
    }

    setNewMessage("");
  };

  if (!user) return null;

  if (!connections || !chatUser) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center text-white bg-gray-900">
        <h1 className="text-xl font-semibold">No connection found 🚫</h1>
      </div>
    );
  }

  return (
    <div className="mx-auto w-[90%] h-[500px] bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white flex flex-col">
      <h1 className="text-2xl font-bold py-4 text-center bg-gray-800 shadow-md">
        Chat with {chatUser.firstName} {chatUser?.lastName || ""}
      </h1>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-4">
        {chatMessages.map((msg, index) => {
          const isMine = msg.senderId === userId;
          return (
            <div
              key={msg._id || index}
              className={`flex items-end gap-2 ${
                isMine ? "justify-end" : "justify-start"
              }`}
            >
              {!isMine && (
                <img
                  src={chatUser?.photoUrl}
                  alt="avatar"
                  className="w-8 h-8 rounded-full border"
                />
              )}
              <div
                className={`max-w-xs px-3 py-2 rounded-2xl text-sm shadow-md ${
                  isMine
                    ? "rounded-br-none bg-green-600"
                    : "rounded-bl-none bg-blue-600"
                } text-white`}
              >
                <div>{msg.text}</div>
                {isMine && msg.seenAt && (
                  <div className="text-xs text-gray-300 mt-1 text-right">
                    Seen at{" "}
                    {new Date(msg.seenAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                )}
              </div>
              {isMine && (
                <img
                  src={user?.photoUrl}
                  alt="avatar"
                  className="w-8 h-8 rounded-full border"
                />
              )}
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-3 border-t bg-gray-800 flex gap-2 items-center">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          className="flex-1 p-2 rounded-xl bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Type a message..."
        />
        <button
          onClick={sendMessage}
          className="px-4 py-2 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold shadow-md transition"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
