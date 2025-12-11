import React from 'react';
import { Brain, Zap, Heart } from 'lucide-react';
const AboutSection = () => {
    // Định nghĩa các cặp nội dung và hình ảnh
    const items = [
        {
            title: "KNOWLEDGE (KIẾN THỨC)",
            icon: <Brain className="w-5 h-5 mr-2 text-blue-500" />,
            description: "Mức độ hiểu biết về ngữ pháp, từ vựng, và các khả năng ngôn ngữ cũng như chiến lược, cách thức làm từng dạng bài trong từng kỹ năng riêng biệt.",
            imageSrc: "knowledge.png", // Giả định có file ảnh tương ứng
            contentLeft: true, // Nội dung bên trái
        },
        {
            title: "TEST-TAKING SKILLS (KỸ NĂNG LÀM BÀI THI)",
            icon: <Zap className="w-5 h-5 mr-2 text-yellow-500" />,
            description: "Kỹ năng quản lý thời gian, nhận biết dạng bài, và áp dụng kĩ thuật làm bài.",
            imageSrc: "test.png", // Giả định có file ảnh tương ứng
            contentLeft: false, // Nội dung bên phải (bố cục ngược lại)
        },
        {
            title: "BEHAVIORAL PATTERNS (HÀNH VI)",
            icon: <Heart className="w-5 h-5 mr-2 text-red-500" />,
            description: "Thái độ, hành vi, tâm lý và phương pháp học tập.",
            imageSrc: "behavior.png", // Giả định có file ảnh tương ứng
            contentLeft: true, // Nội dung bên trái
        },
    ];

    return (
        <div className="w-full border-t border-black min-h-[250px]">
            <div className="max-w-full mx-auto min-h-full">
                <div className="flex items-baseline mt-6 mb-8 border-b border-black">
                    <span className="font-serif italic text-6xl md:text-4xl sm:text-2xl mr-4 ms-4">ABOUT</span>
                    <span className=" text-8xl md:text-6xl sm:text-4xl font-black text-[#9494FF] tracking-tighter font-bricolage">OUR QUIZ</span>
                </div>

                <div className="w-full relative pb-24">

                    {/* Header Section with Jagged BG */}
                    <div className="relative">
                        <div className="absolute top-0 left-0 w-full h-[155px] z-0 overflow-hidden leading-[0]">
                            <svg className="w-full h-full block" viewBox="0 0 1920 155" preserveAspectRatio="none" aria-hidden="true">
                                <polygon className="fill-[#F4F4FF]" points="1920 823 0 823 0 0 396 101 835 31 1574 149 1920 17 1920 823" />
                            </svg>
                        </div>
                        <div className="absolute top-[154px] left-0 w-full bottom-0 bg-[#F4F4FF] z-0"></div>

                        {/* Tiêu đề chính */}
                        <div className="p-6 border-b border-gray-200 relative z-10 pt-32">
                            <h3 className="text-6xl font-bricolage">phương pháp phân loại</h3>
                        </div>
                    </div>


                    {/* Content Items Loop */}
                    <div className="relative z-10">
                        {items.map((item, index) => {
                            // Cột Nội dung (2/3 chiều rộng)
                            const Content = (
                                <div className="p-8 md:col-span-2 border-b md:border-b-0" key={`content-${index}`}>
                                    <h4 className="font-bold text-xl mb-3 flex items-center font-bricolage">
                                        {item.icon}
                                        {item.title}
                                    </h4>
                                    <p className="text-md text-gray-700">
                                        {item.description}
                                    </p>
                                </div>
                            );

                            // Cột Hình ảnh (1/3 chiều rộng)
                            const Image = (
                                <div className="md:col-span-1 min-h-[200px] md:min-h-[300px] relative overflow-hidden border-b md:border-b-0" key={`image-${index}`}>
                                    <img
                                        src={item.imageSrc}
                                        alt={item.title}
                                        className="w-full object-cover absolute top-0 left-0"
                                    />
                                </div>
                            );

                            // Bố cục xen kẽ
                            const layout = item.contentLeft ? [Content, Image] : [Image, Content];

                            return (
                                <div className="relative mt-24" key={index}>
                                    {/* Background Layer per Item */}
                                    <div className="absolute top-0 left-0 w-full h-[155px] z-0 overflow-hidden leading-[0]">
                                        <svg className="w-full h-full block" viewBox="0 0 1920 155" preserveAspectRatio="none" aria-hidden="true">
                                            <polygon className="fill-[#F4F4FF]" points="1920 823 0 823 0 0 396 101 835 31 1574 149 1920 17 1920 823" />
                                        </svg>
                                    </div>
                                    <div className="absolute top-[154px] left-0 w-full bottom-0 bg-[#F4F4FF] z-0"></div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 relative z-10 pt-24">
                                        {layout}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutSection;