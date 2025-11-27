export type QuizCategory = 'knowledge' | 'skills' | 'behavioral';
export type LearnerLevel = 'low' | 'high';

export interface QuizOption {
  text: string;
  score: number;
}

export interface QuizQuestion {
  id: string;
  category: QuizCategory;
  question_text: string;
  question_order: number;
  options: QuizOption[]; // JSONB
}

export interface QuizResult {
  knowledgeScore: number;
  skillsScore: number;
  behaviorScore: number;
  learningType: LearningType;
}

export type LearningType =
  | 'Multi-vitamins'
  | 'Gummy Bear'
  | 'Caffeine Tablet'
  | 'Vitamin C'
  | 'Cough Syrup'
  | 'Omega 3'
  | 'Sugar Pill'
  | 'Bee Pollen';

export interface LearningTypeDetail {
  name: string;
  description: string;
  prescription: string;
  image?: string;
}
