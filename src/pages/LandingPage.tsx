"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { MadeWithDyad } from "@/components/made-with-dyad";
import { ArrowRight, Dna, Pill, Brain, Zap, Heart, X, Menu } from "lucide-react";

const LandingPage = () => {
  const navigate = useNavigate();

  const handleStartQuiz = () => {
    navigate("/quiz");
  };

  const [isOpen, setOpen] = useState(false);

  const toggleMenu = () => {
    setOpen(!isOpen);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900 font-sans">
      <header className='w-full bg-white py-6 px-4 md:px-8 flex justify-between items-center border-b border-gray-100 sticky top-0 z-50 relative'>
        {/* Logo */}
        <div className='flex items-center space-x-2'>
          <img src='logo-footer.png' alt='' className='w-16' />
          <span className='font-bold text-xl tracking-tighter ml-2'>
            XALO ENGLISH
          </span>
        </div>

        {/* Menu Desktop*/}
        <div className='hidden md:flex items-center justify-end space-x-6 text-sm font-medium text-gray-500'>
          <a href='/' className='hover:text-black transition-colors'>
            HOME
          </a>
          <a
            href='https://xalo.edu.vn/'
            className='hover:text-black transition-colors'
            target='_blank'
            rel='noreferrer'
          >
            ABOUT XALO
          </a>
          <Button
            onClick={handleStartQuiz}
            className='bg-[#9494FF] hover:bg-[#8494FF] text-white rounded-md px-6 font-bold uppercase text-xs tracking-widest'
          >
            Start Test
          </Button>
        </div>

        {/* Mobile Menu Trigger*/}
        <div
          className='md:hidden cursor-pointer p-2'
          onClick={() => setOpen(!isOpen)}
        >
          {isOpen ? (
            <X className='w-8 h-8 text-black transition-transform duration-300' />
          ) : (
            <Menu className='w-8 h-8 text-black transition-transform duration-300' />
          )}
        </div>

        {isOpen && (
          <div className='absolute top-full left-0 w-full bg-white border-b border-gray-200 shadow-xl flex flex-col px-6 pb-8 md:hidden animate-in slide-in-from-top-5 duration-200'>
            <a
              href='/'
              className='py-4 border-b border-gray-100 text-sm font-bold uppercase tracking-widest hover:text-blue-600'
            >
              HOME
            </a>

            <a
              href='https://xalo.edu.vn/'
              className='py-4 border-b border-gray-100 text-sm font-bold uppercase tracking-widest hover:text-blue-600 mb-6'
              target='_blank'
              rel='noreferrer'
            >
              ABOUT
            </a>

            <Button
              onClick={handleStartQuiz}
              className='w-full bg-blue-500 hover:bg-blue-600 text-white py-6 text-base font-bold uppercase tracking-widest rounded-sm shadow-md'
            >
              RESERVE YOUR CLASS
            </Button>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <main className="flex-grow">
        <div className="w-full pt-12">
          <h1 className="text-8xl md:text-10xl font-black tracking-tighter mb-12 text-center">
            DECODE YOUR <span className="text-[#9494FF]">IELTS DNA</span>
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-12 bg-[#F4F4FF] **md:max-h-[600px]**">

            {/* Left Image Placeholder (Thứ tự hiển thị 1 trên mobile) */}
            <div className="bg-[#F4F4FF] **md:h-full** md:col-span-7 flex items-center justify-center overflow-hidden **order-2 md:order-1**">
              <span className="font-serif italic text-2xl text-white">
                <img src="second.png" alt="" className="w-full h-full object-contain" />
              </span>
            </div>

            {/* Right Content (Thứ tự hiển thị 2 trên mobile) */}
            <div className="md:col-span-5 **md:h-full** flex flex-col items-center justify-between bg-[#F4F4FF] **order-1 md:order-2**">

              <div className="p-6 ">
                {/* Giảm kích thước font mặc định trên mobile, tăng lên từ sm: hoặc md: */}
                <h2 className="text-4xl sm:text-6xl font-bricolage leading-tight mb-6">
                  giải mã gen học tập của riêng bạn - và cách “tái lập trình” để đạt band mục tiêu.
                </h2>
              </div>

              <Button
                onClick={handleStartQuiz}
                className="w-[90%] bg-[#9494FF] hover:bg-[#8494FF]  text-white py-8 text-lg mb-4 md:mb-16 font-bold uppercase tracking-wider rounded-sm shadow-lg hover:shadow-xl transition-all"
              >
                Bắt đầu
              </Button>
            </div>
          </div>

          {/* Sub-hero Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 min-h-[400px] md:border-t">
    
    {/* Cột 1: Chuyên gia */}
    <div className="bg-[#F4F4FF] p-8 **h-full** flex flex-col justify-between transition-colors lg:border-r md:border-b">
        <h3 className="text-5xl leading-tight font-bricolage">
            được thiết kế bởi đội ngũ chuyên gia ielts của xa lộ english
        </h3>
        {/* Thêm khoảng cách ở đây để đẩy paragraph xuống dưới */}
        <div className="mt-8"> 
             <p className="text-md text-gray-500">
                Tìm "liều thuốc học" phù hợp nhất cho chính mình.
                Bắt đầu ngay để không còn "học mãi mà không tiến".
            </p>
        </div>
    </div>
    
    {/* Cột 2: Phân tích */}
    <div className="bg-[#F4F4FF] p-8 **h-full** flex flex-col justify-between transition-colors **lg:border-r**">
        <h3 className="text-5xl leading-tight font-bricolage">
            bản phân tích cá nhân hóa của riêng bạn
        </h3>
        <div className="mt-8">
            <p className="text-md text-gray-500">
                Chẩn đoán trình độ học tập ngay tại nhà!
                Bắt đầu hành trình "tái lập trình" IELTS của bạn.
            </p>
        </div>
    </div>
    
    {/* Cột 3: Hình ảnh */}
    <div className="bg-[#F4F4FF] h-full flex items-center justify-center relative overflow-hidden">
        <span className="font-serif italic text-2xl text-white">
            <img src="third.png" alt="" className="**h-full w-full object-cover**" />
        </span>
    </div>
</div>
        </div>

        {/* About Section */}
        <div className="w-full border-t border-black min-h-[250px]">
          <div className="max-w-full mx-auto min-h-full">
            <div className="flex items-baseline mt-6 mb-2">
              <span className="font-serif italic text-4xl mr-4 ms-4">ABOUT</span>
              <span className="text-6xl md:text-8xl font-black text-[#9494FF] tracking-tighter font-bricolage">OUR QUIZ</span>
            </div>

            <div className="grid **grid-cols-1** md:grid-cols-10 gap-0 bg-[#F4F4FF] border-t border-b">

              <div className="md:col-span-3 **md:max-h-[750px]**">

                {/* Tiêu đề chính */}
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-6xl font-bricolage ">khía cạnh phân loại</h3>
                </div>

                {/* Mục 1: KNOWLEDGE */}
                <div className="p-6 border-b border-gray-200 **md:min-h-[30%]** transition-colors cursor-default group">
                  <h4 className="font-bold text-lg mb-2 flex items-center font-bricolage">
                    <Brain className="w-5 h-5 mr-2 text-blue-500" />
                    KNOWLEDGE (KIẾN THỨC)
                  </h4>
                  <p className="text-md text-gray-600">
                    Mức độ hiểu biết về ngữ pháp, từ vựng, và các khả năng ngôn ngữ cũng như chiến lược, cách thức làm từng dạng bài trong từng kỹ năng riêng biệt.
                  </p>
                </div>

                {/* Mục 2: TEST-TAKING SKILLS */}
                <div className="p-6 border-b border-gray-200 **md:min-h-[30%]** transition-colors cursor-default group">
                  <h4 className="font-bold text-lg mb-2 flex items-center">
                    <Zap className="w-5 h-5 mr-2 text-yellow-500" />
                    TEST-TAKING SKILLS (KỸ NĂNG LÀM BÀI THI)
                  </h4>
                  <p className="text-md text-gray-600">
                    Kỹ năng quản lý thời gian, nhận biết dạng bài, và áp dụng kĩ thuật làm bài.
                  </p>
                </div>

                {/* Mục 3: BEHAVIORAL PATTERNS */}
                <div className="p-6 transition-colors **md:min-h-[30%]** cursor-default group">
                  <h4 className="font-bold text-lg mb-2 flex items-center font-bricolage">
                    <Heart className="w-5 h-5 mr-2 text-red-500" />
                    BEHAVIORAL PATTERNS (HÀNH VI)
                  </h4>
                  <p className="text-md text-gray-600">
                    Thái độ, hành vi, tâm lý và phương pháp học tập.
                  </p>
                </div>
              </div>

              {/* Large Image Area (Trên màn hình MD trở lên: Chiếm 7/10 cột) */}
              <div className="md:col-span-7 w-full flex items-center justify-center relative overflow-hidden **md:max-h-[750px]**">
                {/* Loại bỏ span và áp dụng object-cover cho img */}
                <img
                  src="fouth.png"
                  alt="Hình ảnh minh họa"
                  className="h-full w-full **object-cover**"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action / Formulas */}
        <div className="bg-[#808CFD] text-white py-20 text-center">
          <p className="text-xs font-bold tracking-widest uppercase mb-4">YOUR IELTS DNA</p>
          <h2 className="font-bricolage text-black text-5xl md:text-6xl mb-8 ">meet the fomulas</h2>
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
      <footer className="bg-[#F4F4FF] px-4 border-t border-gray-200 min-h-[300px] flex flex-col">
    {/* Phần Logo và Tên thương hiệu: Vẫn giữ nguyên */}
    <div className="flex justify-between items-start mt-6">
        <div className="flex items-center space-x-1">
            <img src="logo-footer.png" alt="" className="w-16" />
        </div>
        <span className="font-bricolage italic text-3xl">XA LỘ ENGLISH</span>
    </div>

    <div className="flex flex-col md:flex-row justify-between items-start mt-auto mb-6 text-xs font-bold uppercase tracking-wider">
        
        {/* CONTACT */}
        <div className="mt-6 md:mt-0">
            <h4 className="mb-4 text-gray-400">CONTACT</h4>
            <p>Email: hello@xalo.edu.vn</p>
            <p>Phone: 0793 159 413</p>
        </div>
        
        {/* OPENING HOURS */}
        <div className="mt-6 md:mt-0">
            <h4 className="mb-4 text-gray-400">OPENING HOURS</h4>
            <div className="flex justify-between max-w-xs">
                <span>MON - SAT</span>
                <span>9AM - 10PM</span>
            </div>
            <div className="flex justify-between max-w-xs">
                <span>SUNDAYS</span>
                <span>8AM - 12PM</span>
            </div>
        </div>
        
        {/* SOCIAL */}
        <div className="mt-6 md:mt-0">
            <h4 className="mb-4 text-gray-400">SOCIAL</h4>
            <ul className="space-y-1">
                <li>
                    <a rel="stylesheet" href="https://www.instagram.com/xalo.english/">
                        Instagram
                    </a>
                </li>
                <li>
                    <a rel="stylesheet" href="https://www.instagram.com/xalo.english/">
                        Facebook
                    </a>
                </li>
            </ul>
        </div>
    </div>
</footer>
      <div className="min-w-full mt-6 text-center">
        <MadeWithDyad />
      </div>
    </div>
  );
};

export default LandingPage;