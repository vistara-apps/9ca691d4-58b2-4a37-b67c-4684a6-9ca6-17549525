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
  const [searchQuery, setSearchQuery] = useState<string>('')
  
  const uniqueTags = Array.from(new Set(sampleApps.flatMap(app => app.tags)))
  const filteredApps = sampleApps
    .filter(app => {
      const matchesFilter = filter === 'all' || app.tags.includes(filter)
      const matchesSearch = searchQuery === '' || 
        app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.description.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesFilter && matchesSearch
    })

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-text">Trending Apps</h2>
            <p className="text-sm text-muted">Discover popular Base mini-apps</p>
          </div>
          <div className="text-right">
            <div className="text-sm text-muted">Total</div>
            <div className="text-xl font-bold text-accent">{filteredApps.length}</div>
          </div>
        </div>
        
        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search apps..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-field w-full pl-10 pr-4"
          />
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted">
            🔍
          </div>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted hover:text-text"
            >
              ✕
            </button>
          )}
        </div>
        
        {/* Filter Tags */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              filter === 'all'
                ? 'bg-accent text-bg shadow-lg transform scale-105'
                : 'bg-surface text-muted hover:text-text hover:bg-surface-light'
            }`}
          >
            All Apps
          </button>
          {uniqueTags.map(tag => (
            <button
              key={tag}
              onClick={() => setFilter(tag)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                filter === tag
                  ? 'bg-accent text-bg shadow-lg transform scale-105'
                  : 'bg-surface text-muted hover:text-text hover:bg-surface-light'
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
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-surface rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🔍</span>
          </div>
          <h3 className="text-lg font-semibold text-text mb-2">No apps found</h3>
          <p className="text-muted mb-4">
            {searchQuery 
              ? `No apps match "${searchQuery}" in the ${filter === 'all' ? 'all categories' : filter + ' category'}.`
              : `No apps found in the ${filter} category.`
            }
          </p>
          <button
            onClick={() => {
              setFilter('all')
              setSearchQuery('')
            }}
            className="btn-secondary"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  )
}
