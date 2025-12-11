import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { learnerProfiles } from "@/data/learnerTypes";
import { LearningType } from "@/types";
import { Button } from "@/components/ui/button";
import { ArrowLeft, RotateCcw } from "lucide-react";

const LearnerTypeDetailPage = () => {
    const { typeId } = useParams();
    const navigate = useNavigate();

    // Find profile
    // typeId maps to profile.name (or handle case sensitivity?)
    // learnerTypes keys are exact strings 'Multi-vitamins', etc.
    const profileKey = Object.keys(learnerProfiles).find(
        key => key === typeId || key.toLowerCase() === typeId?.toLowerCase()
    ) as LearningType | undefined;

    const profile = profileKey ? learnerProfiles[profileKey] : null;

    if (!profile) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4">
                <p className="text-xl text-gray-800 mb-4">Không tìm thấy loại người học này.</p>
                <Button onClick={() => navigate("/")}>Quay lại trang chủ</Button>
            </div>
        );
    }

    // Reuse styling from ResultPage roughly
    return (
        <div className="min-h-screen bg-[#F3F4F6] font-sans text-black">
            <header className="w-full bg-white py-6 px-4 md:px-8 flex justify-between items-center border-b border-gray-100 sticky top-0 z-50">
                <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate('/')}>
                    <img src="/logo-footer.png" alt="" className="w-16" />
                    <span className="font-bold text-xl tracking-tighter ml-2">XALO ENGLISH</span>
                </div>
                <div className="flex items-center">
                    <Button variant="ghost" onClick={() => navigate('/')} className="flex items-center">
                        <ArrowLeft className="mr-2 h-4 w-4" /> TRANG CHỦ
                    </Button>
                </div>
            </header>

            {/* HEADER HERO */}
            <div className="bg-white pt-12 border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center mb-16">
                        <div className="md:col-span-7">
                            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4 text-[#9494FF]">
                                {profile.name}
                            </h1>
                            {profile.subtitle && (
                                <p className="text-2xl md:text-3xl font-serif italic text-gray-400 mb-8">{profile.subtitle}</p>
                            )}
                            <p className="text-lg md:text-xl leading-relaxed font-medium text-gray-800 whitespace-pre-line">
                                {profile.description}
                            </p>
                        </div>
                        <div className="md:col-span-5 flex justify-center">
                            <img src={`/${profile.image}`} alt={profile.name} className="max-h-[400px] object-contain drop-shadow-2xl" />
                        </div>
                    </div>
                </div>
            </div>

            {/* INGREDIENTS */}
            <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto bg-[#F4F4FF]">
                <h2 className="font-bricolage italic text-4xl md:text-5xl mb-12 text-center">THÀNH PHẦN CẤU TẠO</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="font-bold uppercase tracking-widest mb-4 text-[#9494FF]">KNOWLEDGE (Kiến thức)</h3>
                        <p className="text-gray-600 leading-relaxed text-sm">{profile.ingredients.knowledge}</p>
                    </div>
                    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="font-bold uppercase tracking-widest mb-4 text-[#FFA500]">SKILLS (Kỹ năng)</h3>
                        <p className="text-gray-600 leading-relaxed text-sm">{profile.ingredients.skills}</p>
                    </div>
                    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="font-bold uppercase tracking-widest mb-4 text-[#FF6B6B]">BEHAVIOR (Thái độ)</h3>
                        <p className="text-gray-600 leading-relaxed text-sm">{profile.ingredients.behavior}</p>
                    </div>
                </div>
            </section>


            <footer className="bg-white px-4 py-8 border-t border-gray-200 text-center text-xs text-gray-400">
                &copy; {new Date().getFullYear()} Xa Lộ English. All rights reserved.
            </footer>

        </div>
    );
};

export default LearnerTypeDetailPage;
