import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faUser } from "@fortawesome/free-solid-svg-icons";

const socket = io("http://localhost:5000");

function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessages((prevMessages) => [...prevMessages, { sender: "bot", text: data.message }]);
    });
    return () => {
      socket.off("receive_message");
    };
  }, []);

  const sendMessage = () => {
    if (message.trim() === "") return;
    setMessages((prevMessages) => [...prevMessages, { sender: "user", text: message }]);
    socket.emit("send_message", { message });
    setMessage("");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-lg flex flex-col h-3/4">
        <div className="bg-gray-700 p-4 text-center font-bold text-lg">Chatbot</div>
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}> 
              <div className={`p-3 rounded-lg max-w-xs ${msg.sender === "user" ? "bg-blue-500" : "bg-gray-600"}`}>
                {msg.text}
              </div>
            </div>
          ))}
        </div>
        <div className="p-3 border-t border-gray-600 flex items-center space-x-2">
          <input
            type="text"
            className="flex-1 p-2 rounded-lg bg-gray-700 border border-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
          />
          <button onClick={sendMessage} className="bg-blue-500 hover:bg-blue-600 p-2 rounded-full">
            <FontAwesomeIcon icon={faPaperPlane} className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
