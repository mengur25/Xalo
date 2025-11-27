-- =================================================================
-- 1. SETUP ENUMS VÀ SCHEMA CHÍNH
-- =================================================================

-- Create enum for quiz categories
CREATE TYPE public.quiz_category AS ENUM ('knowledge', 'skills', 'behavioral');

-- Create enum for learner level
CREATE TYPE public.learner_level AS ENUM ('low', 'high');

-- Create app_role enum for user management
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Table for learner types (8 types based on K-S-B combinations)
CREATE TABLE public.learner_types (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  knowledge_level learner_level NOT NULL,
  skills_level learner_level NOT NULL,
  behavioral_level learner_level NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Table for quiz questions
CREATE TABLE public.quiz_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category quiz_category NOT NULL,
  question_text TEXT NOT NULL,
  question_order INTEGER NOT NULL,
  options JSONB NOT NULL, -- Array of {text, score} objects
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Table for user quiz responses (Lưu câu trả lời thô)
CREATE TABLE public.quiz_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE, -- Cho phép NULL nếu là Guest user
  question_id UUID REFERENCES public.quiz_questions(id) ON DELETE CASCADE,
  selected_option_index INTEGER NOT NULL,
  score DECIMAL(3,1) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Table for quiz results (Lưu kết quả đã tính toán)
CREATE TABLE public.quiz_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE, -- Cho phép NULL nếu là Guest user
  learner_type_id UUID REFERENCES public.learner_types(id),
  knowledge_score DECIMAL(5,2) NOT NULL,
  skills_score DECIMAL(5,2) NOT NULL,
  behavioral_score DECIMAL(5,2) NOT NULL,
  knowledge_level learner_level NOT NULL,
  skills_level learner_level NOT NULL,
  behavioral_level learner_level NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Table for profiles (Mở rộng Auth)
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  email TEXT NOT NULL,
  full_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Table for user_roles (Quản lý phân quyền)
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id, role)
);


-- =================================================================
-- 2. ENABLE RLS VÀ CÀI ĐẶT CÁC CHÍNH SÁCH CƠ BẢN
-- =================================================================

-- Enable RLS for all application tables
ALTER TABLE public.learner_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Hàm kiểm tra vai trò (cho Admin Policies)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- RLS Policies for Profiles
CREATE POLICY "Users can view their own profile" ON public.profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for User Roles
CREATE POLICY "Users can view their own roles" ON public.user_roles FOR SELECT USING (auth.uid() = user_id);
-- *LƯU Ý: Không cần Policy INSERT/UPDATE vì việc này được quản lý bởi Trigger (xem mục 3).*

-- RLS Policies for Public Quiz Data (Everyone can view questions and types)
CREATE POLICY "Anyone can view learner types" ON public.learner_types FOR SELECT USING (true);
CREATE POLICY "Anyone can view quiz questions" ON public.quiz_questions FOR SELECT USING (true);

-- RLS Policies for Quiz Responses/Results (Allows Guest Users to INSERT)
CREATE POLICY "Anyone can insert quiz responses" ON public.quiz_responses FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can view quiz responses" ON public.quiz_responses FOR SELECT USING (true);
CREATE POLICY "Users can delete their own responses" ON public.quiz_responses FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Anyone can insert quiz results" ON public.quiz_results FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can view quiz results" ON public.quiz_results FOR SELECT USING (true);


-- RLS Policies cho Admin (Sử dụng hàm has_role)
CREATE POLICY "Admins can manage quiz questions" ON public.quiz_questions FOR ALL USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can manage learner types" ON public.learner_types FOR ALL USING (public.has_role(auth.uid(), 'admin'));


-- =================================================================
-- 3. TRIGGER VÀ FUNCTION (GÁN ROLE MẶC ĐỊNH)
-- =================================================================

-- Security definer function to assign a default role ('user')
CREATE OR REPLACE FUNCTION public.handle_new_user_role()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Insert a default 'user' role into user_roles table
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'user');
  RETURN NEW;
END;
$$;

-- Trigger to call the function after a new user is created in auth.users
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user_role();


-- =================================================================
-- 4. INSERT DỮ LIỆU KHỞI TẠO (SEED DATA)
-- =================================================================

-- Insert 8 learner types (Đã khớp với tài liệu gốc)
INSERT INTO public.learner_types (code, name, description, knowledge_level, skills_level, behavioral_level) VALUES
('HHH', 'Multi-vitamins', 'Người học toàn diện, có nền tảng kiến thức vững chắc, kỹ năng làm bài thi xuất sắc, và động lực, kỷ luật học tập rất cao.', 'high', 'high', 'high'),
('LHH', 'Vitamin C', 'Người học có chiến lược làm bài và động lực tốt, nhưng cần xây dựng lại kiến thức nền tảng.', 'low', 'high', 'high'),
('HLH', 'Caffeine Tablet', 'Người học có kiến thức và động lực cao, nhưng thiếu kỹ năng làm bài (chiến lược, quản lý thời gian).', 'high', 'low', 'high'),
('HHL', 'Cough Syrup', 'Người học có kiến thức và kỹ năng tốt, nhưng thiếu động lực/thói quen học tập tích cực (Hành vi học tập yếu).', 'high', 'high', 'low'),
('HLL', 'Omega 3', 'Người học có kiến thức nền tảng nhưng thiếu cả chiến lược làm bài và động lực/kỷ luật học tập.', 'high', 'low', 'low'),
('LHL', 'Sugar Pill', 'Người học có chiến lược làm bài tương đối, nhưng thiếu kiến thức nền và hành vi học tập tích cực.', 'low', 'high', 'low'),
('LLH', 'Bee Pollen', 'Người học có động lực, tinh thần tốt nhưng thiếu cả kiến thức nền và kỹ năng/chiến lược làm bài thi.', 'low', 'low', 'high'),
('LLL', 'Gummy Bear', 'Người học cần hỗ trợ toàn diện, thiếu kiến thức, kỹ năng và động lực/kỷ luật học tập.', 'low', 'low', 'low');

-- Insert 23 Quiz Questions (Dựa trên chi tiết từ tài liệu dự án)

-- KNOWLEDGE CATEGORY (7 QUESTIONS)
INSERT INTO public.quiz_questions (category, question_text, question_order, options) VALUES
('knowledge', 'Mức độ chính xác và tự tin của bạn khi sử dụng cấu trúc ngữ pháp?', 1, '[{"text": "Rất tự tin, hiếm khi mắc lỗi cấu trúc cơ bản.", "score": 1.5}, {"text": "Khá tự tin, thỉnh thoảng mắc lỗi nhỏ khi dùng cấu trúc phức tạp.", "score": 0.5}, {"text": "Hạn chế, thường xuyên mắc lỗi ngữ pháp cơ bản.", "score": -0.5}, {"text": "Rất yếu, hầu như không thể diễn đạt mà không mắc lỗi lớn.", "score": -1.5}]'::jsonb),
('knowledge', 'Bạn đánh giá thế nào về độ rộng và linh hoạt của vốn từ vựng?', 2, '[{"text": "Tuyệt vời, có thể sử dụng đa dạng từ vựng, collocation và idiom.", "score": 1.5}, {"text": "Khá tốt, vốn từ đủ dùng nhưng ít linh hoạt.", "score": 0.5}, {"text": "Hạn chế, thường phải dùng từ đơn giản, lặp từ.", "score": -0.5}, {"text": "Rất yếu, không đủ từ để diễn đạt ý cơ bản.", "score": -1.5}]'::jsonb),
('knowledge', 'Khả năng nghe và hiểu các giọng điệu (accent) và tốc độ nói tự nhiên?', 3, '[{"text": "Rất tốt, hiểu hầu hết các giọng và tốc độ nói tự nhiên.", "score": 1.5}, {"text": "Khá, hiểu tốt giọng chuẩn, đôi khi gặp khó khăn với giọng lạ/tốc độ nhanh.", "score": 0.5}, {"text": "Hạn chế, chỉ nghe hiểu được nội dung chậm, rõ ràng.", "score": -0.5}, {"text": "Rất yếu, gần như không hiểu nội dung hội thoại tự nhiên.", "score": -1.5}]'::jsonb),
('knowledge', 'Tốc độ đọc và khả năng nắm bắt ý chính, đoán nghĩa từ mới khi đọc?', 4, '[{"text": "Rất tốt, đọc nhanh và hiểu ý chính lẫn chi tiết sâu.", "score": 1.5}, {"text": "Khá, đọc khá nhanh, nắm được ý chính.", "score": 0.5}, {"text": "Hạn chế, đọc chậm và thường phải dịch từng từ.", "score": -0.5}, {"text": "Rất yếu, không thể đọc hết và hiểu văn bản dài.", "score": -1.5}]'::jsonb),
('knowledge', 'Độ chính xác và tự tin khi phát âm (kể cả từ khó và dài)?', 5, '[{"text": "Rất chính xác, phát âm rõ ràng, tự tin dùng từ khó.", "score": 1.5}, {"text": "Khá, phát âm chấp nhận được nhưng đôi khi ngắc ngữ với từ dài.", "score": 0.5}, {"text": "Hạn chế, phát âm sai nhiều, thiếu tự tin.", "score": -0.5}, {"text": "Rất yếu, phát âm sai hầu hết các từ.", "score": -1.5}]'::jsonb),
('knowledge', 'Khả năng áp dụng kiến thức (từ vựng, ngữ pháp) đã học vào bài thi IELTS thực tế?', 6, '[{"text": "Rất tốt, luôn sử dụng được kiến thức học vào bài viết/nói.", "score": 1.5}, {"text": "Khá, thỉnh thoảng áp dụng được, nhưng không nhất quán.", "score": 0.5}, {"text": "Hạn chế, thường quên hoặc không biết cách dùng kiến thức khi làm bài.", "score": -0.5}, {"text": "Rất yếu, kiến thức học và bài thi gần như tách biệt.", "score": -1.5}]'::jsonb),
('knowledge', 'Khả năng tổ chức ý tưởng và diễn đạt rõ ràng trong Writing Task 2?', 7, '[{"text": "Rất tốt, bài viết luôn có cấu trúc logic, dễ theo dõi.", "score": 1.5}, {"text": "Khá, ý tưởng mạch lạc nhưng đôi khi thiếu tính liên kết.", "score": 0.5}, {"text": "Hạn chế, ý tưởng lộn xộn, khó theo dõi luận điểm.", "score": -0.5}, {"text": "Rất yếu, không thể xây dựng đoạn văn có ý nghĩa.", "score": -1.5}]'::jsonb);

-- SKILLS CATEGORY (9 QUESTIONS)
INSERT INTO public.quiz_questions (category, question_text, question_order, options) VALUES
('skills', 'Bạn quản lý thời gian và áp lực thi như thế nào?', 8, '[{"text": "Rất tốt, luôn hoàn thành bài thi đúng giờ và giữ bình tĩnh.", "score": 1.5}, {"text": "Khá, thường hoàn thành nhưng đôi khi bị áp lực.", "score": 0.5}, {"text": "Hạn chế, thường hết giờ và cuống khi gần kết thúc.", "score": -0.5}, {"text": "Rất yếu, luôn thiếu thời gian và bị rối trí.", "score": -1.5}]'::jsonb),
('skills', 'Kỹ năng đọc đề, gạch từ khóa và ghi chú khi làm Listening?', 9, '[{"text": "Rất tốt, luôn gạch đúng từ khóa và ghi chú hiệu quả.", "score": 1.5}, {"text": "Khá, biết gạch từ khóa nhưng ghi chú chưa tối ưu.", "score": 0.5}, {"text": "Hạn chế, thường gạch sai từ khóa hoặc không kịp ghi chú.", "score": -0.5}, {"text": "Rất yếu, không có thói quen đọc đề và ghi chú.", "score": -1.5}]'::jsonb),
('skills', 'Bạn sử dụng chiến lược (Skimming, Scanning,...) như thế nào khi gặp bài Reading khó?', 10, '[{"text": "Rất tốt, luôn áp dụng chiến lược phù hợp và linh hoạt.", "score": 1.5}, {"text": "Khá, biết một số chiến lược nhưng chưa vận dụng tốt.", "score": 0.5}, {"text": "Hạn chế, thường làm theo cảm tính hoặc bỏ qua bài khó.", "score": -0.5}, {"text": "Rất yếu, không biết chiến lược làm bài thi Reading.", "score": -1.5}]'::jsonb),
('skills', 'Khả năng nhận biết và phân loại các dạng bài trong Reading/Writing?', 11, '[{"text": "Rất tốt, nhận diện chính xác và biết cách xử lý từng dạng.", "score": 1.5}, {"text": "Khá, nhận diện được hầu hết, nhưng đôi khi nhầm lẫn.", "score": 0.5}, {"text": "Hạn chế, thường không phân biệt được các dạng bài.", "score": -0.5}, {"text": "Rất yếu, không có khái niệm về dạng bài thi.", "score": -1.5}]'::jsonb),
('skills', 'Bạn có thói quen lập dàn ý (outline) chi tiết trước khi viết Writing Task 2?', 12, '[{"text": "Luôn luôn, tôi luôn dành thời gian lập dàn ý chi tiết.", "score": 1.5}, {"text": "Thỉnh thoảng, tôi lập dàn ý ngắn gọn khi có thời gian.", "score": 0.5}, {"text": "Hạn chế, tôi thường viết ngay mà không lập dàn ý.", "score": -0.5}, {"text": "Không bao giờ, tôi viết theo dòng suy nghĩ.", "score": -1.5}]'::jsonb),
('skills', 'Khả năng áp dụng các kỹ thuật như Paraphrasing, Linking words, và Cohesion trong Writing?', 13, '[{"text": "Rất tốt, sử dụng các kỹ thuật này một cách tự nhiên và hiệu quả.", "score": 1.5}, {"text": "Khá, biết sử dụng nhưng đôi khi bị gượng ép.", "score": 0.5}, {"text": "Hạn chế, biết lý thuyết nhưng không áp dụng được trong bài thi.", "score": -0.5}, {"text": "Rất yếu, không sử dụng các kỹ thuật này.", "score": -1.5}]'::jsonb),
('skills', 'Khả năng mở rộng ý và duy trì sự trôi chảy khi Speaking Part 2 và 3?', 14, '[{"text": "Rất tốt, tôi luôn có ý tưởng phong phú và nói trôi chảy.", "score": 1.5}, {"text": "Khá, tôi nói trôi chảy nhưng đôi khi ý tưởng bị giới hạn.", "score": 0.5}, {"text": "Hạn chế, tôi hay bị ngập ngừng và không mở rộng ý được.", "score": -0.5}, {"text": "Rất yếu, tôi thường xuyên im lặng hoặc trả lời quá ngắn.", "score": -1.5}]'::jsonb),
('skills', 'Khả năng xử lý các câu hỏi khó, bất ngờ (ví dụ: Part 3) mà không mất bình tĩnh?', 15, '[{"text": "Rất tốt, tôi luôn tìm được cách xoay xở và trả lời.", "score": 1.5}, {"text": "Khá, tôi có thể trả lời nhưng tốc độ phản xạ chậm.", "score": 0.5}, {"text": "Hạn chế, tôi thường bị 'đứng hình' hoặc trả lời lạc đề.", "score": -0.5}, {"text": "Rất yếu, tôi hoàn toàn bối rối khi gặp câu hỏi khó.", "score": -1.5}]'::jsonb),
('skills', 'Khả năng áp dụng kỹ thuật làm bài chung (vd: đọc câu hỏi trước khi nghe/đọc)?', 16, '[{"text": "Rất tốt, tôi có quy trình làm bài rõ ràng cho mỗi kỹ năng.", "score": 1.5}, {"text": "Khá, tôi áp dụng các kỹ thuật nhưng thiếu nhất quán.", "score": 0.5}, {"text": "Hạn chế, tôi làm bài theo thói quen cũ, ít dùng kỹ thuật.", "score": -0.5}, {"text": "Rất yếu, tôi không dùng bất kỳ kỹ thuật làm bài thi nào.", "score": -1.5}]'::jsonb);

-- BEHAVIORAL CATEGORY (7 QUESTIONS)
INSERT INTO public.quiz_questions (category, question_text, question_order, options) VALUES
('behavioral', 'Mức độ chủ động tương tác, đặt câu hỏi và tham gia thảo luận trong lớp/nhóm học?', 17, '[{"text": "Rất chủ động, luôn tìm cách tham gia và hỏi những gì không rõ.", "score": 1.5}, {"text": "Khá chủ động, tương tác khi được hỏi hoặc khi thật sự cần.", "score": 0.5}, {"text": "Hạn chế, thường giữ im lặng và không muốn thu hút sự chú ý.", "score": -0.5}, {"text": "Rất bị động, không bao giờ đặt câu hỏi hoặc tương tác.", "score": -1.5}]'::jsonb),
('behavioral', 'Động lực học tập và mục tiêu IELTS của bạn rõ ràng đến mức nào?', 18, '[{"text": "Mục tiêu rất rõ ràng (band điểm, thời gian, mục đích), là ưu tiên hàng đầu.", "score": 1.5}, {"text": "Mục tiêu khá rõ, tôi biết mình muốn gì nhưng chưa phải ưu tiên số 1.", "score": 0.5}, {"text": "Hạn chế, mục tiêu mơ hồ, học vì mọi người học.", "score": -0.5}, {"text": "Rất yếu, không có động lực và mục tiêu rõ ràng.", "score": -1.5}]'::jsonb),
('behavioral', 'Cách bạn phản ứng khi kết quả học tập không cải thiện hoặc gặp thử thách lớn?', 19, '[{"text": "Kiên trì, tìm nguyên nhân và điều chỉnh phương pháp ngay lập tức.", "score": 1.5}, {"text": "Thích nghi, tiếp tục học nhưng có chút nản lòng.", "score": 0.5}, {"text": "Bỏ cuộc, dễ nản và giảm cường độ học tập.", "score": -0.5}, {"text": "Rất yếu, dừng học hoặc thay đổi mục tiêu.", "score": -1.5}]'::jsonb),
('behavioral', 'Thói quen ghi chép, ôn tập và tự kiểm tra kiến thức đã học?', 20, '[{"text": "Rất kỷ luật, luôn ôn tập thường xuyên và có phương pháp ghi chép hiệu quả.", "score": 1.5}, {"text": "Khá, tôi có ghi chép nhưng ôn tập không đều đặn.", "score": 0.5}, {"text": "Hạn chế, ít ghi chép hoặc ghi chép rồi bỏ đó.", "score": -0.5}, {"text": "Rất yếu, không ghi chép và không bao giờ ôn tập.", "score": -1.5}]'::jsonb),
('behavioral', 'Tần suất bạn tiếp xúc với tiếng Anh (nghe, đọc) ngoài giờ học?', 21, '[{"text": "Hàng ngày, tôi thường xuyên nghe, đọc tiếng Anh tự nhiên.", "score": 1.5}, {"text": "Thường xuyên, khoảng 3-4 lần/tuần.", "score": 0.5}, {"text": "Hiếm khi, chỉ khi làm bài tập hoặc đến lớp.", "score": -0.5}, {"text": "Không bao giờ, tôi chỉ học những gì được giao.", "score": -1.5}]'::jsonb),
('behavioral', 'Khả năng kiểm soát cảm xúc tiêu cực (lo âu, căng thẳng) trong phòng thi?', 22, '[{"text": "Rất tốt, tôi giữ bình tĩnh và làm bài với tâm lý ổn định.", "score": 1.5}, {"text": "Khá, tôi có lo lắng nhưng không ảnh hưởng lớn đến kết quả.", "score": 0.5}, {"text": "Hạn chế, lo lắng khiến tôi mắc nhiều lỗi ngớ ngẩn.", "score": -0.5}, {"text": "Rất yếu, lo âu làm tôi gần như mất khả năng tập trung.", "score": -1.5}]'::jsonb),
('behavioral', 'Tính kỷ luật và sự cam kết của bạn với kế hoạch học tập IELTS đã đề ra?', 23, '[{"text": "Rất cao, tôi luôn tuân thủ nghiêm ngặt mọi kế hoạch.", "score": 1.5}, {"text": "Khá cao, tôi tuân thủ hầu hết, chỉ bỏ lỡ khi có việc bất khả kháng.", "score": 0.5}, {"text": "Thấp, tôi dễ dàng trì hoãn và phá vỡ kế hoạch.", "score": -0.5}, {"text": "Rất thấp, tôi không có kế hoạch học tập cụ thể.", "score": -1.5}]'::jsonb);

-- Tạo Index để tối ưu hiệu suất truy vấn
CREATE INDEX idx_quiz_questions_category ON public.quiz_questions(category);
CREATE INDEX idx_quiz_responses_user ON public.quiz_responses(user_id);
CREATE INDEX idx_quiz_results_user ON public.quiz_results(user_id);