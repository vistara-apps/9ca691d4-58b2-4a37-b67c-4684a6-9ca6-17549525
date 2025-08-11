'use client'

import { useState, useEffect } from 'react'
import { usePrimaryButton } from '@coinbase/onchainkit/minikit'
import QuizCard from './QuizCard'
import ProgressBar from './ProgressBar'

interface Question {
  id: string
  prompt: string
  options: string[]
  correctAnswer: number
  explanation: string
}

const sampleQuestions: Question[] = [
  {
    id: '1',
    prompt: 'Which mini app is known for decentralized social networking on Base?',
    options: ['Farcaster', 'Twitter', 'Discord', 'Telegram'],
    correctAnswer: 0,
    explanation: 'Farcaster is a decentralized social protocol built on Base that enables censorship-resistant social networking.'
  },
  {
    id: '2',
    prompt: 'What is the primary purpose of Uniswap mini app?',
    options: ['Gaming', 'Token Swapping', 'NFT Trading', 'Social Media'],
    correctAnswer: 1,
    explanation: 'Uniswap is a decentralized exchange protocol that allows users to swap tokens directly from their wallets.'
  },
  {
    id: '3',
    prompt: 'Which Base mini app focuses on prediction markets?',
    options: ['Polymarket', 'OpenSea', 'Compound', 'Aave'],
    correctAnswer: 0,
    explanation: 'Polymarket is a decentralized prediction market platform where users can bet on real-world events.'
  }
]

export default function QuizContainer() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [gameState, setGameState] = useState<'playing' | 'paused'>('playing')

  const progress = ((currentQuestion + 1) / sampleQuestions.length) * 100

  usePrimaryButton(
    { text: gameState === 'playing' ? 'PAUSE QUIZ' : 'RESUME QUIZ' },
    () => {
      setGameState(gameState === 'playing' ? 'paused' : 'playing')
    }
  )

  const handleAnswerSelect = (answerIndex: number) => {
    if (gameState === 'paused' || selectedAnswer !== null) return
    
    setSelectedAnswer(answerIndex)
    setShowExplanation(true)
    
    if (answerIndex === sampleQuestions[currentQuestion].correctAnswer) {
      setScore(score + 1)
    }
  }

  const handleNextQuestion = () => {
    if (currentQuestion < sampleQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowExplanation(false)
    } else {
      setQuizCompleted(true)
    }
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setScore(0)
    setSelectedAnswer(null)
    setShowExplanation(false)
    setQuizCompleted(false)
    setGameState('playing')
  }

  const calculateIQ = () => {
    const percentage = (score / sampleQuestions.length) * 100
    if (percentage >= 90) return 'Genius'
    if (percentage >= 70) return 'Expert'
    if (percentage >= 50) return 'Intermediate'
    return 'Beginner'
  }

  if (quizCompleted) {
    const percentage = Math.round((score / sampleQuestions.length) * 100)
    const iqLevel = calculateIQ()
    
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="card text-center space-y-6">
          {/* Celebration Header */}
          <div className="space-y-3">
            <div className="w-20 h-20 bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center mx-auto shadow-xl">
              <span className="text-3xl">🎉</span>
            </div>
            <h2 className="text-3xl font-bold text-text">Quiz Complete!</h2>
            <p className="text-muted">Great job testing your Base knowledge</p>
          </div>

          {/* Score Display */}
          <div className="bg-surface-light rounded-xl p-6 space-y-4">
            <div className="text-6xl font-bold text-accent">{score}/{sampleQuestions.length}</div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-text">
                Your Mini App IQ: <span className="text-accent">{iqLevel}</span>
              </div>
              <div className="w-full bg-surface rounded-full h-3 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-accent to-accent-light rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <p className="text-muted">You scored {percentage}% on this quiz!</p>
            </div>
          </div>

          {/* Achievement Badge */}
          <div className="bg-gradient-to-r from-accent/10 to-primary/10 border border-accent/30 rounded-xl p-4">
            <div className="flex items-center justify-center space-x-3">
              <span className="text-2xl">
                {percentage >= 90 ? '🏆' : percentage >= 70 ? '🥇' : percentage >= 50 ? '🥈' : '🥉'}
              </span>
              <div className="text-left">
                <p className="font-bold text-accent">
                  {percentage >= 90 ? 'Genius Level!' : 
                   percentage >= 70 ? 'Expert Level!' : 
                   percentage >= 50 ? 'Intermediate Level!' : 'Keep Learning!'}
                </p>
                <p className="text-sm text-muted">
                  {percentage >= 90 ? 'Outstanding Base knowledge!' : 
                   percentage >= 70 ? 'Excellent understanding!' : 
                   percentage >= 50 ? 'Good foundation!' : 'Room for improvement!'}
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={resetQuiz}
              className="btn-primary w-full"
            >
              🔄 Take Quiz Again
            </button>
            <button
              onClick={() => {/* Share functionality could be added here */}}
              className="btn-secondary w-full"
            >
              📤 Share Results
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Progress */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-muted">
          <span>Question {currentQuestion + 1} of {sampleQuestions.length}</span>
          <span>Score: {score}</span>
        </div>
        <ProgressBar progress={progress} />
      </div>

      {/* Quiz State Indicator */}
      {gameState === 'paused' && (
        <div className="bg-surface border border-accent/30 rounded-lg p-4 text-center">
          <p className="text-accent font-medium">Quiz Paused</p>
          <p className="text-muted text-sm">Use the button below to resume</p>
        </div>
      )}

      {/* Question */}
      <QuizCard
        question={sampleQuestions[currentQuestion]}
        selectedAnswer={selectedAnswer}
        showExplanation={showExplanation}
        onAnswerSelect={handleAnswerSelect}
        onNext={handleNextQuestion}
        disabled={gameState === 'paused'}
      />
    </div>
  )
}
