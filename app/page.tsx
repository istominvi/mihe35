"use client"

import { useState } from "react"
import Image from "next/image"
import { Countdown } from "@/components/birthday/Countdown"
import { Confetti } from "@/components/birthday/Confetti"
import { PhotoModal } from "@/components/birthday/PhotoModal"

// Список фотографий из /public/photo
const PHOTOS: string[] = [
  "/photo/1.jpg",
  "/photo/2.jpg",
  "/photo/3.jpg",
  "/photo/4.jpg",
  "/photo/5.jpg",
]

export default function BirthdayPage() {
  const [stage, setStage] = useState<"countdown" | "reveal">("countdown")
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)
  const [showPhoto, setShowPhoto] = useState(false)
  const [showVideo1, setShowVideo1] = useState(false)
  const [showVideo2, setShowVideo2] = useState(false)

  const handleCountdownComplete = () => {
    setStage("reveal")
  }

  const handleAlbumClick = () => {
    if (PHOTOS.length > 0) {
      setShowPhoto(true)
    }
  }

  const handleClosePhoto = () => {
    setShowPhoto(false)
    setCurrentPhotoIndex((prev) => (prev + 1) % PHOTOS.length)
  }

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      {stage === "countdown" ? (
        <Countdown onComplete={handleCountdownComplete} />
      ) : (
        <div className="relative min-h-screen bg-white transition-all duration-1000">
          {/* Конфетти */}
          <Confetti />
          
          {/* Баннер HAPPY BIRTHDAY - изображение на всю ширину */}
          <div className="fixed top-0 left-0 right-0 z-40">
            <img
              src="/happy2.png"
              alt="Happy Birthday"
              className="w-full h-auto pointer-events-none"
            />
          </div>
          
          {/* Hero секция с изображением */}
          <div className="relative w-full pt-32 md:pt-40">
            <div className="relative w-full max-w-xl mx-auto px-4">
              <Image
                src="/hero.png"
                alt="Миша с шарами 35"
                width={800}
                height={1000}
                className="w-full h-auto"
                priority
              />
            </div>
            
            {/* Заголовок с заходом на изображение */}
            <div className="relative -mt-12 md:-mt-20 z-10">
              <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600 text-center leading-tight text-balance px-4 animate-shimmer birthday-title-glow">
                Любимый наш Миша, поздравляем тебя с 35-летием!
              </h1>
            </div>
          </div>
          
          {/* Основной контент */}
          <div className="flex flex-col items-center pt-8 pb-16 px-4">
            {/* Поздравительный текст */}
            <div className="text-center mb-12 animate-fade-in max-w-2xl mx-auto">
              <div className="space-y-4">
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                  В этот особенный день наша семья тебе желает, чтобы жизнь становилась еще интереснее, и каждый день приносил чистые и яркие эмоции!
                </p>
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                  Береги себя и свою семью!
                </p>
                <p className="text-2xl md:text-3xl font-semibold text-amber-600 mt-6">
                  Любим тебя!
                </p>
              </div>
            </div>
            
            {/* Первая коробка - Поздравление (видео) */}
            <div className="text-center mb-4">
              <p className="text-xl md:text-2xl font-medium text-amber-700">Поздравление</p>
            </div>
            <button
              onClick={() => setShowVideo1(true)}
              className="relative w-48 h-48 md:w-64 md:h-64 transition-transform hover:scale-105 active:scale-95 cursor-pointer"
            >
              <Image
                src="/congratulation.png"
                alt="Поздравление"
                width={300}
                height={300}
                className="w-full h-full object-contain drop-shadow-xl animate-float"
              />
            </button>
            
            {/* Разделитель */}
            <div className="w-full max-w-md h-px bg-gradient-to-r from-transparent via-amber-300 to-transparent my-12" />
            
            {/* Вторая коробка - Альбом с фотками */}
            <div className="text-center mb-4">
              <p className="text-xl md:text-2xl font-medium text-amber-700">Фоточки</p>
            </div>
            <button
              onClick={handleAlbumClick}
              className="relative w-48 h-48 md:w-64 md:h-64 transition-transform hover:scale-105 active:scale-95 cursor-pointer"
            >
              <Image
                src="/albom.png"
                alt="Фотоальбом"
                width={300}
                height={300}
                className="w-full h-full object-contain drop-shadow-xl animate-float"
                style={{ animationDelay: "0.5s" }}
              />
            </button>
            
            {/* Разделитель */}
            <div className="w-full max-w-md h-px bg-gradient-to-r from-transparent via-amber-300 to-transparent my-12" />
            
            {/* Третья коробка - Бабар */}
            <div className="text-center mb-4">
              <p className="text-xl md:text-2xl font-medium text-amber-700">Привет из детства</p>
            </div>
            <button
              onClick={() => setShowVideo2(true)}
              className="relative w-48 h-48 md:w-64 md:h-64 transition-transform hover:scale-105 active:scale-95 cursor-pointer"
            >
              <Image
                src="/babar.png"
                alt="Бабар"
                width={300}
                height={300}
                className="w-full h-full object-contain drop-shadow-xl animate-float"
                style={{ animationDelay: "1s" }}
              />
            </button>
            
            {/* Отступ снизу */}
            <div className="h-16" />
          </div>
          
          {/* Модальное окно с фото */}
          {showPhoto && (
            <PhotoModal
              src={PHOTOS[currentPhotoIndex]}
              onClose={handleClosePhoto}
            />
          )}
          
          {/* Модальное окно видео 1 - Поздравление */}
          {showVideo1 && (
            <div 
              className="fixed inset-0 bg-black/80 z-[60] flex items-center justify-center p-4"
              onClick={() => setShowVideo1(false)}
            >
              <div 
                className="relative w-full max-w-4xl aspect-video bg-black rounded-lg overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setShowVideo1(false)}
                  className="absolute -top-12 right-0 text-white text-lg hover:text-amber-400 transition-colors z-10"
                >
                  Закрыть
                </button>
                <iframe
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                  title="Поздравление от семьи"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          )}
          
          {/* Модальное окно видео 2 - Бабар */}
          {showVideo2 && (
            <div 
              className="fixed inset-0 bg-black/80 z-[60] flex items-center justify-center p-4"
              onClick={() => setShowVideo2(false)}
            >
              <div 
                className="relative w-full max-w-4xl aspect-video bg-black rounded-lg overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setShowVideo2(false)}
                  className="absolute -top-12 right-0 text-white text-lg hover:text-amber-400 transition-colors z-10"
                >
                  Закрыть
                </button>
                <iframe
                  src="https://www.youtube.com/embed/0gRJJaRZoxE"
                  title="Бабар – Король Элефантии"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          )}
        </div>
      )}
      
      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes shimmer {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
        }
        
        .animate-shimmer {
          background-size: 200% auto;
          animation: shimmer 3s linear infinite;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </main>
  )
}
