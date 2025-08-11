'use client'

import { useMiniKit, useAddFrame, useOpenUrl, useClose, useViewProfile } from '@coinbase/onchainkit/minikit'
import { useEffect, useState, useCallback } from 'react'
import QuizContainer from './components/QuizContainer'
import TrendingApps from './components/TrendingApps'

export default function Home() {
  const { setFrameReady, isFrameReady, context } = useMiniKit()
  const [activeTab, setActiveTab] = useState<'quiz' | 'trending'>('quiz')
  const addFrame = useAddFrame()
  const openUrl = useOpenUrl()
  const close = useClose()
  const viewProfile = useViewProfile()

  useEffect(() => {
    if (!isFrameReady) {
      setFrameReady()
    }
  }, [setFrameReady, isFrameReady])

  const handleAddFrame = useCallback(async () => {
    const result = await addFrame()
    if (result) {
      console.log('Frame added:', result.url, result.token)
    }
  }, [addFrame])

  const handleViewProfile = useCallback(() => {
    viewProfile()
  }, [viewProfile])

  return (
    <div className="min-h-screen bg-bg">
      <div className="max-w-md w-full mx-auto px-4">
        {/* Header */}
        <header className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-semibold text-text">MiniApp IQ</h1>
          </div>
          <div className="flex items-center space-x-2">
            {context && !context.client.added && (
              <button
                onClick={handleAddFrame}
                className="bg-primary text-white px-3 py-1 rounded text-sm hover:bg-primary/90 transition-colors"
              >
                SAVE
              </button>
            )}
            <button
              onClick={handleViewProfile}
              className="text-accent text-sm font-semibold hover:text-accent/80 transition-colors"
            >
              PROFILE
            </button>
            <button
              onClick={close}
              className="text-muted text-sm font-semibold hover:text-text transition-colors"
            >
              CLOSE
            </button>
          </div>
        </header>

        {/* Tab Navigation */}
        <nav className="flex space-x-1 mb-6 bg-surface rounded-lg p-1">
          <button
            onClick={() => setActiveTab('quiz')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'quiz'
                ? 'bg-primary text-white'
                : 'text-muted hover:text-text'
            }`}
          >
            Quiz
          </button>
          <button
            onClick={() => setActiveTab('trending')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'trending'
                ? 'bg-primary text-white'
                : 'text-muted hover:text-text'
            }`}
          >
            Trending
          </button>
        </nav>

        {/* Content */}
        <main className="pb-20">
          {activeTab === 'quiz' ? <QuizContainer /> : <TrendingApps />}
        </main>

        {/* Footer */}
        <footer className="fixed bottom-0 left-0 right-0 bg-bg border-t border-white/10 p-4">
          <div className="max-w-md mx-auto text-center">
            <button
              onClick={() => openUrl('https://base.org')}
              className="text-accent text-sm font-semibold hover:text-accent/80 transition-colors"
            >
              BUILT ON BASE
            </button>
          </div>
        </footer>
      </div>
    </div>
  )
}
