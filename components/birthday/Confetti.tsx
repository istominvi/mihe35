"use client"

import { useEffect, useState } from "react"

const CONFETTI_COLORS = [
  "#f59e0b",
  "#f97316",
  "#ef4444",
  "#eab308",
  "#22c55e",
  "#3b82f6",
  "#a855f7",
]

interface ConfettiPiece {
  id: number
  left: number
  delay: number
  duration: number
  size: number
  rotation: number
  swayAmount: number
  color: string
  shape: "rect" | "circle"
}

const isMobileViewport = () => {
  if (typeof window === "undefined") return false
  return window.matchMedia("(max-width: 768px)").matches
}

export function Confetti() {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([])

  useEffect(() => {
    const count = isMobileViewport() ? 24 : 34

    const generatedPieces: ConfettiPiece[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 4,
      duration: 6 + Math.random() * 5,
      size: 8 + Math.random() * 14,
      rotation: Math.random() * 360,
      swayAmount: 20 + Math.random() * 40,
      color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
      shape: Math.random() > 0.6 ? "circle" : "rect",
    }))

    setPieces(generatedPieces)
  }, [])

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return
    setPrefersReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches)
  }, [])

  if (prefersReducedMotion || pieces.length === 0) return null

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-30" aria-hidden="true">
      {pieces.map((piece) => (
        <div
          key={piece.id}
          className="absolute will-change-transform"
          style={{
            left: `${piece.left}%`,
            top: -30,
            animation: `confetti-fall ${piece.duration}s ease-in-out ${piece.delay}s infinite`,
            ["--sway" as string]: `${piece.swayAmount}px`,
          }}
        >
          <div
            className="will-change-transform"
            style={{
              width: `${piece.size}px`,
              height: `${piece.shape === "circle" ? piece.size : piece.size * 0.58}px`,
              borderRadius: piece.shape === "circle" ? "9999px" : "2px",
              backgroundColor: piece.color,
              opacity: 0.88,
              transform: `rotate(${piece.rotation}deg)`,
              animation: `confetti-spin ${2 + Math.random() * 2}s linear infinite`,
            }}
          />
        </div>
      ))}

      <style jsx>{`
        @keyframes confetti-fall {
          0% {
            transform: translate3d(0, -8vh, 0) rotate(0deg);
            opacity: 0.95;
          }
          25% {
            transform: translate3d(var(--sway), 25vh, 0) rotate(90deg);
          }
          50% {
            transform: translate3d(calc(var(--sway) * -0.5), 50vh, 0) rotate(180deg);
          }
          75% {
            transform: translate3d(calc(var(--sway) * 0.7), 75vh, 0) rotate(270deg);
          }
          100% {
            transform: translate3d(calc(var(--sway) * -0.3), 105vh, 0) rotate(360deg);
            opacity: 0.5;
          }
        }

        @keyframes confetti-spin {
          from {
            transform: rotateY(0deg);
          }
          to {
            transform: rotateY(360deg);
          }
        }
      `}</style>
    </div>
  )
}
