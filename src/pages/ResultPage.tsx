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

    // Logic Combo Helpers
    const healerProfile = result.healer ? learnerProfiles[result.healer] : null;
    const fullPowerProfile = result.fullPower ? learnerProfiles[result.fullPower] : null;

    const DETAILED_STAT_NAMES = {
        knowledgeOwnership: "Mức độ Sở hữu Kiến thức",
        absorption: "Mức độ Hấp thụ Kiến thức",
        hiddenPotential: "Mức độ Tiềm năng ẩn",
        adaptation: "Mức độ Thích ứng Chiến thuật",
        confusion: "Mức độ Bối rối Tiềm ẩn",
        recovery: "Mức độ Tự phục hồi",
        enthusiasm: "Mức độ Nhiệt huyết Học tập",
        stress: "Mức độ Căng thẳng Tiềm ẩn",
        supportNeeded: "Mức độ Cần được Hỗ trợ",
    };

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
        <div className="min-h-screen bg-stone-900 font-sans text-black overflow-x-hidden relative">
            {/* Background Texture (The Desk/Table) */}
            <div className="fixed inset-0 z-0">
                <img src="/bg1.png" alt="Background" className="w-full h-full object-cover opacity-90" />
            </div>

            <div ref={resultRef} className="relative z-10 w-full min-h-screen pb-20">
                {/* Navigation / Header Bar */}
                <header className="w-full bg-white/90 backdrop-blur-sm py-4 px-6 md:px-12 flex justify-between items-center border-b border-gray-200 shadow-sm relative z-50 sticky top-0">
                    <div className="flex items-center space-x-2">
                        <img src="logo-footer.png" alt="" className="w-12 h-12" />
                        <a href="/" className="font-bold text-lg tracking-tighter ml-2 font-bricolage">XALO ENGLISH</a>
                    </div>
                </header>

                <div className="max-w-6xl mx-auto pt-12 px-4 md:px-8">

                    {/* --- MAIN PROFILE RECORD COMPONENT --- */}
                    <div className="relative mb-24 group">
                        {/* Decorative Tape/Clip */}
                        <img src="/ele1.png" alt="Tape" className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-48 z-20 drop-shadow-md opacity-90" />

                        {/* Paper Sheet */}
                        <div className="bg-[#FDFBF7] p-8 md:p-12 shadow-2xl transform rotate-1 rounded-sm relative border border-gray-300 min-h-[600px] flex flex-col mx-auto max-w-5xl">
                            {/* Texture Overlay for Paper */}
                            <div className="absolute inset-0 bg-[url('/bg1.png')] opacity-10 pointer-events-none mix-blend-multiply"></div>

                            {/* Inner Content */}
                            <div className="relative z-10 flex flex-col md:flex-row gap-12">

                                {/* LEFT: DATA FIELDS (Typewriter Style) */}
                                <div className="flex-1 space-y-6">
                                    <div className="border-b-2 border-dashed border-gray-400 pb-4 mb-8">
                                        <div className="flex justify-between items-end">
                                            <div className="flex items-center gap-3">
                                                {/* Stamp/Badge */}
                                                <img src="/logo.png" className="w-12 h-12 opacity-80 grayscale" alt="Seal" />
                                                <div>
                                                    <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500">CONFIDENTIAL RECORD</h3>
                                                    <p className="text-xs font-mono text-gray-400">#DID-{new Date().getFullYear()}-{Math.floor(Math.random() * 10000)}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-gray-900 font-bricolage">
                                                    CASE FILE
                                                </h2>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Data Rows */}
                                    <div className="font-mono text-sm md:text-base space-y-4">
                                        <div className="grid grid-cols-12 gap-4 items-baseline border-b border-gray-200 pb-2">
                                            <span className="col-span-4 font-bold text-gray-500 uppercase">SUBJECT NAME:</span>
                                            <span className="col-span-8 font-bold text-lg">{profile.name}</span>
                                        </div>
                                        <div className="grid grid-cols-12 gap-4 items-baseline border-b border-gray-200 pb-2">
                                            <span className="col-span-4 font-bold text-gray-500 uppercase">CODENAME:</span>
                                            <span className="col-span-8 italic">{profile.subtitle || result.learningType}</span>
                                        </div>
                                        <div className="grid grid-cols-12 gap-4 items-baseline border-b border-gray-200 pb-2">
                                            <span className="col-span-4 font-bold text-gray-500 uppercase">DATE RECORDED:</span>
                                            <span className="col-span-8">{new Date().toLocaleDateString()}</span>
                                        </div>
                                        <div className="grid grid-cols-12 gap-4 items-start border-b border-gray-200 pb-2">
                                            <span className="col-span-4 font-bold text-gray-500 uppercase">DESCRIPTION:</span>
                                            <span className="col-span-8 leading-relaxed text-gray-800">
                                                {profile.description}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Footer of the Record */}
                                    <div className="pt-8 mt-auto">
                                        <div className="inline-block border-4 border-red-700 p-2 transform -rotate-3 opacity-80 mix-blend-multiply">
                                            <span className="text-xl font-black text-red-700 uppercase">CLASSIFIED</span>
                                        </div>
                                    </div>
                                </div>

                                {/* RIGHT: POLAROID PHOTO */}
                                <div className="w-full md:w-80 flex-shrink-0 relative">
                                    {/* Clip Image */}
                                    <img src="/ele2.png" alt="Clip" className="absolute -top-8 right-12 w-16 z-20 drop-shadow-lg" />

                                    <div className="bg-white p-4 pb-16 shadow-lg transform rotate-2 border border-gray-200 relative">
                                        <div className="bg-gray-100 w-full aspect-[4/5] overflow-hidden relative filter sepia-[.2] contrast-110">
                                            <img src={profile.image} alt={profile.name} className="w-full h-full object-cover mix-blend-multiply opacity-90" />
                                            {/* Grain/Texture overlay for photo */}
                                            <div className="absolute inset-0 bg-black opacity-5 mix-blend-overlay"></div>
                                        </div>
                                        <div className="absolute bottom-4 left-0 w-full text-center font-caveat text-2xl text-gray-600 rotate-[-1deg] font-handwriting">
                                            {profile.name}
                                        </div>
                                    </div>

                                    {/* Sticker/Stamp */}
                                    {/* <img src="/ele4.png" alt="Sticker" className="absolute -bottom-6 -right-6 w-24 opacity-90 transform rotate-12" /> */}
                                </div>
                            </div>
                        </div>
                    </div>


                    {/* --- INGREDIENTS AS NOTES --- */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24 relative">
                        {/* Title floated via CSS or just header */}
                        <h2 className="absolute -top-16 left-0 w-full text-center font-bricolage font-black text-5xl text-white drop-shadow-md md:text-black md:text-opacity-80 md:drop-shadow-none z-0">
                            ANALYSIS: INGREDIENTS
                        </h2>

                        {/* Card 1 */}
                        <div className="transform rotate-[-2deg] hover:rotate-0 transition-transform duration-300 relative group z-10">
                            <img src="/ele6.png" className="absolute -top-12 left-1/8 transform -translate-x-1/2 w-24 h-auto z-20 opacity-90" />
                            <div className="bg-[#FFFCE8] p-6 shadow-xl relative min-h-[300px] flex flex-col border border-yellow-200/50">
                                <h3 className="font-bold text-center text-lg mb-4 text-red-800 border-b-2 border-red-800/20 pb-2">KNOWLEDGE</h3>
                                <p className="text-sm font-handwriting leading-loose text-gray-800 flex-1">
                                    {profile.ingredients.knowledge}
                                </p>
                                <div className="h-2 w-full bg-red-800/10 mt-4 rounded-full"></div>
                            </div>
                        </div>

                        {/* Card 2 */}
                        <div className="transform rotate-[1deg] hover:rotate-0 transition-transform duration-300 relative group z-20 mt-8 md:mt-0">
                            <img src="/ele2.png" className="absolute -top-4 -right-2 w-12 h-auto z-20 opacity-80" />
                            <div className="bg-[#F0F8FF] p-6 shadow-xl relative min-h-[300px] flex flex-col border border-blue-200/50">
                                <h3 className="font-bold text-center text-lg mb-4 text-blue-800 border-b-2 border-blue-800/20 pb-2">SKILLS</h3>
                                <p className="text-sm font-handwriting leading-loose text-gray-800 flex-1">
                                    {profile.ingredients.skills}
                                </p>
                                <div className="h-2 w-full bg-blue-800/10 mt-4 rounded-full"></div>
                            </div>
                        </div>

                        {/* Card 3 */}
                        <div className="transform rotate-[-1deg] hover:rotate-0 transition-transform duration-300 relative group z-10 mt-8 md:mt-0">
                            <img src="/ele1.png" className="absolute -top-4 left-8 w-24 h-auto z-20 opacity-80" />
                            <div className="bg-[#FFF0F5] p-6 shadow-xl relative min-h-[300px] flex flex-col border border-pink-200/50">
                                <h3 className="font-bold text-center text-lg mb-4 text-pink-800 border-b-2 border-pink-800/20 pb-2">BEHAVIOR</h3>
                                <p className="text-sm font-handwriting leading-loose text-gray-800 flex-1">
                                    {profile.ingredients.behavior}
                                </p>
                                <div className="h-2 w-full bg-pink-800/10 mt-4 rounded-full"></div>
                            </div>
                        </div>
                    </div>


                    {/* --- STATS REPORT (Graph Paper) --- */}
                    <div className="relative mb-24 max-w-5xl mx-auto">
                        <img src="/ele3.png" className="absolute -top-10 -left-10 w-32 z-20 hidden md:block" />
                        <div className="bg-white shadow-2xl p-8 md:p-12 transform rotate-1 border border-gray-300 relative">
                            {/* Graph Paper Pattern */}
                            <div className="absolute inset-0 opacity-10 pointer-events-none"
                                style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
                            </div>

                            <h2 className="text-3xl font-black uppercase mb-12 text-center underline decoration-wavy decoration-blue-500 relative z-10">
                                HEALTH STATISTICS REPORT
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
                                {/* Chart 1 */}
                                <div className="flex flex-col items-center">
                                    <div className="w-40 h-40 relative mb-4">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <PieChart>
                                                <Pie data={createCombinedChartData(knowledgeScore)} innerRadius={50} outerRadius={70} dataKey="value" startAngle={90} endAngle={-270} stroke="none">
                                                    <Cell fill={COLORS.knowledge[0]} />
                                                    <Cell fill="#FF6B6B" />
                                                    <Cell fill="#eee" />
                                                </Pie>
                                            </PieChart>
                                        </ResponsiveContainer>
                                        <div className="absolute inset-0 flex items-center justify-center font-bold text-xl text-gray-700">
                                            {Math.round(knowledgeScore * 95)}%
                                        </div>
                                    </div>
                                    <span className="font-mono font-bold text-sm uppercase bg-black text-white px-2 py-1 rotate-[-2deg]">KNOWLEDGE</span>
                                </div>

                                {/* Chart 2 */}
                                <div className="flex flex-col items-center">
                                    <div className="w-40 h-40 relative mb-4">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <PieChart>
                                                <Pie data={createCombinedChartData(skillsScore)} innerRadius={50} outerRadius={70} dataKey="value" startAngle={90} endAngle={-270} stroke="none">
                                                    <Cell fill={COLORS.skills[0]} />
                                                    <Cell fill="#FF6B6B" />
                                                    <Cell fill="#eee" />
                                                </Pie>
                                            </PieChart>
                                        </ResponsiveContainer>
                                        <div className="absolute inset-0 flex items-center justify-center font-bold text-xl text-gray-700">
                                            {Math.round(skillsScore * 95)}%
                                        </div>
                                    </div>
                                    <span className="font-mono font-bold text-sm uppercase bg-black text-white px-2 py-1 rotate-[1deg]">SKILLS</span>
                                </div>

                                {/* Chart 3 */}
                                <div className="flex flex-col items-center">
                                    <div className="w-40 h-40 relative mb-4">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <PieChart>
                                                <Pie data={createCombinedChartData(behaviorScore)} innerRadius={50} outerRadius={70} dataKey="value" startAngle={90} endAngle={-270} stroke="none">
                                                    <Cell fill={COLORS.behavior[0]} />
                                                    <Cell fill="#FF6B6B" />
                                                    <Cell fill="#eee" />
                                                </Pie>
                                            </PieChart>
                                        </ResponsiveContainer>
                                        <div className="absolute inset-0 flex items-center justify-center font-bold text-xl text-gray-700">
                                            {Math.round(behaviorScore * 95)}%
                                        </div>
                                    </div>
                                    <span className="font-mono font-bold text-sm uppercase bg-black text-white px-2 py-1 rotate-[-1deg]">BEHAVIOR</span>
                                </div>
                            </div>

                            {/* --- DETAILED STATS (New Section) --- */}
                            {result.detailedStats && (
                                <div className="mt-12 pt-6 border-t border-gray-300 relative z-10 w-full">
                                    <h3 className="font-bold text-xl uppercase mb-6 text-center text-gray-800">
                                        CHI TIẾT MỨC ĐỘ SỨC KHỎE
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4 text-left">
                                        {Object.entries(DETAILED_STAT_NAMES).map(([key, name]) => {
                                            const value = result.detailedStats?.[key as keyof typeof result.detailedStats] || 0;
                                            const color = value > 70 ? 'text-green-600' : value > 40 ? 'text-yellow-600' : 'text-red-600';
                                            return (
                                                <div key={key} className="flex justify-between items-center text-sm font-mono border-b border-dashed border-gray-300 pb-1">
                                                    <span className="font-medium text-gray-600">{name}:</span>
                                                    <span className={`font-black ${color}`}>{value}%</span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                    <div className="mt-8 text-center">
                                        <p className="text-xs text-gray-400 italic">
                                            *Các chỉ số được phân tích dựa trên hành vi trả lời và độ kiên định của bạn.
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>


                    {/* --- PRESCRIPTION & SIDE EFFECTS (Sticky Notes) --- */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32 max-w-6xl mx-auto">

                        {/* Prescription Note */}
                        {profile.combo && (
                            <div className="relative group">
                                <img src="/ele1.png" className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-32 z-20 opacity-90" />
                                <div className="bg-[#EFFFF5] p-8 shadow-xl transform rotate-[-2deg] border border-green-200 relative min-h-[350px]">
                                    <h3 className="font-black text-2xl mb-6 text-green-800 uppercase flex items-center gap-2">
                                        <span className="text-3xl">💊</span> COMBO KÊ ĐƠN
                                    </h3>
                                    <div className="text-gray-800 leading-relaxed whitespace-pre-line font-medium">
                                        {(healerProfile || fullPowerProfile) ? (
                                            <>
                                                {healerProfile && (
                                                    <p className="mb-4">
                                                        <span className="font-black text-lg">Bạn Đồng Hành "Chữa Lành":</span>
                                                        <br />
                                                        <span className="text-xl font-bold text-green-700">{healerProfile.name}</span>
                                                    </p>
                                                )}
                                                {fullPowerProfile && (
                                                    <p className="mb-4">
                                                        <span className="font-black text-lg">Bạn Đồng Hành "Full Công Lực":</span>
                                                        <br />
                                                        <span className="text-xl font-bold text-green-700">{fullPowerProfile.name} </span>
                                                    </p>
                                                )}
                                                <div className="text-sm italic text-gray-600 border-t pt-2 mt-4">
                                                    {profile.combo}
                                                </div>
                                            </>
                                        ) : (
                                            <p>{profile.combo}</p>
                                        )}
                                    </div>
                                    <div className="absolute bottom-4 right-4 opacity-50">
                                        <img src="doctorCombo.png" className="w-24 mix-blend-multiply grayscale" />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Side Effects Note */}
                        <div className="relative group mt-12 md:mt-0">
                            <img src="/ele2.png" className="absolute -top-3 right-1/2 transform translate-x-1/2 w-16 z-20 opacity-90" />
                            <div className="bg-[#FFF0F0] p-8 shadow-xl transform rotate-[2deg] border border-red-200 relative min-h-[350px]">
                                <h3 className="font-black text-2xl mb-6 text-red-800 uppercase flex items-center gap-2">
                                    <span className="text-3xl">⚠️</span> TÁC DỤNG PHỤ
                                </h3>
                                <p className="text-gray-800 leading-relaxed font-medium mb-4">
                                    {profile.sideEffects}
                                </p>
                                <p className="text-xs text-red-600 italic mt-4 border-t border-red-200 pt-2">
                                    *Lưu ý: Đọc kỹ hướng dẫn sử dụng trước khi dùng.
                                </p>
                                <div className="absolute bottom-2 right-2 opacity-60">
                                    <img src="butterfly-icon.png" className="w-20 mix-blend-multiply" />
                                </div>
                            </div>
                        </div>

                    </div>


                    {/* --- CTA SECTION (Ticket/Stamp) --- */}
                    <div className="text-center relative pb-20">
                        <div className="relative z-10 inline-block">
                            <div className="bg-white p-2 shadow-2xl transform rotate-1 border-4 border-dashed border-gray-400 rounded-lg">
                                <div className="bg-[#8B9DFF] p-8 text-white">
                                    <h2 className="font-black text-3xl md:text-5xl mb-4 text-white">
                                        SẴN SÀNG CHINH PHỤC?
                                    </h2>
                                    <Button
                                        size="lg"
                                        className="bg-black text-white hover:bg-gray-800 font-bold py-6 px-12 rounded-none uppercase tracking-widest text-xl shadow-lg mt-4 transform hover:scale-105 transition-transform"
                                        onClick={clickedOn}
                                        disabled={isDownloading}
                                    >
                                        TẢI HỒ SƠ CỦA BẠN
                                    </Button>
                                </div>
                            </div>
                            <img src="/ele5.png" className="absolute -bottom-10 -right-10 w-32 z-20 animate-pulse hidden" />
                        </div>
                    </div>

                </div>

                {/* Footer outside the layout slightly or effectively at bottom */}
                <footer className="w-full bg-white/80 backdrop-blur-md mt-20 border-t border-gray-200 py-8 text-center text-xs font-mono text-gray-500">
                    <p>COPYRIGHT © {new Date().getFullYear()} XALO ENGLISH. DO NOT DISTRIBUTE.</p>
                </footer>
            </div>

            {/* Email Modal */}
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Nhận kết quả</DialogTitle>
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
                                type="tel"
                                placeholder="090 XXX XXXX"
                                className="col-span-3"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit" onClick={handleDownload} disabled={isDownloading}>
                            {isDownloading ? "Đang xử lý..." : "Tải kết quả của bạn"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default ResultPage;