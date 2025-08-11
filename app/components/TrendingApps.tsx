'use client'

import { useState } from 'react'
import MiniAppCard from './MiniAppCard'
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

const sampleApps: MiniApp[] = [
  {
    id: '1',
    name: 'Farcaster',
    description: 'Decentralized social networking protocol built on Base',
    platform: 'Base',
    tags: ['Social', 'DeFi'],
    trendScore: 95,
    logoUrl: '🟣'
  },
  {
    id: '2',
    name: 'Uniswap',
    description: 'Leading decentralized exchange for token swapping',
    platform: 'Base',
    tags: ['DeFi', 'Trading'],
    trendScore: 92,
    logoUrl: '🦄'
  },
  {
    id: '3',
    name: 'Polymarket',
    description: 'Prediction markets for real-world events',
    platform: 'Base',
    tags: ['Prediction', 'Markets'],
    trendScore: 88,
    logoUrl: '📊'
  },
  {
    id: '4',
    name: 'Zora',
    description: 'NFT marketplace and creator platform',
    platform: 'Base',
    tags: ['NFT', 'Creator'],
    trendScore: 85,
    logoUrl: '🎨'
  },
  {
    id: '5',
    name: 'Coinbase Wallet',
    description: 'Self-custody wallet for Base ecosystem',
    platform: 'Base',
    tags: ['Wallet', 'DeFi'],
    trendScore: 90,
    logoUrl: '💙'
  }
]

export default function TrendingApps() {
  const [filter, setFilter] = useState<string>('all')
  
  const uniqueTags = Array.from(new Set(sampleApps.flatMap(app => app.tags)))
  const filteredApps = filter === 'all' 
    ? sampleApps 
    : sampleApps.filter(app => app.tags.includes(filter))

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-text">Trending Mini Apps</h2>
        
        {/* Filter Tags */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
              filter === 'all'
                ? 'bg-accent text-bg'
                : 'bg-surface text-muted hover:text-text'
            }`}
          >
            All
          </button>
          {uniqueTags.map(tag => (
            <button
              key={tag}
              onClick={() => setFilter(tag)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                filter === tag
                  ? 'bg-accent text-bg'
                  : 'bg-surface text-muted hover:text-text'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Apps List */}
      <div className="space-y-4">
        {filteredApps
          .sort((a, b) => b.trendScore - a.trendScore)
          .map((app, index) => (
            <MiniAppCard
              key={app.id}
              app={app}
              rank={index + 1}
              variant="detailed"
            />
          ))}
      </div>

      {filteredApps.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted">No apps found for the selected filter.</p>
        </div>
      )}
    </div>
  )
}
