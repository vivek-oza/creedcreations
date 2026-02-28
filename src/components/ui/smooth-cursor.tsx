"use client"

import { type FC, useEffect, useRef, useState } from "react"
import { motion, useSpring } from "motion/react"

interface Position {
  x: number
  y: number
}

/** Cursor color based on background under pointer */
type CursorColor = 'white' | 'black'

/** Detect background at (x,y): white → black cursor, orange/black → white cursor */
function getCursorColorAt(x: number, y: number): CursorColor {
  const el = document.elementFromPoint(x, y)
  if (!el) return 'white'

  // Fixed overlays (nav, logo) use data-cursor-context from scroll-based theme
  const cursorContext = el.closest('[data-cursor-context]')
  if (cursorContext) {
    if (cursorContext.getAttribute('data-cursor-context') === 'light') return 'black'
    return 'white'
  }

  const overWhite = el.closest('.bg-white')
  const overOrange = el.closest('.bg-neon-orange')

  if (overWhite) return 'black'
  if (overOrange) return 'white'
  return 'white' // black / default bg
}

export interface SmoothCursorProps {
  cursor?: React.ReactNode
  isLightBg?: boolean
  springConfig?: {
    damping: number
    stiffness: number
    mass: number
    restDelta: number
  }
}

const CursorSVG: FC<{ color: CursorColor }> = ({ color }) => {
  const fillColor = color === 'black' ? '#000000' : '#ffffff'
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke={fillColor}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 3L19 12L12 13L8 21L5 3Z" fill={fillColor} stroke={fillColor} />
    </svg>
  )
}

export function SmoothCursor({
  cursor,
  isLightBg = false,
  springConfig = {
    damping: 25,
    stiffness: 1200,
    mass: 0.25,
    restDelta: 0.001,
  },
}: SmoothCursorProps) {
  const [isTouchDevice, setIsTouchDevice] = useState(false)
  useEffect(() => {
    const check = () =>
      window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window
    setIsTouchDevice(check())
  }, [])

  const [cursorColor, setCursorColor] = useState<CursorColor>(
    () => (isLightBg ? 'black' : 'white')
  )
  const cursorX = useSpring(0, springConfig)
  const cursorY = useSpring(0, springConfig)
  const rotation = useSpring(0, {
    ...springConfig,
    damping: 35,
    stiffness: 600,
  })
  const scale = useSpring(1, {
    ...springConfig,
    stiffness: 800,
    damping: 30,
  })
  const lastMousePos = useRef<Position>({ x: 0, y: 0 })
  const velocity = useRef<Position>({ x: 0, y: 0 })
  const lastUpdateTime = useRef(Date.now())
  const previousAngle = useRef(0)
  const accumulatedRotation = useRef(0)
  const colorCheckRaf = useRef<number | null>(null)

  const cursorElement = cursor ?? <CursorSVG color={cursorColor} />

  if (isTouchDevice) return null

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const currentPos = { x: e.clientX, y: e.clientY }

      // Update position immediately — springs will smooth
      cursorX.set(currentPos.x)
      cursorY.set(currentPos.y)

      // Update color based on element under cursor (debounced with rAF)
      if (colorCheckRaf.current != null) cancelAnimationFrame(colorCheckRaf.current)
      colorCheckRaf.current = requestAnimationFrame(() => {
        const color = getCursorColorAt(currentPos.x, currentPos.y)
        setCursorColor(color)
        colorCheckRaf.current = null
      })

      // Velocity for rotation/scale
      const currentTime = Date.now()
      const deltaTime = currentTime - lastUpdateTime.current
      if (deltaTime > 0) {
        velocity.current = {
          x: (currentPos.x - lastMousePos.current.x) / deltaTime,
          y: (currentPos.y - lastMousePos.current.y) / deltaTime,
        }
      }
      lastUpdateTime.current = currentTime
      lastMousePos.current = currentPos

      const speed = Math.sqrt(
        velocity.current.x ** 2 + velocity.current.y ** 2
      )

      if (speed > 0.15) {
        const currentAngle =
          Math.atan2(velocity.current.y, velocity.current.x) * (180 / Math.PI) + 90
        let angleDiff = currentAngle - previousAngle.current
        if (angleDiff > 180) angleDiff -= 360
        if (angleDiff < -180) angleDiff += 360
        accumulatedRotation.current += angleDiff
        rotation.set(accumulatedRotation.current)
        previousAngle.current = currentAngle
        scale.set(0.95)
        const t = setTimeout(() => scale.set(1), 120)
        return () => clearTimeout(t)
      }
    }

    document.body.style.cursor = "none"
    window.addEventListener("mousemove", handleMouseMove, { passive: true })

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      document.body.style.cursor = "auto"
      if (colorCheckRaf.current != null) cancelAnimationFrame(colorCheckRaf.current)
    }
  }, [cursorX, cursorY, rotation, scale])

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-[9999] will-change-transform"
      style={{
        x: cursorX,
        y: cursorY,
        rotate: rotation,
        scale: scale,
        translateX: "-50%",
        translateY: "-50%",
      }}
    >
      {cursorElement}
    </motion.div>
  )
}
