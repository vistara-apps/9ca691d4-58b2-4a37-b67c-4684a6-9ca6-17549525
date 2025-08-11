'use client'

interface TagProps {
  text: string
  variant?: 'platform' | 'category'
}

export default function Tag({ text, variant = 'category' }: TagProps) {
  const className = variant === 'platform' ? 'tag-platform' : 'tag-category'
  
  return (
    <span className={className}>
      {text}
    </span>
  )
}
