'use client'

interface Question {
  id: string
  prompt: string
  options: string[]
  correctAnswer: number
  explanation: string
}

interface QuizCardProps {
  question: Question
  selectedAnswer: number | null
  showExplanation: boolean
  onAnswerSelect: (index: number) => void
  onNext: () => void
  disabled?: boolean
}

export default function QuizCard({
  question,
  selectedAnswer,
  showExplanation,
  onAnswerSelect,
  onNext,
  disabled = false
}: QuizCardProps) {
  return (
    <div className="quiz-card space-y-4 animate-slide-up">
      <h3 className="text-xl font-semibold text-text leading-normal">
        {question.prompt}
      </h3>
      
      <div className="grid grid-cols-1 gap-3">
        {question.options.map((option, index) => {
          let buttonClass = 'w-full p-4 text-left rounded-lg border transition-all duration-200 '
          
          if (disabled) {
            buttonClass += 'opacity-50 cursor-not-allowed bg-surface border-white/10 text-muted'
          } else if (selectedAnswer === null) {
            buttonClass += 'bg-surface border-white/20 text-text hover:border-accent/50 hover:bg-surface/80'
          } else {
            if (index === question.correctAnswer) {
              buttonClass += 'bg-green-500/20 border-green-500 text-green-400'
            } else if (index === selectedAnswer) {
              buttonClass += 'bg-red-500/20 border-red-500 text-red-400'
            } else {
              buttonClass += 'bg-surface border-white/10 text-muted'
            }
          }
          
          return (
            <button
              key={index}
              onClick={() => onAnswerSelect(index)}
              disabled={disabled || selectedAnswer !== null}
              className={buttonClass}
            >
              <span className="font-medium">{String.fromCharCode(65 + index)}.</span> {option}
            </button>
          )
        })}
      </div>
      
      {showExplanation && (
        <div className="bg-accent/10 border border-accent/30 rounded-lg p-4 animate-fade-in">
          <p className="text-accent font-medium mb-2">
            {selectedAnswer === question.correctAnswer ? '✅ Correct!' : '❌ Incorrect'}
          </p>
          <p className="text-text text-sm">{question.explanation}</p>
          <button
            onClick={onNext}
            className="btn-primary mt-4 w-full"
          >
            Next Question
          </button>
        </div>
      )}
    </div>
  )
}
