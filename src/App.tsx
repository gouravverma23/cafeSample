import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MenuSection } from './components/MenuSection';
import { StorySection } from './components/StorySection';
import { GallerySection } from './components/GallerySection';
import { ReviewsSection } from './components/ReviewsSection';
import { LocationContactSection } from './components/LocationContactSection';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';

export default function App() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#21130D] flex flex-col font-sans selection:bg-[#BC5A36] selection:text-white">
      {/* Fixed Navigation */}
      <Navbar />

      {/* Main Page Landmark */}
      <main className="flex-1">
        <Hero />
        <MenuSection />
        <StorySection />
        <GallerySection />
        <ReviewsSection />
        <LocationContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Customer Desk */}
      <FloatingWhatsApp />
    </div>
  );
}
