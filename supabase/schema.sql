-- Create questions table
CREATE TABLE IF NOT EXISTS public.quiz_questions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    text TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('KNOWLEDGE', 'SKILLS', 'BEHAVIOR')),
    "order" INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create options table
CREATE TABLE IF NOT EXISTS public.options (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    question_id UUID REFERENCES public.quiz_questions(id) ON DELETE CASCADE NOT NULL,
    text TEXT NOT NULL,
    score NUMERIC NOT NULL, -- +1.5, +0.5, -0.5, -1.5
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create results table (optional, for storing user attempts)
CREATE TABLE IF NOT EXISTS public.quiz_results (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID, -- Can be null if anonymous
    knowledge_score NUMERIC NOT NULL,
    skills_score NUMERIC NOT NULL,
    behavior_score NUMERIC NOT NULL,
    learning_type TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.quiz_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.options ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_results ENABLE ROW LEVEL SECURITY;

-- Create policies (allow public read for questions/options, public insert for results)
CREATE POLICY "Allow public read access for questions" ON public.quiz_questions FOR SELECT USING (true);
CREATE POLICY "Allow public read access for options" ON public.options FOR SELECT USING (true);
CREATE POLICY "Allow public insert access for quiz_results" ON public.quiz_results FOR INSERT WITH CHECK (true);
