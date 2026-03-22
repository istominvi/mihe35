"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"

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
  const [isLoading, setIsLoading] = useState(true)
  const rotationRef = useRef((Math.random() - 0.5) * 6)

  const handleClose = () => {
    setIsClosing(true)
    setTimeout(onClose, 400)
  }

  useEffect(() => {
    setIsLoading(true)
  }, [src])

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
          transform: `rotate(${rotationRef.current}deg)`,
        }}
      >
        {/* Скотч сверху */}
        <div
          className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 opacity-60 rotate-[-2deg]"
          style={{
            backgroundImage: "linear-gradient(180deg, rgba(255,235,180,0.8) 0%, rgba(255,220,150,0.6) 100%)",
          }}
        />

        <div className="relative w-[85vw] h-[70vh] max-w-[900px] max-h-[75vh] overflow-hidden rounded-sm bg-zinc-100">
          <Image
            src={src}
            alt="Памятное фото"
            fill
            className="object-contain"
            sizes="(max-width: 768px) 85vw, 900px"
            quality={100}
            unoptimized
            onLoad={() => setIsLoading(false)}
          />
          {isLoading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/35 backdrop-blur-[1px] text-white gap-3">
              <div className="h-9 w-9 rounded-full border-4 border-white/40 border-t-white animate-spin" />
              <p className="text-sm md:text-base">Загружаем следующее фото…</p>
            </div>
          )}
        </div>

        {/* Подпись снизу */}
        <p className="absolute bottom-3 md:bottom-4 left-0 right-0 text-center text-muted-foreground font-handwriting text-sm md:text-lg">
          Воспоминание ✨ ({currentIndex + 1}/{total})
        </p>

        <button
          type="button"
          onClick={onPrev}
          className="absolute left-2 md:left-3 top-1/2 -translate-y-1/2 w-11 h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center bg-white/90 text-zinc-800 shadow-lg border border-zinc-200 hover:bg-white hover:scale-105 active:scale-95 transition-all"
          aria-label="Предыдущее фото"
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5 md:w-6 md:h-6" aria-hidden="true">
            <path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <button
          type="button"
          onClick={onNext}
          className="absolute right-2 md:right-3 top-1/2 -translate-y-1/2 w-11 h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center bg-white/90 text-zinc-800 shadow-lg border border-zinc-200 hover:bg-white hover:scale-105 active:scale-95 transition-all"
          aria-label="Следующее фото"
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5 md:w-6 md:h-6" aria-hidden="true">
            <path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
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
