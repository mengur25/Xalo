"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { MadeWithDyad } from "@/components/made-with-dyad";
import { ArrowRight, Dna, Pill, X, Menu } from "lucide-react";
import LearnerCardCarousel from "@/components/LearnerCardCarousel";
import AboutSection from "@/components/AboutSection";


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

          <div className="grid grid-cols-1 lg:grid-cols-12 bg-[#F4F4FF] lg:max-h-[600px]">

            {/* Left Image Placeholder */}
            <div className="bg-[#F4F4FF] lg:h-full lg:col-span-8 flex items-center justify-start overflow-hidden order-2 lg:order-1">
              <img src="second.png" alt="" className="w-full h-full object-contain" />
            </div>

            {/* Right Content */}
            <div className="lg:col-span-4 lg:h-full flex flex-col items-center justify-center bg-[#F4F4FF] order-1 lg:order-2">

              <div className="p-6 py-8 flex flex-col items-center">

                {/* Điều chỉnh font-size để tránh tràn chữ trên mobile/tablet */}
                <h2 className="text-4xl lg:text-5xl font-bricolage leading-tight mb-6">
                  giải mã gen học IELTS
                </h2>

                <p>Chỉ trong 15 phút, bạn sẽ thấy rõ bản thân mình trên hành trình học IELTS và nhận lộ trình học hiệu quả nhất để đạt mục tiêu.</p>

                <Button
                  onClick={handleStartQuiz}
                  className="w-[90%] bg-[#9494FF] hover:bg-[#8494FF] text-white py-8 text-lg mt-16 font-bold uppercase tracking-wider rounded-sm shadow-lg hover:shadow-xl transition-all"
                >
                  DECODE my IELTS DNA now!
                </Button>
              </div>

            </div>
          </div>


          {/* Quote / Testimonial Section (Ref 3) */}
          <div className="w-full bg-[#F4F4FF] text-white py-20 px-4 text-center relative overflow-hidden">

            {/* SVG Top Edge */}
            <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0]">
              <svg
                className="relative block w-[calc(100%+1.3px)] h-[50px] md:h-[110px]"
                preserveAspectRatio="none"
                width="1920"
                height="110"
                viewBox="0 0 1920 110"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="m520 90 900-90 500 110V0H0z"
                  fill="#FFF"
                  fillRule="evenodd"
                />
              </svg>
            </div>

            <div className="max-w-4xl mx-auto z-10 relative pt-8 md:pt-12">
              <h2 className="text-3xl md:text-5xl font-bold mb-6 font-bricolage leading-tight text-gray-700">
                “It’s so incredible to finally be understood.”
              </h2>
              <p className="text-lg md:text-xl mb-10 opacity-90 max-w-2xl mx-auto text-gray-400">
                Only 10 minutes to get a “freakishly accurate” description of who you are and why you do things the way you do.
              </p>
              <Button
                onClick={handleStartQuiz}
                className="bg-[#9494FF] hover:bg-[#8494FF]text-white font-bold py-4 px-8 rounded-full text-lg uppercase tracking-wider shadow-lg transition-transform hover:scale-105"
              >
                DECODE my IELTS DNA now!
              </Button>
            </div>
          </div>

          {/* Sub-hero Grid */}
          <div className="grid grid-cols-2 min-h-[400px] lg:border-t">

            {/* Cột 1: Chuyên gia */}
            <div className="bg-[#F4F4FF] p-8 h-full flex flex-col justify-between transition-colors lg:border-r **lg:border-b**">
              <h3 className="text-5xl leading-tight font-bricolage">
                “Chẩn” để thấy rõ bản thân trên hành trình học IELTS
              </h3>
              <div className="mt-8">
                {/* Giảm font size mặc định và tăng trên màn hình lớn */}
                <p className="text-md lg:text-2xl text-gray-500">
                  Decode your IELTS DNA tại Xa Lộ English là một công cụ được phát triển dành cho tất cả người học IELTS,
                  giúp bạn tự khám phá điểm mạnh, điểm yếu và hiểu rõ phong cách học tập của chính mình.
                </p>
              </div>
            </div>

            {/* Cột 2: Phân tích */}
            <div className="bg-[#F4F4FF] p-8 h-full flex flex-col justify-between transition-colors lg:border-r">
              <h3 className="text-5xl leading-tight font-bricolage">
                “Chữa” bằng lộ trình học tập hiệu quả nhất”
              </h3>
              <div className="mt-8">
                <p className="text-md lg:text-2xl text-gray-500">
                  Không chỉ nhận được mô tả chi tiết về phong cách học tập, Xa Lộ English còn cung cấp tài nguyên học tập được đội ngũ giáo viên phát triển,
                  giúp bạn phát huy tối đa điểm mạnh, cải thiện điểm yếu, và áp dụng phương pháp phù hợp nhất, giúp việc học hiệu quả hơn, tránh lạc lối theo các phương pháp đại trà.
                </p>
              </div>
            </div>


          </div>
        </div>

        {/* About Section */}
        <AboutSection />

        {/* Call to Action / Formulas */}
        <div className="bg-[#808CFD] text-white py-20 text-center">
          <p className="text-xs font-bold tracking-widest uppercase mb-4">YOUR IELTS DNA</p>
          <h2 className="font-bricolage text-black text-5xl md:text-6xl mb-8 ">meet the fomulas</h2>


          <p className="text-xs font-bold tracking-widest uppercase mb-16 ">
            đọc và nghiên cứu chi tiết về tám loại người học bao gồm mô tả chung, <br /> mô tả chi tiết theo từng khía cạnh phân loại, các khó khăn đang kiềm hãm tiềm năng học tập, <br />
            người bạn đồng hành và phương pháp học được gợi ý bởi Xa Lộ English
          </p>

          {/* Cards Placeholder replaced with Carousel */}
          <LearnerCardCarousel />




        </div>

        {/* Gradient CTA Section */}
        <div className="max-w-full mb-8 mt-8 bg-gradient-to-r from-[#FF8C9E] to-[#808CFD] rounded-[3rem] p-12 md:p-20 text-white flex flex-col items-start text-left relative overflow-hidden shadow-2xl mx-4">
          <div className="z-10 relative md:w-3/4">
            <h2 className="text-4xl md:text-6xl font-bold font-bricolage mb-6 leading-tight">
              vậy… gen học IELTS của bạn là gì?
            </h2>
            <p className="text-lg md:text-2xl font-medium opacity-95 mb-12 leading-relaxed font-sans">
              Hãy cùng Xa Lộ English "giải mã" bản thân để biết mình đang ở đâu và cần làm gì để chinh phục mục tiêu IELTS mơ ước nhé!
            </p>
            <Button
              onClick={handleStartQuiz}
              className="bg-white text-[#808CFD] hover:bg-gray-50 font-bold py-8 px-10 rounded-full text-lg md:text-xl uppercase tracking-widest shadow-lg transition-transform hover:scale-105"
            >
              DECODE my IELTS DNA now!
            </Button>
          </div>
          {/* Decorative Overlay to mimic stripes/fade if needed, kept simple for now */}
          <div className="absolute right-0 top-0 h-full w-1/3 bg-white/10 skew-x-12 transform origin-bottom translate-x-1/2 blur-3xl"></div>
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