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
  healer?: LearningType;
  fullPower?: LearningType;
  detailedStats?: DetailedStats;
}

export interface DetailedStats {
  absorption: number; // Mức độ hấp thụ kiến thức
  hiddenPotential: number; // Mức độ chứa tiềm năng ẩn
  adaptation: number; // Mức độ thích ứng chiến thuật
  confusion: number; // Mức độ bối rối tiềm ẩn
  recovery: number; // Mức độ tự phục hồi
  stress: number; // Mức độ căng thẳng tiềm ẩn
  supportNeeded: number; // Mức độ cần được hỗ trợ
  knowledgeOwnership: number; // Mức độ sở hữu kiến thức
  enthusiasm: number; // Mức độ nhiệt huyết học tập
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
