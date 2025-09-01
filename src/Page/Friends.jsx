import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

  const Friends = ()=> {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeChat, setActiveChat] = useState(null); // selected friend
  const user = useSelector((store) => store.user);

  // Fetch connections
  useEffect(() => {
    const fetchConnections = async () => {
      try {
        setLoading(true);
        const res = await axios.get(BASE_URL + "/user/connections", {
          withCredentials: true,
        });
        setFriends(res.data.data || []);
      } catch (err) {
        console.error(err);
        // toast.error("Failed to fetch connections");
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchConnections();
  }, [user]);

  return (
    <div className="flex min-h-screen bg-base-200">
      {/* Sidebar with friends */}
      <div className="w-1/3 bg-base-100 shadow-lg p-4">
        <h2 className="text-lg font-bold mb-4">Connections</h2>
        {loading ? (
          <p>Loading...</p>
        ) : friends.length === 0 ? (
          <p>You have no friend</p>
        ) : (
          <ul className="space-y-3">
            {friends.map((f) => (
              <li
                key={f._id}
                className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-base-200 ${
                  activeChat?._id === f._id ? "bg-base-300" : ""
                }`}
                onClick={() => setActiveChat(f)}
              >
                <div className="avatar">
                  <div className="w-10 h-10 rounded-full bg-gray-200">
                    {f.photoUrl ? (
                      <img src={f.photoUrl} alt={f.firstName} />
                    ) : (
                      <span className="flex justify-center items-center w-full h-full text-sm">
                        {f.firstName?.[0] || "?"}
                      </span>
                    )}
                  </div>
                </div>
                <span className="font-medium">{f.firstName}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Chat Section */}
      <div className="h-screen flex-1 flex flex-col mb-20">
        {activeChat ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b flex items-center gap-3">
              <div className="avatar">
                <div className="w-10 h-10 rounded-full bg-gray-200">
                  {activeChat.photoUrl ? (
                    <img src={activeChat.photoUrl} alt={activeChat.firstName} />
                  ) : (
                    <span className="flex justify-center items-center w-full h-full text-sm">
                      {activeChat.firstName?.[0]}
                    </span>
                  )}
                </div>
              </div>
              <h2 className="text-lg font-semibold">{activeChat.firstName}</h2>
            </div>

            {/* Chat Messages (dummy for now) */}
            <div className="flex-1 p-4 overflow-y-auto">
              <div className="chat chat-start">
                <div className="chat-bubble">Hi {activeChat.firstName} 👋</div>
              </div>
              <div className="chat chat-end">
                <div className="chat-bubble">Hey! How are you?</div>
              </div>
            </div>

            {/* Chat Input */}
            <div className="p-4 border-t flex gap-2">
              <input
                type="text"
                placeholder="Type a message..."
                className="input input-bordered flex-1"
              />
              <button className="btn btn-primary">Send</button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex justify-center items-center text-gray-500">
            Select a connection to start chatting ...
          </div>
        )}
      </div>
    </div>
  );
}

export default Friends;