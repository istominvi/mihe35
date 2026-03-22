"use client"

import Image from "next/image"
import { useEffect, useState } from "react"

interface PhotoModalProps {
  src: string
  currentIndex: number
  total: number
  onClose: () => void
  onNext: () => void
  onPrev: () => void
}

export function PhotoModal({ src, currentIndex, total, onClose, onNext, onPrev }: PhotoModalProps) {
  const [isClosing, setIsClosing] = useState(false)

  const handleClose = () => {
    setIsClosing(true)
    setTimeout(onClose, 400)
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose()
      if (e.key === "ArrowRight") onNext()
      if (e.key === "ArrowLeft") onPrev()
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [onNext, onPrev])

  return (
    <div
      className={`fixed inset-0 z-[60] flex items-center justify-center p-4 ${
        isClosing ? "animate-fade-out" : "animate-fade-in"
      }`}
      onClick={handleClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      {/* Фото с эффектом полароида */}
      <div
        className={`relative bg-white p-3 md:p-6 pb-12 md:pb-16 shadow-2xl max-w-[90vw] max-h-[85vh] ${
          isClosing ? "animate-photo-fly-out" : "animate-photo-fly-in"
        }`}
        onClick={(e) => e.stopPropagation()}
        style={{
          transform: `rotate(${(Math.random() - 0.5) * 6}deg)`,
        }}
      >
        {/* Скотч сверху */}
        <div
          className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 opacity-60 rotate-[-2deg]"
          style={{
            backgroundImage: "linear-gradient(180deg, rgba(255,235,180,0.8) 0%, rgba(255,220,150,0.6) 100%)",
          }}
        />

        <div className="relative w-[280px] h-[280px] md:w-[400px] md:h-[400px] overflow-hidden">
          <Image
            src={src}
            alt="Памятное фото"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 280px, 400px"
          />
        </div>

        {/* Подпись снизу */}
        <p className="absolute bottom-3 md:bottom-4 left-0 right-0 text-center text-muted-foreground font-handwriting text-sm md:text-lg">
          Воспоминание ✨ ({currentIndex + 1}/{total})
        </p>

        <button
          type="button"
          onClick={onPrev}
          className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-black/60 text-white rounded-full flex items-center justify-center hover:bg-black/75 transition-colors"
          aria-label="Предыдущее фото"
        >
          ←
        </button>

        <button
          type="button"
          onClick={onNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-black/60 text-white rounded-full flex items-center justify-center hover:bg-black/75 transition-colors"
          aria-label="Следующее фото"
        >
          →
        </button>

        {/* Кнопка закрытия */}
        <button
          onClick={handleClose}
          className="absolute -top-3 -right-3 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
        >
          ✕
        </button>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes fade-out {
          from { opacity: 1; }
          to { opacity: 0; }
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        
        .animate-fade-out {
          animation: fade-out 0.4s ease-in forwards;
        }
        
        @keyframes photo-fly-in {
          0% {
            transform: translateY(100vh) rotate(180deg) scale(0.2);
            opacity: 0;
          }
          60% {
            transform: translateY(-30px) rotate(-5deg) scale(1.05);
            opacity: 1;
          }
          100% {
            transform: translateY(0) rotate(var(--rotation, 2deg)) scale(1);
          }
        }
        
        @keyframes photo-fly-out {
          0% {
            transform: translateY(0) rotate(0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) rotate(-20deg) scale(0.5);
            opacity: 0;
          }
        }
        
        .animate-photo-fly-in {
          animation: photo-fly-in 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        
        .animate-photo-fly-out {
          animation: photo-fly-out 0.4s ease-in forwards;
        }
      `}</style>
    </div>
  )
}
