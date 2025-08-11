
'use client'

import { MiniAppCard } from './MiniAppCard'
import type { MiniApp } from '../types'
import { TrendingUp } from 'lucide-react'

interface TrendingFeedProps {
  miniApps: MiniApp[]
}

export function TrendingFeed({ miniApps }: TrendingFeedProps) {
  const sortedApps = [...miniApps].sort((a, b) => b.trendScore - a.trendScore)
  
  return (
    <div className="space-y-lg">
      <div className="flex items-center gap-sm mb-lg">
        <TrendingUp className="w-6 h-6 text-accent" />
        <h2 className="text-heading text-text">Trending Mini Apps</h2>
      </div>
      
      <div className="space-y-md">
        {sortedApps.map((miniApp, index) => (
          <div key={miniApp.miniAppId} className="relative">
            <div className="absolute -left-2 top-0 w-6 h-6 bg-accent/20 rounded-full flex items-center justify-center">
              <span className="text-xs font-bold text-accent">
                {index + 1}
              </span>
            </div>
            <MiniAppCard 
              miniApp={miniApp} 
              variant="detailed"
              className="ml-lg"
            />
          </div>
        ))}
      </div>
      
      <div className="text-center pt-lg">
        <p className="text-sm text-muted">
          Rankings updated based on user engagement and activity
        </p>
      </div>
    </div>
  )
}
