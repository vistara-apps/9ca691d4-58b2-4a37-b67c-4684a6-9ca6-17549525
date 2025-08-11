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
        <header className="flex justify-between items-center py-6 border-b border-border/50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-accent to-primary rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">🧠</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-text">MiniApp IQ</h1>
              <p className="text-xs text-muted">Test your Base knowledge</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {context && !context.client.added && (
              <button
                onClick={handleAddFrame}
                className="btn-primary text-sm px-4 py-2"
              >
                💾 Save
              </button>
            )}
            <button
              onClick={handleViewProfile}
              className="btn-ghost text-sm px-3 py-2 text-accent"
            >
              👤 Profile
            </button>
            <button
              onClick={close}
              className="btn-icon text-muted hover:text-text"
            >
              ✕
            </button>
          </div>
        </header>

        {/* Tab Navigation */}
        <nav className="flex space-x-2 mb-8 bg-surface-light rounded-xl p-2 mt-6">
          <button
            onClick={() => setActiveTab('quiz')}
            className={`flex-1 py-3 px-6 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center justify-center space-x-2 ${
              activeTab === 'quiz'
                ? 'bg-primary text-white shadow-lg transform scale-[1.02]'
                : 'text-muted hover:text-text hover:bg-surface'
            }`}
          >
            <span>🧩</span>
            <span>Quiz</span>
          </button>
          <button
            onClick={() => setActiveTab('trending')}
            className={`flex-1 py-3 px-6 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center justify-center space-x-2 ${
              activeTab === 'trending'
                ? 'bg-primary text-white shadow-lg transform scale-[1.02]'
                : 'text-muted hover:text-text hover:bg-surface'
            }`}
          >
            <span>🔥</span>
            <span>Trending</span>
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
