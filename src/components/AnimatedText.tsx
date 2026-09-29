import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import type { MotionValue } from 'framer-motion'

interface AnimatedTextProps {
  text: string
  className?: string
}

interface CharacterProps {
  char: string
  index: number
  total: number
  progress: MotionValue<number>
}

function AnimatedCharacter({ char, index, total, progress }: CharacterProps) {
  const start = index / total
  const end = Math.min(start + 0.22, 1)
  const opacity = useTransform(progress, [start, end], [0.2, 1])
  const visibleCharacter = char === ' ' ? '\u00A0' : char

  return (
    <span className="relative inline-block" aria-hidden="true">
      <span className="opacity-0">{visibleCharacter}</span>
      <motion.span className="absolute inset-0" style={{ opacity }}>
        {visibleCharacter}
      </motion.span>
    </span>
  )
}

export function AnimatedText({ text, className = '' }: AnimatedTextProps) {
  const targetRef = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start 0.8', 'end 0.2'],
  })

  return (
    <p ref={targetRef} className={className} aria-label={text}>
      {Array.from(text).map((char, index) => (
        <AnimatedCharacter key={`${char}-${index}`} char={char} index={index} total={text.length} progress={scrollYProgress} />
      ))}
    </p>
  )
}
