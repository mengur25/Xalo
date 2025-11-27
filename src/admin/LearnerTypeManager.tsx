// src/admin/LearnerTypeManager.tsx
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Loader2, Zap, Brain, Smile } from 'lucide-react';
type LearnerLevel = 'low' | 'high';
interface LearnerType {
    id: string;
    code: string; // HHH, LLL, etc.
    name: string; // Multi-vitamins, Gummy Bear, etc.
    description: string;
    
    // THÊM 3 CỘT PHÂN LOẠI MỨC ĐỘ
    knowledge_level: LearnerLevel; // <--- Cần thêm
    skills_level: LearnerLevel;    // <--- Cần thêm
    behavioral_level: LearnerLevel; // <--- Cần thêm

    // THÊM 3 CỘT DỮ LIỆU MỚI (Từ migration scripts)
    ingredients: any; // JSONB
    side_effects: string;
    prescription: string; // Cần thêm

    // Các cột khác
    created_at: string;
}

const fetchLearnerTypes = async (): Promise<LearnerType[]> => {
    const { data, error } = await supabase
        // Lấy tất cả các cột, bao gồm 3 cột mới (ingredients, side_effects, prescription)
        .from('learner_types')
        .select('*') 
        .order('code', { ascending: true }); // Sắp xếp theo Code (HHH, HHL,...)

    if (error) throw new Error(error.message);
    return data;
};

const LearnerTypeManager = () => {
    const { data: types, isLoading, isError } = useQuery({
        queryKey: ['adminLearnerTypes'],
        queryFn: fetchLearnerTypes,
    });

    if (isLoading) {
        return <div className="flex justify-center p-8"><Loader2 className="animate-spin" /></div>;
    }

    if (isError) {
        return <div className="text-red-500 p-8">Lỗi tải dữ liệu Loại Học viên.</div>;
    }

    // Hàm hiển thị trạng thái K-S-B (High/Low)
    const renderStatus = (level: string) => {
        const isHigh = level === 'high';
        const color = isHigh ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
        return (
            <span className={`p-1 rounded-full text-xs font-medium ${color}`}>
                {isHigh ? 'High' : 'Low'}
            </span>
        );
    };

    return (
        <div>
            <div className="p-4 text-sm text-gray-500">Quản lý {types?.length} loại học viên.</div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Code</TableHead>
                        <TableHead>Tên Loại</TableHead>
                        <TableHead><Brain size={16} className="inline mr-1" />Kiến thức</TableHead>
                        <TableHead><Zap size={16} className="inline mr-1" />Kỹ năng</TableHead>
                        <TableHead><Smile size={16} className="inline mr-1" />Thái độ</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {types?.map((type) => (
                        <TableRow key={type.id}>
                            <TableCell className="font-bold">{type.code}</TableCell>
                            <TableCell>{type.name}</TableCell>
                            <TableCell>{renderStatus(type.knowledge_level)}</TableCell>
                            <TableCell>{renderStatus(type.skills_level)}</TableCell>
                            <TableCell>{renderStatus(type.behavioral_level)}</TableCell>
                            
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default LearnerTypeManager;