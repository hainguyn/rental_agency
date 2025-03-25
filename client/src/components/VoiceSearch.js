import React, { memo, useEffect, useState } from "react";
import icons from "../ultils/icons";

const { IoMdMic, IoMdMicOff } = icons;

const VoiceSearch = ({ onVoiceInput }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");

  useEffect(() => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Trình duyệt của bạn không hỗ trợ tính năng nhận diện giọng nói.");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "vi-VN";
    recognition.continuous = false;
    recognition.interimResults = false;

    const startRecognition = () => {
      recognition.start();
      setIsListening(true);
    };

    const stopRecognition = () => {
      recognition.stop();
      setIsListening(false);
    };

    recognition.onresult = (event) => {
      const result = event.results[0][0].transcript;
      setTranscript(result);
      onVoiceInput(result); // Gửi kết quả đến Search component
      stopRecognition();
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    if (isListening) {
      startRecognition();
    }

    return () => {
      recognition.abort();
    };
  }, [isListening, onVoiceInput]);

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => setIsListening(!isListening)}
        className={`p-2 rounded-full ${
          isListening ? "bg-red-500 text-white" : "bg-gray-200 text-black"
        }`}
      >
        {isListening ? <IoMdMicOff size={24} /> : <IoMdMic size={24} />}
      </button>
      {transcript && <span className="text-sm text-gray-500"></span>}
    </div>
  );
};

export default memo(VoiceSearch);
