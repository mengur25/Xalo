// src/admin/LeadsTable.tsx
import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Loader2 } from 'lucide-react';

interface Profile {
    id: string;
    email: string;
    full_name: string;
    phoneNumber: string;
    user_id: string | null;
    created_at: string;
}

const fetchLeads = async (): Promise<Profile[]> => {
    // Chỉ Admin mới có quyền SELECT toàn bộ bảng profiles (theo RLS Policy đã thiết lập)
    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) throw new Error(error.message);
    return data;
};

const LeadsTable = () => {
    const { data: leads, isLoading, isError } = useQuery({
        queryKey: ['adminLeads'],
        queryFn: fetchLeads,
    });

    // Thêm log kiểm tra
    useEffect(() => {
        if (leads) {
            console.log("Leads data fetched:", leads.length, "rows");
        }
        if (isError) {
            console.error("Leads fetching error:", isError);
        }
    }, [leads, isError]);



    if (isLoading) {
        return <div className="flex justify-center p-8"><Loader2 className="animate-spin" /></div>;
    }

    if (isError) {
        return <div className="text-red-500 p-8">Lỗi tải dữ liệu Leads. Vui lòng kiểm tra RLS Policy Admin.</div>;
    }

    return (
        <div>
            <div className="p-4 text-sm text-gray-500">Tìm thấy {leads?.length} Leads/Profiles.</div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Email</TableHead>
                        <TableHead>SDT</TableHead>
                        <TableHead>Họ và Tên</TableHead>
                        <TableHead>Tình trạng</TableHead>
                        <TableHead>Ngày tạo</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {leads?.map((lead) => (
                        <TableRow key={lead.id}>
                            <TableCell className="font-medium">{lead.email}</TableCell>
                            <TableCell className="font-medium">{lead.phoneNumber}</TableCell>
                            <TableCell>{lead.full_name || '—'}</TableCell>
                            <TableCell>
                                {lead.user_id ? (
                                    <span className="bg-green-100 text-green-800 p-1 rounded-full text-xs">Đã ĐK</span>
                                ) : (
                                    <span className="bg-yellow-100 text-yellow-800 p-1 rounded-full text-xs">Lead</span>
                                )}
                            </TableCell>
                            <TableCell>{new Date(lead.created_at).toLocaleDateString()}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                
            </Table>
        </div>
    );
};

export default LeadsTable;