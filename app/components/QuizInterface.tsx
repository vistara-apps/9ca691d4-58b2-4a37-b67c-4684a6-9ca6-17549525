
'use client'

import { useState, useEffect } from 'react'
import { QuizCard } from './QuizCard'
import { ProgressBar } from './ProgressBar'
import type { Question, QuizState } from '../types'
import { CheckCircle, XCircle, Brain } from 'lucide-react'

interface QuizInterfaceProps {
  questions: Question[]
  onComplete: (score: number, answers: number[]) => void
}

export function QuizInterface({ questions, onComplete }: QuizInterfaceProps) {
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestionIndex: 0,
    score: 0,
    answers: [],
    isComplete: false,
    startTime: new Date()
  })
  
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  
  const currentQuestion = questions[quizState.currentQuestionIndex]
  const isLastQuestion = quizState.currentQuestionIndex === questions.length - 1
  
  const handleAnswerSelect = (answerIndex: number) => {
    if (showFeedback) return
    setSelectedAnswer(answerIndex)
  }
  
  const handleAnswerSubmit = () => {
    if (selectedAnswer === null) return
    
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer
    const newScore = quizState.score + (isCorrect ? 1 : 0)
    const newAnswers = [...quizState.answers, selectedAnswer]
    
    setQuizState(prev => ({
      ...prev,
      score: newScore,
      answers: newAnswers
    }))
    
    setShowFeedback(true)
    
    setTimeout(() => {
      if (isLastQuestion) {
        setQuizState(prev => ({ ...prev, isComplete: true }))
        onComplete(newScore, newAnswers)
      } else {
        setQuizState(prev => ({
          ...prev,
          currentQuestionIndex: prev.currentQuestionIndex + 1
        }))
        setSelectedAnswer(null)
        setShowFeedback(false)
      }
    }, 2000)
  }
  
  if (quizState.isComplete) {
    return (
      <QuizCard variant="result" className="text-center">
        <div className="mb-lg">
          <Brain className="w-16 h-16 text-accent mx-auto mb-md" />
          <h2 className="text-display text-text mb-sm">Quiz Complete!</h2>
          <p className="text-body text-muted">
            You scored {quizState.score} out of {questions.length}
          </p>
        </div>
        
        <div className="bg-bg rounded-lg p-lg mb-lg">
          <h3 className="text-heading text-text mb-md">Your Mini App IQ</h3>
          <div className="text-4xl font-bold text-accent mb-sm">
            {Math.round((quizState.score / questions.length) * 100)}
          </div>
          <p className="text-sm text-muted">
            {quizState.score === questions.length ? 'Perfect Score! 🎉' :
             quizState.score >= questions.length * 0.8 ? 'Excellent! 🌟' :
             quizState.score >= questions.length * 0.6 ? 'Good Job! 👍' :
             'Keep Learning! 📚'}
          </p>
        </div>
      </QuizCard>
    )
  }
  
  return (
    <div className="space-y-lg">
      <div className="mb-lg">
        <div className="flex justify-between items-center mb-sm">
          <span className="text-sm text-muted">
            Question {quizState.currentQuestionIndex + 1} of {questions.length}
          </span>
          <span className="text-sm text-muted">
            Score: {quizState.score}
          </span>
        </div>
        <ProgressBar 
          current={quizState.currentQuestionIndex + 1} 
          total={questions.length} 
        />
      </div>
      
      <QuizCard>
        <h2 className="text-heading text-text mb-lg">
          {currentQuestion.prompt}
        </h2>
        
        <div className="space-y-sm mb-lg">
          {currentQuestion.optionsJson.map((option, index) => {
            const isSelected = selectedAnswer === index
            const isCorrect = index === currentQuestion.correctAnswer
            const showCorrect = showFeedback && isCorrect
            const showIncorrect = showFeedback && isSelected && !isCorrect
            
            return (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={showFeedback}
                className={clsx(
                  'w-full p-lg text-left rounded-lg border transition-all duration-200',
                  'hover:border-accent/50 focus:outline-none focus:border-accent',
                  {
                    'border-white/20 bg-surface': !isSelected && !showFeedback,
                    'border-accent bg-accent/10': isSelected && !showFeedback,
                    'border-green-500 bg-green-500/20': showCorrect,
                    'border-red-500 bg-red-500/20': showIncorrect,
                    'cursor-not-allowed opacity-50': showFeedback && !isSelected && !isCorrect
                  }
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="text-body text-text">{option}</span>
                  {showCorrect && <CheckCircle className="w-5 h-5 text-green-500" />}
                  {showIncorrect && <XCircle className="w-5 h-5 text-red-500" />}
                </div>
              </button>
            )
          })}
        </div>
        
        {showFeedback && currentQuestion.explanation && (
          <div className="bg-bg rounded-lg p-md mb-lg animate-slide-up">
            <p className="text-sm text-muted">
              <strong>Explanation:</strong> {currentQuestion.explanation}
            </p>
          </div>
        )}
        
        {!showFeedback && (
          <button
            onClick={handleAnswerSubmit}
            disabled={selectedAnswer === null}
            className={clsx(
              'w-full btn-primary',
              {
                'opacity-50 cursor-not-allowed': selectedAnswer === null
              }
            )}
          >
            {isLastQuestion ? 'Finish Quiz' : 'Next Question'}
          </button>
        )}
      </QuizCard>
    </div>
  )
}
