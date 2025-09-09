// import { createSlice } from "@reduxjs/toolkit";

// const chatSlice = createSlice({
//   name: "chat",
//   initialState: {
//     messages: {}, // { userId: [messages...] }
//   },
//   reducers: {
//     setMessages: (state, action) => {
//       const { targetUserId, messages } = action.payload;
//       state.messages[targetUserId] = messages;
//     },
//     addMessage: (state, action) => {
//       const { targetUserId, message } = action.payload;
//       if (!state.messages[targetUserId]) {
//         state.messages[targetUserId] = [];
//       }
//       state.messages[targetUserId].push(message);
//     },
//   },
// });

// export const { setMessages, addMessage } = chatSlice.actions;
// export default chatSlice.reducer;


// utils/chatSlice.js
import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    messages: {}, // { targetUserId: [messages] }
  },
  reducers: {
    setMessages: (state, action) => {
      const { targetUserId, messages } = action.payload;
      state.messages[targetUserId] = messages;
    },
    addMessage: (state, action) => {
      const { targetUserId, message } = action.payload;
      if (!state.messages[targetUserId]) {
        state.messages[targetUserId] = [];
      }
      state.messages[targetUserId].push(message);
    },
    updateMessageSeen: (state, action) => {
      const { targetUserId, messageId, seenAt } = action.payload;
      if (!state.messages[targetUserId]) return;
      const msg = state.messages[targetUserId].find((m) => m._id === messageId);
      if (msg) {
        msg.seenAt = seenAt;
      }
    },
  },
});

export const { setMessages, addMessage, updateMessageSeen } = chatSlice.actions;
export default chatSlice.reducer;
