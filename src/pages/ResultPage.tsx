"use client";

import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MadeWithDyad } from "@/components/made-with-dyad";
import { QuizResult, LearningType } from "@/types";
import { learnerProfiles } from "@/data/learnerTypes";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import html2canvas from "html2canvas";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, RotateCcw } from "lucide-react";
import { showSuccess, showError } from "@/utils/toast";
import { supabase } from "@/integrations/supabase/client";


const ResultPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const result = location.state?.result as QuizResult;
    const resultRef = useRef<HTMLDivElement>(null);

    const [profile, setProfile] = useState(learnerProfiles['Gummy Bear']);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [email, setEmail] = useState("");
    const [fullName, setFullName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [isDownloading, setIsDownloading] = useState(false);

    useEffect(() => {
        if (result?.learningType && learnerProfiles[result.learningType]) {
            setProfile(learnerProfiles[result.learningType]);
        }
    }, [result]);

    if (!result) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4">
                <p className="text-xl text-gray-800 mb-4">Không tìm thấy kết quả. Vui lòng làm lại quiz.</p>
                <Button onClick={() => navigate("/")}>Quay lại trang chủ</Button>
            </div>
        );
    }

    const { knowledgeScore: rawKnowledgeScore, skillsScore: rawSkillsScore, behaviorScore: rawBehaviorScore } = result;
    const knowledgeScore = Math.abs(rawKnowledgeScore);
    const skillsScore = Math.abs(rawSkillsScore);
    const behaviorScore = Math.abs(rawBehaviorScore);

    const createCombinedChartData = (score: number) => {
        const val1 = Math.round(score * 55);
        const val2 = Math.round(score * 40);
        const safeVal1 = Math.min(val1, 60);
        const safeVal2 = Math.min(val2, 35);
        const remaining = 100 - safeVal1 - safeVal2;

        return [
            { name: 'Stat 1', value: safeVal1 },
            { name: 'Stat 2', value: safeVal2 },
            { name: 'Remaining', value: Math.max(0, remaining) },
        ];
    };

    const COLORS = {
        knowledge: ['#8B9DFF', '#E0E7FF'],
        skills: ['#FF8BA7', '#FFE4E9'],
        behavior: ['#FFC08B', '#FFF0E0'],
    };

    const clickedOn = () => {
        setIsModalOpen(true);
    };

    const handleDownload = async () => {
        // Bổ sung kiểm tra phoneNumber
        if (!email || !fullName || !phoneNumber) {
            showError("Vui lòng nhập Họ và Tên, Email và Số điện thoại để tiếp tục.");
            return;
        }



        setIsDownloading(true);


        try {
            // BƯỚC 1: LƯU LEAD PROFILE VÀO DB
            const { error: profileError } = await supabase
                .from('profiles')
                .insert({
                    email: email,
                    full_name: fullName,
                    phoneNumber: phoneNumber, // <-- THÊM CỘT MỚI
                });

            if (profileError) throw profileError;

            // BƯỚC 2: TẠO VÀ TẢI ẢNH KẾT QUẢ
            if (resultRef.current) {
                const canvas = await html2canvas(resultRef.current, {
                    scale: 2,
                    useCORS: true,
                    logging: false,
                });

                const image = canvas.toDataURL("image/png");
                const link = document.createElement("a");
                link.href = image;
                link.download = `IELTS_DNA_${profile.code}.png`;
                link.click();

                showSuccess("Tải ảnh thành công! Thông tin đã được lưu.");
                setIsModalOpen(false);
            }
        } catch (error: any) {
            console.error("Error saving lead or generating image:", error.message);
            showError("Có lỗi xảy ra khi lưu thông tin. Vui lòng thử lại.");
        } finally {
            setIsDownloading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#F3F4F6] font-sans text-black overflow-x-hidden">
            <div ref={resultRef} className="bg-[#F3F4F6]">
                <header className="w-full bg-white py-6 px-4 md:px-8 flex justify-between items-center border-b border-gray-100 sticky top-0 z-50">
                    <div className="flex items-center space-x-2">
                        <img src="logo-footer.png" alt="" className="w-16" />
                        <a href="/" className="font-bold text-xl tracking-tighter ml-2">XALO ENGLISH</a>
                    </div>
                    <div className="hidden md:flex space-x-6 text-sm font-medium text-gray-500">
                        <a href="/" className="hover:text-black transition-colors">HOME</a>
                        <a href="https://xalo.edu.vn/" className="hover:text-black transition-colors">ABOUT XALO</a>
                    </div>
                </header>

                {/* 1. HEADER SECTION */}
                <div className="bg-white pt-12 pb-8 px-4 md:px-8 border-b border-gray-200">
                    <div className="max-w-7xl mx-auto">
                        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8">
                            YOUR IELTS DNA IS...
                        </h1>

                        <div className="grid grid-cols-1 md:grid-cols-12 ">
                            {/* Left: Text Info */}
                            <div className="md:col-span-7 bg-[#8B9DFF] p-8 md:p-12 rounded-none relative overflow-hidden">
                                <h2 className="font-serif italic text-4xl md:text-5xl mb-2 text-black font-playfair">
                                    {profile.name}
                                </h2>

                                <div className="font-mono text-xs md:text-sm space-y-1 mb-8 opacity-70">
                                    <p>{result.learningType}</p>
                                    <p>DATE: {new Date().toLocaleDateString()}</p>
                                </div>

                                <p className="text-sm md:text-base leading-relaxed font-medium max-w-xl">
                                    {profile.description}
                                </p>
                            </div>

                            {/* Right: Image Placeholder */}
                            <div className="md:col-span-5 bg-gray-300 min-h-[300px] flex items-center justify-center relative">
                                <span className="font-serif italic text-4xl text-white">
                                    <img src={profile.image} alt="" />
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. INGREDIENTS SECTION (THÀNH PHẦN) */}
                <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
                    <h2 className="font-playfair italic text-4xl md:text-5xl text-start mb-16">
                        THÀNH PHẦN
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Knowledge Card */}
                        <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                            <h3 className="text-xs font-bold uppercase tracking-widest mb-4 text-center">
                                HOẠT CHẤT NỀN TẢNG<br />(KIẾN THỨC)
                            </h3>
                            <div className="h-48 rounded-lg mb-6 bg-gradient-to-br from-[#FF9A9E] to-[#FECFEF]"></div>
                            <p className="text-xs text-gray-600 text-center leading-relaxed">
                                {profile.ingredients.knowledge}
                            </p>
                        </div>

                        {/* Skills Card */}
                        <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                            <h3 className="text-xs font-bold uppercase tracking-widest mb-4 text-center">
                                CƠ CHẾ KÍCH HOẠT<br />(KỸ NĂNG LÀM BÀI THI)
                            </h3>
                            <div className="h-48 rounded-lg mb-6 bg-gradient-to-br from-[#a18cd1] to-[#fbc2eb]"></div>
                            <p className="text-xs text-gray-600 text-center leading-relaxed">
                                {profile.ingredients.skills}
                            </p>
                        </div>

                        {/* Behavior Card */}
                        <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                            <h3 className="text-xs font-bold uppercase tracking-widest mb-4 text-center">
                                HOẠT CHẤT ĐIỀU HÒA<br />(THÁI ĐỘ HỌC TẬP)
                            </h3>
                            <div className="h-48 rounded-lg mb-6 bg-gradient-to-br from-[#84fab0] to-[#8fd3f4]"></div>
                            <p className="text-xs text-gray-600 text-center leading-relaxed">
                                {profile.ingredients.behavior}
                            </p>
                        </div>
                    </div>
                </section>

                {/* 3. SIDE EFFECTS SECTION (TÁC DỤNG PHỤ) */}
                <section className="py-16 bg-[#E0E7FF] px-4 md:px-8">
                    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="font-playfair italic text-4xl md:text-5xl mb-8">
                                TÁC DỤNG PHỤ
                            </h2>
                            <p className="text-sm md:text-base leading-relaxed text-gray-800 mb-6">
                                &lt;!&gt; Lưu ý: Mỗi loại "thuốc" học tập đều có những phản ứng không mong muốn.
                            </p>
                            <p className="text-sm md:text-base leading-relaxed text-gray-800 font-medium">
                                {profile.sideEffects}
                            </p>
                        </div>
                        <div className="flex justify-center">
                            {/* Butterfly Icon Placeholder */}
                            <div className="w-64 h-64 bg-white/50 rounded-full flex items-center justify-center">
                                <span className="font-serif italic text-2xl text-[#8B9DFF]">
                                    <img src="butterfly-icon.png" alt="" />
                                </span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 4. HEALTH LEVEL SECTION (MỨC ĐỘ SỨC KHỎE HỌC TẬP) */}
                <section
                    className="
                    py-16 px-4 md:px-8 max-w-full mx-auto
                    bg-gradient-to-br from-purple-50 to-white 
                    from-pink-50 
                "
                >
                    <h2 className="font-serif italic text-4xl md:text-5xl text-center mb-16 font-playfair">
                        MỨC ĐỘ SỨC KHỎE HỌC TẬP
                    </h2>

                    <div className="space-y-16">
                        {/* Knowledge Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4">
                            <div className="text-center md:text-right">
                                <h3 className="font-bold text-sm uppercase mb-2">mức độ sở hữu kiến thức</h3>
                                <span className="font-black text-4xl text-[#8B9DFF]">{Math.round(knowledgeScore * 55)}%</span>
                            </div>

                            <div className="h-48 w-48 mx-auto relative">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={createCombinedChartData(knowledgeScore)}
                                            innerRadius={60}
                                            outerRadius={80}
                                            dataKey="value"
                                            startAngle={90}
                                            endAngle={-270}
                                            stroke="none"
                                        >
                                            <Cell fill={COLORS.knowledge[0]} />
                                            <Cell fill="#FF6B6B" />
                                            <Cell fill="#f5e8feff" />
                                        </Pie>
                                    </PieChart>
                                </ResponsiveContainer>
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                    <span className="text-2xl font-bold text-gray-400">
                                        {Math.round(knowledgeScore * 55) + Math.round(knowledgeScore * 40)}%
                                    </span>
                                </div>
                            </div>

                            <div className="text-center md:text-left">
                                <h3 className="font-bold text-sm uppercase mb-2">mức độ áp dụng kiến thức</h3>
                                <span className="font-black text-4xl text-[#FF6B6B]">{Math.round(knowledgeScore * 40)}%</span>
                            </div>
                        </div>

                        {/* Skills Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4">
                            <div className="text-center md:text-right">
                                <h3 className="font-bold text-sm uppercase mb-2">mức độ nắm bắt chiến thuật</h3>
                                <span className="font-black text-4xl text-[#8B9DFF]">{Math.round(skillsScore * 55)}%</span>
                            </div>

                            <div className="h-48 w-48 mx-auto relative">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={createCombinedChartData(skillsScore)}
                                            innerRadius={60}
                                            outerRadius={80}
                                            dataKey="value"
                                            startAngle={90}
                                            endAngle={-270}
                                            stroke="none"
                                        >
                                            <Cell fill={COLORS.knowledge[0]} />
                                            <Cell fill="#FF6B6B" />
                                            <Cell fill="#f5e8feff" />
                                        </Pie>
                                    </PieChart>
                                </ResponsiveContainer>
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                    <span className="text-2xl font-bold text-gray-400">
                                        {Math.round(skillsScore * 55) + Math.round(skillsScore * 40)}%
                                    </span>
                                </div>
                            </div>

                            <div className="text-center md:text-left">
                                <h3 className="font-bold text-sm uppercase mb-2">mức độ vận dụng chiến thuật</h3>
                                <span className="font-black text-4xl text-[#FF6B6B]">{Math.round(skillsScore * 40)}%</span>
                            </div>
                        </div>

                        {/* Behavior Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4">
                            <div className="text-center md:text-right">
                                <h3 className="font-bold text-sm uppercase mb-2">mức độ chủ động</h3>
                                <span className="font-black text-4xl text-[#8B9DFF]">{Math.round(behaviorScore * 55)}%</span>
                            </div>

                            <div className="h-48 w-48 mx-auto relative">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={createCombinedChartData(behaviorScore)}
                                            innerRadius={60}
                                            outerRadius={80}
                                            dataKey="value"
                                            startAngle={90}
                                            endAngle={-270}
                                            stroke="none"
                                        >
                                            <Cell fill={COLORS.knowledge[0]} />
                                            <Cell fill="#FF6B6B" />
                                            <Cell fill="#f5e8feff" />
                                        </Pie>
                                    </PieChart>
                                </ResponsiveContainer>
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                    <span className="text-2xl font-bold text-gray-400">
                                        {Math.round(behaviorScore * 55) + Math.round(behaviorScore * 40)}%
                                    </span>
                                </div>
                            </div>

                            <div className="text-center md:text-left">
                                <h3 className="font-bold text-sm uppercase mb-2">mức độ kiểm soát & phản ứng</h3>
                                <span className="font-black text-4xl text-[#FF6B6B]">{Math.round(behaviorScore * 40)}%</span>
                            </div>
                        </div>
                    </div>
                </section>

            </div>

            {/* 5. FOOTER / CTA */}
            <section className="py-20 bg-gradient-to-b from-[#8B9DFF] to-[#E0E7FF] text-center px-4">
                <h2 className="font-serif italic text-4xl md:text-5xl mb-4">
                    SẴN SÀNG CHO BƯỚC TIẾP THEO?
                </h2>
                <h3 className="font-serif italic text-3xl md:text-4xl mb-12">
                    CÙNG XEM LỘ TRÌNH TỰ HỌC CÁ<br />NHÂN HOÁ CỦA BẠN.
                </h3>

                <Button
                    className="bg-black text-white hover:bg-gray-800 font-bold py-4 px-10 rounded-sm uppercase tracking-widest text-lg shadow-xl"
                    onClick={clickedOn}
                    disabled={isDownloading}
                >
                    NHẬN LỘ TRÌNH
                </Button>
            </section>

            <footer className="bg-gray-50 py-12 px-4 md:px-8 border-t border-gray-200">
                <div className="flex justify-between items-start mb-12">
                    <div className="flex items-center space-x-1">
                        <img src="logo-footer.png" alt="" className="w-16" />

                    </div>
                    <span className="font-serif italic text-3xl">XA LỘ ENGLISH</span>
                </div>

                <div className="flex justify-between items-start mb-12 text-xs font-bold uppercase tracking-wider">
                    <div>
                        <h4 className="mb-4 text-gray-400">CONTACT</h4>
                        <p>Email: hello@xalo.edu.vn</p>
                        <p>Phone: 0793 159 413</p>
                    </div>
                    <div>
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
                    <div>
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

            {/* Email Modal */}
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Nhận kết quả & Lộ trình</DialogTitle>
                        <DialogDescription>
                            Vui lòng nhập Họ và Tên cùng Email để tải xuống kết quả chi tiết và nhận lộ trình học tập được cá nhân hóa.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">

                        {/* INPUT: FULL NAME */}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="fullName" className="text-right">
                                Họ và Tên
                            </Label>
                            <Input
                                id="fullName"
                                type="text"
                                placeholder="Nguyễn Văn A"
                                className="col-span-3"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                            />
                        </div>

                        {/* INPUT: EMAIL */}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="email" className="text-right">
                                Email
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="example@email.com"
                                className="col-span-3"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        {/* INPUT: PHONE NUMBER */}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="phoneNumber" className="text-right">
                                Số điện thoại
                            </Label>
                            <Input
                                id="phoneNumber"
                                type="tel" // Đổi type thành tel cho phù hợp
                                placeholder="090 XXX XXXX"
                                className="col-span-3"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit" onClick={handleDownload} disabled={isDownloading}>
                            {isDownloading ? "Đang xử lý..." : "Tải kết quả & Nhận lộ trình"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default ResultPage;