"use client";
import HeroSection from "../components/HeroSection";
import Link from "next/link";
import { useState } from "react";
import Footer from "../components/Footer";

export default function Home() {
  const [activeGenre, setActiveGenre] = useState<string | null>(null);
  
  const handleGenreClick = (genre: string) => {
    if (activeGenre === genre) {
      setActiveGenre(null);
    } else {
      setActiveGenre(genre);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-900">
      <HeroSection />
      
      {/* Music Genres Section */}
      <div className="py-16 md:pt-32 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-zinc-800">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          <div 
            className="relative group overflow-hidden rounded-lg shadow-lg cursor-pointer transform transition duration-300 hover:scale-[1.02]"
            onClick={() => handleGenreClick('folk')}
          >
            <img src="/images/folk.jpg" alt="Folk Music" className="w-full h-150 object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
              <h3 className="text-4xl font-serif text-white p-6">Folk</h3>
            </div>
            <div className={`absolute inset-0 bg-gradient-to-b from-black/90 to-black/75 backdrop-blur-sm flex flex-col items-center justify-center transition-all duration-300 ${activeGenre === 'folk' ? 'opacity-100' : 'opacity-0 lg:group-hover:opacity-100'}`}>
              <h3 className="text-3xl font-serif text-white mb-8">Folk</h3>
              <div className="flex flex-col gap-4">
                <Link 
                  href="/men/folk" 
                  className="px-8 py-3 border border-white/30 bg-black/40 hover:bg-black/60 text-white font-medium rounded-full transition-all duration-200 backdrop-blur-sm"
                  onClick={(e) => e.stopPropagation()}
                >
                  Men's Collection
                </Link>
                <Link 
                  href="/women/folk" 
                  className="px-8 py-3 border border-white/30 bg-black/40 hover:bg-black/60 text-white font-medium rounded-full transition-all duration-200 backdrop-blur-sm"
                  onClick={(e) => e.stopPropagation()}
                >
                  Women's Collection
                </Link>
              </div>
              <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                <button 
                  onClick={(e) => {e.stopPropagation(); setActiveGenre(null);}} 
                  className="text-white/70 hover:text-white text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
          <div 
            className="relative group overflow-hidden rounded-lg shadow-lg cursor-pointer transform transition duration-300 hover:scale-[1.02]"
            onClick={() => handleGenreClick('rock')}
          >
            <img src="/images/rock.jpg" alt="Rock Music" className="w-full h-150 object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
              <h3 className="text-4xl font-serif text-white p-6">Rock</h3>
            </div>
            <div className={`absolute inset-0 bg-gradient-to-b from-black/90 to-black/75 backdrop-blur-sm flex flex-col items-center justify-center transition-all duration-300 ${activeGenre === 'rock' ? 'opacity-100' : 'opacity-0 lg:group-hover:opacity-100'}`}>
              <h3 className="text-3xl font-serif text-white mb-8">Rock</h3>
              <div className="flex flex-col gap-4">
                <Link 
                  href="/men/rock" 
                  className="px-8 py-3 border border-white/30 bg-black/40 hover:bg-black/60 text-white font-medium rounded-full transition-all duration-200 backdrop-blur-sm"
                  onClick={(e) => e.stopPropagation()}
                >
                  Men's Collection
                </Link>
                <Link 
                  href="/women/rock" 
                  className="px-8 py-3 border border-white/30 bg-black/40 hover:bg-black/60 text-white font-medium rounded-full transition-all duration-200 backdrop-blur-sm"
                  onClick={(e) => e.stopPropagation()}
                >
                  Women's Collection
                </Link>
              </div>
              <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                <button 
                  onClick={(e) => {e.stopPropagation(); setActiveGenre(null);}} 
                  className="text-white/70 hover:text-white text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
          <div 
            className="relative group overflow-hidden rounded-lg shadow-lg cursor-pointer transform transition duration-300 hover:scale-[1.02]"
            onClick={() => handleGenreClick('rap')}
          >
            <img src="/images/rap.jpg" alt="Rap Music" className="w-full h-150 object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
              <h3 className="text-4xl font-serif text-white p-6">Rap</h3>
            </div>
            <div className={`absolute inset-0 bg-gradient-to-b from-black/90 to-black/75 backdrop-blur-sm flex flex-col items-center justify-center transition-all duration-300 ${activeGenre === 'rap' ? 'opacity-100' : 'opacity-0 lg:group-hover:opacity-100'}`}>
              <h3 className="text-3xl font-serif text-white mb-8">Rap</h3>
              <div className="flex flex-col gap-4">
                <Link 
                  href="/men/rap" 
                  className="px-8 py-3 border border-white/30 bg-black/40 hover:bg-black/60 text-white font-medium rounded-full transition-all duration-200 backdrop-blur-sm"
                  onClick={(e) => e.stopPropagation()}
                >
                  Men's Collection
                </Link>
                <Link 
                  href="/women/rap" 
                  className="px-8 py-3 border border-white/30 bg-black/40 hover:bg-black/60 text-white font-medium rounded-full transition-all duration-200 backdrop-blur-sm"
                  onClick={(e) => e.stopPropagation()}
                >
                  Women's Collection
                </Link>
              </div>
              <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                <button 
                  onClick={(e) => {e.stopPropagation(); setActiveGenre(null);}} 
                  className="text-white/70 hover:text-white text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
          <div 
            className="relative group overflow-hidden rounded-lg shadow-lg cursor-pointer transform transition duration-300 hover:scale-[1.02]"
            onClick={() => handleGenreClick('jpop')}
          >
            <img src="/images/jpop.jpg" alt="J-Pop Music" className="w-full h-150 object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
              <h3 className="text-4xl font-serif text-white p-6">J-Pop</h3>
            </div>
            <div className={`absolute inset-0 bg-gradient-to-b from-black/90 to-black/75 backdrop-blur-sm flex flex-col items-center justify-center transition-all duration-300 ${activeGenre === 'jpop' ? 'opacity-100' : 'opacity-0 lg:group-hover:opacity-100'}`}>
              <h3 className="text-3xl font-serif text-white mb-8">J-Pop</h3>
              <div className="flex flex-col gap-4">
                <Link 
                  href="/men/jpop" 
                  className="px-8 py-3 border border-white/30 bg-black/40 hover:bg-black/60 text-white font-medium rounded-full transition-all duration-200 backdrop-blur-sm"
                  onClick={(e) => e.stopPropagation()}
                >
                  Men's Collection
                </Link>
                <Link 
                  href="/women/jpop" 
                  className="px-8 py-3 border border-white/30 bg-black/40 hover:bg-black/60 text-white font-medium rounded-full transition-all duration-200 backdrop-blur-sm"
                  onClick={(e) => e.stopPropagation()}
                >
                  Women's Collection
                </Link>
              </div>
              <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                <button 
                  onClick={(e) => {e.stopPropagation(); setActiveGenre(null);}} 
                  className="text-white/70 hover:text-white text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Brand Story Section */}
      <div className="flex flex-col items-center justify-center py-8 px-4 sm:px-6 lg:px-8 bg-white dark:bg-zinc-900">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4 text-black dark:text-white">Our Brand</h2>
        <p className="text-center max-w-2xl text-gray-700 dark:text-gray-300 mb-6">
          Experience the perfect blend of diverse music genres with fashion. 
          Our collections are inspired by the rhythms of folk, rock, rap, and J-Pop, 
          bringing a unique harmony of style to your everyday wardrobe.
        </p>
      </div>
      
      <Footer />
    </div>
  );
}
