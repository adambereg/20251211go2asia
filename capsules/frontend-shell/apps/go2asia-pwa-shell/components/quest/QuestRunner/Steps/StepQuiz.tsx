'use client';

/**
 * Quest Asia - Step Quiz
 * Компонент для прохождения квиза
 */

import { useState } from 'react';
import { HelpCircle, CheckCircle2, AlertCircle } from 'lucide-react';
import type { QuestStep, StepResult } from '@/components/quest/types';
import { validateQuizAnswers } from '@/components/quest/utils/validation';

interface StepQuizProps {
  step: QuestStep;
  onComplete: (result: StepResult) => void;
}

export function StepQuiz({ step, onComplete }: StepQuizProps) {
  const [answers, setAnswers] = useState<number[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!step.questions || step.questions.length === 0) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-red-600" />
          <p className="text-sm text-red-800">Вопросы не настроены для этого шага</p>
        </div>
      </div>
    );
  }

  const handleAnswerChange = (questionIndex: number, answerIndex: number) => {
    if (submitted) return;

    const newAnswers = [...answers];
    newAnswers[questionIndex] = answerIndex;
    setAnswers(newAnswers);
    setError(null);
  };

  const handleSubmit = () => {
    // Проверяем, что все вопросы отвечены
    if (answers.length !== step.questions!.length) {
      setError('Ответьте на все вопросы');
      return;
    }

    const correctAnswers = step.questions!.map((q) => q.correctAnswer);
    const validation = validateQuizAnswers(answers, correctAnswers);

    if (!validation.valid) {
      setError(validation.reason || 'Недостаточно правильных ответов');
      setSubmitted(true);
      return;
    }

    // Вычисляем очки с учётом процента правильных ответов
    const basePoints = step.rewards.points;
    const points = Math.round(basePoints * validation.score);

    const result: StepResult = {
      stepId: step.id,
      completed: true,
      completedAt: new Date(),
      method: 'quiz',
      data: {
        answers: answers.map((a, i) => step.questions![i].options[a]),
      },
      points,
      synced: false,
    };

    onComplete(result);
  };

  return (
    <div className="space-y-6">
      {/* Инструкция */}
      <div className="bg-slate-50 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <HelpCircle className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-sm font-semibold text-slate-900">Ответьте на вопросы</p>
            <p className="text-xs text-slate-600 mt-1">
              Минимум 70% правильных ответов для прохождения
            </p>
          </div>
        </div>
      </div>

      {/* Вопросы */}
      <div className="space-y-6">
        {step.questions!.map((question, questionIndex) => {
          const selectedAnswer = answers[questionIndex];
          const isCorrect = submitted && selectedAnswer === question.correctAnswer;
          const isIncorrect = submitted && selectedAnswer !== undefined && selectedAnswer !== question.correctAnswer;

          return (
            <div key={question.id} className="bg-white border-2 border-slate-200 rounded-lg p-5">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">
                {questionIndex + 1}. {question.question}
              </h3>

              <div className="space-y-2">
                {question.options.map((option, optionIndex) => {
                  const isSelected = selectedAnswer === optionIndex;
                  let bgColor = 'bg-slate-50 hover:bg-slate-100';
                  let borderColor = 'border-slate-300';
                  let textColor = 'text-slate-900';

                  if (submitted) {
                    if (optionIndex === question.correctAnswer) {
                      bgColor = 'bg-green-50';
                      borderColor = 'border-green-500';
                      textColor = 'text-green-900';
                    } else if (isSelected && optionIndex !== question.correctAnswer) {
                      bgColor = 'bg-red-50';
                      borderColor = 'border-red-500';
                      textColor = 'text-red-900';
                    }
                  } else if (isSelected) {
                    bgColor = 'bg-purple-50';
                    borderColor = 'border-purple-500';
                    textColor = 'text-purple-900';
                  }

                  return (
                    <button
                      key={optionIndex}
                      onClick={() => handleAnswerChange(questionIndex, optionIndex)}
                      disabled={submitted}
                      className={`w-full text-left p-4 rounded-lg border-2 transition-all ${bgColor} ${borderColor} ${textColor} ${
                        !submitted ? 'cursor-pointer' : 'cursor-default'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          isSelected
                            ? submitted
                              ? optionIndex === question.correctAnswer
                                ? 'bg-green-500 border-green-500'
                                : 'bg-red-500 border-red-500'
                              : 'bg-purple-500 border-purple-500'
                            : 'border-slate-400'
                        }`}>
                          {isSelected && (
                            <div className={`w-2 h-2 rounded-full ${
                              submitted && optionIndex !== question.correctAnswer
                                ? 'bg-white'
                                : 'bg-white'
                            }`} />
                          )}
                        </div>
                        <span className="flex-1">{option}</span>
                        {submitted && optionIndex === question.correctAnswer && (
                          <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Подсказка (после ответа) */}
              {submitted && question.hint && (
                <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <span className="font-semibold">Подсказка:</span> {question.hint}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Ошибка */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <p className="text-sm text-red-800">{error}</p>
          </div>
        </div>
      )}

      {/* Кнопка отправки */}
      {!submitted && (
        <button
          onClick={handleSubmit}
          disabled={answers.length !== step.questions!.length}
          className={`w-full py-3 px-6 rounded-lg font-semibold transition-all ${
            answers.length === step.questions!.length
              ? 'bg-purple-600 hover:bg-purple-700 text-white'
              : 'bg-slate-300 text-slate-500 cursor-not-allowed'
          }`}
        >
          Отправить ответы
        </button>
      )}
    </div>
  );
}

