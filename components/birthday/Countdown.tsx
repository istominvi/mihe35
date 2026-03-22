"use client"

import { useEffect, useState } from "react"

interface CountdownProps {
  onComplete: () => void
}

interface Star {
  id: number
  left: number
  top: number
  delay: number
}

export function Countdown({ onComplete }: CountdownProps) {
  const [count, setCount] = useState(3)
  const [isVisible, setIsVisible] = useState(true)
  const [stars, setStars] = useState<Star[]>([])

  // Генерируем звёзды только на клиенте
  useEffect(() => {
    const newStars: Star[] = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 2,
    }))
    setStars(newStars)
  }, [])

  useEffect(() => {
    if (count > 0) {
      const timer = setTimeout(() => {
        setCount(count - 1)
      }, 1000)
      return () => clearTimeout(timer)
    } else {
      const timer = setTimeout(() => {
        setIsVisible(false)
        onComplete()
      }, 800)
      return () => clearTimeout(timer)
    }
  }, [count, onComplete])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-[100]">
      <div className="relative">
        {count > 0 ? (
          <span
            key={count}
            className="text-white font-bold animate-countdown-pop"
            style={{ fontSize: "clamp(150px, 40vw, 300px)" }}
          >
            {count}
          </span>
        ) : (
          <div className="flex flex-col items-center gap-4 animate-countdown-pop">
            <span className="text-6xl md:text-8xl">*</span>
          </div>
        )}
      </div>

      {/* Мерцающие точки в темноте */}
      <div className="absolute inset-0 pointer-events-none">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              animationDelay: `${star.delay}s`,
              opacity: 0.3,
            }}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes countdown-pop {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          50% {
            transform: scale(1.2);
            opacity: 1;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        
        .animate-countdown-pop {
          animation: countdown-pop 0.6s ease-out forwards;
        }
        
        @keyframes twinkle {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.5; }
        }
        
        .animate-twinkle {
          animation: twinkle 1.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
