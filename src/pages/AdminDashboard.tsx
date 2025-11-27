// src/pages/AdminDashboard.tsx (Phiên bản đã đơn giản hóa)
"use client";

import React, { useEffect, useState } from 'react'; // Bỏ các state check auth/role
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client'; // Vẫn cần để đăng xuất
import { showSuccess, showError } from "@/utils/toast";
// Import các component quản lý
import LeadsTable from '@/admin/LeadsTable';
import QuestionsManager from '@/admin/QuestionsManager';
import LearnerTypeManager from '@/admin/LearnerTypeManager';
import { Loader2 } from 'lucide-react';

const AdminDashboard = () => {
    const navigate = useNavigate();
    
    // Đã xóa BƯỚC 1: KIỂM TRA PHÂN QUYỀN (ROLE CHECK)
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);

    // BƯỚC 1: KIỂM TRA PHÂN QUYỀN (ROLE CHECK)
    useEffect(() => {
        const checkAdminStatus = async () => {
            setLoading(true);
            try {
                const { data: { user } } = await supabase.auth.getUser();

                if (!user) {
                    showError("Bạn cần đăng nhập để truy cập trang Admin.");
                    navigate("/admin/login");
                    return;
                }
                
                // GỌI HÀM POSTGRESQL FUNCTION ĐỂ KIỂM TRA ROLE
                const { data: isAdminData, error: roleError } = await supabase.rpc('has_role', {
                    _user_id: user.id,
                    _role: 'admin' // Tên role trong DB
                });

                if (roleError) throw roleError;

                if (isAdminData === true) {
                    setIsAdmin(true);
                } else {
                    showError("Bạn không có quyền truy cập trang Admin.");
                    navigate("/");
                }
            } catch (error) {
                console.error("Admin check failed:", error);
                navigate("/");
            } finally {
                setLoading(false);
            }
        };

        checkAdminStatus();
    }, [navigate]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <Loader2 className="animate-spin mr-2" /> Đang kiểm tra quyền...
            </div>
        );
    }

    if (!isAdmin) {
        return null; // Không hiển thị gì nếu không phải admin
    }
    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate("/");
    };

    // Giao diện Admin hiển thị ngay lập tức
    return (
        <div className="min-h-screen p-8 bg-gray-100 font-sans">
            <h1 className="text-4xl font-black mb-8">Admin Dashboard (DEV MODE)</h1>
            
            <Tabs defaultValue="leads" className="w-full">
                <TabsList>
                    <TabsTrigger value="leads">Danh sách Leads/Emails</TabsTrigger>
                    <TabsTrigger value="questions">Quản lý Câu hỏi</TabsTrigger>
                    <TabsTrigger value="learners">Quản lý Loại Học viên</TabsTrigger>
                </TabsList>
                
                <TabsContent value="leads">
                    <Card>
                        <CardHeader><CardTitle>Danh sách Leads/Profiles</CardTitle></CardHeader>
                        <CardContent><LeadsTable /></CardContent>
                    </Card>
                </TabsContent>
                
                <TabsContent value="questions">
                    <Card>
                        <CardHeader><CardTitle>Chỉnh sửa Quiz Questions</CardTitle></CardHeader>
                        <CardContent><QuestionsManager /></CardContent>
                    </Card>
                </TabsContent>
                
                <TabsContent value="learners">
                    <Card>
                        <CardHeader><CardTitle>Chỉnh sửa Learner Types</CardTitle></CardHeader>
                        <CardContent><LearnerTypeManager /></CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            <Button onClick={handleLogout} className="mt-6">Đăng xuất Admin</Button>
        </div>
    );
};

export default AdminDashboard;