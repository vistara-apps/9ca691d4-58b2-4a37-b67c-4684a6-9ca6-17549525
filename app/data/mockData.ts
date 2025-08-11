
import type { MiniApp, Quiz, Question } from '../types'

export const mockMiniApps: MiniApp[] = [
  {
    miniAppId: '1',
    name: 'OnchainKit Swap',
    logoUrl: 'https://via.placeholder.com/80x80/6366f1/ffffff?text=OCK',
    description: 'Seamless token swapping powered by OnchainKit',
    platform: 'Base',
    tags: ['DeFi', 'Swap', 'OnchainKit'],
    trendScore: 95
  },
  {
    miniAppId: '2',
    name: 'Farcaster Frames',
    logoUrl: 'https://via.placeholder.com/80x80/10b981/ffffff?text=FC',
    description: 'Interactive frames within Farcaster social network',
    platform: 'Farcaster',
    tags: ['Social', 'Frames', 'Interactive'],
    trendScore: 88
  },
  {
    miniAppId: '3',
    name: 'Base Name Service',
    logoUrl: 'https://via.placeholder.com/80x80/3b82f6/ffffff?text=BNS',
    description: 'Decentralized naming service for Base addresses',
    platform: 'Base',
    tags: ['Identity', 'DNS', 'Base'],
    trendScore: 82
  },
  {
    miniAppId: '4',
    name: 'Coinbase Wallet',
    logoUrl: 'https://via.placeholder.com/80x80/f59e0b/ffffff?text=CB',
    description: 'Self-custody wallet for Web3',
    platform: 'Multi-chain',
    tags: ['Wallet', 'Self-custody', 'Multi-chain'],
    trendScore: 90
  },
  {
    miniAppId: '5',
    name: 'Uniswap Mini',
    logoUrl: 'https://via.placeholder.com/80x80/ec4899/ffffff?text=UNI',
    description: 'Decentralized trading protocol',
    platform: 'Ethereum',
    tags: ['DeFi', 'DEX', 'Trading'],
    trendScore: 85
  }
]

export const mockQuiz: Quiz = {
  quizId: '1',
  title: 'Base Mini Apps Fundamentals',
  description: 'Test your knowledge of popular Base ecosystem mini apps',
  difficulty: 'medium'
}

export const mockQuestions: Question[] = [
  {
    questionId: '1',
    quizId: '1',
    prompt: 'Which component is used for seamless token swapping in the Base ecosystem?',
    optionsJson: ['OnchainKit Swap', 'Uniswap Widget', 'PancakeSwap', 'SushiSwap'],
    correctAnswer: 0,
    explanation: 'OnchainKit Swap provides native Base integration with optimal gas fees and user experience.'
  },
  {
    questionId: '2',
    quizId: '1',
    prompt: 'What is the primary social platform that integrates with Base mini apps?',
    optionsJson: ['Twitter', 'Farcaster', 'Discord', 'Telegram'],
    correctAnswer: 1,
    explanation: 'Farcaster is a decentralized social network that natively supports Base mini apps through frames.'
  },
  {
    questionId: '3',
    quizId: '1',
    prompt: 'Which service provides decentralized naming for Base addresses?',
    optionsJson: ['ENS', 'Base Name Service', 'Unstoppable Domains', 'Handshake'],
    correctAnswer: 1,
    explanation: 'Base Name Service (BNS) is the native naming service for the Base ecosystem.'
  },
  {
    questionId: '4',
    quizId: '1',
    prompt: 'What type of wallet is recommended for Base mini apps?',
    optionsJson: ['Exchange wallet', 'Custodial wallet', 'Self-custody wallet', 'Paper wallet'],
    correctAnswer: 2,
    explanation: 'Self-custody wallets like Coinbase Wallet give you full control of your assets and private keys.'
  },
  {
    questionId: '5',
    quizId: '1',
    prompt: 'Which blockchain does Base build upon?',
    optionsJson: ['Bitcoin', 'Ethereum', 'Solana', 'Polygon'],
    correctAnswer: 1,
    explanation: 'Base is an Ethereum Layer 2 solution, inheriting Ethereum\'s security and ecosystem.'
  }
]
