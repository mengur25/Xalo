// src/admin/QuestionsManager.tsx
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'; // Import useMutation, useQueryClient
import { supabase } from '@/integrations/supabase/client';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Loader2, Edit, Save, X, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { showError, showSuccess } from '@/utils/toast';

// Giả định Interface Question đã được cập nhật đầy đủ (bao gồm options: any[])
interface Question {
    id: string;
    question_text: string;
    category: string;
    question_order: number;
    options: any[]; 
}

// Kiểu dữ liệu cho việc cập nhật
interface QuestionUpdate {
    question_text: string;
    question_order: number;
    options: any[];
}

const fetchQuestions = async (): Promise<Question[]> => {
    const { data, error } = await supabase
        .from('quiz_questions')
        .select('id, question_text, category, question_order, options')
        .order('question_order', { ascending: true });

    if (error) throw new Error(error.message);
    return data;
};

// Hàm gửi Mutation cập nhật lên Supabase
const updateQuestion = async ({ id, updates }: { id: string, updates: QuestionUpdate }) => {
    const { data, error } = await supabase
        .from('quiz_questions')
        .update(updates)
        .eq('id', id);

    if (error) throw error;
    return data;
};

const QuestionsManager = () => {
    const queryClient = useQueryClient();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
    const [formData, setFormData] = useState<QuestionUpdate | null>(null);

    // Fetch dữ liệu
    const { data: questions, isLoading, isError } = useQuery({
        queryKey: ['adminQuestions'],
        queryFn: fetchQuestions,
    });

    // Mutation cho việc cập nhật
    const mutation = useMutation({
        mutationFn: updateQuestion,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['adminQuestions'] }); // Làm mới cache sau khi thành công
            showSuccess("Cập nhật câu hỏi thành công!");
            setIsDialogOpen(false);
        },
        onError: (err: any) => {
            showError("Lỗi cập nhật: " + err.message);
        },
    });

    // Mở Dialog chỉnh sửa
    const handleEdit = (question: Question) => {
        setCurrentQuestion(question);
        setFormData({
            question_text: question.question_text,
            question_order: question.question_order,
            options: question.options,
        });
        setIsDialogOpen(true);
    };

    // Xử lý lưu dữ liệu
    const handleSave = () => {
        if (!currentQuestion || !formData) return;
        
        // Cần thêm logic kiểm tra và chuẩn hóa dữ liệu options ở đây (rất quan trọng!)
        
        // Gửi mutation
        mutation.mutate({ id: currentQuestion.id, updates: formData });
    };

    if (isLoading) {
        return <div className="flex justify-center p-8"><Loader2 className="animate-spin" /></div>;
    }

    if (isError) {
        return <div className="text-red-500 p-8">Lỗi tải dữ liệu câu hỏi.</div>;
    }

    return (
        <>
            <div>
                <div className="p-4 text-sm text-gray-500">Tổng cộng {questions?.length} câu hỏi.</div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Thứ tự</TableHead>
                            <TableHead>Phân loại</TableHead>
                            <TableHead className="w-[50%]">Nội dung Câu hỏi</TableHead>
                            <TableHead>Options</TableHead>
                            <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {questions?.map((q) => (
                            <TableRow key={q.id}>
                                <TableCell>{q.question_order}</TableCell>
                                <TableCell className="uppercase">{q.category}</TableCell>
                                <TableCell>{q.question_text}</TableCell>
                                <TableCell>{q.options.length} mục</TableCell>
                                <TableCell>
                                    <Button size="sm" variant="outline" onClick={() => handleEdit(q)}>
                                        <Edit className="h-4 w-4 mr-2" /> Edit
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            
            {/* Dialog Chỉnh sửa Câu hỏi */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-xl">
                    <DialogHeader>
                        <DialogTitle>Chỉnh sửa Câu hỏi #{currentQuestion?.question_order}</DialogTitle>
                        <DialogDescription>
                            Chỉnh sửa nội dung và điểm số options cho câu hỏi này.
                        </DialogDescription>
                    </DialogHeader>
                    {formData && (
                        <div className="space-y-4 py-4">
                            {/* Chỉnh sửa Nội dung Câu hỏi */}
                            <div>
                                <Label htmlFor="question_text" className="mb-2 block">Nội dung Câu hỏi</Label>
                                <Textarea
                                    id="question_text"
                                    value={formData.question_text}
                                    onChange={(e) => setFormData({ ...formData, question_text: e.target.value })}
                                    rows={3}
                                />
                            </div>
                            
                            {/* Chỉnh sửa Thứ tự */}
                            <div>
                                <Label htmlFor="question_order" className="mb-2 block">Thứ tự</Label>
                                <Input
                                    id="question_order"
                                    type="number"
                                    value={formData.question_order}
                                    onChange={(e) => setFormData({ ...formData, question_order: parseInt(e.target.value) || 0 })}
                                />
                            </div>

                            {/* Chỉnh sửa Options (Cần form phức tạp hơn) */}
                            <div className="space-y-3 border p-3 rounded-md">
                                <h4 className="font-semibold">Options (Score / Text)</h4>
                                {formData.options.map((opt, index) => (
                                    <div key={index} className="flex space-x-2 items-center">
                                        <Input
                                            type="number"
                                            className="w-16 text-center"
                                            value={opt.score}
                                            step="0.5"
                                            onChange={(e) => {
                                                const newOptions = [...formData.options];
                                                newOptions[index].score = parseFloat(e.target.value);
                                                setFormData({ ...formData, options: newOptions });
                                            }}
                                        />
                                        <Input
                                            value={opt.text}
                                            onChange={(e) => {
                                                const newOptions = [...formData.options];
                                                newOptions[index].text = e.target.value;
                                                setFormData({ ...formData, options: newOptions });
                                            }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    <DialogFooter>
                        <Button onClick={() => setIsDialogOpen(false)} variant="ghost" disabled={mutation.isPending}>
                            <X className="h-4 w-4 mr-2" /> Hủy
                        </Button>
                        <Button onClick={handleSave} disabled={mutation.isPending}>
                            {mutation.isPending ? <Loader2 className="animate-spin h-4 w-4 mr-2" /> : <Save className="h-4 w-4 mr-2" />}
                            Lưu Thay Đổi
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default QuestionsManager;