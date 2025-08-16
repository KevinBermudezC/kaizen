import { 
  Header, 
  HeroSection, 
  FeaturesSection, 
  TestimonialsSection, 
  CTASection, 
  Footer 
} from "@/components/landing"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </main>
  )
}