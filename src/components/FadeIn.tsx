import { motion } from 'framer-motion'
import type { CSSProperties, ReactNode } from 'react'

type DynamicElement = keyof JSX.IntrinsicElements

interface FadeInProps {
  as?: DynamicElement
  children: ReactNode
  className?: string
  style?: CSSProperties
  delay?: number
  duration?: number
  x?: number
  y?: number
}

const easing = [0.25, 0.1, 0.25, 1] as const

export function FadeIn({
  as = 'div',
  children,
  className,
  style,
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
}: FadeInProps) {
  const MotionElement = motion.create(as)

  return (
    <MotionElement
      className={className}
      style={style}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '50px', amount: 0 }}
      transition={{ duration, delay, ease: easing }}
    >
      {children}
    </MotionElement>
  )
}
