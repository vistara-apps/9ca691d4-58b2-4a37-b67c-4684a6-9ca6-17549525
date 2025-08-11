'use client'

interface ProgressBarProps {
  progress: number
  variant?: 'quiz'
}

export default function ProgressBar({ progress, variant = 'quiz' }: ProgressBarProps) {
  return (
    <div className="progress-bar">
      <div 
        className="progress-fill"
        style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
      />
    </div>
  )
}
