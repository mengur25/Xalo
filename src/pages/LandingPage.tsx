"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { MadeWithDyad } from "@/components/made-with-dyad";
import { ArrowRight, Dna, Pill, Brain, Zap, Heart } from "lucide-react";

const LandingPage = () => {
  const navigate = useNavigate();

  const handleStartQuiz = () => {
    navigate("/quiz");
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900 font-sans">
      {/* Header */}
      <header className="w-full bg-white py-6 px-4 md:px-8 flex justify-between items-center border-b border-gray-100 sticky top-0 z-50">
        <div className="flex items-center space-x-2">
          <img src="logo-footer.png" alt="" className="w-16"/>
          <span className="font-bold text-xl tracking-tighter ml-2">XALO ENGLISH</span>
        </div>
        <div className="hidden md:flex space-x-6 text-sm font-medium text-gray-500">
          <a href="/" className="hover:text-black transition-colors">HOME</a>
          <a href="https://xalo.edu.vn/" className="hover:text-black transition-colors" target="_blank">ABOUT XALO</a>
        </div>
        <div className="flex gap-8 items-center justify-end">

        <Link
          to={"/admin/login"}
          className="bg-white hidden justify-end hover:bg-gray-100 text-black rounded-none font-bold uppercase text-xs tracking-widest"
          >
          Admin
        </Link>
        <Button
          onClick={handleStartQuiz}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-none px-6 font-bold uppercase text-xs tracking-widest"
          >
          Start Test
        </Button>
          </div>
      </header>

      {/* Hero Section */}
      <main className="flex-grow">
        <div className="w-full max-w-7xl mx-auto px-4 md:px-8 pt-12 pb-20">
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-12 text-center md:text-left">
            DECODE YOUR <span className="text-blue-400">IELTS DNA</span>
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Left Image Placeholder */}
            <div className="md:col-span-8 bg-gray-200 h-96 rounded-none flex items-center justify-center relative overflow-hidden group">
              <span className="font-serif italic text-4xl text-white z-10">
                <img src="second.png" alt="" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-200 to-purple-200 opacity-50 group-hover:opacity-70 transition-opacity duration-500"></div>
            </div>

            {/* Right Content */}
            <div className="md:col-span-4 flex flex-col justify-between bg-gray-50 p-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-medium leading-tight mb-6">
                  Giải mã gen học tập của riêng bạn - và cách “tái lập trình” để đạt band mục tiêu.
                </h2>
              </div>
              <Button
                onClick={handleStartQuiz}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-8 text-lg font-bold uppercase tracking-wider rounded-sm shadow-lg hover:shadow-xl transition-all"
              >
                Bắt đầu
              </Button>
            </div>
          </div>

          {/* Sub-hero Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="bg-gray-100 p-8 h-64 flex flex-col justify-between hover:bg-gray-200 transition-colors">
              <h3 className="text-2xl font-medium leading-tight">
                Được thiết kế bởi đội ngũ chuyên gia ielts của xa lộ english
              </h3>
              <p className="text-xs text-gray-500">
                Tìm "liều thuốc học" phù hợp nhất cho chính mình.
                Bắt đầu ngay để không còn "học mãi mà không tiến".
              </p>
            </div>
            <div className="bg-gray-100 p-8 h-64 flex flex-col justify-between hover:bg-gray-200 transition-colors">
              <h3 className="text-2xl font-medium leading-tight">
                Bản phân tích cá nhân hóa của riêng bạn
              </h3>
              <p className="text-xs text-gray-500">
                Chẩn đoán trình độ học tập ngay tại nhà!
                Bắt đầu hành trình "tái lập trình" IELTS của bạn.
              </p>
            </div>
            <div className="bg-gray-300 h-64 flex items-center justify-center relative overflow-hidden">
              <span className="font-serif italic text-2xl text-white">
                <img src="third.png" alt="" className="h-full"/>
              </span>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="w-full border-t border-black">
          <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
            <div className="flex items-baseline mb-12">
              <span className="font-serif italic text-4xl mr-4">ABOUT</span>
              <span className="text-6xl md:text-8xl font-black text-[#d5b9eb] tracking-tighter">OUR QUIZ</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-0 border-t border-gray-200">
              {/* Sidebar / List */}
              <div className="md:col-span-4 border-r border-gray-200">
                <div className="p-6 border-b border-gray-200 bg-gray-50">
                  <h3 className="text-2xl font-bold">khía cạnh phân loại</h3>
                </div>

                <div className="p-6 border-b border-gray-200 hover:bg-blue-50 transition-colors cursor-default group">
                  <h4 className="font-bold text-lg mb-2 flex items-center">
                    <Brain className="w-5 h-5 mr-2 text-blue-500" />
                    KNOWLEDGE (KIẾN THỨC)
                  </h4>
                  <p className="text-sm text-gray-600">
                    Mức độ hiểu biết về ngữ pháp, từ vựng, và các khả năng ngôn ngữ cũng như chiến lược.
                  </p>
                </div>

                <div className="p-6 border-b border-gray-200 hover:bg-blue-50 transition-colors cursor-default group">
                  <h4 className="font-bold text-lg mb-2 flex items-center">
                    <Zap className="w-5 h-5 mr-2 text-yellow-500" />
                    TEST-TAKING SKILLS (KỸ NĂNG)
                  </h4>
                  <p className="text-sm text-gray-600">
                    Kỹ năng quản lý thời gian, nhận biết dạng bài, và áp dụng kĩ thuật làm bài.
                  </p>
                </div>

                <div className="p-6 hover:bg-blue-50 transition-colors cursor-default group">
                  <h4 className="font-bold text-lg mb-2 flex items-center">
                    <Heart className="w-5 h-5 mr-2 text-red-500" />
                    BEHAVIORAL PATTERNS (HÀNH VI)
                  </h4>
                  <p className="text-sm text-gray-600">
                    Thái độ, hành vi, tâm lý và phương pháp học tập.
                  </p>
                </div>
              </div>

              {/* Large Image Area */}
              <div className="md:col-span-8 bg-gray-300 min-h-[500px] flex items-center justify-center relative">
                <span className="font-serif italic text-6xl text-white">
                  <img src="fouth.png" alt="" />
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action / Formulas */}
        <div className="bg-[#f8f2fc] text-white py-20 text-center">
          <p className="text-xs font-bold tracking-widest uppercase mb-4">YOUR IELTS DNA</p>
          <h2 className="font-serif italic text-5xl md:text-6xl mb-8">MEET THE FORMULAS</h2>
          <Button
            onClick={handleStartQuiz}
            className="bg-white text-black hover:bg-gray-100 font-bold py-3 px-8 rounded-sm uppercase tracking-wider mb-12"
          >
            Bắt đầu
          </Button>

          {/* Cards Placeholder */}
          <div className="flex justify-center items-center space-x-4 px-4 overflow-hidden">
            <div className="w-48 h-82 bg-white rounded-xl transform -rotate-6 border-4 border-black">
              <img src="1.png" alt="" />
            </div>
            <div className="w-56 h-86 bg-white rounded-xl z-10 border-4 border-black">
              <img src="2.png" alt="" />
            </div>
            <div className="w-48 h-82 bg-white rounded-xl transform rotate-6 border-4 border-black">
              <img src="3.png" alt="" />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 py-12 px-4 md:px-8 border-t border-gray-200">
        <div className="flex justify-between items-start mb-12">
          <div className="flex items-center space-x-1">
                      <img src="logo-footer.png" alt="" className="w-16"/>

          </div>
          <span className="font-serif italic text-3xl">XA LỘ ENGLISH</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-xs font-bold uppercase tracking-wider">
          <div>
            <h4 className="mb-4 text-gray-400">CONTACT</h4>
            <p>Email: hello@figma.com</p>
            <p>Phone: (203) 555-5555</p>
          </div>
          <div>
            <h4 className="mb-4 text-gray-400">OPENING HOURS</h4>
            <div className="flex justify-between max-w-xs">
              <span>MON - FRI</span>
              <span>5:00 - 23:00</span>
            </div>
            <div className="flex justify-between max-w-xs">
              <span>SATURDAYS</span>
              <span>8:00 - 19:00</span>
            </div>
          </div>
          <div>
            <h4 className="mb-4 text-gray-400">SOCIAL</h4>
            <ul className="space-y-1">
              <li>Instagram</li>
              <li>X</li>
              <li>LinkedIn</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 text-center">
          <MadeWithDyad />
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;