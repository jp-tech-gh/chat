// src/KrishiSahayakBot.jsx
import React, { useState } from "react";

const KrishiSahayakBot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "👋 मैं कृषि सहायक, आपकी किस प्रकार सहायता कर सकता हूँ?" },
  ]);
  const [listening, setListening] = useState(false);

  const recognition =
    window.SpeechRecognition || window.webkitSpeechRecognition
      ? new (window.SpeechRecognition || window.webkitSpeechRecognition)()
      : null;

  if (recognition) {
    recognition.lang = "hi-IN";
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript;
      addMessage("user", text);
      generateResponse(text);
    };

    recognition.onend = () => setListening(false);
  }

  const addMessage = (sender, text) => {
    setMessages((prev) => [...prev, { sender, text }]);
  };

  // 🔗 Replace this with API later
  const generateResponse = async (text) => {
    let reply = "माफ़ कीजिए, अभी मैं API से जुड़ा नहीं हूँ।";

    // 🟢 Placeholder for OpenAI API call
    // Example:
    // const res = await fetch("http://localhost:5000/chat", {...})
    // const data = await res.json();
    // reply = data.reply;

    addMessage("bot", reply);
    speak(reply);
  };

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "hi-IN";
    window.speechSynthesis.speak(utterance);
  };

  const startListening = () => {
    if (recognition) {
      setListening(true);
      recognition.start();
    } else {
      alert("Speech recognition आपके ब्राउज़र में समर्थित नहीं है।");
    }
  };

  return (
    <div>
      {/* Floating Button */}
      {!open && (
        <button
          onClick={() => {
            setOpen(true);
            speak("मैं कृषि सहायक, आपकी किस प्रकार सहायता कर सकता हूँ?");
          }}
          className="fixed bottom-4 right-4 bg-green-600 text-white p-4 rounded-full shadow-lg hover:bg-green-700 transition"
        >
          🌾
        </button>
      )}

      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-4 right-4 w-80 bg-white shadow-lg rounded-2xl overflow-hidden">
          <div className="bg-green-600 text-white p-3 font-bold flex justify-between items-center">
            कृषि सहायक बॉट
            <button onClick={() => setOpen(false)}>❌</button>
          </div>

          <div className="p-3 h-64 overflow-y-auto text-sm space-y-2">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`p-2 rounded-lg max-w-[70%] ${
                  msg.sender === "bot"
                    ? "bg-green-100 text-left"
                    : "bg-gray-200 text-right ml-auto"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          <div className="flex items-center p-2 border-t">
            <button
              onClick={startListening}
              disabled={listening}
              className="px-3 py-1 bg-green-600 text-white rounded-lg disabled:opacity-50"
            >
              {listening ? "🎙 सुन रहा हूँ..." : "बोलिए 🎤"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default KrishiSahayakBot;