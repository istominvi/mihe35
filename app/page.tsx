"use client"

import { useState } from "react"
import Image from "next/image"
import { Pacifico } from "next/font/google"
import { Confetti } from "@/components/birthday/Confetti"
import { PhotoModal } from "@/components/birthday/PhotoModal"

// Список фотографий из /public/photo
const pacifico = Pacifico({
  weight: "400",
  subsets: ["latin", "cyrillic"],
})

const PHOTOS: string[] = [
  "/photo/01.png",
  "/photo/02.png",
  "/photo/03.png",
  "/photo/04.png",
  "/photo/05.png",
  "/photo/06.png",
  "/photo/07.png",
  "/photo/08.png",
  "/photo/09.png",
  "/photo/10.png",
]

const LOCAL_VIDEOS = {
  congratulations: "/video/congratulation.mp4",
}

const VIDEO_SOURCES = {
  congratulations: process.env.NEXT_PUBLIC_CONGRATULATION_VIDEO_URL ?? LOCAL_VIDEOS.congratulations,
}

const CHILDHOOD_VK_EMBED_URL =
  "https://vkvideo.ru/video_ext.php?oid=-236919220&id=456239017&hd=2&autoplay=1"

export default function BirthdayPage() {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)
  const [showPhoto, setShowPhoto] = useState(false)
  const [showVideo1, setShowVideo1] = useState(false)
  const [showVideo2, setShowVideo2] = useState(false)
  const [video1Error, setVideo1Error] = useState(false)

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
      <div className="relative min-h-screen bg-white transition-all duration-1000">
          {/* Конфетти */}
          <Confetti />
          
          {/* Баннер HAPPY BIRTHDAY */}
          <div className="fixed inset-x-0 top-0 z-40 pointer-events-none">
            <img
              src="/happy3.png"
              alt="Happy Birthday"
              className="block w-full h-auto max-h-[92px] md:max-h-[120px] object-contain object-top align-top"
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
            <div className="relative mt-2 md:mt-4 z-10 px-4">
              <div className="relative mx-auto max-w-4xl w-full py-8 md:py-10 flex items-center justify-center overflow-visible">
                <span
                  aria-hidden="true"
                  className={`pointer-events-none absolute inset-x-0 -inset-y-6 md:-inset-y-8 z-0 flex items-center justify-center text-center text-3xl md:text-5xl lg:text-6xl leading-[1.45] text-balance text-white opacity-95 blur-[10px] [text-shadow:0_0_24px_rgba(255,255,255,0.95),0_0_48px_rgba(255,255,255,0.8)] px-2 md:px-4 ${pacifico.className}`}
                >
                  Любимый наш Миша, поздравляем тебя с 35-летием!
                </span>
                <h1 className={`relative z-10 block pt-2 pb-4 text-3xl md:text-5xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600 text-center leading-[1.45] text-balance animate-shimmer drop-shadow-lg px-2 md:px-4 ${pacifico.className}`}>
                  Любимый наш Миша, поздравляем тебя с 35-летием!
                </h1>
              </div>
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
                <p className={`text-2xl md:text-3xl font-semibold text-amber-600 mt-6 ${pacifico.className}`}>
                  Любим тебя!
                </p>
              </div>
            </div>
            
            {/* Первая коробка - Поздравление (видео) */}
            <div className="text-center mb-4">
              <p className={`text-xl md:text-2xl font-medium text-amber-700 ${pacifico.className}`}>Поздравление</p>
            </div>
            <button
              onClick={() => {
                setVideo1Error(false)
                setShowVideo1(true)
              }}
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
              <p className={`text-xl md:text-2xl font-medium text-amber-700 ${pacifico.className}`}>Фоточки</p>
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
              <p className={`text-xl md:text-2xl font-medium text-amber-700 ${pacifico.className}`}>Привет из детства</p>
            </div>
            <button
              onClick={() => {
                setShowVideo2(true)
              }}
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
                className="relative w-full max-w-md bg-black rounded-lg overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setShowVideo1(false)}
                  className={`absolute -top-12 right-0 text-white text-lg hover:text-amber-400 transition-colors z-10 ${pacifico.className}`}
                >
                  Закрыть
                </button>
                <video
                  src={VIDEO_SOURCES.congratulations}
                  className="w-full h-auto max-h-[85vh] object-contain bg-black"
                  controls
                  autoPlay
                  playsInline
                  preload="metadata"
                  poster="/congratulation.png"
                  onError={() => setVideo1Error(true)}
                />
                {video1Error && (
                  <div className="absolute bottom-0 left-0 right-0 bg-black/80 text-white text-sm p-3">
                    Не удалось загрузить видео. Положите файл в <code>/public/video/congratulation.mp4</code> или задайте{" "}
                    <code>NEXT_PUBLIC_CONGRATULATION_VIDEO_URL</code>.
                  </div>
                )}
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
                  className={`absolute -top-12 right-0 text-white text-lg hover:text-amber-400 transition-colors z-10 ${pacifico.className}`}
                >
                  Закрыть
                </button>
                <iframe
                  src={CHILDHOOD_VK_EMBED_URL}
                  className="h-full w-full"
                  allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  title="Привет из детства — VK Video"
                />
              </div>
            </div>
          )}
      </div>
      
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
