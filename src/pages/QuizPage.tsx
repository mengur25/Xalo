"use client";

import React, { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import { MadeWithDyad } from "@/components/made-with-dyad";
import { showSuccess, showError } from "@/utils/toast";

interface Option {
  id: string;
  text: string;
  score: number;
}

interface Question {
  id: string;
  text: string;
  category: string;
  order: number;
  options: Option[];
}

const QuizPage = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({}); // {questionId: optionId}
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const fetchQuestions = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data: questionsData, error: questionsError } = await supabase
        .from("questions")
        .select("id, text, category, order")
        .order("order", { ascending: true });

      if (questionsError) throw questionsError;

      const questionsWithOptions: Question[] = await Promise.all(
        questionsData.map(async (q) => {
          const { data: optionsData, error: optionsError } = await supabase
            .from("options")
            .select("id, text, score")
            .eq("question_id", q.id);

          if (optionsError) throw optionsError;

          // Shuffle options randomly
          const shuffledOptions = optionsData.sort(() => Math.random() - 0.5);

          return {
            ...q,
            options: shuffledOptions,
          };
        })
      );
      setQuestions(questionsWithOptions);
    } catch (err: any) {
      console.error("Error fetching quiz data:", err.message);
      showError("Không thể tải quiz. Vui lòng thử lại.");
      setError("Không thể tải quiz. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  const handleOptionSelect = (questionId: string, optionId: string) => {
    setUserAnswers((prev) => ({ ...prev, [questionId]: optionId }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      // Quiz finished, navigate to results page (to be implemented)
      showSuccess("Bạn đã hoàn thành quiz!");
      console.log("Quiz Completed!", userAnswers);
      navigate("/results"); // Chuyển hướng đến trang kết quả
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 p-4">
        <p className="text-lg text-gray-700">Đang tải quiz...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 p-4">
        <p className="text-lg text-red-500">{error}</p>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 p-4">
        <p className="text-lg text-gray-700">Chưa có câu hỏi nào được tạo.</p>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 p-4">
      <Card className="w-full max-w-2xl mx-auto shadow-lg rounded-xl">
        <CardHeader>
          <Progress value={progress} className="w-full mb-4 h-2" />
          <CardTitle className="text-2xl font-bold text-purple-800">
            Câu hỏi {currentQuestionIndex + 1} / {questions.length}
          </CardTitle>
          <p className="text-md text-gray-600 mt-2">
            Thể loại: {currentQuestion.category}
          </p>
        </CardHeader>
        <CardContent>
          <p className="text-lg md:text-xl mb-6 text-gray-800">
            {currentQuestion.text}
          </p>
          <RadioGroup
            onValueChange={(value) =>
              handleOptionSelect(currentQuestion.id, value)
            }
            value={userAnswers[currentQuestion.id] || ""}
            className="space-y-4"
          >
            {currentQuestion.options.map((option) => (
              <div key={option.id} className="flex items-center space-x-3 p-3 border rounded-md bg-gray-50 hover:bg-gray-100 transition-colors">
                <RadioGroupItem value={option.id} id={option.id} />
                <Label htmlFor={option.id} className="text-base text-gray-700 cursor-pointer flex-1">
                  {option.text}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
        <CardFooter className="flex justify-between mt-6">
          <Button
            onClick={handlePreviousQuestion}
            disabled={currentQuestionIndex === 0}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-full transition-colors"
          >
            Quay lại
          </Button>
          <Button
            onClick={handleNextQuestion}
            disabled={!userAnswers[currentQuestion.id]} // Disable if no option is selected
            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-2 px-4 rounded-full shadow-md transition-transform duration-200 hover:scale-105"
          >
            {currentQuestionIndex === questions.length - 1
              ? "Hoàn thành Quiz"
              : "Tiếp theo"}
          </Button>
        </CardFooter>
      </Card>
      <MadeWithDyad />
    </div>
  );
};

export default QuizPage;