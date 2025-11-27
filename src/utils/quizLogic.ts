import { QuizQuestion, QuizResult, LearningType } from '../types';

export const calculateScore = (
    questions: QuizQuestion[],
    userAnswers: Record<string, number> // { questionId: optionIndex } - Changed to index to match schema requirement if needed, or keep as score?
    // User schema says: selected_option_index INTEGER.
    // But my UI uses option ID (which was UUID).
    // The new schema options are JSONB array. They don't have IDs, just index in array.
    // So I should store selected_option_index.
): QuizResult => {
    let knowledgeScore = 0;
    let skillsScore = 0;
    let behaviorScore = 0;

    let knowledgeCount = 0;
    let skillsCount = 0;
    let behaviorCount = 0;

    questions.forEach((question) => {
        const selectedOptionIndex = userAnswers[question.id];
        if (selectedOptionIndex !== undefined && selectedOptionIndex >= 0) {
            const selectedOption = question.options[selectedOptionIndex];
            if (selectedOption) {
                switch (question.category) {
                    case 'knowledge':
                        knowledgeScore += Number(selectedOption.score);
                        knowledgeCount++;
                        break;
                    case 'skills':
                        skillsScore += Number(selectedOption.score);
                        skillsCount++;
                        break;
                    case 'behavioral':
                        behaviorScore += Number(selectedOption.score);
                        behaviorCount++;
                        break;
                }
            }
        }
    });

    const normalize = (totalScore: number, count: number) => {
        if (count === 0) return 0;
        return totalScore / count;
    };

    const kAvg = normalize(knowledgeScore, knowledgeCount);
    const sAvg = normalize(skillsScore, skillsCount);
    const bAvg = normalize(behaviorScore, behaviorCount);

    const isHigh = (score: number) => score > 0.5;

    const kHigh = isHigh(kAvg);
    const sHigh = isHigh(sAvg);
    const bHigh = isHigh(bAvg);

    const learningType = determineLearningType(kHigh, sHigh, bHigh);

    return {
        knowledgeScore: kAvg,
        skillsScore: sAvg,
        behaviorScore: bAvg,
        learningType,
    };
};

export const determineLearningType = (
    kHigh: boolean,
    sHigh: boolean,
    bHigh: boolean
): LearningType => {
    const code = `${kHigh ? 'H' : 'L'}${sHigh ? 'H' : 'L'}${bHigh ? 'H' : 'L'}`;

    switch (code) {
        case 'HHH': return 'Multi-vitamins';
        case 'LHH': return 'Vitamin C';
        case 'HLH': return 'Caffeine Tablet';
        case 'HHL': return 'Cough Syrup';
        case 'HLL': return 'Omega 3';
        case 'LHL': return 'Sugar Pill';
        case 'LLH': return 'Bee Pollen';
        case 'LLL': return 'Gummy Bear';
        default: return 'Gummy Bear';
    }
};
