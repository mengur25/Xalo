"use client";

import React, { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { MadeWithDyad } from "@/components/made-with-dyad";
import { showSuccess, showError } from "@/utils/toast";
import { calculateScore } from "@/utils/quizLogic";
import { QuizQuestion, QuizCategory, QuizOption } from "@/types";

interface OptionWithId extends QuizOption {
  id: string;
}

const DEFAULT_LEARNER_TYPE_NAME = "Multi-vitamins";

const QuizPage = () => {
  // Đã sửa QuizQuestion[] thành Question[] để đồng bộ với định nghĩa Interface
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({}); // {questionId: optionIndex (number)}
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [showResultReady, setShowResultReady] = useState(false);
  const [calculatedResult, setCalculatedResult] = useState<any>(null);
  const navigate = useNavigate();

  // const skipToResults = async () => {
  //   setSubmitting(true);

  //   // 1. Tạo một kết quả MOCK (Đảm bảo cấu trúc khớp với đầu ra của calculateScore)
  //   const mockResult = {
  //     // Điểm số ngẫu nhiên hoặc cố định để test
  //     knowledgeScore: Math.random(), // 0.0 đến 1.0
  //     skillsScore: Math.random(),
  //     behaviorScore: Math.random(),
  //     learningType: DEFAULT_LEARNER_TYPE_NAME, // Tên loại người học Mặc định
  //     // Thêm các trường dữ liệu cần thiết khác mà trang /results sử dụng
  //     recommendations: "Đây là kết quả giả lập để kiểm thử trang /results. Dữ liệu này KHÔNG được lưu vào Database.",
  //     knowledgeLevel: Math.random() > 0.5 ? 'high' : 'low',
  //     skillsLevel: Math.random() > 0.5 ? 'high' : 'low',
  //     behavioralLevel: Math.random() > 0.5 ? 'high' : 'low',
  //   };

  //   try {
  //     showSuccess("Đã bỏ qua Quiz. Xem kết quả giả lập!");
  //   } catch (err) {
  //     console.error("Unexpected error skipping quiz:", err);
  //     showError("Có lỗi xảy ra trong quá trình tạo dữ liệu giả.");
  //   } finally {
  //     setSubmitting(false);
  //     // Chuyển trang kết quả
  //     setCalculatedResult(mockResult);
  //     setShowResultReady(true);
  //   }
  // };

  const fetchQuestions = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // TRUY VẤN TỪ BẢNG quiz_questions VÀ LẤY CỘT JSONB OPTIONS
      const { data: questionsData, error: questionsError } = await supabase
        .from("quiz_questions")
        .select("id, question_text, category, question_order, options")
        .order("question_order", { ascending: true });

      if (questionsError) throw questionsError;

      const questionsWithOptions: QuizQuestion[] = questionsData.map((q: any) => {

        // XỬ LÝ OPTIONS (JSONB) VÀ SHUFFLE

        // Thêm ID tạm thời cho mỗi option để dùng cho RadioGroup (value)
        const optionsWithId: OptionWithId[] = q.options.map((opt: any, index: number) => ({
          ...opt,
          // ID phải là string, ta dùng index của option trong mảng làm giá trị
          id: index.toString(),
        }));

        // Shuffle options randomly (Đảm bảo giá trị index không bị thay đổi sau shuffle)
        // Lưu ý: Cần shuffle mảng optionsWithId, không phải map lại q.options
        const shuffledOptions = optionsWithId.sort(() => Math.random() - 0.5);

        return {
          ...q,
          question_text: q.question_text,
          question_order: q.question_order,
          options: shuffledOptions,
        };
      });

      setQuestions(questionsWithOptions);
    } catch (err: any) {
      console.error("Error fetching quiz data:", err.message);
      showError("Không thể tải quiz. Vui lòng thử lại.");
      setError("Lỗi: " + err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  const handleOptionSelect = (questionId: string, optionIndex: number) => {
    setUserAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleNextQuestion = () => {
    // Kiểm tra đã trả lời câu hỏi hiện tại chưa
    if (userAnswers[questions[currentQuestionIndex].id] === undefined) {
      showError("Vui lòng chọn câu trả lời trước khi tiếp tục.");
      return;
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      submitQuiz();
    }
  };

  const submitQuiz = async () => {
    setSubmitting(true);
    let finalResult = null;

    try {
      // 1. Tính toán điểm số và loại người học (Local Logic)
      finalResult = calculateScore(questions, userAnswers);

      // Lấy thông tin user (Guest hay Logged in)
      const { data: { user } } = await supabase.auth.getUser();
      const userId = user?.id || null;

      // 2. Fetch Learner Type ID (Cần thiết cho Foreign Key)
      const { data: learnerTypeData, error: learnerTypeError } = await supabase
        .from('learner_types')
        .select('id')
        .eq('name', finalResult.learningType) // Dùng tên loại (ví dụ: 'Multi-vitamins')
        .single();

      if (learnerTypeError) {
        console.error("Error fetching learner type:", learnerTypeError);
        // Nếu không tìm thấy loại người học, ta vẫn lưu kết quả nhưng bỏ qua learner_type_id
        // (Giả định cột learner_type_id trong quiz_results là nullable, nếu không, sẽ lỗi)
      }

      const learnerTypeId = learnerTypeData?.id || null;

      // 3. Insert Result vào DB
      const { error: insertError } = await supabase.from('quiz_results').insert({
        knowledge_score: finalResult.knowledgeScore,
        skills_score: finalResult.skillsScore,
        behavioral_score: finalResult.behaviorScore,
        knowledge_level: finalResult.knowledgeScore > 0.5 ? 'high' : 'low',
        skills_level: finalResult.skillsScore > 0.5 ? 'high' : 'low',
        behavioral_level: finalResult.behaviorScore > 0.5 ? 'high' : 'low',
        learner_type_id: learnerTypeId,
        user_id: userId, // Gắn ID user nếu có
      });

      if (insertError) {
        console.error("Error saving result:", insertError);
        showError("Có lỗi khi lưu kết quả, nhưng bạn vẫn có thể xem.");
      } else {
        showSuccess("Bạn đã hoàn thành quiz!");
      }

    } catch (err) {
      console.error("Unexpected error submitting quiz:", err);
      showError("Có lỗi xảy ra trong quá trình tính toán.");
    } finally {
      setSubmitting(false);
      // Chuyển trang kết quả dù có lỗi lưu DB hay không
      setCalculatedResult(finalResult || calculateScore(questions, userAnswers));
      setShowResultReady(true);
    }
  };

  // --- RENDERING ---
  // State for Introduction Page
  const [showIntro, setShowIntro] = useState(true);


  // --- RENDERING ---
  const currentQuestion = questions[currentQuestionIndex];

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleStartQuiz = () => {
    setShowIntro(false);
  };

  // INTRO PAGE (Thay thế trang loading)
  if (showIntro) {
    return (
      <div className="min-h-screen flex flex-col bg-[#808CFD] font-sans text-gray-800 ">

        <div className="flex-grow flex flex-col items-center justify-center p-4 py-12 text-center max-w-6xl mx-auto w-full">
          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-16 leading-none text-black">
            WELCOME TO OUR QUIZ
          </h1>
          <p className="mb-6 text-sm font-bold text-white max-w-lg mx-auto">Hãy thật lòng trả lời câu hỏi dựa trên trải nghiệm thực sự của bạn khi học IELTS. Đừng để định kiến cá nhân ảnh hưởng - chỉ cần chọn điều phản ánh đúng bạn nhất.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 w-full px-4 mt-12">

            {/* Step 1 - Blue */}
            <div className="bg-white p-8 rounded-lg shadow-lg border-t-8 border-blue-400 text-left flex flex-col h-full relative">
              <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
                {/* Icon Placeholder */}
                <div className="text-blue-400 w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm">

                  <span className="text-4xl">📝</span>
                </div>
              </div>

              <div className="mt-8">
                <span className="inline-block bg-blue-100 text-blue-600 text-xs font-bold px-3 py-1 rounded-full mb-4">
                  STEP 1
                </span>
                <h3 className="font-bold text-xl mb-4 text-gray-900">Hoàn thành bài Test</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Trả lời thật lòng dựa trên trải nghiệm thực sự của bạn khi học IELTS. Đừng nghĩ quá nhiều về tính logic và tính đúng sai của đáp án.
                </p>
              </div>
            </div>

            {/* Step 2 - Green */}
            <div className="bg-white p-8 rounded-lg shadow-lg border-t-8 border-green-400 text-left flex flex-col h-full relative">
              <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
                <div className="text-green-400 w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm">
                  <span className="text-4xl">📊</span>
                </div>
              </div>
              <div className="mt-8">
                <span className="inline-block bg-green-100 text-green-600 text-xs font-bold px-3 py-1 rounded-full mb-4">
                  STEP 2
                </span>
                <h3 className="font-bold text-xl mb-4 text-gray-900">Xem kết quả chi tiết</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Đọc phân tích chân dung học tập của bạn bao gồm mô tả chung, mô tả chi tiết theo từng khía cạnh phân loại, các khó khăn đang kiềm hãm tiềm năng học tập, người bạn đồng hành và phương pháp học được gợi ý bởi Xa Lộ English.
                </p>
              </div>
            </div>

            {/* Step 3 - Purple */}
            <div className="bg-white p-8 rounded-lg shadow-lg border-t-8 border-purple-400 text-left flex flex-col h-full relative">
              <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
                <div className="text-purple-400 w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm">
                  <span className="text-4xl">🚀</span>
                </div>
              </div>
              <div className="mt-8">
                <span className="inline-block bg-purple-100 text-purple-600 text-xs font-bold px-3 py-1 rounded-full mb-4">
                  STEP 3
                </span>
                <h3 className="font-bold text-xl mb-4 text-gray-900">Tìm hiểu giải pháp</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Tìm hiểu về phương pháp học tập phù hợp và nghiên cứu nguồn tài nguyên học tập mà Xa Lộ English gợi ý riêng dành cho bạn.
                </p>
              </div>
            </div>

          </div>

          <Button
            onClick={handleStartQuiz}
            disabled={loading} // Disable if still fetching questions
            className="bg-black hover:bg-gray-500 !w-[400px] text-white font-bold py-6 px-16 rounded shadow-xl text-xl uppercase transition-transform transform hover:scale-105"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                LOADING...
              </>
            ) : (
              "BẮT ĐẦU"
            )}
          </Button>
          <p className="mt-6 text-sm font-bold text-white max-w-lg mx-auto">
            *Bài test sẽ mất khoảng 5 phút. Hãy đảm bảo bạn có không gian yên tĩnh và tâm lý thoải mái nhất.
          </p>
        </div>

        <div className="bg-white py-4 w-full border-t border-gray-100">
          <MadeWithDyad />
        </div>
      </div>
    );
  }


  if (showResultReady) {
    return (
      <div className="min-h-screen flex flex-col bg-[#8B9DFF] font-sans text-black">
        <div className="flex-grow flex flex-col items-center justify-center p-4 text-center">
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6 leading-none">
            KẾT QUẢ CỦA BẠN ĐÃ SẴN SÀNG
          </h1>

          <p className="text-base md:text-xl mb-12 max-w-2xl font-medium leading-relaxed">
            Hệ thống đã phân tích xong phản ứng học tập của bạn.
            <br className="hidden md:block" />
            Hãy xem công thức học tập được cá nhân hóa dành riêng cho bạn.
          </p>

          <Button
            onClick={() => navigate("/results", { state: { result: calculatedResult } })}
            className="bg-black hover:bg-gray-800 text-white font-bold py-6 px-12 rounded-[5px] shadow-lg text-lg uppercase"
          >
            XEM KẾT QUẢ
          </Button>
        </div>

        <div className="bg-white py-4 w-full">
          <MadeWithDyad />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white p-4">
        <p className="text-lg text-red-500">{error}</p>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white p-4">
        <p className="text-lg text-gray-700">Chưa có câu hỏi nào được tạo. Vui lòng kiểm tra dữ liệu Supabase.</p>
      </div>
    );
  }

  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-50 p-4 font-sans">
      <div className="w-full max-w-3xl mx-auto">
        {/* Progress Header */}
        <div className="mb-8 text-center">
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700">
            <div className="bg-[#f8f2fc] h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
          </div>
          <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">
            {currentQuestion.category} SECTION
          </p>
          <h2 className="text-3xl font-black mt-2">
            Question {currentQuestionIndex + 1} <span className="text-gray-400">/ {questions.length}</span>
          </h2>
        </div>

        <Card className="w-full shadow-xl rounded-2xl border-0 overflow-hidden">
          <CardContent className="p-8 md:p-12">
            <p className="text-xl md:text-2xl font-medium mb-8 text-gray-900 leading-relaxed">
              {currentQuestion.question_text}
            </p>
            <RadioGroup
              onValueChange={(value) =>
                handleOptionSelect(currentQuestion.id, parseInt(value))
              }
              // Value là index dưới dạng string
              value={userAnswers[currentQuestion.id] !== undefined ? userAnswers[currentQuestion.id].toString() : ""}
              className="space-y-4"
            >
              {currentQuestion.options.map((option, index) => (
                <div key={index}
                  className={`flex items-center space-x-4 p-4 rounded-xl border-2 transition-all cursor-pointer
                        ${userAnswers[currentQuestion.id] === index
                      ? 'border-black bg-gray-50'
                      : 'border-gray-100 hover:border-gray-300 bg-white'
                    }`}
                  onClick={() => handleOptionSelect(currentQuestion.id, index)}
                >
                  {/* RadioGroupItem value phải là string, ta dùng index.toString() */}
                  <RadioGroupItem value={index.toString()} id={`${currentQuestion.id}-${index}`} className="sr-only" />
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0
                      ${userAnswers[currentQuestion.id] === index ? 'border-black bg-black' : 'border-gray-300'}
                  `}>
                    {userAnswers[currentQuestion.id] === index && <div className="w-2 h-2 bg-white rounded-full" />}
                  </div>
                  <Label htmlFor={`${currentQuestion.id}-${index}`} className="text-lg text-gray-700 cursor-pointer flex-1 font-medium">
                    {option.text}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
          <CardFooter className="bg-gray-50 p-6 flex justify-between border-t border-gray-100">
            {/* <Button
              onClick={skipToResults} // Gọi hàm đã được đơn giản hóa
              disabled={submitting}
              variant="outline"
              className="text-white border-red-500 bg-red-500 hover:bg-red-600 font-bold"
            >
              Skip (Test)
            </Button>
            <Button
              onClick={handlePreviousQuestion}
              disabled={currentQuestionIndex === 0}
              variant="outline"
              className="text-gray-700 border-gray-300 hover:bg-gray-100 font-bold"
            >
              Previous
            </Button>
            <Button
              onClick={handleNextQuestion}
              // Sửa điều kiện: Kiểm tra strict equality (=== undefined)
              disabled={userAnswers[currentQuestion.id] === undefined || submitting}
              className="bg-black hover:bg-gray-800 text-white font-bold py-6 px-8 rounded-[5px] shadow-lg"
            >
              {currentQuestionIndex === questions.length - 1
                ? (submitting ? "Submitting..." : "Finish Quiz")
                : "Next Question"}
            </Button>
          </CardFooter>
        </Card>
      </div>
      <div className="mt-8 bg-white w-full">
        <MadeWithDyad />
      </div>
    </div>
  );
};

export default QuizPage;