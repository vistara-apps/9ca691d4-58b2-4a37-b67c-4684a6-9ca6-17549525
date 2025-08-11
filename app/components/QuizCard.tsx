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
  const getOptionClass = (index: number) => {
    let baseClass = 'w-full p-5 text-left rounded-xl border transition-all duration-300 transform font-medium min-h-[60px] flex items-center '
    
    if (disabled) {
      return baseClass + 'opacity-50 cursor-not-allowed bg-surface border-border text-muted'
    }
    
    if (selectedAnswer === null) {
      return baseClass + 'bg-surface border-border text-text hover:border-accent/50 hover:bg-surface-light hover:scale-[1.02] active:scale-[0.98] cursor-pointer'
    }
    
    // After answer is selected
    if (index === question.correctAnswer) {
      return baseClass + 'bg-success/20 border-success text-success shadow-lg scale-[1.02]'
    } else if (index === selectedAnswer) {
      return baseClass + 'bg-error/20 border-error text-error shadow-lg scale-[1.02]'
    } else {
      return baseClass + 'bg-surface border-border text-muted opacity-60'
    }
  }

  const getOptionIcon = (index: number) => {
    if (selectedAnswer === null) return String.fromCharCode(65 + index)
    if (index === question.correctAnswer) return '✓'
    if (index === selectedAnswer) return '✗'
    return String.fromCharCode(65 + index)
  }

  return (
    <div className="quiz-card space-y-6 animate-slide-up">
      <div className="space-y-3">
        <div className="flex items-center space-x-2 text-sm text-muted">
          <span className="bg-accent/20 text-accent px-2 py-1 rounded-full font-medium">Question</span>
        </div>
        <h3 className="text-xl font-semibold text-text leading-relaxed">
          {question.prompt}
        </h3>
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => onAnswerSelect(index)}
            disabled={disabled || selectedAnswer !== null}
            className={getOptionClass(index)}
            aria-label={`Option ${String.fromCharCode(65 + index)}: ${option}`}
          >
            <div className="flex items-center space-x-4 w-full">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-current/20 flex items-center justify-center font-bold text-sm">
                {getOptionIcon(index)}
              </div>
              <span className="flex-1 text-left">{option}</span>
            </div>
          </button>
        ))}
      </div>
      
      {showExplanation && (
        <div className={`rounded-xl p-6 animate-fade-in border-2 ${
          selectedAnswer === question.correctAnswer 
            ? 'bg-success/10 border-success/30' 
            : 'bg-error/10 border-error/30'
        }`}>
          <div className="flex items-center space-x-3 mb-4">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl ${
              selectedAnswer === question.correctAnswer 
                ? 'bg-success/20 text-success' 
                : 'bg-error/20 text-error'
            }`}>
              {selectedAnswer === question.correctAnswer ? '🎉' : '💡'}
            </div>
            <div>
              <p className={`font-bold text-lg ${
                selectedAnswer === question.correctAnswer ? 'text-success' : 'text-error'
              }`}>
                {selectedAnswer === question.correctAnswer ? 'Excellent!' : 'Not quite right'}
              </p>
              <p className="text-text-secondary text-sm">
                {selectedAnswer === question.correctAnswer ? 'You got it!' : 'Here\'s why:'}
              </p>
            </div>
          </div>
          <p className="text-text leading-relaxed mb-6">{question.explanation}</p>
          <button
            onClick={onNext}
            className="btn-primary w-full"
          >
            Continue →
          </button>
        </div>
      )}
    </div>
  )
}
