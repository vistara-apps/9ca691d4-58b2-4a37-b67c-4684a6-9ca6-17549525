'use client'

interface ProgressBarProps {
  progress: number
  variant?: 'quiz'
}

export default function ProgressBar({ progress, variant = 'quiz' }: ProgressBarProps) {
  const clampedProgress = Math.min(100, Math.max(0, progress))
  
  return (
    <div className="relative">
      <div className="w-full bg-surface-light rounded-full h-3 overflow-hidden shadow-inner">
        <div 
          className="h-full bg-gradient-to-r from-accent to-accent-light rounded-full transition-all duration-500 ease-out relative overflow-hidden"
          style={{ width: `${clampedProgress}%` }}
        >
          {/* Animated shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
        </div>
      </div>
      
      {/* Progress percentage */}
      <div className="flex justify-between items-center mt-2 text-xs">
        <span className="text-muted">Progress</span>
        <span className="text-accent font-medium">{Math.round(clampedProgress)}%</span>
      </div>
    </div>
  )
}
