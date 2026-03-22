"use client"

import { useEffect, useState, useRef } from "react"

const CONFETTI_IMAGES = [
  "/conf_1.png",
  "/conf_2.png",
  "/conf_3.png",
  "/conf_4.png",
  "/conf_5.png",
  "/conf_6.png",
  "/conf_7.png",
]

interface ConfettiPiece {
  id: number
  image: string
  left: number
  delay: number
  duration: number
  size: number
  rotation: number
  swayAmount: number
}

export function Confetti() {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([])
  const styleRef = useRef<HTMLStyleElement | null>(null)

  useEffect(() => {
    const generatedPieces: ConfettiPiece[] = []
    let keyframesCSS = ""

    for (let i = 0; i < 40; i++) {
      const swayAmount = 30 + Math.random() * 60
      
      generatedPieces.push({
        id: i,
        image: CONFETTI_IMAGES[Math.floor(Math.random() * CONFETTI_IMAGES.length)],
        left: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 6 + Math.random() * 6,
        size: 30 + Math.random() * 40,
        rotation: Math.random() * 360,
        swayAmount,
      })

      keyframesCSS += `
        @keyframes confetti-fall-${i} {
          0% {
            transform: translateY(-100px) translateX(0) rotate(0deg);
            opacity: 1;
          }
          25% {
            transform: translateY(25vh) translateX(${swayAmount}px) rotate(90deg);
          }
          50% {
            transform: translateY(50vh) translateX(-${swayAmount * 0.5}px) rotate(180deg);
          }
          75% {
            transform: translateY(75vh) translateX(${swayAmount * 0.7}px) rotate(270deg);
          }
          100% {
            transform: translateY(105vh) translateX(-${swayAmount * 0.3}px) rotate(360deg);
            opacity: 0.5;
          }
        }
      `
    }

    // Добавляем keyframes в head
    const style = document.createElement("style")
    style.textContent = keyframesCSS + `
      @keyframes confetti-spin {
        0% { transform: rotateY(0deg); }
        100% { transform: rotateY(360deg); }
      }
    `
    document.head.appendChild(style)
    styleRef.current = style

    setPieces(generatedPieces)

    return () => {
      if (styleRef.current) {
        document.head.removeChild(styleRef.current)
      }
    }
  }, [])

  if (pieces.length === 0) return null

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-30">
      {pieces.map((piece) => (
        <div
          key={piece.id}
          className="absolute"
          style={{
            left: `${piece.left}%`,
            top: 0,
            animation: `confetti-fall-${piece.id} ${piece.duration}s ease-in-out ${piece.delay}s infinite`,
          }}
        >
          <img
            src={piece.image}
            alt=""
            className="pointer-events-none"
            style={{
              width: `${piece.size}px`,
              height: "auto",
              transform: `rotate(${piece.rotation}deg)`,
              animation: `confetti-spin ${2 + Math.random() * 2}s linear infinite`,
            }}
          />
        </div>
      ))}
    </div>
  )
}
