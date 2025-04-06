import HeroSection from "../components/HeroSection";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-900">
      <HeroSection />
      
      
      {/* Music Genres Section */}
      <div className="py-16 md:pt-32 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-zinc-800">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          <div className="relative group overflow-hidden rounded-lg shadow-lg">
            <img src="/images/folk.jpg" alt="Folk Music" className="w-full h-150 object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
              <h3 className="text-4xl font-serif text-white p-6">Folk</h3>
            </div>
          </div>
          <div className="relative group overflow-hidden rounded-lg shadow-lg">
            <img src="/images/rock.jpg" alt="Rock Music" className="w-full h-150 object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
              <h3 className="text-4xl font-serif text-white p-6">Rock</h3>
            </div>
          </div>
          <div className="relative group overflow-hidden rounded-lg shadow-lg">
            <img src="/images/rap.jpg" alt="Rap Music" className="w-full h-150 object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
              <h3 className="text-4xl font-serif text-white p-6">Rap</h3>
            </div>
          </div>
          <div className="relative group overflow-hidden rounded-lg shadow-lg">
            <img src="/images/jpop.jpg" alt="J-Pop Music" className="w-full h-150 object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
              <h3 className="text-4xl font-serif text-white p-6">J-Pop</h3>
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
