
export interface User {
  userId: string
  username: string
  farcasterId?: string
  quizScore: number
  achievements: string[]
}

export interface MiniApp {
  miniAppId: string
  name: string
  logoUrl: string
  description: string
  platform: string
  tags: string[]
  trendScore: number
}

export interface Quiz {
  quizId: string
  title: string
  description: string
  difficulty: 'easy' | 'medium' | 'hard'
}

export interface Question {
  questionId: string
  quizId: string
  prompt: string
  optionsJson: string[]
  correctAnswer: number
  explanation?: string
}

export interface QuizAttempt {
  attemptId: string
  userId: string
  quizId: string
  score: number
  timestamp: Date
}

export interface QuizState {
  currentQuestionIndex: number
  score: number
  answers: number[]
  isComplete: boolean
  startTime: Date
}
