"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { MadeWithDyad } from "@/components/made-with-dyad";

const LandingPage = () => {
  const navigate = useNavigate();

  const handleStartQuiz = () => {
    // Điều hướng đến trang quiz chính khi người dùng nhấn nút "Bắt đầu"
    navigate("/quiz"); 
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 p-4 text-center">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8 md:p-12 space-y-8">
        <img
          src="/public/placeholder.svg" // Sử dụng placeholder, bạn có thể thay thế bằng hình ảnh phù hợp
          alt="IELTS DNA Quiz"
          className="mx-auto w-48 h-48 object-contain"
        />
        <h1 className="text-4xl md:text-5xl font-extrabold text-purple-800 leading-tight">
          Giải Mã DNA IELTS Của Bạn!
        </h1>
        <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
          Khám phá phong cách học IELTS độc đáo của bạn qua bài quiz "Decode Your IELTS DNA". 
          Chúng tôi sẽ giúp bạn hiểu rõ hơn về Kiến thức, Kỹ năng làm bài và Thói quen học tập của mình để tối ưu hóa hành trình chinh phục IELTS.
        </p>
        <p className="text-md md:text-lg text-gray-600">
          Bài kiểm tra sẽ mất khoảng 10 phút để hoàn thành. Hãy sẵn sàng khám phá bản thân!
        </p>
        <Button
          onClick={handleStartQuiz}
          className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-3 px-8 rounded-full text-xl shadow-lg transform transition-transform duration-200 hover:scale-105"
        >
          Bắt Đầu Quiz
        </Button>
      </div>
      <MadeWithDyad />
    </div>
  );
};

export default LandingPage;