'use client'

import Tag from './Tag'

interface MiniApp {
  id: string
  name: string
  description: string
  platform: string
  tags: string[]
  trendScore: number
  logoUrl?: string
}

interface MiniAppCardProps {
  app: MiniApp
  rank?: number
  variant?: 'compact' | 'detailed'
}

export default function MiniAppCard({ 
  app, 
  rank, 
  variant = 'compact' 
}: MiniAppCardProps) {
  return (
    <div className="miniapp-card">
      <div className="flex items-start space-x-4">
        {/* Logo/Rank */}
        <div className="flex-shrink-0">
          {rank && (
            <div className="text-accent font-bold text-lg mb-1">#{rank}</div>
          )}
          <div className="w-12 h-12 bg-surface rounded-lg flex items-center justify-center text-2xl">
            {app.logoUrl || '📱'}
          </div>
        </div>
        
        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-text truncate">
              {app.name}
            </h3>
            <div className="flex items-center space-x-2">
              <Tag variant="platform" text={app.platform} />
              <span className="text-accent font-medium text-sm">
                {app.trendScore}
              </span>
            </div>
          </div>
          
          {variant === 'detailed' && (
            <p className="text-muted text-sm mb-3 leading-relaxed">
              {app.description}
            </p>
          )}
          
          <div className="flex flex-wrap gap-1">
            {app.tags.map(tag => (
              <Tag key={tag} variant="category" text={tag} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
