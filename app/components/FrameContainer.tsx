
'use client'

import { ReactNode } from 'react'
import clsx from 'clsx'

interface FrameContainerProps {
  children: ReactNode
  variant?: 'default'
  className?: string
}

export function FrameContainer({ 
  children, 
  variant = 'default', 
  className 
}: FrameContainerProps) {
  return (
    <div className={clsx(
      'max-w-md w-full mx-auto px-4 min-h-screen bg-bg',
      {
        'py-xl': variant === 'default'
      },
      className
    )}>
      <div className="animate-fade-in">
        {children}
      </div>
    </div>
  )
}
