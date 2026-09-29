import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'

interface MagnetProps {
  children: ReactNode
  className?: string
  padding?: number
  strength?: number
  activeTransition?: string
  inactiveTransition?: string
}

export function Magnet({
  children,
  className = '',
  padding = 150,
  strength = 3,
  activeTransition = 'transform 0.3s ease-out',
  inactiveTransition = 'transform 0.6s ease-in-out',
}: MagnetProps) {
  const elementRef = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [active, setActive] = useState(false)

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)')
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

    const reset = () => {
      setActive(false)
      setOffset({ x: 0, y: 0 })
    }

    const trackPointer = (event: PointerEvent) => {
      if (!finePointer.matches || reducedMotion.matches || !elementRef.current) {
        reset()
        return
      }

      const bounds = elementRef.current.getBoundingClientRect()
      const insideHorizontalRange = event.clientX >= bounds.left - padding && event.clientX <= bounds.right + padding
      const insideVerticalRange = event.clientY >= bounds.top - padding && event.clientY <= bounds.bottom + padding

      if (!insideHorizontalRange || !insideVerticalRange) {
        reset()
        return
      }

      const centerX = bounds.left + bounds.width / 2
      const centerY = bounds.top + bounds.height / 2
      setActive(true)
      setOffset({
        x: (event.clientX - centerX) / strength,
        y: (event.clientY - centerY) / strength,
      })
    }

    window.addEventListener('pointermove', trackPointer, { passive: true })
    window.addEventListener('blur', reset)

    return () => {
      window.removeEventListener('pointermove', trackPointer)
      window.removeEventListener('blur', reset)
    }
  }, [padding, strength])

  return (
    <div
      ref={elementRef}
      className={className}
      style={{
        transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
        transition: active ? activeTransition : inactiveTransition,
        willChange: 'transform',
      }}
    >
      {children}
    </div>
  )
}
