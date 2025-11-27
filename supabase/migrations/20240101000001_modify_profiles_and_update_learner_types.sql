-- 1. Modify profiles table
-- Allow user_id to be null for anonymous leads
ALTER TABLE public.profiles ALTER COLUMN user_id DROP NOT NULL;

-- Enable RLS for profiles (update existing policies if needed)
-- Allow public insert for profiles (so anonymous users can submit)
CREATE POLICY "Anyone can insert profiles" ON public.profiles FOR INSERT WITH CHECK (true);
-- Allow admins to view all profiles
CREATE POLICY "Admins can view all profiles" ON public.profiles FOR SELECT USING (public.has_role(auth.uid(), 'admin'));


-- 2. Update learner_types table
-- Add columns for dynamic content
ALTER TABLE public.learner_types 
ADD COLUMN IF NOT EXISTS ingredients JSONB,
ADD COLUMN IF NOT EXISTS side_effects TEXT,
ADD COLUMN IF NOT EXISTS prescription TEXT;

-- 3. Update quiz_results table
-- Add profile_id to link results to profiles
ALTER TABLE public.quiz_results
ADD COLUMN IF NOT EXISTS profile_id UUID REFERENCES public.profiles(id);

-- 4. Seed data for new learner_types columns (Update existing rows)
DO $$
BEGIN
    -- Multi-vitamins (HHH)
    UPDATE public.learner_types SET
        ingredients = '{"knowledge": "Nền tảng kiến thức vững chắc, từ vựng phong phú và ngữ pháp chuẩn xác.", "skills": "Kỹ năng làm bài thi điêu luyện, chiến thuật hợp lý và quản lý thời gian tốt.", "behavior": "Thái độ học tập kỷ luật, chủ động và kiên trì với mục tiêu."}',
        side_effects = 'Có thể gặp áp lực duy trì phong độ cao hoặc chủ quan do quá tự tin. Đôi khi việc cầu toàn quá mức có thể gây căng thẳng không cần thiết.',
        prescription = 'Duy trì thói quen hiện tại, nhưng hãy nhớ cân bằng cuộc sống. Thử thách bản thân với các bài thi khó hơn để không bị "ngủ quên trên chiến thắng".'
    WHERE code = 'HHH';

    -- Gummy Bear (LLL)
    UPDATE public.learner_types SET
        ingredients = '{"knowledge": "Kiến thức còn nhiều lỗ hổng, cần bồi đắp từ những điều cơ bản nhất.", "skills": "Chưa nắm vững các dạng bài và chiến thuật làm bài thi hiệu quả.", "behavior": "Học tập còn tùy hứng, thiếu kế hoạch và sự kiên trì."}',
        side_effects = 'Dễ nản lòng khi gặp bài khó. Kết quả thi có thể không ổn định và phụ thuộc nhiều vào may mắn.',
        prescription = 'Cần một lộ trình học tập nghiêm túc và kỷ luật hơn. Bắt đầu từ việc xây dựng lại gốc rễ kiến thức và đặt ra những mục tiêu nhỏ, khả thi.'
    WHERE code = 'LLL';

    -- Caffeine Tablet (HLH)
    UPDATE public.learner_types SET
        ingredients = '{"knowledge": "Vốn kiến thức phong phú, tự tin về ngôn ngữ.", "skills": "Kỹ năng xử lý đề thi còn lúng túng, chưa tối ưu hóa được điểm số.", "behavior": "Quyết tâm cao, sẵn sàng đầu tư thời gian và công sức."}',
        side_effects = 'Dễ bị ức chế vì điểm số không phản ánh đúng thực lực. Có thể gặp vấn đề về tâm lý phòng thi do áp lực phải làm tốt.',
        prescription = 'Tập trung luyện đề và rèn giũa kỹ năng làm bài. Học cách quản lý thời gian và các mẹo làm bài để chuyển hóa kiến thức thành điểm số.'
    WHERE code = 'HLH';

    -- Vitamin C (LHH)
    UPDATE public.learner_types SET
        ingredients = '{"knowledge": "Kiến thức nền tảng còn mỏng, từ vựng và ngữ pháp cần cải thiện.", "skills": "Nắm bắt nhanh nhạy các chiến thuật và mẹo làm bài.", "behavior": "Chăm chỉ, cầu tiến và có ý thức học tập tốt."}',
        side_effects = 'Có thể đạt điểm cao ở các phần thi mẹo nhưng mất điểm ở phần đòi hỏi kiến thức sâu. Dễ bị "đuối" khi gặp đề bài lạ.',
        prescription = 'Ưu tiên bồi dưỡng kiến thức nền tảng. Đừng chỉ dựa vào mẹo, hãy học sâu hiểu kỹ để xây dựng gốc rễ vững chắc.'
    WHERE code = 'LHH';

    -- Cough Syrup (HHL)
    UPDATE public.learner_types SET
        ingredients = '{"knowledge": "Kiến thức tốt.", "skills": "Kỹ năng tốt.", "behavior": "Thái độ học tập chưa tốt."}',
        side_effects = 'Dễ bỏ cuộc giữa chừng.',
        prescription = 'Cần cải thiện thái độ học tập.'
    WHERE code = 'HHL';

    -- Omega 3 (HLL)
    UPDATE public.learner_types SET
        ingredients = '{"knowledge": "Kiến thức tốt.", "skills": "Kỹ năng yếu.", "behavior": "Thái độ yếu."}',
        side_effects = 'Khó đạt điểm cao dù có kiến thức.',
        prescription = 'Cần rèn luyện kỹ năng và thái độ.'
    WHERE code = 'HLL';

    -- Sugar Pill (LHL)
    UPDATE public.learner_types SET
        ingredients = '{"knowledge": "Kiến thức yếu.", "skills": "Kỹ năng tốt.", "behavior": "Thái độ yếu."}',
        side_effects = 'Điểm số không ổn định.',
        prescription = 'Cần bổ sung kiến thức và thái độ.'
    WHERE code = 'LHL';

    -- Bee Pollen (LLH)
    UPDATE public.learner_types SET
        ingredients = '{"knowledge": "Kiến thức yếu.", "skills": "Kỹ năng yếu.", "behavior": "Thái độ tốt."}',
        side_effects = 'Cần nỗ lực rất nhiều mới thấy kết quả.',
        prescription = 'Cần học lại từ đầu một cách bài bản.'
    WHERE code = 'LLH';

END $$;
