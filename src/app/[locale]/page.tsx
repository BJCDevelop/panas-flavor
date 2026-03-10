import Script from 'next/script';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import Gallery from '@/components/sections/Gallery';
import CateringMenu from '@/components/sections/CateringMenu';
import CateringForm from '@/components/sections/CateringForm';
import Schedule from '@/components/sections/Schedule';
import About from '@/components/sections/About';

export default function HomePage() {
  return (
    <>
      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FoodEstablishment",
            "name": "Panas Flavor",
            "description": "Venezuelan food truck and catering service in Raleigh, NC",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Raleigh",
              "addressRegion": "NC",
              "addressCountry": "US"
            },
            "servesCuisine": "Venezuelan",
            "url": "https://panasflavor.com",
            "sameAs": [
              "https://instagram.com/PanasFlavor",
              "https://facebook.com/PanasFlavor"
            ]
          })
        }}
      />
      <Navbar />
      <main>
        <Hero />
        <Gallery />
        <CateringMenu />
        <CateringForm />
        <Schedule />
        <About />
      </main>
      <Footer />
    </>
  );
}
